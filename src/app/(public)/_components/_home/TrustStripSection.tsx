import AnimatedCounter from "@/components/shared/AnimatedCounter";
import Marquee from "@/components/shared/Marquee";
import Section from "@/components/shared/Section";
import {
  BadgeCheck,
  CreditCard,
  HeartHandshake,
  LayoutDashboard,
  MessagesSquare,
  Star,
} from "lucide-react";

const stats = [
  { value: 8000, suffix: "+", label: "Properties listed" },
  { value: 15500, suffix: "+", label: "Happy tenants" },
  { value: 120, suffix: "+", label: "Cities covered" },
  { value: 3200, suffix: "+", label: "Verified landlords" },
];

const marqueeItems = [
  { icon: BadgeCheck, label: "Verified listings" },
  { icon: CreditCard, label: "Secure Stripe checkout" },
  { icon: LayoutDashboard, label: "Tenant & landlord dashboards" },
  { icon: HeartHandshake, label: "Transparent rental requests" },
  { icon: Star, label: "Real tenant reviews" },
  { icon: MessagesSquare, label: "Dedicated support" },
];

/** Animated proof-points band: counters + feature marquee. */
const HomepageTrustStripSection = () => {
  return (
    <Section spacing="tight" tone="default" ariaLabel="RentNest in numbers" className="border-b border-slate-100">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
            <dd className="font-display text-4xl font-semibold text-slate-900 md:text-5xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </dd>
            <dt className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>

      <Marquee className="mt-14" duration="38s">
        {marqueeItems.map((item) => (
          <span
            key={item.label}
            className="mx-6 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400"
          >
            <item.icon className="h-4 w-4 text-brand-500" aria-hidden="true" />
            {item.label}
            <span
              aria-hidden="true"
              className="ml-6 h-1 w-1 rounded-full bg-slate-300"
            />
          </span>
        ))}
      </Marquee>
    </Section>
  );
};

export default HomepageTrustStripSection;