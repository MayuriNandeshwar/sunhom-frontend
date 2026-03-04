"use client";

import {
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";
import { PublicProduct } from "@/services/public/product.api";

export default function ProductGrid({
  products,
}: {
  products: PublicProduct[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      {/* SORT BAR */}
      <div className="flex justify-end items-center mb-10 border-b pb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            Sort By:
          </span>

          <select
            value={searchParams.get("sort") || ""}
            onChange={(e) =>
              handleSortChange(e.target.value)
            }
            className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none"
          >
            <option value="">Featured</option>
            <option value="price_asc">
              Price: Low to High
            </option>
            <option value="price_desc">
              Price: High to Low
            </option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No products found
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products.map((product) => (
            <LuxuryCard key={product.productId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- LUXURY CARD ---------------- */
function LuxuryCard({ product }: { product: PublicProduct }) {
  const [liked, setLiked] = useState(false);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block h-full"
    >
      <div className="flex flex-col h-full">

        {/* IMAGE */}
        <div className="relative rounded-2xl overflow-hidden bg-[#f5f3ef]">
          <div className="relative aspect-[4/5]">
            <Image
              src={product.imageUrl}
              alt={product.productName}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* DISCOUNT BADGE */}
            {product.discountPercentage > 0 && (
              <div className="absolute top-3 left-3 bg-white text-xs font-medium px-3 py-1 rounded-full shadow">
                {product.discountPercentage.toFixed(0)}% OFF
              </div>
            )}

            {/* WISHLIST */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setLiked(prev => !prev);
              }}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow"
            >
              <Heart
                className={`w-4 h-4 ${
                  liked
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600"
                }`}
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>

        {/* CONTENT */}
            <div className="flex flex-col flex-grow mt-4">

            {/* TITLE */}
            
            <h3 className="font-playfair text-lg text-[#1c1c1c] leading-tight min-h-[44px] mb-1">
            {product.productName}
            </h3>
            {/* DESCRIPTION */}
            
            <p className="text-sm text-amber-700 line-clamp-2 min-h-[34px] leading-snug">
            {product.shortDescription}
            </p>
            {/* PRICE + BUTTON */}
            <div className="mt-1 space-y-2">

                {/* PRICE */}
                <div>
                <span className="text-base font-semibold text-[#1c1c1c]">
                    ₹{product.price}
                </span>

                {product.mrp > product.price && (
                    <span className="ml-2 text-sm text-gray-400 line-through">
                    ₹{product.mrp}
                    </span>
                )}
                </div>

                {/* BUTTON */}
                <button
                onClick={(e) => {
                    e.preventDefault();
                    console.log("Add to cart", product.productId);
                }}
                disabled={!product.inStock}
                className={`
                    w-full py-2 rounded-full text-sm font-medium transition
                    ${
                    product.inStock
                        ? "bg-amber-600 text-white hover:bg-amber-700 shadow-sm"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }
                `}
                >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>

            </div>
            </div>
      </div>
    </Link>
  );
}