import { NextResponse } from "next/server";
import { getUser } from "@/features/console/user/service";
import { authApi } from "@/lib/api-handler";

export const GET = authApi(async () => {
	const user = await getUser();
	return NextResponse.json(user);
});
