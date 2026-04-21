import api from "@/lib/axios";

/**
 * Product Detail Type
 */
export interface ProductImage {
  url: string;
  thumbnailUrl?: string;
  mediumUrl?: string;
  largeUrl?: string;
  isPrimary: boolean;
  altText?: string;
}

export interface ProductVariant {
  variantId: string;
  title: string;
  sku: string;
  price: number;
  mrp: number;
  weightGrams: number;
  default: boolean;
}

export interface Product {
  productId: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  category: string;
  categorySlug: string;
  variants: ProductVariant[];
  images: ProductImage[];

  // future safe
  inStock?: boolean;
  stock?: number;

  fragranceNotes?: {
    top: string;
    heart: string;
    base: string;
  };
}

/**
 * Product Service
 */
export const productService = {
  async getProductBySlug(slug: string): Promise<Product> {
    const response = await api.get<Product>(
      `/api/public/products/${slug}`
    );
    return response.data;
  },
};