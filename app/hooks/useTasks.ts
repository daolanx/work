import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/app/lib/fetcher";

interface User {
	name: string;
}

const TASK_KEY = "/api/console/task";

export function useTasks() {
	const { data, error, isLoading } = useSWR(TASK_KEY);

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
		tasks: data,
		isLoading,
		isMutating,
		error,
		updateUser,
	};
}
