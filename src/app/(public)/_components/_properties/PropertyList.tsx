import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getProperties } from "@public/_actions/getData";
import { IProperty } from "@/types";

import PropertyCard from "./PropertyCard";

interface PropertyListProps {
  query: Record<string, string | string[] | undefined>;
}

const PropertyList = async ({ query }: PropertyListProps) => {
  const res = await getProperties(query);

  const properties = res?.properties || [];
  const meta = res?.meta || {
    page: 1,
    totalPage: 1,
    total_property: 0,
  };

  const createPageLink = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, String(value));
      }
    });

    params.set("page", String(page));

    return `/properties?${params.toString()}`;
  };

  return (
    <>
      {/* Results Count */}
      <div className="flex items-center justify-between my-8 border-b border-slate-200 pb-4">
        <p className="text-sm text-slate-500 font-medium">
          Showing{" "}
          <span className="text-slate-900 font-bold">{properties.length}</span>{" "}
          of{" "}
          <span className="text-slate-900 font-bold">
            {meta.total_property}
          </span>{" "}
          properties
        </p>
      </div>

      {/* Property Grid */}
      {properties.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            No properties found
          </h3>
          <p className="text-slate-500">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property: IProperty) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {meta.totalPage > 1 && (
        <div className="mt-16 flex items-center justify-center gap-2">
          {/* Previous */}
          <Link
            href={createPageLink(Math.max(1, meta.page - 1))}
            className={`w-11 h-11 flex items-center justify-center rounded-full border transition-all ${
              meta.page === 1
                ? "border-slate-200 text-slate-300 pointer-events-none"
                : "border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900"
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <Link
            href={createPageLink(meta.page)}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-900 text-white text-sm font-medium"
          >
            {meta.page}
          </Link>

          {/* Next */}
          <Link
            href={createPageLink(Math.min(meta.totalPage, meta.page + 1))}
            className={`w-11 h-11 flex items-center justify-center rounded-full border transition-all ${
              meta.page === meta.totalPage
                ? "border-slate-200 text-slate-300 pointer-events-none"
                : "border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900"
            }`}
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </>
  );
};

export default PropertyList;
