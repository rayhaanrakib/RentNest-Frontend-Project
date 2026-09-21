"use server";

import { isAccessTokenExist } from "@/service/refreshToken";
import { ITogglePropertyStatus, IUpdateRentalStatus } from "@/types";
import { revalidateTag } from "next/cache";

interface ActionState {
  success: boolean;
  message: string;
}
const parseArrayField = (value: FormDataEntryValue | null): string[] => {
  if (!value) return [];

  const str = value.toString();

  try {
    const parsed = JSON.parse(str);

    if (
      Array.isArray(parsed) &&
      parsed.every((item) => typeof item === "string")
    ) {
      return parsed;
    }
  } catch {}

  return str
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};
const buildPayload = (formData: FormData, includeStatus = false) => {
  const payload = {
    title: formData.get("title")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    address: formData.get("address")?.toString() ?? "",
    city: formData.get("city")?.toString() ?? "",
    state: formData.get("state")?.toString() ?? "",
    zipCode: formData.get("zipCode")?.toString() ?? "",
    country: formData.get("country")?.toString() ?? "",
    rentAmount: Number(formData.get("rentAmount") ?? 0),
    bedrooms: Number(formData.get("bedrooms") ?? 0),
    bathrooms: Number(formData.get("bathrooms") ?? 0),
    area: Number(formData.get("area") ?? 0),
    categoryId: formData.get("categoryId")?.toString() ?? "",

    amenities: parseArrayField(formData.get("amenities")),
    images: parseArrayField(formData.get("images")),
  };

  if (includeStatus) {
    return {
      ...payload,
      status: formData.get("status")?.toString() ?? "",
    };
  }

  return payload;
};
const getAuthHeaders = async (json = false) => {
  const accessToken = await isAccessTokenExist();

  if (!accessToken) return null;

  return {
    Authorization: `Bearer ${accessToken}`,
    ...(json && {
      "Content-Type": "application/json",
    }),
  };
};

// Create Property
export const createProperty = async (
  _prevState: ActionState,
  formData: FormData,
) => {
  const headers = await getAuthHeaders(true);

  if (!headers) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/properties/landlord/create`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(buildPayload(formData)),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("landlord-properties", {
      expire: 0,
    });
  }

  return result;
};

// Update Property

export const updateProperty = async (
  propertyId: string,
  _prevState: ActionState | null,
  formData: FormData,
) => {
  const headers = await getAuthHeaders(true);
  if (!headers) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/properties/landlord/${propertyId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(buildPayload(formData, true)),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("landlord-properties", {
      expire: 0,
    });
  }

  return result;
};

// Delete Property

export const deleteProperty = async (propertyId: string) => {
  const headers = await getAuthHeaders();

  if (!headers) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/properties/landlord/${propertyId}`,
    {
      method: "DELETE",
      headers,
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("landlord-properties", {
      expire: 0,
    });
  }

  return result;
};
// Toggle Status Property

export const togglePropertyStatus = async (
  propertyId: string,
  status: ITogglePropertyStatus,
) => {
  const headers = await getAuthHeaders(true);

  if (!headers) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/properties/${propertyId}/status`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({status}),
    },
  );
  const result = await res.json();

  if (result.success) {
    revalidateTag("landlord-properties", {
      expire: 0,
    });
  }

  return result;
};

// Get Landlord Properties

export const getLandlordProperties = async () => {
  const headers = await getAuthHeaders();

  if (!headers) {
    return [];
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/properties/my-property`,
    {
      headers,
      cache: "no-cache",
      next: {
        tags: ["landlord-properties"],
      },
    },
  );

  const result = await res.json();

  return result.data;
};


// get rentals
export const getLandlordRentals = async()=>{
    const headers = await getAuthHeaders();
    if (!headers) {
      return [];
    }
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/rentals/landlord/requests/all`,
      {
        headers,
        cache: "no-cache",
        next: {
          tags: ["landlord-rentals"],
        },
      },
    );
    const result = await res.json();
    return result.data;
}
// get rental request detail
export const getLandlordRentalDetail = async (requestId: string) => {
  const headers = await getAuthHeaders();
  if (!headers) {
    return {};
  }
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/rentals/landlord/requests/${requestId}`,
    {
      headers,
      cache: "no-cache",
      next: {
        tags: ["landlord-rentals-detail"],
      },
    },
  );
  const result = await res.json();
  return result.data;
}

// update rental status
export const updateRentalStatus = async (
  requestId: string,
  status: IUpdateRentalStatus,
) => {
  const headers = await getAuthHeaders(true);

  if (!headers) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/rentals/landlord/requests/${requestId}`,
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({status}),
    },
  );
  const result = await res.json();

  if (result.success) {
    revalidateTag("landlord-rentals", {
      expire: 0,
    });
  }

  return result;
}

