import { and, eq } from "drizzle-orm"; // Added 'and'
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tasks } from "@/db/biz.schema";
import { authApi } from "@/lib/api-handler"; // Switched to authApi only
import { taskResourceIdSchema, updateTaskSchema } from "@/lib/validations/task";

export const GET = authApi(async (req: NextRequest, { params, user }) => {
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

	// Scoped by taskId AND userId
	const [task] = await db
		.select()
		.from(tasks)
		.where(and(eq(tasks.id, taskId), eq(tasks.userId, user.id)))
		.limit(1);

	if (!task) {
		return NextResponse.json(
			{ message: `Task not found or access denied` },
			{ status: 404 },
		);
	}
	return NextResponse.json(task);
});

export const PATCH = authApi(async (req: NextRequest, { params, user }) => {
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

	// Update only if both IDs match
	const [updatedTask] = await db
		.update(tasks)
		.set(bodyResult.data)
		.where(and(eq(tasks.id, taskId), eq(tasks.userId, user.id)))
		.returning();

	if (!updatedTask) {
		return NextResponse.json(
			{ message: `Task not found or access denied` },
			{ status: 404 },
		);
	}

	return NextResponse.json(updatedTask);
});

export const DELETE = authApi(async (req: NextRequest, { params, user }) => {
	const result = taskResourceIdSchema.safeParse(await params);

	if (!result.success) {
		return NextResponse.json(
			{ message: "Invalid Task ID", errors: result.error.flatten() },
			{ status: 400 },
		);
	}

	const { taskId } = result.data;

	// Delete only if both IDs match
	const [deletedTask] = await db
		.delete(tasks)
		.where(and(eq(tasks.id, taskId), eq(tasks.userId, user.id)))
		.returning();

	if (!deletedTask) {
		return NextResponse.json(
			{ message: `Task not found or access denied` },
			{ status: 404 },
		);
	}

	return NextResponse.json({
		message: "Task deleted successfully",
		deletedTask,
	});
});
