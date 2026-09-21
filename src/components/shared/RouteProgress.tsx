"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
    <div key={cycle} className="fixed inset-x-0 top-0 z-[100] pointer-events-none">
      {/* Ambient glow layer */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[6px] origin-left bg-gradient-to-r from-transparent via-brand-400/40 to-transparent blur-md"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: [1, 1, 0] }}
        transition={{
          scaleX: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.85, times: [0, 0.7, 1] },
        }}
      />

      {/* Solid progress bar */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-brand-500 via-brand-300 to-white"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: [1, 1, 0] }}
        transition={{
          scaleX: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.75, times: [0, 0.75, 1] },
        }}
      />

      {/* Shimmer highlight sweep */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent w-24"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "1000%", opacity: [0, 1, 0] }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </div>
  );
};

export default RouteProgress;