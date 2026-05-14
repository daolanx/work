import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { and, count, countDistinct, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { creem_subscription, user } from "@/db/auth.schema";

/** Product ID → monthly price in cents */
const PRODUCT_PRICES: Record<string, number> = {
	prod_32Z37XlRXMWJhOEP0Dl0eB: 0,
	prod_5nkYrUTcacVsoVAiYmNU3x: 1200,
	creem_studio_456: 3900,
};

/**
 * Query Monthly Recurring Revenue (MRR) from active subscriptions.
 * Sums product prices for subscriptions overlapping the target month.
 */
export async function queryMRR() {
	const now = new Date();
	const currentStart = startOfMonth(now);
	const currentEnd = endOfMonth(now);
	const prevStart = startOfMonth(subMonths(now, 1));
	const prevEnd = endOfMonth(subMonths(now, 1));

	const currentSubs = await db
		.select({ productId: creem_subscription.productId })
		.from(creem_subscription)
		.where(
			and(
				eq(creem_subscription.status, "active"),
				sql`${creem_subscription.periodStart} <= ${currentEnd}`,
				sql`(${creem_subscription.periodEnd} IS NULL OR ${creem_subscription.periodEnd} >= ${currentStart})`,
			),
		);

	const previousSubs = await db
		.select({ productId: creem_subscription.productId })
		.from(creem_subscription)
		.where(
			and(
				eq(creem_subscription.status, "active"),
				sql`${creem_subscription.periodStart} <= ${prevEnd}`,
				sql`(${creem_subscription.periodEnd} IS NULL OR ${creem_subscription.periodEnd} >= ${prevStart})`,
			),
		);

	const currentMRR =
		currentSubs.reduce(
			(sum, sub) => sum + (PRODUCT_PRICES[sub.productId] ?? 0),
			0,
		) / 100;
	const previousMRR =
		previousSubs.reduce(
			(sum, sub) => sum + (PRODUCT_PRICES[sub.productId] ?? 0),
			0,
		) / 100;

	return { current: currentMRR, previous: previousMRR };
}

/**
 * Query conversion rate: active subscribers / total users × 100.
 */
export async function queryConversionRate() {
	const now = new Date();
	const currentStart = startOfMonth(now);

	const [{ subscribed }] = await db
		.select({ subscribed: countDistinct(creem_subscription.referenceId) })
		.from(creem_subscription)
		.where(eq(creem_subscription.status, "active"));

	const [{ total }] = await db.select({ total: count() }).from(user);

	const current = total > 0 ? (subscribed / total) * 100 : 0;

	const [{ prevSubscribed }] = await db
		.select({ prevSubscribed: countDistinct(creem_subscription.referenceId) })
		.from(creem_subscription)
		.where(
			and(
				eq(creem_subscription.status, "active"),
				sql`${creem_subscription.periodStart} < ${currentStart}`,
			),
		);

	const previous = total > 0 ? (prevSubscribed / total) * 100 : 0;

	return { current, previous };
}
