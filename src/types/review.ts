/** A customer review of a product. */
export interface Review {
  id: string;
  /** Shown as given, e.g. "Priya S." */
  customerName: string;
  /** Whole number, 1 to 5. */
  rating: number;
  title: string;
  body: string;
  /** ISO date, e.g. "2026-09-18". */
  createdAt: string;
}

export type StarValue = 1 | 2 | 3 | 4 | 5;

export interface RatingBucket {
  count: number;
  /** Whole percent. The five buckets always add up to 100 (when total > 0). */
  percent: number;
}

export interface ReviewSummary {
  total: number;
  /** One decimal place, e.g. 4.7. 0 when there are no reviews. */
  average: number;
  distribution: Record<StarValue, RatingBucket>;
}
