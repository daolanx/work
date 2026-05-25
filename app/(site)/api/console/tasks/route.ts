import { NextResponse } from "next/server";
import { listTaskSchema } from "@/features/console/task/schemas";
import { getTasks } from "@/features/console/task/services";
import { authApi } from "@/lib/api-handler";

export const GET = authApi(async (req) => {
	const { searchParams } = req.nextUrl;
	const searchParamsObj = listTaskSchema.parse(
		Object.fromEntries(searchParams),
	);
	const result = await getTasks(searchParamsObj);
	return NextResponse.json(result);
});
