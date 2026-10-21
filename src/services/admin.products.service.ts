import api from "@/lib/axios";

/* =======================
   TYPES
======================= */

export type AdminProductListDto = {
  productId: string;
  name: string;
  thumbnail?: string;
  basePrice: number;
  status: "DRAFT" | "PUBLISHED";
  updatedAt: string;
};

/* =======================
   CLIENT API SERVICE
======================= */

export const adminProductService = {
  async getAll(): Promise<AdminProductListDto[]> {
    const res = await api.get("/api/admin/products");
    return res.data;
  },

  async createProduct(): Promise<{ productId: string }> {
    const res = await api.post("/api/admin/products", {
      status: "DRAFT",
    });
    return res.data;
  },
};
