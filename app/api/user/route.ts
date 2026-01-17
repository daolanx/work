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
