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

// --- Queries (Read) ---

/**
 * Fetches a paginated and optionally filtered list of tasks.
 * Uses 'keepPreviousData' to prevent UI flickering during pagination.
 */
export function useTasks({ pageIndex, pageSize, searchKey }: TaskPagination) {
	const query = new URLSearchParams({
		pageIndex: pageIndex.toString(),
		pageSize: pageSize.toString(),
		...(searchKey ? { searchKey } : {}),
	}).toString();

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
 * @param taskId - The ID of the task to fetch. If null, the request won't execute.
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
 * Refreshes the task list cache upon successful creation.
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
			 * populateCache: true
			 * Automatically updates the local cache for the current task with the response
			 * returned from the PATCH request. This ensures the detail page reflects
			 * changes immediately without needing an explicit global mutate call.
			 */
			populateCache: true,
			/**
			 * revalidate: false
			 * Since the cache is already populated with the latest data from the PATCH response,
			 * we disable the automatic GET request (revalidation). This prevents UI "flickering"
			 * or extra network overhead after a successful update.
			 */
			revalidate: false,
			onSuccess: async () => {
				// The detail cache is already updated via populateCache.
				// We only need to invalidate the task list cache so that the list view
				// stays in sync when the user navigates back.
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
 * Performs a local cache cleanup and revalidates the task list.
 * @param taskId - The ID of the task to delete.
 */
export function useDeleteTask(taskId?: string) {
	const { mutate: globalMutate } = useSWRConfig();
	const url = taskId ? `${TASK_KEY}/${taskId}` : null;

	return useSWRMutation<void, any, string | null, void>(url, deleter, {
		populateCache: false, // Nothing to store in cache after deletion
		revalidate: false, // We handle revalidation manually below
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
 * Revalidate task lists.
 * @param mutate - The mutate function from useSWRConfig.
 * @param taskId - The ID of the task to revalidate.
 * @returns
 */
async function revalidateTasks(mutate: any, taskId?: string) {
	return await mutate((key: unknown) => {
		if (typeof key !== "string") return false;

		// e.g., /tasks, /tasks?page=1
		const isList = key === TASK_KEY || key.startsWith(`${TASK_KEY}?`);
		return isList;
	});
}
