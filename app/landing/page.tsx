import { Metadata } from "next";
import CompanySection from "./_components/company-section";
import CTASection from "./_components/cta-section";
import FeatureSection from "./_components/feature-section";
import FeedBackSection from "./_components/feedback-section";
import HeroSection from "./_components/hero-section";
import PriceSection from "./_components/price-section";
import ProcessSection from "./_components/process-section";

export const metadata: Metadata = {
	title: "Midaland",
	description: "Landing Page Builder for Revenue Growth.",
	keywords: ["Midaland", "Landing Page Builder"]
};

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