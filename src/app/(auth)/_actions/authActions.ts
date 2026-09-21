"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginSchema, registerSchema } from "@/lib/validations/auth";

export type AuthState = {
  success: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    role?: string[];
    phone?: string[];
    avatar?: string[];
  };
  errorDetails?: string;
};

export const loginAction = async (redirectTo: string, prevState: AuthState, formData: FormData): Promise<AuthState> => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(rawFormData);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      errorDetails: "Please check your inputs.",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  const result = await res.json();

  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    if (result.data.refreshToken) {
      cookieStore.set("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      });
    }

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

    if (redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
      redirect(redirectTo);
    }

    if (decodedToken.role === "TENANT") redirect("/tenant/dashboard");
    if (decodedToken.role === "LANDLORD") redirect("/landlord/dashboard");
    if (decodedToken.role === "ADMIN") redirect("/admin/dashboard");
    redirect("/");
  }

  return {
    success: false,
    errorDetails: result.errorDetails || result.message || "Login failed",
  };
};

export const registerAction = async (prevState: AuthState | null, formData: FormData): Promise<AuthState> => {
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
    phone: formData.get("phone"),
    avatar: formData.get("avatar"),
  };

  const parsed = registerSchema.safeParse(rawFormData);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      errorDetails: "Please fix the highlighted errors.",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  const result = await res.json();
  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    if (result.data.refreshToken) {
      cookieStore.set("refreshToken", result.data.refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
      });
    }
    redirect("/");
  }

  return {
    success: false,
    errorDetails: result.errorDetails || result.message || "Registration failed",
  };
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/user/me`, {
      headers: { Cookie: `accessToken=${accessToken}` },
      cache: "no-store",
    });

    const result = await res.json();
    if (result.success) return result.data;
    return null;
  } catch {
    return null;
  }
};

export const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  return { success: true };
};

export const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) return null;

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
};