import { count, desc, ilike } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { api } from "@/lib/api-handler";

import { createTaskSchema, taskPaginationSchema } from "@/lib/validations/task";

export const GET = api(async (req: NextRequest) => {
	const queryResult = taskPaginationSchema.safeParse(
		Object.fromEntries(req.nextUrl.searchParams),
	);

	if (!queryResult.success) {
		return NextResponse.json(
			{
				message: "Invalid query parameters",
				errors: queryResult.error.flatten(),
			},
			{ status: 400 },
		);
	}

	const { pageIndex, pageSize, searchKey } = queryResult.data;
	const offset = Math.max(0, pageIndex) * pageSize;

	const filter =
		searchKey && searchKey.trim() !== ""
			? ilike(tasks.header, `%${searchKey.trim()}%`)
			: undefined;

	const [data, totalResult] = await Promise.all([
		db
			.select()
			.from(tasks)
			.where(filter)
			.orderBy(desc(tasks.updatedAt))
			.limit(pageSize)
			.offset(offset),
		db.select({ value: count() }).from(tasks).where(filter),
	]);

	const total = totalResult[0]?.value ?? 0;

	return NextResponse.json({
		list: data,
		total,
		pageIndex,
		pageSize,
		totalPage: Math.ceil(total / pageSize),
	});
});

export const POST = api(async (req: NextRequest) => {
	const body = await req.json();

	// 3. Validate Request Body
	const bodyResult = createTaskSchema.safeParse(body);

	if (!bodyResult.success) {
		return NextResponse.json(
			{ message: "Validation Error", errors: bodyResult.error.flatten() },
			{ status: 400 },
		);
	}

	// 4. Database Insertion
	const [newTask] = await db
		.insert(tasks)
		.values(bodyResult.data) // Zod ensures this matches the table structure
		.returning();

	return NextResponse.json(newTask, { status: 201 });
});
