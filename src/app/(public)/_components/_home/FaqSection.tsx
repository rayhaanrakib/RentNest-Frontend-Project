"use client";

import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import RevealOnScroll from "@/components/shared/RevealOnScroll";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I rent a property on RentNest?",
    answer:
      "Find a home you love, open the listing, and send a rental request with your move-in date, stay duration, and a short message. The landlord reviews it, and once approved you pay securely through Stripe — your booking is confirmed instantly.",
  },
  {
    question: "How long does approval usually take?",
    answer:
      "Most landlords respond within 24 hours. You can track every request live from your tenant dashboard — pending, approved, or rejected — so you're never left guessing.",
  },
  {
    question: "Are the listings really verified?",
    answer:
      "Yes. Every listing passes photo, document, and landlord identity checks before going live, and it's delisted the moment it's rented. If something looks off, our team investigates reports within a day.",
  },
  {
    question: "How do payments work?",
    answer:
      "Payments are processed by Stripe over PCI-DSS Level 1 infrastructure. RentNest never stores your card details, and you'll receive an instant receipt plus a payment history in your dashboard.",
  },
  {
    question: "What documents do I need as a tenant?",
    answer:
      "A verified account is usually enough to request a home. Some landlords may ask for ID or proof of income before approving — you'll see any requirements clearly on the listing before you apply.",
  },
  {
    question: "Can I cancel a rental request?",
    answer:
      "You can withdraw a request any time before payment from your dashboard. After payment, reach out to support — refunds follow the cancellation terms shown on the listing at checkout.",
  },
  {
    question: "I'm a landlord — what does RentNest charge?",
    answer:
      "Creating an account and listing your first properties is free. A small service fee applies only on completed bookings, so you never pay for an empty calendar.",
  },
];

/** Accessible FAQ accordion (keyboard navigable via Base UI). */
const HomepageFaqSection = () => {
  return (
    <Section id="faq" tone="paper" ariaLabelledby="faq-heading">
      <SectionHeader
        eyebrow="Good to know"
        title="Frequently asked questions"
        subtitle="Everything tenants and landlords ask us before their first booking."
        align="center"
        headingId="faq-heading"
      />

      <RevealOnScroll className="mx-auto max-w-3xl" y={20}>
        <Accordion
          defaultValue={["faq-0"]}
          className="rounded-3xl border-slate-200/80 bg-white shadow-sm"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="px-6 py-5 text-base font-semibold text-slate-900 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 text-sm leading-relaxed text-slate-500">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </RevealOnScroll>
    </Section>
  );
};

export default HomepageFaqSection;