"use client";

import Image from "next/image";
import { SlidersHorizontal, AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
import { AdminInventoryItem, StockStatus } from "@/services/admin.inventory.service";

interface Props {
  items: AdminInventoryItem[];
  onEdit: (item: AdminInventoryItem) => void;
}

export default function MobileInventoryList({ items, onEdit }: Props) {
  const getStatusBadge = (status: StockStatus) => {
    switch (status) {
      case "IN_STOCK":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={11} className="text-emerald-600" />
            In Stock
          </span>
        );
      case "LOW_STOCK":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle size={11} className="text-amber-600" />
            Low Stock
          </span>
        );
      case "OUT_OF_STOCK":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
            <AlertCircle size={11} className="text-red-600" />
            Out of Stock
          </span>
        );
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.variantId}
          className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm space-y-3"
        >
          {/* TOP ROW: THUMBNAIL + NAME + BADGE */}
          <div className="flex items-start gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
              {item.thumbnail ? (
                <Image
                  src={item.thumbnail}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                  No Pic
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                  {item.productName}
                </h3>
                {getStatusBadge(item.stockStatus)}
              </div>

              <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs text-gray-500">
                <span className="font-mono bg-gray-50 px-1.5 py-0.5 rounded border text-[11px] text-gray-700">
                  {item.sku}
                </span>
                {item.variantTitle && <span>• {item.variantTitle}</span>}
                {item.fragrance && <span>• {item.fragrance}</span>}
                {item.weightGrams && <span>• {item.weightGrams}g</span>}
              </div>
            </div>
          </div>

          {/* STOCK STATS ROW */}
          <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-gray-50 rounded-lg text-center border border-gray-100">
            <div>
              <div className="text-[10px] uppercase font-semibold text-gray-500">
                Available
              </div>
              <div className="text-sm font-bold text-gray-900">
                {item.availableQuantity}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-semibold text-gray-500">
                Reserved
              </div>
              <div className="text-sm font-semibold text-gray-600">
                {item.reservedQuantity}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-semibold text-gray-500">
                Threshold
              </div>
              <div className="text-sm font-semibold text-gray-600">
                {item.lowStockThreshold}
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: PRICE + ADJUST BUTTON */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-bold text-gray-900">
              ₹{Number(item.price).toLocaleString("en-IN")}
            </span>

            <button
              onClick={() => onEdit(item)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition active:scale-95"
            >
              <SlidersHorizontal size={13} />
              <span>Adjust Stock</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
