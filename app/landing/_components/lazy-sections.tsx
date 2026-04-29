"use client";

import dynamic from "next/dynamic";

export const LazyCompanySection = dynamic(() => import("./company-section"), {
	ssr: false,
});

export const LazyFeatureSection = dynamic(() => import("./feature-section"), {
	ssr: false,
});

export const LazyProcessSection = dynamic(() => import("./process-section"), {
	ssr: false,
});

export const LazyFeedBackSection = dynamic(() => import("./feedback-section"), {
	ssr: false,
});

export const LazyPriceSection = dynamic(() => import("./price-section"), {
	ssr: false,
});

export const LazyCTASection = dynamic(() => import("./cta-section"), {
	ssr: false,
});
