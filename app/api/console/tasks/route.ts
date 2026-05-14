import { type NextRequest, NextResponse } from "next/server";
import { createTask, getTasks } from "@/features/console/task/service";
import { authApi } from "@/lib/api-handler";
import { ValidationError } from "@/lib/errors";

export const GET = authApi(async (req: NextRequest, { user }) => {
	try {
		const result = await getTasks(
			user.id,
			Object.fromEntries(req.nextUrl.searchParams.entries()),
		);
		return NextResponse.json(result);
	} catch (e) {
		if (e instanceof ValidationError) {
			return NextResponse.json(
				{ message: "Invalid query parameters", errors: e.message },
				{ status: 400 },
			);
		}
		throw e;
	}
});

export const POST = authApi(async (req: NextRequest, { user }) => {
	try {
		const newTask = await createTask(user.id, await req.json());
		return NextResponse.json(newTask, { status: 201 });
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
