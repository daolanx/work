import type { Metadata } from "next";

import AboutSection from "@/features/flower-shop/components/about-section";
import BenefitsSection from "@/features/flower-shop/components/benefits-section";
import ContactSection from "@/features/flower-shop/components/contact-section";
import Footer from "@/features/flower-shop/components/footer";
import HeroSection from "@/features/flower-shop/components/hero-section";
import Navbar from "@/features/flower-shop/components/navbar";
import ReviewsSection from "@/features/flower-shop/components/reviews-section";
import ServiceSection from "@/features/flower-shop/components/service-section";
import Service2Section from "@/features/flower-shop/components/service2-section";
import "@/features/flower-shop/styles/globals.css";

export const metadata: Metadata = {
	title: "Kyiv LuxeBouquets — Fresh Flowers Delivery in Kyiv",
	description:
		"Discover uniquely crafted bouquets and gifts for any occasion. Order online for fresh flower delivery, plants, and aroma candles in Kyiv.",
	keywords: [
		"fresh flowers Kyiv",
		"flower delivery",
		"online flower shop",
		"bouquet delivery",
		"wedding flowers",
		"flower subscription",
	],
	openGraph: {
		title: "Kyiv LuxeBouquets — Fresh Flowers Delivery in Kyiv",
		description:
			"Discover uniquely crafted bouquets and gifts for any occasion. Order online for fresh flower delivery, plants, and aroma candles in Kyiv.",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function FlowerShopPage() {
	return (
		<main>
			<Navbar />
			<HeroSection />
			<AboutSection />
			<BenefitsSection />
			<ContactSection />
			<ServiceSection />
			<Service2Section />
			<ReviewsSection />
			<Footer />
		</main>
	);
}
