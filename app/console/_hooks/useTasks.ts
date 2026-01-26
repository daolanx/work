import { toast } from "sonner";
import useSWR from "swr";
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
		current: (pageIndex + 1).toString(), // 后端通常是 1-based
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

export function useTask({ taskId }: TaskParams) {
	const urlParam = taskId ? `${TASK_KEY}/${taskId}` : null;
	const { data, error, isLoading } = useSWR<Task>(urlParam, fetcher);

	const { trigger: updateTask, isMutating } = useSWRMutation<
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

	return {
		task: data,
		isLoading,
		isMutating,
		error,
		updateTask,
	};
}
