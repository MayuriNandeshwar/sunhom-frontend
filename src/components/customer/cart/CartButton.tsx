"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

/**
 * Header cart icon with live item counter. Opens the cart drawer.
 * Inherits colour from its parent so it works on the transparent hero nav.
 */
export default function CartButton() {
  const { itemCount, hydrated, openCart } = useCart();
  const showBadge = hydrated && itemCount > 0;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={
        showBadge ? `Open cart, ${itemCount} items` : "Open cart"
      }
      className="relative flex h-10 w-10 items-center justify-center -m-2 hover:text-[var(--brand-gold)] transition-colors"
    >
      <ShoppingCart className="w-5 h-5" />

      {showBadge && (
        <span
          aria-hidden="true"
          className="absolute top-0.5 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--brand-gold)] text-white text-[10px] font-semibold leading-[18px] text-center"
        >
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </button>
  );
}
