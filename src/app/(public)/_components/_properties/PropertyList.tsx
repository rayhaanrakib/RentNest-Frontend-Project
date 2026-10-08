import type { IProperty } from "@/types";
import { ArrowLeft, ArrowRight, SearchX } from "lucide-react";
import Link from "next/link";
import { getProperties } from "@public/_actions/getData";

import PropertyCard from "./PropertyCard";

interface PropertyListProps {
  query: Record<string, string | string[] | undefined>;
}

const pageWindow = (current: number, total: number) => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }
  const pages = new Set<number>([1, total, current]);
  for (let offset = 1; offset <= 1; offset += 1) {
    if (current - offset > 1) pages.add(current - offset);
    if (current + offset < total) pages.add(current + offset);
  }
  return [...pages].sort((a, b) => a - b);
};

const PropertyList = async ({ query }: PropertyListProps) => {
  const res = await getProperties(query);

  const properties: IProperty[] = res?.properties ?? [];
  // Accept either meta spelling so a backend rename can't blank the pager.
  const page = Number(res?.meta?.page ?? query.page ?? 1);
  const totalPage = Number(res?.meta?.totalPage ?? res?.meta?.totalPages ?? 1);

  const createPageLink = (target: number) => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, String(value));
      }
    });
    params.set("page", String(target));

    return `/properties?${params.toString()}`;
  };

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-20 text-center">
        <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-slate-400">
          <SearchX className="h-6 w-6" aria-hidden="true" />
        </span>
        <h3 className="font-display text-2xl font-semibold text-slate-900">
          Nothing matches those filters
        </h3>
        <p className="mt-2 max-w-sm text-slate-500">
          Try a wider area, a different home type, or switch availability back to
          all listings.
        </p>
        <Link
          href="/properties"
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-slate-700"
        >
          Reset filters
        </Link>
      </div>
    );
  }

  const pages = pageWindow(page, totalPage);

  return (
    <>
      <p className="mb-6 text-sm text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-900 tabular-nums">
          {properties.length}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-slate-900 tabular-nums">
          {res?.meta?.total_property ?? res?.meta?.total ?? properties.length}
        </span>{" "}
        homes
      </p>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {totalPage > 1 ? (
        <nav
          aria-label="Pagination"
          className="mt-14 flex items-center justify-center gap-1.5"
        >
          <Link
            href={createPageLink(Math.max(1, page - 1))}
            aria-label="Previous page"
            aria-disabled={page === 1}
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ease-out-expo ${
              page === 1
                ? "pointer-events-none border-slate-100 text-slate-300"
                : "border-slate-200 text-slate-700 hover:-translate-y-0.5 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            }`}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>

          {pages.map((target, index) => {
            const isGap = index > 0 && target - pages[index - 1] > 1;
            const isCurrent = target === page;

            return (
              <span key={target} className="flex items-center gap-1.5">
                {isGap ? (
                  <span
                    aria-hidden="true"
                    className="px-1 text-sm text-slate-400"
                  >
                    …
                  </span>
                ) : null}
                {isCurrent ? (
                  <span
                    aria-current="page"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white"
                  >
                    {target}
                  </span>
                ) : (
                  <Link
                    href={createPageLink(target)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-sm font-medium text-slate-700 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                  >
                    {target}
                  </Link>
                )}
              </span>
            );
          })}

          <Link
            href={createPageLink(Math.min(totalPage, page + 1))}
            aria-label="Next page"
            aria-disabled={page === totalPage}
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ease-out-expo ${
              page === totalPage
                ? "pointer-events-none border-slate-100 text-slate-300"
                : "border-slate-200 text-slate-700 hover:-translate-y-0.5 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
            }`}
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
      ) : null}
    </>
  );
};

export default PropertyList;
