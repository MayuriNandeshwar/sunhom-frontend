"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryFAQ({
  category,
}: {
  category: string;
}) {
  const faqs = [
  {
    question: "How can I buy candles online from your website?",
    answer:
      "Simply browse your favorite products, add them to cart, and proceed to secure checkout.",
  },
  {
    question: "What types of candles do you offer?",
    answer:
      "We offer premium soy candles, luxury jar candles, festive collections, and curated gift sets.",
  },
  {
    question: "Are your candles made from natural wax?",
    answer:
      "Yes, we use high-quality soy wax that ensures a clean and even burn.",
  },
  {
    question: "How long do your candles burn?",
    answer:
      "Each SUNHOM candle is crafted for optimal longevity with an approximate burn time of 40–50 hours.",
  },
  {
    question: "Do you offer gift sets or bundles?",
    answer:
      "Yes, we provide curated gift sets perfect for festivals, weddings, and corporate gifting.",
  },
  {
    question: "Do you offer discounts for bulk purchases?",
    answer:
      "Yes, we provide special pricing for corporate orders and large quantity purchases.",
  },
  {
    question: "What should I do if my candle arrives damaged?",
    answer:
      "Please contact our support team within 48 hours with photos, and we will arrange a replacement.",
  },
  {
    question: "How do I care for my candles for longer burn time?",
    answer:
      "Trim the wick to 1/4 inch before each burn and allow the wax to melt evenly across the surface.",
  },
  {
    question: "Are your fragrances safe for indoor use?",
    answer:
      "Yes, we use premium fragrance oils that are carefully selected for safe indoor ambiance.",
  },
  {
    question: "Do you ship across India?",
    answer:
      "Yes, we deliver across India with reliable shipping partners.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Once shipped, you will receive tracking details via email or SMS.",
  },
  {
    question: "What makes SUNHOM candles stand out?",
    answer:
      "Premium fragrance oils, clean soy wax, handcrafted quality, and elegant minimalist packaging.",
  },
];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-14 px-6 bg-[#fbfaf8]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-4xl font-serif text-[#1c1c1c] mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-600 mb-6">
            Common questions about our candles, shipping, and returns
          </p>

          {/* Smaller Image */}
          <div className="relative rounded-xl overflow-hidden max-w-md">
            <Image
              src="/category/signature-candle-collection/mogra.png"
              alt="FAQ Candle"
              width={400}
              height={500}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* ACCORDION CARD */}
          <div className="bg-white rounded-xl border border-gray-200 divide-y">

            {faqs.map((faq, index) => (
              <div key={index} className="px-6 py-5">

                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="flex justify-between items-center w-full text-left"
                >
                  <span className="text-[#1c1c1c] font-medium">
                    {faq.question}
                  </span>

                  <Plus
                    className={`w-5 h-5 transition-transform ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}

          </div>

          {/* NEED MORE HELP SECTION */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center justify-between">

            <div>
              <h3 className="text-lg font-semibold text-[#1c1c1c]">
                Need More Help?
              </h3>
              <p className="text-sm text-gray-600">
                Our support team is here to assist you.
              </p>
            </div>

            <Link
              href="/contact-us"
              className="px-5 py-2 rounded-md bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 transition"
            >
              Contact Support
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}