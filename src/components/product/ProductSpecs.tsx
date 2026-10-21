import { AdminProductEditDto } from "@/types/adminProduct";

export function ProductSpecs({ product }: { product?: AdminProductEditDto }) {
  return (
    <details className="border rounded-lg p-4">
      <summary className="font-medium">Product Specification</summary>
      <p className="mt-2 text-sm text-gray-600">
        High quality soy wax candle with long burn time.
      </p>
    </details>
  );
}
