"use client";

import { cn } from "@/lib/utils";
import type { ICategory } from "@/types";
import { Check, ListFilter, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface PropertyFiltersProps {
  categories: ICategory[];
  /**
   * Status applied when the URL carries none. The page opens on available
   * homes, so the rail has to highlight that same default instead of showing
   * "All" above a filtered grid.
   */
  defaultStatus: PropertyStatus;
}

export type PropertyStatus = "AVAILABLE" | "RENTED" | "ALL";

const STATUS_OPTIONS = [
  { value: "AVAILABLE", label: "Available" },
  { value: "RENTED", label: "Rented" },
  /** "ALL" is a UI-only value; the API filters on AVAILABLE/RENTED. */
  { value: "ALL", label: "All" },
] as const;

/**
 * Sticky filter rail for /properties.
 * Search is debounced; every other control writes the URL immediately so the
 * listing stays linkable and back/forward work as expected.
 */
/** Unknown status values in the URL fall back to the page default. */
const isPropertyStatus = (value: string | null): value is PropertyStatus =>
  STATUS_OPTIONS.some((option) => option.value === value);

const PropertyFilters = ({ categories, defaultStatus }: PropertyFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const currentCategory = searchParams.get("category") ?? "";
  const statusParam = searchParams.get("status");
  const currentStatus: PropertyStatus = isPropertyStatus(statusParam)
    ? statusParam
    : defaultStatus;

  const updateQuery = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.delete("page");

    router.push(`/properties?${params.toString()}`, { scroll: false });
  };

  // Debounced search → URL
  useEffect(() => {
    const timer = setTimeout(() => {
      if ((searchParams.get("search") ?? "") === search) return;
      updateQuery({ search });
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const hasActiveFilters = Boolean(search) || Boolean(currentCategory);

  const clearFilters = () => {
    setSearch("");
    router.push("/properties?status=AVAILABLE", { scroll: false });
  };

  return (
    <div className="sticky top-24 z-30 rounded-2xl border border-slate-200/80 bg-white/95 p-3 shadow-lift backdrop-blur-xl md:p-4">
      {/* Row 1 — search + status */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 px-4 transition-colors focus-within:border-brand-400 focus-within:bg-white">
          <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title or area"
            aria-label="Search properties"
            className="h-12 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
          {search ? (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="shrink-0 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>

        <div
          role="group"
          aria-label="Filter by availability"
          className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50/70 p-1"
        >
          {STATUS_OPTIONS.map((option) => {
            const isActive = currentStatus === option.value;
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={isActive}
                onClick={() => updateQuery({ status: option.value })}
                className={cn(
                  "h-10 rounded-lg px-4 text-sm font-medium transition-all duration-300 ease-out-expo",
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Row 2 — categories + sort */}
      <div className="mt-3 flex flex-col gap-3 border-t border-slate-100 pt-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-0.5">
          <span className="flex shrink-0 items-center gap-1.5 pl-1 pr-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            <ListFilter className="h-3.5 w-3.5" aria-hidden="true" />
            Type
          </span>

          <button
            type="button"
            aria-pressed={!currentCategory}
            onClick={() => updateQuery({ category: "" })}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-300 ease-out-expo",
              !currentCategory
                ? "border-brand-500 bg-brand-50 text-brand-700"
                : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900",
            )}
          >
            All
          </button>

          {categories.map((category) => {
            const isActive = currentCategory === category.name;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={isActive}
                onClick={() =>
                  updateQuery({ category: isActive ? "" : category.name })
                }
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-300 ease-out-expo",
                  isActive
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900",
                )}
              >
                {isActive ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : null}
                {category.name}
                {typeof category._count?.properties === "number" ? (
                  <span
                    className={cn(
                      "text-xs tabular-nums",
                      isActive ? "text-brand-500" : "text-slate-400",
                    )}
                  >
                    {category._count.properties}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="hidden shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:flex"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Reset
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PropertyFilters;
