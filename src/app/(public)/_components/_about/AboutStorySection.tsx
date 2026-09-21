import RevealOnScroll from "@/components/shared/RevealOnScroll";
import Section from "@/components/shared/Section";
import { Compass } from "lucide-react";
import Image from "next/image";

/** Split layout: sticky imagery beside the story of why RentNest exists. */
const AboutStorySection = () => {
  return (
    <Section tone="paper" spacing="loose" ariaLabelledby="story-heading">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Sticky imagery column */}
        <div className="relative lg:order-2">
          <div className="lg:sticky lg:top-28">
            <RevealOnScroll amount={0.25}>
              <div className="relative aspect-[4/5] max-h-[34rem] w-full overflow-hidden rounded-[2rem] shadow-lift">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"
                  alt="Warm, minimalist apartment interior with soft evening light"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <figure className="absolute -bottom-8 -left-4 hidden w-56 rounded-2xl border border-slate-100 bg-white p-4 shadow-lift md:block">
                <blockquote className="text-sm leading-relaxed text-slate-600">
                  “We didn&rsquo;t set out to build a listings site. We set out
                  to build trust.”
                </blockquote>
                <figcaption className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
                  RentNest founding team
                </figcaption>
              </figure>
            </RevealOnScroll>
          </div>
        </div>

        {/* Copy column */}
        <div className="lg:order-1">
          <RevealOnScroll amount={0.25}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
              Why we exist
            </span>
            <h2
              id="story-heading"
              className="font-display text-title font-semibold text-slate-900"
            >
              Renting was broken.
              <br />
              We kept the good parts.
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.08} amount={0.25} className="mt-6 space-y-5 text-base leading-relaxed text-slate-600 md:text-lg">
            <p>
              In 2021, our founders spent three weeks hunting for an apartment:
              stale listings, vanished brokers, deposits wired on blind trust.
              The search ended in a great flat — and a stubborn question: why
              does finding a home feel like a part-time job?
            </p>
            <p>
              RentNest started as a weekend project to answer it. Verify every
              listing. Put requests and approvals in writing. Move payments to
              infrastructure people already trust. Then wrap it all in an
              experience calm enough that moving house feels exciting again.
            </p>
            <p>
              Today, thousands of tenants and landlords across 120+ cities use
              RentNest to skip the maze. The mission hasn&rsquo;t changed: make the
              moment you get your keys feel like the best part of moving.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.14} amount={0.25}>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
              {[
                { value: "2021", label: "Founded" },
                { value: "120+", label: "Cities" },
                { value: "4.9/5", label: "Avg. tenant rating" },
              ].map((item) => (
                <div key={item.label}>
                  <dd className="font-display text-2xl font-semibold text-slate-900 md:text-3xl">
                    {item.value}
                  </dd>
                  <dt className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                    {item.label}
                  </dt>
                </div>
              ))}
            </dl>
          </RevealOnScroll>
        </div>
      </div>
    </Section>
  );
};

export default AboutStorySection;