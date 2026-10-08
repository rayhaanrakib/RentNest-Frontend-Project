import { Suspense } from "react";
import { getTenantRentalReviews } from "@dashboard/tenant/_actions/tenantActions";

const ReviewsSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-pulse">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-slate-200 rounded-xl"></div>
            <div className="space-y-2">
              <div className="h-4 w-40 bg-slate-200 rounded"></div>
              <div className="h-3 w-20 bg-slate-200 rounded"></div>
            </div>
          </div>
          <div className="h-3 w-full bg-slate-200 rounded mb-2"></div>
          <div className="h-3 w-5/6 bg-slate-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};

const ReviewsList = async () => {
  const reviews = await getTenantRentalReviews();

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white p-12 text-center rounded-2xl border border-slate-100 shadow-sm">
        <p className="text-sm font-medium text-slate-800 mb-1">No reviews yet</p>
        <p className="text-sm text-slate-500">Reviews you leave on properties will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review: any) => (
        <div key={review.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-start gap-4">
            {/* Property Image */}
            <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
              {review.property?.images?.[0] && (
                <img src={review.property.images[0]} alt="" className="w-full h-full object-cover" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-slate-800">{review.property?.title || "Unknown Property"}</h3>
                <span className="text-xs text-slate-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Star Rating */}
              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= review.rating ? "text-amber-400" : "text-slate-200"}>
                    ★
                  </span>
                ))}
              </div>

              {/* Comment */}
              <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ReviewsPage = () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Reviews</h1>
        <p className="text-slate-500 text-sm mt-1">Feedback you've left for rented properties.</p>
      </div>

      <Suspense fallback={<ReviewsSkeleton />}>
        <ReviewsList />
      </Suspense>
    </div>
  );
};

export default ReviewsPage;