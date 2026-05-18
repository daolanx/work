import { describe, expect, it } from "vitest";
import {
	createTaskSchema,
	listTaskSchema,
	taskIdSchema,
	updateTaskSchema,
} from "@/features/console/task/schemas";

describe("taskIdSchema", () => {
	it("accepts a valid numeric taskId", () => {
		const result = taskIdSchema.safeParse(1);
		expect(result.success).toBe(true);
	});

	it("coerces string numbers", () => {
		const result = taskIdSchema.safeParse("42");
		expect(result.success).toBe(true);
		if (result.success) expect(result.data).toBe(42);
	});

	it("rejects zero", () => {
		const result = taskIdSchema.safeParse(0);
		expect(result.success).toBe(false);
	});

	it("rejects negative numbers", () => {
		expect(taskIdSchema.safeParse(-1).success).toBe(false);
	});

	it("rejects non-integer values", () => {
		expect(taskIdSchema.safeParse(1.5).success).toBe(false);
	});
});

describe("createTaskSchema", () => {
	const validInput = { title: "Test Task", status: "To Do" as const };

	it("accepts valid input with required fields", () => {
		const result = createTaskSchema.safeParse(validInput);
		expect(result.success).toBe(true);
	});

	it("accepts input with all optional fields", () => {
		const result = createTaskSchema.safeParse({
			title: "Full Task",
			content: "Details here",
			status: "In Process",
			priority: "HIGH",
			category: "WORK",
		});
		expect(result.success).toBe(true);
	});

	it("rejects missing title", () => {
		const result = createTaskSchema.safeParse({ status: "To Do" });
		expect(result.success).toBe(false);
	});

	it("rejects empty title", () => {
		const result = createTaskSchema.safeParse({ title: "", status: "To Do" });
		expect(result.success).toBe(false);
	});

	it("rejects invalid status", () => {
		const result = createTaskSchema.safeParse({
			title: "Test",
			status: "InvalidStatus",
		});
		expect(result.success).toBe(false);
	});

	it("accepts all valid statuses", () => {
		const statuses = ["To Do", "In Process", "Done", "Canceled"];
		for (const status of statuses) {
			const result = createTaskSchema.safeParse({ title: "T", status });
			expect(result.success).toBe(true);
		}
	});

	it("accepts all valid priorities", () => {
		const priorities = ["URGENT", "HIGH", "MEDIUM", "LOW"];
		for (const priority of priorities) {
			const result = createTaskSchema.safeParse({
				title: "T",
				status: "To Do",
				priority,
			});
			expect(result.success).toBe(true);
		}
	});

	it("accepts all valid categories", () => {
		const categories = ["PERSONAL", "WORK"];
		for (const category of categories) {
			const result = createTaskSchema.safeParse({
				title: "T",
				status: "To Do",
				category,
			});
			expect(result.success).toBe(true);
		}
	});

	it("trims whitespace from title", () => {
		const result = createTaskSchema.safeParse({
			title: "  Trimmed  ",
			status: "To Do",
		});
		expect(result.success).toBe(true);
		if (result.success) expect(result.data.title).toBe("Trimmed");
	});
});

describe("updateTaskSchema", () => {
	it("accepts partial updates", () => {
		const result = updateTaskSchema.safeParse({ title: "Updated" });
		expect(result.success).toBe(true);
	});

	it("accepts empty object (no changes)", () => {
		const result = updateTaskSchema.safeParse({});
		expect(result.success).toBe(true);
	});

	it("accepts status-only update", () => {
		const result = updateTaskSchema.safeParse({ status: "Done" });
		expect(result.success).toBe(true);
	});

	it("rejects invalid status in update", () => {
		const result = updateTaskSchema.safeParse({ status: "Bogus" });
		expect(result.success).toBe(false);
	});
});

describe("listTaskSchema", () => {
	it("applies defaults for missing fields", () => {
		const result = listTaskSchema.safeParse({});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.pageIndex).toBe(0);
			expect(result.data.pageSize).toBe(10);
		}
	});

	it("coerces string numbers from URL params", () => {
		const result = listTaskSchema.safeParse({
			pageIndex: "2",
			pageSize: "20",
		});
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.pageIndex).toBe(2);
			expect(result.data.pageSize).toBe(20);
		}
	});

	it("rejects pageSize > 100", () => {
		const result = listTaskSchema.safeParse({ pageSize: 101 });
		expect(result.success).toBe(false);
	});

	it("rejects pageSize < 1", () => {
		const result = listTaskSchema.safeParse({ pageSize: 0 });
		expect(result.success).toBe(false);
	});

	it("rejects pageIndex < 0", () => {
		const result = listTaskSchema.safeParse({ pageIndex: -1 });
		expect(result.success).toBe(false);
	});

	it("normalizes single status string to array", () => {
		const result = listTaskSchema.safeParse({ status: "Done" });
		expect(result.success).toBe(true);
		if (result.success) expect(result.data.status).toEqual(["Done"]);
	});

	it("passes through status array", () => {
		const result = listTaskSchema.safeParse({
			status: ["To Do", "Done"],
		});
		expect(result.success).toBe(true);
		if (result.success) expect(result.data.status).toEqual(["To Do", "Done"]);
	});

	it("treats empty/null status as undefined", () => {
		const r1 = listTaskSchema.safeParse({ status: "" });
		expect(r1.success).toBe(true);
		if (r1.success) expect(r1.data.status).toBeUndefined();

		const r2 = listTaskSchema.safeParse({ status: null });
		expect(r2.success).toBe(true);
		if (r2.success) expect(r2.data.status).toBeUndefined();
	});

	it("normalizes single priority string to array", () => {
		const result = listTaskSchema.safeParse({ priority: "HIGH" });
		expect(result.success).toBe(true);
		if (result.success) expect(result.data.priority).toEqual(["HIGH"]);
	});

	it("normalizes single category string to array", () => {
		const result = listTaskSchema.safeParse({ category: "WORK" });
		expect(result.success).toBe(true);
		if (result.success) expect(result.data.category).toEqual(["WORK"]);
	});

	it("trims whitespace from searchKey", () => {
		const result = listTaskSchema.safeParse({ searchKey: "  hello  " });
		expect(result.success).toBe(true);
		if (result.success) expect(result.data.searchKey).toBe("hello");
	});

	it("treats empty searchKey as undefined", () => {
		const result = listTaskSchema.safeParse({ searchKey: "" });
		expect(result.success).toBe(true);
		if (result.success) expect(result.data.searchKey).toBeUndefined();
	});

	it("accepts valid orderBy and order", () => {
		const result = listTaskSchema.safeParse({
			orderBy: "title",
			order: "asc",
		});
		expect(result.success).toBe(true);
	});

	it("rejects invalid order value", () => {
		const result = listTaskSchema.safeParse({ order: "random" });
		expect(result.success).toBe(false);
	});
});
