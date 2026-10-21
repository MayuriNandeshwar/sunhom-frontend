import { AdminProductEditDto } from "@/types/adminProduct";

interface Props {
  product?: AdminProductEditDto;
  mode: "view" | "edit";
  setProduct?: any;
}

export function ProductPrice({ product, mode, setProduct }: Props) {
  if (!product) return null;

  const defaultVariant = product.variants.find(
    (v) => v.isDefault
  );

  if (!defaultVariant) return null;

  const discount =
    defaultVariant.mrp &&
    defaultVariant.price &&
    Math.round(
      ((defaultVariant.mrp - defaultVariant.price) /
        defaultVariant.mrp) *
      100
    );

  function updatePrice(value: number) {
    setProduct((prev: any) => ({
      ...prev,
      variants: prev.variants.map((v: any) =>
        v.isDefault ? { ...v, price: value } : v
      ),
    }));
  }

  function updateMrp(value: number) {
    setProduct((prev: any) => ({
      ...prev,
      variants: prev.variants.map((v: any) =>
        v.isDefault ? { ...v, mrp: value } : v
      ),
    }));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-end gap-4">
        {mode === "edit" ? (
          <>
            <input
              type="number"
              value={defaultVariant.price ?? ""}
              onChange={(e) =>
                updatePrice(Number(e.target.value))
              }
              className="text-4xl font-semibold text-emerald-700 bg-transparent border-b border-gray-300 focus:outline-none w-32"
            />

            <input
              type="number"
              value={defaultVariant.mrp ?? ""}
              onChange={(e) =>
                updateMrp(Number(e.target.value))
              }
              className="text-lg line-through text-gray-400 bg-transparent border-b border-gray-300 focus:outline-none w-24"
            />
          </>
        ) : (
          <>
            <span className="text-4xl font-semibold text-emerald-700">
              ₹{defaultVariant.price?.toFixed(2)}
            </span>

            {defaultVariant.mrp && (
              <span className="text-lg line-through text-gray-400">
                ₹{defaultVariant.mrp.toFixed(2)}
              </span>
            )}
          </>
        )}
      </div>

      {discount && discount > 0 && (
        <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
          {discount}% OFF
        </span>
      )}

      <p className="text-xs text-gray-500">
        Inclusive of all taxes.
      </p>
    </div>
  );
}