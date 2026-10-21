import type { Metadata } from "next";
import BreadcrumbBar from "@/components/common/BreadcrumbBar";
import WishlistClient from "@/components/customer/wishlist/WishlistClient";

export const metadata: Metadata = {
  title: "Your Wishlist",
  /* Personal, per-browser page: keep it out of search results. */
  robots: { index: false, follow: true },
};

export default function WishlistPage() {
  return (
    <div className="pt-[140px]">
      <BreadcrumbBar />
      <WishlistClient />
    </div>
  );
}
