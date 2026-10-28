"use client";

import Image from "next/image";
import { SlidersHorizontal, AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
import { AdminInventoryItem, StockStatus } from "@/services/admin.inventory.service";

interface Props {
  items: AdminInventoryItem[];
  onEdit: (item: AdminInventoryItem) => void;
}

export default function InventoryTable({ items, onEdit }: Props) {
  const getStatusBadge = (status: StockStatus) => {
    switch (status) {
      case "IN_STOCK":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={13} className="text-emerald-600" />
            In Stock
          </span>
        );
      case "LOW_STOCK":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle size={13} className="text-amber-600" />
            Low Stock
          </span>
        );
      case "OUT_OF_STOCK":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            <AlertCircle size={13} className="text-red-600" />
            Out of Stock
          </span>
        );
    }
  };

  const formatDate = (isoStr: string) => {
    if (!isoStr) return "-";
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          {/* THEAD */}
          <thead className="bg-gray-50/80 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4 pl-6">Product & Variant</th>
              <th className="py-3.5 px-4">SKU</th>
              <th className="py-3.5 px-4 text-right">Price</th>
              <th className="py-3.5 px-4 text-center">Available</th>
              <th className="py-3.5 px-4 text-center">Reserved</th>
              <th className="py-3.5 px-4 text-center">Threshold</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 text-center">Last Updated</th>
              <th className="py-3.5 px-4 pr-6 text-right">Action</th>
            </tr>
          </thead>

          {/* TBODY */}
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => {
              const isLow = item.stockStatus === "LOW_STOCK";
              const isOut = item.stockStatus === "OUT_OF_STOCK";

              return (
                <tr
                  key={item.variantId}
                  className="hover:bg-amber-50/30 transition-colors group"
                >
                  {/* PRODUCT */}
                  <td className="py-3.5 px-4 pl-6">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                        {item.thumbnail ? (
                          <Image
                            src={item.thumbnail}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400 font-medium">
                            No Img
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 group-hover:text-amber-800 transition">
                          {item.productName}
                        </div>
                        <div className="text-xs text-gray-500 flex flex-wrap items-center gap-1.5 mt-0.5">
                          {item.variantTitle && (
                            <span className="font-medium text-gray-700">
                              {item.variantTitle}
                            </span>
                          )}
                          {item.fragrance && (
                            <span>• {item.fragrance}</span>
                          )}
                          {item.weightGrams && (
                            <span>• {item.weightGrams}g</span>
                          )}
                          {item.sizeLabel && (
                            <span>• {item.sizeLabel}</span>
                          )}
                          {item.color && (
                            <span>• {item.color}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* SKU */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-xs bg-gray-50 px-2 py-1 rounded border border-gray-200 text-gray-700 font-medium">
                      {item.sku}
                    </span>
                  </td>

                  {/* PRICE */}
                  <td className="py-3.5 px-4 text-right font-medium text-gray-800">
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </td>

                  {/* AVAILABLE */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`font-bold text-sm px-2.5 py-1 rounded-lg ${
                        isOut
                          ? "bg-red-100 text-red-800"
                          : isLow
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-50 text-emerald-800"
                      }`}
                    >
                      {item.availableQuantity}
                    </span>
                  </td>

                  {/* RESERVED */}
                  <td className="py-3.5 px-4 text-center text-gray-500 font-medium">
                    {item.reservedQuantity}
                  </td>

                  {/* THRESHOLD */}
                  <td className="py-3.5 px-4 text-center text-gray-500 font-medium">
                    {item.lowStockThreshold}
                  </td>

                  {/* STATUS */}
                  <td className="py-3.5 px-4 text-center">
                    {getStatusBadge(item.stockStatus)}
                  </td>

                  {/* UPDATED AT */}
                  <td className="py-3.5 px-4 text-center text-xs text-gray-500">
                    {formatDate(item.updatedAt)}
                  </td>

                  {/* ACTION */}
                  <td className="py-3.5 px-4 pr-6 text-right">
                    <button
                      onClick={() => onEdit(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white hover:bg-amber-50 hover:text-amber-800 border border-gray-300 rounded-lg shadow-sm transition active:scale-95"
                    >
                      <SlidersHorizontal size={13} />
                      <span>Adjust</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
