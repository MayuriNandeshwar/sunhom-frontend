import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | SUNHOM – Enduring Ambience",
  description:
    "SUNHOM Privacy Policy explains how we collect, use, and protect customer information in compliance with Indian laws, RBI guidelines, Razorpay, Google Ads, and Meta Ads requirements.",
  alternates: {
    canonical: "https://www.sunhom.in/privacy-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | SUNHOM",
    description:
      "Learn how SUNHOM protects your personal information and ensures secure transactions across our fragrance collections.",
    url: "https://www.sunhom.in/privacy-policy",
    siteName: "SUNHOM",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      {/* INTRO */}
      <p>
        Thank you for visiting <strong>SUNHOM</strong>. We respect your privacy
        and are committed to protecting the personal information you share with
        us. This Privacy Policy explains how we collect, use, store, and disclose
        information when you browse our website, place an order, or interact
        with our services.
      </p>

      {/* SECTION 1 */}
      <h2>1. Information We Collect</h2>
      <p>
        When you visit or make a purchase from SUNHOM, we may collect the
        following information:
      </p>
      <ul>
        <li>Name, email address, and phone number</li>
        <li>Shipping and billing address</li>
        <li>Order details related to our products and collections</li>
        <li>IP address, browser type, and device information</li>
      </ul>

      {/* SECTION 2 */}
      <h2>2. Product & Collection Context</h2>
      <p>
        SUNHOM offers premium home and lifestyle fragrance products, including:
      </p>
      <ul>
        <li>
          <strong>Signature Candle Collection</strong> — Hand-poured soy wax
          candles
        </li>
        <li>
          <strong>Drive Collection</strong> — Premium car diffusers
        </li>
        <li>
          <strong>Pure Air Rituals</strong> — Natural camphor sachets
        </li>
      </ul>
      <p>
        Information collected is used strictly to process orders, deliver
        products, and provide customer support related to these collections.
      </p>

      {/* SECTION 3 */}
      <h2>3. Payment Information</h2>
      <p>
        We do <strong>not</strong> store or process your credit card, debit card,
        UPI, or banking details on our servers. All payments are securely handled
        by <strong>Razorpay</strong> and other RBI-authorized payment gateways.
      </p>

      {/* SECTION 4 */}
      <h2>4. Cookies & Analytics</h2>
      <p>
        SUNHOM uses cookies and analytics tools to improve website performance,
        understand user behavior, and enhance your browsing experience. You may
        disable cookies through your browser settings; however, some features
        of the website may not function optimally.
      </p>

      {/* SECTION 5 */}
      <h2>5. Use of Information</h2>
      <p>Your information may be used for the following purposes:</p>
      <ul>
        <li>Processing and fulfilling orders</li>
        <li>Customer support and communication</li>
        <li>Website analytics and performance improvement</li>
        <li>
          Marketing communications, only where permitted by law and user
          consent
        </li>
      </ul>

      {/* SECTION 6 */}
      <h2>6. Sharing of Information</h2>
      <p>
        We may share limited personal information with trusted third parties
        such as payment processors, logistics partners, analytics providers,
        or legal authorities when required by law. We do not sell or rent your
        personal information to third parties.
      </p>

      {/* SECTION 7 */}
      <h2>7. Data Security</h2>
      <p>
        We use SSL encryption and reasonable administrative, technical, and
        physical safeguards to protect your personal information. However, no
        method of transmission over the internet or electronic storage is
        completely secure.
      </p>

      {/* SECTION 8 */}
      <h2>8. Contact Information</h2>
      <p>
        If you have any questions, concerns, or requests regarding this Privacy
        Policy, you may contact us at:
        <br />
        <strong>Email:</strong>{" "}
        <a
          href="mailto:contact@sunhom.in"
          className="underline underline-offset-4 hover:text-[var(--brand-gold)]"
        >
          contact@sunhom.in
        </a>
      </p>

      {/* SECTION 9 */}
      <h2>9. Jurisdiction</h2>
      <p>
        This Privacy Policy shall be governed and interpreted in accordance with
        the laws of India. Any disputes shall be subject to the jurisdiction of
        Indian courts.
      </p>

      {/* FOOTER NOTE */}
      <p className="text-sm text-black/60 mt-12 leading-relaxed">
        <strong>Legal Disclaimer:</strong> This Privacy Policy is published in
        good faith and is intended to comply with applicable Indian laws,
        Information Technology regulations, RBI guidelines, and platform
        policies including Razorpay, Google Ads, and Meta Ads.
      </p>
    </LegalLayout>
  );
}