"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function MeaningSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-12 md:py-12"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* FOUNDER IMAGE */}
          <div
            className={`relative transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative w-full h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/photo/founder.png"   // replace with your image path
                alt="Founder of SUNHOM"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* TEXT CONTENT */}
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="font-playfair text-3xl md:text-4xl text-amber-700 mb-6">
              The Meaning Behind SUNHOM
            </h2>

            <div className="w-20 h-[2px] bg-[#1F4D3B]/30 mb-8" />

            <div className="space-y-6">
              <p className="font-epilogue text-lg text-black mb-10 leading-relaxed">
                <b>SUNHOM</b> was founded on a simple belief — luxury should feel
                natural, refined, and accessible. It should not belong to a
                select few, but to everyone who values comfort and presence.
              </p>

              <p className="font-epilogue text-lg leading-relaxed text-black mb-10">
                Inspired by the idea that everyday spaces deserve thoughtful
                detail, the brand was created to offer premium ambience without
                excess or extravagance.
              </p>

              <p className="font-epilogue text-lg leading-relaxed text-black mb-10">
                From car diffusers and camphor sachets to soy wax candles,
                each product is crafted with clean ingredients and a
                commitment to quality — designed to bring quiet luxury
                into daily life.
              </p>

              <p className="font-epilogue text-lg leading-relaxed text-black mb-10">
                <b>SUNHOM</b> stands for confidence without noise —
                luxury that feels personal, honest, and within reach.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}