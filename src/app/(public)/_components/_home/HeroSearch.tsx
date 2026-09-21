"use client";

import GlassButton from "@/components/shared/GlassButton";
import type { ICategory } from "@/types";
import { ArrowRight, MapPin, Tag, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface HeroSearchProps {
  categories: ICategory[];
}

/**
 * Glass search bar. Routes to /properties using the same query params the
 * existing listing filters consume (`search`, `category`).
 * `maxPrice` is carried for forward-compatibility — the listing filters can
 * pick it up once the backend supports it.
 */
const HeroSearch = ({ categories }: HeroSearchProps) => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!location.trim() && !category && !maxPrice) {
      setHasError(true);
      toast.error("Tell us what you're looking for first.");
      return;
    }

    const params = new URLSearchParams();
    if (location.trim()) params.set("search", location.trim());
    if (category) params.set("category", category);
    if (maxPrice) params.set("maxPrice", maxPrice);

    toast.success("Searching homes…");
    router.push(`/properties?${params.toString()}`);
  };

  const fieldShell =
    "flex h-12 w-full items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 text-sm text-white transition-colors focus-within:border-white/40";
  const fieldControl =
    "w-full bg-transparent text-white placeholder:text-white/55 focus:outline-none [&>option]:bg-ink [&>option]:text-white";

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Search rental properties"
      noValidate
      className="w-full"
    >
      <div
        className={`grid w-full grid-cols-1 gap-2 rounded-[2rem] border border-white/20 bg-white/10 p-2 shadow-glass backdrop-blur-xl transition-shadow md:grid-cols-[1.25fr_1fr_1fr_auto] md:rounded-full ${
          hasError ? "ring-2 ring-red-400/80" : ""
        }`}
      >
        <label className={fieldShell}>
          <MapPin className="h-4 w-4 shrink-0 text-white/60" aria-hidden="true" />
          <span className="sr-only">City or area</span>
          <input
            type="text"
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
              setHasError(false);
            }}
            placeholder="City or area"
            className={fieldControl}
          />
        </label>

        <label className={fieldShell}>
          <Tag className="h-4 w-4 shrink-0 text-white/60" aria-hidden="true" />
          <span className="sr-only">Property type</span>
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setHasError(false);
            }}
            className={`${fieldControl} cursor-pointer ${category ? "" : "text-white/55"}`}
          >
            <option value="">Any type</option>
            {categories.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className={fieldShell}>
          <Wallet className="h-4 w-4 shrink-0 text-white/60" aria-hidden="true" />
          <span className="sr-only">Monthly budget</span>
          <select
            value={maxPrice}
            onChange={(event) => {
              setMaxPrice(event.target.value);
              setHasError(false);
            }}
            className={`${fieldControl} cursor-pointer ${maxPrice ? "" : "text-white/55"}`}
          >
            <option value="">Any budget</option>
            <option value="10000">Under 10,000 / mo</option>
            <option value="25000">Under 25,000 / mo</option>
            <option value="50000">Under 50,000 / mo</option>
            <option value="100000">Under 100,000 / mo</option>
          </select>
        </label>

        <GlassButton
          type="submit"
          variant="solid"
          size="md"
          ariaLabel="Search properties"
          className="w-full md:w-auto md:px-8"
        >
          Search
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </GlassButton>
      </div>

      <p aria-live="polite" className="sr-only">
        {hasError ? "Please enter a location, type, or budget to search." : ""}
      </p>
    </form>
  );
};

export default HeroSearch;