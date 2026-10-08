"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

const HAS_MAPS_ENABLED =
  Boolean(GOOGLE_MAPS_API_KEY) &&
  GOOGLE_MAPS_API_KEY !== "your-google-maps-api-key";

const FALLBACK_MAP_IMAGE =
  "https://i.ibb.co.com/6JRH1Jhz/Dhaka-Map-thumb-1200x630.jpg";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

// Improved map options for better text visibility
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#334155" }] },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#ffffff", weight: 2 }],
    },
    { featureType: "water", stylers: [{ color: "#e0f2fe" }] },
    { featureType: "road", stylers: [{ color: "#ffffff" }] },
    { featureType: "landscape", stylers: [{ color: "#f8fafc" }] },
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ color: "#1e293b" }],
    },
  ],
};

function MapUnavailableFallback({
  address,
  city,
  state,
  reason,
}: {
  address: string;
  city: string;
  state: string;
  reason?: string;
}) {
  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
      <Image
        src={FALLBACK_MAP_IMAGE}
        alt="Map unavailable"
        fill
        className="object-cover"
        unoptimized
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        {reason && (
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm">
            <AlertCircle className="h-5 w-5" />
            {reason}
          </div>
        )}
      </div>
    </div>
  );
}

const GoogleMapComponent = ({
  address,
  city,
  state,
}: {
  address: string;
  city: string;
  state: string;
}) => {
  const skipLoad = !HAS_MAPS_ENABLED;

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    ...(skipLoad ? { preventGoogleFontsLoading: true } : {}),
  });

  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [geocodeFailedReason, setGeocodeFailedReason] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (skipLoad) return;
    if (!isLoaded || !window.google) return;

    let cancelled = false;

    const geocoder = new window.google.maps.Geocoder();
    const fullAddress = `${address}, ${city}, ${state}`;

    geocoder.geocode({ address: fullAddress }, (results, status) => {
      if (cancelled) return;

      if (status === "OK" && results && results[0]) {
        const location = results[0].geometry.location;

        setMarkerPosition({
          lat: location.lat(),
          lng: location.lng(),
        });

        setGeocodeFailedReason(null);
      } else {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            `[GoogleMap] Geocode failed: ${status}. Enable Geocoding API in GCP or provide a valid key.`,
          );
        }

        const reason =
          status === "REQUEST_DENIED"
            ? "Map API not configured"
            : status === "ZERO_RESULTS"
              ? "Address not found"
              : "Map unavailable";

        setGeocodeFailedReason(reason);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [skipLoad, isLoaded, address, city, state]);

  if (!HAS_MAPS_ENABLED) {
    return (
      <MapUnavailableFallback
        address={address}
        city={city}
        state={state}
        reason="Google Maps API key missing"
      />
    );
  }

  if (loadError) {
    return (
      <MapUnavailableFallback
        address={address}
        city={city}
        state={state}
        reason="Failed to load Maps"
      />
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center rounded-3xl bg-slate-100 text-sm font-medium text-slate-500">
        Loading Map...
      </div>
    );
  }

  if (!markerPosition && geocodeFailedReason) {
    return (
      <MapUnavailableFallback
        address={address}
        city={city}
        state={state}
        reason={geocodeFailedReason}
      />
    );
  }

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
      {markerPosition ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={markerPosition}
          zoom={14}
          options={mapOptions}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm font-medium text-slate-500">
          Locating property...
        </div>
      )}
    </div>
  );
};

export default GoogleMapComponent;
