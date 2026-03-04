"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
} from "lucide-react";

import MobileMenu from "@/components/customer/layout/MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <>
      <motion.nav
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`
          fixed left-0 right-0 z-50
          top-[40px]   /* ✅ EXACT UtilityBar height */
          transition-all duration-300
          ${
            isTransparent
              ? "bg-transparent text-white"
              : "bg-[rgba(246,239,227,0.95)] backdrop-blur-md text-[var(--text-heading)] border-b border-[var(--border-soft)]"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 h-[64px] flex items-center justify-between">

          {/* MOBILE MENU */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* LOGO (SWITCHES BY STATE) */}
          <Link href="/" className="flex items-center">
            <Image
              src={
                isTransparent
                  ? "/logo/sunhom.png" // white logo
                  : "/logo/sunhomtrans.png"      // dark logo
              }
              alt="SUNHOM – Enduring Ambience"
              width={140}
              height={48}
              priority
              className="object-contain transition-all duration-300"
            />
          </Link>

          {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-10 font-epilogue text-sm tracking-wide relative">

              {/* HOME */}
              <Link
                href="/"
                className={`transition-colors ${
                  isTransparent
                    ? "text-white hover:text-[var(--brand-gold)]"
                    : "text-[var(--text-heading)] hover:text-[var(--brand-gold)]"
                }`}
              >
                Home
              </Link>

              {/* COLLECTIONS DROPDOWN */}
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
                    
                    { label: "Signature Candles", href: "/collections/candle" },
                    // { label: "Drive Collection", href: "/collections/drive" },
                    // { label: "Pure Air Rituals", href: "/collections/ritual" },
                    
                  ].map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
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
            <Search className="hidden lg:block w-5 h-5 hover:text-[var(--brand-gold)] transition-colors" />
            <Heart className="w-5 h-5 hover:text-[var(--brand-gold)] transition-colors" />
            <ShoppingCart className="w-5 h-5 hover:text-[var(--brand-gold)] transition-colors" />
            <User className="hidden lg:block w-5 h-5 hover:text-[var(--brand-gold)] transition-colors" />
          </div>
        </div>
      </motion.nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}