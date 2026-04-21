import api from '@/lib/axios';

/**
 * New Arrival Product Type
 * Matches backend DTO v1.0
 */
export interface NewArrivalProduct {
  productId: string;
  productName: string;
  slug: string;
  shortDescription: string;
  sku: string;
  price: number;
  mrp: number;
  discountPercentage: number;
  imageUrl: string;
  hoverImageUrl?: string | null;
  inStock: boolean;
  category: string;
  categorySlug: string;
}

/**
 * API Response
 */
export interface NewArrivalResponse {
  version: string;
  timestamp: number;
  total: number;
  data: NewArrivalProduct[];
}

export const newArrivalService = {
  async getNewArrivals(limit: number = 8): Promise<NewArrivalResponse> {
    const response = await api.get<NewArrivalResponse>(
      `/api/public/products/new-arrivals?limit=${limit}`
    );
    return response.data;
  },

  async refreshNewArrivals(): Promise<void> {
    await api.post('/api/public/products/new-arrivals/refresh');
  },
};