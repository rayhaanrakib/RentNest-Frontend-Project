import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  /** CSS duration per full loop, e.g. "40s" (default 48s). */
  duration?: string;
  reverse?: boolean;
  /** Pause the loop while hovered or focused-within (default true). */
  pauseOnHover?: boolean;
}

/**
 * Pure-CSS marquee: content is duplicated (second copy is aria-hidden),
 * GPU-friendly transform animation only. Reduced-motion users get a plain
 * horizontally scrollable strip instead of animation.
 */
const Marquee = ({
  children,
  className,
  duration,
  reverse = false,
  pauseOnHover = true,
}: MarqueeProps) => {
  return (
    <div
      className={cn(
        "marquee-fade overflow-hidden motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max animate-marquee items-center",
          pauseOnHover &&
            "hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]",
          "motion-reduce:animate-none",
        )}
        style={{
          animationDuration: duration,
          animationDirection: reverse ? "reverse" : undefined,
        }}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Marquee;