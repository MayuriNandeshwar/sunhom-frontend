import api from "@/lib/axios";

export interface PublicProduct {
  productId: string;
  productName: string;
  slug: string;
  shortDescription: string;
  sku: string;
  price: number;
  mrp: number;
  discountPercentage: number;
  imageUrl: string;
  inStock: boolean;
  categorySlug: string;
}

export interface PublicProductResponse {
  version: string;
  total: number;
  data: PublicProduct[];
}

export async function getProductsByCategory(
  category: string,
  query?: {
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
  }
): Promise<PublicProductResponse> {
  const res = await api.get("/api/public/products", {
    params: {
      category,
      ...query,
    },
  });

  return res.data;
}