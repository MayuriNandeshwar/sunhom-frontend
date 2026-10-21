import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Refund, Return & Cancellation Policy | SUNHOM – Enduring Ambience",
  description:
    "Read SUNHOM’s Refund, Return, Shipping, and Cancellation Policy. Learn about damaged product returns, shipping timelines, COD rules, and refund processing.",
  alternates: {
    canonical: "https://www.sunhom.in/refund-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Refund, Return & Cancellation Policy | SUNHOM",
    description:
      "SUNHOM refund, return, shipping, COD, and cancellation policy explained clearly for customers.",
    url: "https://www.sunhom.in/refund-policy",
    siteName: "SUNHOM",
    type: "website",
  },
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Return, Refund & Cancellation Policy">
      {/* INTRO */}
      <p>
        At <strong>SUNHOM</strong>, we take pride in crafting premium fragrance
        products with care and attention to detail. If you experience any issue
        with your order, our customer support team will assist you in eligible
        cases, as outlined below.
      </p>

      {/* RETURNS & REFUNDS */}
      <h2>Returns & Refund Eligibility</h2>
      <p>
        Returns, replacements, or refunds are accepted only under the following
        circumstances:
      </p>
      <ul>
        <li>Product damaged during transit</li>
        <li>Incorrect product delivered</li>
        <li>Any other genuine issue, subject to verification</li>
      </ul>

      <p>
        All return or refund requests must be raised within{" "}
        <strong>3 days of delivery</strong> by contacting our customer support
        team with clear images or videos of the issue.
      </p>

      <p>
        The final decision regarding approval of any return or refund rests
        solely with <strong>SUNHOM</strong> after verification of the reported
        issue.
      </p>

      <p>
        Once the returned product is received and successfully verified, the
        refund amount will be processed to the original payment method within{" "}
        <strong>7 business days</strong>.
      </p>

      {/* NON-REFUNDABLE */}
      <h2>Non-Refundable Items</h2>
      <ul>
        <li>Used or partially used products</li>
        <li>Products damaged due to misuse, mishandling, or improper storage</li>
        <li>
          Minor variations in fragrance, color, or finish due to the handcrafted
          nature of our products
        </li>
      </ul>

      <p>
        <strong>
          No refund or replacement will be provided for used or altered
          products.
        </strong>
      </p>

      {/* SHIPPING */}
      <h2>Shipping Policy</h2>
      <p>
        We offer <strong>free shipping</strong> on orders with a minimum order
        value of <strong>₹999</strong>.
      </p>
      <p>
        Orders below ₹999 will attract a flat shipping charge of{" "}
        <strong>₹99</strong>, which will be displayed clearly at checkout.
      </p>
      <p>
        Orders are usually delivered within{" "}
        <strong>3–5 business days</strong> after dispatch, depending on your
        location and courier partner.
      </p>

      {/* COD */}
      <h2>Cash on Delivery (COD)</h2>
      <ul>
        <li>Flat COD fee of <strong>₹49</strong> on eligible orders</li>
        <li>COD available only for orders up to <strong>₹2000</strong></li>
        <li>Orders above ₹2000 must be prepaid</li>
      </ul>
      <p>
        COD eligibility and applicable charges are clearly displayed during
        checkout.
      </p>

      {/* CANCELLATION */}
      <h2>Order Cancellation</h2>
      <p>
        Orders can be cancelled before dispatch by contacting our customer
        support team.
      </p>
      <p>
        If the cancellation request is received before shipment, a full refund
        will be initiated to the original payment method.
      </p>
      <p>
        Refunds for cancelled orders may take{" "}
        <strong>8–9 business days</strong> to reflect in your account, depending
        on your bank or payment provider.
      </p>

      {/* PRODUCT COLLECTIONS */}
      <h2>Product Collections</h2>
      <p>
        SUNHOM offers a curated range of fragrance products crafted for modern
        living:
      </p>
      <ul>
        <li>
          <strong>Signature Candle Collection</strong> — Hand-poured soy wax
          candles for enduring ambience
        </li>
        <li>
          <strong>Drive Collection</strong> — Premium car diffusers designed for
          a refined on-the-go experience
        </li>
        <li>
          <strong>Pure Air Rituals</strong> — Natural camphor sachets for fresh,
          calming spaces
        </li>
      </ul>

      {/* CONTACT */}
      <h2>Contact Information</h2>
      <p>
        For any questions related to returns, refunds, shipping, or order
        cancellations, please contact:
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
        <br />
        Address: B-705, Palm Complex, Palm Spring, Link Road, Malad West,
        Mumbai – 400064, India
      </p>

      {/* LEGAL FOOTER */}
      <p className="text-sm text-black/60 mt-12 leading-relaxed">
        <strong>Legal Disclaimer:</strong> This policy is published in good faith
        and is intended to comply with applicable Indian laws, RBI guidelines,
        and platform requirements including Razorpay, Meta Ads, and Google Ads.
        Policies are subject to change without prior notice.
        <br />
        <strong>Founder:</strong> Vishal Gndhi
      </p>
    </LegalLayout>
  );
}