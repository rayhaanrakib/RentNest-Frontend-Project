import type { Metadata } from "next";
import CtaBand from "@/components/shared/CtaBand";
import AboutHeroSection from "@public/_components/_about/AboutHeroSection";
import AboutStorySection from "@public/_components/_about/AboutStorySection";
import AboutValuesSection from "@public/_components/_about/AboutValuesSection";
import AboutImpactSection from "@public/_components/_about/AboutImpactSection";
import AboutJourneySection from "@public/_components/_about/AboutJourneySection";
import AboutRolesSection from "@public/_components/_about/AboutRolesSection";
import AboutTeamSection from "@public/_components/_about/AboutTeamSection";
import AboutGallerySection from "@public/_components/_about/AboutGallerySection";

export const metadata: Metadata = {
  title: "About RentNest — Home is a feeling, not a listing",
  description:
    "RentNest is rebuilding renting around verified listings, transparent requests, and secure payments. This is our story.",
};

const AboutPage = () => {
  return (
    <>
      <AboutHeroSection />
      <AboutStorySection />
      <AboutValuesSection />
      <AboutImpactSection />
      <AboutJourneySection />
      <AboutRolesSection />
      <AboutGallerySection />
      <AboutTeamSection />
      <CtaBand
        title={
          <>
            Come feel the difference
            <br className="hidden sm:block" /> on your next move
          </>
        }
        subtitle="Browse verified homes, or list yours to thousands of tenants who'll treat it right."
        eyebrow="Join RentNest"
        primaryAction={{ href: "/properties", label: "Find your home" }}
        secondaryAction={{ href: "/register", label: "List your property" }}
        note="Verified listings · Transparent requests · Secure Stripe checkout"
      />
    </>
  );
};

export default AboutPage;