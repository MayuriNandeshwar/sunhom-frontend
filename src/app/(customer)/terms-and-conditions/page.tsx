import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions | SUNHOM – Enduring Ambience",
  description:
    "Read SUNHOM’s Terms & Conditions governing the use of our website, products, payments, refunds, and services in compliance with Indian laws.",
  alternates: {
    canonical: "https://www.sunhom.in/terms-and-conditions",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms & Conditions | SUNHOM",
    description:
      "SUNHOM Terms & Conditions outline user responsibilities, payments, refunds, and legal policies.",
    url: "https://www.sunhom.in/terms-and-conditions",
    siteName: "SUNHOM",
    type: "website",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      {/* INTRO */}
      <p>
        This website is operated by <strong>SUNHOM</strong>. Throughout the site,
        the terms “we”, “us”, and “our” refer to SUNHOM. By accessing or using our
        website and/or purchasing products from us, you agree to be bound by
        these Terms & Conditions (“Terms”), including all policies referenced
        herein.
      </p>

      {/* 1 */}
      <h2>1. Eligibility & Use of Website</h2>
      <p>
        By using this website, you confirm that you are at least 18 years of age
        or are accessing the website under the supervision of a parent or legal
        guardian. You agree not to use our website or products for any unlawful,
        fraudulent, or unauthorized purpose.
      </p>

      {/* 2 */}
      <h2>2. General Conditions</h2>
      <p>
        We reserve the right to refuse service to anyone for any reason at any
        time. You agree not to reproduce, duplicate, copy, sell, resell, or
        exploit any portion of the website or its content without express written
        permission from SUNHOM.
      </p>

      {/* 3 */}
      <h2>3. Accuracy of Information</h2>
      <p>
        We strive to ensure that all information on this website is accurate and
        up to date. However, we do not guarantee that product descriptions,
        pricing, or other content will always be complete, current, or error-free.
        Information may be updated or modified at any time without prior notice.
      </p>

      {/* 4 */}
      <h2>4. Products, Pricing & Availability</h2>
      <ul>
        <li>
          All SUNHOM products are handcrafted and may exhibit minor variations
          in color, fragrance, or finish.
        </li>
        <li>
          Product images are for representational purposes only and may differ
          slightly from the actual product.
        </li>
        <li>
          Prices, promotions, and product availability are subject to change
          without notice.
        </li>
      </ul>

      {/* COLLECTIONS */}
      <p>
        SUNHOM currently offers the following product collections:
      </p>
      <ul>
        <li>
          <strong>Signature Candle Collection</strong> — Hand-poured soy wax
          candles crafted for enduring ambience
        </li>
        <li>
          <strong>Drive Collection</strong> — Premium car diffusers designed for
          a refined on-the-go fragrance experience
        </li>
        <li>
          <strong>Pure Air Rituals</strong> — Natural camphor sachets for fresh,
          calming spaces
        </li>
      </ul>

      {/* 5 */}
      <h2>5. Orders, Billing & Payments</h2>
      <p>
        We reserve the right to refuse or cancel any order at our sole
        discretion. You agree to provide accurate, complete, and current billing
        and contact information for all purchases made through our website.
      </p>
      <p>
        All payments are processed securely through{" "}
        <strong>Razorpay or other RBI-authorized payment gateways</strong>.
        SUNHOM does not store or process your card, UPI, or banking details.
      </p>

      {/* 6 */}
      <h2>6. Refunds, Returns & Cancellations</h2>
      <p>
        Refunds, replacements, returns, and order cancellations are governed by
        our{" "}
        <a
          href="/refund-policy"
          className="underline underline-offset-4 hover:text-[var(--brand-gold)]"
        >
          Refund, Return & Cancellation Policy
        </a>
        . By placing an order, you agree to comply with the terms outlined in
        that policy.
      </p>

      {/* 7 */}
      <h2>7. Third-Party Links & Tools</h2>
      <p>
        Our website may include links to third-party tools or websites. SUNHOM is
        not responsible for the content, accuracy, or practices of any
        third-party websites or services.
      </p>

      {/* 8 */}
      <h2>8. User Submissions & Feedback</h2>
      <p>
        Any feedback, suggestions, reviews, or other submissions provided to
        SUNHOM may be used by us without restriction or obligation. You agree
        not to submit any unlawful, defamatory, or infringing content.
      </p>

      {/* 9 */}
      <h2>9. Personal Information</h2>
      <p>
        Your submission of personal information through the website is governed
        by our{" "}
        <a
          href="/privacy-policy"
          className="underline underline-offset-4 hover:text-[var(--brand-gold)]"
        >
          Privacy Policy
        </a>
        .
      </p>

      {/* 10 */}
      <h2>10. Prohibited Uses</h2>
      <ul>
        <li>Violation of any applicable law or regulation</li>
        <li>Infringement of intellectual property rights</li>
        <li>Distribution of malware or harmful code</li>
        <li>Unauthorized data collection, scraping, or surveillance</li>
      </ul>

      {/* 11 */}
      <h2>11. Disclaimer & Limitation of Liability</h2>
      <p>
        The website and products are provided on an “as-is” and “as-available”
        basis. To the maximum extent permitted by law, SUNHOM shall not be liable
        for any indirect, incidental, or consequential damages arising from the
        use of our website or products.
      </p>

      {/* 12 */}
      <h2>12. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless SUNHOM, its founder, affiliates,
        and partners from any claims, losses, or damages arising out of your
        breach of these Terms or misuse of the website.
      </p>

      {/* 13 */}
      <h2>13. Termination</h2>
      <p>
        We reserve the right to suspend or terminate access to our website if
        these Terms are violated. Obligations incurred prior to termination shall
        survive termination.
      </p>

      {/* 14 */}
      <h2>14. Governing Law & Jurisdiction</h2>
      <p>
        These Terms & Conditions are governed by and construed in accordance with
        the laws of <strong>India</strong>. All disputes shall be subject to the
        exclusive jurisdiction of Indian courts.
      </p>

      {/* 15 */}
      <h2>15. Contact Information</h2>
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
        <br />
        Address: B-705, Palm Complex, Palm Spring, Link Road, Malad West,
        Mumbai – 400064, India
      </p>

      {/* LEGAL FOOTER */}
      <p className="text-sm text-black/60 mt-12 leading-relaxed">
        <strong>Legal Disclaimer:</strong> These Terms & Conditions are published
        in good faith and are intended to comply with applicable Indian laws,
        RBI guidelines, and platform requirements including Razorpay, Meta Ads,
        and Google Ads. SUNHOM reserves the right to update these Terms at any
        time without prior notice.
        <br />
        <strong>Founder:</strong> Vishal Gndhi
      </p>
    </LegalLayout>
  );
}