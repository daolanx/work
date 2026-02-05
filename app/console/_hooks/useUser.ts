import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/lib/fetcher";
import { type UpdateUserInput } from "@/lib/auth/schemas";

const USER_KEY = "/api/console/user";

export function useUser() {
	const { data, error, isLoading } = useSWR(USER_KEY);

	const { trigger: updateUser, isMutating } = useSWRMutation(
		USER_KEY,
		(url, { arg }: { arg: UpdateUserInput }) =>
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
