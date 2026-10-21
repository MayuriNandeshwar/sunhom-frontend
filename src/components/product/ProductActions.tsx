export function ProductActions({
  role,
  mode,
}: {
  role: string;
  mode: string;
}) {
  if (role === "customer") {
    return (
      <div className="flex gap-4 mt-4">
        <button className="flex-1 border border-emerald-700 text-emerald-700 py-3 rounded-full hover:bg-emerald-50 transition">
          Add to Cart
        </button>

        <button className="flex-1 bg-emerald-700 text-white py-3 rounded-full hover:bg-emerald-800 transition shadow-md">
          Buy Now
        </button>
      </div>
    );
  }

  return null;
}
