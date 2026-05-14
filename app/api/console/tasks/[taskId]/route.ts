import { type NextRequest, NextResponse } from "next/server";
import {
	deleteTask,
	getTask,
	updateTask,
} from "@/features/console/task/service";
import { authApi } from "@/lib/api-handler";
import { ValidationError } from "@/lib/errors";

export const GET = authApi(async (_req: NextRequest, { params, user }) => {
	try {
		const { taskId } = await params;
		const task = await getTask(user.id, { taskId });
		if (!task) {
			return NextResponse.json(
				{ message: "Task not found or access denied" },
				{ status: 404 },
			);
		}
		return NextResponse.json(task);
	} catch (e) {
		if (e instanceof ValidationError) {
			return NextResponse.json(
				{ message: "Validation Error", errors: e.message },
				{ status: 400 },
			);
		}
		throw e;
	}
});

export const PATCH = authApi(async (req: NextRequest, { params, user }) => {
	try {
		const { taskId } = await params;
		const updatedTask = await updateTask(user.id, { taskId }, await req.json());
		if (!updatedTask) {
			return NextResponse.json(
				{ message: "Task not found or access denied" },
				{ status: 404 },
			);
		}
		return NextResponse.json(updatedTask);
	} catch (e) {
		if (e instanceof ValidationError) {
			return NextResponse.json(
				{ message: "Validation Error", errors: e.message },
				{ status: 400 },
			);
		}
		throw e;
	}
});

export const DELETE = authApi(async (_req: NextRequest, { params, user }) => {
	try {
		const { taskId } = await params;
		const deletedTask = await deleteTask(user.id, { taskId });
		if (!deletedTask) {
			return NextResponse.json(
				{ message: "Task not found or access denied" },
				{ status: 404 },
			);
		}
		return NextResponse.json({
			message: "Task deleted successfully",
			deletedTask,
		});
	} catch (e) {
		if (e instanceof ValidationError) {
			return NextResponse.json(
				{ message: "Validation Error", errors: e.message },
				{ status: 400 },
			);
		}
		throw e;
	}
});
