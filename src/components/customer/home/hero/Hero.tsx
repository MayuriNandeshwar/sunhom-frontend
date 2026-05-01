"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import HeroSlider from "./HeroSlider";

interface Slide {
  id: number;
  desktopImage: string;
  mobileImage: string;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    id: 1,
    desktopImage: "/hero/hero-1D.png",
    mobileImage: "/hero/hero-1M.png",
    title: "Scented Rituals for Everyday Luxury",
    subtitle:
      "Candles, sachets, and car fragrances crafted to elevate the spaces you live in."
  },
  {
    id: 2,
    desktopImage: "/hero/hero-2D.png",
    mobileImage: "/hero/hero-2M.png",
    title: "A Fragrance for Serene Evenings",
    subtitle:
      "Thoughtfully composed scents to accompany reflection, warmth, and togetherness this Ramadan."
  },
  {
    id: 3,
    desktopImage: "/hero/hero-3D.png",
    mobileImage: "/hero/hero-3M.png",
    title: "Celebrate in Color. Celebrate in Scent.",
    subtitle:
      "Vibrant limited-edition fragrances inspired by the joy and spirit of Holi."
  }
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);

  /* =============================
     AUTO SLIDE (Always Active)
     ============================= */
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const active = slides[activeIndex];

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  /* =============================
     MOBILE SWIPE
     ============================= */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();

    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full h-[85vh] md:h-screen overflow-hidden bg-black"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Slider */}
      <HeroSlider
        slides={slides}
        activeIndex={activeIndex}
        direction={direction}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center">
        <div className="max-w-2xl">
          <motion.h1
            key={active.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-white text-4xl md:text-6xl leading-[1.15] mb-6"
          >
            {active.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white/85 text-base md:text-xl leading-relaxed mb-10"
          >
            {active.subtitle}
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/collections/signature-candle-collection">
              <button className="px-12 py-4 rounded-full bg-amber-600 text-white font-semibold 
                                hover:bg-amber-700 hover:scale-105 shadow-xl hover:shadow-2xl 
                                transition-all duration-300">
                Shop Collections
              </button>
            </Link>

            <Link href="/collections/signature-candle-collection">
              <button className="px-12 py-4 rounded-full border-2 border-white text-white font-semibold 
                                hover:bg-white hover:text-gray-900 hover:scale-105 
                                backdrop-blur-sm bg-white/10 transition-all duration-300">
                Explore Scents
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === activeIndex
                ? "w-10 bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}