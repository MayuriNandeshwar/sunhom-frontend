"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, User, ChevronDown } from "lucide-react";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {

  const [collectionOpen, setCollectionOpen] = useState(false);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#F7F5F2] transition-transform duration-300
      ${open ? "translate-x-0" : "-translate-x-full"}`}
    >

      {/* HEADER */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-[var(--border-soft)]">
        <Image
          src="/logo/sunhomtrans.png"
          alt="SUNHOM"
          width={120}
          height={40}
          priority
        />

        <button onClick={onClose} aria-label="Close menu">
          <X className="w-5 h-5 text-[var(--text-heading)]" />
        </button>
      </div>

      {/* NAV LINKS */}
      <nav className="p-6 space-y-6 font-epilogue text-sm">

        {/* HOME */}
        <Link
          href="/"
          onClick={onClose}
          className="block border-b border-[var(--border-soft)] pb-3 text-[var(--text-heading)]"
        >
          Home
        </Link>

        {/* COLLECTIONS ACCORDION */}
        <div className="border-b border-[var(--border-soft)] pb-3">

          <button
            onClick={() => setCollectionOpen(!collectionOpen)}
            className="flex items-center justify-between w-full text-[var(--text-heading)]"
          >
            <span>Collections</span>

            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 text-[var(--text-heading)] ${
                collectionOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`
              overflow-hidden transition-all duration-300
              ${collectionOpen ? "max-h-40 mt-4" : "max-h-0"}
            `}
          >
            <div className="space-y-4 pl-4 text-[13px]">
{/* 
              <Link
                href="/collections/drive"
                onClick={onClose}
                className="block text-black hover:text-[var(--brand-gold)] transition"
              >
                Drive Collection
              </Link>

              <Link
                href="/collections/ritual"
                onClick={onClose}
                className="block text-black hover:text-[var(--brand-gold)] transition"
              >
                Pure Air Rituals
              </Link> */}

              <Link
                href="/collections/candle"
                onClick={onClose}
                className="block text-black hover:text-[var(--brand-gold)] transition"
              >
                Signature Candles
              </Link>

            </div>
          </div>
        </div>

        {/* OTHER LINKS */}
        <Link
          href="/our-story"
          onClick={onClose}
          className="block border-b border-[var(--border-soft)] pb-3 text-[var(--text-heading)]"
        >
          Our Story
        </Link>

        <Link
          href="/about-us"
          onClick={onClose}
          className="block border-b border-[var(--border-soft)] pb-3 text-[var(--text-heading)]"
        >
          About Us
        </Link>

        <Link
          href="/contact-us"
          onClick={onClose}
          className="block border-b border-[var(--border-soft)] pb-3 text-[var(--text-heading)]"
        >
          Contact
        </Link>

      </nav>

      {/* LOGIN */}
      <div className="absolute bottom-6 left-6 right-6">
        <button className="flex items-center gap-3 text-sm text-[var(--text-heading)]">
          <span className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center">
            <User className="w-5 h-5" />
          </span>
          <span>Log in</span>
        </button>
      </div>
    </div>
  );
} 