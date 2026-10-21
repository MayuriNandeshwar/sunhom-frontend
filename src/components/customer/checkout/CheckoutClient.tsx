"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { useBuyNow } from "@/context/BuyNowContext";
import { useToast } from "@/context/ToastContext";
import { useCheckoutDetails } from "@/hooks/useCheckoutDetails";
import { isValid, validateDetails } from "@/lib/checkoutValidation";
import { formatPrice } from "@/lib/format";
import { MAX_QTY_PER_ITEM } from "@/config/cart.config";
import { PAYMENT_HREF } from "@/config/checkout.config";
import CheckoutForm, {
  CHECKOUT_FORM_ID,
} from "@/components/customer/checkout/CheckoutForm";

/**
 * /checkout for the Buy Now flow.
 *
 * - No Buy Now data: sends the visitor back to the product page.
 * - Otherwise: item + quantity, customer details and shipping address on
 *   the left, order summary on the right. "Continue to payment" unlocks
 *   once the form is valid and goes to /payment.
 */
export default function CheckoutClient() {
  const router = useRouter();
  const { toast } = useToast();
  const { item, hydrated, subtotal, savings, returnHref, updateQuantity } =
    useBuyNow();
  const {
    details,
    hydrated: detailsHydrated,
    setField,
    commit,
  } = useCheckoutDetails();

  const errors = useMemo(() => validateDetails(details), [details]);
  const formValid = isValid(errors);

  /* Guard: nothing to buy, go back to the product page. */
  useEffect(() => {
    if (!hydrated || item) return;
    toast({
      id: "buy-now-missing",
      variant: "error",
      message: "Pick a product to buy first.",
    });
    router.replace(returnHref);
  }, [hydrated, item, returnHref, router, toast]);

  const handleContinue = () => {
    if (!isValid(validateDetails(details))) return;
    commit();
    router.push(PAYMENT_HREF);
  };

  if (!hydrated || !detailsHydrated || !item) {
    /* Loading (or redirecting): neutral skeleton, no flash of content. */
    return (
      <section
        className="max-w-5xl mx-auto px-6 py-12 min-h-[60vh]"
        aria-busy="true"
      >
        <div className="animate-pulse space-y-6">
          <div className="h-9 w-48 rounded bg-[#f5f3ef]" />
          <div className="h-40 rounded-2xl bg-[#f5f3ef]" />
          <div className="h-72 rounded-2xl bg-[#f5f3ef]" />
        </div>
      </section>
    );
  }

  const href = `/collections/${item.categorySlug}/${item.slug}`;

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12 min-h-[60vh]">
      <h1 className="font-playfair text-3xl md:text-4xl text-[var(--text-heading)] mb-8 text-center md:text-left">
        Checkout
      </h1>

      <div className="grid gap-8 md:grid-cols-[1fr_340px] items-start">
        {/* LEFT: item, contact details, shipping address */}
        <div className="space-y-8 min-w-0">
          <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm">
            <h2 className="font-playfair text-xl text-[var(--text-heading)] mb-5">
              Your item
            </h2>

            <div className="flex gap-4">
              <Link
                href={href}
                className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#f5f3ef]"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </Link>

              <div className="flex-1 min-w-0 flex flex-col">
                <Link
                  href={href}
                  className="font-playfair text-lg leading-snug text-[var(--text-heading)] line-clamp-2 hover:text-[var(--brand-gold)] transition-colors"
                >
                  {item.name}
                </Link>

                <div className="mt-1 flex items-baseline gap-2 text-sm">
                  <span className="font-medium text-[var(--text-heading)]">
                    {formatPrice(item.price)}
                  </span>
                  {item.mrp > item.price && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(item.mrp)}
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="text-sm text-[var(--text-body)]">
                    Quantity
                  </span>
                  <QuantityStepper
                    value={item.quantity}
                    onChange={updateQuantity}
                    label={item.name}
                  />
                </div>
              </div>
            </div>
          </div>

          <CheckoutForm
            details={details}
            errors={errors}
            onChange={setField}
            onSubmit={handleContinue}
          />
        </div>

        {/* RIGHT: summary */}
        <aside className="rounded-2xl bg-white p-5 sm:p-6 shadow-sm space-y-3 md:sticky md:top-[160px]">
          <h2 className="font-playfair text-xl text-[var(--text-heading)]">
            Order summary
          </h2>

          <div className="flex justify-between gap-3 text-sm text-[var(--text-body)]">
            <span className="min-w-0">
              {item.name} × {item.quantity}
            </span>
            <span className="shrink-0">{formatPrice(subtotal)}</span>
          </div>

          {savings > 0 && (
            <div className="flex justify-between text-sm text-[var(--brand-teal)]">
              <span>You save</span>
              <span>{formatPrice(savings)}</span>
            </div>
          )}

          <div className="flex justify-between items-baseline border-t border-[var(--border-soft)] pt-3">
            <span className="font-epilogue text-sm text-[var(--text-body)]">
              Subtotal
            </span>
            <span className="font-playfair text-xl text-[var(--text-heading)]">
              {formatPrice(subtotal)}
            </span>
          </div>

          <p className="text-xs text-[var(--text-muted)]">
            Taxes included. Shipping calculated at the next step.
          </p>

          {/* Submits the form on the left (also reachable with Enter). */}
          <button
            type="submit"
            form={CHECKOUT_FORM_ID}
            disabled={!formValid}
            data-loading="true"
            data-loading-text="Proceeding to payment…"
            className="w-full py-3.5 rounded-full bg-[var(--brand-teal)] text-white text-sm font-medium transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50"
          >
            Continue to payment
          </button>

          {!formValid && (
            <p className="text-center text-xs text-[var(--text-muted)]">
              Complete your details to continue.
            </p>
          )}

          <Link
            href={returnHref}
            className="block w-full text-center text-sm text-[var(--text-body)] underline underline-offset-4 hover:text-[var(--brand-gold)] transition-colors"
          >
            Back to product
          </Link>
        </aside>
      </div>
    </section>
  );
}

function QuantityStepper({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (q: number) => void;
  label: string;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-[var(--border-soft)] bg-white">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label={`Decrease quantity of ${label}`}
        className="flex h-9 w-9 items-center justify-center text-[var(--text-heading)] hover:text-[var(--brand-gold)] transition-colors disabled:opacity-30 disabled:hover:text-[var(--text-heading)]"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-7 text-center text-sm" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY_PER_ITEM}
        aria-label={`Increase quantity of ${label}`}
        className="flex h-9 w-9 items-center justify-center text-[var(--text-heading)] hover:text-[var(--brand-gold)] transition-colors disabled:opacity-30 disabled:hover:text-[var(--text-heading)]"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
