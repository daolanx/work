import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET, POST } from "@/app/api/console/tasks/route";
import { db } from "@/db";
import { auth } from "@/lib/auth/server";

vi.mock("@/db", () => ({
	db: {
		select: vi.fn(),
		insert: vi.fn(),
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

function createListRequest(searchParams: Record<string, string> = {}) {
	const params = new URLSearchParams({
		pageIndex: "0",
		pageSize: "10",
		orderBy: "createdAt",
		order: "desc",
		...searchParams,
	});
	return new NextRequest(
		`http://localhost/api/console/tasks?${params.toString()}`,
	);
}

describe("Tasks List API (GET/POST /api/console/tasks)", () => {
	const mockUser = { id: "user-1", name: "Test", email: "test@example.com" };
	const mockSession = { user: mockUser };

	beforeEach(() => {
		vi.clearAllMocks();
		(headers as any).mockResolvedValue(new Headers());
	});

	describe("GET /api/console/tasks", () => {
		it("should return 401 when not authenticated", async () => {
			(auth.api.getSession as any).mockResolvedValue(null);

			const req = createListRequest();
			const res = await GET(req);
			const data = await res.json();

			expect(res.status).toBe(401);
			expect(data.success).toBe(false);
		});

		it("should return 400 when query params are invalid", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);

			const req = new NextRequest(
				"http://localhost/api/console/tasks?pageIndex=-1&pageSize=200",
			);
			const res = await GET(req);
			const data = await res.json();

			expect(res.status).toBe(400);
			expect(data.message).toBe("Invalid query parameters");
		});

		it("should return 200 with list, total, pagination when authenticated", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);
			const mockList = [
				{
					id: 1,
					title: "Task 1",
					status: "To Do",
					userId: mockUser.id,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			];
			const mockTotal = [{ total: 1 }];

			(db.select as any)
				.mockReturnValueOnce({
					from: vi.fn().mockReturnValue({
						where: vi.fn().mockReturnValue({
							orderBy: vi.fn().mockReturnValue({
								limit: vi.fn().mockReturnValue({
									offset: vi.fn().mockResolvedValue(mockList),
								}),
							}),
						}),
					}),
				})
				.mockReturnValueOnce({
					from: vi.fn().mockReturnValue({
						where: vi.fn().mockResolvedValue(mockTotal),
					}),
				});

			const req = createListRequest();
			const res = await GET(req);
			const data = await res.json();

			expect(res.status).toBe(200);
			expect(data.list).toHaveLength(1);
			expect(data.list[0]).toMatchObject({
				id: 1,
				title: "Task 1",
				status: "To Do",
				userId: mockUser.id,
			});
			expect(data.total).toBe(1);
			expect(data.pageIndex).toBe(0);
			expect(data.pageSize).toBe(10);
			expect(data.totalPage).toBe(1);
		});
	});

	describe("POST /api/console/tasks", () => {
		it("should return 401 when not authenticated", async () => {
			(auth.api.getSession as any).mockResolvedValue(null);

			const req = new NextRequest("http://localhost/api/console/tasks", {
				method: "POST",
				body: JSON.stringify({
					title: "New Task",
					status: "To Do",
				}),
			});
			const res = await POST(req);
			const data = await res.json();

			expect(res.status).toBe(401);
			expect(data.success).toBe(false);
		});

		it("should return 400 when body validation fails", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);

			const req = new NextRequest("http://localhost/api/console/tasks", {
				method: "POST",
				body: JSON.stringify({ title: "", status: "To Do" }),
			});
			const res = await POST(req);
			const data = await res.json();

			expect(res.status).toBe(400);
			expect(data.message).toBe("Validation Error");
			expect(data.errors).toBeDefined();
		});

		it("should return 201 and created task when body is valid", async () => {
			(auth.api.getSession as any).mockResolvedValue(mockSession);
			const newTask = {
				id: 1,
				title: "New Task",
				content: null,
				status: "To Do",
				priority: null,
				category: null,
				userId: mockUser.id,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			(db.insert as any).mockReturnValue({
				values: vi.fn().mockReturnValue({
					returning: vi.fn().mockResolvedValue([newTask]),
				}),
			});

			const req = new NextRequest("http://localhost/api/console/tasks", {
				method: "POST",
				body: JSON.stringify({
					title: "New Task",
					status: "To Do",
				}),
			});
			const res = await POST(req);
			const data = await res.json();

			expect(res.status).toBe(201);
			expect(data.id).toBe(1);
			expect(data.title).toBe("New Task");
			expect(data.userId).toBe(mockUser.id);
		});
	});
});
