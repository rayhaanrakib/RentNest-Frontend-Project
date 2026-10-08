"use client";

import GlassButton from "@/components/shared/GlassButton";
import {
  EASE_OUT_EXPO,
  lineReveal,
  staggerContainerSlow,
} from "@/lib/motion";
import type { ICategory } from "@/types";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  KeyRound,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import HeroSearch from "./HeroSearch";

const HERO_IMAGE =
  "https://res.cloudinary.com/atwb5lzk/image/upload/v1791432525/1791432361236-01a119b0-1407-7205-ad09-6160741a5cf5.png";

const trustChips = [
  { icon: BadgeCheck, label: "Verified listings" },
  { icon: LockKeyhole, label: "Secure Stripe payments" },
  { icon: KeyRound, label: "Trusted landlords" },
];

interface HeroSectionProps {
  categories: ICategory[];
}

const HomepageHeroSection = ({ categories }: HeroSectionProps) => {
  const reduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "32%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh items-center overflow-hidden bg-ink"
    >
      {/* Background — slow Ken Burns settle + scroll parallax */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={reduceMotion ? undefined : { y: imageY }}
      >
        <motion.div
          className="h-full w-full"
          initial={reduceMotion ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4.5, ease: EASE_OUT_EXPO }}
        >
          <Image
            src={HERO_IMAGE}
            alt="Sunlit modern living room of a RentNest home at golden hour"
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Contrast gradients (WCAG AA over imagery) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/45 to-ink/85"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-ink/30"
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-32 sm:px-6 md:pb-28 md:pt-36 lg:px-8"
        style={
          reduceMotion
            ? undefined
            : { y: contentY, opacity: contentOpacity }
        }
      >
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <motion.span
            variants={lineReveal}
            className="glass-chip mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/90 sm:text-sm"
          >
            <Sparkles className="h-4 w-4 text-amber-300" aria-hidden="true" />
            The trusted way to rent
          </motion.span>

          <h1
            id="hero-heading"
            className="font-display text-display font-semibold text-white"
          >
            <span className="block overflow-hidden pb-1">
              <motion.span variants={lineReveal} className="block">
                Find a home that
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span variants={lineReveal} className="block">
                feels{" "}
                <em className="gradient-text-warm not-italic">
                  like you.
                </em>
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={lineReveal}
            className="mt-6 max-w-2xl text-lead text-white/75"
          >
            Browse verified homes, request your move-in, get approved, and pay
            securely — all in one calm, beautiful place.
          </motion.p>

          <motion.div
            variants={lineReveal}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <GlassButton href="/properties" size="lg">
              Browse properties
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </GlassButton>
            <GlassButton href="/register" variant="ghost" size="lg">
              List your property
            </GlassButton>
          </motion.div>

          <motion.div variants={lineReveal} className="mt-10 w-full max-w-3xl">
            <HeroSearch categories={categories} />
          </motion.div>

          <motion.ul
            variants={lineReveal}
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
          >
            {trustChips.map((chip) => (
              <li
                key={chip.label}
                className="glass-chip inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-white/85 sm:text-sm"
              >
                <chip.icon
                  className="h-4 w-4 text-brand-300"
                  aria-hidden="true"
                />
                {chip.label}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/50">
          Scroll
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-white/70"
            animate={reduceMotion ? undefined : { y: [0, 10, 0], opacity: [1, 0.35, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
};

export default HomepageHeroSection;
