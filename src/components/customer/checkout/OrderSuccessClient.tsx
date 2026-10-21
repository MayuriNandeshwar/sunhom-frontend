"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useBuyNow } from "@/context/BuyNowContext";
import { CONTINUE_SHOPPING_HREF } from "@/config/cart.config";
import { CHECKOUT_DETAILS_STORAGE_KEY } from "@/config/checkout.config";
import { PAYMENT_PROOF_STORAGE_KEY } from "@/config/payment.config";
import { formatPrice } from "@/lib/format";
import {
  readConfirmation,
  type OrderConfirmation,
} from "@/lib/paymentSubmission";

/**
 * /order-success: shown after "Submit Payment".
 * - No submitted order in this session: back to the home page.
 * - Otherwise shows the summary and clears the temporary checkout data
 *   (Buy Now item, address form, payment screenshot).
 */
export default function OrderSuccessClient() {
  const router = useRouter();
  const { clearBuyNow } = useBuyNow();
  const [order, setOrder] = useState<OrderConfirmation | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const found = readConfirmation();
    setOrder(found);
    setChecked(true);

    if (!found) {
      router.replace("/");
      return;
    }

    /* The order is saved: drop the temporary checkout data. */
    clearBuyNow();
    try {
      window.sessionStorage.removeItem(PAYMENT_PROOF_STORAGE_KEY);
      window.sessionStorage.removeItem(CHECKOUT_DETAILS_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, [clearBuyNow, router]);

  if (!checked || !order) {
    return (
      <section
        className="max-w-2xl mx-auto px-6 py-12 min-h-[60vh]"
        aria-busy="true"
      >
        <div className="animate-pulse space-y-6">
          <div className="mx-auto h-14 w-14 rounded-full bg-[#f5f3ef]" />
          <div className="mx-auto h-9 w-64 rounded bg-[#f5f3ef]" />
          <div className="h-40 rounded-2xl bg-[#f5f3ef]" />
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16 min-h-[60vh] text-center">
      <CheckCircle2
        className="mx-auto mb-5 h-14 w-14 text-[var(--brand-gold)]"
        strokeWidth={1.2}
      />
      <h1 className="font-playfair text-3xl md:text-4xl text-[var(--text-heading)] mb-3">
        Thank you, {order.customerName.split(" ")[0]}
      </h1>
      <p className="mx-auto mb-8 max-w-md font-epilogue text-sm leading-relaxed text-[var(--text-body)]">
        Your payment screenshot has been submitted for verification. We will
        confirm your order at {order.email}.
      </p>

      <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm text-left space-y-3">
        <div className="flex justify-between gap-3 font-epilogue text-sm text-[var(--text-body)]">
          <span className="min-w-0">
            {order.itemName} × {order.quantity}
          </span>
          <span className="shrink-0">{formatPrice(order.amount)}</span>
        </div>
        <div className="flex justify-between gap-3 font-epilogue text-sm text-[var(--text-body)]">
          <span>Delivering to</span>
          <span className="text-right">
            {order.city}, {order.state}
          </span>
        </div>
        <div className="flex justify-between items-baseline border-t border-[var(--border-soft)] pt-3">
          <span className="font-epilogue text-sm text-[var(--text-body)]">
            Amount paid
          </span>
          <span className="font-playfair text-xl text-[var(--text-heading)]">
            {formatPrice(order.amount)}
          </span>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <Link
          href={CONTINUE_SHOPPING_HREF}
          className="w-full sm:w-auto px-10 py-3 rounded-full bg-[var(--brand-teal)] text-white text-sm font-medium hover:opacity-90 transition"
        >
          Continue shopping
        </Link>
        <Link
          href="/"
          className="text-sm text-[var(--text-body)] underline underline-offset-4 hover:text-[var(--brand-gold)] transition-colors"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
