import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "About Us | SUNHOM – Enduring Ambience",
  description:
    "Discover SUNHOM — a modern home fragrance brand built on the belief that luxury should feel natural, calming, and accessible every day.",
  alternates: {
    canonical: "https://www.sunhom.in/about-us",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About Us | SUNHOM",
    description:
      "SUNHOM creates thoughtfully crafted candles and fragrance rituals designed to bring calm, warmth, and understated luxury into everyday living.",
    url: "https://www.sunhom.in/about-us",
    siteName: "SUNHOM",
    type: "website",
  },
};

export default function AboutUsPage() {
  return (
    <LegalLayout title="About SUNHOM">
      <p>
        <strong>SUNHOM</strong> was created with a simple yet powerful belief —
        luxury should feel effortless, calming, and part of everyday life.
        It should not feel distant, intimidating, or reserved for a select few.
      </p>

      <p>
        In a world where luxury is often defined by excess, SUNHOM chooses a
        different path. We focus on quiet elegance — products that elevate your
        surroundings, soothe your senses, and bring warmth into your space,
        without demanding attention or high prices.
      </p>

      <h2>Our Purpose</h2>
      <p>
        Modern life moves fast. SUNHOM exists to slow things down.
        Through gentle fragrance, soft candlelight, and thoughtfully designed
        rituals, we help create moments of calm — moments that feel personal,
        grounding, and restorative.
      </p>

      <p>
        Whether it’s lighting a candle after a long day, refreshing your home,
        or elevating a quiet evening, SUNHOM is designed to be part of your
        everyday rituals.
      </p>

      <h2>What Makes SUNHOM Different</h2>
      <ul>
        <li>Minimal, timeless design that feels premium yet approachable</li>
        <li>Carefully selected fragrances that are soothing, not overpowering</li>
        <li>High-quality materials crafted with attention to detail</li>
        <li>Luxury positioned for everyday use — not occasional indulgence</li>
      </ul>

      <h2>Our Philosophy</h2>
      <p>
        We believe that true luxury lies in how something makes you feel —
        calm, comfortable, and at home. SUNHOM is not about extravagance.
        It is about balance, intention, and creating spaces that feel warm
        and inviting.
      </p>

      <p>
        Every product we create is designed to blend seamlessly into your life,
        enhancing your environment without overwhelming it.
      </p>

      <p className="text-sm text-black/60 mt-10">
        <strong>Founder:</strong> Vishal Gndhi
      </p>
    </LegalLayout>
  );
}