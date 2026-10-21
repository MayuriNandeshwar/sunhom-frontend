"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const messages = [
  "Free Shipping on Orders Above ₹999",
  "Drive Collection — Premium Car Diffusers",
  "Pure Air Rituals — Natural Camphor Sachets",
  "Signature Candle Collection — Hand-Poured Soy Wax",
];

export default function UtilityBar() {
  const [visible, setVisible] = useState(true);

  /* Show only while hero is visible */
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-10 bg-[#014338] overflow-hidden">
      <Link href="/shop" className="flex h-full items-center">
        <div className="sunhom-track flex items-center">

          {/* LOOP 1 */}
          {messages.map((msg, i) => (
            <div key={`l1-${i}`} className="flex items-center">
              {i !== 0 && (
                <span className="text-white text-lg mx-6">•</span>
              )}
              <span className="mx-10 text-white text-sm font-medium whitespace-nowrap">
                {msg}
              </span>
            </div>
          ))}

          {/* LOOP 2 */}
          {messages.map((msg, i) => (
            <div key={`l2-${i}`} className="flex items-center">
              <span className="text-white text-lg mx-6">•</span>
              <span className="mx-10 text-white text-sm font-medium whitespace-nowrap">
                {msg}
              </span>
            </div>
          ))}

          {/* LOOP 3 */}
          {messages.map((msg, i) => (
            <div key={`l3-${i}`} className="flex items-center">
              <span className="text-white text-lg mx-6">•</span>
              <span className="mx-10 text-white text-sm font-medium whitespace-nowrap">
                {msg}
              </span>
            </div>
          ))}

        </div>
      </Link>
    </div>
  );
}