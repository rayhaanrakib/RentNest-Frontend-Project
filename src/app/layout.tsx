import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

/**
 * Premium pairing for a rental marketplace:
 * - Fraunces (variable serif, optical sizing) for editorial display type.
 * - Manrope (variable grotesque) for crisp UI/body text.
 */
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "RentNest — Find Your Perfect Rental Home",
  description: "Discover premium rental properties with RentNest.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Toaster position="top-right" richColors />
        {children}
      </body>
    </html>
  );
}