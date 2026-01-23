import CompanySection from "@/app/landing/components/company-section";
import CTASection from "@/app/landing/components/cta-section";
import FeatureSection from "@/app/landing/components/feature-section";
import FeedBackSection from "@/app/landing/components/feedback-section";
import HeroSection from "@/app/landing/components/hero-section";
import PriceSection from "@/app/landing/components/price-section";
import ProcessSection from "@/app/landing/components/process-section";

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
