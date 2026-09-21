import GlassButton from "@/components/shared/GlassButton";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import Section from "@/components/shared/Section";
import { ArrowRight, Check, Handshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const perks = [
  "List a property in minutes with photos and amenities",
  "Get requests from verified tenants, in one inbox",
  "Approve, track, and get paid — all from your dashboard",
];

/** Split image + copy band inviting owners to list on RentNest. */
const HomepageBecomeLandlordSection = () => {
  return (
    <Section tone="default" ariaLabelledby="landlord-heading">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Imagery */}
        <RevealOnScroll className="relative" amount={0.25}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
            <Image
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80"
              alt="Landlord handing over keys to a bright modern apartment"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1.4s] ease-out hover:scale-105"
            />
          </div>
          {/* Floating proof card */}
          <div className="absolute -bottom-6 left-6 flex items-center gap-4 rounded-2xl border border-slate-100 bg-white/95 p-4 pr-6 shadow-lift backdrop-blur md:left-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Handshake className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-2xl font-semibold text-slate-900">
                3,200+
              </p>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                landlords earn with us
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Copy */}
        <RevealOnScroll delay={0.1} amount={0.25}>
          <span className="mb-4 inline-block rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
            For owners
          </span>
          <h2
            id="landlord-heading"
            className="font-display text-title font-semibold text-slate-900"
          >
            Turn your property into steady income
          </h2>
          <p className="mt-4 text-lead text-slate-500">
            RentNest handles the busywork — verified tenants, structured
            requests, and secure payouts — so you can focus on the returns.
          </p>

          <ul className="mt-7 space-y-3.5">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-slate-700">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-600">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="text-sm leading-relaxed md:text-base">
                  {perk}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <GlassButton href="/register" variant="ink" size="lg">
              Become a landlord
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </GlassButton>
            <Link
              href="/#how-it-works"
              className="text-sm font-semibold text-slate-900 underline decoration-brand-300 decoration-2 underline-offset-4 transition-colors hover:text-brand-600"
            >
              See how renting works
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </Section>
  );
};

export default HomepageBecomeLandlordSection;