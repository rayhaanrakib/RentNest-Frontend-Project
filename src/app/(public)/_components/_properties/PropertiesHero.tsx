"use client";

import ParallaxImage from "@/components/shared/ParallaxImage";
import { lineReveal, staggerContainerSlow } from "@/lib/motion";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const HERO_IMAGE = "https://res.cloudinary.com/atwb5lzk/image/upload/v1791394138/properties-hero.png";

interface PropertiesHeroProps {
  availableCount: number;
  areaCount: number;
  categoryCount: number;
}

const PropertiesHero = ({
  availableCount,
  areaCount,
  categoryCount,
}: PropertiesHeroProps) => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const stats = [
    { value: availableCount, label: "Homes available" },
    { value: areaCount, label: "Areas covered" },
    { value: categoryCount, label: "Home types" },
  ];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="properties-hero-heading"
      className="relative flex min-h-[74svh] items-end overflow-hidden bg-ink"
    >
      <ParallaxImage distance={14} className="absolute inset-0">
        <motion.div
          className="h-full w-full will-change-transform"
          style={reduceMotion ? undefined : { scale: imageScale }}
        >
          <Image
            src={HERO_IMAGE}
            alt="Residential neighbourhood at dusk"
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </ParallaxImage>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/45 to-ink"
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-40 sm:px-6 lg:px-8"
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={lineReveal}
            className="glass-chip mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/85"
          >
            Verified listings
          </motion.span>

          <h1
            id="properties-hero-heading"
            className="font-display text-[clamp(2.75rem,7.5vw,6rem)] font-semibold leading-[1] tracking-[-0.02em] text-white"
          >
            <span className="block overflow-hidden pb-1.5">
              <motion.span variants={lineReveal} className="block">
                Homes ready to
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1.5">
              <motion.span variants={lineReveal} className="block">
                <em className="gradient-text not-italic">move into.</em>
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={lineReveal}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300"
          >
            Every listing below is checked by our team — photos, price and
            landlord — before it reaches this page.
          </motion.p>

          <motion.dl
            variants={lineReveal}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/15 pt-7"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-[7rem]">
                <dt className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  {stat.label}
                </dt>
                <dd className="font-display text-3xl font-semibold text-white tabular-nums">
                  {stat.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>

      <motion.span
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/45"
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-5 w-5" />
      </motion.span>
    </section>
  );
};

export default PropertiesHero;
