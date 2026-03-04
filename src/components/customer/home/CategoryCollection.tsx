"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const categories = [
  {
    title: "Signature Candles",
    image: "/category/candle.png",
    href: "/collections/candle",
    comingSoon: false,
  },
  {
    title: "Drive Collection",
    image: "/category/drive.png",
    href: "/collections/drive",
    comingSoon: true,
  },
  {
    title: "Pure Air Rituals",
    image: "/category/sachet.png",
    href: "/collections/ritual",
    comingSoon: true,
  },
];

export default function CategorySection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-12 bg-[var(--bg-primary)] border-t border-[var(--border-soft)]">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl text-amber-700 mb-6">
            Our Collections
          </h2>

          <p className="font-epilogue text-lg text-black mb-10 leading-relaxed">
            Discover fragrance experiences crafted for home, car, and personal spaces.
            Designed with intention. Made to linger.
          </p>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-3 gap-10">
          {categories.map((cat, index) => {
            const Wrapper = cat.comingSoon ? "div" : Link;

            return (
              <Wrapper
                key={index}
                {...(!cat.comingSoon && { href: cat.href })}
                className={`relative group ${
                  cat.comingSoon ? "cursor-not-allowed" : ""
                }`}
              >
                <div className="overflow-hidden rounded-3xl lux-card">
                  <div className="relative h-[450px] w-full overflow-hidden">

                    {/* IMAGE */}
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className={`object-cover transition duration-700 ease-out
                        ${
                          cat.comingSoon
                            ? "brightness-50 saturate-90"
                            : "group-hover:scale-[1.05]"
                        }`}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* COMING SOON OVERLAY */}
                    {cat.comingSoon && (
                      <>
                        <div className="absolute inset-0 bg-black/50 z-10" />

                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
                          <h2 className="text-xl md:text-xl font-playfair text-white mb-4">
                            {cat.title}
                          </h2>

                          <div className="w-16 h-[2px] bg-[var(--brand-gold)] mb-4"></div>

                          <h2 className="text-xl md:text-xl uppercase tracking-[0.25em] text-[var(--brand-gold)]">
                            Launching Soon
                          </h2>
                        </div>
                      </>
                    )}

                    {/* ACTIVE CATEGORY TITLE */}
                    {!cat.comingSoon && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute bottom-8 left-8">
                          <h3 className="text-xl font-playfair text-[#FDFCF9]">
                            {cat.title}
                          </h3>
                        </div>
                      </>
                    )}

                  </div>
                </div>
              </Wrapper>
            );
          })}
        </div>

        {/* MOBILE VERSION */}
        <div className="md:hidden mt-4">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
          >
            {categories.map((cat, index) => (
              <div
                key={index}
                className={`min-w-[85%] relative ${
                  cat.comingSoon ? "cursor-not-allowed" : ""
                }`}
              >
                <div className="overflow-hidden rounded-3xl lux-card">
                  <div className="relative h-[420px] w-full overflow-hidden">

                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className={`object-cover transition duration-700 ease-out
                        ${
                          cat.comingSoon
                            ? "brightness-50 saturate-90"
                            : ""
                        }`}
                    />

                    {cat.comingSoon && (
                      <>
                        <div className="absolute inset-0 bg-black/50 z-10" />

                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                          <h2 className="text-xl font-playfair text-white mb-3">
                            {cat.title}
                          </h2>

                          <div className="w-14 h-[2px] bg-[var(--brand-gold)] mb-3"></div>

                          <h2 className="text-sm uppercase tracking-[0.25em] text-[var(--brand-gold)]">
                            Launching Soon
                          </h2>
                        </div>
                      </>
                    )}

                    {!cat.comingSoon && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute bottom-6 left-6">
                          <h3 className="text-xl font-playfair text-[#FDFCF9]">
                            {cat.title}
                          </h3>
                        </div>
                      </>
                    )}

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}