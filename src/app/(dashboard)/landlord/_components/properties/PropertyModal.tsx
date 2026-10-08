"use client";

import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, Building2, MapPin, DollarSign, Bed, Bath, Maximize,
  ImagePlus, Plus, Trash2, Loader2,
} from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createProperty, updateProperty } from "@dashboard/landlord/_actions/landlordActions";
import { IPropertyFormData, IPropertyStatus, ICategorySelect } from "@/types";

interface PropertyModalProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "update";
  initialData?: IPropertyFormData;
  categories?: ICategorySelect[];
  propertyId?: string;
}

const STATUS_OPTIONS = [
  { value: "AVAILABLE", label: "Available" },
  { value: "RENTED", label: "Rented" },
  { value: "UNAVAILABLE", label: "Unavailable" },
];

const PropertyModal = ({
  open, onClose, mode, initialData, categories = [], propertyId,
}: PropertyModalProps) => {
  const [images, setImages] = useState<string[]>(initialData?.images ?? []);
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    if (open) {
      setImages(initialData?.images ?? []);
    }
  }, [open, initialData]);

  const action =
    mode === "update" && propertyId
      ? updateProperty.bind(null, propertyId)
      : createProperty;

  const [state, formAction, pending] = useActionState(action, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(
        state.message ||
          (mode === "create"
            ? "Property created successfully"
            : "Property updated successfully")
      );
      onClose();
    } else {
      toast.error(state.message || "Something went wrong");
    }
  }, [state]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const addImage = () => {
    if (newImage.trim()) {
      setImages((prev) => [...prev, newImage.trim()]);
      setNewImage("");
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative flex w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] flex-col overflow-hidden rounded-t-[1.5rem] bg-white shadow-2xl sm:rounded-[2rem]"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50">
                  <Building2 className="h-4 w-4 text-slate-700" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                    {mode === "create" ? "Add New Property" : "Update Property"}
                  </h2>
                  <p className="hidden text-xs text-slate-500 sm:block">
                    {mode === "create"
                      ? "Fill in the details to list a new property"
                      : "Only changed fields will be sent"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form action={formAction} className="flex min-h-0 flex-1 flex-col">
              <input type="hidden" name="images" value={JSON.stringify(images)} />

              <div className="flex-1 overflow-y-auto px-4 py-5 no-scrollbar sm:px-6">
                <div className="space-y-6">
                  {/* Info */}
                  <Section title="Basic Information" icon={Building2}>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        Property Title {mode === "create" && <span className="text-red-400">*</span>}
                      </label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={initialData?.title}
                        placeholder="e.g. Modern Apartment in Dhanmondi"
                        required={mode === "create"}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        Description {mode === "create" && <span className="text-red-400">*</span>}
                      </label>
                      <textarea
                        name="description"
                        defaultValue={initialData?.description}
                        placeholder="Describe your property..."
                        rows={3}
                        required={mode === "create"}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-700">
                          Category {mode === "create" && <span className="text-red-400">*</span>}
                        </label>
                        <select
                          name="categoryId"
                          defaultValue={initialData?.categoryId}
                          required={mode === "create"}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        >
                          <option value="">Select category</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {mode === "update" && (
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-slate-700">
                            Status
                          </label>
                          <select
                            name="status"
                            defaultValue={initialData?.status}
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <option key={s.value} value={s.value}>
                                {s.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  </Section>

                  {/* Location */}
                  <Section title="Location" icon={MapPin}>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        Address {mode === "create" && <span className="text-red-400">*</span>}
                      </label>
                      <input
                        type="text"
                        name="address"
                        defaultValue={initialData?.address}
                        placeholder="House 32, Road 5, Dhanmondi"
                        required={mode === "create"}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-700">
                          City {mode === "create" && <span className="text-red-400">*</span>}
                        </label>
                        <input
                          type="text"
                          name="city"
                          defaultValue={initialData?.city}
                          placeholder="Dhaka"
                          required={mode === "create"}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-700">
                          State {mode === "create" && <span className="text-red-400">*</span>}
                        </label>
                        <input
                          type="text"
                          name="state"
                          defaultValue={initialData?.state}
                          placeholder="Dhaka Division"
                          required={mode === "create"}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-700">
                          ZIP Code {mode === "create" && <span className="text-red-400">*</span>}
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          defaultValue={initialData?.zipCode}
                          placeholder="1209"
                          required={mode === "create"}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-700">
                          Country {mode === "create" && <span className="text-red-400">*</span>}
                        </label>
                        <input
                          type="text"
                          name="country"
                          defaultValue={initialData?.country ?? "Bangladesh"}
                          placeholder="Bangladesh"
                          required={mode === "create"}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        />
                      </div>
                    </div>
                  </Section>

                  {/* Property Details */}
                  <Section title="Property Details">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <div>
                        <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-slate-700">
                          <DollarSign className="h-3 w-3 text-slate-400" />
                          Rent (BDT) {mode === "create" && <span className="text-red-400">*</span>}
                        </label>
                        <input
                          type="number"
                          name="rentAmount"
                          defaultValue={initialData?.rentAmount}
                          min={0}
                          required={mode === "create"}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-slate-700">
                          <Bed className="h-3 w-3 text-slate-400" />
                          Bedrooms
                        </label>
                        <input
                          type="number"
                          name="bedrooms"
                          defaultValue={initialData?.bedrooms}
                          min={0}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-slate-700">
                          <Bath className="h-3 w-3 text-slate-400" />
                          Bathrooms
                        </label>
                        <input
                          type="number"
                          name="bathrooms"
                          defaultValue={initialData?.bathrooms}
                          min={0}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 flex items-center gap-1 text-xs font-medium text-slate-700">
                          <Maximize className="h-3 w-3 text-slate-400" />
                          Area (sqft)
                        </label>
                        <input
                          type="number"
                          name="area"
                          defaultValue={initialData?.area}
                          min={0}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        />
                      </div>
                    </div>
                  </Section>

                  {/* Amenities */}
                  <Section title="Amenities">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        Amenities (comma separated)
                      </label>
                      <input
                        type="text"
                        name="amenities"
                        defaultValue={initialData?.amenities?.join(", ")}
                        placeholder="e.g. WiFi, AC, Parking, Generator"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                      />
                    </div>
                  </Section>

                  {/* Images */}
                  <Section title="Images" icon={ImagePlus}>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        placeholder="Paste image URL..."
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addImage();
                          }
                        }}
                        className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                      />
                      <button
                        type="button"
                        onClick={addImage}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {images.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {images.map((url, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                          >
                            <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-200 text-[10px] font-bold text-slate-500">
                              {i + 1}
                            </span>
                            <span className="flex-1 truncate text-xs text-slate-600">
                              {url}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeImage(i)}
                              className="text-slate-400 hover:text-red-500"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </Section>
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-between border-t border-slate-100 bg-white px-4 py-4 sm:px-6">
                <p className="hidden text-xs text-slate-400 sm:block">
                  {mode === "update" ? "Only modified fields will be updated" : ""}
                </p>
                <div className="ml-auto flex w-full gap-3 sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="h-11 flex-1 rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-600 hover:border-slate-300 sm:flex-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={pending}
                    className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70 sm:flex-none"
                  >
                    {pending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {mode === "create" ? "Creating..." : "Saving..."}
                      </>
                    ) : mode === "create" ? (
                      <>
                        <Plus className="h-4 w-4" />
                        Create Property
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-slate-400" />}
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
export default PropertyModal;