import Container from "@/components/shared/Container";
import GlassButton from "@/components/shared/GlassButton";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import { ArrowRight } from "lucide-react";

interface CtaBandProps {
  title: React.ReactNode;
  subtitle?: string;
  eyebrow?: string;
  primaryAction: { href: string; label: string };
  secondaryAction?: { href: string; label: string };
  /** Small reassurance line under the buttons. */
  note?: string;
}

/** Large closing call-to-action band on a dark, glowing surface. */
const CtaBand = ({
  title,
  subtitle,
  eyebrow = "Get started",
  primaryAction,
  secondaryAction,
  note,
}: CtaBandProps) => {
  return (
    <section
      aria-labelledby="cta-band-heading"
      className="relative overflow-hidden bg-ink py-24 text-slate-100 md:py-32"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-grid-faint" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/15 blur-[140px]"
      />

      <Container className="relative z-10">
        <RevealOnScroll className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="glass-chip mb-6 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
            {eyebrow}
          </span>
          <h2
            id="cta-band-heading"
            className="font-display text-title font-semibold text-white"
          >
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-5 max-w-xl text-lead text-slate-400">{subtitle}</p>
          ) : null}
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <GlassButton href={primaryAction.href} size="lg">
              {primaryAction.label}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </GlassButton>
            {secondaryAction ? (
              <GlassButton href={secondaryAction.href} variant="ghost" size="lg">
                {secondaryAction.label}
              </GlassButton>
            ) : null}
          </div>
          {note ? (
            <p className="mt-7 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
              {note}
            </p>
          ) : null}
        </RevealOnScroll>
      </Container>
    </section>
  );
};

export default CtaBand;