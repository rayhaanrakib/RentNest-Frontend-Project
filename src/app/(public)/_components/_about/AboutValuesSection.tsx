"use client";

import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import { riseItem, staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import {
  Eye,
  HeartHandshake,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

interface ValueCard {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}

const values: ValueCard[] = [
  {
    icon: Eye,
    title: "Transparency",
    description:
      "No hidden fees, no fake photos, no fine print. Everything a lease touches is visible to both sides.",
    accent: "from-brand-400/25 to-brand-600/10 text-brand-600",
  },
  {
    icon: ShieldCheck,
    title: "Verification first",
    description:
      "Listings, landlords, and documents are checked before they reach you — trust is a feature, not a hope.",
    accent: "from-emerald-400/25 to-emerald-600/10 text-emerald-600",
  },
  {
    icon: LockKeyhole,
    title: "Security",
    description:
      "Payments run through Stripe's certified rails, and your data stays behind role-based access control.",
    accent: "from-violet-400/25 to-violet-600/10 text-violet-600",
  },
  {
    icon: Sparkles,
    title: "Simplicity",
    description:
      "If a flow takes more than a minute to understand, we redesign it. Calm software wins.",
    accent: "from-amber-400/25 to-amber-600/10 text-amber-600",
  },
  {
    icon: Zap,
    title: "Speed",
    description:
      "Requests, approvals, and receipts in hours — because a good home shouldn't wait in a queue.",
    accent: "from-rose-400/25 to-rose-600/10 text-rose-600",
  },
  {
    icon: HeartHandshake,
    title: "Care",
    description:
      "Behind every ticket is a person mid-move. We answer like it — quickly, and like humans.",
    accent: "from-sky-400/25 to-sky-600/10 text-sky-600",
  },
];

/** Six platform values in a hover-reactive card grid. */
const AboutValuesSection = () => {
  return (
    <Section tone="default" ariaLabelledby="values-heading">
      <SectionHeader
        eyebrow="What we stand for"
        title="Values you can feel in the product"
        subtitle="Six promises that shape every screen, email, and checkout flow we ship."
        align="center"
        headingId="values-heading"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {values.map((value) => (
          <motion.div
            key={value.title}
            variants={riseItem}
            whileHover={{ y: -6, rotateX: 1.5, rotateY: -1.5 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lift md:p-7"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brand-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span
              className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${value.accent}`}
            >
              <value.icon className="h-5.5 w-5.5" aria-hidden="true" />
            </span>
            <h3 className="text-lg font-semibold text-slate-900">
              {value.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {value.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default AboutValuesSection;