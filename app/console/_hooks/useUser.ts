import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import type { UpdateUserInput } from "@/lib/auth/schemas";
import { fetcher } from "@/lib/fetcher";

const USER_KEY = "/api/console/user";
const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_USER_EMAIL;

export function useUser() {
	const { data: user, isLoading } = useSWR(USER_KEY);
	const isDemo = user?.email === DEMO_EMAIL;

	const { trigger, isMutating } = useSWRMutation(
		USER_KEY,
		(url, { arg }: { arg: UpdateUserInput }) =>
			fetcher(url, { method: "PATCH", body: JSON.stringify(arg) }),
		{
			populateCache: true,
			revalidate: false,
			onSuccess: () => toast.success("Profile updated!"),
			onError: (err) => toast.error(err.message || "Update failed"),
		},
	);

	const guardedUpdateUser = async (arg: UpdateUserInput) => {
		if (isDemo) {
			toast.info("Demo account: Changes are not allowed.");
			return false;
		}
		return await trigger(arg);
	};

	return {
		user,
		isLoading,
		isMutating,
		isDemo,
		updateUser: guardedUpdateUser,
	};
}
