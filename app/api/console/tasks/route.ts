import { and, asc, count, desc, ilike, inArray, type SQL } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { api } from "@/lib/api-handler";
import { createTaskSchema, taskPaginationSchema } from "@/lib/validations/task";

export const GET = api(async (req: NextRequest) => {
	const { searchParams } = req.nextUrl;

	// 1. Extract and normalize parameters
	const rawParams = {
		pageIndex: searchParams.get("pageIndex"),
		pageSize: searchParams.get("pageSize"),
		searchKey: searchParams.get("searchKey"),
		status: searchParams.getAll("status").filter(Boolean),
		priority: searchParams.getAll("priority").filter(Boolean),
		category: searchParams.getAll("category").filter(Boolean),
		sort: searchParams.get("sort"),
	};

	// 2. Validate with Zod
	const queryResult = taskPaginationSchema.safeParse(rawParams);

	if (!queryResult.success) {
		return NextResponse.json(
			{
				message: "Invalid query parameters",
				errors: queryResult.error.flatten(),
			},
			{ status: 400 },
		);
	}

	const { pageIndex, pageSize, searchKey, status, priority, category, sort } =
		queryResult.data;
	const offset = Math.max(0, pageIndex) * pageSize;

	// 3. Construct Dynamic SQL Filters
	const filters: SQL[] = [];

	if (searchKey?.trim()) {
		filters.push(ilike(tasks.title, `%${searchKey.trim()}%`));
	}

	if (status?.length) filters.push(inArray(tasks.status, status));
	if (priority?.length) filters.push(inArray(tasks.priority, priority));
	if (category?.length) filters.push(inArray(tasks.category, category));

	const whereClause = filters.length > 0 ? and(...filters) : undefined;

	// 4. Determine Sort Order
	// Logic: Defaulting to tasks.id ensures the position remains stable after updates
	const [rawField, rawOrder] = (sort || "").split(":");
	const SORT_COLUMNS = {
		id: tasks.id,
		createdAt: tasks.createdAt,
		updatedAt: tasks.updatedAt,
	};

	// Use tasks.id as the fallback column to maintain consistent positioning
	const targetColumn =
		SORT_COLUMNS[rawField as keyof typeof SORT_COLUMNS] || tasks.id;

	// Default to descending (newest IDs at the top) if no order is specified
	const orderFn = rawOrder === "asc" ? asc : desc;

	// 5. Parallel execution for data and total count
	const [data, totalResult] = await Promise.all([
		db
			.select()
			.from(tasks)
			.where(whereClause)
			.orderBy(orderFn(targetColumn))
			.limit(pageSize)
			.offset(offset),
		db.select({ value: count() }).from(tasks).where(whereClause),
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
