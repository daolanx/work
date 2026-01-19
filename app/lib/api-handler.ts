// lib/api-handler.ts
import { NextResponse } from "next/server";
import { ApiError } from "./exceptions";

type AsyncHandler = (...args: any[]) => Promise<any>;

function withErrorHandler(handler: AsyncHandler) {
	return async (...args: any[]) => {
		try {
			return await handler(...args);
		} catch (err: any) {
			console.error("[api.error]", err.statusCode || 500, err.message);
			return NextResponse.json({
				success: false,
				message: err.message,
			});
		}
	};
}

export const api = (handler: any) => withErrorHandler(handler);
