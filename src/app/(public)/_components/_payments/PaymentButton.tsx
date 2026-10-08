"use client";

import { useActionState, useEffect } from "react";
import { makePayment } from "@public/_actions/paymentActions";
import { toast } from "sonner";
import {
  ArrowUpRight,
  CreditCard,
  Loader2,
  LockKeyhole,
} from "lucide-react";
import { redirect } from "next/navigation";

const PaymentButton = ({
  rentalRequestId,
}: {
  rentalRequestId: string;
}) => {
  const [state, action, pending] = useActionState(makePayment, null);

  useEffect(() => {
    if (state && !state.success) {
      toast.error(state.errorDetails || "Failed to start checkout");
      redirect("/tenant/dashboard/requests", "replace");
    }
  }, [state]);

  return (
    <form action={action} className="w-full">
      <input type="hidden" name="rentalRequestId" value={rentalRequestId} />

      <button
        type="submit"
        disabled={pending}
        className="
          group relative flex h-14 w-full items-center justify-center
          overflow-hidden rounded-2xl bg-slate-900 px-5
          text-sm font-semibold text-white
          shadow-[0_12px_28px_rgba(15,23,42,0.22)]
          transition-all duration-300
          hover:-translate-y-0.5 hover:bg-slate-800
          hover:shadow-[0_18px_35px_rgba(15,23,42,0.28)]
          active:translate-y-0
          focus-visible:outline-none focus-visible:ring-4
          focus-visible:ring-slate-900/15
          disabled:cursor-not-allowed disabled:opacity-70
          disabled:hover:translate-y-0 disabled:hover:bg-slate-900
        "
      >
        {!pending && (
          <span
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0 -translate-x-full
              bg-gradient-to-r from-transparent via-white/15 to-transparent
              transition-transform duration-700 ease-out
              group-hover:translate-x-full
            "
          />
        )}

        <span className="relative flex items-center justify-center gap-3">
          {pending ? (
            <>
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
                <Loader2 className="h-4 w-4 animate-spin" />
              </span>
              <span>Redirecting to Stripe...</span>
            </>
          ) : (
            <>
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/10 transition-colors group-hover:bg-white/15">
                <CreditCard className="h-4 w-4" />
              </span>

              <span>Continue to secure payment</span>

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </>
          )}
        </span>
      </button>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
        <LockKeyhole className="h-3.5 w-3.5 text-emerald-600" />
        Secure checkout powered by Stripe
      </p>
    </form>
  );
}
export default PaymentButton;