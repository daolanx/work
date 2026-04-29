import type { Metadata } from "next";
import HeroSection from "./_components/hero-section";
import {
	LazyCompanySection,
	LazyCTASection,
	LazyFeatureSection,
	LazyFeedBackSection,
	LazyPriceSection,
	LazyProcessSection,
} from "./_components/lazy-sections";

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
