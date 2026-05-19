"use client";

import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useMemo } from "react";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import type { PaginatedResponse } from "@/features/console/components/card-table/types";
import { fetcher } from "@/lib/fetcher";
import type { CreateTask, Task, UpdateTask } from "../schemas";
import { createTask, deleteTask, updateTask } from "../services";

const TASK_LIST_CACHE_KEY = "task-list";
const TASK_DETAIL_CACHE_KEY = "task-detail";

interface UseTasksProps {
	pageIndex: number;
	pageSize: number;
	searchKey?: string;
	columnFilters?: ColumnFiltersState;
	sorting?: SortingState;
}

function buildTasksUrl(params: Record<string, unknown>): string {
	const sp = new URLSearchParams();
	for (const [k, v] of Object.entries(params)) {
		if (v != null) sp.set(k, String(v));
	}
	return `/api/console/tasks?${sp}`;
}

export function useTasks({
	pageIndex,
	pageSize,
	searchKey,
	columnFilters,
	sorting,
}: UseTasksProps) {
	const params = useMemo(() => {
		const result: Record<string, unknown> = {
			pageIndex,
			pageSize,
			...(searchKey ? { searchKey } : {}),
		};

		columnFilters?.forEach(({ id, value }) => {
			if (Array.isArray(value)) {
				const valid = value.filter((v) => v != null);
				if (valid.length) result[id] = valid.join(",");
			} else if (value != null) {
				result[id] = value;
			}
		});
		if (sorting && sorting.length > 0) {
			const sort = sorting[0];
			result.orderBy = sort.id;
			result.order = sort.desc ? "desc" : "asc";
		} else {
			result.orderBy = "createdAt";
			result.order = "desc";
		}

		return result;
	}, [pageIndex, pageSize, searchKey, columnFilters, sorting]);

	const { data, error, isLoading, mutate } = useSWR(
		[TASK_LIST_CACHE_KEY, params],
		([, p]) => fetcher<PaginatedResponse<Task>>(buildTasksUrl(p)),
		{ keepPreviousData: true },
	);

	return {
		res: data,
		isLoading,
		error,
		mutate,
	};
}

export function useTask(taskId?: string | number) {
	const { data, error, isLoading, mutate } = useSWR<Task>(
		taskId != null ? [TASK_DETAIL_CACHE_KEY, String(taskId)] : null,
		([, id]) => fetcher(`/api/console/tasks/${id}`),
	);

	return {
		task: data,
		isLoading,
		error,
		mutate,
	};
}

export function useCreateTask() {
	const { mutate: globalMutate } = useSWRConfig();

	return useSWRMutation<Task, Error, typeof TASK_LIST_CACHE_KEY, CreateTask>(
		TASK_LIST_CACHE_KEY,
		(_, { arg }) => createTask(arg),
		{
			onSuccess: async () => {
				await revalidateTasks(globalMutate);
				toast.success("Task created successfully!");
			},
			onError: (err) => {
				toast.error(err.message || "Failed to create task");
			},
		},
	);
}

export function useUpdateTask(taskId?: string | number) {
	const { mutate: globalMutate } = useSWRConfig();
	const key = taskId != null ? [TASK_DETAIL_CACHE_KEY, String(taskId)] : null;

	return useSWRMutation<Task, Error, typeof key, UpdateTask>(
		key,
		(_, { arg }) => updateTask(String(taskId), arg),
		{
			populateCache: true,
			revalidate: false,
			onSuccess: async () => {
				await revalidateTasks(globalMutate);
				toast.success("Task updated!");
			},
			onError: (err) => {
				toast.error(err.message || "Update failed");
			},
		},
	);
}

export function useDeleteTask(taskId?: string | number) {
	const { mutate: globalMutate } = useSWRConfig();
	const key = taskId != null ? [TASK_DETAIL_CACHE_KEY, String(taskId)] : null;

	return useSWRMutation<void, Error, typeof key, void>(
		key,
		async () => {
			await deleteTask(Number(taskId));
		},
		{
			populateCache: false,
			revalidate: false,
			onSuccess: async () => {
				await revalidateTasks(globalMutate);
				toast.success("Task deleted successfully");
			},
			onError: (err) => {
				toast.error(err.message || "Delete failed");
			},
		},
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function revalidateTasks(mutate: any) {
	return await mutate((key: unknown) => {
		if (Array.isArray(key)) return key[0] === TASK_LIST_CACHE_KEY;
		return false;
	});
}
