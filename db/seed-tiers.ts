import "dotenv/config";

import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is missing");
}

const sql = neon(process.env.DATABASE_URL);

const tiersData = [
	{
		type: "free",
		variantId: "prod_32Z37XlRXMWJhOEP0Dl0eB",
		priceMonthly: 0,
		priceAnnually: 0,
	},
	{
		type: "pro",
		variantId: "prod_5nkYrUTcacVsoVAiYmNU3x",
		priceMonthly: 9,
		priceAnnually: 95,
	},
	{
		type: "business",
		variantId: "prod_business_789",
		priceMonthly: 49,
		priceAnnually: 516,
	},
];

async function seedTiers() {
	await sql`DELETE FROM payload.tiers`;
	console.log("Cleared existing tiers.");

	for (let i = 0; i < tiersData.length; i++) {
		const tier = tiersData[i];
		const order = String(i + 1).padStart(5, "0");

		await sql`
			INSERT INTO payload.tiers (_order, variant_id, price_monthly, price_annually, type)
			VALUES (${order}, ${tier.variantId}, ${tier.priceMonthly}, ${tier.priceAnnually}, ${tier.type})
		`;

		console.log(`  ✓ ${tier.type}`);
	}

	console.log(`\nSeeded ${tiersData.length} tiers.`);
}

seedTiers()
	.then(() => process.exit(0))
	.catch((e) => {
		console.error("Seed failed:", e);
		process.exit(1);
	});
