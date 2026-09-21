"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const ENABLE_CUSTOM_CURSOR = true;

const CustomCursor = () => {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 200, damping: 24, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 200, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (!ENABLE_CUSTOM_CURSOR || reduceMotion) return;
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    const handleMove = (event: PointerEvent) => {
      dotX.set(event.clientX);
      dotY.set(event.clientY);
      setEnabled(true);

      // Detect hovering over interactive elements
      const target = event.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor='hover']");
      setIsHovering(!!interactive);
    };

    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [dotX, dotY, reduceMotion]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing ring — grows on hover */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] hidden md:block"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="rounded-full border border-brand-400/60 mix-blend-difference backdrop-blur-[1px]"
          animate={{
            width: isHovering ? 56 : isClicking ? 20 : 32,
            height: isHovering ? 56 : isClicking ? 20 : 32,
            x: isHovering ? "-50%" : "-50%",
            y: isHovering ? "-50%" : "-50%",
            borderWidth: isHovering ? 1.5 : 1,
            opacity: isClicking ? 0.5 : 1,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.6 }}
          style={{
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      </motion.div>

      {/* Center dot — shrinks on hover */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[96] hidden md:block"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="rounded-full bg-brand-400 mix-blend-difference"
          animate={{
            width: isHovering ? 4 : isClicking ? 12 : 6,
            height: isHovering ? 4 : isClicking ? 12 : 6,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;