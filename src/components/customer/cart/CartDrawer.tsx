"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import {
  CHECKOUT_ENABLED,
  CONTINUE_SHOPPING_HREF,
  FREE_SHIPPING_THRESHOLD,
  MAX_QTY_PER_ITEM,
} from "@/config/cart.config";

export default function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    savings,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart();

  const closeRef = useRef<HTMLButtonElement>(null);

  /* Esc to close, lock page scroll, move focus into the drawer */
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, closeCart]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-[110] bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* PANEL */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 z-[120] h-full w-full max-w-[420px] bg-[#F7F5F2] shadow-2xl flex flex-col
          transition-[transform,visibility] duration-300 ease-out
          ${isOpen ? "translate-x-0 visible" : "translate-x-full invisible"}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-soft)]">
          <h2 className="font-playfair text-xl text-[var(--text-heading)]">
            Your Cart
            {itemCount > 0 && (
              <span className="ml-2 font-epilogue text-sm text-[var(--text-muted)]">
                ({itemCount} {itemCount === 1 ? "item" : "items"})
              </span>
            )}
          </h2>

          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center -mr-2 text-[var(--text-heading)] hover:text-[var(--brand-gold)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
            <ShoppingBag
              className="w-12 h-12 text-[var(--brand-gold)] mb-5"
              strokeWidth={1.2}
            />
            <h3 className="font-playfair text-xl text-[var(--text-heading)] mb-2">
              Your cart is empty
            </h3>
            <p className="font-epilogue text-sm text-[var(--text-muted)] mb-8">
              Discover fragrances made to linger.
            </p>
            <Link
              href={CONTINUE_SHOPPING_HREF}
              onClick={closeCart}
              className="px-10 py-3 rounded-full bg-[var(--brand-teal)] text-white text-sm font-medium hover:opacity-90 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* FREE SHIPPING PROGRESS */}
            <div className="px-6 pt-5">
              <div className="flex items-center gap-2 text-sm text-[var(--text-body)] mb-2">
                <Truck className="w-4 h-4 text-[var(--brand-teal)]" />
                {remaining > 0 ? (
                  <span>
                    Add <strong>{formatPrice(remaining)}</strong> more for free
                    shipping
                  </span>
                ) : (
                  <span className="text-[var(--brand-teal)] font-medium">
                    You&apos;ve unlocked free shipping
                  </span>
                )}
              </div>
              <div className="h-1.5 w-full rounded-full bg-[var(--border-soft)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--brand-gold)] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* LINES */}
            <ul className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[var(--border-soft)]">
              {items.map((item) => {
                const href = `/collections/${item.categorySlug}/${item.slug}`;
                return (
                  <li key={item.productId} className="flex gap-4 py-5">
                    <Link
                      href={href}
                      onClick={closeCart}
                      className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f5f3ef]"
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <Link
                          href={href}
                          onClick={closeCart}
                          className="font-playfair text-base leading-snug text-[var(--text-heading)] line-clamp-2 hover:text-[var(--brand-gold)] transition-colors"
                        >
                          {item.name}
                        </Link>

                        <button
                          type="button"
                          onClick={() => removeItem(item.productId)}
                          aria-label={`Remove ${item.name} from cart`}
                          className="flex h-8 w-8 -mt-1 -mr-2 shrink-0 items-center justify-center text-[var(--text-muted)] hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

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

                      <div className="mt-auto flex items-center justify-between pt-3">
                        {/* QUANTITY */}
                        <div className="inline-flex items-center rounded-full border border-[var(--border-soft)] bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              item.quantity === 1
                                ? removeItem(item.productId)
                                : updateQuantity(item.productId, item.quantity - 1)
                            }
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="flex h-9 w-9 items-center justify-center text-[var(--text-heading)] hover:text-[var(--brand-gold)] transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span
                            className="w-7 text-center text-sm"
                            aria-live="polite"
                          >
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                            disabled={item.quantity >= MAX_QTY_PER_ITEM}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="flex h-9 w-9 items-center justify-center text-[var(--text-heading)] hover:text-[var(--brand-gold)] transition-colors disabled:opacity-30 disabled:hover:text-[var(--text-heading)]"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-[var(--text-heading)]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* FOOTER */}
            <div className="border-t border-[var(--border-soft)] bg-white/60 px-6 py-5 space-y-3">
              {savings > 0 && (
                <div className="flex justify-between text-sm text-[var(--brand-teal)]">
                  <span>You save</span>
                  <span>{formatPrice(savings)}</span>
                </div>
              )}

              <div className="flex justify-between items-baseline">
                <span className="font-epilogue text-sm text-[var(--text-body)]">
                  Subtotal
                </span>
                <span className="font-playfair text-xl text-[var(--text-heading)]">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <p className="text-xs text-[var(--text-muted)]">
                Taxes included. Shipping calculated at checkout.
              </p>

              {CHECKOUT_ENABLED ? (
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full text-center py-3.5 rounded-full bg-[var(--brand-teal)] text-white text-sm font-medium hover:opacity-90 transition"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full py-3.5 rounded-full bg-[var(--brand-teal)] text-white text-sm font-medium opacity-50 cursor-not-allowed"
                >
                  Checkout
                </button>
              )}

              <button
                type="button"
                onClick={closeCart}
                className="w-full text-center text-sm text-[var(--text-body)] underline underline-offset-4 hover:text-[var(--brand-gold)] transition-colors"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
