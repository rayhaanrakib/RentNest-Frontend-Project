export const DEMO_PASSWORD = "demo@1234";

export const DEMO_ROLES = ["TENANT", "LANDLORD", "ADMIN"] as const;

export type DemoRole = (typeof DEMO_ROLES)[number];

export const DEMO_EMAILS: Record<DemoRole, string> = {
  TENANT: "demo.tenant@rentnest.com",
  LANDLORD: "demo.landlord@rentnest.com",
  ADMIN: "demo.admin@rentnest.com",
};
