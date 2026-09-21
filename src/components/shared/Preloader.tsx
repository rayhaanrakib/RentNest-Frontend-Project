"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SiteIcon } from "@/components/icons/sharedIcon";

const SESSION_KEY = "rentnest-intro-seen";

const Preloader = () => {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) return;
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      return;
    }
    const frame = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";

    const tick = window.setInterval(() => {
      setCounter((current) => {
        const next = current + (100 - current) * 0.18 + 1;
        return next >= 100 ? 100 : Math.floor(next);
      });
    }, 40);

    const exitTimer = window.setTimeout(() => setLeaving(true), 1600);
    const doneTimer = window.setTimeout(() => setVisible(false), 2400);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-hidden bg-[#050508]"
          exit={{ opacity: 0 }}
        >
          {/* Animated grid backdrop */}
          <div className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Gradient orb glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute h-[600px] w-[600px] rounded-full bg-brand-500/20 blur-[130px]"
          />

          {/* Split panels exit */}
          <motion.div
            className="absolute left-0 top-0 h-full w-1/2 bg-[#050508] z-40"
            initial={{ x: 0 }}
            animate={leaving && !reduceMotion ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1], delay: 0.1 }}
          />
          <motion.div
            className="absolute right-0 top-0 h-full w-1/2 bg-[#050508] z-40"
            initial={{ x: 0 }}
            animate={leaving && !reduceMotion ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1], delay: 0.1 }}
          />

          {/* Content */}
          <div className="relative z-30 flex flex-col items-center">
            {/* Top eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40"
            >
              <span className="h-1 w-1 rounded-full bg-brand-400 animate-pulse" />
              Initializing Experience
            </motion.div>

            {/* Logo reveal with mask */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="relative"
            >
              <SiteIcon className="h-8 w-auto text-white" />
            </motion.div>

            {/* Counter + Progress */}
            <div className="mt-14 flex flex-col items-center gap-4">
              <div className="flex items-baseline gap-1 font-mono">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-6xl font-bold tabular-nums text-white tracking-tighter"
                >
                  {String(counter).padStart(3, "0")}
                </motion.span>
                <span className="text-lg text-white/40">%</span>
              </div>

              {/* Bar */}
              <div className="mt-4 h-[2px] w-[220px] overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand-400 via-brand-300 to-white"
                  style={{ width: `${counter}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              {/* Bottom Marquee tags */}
              <div className="mt-8 flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-white/30">
                <span>Trust</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>Verified</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span>Secure</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;