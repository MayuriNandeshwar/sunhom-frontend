import { AdminProductEditDto } from "@/types/adminProduct";

export function ProductInstructions({ product }: { product?: AdminProductEditDto }) {
  return (
    <details className="border rounded-lg p-4">
      <summary className="font-medium">Instruction to Use</summary>
      <ul className="mt-2 text-sm list-disc pl-5">
        <li>Trim wick before lighting</li>
        <li>Burn for 2–3 hours</li>
        <li>Keep away from wind</li>
      </ul>
    </details>
  );
}
