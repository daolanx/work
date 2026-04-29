"use client";

import dynamic from "next/dynamic";

export const LazyCompanySection = dynamic(() => import("./company-section"));

export const LazyFeatureSection = dynamic(() => import("./feature-section"));

export const LazyProcessSection = dynamic(() => import("./process-section"));

export const LazyFeedBackSection = dynamic(() => import("./feedback-section"));

export const LazyPriceSection = dynamic(() => import("./price-section"));

export const LazyCTASection = dynamic(() => import("./cta-section"));
