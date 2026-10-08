import { z } from "zod";

export const rentalRequestSchema = z.object({
  propertyId: z.string().min(1, "Property ID is required"),
  moveInDate: z.string().min(1, "Move-in date is required"),
  duration: z.string().min(1, "Duration is required").transform(Number).pipe(z.number().min(1, "Duration must be at least 1 month")),
  message: z.string().optional(),
});

export type RentalRequestState = {
  success: boolean;
  errors?: {
    propertyId?: string[];
    moveInDate?: string[];
    duration?: string[];
    message?: string[];
  };
  errorMessage?: string;
  errorDetails?: string;
  data?: any;
};