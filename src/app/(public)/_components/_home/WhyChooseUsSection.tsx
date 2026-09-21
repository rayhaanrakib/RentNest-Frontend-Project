"use client";

import Container from "@/components/shared/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import { riseItem, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { motion as motionHtml } from "framer-motion";
import {
  BadgeCheck,
  CreditCard,
  Eye,
  LayoutDashboard,
  LockKeyhole,
  MessagesSquare,
  ShieldCheck,
  SlidersHorizontal,
  ArrowUpRight,
  Search,
  Sparkles,
  User,
  Building,
  ShieldAlert,
} from "lucide-react";
import Image from "next/image";

interface BentoCard {
  icon: any;
  title: string;
  description: string;
  className?: string;
  extra?: React.ReactNode;
}

const cards: BentoCard[] = [
  {
    icon: ShieldCheck,
    title: "100% Verified Listings",
    description:
      "Every home undergoes physical property checks and document screening before going live on RentNest.",
    className: "md:col-span-2",
    extra: (
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-white/2 p-4 backdrop-blur-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE VERIFIED
          </div>
          <p className="mt-2 text-sm font-medium text-white">On-Ground Audits</p>
          <p className="text-xs text-slate-400 mt-1">Real-time coordinates and photos are captured on-site.</p>
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Sparkles className="h-3 w-3 text-amber-400" />
            LANDLORD VERIFIED
          </div>
          <p className="mt-2 text-sm font-medium text-white">Registry Screening</p>
          <p className="text-xs text-slate-400 mt-1">We cross-examine state registry deeds for legal ownership.</p>
        </div>
      </div>
    ),
  },
  {
    icon: LockKeyhole,
    title: "Secure Checkout",
    description:
      "Deposits and rent are processed strictly through Stripe escrow. Safe from DMs and wiring scams.",
    className: "md:col-span-1",
    extra: (
      <div className="mt-6 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent p-4">
        <div className="flex items-center justify-between">
          <CreditCard className="h-6 w-6 text-emerald-400" />
          <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            PCI-DSS L1
          </span>
        </div>
        <p className="mt-4 text-xs font-mono text-slate-400">STRIPE ESCROW PREVIEW</p>
        <div className="mt-1 h-1 w-full rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-2/3 rounded-full bg-emerald-400" />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-slate-400 font-medium">
          <span>Funds Protected</span>
          <span className="text-emerald-400">$2,450.00</span>
        </div>
      </div>
    ),
  },
  {
    icon: Eye,
    title: "No Ghosting, Guaranteed",
    description:
      "A clean, completely transparent process. Track every step from application to contract sign-off.",
    className: "md:col-span-1",
    extra: (
      <div className="mt-6 space-y-3">
        {[
          { label: "Application Sent", status: "completed" },
          { label: "Landlord Interview", status: "current" },
          { label: "Lease Contract", status: "upcoming" },
        ].map((step, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={cn(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold border",
              step.status === "completed" && "bg-brand-500/20 border-brand-500 text-brand-400",
              step.status === "current" && "bg-amber-500/20 border-amber-500 text-amber-400 animate-pulse",
              step.status === "upcoming" && "bg-white/5 border-white/10 text-slate-500"
            )}>
              {idx + 1}
            </div>
            <span className={cn(
              "text-xs font-semibold",
              step.status === "completed" && "text-slate-200",
              step.status === "current" && "text-white",
              step.status === "upcoming" && "text-slate-500"
            )}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: LayoutDashboard,
    title: "Dedicated Role-Based Workspaces",
    description:
      "Whether you are looking to rent, leasing out your asset, or reviewing compliance, your customized dashboard is tuned to your daily workflows.",
    className: "md:col-span-2",
    extra: (
      <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.01] p-2">
        <div className="flex flex-wrap gap-2 rounded-xl bg-white/[0.02] p-1">
          {[
            { id: "tenant", label: "Tenant View", icon: User, active: true },
            { id: "landlord", label: "Landlord Portal", icon: Building, active: false },
            { id: "admin", label: "Compliance Desk", icon: ShieldAlert, active: false },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all",
                tab.active
                  ? "bg-white/[0.08] text-white shadow-sm ring-1 ring-white/10"
                  : "text-slate-400 hover:text-white"
              )}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4 mt-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active Leases</span>
            <span className="text-brand-400 font-mono">2 Active</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="h-10 rounded-lg bg-white/5 border border-white/5 animate-pulse" />
            <div className="h-10 rounded-lg bg-white/5 border border-white/5 animate-pulse" />
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: SlidersHorizontal,
    title: "Intelligent Precise Search Engine",
    description:
      "Filter real-time options by micro-location, direct school/office proximity, budget constraints, and pet policies with immediate results.",
    className: "md:col-span-2",
    extra: (
      <div className="mt-6 flex flex-wrap gap-2.5">
        {[
          { label: "Munich, DE", active: true },
          { label: "Under $1,800/mo", active: true },
          { label: "Allows Pets", active: false },
          { label: "Balcony / Terrace", active: false },
          { label: "Within 15 Min U-Bahn", active: true },
        ].map((chip) => (
          <span
            key={chip.label}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition-all",
              chip.active
                ? "border-brand-500/40 bg-brand-500/10 text-white"
                : "border-white/10 bg-white/5 text-slate-400"
            )}
          >
            {chip.active && <span className="h-1 w-1 rounded-full bg-brand-400" />}
            {chip.label}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: MessagesSquare,
    title: "Live Concierge Desk",
    description:
      "Real humans who understand moving. Reach us 24/7. No loops of automated phone trees.",
    className: "md:col-span-1",
    extra: (
      <div className="mt-6 space-y-3">
        <div className="rounded-2xl bg-white/4 border border-white/5 p-3.5 max-w-[85%]">
          <p className="text-xs text-slate-300">
            Hi! I am looking for viewings on the Giselastraße studio this weekend?
          </p>
        </div>
        <div className="rounded-2xl bg-brand-500/10 border border-brand-500/10 p-3.5 max-w-[85%] ml-auto">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-400 mb-1">
            <span>CONCIERGE • 1m ago</span>
          </div>
          <p className="text-xs text-white">
            Scheduled! You are all set for Saturday at 11:30 AM.
          </p>
        </div>
      </div>
    ),
  },
];

const HomepageWhyChooseUsSection = () => {
  return (
    <section
      aria-labelledby="why-rentnest-heading"
      className="relative overflow-hidden bg-[#050508] py-24 text-slate-100 md:py-32"
    >
      {/* Background Gradients & Subtle Noise Grid */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid-faint opacity-40" />
      <div
        aria-hidden="true"
        className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-brand-500/10 blur-[150px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 h-[400px] w-[400px] rounded-full bg-brand-500/5 blur-[120px] pointer-events-none"
      />

      <Container className="relative z-10">
        <SectionHeader
          eyebrow="The RentNest Advantage"
          title={
            <>
              Renting, re-engineered
              <br className="hidden sm:block" /> around radical trust.
            </>
          }
          subtitle="Everything on the platform exists to make high-fidelity property transactions fast, clear, and perfectly coordinated."
          tone="dark"
          headingId="why-rentnest-heading"
        />

        <motionHtml.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3 mt-16"
        >
          {cards.map((card) => (
            <motionHtml.div
              key={card.title}
              variants={riseItem}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={cn(
                "group relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-white/[0.02] p-8 backdrop-blur-md transition-all duration-300 hover:border-brand-500/50 hover:bg-white/[0.04] shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between",
                card.className
              )}
            >
              {/* Radial specular highlight track */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-brand-500/0 blur-3xl transition-all duration-700 group-hover:bg-brand-500/10"
              />

              <div>
                <div className="flex items-start justify-between">
                  <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-brand-400 border border-white/10 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-brand-500/15 group-hover:text-brand-300">
                    <card.icon className="h-5.5 w-5.5" aria-hidden="true" />
                  </span>

                  {/* Modern Awwwards minimal link arrow on hover */}
                  <ArrowUpRight className="h-5 w-5 text-slate-600 transition-all duration-300 opacity-0 transform -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-brand-400" />
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400 font-medium">
                  {card.description}
                </p>
              </div>

              {/* Graphic Mockups container */}
              <div className="mt-4">
                {card.extra}
              </div>
            </motionHtml.div>
          ))}
        </motionHtml.div>
      </Container>
    </section>
  );
};

export default HomepageWhyChooseUsSection;