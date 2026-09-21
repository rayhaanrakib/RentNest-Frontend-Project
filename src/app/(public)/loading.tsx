import Container from "@/components/shared/Container";

const ShimmerBlock = ({ className }: { className?: string }) => (
  <div className={`relative overflow-hidden rounded-2xl bg-slate-100/80 ${className}`}>
    <div
      className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite]"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
      }}
    />
  </div>
);

const PublicLoading = () => {
  return (
    <div role="status" className="min-h-svh bg-white pb-24 pt-32">
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
      <span className="sr-only">Loading page…</span>

      <Container>
        {/* Top eyebrow tag */}
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <ShimmerBlock className="h-7 w-40" />

          {/* Hero title */}
          <div className="flex flex-col items-center gap-3 w-full">
            <ShimmerBlock className="h-16 w-full max-w-3xl" />
            <ShimmerBlock className="h-16 w-4/5 max-w-2xl" />
          </div>

          {/* Subtitle */}
          <div className="flex flex-col items-center gap-2 w-full mt-2">
            <ShimmerBlock className="h-4 w-2/3 rounded-full" />
            <ShimmerBlock className="h-4 w-1/2 rounded-full" />
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ShimmerBlock className="h-14 w-44 rounded-full" />
            <ShimmerBlock className="h-14 w-40 rounded-full" />
          </div>
        </div>

        {/* Preview stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <ShimmerBlock className="h-10 w-24" />
              <ShimmerBlock className="h-3 w-full rounded-full" />
            </div>
          ))}
        </div>

        {/* Preview cards */}
        <div className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-200/60 bg-white p-3"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ShimmerBlock className="h-52 rounded-2xl" />
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <ShimmerBlock className="h-6 w-24 rounded-full" />
                  <ShimmerBlock className="h-6 w-16 rounded-full" />
                </div>
                <ShimmerBlock className="h-5 w-4/5 rounded-full" />
                <ShimmerBlock className="h-4 w-2/3 rounded-full" />
                <div className="flex gap-2 mt-4">
                  <ShimmerBlock className="h-8 w-20 rounded-full" />
                  <ShimmerBlock className="h-8 w-20 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading meta bottom */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5">
            <span className="flex h-2 w-2">
              <span className="absolute h-2 w-2 rounded-full bg-brand-400 opacity-75 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-brand-500" />
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">
              Preparing your experience
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PublicLoading;