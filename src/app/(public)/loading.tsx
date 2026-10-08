import Container from "@/components/shared/Container";
import { Skeleton } from "@/components/ui/skeleton";

/** Instant fallback while a public route segment streams in. */
const PublicLoading = () => {
  return (
    <div role="status" className="min-h-svh bg-white pb-24 pt-32">
      <span className="sr-only">Loading page…</span>
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Skeleton className="h-7 w-44 rounded-full" />
          <Skeleton className="h-14 w-full rounded-2xl" />
          <Skeleton className="h-14 w-3/5 rounded-2xl" />
          <Skeleton className="h-5 w-4/5 rounded-full" />
          <div className="mt-4 flex gap-3">
            <Skeleton className="h-12 w-40 rounded-full" />
            <Skeleton className="h-12 w-40 rounded-full" />
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="h-64 rounded-3xl" />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PublicLoading;
