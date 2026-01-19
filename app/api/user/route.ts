import { NextResponse } from "next/server";
import { api } from "@/app/lib/api-handler";
// import { ApiError } from "@/app/lib/exceptions";

export const GET = api(async () => {
	/**
	 * errorType:1
	 * mock api error
	 * throw new ApiError('some error', 300);
	 */

	/**
	 * errorType:2
	 * mock route buiness error
	 *
	 * return NextResponse.json({
	 *	success: false,
	 *		message: '1123',
	 *		data: { name: "dax" },
	 *	});
	 *
	 * return NextResponse.json({
	 *	success: false,
	 *  error: { code: 'VALID_ERROR', message: 'valid error'}
	 *	});
	 */

	return NextResponse.json({
		success: true,
		data: { name: "dax" },
	});
});

export const POST = api(async (request: Request) => {
	await sleep(800);

	return NextResponse.json({
		success: true,
		data: {
			id: "user_123456",
			name: "user_123456", // Reflecting the updated name
			email: "dev.user@example.com",
			updatedAt: new Date().toISOString(),
		},
	});
});

async function sleep(ms: number) {
	await new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
