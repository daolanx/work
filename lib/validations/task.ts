import { z } from "zod";
import {
	TASK_CATEGORY_ENUM_KEYS,
	TASK_PRIORITY_ENUM_KEYS,
} from "@/constants/task-enums";

/**
 * 0. Helpers
 * Preprocesses URL query parameters:
 * - Converts empty strings, null, or empty arrays to undefined (triggers .optional())
 * - Normalizes single strings into an array for consistent formatting
 */
const preprocessQueryParams = (schema: z.ZodEnum<any>) =>
	z.preprocess((val) => {
		// 1. Handle empty/null values
		if (!val) return undefined;
		if (Array.isArray(val) && val.length === 0) return undefined;

		// 2. Normalize to array
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
export const taskResourceIdSchema = z.object({
	taskId: z.coerce.number().int().min(1, "Invalid Task ID"),
});

/**
 * 2. Base Entity Schemas & Enums
 */
const taskStatusEnum = z.enum(["To Do", "In Process", "Done", "Canceled"]);
const taskPriorityEnum = z.enum(TASK_PRIORITY_ENUM_KEYS);
const taskCategoryEnum = z.enum(TASK_CATEGORY_ENUM_KEYS);

// Schema for pagination and filter validation
export const taskPaginationSchema = z.object({
	pageIndex: z.coerce.number().min(0).default(0),
	pageSize: z.coerce.number().min(1).max(100).default(10),
	searchKey: preprocessString,
	sort: preprocessString,
	// Use helpers to handle multi-select fields
	status: preprocessQueryParams(taskStatusEnum),
	priority: preprocessQueryParams(taskPriorityEnum),
	category: preprocessQueryParams(taskCategoryEnum),
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
export type TaskStatus = z.infer<typeof taskStatusEnum>;
export type TaskPriority = z.infer<typeof taskPriorityEnum>;
export type TaskCategory = z.infer<typeof taskCategoryEnum>;
export type TaskPagination = z.infer<typeof taskPaginationSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
