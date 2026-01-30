import { z } from "zod";
import {
	TASK_CATEGORY_ENUM_KEYS,
	TASK_PRIORITY_ENUM_KEYS,
} from "@/constants/task-enums";

/**
 * 0. Helpers
 * 帮助处理 URL 查询参数：
 * - 将空字符串、null、空数组转换为 undefined (触发 .optional())
 * - 将单个字符串转换为数组 (统一格式)
 */
const preprocessQueryParams = (schema: z.ZodEnum<any>) =>
	z.preprocess((val) => {
		// 1. 处理空值
		if (!val) return undefined;
		if (Array.isArray(val) && val.length === 0) return undefined;

		// 2. 统一转数组
		return Array.isArray(val) ? val : [val];
	}, z.array(schema).optional());

/**
 * 处理单字符串参数：
 * 将空字符串、null、undefined 统一转换为 undefined，从而触发 .optional()
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

// 分页与筛选校验 Schema
export const taskPaginationSchema = z.object({
	pageIndex: z.coerce.number().min(0).default(0),
	pageSize: z.coerce.number().min(1).max(100).default(10),
	searchKey: preprocessString,
	sort: preprocessString,
	// 使用辅助函数处理多选字段
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
