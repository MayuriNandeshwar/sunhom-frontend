"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function BreadcrumbBar({
  items,
}: {
  items?: BreadcrumbItem[];
}) {
  const pathname = usePathname();

  // ❌ Hide on homepage
  if (pathname === "/") return null;

  // ✅ If custom items provided → use them
  if (items && items.length > 0) {
    return (
      <div className="bg-[#ead7b8] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 text-sm text-gray-700">

          {items.map((item, index) => (
            <span key={index}>
              {index !== 0 && " / "}

              {item.href ? (
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span className="text-black font-medium">
                  {item.label}
                </span>
              )}
            </span>
          ))}

        </div>
      </div>
    );
  }

  // ✅ Default fallback (URL-based)
  const segments = pathname.split("/").filter(Boolean);

  let path = "";

  return (
    <div className="bg-[#ead7b8] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 text-sm text-gray-700">

        <Link href="/" className="hover:underline">
          Home
        </Link>

        {segments.map((segment, index) => {
          path += `/${segment}`;

          const label = segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <span key={index}>
              {" / "}
              {index === segments.length - 1 ? (
                <span className="text-black font-medium">
                  {label}
                </span>
              ) : (
                <Link href={path} className="hover:underline">
                  {label}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}