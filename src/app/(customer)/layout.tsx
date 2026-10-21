import UtilityBar from "@/components/customer/layout/UtilityBar";
import Navbar from "@/components/customer/layout/Navbar";
import Footer from "@/components/customer/layout/Footer";
import CartDrawer from "@/components/customer/cart/CartDrawer";
import CustomerLoginModal from "@/components/customer/auth/CustomerLoginModal";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { BuyNowProvider } from "@/context/BuyNowContext";
import { ToastProvider } from "@/context/ToastContext";
import { CustomerAuthProvider } from "@/context/CustomerAuthContext";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <CustomerAuthProvider>
        <CartProvider>
          <WishlistProvider>
            <BuyNowProvider>
              <UtilityBar />
              <Navbar />

              <div>
                {children}
              </div>

              <Footer />
              <CartDrawer />
              <CustomerLoginModal />
            </BuyNowProvider>
          </WishlistProvider>
        </CartProvider>
      </CustomerAuthProvider>
    </ToastProvider>
  );
}