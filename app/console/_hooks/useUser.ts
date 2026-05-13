"use client";

import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getUser, updateUser } from "@/app/console/_actions/user";
import type { UpdateUserInput } from "@/lib/auth/schemas";

const USER_KEY = "user-profile";
const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_USER_EMAIL;

export function useUser() {
	const { data: user, isLoading, error } = useSWR(USER_KEY, getUser);

	const isDemo = user?.email === DEMO_EMAIL;

	const { trigger, isMutating } = useSWRMutation(
		USER_KEY,
		(_key, { arg }: { arg: UpdateUserInput }) => updateUser(arg),
		{
			populateCache: (result) => result.data,
			revalidate: false,
			onSuccess: () => toast.success("Profile updated!"),
			onError: (err) => toast.error(err.message || "Update failed"),
		},
	);

	return {
		user,
		isLoading,
		error,
		isMutating,
		isDemo,
		updateUser: async (arg: UpdateUserInput) => {
			if (isDemo) {
				toast.info("Demo account: Changes are not allowed.");
				return false;
			}
			return await trigger(arg);
		},
	};
}
