import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/console/user/route";
import { db } from "@/db/drizzle";

// 1. Mock the database module
vi.mock("@/db/drizzle", () => ({
	db: {
		select: vi.fn(),
	},
}));

describe("GET /api/console/user", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should return 200 and the user data when a user exists in the database", async () => {
		// Prepare mock data
		const mockUser = { id: 1, name: "Gemini", email: "gemini@ai.com" };

		// 2. Mock Drizzle chain: db.select().from().limit()
		(db.select as any).mockReturnValue({
			from: vi.fn().mockReturnValue({
				limit: vi.fn().mockResolvedValue([mockUser]),
			}),
		});

		// 3. Execute the GET handler
		const response = await GET();

		// 4. Assertions
		expect(response.status).toBe(200);

		const data = await response.json();
		expect(data).toEqual(mockUser);

		// 5. Verify database interaction
		expect(db.select).toHaveBeenCalledTimes(1);
	});
});
