"use client";

import { useProductPurchase } from "@/hooks/useProductPurchase";
import { PURCHASE_SECTION_ID } from "@/config/stickyBar.config";
import { formatPrice } from "@/lib/format";
import BuyNowButton from "@/components/customer/buynow/BuyNowButton";
import WishlistButton from "@/components/customer/wishlist/WishlistButton";
import QuantitySelector from "@/components/customer/product/QuantitySelector";
import TrustBadges from "@/components/customer/product/TrustBadges";
import DeliveryInfo from "@/components/customer/product/DeliveryInfo";
import ProductHighlights from "@/components/customer/product/ProductHighlights";
import type { Product } from "@/lib/api/products/product.service";

export default function ProductInfo({ product }: { product: Product }) {
  /* One quantity drives "Add to Cart" and "Buy Now" here and in the sticky
     bar; the logic lives in useProductPurchase. */
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

  const discountPct =
    variant.mrp > variant.price
      ? Math.round(((variant.mrp - variant.price) / variant.mrp) * 100)
      : 0;

  const buttonText = "h-12 text-sm tracking-wide";

  return (
    <div className="space-y-8 md:space-y-9 lg:[@media(min-height:1100px)]:sticky lg:[@media(min-height:1100px)]:top-[156px]">
      {/* TITLE */}
      <header className="space-y-3">
        <h1 className="font-playfair text-3xl leading-tight text-[#1c1c1c] sm:text-4xl">
          {product.name}
        </h1>
        <p className="font-epilogue text-sm text-[var(--text-muted)] sm:text-base">
          Handcrafted Premium Soy Candle
        </p>
      </header>

      {/* PRICE */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-playfair text-3xl font-medium text-[#1c1c1c]">
            {formatPrice(variant.price)}
          </span>
          {variant.mrp > variant.price && (
            <span className="text-base text-gray-400 line-through">
              {formatPrice(variant.mrp)}
            </span>
          )}
          {discountPct > 0 && (
            <span className="rounded-full bg-[#014a2c] px-3 py-1 text-xs font-medium tracking-wide text-white">
              Save {discountPct}%
            </span>
          )}
        </div>
        <p className="font-epilogue text-sm text-[var(--text-muted)]">
          Taxes included. Shipping calculated at checkout.
        </p>
      </div>

      {/* PURCHASE */}
      <div
        id={PURCHASE_SECTION_ID}
        className="space-y-5 border-t border-[var(--border-soft)] pt-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <div className="flex items-center gap-4">
            <span className="font-epilogue text-sm text-[var(--text-body)]">
              Quantity
            </span>
            <QuantitySelector
              value={qty}
              onChange={setQuantity}
              max={maxQty}
              disabled={outOfStock}
              productName={product.name}
            />
          </div>

          {qty > 1 && !outOfStock && (
            <p
              aria-live="polite"
              className="font-epilogue text-sm text-[var(--text-body)]"
            >
              Total{" "}
              <span className="font-playfair text-lg font-medium text-[#1c1c1c]">
                {formatPrice(variant.price * qty)}
              </span>
            </p>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={addToCart}
            disabled={outOfStock}
            className={`${buttonText} rounded-full bg-amber-600 font-medium text-white transition hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500`}
          >
            {outOfStock ? "Out of Stock" : "Add to Cart"}
          </button>

          <BuyNowButton
            variant="detail"
            quantity={qty}
            className={buttonText}
            product={buyNowProduct}
          />
        </div>

        <WishlistButton
          variant="detail"
          className={buttonText}
          product={{
            productId: product.productId,
            variantId: variant.variantId,
            slug: product.slug,
            categorySlug: product.categorySlug,
            name: product.name,
            imageUrl: image,
            price: variant.price,
            mrp: variant.mrp,
            inStock: product.inStock,
          }}
        />
      </div>

      {/* ASSURANCE */}
      <TrustBadges />
      <DeliveryInfo />

      <div className="border-t border-[var(--border-soft)] pt-8">
        <ProductHighlights />
      </div>
    </div>
  );
}
