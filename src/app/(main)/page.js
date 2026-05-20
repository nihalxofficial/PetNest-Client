import BenefitsSection from "@/components/BenefitsSection";
import FeaturedPetsSection from "@/components/FeaturedSection";
import HeroSection from "@/components/HeroSection";
import PetCareTipsSection from "@/components/PetCareTips";
import SuccessStoriesSection from "@/components/SuccessStories";
import WhyAdoptSection from "@/components/WhyAdoptSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <FeaturedPetsSection/>
      <WhyAdoptSection/>
      <SuccessStoriesSection/>
      <PetCareTipsSection/>
    </>
  );
}
