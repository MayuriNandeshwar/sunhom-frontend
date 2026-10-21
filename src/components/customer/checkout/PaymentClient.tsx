"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBuyNow } from "@/context/BuyNowContext";
import { useToast } from "@/context/ToastContext";
import { useCheckoutDetails } from "@/hooks/useCheckoutDetails";
import { usePaymentProof } from "@/hooks/usePaymentProof";
import { isValid, validateDetails } from "@/lib/checkoutValidation";
import { submitPayment } from "@/lib/paymentSubmission";
import { formatPrice } from "@/lib/format";
import { CHECKOUT_HREF } from "@/config/buynow.config";
import { ORDER_SUCCESS_HREF } from "@/config/payment.config";
import {
  PaymentSteps,
  ScanAndPayCard,
} from "@/components/customer/payment/ScanAndPay";
import ScreenshotUpload from "@/components/customer/payment/ScreenshotUpload";
import SunhomSpinner from "@/components/common/SunhomSpinner";

/**
 * /payment: Scan & Pay with a UPI QR code, then upload a screenshot.
 *
 * Route guards (unchanged from Task 4):
 * - No Buy Now data: back to the product page.
 * - Missing or invalid details: back to /checkout.
 */
export default function PaymentClient() {
  const router = useRouter();
  const { toast } = useToast();
  const { item, hydrated, subtotal, returnHref } = useBuyNow();
  const { details, hydrated: detailsHydrated } = useCheckoutDetails();
  const {
    proof,
    hydrated: proofHydrated,
    saveProof,
    removeProof,
  } = usePaymentProof();

  const [submitting, setSubmitting] = useState(false);

  const detailsOk = useMemo(
    () => isValid(validateDetails(details)),
    [details]
  );

  useEffect(() => {
    if (!hydrated || !detailsHydrated) return;

    if (!item) {
      toast({
        id: "buy-now-missing",
        variant: "error",
        message: "Pick a product to buy first.",
      });
      router.replace(returnHref);
    } else if (!detailsOk) {
      router.replace(CHECKOUT_HREF);
    }
  }, [hydrated, detailsHydrated, item, detailsOk, returnHref, router, toast]);

  if (!hydrated || !detailsHydrated || !proofHydrated || !item || !detailsOk) {
    return (
      <section
        className="max-w-5xl mx-auto px-6 py-12 min-h-[60vh]"
        aria-busy="true"
      >
        <div className="animate-pulse space-y-6">
          <div className="h-9 w-40 rounded bg-[#f5f3ef]" />
          <div className="h-80 rounded-2xl bg-[#f5f3ef]" />
        </div>
      </section>
    );
  }

  const handleSubmit = async () => {
    if (!proof || submitting) return;
    setSubmitting(true);
    try {
      await submitPayment({
        itemName: item.name,
        quantity: item.quantity,
        amount: subtotal,
        customerName: details.fullName,
        email: details.email,
        city: details.city,
        state: details.state,
      });
      /* Stay in the submitting state: the page is navigating away. */
      router.push(ORDER_SUCCESS_HREF);
    } catch {
      setSubmitting(false);
      toast({
        id: "payment-submit-failed",
        variant: "error",
        message: "We could not submit your payment. Please try again.",
      });
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12 min-h-[60vh]">
      <h1 className="font-playfair text-3xl md:text-4xl text-[var(--text-heading)] mb-8 text-center md:text-left">
        Payment
      </h1>

      <div className="grid gap-8 md:grid-cols-2 items-start">
        {/* LEFT: merchant, amount, QR */}
        <ScanAndPayCard amount={subtotal} />

        {/* RIGHT: steps, upload, submit */}
        <div className="space-y-8 min-w-0">
          <PaymentSteps />

          <ScreenshotUpload
            proof={proof}
            onSave={saveProof}
            onRemove={removeProof}
          />

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!proof || submitting}
              className="w-full py-3.5 rounded-full bg-[var(--brand-teal)] text-white text-sm font-medium transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <SunhomSpinner size="xs" speed="fast" />
                  <span>Submitting Payment…</span>
                </>
              ) : (
                "Submit Payment"
              )}
            </button>

            {!proof && (
              <p className="text-center text-xs text-[var(--text-muted)]">
                Upload your payment screenshot to continue.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* DELIVERY + ORDER */}
      <div className="mt-8 rounded-2xl bg-white p-5 sm:p-6 shadow-sm grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="font-playfair text-xl text-[var(--text-heading)] mb-3">
            Delivering to
          </h2>
          <address className="not-italic font-epilogue text-sm leading-relaxed text-[var(--text-body)] break-words">
            <strong className="text-[var(--text-heading)]">
              {details.fullName}
            </strong>
            <br />
            {details.addressLine1}
            {details.addressLine2 && (
              <>
                <br />
                {details.addressLine2}
              </>
            )}
            <br />
            {details.city}, {details.state} {details.pincode}
            <br />
            +91 {details.mobile} · {details.email}
          </address>
        </div>

        <div>
          <h2 className="font-playfair text-xl text-[var(--text-heading)] mb-3">
            Your order
          </h2>
          <div className="flex justify-between gap-3 font-epilogue text-sm text-[var(--text-body)]">
            <span className="min-w-0">
              {item.name} × {item.quantity}
            </span>
            <span className="shrink-0">{formatPrice(subtotal)}</span>
          </div>
          <Link
            href={CHECKOUT_HREF}
            className="mt-4 inline-block text-sm text-[var(--text-body)] underline underline-offset-4 hover:text-[var(--brand-gold)] transition-colors"
          >
            Edit details
          </Link>
        </div>
      </div>
    </section>
  );
}
