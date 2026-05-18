import { NextResponse } from "next/server";
import { getTask } from "@/features/console/task/services";
import { authApi } from "@/lib/api-handler";

export const GET = authApi(async (_req, { params }) => {
	const task = await getTask(params);
	return NextResponse.json(task);
});
