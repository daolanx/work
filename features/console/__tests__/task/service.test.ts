import { beforeEach, describe, expect, it, vi } from "vitest";
import { ValidationError } from "@/lib/errors";

// Mock dependencies before importing the module under test
vi.mock("@/db", () => ({ db: {} }));
vi.mock("@/lib/session", () => ({ getSession: vi.fn() }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import {
	createTask,
	deleteTask,
	getTask,
	getTasks,
	updateTask,
} from "@/features/console/task/service";
import { getSession } from "@/lib/session";

// Helper: build a thenable chain that resolves with `data`
function mockChain<T>(data: T) {
	const chain = {
		from: vi.fn().mockReturnThis(),
		where: vi.fn().mockReturnThis(),
		orderBy: vi.fn().mockReturnThis(),
		limit: vi.fn().mockReturnThis(),
		offset: vi.fn().mockReturnThis(),
		set: vi.fn().mockReturnThis(),
		values: vi.fn().mockReturnThis(),
		returning: vi.fn().mockReturnThis(),
	};
	return new Proxy(chain, {
		get(target, prop, receiver) {
			if (prop === "then") {
				return (resolve: (value: unknown) => void) =>
					Promise.resolve(data).then(resolve);
			}
			return Reflect.get(target, prop, receiver);
		},
	});
}

const mockSession = { user: { id: "user-1" } };
const now = new Date("2024-01-15T00:00:00Z");

const mockTask = {
	id: 1,
	title: "Test Task",
	content: null,
	status: "To Do",
	priority: "HIGH",
	category: "WORK",
	userId: "user-1",
	createdAt: now,
	updatedAt: now,
};

beforeEach(() => {
	vi.clearAllMocks();
	(getSession as ReturnType<typeof vi.fn>).mockResolvedValue(mockSession);
});

describe("getTasks", () => {
	it("returns paginated task list", async () => {
		const tasks = [mockTask];
		const countResult = [{ total: 1 }];

		// db.select().from().where().orderBy().limit().offset() → tasks
		// db.select({total}).from().where() → countResult
		let callCount = 0;
		(db as any).select = vi.fn().mockImplementation(() => {
			callCount++;
			if (callCount === 1) return mockChain(tasks);
			return mockChain(countResult);
		});

		const result = await getTasks({ pageIndex: 0, pageSize: 10 });

		expect(result.list).toEqual(tasks);
		expect(result.total).toBe(1);
		expect(result.totalPage).toBe(1);
		expect(result.pageIndex).toBe(0);
		expect(result.pageSize).toBe(10);
	});

	it("throws Unauthorized when no session", async () => {
		(getSession as ReturnType<typeof vi.fn>).mockResolvedValue(null);

		await expect(getTasks({})).rejects.toThrow("Unauthorized");
	});

	it("throws ValidationError for invalid params", async () => {
		await expect(getTasks({ pageSize: -1 })).rejects.toThrow(ValidationError);
	});

	it("filters by status", async () => {
		const tasks = [mockTask];
		const countResult = [{ total: 1 }];
		let callCount = 0;
		(db as any).select = vi.fn().mockImplementation(() => {
			callCount++;
			if (callCount === 1) return mockChain(tasks);
			return mockChain(countResult);
		});

		await getTasks({ status: ["To Do"] });

		// Verify where was called (filters applied)
		expect(db.select).toHaveBeenCalled();
	});

	it("searches by title", async () => {
		const tasks = [mockTask];
		const countResult = [{ total: 1 }];
		let callCount = 0;
		(db as any).select = vi.fn().mockImplementation(() => {
			callCount++;
			if (callCount === 1) return mockChain(tasks);
			return mockChain(countResult);
		});

		await getTasks({ searchKey: "Test" });
		expect(db.select).toHaveBeenCalled();
	});
});

describe("getTask", () => {
	it("returns a single task", async () => {
		(db as any).select = vi.fn().mockReturnValue(mockChain([mockTask]));

		const result = await getTask({ taskId: 1 });
		expect(result).toEqual(mockTask);
	});

	it("returns null when task not found", async () => {
		(db as any).select = vi.fn().mockReturnValue(mockChain([]));

		const result = await getTask({ taskId: 999 });
		expect(result).toBeNull();
	});

	it("throws Unauthorized when no session", async () => {
		(getSession as ReturnType<typeof vi.fn>).mockResolvedValue(null);

		await expect(getTask({ taskId: 1 })).rejects.toThrow("Unauthorized");
	});

	it("throws ValidationError for invalid taskId", async () => {
		await expect(getTask({ taskId: 0 })).rejects.toThrow(ValidationError);
	});
});

describe("createTask", () => {
	it("creates a new task and revalidates path", async () => {
		(db as any).insert = vi.fn().mockReturnValue(mockChain([mockTask]));

		const result = await createTask({
			title: "Test Task",
			status: "To Do",
			priority: "HIGH",
			category: "WORK",
		});

		expect(result).toEqual(mockTask);
		expect(revalidatePath).toHaveBeenCalledWith("/console/tasks");
	});

	it("throws Unauthorized when no session", async () => {
		(getSession as ReturnType<typeof vi.fn>).mockResolvedValue(null);

		await expect(createTask({ title: "T", status: "To Do" })).rejects.toThrow(
			"Unauthorized",
		);
	});

	it("throws ValidationError for invalid input", async () => {
		await expect(createTask({ status: "To Do" })).rejects.toThrow(
			ValidationError,
		);
	});
});

describe("updateTask", () => {
	it("updates a task and revalidates path", async () => {
		const updated = { ...mockTask, title: "Updated" };
		(db as any).update = vi.fn().mockReturnValue(mockChain([updated]));

		const result = await updateTask({ taskId: 1 }, { title: "Updated" });

		expect(result).toEqual(updated);
		expect(revalidatePath).toHaveBeenCalledWith("/console/tasks");
	});

	it("returns null when task not found", async () => {
		(db as any).update = vi.fn().mockReturnValue(mockChain([]));

		const result = await updateTask({ taskId: 999 }, { title: "X" });
		expect(result).toBeNull();
		expect(revalidatePath).not.toHaveBeenCalled();
	});

	it("throws Unauthorized when no session", async () => {
		(getSession as ReturnType<typeof vi.fn>).mockResolvedValue(null);

		await expect(updateTask({ taskId: 1 }, { title: "X" })).rejects.toThrow(
			"Unauthorized",
		);
	});

	it("throws ValidationError for invalid taskId", async () => {
		await expect(updateTask({ taskId: 0 }, { title: "X" })).rejects.toThrow(
			ValidationError,
		);
	});
});

describe("deleteTask", () => {
	it("deletes a task and revalidates path", async () => {
		(db as any).delete = vi.fn().mockReturnValue(mockChain([mockTask]));

		const result = await deleteTask({ taskId: 1 });

		expect(result).toEqual(mockTask);
		expect(revalidatePath).toHaveBeenCalledWith("/console/tasks");
	});

	it("returns null when task not found", async () => {
		(db as any).delete = vi.fn().mockReturnValue(mockChain([]));

		const result = await deleteTask({ taskId: 999 });
		expect(result).toBeNull();
		expect(revalidatePath).not.toHaveBeenCalled();
	});

	it("throws Unauthorized when no session", async () => {
		(getSession as ReturnType<typeof vi.fn>).mockResolvedValue(null);

		await expect(deleteTask({ taskId: 1 })).rejects.toThrow("Unauthorized");
	});
});
