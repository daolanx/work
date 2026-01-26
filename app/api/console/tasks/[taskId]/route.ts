import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema";
import { api } from "@/lib/api-handler";

const paramsSchema = z.object({
	taskId: z.coerce.number().int().positive(),
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
