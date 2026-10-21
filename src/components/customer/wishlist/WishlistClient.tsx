"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlist, type WishlistItem } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { useCart } from "@/context/CartContext";
import { CONTINUE_SHOPPING_HREF } from "@/config/cart.config";
import { LuxuryCard } from "@/components/customer/collection/ProductGrid";
import type { PublicProduct } from "@/services/public/product.api";

/** Shape the shared product card expects. */
function toCardProduct(item: WishlistItem): PublicProduct {
  return {
    productId: item.productId,
    productName: item.name,
    slug: item.slug,
    shortDescription: item.shortDescription ?? "",
    sku: "",
    price: item.price,
    mrp: item.mrp,
    discountPercentage:
      item.mrp > item.price ? ((item.mrp - item.price) / item.mrp) * 100 : 0,
    imageUrl: item.imageUrl,
    inStock: item.inStock !== false,
    categorySlug: item.categorySlug,
  };
}

export default function WishlistClient() {
  const { items, count, hydrated, removeItem } = useWishlist();
  const { items: cartItems, addItem: addToCart, openCart } = useCart();
  const { toast } = useToast();

  const moveToCart = (item: WishlistItem) => {
    const alreadyInCart = cartItems.some((c) => c.productId === item.productId);

    /* If it is already in the cart we leave the cart untouched (no silent
       quantity bump) and simply take it off the wishlist. */
    if (!alreadyInCart) {
      addToCart(
        {
          productId: item.productId,
          variantId: item.variantId,
          slug: item.slug,
          categorySlug: item.categorySlug,
          name: item.name,
          imageUrl: item.imageUrl,
          price: item.price,
          mrp: item.mrp,
        },
        { openDrawer: false }
      );
    }

    removeItem(item.productId, { silent: true });

    toast({
      id: `wishlist:${item.productId}`,
      variant: "success",
      message: alreadyInCart
        ? "Already in your cart. Removed from wishlist"
        : "Moved to your cart",
      action: { label: "View cart", onClick: openCart },
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 min-h-[60vh]">
      {/* HEADING */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-playfair text-3xl md:text-4xl text-[var(--text-heading)]">
          Your Wishlist
        </h1>
        {hydrated && count > 0 && (
          <p className="mt-2 font-epilogue text-sm text-[var(--text-muted)]">
            {count} {count === 1 ? "item" : "items"} saved
          </p>
        )}
      </div>

      {!hydrated ? (
        /* LOADING: avoids flashing the empty state before storage is read */
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-10"
          aria-hidden="true"
        >
          {[0, 1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse">
              <div className="aspect-[4/5] rounded-2xl bg-[#f5f3ef]" />
              <div className="mt-4 h-5 w-3/4 rounded bg-[#f5f3ef]" />
              <div className="mt-3 h-4 w-1/3 rounded bg-[#f5f3ef]" />
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center text-center py-16 md:py-24">
          <Heart
            className="w-14 h-14 text-[var(--brand-gold)] mb-6"
            strokeWidth={1.2}
          />
          <h2 className="font-playfair text-2xl text-[var(--text-heading)] mb-2">
            Your wishlist is empty
          </h2>
          <p className="font-epilogue text-sm text-[var(--text-muted)] mb-8 max-w-sm">
            Tap the heart on any fragrance you love and it will wait for you
            here.
          </p>
          <Link
            href={CONTINUE_SHOPPING_HREF}
            className="px-10 py-3 rounded-full bg-[var(--brand-teal)] text-white text-sm font-medium hover:opacity-90 transition"
          >
            Explore Collection
          </Link>
        </div>
      ) : (
        /* SAVED PRODUCTS */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-10">
          {items.map((item) => {
            const inStock = item.inStock !== false;

            return (
              <LuxuryCard
                key={item.productId}
                product={toCardProduct(item)}
                footer={
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        moveToCart(item);
                      }}
                      disabled={!inStock}
                      className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium transition bg-amber-600 text-white hover:bg-amber-700 shadow-sm disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {inStock ? "Move to Cart" : "Out of Stock"}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeItem(item.productId);
                      }}
                      aria-label={`Remove ${item.name} from wishlist`}
                      className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-full text-sm font-medium border border-[var(--border-soft)] text-[var(--text-body)] bg-white/60 hover:border-red-300 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                }
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
