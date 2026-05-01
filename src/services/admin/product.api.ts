import api from "@/lib/axios";

/**
 * ===============================
 * ADMIN PRODUCT TYPES
 * ===============================
 */

export interface AdminProductImage {
  url: string;
  thumbnailUrl?: string;
  mediumUrl?: string;
  largeUrl?: string;
  isPrimary: boolean;
  altText?: string;
}

export interface AdminProductVariant {
  variantId: string;
  title: string;
  sku: string;
  price: number;
  mrp: number;
  weightGrams: number;
  default: boolean;
}

export interface AdminProduct {
  productId: string;
  name: string;
  slug: string;
  brand: string;
  description: string;

  category?: string;
  categorySlug?: string;

  variants: AdminProductVariant[];
  images: AdminProductImage[];

  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * ===============================
 * ADMIN PRODUCT SERVICE
 * ===============================
 */
export const adminProductService = {

  /**
   * 🔍 Get Product by ID (Admin View)
   */
  async getProductById(id: string): Promise<AdminProduct> {
    const res = await api.get(`/api/admin/products/${id}`);
    return res.data;
  },

  /**
   * 📦 Get All Products (optional use later)
   */
  async getAllProducts(): Promise<AdminProduct[]> {
    const res = await api.get(`/api/admin/products`);
    return res.data;
  },

  /**
   * ➕ Create Product
   */
  async createProduct(payload: Partial<AdminProduct>): Promise<AdminProduct> {
    const res = await api.post(`/api/admin/products`, payload);
    return res.data;
  },

  /**
   * ✏️ Update Product
   */
  async updateProduct(id: string, payload: Partial<AdminProduct>): Promise<AdminProduct> {
    const res = await api.put(`/api/admin/products/${id}`, payload);
    return res.data;
  },

  /**
   * ❌ Delete Product
   */
  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/api/admin/products/${id}`);
  },

};