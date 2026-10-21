import Link from "next/link";

type Item = {
  label: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: Item[] }) {
  return (
    <div className="text-sm">
      {items.map((item, index) => (
        <span key={index}>
          {item.href ? (
            <Link
              href={item.href}
              className="text-amber-600 hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-700">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="mx-2 text-gray-400">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
