import Container from "@/components/shared/Container";
import { Skeleton } from "@/components/ui/skeleton";

/** Skeleton mirroring the About page rhythm: hero → split → 6 cards → band. */
const AboutLoading = () => {
  return (
    <div role="status">
      {/* Hero */}
      <div className="flex min-h-[70svh] items-end bg-ink px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl space-y-5">
          <Skeleton className="h-7 w-32 rounded-full bg-white/10" />
          <Skeleton className="h-20 w-3/4 rounded-3xl bg-white/10 md:h-28" />
          <Skeleton className="h-20 w-1/2 rounded-3xl bg-white/10 md:h-28" />
          <Skeleton className="h-6 w-2/5 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Story split */}
      <Container className="grid gap-12 py-24 lg:grid-cols-2">
        <Skeleton className="aspect-[4/5] max-h-[30rem] rounded-[2rem]" />
        <div className="space-y-5 self-center">
          <Skeleton className="h-7 w-36 rounded-full" />
          <Skeleton className="h-12 w-4/5 rounded-2xl" />
          <Skeleton className="h-5 w-full rounded-full" />
          <Skeleton className="h-5 w-full rounded-full" />
          <Skeleton className="h-5 w-3/4 rounded-full" />
        </div>
      </Container>

      {/* Values grid */}
      <Container className="grid grid-cols-1 gap-4 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-44 rounded-3xl" />
        ))}
      </Container>

      <span className="sr-only">Loading the About page…</span>
    </div>
  );
};

export default AboutLoading;