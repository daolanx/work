import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher";

interface User {
	name: string;
}

export interface PaginationParams {
	pageIndex: number;
	pageSize: number;
	searchKey?: string;
}

const TASK_KEY = "/console/task/api";

export function useTasks({ pageIndex, pageSize, searchKey }: PaginationParams) {
	const query = new URLSearchParams({
		current: (pageIndex + 1).toString(), // 后端通常是 1-based
		pageSize: pageSize.toString(),
		...(searchKey ? { searchKey } : {}),
	}).toString();

	const { data, error, isLoading } = useSWR(`${TASK_KEY}?${query}`, {
		keepPreviousData: true,
	});

	const { trigger: updateUser, isMutating } = useSWRMutation(
		TASK_KEY,
		(url, { arg }: { arg: User }) =>
			fetcher(url, {
				method: "POST",
				body: JSON.stringify(arg),
			}),
		{
			populateCache: true,
			revalidate: false,
		},
	);
	return {
		res: data, // { list, total, current, pageSize }
		isLoading,
		isMutating,
		error,
		updateUser,
	};
}
