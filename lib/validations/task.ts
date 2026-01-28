import { z } from "zod";

/**
 * 1. Request Parameter Schemas
 */

// Schema for list filtering and pagination (e.g., GET /api/console/tasks?page=1&pageSize=10)
export const taskPaginationSchema = z.object({
	pageIndex: z.coerce.number().min(0).default(0),
	pageSize: z.coerce.number().min(1).max(100).default(10),
	searchKey: z.string().trim().optional(),
});

// Schema for path parameters to identify a specific task (e.g., /api/console/tasks/[taskId])
export const taskResourceIdSchema = z.object({
	// Use coerce to handle string-to-number conversion from URL path
	taskId: z.coerce.number().int().min(1, "Invalid Task ID"),
});

/**
 * 2. Base Entity Schemas
 */

const taskStatusEnum = z.enum(["To Do", "In Process", "Done", "Canceled"]);

// Core Task schema reflecting the database structure
export const taskSchema = z.object({
	id: z.string(),
	header: z.string().min(1, "Header is required").trim(),
	type: z.string().min(1, "Type is required"),
	status: taskStatusEnum,
	target: z.number().int().nonnegative(),
	limit: z.number().int().nonnegative(),
	reviewer: z.string().min(2, "Reviewer name is required").nullish(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

/**
 * 3. Action-Specific Schemas
 */

// Schema for creating a new task (POST)
// System-managed fields like 'id' and timestamps are omitted
export const createTaskSchema = taskSchema
	.omit({
		id: true,
		createdAt: true,
		updatedAt: true,
	})
	.extend({
		// Re-apply the default only for the creation phase
		status: taskStatusEnum,
	});

// Schema for updating an existing task (PATCH/PUT)
// Makes all fields optional as updates might be partial
export const updateTaskSchema = createTaskSchema.partial();

/**
 * 4. TypeScript Type Inference
 */

export type Task = z.infer<typeof taskSchema>;
export type TaskStatus = z.infer<typeof taskStatusEnum>;
export type TaskPagination = z.infer<typeof taskPaginationSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
