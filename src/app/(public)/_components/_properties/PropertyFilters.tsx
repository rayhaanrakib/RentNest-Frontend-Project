"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Tag, CheckCircle } from "lucide-react";
import { ICategory } from "@/types";

interface PropertyFiltersProps {
  categories: ICategory[];
}

const PropertyFilters = ({ categories }: PropertyFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const currentCategory = searchParams.get("category") || "";
  const currentStatus = searchParams.get("status") || "";

  const updateQueryParams = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (params.get(key) === value) return;

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete("page");

    router.push(`/properties?${params.toString()}`);
  }, [searchParams, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateQueryParams("search", search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, updateQueryParams]);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-2 mb-8 sticky top-24 z-30 backdrop-blur-xl bg-white/90">
      <div className="flex flex-col md:flex-row gap-2">
        {/* Search Input */}
        <div className="flex-1 flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-100 min-w-[200px]">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder-slate-400"
          />
        </div>

        {/* Category Select */}
        <div className="flex-1 flex items-center gap-2 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-100">
          <Tag className="h-5 w-5 text-slate-400" />
          <select
            value={currentCategory}
            onChange={(e) => updateQueryParams("category", e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-slate-700 cursor-pointer"
          >
            <option value="">All Categories</option>

            {categories.map((category: ICategory) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Availability Select */}
        <div className="flex-1 flex items-center gap-2 px-4 py-3">
          <CheckCircle className="h-5 w-5 text-slate-400" />
          <select
            value={currentStatus}
            onChange={(e) => updateQueryParams("status", e.target.value)}
            className="w-full bg-transparent outline-none text-sm text-slate-700 cursor-pointer"
          >
            <option value="">All Status</option>
            <option value="AVAILABLE">Available</option>
            <option value="RENTED">Rented</option>
          </select>
        </div>
      </div>
    </div>
  );
}
export default PropertyFilters;
