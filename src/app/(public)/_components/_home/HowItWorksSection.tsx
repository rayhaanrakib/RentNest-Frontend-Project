"use client";

import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import { riseItem, staggerContainer } from "@/lib/motion";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { BadgeCheck, CreditCard, FileText, Search } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    icon: Search,
    title: "Search & shortlist",
    description:
      "Filter verified homes by city, category, and budget. Save the ones that feel right.",
  },
  {
    icon: FileText,
    title: "Send a rental request",
    description:
      "Share your move-in date, stay duration, and a short note — straight from the listing.",
  },
  {
    icon: BadgeCheck,
    title: "Get approved",
    description:
      "Landlords review your request with full context. Most replies land within a day.",
  },
  {
    icon: CreditCard,
    title: "Pay securely",
    description:
      "Check out with Stripe, get instant confirmation, and pick up your keys.",
  },
];

/** 4-step timeline with a scroll-linked progress line. */
const HomepageHowItWorksSection = () => {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 82%", "end 55%"],
  });

  return (
    <Section id="how-it-works" tone="default" ariaLabelledby="how-it-works-heading">
      <SectionHeader
        eyebrow="How it works"
        title="From search to keys in four steps"
        subtitle="A calm, transparent flow — no paperwork marathons, no broker ping-pong."
        align="center"
        headingId="how-it-works-heading"
      />

      <div ref={trackRef} className="relative">
        {/* Desktop horizontal progress */}
        <div
          aria-hidden="true"
          className="absolute left-[12%] right-[12%] top-9 hidden h-0.5 rounded-full bg-slate-200 lg:block"
        >
          <motion.div
            className="h-full origin-left rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-amber-400"
            style={reduceMotion ? { width: "100%" } : { scaleX: scrollYProgress }}
          />
        </div>
        {/* Mobile vertical progress */}
        <div
          aria-hidden="true"
          className="absolute bottom-4 left-6 top-4 w-0.5 rounded-full bg-slate-200 lg:hidden"
        >
          <motion.div
            className="h-full w-full origin-top rounded-full bg-gradient-to-b from-brand-500 via-brand-400 to-amber-400"
            style={reduceMotion ? { height: "100%" } : { scaleY: scrollYProgress }}
          />
        </div>

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="relative grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-6"
        >
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              variants={riseItem}
              className="relative flex gap-5 pl-16 lg:flex-col lg:items-center lg:gap-0 lg:pl-0 lg:text-center"
            >
              <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-100 bg-white font-display text-lg font-semibold text-brand-600 shadow-sm lg:static lg:h-[4.5rem] lg:w-[4.5rem] lg:rounded-full lg:border-4 lg:text-2xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="lg:mt-6">
                <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 lg:mx-auto">
                  <step.icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500 lg:mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </Section>
  );
};

export default HomepageHowItWorksSection;