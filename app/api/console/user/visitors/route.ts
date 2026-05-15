import { NextResponse } from "next/server";
import { getVisitors } from "@/features/console/user/service";
import { api } from "@/lib/api-handler";

export const GET = api(async () => {
	const visitors = await getVisitors();
	return NextResponse.json(visitors);
});
