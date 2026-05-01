"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ExperienceGlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[560px] md:h-[700px] overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/photo/coffee-banner.png"
        alt="SUNHOM lifestyle ambience"
        fill
        priority
        className="object-cover"
      />

      {/* LEFT SIDE GLASS CARD */}
      <div className="absolute inset-0 flex items-center justify-start px-6 md:px-20">
        <div
          className={`
            max-w-md rounded-3xl p-10 md:p-14
            bg-white/20 backdrop-blur-xl
            border border-white/40
            shadow-2xl
            transition-all duration-1000 ease-out
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
          `}
        >
          <h2 className="font-playfair text-3xl md:text-4xl text-white mb-5">
            For Conversations That Linger
          </h2>

          <p className="font-epilogue text-base md:text-lg text-white/90 leading-relaxed mb-4">
            Deep roasted warmth meets soft ambient glow - designed to hold
            moments a little longer.
          </p>

          <p className="font-epilogue text-base text-white/90 leading-relaxed mb-2">
            An atmosphere that invites connection and quiet presence.
          </p>

          <p className="font-epilogue text-base text-white/90 leading-relaxed mb-8">
            Crafted to enrich spaces with understated elegance.
          </p>

          <Link
            href="/collections/signature-candle-collection"
            className="px-12 py-4 rounded-full bg-amber-600 text-white font-semibold 
                                hover:bg-amber-700 hover:scale-105 shadow-xl hover:shadow-2xl 
                                transition-all duration-300">
            
            Explore SUNHOM →
          </Link>
        </div>
      </div>
    </section>
  );
}