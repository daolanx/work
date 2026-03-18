import type { Metadata } from "next";
import CompanySection from "./_components/company-section";
import HeroSection from "./_components/hero-section";
import { LandingSectionsClient } from "./_components/landing-sections-client";

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
			<LandingSectionsClient />
		</main>
	);
}
