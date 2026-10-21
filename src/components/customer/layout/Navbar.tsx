"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Menu,
  LogOut,
  CheckCircle,
} from "lucide-react";

import MobileMenu from "@/components/customer/layout/MobileMenu";
import CartButton from "@/components/customer/cart/CartButton";
import WishlistLink from "@/components/customer/wishlist/WishlistLink";
import { useCustomerAuth } from "@/context/CustomerAuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { user, isLoggedIn, openLoginModal, logout } = useCustomerAuth();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ===============================
     SCROLL / HERO TRANSPARENCY
     =============================== */
  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 120);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const isTransparent = isHome && !scrolled;

  /* ===============================
     FORCE SCROLL TO TOP
     =============================== */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`
          fixed left-0 right-0 z-50
          top-[40px]
          transition-all duration-300
          ${
            isTransparent
              ? "bg-transparent text-white"
              : "bg-[rgba(246,239,227,0.95)] backdrop-blur-md text-[var(--text-heading)] border-b border-[var(--border-soft)]"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 h-[100px] flex items-center justify-between">

          {/* MOBILE MENU */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* LOGO */}
          <Link href="/" onClick={scrollToTop} className="flex items-center">
            <Image
              src={
                isTransparent
                  ? "/logo/sunhom.png"
                  : "/logo/sunhomtrans.png"
              }
              alt="SUNHOM – Enduring Ambience"
              width={200}
              height={70}
              priority
              className="object-contain transition-all duration-300"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-10 font-epilogue text-sm tracking-wide relative">

            {/* HOME */}
            <Link
              href="/"
              onClick={scrollToTop}
              className={`transition-colors ${
                isTransparent
                  ? "text-white hover:text-[var(--brand-gold)]"
                  : "text-[var(--text-heading)] hover:text-[var(--brand-gold)]"
              }`}
            >
              Home
            </Link>

            {/* COLLECTIONS */}
            <div className="relative group">
              <button
                className={`
                  flex items-center gap-1 transition-colors
                  ${
                    isTransparent
                      ? "text-white hover:text-[var(--brand-gold)]"
                      : "text-[var(--text-heading)] hover:text-[var(--brand-gold)]"
                  }
                `}
              >
                Collections

                <span
                  className={`
                    text-xs transition-transform duration-300
                    group-hover:rotate-180
                    ${
                      isTransparent
                        ? "text-white"
                        : "text-[var(--text-heading)]"
                    }
                  `}
                >
                  ▼
                </span>
              </button>

              <div
                className={`
                  absolute left-1/2 -translate-x-1/2 top-full mt-5
                  w-64 rounded-2xl
                  opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible
                  transition-all duration-300
                  py-6 px-6 space-y-5
                  ${
                    isTransparent
                      ? "bg-white/20 backdrop-blur-lg border border-white/30"
                      : "bg-[rgba(246,239,227,0.98)] shadow-xl border border-[var(--border-soft)]"
                  }
                `}
              >
                {[
                  { label: "Signature Candles", href: "/collections/signature-candle-collection" },
                ].map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={scrollToTop}
                    className={`
                      block font-epilogue text-sm tracking-wide transition-colors
                      ${
                        isTransparent
                          ? "text-white hover:text-[var(--brand-gold)]"
                          : "text-[var(--text-heading)] hover:text-[var(--brand-gold)]"
                      }
                    `}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* OTHER LINKS */}
            <Link
              href="/our-story"
              onClick={scrollToTop}
              className={`transition-colors ${
                isTransparent
                  ? "text-white hover:text-[var(--brand-gold)]"
                  : "text-[var(--text-heading)] hover:text-[var(--brand-gold)]"
              }`}
            >
              Our Story
            </Link>

            <Link
              href="/about-us"
              onClick={scrollToTop}
              className={`transition-colors ${
                isTransparent
                  ? "text-white hover:text-[var(--brand-gold)]"
                  : "text-[var(--text-heading)] hover:text-[var(--brand-gold)]"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/contact-us"
              onClick={scrollToTop}
              className={`transition-colors ${
                isTransparent
                  ? "text-white hover:text-[var(--brand-gold)]"
                  : "text-[var(--text-heading)] hover:text-[var(--brand-gold)]"
              }`}
            >
              Contact
            </Link>

          </div>

          {/* ICONS */}
          <div
            className={`
              flex items-center gap-5
              ${
                isTransparent
                  ? "text-white"
                  : "text-[var(--text-heading)]"
              }
            `}
          >
            <WishlistLink
              className={
                isTransparent
                  ? "text-white"
                  : "text-[var(--text-heading)]"
              }
            />
            <CartButton />

            {/* CUSTOMER USER ACCOUNT */}
            <div className="relative hidden lg:block" ref={userMenuRef}>
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    setUserDropdownOpen((prev) => !prev);
                  } else {
                    openLoginModal("login");
                  }
                }}
                aria-label={isLoggedIn ? "Account menu" : "Customer sign in"}
                className={`flex items-center justify-center p-1 rounded-full transition-all duration-200 hover:text-[var(--brand-gold)] relative ${
                  isLoggedIn
                    ? "text-amber-500 hover:text-amber-600"
                    : ""
                }`}
              >
                <User className="w-5 h-5" />
                {isLoggedIn && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </button>

              {/* Account Dropdown for Logged In Customers */}
              <AnimatePresence>
                {isLoggedIn && userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-60 rounded-2xl bg-[#FAF8F5] border border-[#E8E1D7] shadow-xl p-4 text-gray-900 z-50"
                  >
                    <div className="border-b border-[#EFEAE2] pb-3 mb-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                        Signed In Customer
                      </p>
                      <p className="font-semibold text-sm text-gray-900 mt-0.5 truncate">
                        {user?.name || "Valued Customer"}
                      </p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}