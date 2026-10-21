"use client";

import dynamic from "next/dynamic";

// Heavy / interactive sections
const Hero = dynamic(
  () => import("./hero/Hero"),
  { ssr: false }
);
const CategoryCollection = dynamic(
  () => import("./CategoryCollection"),
  { ssr: false }
);

const NewArrivalSection = dynamic(
  () => import("./newArrival/NewArrivalSection"),
  { ssr: false }
);

const FeaturedCollectionSection = dynamic(
  () => import("./featuredCollection/FeaturedCollectionSection"),
  { ssr: false }
);

const QualityCommitment = dynamic(
  () => import("./QualityCommitment"),
  { ssr: false }
);

const PassionSection = dynamic(
  () => import("./PassionSection"),
  { ssr: false }
);

const MeaningSection = dynamic(
  () => import("./MeaningSection"),
  { ssr: false }
);

const NatureCommitment = dynamic(
  () => import("./NatureCommitment"),
  { ssr: false }
);

const CraftsmanshipSection = dynamic(
  () => import("./CraftsmanshipSection"),
  { ssr: false }
);

const Testimonials = dynamic(
  () => import("./Testimonials"),
  { ssr: false }
);

const ExperienceGlow = dynamic(
  () => import("./ExperienceGlow"),
  { ssr: false }
);

export default function HomeClient() {
  return (
    <>
      <Hero />
      <CategoryCollection />
      <NewArrivalSection />
      <QualityCommitment />
      <FeaturedCollectionSection />
      <MeaningSection />
      {/* 
      <PassionSection />
      <MeaningSection />
      <NatureCommitment />
      <CraftsmanshipSection /> 
      <Testimonials />*/}
      <ExperienceGlow />
    </>
  );
}
