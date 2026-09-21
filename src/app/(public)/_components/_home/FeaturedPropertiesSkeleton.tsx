import Section from "@/components/shared/Section";
import { Skeleton } from "@/components/ui/skeleton";

/** Mirrors <HomepageFeaturedPropertiesSection> 3-column card grid exactly
 *  to avoid layout shift while listings stream in. */
const FeaturedPropertiesSkeleton = () => {
  return (
    <Section tone="muted" aria-hidden="true">
      <div className="mb-12 flex flex-col items-start justify-between gap-5 md:mb-16 md:flex-row md:items-end">
        <div className="w-full max-w-xl space-y-4">
          <Skeleton className="h-7 w-36 rounded-full" />
          <Skeleton className="h-11 w-4/5 rounded-2xl" />
          <Skeleton className="h-5 w-2/3 rounded-full" />
        </div>
        <Skeleton className="h-9 w-44 rounded-full" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="relative h-[26rem] overflow-hidden rounded-[1.75rem] bg-white shadow-sm"
          >
            <Skeleton className="absolute inset-0 rounded-none" />
            <div className="absolute inset-x-5 bottom-5 space-y-3">
              <Skeleton className="h-3 w-1/2 rounded-full" />
              <Skeleton className="h-6 w-3/4 rounded-xl" />
              <Skeleton className="h-4 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default FeaturedPropertiesSkeleton;