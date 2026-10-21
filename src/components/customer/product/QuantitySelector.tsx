"use client";

import { memo } from "react";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max: number;
  disabled?: boolean;
  /** Used in screen-reader labels, e.g. "Decrease quantity of Amber Glow". */
  productName: string;
  /** "compact" is a slightly smaller stepper for the sticky bar. */
  size?: "default" | "compact";
}

/**
 * [-] 1 [+] stepper. Pure and controlled: the parent owns the number, so one
 * selector can drive Add to Cart and Buy Now together.
 */
function QuantitySelectorBase({
  value,
  onChange,
  min = 1,
  max,
  disabled = false,
  productName,
  size = "default",
}: QuantitySelectorProps) {
  const atMin = value <= min;
  const atMax = value >= max;

  const compact = size === "compact";

  const stepBtn =
    `flex ${compact ? "h-10 w-10" : "h-11 w-11"} items-center justify-center text-[#1c1c1c] transition-colors hover:text-[var(--brand-gold)] focus-visible:outline-none focus-visible:text-[var(--brand-gold)] disabled:opacity-30 disabled:hover:text-[#1c1c1c]`;

  return (
    <div
      role="group"
      aria-label="Quantity"
      className={`inline-flex shrink-0 items-center rounded-full border border-[var(--border-soft)] bg-white transition-opacity focus-within:border-[var(--brand-gold)] ${
        disabled ? "opacity-50" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || atMin}
        aria-label={`Decrease quantity of ${productName}`}
        className={stepBtn}
      >
        <Minus className="h-4 w-4" />
      </button>

      <output
        aria-live="polite"
        aria-label={`Quantity: ${value}`}
        className={`${
          compact ? "w-8 text-sm" : "w-9 text-base"
        } select-none text-center font-medium tabular-nums text-[#1c1c1c]`}
      >
        {value}
      </output>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || atMax}
        aria-label={`Increase quantity of ${productName}`}
        className={stepBtn}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

const QuantitySelector = memo(QuantitySelectorBase);
export default QuantitySelector;
