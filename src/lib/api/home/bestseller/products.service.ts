import api from '@/lib/axios';

/**
 * Bestseller product type (matches backend DTO v1.1)
 */
export interface BestsellerProduct {
  productId: string
  productName: string
  slug: string
  shortDescription: string
  sku: string
  price: number
  mrp: number
  discountPercentage: number
  imageUrl: string
  hoverImageUrl?: string | null
  inStock: boolean
}
/**
 * Bestseller API response
 */
export interface BestsellerResponse {
  version: string;
  timestamp: number;
  total: number;
  data: BestsellerProduct[];
  cached: boolean;
}

export const productService = {
  async getBestsellers(): Promise<BestsellerResponse> {
    const response = await api.get<BestsellerResponse>(
      '/api/public/products/bestsellers'
    );
    return response.data;
  },

  async refreshBestsellers(): Promise<void> {
    await api.post('/api/public/products/bestsellers/refresh');
  },
};