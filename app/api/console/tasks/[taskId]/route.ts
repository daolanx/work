import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { api } from "@/lib/api-handler";

const paramsSchema = z.object({
	taskId: z.coerce.number().int().positive(),
});

const statusEnum = z.enum(["Done", "In Process", "To Do", "Canceled"]);

const updateTaskSchema = z.object({
	header: z.string().min(2).optional(),
	reviewer: z.string().min(2).optional(),
	type: z.string().min(1).optional(),
	status: statusEnum.optional(),
	target: z.number().min(0).optional(),
	limit: z.number().min(0).optional(),
});

export const GET = api(
	async (
		req: NextRequest,
		{ params }: { params: Promise<{ taskId: string }> },
	) => {
		const result = paramsSchema.safeParse(await params);

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
	},
);

export const PATCH = api(
	async (
		req: NextRequest,
		{ params }: { params: Promise<{ taskId: string }> },
	) => {
		const paramResult = paramsSchema.safeParse(await params);
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
	},
);
