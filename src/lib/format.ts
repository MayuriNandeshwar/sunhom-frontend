const inr = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

/** Formats a number as Indian rupees, e.g. 1499 -> "₹1,499". */
export function formatPrice(value: number): string {
  return `₹${inr.format(Math.round(value))}`;
}
