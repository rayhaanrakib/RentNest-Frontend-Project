"use client";

import {
  EASE_OUT_EXPO,
  riseItem,
  staggerContainer,
} from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  /** Extra delay before the reveal starts (seconds). */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  /** Only reveal the first time it enters the viewport. */
  once?: boolean;
  /** How much of the element must be visible before revealing (0–1). */
  amount?: number;
}

/** Fade-up reveal when scrolled into view. Honors prefers-reduced-motion. */
const RevealOnScroll = ({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  amount = 0.3,
}: RevealOnScrollProps) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
}

/** Parent that staggers any nested <StaggerItem> children on scroll entry. */
export const StaggerGroup = ({
  children,
  className,
  once = true,
  amount = 0.2,
}: StaggerGroupProps) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

/** Child of <StaggerGroup> — timing inherited from the parent container. */
export const StaggerItem = ({ children, className }: StaggerItemProps) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={riseItem}>
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;