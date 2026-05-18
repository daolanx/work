"use server";

import {
	and,
	asc,
	count,
	desc,
	eq,
	ilike,
	inArray,
	type SQL,
} from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { tasks } from "@/db/biz.schema";
import { NotFoundError } from "@/lib/errors";
import { getUserId } from "@/lib/session";
import { validate } from "@/lib/utils";
import {
	type CreateTask,
	createTaskSchema,
	type ListTasks,
	listTaskSchema,
	type TaskId,
	taskIdSchema,
	type UpdateTask,
	updateTaskSchema,
} from "./schemas";

const TASK_LIST_VALIDATE_PATH = "/console/tasks";

export async function getTasks(params: ListTasks) {
	const userId = await getUserId();
	const {
		pageIndex,
		pageSize,
		searchKey,
		status,
		priority,
		category,
		orderBy,
		order,
	} = validate(listTaskSchema, params);

	const sortColumns = {
		createdAt: tasks.createdAt,
		updatedAt: tasks.updatedAt,
		title: tasks.title,
		priority: tasks.priority,
		status: tasks.status,
	} as const;

	const filters = [
		eq(tasks.userId, userId),
		searchKey?.trim() ? ilike(tasks.title, `%${searchKey.trim()}%`) : null,
		status?.length ? inArray(tasks.status, status) : null,
		priority?.length ? inArray(tasks.priority, priority) : null,
		category?.length ? inArray(tasks.category, category) : null,
	].filter((f): f is SQL => !!f);

	const whereClause = and(...filters);
	const sortColumn = orderBy ? sortColumns[orderBy] : tasks.createdAt;
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

export async function getTask(taskId: TaskId) {
	const userId = await getUserId();
	const id = validate(taskIdSchema, taskId);
	const [task] = await db
		.select()
		.from(tasks)
		.where(and(eq(tasks.id, id), eq(tasks.userId, userId)));
	return task ?? null;
}

export async function createTask(params: CreateTask) {
	const userId = await getUserId();
	const data = validate(createTaskSchema, params);
	const [newTask] = await db
		.insert(tasks)
		.values({ ...data, userId })
		.returning();
	revalidatePath(TASK_LIST_VALIDATE_PATH);
	return newTask;
}

export async function updateTask(taskId: string, update: UpdateTask) {
	const userId = await getUserId();
	const id = validate(taskIdSchema, taskId);
	const data = validate(updateTaskSchema, update);
	const [updatedTask] = await db
		.update(tasks)
		.set(data)
		.where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
		.returning();
	if (!updatedTask) throw new NotFoundError("Task not found");
	revalidatePath(TASK_LIST_VALIDATE_PATH);
	return updatedTask;
}

export async function deleteTask(taskId: TaskId) {
	const userId = await getUserId();
	const id = validate(taskIdSchema, taskId);
	const [deletedTask] = await db
		.delete(tasks)
		.where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
		.returning();
	if (!deletedTask) throw new NotFoundError("Task not found");
	revalidatePath(TASK_LIST_VALIDATE_PATH);
	return deletedTask;
}
