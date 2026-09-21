import { Skeleton } from "@/components/ui/skeleton";

/** Mirrors the new full-viewport dark hero so first paint has zero CLS. */
const HeroSkeleton = () => {
  return (
    <div
      aria-hidden="true"
      className="relative flex min-h-svh items-center overflow-hidden bg-ink"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" />
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-24 pt-32 text-center">
        <Skeleton className="mx-auto h-8 w-56 rounded-full bg-white/10" />
        <div className="mt-8 space-y-4">
          <Skeleton className="mx-auto h-14 w-full rounded-2xl bg-white/10 md:h-20" />
          <Skeleton className="mx-auto h-14 w-2/3 rounded-2xl bg-white/10 md:h-20" />
        </div>
        <Skeleton className="mx-auto mt-6 h-6 w-3/5 rounded-full bg-white/10" />
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Skeleton className="mx-auto h-14 w-52 rounded-full bg-white/10 sm:mx-0" />
          <Skeleton className="mx-auto h-14 w-52 rounded-full bg-white/10 sm:mx-0" />
        </div>
        <Skeleton className="mx-auto mt-10 h-16 w-full rounded-[2rem] bg-white/10 md:rounded-full" />
        <div className="mt-8 flex justify-center gap-2.5">
          <Skeleton className="h-9 w-36 rounded-full bg-white/10" />
          <Skeleton className="hidden h-9 w-44 rounded-full bg-white/10 sm:block" />
          <Skeleton className="hidden h-9 w-40 rounded-full bg-white/10 sm:block" />
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;