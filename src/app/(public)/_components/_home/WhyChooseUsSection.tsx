"use client";

import Container from "@/components/shared/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import { riseItem, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  CreditCard,
  Eye,
  LayoutDashboard,
  LockKeyhole,
  MessagesSquare,
  ShieldCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";

interface BentoCard {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string; 
  extra?: React.ReactNode;
}

const verifiedHighlights = [
  "On-ground photo & document checks",
  "Landlord identity verification",
  "Delisted the moment it's rented",
];

const cards: BentoCard[] = [
  {
    icon: ShieldCheck,
    title: "100% verified listings",
    description:
      "Every home is checked before it goes live — what you see on RentNest is what greets you at the door.",
    className: "md:col-span-2",
    extra: (
      <ul className="mt-6 space-y-2.5">
        {verifiedHighlights.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.5 text-sm text-slate-300"
          >
            <BadgeCheck
              className="h-4 w-4 shrink-0 text-brand-400"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: LockKeyhole,
    title: "Secure Stripe payments",
    description:
      "Deposits and rent move through Stripe's PCI-DSS certified checkout — never through DMs.",
  },
  {
    icon: LayoutDashboard,
    title: "Role-based dashboards",
    description:
      "Tenants, landlords, and admins each get a workspace tuned to their job.",
  },
  {
    icon: Eye,
    title: "Transparent process",
    description:
      "Track every request from pending to approved — no silent rejections, ever.",
  },
  {
    icon: SlidersHorizontal,
    title: "Search that respects your time",
    description:
      "City, category, and budget filters that behave the way you expect — find a shortlist in minutes, not days.",
    className: "md:col-span-2",
    extra: (
      <div className="mt-6 flex flex-wrap gap-2">
        {["Search by area", "Property type", "Availability"].map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300"
          >
            {chip}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: MessagesSquare,
    title: "Support that answers",
    description:
      "Real humans on the other side — reach us whenever a move matters.",
  },
];

/** Dark bento grid of RentNest benefits with hover micro-interactions. */
const HomepageWhyChooseUsSection = () => {
  return (
    <section
      aria-labelledby="why-rentnest-heading"
      className="relative overflow-hidden bg-ink py-20 text-slate-100 md:py-28"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-grid-faint" />
      <div
        aria-hidden="true"
        className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-500/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amber-400/10 blur-[120px]"
      />

      <Container className="relative z-10">
        <SectionHeader
          eyebrow="The RentNest advantage"
          title={
            <>
              Renting, re-engineered
              <br className="hidden sm:block" /> around trust
            </>
          }
          subtitle="Everything on the platform exists to make the two sides of a lease trust each other faster."
          tone="dark"
          headingId="why-rentnest-heading"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={riseItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 transition-colors duration-300 hover:border-brand-400/40 md:p-7",
                card.className,
              )}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-400/0 blur-3xl transition-colors duration-500 group-hover:bg-brand-400/20"
              />
              <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400/30 to-brand-600/20 text-brand-300 ring-1 ring-white/10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                <card.icon className="h-5.5 w-5.5" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {card.description}
              </p>
              {card.extra}
              {card.title === "Secure Stripe payments" ? (
                <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
                  <CreditCard className="h-3.5 w-3.5" aria-hidden="true" />
                  PCI-DSS Level 1 via Stripe
                </span>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};

export default HomepageWhyChooseUsSection;
