import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { creem_subscription, session, user } from "./auth.schema";
import { db } from "./index";

/**
 * Seed realistic dashboard data for demo purposes.
 * Inserts mock users, sessions, and subscriptions to populate the summary cards.
 * Safe to re-run — uses onConflictDoNothing to avoid duplicates.
 */
async function seedDashboard() {
	console.log("Seeding dashboard data...");

	const now = new Date();
	const currentMonthStart = startOfMonth(now);
	const currentMonthEnd = endOfMonth(now);
	const prevMonthStart = startOfMonth(subMonths(now, 1));
	const twoMonthsAgoStart = startOfMonth(subMonths(now, 2));

	// --- 1. Insert mock users ---
	const users = Array.from({ length: 20 }, (_, i) => ({
		id: `user_${String(i + 1).padStart(3, "0")}`,
		name: `User ${i + 1}`,
		email: `user${i + 1}@demo.com`,
	}));

	for (const u of users) {
		await db.insert(user).values(u).onConflictDoNothing();
	}
	console.log(`  ✓ ${users.length} users`);

	// --- 2. Insert mock sessions (distributed across 3 months) ---
	// Ensures every user has at least one session in each month for better MAU/retention
	const sessions: {
		id: string;
		userId: string;
		createdAt: Date;
		expiresAt: Date;
		token: string;
	}[] = [];

	let sessionIdx = 0;
	for (const u of users) {
		// Guarantee at least 1 session per month per user
		const monthRanges = [
			{ start: twoMonthsAgoStart, end: prevMonthStart },
			{ start: prevMonthStart, end: currentMonthStart },
			{ start: currentMonthStart, end: currentMonthEnd },
		];

		for (const range of monthRanges) {
			const dayOffset = Math.floor(Math.random() * 28);
			const createdAt = new Date(
				range.start.getFullYear(),
				range.start.getMonth(),
				dayOffset + 1,
				Math.floor(Math.random() * 24),
				Math.floor(Math.random() * 60),
			);
			const expiresAt = new Date(
				createdAt.getTime() + 30 * 24 * 60 * 60 * 1000,
			);

			sessions.push({
				id: `sess_${String(sessionIdx++).padStart(4, "0")}`,
				userId: u.id,
				createdAt,
				expiresAt,
				token: `token_${u.id}_${Date.now()}_${sessionIdx}`,
			});
		}

		// Add 1-3 extra sessions in the current month for growth effect
		const extras = 1 + Math.floor(Math.random() * 3);
		for (let j = 0; j < extras; j++) {
			const dayOffset = Math.floor(Math.random() * 28);
			const createdAt = new Date(
				currentMonthStart.getFullYear(),
				currentMonthStart.getMonth(),
				dayOffset + 1,
				Math.floor(Math.random() * 24),
				Math.floor(Math.random() * 60),
			);
			const expiresAt = new Date(
				createdAt.getTime() + 30 * 24 * 60 * 60 * 1000,
			);

			sessions.push({
				id: `sess_${String(sessionIdx++).padStart(4, "0")}`,
				userId: u.id,
				createdAt,
				expiresAt,
				token: `token_${u.id}_${Date.now()}_${sessionIdx}`,
			});
		}
	}

	for (const s of sessions) {
		await db.insert(session).values(s).onConflictDoNothing();
	}
	console.log(`  ✓ ${sessions.length} sessions`);

	// --- 3. Insert mock subscriptions ---
	const products = [
		{ id: "prod_5nkYrUTcacVsoVAiYmNU3x", weight: 0.6 }, // Pro 60%
		{ id: "creem_studio_456", weight: 0.2 }, // Studio 20%
		{ id: "prod_32Z37XlRXMWJhOEP0Dl0eB", weight: 0.2 }, // Hobby 20%
	];

	const pickProduct = () => {
		const roll = Math.random();
		let cumulative = 0;
		for (const p of products) {
			cumulative += p.weight;
			if (roll <= cumulative) return p.id;
		}
		return products[0].id;
	};

	const subscriptions: {
		id: string;
		productId: string;
		referenceId: string;
		status: string;
		periodStart: Date;
		periodEnd: Date;
	}[] = [];

	// ~40% started last month (continuing subscribers — appear in both months)
	const continuing = users.slice(0, Math.ceil(users.length * 0.4));
	for (const u of continuing) {
		subscriptions.push({
			id: `sub_${u.id}`,
			productId: pickProduct(),
			referenceId: u.id,
			status: "active",
			periodStart: prevMonthStart,
			periodEnd: currentMonthEnd,
		});
	}

	// ~30% started this month (new subscribers — only in current month)
	const newSubs = users.slice(
		continuing.length,
		continuing.length + Math.ceil(users.length * 0.3),
	);
	for (const u of newSubs) {
		subscriptions.push({
			id: `sub_${u.id}`,
			productId: pickProduct(),
			referenceId: u.id,
			status: "active",
			periodStart: currentMonthStart,
			periodEnd: currentMonthEnd,
		});
	}

	for (const s of subscriptions) {
		await db.insert(creem_subscription).values(s).onConflictDoNothing();
	}
	console.log(
		`  ✓ ${subscriptions.length} subscriptions (${continuing.length} continuing + ${newSubs.length} new)`,
	);

	console.log("Dashboard seeding complete!");
}

// Run if executed directly
seedDashboard()
	.then(() => process.exit(0))
	.catch((e) => {
		console.error("Seed failed:", e);
		process.exit(1);
	});
