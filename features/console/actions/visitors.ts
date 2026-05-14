"use server";

import { asc } from "drizzle-orm";
import { db } from "@/db";
import { visitStats } from "@/db/biz.schema";

export async function getVisitors() {
	const data = await db
		.select({
			date: visitStats.date,
			desktop: visitStats.desktop,
			mobile: visitStats.mobile,
		})
		.from(visitStats)
		.orderBy(asc(visitStats.date));

	return data;
}
