import { Check } from "lucide-react";
import { TRUST_BADGES } from "@/config/purchaseBox.config";

/** Static (server-rendered): quality ticks shown directly under the buttons. */
export default function TrustBadges() {
  return (
    <ul
      aria-label="Product qualities"
      className="grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4"
    >
      {TRUST_BADGES.map((label) => (
        <li
          key={label}
          className="flex items-center gap-2 font-epilogue text-[13px] leading-tight text-[var(--text-body)]"
        >
          <span
            aria-hidden="true"
            className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[var(--brand-gold)] text-[var(--brand-gold)]"
          >
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}
