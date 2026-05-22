import useSWR from "swr";
import { authClient } from "@/features/console/auth/lib/client";
import type { Role } from "../../constants";
import { ADMIN_USERS_KEY } from "../../constants";

type AdminUser = {
	id: string;
	email: string;
	name: string;
	role: Role;
	banned: boolean;
	image?: string;
	createdAt: string;
};

export function useUsers() {
	const { data, isLoading, isValidating, mutate } = useSWR<AdminUser[]>(
		ADMIN_USERS_KEY,
		async () => {
			const { data } = await authClient.admin.listUsers({
				query: { limit: 100 },
			});
			return (data?.users ?? []) as unknown as AdminUser[];
		},
	);
	return {
		data,
		mutate,
		isLoading,
		isValidating,
	};
}
