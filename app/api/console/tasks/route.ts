import { NextResponse } from "next/server";
import { getTasks } from "@/features/console/task/service";
import { authApi } from "@/lib/api-handler";

export const GET = authApi(async (req) => {
	const params = Object.fromEntries(new URL(req.url).searchParams);
	const result = await getTasks(params);
	return NextResponse.json(result);
});
