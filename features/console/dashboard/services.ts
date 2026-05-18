import { startOfMonth, subMonths } from "date-fns";
import { and, countDistinct, gte, lt, sql } from "drizzle-orm";
import { db } from "@/db";
import { session } from "@/db/auth.schema";

/**
 * Query Monthly Active Users (MAU) from session data.
 * Counts distinct users with sessions created in the current and previous months.
 */
export async function queryMAU() {
	const now = new Date();
	const currentStart = startOfMonth(now);
	const prevStart = startOfMonth(subMonths(now, 1));

	const [{ current }] = await db
		.select({ current: countDistinct(session.userId) })
		.from(session)
		.where(gte(session.createdAt, currentStart));

	const [{ previous }] = await db
		.select({ previous: countDistinct(session.userId) })
		.from(session)
		.where(
			and(
				gte(session.createdAt, prevStart),
				lt(session.createdAt, currentStart),
			),
		);

	return { current: current ?? 0, previous: previous ?? 0 };
}

/**
 * Query retention rate based on session activity.
 * Retention = (users active in both months) / (users active in previous month) × 100.
 */
export async function queryRetentionRate() {
	const now = new Date();
	const currentStart = startOfMonth(now);
	const prevStart = startOfMonth(subMonths(now, 1));
	const twoMonthsAgoStart = startOfMonth(subMonths(now, 2));

	const [{ retained }] = await db
		.select({ retained: countDistinct(session.userId) })
		.from(session)
		.where(
			and(
				gte(session.createdAt, prevStart),
				lt(session.createdAt, currentStart),
				sql`${session.userId} IN (
					SELECT DISTINCT s2.user_id FROM session s2
					WHERE s2.created_at >= ${currentStart}
				)`,
			),
		);

	const [{ cohort }] = await db
		.select({ cohort: countDistinct(session.userId) })
		.from(session)
		.where(
			and(
				gte(session.createdAt, prevStart),
				lt(session.createdAt, currentStart),
			),
		);

	const currentRetention = cohort > 0 ? (retained / cohort) * 100 : 0;

	const [{ retained: prevRetained }] = await db
		.select({ retained: countDistinct(session.userId) })
		.from(session)
		.where(
			and(
				gte(session.createdAt, twoMonthsAgoStart),
				lt(session.createdAt, prevStart),
				sql`${session.userId} IN (
					SELECT DISTINCT s2.user_id FROM session s2
					WHERE s2.created_at >= ${prevStart} AND s2.created_at < ${currentStart}
				)`,
			),
		);

	const [{ cohort: prevCohort }] = await db
		.select({ cohort: countDistinct(session.userId) })
		.from(session)
		.where(
			and(
				gte(session.createdAt, twoMonthsAgoStart),
				lt(session.createdAt, prevStart),
			),
		);

	const previousRetention =
		prevCohort > 0 ? (prevRetained / prevCohort) * 100 : 0;

	return { current: currentRetention, previous: previousRetention };
}
