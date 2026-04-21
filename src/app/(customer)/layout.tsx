import UtilityBar from "@/components/customer/layout/UtilityBar";
import Navbar from "@/components/customer/layout/Navbar";
import Footer from "@/components/customer/layout/Footer";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UtilityBar />
      <Navbar />

      <div>
        {children}
      </div>

      <Footer />
    </>
  );
}