import { AdminProductEditDto } from "@/types/adminProduct";

interface Props {
  product?: AdminProductEditDto;
  mode: "view" | "edit";
  setProduct?: any;
}

export function ProductInfo({ product, mode, setProduct }: Props) {
  if (!product) return null;

  function updateField(field: string, value: string) {
    setProduct((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <div className="space-y-6">
      {/* PRODUCT NAME */}
      {mode === "edit" ? (
        <input
          value={product.productName}
          onChange={(e) =>
            updateField("productName", e.target.value)
          }
          className="text-4xl font-serif font-semibold w-full bg-transparent border-b border-gray-300 focus:outline-none"
        />
      ) : (
        <h1 className="text-4xl font-serif font-semibold text-gray-900">
          {product.productName}
        </h1>
      )}

      {/* SHORT DESCRIPTION */}
      {mode === "edit" ? (
        <textarea
          value={product.shortDescription ?? ""}
          onChange={(e) =>
            updateField("shortDescription", e.target.value)
          }
          className="w-full bg-transparent border-b border-gray-300 focus:outline-none resize-none text-gray-600"
        />
      ) : (
        <p className="text-gray-600 leading-relaxed">
          {product.shortDescription}
        </p>
      )}

      {/* LONG DESCRIPTION */}
      {mode === "edit" ? (
        <textarea
          value={product.productDescription ?? ""}
          onChange={(e) =>
            updateField("productDescription", e.target.value)
          }
          className="w-full bg-transparent border-b border-gray-300 focus:outline-none resize-none text-gray-700"
        />
      ) : (
        <p className="text-gray-700 leading-relaxed">
          {product.productDescription}
        </p>
      )}
    </div>
  );
}