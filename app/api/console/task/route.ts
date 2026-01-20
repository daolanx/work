import { count } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/app/db/drizzle";
import { tasks } from "@/app/db/schema";
import { api } from "@/app/lib/api-handler";

export const GET = api(async (req: NextRequest) => {
	const { searchParams } = new URL(req.url);
	const current = Math.max(1, parseInt(searchParams.get("current") ?? "1"));
	const pageSize = Math.max(1, parseInt(searchParams.get("pageSize") ?? "10"));
	const offset = (current - 1) * pageSize;

	const [data, totalResult] = await Promise.all([
		db.select().from(tasks).limit(pageSize).offset(offset),
		db.select({ value: count() }).from(tasks),
	]);

	const total = totalResult[0].value;

	return NextResponse.json({
		list: data,
		total,
		current,
		pageSize,
		totalPage: Math.ceil(total / pageSize),
	});
});
