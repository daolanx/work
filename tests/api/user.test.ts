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

		it("should return 401 when not authenticated", async () => {
			(auth.api.getSession as any).mockResolvedValue(null);

			const response = await GET();
			const data = await response.json();

			expect(response.status).toBe(401);
			expect(data.success).toBe(false);
			expect(data.message).toContain("Unauthorized");
		});
	});

	describe("PATCH /api/console/user", () => {
		it("should return 200 and updated user when input is valid", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);
			const updated = {
				...mockUser,
				name: "Updated Name",
				image: "https://example.com/avatar.png",
			};
			(db.update as any).mockReturnValue({
				set: vi.fn().mockReturnThis(),
				where: vi.fn().mockReturnThis(),
				returning: vi.fn().mockResolvedValue([updated]),
			});

			const response = await PATCH(
				new Request("http://localhost/api/console/user", {
					method: "PATCH",
					body: JSON.stringify({
						id: mockUser.id,
						name: "Updated Name",
						image: "https://example.com/avatar.png",
					}),
				}),
			);
			const data = await response.json();

			expect(response.status).toBe(200);
			expect(data.name).toBe("Updated Name");
			expect(data.image).toBe("https://example.com/avatar.png");
			expect(data.message).toBe("Profile updated successfully.");
		});

		it("should return 400 when body is invalid", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);

			const response = await PATCH(
				new Request("http://localhost/api/console/user", {
					method: "PATCH",
					body: JSON.stringify({ name: "A" }), // name too short
				}),
			);
			const data = await response.json();

			expect(response.status).toBe(400);
			expect(data.success).toBe(false);
			expect(data.message).toBe("Invalid input data");
		});

		it("should return 404 when user not found after update", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);
			(db.update as any).mockReturnValue({
				set: vi.fn().mockReturnThis(),
				where: vi.fn().mockReturnThis(),
				returning: vi.fn().mockResolvedValue([]),
			});

			const response = await PATCH(
				new Request("http://localhost/api/console/user", {
					method: "PATCH",
					body: JSON.stringify({
						id: mockUser.id,
						name: "New Name",
					}),
				}),
			);
			const data = await response.json();

			expect(response.status).toBe(404);
			expect(data.success).toBe(false);
			expect(data.message).toBe("User not found");
		});
	});
});
