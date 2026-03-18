import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { visitStats } from "@/db/biz.schema";
import { api } from "@/lib/api-handler";

export const GET = api(async () => {
	const data = await db
		.select({
			date: visitStats.date,
			desktop: visitStats.desktop,
			mobile: visitStats.mobile,
		})
		.from(visitStats)
		.orderBy(asc(visitStats.date));

	return NextResponse.json(data);
});
