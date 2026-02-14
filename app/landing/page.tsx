import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CompanySection from "./_components/company-section";
import HeroSection from "./_components/hero-section";

const FeatureSection = dynamic(() => import("./_components/feature-section"), {
	ssr: true,
});
const ProcessSection = dynamic(() => import("./_components/process-section"), {
	ssr: true,
});
const FeedBackSection = dynamic(
	() => import("./_components/feedback-section"),
	{ ssr: true },
);
const PriceSection = dynamic(() => import("./_components/price-section"), {
	ssr: true,
});
const CTASection = dynamic(() => import("./_components/cta-section"), {
	ssr: true,
});

export const metadata: Metadata = {
	title: "Midaland",
	description: "Landing Page Builder for Revenue Growth.",
	keywords: ["Midaland", "Landing Page Builder"],
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
