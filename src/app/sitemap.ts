import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.sunhom.in" },
    { url: "https://www.sunhom.in/about-us" },
    { url: "https://www.sunhom.in/faq" },
    { url: "https://www.sunhom.in/contact-us" },
    { url: "https://www.sunhom.in/privacy-policy" },
    { url: "https://www.sunhom.in/terms-and-conditions" },
    { url: "https://www.sunhom.in/refund-policy" },
    { url: "https://www.sunhom.in/shipping-policy" },
  ];
}
