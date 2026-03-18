"use client";

import dynamic from "next/dynamic";

const FeatureSection = dynamic(() => import("./feature-section"), { ssr: false });
const ProcessSection = dynamic(() => import("./process-section"), { ssr: false });
const FeedBackSection = dynamic(() => import("./feedback-section"), {
	ssr: false,
});
const PriceSection = dynamic(() => import("./price-section"), { ssr: false });
const CTASection = dynamic(() => import("./cta-section"), { ssr: false });

export function LandingSectionsClient() {
	return (
		<>
			<FeatureSection />
			<ProcessSection />
			<FeedBackSection />
			<PriceSection />
			<CTASection />
		</>
	);
}
