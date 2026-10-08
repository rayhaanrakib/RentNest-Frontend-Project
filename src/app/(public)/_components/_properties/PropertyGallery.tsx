"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery = ({ images, title }: PropertyGalleryProps) => {
  const photos = images.filter(Boolean);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => ((index ?? 0) + 1) % photos.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex(
          (index) => ((index ?? 0) - 1 + photos.length) % photos.length,
        );
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, photos.length]);

  if (photos.length === 0) {
    return (
      <div className="flex h-[320px] w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-slate-200 bg-slate-50 text-slate-400 md:h-[420px]">
        <Images className="h-8 w-8" aria-hidden="true" />
        <p className="text-sm font-medium">Photos coming soon</p>
      </div>
    );
  }

  const openAt = (index: number) => setActiveIndex(index);
  const extraCount = Math.max(0, photos.length - 3);

  /** One image gets the full frame instead of a third of a broken grid. */
  if (photos.length === 1) {
    return (
      <>
        <button
          type="button"
          onClick={() => openAt(0)}
          className="group relative block h-[320px] w-full overflow-hidden rounded-3xl bg-slate-100 md:h-[520px]"
          aria-label={`View photo of ${title}`}
        >
          <Image
            src={photos[0]}
            alt={title}
            fill
            preload
            sizes="100vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          />
        </button>
        <Lightbox
          photos={photos}
          title={title}
          activeIndex={activeIndex}
          reduceMotion={Boolean(reduceMotion)}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      </>
    );
  }

  const isPair = photos.length === 2;

  return (
    <>
      <div
        className={
          isPair
            ? "grid grid-cols-1 gap-3 md:h-[460px] md:grid-cols-2"
            : "grid grid-cols-1 gap-3 md:h-[520px] md:grid-cols-4 md:grid-rows-2"
        }
      >
        {/* Primary frame */}
        <button
          type="button"
          onClick={() => openAt(0)}
          aria-label={`View photo 1 of ${photos.length} — ${title}`}
          className={`group relative overflow-hidden rounded-3xl bg-slate-100 h-[280px] md:h-full ${
            isPair ? "md:rounded-3xl" : "md:col-span-2 md:row-span-2 md:rounded-3xl"
          }`}
        >
          <Image
            src={photos[0]}
            alt={`${title} — photo 1`}
            fill
            preload
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
          />
        </button>

        {/* Secondary frames — hidden on small screens where the hero carries it */}
        {photos.slice(1, 3).map((photo, offset) => {
          const index = offset + 1;
          const isLast = offset === 1;

          return (
            <button
              key={`${photo}-${index}`}
              type="button"
              onClick={() => openAt(index)}
              aria-label={`View photo ${index + 1} of ${photos.length} — ${title}`}
              className={`group relative hidden overflow-hidden rounded-3xl bg-slate-100 md:block ${
                isPair ? "" : "md:col-span-2"
              }`}
            >
              <Image
                src={photo}
                alt={`${title} — photo ${index + 1}`}
                fill
                sizes="40vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />

              {isLast && extraCount > 0 ? (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-ink/55 transition-colors duration-300 group-hover:bg-ink/40"
                  />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-white">
                    <span className="font-display text-2xl font-semibold tabular-nums">
                      +{extraCount}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.16em]">
                      more photos
                    </span>
                  </span>
                </>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-slate-900 tabular-nums">
            {photos.length}
          </span>{" "}
          {photos.length === 1 ? "photo" : "photos"}
        </p>
        <button
          type="button"
          onClick={() => openAt(0)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-slate-900 hover:bg-slate-900 hover:text-white"
        >
          <Images className="h-4 w-4" aria-hidden="true" />
          View all photos
        </button>
      </div>

      <Lightbox
        photos={photos}
        title={title}
        activeIndex={activeIndex}
        reduceMotion={Boolean(reduceMotion)}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
};

interface LightboxProps {
  photos: string[];
  title: string;
  activeIndex: number | null;
  reduceMotion: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const Lightbox = ({
  photos,
  title,
  activeIndex,
  reduceMotion,
  onClose,
  onNavigate,
}: LightboxProps) => {
  const isOpen = activeIndex !== null;
  const index = activeIndex ?? 0;

  const step = (delta: number) =>
    onNavigate((index + delta + photos.length) % photos.length);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — photo ${index + 1} of ${photos.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          className="fixed inset-0 z-[999] flex flex-col bg-ink/95 backdrop-blur-sm"
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-5 py-4 text-white">
            <p className="text-sm font-medium tabular-nums text-white/70">
              {index + 1} / {photos.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="relative flex-1"
            onClick={(event) => event.stopPropagation()}
          >
            <motion.div
              key={index}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 px-4 pb-4 md:px-16"
            >
              <Image
                src={photos[index]}
                alt={`${title} — photo ${index + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            {photos.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:left-6"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-colors hover:bg-white/20 md:right-6"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}
          </div>

          {photos.length > 1 ? (
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-5">
              {photos.map((photo, thumbIndex) => (
                <button
                  key={`${photo}-${thumbIndex}`}
                  type="button"
                  onClick={() => onNavigate(thumbIndex)}
                  aria-label={`Go to photo ${thumbIndex + 1}`}
                  aria-current={thumbIndex === index}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${
                    thumbIndex === index
                      ? "ring-2 ring-brand-400"
                      : "opacity-55 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={photo}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default PropertyGallery;
