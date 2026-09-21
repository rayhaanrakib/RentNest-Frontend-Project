"use client";

import { EASE_OUT_EXPO } from "@/lib/motion";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

interface AnimatedCounterProps {
  /** Target number to count to. */
  value: number;
  /** Decimal places to keep while counting. */
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/** Counts up when scrolled into view; static final value for reduced motion. */
const AnimatedCounter = ({
  value,
  decimals = 0,
  duration = 1.8,
  prefix = "",
  suffix = "",
  className,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals],
  );

  const [display, setDisplay] = useState(() => formatter.format(0));

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT_EXPO,
      onUpdate: (latest) => setDisplay(formatter.format(latest)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, duration, formatter]);

  // Reduced-motion users get the final value immediately, no animation.
  const shown = reduceMotion ? formatter.format(value) : display;

  return (
    <span className={className}>
      <span aria-hidden="true" ref={ref}>
        {prefix}
        {shown}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {formatter.format(value)}
        {suffix}
      </span>
    </span>
  );
};

export default AnimatedCounter;