"use client";

import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  CreditCard,
  LayoutDashboard,
  Search,
  Send,
  ShieldCheck,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

interface RoleTab {
  id: string;
  label: string;
  icon: LucideIcon;
  headline: string;
  steps: { icon: LucideIcon; text: string }[];
  cta: { href: string; label: string };
}

const roles: RoleTab[] = [
  {
    id: "tenant",
    label: "Tenants",
    icon: UserRound,
    headline: "Find it, request it, move in.",
    steps: [
      { icon: Search, text: "Browse verified homes with real photos and clear pricing." },
      { icon: Send, text: "Send a rental request with your move-in date and duration." },
      { icon: CreditCard, text: "Pay securely through Stripe and track everything in your dashboard." },
    ],
    cta: { href: "/properties", label: "Start browsing" },
  },
  {
    id: "landlord",
    label: "Landlords",
    icon: Building2,
    headline: "List it, approve it, get paid.",
    steps: [
      { icon: Building2, text: "Create a listing with photos, amenities, and pricing in minutes." },
      { icon: BadgeCheck, text: "Review verified tenant requests and approve with one click." },
      { icon: LayoutDashboard, text: "Track occupancy, requests, and payouts from your dashboard." },
    ],
    cta: { href: "/register", label: "List your property" },
  },
  {
    id: "admin",
    label: "Admins",
    icon: ShieldCheck,
    headline: "Keep the marketplace honest.",
    steps: [
      { icon: ShieldCheck, text: "Monitor platform-wide stats — users, properties, rentals, revenue." },
      { icon: Users, text: "Manage accounts and categories with role-aware controls." },
      { icon: BadgeCheck, text: "Spot-check quality so verification never slips." },
    ],
    cta: { href: "/login", label: "Admin sign-in" },
  },
];

/** Animated tabs showing how RentNest works for each role. WAI-ARIA tabs:
 *  arrow-key navigation, roving roles, linked panels. */
const AboutRolesSection = () => {
  const [activeId, setActiveId] = useState(roles[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeRole = roles.find((role) => role.id === activeId) ?? roles[0];

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      let nextIndex: number | null = null;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % roles.length;
      if (event.key === "ArrowLeft")
        nextIndex = (index - 1 + roles.length) % roles.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = roles.length - 1;
      if (nextIndex === null) return;
      event.preventDefault();
      const nextRole = roles[nextIndex];
      setActiveId(nextRole.id);
      tabRefs.current[nextIndex]?.focus();
    },
    [],
  );

  return (
    <Section tone="default" ariaLabelledby="roles-heading">
      <SectionHeader
        eyebrow="One platform, three sides"
        title="How RentNest works for you"
        subtitle="The same marketplace, tuned to the job you came to do."
        align="center"
        headingId="roles-heading"
      />

      <div className="mx-auto max-w-4xl">
        {/* Tab list */}
        <div
          role="tablist"
          aria-label="Choose a role"
          className="mx-auto flex w-fit rounded-full border border-slate-200 bg-slate-50 p-1.5"
        >
          {roles.map((role, index) => {
            const selected = role.id === activeId;
            return (
              <button
                key={role.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`role-tab-${role.id}`}
                aria-selected={selected}
                aria-controls={`role-panel-${role.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(role.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-6",
                  selected ? "text-white" : "text-slate-500 hover:text-slate-900",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="role-tab-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-slate-900 shadow-sm"
                  />
                )}
                <role.icon className="relative z-10 h-4 w-4" aria-hidden="true" />
                <span className="relative z-10 hidden sm:inline">
                  {role.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panels */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRole.id}
              id={`role-panel-${activeRole.id}`}
              role="tabpanel"
              aria-labelledby={`role-tab-${activeRole.id}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-7 shadow-sm md:p-10"
            >
              <h3 className="font-display text-2xl font-semibold text-slate-900 md:text-3xl">
                {activeRole.headline}
              </h3>

              <ol className="mt-8 grid gap-6 md:grid-cols-3">
                {activeRole.steps.map((step, index) => (
                  <li key={step.text} className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <step.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                        Step {index + 1}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">
                      {step.text}
                    </p>
                  </li>
                ))}
              </ol>

              <Link
                href={activeRole.cta.href}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-lift"
              >
                {activeRole.cta.label}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
};

export default AboutRolesSection;