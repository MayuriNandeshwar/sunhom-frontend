import { headers } from "next/headers";
import AdminProductEditor from "@/components/admin/products/AdminProductEditor";
import { AdminProductEditDto } from "@/types/adminProduct";

export default async function Page(props: any) {
  const params = await props.params;
  const id = params.id;

  const headerStore = await headers();
  const cookie = headerStore.get("cookie") ?? "";

  const res = await fetch(
    `http://localhost:8080/api/admin/products/${id}/edit`,
    {
      headers: { cookie },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load product");
  }

  const data: AdminProductEditDto = await res.json();

  return <AdminProductEditor initialData={data} />;
}
