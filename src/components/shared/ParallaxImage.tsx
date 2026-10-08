"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ParallaxImageProps {
  children: React.ReactNode;
  className?: string;
  /** Total vertical travel in percent of the element height (default 12). */
  distance?: number;
}

/**
 * Scroll-linked parallax wrapper. Transform-only (GPU friendly).
 * Parallax is disabled for reduced-motion users and on small screens,
 * where the layer renders statically.
 *
 * Shared by the About and Properties heroes so both move identically.
 */
const ParallaxImage = ({
  children,
  className,
  distance = 12,
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const half = distance / 2;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-half}%`, `${half}%`],
  );

  const disabled = reduceMotion || isMobile;

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full w-full will-change-transform"
        style={disabled ? undefined : { y }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxImage;
