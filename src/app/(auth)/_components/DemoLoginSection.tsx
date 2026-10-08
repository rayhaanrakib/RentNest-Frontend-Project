"use client";

import { DEMO_EMAILS, type DemoRole } from "@/lib/demo";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Loader2,
  ShieldCheck,
  Sparkles,
  UserRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useState } from "react";

interface DemoRoleConfig {
  id: DemoRole;
  label: string;
  blurb: string;
  icon: LucideIcon;
  spotlight: string;
  tile: string;
  hover: string;
}

const demoRoles: DemoRoleConfig[] = [
  {
    id: "TENANT",
    label: "Tenant",
    blurb: "Browse verified homes, send a rental request, pay rent.",
    icon: UserRound,
    spotlight: "rgba(14, 165, 233, 0.16)",
    tile: "bg-brand-50 text-brand-600 group-hover/demo:bg-brand-500 group-hover/demo:text-white group-hover/demo:shadow-[0_10px_24px_-10px_rgba(14,165,233,0.95)]",
    hover: "hover:border-brand-300",
  },
  {
    id: "LANDLORD",
    label: "Landlord",
    blurb: "List a property, approve requests, track payouts.",
    icon: Building2,
    spotlight: "rgba(245, 158, 11, 0.16)",
    tile: "bg-amber-50 text-amber-600 group-hover/demo:bg-amber-500 group-hover/demo:text-white group-hover/demo:shadow-[0_10px_24px_-10px_rgba(245,158,11,0.95)]",
    hover: "hover:border-amber-300",
  },
  {
    id: "ADMIN",
    label: "Admin",
    blurb: "Moderate users, categories and platform-wide stats.",
    icon: ShieldCheck,
    spotlight: "rgba(139, 92, 246, 0.16)",
    tile: "bg-violet-50 text-violet-600 group-hover/demo:bg-violet-500 group-hover/demo:text-white group-hover/demo:shadow-[0_10px_24px_-10px_rgba(139,92,246,0.95)]",
    hover: "hover:border-violet-300",
  },
];

interface DemoLoginSectionProps {
  activeRole: DemoRole | null;
  disabled: boolean;
  onSelect: (role: DemoRole) => void;
}


const DemoLoginSection = ({
  activeRole,
  disabled,
  onSelect,
}: DemoLoginSectionProps) => {
  const reduceMotion = useReducedMotion();
  const [previewId, setPreviewId] = useState<DemoRole | null>(null);

  const active = demoRoles.find((role) => role.id === activeRole) ?? null;
  const preview = demoRoles.find((role) => role.id === previewId) ?? null;

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === "touch") return;
      const rect = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty(
        "--gmx",
        `${event.clientX - rect.left}px`,
      );
      event.currentTarget.style.setProperty(
        "--gmy",
        `${event.clientY - rect.top}px`,
      );
    },
    [],
  );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-border bg-gradient-to-b from-muted/70 via-muted/25 to-transparent p-3.5">
      {/* Ambient glow so the block reads as its own surface */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 h-32 w-40 -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl"
      />

      <header className="relative mb-3 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-brand-500" aria-hidden="true" />
          Demo access
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          <Zap className="h-2.5 w-2.5" aria-hidden="true" />
          Instant sign-in
        </span>
      </header>

      <div className="relative grid grid-cols-3 gap-2.5">
        {demoRoles.map((role, index) => {
          const isActive = activeRole === role.id;
          const isMuted = disabled && !isActive;

          return (
            <motion.button
              key={role.id}
              type="button"
              onClick={() => onSelect(role.id)}
              onPointerMove={handlePointerMove}
              onFocus={() => setPreviewId(role.id)}
              onBlur={() => setPreviewId((current) =>
                current === role.id ? null : current,
              )}
              onPointerEnter={() => setPreviewId(role.id)}
              onPointerLeave={() => setPreviewId((current) =>
                current === role.id ? null : current,
              )}
              disabled={disabled}
              aria-busy={isActive}
              aria-label={`Sign in as the demo ${role.label} — ${DEMO_EMAILS[role.id]}`}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                ease: EASE_OUT_EXPO,
                delay: reduceMotion ? 0 : 0.12 + index * 0.07,
              }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              className={cn(
                "group/demo relative isolate flex flex-col items-center gap-2 overflow-hidden rounded-xl border border-border bg-background px-1.5 py-3.5 transition-colors duration-300 ease-out-expo",
                "hover:bg-muted/40 disabled:pointer-events-none disabled:opacity-45",
                role.hover,
                isActive && "border-transparent bg-muted/40",
                isMuted && "opacity-45",
              )}
            >
              {/* Pointer-tracked spotlight */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 ease-out-expo group-hover/demo:opacity-100"
                style={{
                  background: `radial-gradient(120px circle at var(--gmx, 50%) var(--gmy, 50%), ${role.spotlight}, transparent 70%)`,
                }}
              />
              {/* Shimmer sweep (disabled for reduced motion in globals.css) */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 group-hover/demo:animate-shimmer group-hover/demo:opacity-100"
              />

              <span
                className={cn(
                  "relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-all duration-300 ease-out-expo group-hover/demo:scale-110",
                  role.tile,
                  isActive && "scale-110",
                )}
              >
                {isActive ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <role.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                )}
              </span>

              <span className="relative z-10 flex items-center text-[13px] font-semibold tracking-tight text-foreground">
                {role.label}

                <ArrowUpRight
                  aria-hidden="true"
                  className="pointer-events-none absolute left-full ml-1 h-3 w-3 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-300 ease-out-expo group-hover/demo:translate-x-0 group-hover/demo:opacity-100"
                />
              </span>
            </motion.button>
          );
        })}
      </div>

      <p className="relative mt-3 min-h-[2.75rem] text-center text-[11px] leading-relaxed text-muted-foreground">
        {active ? (
          <span className="text-foreground">
            Signing you in as{" "}
            <strong className="font-semibold">{active.label}</strong> —
            credentials filled in for you.
          </span>
        ) : preview ? (
          preview.blurb
        ) : (
          <span>
            Pick a role to auto-fill the form.
          </span>
        )}
      </p>

      <span className="sr-only" aria-live="polite">
        {active ? `Signing in as ${active.label}` : ""}
      </span>
    </div>
  );
};

export default DemoLoginSection;
