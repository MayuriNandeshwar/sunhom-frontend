"use client";

import type { MouseEvent } from "react";
import { useBuyNow, type BuyNowInput } from "@/context/BuyNowContext";

interface BuyNowButtonProps {
  product: BuyNowInput;
  /** Units to buy. Defaults to 1. */
  quantity?: number;
  /**
   * "card"   compact pill for product cards.
   * "detail" full-size button for the product page.
   */
  variant?: "card" | "detail";
  className?: string;
}

const BASE =
  "inline-flex items-center justify-center rounded-full font-medium transition disabled:cursor-not-allowed";

const VARIANTS = {
  card: "w-full py-2 text-sm border border-[var(--brand-teal)] bg-[var(--brand-teal)] text-white hover:opacity-90 disabled:border-gray-300 disabled:bg-gray-300 disabled:text-gray-500",
  detail:
    "py-3 bg-[var(--brand-teal)] text-white hover:opacity-90 disabled:bg-gray-300 disabled:text-gray-500",
} as const;

export default function BuyNowButton({
  product,
  quantity = 1,
  variant = "card",
  className = "",
}: BuyNowButtonProps) {
  const { startBuyNow } = useBuyNow();
  const outOfStock = product.inStock === false;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    /* Cards are wrapped in a <Link>: never navigate to the product page or
       trigger the card's own click handler. */
    e.preventDefault();
    e.stopPropagation();
    startBuyNow(product, quantity);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={outOfStock}
      data-loading="true"
      data-loading-text="Preparing checkout…"
      aria-label={outOfStock ? undefined : `Buy ${product.name} now`}
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
    >
      {outOfStock ? "Out of Stock" : "Buy Now"}
    </button>
  );
}
