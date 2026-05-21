"use client";

import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { authClient } from "@/features/console/auth/lib/client";

export type AdminUser = {
	id: string;
	email: string;
	name: string;
	role: "admin" | "user";
	banned: boolean;
	image?: string;
	createdAt: string;
};

const ADMIN_USERS_KEY = "admin-users";

export function useAdminUsers() {
	const {
		data: users = [],
		isLoading,
		isValidating,
		mutate,
	} = useSWR<AdminUser[]>(ADMIN_USERS_KEY, async () => {
		const { data } = await authClient.admin.listUsers({
			query: { limit: 100 },
		});
		return (data?.users ?? []) as unknown as AdminUser[];
	});

	const banUser = useSWRMutation(
		ADMIN_USERS_KEY,
		async (_key, { arg }: { arg: { userId: string; reason: string } }) => {
			await authClient.admin.banUser({
				userId: arg.userId,
				banReason: arg.reason,
			});
		},
		{
			revalidate: false,
			onSuccess: async () => {
				await mutate();
				toast.success("User banned successfully");
			},
		},
	);

	const unbanUser = useSWRMutation(
		ADMIN_USERS_KEY,
		async (_key, { arg }: { arg: { userId: string } }) => {
			await authClient.admin.unbanUser({ userId: arg.userId });
		},
		{
			revalidate: false,
			onSuccess: async () => {
				await mutate();
				toast.success("User unbanned successfully");
			},
		},
	);

	const setUserRole = useSWRMutation(
		ADMIN_USERS_KEY,
		async (
			_key,
			{ arg }: { arg: { userId: string; role: AdminUser["role"] } },
		) => {
			await authClient.admin.setRole({ userId: arg.userId, role: arg.role });
		},
		{
			revalidate: false,
			onSuccess: async () => {
				await mutate();
				toast.success("Role updated");
			},
		},
	);

	return {
		users,
		isLoading,
		isValidating,
		mutate,
		banUser,
		unbanUser,
		setUserRole,
	};
}

// --- MAGIC PART: Automatic Type Extraction ---
type UseAdminUsersReturn = ReturnType<typeof useAdminUsers>;

export type AdminActions = Pick<
	UseAdminUsersReturn,
	"banUser" | "unbanUser" | "setUserRole"
>;
