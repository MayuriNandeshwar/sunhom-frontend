/** Shown while related products load (the product page itself is already visible). */
export default function RelatedProductsSkeleton() {
  return (
    <div className="mt-24" aria-hidden="true">
      <div className="mb-10 h-8 w-56 animate-pulse rounded bg-[#ece7dd]" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-8 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/5] rounded-2xl bg-[#ece7dd]" />
            <div className="mt-4 h-4 w-2/3 rounded bg-[#ece7dd]" />
            <div className="mt-3 h-3 w-full rounded bg-[#ece7dd]" />
            <div className="mt-3 h-4 w-1/3 rounded bg-[#ece7dd]" />
          </div>
        ))}
      </div>
    </div>
  );
}
