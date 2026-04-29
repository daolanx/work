import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "./_components/hero-section";

const LazyCompanySection = dynamic(
	() => import("./_components/company-section"),
);
const LazyFeatureSection = dynamic(
	() => import("./_components/feature-section"),
);
const LazyProcessSection = dynamic(
	() => import("./_components/process-section"),
);
const LazyFeedBackSection = dynamic(
	() => import("./_components/feedback-section"),
);
const LazyPriceSection = dynamic(() => import("./_components/price-section"));
const LazyCTASection = dynamic(() => import("./_components/cta-section"));

export const metadata: Metadata = {
	title: "Midaland",
	description: "Landing Page Builder for Revenue Growth.",
	keywords: ["Midaland", "Landing Page Builder"],
};

export default function LandingPage() {
	return (
		<main className="section-max-width-wrapper">
			<HeroSection />
			<LazyCompanySection />
			<LazyFeatureSection />
			<LazyProcessSection />
			<LazyFeedBackSection />
			<LazyPriceSection />
			<LazyCTASection />
		</main>
	);
}
