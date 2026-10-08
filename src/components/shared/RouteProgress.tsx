"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Slim top progress bar that fires on every client-side navigation.
 * (The pathname changing is the completion signal in the App Router, so the
 * bar sweeps confidently and fades — it never hangs mid-way.)
 */
const RouteProgress = () => {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const isFirstRender = useRef(true);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setCycle((count) => count + 1);
  }, [pathname]);

  if (cycle === 0 || reduceMotion) return null;

  return (
    <motion.div
      key={cycle}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-brand-500 via-brand-400 to-amber-400"
      initial={{ scaleX: 0, opacity: 1 }}
      animate={{ scaleX: 1, opacity: [1, 1, 0] }}
      transition={{
        scaleX: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.7, times: [0, 0.75, 1] },
      }}
    />
  );
};

export default RouteProgress;
