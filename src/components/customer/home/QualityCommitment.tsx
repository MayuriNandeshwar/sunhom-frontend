"use client";

import { useEffect, useState } from "react";
import {
  Leaf,
  Flame,
  Droplets,
  Package,
  Wind,
  ShieldCheck,
  Lock,
} from "lucide-react";

export default function QualitySection() {
  const qualities = [
    { icon: Leaf, label: "Clean Wax Formulation" },
    { icon: Flame, label: "Cotton Core Wicks" },
    { icon: Droplets, label: "Fine Fragrance Composition" },
    { icon: ShieldCheck, label: "Free From Paraffin" },
    { icon: Package, label: "Thoughtful Packaging" },
    { icon: Wind, label: "Balanced Scent Projection" },
    { icon: Lock, label: "Protected Checkout" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto slide for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % qualities.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="rounded-3xl bg-[#f8f1e9] border border-white/60 px-8 py-10 md:px-12 md:py-12">

          {/* HEADER */}
          <div className="text-center mb-10 max-w-3xl mx-auto">
            
             <h2 className="font-playfair text-3xl md:text-4xl text-amber-700 mb-6">
              Pure By Design
            </h2>

            <p className="font-epilogue text-lg text-black mb-10 leading-relaxed">
              Meticulously formulated fragrances created with clarity,
              intention, and enduring performance.
            </p>
          </div>

          {/* MOBILE AUTO SLIDER */}
          <div className="md:hidden relative h-[140px] flex items-center justify-center">
            {qualities.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`absolute transition-opacity duration-700 ${
                    activeIndex === index
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm">
                      <Icon
                        className="h-7 w-7 text-brand-primary"
                        strokeWidth={2.5}
                      />
                    </div>
                    <p className="font-epilogue text-sm text-black leading-relaxed">
                      {item.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DESKTOP GRID */}
          <div className="hidden md:grid md:grid-cols-7 gap-10">
            {qualities.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm">
                    <Icon
                      className="h-7 w-7 text-brand-primary"
                      strokeWidth={2.5}
                    />
                  </div>
                  <p className="font-epilogue text-sm text-black leading-relaxed">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}