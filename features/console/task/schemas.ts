import { z } from "zod";
import { TASK_CATEGORY_ENUM_KEYS, TASK_PRIORITY_ENUM_KEYS } from "./constants";

/**
 * 0. Helpers
 * Preprocesses URL query parameters:
 * - Converts empty strings, null, or empty arrays to undefined (triggers .optional())
 * - Normalizes single strings into an array for consistent formatting
 */
const preprocessQueryParams = (schema: z.ZodEnum<any>) =>
	z.preprocess((val) => {
		if (!val) return undefined;
		if (Array.isArray(val) && val.length === 0) return undefined;

		// Split comma-separated strings: "a,b" → ["a", "b"]
		if (typeof val === "string") {
			const items = val
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean);
			return items.length > 0 ? items : undefined;
		}

		return Array.isArray(val) ? val : [val];
	}, z.array(schema).optional());

/**
 * Preprocesses single string parameters:
 * Converts empty strings, null, or undefined to undefined to trigger .optional()
 * and trims whitespace from valid strings.
 */
const preprocessString = z.preprocess((val) => {
	if (val === null || val === "" || val === undefined) return undefined;
	return typeof val === "string" ? val.trim() : val;
}, z.string().optional());

/**
 * 1. Request Parameter Schemas
 */
export const taskIdSchema = z.coerce.number().int().min(1, "Invalid Task ID");

/**
 * 2. Base Entity Schemas & Enums
 */
const taskStatusEnum = z.enum(["To Do", "In Process", "Done", "Canceled"]);
const taskPriorityEnum = z.enum(TASK_PRIORITY_ENUM_KEYS);
const taskCategoryEnum = z.enum(TASK_CATEGORY_ENUM_KEYS);

// Schema for pagination and filter validation
const taskSortFieldEnum = z.enum([
	"createdAt",
	"updatedAt",
	"title",
	"priority",
	"status",
]);

export const listTaskSchema = z.object({
	pageIndex: z.coerce.number().min(0).default(0),
	pageSize: z.coerce.number().min(1).max(100).default(10),
	searchKey: preprocessString,
	status: preprocessQueryParams(taskStatusEnum),
	priority: preprocessQueryParams(taskPriorityEnum),
	category: preprocessQueryParams(taskCategoryEnum),
	orderBy: taskSortFieldEnum.nullish(),
	order: z.enum(["asc", "desc"]).nullish(),
});

export const taskSchema = z.object({
	id: z.number().int(),
	title: z.string().min(1, "Title is required").trim(),
	content: z.string().nullish(),
	status: taskStatusEnum,
	priority: taskPriorityEnum.nullish(),
	category: taskCategoryEnum.nullish(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

/**
 * 3. Action-Specific Schemas
 */
export const createTaskSchema = taskSchema
	.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
	})
	.extend({
		status: taskStatusEnum,
	});

export const updateTaskSchema = createTaskSchema.partial();

/**
 * 4. TypeScript Type Inference
 */
export type Task = z.infer<typeof taskSchema>;
export type TaskId = z.infer<typeof taskIdSchema>;
export type TaskStatus = z.infer<typeof taskStatusEnum>;
export type TaskPriority = z.infer<typeof taskPriorityEnum>;
export type TaskCategory = z.infer<typeof taskCategoryEnum>;
export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
export type ListTasks = z.infer<typeof listTaskSchema>;
