import Link from "next/link";
import { CATEGORY_CONFIG } from "@/config/category.config";

export default function BreadcrumbBar({ category }: { category: string }) {
  const config = CATEGORY_CONFIG[category];

  const label = config?.label || category;

  return (
    <div className="bg-[#e0c39c] text-black py-3 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-6 text-sm">
        <Link href="/" className="text-black/80 hover:text-black">
          Home
        </Link>{" "}
        /{" "}
        <Link
          href="/collections"
          className="text-black/80 hover:text-black"
        >
          Collections
        </Link>{" "}
        /{" "}
        <span className="font-medium text-black">
          {label}
        </span>
      </div>
    </div>
  );
}