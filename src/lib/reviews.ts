import type {
  RatingBucket,
  Review,
  ReviewSummary,
  StarValue,
} from "@/types/review";

export const STAR_VALUES: StarValue[] = [5, 4, 3, 2, 1];

/** Newest first. Does not mutate the input. */
export function sortReviewsNewestFirst(reviews: Review[]): Review[] {
  return [...reviews].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
}

/**
 * Average, total and per-star percentages, computed from the reviews so the
 * numbers on screen always agree with the cards. Percentages use the
 * largest-remainder method so they add up to exactly 100.
 */
export function summarizeReviews(reviews: Review[]): ReviewSummary {
  const counts: Record<StarValue, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let sum = 0;
  let total = 0;

  for (const r of reviews) {
    const star = Math.round(r.rating);
    if (star < 1 || star > 5) continue; /* ignore malformed ratings */
    counts[star as StarValue] += 1;
    sum += star;
    total += 1;
  }

  const empty: RatingBucket = { count: 0, percent: 0 };
  const distribution: Record<StarValue, RatingBucket> = {
    1: { ...empty },
    2: { ...empty },
    3: { ...empty },
    4: { ...empty },
    5: { ...empty },
  };

  if (total === 0) return { total: 0, average: 0, distribution };

  const exact = STAR_VALUES.map((s) => ({
    star: s,
    raw: (counts[s] / total) * 100,
  }));
  const floors = exact.map((e) => ({ ...e, floor: Math.floor(e.raw) }));
  let leftover = 100 - floors.reduce((n, e) => n + e.floor, 0);

  /* Hand the remaining points to the largest fractional remainders. */
  const byRemainder = [...floors].sort(
    (a, b) => b.raw - b.floor - (a.raw - a.floor)
  );
  const bonus = new Map<StarValue, number>();
  for (const e of byRemainder) {
    if (leftover <= 0) break;
    if (counts[e.star] === 0) continue; /* never give 1% to an empty bucket */
    bonus.set(e.star, 1);
    leftover -= 1;
  }

  for (const e of floors) {
    distribution[e.star] = {
      count: counts[e.star],
      percent: e.floor + (bonus.get(e.star) ?? 0),
    };
  }

  return {
    total,
    average: Math.round((sum / total) * 10) / 10,
    distribution,
  };
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * "18 Sep 2026". Built by hand in UTC instead of Intl: month abbreviations
 * differ between ICU versions ("Sep" vs "Sept"), and this text is rendered
 * on the server and again in the browser, so both must produce the same
 * string or React reports a hydration mismatch.
 */
export function formatReviewDate(iso: string): string {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "";
  const d = new Date(t);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
