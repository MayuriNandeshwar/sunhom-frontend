import { headers } from "next/headers";
import AdminInventoryClient from "./AdminInventoryClient";
import { AdminInventoryItem } from "@/services/admin.inventory.service";

export default async function InventoryPage() {
  const headerStore = await headers();
  const cookie = headerStore.get("cookie") ?? "";

  let items: AdminInventoryItem[] = [];

  try {
    const res = await fetch("http://localhost:8080/api/admin/inventory", {
      headers: {
        cookie,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const text = await res.text();
      items = text ? JSON.parse(text) : [];
    } else {
      console.warn("Failed to prefetch inventory on server, status:", res.status);
    }
  } catch (err) {
    console.error("Error fetching inventory on server:", err);
  }

  return <AdminInventoryClient initialItems={items} />;
}
