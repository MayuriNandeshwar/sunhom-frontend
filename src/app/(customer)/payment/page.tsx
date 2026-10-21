import type { Metadata } from "next";
import BreadcrumbBar from "@/components/common/BreadcrumbBar";
import PaymentClient from "@/components/customer/checkout/PaymentClient";

export const metadata: Metadata = {
  title: "Payment",
  /* Transactional page: keep it out of search results. */
  robots: { index: false, follow: false },
};

export default function PaymentPage() {
  return (
    <div className="pt-[140px]">
      <BreadcrumbBar />
      <PaymentClient />
    </div>
  );
}
