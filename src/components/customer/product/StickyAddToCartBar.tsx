"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { formatPrice } from "@/lib/format";
import { useProductPurchase } from "@/hooks/useProductPurchase";
import { useStickyBarVisible } from "@/hooks/useStickyBarVisible";
import BuyNowButton from "@/components/customer/buynow/BuyNowButton";
import QuantitySelector from "@/components/customer/product/QuantitySelector";
import type { Product } from "@/lib/api/products/product.service";

/**
 * Fixed bottom bar on the product page: slides up once the purchase box has
 * scrolled out of view, slides down again when it comes back (or the footer
 * appears). Uses the same quantity, Add to Cart and Buy Now as the box.
 */
export default function StickyAddToCartBar({ product }: { product: Product }) {
  const visible = useStickyBarVisible();
  return <StickyBar product={product} visible={visible} />;
}

/** Presentational part, separate from the scroll tracking so it is testable. */
export function StickyBar({
  product,
  visible,
}: {
  product: Product;
  visible: boolean;
}) {
  const {
    variant,
    image,
    outOfStock,
    maxQty,
    qty,
    setQuantity,
    addToCart,
    buyNowProduct,
  } = useProductPurchase(product);
  const reduceMotion = useReducedMotion();

  /* Nothing to buy: the purchase box already says "Out of Stock". */
  if (outOfStock) return null;

  const buttonText = "h-11 px-6 text-sm tracking-wide";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-add-to-cart"
          role="region"
          aria-label="Quick purchase"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
          }
          /* z-40: under the cookie banner (z-50), the header and the cart
             drawer, so none of them are ever covered. */
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-soft)] bg-[#F7F5F2]/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 px-4 py-3 sm:flex sm:gap-5 sm:px-6">
            {/* PRODUCT */}
            <div className="flex min-w-0 items-center gap-3 sm:flex-1">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#f5f3ef] sm:h-14 sm:w-14">
                {image && (
                  <Image
                    src={image}
                    alt={product.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate font-playfair text-base leading-snug text-[#1c1c1c]">
                  {product.name}
                </p>
                <p className="flex items-baseline gap-2">
                  <span className="font-playfair text-sm font-medium text-[#1c1c1c]">
                    {formatPrice(variant.price)}
                  </span>
                  {variant.mrp > variant.price && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(variant.mrp)}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* QUANTITY */}
            <QuantitySelector
              size="compact"
              value={qty}
              onChange={setQuantity}
              max={maxQty}
              productName={product.name}
            />

            {/* ACTIONS */}
            <div className="col-span-2 grid grid-cols-2 gap-3 sm:col-span-1 sm:flex">
              <button
                type="button"
                onClick={addToCart}
                className={`${buttonText} rounded-full bg-amber-600 font-medium text-white transition hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 sm:whitespace-nowrap`}
              >
                Add to Cart
              </button>

              <BuyNowButton
                variant="detail"
                quantity={qty}
                className={`${buttonText} sm:whitespace-nowrap`}
                product={buyNowProduct}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
