import { Star } from "lucide-react";

interface StarRatingProps {
  /** 0 to 5. Fractions are drawn as partly filled stars (4.7 = 4 and 7/10). */
  rating: number;
  /** Star size in px. */
  size?: number;
  className?: string;
  /** Hide from screen readers when the number is already shown as text. */
  decorative?: boolean;
}

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

/**
 * Read-only star rating. Static markup, so it works in server and client
 * components alike.
 */
export default function StarRating({
  rating,
  size = 16,
  className = "",
  decorative = false,
}: StarRatingProps) {
  const value = clamp(Number.isFinite(rating) ? rating : 0, 0, 5);
  const label = `Rated ${value.toFixed(1)} out of 5`;

  return (
    <span
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
      className={`inline-flex items-center gap-0.5 ${className}`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = clamp(value - i, 0, 1);
        return (
          <span
            key={i}
            className="relative inline-block shrink-0"
            style={{ width: size, height: size }}
          >
            {/* empty star */}
            <Star
              aria-hidden="true"
              width={size}
              height={size}
              strokeWidth={0}
              className="absolute inset-0 fill-[#DED6C8]"
            />
            {/* filled part, clipped to the fraction */}
            {fill > 0 && (
              <span
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${Math.round(fill * 1000) / 10}%` }}
              >
                <Star
                  aria-hidden="true"
                  width={size}
                  height={size}
                  strokeWidth={0}
                  className="max-w-none fill-[var(--brand-gold)]"
                />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
