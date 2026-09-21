import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface SectionHeaderProps {
  /** Small pill label above the title, e.g. "Featured Listings". */
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  /** "dark" when rendered on `--ink` surfaces. */
  tone?: "light" | "dark";
  /** Optional trailing link (e.g. "View all properties"). */
  action?: { href: string; label: string };
  /** id for the heading — wire to the parent Section's ariaLabelledby. */
  headingId?: string;
  className?: string;
}

/** Eyebrow + display-serif title + supporting copy, optionally with a CTA link. */
const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
  action,
  headingId,
  className,
}: SectionHeaderProps) => {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "mb-12 md:mb-16 flex flex-col gap-5",
        align === "center"
          ? "items-center text-center"
          : "items-start md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "left" && "md:max-w-xl")}>
        {eyebrow ? (
          <span
            className={cn(
              "mb-4 inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
              isDark
                ? "border-brand-400/30 bg-brand-400/10 text-brand-300"
                : "border-brand-100 bg-brand-50 text-brand-700",
            )}
          >
            {eyebrow}
          </span>
        ) : null}
        <h2
          id={headingId}
          className={cn(
            "font-display text-title font-semibold text-balance",
            isDark ? "text-white" : "text-slate-900",
          )}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={cn(
              "mt-4 text-lead",
              isDark ? "text-slate-400" : "text-slate-500",
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </div>

      {action ? (
        <Link
          href={action.href}
          className={cn(
            "group inline-flex shrink-0 items-center gap-2 text-sm font-semibold transition-colors",
            isDark
              ? "text-white hover:text-brand-300"
              : "text-slate-900 hover:text-brand-600",
          )}
        >
          {action.label}
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
              isDark
                ? "border-white/20 group-hover:border-brand-300/60"
                : "border-slate-200 group-hover:border-brand-300",
            )}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </Link>
      ) : null}
    </div>
  );
};

export default SectionHeader;