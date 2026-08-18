import { SiteHeader } from "@/components/layout/SiteHeader";
import { TripJsonLd } from "@/components/seo/TripJsonLd";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { HeroSection, StickyMobileCTA } from "@/components/sections/HeroSection";
import { HostSection } from "@/components/sections/HostSection";
import { InclusionsSection } from "@/components/sections/InclusionsSection";
import { ItinerarySection } from "@/components/sections/ItinerarySection";
import {
  SofoundHouseSection,
  WhySofoundExists,
} from "@/components/sections/JourneySections";
import { PricingSection } from "@/components/sections/PricingSection";

export default function Home() {
  return (
    <>
      <TripJsonLd />
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        {/* Temporarily hidden for review: JourneyAtAGlance stats section. */}
        <WhySofoundExists />
        <ItinerarySection />
        <InclusionsSection />
        <SofoundHouseSection />
        <PricingSection />
        <HostSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <StickyMobileCTA />
    </>
  );
}
