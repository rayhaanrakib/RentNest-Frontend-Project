"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, User, Mail, Phone, Calendar,
  Building2, Home, Star, Loader2,
  ShieldCheck, ShieldOff,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { getAdminUserDetail, updateUserStatus } from "@dashboard/admin/_actions/adminActions";
import { generateInitials } from "@/lib/utils";
import { IUserStatus } from "@/types";
import { useRouter } from "next/navigation";

const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  ACTIVE: { label: "Active", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
  INACTIVE: { label: "Inactive", color: "text-slate-500", bg: "bg-slate-100 border-slate-200", dot: "bg-slate-400" },
};

const roleConfig: Record<string, { label: string; color: string; bg: string }> = {
  TENANT: { label: "Tenant", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  LANDLORD: { label: "Landlord", color: "text-brand-700", bg: "bg-brand-50 border-brand-200" },
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

const UserDetailModal=({
  open,
  onClose,
  userId,
}: {
  open: boolean;
  onClose: () => void;
  userId: string;
})=> {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    if (open && userId) {
      setLoading(true);
      getAdminUserDetail(userId)
        .then((data) => setUser(data))
        .catch(() => toast.error("Failed to load user details"))
        .finally(() => setLoading(false));
    }
  }, [open, userId]);

  const handleToggleStatus = async () => {
    if (!user) return;

    const newStatus = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    setToggling(true);

    const result = await updateUserStatus(userId, newStatus as IUserStatus);

    if (result?.success) {
      toast.success(result.message || `User marked as ${newStatus.toLowerCase()}`);
      setUser({ ...user, status: newStatus });
      router.refresh();
    } else {
      toast.error(result?.message || "Failed to update status");
    }
    setToggling(false);
  };

  if (!open) return null;

  const status = user ? (statusConfig[user.status] ?? statusConfig.ACTIVE) : null;
  const role = user ? (roleConfig[user.role] ?? roleConfig.TENANT) : null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
        <motion.div
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          className="relative flex w-full max-w-lg max-h-[95vh] sm:max-h-[85vh] flex-col overflow-hidden rounded-t-[1.5rem] bg-white shadow-2xl sm:rounded-[2rem]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
              <p className="text-xs text-slate-500">Loading user details...</p>
            </div>
          )}

          {!loading && !user && (
            <div className="flex flex-col items-center justify-center py-20 gap-2">
              <p className="text-sm text-slate-500">User not found.</p>
              <button onClick={onClose} className="text-xs text-slate-400 underline">Close</button>
            </div>
          )}

          {/* Content */}
          {!loading && user && (
            <>
              {/* Header */}
              <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 px-6 pt-6 pb-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-900"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-xl">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      generateInitials(user.name)
                    )}
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{user.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      {role && (
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${role.bg} ${role.color}`}>
                          {role.label}
                        </span>
                      )}
                      {status && (
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${status.bg} ${status.color}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                          {status.label}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                {/* Contact */}
                <div className="rounded-xl border border-slate-100 p-4 space-y-3">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    Contact Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <Mail className="h-4 w-4 text-slate-400" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <Phone className="h-4 w-4 text-slate-400" />
                      {user.phone || "Not provided"}
                    </div>
                  </div>
                </div>

                {/* Activity */}
                {user._count && (
                  <div className="rounded-xl border border-slate-100 p-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-3">
                      Activity
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-xl bg-slate-50 p-3 text-center">
                        <Building2 className="mx-auto h-4 w-4 text-slate-400 mb-1" />
                        <p className="text-lg font-bold text-slate-900">{user._count.properties}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Properties</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3 text-center">
                        <Home className="mx-auto h-4 w-4 text-slate-400 mb-1" />
                        <p className="text-lg font-bold text-slate-900">{user._count.rentals}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Rentals</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-3 text-center">
                        <Star className="mx-auto h-4 w-4 text-slate-400 mb-1" />
                        <p className="text-lg font-bold text-slate-900">{user._count.reviews}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Reviews</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ID */}
                <div className="rounded-xl border border-slate-100 p-4 space-y-2">
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1">
                    Account Info
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">User ID</span>
                    <span className="text-xs font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded">
                      {user.id.slice(0, 12)}...
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> Joined
                    </span>
                    <span className="text-slate-700">{formatDate(user.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> Updated
                    </span>
                    <span className="text-slate-700">{formatDate(user.updatedAt)}</span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="shrink-0 border-t border-slate-100 bg-white px-6 py-4">
                <button
                  type="button"
                  disabled={toggling}
                  onClick={handleToggleStatus}
                  className={`w-full flex items-center justify-center gap-2 h-11 rounded-full text-sm font-semibold transition-all disabled:opacity-50 ${
                    user.status === "ACTIVE"
                      ? "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  {toggling ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : user.status === "ACTIVE" ? (
                    <>
                      <ShieldOff className="h-4 w-4" />
                      Deactivate User
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      Activate User
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
export default UserDetailModal;