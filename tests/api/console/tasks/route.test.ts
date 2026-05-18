import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/session", () => ({ getSession: vi.fn() }));
vi.mock("@/features/console/task/services", () => ({ getTasks: vi.fn() }));

import { GET } from "@/app/api/console/tasks/route";
import { getTasks } from "@/features/console/task/services";
import { getSession } from "@/lib/session";

const mockSession = { user: { id: "user-1" }, session: { id: "sess-1" } };

const mockTask = {
	id: 1,
	title: "Test Task",
	content: null,
	status: "To Do",
	priority: "HIGH",
	category: "WORK",
	userId: "user-1",
	createdAt: new Date("2024-01-15"),
	updatedAt: new Date("2024-01-15"),
};

beforeEach(() => {
	vi.clearAllMocks();
	(getSession as ReturnType<typeof vi.fn>).mockResolvedValue(mockSession);
});

function req(path = "/api/console/tasks") {
	return new NextRequest(`http://localhost:3000${path}`);
}

describe("GET /api/console/tasks", () => {
	it("returns paginated task list", async () => {
		(getTasks as ReturnType<typeof vi.fn>).mockResolvedValue({
			list: [mockTask],
			total: 1,
			pageIndex: 0,
			pageSize: 10,
			totalPage: 1,
		});

		const res = await GET(req(), { params: {} } as any);
		const body = await res.json();

		expect(res.status).toBe(200);
		expect(body.list).toHaveLength(1);
		expect(body.total).toBe(1);
		expect(body.totalPage).toBe(1);
	});

	it("returns 401 when not authenticated", async () => {
		(getSession as ReturnType<typeof vi.fn>).mockResolvedValue(null);

		const res = await GET(req(), { params: {} } as any);
		const body = await res.json();

		expect(res.status).toBe(401);
		expect(body.success).toBe(false);
		expect(getTasks).not.toHaveBeenCalled();
	});

	it("passes query params to service", async () => {
		(getTasks as ReturnType<typeof vi.fn>).mockResolvedValue({
			list: [],
			total: 0,
			pageIndex: 0,
			pageSize: 10,
			totalPage: 0,
		});

		await GET(req("/api/console/tasks?pageIndex=1&pageSize=5&searchKey=foo"), {
			params: {},
		} as any);

		expect(getTasks).toHaveBeenCalledWith({
			pageIndex: "1",
			pageSize: "5",
			searchKey: "foo",
		});
	});
});
