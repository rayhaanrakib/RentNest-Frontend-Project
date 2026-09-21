import { SiteIcon } from "@/components/icons/sharedIcon";
import Link from "next/link";
import { footerLinks, socialLinks } from "./Links";
import NewsletterForm from "./NewsletterForm";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="relative mt-auto border-t border-border/60 bg-background/80 backdrop-blur-xl"
    >
      {/* Subtle top gradient line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/80 to-transparent"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12 lg:gap-8">
          {/* Brand & newsletter */}
          <div className="col-span-6 space-y-6 md:col-span-6">
            <Link
              href="/"
              aria-label="RentNest — back to homepage"
              className="inline-flex items-center gap-2.5 cursor-pointer"
            >
              <SiteIcon className="h-4 w-auto" />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              The trusted marketplace for tenants and landlords. Find your
              perfect home — or the ideal tenant — with ease.
            </p>
            <NewsletterForm />
          </div>

          {/* Link columns */}
          {footerLinks.map((section) => (
            <nav
              key={section.title}
              aria-label={`Footer — ${section.title}`}
              className="col-span-2 space-y-4 md:col-span-2"
            >
              <h2 className="text-sm font-semibold text-foreground">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-brand-600 cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-border/60 pt-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-xs text-muted-foreground">
              © {currentYear} RentNest Inc. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Built with Next.js, Tailwind CSS, and shadcn/ui.
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-foreground/20 hover:bg-muted hover:text-foreground cursor-pointer"
              >
                <social.Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}