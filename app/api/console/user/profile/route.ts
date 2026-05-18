import { NextResponse } from "next/server";
import { authApi } from "@/lib/api-handler";

export const GET = authApi(async (_, { user }) => {
	return NextResponse.json(user);
});
