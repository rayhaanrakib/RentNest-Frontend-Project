"use client";

import { ExternalLink, MapPin, ShieldCheck } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LeafletMap = dynamic(() => import("./LeafletMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm font-medium text-slate-500">
      Loading map…
    </div>
  ),
});


const CITY_CENTROIDS: Record<string, { lat: number; lng: number }> = {
  dhaka: { lat: 23.8103, lng: 90.4125 },
  chattogram: { lat: 22.3569, lng: 91.7832 },
  chittagong: { lat: 22.3569, lng: 91.7832 },
  sylhet: { lat: 24.8949, lng: 91.8687 },
  khulna: { lat: 22.8456, lng: 89.5403 },
  rajshahi: { lat: 24.3745, lng: 88.6042 },
  barishal: { lat: 22.701, lng: 90.3535 },
  rangpur: { lat: 25.7439, lng: 89.2752 },
  mymensingh: { lat: 24.7471, lng: 90.4203 },
  narayanganj: { lat: 23.6238, lng: 90.5 },
  gazipur: { lat: 23.9999, lng: 90.4203 },
  "cox's bazar": { lat: 21.4272, lng: 92.0058 },
};

interface LocationMapProps {
  city: string;
  state: string;
}

const LocationMap = ({ city, state }: LocationMapProps) => {
  const centroid = CITY_CENTROIDS[city.trim().toLowerCase()];
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    centroid ?? null,
  );

  const areaName = `${city}${state ? `, ${state}` : ""}`;

  useEffect(() => {
    if (centroid) return;

    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const query = encodeURIComponent(areaName);

    fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${query}`,
      { signal: controller.signal, headers: { Accept: "application/json" } },
    )
      .then((response) => (response.ok ? response.json() : []))
      .then((results) => {
        if (cancelled) return;
        const hit = Array.isArray(results) ? results[0] : undefined;
        if (hit) {
          setPosition({ lat: Number(hit.lat), lng: Number(hit.lon) });
        }
      })
      .catch(() => {

      })
      .finally(() => clearTimeout(timeout));

    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timeout);
    };
  }, [areaName, centroid]);

  const mapsQuery = encodeURIComponent(areaName);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <p className="flex min-w-0 items-center gap-2 text-sm text-slate-700">
          <MapPin
            className="h-4 w-4 shrink-0 text-brand-600"
            aria-hidden="true"
          />
          <span className="truncate font-medium">{areaName}</span>
          <span className="hidden shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-slate-500 sm:inline">
            District
          </span>
        </p>

        <a
          href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
        >
          Open in Maps
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>

      <div className="h-[380px] w-full">
        {position ? (
          <LeafletMap position={position} label={areaName} />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-50 text-sm text-slate-500">
            Locating {city}…
          </div>
        )}
      </div>

      <p className="flex items-start gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-3 text-xs leading-relaxed text-slate-500">
        <ShieldCheck
          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600"
          aria-hidden="true"
        />
        The map shows the district only. The exact address, house and road are
        shared with you once the landlord accepts your request.
      </p>
    </div>
  );
};

export default LocationMap;
