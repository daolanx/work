import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { user as userTable } from "@/db/auth.schema";
import { authApi } from "@/lib/api-handler";
import { type UpdateUserInput, UpdateUserSchema } from "@/lib/auth/schemas";

import { ApiError } from "@/lib/exceptions";

/**
 * GET: Retrieve current user information from session
 */
export const GET = authApi(async (_request: Request, { user }) => {
	return NextResponse.json(user);
});

/**
 * PATCH: Update user profile (Name and Image only)
 * Email changes are disabled for security/credential integrity
 */
export const PATCH = authApi(async (request: Request, { user }) => {
	const body = await request.json();
	const parseResult = UpdateUserSchema.safeParse(body);

	if (!parseResult.success) {
		throw new ApiError("Invalid input data", 400);
	}

	const { name, image } = parseResult.data;

	// 3. Prepare update payload
	// We only allow name and image updates in this route
	const updateData: Partial<UpdateUserInput> = {
		name: name,
		image: image,
	};

	// 4. Database Update
	// Execute update where ID matches the current session user
	const [updatedUser] = await db
		.update(userTable)
		.set(updateData)
		.where(eq(userTable.id, user.id))
		.returning();

	if (!updatedUser) {
		throw new ApiError("User not found", 404);
	}

	// 5. Success Response
	return NextResponse.json({
		...updatedUser,
		message: "Profile updated successfully.",
	});
});
