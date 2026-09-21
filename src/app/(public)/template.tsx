"use client";

import { EASE_OUT_EXPO } from "@/lib/motion";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Page-to-page transition for the public site.
 *
 * App Router note: `template.tsx` remounts on every navigation, which gives
 * us a reliable ENTER animation. True exit animations aren't available in
 * the App Router (the old tree unmounts before the new one mounts), so the
 * pattern is: quick fade-slide in, and let the RouteProgress bar carry the
 * visual continuity on the way out.
 */
const PublicTemplate = ({ children }: { children: React.ReactNode }) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  // NOTE: <div>, not <main> — the (public)/layout already owns the <main>
  // landmark with the skip-to-content target, and nested mains are invalid.
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
};

export default PublicTemplate;