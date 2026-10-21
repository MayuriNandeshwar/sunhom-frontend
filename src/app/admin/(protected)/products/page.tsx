import { headers } from "next/headers";
import AdminProductsClient from "./AdminProductsClient";

export default async function Page() {
  const headerStore = await headers();
  const cookie = headerStore.get("cookie") ?? "";

  const res = await fetch(
    "http://localhost:8080/api/admin/products",
    {
      headers: {
        cookie,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch products", res.status);
    return <AdminProductsClient products={[]} />;
  }

  const text = await res.text();
  const products = text ? JSON.parse(text) : [];

  return <AdminProductsClient products={products} />;
}
