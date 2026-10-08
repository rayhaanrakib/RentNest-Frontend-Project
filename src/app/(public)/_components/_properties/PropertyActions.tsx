"use client";

import { Check, Heart, Share2 } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { toast } from "sonner";

const STORAGE_KEY = "rentnest:saved-properties";
const EMPTY_SNAPSHOT = "[]";

const readSaved = (): string[] => {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
};

const getSnapshot = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT;
  } catch {
    return EMPTY_SNAPSHOT;
  }
};

const getServerSnapshot = () => EMPTY_SNAPSHOT;


const PropertyActions = ({
  propertyId,
  title,
}: {
  propertyId: string;
  title: string;
}) => {
  const [copied, setCopied] = useState(false);
  const savedSnapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const isSaved = useMemo(() => {
    try {
      const parsed = JSON.parse(savedSnapshot);
      return Array.isArray(parsed) && parsed.includes(propertyId);
    } catch {
      return false;
    }
  }, [savedSnapshot, propertyId]);

  const toggleSaved = () => {
    const current = readSaved();
    const next = isSaved
      ? current.filter((id) => id !== propertyId)
      : [...current, propertyId];

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      toast.error("Saved homes are unavailable in this browser");
      return;
    }

    listeners.forEach((listener) => listener());
    toast.success(isSaved ? "Removed from saved homes" : "Saved to your homes");
  };

  const share = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy the link");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={share}
        aria-label={`Share ${title}`}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-slate-900 hover:bg-slate-900 hover:text-white"
      >
        {copied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Share2 className="h-4 w-4" aria-hidden="true" />
        )}
      </button>

      <button
        type="button"
        onClick={toggleSaved}
        aria-pressed={isSaved}
        aria-label={isSaved ? `Remove ${title} from saved homes` : `Save ${title}`}
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
          isSaved
            ? "border-red-200 bg-red-50 text-red-500"
            : "border-slate-200 text-slate-600 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
        }`}
      >
        <Heart
          className={`h-4 w-4 transition-transform duration-300 ease-out-expo ${
            isSaved ? "scale-110 fill-red-500 text-red-500" : ""
          }`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

export default PropertyActions;
