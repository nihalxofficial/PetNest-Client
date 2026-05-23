import AdoptionProcessSection from "@/components/AdoptionProcess";
import BenefitsSection from "@/components/BenefitsSection";
import EmergencySupportSection from "@/components/EmergencySupport";
import FAQSection from "@/components/FaqSection";
import FeaturedPetsSection from "@/components/FeaturedSection";
import HeroSection from "@/components/HeroSection";
import PetCareTipsSection from "@/components/PetCareTips";
import SuccessStoriesSection from "@/components/SuccessStories";
import WhyAdoptSection from "@/components/WhyAdoptSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedPetsSection/>
      <BenefitsSection />
      <WhyAdoptSection/>
      <SuccessStoriesSection/>
      <PetCareTipsSection/>
      <AdoptionProcessSection/>
      <EmergencySupportSection/>
      <FAQSection/>
    </>
  );
}
