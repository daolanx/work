import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher";
import type {
	CreateTaskInput,
	Task,
	TaskPagination,
	UpdateTaskInput,
} from "@/lib/validations/task";

const TASK_KEY = "/api/console/tasks";

export function useTasks({ pageIndex, pageSize, searchKey }: TaskPagination) {
	const query = new URLSearchParams({
		pageIndex: pageIndex.toString(),
		pageSize: pageSize.toString(),
		...(searchKey ? { searchKey } : {}),
	}).toString();

	const { data, error, isLoading } = useSWR(`${TASK_KEY}?${query}`, {
		keepPreviousData: true,
	});

	return {
		res: data,
		isLoading,
		error,
	};
}

export function useTask({ taskId }) {
	const { mutate: globalMutate } = useSWRConfig();
	const urlParam = taskId ? `${TASK_KEY}/${taskId}` : null;
	const { data, error, isLoading, mutate } = useSWR<Task | null>(
		urlParam,
		fetcher,
	);

	const { trigger: createTask, isMutating: isCreating } = useSWRMutation<
		Task,
		any,
		string,
		CreateTaskInput
	>(
		TASK_KEY,
		(url, { arg }) =>
			fetcher(url, {
				method: "PUT",
				body: JSON.stringify(arg),
			}),
		{
			onSuccess: () => {
				toast.success("Task created successfully!");
			},
			onError: (err) => {
				toast.error(err.message || "Failed to create task");
			},
		},
	);

	const { trigger: updateTask, isMutating: isUpdating } = useSWRMutation<
		any,
		any,
		string | null, // Force the key type to allow null
		UpdateTaskInput
	>(
		urlParam,
		(url, { arg }) => {
			if (!url) return Promise.reject("No URL provided");
			return fetcher(url, {
				method: "PATCH",
				body: JSON.stringify(arg),
			});
		},
		{
			populateCache: true,
			revalidate: false,
			onSuccess: (_data) => {
				toast.success("Task updated!");
			},
			onError: (err) => {
				toast.error(err.message || "Update failed");
			},
		},
	);

	const { trigger: deleteTask, isMutating: isDeleting } = useSWRMutation<
		void,
		any,
		string | null,
		void
	>(
		urlParam,
		async (url) => {
			if (!url) return Promise.reject("No URL provided");
			return fetcher(url, { method: "DELETE" });
		},
		{
			populateCache: false,
			revalidate: false,
			onSuccess: async () => {
				await mutate(null, false);
				globalMutate(
					(key) =>
						typeof key === "string" &&
						key.startsWith(TASK_KEY) &&
						!key.includes(`${TASK_KEY}/`), // 排除包含'/api/console/tasks/'的key（详情key）
					undefined,
					{ revalidate: true },
				);
				toast.success("Task deleted successfully");
			},
			onError: (err) => {
				toast.error(err.message || "Delete failed");
			},
		},
	);

	return {
		task: data,
		error,
		isLoading,
		isMutating: isCreating || isUpdating || isDeleting,
		isCreating,
		isUpdating,
		isDeleting,
		createTask,
		updateTask,
		deleteTask,
	};
}

/**
 * Hook for creating a new task
 */
export function useCreateTask() {
	const { mutate } = useSWRConfig();

	const { trigger: createTask, isMutating: isCreating } = useSWRMutation<
		Task,
		any,
		string,
		CreateTaskInput
	>(
		TASK_KEY,
		(url, { arg }) =>
			fetcher(url, {
				method: "POST",
				body: JSON.stringify(arg),
			}),
		{
			onSuccess: () => {
				mutate((key) => typeof key === "string" && key.startsWith(TASK_KEY));
				toast.success("Task created successfully!");
			},
			onError: (err) => {
				toast.error(err.message || "Failed to create task");
			},
		},
	);

	return { createTask, isCreating };
}
