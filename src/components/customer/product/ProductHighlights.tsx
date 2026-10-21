import { Droplets, Flame, Leaf, Recycle, type LucideIcon } from "lucide-react";
import {
  PRODUCT_HIGHLIGHTS,
  type HighlightIcon,
} from "@/config/purchaseBox.config";

const ICONS: Record<HighlightIcon, LucideIcon> = {
  oils: Droplets,
  eco: Leaf,
  burn: Flame,
  jar: Recycle,
};

/** Static (server-rendered): the four product highlights. */
export default function ProductHighlights() {
  return (
    <section aria-labelledby="product-highlights-heading">
      <h2
        id="product-highlights-heading"
        className="mb-4 font-playfair text-xl text-[#1c1c1c]"
      >
        Product Highlights
      </h2>

      <ul className="grid grid-cols-1 gap-x-6 gap-y-3.5 min-[400px]:grid-cols-2 md:grid-cols-1 min-[1100px]:grid-cols-2">
        {PRODUCT_HIGHLIGHTS.map(({ icon, label }) => {
          const Icon = ICONS[icon];
          return (
            <li
              key={icon}
              className="flex items-center gap-3 font-epilogue text-sm text-[var(--text-body)]"
            >
              <Icon
                aria-hidden="true"
                className="h-[18px] w-[18px] shrink-0 text-[var(--brand-gold)]"
                strokeWidth={1.5}
              />
              {label}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
