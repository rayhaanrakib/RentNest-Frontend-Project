import type { Variants } from "framer-motion";

/**
 * Shared motion language for the public design system.
 * Easing mirrors the signature "expo out" curve used across Awwwards
 * award sites: explosive start, buttery long settle.
 */
export const EASE_OUT_EXPO: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];
export const EASE_OUT_QUART: [number, number, number, number] = [
  0.25, 1, 0.5, 1,
];
export const EASE_IN_OUT: [number, number, number, number] = [
  0.83, 0, 0.17, 1,
];

/** Simple fade-up entrance — the default reveal for blocks of content. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/** Pure fade for layered overlays and hero furniture. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_OUT_QUART },
  },
};

/** Gentle pop for cards, chips and icon tiles. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

/** Parent container: orchestrates staggered children (use with `riseItem`). */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.12 },
  },
};

/** Child variant consumed by `staggerContainer` — no own timing props. */
export const riseItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE_OUT_EXPO },
  },
};

/** Masked line reveal for oversized display headlines. Parent span needs
 *  `overflow-hidden`. */
export const lineReveal: Variants = {
  hidden: { y: "112%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

/** Shared viewport config for whileInView reveals. */
export const revealViewport = {
  once: true,
  amount: 0.3,
} as const;