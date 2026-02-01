import {
	and,
	asc,
	count,
	desc,
	getTableColumns,
	ilike,
	inArray,
	type SQL,
} from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { api } from "@/lib/api-handler";
import { createTaskSchema, taskPaginationSchema } from "@/lib/validations/task";

export const GET = api(async (req: NextRequest) => {
	const { searchParams } = req.nextUrl;
	const rawParams = Object.fromEntries(searchParams.entries());
	const multiValueParams = {
		status: searchParams.getAll("status"),
		priority: searchParams.getAll("priority"),
		category: searchParams.getAll("category"),
	};
	const queryResult = taskPaginationSchema.safeParse({
		...rawParams,
		...multiValueParams,
	});
	if (!queryResult.success) {
		return NextResponse.json(
			{
				message: "Invalid query parameters",
				errors: queryResult.error.flatten(),
			},
			{ status: 400 },
		);
	}

	const {
		pageIndex,
		pageSize,
		searchKey,
		status,
		priority,
		category,
		orderBy,
		order,
	} = queryResult.data;

	const filters = [
		searchKey?.trim() ? ilike(tasks.title, `%${searchKey.trim()}%`) : null,
		status?.length ? inArray(tasks.status, status) : null,
		priority?.length ? inArray(tasks.priority, priority) : null,
		category?.length ? inArray(tasks.category, category) : null,
	].filter((f): f is SQL => !!f);

	const whereClause = and(...filters);
	const columns = getTableColumns(tasks);
	const sortColumn =
		orderBy && orderBy in columns
			? columns[orderBy as keyof typeof columns]
			: tasks.createdAt;

	const sortDirection = order === "asc" ? asc : desc;

	const [data, [{ total }]] = await Promise.all([
		db
			.select()
			.from(tasks)
			.where(whereClause)
			.orderBy(sortDirection(sortColumn))
			.limit(pageSize)
			.offset(pageIndex * pageSize),
		db.select({ total: count() }).from(tasks).where(whereClause),
	]);
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

	// Validate Request Body for creation
	const bodyResult = createTaskSchema.safeParse(body);

	if (!bodyResult.success) {
		return NextResponse.json(
			{ message: "Validation Error", errors: bodyResult.error.flatten() },
			{ status: 400 },
		);
	}

	// Database Insertion with Zod-verified data
	const [newTask] = await db.insert(tasks).values(bodyResult.data).returning();

	return NextResponse.json(newTask, { status: 201 });
});
