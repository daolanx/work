import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/app/lib/fetcher";
import { toast } from "sonner";

interface User {
	id: string | number;
	name: string;
	email: string;
}

const USER_KEY = "/console/user/api/";

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
			onSuccess: (data) => {
				toast.success("Profile updated!");
			},
			onError: (err) => {
				toast.error(err.message || "Update failed");
			}
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
