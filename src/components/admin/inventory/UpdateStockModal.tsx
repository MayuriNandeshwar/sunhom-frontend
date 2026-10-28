"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Plus, Minus, Loader2, PackageCheck, AlertTriangle } from "lucide-react";
import {
  AdminInventoryItem,
  AdminInventoryUpdatePayload,
} from "@/services/admin.inventory.service";

interface Props {
  item: AdminInventoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (variantId: string, payload: AdminInventoryUpdatePayload) => Promise<void>;
}

const QUICK_REASONS = [
  "Restocked from vendor",
  "Physical inventory recount",
  "Damaged / expired units removed",
  "Customer return back into stock",
];

export default function UpdateStockModal({
  item,
  isOpen,
  onClose,
  onSave,
}: Props) {
  const [quantity, setQuantity] = useState<number>(0);
  const [threshold, setThreshold] = useState<number>(10);
  const [reason, setReason] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setQuantity(item.availableQuantity);
      setThreshold(item.lowStockThreshold || 10);
      setReason("");
      setError(null);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const currentQty = item.availableQuantity;
  const difference = quantity - currentQty;

  const handleAdjust = (delta: number) => {
    setQuantity((prev) => Math.max(0, prev + delta));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity < 0) {
      setError("Available quantity cannot be negative.");
      return;
    }
    if (threshold < 0) {
      setError("Threshold cannot be negative.");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      await onSave(item.variantId, {
        availableQuantity: quantity,
        lowStockThreshold: threshold,
        reason: reason.trim() || undefined,
      });
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update stock";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100 animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Adjust Inventory Stock</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Update real-time variant quantity & low-stock alert trigger
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
              <AlertTriangle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* ITEM SUMMARY CARD */}
          <div className="flex items-center gap-4 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 border">
              {item.thumbnail ? (
                <Image
                  src={item.thumbnail}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-semibold">
                  No Pic
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 truncate text-sm">
                {item.productName}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                <span className="font-mono bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-700 font-medium">
                  {item.sku}
                </span>
                {item.variantTitle && (
                  <span>• {item.variantTitle}</span>
                )}
                {item.sizeLabel && (
                  <span>• {item.sizeLabel}</span>
                )}
                {item.color && (
                  <span>• {item.color}</span>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500">Current Stock</div>
              <div className="text-lg font-bold text-gray-900">
                {item.availableQuantity}
              </div>
            </div>
          </div>

          {/* QUANTITY INPUT & QUICK BUTTONS */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
              New Available Stock
            </label>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleAdjust(-1)}
                className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-100 active:scale-95 transition text-gray-700 font-semibold"
              >
                <Minus size={18} />
              </button>

              <div className="relative flex-1">
                <input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full text-center text-2xl font-bold py-2 px-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition"
                />
                {difference !== 0 && (
                  <span
                    className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-0.5 rounded-full ${
                      difference > 0
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {difference > 0 ? `+${difference}` : difference}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleAdjust(1)}
                className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-100 active:scale-95 transition text-gray-700 font-semibold"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* QUICK STEPPERS */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-gray-500">Quick:</span>
              {[-10, +5, +10, +50, +100].map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => handleAdjust(step)}
                  className="text-xs font-medium px-2.5 py-1 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 transition"
                >
                  {step > 0 ? `+${step}` : step}
                </button>
              ))}
            </div>
          </div>

          {/* LOW STOCK THRESHOLD */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
              Low Stock Alert Threshold
            </label>
            <input
              type="number"
              min="0"
              value={threshold}
              onChange={(e) => setThreshold(Math.max(0, parseInt(e.target.value) || 0))}
              placeholder="e.g. 10"
              className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition"
            />
            <p className="text-[11px] text-gray-500">
              Triggers a "Low Stock" warning when available inventory drops to or below this number.
            </p>
          </div>

          {/* REASON / AUDIT NOTE */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
              Adjustment Reason (Audit Log)
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Received shipment from manufacturer batch #402"
              className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition"
            />

            {/* Quick Reason Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {QUICK_REASONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setReason(r)}
                  className="text-[11px] text-gray-600 bg-gray-100 hover:bg-amber-50 hover:text-amber-800 px-2.5 py-1 rounded-md transition border border-gray-200"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm transition active:scale-95 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <PackageCheck size={16} />
                  <span>Update Stock</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
