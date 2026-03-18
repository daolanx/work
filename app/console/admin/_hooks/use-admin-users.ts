"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";

export type AdminUser = {
	id: string;
	email: string;
	name: string;
	role: "admin" | "user";
	banned: boolean;
	image?: string;
	createdAt: string;
};

export function useAdminUsers() {
	const [users, setUsers] = useState<AdminUser[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchUsers = useCallback(async () => {
		setIsLoading(true);
		try {
			const { data } = await authClient.admin.listUsers({
				query: { limit: 100 },
			});
			if (data) {
				setUsers(data.users as unknown as AdminUser[]);
			}
		} catch (_error) {
			toast.error("Failed to fetch users");
		} finally {
			setIsLoading(false);
		}
	}, []);

	const banUser = async (userId: string, reason: string) => {
		await authClient.admin.banUser({ userId, banReason: reason });
		toast.success("User banned successfully");
		await fetchUsers(); // Refresh state
	};

	const unbanUser = async (userId: string) => {
		await authClient.admin.unbanUser({ userId });
		toast.success("User unbanned successfully");
		await fetchUsers(); // Refresh state
	};

	const setUserRole = async (userId: string, role: AdminUser["role"]) => {
		await authClient.admin.setRole({ userId, role });
		toast.success(`Role updated to ${role}`);
		await fetchUsers(); // Refresh state
	};

	return {
		users,
		isLoading,
		fetchUsers,
		actions: {
			banUser,
			unbanUser,
			setUserRole,
		},
	};
}

// --- MAGIC PART: Automatic Type Extraction ---
// 1. Get the return type of the hook function
type UseAdminUsersReturn = ReturnType<typeof useAdminUsers>;

// 2. Extract specifically the 'actions' property type
export type AdminActions = UseAdminUsersReturn["actions"];
