import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { api } from "@/lib/api-handler";
import { taskResourceIdSchema, updateTaskSchema } from "@/lib/validations/task";

export const GET = api(async (req: NextRequest, { params }) => {
	const result = taskResourceIdSchema.safeParse(await params);
	if (!result.success) {
		return NextResponse.json(
			{
				message: "Validation Error",
				errors: result.error.issues.map((issue) => ({
					field: issue.path.join("."),
					message: issue.message,
				})),
			},
			{ status: 400 },
		);
	}

	const { taskId } = result.data;
	const [task] = await db
		.select()
		.from(tasks)
		.where(eq(tasks.id, taskId))
		.limit(1);

	if (!task) {
		return NextResponse.json(
			{ message: `Task with id ${taskId} not found` },
			{ status: 404 },
		);
	}
	return NextResponse.json(task);
});

export const PATCH = api(async (req: NextRequest, { params }) => {
	const paramResult = taskResourceIdSchema.safeParse(await params);
	if (!paramResult.success) {
		return NextResponse.json(
			{ message: "Invalid Task ID", errors: paramResult.error.flatten() },
			{ status: 400 },
		);
	}
	const { taskId } = paramResult.data;
	const body = await req.json();
	const bodyResult = updateTaskSchema.safeParse(body);
	if (!bodyResult.success) {
		return NextResponse.json(
			{ message: "Validation Error", errors: bodyResult.error.flatten() },
			{ status: 400 },
		);
	}
	const [updatedTask] = await db
		.update(tasks)
		.set(bodyResult.data)
		.where(eq(tasks.id, taskId))
		.returning();

	// 4. Handle Not Found
	if (!updatedTask) {
		return NextResponse.json(
			{ message: `Task with id ${taskId} not found` },
			{ status: 404 },
		);
	}

	return NextResponse.json(updatedTask);
});

export const DELETE = api(async (req: NextRequest, { params }) => {
	const result = taskResourceIdSchema.safeParse(await params);

	if (!result.success) {
		return NextResponse.json(
			{
				message: "Invalid Task ID",
				errors: result.error.flatten(),
			},
			{ status: 400 },
		);
	}

	const { taskId } = result.data;

	const [deletedTask] = await db
		.delete(tasks)
		.where(eq(tasks.id, taskId))
		.returning();

	if (!deletedTask) {
		return NextResponse.json(
			{ message: `Task with id ${taskId} not found` },
			{ status: 404 },
		);
	}

	return NextResponse.json({
		message: "Task deleted successfully",
		deletedTask,
	});
});
