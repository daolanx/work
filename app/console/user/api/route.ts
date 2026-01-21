import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/app/db/drizzle";
import { users } from "@/app/db/schema";
import { api } from "@/app/lib/api-handler";
import { ApiError } from "@/app/lib/exceptions";

const CreateUserSchema = z.object({
	id: z.number(),
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email format"),
});

type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const GET = api(async () => {
	const [user] = await db
		.select()
		.from(users)
		.limit(1);

	if (!user) {
		throw new ApiError("User Query Error", 300);
	}
	return NextResponse.json(user);
});

export const PATCH = api(async (request: Request) => {
	const body = await request.json();

	const result = CreateUserSchema.safeParse(body);

	if (!result.success) {
		// Access 'issues' instead of 'errors'
		const errorDetails = result.error.issues
			.map((issue) => `${issue.path.join(".")}: ${issue.message}`)
			.join(", ");

		throw new ApiError(`Validation Failed: ${errorDetails}`, 400);
	}

	// 3. Destructure validated data
	const { name, email, id } = result.data;

	// 4. Perform database insertion
	const [updatedUser] = await db
		.update(users)
		.set({
			name, // New name from input
			email, // New email from input
			// updatedAt: new Date(), // Recommended if you have this column
		})
		.where(eq(users.id, id))
		.returning();

	if (!updatedUser) {
		throw new ApiError("User not found", 404);
	}

	return NextResponse.json(updatedUser);
});

async function sleep(ms: number) {
	await new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
