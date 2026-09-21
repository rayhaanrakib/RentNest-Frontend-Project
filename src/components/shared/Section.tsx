import { cn } from "@/lib/utils";
import Container from "./Container";

type SectionTone = "default" | "muted" | "paper" | "dark";
type SectionSpacing = "default" | "tight" | "loose" | "none";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Inner rail padding (vertical rhythm). */
  spacing?: SectionSpacing;
  /** Surface treatment. */
  tone?: SectionTone;
  /** Wrap children in the shared Container (default true). */
  contained?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
}

const spacingMap: Record<SectionSpacing, string> = {
  default: "py-20 md:py-28",
  tight: "py-14 md:py-20",
  loose: "py-24 md:py-36",
  none: "",
};

const toneMap: Record<SectionTone, string> = {
  default: "bg-white text-slate-900",
  muted: "bg-slate-50 text-slate-900",
  paper: "bg-paper text-slate-900",
  dark: "bg-ink text-slate-100",
};

/** Consistent page section: vertical rhythm + surface + optional rail. */
const Section = ({
  children,
  id,
  className,
  spacing = "default",
  tone = "default",
  contained = true,
  ariaLabel,
  ariaLabelledby,
}: SectionProps) => {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      className={cn(
        "relative overflow-hidden",
        spacingMap[spacing],
        toneMap[tone],
        className,
      )}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
};

export default Section;