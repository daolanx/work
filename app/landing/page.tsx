import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/features/landing/components/hero-section";

const LazyCompanySection = dynamic(
	() => import("@/features/landing/components/company-section"),
);
const LazyFeatureSection = dynamic(
	() => import("@/features/landing/components/feature-section"),
);
const LazyProcessSection = dynamic(
	() => import("@/features/landing/components/process-section"),
);
const LazyFeedBackSection = dynamic(
	() => import("@/features/landing/components/feedback-section"),
);
const LazyPriceSection = dynamic(
	() => import("@/features/landing/components/price-section"),
);
const LazyCTASection = dynamic(
	() => import("@/features/landing/components/cta-section"),
);

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
