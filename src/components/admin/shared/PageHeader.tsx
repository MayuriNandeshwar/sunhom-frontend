"use client";

import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
};

export default function PageHeader({
  title,
  subtitle,
  actionLabel,
  actionHref,
  onAction,
}: Props) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>

      {(actionLabel && onAction) && (
  <button
    onClick={onAction}
    disabled={false}
    className="bg-orange-600 hover:bg-brand-primary text-white px-4 py-2 rounded-lg transition"
  >
    {actionLabel}
  </button>
)}

    </div>
  );
}
