"use client";

import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { authClient } from "@/features/console/auth/lib/client";
import type { Role } from "../../constants";
import { ADMIN_USERS_KEY, ROLES } from "../../constants";

type AdminUser = {
	id: string;
	email: string;
	name: string;
	role: Role;
	banned: boolean;
	image?: string;
	createdAt: string;
};

export function UserRoleSelect({ user }: { user: AdminUser }) {
	const { mutate: globalMutate } = useSWRConfig();
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
			onSuccess: () => {
				globalMutate(ADMIN_USERS_KEY);
				toast.success("Role updated");
			},
		},
	);

	const config = {
		[ROLES.admin]: {
			icon: <ShieldCheck className="mr-2 h-4 w-4" />,
			label: "Demote to User",
			targetRole: ROLES.user,
		},
		[ROLES.user]: {
			icon: <ShieldAlert className="mr-2 h-4 w-4" />,
			label: "Promote to Admin",
			targetRole: ROLES.admin,
		},
	} as const;

	const roleConfig = config[user.role as keyof typeof config];

	if (!roleConfig) return null;

	return (
		<DropdownMenuItem
			disabled={setUserRole.isMutating}
			onSelect={(e) => {
				e.preventDefault();
				setUserRole.trigger({ userId: user.id, role: roleConfig.targetRole });
			}}
		>
			{setUserRole.isMutating ? (
				<Loader2 className="mr-2 h-4 w-4 animate-spin" />
			) : (
				roleConfig.icon
			)}
			{roleConfig.label}
		</DropdownMenuItem>
	);
}
