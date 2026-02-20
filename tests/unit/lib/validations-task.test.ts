import { describe, expect, it } from "vitest";
import {
	createTaskSchema,
	taskPaginationSchema,
	taskResourceIdSchema,
	updateTaskSchema,
} from "@/lib/validations/task";

describe("lib/validations/task", () => {
	describe("taskResourceIdSchema", () => {
		it("parses valid taskId number", () => {
			expect(taskResourceIdSchema.parse({ taskId: 1 })).toEqual({
				taskId: 1,
			});
			expect(taskResourceIdSchema.parse({ taskId: "42" })).toEqual({
				taskId: 42,
			});
		});

		it("rejects invalid taskId", () => {
			expect(() => taskResourceIdSchema.parse({ taskId: 0 })).toThrow();
			expect(() => taskResourceIdSchema.parse({ taskId: -1 })).toThrow();
		});
	});

	describe("taskPaginationSchema", () => {
		it("applies defaults for pageIndex and pageSize", () => {
			expect(taskPaginationSchema.parse({})).toEqual({
				pageIndex: 0,
				pageSize: 10,
			});
		});

		it("accepts valid pagination and optional filters", () => {
			const result = taskPaginationSchema.parse({
				pageIndex: 1,
				pageSize: 20,
				searchKey: " test ",
				orderBy: "createdAt",
				order: "desc",
			});
			expect(result.pageIndex).toBe(1);
			expect(result.pageSize).toBe(20);
			expect(result.searchKey).toBe("test");
			expect(result.orderBy).toBe("createdAt");
			expect(result.order).toBe("desc");
		});
	});

	describe("createTaskSchema", () => {
		it("parses valid create input", () => {
			const input = {
				title: "Task title",
				content: "Description",
				status: "To Do",
				priority: "HIGH",
				category: "WORK",
			};
			expect(createTaskSchema.parse(input)).toMatchObject({
				title: "Task title",
				status: "To Do",
			});
		});

		it("rejects empty title", () => {
			expect(() =>
				createTaskSchema.parse({ title: "", status: "To Do" }),
			).toThrow();
		});
	});

	describe("updateTaskSchema", () => {
		it("accepts partial fields", () => {
			expect(updateTaskSchema.parse({ title: "New title" })).toEqual({
				title: "New title",
			});
			expect(updateTaskSchema.parse({ status: "Done" })).toEqual({
				status: "Done",
			});
		});
	});
});
