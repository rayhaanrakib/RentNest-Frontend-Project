"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, ArrowRight } from "lucide-react";

interface RentalDetailModalProps {
  rental: any;
}

const RentalDetailModal = ({ rental }: RentalDetailModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const property = rental.property;

  const renderStatusBadge = (status: string) => {
    const config: Record<string, { color: string; label: string }> = {
      PENDING: { color: "bg-amber-50 text-amber-700 border-amber-200", label: "Pending" },
      APPROVED: { color: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Approved" },
      ACTIVE: { color: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Active" },
      REJECTED: { color: "bg-red-50 text-red-700 border-red-200", label: "Rejected" },
      COMPLETED: { color: "bg-blue-50 text-blue-700 border-blue-200", label: "Completed" },
    };

    const { color, label } = config[status] || { color: "bg-slate-50 text-slate-700 border-slate-200", label: status };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${color}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {label}
      </span>
    );
  };

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-brand-600 transition-colors group"
      >
        View Details
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-t-[1.5rem] sm:rounded-[1.5rem] shadow-2xl p-6 no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-slate-900 leading-tight">
                    {property?.title}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-sm">
                    <MapPin className="h-3.5 w-3.5" />
                    {property?.address}, {property?.city}
                  </div>
                </div>
                <div className="shrink-0 mt-1">
                  {renderStatusBadge(rental.status)}
                </div>
              </div>

              <div className="h-px bg-slate-100 mb-6"></div>

              {/* Message */}
              <div className="mb-6">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">Your Message</p>
                <p className="text-sm text-slate-600 italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                  "{rental.message || "No message was provided with this request."}"
                </p>
              </div>

              {/* Landlord */}
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">Landlord Contact</p>
                <a
                  href={`tel:${property?.landlord?.phone}`}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-brand-600 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-100 transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  {property?.landlord?.phone || "No phone number provided"}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RentalDetailModal;