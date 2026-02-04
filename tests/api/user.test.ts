import { headers } from "next/headers";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET, PATCH } from "@/app/api/console/user/route";
import { db } from "@/db";
import { auth } from "@/lib/auth/server";
import { ApiError } from "@/lib/exceptions";

// 1. Partially mock drizzle-orm to keep 'relations' and other utilities
vi.mock("drizzle-orm", async (importOriginal) => {
	const actual = await importOriginal<typeof import("drizzle-orm")>();
	return {
		...actual,
		eq: vi.fn(),
	};
});

// 2. Mock the database instance
vi.mock("@/db", () => ({
	db: {
		update: vi.fn(),
	},
	// Ensure we mock the user table object used in the handler
	user: { id: "id", name: "name", email: "email" },
}));

vi.mock("@/lib/auth/server", () => ({
	auth: {
		api: {
			getSession: vi.fn(),
		},
	},
}));

vi.mock("next/headers", () => ({
	headers: vi.fn(),
}));

describe("User API Route Handlers", () => {
	const mockUser = { id: "user-123", name: "Gemini", email: "gemini@ai.com" };
	const mockSession = { user: mockUser };

	beforeEach(() => {
		vi.clearAllMocks();
		(headers as any).mockResolvedValue(new Headers());
	});

	describe("GET /api/console/user", () => {
		it("should return 200 and user data when authenticated", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);

			const response = await GET();
			const data = await response.json();

			expect(response.status).toBe(200);
			expect(data).toEqual(mockUser);
		});
	});
});
