"use client";

import type { MouseEvent } from "react";
import { Heart } from "lucide-react";
import { useWishlist, type WishlistInput } from "@/context/WishlistContext";

interface WishlistButtonProps {
  product: WishlistInput;
  /**
   * "icon"   round heart that sits on a product card image. The card passes
   *          its own `className` so each card keeps its existing look.
   * "detail" full-width outlined button for the product page.
   */
  variant?: "icon" | "detail";
  /** Button classes ("icon": positioning, size, background). */
  className?: string;
  /** Heart size classes for the "icon" variant. */
  iconClassName?: string;
}

export default function WishlistButton({
  product,
  variant = "icon",
  className = "",
  iconClassName = "w-4 h-4",
}: WishlistButtonProps) {
  const { isInWishlist, toggleItem, hydrated } = useWishlist();

  /* Not "active" until storage has been read, so server and first client
     render always match. */
  const active = hydrated && isInWishlist(product.productId);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    /* Cards are wrapped in a <Link>: never navigate or trigger the
       card's own click handler when the heart is tapped. */
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  const label = active
    ? `Remove ${product.name} from wishlist`
    : `Add ${product.name} to wishlist`;

  if (variant === "detail") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={active}
        aria-label={label}
        className={`flex w-full items-center justify-center gap-2 rounded-full border border-amber-600 py-3 text-amber-700 transition hover:bg-amber-50 ${className}`}
      >
        <Heart
          className={`h-5 w-5 transition-all duration-300 ${
            active ? "fill-[#c2461d] text-[#c2461d]" : "fill-none"
          }`}
          strokeWidth={1.6}
        />
        {active ? "Saved to Wishlist" : "Add to Wishlist"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={label}
      className={className}
    >
      <Heart
        className={`${iconClassName} transition-all duration-300 ${
          active ? "fill-[#c2461d] text-[#c2461d]" : "fill-none text-gray-600"
        }`}
        strokeWidth={1.6}
      />
    </button>
  );
}
