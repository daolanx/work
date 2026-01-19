import { NextResponse } from "next/server";
import { api } from "@/app/lib/api-handler";
// import { ApiError } from "@/app/lib/exceptions";

export const GET = api(async () => {
	/**
	 * errorType:1
	 * mock api error
	 * throw new ApiError('some error', 300);
	 */

	return NextResponse.json({ name: "dax" });
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
