import Container from "@/components/shared/Container";
import type { ICategory } from "@/types";
import {
  getAllProperties,
  getCategories,
  getProperties,
} from "@public/_actions/getData";
import PropertiesHero from "@public/_components/_properties/PropertiesHero";
import PropertyFilters from "@public/_components/_properties/PropertyFilters";
import PropertyList from "@public/_components/_properties/PropertyList";
import PropertySkeleton from "@public/_components/_properties/PropertySkeleton";
import { Suspense } from "react";

export const metadata = {
  title: "Available rentals — RentNest",
  description:
    "Browse verified homes for rent across Dhaka — filter by area, home type and availability.",
};

const PropertySkeletonGrid = () => (
  <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
    {[...Array(6)].map((_, index) => (
      <PropertySkeleton key={index} />
    ))}
  </div>
);

const PropertyFiltersSkeleton = () => (
  <div className="animate-pulse rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-lift">
    <div className="flex flex-col gap-3 lg:flex-row">
      <div className="h-12 flex-1 rounded-xl bg-slate-100" />
      <div className="h-12 w-full rounded-xl bg-slate-100 lg:w-64" />
    </div>
    <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="h-8 w-24 rounded-full bg-slate-100" />
      ))}
    </div>
  </div>
);

const PropertyPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  /** Listings open on available homes; the rail can widen it to all. */
  const requestedStatus = Array.isArray(params.status)
    ? params.status[0]
    : params.status;
  const effectiveStatus: "AVAILABLE" | "RENTED" | "ALL" =
    requestedStatus === "RENTED" || requestedStatus === "ALL"
      ? requestedStatus
      : "AVAILABLE";

  /** "ALL" never reaches the API — omitting the param is what asks for both. */
  const query = {
    ...params,
    status: effectiveStatus === "ALL" ? undefined : effectiveStatus,
  };

  const [categories, allProperties, available] = await Promise.all([
    getCategories(),
    getAllProperties(),
    getProperties({ status: "AVAILABLE", limit: "1" }),
  ]);

  const categoryList: ICategory[] = categories ?? [];
  const areaCount = new Set(
    (allProperties ?? []).map((property: { city?: string }) => property.city),
  ).size;
  const availableCount = Number(
    available?.meta?.total_property ?? available?.meta?.total ?? 0,
  );

  return (
    <div className="bg-slate-50">
      <PropertiesHero
        availableCount={availableCount}
        areaCount={areaCount}
        categoryCount={categoryList.length}
      />

      <Container className="pb-24">
        <div className="-mt-12">
          <Suspense fallback={<PropertyFiltersSkeleton />}>
            <PropertyFilters
              categories={categoryList}
              defaultStatus={effectiveStatus}
            />
          </Suspense>
        </div>

        <div className="mt-10">
          <Suspense
            key={JSON.stringify(query)}
            fallback={<PropertySkeletonGrid />}
          >
            <PropertyList query={query} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default PropertyPage;
