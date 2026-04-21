'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { newsletterService } from "@/lib/api/products/newsletter.service";

import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Phone,
  Mail,
  MessageCircle,
  BadgePercent,
  Truck,
  Gift,
  Sparkles
} from "lucide-react";

export default function Footer() {

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= NEWSLETTER STATE ================= */

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {

    if (!email) {
      setMessage("Please enter your email.");
      setPopup(true);
      return;
    }

    try {

      setLoading(true);

      const res = await newsletterService.subscribe({ email });

      if (res.status === 200) {
        setMessage("🎉 Welcome to SUNHOM! You are now subscribed.");
        setEmail("");
      }

    } catch (err: any) {

      if (err?.response?.status === 409) {
        setMessage("✨ You are already subscribed to SUNHOM.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }

    } finally {

      setLoading(false);
      setPopup(true);

    }

  };

  return (
    <>

      {/* ================= FEATURE STRIP ================= */}

      <section className="bg-[#0B5C4E] py-12">

        <div className="flex items-center justify-center gap-4 text-white text-[11px] tracking-[0.25em] whitespace-nowrap mb-10 px-4">

          <span className="flex-1 h-[1px] bg-white/40"></span>

          <span className="text-center">
            EXCLUSIVELY ON SUNHOM.IN
          </span>

          <span className="flex-1 h-[1px] bg-white/40"></span>

        </div>


        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center">
              <BadgePercent className="w-7 h-7 text-white" />
            </div>

            <h4 className="text-white font-semibold">
              Exclusive Offers
            </h4>

            <p className="text-white/90 text-sm max-w-xs">
              Be the first to discover new fragrance launches and special offers.
            </p>
          </div>


          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center">
              <Truck className="w-7 h-7 text-white" />
            </div>

            <h4 className="text-white font-semibold">
              Free Shipping
            </h4>

            <p className="text-white/90 text-sm max-w-xs">
              Complimentary delivery on orders above ₹999.
            </p>
          </div>


          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center">
              <Gift className="w-7 h-7 text-white" />
            </div>

            <h4 className="text-white font-semibold">
              Personalized Gifting
            </h4>

            <p className="text-white/90 text-sm max-w-xs">
              Contact us for curated gifting and custom fragrance selections.
            </p>
          </div>


          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>

            <h4 className="text-white font-semibold">
              Handcrafted Luxury
            </h4>

            <p className="text-white/90 text-sm max-w-xs">
              Thoughtfully crafted soy candles designed for refined spaces.
            </p>
          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="bg-[#014338] text-white pt-12 pb-6">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 md:gap-x-12">

            {/* COLUMN 1 */}

            <div>

             <Link href="/" onClick={scrollTop} className="block text-center md:text-left">
                <Image
                  src="/logo/sunhom.png"
                  alt="SUNHOM"
                  width={250}
                  height={100}
                  priority
                  className="mx-auto md:mx-0"
                />
              </Link>

              <h4 className="mt-3 text-lg font-semibold text-white">
                Newsletter
              </h4>

              <p className="text-white/80 text-sm mt-1 mb-4">
                Subscribe to receive exclusive offers and fragrance launches.
              </p>

              <div className="flex w-full">

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-l bg-white/10 border border-white/30 text-white placeholder-white/60 outline-none"
                />

                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="bg-white text-[#014338] px-4 py-2 rounded-r font-medium hover:bg-white/90"
                >
                  {loading ? "..." : "Subscribe"}
                </button>

              </div>

            </div>


            {/* COLUMN 2 + 3 */}

            <div className="grid grid-cols-2 md:contents gap-10">

              <div>

                <h4 className="text-lg font-semibold mb-4 text-white">
                  About Sunhom
                </h4>

                <ul className="space-y-2 text-sm">

                  <li><Link onClick={scrollTop} href="/" className="text-white/80 hover:text-white">Home</Link></li>
                  <li><Link href="/collections/candle" className="text-white/80 hover:text-white">Candle</Link></li>
                  <li><Link href="/collections/diffuser" className="text-white/80 hover:text-white">Diffuser</Link></li>
                  <li><Link href="/collections/sachet" className="text-white/80 hover:text-white">Sachet</Link></li>
                  <li><Link href="/about-us" className="text-white/80 hover:text-white">About Us</Link></li>
                  <li><Link href="/contact-us" className="text-white/80 hover:text-white">Contact</Link></li>

                </ul>

              </div>


              <div>

                <h4 className="text-lg font-semibold mb-4 text-white">
                  Customer Services
                </h4>

                <ul className="space-y-2 text-sm">

                  <li><Link href="/faq" className="text-white/80 hover:text-white">FAQs</Link></li>
                  <li><Link href="/privacy-policy" className="text-white/80 hover:text-white">Privacy Policy</Link></li>
                  <li><Link href="/terms-and-conditions" className="text-white/80 hover:text-white">Terms & Conditions</Link></li>
                  <li><Link href="/refund-policy" className="text-white/80 hover:text-white">Return & Refund Policy</Link></li>

                </ul>

              </div>

            </div>


            {/* CONNECT */}

            <div>

              <h4 className="text-lg font-semibold mb-4 text-white">
                Connect With Us
              </h4>

              <div className="space-y-3 text-sm text-white/90">

                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  info@sunhom.in
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  +91 97022 61262
                </div>

              </div>

              <div className="flex gap-4 mt-5">

                <a className="text-white hover:text-[#EAC27A]" href="#"><Instagram size={20} /></a>
                <a className="text-white hover:text-[#EAC27A]" href="#"><Facebook size={20} /></a>
                <a className="text-white hover:text-[#EAC27A]" href="#"><Twitter size={20} /></a>
                <a className="text-white hover:text-[#EAC27A]" href="#"><Youtube size={20} /></a>
                <a className="text-white hover:text-[#EAC27A]" href="#"><Linkedin size={20} /></a>
                <a className="text-white hover:text-[#EAC27A]" href="#"><MessageCircle size={20} /></a>

              </div>

            </div>

          </div>

        </div>


        {/* COPYRIGHT */}

        <div className="border-t border-white/20 mt-10 pt-5 text-center text-sm text-white/80">
          © {new Date().getFullYear()} SUNHOM. All rights reserved.
        </div>

      </footer>


      {/* ================= POPUP ================= */}

      {popup && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl p-6 w-[320px] text-center">

            <Image
              src="/logo/sunhomtrans.png"
              alt="SUNHOM"
              width={200}
              height={90}
              className="mx-auto mb-4"
            />

            <p className="text-gray-700 text-sm mb-5">
              {message}
            </p>

            <button
              onClick={() => setPopup(false)}
              className="bg-[#014338] text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </>
  );
}