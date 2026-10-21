"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";

interface Slide {
  id: number;
  desktopImage: string;
  mobileImage: string;
}

interface Props {
  slides: Slide[];
  activeIndex: number;
  direction: number;
}

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
  }),
  center: {
    x: "0%",
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
  }),
};

export default function HeroSlider({
  slides,
  activeIndex,
  direction,
}: Props) {
  if (!slides.length) return null;

  const active = slides[activeIndex];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={active.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Desktop */}
          <div className="hidden md:block absolute inset-0">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${active.desktopImage})` }}
            />
          </div>

          {/* Mobile */}
          <div className="block md:hidden absolute inset-0">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${active.mobileImage})` }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}