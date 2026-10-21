"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";
import type { PublicProduct } from "@/services/public/product.api";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import WishlistButton from "@/components/customer/wishlist/WishlistButton";

/*
 * Hover UI (lift, zoom, button reveal) is limited to devices that can really
 * hover and are at least 768px wide: the `[@media(hover:hover)_and_(min-width:768px)]:`
 * variant below. Phones and touch tablets get always-visible buttons under the
 * card instead, so nothing depends on hover. The variant is written out in full
 * on every class because Tailwind cannot detect interpolated class names.
 */

export default function RelatedProductCard({
  product,
  index,
}: {
  product: PublicProduct;
  index: number;
}) {
  const { addItem } = useCart();
  const reduceMotion = useReducedMotion();

  const href = `/collections/${product.categorySlug}/${product.slug}`;
  const inStock = product.inStock !== false;
  const discount =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.productId,
      slug: product.slug,
      categorySlug: product.categorySlug,
      name: product.productName,
      imageUrl: product.imageUrl,
      price: product.price,
      mrp: product.mrp,
    });
  };

  const addToCartButton = (className: string) => (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={!inStock}
      aria-label={inStock ? `Add ${product.productName} to cart` : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
        inStock
          ? "bg-amber-600 text-white shadow-sm hover:bg-amber-700"
          : "cursor-not-allowed bg-gray-300 text-gray-500"
      } ${className}`}
    >
      <ShoppingBag className="h-4 w-4" />
      {inStock ? "Add to Cart" : "Out of Stock"}
    </button>
  );

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.09, ease: "easeOut" }}
      className="h-full"
    >
      {/* Hover lift lives on an inner element so it never fights the
          entrance animation's transform. */}
      <div
        className={`group flex h-full flex-col transition-transform duration-500 ease-out [@media(hover:hover)_and_(min-width:768px)]:hover:-translate-y-1.5`}
      >
        {/* IMAGE */}
        <div
          className={`relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f5f3ef] transition-shadow duration-500 [@media(hover:hover)_and_(min-width:768px)]:group-hover:shadow-[0_18px_40px_-18px_rgba(28,28,28,0.35)]`}
        >
          <Link
            href={href}
            aria-label={`View ${product.productName}`}
            className="absolute inset-0 block"
            tabIndex={-1}
          >
            <Image
              src={product.imageUrl}
              alt={product.productName}
              fill
              sizes="(max-width: 767px) 50vw, (max-width: 1279px) 25vw, 300px"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
            />
          </Link>

          {discount > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium shadow">
              {discount}% OFF
            </span>
          )}

          <WishlistButton
            product={{
              productId: product.productId,
              slug: product.slug,
              categorySlug: product.categorySlug,
              name: product.productName,
              imageUrl: product.imageUrl,
              price: product.price,
              mrp: product.mrp,
              shortDescription: product.shortDescription,
              inStock: product.inStock,
            }}
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow transition hover:scale-105 hover:bg-white"
            iconClassName="h-5 w-5"
          />

          {!inStock && (
            <div
              className={`pointer-events-none absolute inset-x-0 bottom-0 bg-black/55 py-2 text-center text-xs uppercase tracking-[0.2em] text-white transition-opacity duration-300 [@media(hover:hover)_and_(min-width:768px)]:group-hover:opacity-0 [@media(hover:hover)_and_(min-width:768px)]:group-focus-within:opacity-0`}
            >
              Out of stock
            </div>
          )}

          {/* HOVER ACTIONS (desktop pointer devices only) */}
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-500 [@media(hover:hover)_and_(min-width:768px)]:block [@media(hover:hover)_and_(min-width:768px)]:group-hover:opacity-100 [@media(hover:hover)_and_(min-width:768px)]:group-focus-within:opacity-100`}
            aria-hidden="true"
          />
          <div
            className={`absolute inset-x-3 bottom-3 hidden translate-y-4 gap-2 opacity-0 transition-all duration-500 ease-out [@media(hover:hover)_and_(min-width:768px)]:flex [@media(hover:hover)_and_(min-width:768px)]:group-hover:translate-y-0 [@media(hover:hover)_and_(min-width:768px)]:group-hover:opacity-100 [@media(hover:hover)_and_(min-width:768px)]:group-focus-within:translate-y-0 [@media(hover:hover)_and_(min-width:768px)]:group-focus-within:opacity-100`}
          >
            {addToCartButton("flex-1 px-3 py-2.5")}
            <Link
              href={href}
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-medium text-[#1c1c1c] shadow-sm transition hover:bg-[#f7f5f2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              View
            </Link>
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-4 flex flex-1 flex-col">
          <h3 className="font-playfair text-lg leading-snug text-[#1c1c1c]">
            <Link
              href={href}
              className="line-clamp-2 transition-colors hover:text-[var(--brand-gold)]"
            >
              {product.productName}
            </Link>
          </h3>

          {product.shortDescription && (
            <p className="mt-1 line-clamp-2 text-sm leading-snug text-amber-700">
              {product.shortDescription}
            </p>
          )}

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-base font-semibold text-[#1c1c1c]">
              {formatPrice(product.price)}
            </span>
            {product.mrp > product.price && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.mrp)}
              </span>
            )}
          </div>

          {/* ALWAYS-VISIBLE ACTIONS (phones, touch tablets) */}
          <div
            className={`mt-auto flex flex-col gap-1 pt-4 [@media(hover:hover)_and_(min-width:768px)]:hidden`}
          >
            {addToCartButton("h-11 w-full")}
            <Link
              href={href}
              className="inline-flex h-11 items-center justify-center gap-1.5 text-sm text-[var(--text-body)] underline underline-offset-4 transition-colors hover:text-[var(--brand-gold)]"
            >
              View Product
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
