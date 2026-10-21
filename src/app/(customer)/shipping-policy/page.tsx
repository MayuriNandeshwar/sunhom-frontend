import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Shipping Policy | SUNHOM – Enduring Ambience",
  description:
    "SUNHOM Shipping Policy explains order processing time, delivery timelines, shipping charges, and important shipping-related information.",
  alternates: {
    canonical: "https://www.sunhom.in/shipping-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ShippingPolicyPage() {
  return (
    <LegalLayout title="Shipping Policy">
      {/* INTRO */}
      <p>
        At <strong>SUNHOM</strong>, we are committed to delivering your fragrance
        essentials safely and efficiently. This Shipping Policy outlines our
        order processing timelines, shipping charges, and delivery expectations
        to ensure a smooth shopping experience.
      </p>

      {/* SHIPPING CHARGES */}
      <h2>Shipping Charges</h2>
      <ul>
        <li>
          <strong>Free shipping</strong> on orders with a minimum order value of{" "}
          <strong>₹999</strong>
        </li>
        <li>
          A flat shipping fee of <strong>₹99</strong> is applicable on orders
          below ₹999
        </li>
      </ul>
      <p>
        All applicable shipping charges are clearly displayed at checkout before
        order confirmation.
      </p>

      {/* ORDER PROCESSING */}
      <h2>Order Processing</h2>
      <p>
        Orders are usually processed within <strong>1–2 business days</strong>{" "}
        after successful payment confirmation. Orders placed on Sundays or
        public holidays are processed on the next working day.
      </p>

      {/* DELIVERY TIMELINE */}
      <h2>Delivery Timeline</h2>
      <p>
        Once dispatched, orders are typically delivered within{" "}
        <strong>3–5 business days</strong>, depending on your delivery location
        and the courier partner.
      </p>
      <p>
        Delivery timelines may vary for remote or non-metro areas.
      </p>

      {/* DELAYS */}
      <h2>Delays & Exceptions</h2>
      <p>
        While we strive to meet estimated delivery timelines, delays may occur
        due to factors beyond our control, including but not limited to:
      </p>
      <ul>
        <li>Courier or logistics partner delays</li>
        <li>Weather conditions or natural disruptions</li>
        <li>Regional restrictions or operational challenges</li>
      </ul>
      <p>
        SUNHOM will not be held liable for delays caused by such external
        circumstances, but we will always assist you with tracking and support.
      </p>

      {/* PRODUCT COLLECTIONS */}
      <h2>Product Collections & Shipping</h2>
      <p>
        SUNHOM ships all product categories with equal care and attention,
        including:
      </p>
      <ul>
        <li>
          <strong>Signature Candle Collection</strong> — Carefully packed
          hand-poured soy wax candles
        </li>
        <li>
          <strong>Drive Collection</strong> — Premium car diffusers packed to
          prevent leakage or damage
        </li>
        <li>
          <strong>Pure Air Rituals</strong> — Natural camphor sachets sealed for
          freshness
        </li>
      </ul>

      {/* ADDRESS ACCURACY */}
      <h2>Shipping Address Accuracy</h2>
      <p>
        Customers are responsible for providing accurate and complete shipping
        details at the time of checkout. SUNHOM will not be liable for delivery
        issues arising from incorrect or incomplete address information.
      </p>

      {/* CONTACT */}
      <h2>Need Help?</h2>
      <p>
        If you have any questions related to shipping or delivery, please reach
        out to our customer support team:
      </p>
      <p>
        <strong>SUNHOM</strong>
        <br />
        Email:{" "}
        <a
          href="mailto:contact@sunhom.in"
          className="underline underline-offset-4 hover:text-[var(--brand-gold)]"
        >
          contact@sunhom.in
        </a>
        <br />
        Phone: +91 97022 61262
      </p>

      {/* FOOTNOTE */}
      <p className="text-sm text-black/60 mt-12 leading-relaxed">
        This Shipping Policy is subject to change without prior notice. Any
        updates will be reflected on this page.
      </p>
    </LegalLayout>
  );
}