import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher";

interface User {
	id: string | number;
	name: string;
	email: string;
}

const USER_KEY = "/api/console/user";

export function useUser() {
	const { data, error, isLoading } = useSWR(USER_KEY);

	const { trigger: updateUser, isMutating } = useSWRMutation(
		USER_KEY,
		(url, { arg }: { arg: User }) =>
			fetcher(url, {
				method: "PATCH",
				body: JSON.stringify(arg),
			}),
		{
			populateCache: true,
			revalidate: false,
			onSuccess: (_data) => {
				toast.success("Profile updated!");
			},
			onError: (err) => {
				toast.error(err.message || "Update failed");
			},
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
