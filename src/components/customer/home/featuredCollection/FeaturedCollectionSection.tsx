'use client';

import { useEffect, useRef, useState } from 'react';
import { productService, BestsellerProduct } from '@/lib/api/products/bestseller.service';
import ProductCard from './ProductCard';
import Link from 'next/link';

export default function FeaturedCollectionSection() {
  const [products, setProducts] = useState<BestsellerProduct[]>([]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    productService.getBestsellers().then(res => {
      setProducts(res.data);
    });
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollerRef.current) return;

    const scrollAmount = scrollerRef.current.clientWidth * 0.9;

    scrollerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const canSlide = products.length > 1;

  return (
    <section className="py-12 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl text-amber-700 mb-6">
            Our Most Loved 
          </h2>

          <p className="font-epilogue text-lg text-black mb-10 leading-relaxed">
            Discover our most loved creations — from the refined calm of the 
            <span className="font-medium"> Signature Candle Collection</span>, 
            to the elegance of the 
            <span className="font-medium"> Drive Collection</span>, 
            and the purity of 
            <span className="font-medium"> Pure Air Rituals</span>.
            Crafted to transform every space into a sensory experience.
          </p>
        </div>

        {/* SLIDER */}
        <div className="relative">

          {canSlide && (
            <button
              onClick={() => scroll('left')}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2
              z-10 w-10 h-10 bg-white rounded-full shadow items-center justify-center"
            >
              ‹
            </button>
          )}

          {canSlide && (
            <button
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2
              z-10 w-10 h-10 bg-white rounded-full shadow items-center justify-center"
            >
              ›
            </button>
          )}

          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-1"
          >
            {products.map(product => (
              <div
                key={product.productId}
                className="min-w-[80%] sm:min-w-[45%] md:min-w-[30%]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}