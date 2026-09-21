import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/icons/sharedIcon";
import { IDashboardNavItem } from "@/types";
import { CalendarDays, Cuboid, FileText, LayoutDashboard, User } from "lucide-react";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export const authLinks = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

// Only routes that actually exist today — no dead-end footer links.
export const footerLinks = [
  {
    title: "Platform",
    links: [
      { href: "/properties", label: "Browse Properties" },
      { href: "/categories", label: "Categories" },
      { href: "/#how-it-works", label: "How It Works" },
      { href: "/register", label: "Become a Landlord" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/#testimonials", label: "Testimonials" },
      { href: "/#faq", label: "FAQs" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Login" },
      { href: "/register", label: "Create Account" },
    ],
  },
];

export const socialLinks = [
  { href: "#", label: "Facebook", Icon: FacebookIcon },
  { href: "#", label: "Twitter", Icon: TwitterIcon },
  { href: "#", label: "Instagram", Icon: InstagramIcon },
  { href: "#", label: "LinkedIn", Icon: LinkedinIcon },
];

// dashboard links
const TENANT_SIDEBAR_ITEMS: IDashboardNavItem[] = [
  {
    href: "/tenant/dashboard",
    label: "Profile",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/tenant/dashboard/requests",
    label: "Requests",
    icon: FileText,
  },
  {
    href: "/tenant/dashboard/payments",
    label: "Payments",
    icon: FileText,
  },
  {
    href: "/tenant/dashboard/reviews",
    label: "Reviews",
    icon: FileText,
  },
];
const LANDLORD_SIDEBAR_ITEMS: IDashboardNavItem[] = [
  {
    href: "/landlord/dashboard",
    label: "Profile",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/landlord/dashboard/properties",
    label: "Properties",
    icon: FileText,
  },
  {
    href: "/landlord/dashboard/rentals",
    label: "Rentals",
    icon: CalendarDays,
  },
  {
    href: "/landlord/dashboard/payments",
    label: "Payments",
    icon: FileText,
  }
];
const ADMIN_SIDEBAR_ITEMS: IDashboardNavItem[] = [
  {
    href: "/admin/dashboard",
    label: "Profile",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/admin/dashboard/stats",
    label: "Stats",
    icon: FileText,
  },
  {
    label: "Users",
    href: "/admin/dashboard/users",
    icon: User,
  },
  {
    label: "Categories",
    href: "/admin/dashboard/categories",
    icon: Cuboid,
  },
];

export const DashboardNavItems = {
  TENANT: TENANT_SIDEBAR_ITEMS,
  LANDLORD: LANDLORD_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};