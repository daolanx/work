"use client";

import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useMemo } from "react";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import type {
	CreateTaskInput,
	Task,
	UpdateTaskInput,
} from "@/features/console/task/schemas";
import {
	createTask,
	deleteTask,
	getTask,
	getTasks,
	updateTask,
} from "@/features/console/task/service";

interface UseTasksProps {
	pageIndex: number;
	pageSize: number;
	searchKey?: string;
	columnFilters?: ColumnFiltersState;
	sorting?: SortingState;
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

		columnFilters?.forEach((filter) => {
			if (Array.isArray(filter.value)) {
				const valid = filter.value.filter((v) => v !== undefined && v !== null);
				if (valid.length > 0) result[filter.id] = valid;
			} else if (filter.value !== undefined && filter.value !== null) {
				result[filter.id] = filter.value;
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
		["tasks-list", params],
		([, p]) => getTasks(p),
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
		taskId != null ? ["task-detail", String(taskId)] : null,
		([, id]) => getTask({ taskId: id }),
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

	return useSWRMutation<Task, Error, "tasks-list", CreateTaskInput>(
		"tasks-list",
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
	const key = taskId != null ? ["task-detail", String(taskId)] : null;

	return useSWRMutation<Task, Error, typeof key, UpdateTaskInput>(
		key,
		(_, { arg }) => updateTask({ taskId }, arg),
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
	const key = taskId != null ? ["task-detail", String(taskId)] : null;

	return useSWRMutation<void, Error, typeof key, void>(
		key,
		async () => {
			await deleteTask({ taskId });
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
		if (Array.isArray(key)) return key[0] === "tasks-list";
		return false;
	});
}
