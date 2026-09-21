"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type PaymentState = {
  success: boolean;
  errorDetails?: string;
};

export const makePayment = async (prevState: PaymentState | null, formData: FormData): Promise<PaymentState> => {
  const rentalRequestId = formData.get("rentalRequestId") as string;

  if (!rentalRequestId) {
    return { success: false, errorDetails: "Rental Request ID is missing." };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, errorDetails: "Authentication required." };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/payments/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ rentalRequestId }),
    cache: "no-store",
  });

  const result = await res.json();

  if (result.success && result.data?.checkoutUrl) {
    redirect(result.data.checkoutUrl);
  }
  return {
    success: false,
    errorDetails: result.errorDetails || result.message || "Failed to start checkout.",
  };
};