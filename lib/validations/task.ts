import { z } from "zod";
import {
	TASK_CATEGORY_ENUM_KEYS,
	TASK_PRIORITY_ENUM_KEYS,
} from "@/constants/task-enums";

/**
 * 1. Request Parameter Schemas
 */

export const taskPaginationSchema = z.object({
	pageIndex: z.coerce.number().min(0).default(0),
	pageSize: z.coerce.number().min(1).max(100).default(10),
	searchKey: z.string().trim().optional(),
});

export const taskResourceIdSchema = z.object({
	taskId: z.coerce.number().int().min(1, "Invalid Task ID"),
});

/**
 * 2. Base Entity Schemas
 */

const taskStatusEnum = z.enum(["To Do", "In Process", "Done", "Canceled"]);
const taskPriorityEnum = z.enum(TASK_PRIORITY_ENUM_KEYS);
const taskCategoryEnum = z.enum(TASK_CATEGORY_ENUM_KEYS);

export const taskSchema = z.object({
	id: z.number().int(), // Switched to number to match serial ID
	title: z.string().min(1, "Title is required").trim(),
	header: z.string().min(1, "Header is required").trim(),
	type: z.string().min(1, "Type is required"),
	content: z.string().nullish(),
	status: taskStatusEnum,
	priority: taskPriorityEnum.nullish(),
	category: taskCategoryEnum.nullish(),
	target: z.number().int().nonnegative().nullish(),
	limit: z.number().int().nonnegative().nullish(),
	reviewer: z.string().min(2, "Reviewer name is required").nullish(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

/**
 * 3. Action-Specific Schemas
 */

// Schema for creating a new task (POST)
export const createTaskSchema = taskSchema
	.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
	})
	.extend({
		status: taskStatusEnum,
	});

// Schema for updating an existing task (PATCH/PUT)
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
