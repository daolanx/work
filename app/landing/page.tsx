import CompanySection from "./_components/company-section";
import CTASection from "./_components/cta-section";
import FeatureSection from "./_components/feature-section";
import FeedBackSection from "./_components/feedback-section";
import HeroSection from "./_components/hero-section";
import PriceSection from "./_components/price-section";
import ProcessSection from "./_components/process-section";

export default function LandingPage() {
	return (
		<main className="section-max-width-wrapper">
			<HeroSection />
			<CompanySection />
			<FeatureSection />
			<ProcessSection />
			<FeedBackSection />
			<PriceSection />
			<CTASection />
		</main>
	);
}