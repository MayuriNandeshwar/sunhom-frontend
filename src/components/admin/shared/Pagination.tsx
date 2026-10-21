"use client";

type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
};

export default function Pagination({
  page,
  totalPages,
  onChange,
  totalItems,
  pageSize,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 border-t text-sm bg-white">
      <span className="text-gray-600">
        Showing {(page - 1) * pageSize + 1} to{" "}
        {Math.min(page * pageSize, totalItems)} of {totalItems} products
      </span>

      <div className="flex items-center gap-1 flex-wrap">
        <button
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        {Array.from({ length: totalPages || 1 }).map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={`px-3 py-1 rounded ${
                p === page
                  ? "bg-brand-primary text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          disabled={page === totalPages || totalPages === 1}
          onClick={() => onChange(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
