"use client";

import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";
import { riseItem, staggerContainer } from "@/lib/motion";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { useRef } from "react";

const milestones = [
  {
    year: "2021",
    title: "The three-week apartment hunt",
    description:
      "Our founders' own nightmare search becomes the spark: RentNest starts as a weekend prototype with one rule — verified or nothing.",
  },
  {
    year: "2022",
    title: "First 100 verified homes",
    description:
      "Hand-checked listings in Dhaka. Tenants get structured rental requests; landlords get a real requests inbox.",
  },
  {
    year: "2023",
    title: "Payments move to Stripe",
    description:
      "Deposits and rent go through certified checkout. Instant receipts, a full payment history, zero awkward bank transfers.",
  },
  {
    year: "2024",
    title: "Dashboards for every role",
    description:
      "Tenants, landlords, and admins each get a dedicated workspace — requests, properties, users, and platform stats at a glance.",
  },
  {
    year: "2025",
    title: "Reviews & trust signals",
    description:
      "Tenants start rating completed rentals, closing the loop and rewarding the best landlords on the platform.",
  },
  {
    year: "2026",
    title: "120+ cities and growing",
    description:
      "What began as one city's fix is now a regional standard — and we're just getting comfortable.",
  },
];

/** Vertical journey timeline with a scroll-linked progress spine. */
const AboutJourneySection = () => {
  const reduceMotion = useReducedMotion();
  const spineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ["start 78%", "end 62%"],
  });

  return (
    <Section tone="paper" spacing="loose" ariaLabelledby="journey-heading">
      <SectionHeader
        eyebrow="The journey"
        title="Six years of firsts"
        subtitle="From a weekend prototype to the way a region rents."
        align="center"
        headingId="journey-heading"
      />

      <div ref={spineRef} className="relative mx-auto max-w-4xl">
        {/* Spine */}
        <div
          aria-hidden="true"
          className="absolute bottom-2 left-4 top-2 w-px bg-slate-200 md:left-1/2 md:-translate-x-1/2"
        >
          <motion.div
            className="h-full w-full origin-top bg-gradient-to-b from-brand-500 via-brand-400 to-amber-400"
            style={reduceMotion ? { height: "100%" } : { scaleY: scrollYProgress }}
          />
        </div>

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-10 md:space-y-14"
        >
          {milestones.map((milestone, index) => {
            const onLeft = index % 2 === 0;
            return (
              <motion.li
                key={milestone.year}
                variants={riseItem}
                className={cn(
                  "relative flex gap-6 pl-12 md:w-1/2 md:gap-0 md:pl-0",
                  onLeft
                    ? "md:pr-14 md:text-right"
                    : "md:ml-auto md:pl-14",
                )}
              >
                {/* Node */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1 flex h-4 w-4 items-center justify-center",
                    "left-2 md:left-auto",
                    onLeft
                      ? "md:-right-2 md:translate-x-1/2"
                      : "md:-left-2 md:-translate-x-1/2",
                  )}
                >
                  <span className="h-3.5 w-3.5 rounded-full border-2 border-brand-500 bg-white shadow-[0_0_0_4px_rgba(14,165,233,0.15)]" />
                </span>

                <div
                  className={cn(
                    "w-full rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lift md:p-7",
                  )}
                >
                  <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
                    {milestone.year}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {milestone.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </Section>
  );
};

export default AboutJourneySection;