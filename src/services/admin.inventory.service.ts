import api from "@/lib/axios";

export type StockStatus = "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";

export interface AdminInventoryItem {
  inventoryId: string;
  variantId: string;
  productId: string;
  productName: string;
  sku: string;
  variantTitle?: string;
  fragrance?: string;
  color?: string;
  sizeLabel?: string;
  weightGrams?: number;
  price: number;
  thumbnail?: string;
  availableQuantity: number;
  reservedQuantity: number;
  lowStockThreshold: number;
  stockStatus: StockStatus;
  updatedAt: string;
}

export interface AdminInventorySummary {
  totalVariants: number;
  totalStockUnits: number;
  inStockCount: number;
  lowStockCount: number;
  outOfStockCount: number;
}

export interface AdminInventoryUpdatePayload {
  availableQuantity: number;
  lowStockThreshold?: number;
  reason?: string;
}

export const adminInventoryService = {
  async getAll(): Promise<AdminInventoryItem[]> {
    const res = await api.get("/api/admin/inventory");
    return res.data;
  },

  async getSummary(): Promise<AdminInventorySummary> {
    const res = await api.get("/api/admin/inventory/summary");
    return res.data;
  },

  async updateStock(
    variantId: string,
    payload: AdminInventoryUpdatePayload
  ): Promise<AdminInventoryItem> {
    const res = await api.put(`/api/admin/inventory/${variantId}`, payload);
    return res.data;
  },
};
