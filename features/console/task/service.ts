"use server";

import {
	and,
	asc,
	count,
	desc,
	eq,
	getTableColumns,
	ilike,
	inArray,
	type SQL,
} from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { tasks } from "@/db/biz.schema";
import {
	createTaskSchema,
	taskPaginationSchema,
	taskResourceIdSchema,
	updateTaskSchema,
} from "@/features/console/task/schemas";

import { ValidationError } from "@/lib/errors";

function validate<T>(
	schema: {
		safeParse: (
			v: unknown,
		) =>
			| { success: false; error: { message: string } }
			| { success: true; data: T };
	},
	data: unknown,
): T {
	const result = schema.safeParse(data);
	if (!result.success) throw new ValidationError(result.error.message);
	return result.data;
}

export async function getTasks(userId: string, rawParams: unknown) {
	const {
		pageIndex,
		pageSize,
		searchKey,
		status,
		priority,
		category,
		orderBy,
		order,
	} = validate(taskPaginationSchema, rawParams);

	const filters = [
		eq(tasks.userId, userId),
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

	return {
		list: data,
		total,
		pageIndex,
		pageSize,
		totalPage: Math.ceil(total / pageSize),
	};
}

export async function getTask(userId: string, rawParams: unknown) {
	const { taskId } = validate(taskResourceIdSchema, rawParams);
	const [task] = await db
		.select()
		.from(tasks)
		.where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
		.limit(1);
	return task ?? null;
}

export async function createTask(userId: string, input: unknown) {
	const data = validate(createTaskSchema, input);
	const [newTask] = await db
		.insert(tasks)
		.values({ ...data, userId })
		.returning();
	revalidatePath("/console/tasks");
	return newTask;
}

export async function updateTask(
	userId: string,
	rawParams: unknown,
	body: unknown,
) {
	const { taskId } = validate(taskResourceIdSchema, rawParams);
	const data = validate(updateTaskSchema, body);
	const [updatedTask] = await db
		.update(tasks)
		.set(data)
		.where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
		.returning();
	if (updatedTask) revalidatePath("/console/tasks");
	return updatedTask ?? null;
}

export async function deleteTask(userId: string, rawParams: unknown) {
	const { taskId } = validate(taskResourceIdSchema, rawParams);
	const [deletedTask] = await db
		.delete(tasks)
		.where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
		.returning();
	if (deletedTask) revalidatePath("/console/tasks");
	return deletedTask ?? null;
}
