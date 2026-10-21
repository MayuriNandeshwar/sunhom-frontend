"use client";

import React from "react";
import SunhomSpinner, { SpinnerSize, SpinnerSpeed } from "./SunhomSpinner";

export type LoaderVariant = "fullscreen" | "page" | "centered" | "inline";

interface SunhomLoaderProps {
  variant?: LoaderVariant;
  size?: SpinnerSize;
  speed?: SpinnerSpeed;
  glow?: boolean;
  text?: string;
  subtext?: string;
  className?: string;
}

export default function SunhomLoader({
  variant = "centered",
  size,
  speed = "normal",
  glow = true,
  text,
  subtext,
  className = "",
}: SunhomLoaderProps) {
  // Full-Screen Luxury Overlay
  if (variant === "fullscreen") {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center 
                   bg-[#F9F6F1]/85 backdrop-blur-md transition-all duration-300 ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label="Loading"
      >
        <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/70 shadow-2xl border border-[var(--border-soft)]/60 max-w-sm w-full mx-4 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="relative mb-5 flex items-center justify-center">
            {/* Ambient golden aura behind rotating sun */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 to-yellow-400/30 blur-xl scale-125 pointer-events-none" />
            <SunhomSpinner
              size={size || "2xl"}
              speed={speed}
              glow={glow}
              className="relative z-10"
            />
          </div>

          <span className="font-playfair font-semibold text-lg tracking-[0.2em] text-[var(--text-heading)] uppercase mb-1">
            SUNHOM
          </span>

          <p className="font-epilogue text-xs tracking-widest uppercase text-[var(--brand-gold)] font-medium mb-2">
            Enduring Ambience
          </p>

          {text && (
            <p className="font-epilogue text-sm text-[var(--text-body)] mt-1 animate-pulse">
              {text}
            </p>
          )}

          {subtext && (
            <p className="font-epilogue text-xs text-[var(--text-muted)] mt-1">
              {subtext}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Page-level loader (e.g. Next.js loading.tsx)
  if (variant === "page") {
    return (
      <main
        className={`min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 ${className}`}
        aria-busy="true"
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 to-yellow-400/20 blur-xl scale-125 pointer-events-none" />
            <SunhomSpinner
              size={size || "3xl"}
              speed={speed}
              glow={glow}
              className="relative z-10"
            />
          </div>

          <h2 className="font-playfair text-xl tracking-[0.15em] text-[var(--text-heading)] font-semibold uppercase mb-1">
            SUNHOM
          </h2>

          <p className="font-epilogue text-xs tracking-widest uppercase text-[var(--brand-gold)] font-medium mb-3">
            Enduring Ambience
          </p>

          <p className="font-epilogue text-sm text-[var(--text-muted)] max-w-xs animate-pulse">
            {text || "Crafting your sensory experience…"}
          </p>
        </div>
      </main>
    );
  }

  // Inline loader for buttons or small widgets
  if (variant === "inline") {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <SunhomSpinner size={size || "sm"} speed={speed} glow={glow} />
        {text && <span className="text-sm font-medium">{text}</span>}
      </span>
    );
  }

  // Centered in card or container
  return (
    <div
      className={`flex flex-col items-center justify-center py-10 px-4 text-center ${className}`}
      aria-busy="true"
    >
      <SunhomSpinner
        size={size || "lg"}
        speed={speed}
        glow={glow}
        className="mb-3"
      />
      {text && (
        <p className="font-epilogue text-sm text-[var(--text-body)] animate-pulse">
          {text}
        </p>
      )}
      {subtext && (
        <p className="font-epilogue text-xs text-[var(--text-muted)] mt-1">
          {subtext}
        </p>
      )}
    </div>
  );
}
