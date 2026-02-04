import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { user } from "@/db/auth.schema";
import { api } from "@/lib/api-handler";
import { UpdateUserSchema } from "@/lib/auth/schemas";
import { auth } from "@/lib/auth/server";
import { ApiError } from "@/lib/exceptions";

export const GET = api(async () => {
	// 1. Fetch the current session using request headers
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	// 2. Check if user is authenticated
	if (!session) {
		throw new ApiError("Unauthorized", 401);
	}

	// 3. Return the user data from the session
	return NextResponse.json(session.user);
});

export const PATCH = api(async (request: Request) => {
	// 1. Authenticate the user
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		throw new ApiError("Unauthorized", 401);
	}

	const body = await request.json();
	const result = UpdateUserSchema.safeParse(body);

	if (!result.success) {
		const errorDetails = result.error.issues
			.map((issue) => `${issue.path.join(".")}: ${issue.message}`)
			.join(", ");
		throw new ApiError(`Validation Failed: ${errorDetails}`, 400);
	}

	const { name, email } = result.data;

	// 2. Update the user in the database using the ID from the session
	// Better-Auth uses string IDs (UUIDs) by default for social login
	const [updatedUser] = await db
		.update(user)
		.set({
			name: name ?? undefined,
			email: email ?? undefined,
		})
		.where(eq(user.id, session.user.id))
		.returning();

	if (!updatedUser) {
		throw new ApiError("User not found in business database", 404);
	}

	return NextResponse.json(updatedUser);
});
