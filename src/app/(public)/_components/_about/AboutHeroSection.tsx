"use client";

import { lineReveal, staggerContainerSlow } from "@/lib/motion";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import ParallaxImage from "./ParallaxImage";

const ABOUT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2400&q=80";

/** Cinematic About hero: oversized masked headline over a parallax skyline. */
const AboutHeroSection = () => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "46%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  // Slow scale on the skyline so it never sits still behind the type
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-hero-heading"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      {/* Layered parallax skyline */}
      <ParallaxImage distance={14} className="absolute inset-0">
        <motion.div
          className="h-full w-full will-change-transform"
          style={reduceMotion ? undefined : { scale: imageScale }}
        >
          <Image
            src={ABOUT_HERO_IMAGE}
            alt="City skyline at dusk — the neighborhoods RentNest calls home"
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </ParallaxImage>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink"
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-40 sm:px-6 lg:px-8"
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
            Our story
          </motion.span>

          <h1
            id="about-hero-heading"
            className="font-display text-[clamp(3rem,9vw,7.5rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-white"
          >
            <span className="block overflow-hidden pb-2">
              <motion.span variants={lineReveal} className="block">
                Home is a
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-3">
              <motion.span variants={lineReveal} className="block">
                <em className="gradient-text-warm not-italic">feeling,</em> not
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span variants={lineReveal} className="block">
                a listing.
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={lineReveal}
            className="mt-6 max-w-xl text-lead text-white/70"
          >
            RentNest exists because renting should feel like arriving — not
            like negotiating a maze. This is how we&rsquo;re fixing it.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Bottom scroll cue */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-white/70"
            animate={
              reduceMotion ? undefined : { y: [0, 10, 0], opacity: [1, 0.35, 1] }
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
};

export default AboutHeroSection;