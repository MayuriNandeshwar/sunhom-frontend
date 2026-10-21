import type { Review } from "@/types/review";
import { MOCK_REVIEWS } from "@/mocks/reviews.mock";
import { MOCK_REVIEWS_ENABLED } from "@/config/reviews.config";
import { sortReviewsNewestFirst } from "@/lib/reviews";

/**
 * Reviews for a product, newest first.
 *
 * MOCK for now: every product gets the same sample reviews. This is the one
 * place to swap in the real API call; the page and components already take
 * a plain `Review[]`.
 */
export async function getProductReviews(_productId: string): Promise<Review[]> {
  if (!MOCK_REVIEWS_ENABLED) return [];
  return sortReviewsNewestFirst(MOCK_REVIEWS);
}
