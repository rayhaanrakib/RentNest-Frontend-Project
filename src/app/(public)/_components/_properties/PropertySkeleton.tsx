const PropertySkeleton = () => {
  return (
    <div className="relative h-[26rem] rounded-[1.75rem] overflow-hidden shadow-sm bg-slate-200 animate-pulse">
      {/* Top Badge Skeleton */}
      <div className="absolute top-6 left-6 z-10">
        <div className="h-7 w-24 rounded-full bg-slate-300/80"></div>
      </div>

      {/* Bottom Content Skeleton */}
      <div className="absolute bottom-0 inset-x-0 p-6 z-10">
        {/* Location Skeleton */}
        <div className="h-3 w-32 rounded-full bg-slate-300/80 mb-3"></div>

        {/* Title & Price Skeleton */}
        <div className="flex justify-between items-end mb-4">
          <div className="h-5 w-3/4 rounded-md bg-slate-300/80"></div>
          <div className="h-5 w-16 rounded-md bg-slate-300/80"></div>
        </div>

        {/* Specs Skeleton */}
        <div className="pt-4 border-t border-slate-300/50">
          <div className="flex items-center gap-5">
            <div className="h-4 w-12 rounded-full bg-slate-300/80"></div>
            <div className="h-4 w-12 rounded-full bg-slate-300/80"></div>
            <div className="h-4 w-12 rounded-full bg-slate-300/80 ml-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertySkeleton;