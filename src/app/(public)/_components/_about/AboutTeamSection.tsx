import RevealOnScroll, {
  StaggerGroup,
  StaggerItem,
} from "@/components/shared/RevealOnScroll";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import {
  Code2,
  CreditCard,
  PenTool,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

interface CraftCard {
  icon: LucideIcon;
  glyph: string;
  title: string;
  role: string;
  reveal: string;
  accent: string;
}

const crew: CraftCard[] = [
  {
    icon: Code2,
    glyph: "</>",
    title: "Product Engineering",
    role: "Platform & API",
    reveal:
      "Next.js 16 App Router, Server Actions, and a server-first mindset.",
    accent: "from-brand-500 to-brand-700",
  },
  {
    icon: PenTool,
    glyph: "Aa",
    title: "Experience Design",
    role: "Interface & Motion",
    reveal:
      "Typography-first layouts, honest spacing, motion that respects you.",
    accent: "from-amber-400 to-orange-600",
  },
  {
    icon: ShieldCheck,
    glyph: "✓",
    title: "Trust & Safety",
    role: "Verification",
    reveal:
      "The playbook behind every verified badge on the marketplace.",
    accent: "from-emerald-400 to-teal-600",
  },
  {
    icon: CreditCard,
    glyph: "$",
    title: "Payments",
    role: "Checkout & Payouts",
    reveal:
      "Stripe-powered checkout flows, receipts, and refund paths.",
    accent: "from-violet-400 to-purple-600",
  },
];

/** "Built by" grid — hover a card to reveal what each craft obsesses over. */
const AboutTeamSection = () => {
  return (
    <Section tone="paper" ariaLabelledby="team-heading">
      <SectionHeader
        eyebrow="Built by"
        title="A small crew, obsessed with the details"
        subtitle="No hundred-person org chart — just four crafts sweating every pixel, query, and edge case."
        align="center"
        headingId="team-heading"
      />

      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {crew.map((member) => (
          <StaggerItem key={member.title}>
            <div className="group relative h-72 overflow-hidden rounded-3xl shadow-sm transition-shadow duration-300 hover:shadow-lift">
              {/* Front: gradient glyph card */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-gradient-to-br ${member.accent}`}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-grid-faint opacity-60"
              />
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 font-display text-6xl font-semibold text-white/85 transition-all duration-500 ease-out-expo group-hover:top-[30%] group-hover:scale-75 group-hover:opacity-40"
              >
                {member.glyph}
              </span>

              {/* Reveal panel */}
              <div className="absolute inset-x-0 bottom-0 translate-y-[4.2rem] bg-ink/85 p-5 backdrop-blur-md transition-transform duration-500 ease-out-expo group-hover:translate-y-0 group-focus-within:translate-y-0">
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <member.icon className="h-4 w-4 text-brand-300" aria-hidden="true" />
                  {member.title}
                </p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.14em] text-slate-400">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {member.reveal}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <RevealOnScroll delay={0.1} className="mt-8 text-center">
        <p className="text-sm text-slate-500">
          Want to build the calm way to rent?{" "}
          <a
            href="mailto:hello@rentnest.app"
            className="font-semibold text-brand-600 underline decoration-brand-300 decoration-2 underline-offset-4 transition-colors hover:text-brand-700"
          >
            Say hello
          </a>
          .
        </p>
      </RevealOnScroll>
    </Section>
  );
};

export default AboutTeamSection;