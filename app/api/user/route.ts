import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({
		success: true,
		data: {
			name: "dax",
			email: "dax@example.com",
			avatar: "/avatars/shadcn.jpg",
		},
	});
}

export async function POST(request: Request) {
	// 1. Simulate network delay
	await sleep(800);

	try {
		// 2. Parse the request body
		const body = await request.json();
		const { name } = body;

		// 3. Mock Business Logic Validation
		// Check if name exists and meets length requirements
		if (!name || name.length < 2) {
			return NextResponse.json(
				{
					success: false,
					error: {
						code: "VALIDATION_ERROR",
						message: "Username must be at least 2 characters long.",
					},
				},
				{ status: 400 },
			);
		}

		// Check for restricted keywords
		if (String(name).toLowerCase().includes("admin")) {
			return NextResponse.json(
				{
					success: false,
					error: {
						code: "FORBIDDEN_NAME",
						message: 'The name contains restricted keywords (e.g., "admin").',
					},
				},
				{ status: 403 },
			);
		}

		// 4. Simulate successful database update
		// In a real app, you would perform a DB query here (e.g., Prisma, Mongoose)
		return NextResponse.json({
			success: true,
			data: {
				id: "user_123456",
				name: "user_123456", // Reflecting the updated name
				email: "dev.user@example.com",
				updatedAt: new Date().toISOString(),
			},
		});
	} catch (err) {
		// 5. Catch-all for unexpected errors (e.g., malformed JSON)
		return NextResponse.json(
			{
				success: false,
				error: {
					code: "INTERNAL_SERVER_ERROR",
					message: "An unexpected error occurred on the server.",
				},
			},
			{ status: 500 },
		);
	}
}

async function sleep(ms: number) {
	await new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
