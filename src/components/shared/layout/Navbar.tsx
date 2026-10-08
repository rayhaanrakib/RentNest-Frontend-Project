"use client";

import { cn, generateInitials } from "@/lib/utils";
import type { IUser } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks, authLinks } from "./Links";
import { SiteIcon } from "@/components/icons/sharedIcon";
import { getCurrentUser, logoutAction } from "@auth/_actions/authActions";
import { toast } from "sonner";

// Add any pages here that have a dark hero image/background
const DARK_HERO_PATHS = ["/", "/properties", "/about"];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  // Checks if current path is in the dark hero list AND has not scrolled yet
  const isDarkBg = DARK_HERO_PATHS.includes(pathname) && !isScrolled;

  useEffect(() => {
    getCurrentUser().then((data) => {
      setUser(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (previousPathname !== pathname) {
    setPreviousPathname(pathname);
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDashboardPath = () => {
    if (!user) return authLinks[0].href;
    switch (user.role) {
      case "TENANT": return "/tenant/dashboard";
      case "LANDLORD": return "/landlord/dashboard";
      case "ADMIN": return "/admin/dashboard";
      default: return "/";
    }
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingOut(true);
    const res = await logoutAction();
    if (res?.success) {
      toast.success("User Logged Out Successfully!");
      setUser(null);
      router.push("/login");
    } else {
      toast.error("Logout failed. Please try again.");
      setIsLoggingOut(false);
    }
  };

  const renderAuthSection = () => {
    if (isLoading) {
      return <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />;
    }

    if (user) {
      return (
        <div className="relative" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            aria-expanded={isUserMenuOpen}
            aria-haspopup="menu"
            aria-label="Account menu"
            className="flex cursor-pointer items-center gap-2 rounded-full p-1 pr-2 transition-all hover:bg-muted"
          >
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-brand-500 to-brand-700 text-xs font-semibold text-white">
              {user?.avatar ? (
                <Image src={user.avatar} alt={user.name} width={36} height={36} className="h-full w-full object-cover" />
              ) : (
                generateInitials(user.name)
              )}
            </div>
            <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isUserMenuOpen && "rotate-180")} aria-hidden="true" />
          </button>

          <AnimatePresence>
            {isUserMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                role="menu"
                className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-border bg-background shadow-xl"
              >
                <div className="border-b border-border p-4">
                  <p className="font-semibold text-foreground">{user.name}</p>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">{user.email}</p>
                  <span className="mt-3 inline-flex rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-semibold text-brand-700">
                    {user.role}
                  </span>
                </div>
                <div className="p-2">
                  <Link href={getDashboardPath()} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-accent">
                    <LayoutDashboard className="h-4 w-4 text-muted-foreground" /> Dashboard
                  </Link>
                  <form onSubmit={handleLogout}>
                    <button type="submit" disabled={isLoggingOut} className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-base font-medium transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50">
                      <LogOut className="h-4 w-4" /> {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <Link href={authLinks[0].href} className={cn("cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all", isDarkBg ? "bg-white text-black hover:bg-white/90" : "bg-foreground text-background hover:opacity-90")}>
        {authLinks[0].label}
      </Link>
    );
  };

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", isScrolled ? "py-3" : "py-5")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Primary" className={cn("flex h-16 items-center justify-between transition-all duration-300", isScrolled ? "rounded-2xl border border-border/60 bg-background/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-4 sm:px-6" : "rounded-2xl border border-transparent bg-transparent px-4 sm:px-6")}>

          {/* LOGO LINK */}
          <Link href="/" className="inline-flex items-center gap-2.5 cursor-pointer">
            <SiteIcon className={cn("h-5 w-auto transition-colors duration-300", isDarkBg ? "text-white" : "text-black")} />
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className={cn("hidden lg:flex items-center gap-2 p-1 rounded-full transition-colors duration-300", isDarkBg ? "bg-white/10" : "bg-muted/30")}>
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative cursor-pointer px-4 py-1.5 text-base font-medium rounded-full transition-colors duration-200 z-10",
                    active
                      ? (isDarkBg ? "text-white" : "text-foreground")
                      : (isDarkBg ? "text-white/80 hover:text-white" : "text-gray-800 hover:text-foreground")
                  )}
                >
                  {item.label}
                  {active && <motion.span layoutId="nav-active-pill" className={cn("absolute inset-0 -z-10 rounded-full shadow-sm", isDarkBg ? "bg-white/10" : "bg-background")} transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {renderAuthSection()}
          </div>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className={cn("cursor-pointer rounded-xl p-2 transition-colors lg:hidden", isDarkBg ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted")}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div id="mobile-menu-panel" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="lg:hidden overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-2">
              <div className="rounded-2xl border border-border bg-background shadow-xl overflow-hidden">
                <div className="p-3 space-y-1">
                  {navLinks.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={cn("block cursor-pointer rounded-xl px-4 py-3 text-base font-medium transition-colors", active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground")}>
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                <div className="border-t border-border p-4 space-y-4">
                  {isLoading ? (
                    <div className="w-full h-10 rounded-xl bg-muted animate-pulse" />
                  ) : user ? (
                    <>
                      <div className="flex items-center gap-3 pb-4 border-b border-border">
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-brand-500 to-brand-700 text-sm font-semibold text-white shrink-0">
                          {user.avatar ? <Image src={user.avatar} alt={user.name} width={48} height={48} className="h-full w-full object-cover" /> : generateInitials(user.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground truncate">{user.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                      <Link href={getDashboardPath()} className="flex cursor-pointer items-center gap-3 w-full rounded-xl bg-muted px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/80">
                        <LayoutDashboard className="h-5 w-5 text-foreground" /> Go to Dashboard
                      </Link>
                      <form onSubmit={handleLogout}>
                        <button type="submit" disabled={isLoggingOut} className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 disabled:opacity-50">
                          <LogOut className="h-5 w-5" /> {isLoggingOut ? "Logging out..." : "Logout"}
                        </button>
                      </form>
                    </>
                  ) : (
                    <Link href={authLinks[0].href} className="block cursor-pointer w-full rounded-xl bg-foreground px-4 py-3 text-center text-sm font-medium text-background transition-opacity hover:opacity-90">
                      Login / Sign up
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}