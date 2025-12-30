import HeroSection from "@/components/landing/hero-section";
import FeatureSection from "@/components/landing/feature-section";
import ProcessSection from "@/components/landing/process-section";
import PriceSection from "@/components/landing/price-section";
import CompanySection from "@/components/landing/company-section";
import FeedBackSection from "@/components/landing/feedback-section";
import CTASection from "@/components/landing/cta-section";

export default function LandingPage() {
  return (
    <main className="section-max-width-wrapper">
      <HeroSection />
      <FeatureSection />
      <ProcessSection />
      <PriceSection />
      <CompanySection />
      <FeedBackSection />
      <CTASection />
    </main>
  );
}
