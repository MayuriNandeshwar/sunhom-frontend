import type { Review } from "@/types/review";
import { formatReviewDate } from "@/lib/reviews";
import StarRating from "@/components/customer/reviews/StarRating";

export default function ReviewCard({ review }: { review: Review }) {
  const date = formatReviewDate(review.createdAt);

  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm sm:p-6">
      <StarRating rating={review.rating} size={16} />

      <h3 className="mt-3 font-playfair text-lg leading-snug text-[#1c1c1c]">
        {review.title}
      </h3>

      <p className="mt-2 flex-1 font-epilogue text-sm leading-relaxed text-[var(--text-body)]">
        {review.body}
      </p>

      <footer className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--border-soft)] pt-4 font-epilogue text-xs">
        <span className="min-w-0 truncate font-medium text-[var(--text-heading)]">
          {review.customerName}
        </span>
        {date && (
          <time
            dateTime={review.createdAt}
            className="shrink-0 text-[var(--text-muted)]"
          >
            {date}
          </time>
        )}
      </footer>
    </article>
  );
}
