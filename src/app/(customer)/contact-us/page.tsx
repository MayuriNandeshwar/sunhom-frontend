import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Contact Us | SUNHOM – Enduring Ambience",
  description:
    "Get in touch with SUNHOM for order support, product inquiries, or general assistance. We’re here to help.",
  alternates: {
    canonical: "https://www.sunhom.in/contact-us",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Contact Us | SUNHOM",
    description:
      "Reach SUNHOM for customer support, product questions, or official communication.",
    url: "https://www.sunhom.in/contact-us",
    siteName: "SUNHOM",
    type: "website",
  },
};

export default function ContactUsPage() {
  return (
    <LegalLayout title="Contact Us">
      {/* INTRO */}
      <p>
        We’re always happy to assist you. Whether you have a question about your
        order, need guidance choosing a fragrance, or want to reach us for
        official communication, our team is here to help.
      </p>

      {/* CUSTOMER SUPPORT */}
      <h2>Customer Support</h2>
      <p>
        For order-related queries, product information, or general assistance,
        please contact us using the details below:
      </p>

      <p>
        <strong>Email:</strong>{" "}
        <a
          href="mailto:contact@sunhom.in"
          className="underline underline-offset-4 hover:text-[var(--brand-gold)]"
        >
          contact@sunhom.in
        </a>
        <br />
        <strong>Phone:</strong> +91 97022 61262
      </p>

      {/* BUSINESS ADDRESS */}
      <h2>Registered Business Address</h2>
      <p>
        B-705, Palm Complex,
        <br />
        Palm Spring, Link Road,
        <br />
        Malad West, Mumbai – 400064
        <br />
        Maharashtra, India
      </p>

      {/* BUSINESS HOURS */}
      <h2>Business Hours</h2>
      <p>
        Monday to Saturday
        <br />
        10:00 AM – 6:00 PM (IST)
        <br />
        <span className="text-sm text-black/60">
          Closed on Sundays and public holidays
        </span>
      </p>

      {/* BRAND & COLLECTION NOTE */}
      <h2>Our Collections</h2>
      <p>
        SUNHOM creates refined home and lifestyle fragrances designed for modern
        living. Our collections include:
      </p>

      <ul>
        <li>
          <strong>Signature Candle Collection</strong> — Hand-poured soy wax
          candles crafted for lasting ambience
        </li>
        <li>
          <strong>Drive Collection</strong> — Premium car diffusers for a refined
          on-the-go experience
        </li>
        <li>
          <strong>Pure Air Rituals</strong> — Natural camphor sachets for clean,
          refreshing spaces
        </li>
      </ul>

      <p>
        For bulk orders, gifting inquiries, or collaborations, please reach out
        via email with your requirements.
      </p>

      {/* LEGAL / FOUNDER INFO */}
      <p className="text-sm text-black/60 mt-12 leading-relaxed">
        <strong>Legal & Founder Information:</strong>
        <br />
        The contact details provided on this page are intended solely for
        customer support, official communication, and legitimate business
        inquiries.
        <br />
        <strong>Founder:</strong> Vishal Gndhi
      </p>
    </LegalLayout>
  );
}