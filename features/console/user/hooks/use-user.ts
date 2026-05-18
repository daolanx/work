"use client";

import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import type { UpdateUserInput } from "@/features/console/auth/schemas";
import { updateUser } from "@/features/console/user/services";
import { fetcher } from "@/lib/fetcher";

const USER_KEY = "user-profile";
const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_USER_EMAIL;

type UserProfile = {
	id: string;
	name: string;
	email: string;
	image: string | null;
	role: string | null;
	createdAt: Date;
	emailVerified: boolean;
};

export function useUser() {
	const {
		data: user,
		isLoading,
		error,
	} = useSWR<UserProfile>(USER_KEY, () =>
		fetcher<UserProfile>("/api/console/user/profile"),
	);

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
