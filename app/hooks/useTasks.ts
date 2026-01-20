import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/app/lib/fetcher";

interface User {
	name: string;
}

export interface PaginationParams {
	pageIndex: number;
	pageSize: number;
}

const TASK_KEY = "/console/task/api";

export function useTasks({ pageIndex, pageSize }: PaginationParams) {
	const query = new URLSearchParams({
		current: (pageIndex + 1).toString(), // 后端通常是 1-based
		pageSize: pageSize.toString(),
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
