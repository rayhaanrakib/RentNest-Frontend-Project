import Marquee from "@/components/shared/Marquee";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  city: string;
  initials: string;
  accent: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Found my apartment in two days. The request flow told me exactly where I stood at every step — no chasing brokers.",
    name: "Sarah Ahmed",
    role: "Tenant",
    city: "Gulshan, Dhaka",
    initials: "SA",
    accent: "from-brand-400 to-brand-600",
  },
  {
    quote:
      "As a landlord, the requests inbox is gold. Verified tenants, clear move-in dates, one click to approve.",
    name: "Tanvir Rahman",
    role: "Landlord",
    city: "Banani, Dhaka",
    initials: "TR",
    accent: "from-amber-400 to-orange-500",
  },
  {
    quote:
      "Paying the deposit through Stripe gave me instant peace of mind — receipt in my inbox seconds later.",
    name: "Maria Gomez",
    role: "Tenant",
    city: "Dhanmondi, Dhaka",
    initials: "MG",
    accent: "from-emerald-400 to-teal-600",
  },
  {
    quote:
      "I listed on a Sunday night and had three verified requests by Tuesday. The dashboard keeps everything sane.",
    name: "Arif Chowdhury",
    role: "Landlord",
    city: "Uttara, Dhaka",
    initials: "AC",
    accent: "from-violet-400 to-purple-600",
  },
  {
    quote:
      "The verified badge actually means something here. Every listing I toured matched its photos exactly.",
    name: "Nusrat Jahan",
    role: "Tenant",
    city: "Mirpur, Dhaka",
    initials: "NJ",
    accent: "from-rose-400 to-pink-600",
  },
  {
    quote:
      "Renting out my studio used to take a month of calls. On RentNest it took four days and zero phone tag.",
    name: "David Kim",
    role: "Landlord",
    city: "Bashundhara, Dhaka",
    initials: "DK",
    accent: "from-sky-400 to-blue-600",
  },
];

const TestimonialCard = ({ item }: { item: Testimonial }) => (
  <figure className="mx-3 flex w-[20rem] shrink-0 flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:w-[22rem]">
    <div>
      <div className="mb-4 flex gap-1" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className="h-4 w-4 fill-amber-400 text-amber-400"
          />
        ))}
      </div>
      <span className="sr-only">Rated 5 out of 5.</span>
      <blockquote className="text-sm leading-relaxed text-slate-600">
        “{item.quote}”
      </blockquote>
    </div>
    <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
      <span
        aria-hidden="true"
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white",
          item.accent,
        )}
      >
        {item.initials}
      </span>
      <div>
        <p className="text-sm font-semibold text-slate-900">{item.name}</p>
        <p className="text-xs text-slate-500">
          {item.role} · {item.city}
        </p>
      </div>
    </figcaption>
  </figure>
);

/** Two counter-scrolling testimonial marquees (pause on hover/focus). */
const HomepageTestimonialsSection = () => {
  const midpoint = Math.ceil(testimonials.length / 2);
  const firstRow = testimonials.slice(0, midpoint);
  const secondRow = testimonials.slice(midpoint);

  return (
    <Section
      id="testimonials"
      tone="default"
      contained={false}
      ariaLabelledby="testimonials-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Loved by both sides"
          title="Tenants and landlords agree"
          subtitle="Real stories from people who found a home — or filled one — through RentNest."
          align="center"
          headingId="testimonials-heading"
        />
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonials from RentNest members"
        className="space-y-5"
      >
        <Marquee duration="52s">
          {firstRow.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </Marquee>
        <Marquee duration="60s" reverse>
          {secondRow.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </Marquee>
      </div>
    </Section>
  );
};

export default HomepageTestimonialsSection;