/**
 * Product page purchase-box content (single place to tune the copy).
 *
 * Delivery and return lines mirror /shipping-policy and /refund-policy.
 * If those pages change, update the wording here.
 */

import { FREE_SHIPPING_THRESHOLD } from "@/config/cart.config";
import { formatPrice } from "@/lib/format";

/** Short quality marks shown as ticks directly under the buttons. */
export const TRUST_BADGES = [
  "Hand Poured",
  "Soy Wax",
  "Long Lasting",
  "Made In India",
] as const;

export type DeliveryIcon = "shipping" | "dispatch" | "returns";

export interface DeliveryInfoRow {
  icon: DeliveryIcon;
  title: string;
  detail: string;
}

export const DELIVERY_INFO: readonly DeliveryInfoRow[] = [
  {
    icon: "shipping",
    title: `Free Shipping above ${formatPrice(FREE_SHIPPING_THRESHOLD)}`,
    detail: "Shipping is calculated at checkout on smaller orders.",
  },
  {
    icon: "dispatch",
    title: "Dispatch in 1–2 Days",
    detail: "Usually delivered within 3–5 business days.",
  },
  {
    icon: "returns",
    title: "Easy Replacement for Damaged Products",
    detail: "Report an issue within 3 days of delivery.",
  },
];

export type HighlightIcon = "oils" | "eco" | "burn" | "jar";

export interface ProductHighlight {
  icon: HighlightIcon;
  label: string;
}

export const PRODUCT_HIGHLIGHTS: readonly ProductHighlight[] = [
  { icon: "oils", label: "Premium Fragrance Oils" },
  { icon: "eco", label: "Eco Friendly" },
  { icon: "burn", label: "Clean Burn" },
  { icon: "jar", label: "Reusable Jar" },
];
