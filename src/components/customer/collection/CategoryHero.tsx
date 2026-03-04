import Image from "next/image";
import { CATEGORY_CONFIG } from "@/config/category.config";

export default function CategoryHero({ category }: { category: string }) {
  const config = CATEGORY_CONFIG[category];

  if (!config) return null;

  return (
    <div className="relative h-[450px] md:h-[520px] w-full">
      {/* Background Image */}
      <Image
        src={config.heroImage}
        alt={config.heroTitle}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-4xl md:text-5xl font-serif tracking-wide mb-4">
          {config.heroTitle}
        </h1>

        <p className="text-white/90 max-w-2xl text-sm md:text-base leading-relaxed">
          {config.heroSubtitle}
        </p>
      </div>
    </div>
  );
}