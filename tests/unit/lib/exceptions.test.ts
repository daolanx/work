import { describe, expect, it } from "vitest";
import { ApiError, ForbiddenError } from "@/lib/exceptions";

describe("lib/exceptions", () => {
	describe("ApiError", () => {
		it("creates error with message and default status 400", () => {
			const err = new ApiError("Bad request");
			expect(err).toBeInstanceOf(Error);
			expect(err).toBeInstanceOf(ApiError);
			expect(err.message).toBe("Bad request");
			expect(err.statusCode).toBe(400);
		});

		it("creates error with custom status code", () => {
			const err = new ApiError("Not found", 404);
			expect(err.message).toBe("Not found");
			expect(err.statusCode).toBe(404);
		});
	});

	describe("ForbiddenError", () => {
		it("extends ApiError with default message and status 403", () => {
			const err = new ForbiddenError();
			expect(err).toBeInstanceOf(ApiError);
			expect(err).toBeInstanceOf(ForbiddenError);
			expect(err.message).toBe("No Permission.");
			expect(err.statusCode).toBe(403);
		});

		it("accepts custom message", () => {
			const err = new ForbiddenError("Access denied");
			expect(err.message).toBe("Access denied");
			expect(err.statusCode).toBe(403);
		});
	});
});
