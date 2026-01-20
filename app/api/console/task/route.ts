import { NextResponse } from "next/server";
import { db } from "@/app/db/drizzle";
import { tasks } from "@/app/db/schema";
import { api } from "@/app/lib/api-handler";

export const GET = api(async () => {
	const data = await db.select().from(tasks);
	return NextResponse.json(data);
});
