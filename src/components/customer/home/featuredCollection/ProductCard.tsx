'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BestsellerProduct } from '@/lib/api/products/bestseller.service'

export default function ProductCard({ product }: { product: BestsellerProduct }) {

  const router = useRouter()

  const primaryImage = product.imageUrl
  const hoverImage = product.hoverImageUrl || product.imageUrl

  const [liked, setLiked] = useState(false)
  const [mobilePreview, setMobilePreview] = useState(false)

  const handleClick = (e: React.MouseEvent) => {

    const isMobile = window.innerWidth < 768

    if (isMobile) {
      e.preventDefault()

      if (!mobilePreview) {
        setMobilePreview(true)
        return
      }

      router.push(`/collections/${product.categorySlug}/${product.slug}`)
    }
  }

  return (
    <Link
      href={`/collections/${product.categorySlug}/${product.slug}`}
      onClick={handleClick}
      className="group block"
    >

      <div
        className="
          bg-white rounded-3xl overflow-hidden
          shadow-sm hover:shadow-md
          transition-all duration-500
          flex flex-col h-full
        "
      >

        {/* IMAGE */}
        <div className="relative h-[380px] overflow-hidden bg-[#f5f3ef]">

          {/* Primary */}
          <Image
            src={primaryImage}
            alt={product.productName}
            fill
            className="
              object-cover
              transition-transform duration-[1200ms] ease-out
              group-hover:scale-[1.04]
            "
          />

          {/* Hover */}
          <Image
            src={hoverImage}
            alt={product.productName}
            fill
            className={`
              object-cover absolute inset-0
              transition-opacity duration-[900ms] ease-out
              ${mobilePreview ? 'opacity-100' : 'opacity-0'}
              group-hover:opacity-100
            `}
          />

          {/* SAVE RIBBON */}
          {product.discountPercentage > 0 && (
            <div
              className="
                absolute top-5 left-[-52px]
                rotate-[-45deg]
                bg-[#014a2c]
                text-white
                text-[12px]
                tracking-[0.2em]
                font-medium
                px-16 py-1.5
                shadow-sm
              "
            >
              SAVE {product.discountPercentage.toFixed(0)}%
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setLiked(prev => !prev)
            }}
            className="
              absolute top-5 right-5
              w-10 h-10 rounded-full
              bg-white/80 backdrop-blur
              border border-gray-200
              flex items-center justify-center
              transition-all duration-300
              hover:scale-105
            "
          >
            <Heart
              className={`
                w-5 h-5 transition-all duration-300
                ${liked
                  ? 'fill-[#c2461d] text-[#c2461d]'
                  : 'fill-none text-gray-600'}
              `}
              strokeWidth={1.6}
            />
          </button>

        </div>

        {/* CONTENT */}
        <div className="px-6 py-6 flex flex-col gap-3 min-h-[170px] text-left">

          <h3
            className="
              font-playfair
              text-xl
              text-[#1c1c1c]
              leading-snug
              line-clamp-2
              transition-colors duration-300
              group-hover:text-[#2a2a2a]
            "
          >
            {product.productName}
          </h3>

          {product.shortDescription && (
            <p className="text-sm text-amber-700 leading-relaxed line-clamp-2 min-h-[42px]">
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
  )
}