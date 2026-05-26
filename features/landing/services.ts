import config from "@payload-config";
import { getPayload } from "payload";

export type PricingTier = {
	variantId: string;
	priceMonthly: number;
	priceAnnually: number;
	type: string;
};

export async function getPricingTiers(): Promise<PricingTier[]> {
	const payload = await getPayload({ config });
	const result = await payload.find({
		collection: "tiers",
		sort: "_order",
		depth: 0,
	});

	return result.docs.map((doc) => ({
		variantId: doc.variantId,
		priceMonthly: doc.priceMonthly,
		priceAnnually: doc.priceAnnually,
		type: doc.type,
	}));
}
