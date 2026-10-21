"use client";

import { useState } from "react";
import Image from "next/image";
import { AlertTriangle, Check, Copy, Smartphone } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/lib/format";
import {
  PAYMENT_CONFIGURED,
  merchantName,
  qrImage,
  upiId,
} from "@/config/payment.config";

/** UPI deep link: opens the customer's UPI app with the amount filled in. */
function buildUpiLink(amount: number): string {
  const params = new URLSearchParams({
    pa: upiId,
    pn: merchantName,
    am: amount.toFixed(2),
    cu: "INR",
  });
  return `upi://pay?${params.toString()}`;
}

/* ---------------------------------------------------------------
   Merchant, amount and QR
   --------------------------------------------------------------- */

export function ScanAndPayCard({ amount }: { amount: number }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      toast({ id: "upi-copied", message: "UPI ID copied" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        id: "upi-copy-failed",
        variant: "error",
        message: "Could not copy. Please copy the UPI ID manually.",
      });
    }
  };

  return (
    <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm">
      <h2 className="font-playfair text-xl text-[var(--text-heading)] mb-5">
        Scan &amp; Pay
      </h2>

      {!PAYMENT_CONFIGURED && (
        <div
          role="alert"
          className="mb-5 flex gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Payment details are not set up yet. Please do not pay. Contact us
            to complete your order.
          </p>
        </div>
      )}

      <div className="mx-auto w-full max-w-[260px] rounded-2xl border border-[var(--border-soft)] bg-white p-3">
        <div className="relative aspect-square">
          <Image
            src={qrImage}
            alt={`UPI QR code to pay ${merchantName}`}
            fill
            sizes="260px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      <dl className="mt-6 space-y-4 font-epilogue text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-[var(--text-muted)]">Merchant</dt>
          <dd className="text-right font-medium text-[var(--text-heading)]">
            {merchantName}
          </dd>
        </div>

        <div className="flex items-center justify-between gap-4">
          <dt className="text-[var(--text-muted)]">UPI ID</dt>
          <dd className="flex min-w-0 items-center gap-2">
            <span className="min-w-0 break-all text-right font-medium text-[var(--text-heading)]">
              {upiId}
            </span>
            <button
              type="button"
              onClick={copyUpiId}
              aria-label="Copy UPI ID"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-soft)] text-[var(--text-heading)] transition-colors hover:text-[var(--brand-gold)]"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </dd>
        </div>

        <div className="flex items-baseline justify-between gap-4 border-t border-[var(--border-soft)] pt-4">
          <dt className="text-[var(--text-muted)]">Amount to pay</dt>
          <dd className="font-playfair text-2xl text-[var(--text-heading)]">
            {formatPrice(amount)}
          </dd>
        </div>
      </dl>

      {/* On a phone you cannot scan your own screen: open the UPI app. */}
      {PAYMENT_CONFIGURED && (
        <a
          href={buildUpiLink(amount)}
          className="mt-5 flex items-center justify-center gap-2 rounded-full border border-[var(--brand-teal)] py-3 text-sm font-medium text-[var(--brand-teal)] transition hover:bg-[var(--brand-teal)] hover:text-white sm:hidden"
        >
          <Smartphone className="h-4 w-4" />
          Pay with a UPI app
        </a>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   Instructions
   --------------------------------------------------------------- */

const STEPS = [
  "Scan QR Code",
  "Complete Payment",
  "Upload Screenshot",
  "Submit Verification",
] as const;

export function PaymentSteps() {
  return (
    <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm">
      <h2 className="font-playfair text-xl text-[var(--text-heading)] mb-5">
        How to pay
      </h2>

      <ol className="space-y-4">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-gold)] font-epilogue text-sm font-semibold text-white"
            >
              {i + 1}
            </span>
            <span className="font-epilogue text-sm text-[var(--text-heading)]">
              {label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
