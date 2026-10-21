"use client";

import { useMemo, useRef, useState } from "react";
import { MessageSquareText, PenLine } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { INITIAL_REVIEWS_SHOWN } from "@/config/reviews.config";
import { sortReviewsNewestFirst, summarizeReviews } from "@/lib/reviews";
import type { Review } from "@/types/review";
import StarRating from "@/components/customer/reviews/StarRating";
import ReviewCard from "@/components/customer/reviews/ReviewCard";
import RatingBreakdown from "@/components/customer/reviews/RatingBreakdown";

interface ReviewsSectionProps {
  reviews: Review[];
}

/**
 * Ratings & Reviews for the product page: summary, per-star breakdown and
 * review cards (3 at first, "View All Reviews" for the rest).
 * "Write a Review" is UI only for now: it shows a notice, nothing is sent.
 */
export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);

  const sorted = useMemo(() => sortReviewsNewestFirst(reviews), [reviews]);
  const summary = useMemo(() => summarizeReviews(sorted), [sorted]);

  const hasMore = sorted.length > INITIAL_REVIEWS_SHOWN;
  const visible = expanded ? sorted : sorted.slice(0, INITIAL_REVIEWS_SHOWN);

  const writeReview = () =>
    toast({
      id: "review-coming-soon",
      message: "Review submissions are opening soon. Thank you!",
    });

  const toggleExpanded = () => {
    const next = !expanded;
    setExpanded(next);
    /* After collapsing, bring the section back into view. */
    if (!next) {
      requestAnimationFrame(() =>
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      aria-labelledby="reviews-heading"
      className="mt-24 scroll-mt-[160px]"
    >
      {/* HEADER */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div>
          <p className="font-epilogue text-xs uppercase tracking-[0.2em] text-[var(--brand-gold)]">
            Customer Voices
          </p>
          <h2
            id="reviews-heading"
            className="mt-2 font-playfair text-3xl text-[#1c1c1c]"
          >
            Ratings &amp; Reviews
          </h2>
        </div>

        {summary.total > 0 && <WriteReviewButton onClick={writeReview} />}
      </div>

      {summary.total === 0 ? (
        /* EMPTY STATE */
        <div className="flex flex-col items-center rounded-2xl bg-white px-6 py-14 text-center shadow-sm sm:py-16">
          <MessageSquareText
            aria-hidden="true"
            className="mb-5 h-12 w-12 text-[var(--brand-gold)]"
            strokeWidth={1.2}
          />
          <StarRating rating={0} size={20} decorative className="mb-4" />
          <h3 className="font-playfair text-2xl text-[var(--text-heading)]">
            No reviews yet
          </h3>
          <p className="mx-auto mt-2 mb-8 max-w-sm font-epilogue text-sm leading-relaxed text-[var(--text-muted)]">
            Be the first to share how this fragrance feels in your home. Your
            words help others find their perfect candle.
          </p>
          <WriteReviewButton onClick={writeReview} />
        </div>
      ) : (
        <>
          {/* SUMMARY */}
          <div className="grid gap-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8 md:grid-cols-[minmax(0,240px)_1fr] md:gap-12">
            <div className="flex flex-col items-center justify-center text-center md:border-r md:border-[var(--border-soft)] md:pr-12">
              <p
                className="font-playfair text-6xl leading-none text-[#1c1c1c]"
                aria-label={`Average rating ${summary.average.toFixed(1)} out of 5`}
              >
                {summary.average.toFixed(1)}
              </p>
              <StarRating
                rating={summary.average}
                size={22}
                decorative
                className="mt-4"
              />
              <p className="mt-3 font-epilogue text-sm text-[var(--text-muted)]">
                Based on {summary.total}{" "}
                {summary.total === 1 ? "review" : "reviews"}
              </p>
            </div>

            <div className="flex items-center">
              <div className="w-full">
                <RatingBreakdown summary={summary} />
              </div>
            </div>
          </div>

          {/* REVIEW CARDS */}
          <div
            id="reviews-list"
            className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={toggleExpanded}
                aria-expanded={expanded}
                aria-controls="reviews-list"
                className="rounded-full border border-[var(--brand-teal)] px-8 py-3 font-epilogue text-sm font-medium text-[var(--brand-teal)] transition hover:bg-[var(--brand-teal)] hover:text-white"
              >
                {expanded
                  ? "Show Fewer Reviews"
                  : `View All Reviews (${summary.total})`}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function WriteReviewButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-teal)] px-7 py-3 font-epilogue text-sm font-medium text-white transition hover:opacity-90"
    >
      <PenLine aria-hidden="true" className="h-4 w-4" />
      Write a Review
    </button>
  );
}
