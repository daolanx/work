"use client";

import type { ColumnFiltersState } from "@tanstack/react-table";
import { useMemo } from "react";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { deleter, patcher, poster } from "@/lib/fetcher";
import type {
	CreateTaskInput,
	Task,
	TaskPagination,
	UpdateTaskInput,
} from "@/lib/validations/task";

/**
 * Base API endpoint for task operations
 */
const TASK_KEY = "/api/console/tasks";

/**
 * Extends pagination schema with TanStack Table's internal filter state
 */
interface UseTasksProps extends TaskPagination {
	columnFilters?: ColumnFiltersState;
}

// --- Queries (Read) ---

/**
 * Fetches a paginated and optionally filtered list of tasks.
 * Uses 'keepPreviousData' to prevent UI flickering during pagination.
 */
export function useTasks({
	pageIndex,
	pageSize,
	searchKey,
	columnFilters,
}: UseTasksProps) {
	const query = useMemo(() => {
		const params = new URLSearchParams({
			pageIndex: pageIndex.toString(),
			pageSize: pageSize.toString(),
			...(searchKey ? { searchKey } : {}),
		});

		// Map columnFilters state to URL query parameters
		columnFilters?.forEach((filter) => {
			if (Array.isArray(filter.value)) {
				// Handle multi-select arrays: ?status=todo&status=done
				filter.value.forEach((val) => {
					if (val !== undefined && val !== null) {
						params.append(filter.id, val.toString());
					}
				});
			} else if (filter.value !== undefined && filter.value !== null) {
				// Handle single-select values: ?category=work
				params.append(filter.id, filter.value as string);
			}
		});

		return params.toString();
	}, [pageIndex, pageSize, searchKey, columnFilters]);

	// SWR automatically re-fetches when the key (query string) changes
	const { data, error, isLoading, mutate } = useSWR(`${TASK_KEY}?${query}`, {
		keepPreviousData: true,
	});

	return {
		res: data,
		isLoading,
		error,
		mutate,
	};
}

/**
 * Fetches details for a specific task.
 * @param taskId - The ID of the task to fetch.
 */
export function useTask(taskId?: string) {
	const url = taskId ? `${TASK_KEY}/${taskId}` : null;
	const { data, error, isLoading, mutate } = useSWR<Task>(url);

	return {
		task: data,
		isLoading,
		error,
		mutate,
	};
}

// --- Mutations (Write) ---

/**
 * Hook to create a new task.
 * Revalidates the task list cache upon success.
 */
export function useCreateTask() {
	const { mutate: globalMutate } = useSWRConfig();

	return useSWRMutation<Task, any, string, CreateTaskInput>(TASK_KEY, poster, {
		onSuccess: async () => {
			await revalidateTasks(globalMutate);
			toast.success("Task created successfully!");
		},
		onError: (err) => {
			toast.error(err.message || "Failed to create task");
		},
	});
}

/**
 * Hook to update an existing task's properties.
 * @param taskId - The ID of the task to update.
 */
export function useUpdateTask(taskId?: string) {
	const { mutate: globalMutate } = useSWRConfig();
	return useSWRMutation<any, any, string | null, UpdateTaskInput>(
		taskId ? `${TASK_KEY}/${taskId}` : null,
		patcher,
		{
			/**
			 * Automatically updates the local cache for the specific task
			 * using the response data to avoid extra GET requests.
			 */
			populateCache: true,
			revalidate: false,
			onSuccess: async () => {
				// List view needs revalidation to reflect changes (e.g., status updates)
				await revalidateTasks(globalMutate);
				toast.success("Task updated!");
			},
			onError: (err) => {
				toast.error(err.message || "Update failed");
			},
		},
	);
}

/**
 * Hook to delete a task.
 * @param taskId - The ID of the task to delete.
 */
export function useDeleteTask(taskId?: string) {
	const { mutate: globalMutate } = useSWRConfig();
	const url = taskId ? `${TASK_KEY}/${taskId}` : null;

	return useSWRMutation<void, any, string | null, void>(url, deleter, {
		populateCache: false,
		revalidate: false,
		onSuccess: async () => {
			await revalidateTasks(globalMutate);
			toast.success("Task deleted successfully");
		},
		onError: (err) => {
			toast.error(err.message || "Delete failed");
		},
	});
}

/**
 * Revalidates all SWR keys associated with the task list.
 * @param mutate - Global SWR mutate function.
 */
async function revalidateTasks(mutate: any) {
	return await mutate((key: unknown) => {
		if (typeof key !== "string") return false;

		// Matches the base key or keys with query strings (e.g., pagination/filters)
		return key === TASK_KEY || key.startsWith(`${TASK_KEY}?`);
	});
}
