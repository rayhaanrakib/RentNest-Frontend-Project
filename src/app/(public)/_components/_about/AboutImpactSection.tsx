import AnimatedCounter from "@/components/shared/AnimatedCounter";
import Container from "@/components/shared/Container";
import SectionHeader from "@/components/shared/SectionHeader";
import RevealOnScroll from "@/components/shared/RevealOnScroll";

const impactStats = [
  { value: 8000, suffix: "+", label: "Verified homes listed" },
  { value: 15500, suffix: "+", label: "Tenants rehoused" },
  { value: 120, suffix: "+", label: "Cities & counting" },
  { value: 98, suffix: "%", label: "Requests answered in 24h" },
];

/** Dark impact band with animated counters, framed by curved dividers so the
 *  light → dark → light transition feels crafted instead of abrupt. */
const AboutImpactSection = () => {
  return (
    <div className="relative bg-white">
      {/* Top curve into the dark band */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className="block h-12 w-full text-ink md:h-[4.5rem]"
      >
        <path
          d="M0,72 C360,0 1080,0 1440,72 L1440,72 L0,72 Z"
          fill="currentColor"
        />
      </svg>

      <section
        aria-labelledby="impact-heading"
        className="relative overflow-hidden bg-ink pb-16 pt-4 text-slate-100 md:pb-20"
      >
        <div aria-hidden="true" className="absolute inset-0 bg-grid-faint" />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-brand-500/15 blur-[130px]"
        />

        <Container className="relative z-10">
          <SectionHeader
            eyebrow="Impact"
            title="Numbers that keep us honest"
            subtitle="Every metric here maps to a real move, a real set of keys, a real home."
            align="center"
            tone="dark"
            headingId="impact-heading"
            className="mb-10 md:mb-12"
          />

          <RevealOnScroll amount={0.3}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
              {impactStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-2 border-white/10 text-center lg:border-l lg:first:border-l-0"
                >
                  <dd className="font-display text-4xl font-semibold text-white md:text-5xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="max-w-[12rem] text-sm font-medium uppercase tracking-[0.12em] text-slate-400">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Bottom curve back to the light page */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className="block h-12 w-full rotate-180 text-ink md:h-[4.5rem]"
      >
        <path
          d="M0,72 C360,0 1080,0 1440,72 L1440,72 L0,72 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default AboutImpactSection;