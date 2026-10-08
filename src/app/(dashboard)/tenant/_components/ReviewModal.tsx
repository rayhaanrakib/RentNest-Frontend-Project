"use client";

import { useActionState, useEffect, useState } from "react";
import { Star, X } from "lucide-react";
import { postTenantRentalReview } from "@dashboard/tenant/_actions/tenantActions";
import { IReviewState } from "@/types";
import { useRouter } from "next/navigation";

interface ReviewModalProps {
  propertyId: string;
  propertyName: string;
}

const ReviewModal = ({
  propertyId,
  propertyName,
}: ReviewModalProps) => {
  const router = useRouter();

const [isOpen, setIsOpen] = useState(false);
const [rating, setRating] = useState(5);

const [state, formAction] = useActionState(
  postTenantRentalReview,
  {} as IReviewState
);

useEffect(() => {
  if (state?.success) {
    setIsOpen(false);
    setRating(5);
    router.refresh();
  }
}, [state, router]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-slate-800"
      >
        Leave Review
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div className="text-left">
                <h2 className="text-xl font-semibold text-slate-900">
                  Leave a Review
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Share your experience to help future tenants.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <form action={formAction}>
              <input
                type="hidden"
                name="propertyId"
                value={propertyId}
              />
              <input
                type="hidden"
                name="rating"
                value={rating}
              />

              <div className="space-y-6 px-6 py-6">

                {/* Property */}
                <div className="text-left">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Property
                  </label>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-medium text-slate-900">
                      {propertyName}
                    </p>
                  </div>
                </div>

                {/* Error */}
                {state?.errorDetails && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {state.errorDetails}
                  </div>
                )}

                {/* Rating */}
                <div className="text-left">
                  <label className="mb-3 block text-sm font-medium text-slate-700">
                    Rating
                  </label>

                  <div className="flex flex-wrap items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="rounded-lg p-1 transition hover:scale-110"
                        aria-label={`Rate ${star} star`}
                      >
                        <Star
                          size={32}
                          className={`transition-colors ${
                            star <= rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}

                    <span className="ml-2 text-sm font-medium text-slate-600">
                      {rating}/5
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <div className="text-left">
                  <label
                    htmlFor="comment"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Your Review
                  </label>

                  <textarea
                    id="comment"
                    name="comment"
                    rows={5}
                    required
                    minLength={10}
                    placeholder="Tell others about your experience with this property..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                  />

                  <p className="mt-2 text-xs text-slate-500">
                    Minimum 10 characters.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700 sm:w-auto"
                >
                  Submit Review
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewModal;