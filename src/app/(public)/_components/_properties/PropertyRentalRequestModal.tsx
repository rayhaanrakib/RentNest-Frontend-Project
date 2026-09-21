"use client";

import { RentalRequestState } from "@/lib/validations/request";
import { IPropertyStatus } from "@/types";
import { postTenantRentalRequest } from "@dashboard/tenant/_actions/tenantActions";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

const PropertyRentalRequestModal = ({
  id,
  status,
}: {
  id: string;
  status: IPropertyStatus;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const initialState: RentalRequestState = { success: false };
  const [, startTransition] = useTransition();

  const [state, action, pending] = useActionState(
    postTenantRentalRequest,
    initialState,
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Rental request submitted successfully!");
      startTransition(() => setIsOpen(false));
      router.replace("/tenant/dashboard/requests");
    }

    if (state.errorMessage) {
      toast.error(state.errorMessage, {
        description: state.errorDetails,
      });
    }
  }, [state, router, startTransition]);

  return (
    <>
      {status === "RENTED" ? (
        <button
          disabled
          className="w-full h-12 rounded-full bg-slate-200 text-slate-500 text-sm font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
        >
          <CalendarDays className="h-4 w-4" />
          Property Already Rented
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full h-12 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <CalendarDays className="h-4 w-4" />
          Request Rental
        </button>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-end lg:items-center justify-center bg-black/70 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full h-full lg:h-auto lg:max-h-[60vh] lg:w-[640px] xl:w-[720px] overflow-y-auto bg-white rounded-none lg:rounded-3xl shadow-2xl no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-start p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    Request Rental
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Fill in the details to send your request.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>

              {/* Form Body */}
              <div className="p-6 space-y-5">
                <form action={action} className="space-y-5">
                  <input type="hidden" name="propertyId" value={id} />

                  <div>
                    <label
                      htmlFor="moveInDate"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Move-in Date
                    </label>
                    <input
                      id="moveInDate"
                      name="moveInDate"
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className={`w-full h-12 px-4 rounded-xl border bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all ${
                        state?.errors?.moveInDate
                          ? "border-red-500"
                          : "border-slate-200"
                      }`}
                    />
                    {state?.errors?.moveInDate && (
                      <p className="text-xs text-red-500 mt-1">
                        {state.errors.moveInDate[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="duration"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Duration (Months)
                    </label>
                    <input
                      id="duration"
                      name="duration"
                      type="number"
                      required
                      min="1"
                      placeholder="e.g., 6"
                      className={`w-full h-12 px-4 rounded-xl border bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all ${
                        state?.errors?.duration
                          ? "border-red-500"
                          : "border-slate-200"
                      }`}
                    />
                    {state?.errors?.duration && (
                      <p className="text-xs text-red-500 mt-1">
                        {state.errors.duration[0]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Message to Landlord{" "}
                      <span className="text-slate-400 font-normal">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Introduce yourself and your requirements..."
                      className={`w-full p-4 rounded-xl border bg-slate-50 outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all resize-none ${
                        state?.errors?.message
                          ? "border-red-500"
                          : "border-slate-200"
                      }`}
                    />
                    {state?.errors?.message && (
                      <p className="text-xs text-red-500 mt-1">
                        {state.errors.message[0]}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={pending}
                    className="w-full h-12 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {pending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" /> Submit Request
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyRentalRequestModal;
