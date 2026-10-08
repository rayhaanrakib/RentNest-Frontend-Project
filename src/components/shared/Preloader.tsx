"use client";

import { motion, useReducedMotion } from "framer-motion";
import { KeyRound } from "lucide-react";
import { useEffect, useState } from "react";

const SESSION_KEY = "rentnest-intro-seen";

const Preloader = () => {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);

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
      setProgress((current) => {
        const next = current + (100 - current) * 0.16 + 1;
        return next >= 100 ? 100 : next;
      });
    }, 50);

    const exitTimer = window.setTimeout(() => setLeaving(true), 950);
    const doneTimer = window.setTimeout(() => setVisible(false), 1550);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-ink"
      initial={false}
      animate={leaving ? { y: reduceMotion ? 0 : "-100%", opacity: reduceMotion ? 0 : 1 } : { y: "0%", opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow-brand">
          <KeyRound className="h-6 w-6 text-white" aria-hidden="true" />
        </span>
        <span className="font-display text-3xl font-semibold tracking-tight text-white">
          RentNest
        </span>
      </motion.div>

      <div className="mt-8 h-0.5 w-40 overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-amber-300 transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};

export default Preloader;
