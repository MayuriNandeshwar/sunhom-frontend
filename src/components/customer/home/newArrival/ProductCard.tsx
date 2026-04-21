'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { NewArrivalProduct } from '@/lib/api/products/newArrival.service';

export default function ProductCard({ product }: { product: NewArrivalProduct }) {

  const primaryImage = product.imageUrl;
  const hoverImage = product.hoverImageUrl || product.imageUrl;

  const [liked, setLiked] = useState(false);

  return (
    <Link href={`/collections/${product.categorySlug}/${product.slug}`} className="group block">
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col h-full">

        {/* IMAGE */}
        <div className="relative h-[380px] bg-[#f5f3ef] overflow-hidden">

          <Image
            src={primaryImage}
            alt={product.productName}
            fill
            className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
          />

          <Image
            src={hoverImage}
            alt={product.productName}
            fill
            className="object-cover absolute inset-0 opacity-0
                       transition-opacity duration-700
                       group-hover:opacity-100"
          />

          {/* SAVE Ribbon only if discount > 0 */}
          {product.discountPercentage > 0 && (
            <div className="absolute top-5 left-[-52px]
                            rotate-[-45deg]
                            bg-[#014a2c]
                            text-white
                            text-[12px]
                            tracking-[0.2em]
                            font-medium
                            px-16 py-1.5">
              SAVE {product.discountPercentage.toFixed(0)}%
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setLiked(prev => !prev);
            }}
            className="absolute top-5 right-5
                       w-10 h-10 rounded-full
                       bg-white/80 backdrop-blur
                       border border-gray-200
                       flex items-center justify-center
                       hover:scale-105 transition"
          >
            <Heart
              className={liked
                ? 'fill-[#c2461d] text-[#c2461d]'
                : 'fill-none text-gray-600'}
              strokeWidth={1.6}
            />
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-6 flex flex-col gap-3 min-h-[170px] text-left">

          <h3 className="font-playfair text-xl text-[#1c1c1c] leading-snug line-clamp-2">
            {product.productName}
          </h3>

          {product.shortDescription && (
            <p className="text-sm text-amber-700 line-clamp-2 min-h-[42px]">
              {product.shortDescription}
            </p>
          )}

          <div className="mt-auto flex items-center gap-4">
            <span className="text-lg font-medium text-[#1c1c1c]">
              ₹{product.price}
            </span>

            {product.mrp > product.price && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.mrp}
              </span>
            )}
          </div>
        </div>

      </div>
    </Link>
  );
}