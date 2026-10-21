"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Eye, Edit } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";

export default function ProductActions({
  productId,
}: {
  productId: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="dropdown-toggle p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition"
        onClick={() => setOpen((prev) => !prev)}
      >
        <MoreHorizontal className="h-5 w-5 text-gray-700" />
      </button>

      <Dropdown isOpen={open} onClose={() => setOpen(false)}>
        <div className="min-w-[160px] py-1">
          <DropdownItem
            onClick={() => {
              router.push(`/admin/products/${productId}/view`);
              setOpen(false);
            }}
          >
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-gray-600" />
              View
            </div>
          </DropdownItem>

          <DropdownItem
            onClick={() => {
              router.push(`/admin/products/${productId}/edit`);
              setOpen(false);
            }}
          >
            <div className="flex items-center gap-2">
              <Edit className="h-4 w-4 text-gray-600" />
              Edit
            </div>
          </DropdownItem>
        </div>
      </Dropdown>
    </div>
  );
}
