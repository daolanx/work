import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import fetcher from "../lib/fetcher";

interface User {
	id: string;
	name: string;
	email: string;
	avatar?: string;
}

interface UpdateUserArgs {
	name: string;
}

const USER_KEY = "/api/user";

export function useUser() {
	const { data, error, isLoading } = useSWR<User, Error>(
		USER_KEY,
		(url: string) => fetcher<User>(url),
	);

	const { trigger, isMutating } = useSWRMutation<
		User,
		Error,
		string,
		UpdateUserArgs
	>(
		USER_KEY,
		(url, { arg }) =>
			fetcher<User>(url, {
				method: "POST",
				body: JSON.stringify(arg),
				headers: { "Content-Type": "application/json" },
			}),
		{
			populateCache: true,
			revalidate: false,
		},
	);

	const updateUser = async (args: any) => {
		try {
			const result = await trigger(args);
			return {
				success: true,
				data: result,
			};
		} catch (e) {
			const err = e as Error;
			console.error("Update failed:", err.message);
			return {
				success: false,
				message: err.message || "An unexpected error occurred.",
			};
		}
	};

	return {
		user: data,
		isLoading,
		isMutating,
		error,
		updateUser,
	};
}
