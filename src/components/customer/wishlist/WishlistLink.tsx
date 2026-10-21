"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { WISHLIST_HREF } from "@/config/wishlist.config";

/**
 * Header heart icon with live saved-count badge. Links to /wishlist.
 * Mirrors CartButton so both icons look and behave alike, and inherits
 * colour from its parent so it works on the transparent hero nav.
 */
export default function WishlistLink({ className = "" }: { className?: string }) {
  const { count, hydrated } = useWishlist();
  const showBadge = hydrated && count > 0;

  return (
    <Link
      href={WISHLIST_HREF}
      aria-label={showBadge ? `Wishlist, ${count} items` : "Wishlist"}
      className={`relative flex h-10 w-10 items-center justify-center -m-2 text-inherit hover:text-[var(--brand-gold)] transition-colors ${className}`}
    >
      <Heart className="w-5 h-5 text-current" />

      {showBadge && (
        <span
          aria-hidden="true"
          className="absolute top-0.5 right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--brand-gold)] text-white text-[10px] font-semibold leading-[18px] text-center"
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}
