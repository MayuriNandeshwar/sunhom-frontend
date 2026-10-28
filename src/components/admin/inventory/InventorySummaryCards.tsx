"use client";

import { Boxes, PackageCheck, AlertTriangle, AlertCircle } from "lucide-react";
import { AdminInventorySummary, StockStatus } from "@/services/admin.inventory.service";

interface Props {
  summary: AdminInventorySummary;
  activeFilter: StockStatus | "ALL";
  onSelectFilter: (filter: StockStatus | "ALL") => void;
}

export default function InventorySummaryCards({
  summary,
  activeFilter,
  onSelectFilter,
}: Props) {
  const cards = [
    {
      id: "ALL" as const,
      label: "Total Variants",
      value: summary.totalVariants,
      sublabel: `${summary.totalStockUnits.toLocaleString()} total units`,
      icon: Boxes,
      color: "text-blue-600 bg-blue-50 border-blue-200 hover:border-blue-300",
      activeRing: "ring-2 ring-blue-500",
      accent: "bg-blue-500",
    },
    {
      id: "IN_STOCK" as const,
      label: "In Stock",
      value: summary.inStockCount,
      sublabel: "Healthy inventory",
      icon: PackageCheck,
      color: "text-emerald-700 bg-emerald-50 border-emerald-200 hover:border-emerald-300",
      activeRing: "ring-2 ring-emerald-500",
      accent: "bg-emerald-500",
    },
    {
      id: "LOW_STOCK" as const,
      label: "Low Stock Alert",
      value: summary.lowStockCount,
      sublabel: "Below threshold",
      icon: AlertTriangle,
      color: "text-amber-700 bg-amber-50 border-amber-200 hover:border-amber-300",
      activeRing: "ring-2 ring-amber-500",
      accent: "bg-amber-500",
    },
    {
      id: "OUT_OF_STOCK" as const,
      label: "Out of Stock",
      value: summary.outOfStockCount,
      sublabel: "Requires restocking",
      icon: AlertCircle,
      color: "text-red-700 bg-red-50 border-red-200 hover:border-red-300",
      activeRing: "ring-2 ring-red-500",
      accent: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = activeFilter === card.id;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectFilter(card.id)}
            className={`
              text-left p-4 rounded-xl border bg-white shadow-sm transition-all relative overflow-hidden
              cursor-pointer hover:shadow-md
              ${isSelected ? `${card.activeRing} shadow-md` : "border-gray-200 hover:border-gray-300"}
            `}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {card.label}
              </span>
              <div className={`p-2 rounded-lg ${card.color}`}>
                <Icon size={18} />
              </div>
            </div>

            <div className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {card.value.toLocaleString()}
            </div>

            <div className="mt-1 text-xs text-gray-500 flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${card.accent}`} />
              {card.sublabel}
            </div>

            {isSelected && (
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 ${card.accent}`}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
