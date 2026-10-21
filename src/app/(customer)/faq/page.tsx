import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "FAQs | SUNHOM – Enduring Ambience",
  description:
    "Find answers to common questions about SUNHOM candles, collections, shipping, payments, returns, and care instructions.",
  alternates: {
    canonical: "https://www.sunhom.in/faq",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FAQPage() {
  return (
    <LegalLayout title="Frequently Asked Questions">
      {/* INTRO */}
      <p>
        Below you’ll find answers to the most commonly asked questions about
        SUNHOM products, orders, shipping, and care. If you need further
        assistance, our customer support team is always happy to help.
      </p>

      {/* PRODUCT & QUALITY */}
      <h2>Are SUNHOM candles safe to use?</h2>
      <p>
        Yes. SUNHOM candles are made using high-quality natural soy wax and
        premium fragrance oils. When used according to care instructions, they
        are safe for everyday use.
      </p>

      <h2>Why do SUNHOM candles look slightly different from each other?</h2>
      <p>
        Our candles are hand-poured in small batches. Minor variations in color,
        texture, or finish are natural and reflect the artisanal nature of our
        products.
      </p>

      <h2>Are SUNHOM products eco-friendly?</h2>
      <p>
        We prioritize responsible sourcing wherever possible. Our soy wax burns
        cleaner than traditional paraffin wax, and our products are designed to
        minimize environmental impact.
      </p>

      <h2>How long do SUNHOM candles last?</h2>
      <p>
        Burn time varies depending on the candle size and usage. When burned
        properly, SUNHOM candles provide long, even burn times for a consistent
        ambience experience.
      </p>

      {/* FRAGRANCE & SENSITIVITY */}
      <h2>Can SUNHOM fragrances cause allergies?</h2>
      <p>
        We use carefully selected, high-quality fragrance oils. However,
        fragrance sensitivity varies from person to person. If you have known
        sensitivities, we recommend testing in a well-ventilated space.
      </p>

      {/* ORDERS & PAYMENTS */}
      <h2>Do you offer Cash on Delivery (COD)?</h2>
      <p>
        Yes. Cash on Delivery is available on eligible orders up to INR 2000. A
        flat COD fee of INR 49 may apply.
      </p>

      <h2>Can I cancel my order after placing it?</h2>
      <p>
        Orders can be cancelled before dispatch. Please contact our customer
        support team as soon as possible to request a cancellation.
      </p>

      <h2>Can I return a used or partially used product?</h2>
      <p>
        No. For hygiene and safety reasons, used or partially used candles and
        fragrance products are not eligible for return or refund.
      </p>

      {/* COLLECTIONS */}
      <h2>What product collections does SUNHOM offer?</h2>
      <p>
        SUNHOM offers thoughtfully crafted fragrance collections designed for
        modern living:
      </p>

      <ul>
        <li>
          <strong>Signature Candle Collection</strong> — Hand-poured soy wax
          candles for enduring ambience
        </li>
        <li>
          <strong>Drive Collection</strong> — Premium car diffusers for a refined
          on-the-go fragrance experience
        </li>
        <li>
          <strong>Pure Air Rituals</strong> — Natural camphor sachets for fresh,
          calming spaces
        </li>
      </ul>

      {/* SUPPORT */}
      <h2>How can I contact SUNHOM customer support?</h2>
      <p>
        You can reach our customer support team via email at{" "}
        <a
          href="mailto:contact@sunhom.in"
          className="underline underline-offset-4 hover:text-[var(--brand-gold)]"
        >
          contact@sunhom.in
        </a>{" "}
        or call us at <strong>+91 97022 61262</strong> during business hours.
      </p>

      {/* FOOTNOTE */}
      <p className="text-sm text-black/60 mt-12">
        For detailed policies related to shipping, returns, and refunds, please
        refer to the respective policy pages available on our website.
      </p>
    </LegalLayout>
  );
}