import Container from "@/components/shared/Container";
import LocationMap from "@/components/shared/LocationMap";
import SectionHeader from "@/components/shared/SectionHeader";
import { getCurrentUser } from "@auth/_actions/authActions";
import { getPropertyDetail, getProperties } from "@public/_actions/getData";
import PropertyActions from "@public/_components/_properties/PropertyActions";
import PropertyCard from "@public/_components/_properties/PropertyCard";
import PropertyGallery from "@public/_components/_properties/PropertyGallery";
import PropertyRentalRequestModal from "@public/_components/_properties/PropertyRentalRequestModal";
import type { IProperty } from "@/types";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  Check,
  Mail,
  MapPin,
  Maximize,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const PropertyDetailSkeleton = () => (
  <div className="animate-pulse bg-white pb-24 pt-32">
    <Container>
      <div className="mb-8 h-5 w-40 rounded bg-slate-200" />
      <div className="mb-6 space-y-3">
        <div className="h-10 w-2/3 rounded-xl bg-slate-200" />
        <div className="h-4 w-1/2 rounded bg-slate-100" />
      </div>
      <div className="h-[320px] rounded-3xl bg-slate-100 md:h-[520px]" />
      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="h-40 rounded-2xl bg-slate-100" />
          <div className="h-56 rounded-2xl bg-slate-100" />
        </div>
        <div className="h-96 rounded-3xl bg-slate-100" />
      </div>
    </Container>
  </div>
);

const SpecItem = ({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof BedDouble;
  value: string | number;
  label: string;
}) => (
  <div className="flex items-center gap-3">
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-50 text-slate-500">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>
    <div>
      <p className="text-base font-bold leading-tight text-slate-900 tabular-nums">
        {value}
      </p>
      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>
    </div>
  </div>
);

