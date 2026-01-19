// lib/exceptions.ts
export class ApiError extends Error {
	statusCode?: number;

	constructor(message: string, statusCode: number = 400) {
		super(message);
		this.statusCode = statusCode;
	}
}

export class ForbiddenError extends ApiError {
	constructor(message = "No Permission.") {
		super(message, 403);
	}
}
