import type { IProperty } from "@/types";
import { ArrowUpRight, Bath, BedDouble, MapPin, Maximize } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categoryImages: Record<string, string> = {
  Apartment:
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  House: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1200&q=80",
  Warehouse:
    "https://images.unsplash.com/photo-1644079446600-219068676743?auto=format&fit=crop&w=1200&q=80",
  "Office Space":
    "https://images.unsplash.com/photo-1698653223247-09aaf01166fc?auto=format&fit=crop&w=1200&q=80",
  "Commercial Space":
    "https://images.unsplash.com/photo-1722134395042-e7b9a6160906?auto=format&fit=crop&w=1200&q=80",
  Hostel: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80",
  Studio: "https://images.unsplash.com/photo-1554941829-202a0b2403b8?auto=format&fit=crop&w=1200&q=80",
  Default:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US").format(price);

const PropertyCard = ({ property }: { property: IProperty }) => {
  const isRented = property.status === "RENTED";
  const categoryName = property.category?.name ?? "";
  const imageSrc =
    property.images?.[0] ||
    categoryImages[categoryName] ||
    categoryImages.Default;

  return (
    <Link
      href={`/properties/${property.id}`}
      aria-label={`View ${property.title} in ${property.city}`}
      className="group relative block h-[26rem] overflow-hidden rounded-[1.75rem] bg-slate-200 shadow-sm transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift focus-visible:outline-none"
    >
      {/* Image with slow hover zoom */}
      <Image
        src={imageSrc}
        alt={`${property.title} — ${categoryName || "property"} in ${property.city}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
      />

      {/* Badges */}
      <div className="absolute left-5 right-5 top-5 z-10 flex items-start justify-between">
        <div className="flex flex-col gap-2">
          {categoryName ? (
            <span className="glass-chip w-fit rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide text-white">
              {categoryName}
            </span>
          ) : null}
          {isRented && (
            <span className="w-fit rounded-full bg-red-500/90 px-3 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
              Currently rented
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white md:p-6">
        <p className="mb-2 flex items-center gap-1.5 text-xs text-white/75">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="truncate">
            {property.address}, {property.city}
          </span>
        </p>

        <div className="mb-4 flex items-end justify-between gap-3">
          <h3 className="pr-2 text-xl font-bold leading-tight drop-shadow-md">
            {property.title}
          </h3>
          <p className="shrink-0 text-right leading-tight">
            <span className="block text-lg font-extrabold">
              {formatPrice(property.rentAmount)}
            </span>
            <span className="block text-[0.65rem] font-medium uppercase tracking-wider text-white/60">
              / month
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/15 pt-3.5 text-sm text-white/90">
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-white/60" aria-hidden="true" />
            {property.bedrooms} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-white/60" aria-hidden="true" />
            {property.bathrooms} Baths
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <Maximize className="h-4 w-4 text-white/60" aria-hidden="true" />
            {property.area} sqft
          </span>
        </div>
      </div>

      {/* Hover view-details cue */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-20 flex items-center justify-center"
      >
        <span className="glass-chip flex h-12 w-12 scale-75 items-center justify-center rounded-full text-white opacity-0 transition-all duration-300 ease-out-expo group-hover:scale-100 group-hover:opacity-100">
          <ArrowUpRight className="h-6 w-6" />
        </span>
      </div>
    </Link>
  );
};

export default PropertyCard;