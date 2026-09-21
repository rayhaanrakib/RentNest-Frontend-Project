import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerGroup, StaggerItem } from "@/components/shared/RevealOnScroll";
import PropertyCard from "@public/_components/_properties/PropertyCard";
import type { IProperty } from "@/types";
import { SearchX } from "lucide-react";
import Link from "next/link";

interface FeaturedPropertiesSectionProps {
  properties: IProperty[];
}

const HomepageFeaturedPropertiesSection = ({
  properties,
}: FeaturedPropertiesSectionProps) => {
  return (
    <Section
      id="featured"
      tone="muted"
      ariaLabelledby="featured-heading"
    >
      <SectionHeader
        eyebrow="Featured listings"
        title="Exceptional spaces, hand-picked"
        subtitle="A rotating selection of verified homes our community loves right now."
        action={{ href: "/properties", label: "View all properties" }}
        headingId="featured-heading"
      />

      {properties?.length ? (
        <StaggerGroup
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          amount={0.1}
        >
          {properties.map((property) => (
            <StaggerItem key={property.id}>
              <PropertyCard property={property} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-20 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-500">
            <SearchX className="h-7 w-7" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              No featured homes right now
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              New listings are added daily — browse the full collection instead.
            </p>
          </div>
          <Link
            href="/properties"
            className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            Browse all properties
          </Link>
        </div>
      )}
    </Section>
  );
};

export default HomepageFeaturedPropertiesSection;