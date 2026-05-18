import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/session", () => ({ getSession: vi.fn() }));
vi.mock("@/features/console/task/services", () => ({ getTask: vi.fn() }));

import { GET } from "@/app/api/console/tasks/[taskId]/route";
import { getTask } from "@/features/console/task/services";
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

function req() {
	return new NextRequest("http://localhost:3000/api/console/tasks/1");
}

describe("GET /api/console/tasks/[taskId]", () => {
	it("returns a single task", async () => {
		(getTask as ReturnType<typeof vi.fn>).mockResolvedValue(mockTask);

		const res = await GET(req(), { params: { taskId: "1" } } as any);
		const body = await res.json();

		expect(res.status).toBe(200);
		expect(body.id).toBe(mockTask.id);
		expect(body.title).toBe(mockTask.title);
		expect(body.status).toBe(mockTask.status);
	});

	it("returns null when task not found", async () => {
		(getTask as ReturnType<typeof vi.fn>).mockResolvedValue(null);

		const res = await GET(req(), { params: { taskId: "999" } } as any);
		const body = await res.json();

		expect(res.status).toBe(200);
		expect(body).toBeNull();
	});

	it("returns 401 when not authenticated", async () => {
		(getSession as ReturnType<typeof vi.fn>).mockResolvedValue(null);

		const res = await GET(req(), { params: { taskId: "1" } } as any);
		const body = await res.json();

		expect(res.status).toBe(401);
		expect(body.success).toBe(false);
		expect(getTask).not.toHaveBeenCalled();
	});
});
