"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";


const brandIcon = L.divIcon({
  className: "",
  html: `
    <span style="position:relative;display:block;width:34px;height:34px;">
      <span style="position:absolute;inset:0;border-radius:9999px 9999px 9999px 0;transform:rotate(-45deg);background:#0ea5e9;box-shadow:0 8px 20px -6px rgba(2,132,199,.8);"></span>
      <span style="position:absolute;top:11px;left:11px;width:12px;height:12px;border-radius:9999px;background:#fff;"></span>
    </span>`,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -32],
});


const DISTRICT_ZOOM = 12;
const MIN_ZOOM = 11;
const MAX_ZOOM = 13;

interface LeafletMapInnerProps {
  position: { lat: number; lng: number };
  label: string;
}

const LeafletMapInner = ({ position, label }: LeafletMapInnerProps) => {
  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={DISTRICT_ZOOM}
      minZoom={MIN_ZOOM}
      maxZoom={MAX_ZOOM}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ background: "#e8eef2" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[position.lat, position.lng]} icon={brandIcon}>
        <div className="px-1 py-0.5">
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          <p className="mt-0.5 text-xs text-slate-500">
            District shown — not the exact address.
          </p>
        </div>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMapInner;
