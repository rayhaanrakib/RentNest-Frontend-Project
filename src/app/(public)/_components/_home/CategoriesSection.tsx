import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import { StaggerGroup, StaggerItem } from "@/components/shared/RevealOnScroll";
import type { ICategory } from "@/types";
import {
  ArrowUpRight,
  Building,
  Building2,
  Home,
  Hotel,
  KeyRound,
  Store,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

interface CategoriesSectionProps {
  categories: ICategory[];
}

/** Best-effort icon per category name, falling back to a key icon. */
const categoryIcons: [RegExp, LucideIcon][] = [
  [/apart|flat/i, Building2],
  [/house|villa|duplex|family/i, Home],
  [/studio/i, Building],
  [/office|commercial/i, Store],
  [/hostel|dorm|shared/i, Hotel],
  [/warehouse|storage/i, Warehouse],
];

const getCategoryIcon = (name: string): LucideIcon => {
  const match = categoryIcons.find(([pattern]) => pattern.test(name));
  return match ? match[1] : KeyRound;
};

const HomepageCategoriesSection = ({ categories }: CategoriesSectionProps) => {
  if (!categories?.length) return null;

  return (
    <Section id="categories" tone="paper" ariaLabelledby="categories-heading">
      <SectionHeader
        eyebrow="Explore"
        title="Browse by property type"
        subtitle="From city studios to family homes — start with the kind of space that fits your life."
        action={{ href: "/categories", label: "All categories" }}
        headingId="categories-heading"
      />

      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.slice(0, 6).map((category) => {
          const Icon = getCategoryIcon(category.name);
          const count = category._count?.properties;
          return (
            <StaggerItem key={category.id}>
              <Link
                href={`/properties?category=${encodeURIComponent(category.name)}`}
                className="group flex h-full items-center gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift md:p-6"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-base font-semibold text-slate-900">
                    {category.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-slate-500">
                    {typeof count === "number"
                      ? `${count} ${count === 1 ? "home" : "homes"}`
                      : (category.description ?? "Explore homes")}
                  </span>
                </span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500"
                  aria-hidden="true"
                />
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Section>
  );
};

export default HomepageCategoriesSection;