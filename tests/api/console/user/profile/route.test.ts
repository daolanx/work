import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/session", () => ({ getSession: vi.fn() }));

import { GET } from "@/app/api/console/user/profile/route";
import { getSession } from "@/lib/session";

const mockSession = {
	user: {
		id: "user-1",
		name: "Test User",
		email: "test@example.com",
		image: null,
		role: "user",
	},
	session: { id: "sess-1" },
};

beforeEach(() => {
	vi.clearAllMocks();
	(getSession as ReturnType<typeof vi.fn>).mockResolvedValue(mockSession);
});

function req() {
	return new NextRequest("http://localhost:3000/api/console/user/profile");
}

describe("GET /api/console/user/profile", () => {
	it("returns user profile", async () => {
		const res = await GET(req(), { params: {} } as any);
		const body = await res.json();

		expect(res.status).toBe(200);
		expect(body.email).toBe("test@example.com");
		expect(body.role).toBe("user");
	});

	it("returns 401 when not authenticated", async () => {
		(getSession as ReturnType<typeof vi.fn>).mockResolvedValue(null);

		const res = await GET(req(), { params: {} } as any);
		const body = await res.json();

		expect(res.status).toBe(401);
		expect(body.success).toBe(false);
	});
});
