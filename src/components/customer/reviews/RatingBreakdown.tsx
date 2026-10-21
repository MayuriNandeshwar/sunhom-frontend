import type { ReviewSummary } from "@/types/review";
import { STAR_VALUES } from "@/lib/reviews";

/** One row per star level: label, proportional bar, percentage. */
export default function RatingBreakdown({ summary }: { summary: ReviewSummary }) {
  return (
    <ul aria-label="Rating breakdown" className="space-y-2.5">
      {STAR_VALUES.map((star) => {
        const { percent, count } = summary.distribution[star];
        return (
          <li
            key={star}
            className="flex items-center gap-3 font-epilogue text-sm text-[var(--text-body)]"
            title={`${count} ${count === 1 ? "review" : "reviews"}`}
          >
            <span className="w-12 shrink-0">{star} Star</span>
            <span
              aria-hidden="true"
              className="h-2 flex-1 overflow-hidden rounded-full bg-[#EFEAE0]"
            >
              <span
                className="block h-full rounded-full bg-[var(--brand-gold)]"
                style={{ width: `${percent}%` }}
              />
            </span>
            <span className="w-10 shrink-0 text-right tabular-nums">
              {percent}%
            </span>
          </li>
        );
      })}
    </ul>
  );
}
