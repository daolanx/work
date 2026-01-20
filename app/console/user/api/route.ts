import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/app/db/drizzle";
import { users } from "@/app/db/schema";
import { api } from "@/app/lib/api-handler";
import { ApiError } from "@/app/lib/exceptions";

export const GET = api(async () => {
	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.name, "Dax"))
		.limit(1);

	if (!user) {
		throw new ApiError("User Query Error", 300);
	}
	return NextResponse.json(user);
});

export const POST = api(async (request: Request) => {
	await sleep(800);

	return NextResponse.json({
		id: "user_123456",
		name: "user_123456", // Reflecting the updated name
		email: "dev.user@example.com",
		updatedAt: new Date().toISOString(),
	});
});

async function sleep(ms: number) {
	await new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
