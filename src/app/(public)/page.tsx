import { Suspense } from "react";
import HeroSkeleton from "@public/_components/_home/HeroSkeleton";
import HomepageHeroSection from "@public/_components/_home/HeroSection";
import HomepageTrustStripSection from "@public/_components/_home/TrustStripSection";
import HomepageCategoriesSection from "@public/_components/_home/CategoriesSection";
import HomepageFeaturedPropertiesSection from "@public/_components/_home/FeaturedPropertiesSection";
import FeaturedPropertiesSkeleton from "@public/_components/_home/FeaturedPropertiesSkeleton";
import HomepageHowItWorksSection from "@public/_components/_home/HowItWorksSection";
import HomepageWhyChooseUsSection from "@public/_components/_home/WhyChooseUsSection";
import HomepagePopularLocationsSection from "@public/_components/_home/PopularLocationsSection";
import HomepageBecomeLandlordSection from "@public/_components/_home/BecomeLandlordSection";
import HomepageTestimonialsSection from "@public/_components/_home/TestimonialsSection";
import HomepageFaqSection from "@public/_components/_home/FaqSection";
import CtaBand from "@/components/shared/CtaBand";
// get data
import {
  getAllProperties,
  getCategories,
  getProperties,
} from "@public/_actions/getData";

const Home = async () => {
  // get data
  const categories = await getCategories();
  const properties = await getProperties({ page: "1" });
  const allProperties = await getAllProperties();

  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HomepageHeroSection categories={categories ?? []} />
      </Suspense>
      <HomepageTrustStripSection />
      <HomepageCategoriesSection categories={categories ?? []} />
      <Suspense fallback={<FeaturedPropertiesSkeleton />}>
        <HomepageFeaturedPropertiesSection
          properties={properties?.properties?.slice(0, 6) ?? []}
        />
      </Suspense>
      <HomepageHowItWorksSection />
      <HomepageWhyChooseUsSection />
      <HomepagePopularLocationsSection allProperties={allProperties ?? []} />
      <HomepageBecomeLandlordSection />
      <HomepageTestimonialsSection />
      <HomepageFaqSection />
      <CtaBand
        title={
          <>
            Your next home is already
            <br className="hidden sm:block" /> waiting on RentNest
          </>
        }
        subtitle="Join thousands of tenants and landlords renting the calm, transparent way."
        primaryAction={{ href: "/properties", label: "Browse properties" }}
        secondaryAction={{ href: "/register", label: "Create free account" }}
        note="No hidden fees · Verified listings · Secure Stripe checkout"
      />
    </>
  );
};

export default Home;