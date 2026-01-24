import { count, ilike } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { api } from "@/lib/api-handler";

export const GET = api(async (req: NextRequest) => {
	const { searchParams } = new URL(req.url);

	const pageIndex = parseInt(searchParams.get("pageIndex") ?? "0", 10);
	const pageSize = parseInt(searchParams.get("pageSize") ?? "10", 10);
	const searchKey = searchParams.get("searchKey") ?? "";

	const offset = pageIndex * pageSize;
	const filter = searchKey ? ilike(tasks.header, `%${searchKey}%`) : undefined;

	const [data, totalResult] = await Promise.all([
		db.select().from(tasks).where(filter).limit(pageSize).offset(offset),
		db.select({ value: count() }).from(tasks).where(filter),
	]);

	const total = totalResult[0].value;

	return NextResponse.json({
		list: data,
		total,
		pageIndex,
		pageSize,
		totalPage: Math.ceil(total / pageSize),
	});
});
