"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCallback, useRef } from "react";

type GlassButtonVariant = "glass" | "ghost" | "solid" | "ink";
type GlassButtonSize = "sm" | "md" | "lg";

interface GlassButtonProps {
  children: React.ReactNode;
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
  glass: "glass-btn",
  ghost: "glass-btn-quiet",
  solid:
    "border border-transparent bg-white text-slate-900 shadow-lift hover:bg-brand-50",
  ink: "border border-transparent bg-slate-900 text-white shadow-lift hover:bg-slate-700",
};

/**
 * Liquid-glass CTA. The specular highlight follows the cursor via the
 * `--gmx`/`--gmy` custom properties; a shimmer sweep plays on hover.
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
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/glass:opacity-100"
        style={{
          background:
            "radial-gradient(150px circle at var(--gmx, 50%) var(--gmy, 50%), rgba(255,255,255,0.32), transparent 65%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0 group-hover/glass:animate-shimmer group-hover/glass:opacity-100"
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  const classes = cn(
    "group/glass relative isolate inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full font-semibold tracking-wide transition-all duration-300 ease-out-expo active:scale-[0.97] active:translate-y-px",
    sizeMap[size],
    variantMap[variant],
    disabled && "pointer-events-none opacity-50",
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
