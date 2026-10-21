import { Package, RotateCcw, Truck, type LucideIcon } from "lucide-react";
import { DELIVERY_INFO, type DeliveryIcon } from "@/config/purchaseBox.config";

const ICONS: Record<DeliveryIcon, LucideIcon> = {
  shipping: Truck,
  dispatch: Package,
  returns: RotateCcw,
};

/** Static (server-rendered): delivery, dispatch and replacement information. */
export default function DeliveryInfo() {
  return (
    <ul className="divide-y divide-[var(--border-soft)] rounded-2xl border border-[var(--border-soft)] bg-white/70">
      {DELIVERY_INFO.map(({ icon, title, detail }) => {
        const Icon = ICONS[icon];
        return (
          <li key={icon} className="flex items-start gap-4 px-4 py-4 sm:px-5">
            <Icon
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-gold)]"
              strokeWidth={1.5}
            />
            <div className="min-w-0">
              <p className="font-epilogue text-sm font-medium leading-snug text-[#1c1c1c]">
                {title}
              </p>
              <p className="mt-0.5 font-epilogue text-xs leading-relaxed text-[var(--text-muted)]">
                {detail}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
