import { getPricingTiers } from "@/features/landing/services";
import PriceSection from "./inner";

export default async function PriceSectionWrapper() {
	const plans = await getPricingTiers();
	return <PriceSection plans={plans} />;
}
