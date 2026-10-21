import type { Metadata } from "next";
import BreadcrumbBar from "@/components/common/BreadcrumbBar";
import OrderSuccessClient from "@/components/customer/checkout/OrderSuccessClient";

export const metadata: Metadata = {
  title: "Order Submitted",
  /* Transactional page: keep it out of search results. */
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage() {
  return (
    <div className="pt-[140px]">
      <BreadcrumbBar />
      <OrderSuccessClient />
    </div>
  );
}