const PropertyDetailContent = async ({ id }: { id: string }) => {
  const [propertyData, user] = await Promise.all([
    getPropertyDetail(id),
    getCurrentUser(),
  ]);

  if (!propertyData) {
    notFound();
  }

  const property = propertyData as IProperty;

  // Similar listings in the same category, excluding this one.
  let similarProperties: IProperty[] = [];
  try {
    const similarRes = await getProperties({
      limit: "4",
      page: "1",
      category: property.category?.name,
    });
    similarProperties = (similarRes?.properties ?? [])
      .filter((item: IProperty) => item.id !== property.id)
      .slice(0, 3);
  } catch {
    similarProperties = [];
  }

  const specs = [
    { icon: BedDouble, value: property.bedrooms, label: "Bedrooms" },
    { icon: Bath, value: property.bathrooms, label: "Bathrooms" },
    { icon: Maximize, value: `${property.area}`, label: "Sqft" },
    {
      icon: Building2,
      value: property.category?.name ?? "—",
      label: "Type",
    },
  ];

  return (
    <div className="bg-white pb-24">
      <Container className="pt-32">
        {/* Breadcrumb row */}
        <nav aria-label="Breadcrumb" className="mb-7">
          <div className="flex items-center justify-between gap-4">
            <ol className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-slate-500">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-slate-900"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-300">
                /
              </li>
              <li>
                <Link
                  href="/properties"
                  className="group inline-flex items-center gap-2 font-medium transition-colors hover:text-slate-900"
                >
                  <ArrowLeft
                    className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:-translate-x-1"
                    aria-hidden="true"
                  />
                  All listings
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-300">
                /
              </li>
              <li
                aria-current="page"
                className="max-w-[18rem] truncate font-medium text-slate-900"
              >
                {property.title}
              </li>
            </ol>
            <PropertyActions propertyId={property.id} title={property.title} />
          </div>
        </nav>

        {/* Title */}
        <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {property.category?.name ? (
                <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
                  {property.category.name}
                </span>
              ) : null}
              {property.status === "AVAILABLE" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                  <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                  Available
                </span>
              ) : (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  {property.status === "RENTED" ? "Rented" : "Unavailable"}
                </span>
              )}
            </div>

            <h1 className="font-display text-title font-semibold tracking-tight text-balance text-slate-900">
              {property.title}
            </h1>

            <p className="mt-4 flex items-start gap-2 text-slate-500">
              <MapPin
                className="mt-1 h-4 w-4 shrink-0 text-brand-600"
                aria-hidden="true"
              />
              <span>
                {/* District/city only — the house and road stay private until
                    the landlord accepts a request. */}
                {property.city}
                {property.state ? `, ${property.state}` : null}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-slate-100 pt-6 sm:grid-cols-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {specs.map((spec) => (
              <SpecItem
                key={spec.label}
                icon={spec.icon}
                value={spec.value}
                label={spec.label}
              />
            ))}
          </div>
        </header>

        {/* Gallery — adapts to however many photos the listing has */}
        <PropertyGallery images={property.images ?? []} title={property.title} />

        {/* Body */}
        <div className="mt-14 grid gap-12 lg:grid-cols-3">
          <div className="space-y-14 lg:col-span-2">
            <section aria-labelledby="about-heading">
              <h2
                id="about-heading"
                className="font-display text-2xl font-semibold tracking-tight text-slate-900"
              >
                About this home
              </h2>
              <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-slate-600">
                {property.description}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <dt className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                    Listed on
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-slate-800">
                    {property.createdAt
                      ? new Date(property.createdAt).toLocaleDateString()
                      : "—"}
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <dt className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                    Area
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-slate-800 tabular-nums">
                    {property.area} sqft
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <dt className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                    City
                  </dt>
                  <dd className="mt-1 truncate text-sm font-bold text-slate-800">
                    {property.city}
                  </dd>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4">
                  <dt className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                    Reference
                  </dt>
                  <dd className="mt-1 truncate text-sm font-bold text-slate-800">
                    {property.id}
                  </dd>
                </div>
              </dl>
            </section>

            {property.amenities?.length ? (
              <section aria-labelledby="amenities-heading">
                <h2
                  id="amenities-heading"
                  className="font-display text-2xl font-semibold tracking-tight text-slate-900"
                >
                  What this place offers
                </h2>
                <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {property.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 transition-colors hover:border-slate-200 hover:bg-slate-50/60"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-medium text-slate-700">
                        {amenity}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section aria-labelledby="location-heading">
              <h2
                id="location-heading"
                className="font-display text-2xl font-semibold tracking-tight text-slate-900"
              >
                Where it is
              </h2>
              <div className="mt-6">
                <LocationMap city={property.city} state={property.state} />
              </div>
            </section>
          </div>

          {/* Sticky request card */}
          <aside className="lg:col-span-1">
            <div className="space-y-5 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lift">
                <div className="border-b border-slate-100 pb-5">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                    Monthly rent
                  </p>
                  <p className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-display text-4xl font-semibold text-slate-900 tabular-nums">
                      ৳{property.rentAmount?.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-slate-400">
                      / month
                    </span>
                  </p>
                </div>

                <div className="border-b border-slate-100 py-5">
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                    Listed by
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-slate-100">
                      {property.landlord?.avatar ? (
                        <Image
                          src={property.landlord.avatar}
                          alt=""
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-sm font-bold text-slate-500">
                          {(property.landlord?.name ?? "?")
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-900">
                        {property.landlord?.name ?? "RentNest landlord"}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-slate-500">
                        <ShieldCheck
                          className="h-3 w-3 text-emerald-600"
                          aria-hidden="true"
                        />
                        Verified landlord
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-5">
                  <PropertyRentalRequestModal
                    id={property.id}
                    status={property.status}
                    title={property.title}
                    rentAmount={property.rentAmount}
                    image={property.images?.[0]}
                    isAuthenticated={Boolean(user)}
                    returnTo={`/properties/${property.id}`}
                  />

                  <a
                    href={
                      property.landlord?.phone
                        ? `tel:${property.landlord.phone}`
                        : undefined
                    }
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-slate-200 text-sm font-semibold text-slate-800 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {property.landlord?.phone ?? "Call landlord"}
                  </a>

                  <a
                    href={`mailto:?subject=${encodeURIComponent(
                      `Enquiry about ${property.title}`,
                    )}`}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-brand-100 bg-brand-50 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-100"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Send a message
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <ShieldCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Verified listing
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Our team has checked this property and its landlord. Pay
                    only through RentNest once your request is accepted.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar listings */}
        {similarProperties.length > 0 ? (
          <section className="mt-24 border-t border-slate-100 pt-16">
            <SectionHeader
              eyebrow="Keep looking"
              title="Similar homes nearby"
              subtitle="Same home type, similar budget — in case this one is taken."
              action={{ href: "/properties", label: "View all listings" }}
              headingId="similar-heading"
            />
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {similarProperties.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </div>
  );
};

const PropertyDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <Suspense fallback={<PropertyDetailSkeleton />}>
      <PropertyDetailContent id={id} />
    </Suspense>
  );
};

export default PropertyDetailPage;
