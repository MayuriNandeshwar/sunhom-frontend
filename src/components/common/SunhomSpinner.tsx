"use client";

import React from "react";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | number;
export type SpinnerSpeed = "normal" | "slow" | "fast";

interface SunhomSpinnerProps {
  size?: SpinnerSize;
  speed?: SpinnerSpeed;
  glow?: boolean;
  className?: string;
  alt?: string;
}

const SIZE_MAP: Record<string, number> = {
  xs: 18,
  sm: 24,
  md: 34,
  lg: 44,
  xl: 56,
  "2xl": 72,
  "3xl": 96,
};

const SPEED_MAP: Record<SpinnerSpeed, string> = {
  fast: "0.9s",
  normal: "1.4s",
  slow: "2.4s",
};

export default function SunhomSpinner({
  size = "md",
  speed = "normal",
  glow = false,
  className = "",
  alt = "Loading SUNHOM…",
}: SunhomSpinnerProps) {
  const pixelSize = typeof size === "number" ? size : SIZE_MAP[size] || 34;
  const duration = SPEED_MAP[speed] || "1.4s";

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 select-none pointer-events-none relative ${
        glow ? "filter drop-shadow-[0_0_10px_rgba(222,162,76,0.65)]" : ""
      } ${className}`}
      style={{
        width: pixelSize,
        height: pixelSize,
      }}
      role="status"
      aria-label={alt}
    >
      {/* Embedded style tag guarantees keyframe existence in all contexts */}
      <style>{`
        @keyframes sunhom-spin-clockwise-direct {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Direct image element with explicit un-overridable clockwise CSS animation */}
      <img
        src="/logo/sunhom-symbol.png"
        alt={alt}
        width={pixelSize}
        height={pixelSize}
        className="sunhom-spin-element w-full h-full object-contain block"
        style={{
          animation: `sunhom-spin-clockwise-direct ${duration} linear infinite`,
          transformOrigin: "50% 50%",
          willChange: "transform",
          display: "block",
        }}
      />
    </span>
  );
}
