"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCallback, useRef } from "react";

type GlassButtonVariant = "glass" | "ghost" | "solid" | "ink";
type GlassButtonSize = "sm" | "md" | "lg";

interface GlassButtonProps {
  children: React.ReactNode;
  /** Renders a Next.js Link when provided, otherwise a <button>. */
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

const sizeMap: Record<GlassButtonSize, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-base",
};

const variantMap: Record<GlassButtonVariant, string> = {
  // Premium iOS Frosted Glass (translucent, blurred, inner lighting, drop shadow)
  glass: `
    bg-white/[0.08] hover:bg-white/[0.14]
    text-white
    border border-white/20 hover:border-white/30
    backdrop-blur-md
    shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.25),0_8px_32px_0_rgba(0,0,0,0.12)]
    transition-all duration-300
  `,

  // Quiet Frosted Glass (very subtle, highly blended, still blurred)
  ghost: `
    bg-white/[0.03] hover:bg-white/[0.08]
    text-white/90 hover:text-white
    border border-white/10 hover:border-white/20
    backdrop-blur-sm
    shadow-[inset_0_1px_0.5px_0_rgba(255,255,255,0.12)]
    transition-all duration-300
  `,

  // Light iOS Glass (milk-glass vibe, frosted light background)
  solid: `
    bg-white/80 hover:bg-white/90
    text-slate-900
    border border-white/40 hover:border-white/60
    backdrop-blur-md
    shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.8),0_8px_32px_0_rgba(15,23,42,0.06)]
    transition-all duration-300
  `,

  // Dark iOS Glass (liquid obsidian vibe, dark frosted backdrop)
  ink: `
    bg-slate-950/40 hover:bg-slate-950/60
    text-white
    border border-white/10 hover:border-white/15
    backdrop-blur-md
    shadow-[inset_0_1px_0.5px_0_rgba(255,255,255,0.15),0_8px_32px_0_rgba(0,0,0,0.3)]
    transition-all duration-300
  `,
};

/**
 * Liquid-glass CTA with customized high-fidelity iOS glassmorphism.
 * The specular highlight smoothly follows the cursor; a soft shimmer sweeps on hover.
 */
const GlassButton = ({
  children,
  href,
  type = "button",
  onClick,
  variant = "glass",
  size = "md",
  className,
  ariaLabel,
  disabled,
}: GlassButtonProps) => {
  const ref = useRef<HTMLElement | null>(null);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el || event.pointerType === "touch") return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--gmx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--gmy", `${event.clientY - rect.top}px`);
    },
    [],
  );

  const content = (
    <>
      {/* Specular highlight tracking the pointer for active lighting reflection */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/glass:opacity-100"
        style={{
          background:
            "radial-gradient(120px circle at var(--gmx, 50%) var(--gmy, 50%), rgba(255,255,255,0.18), transparent 70%)",
        }}
      />
      {/* Liquid fluid shimmer sweep on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover/glass:animate-shimmer group-hover/glass:opacity-100"
        style={{
          animationDuration: "1.6s"
        }}
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  const classes = cn(
    "group/glass relative isolate inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-wide transition-all duration-300 ease-out-expo active:scale-[0.96] active:brightness-95",
    sizeMap[size],
    variantMap[variant],
    disabled && "pointer-events-none opacity-40",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className={classes}
        onPointerMove={handlePointerMove}
        ref={(node) => {
          ref.current = node;
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
      onPointerMove={handlePointerMove}
      ref={(node) => {
        ref.current = node;
      }}
    >
      {content}
    </button>
  );
};

export default GlassButton;