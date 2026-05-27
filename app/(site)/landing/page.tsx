import type { Metadata } from "next";

export const revalidate = 3600;

import dynamic from "next/dynamic";
import { Suspense } from "react";
import HeroSection from "@/features/landing/components/hero-section";
import PriceSection from "@/features/landing/components/price-section";
import PriceSectionSkeleton from "@/features/landing/components/price-section/skeleton";

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
const LazyCTASection = dynamic(
	() => import("@/features/landing/components/cta-section"),
);

export const metadata: Metadata = {
	title: "Midaland",
	description: "Landing Page Builder for Revenue Growth.",
	keywords: ["Midaland", "Landing Page Builder"],
};

export default async function LandingPage() {
	return (
		<main className="section-max-width-wrapper">
			<HeroSection />
			<LazyCompanySection />
			<LazyFeatureSection />
			<LazyProcessSection />
			<LazyFeedBackSection />
			<Suspense fallback={<PriceSectionSkeleton />}>
				<PriceSection />
			</Suspense>
			<LazyCTASection />
		</main>
	);
}
