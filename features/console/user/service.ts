"use server";

import { asc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { db, schema } from "@/db";
import { visitStats } from "@/db/biz.schema";
import { auth } from "@/features/console/auth/lib/server";
import {
	type UpdateUserInput,
	UpdateUserSchema,
} from "@/features/console/auth/schemas";

export async function getUser() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		return null;
	}

	const [user] = await db
		.select({
			id: schema.user.id,
			name: schema.user.name,
			email: schema.user.email,
			image: schema.user.image,
			role: schema.user.role,
			createdAt: schema.user.createdAt,
			emailVerified: schema.user.emailVerified,
		})
		.from(schema.user)
		.where(eq(schema.user.id, session.user.id))
		.limit(1);

	return user ?? null;
}

export async function updateUser(input: UpdateUserInput) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		return { success: null, error: { reason: "Unauthorized" } };
	}

	const parseResult = UpdateUserSchema.safeParse(input);
	if (!parseResult.success) {
		return { success: null, error: { reason: "Invalid input data" } };
	}

	const { name, image } = parseResult.data;
	const [updatedUser] = await db
		.update(schema.user)
		.set({ name, image })
		.where(eq(schema.user.id, session.user.id))
		.returning();

	if (!updatedUser) {
		return { success: null, error: { reason: "User not found" } };
	}

	return {
		success: { reason: "Profile updated successfully." },
		error: null,
		data: updatedUser,
	};
}

export async function getVisitors() {
	const data = await db
		.select({
			date: visitStats.date,
			desktop: visitStats.desktop,
			mobile: visitStats.mobile,
		})
		.from(visitStats)
		.orderBy(asc(visitStats.date));

	return data;
}
