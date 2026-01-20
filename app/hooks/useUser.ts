import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/app/lib/fetcher";

interface User {
	name: string;
}

const USER_KEY = "/console/user/api/";

export function useUser() {
	const { data, error, isLoading } = useSWR(USER_KEY);

	const { trigger: updateUser, isMutating } = useSWRMutation(
		USER_KEY,
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
		user: data,
		isLoading,
		isMutating,
		error,
		updateUser,
	};
}
