import { NextResponse } from "next/server";
import { getTasks } from "@/features/console/task/services";
import { authApi } from "@/lib/api-handler";

export const GET = authApi(async (req, { user }) => {
	const searchParams = Object.fromEntries(req.nextUrl.searchParams);
	const result = await getTasks(user.id, searchParams);
	return NextResponse.json(result);
});
