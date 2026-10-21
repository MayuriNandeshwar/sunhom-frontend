import type { Metadata } from "next";
import BreadcrumbBar from "@/components/common/BreadcrumbBar";
import CheckoutClient from "@/components/customer/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  /* Transactional page: keep it out of search results. */
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="pt-[140px]">
      <BreadcrumbBar />
      <CheckoutClient />
    </div>
  );
}
