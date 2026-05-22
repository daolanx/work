"use client";

import {
	Ban,
	CheckCircle,
	Loader2,
	MoreHorizontal,
	ShieldAlert,
	ShieldCheck,
} from "lucide-react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Mutation, PromptMutation } from "../../components/mutations";
import { ROLES } from "../../constants";
import { type AdminUser, useAdminUsers } from "../hooks/use-admin";

/* ------------------------------------------------------------------ */
/*  ToggleRoleUserAction                                                 */
/* ------------------------------------------------------------------ */

function MutationToggleUserRole({ user }: { user: AdminUser }) {
	const { setUserRole } = useAdminUsers();

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
		<Mutation
			mutation={setUserRole}
			payload={{ userId: user.id, role: roleConfig.targetRole }}
		>
			{({ isMutating, trigger }) => (
				<DropdownMenuItem disabled={isMutating} onSelect={trigger}>
					{isMutating ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : (
						roleConfig.icon
					)}
					{roleConfig.label}
				</DropdownMenuItem>
			)}
		</Mutation>
	);
}

/* ------------------------------------------------------------------ */
/*  MutationUserAccessControl — Ban / Unban                             */
/* ------------------------------------------------------------------ */

function MutationUserAccessControl({ user }: { user: AdminUser }) {
	const { banUser, unbanUser } = useAdminUsers();

	if (user.banned) {
		return (
			<Mutation mutation={unbanUser} payload={{ userId: user.id }}>
				{({ isMutating, trigger }) => (
					<DropdownMenuItem
						className="font-medium text-green-600"
						disabled={isMutating}
						onSelect={trigger}
					>
						{isMutating ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							<CheckCircle className="mr-2 h-4 w-4" />
						)}
						Unban User
					</DropdownMenuItem>
				)}
			</Mutation>
		);
	}

	return (
		<PromptMutation
			confirmText="Confirm Ban"
			content={<Input name="reason" placeholder="Reason for ban" />}
			description="Please provide a reason for banning this user."
			getPayload={(formData) => ({
				userId: user.id,
				reason: (formData.get("reason") as string) || "",
			})}
			mutation={banUser}
			title={`Ban User: ${user.name}`}
		>
			{({ isMutating }) => (
				<DropdownMenuItem
					className="text-red-600"
					disabled={isMutating}
					onSelect={(e) => e.preventDefault()}
				>
					{isMutating ? (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<Ban className="mr-2 h-4 w-4" />
					)}
					Ban User
				</DropdownMenuItem>
			)}
		</PromptMutation>
	);
}

/* ------------------------------------------------------------------ */
/*  AdminActions — dropdown trigger                                    */
/* ------------------------------------------------------------------ */

interface AdminActionsProps {
	user: AdminUser;
	accountId: string;
}

export function AdminActions({ user, accountId }: AdminActionsProps) {
	if (user.id === accountId) {
		return <div className="text-center text-muted-foreground">-</div>;
	}

	const items = [
		<MutationToggleUserRole key="role" user={user} />,
		<MutationUserAccessControl key="access" user={user} />,
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="h-8 w-8 p-0" variant="ghost">
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				{items.map((item, i) => (
					<Fragment key={i}>
						{i > 0 && <DropdownMenuSeparator />}
						{item}
					</Fragment>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
