import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher";

export interface TasksParams {
	pageIndex: number;
	pageSize: number;
	searchKey?: string;
}

export interface TaskParams {
	taskId: string;
}

export interface Task {
	id: number;
	header: string;
	type: string;
	status: string;
	target: number;
	limit: number;
	reviewer: string;
	createdAt: string;
	updatedAt: string;
}

const TASK_KEY = "/api/console/tasks";

export function useTasks({ pageIndex, pageSize, searchKey }: TasksParams) {
	const query = new URLSearchParams({
		current: (pageIndex + 1).toString(),
		pageSize: pageSize.toString(),
		...(searchKey ? { searchKey } : {}),
	}).toString();

	const { data, error, isLoading } = useSWR(`${TASK_KEY}?${query}`, {
		keepPreviousData: true,
	});

	return {
		res: data, // { list, total, current, pageSize }
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

	const { trigger: updateTask, isMutating: isUpdating } = useSWRMutation<
		Task,
		any,
		string | null, // Force the key type to allow null
		Partial<Task>
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
		isMutating: isUpdating || isDeleting,
		isUpdating,
		isDeleting,
		updateTask,
		deleteTask,
	};
}
