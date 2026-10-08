"use client";

import { RentalRequestState } from "@/lib/validations/request";
import { IPropertyStatus } from "@/types";
import { postTenantRentalRequest } from "@dashboard/tenant/_actions/tenantActions";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  KeyRound,
  Loader2,
  Lock,
  MessageSquare,
  Send,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface PropertyRentalRequestModalProps {
  id: string;
  status: IPropertyStatus;
  title: string;
  rentAmount: number;
  image?: string;
  /** Logged-out visitors are sent to /login first, then returned here. */
  isAuthenticated: boolean;
  returnTo: string;
}

const NEXT_STEPS = [
  {
    icon: Send,
    title: "Send your request",
    copy: "Pick a move-in date and how long you need the place.",
  },
  {
    icon: ClipboardCheck,
    title: "Landlord reviews",
    copy: "They see your profile and reply from their dashboard.",
  },
  {
    icon: KeyRound,
    title: "Move in",
    copy: "Once approved, pay securely and collect the keys.",
  },
];

const PropertyRentalRequestModal = ({
  id,
  status,
  title,
  rentAmount,
  image,
  isAuthenticated,
  returnTo,
}: PropertyRentalRequestModalProps) => {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const initialState: RentalRequestState = { success: false };
  const [state, action, pending] = useActionState(
    postTenantRentalRequest,
    initialState,
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Rental request submitted", {
        description: "The landlord has been notified and will review it soon.",
      });
      // Reacting to a finished server action — there is no event handler to
      // hang this on, so the close has to happen here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(false);
      router.replace("/tenant/dashboard/requests");
    }

    if (state.errorMessage) {
      toast.error(state.errorMessage, {
        description: state.errorDetails,
      });
    }
  }, [state, router]);

  // Move focus into the form when it opens; lock scroll behind the dialog.
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => firstFieldRef.current?.focus(), 120);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleTrigger = () => {
    if (!isAuthenticated) {
      toast("Sign in to send a request", {
        description: "You'll land straight back on this listing.",
      });
      router.push(`/login?redirectTo=${encodeURIComponent(returnTo)}`);
      return;
    }
    setIsOpen(true);
  };

  const isRented = status === "RENTED";
  const fieldClass = (hasError?: string[]) =>
    `w-full h-12 rounded-xl border bg-slate-50/80 px-4 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-500/25 ${
      hasError
        ? "border-destructive focus:border-destructive"
        : "border-slate-200 focus:border-brand-500"
    }`;

  return (
    <>
      <button
        type="button"
        onClick={handleTrigger}
        disabled={isRented}
        aria-haspopup="dialog"
        className={
          isRented
            ? "flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-slate-100 text-sm font-semibold text-slate-400"
            : "group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-900 text-sm font-semibold text-white shadow-lift transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-slate-700 active:translate-y-0"
        }
      >
        <CalendarDays className="h-4 w-4" aria-hidden="true" />
        {isRented ? "Currently rented" : "Request this home"}
        {!isRented ? (
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        ) : null}
      </button>

      {!isAuthenticated && !isRented ? (
        <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <Lock className="h-3 w-3" aria-hidden="true" />
          Sign in to send a request
        </p>
      ) : null}

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rental-request-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[999] flex items-end justify-center bg-ink/70 backdrop-blur-md lg:items-center lg:p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { y: "8%", opacity: 0, scale: 0.98 }
              }
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { y: "8%", opacity: 0, scale: 0.98 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(event) => event.stopPropagation()}
              className="no-scrollbar flex max-h-[92svh] w-full flex-col overflow-y-auto rounded-t-3xl bg-white shadow-2xl lg:max-h-[86svh] lg:w-[min(64rem,100%)] lg:flex-row lg:overflow-hidden lg:rounded-3xl"
            >
              {/* Left rail — the home being requested */}
              <aside className="relative hidden shrink-0 flex-col justify-between overflow-hidden bg-ink p-7 lg:flex lg:w-[22rem]">
                {image ? (
                  <>
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="352px"
                      className="object-cover opacity-35"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30"
                    />
                  </>
                ) : null}

                <div className="relative z-10">
                  <span className="glass-chip inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85">
                    Rental request
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    <span className="font-semibold text-white">
                      ৳{rentAmount?.toLocaleString()}
                    </span>{" "}
                    / month
                  </p>
                </div>

                <ol className="relative z-10 mt-10 space-y-5">
                  {NEXT_STEPS.map((step, index) => (
                    <li key={step.title} className="flex gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-white">
                        <step.icon className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {index + 1}. {step.title}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                          {step.copy}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </aside>

              {/* Form */}
              <div className="flex w-full flex-col lg:max-h-[86svh] lg:overflow-y-auto">
                <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5 lg:px-8">
                  <div>
                    <h2
                      id="rental-request-title"
                      className="font-display text-2xl font-semibold tracking-tight text-slate-900"
                    >
                      Request this home
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      The landlord sees your profile alongside this request.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close"
                    className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </header>

                <form action={action} className="space-y-5 px-6 py-6 lg:px-8">
                  <input type="hidden" name="propertyId" value={id} />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="moveInDate"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Move-in date
                      </label>
                      <input
                        ref={firstFieldRef}
                        id="moveInDate"
                        name="moveInDate"
                        type="date"
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className={fieldClass(state?.errors?.moveInDate)}
                      />
                      {state?.errors?.moveInDate ? (
                        <p className="mt-1.5 text-xs text-destructive">
                          {state.errors.moveInDate[0]}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="duration"
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        Duration (months)
                      </label>
                      <input
                        id="duration"
                        name="duration"
                        type="number"
                        required
                        min="1"
                        placeholder="6"
                        className={fieldClass(state?.errors?.duration)}
                      />
                      {state?.errors?.duration ? (
                        <p className="mt-1.5 text-xs text-destructive">
                          {state.errors.duration[0]}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Message to landlord{" "}
                      <span className="font-normal text-slate-400">
                        (optional)
                      </span>
                    </label>
                    <div className="relative">
                      <MessageSquare
                        className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-400"
                        aria-hidden="true"
                      />
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Who's moving in, and when would you like to view it?"
                        className={`${fieldClass(state?.errors?.message)} h-auto resize-none py-3.5 pl-11`}
                      />
                    </div>
                    {state?.errors?.message ? (
                      <p className="mt-1.5 text-xs text-destructive">
                        {state.errors.message[0]}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex items-start gap-2.5 rounded-xl bg-brand-50/70 p-3.5 text-xs leading-relaxed text-brand-900">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                      aria-hidden="true"
                    />
                    <p>
                      No payment is taken now. You&apos;ll only pay through RentNest
                      once the landlord accepts.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={pending}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-slate-900 text-sm font-semibold text-white shadow-lift transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-slate-700 disabled:pointer-events-none disabled:opacity-60"
                  >
                    {pending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending request…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Send request
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default PropertyRentalRequestModal;
