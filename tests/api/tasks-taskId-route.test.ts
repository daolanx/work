import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DELETE, GET, PATCH } from "@/app/api/console/tasks/[taskId]/route";
import { db } from "@/db";
import { auth } from "@/lib/auth/server";

vi.mock("@/db", () => ({
	db: {
		select: vi.fn(),
		update: vi.fn(),
		delete: vi.fn(),
	},
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

describe("Task Detail API (GET/PATCH/DELETE /api/console/tasks/[taskId])", () => {
	const mockUser = { id: "user-1", name: "Test", email: "test@example.com" };
	const mockSession = { user: mockUser };
	const mockTask = {
		id: 1,
		title: "Task 1",
		content: null,
		status: "To Do",
		priority: null,
		category: null,
		userId: mockUser.id,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	function createContext(taskId: string) {
		return { params: Promise.resolve({ taskId }) };
	}

	beforeEach(() => {
		vi.clearAllMocks();
		(headers as any).mockResolvedValue(new Headers());
	});

	describe("GET /api/console/tasks/[taskId]", () => {
		it("should return 401 when not authenticated", async () => {
			(auth.api.getSession as any).mockResolvedValue(null);

			const req = new NextRequest("http://localhost/api/console/tasks/1");
			const res = await GET(req, createContext("1"));
			const data = await res.json();

			expect(res.status).toBe(401);
			expect(data.success).toBe(false);
		});

		it("should return 400 when taskId is invalid", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);

			const req = new NextRequest("http://localhost/api/console/tasks/0");
			const res = await GET(req, createContext("0"));
			const data = await res.json();

			expect(res.status).toBe(400);
			expect(data.message).toBe("Validation Error");
		});

		it("should return 404 when task not found or access denied", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);
			(db.select as any).mockReturnValue({
				from: vi.fn().mockReturnValue({
					where: vi.fn().mockReturnValue({
						limit: vi.fn().mockResolvedValue([]),
					}),
				}),
			});

			const req = new NextRequest("http://localhost/api/console/tasks/999");
			const res = await GET(req, createContext("999"));
			const data = await res.json();

			expect(res.status).toBe(404);
			expect(data.message).toContain("Task not found");
		});

		it("should return 200 and task when found", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);
			(db.select as any).mockReturnValue({
				from: vi.fn().mockReturnValue({
					where: vi.fn().mockReturnValue({
						limit: vi.fn().mockResolvedValue([mockTask]),
					}),
				}),
			});

			const req = new NextRequest("http://localhost/api/console/tasks/1");
			const res = await GET(req, createContext("1"));
			const data = await res.json();

			expect(res.status).toBe(200);
			expect(data.id).toBe(1);
			expect(data.title).toBe("Task 1");
		});
	});

	describe("PATCH /api/console/tasks/[taskId]", () => {
		it("should return 401 when not authenticated", async () => {
			(auth.api.getSession as any).mockResolvedValue(null);

			const req = new NextRequest("http://localhost/api/console/tasks/1", {
				method: "PATCH",
				body: JSON.stringify({ title: "Updated" }),
			});
			const res = await PATCH(req, createContext("1"));
			expect(res.status).toBe(401);
		});

		it("should return 400 when taskId is invalid", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);

			const req = new NextRequest("http://localhost/api/console/tasks/0", {
				method: "PATCH",
				body: JSON.stringify({ title: "Updated" }),
			});
			const res = await PATCH(req, createContext("0"));
			const data = await res.json();
			expect(res.status).toBe(400);
			expect(data.message).toBe("Invalid Task ID");
		});

		it("should return 400 when body validation fails", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);

			const req = new NextRequest("http://localhost/api/console/tasks/1", {
				method: "PATCH",
				body: JSON.stringify({ title: "" }),
			});
			const res = await PATCH(req, createContext("1"));
			const data = await res.json();
			expect(res.status).toBe(400);
			expect(data.message).toBe("Validation Error");
		});

		it("should return 404 when task not found for update", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);
			(db.update as any).mockReturnValue({
				set: vi.fn().mockReturnThis(),
				where: vi.fn().mockReturnThis(),
				returning: vi.fn().mockResolvedValue([]),
			});

			const req = new NextRequest("http://localhost/api/console/tasks/999", {
				method: "PATCH",
				body: JSON.stringify({ status: "Done" }),
			});
			const res = await PATCH(req, createContext("999"));
			const data = await res.json();
			expect(res.status).toBe(404);
			expect(data.message).toContain("Task not found");
		});

		it("should return 200 and updated task when valid", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);
			const updated = { ...mockTask, title: "Updated Title", status: "Done" };
			(db.update as any).mockReturnValue({
				set: vi.fn().mockReturnThis(),
				where: vi.fn().mockReturnThis(),
				returning: vi.fn().mockResolvedValue([updated]),
			});

			const req = new NextRequest("http://localhost/api/console/tasks/1", {
				method: "PATCH",
				body: JSON.stringify({ title: "Updated Title", status: "Done" }),
			});
			const res = await PATCH(req, createContext("1"));
			const data = await res.json();
			expect(res.status).toBe(200);
			expect(data.title).toBe("Updated Title");
			expect(data.status).toBe("Done");
		});
	});

	describe("DELETE /api/console/tasks/[taskId]", () => {
		it("should return 401 when not authenticated", async () => {
			(auth.api.getSession as any).mockResolvedValue(null);

			const req = new NextRequest("http://localhost/api/console/tasks/1", {
				method: "DELETE",
			});
			const res = await DELETE(req, createContext("1"));
			expect(res.status).toBe(401);
		});

		it("should return 400 when taskId is invalid", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);

			const req = new NextRequest("http://localhost/api/console/tasks/0", {
				method: "DELETE",
			});
			const res = await DELETE(req, createContext("0"));
			const data = await res.json();
			expect(res.status).toBe(400);
			expect(data.message).toBe("Invalid Task ID");
		});

		it("should return 404 when task not found for delete", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);
			(db.delete as any).mockReturnValue({
				where: vi.fn().mockReturnThis(),
				returning: vi.fn().mockResolvedValue([]),
			});

			const req = new NextRequest("http://localhost/api/console/tasks/999", {
				method: "DELETE",
			});
			const res = await DELETE(req, createContext("999"));
			const data = await res.json();
			expect(res.status).toBe(404);
			expect(data.message).toContain("Task not found");
		});

		it("should return 200 and success message when task deleted", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);
			(db.delete as any).mockReturnValue({
				where: vi.fn().mockReturnThis(),
				returning: vi.fn().mockResolvedValue([mockTask]),
			});

			const req = new NextRequest("http://localhost/api/console/tasks/1", {
				method: "DELETE",
			});
			const res = await DELETE(req, createContext("1"));
			const data = await res.json();
			expect(res.status).toBe(200);
			expect(data.message).toBe("Task deleted successfully");
			expect(data.deletedTask).toMatchObject({
				id: 1,
				title: "Task 1",
				userId: mockUser.id,
			});
		});
	});
});
