import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/db", () => ({ db: {} }));
vi.mock("@/lib/session", () => ({ getSession: vi.fn() }));
vi.mock("@/features/console/user/service", () => ({ getVisitors: vi.fn() }));

import { GET } from "@/app/api/console/user/visitors/route";
import { getVisitors } from "@/features/console/user/service";

beforeEach(() => {
	vi.clearAllMocks();
});

function req() {
	return new NextRequest("http://localhost:3000/api/console/user/visitors");
}

describe("GET /api/console/user/visitors", () => {
	it("returns visitor stats without auth", async () => {
		const visitorData = [
			{ date: "2024-01-01", desktop: 100, mobile: 50 },
			{ date: "2024-01-02", desktop: 120, mobile: 60 },
		];
		(getVisitors as ReturnType<typeof vi.fn>).mockResolvedValue(visitorData);

		const res = await GET(req(), { params: {} } as any);
		const body = await res.json();

		expect(res.status).toBe(200);
		expect(body).toHaveLength(2);
		expect(body[0].desktop).toBe(100);
	});

	it("returns 500 on service error", async () => {
		(getVisitors as ReturnType<typeof vi.fn>).mockRejectedValue(
			new Error("DB connection failed"),
		);

		const res = await GET(req(), { params: {} } as any);
		const body = await res.json();

		expect(res.status).toBe(500);
		expect(body.success).toBe(false);
	});
});
