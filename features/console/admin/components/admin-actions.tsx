"use client";

import {
	Ban,
	CheckCircle,
	Loader2,
	MoreHorizontal,
	ShieldAlert,
	ShieldCheck,
} from "lucide-react";
import { Fragment, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { AsyncActionItem } from "../../components/actions/async-dropdown-item";
import { ROLES } from "../../constants";
import type { AdminUser } from "../hooks/use-admin";
import { useAdminUsers } from "../hooks/use-admin";

/* ------------------------------------------------------------------ */
/*  ToggleRoleUserAction                                              */
/* ------------------------------------------------------------------ */

function ActionToggleUserRole({ user }: { user: AdminUser }) {
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
		<AsyncActionItem
			icon={roleConfig.icon}
			onSelect={() =>
				setUserRole.trigger({ userId: user.id, role: roleConfig.targetRole })
			}
		>
			{roleConfig.label}
		</AsyncActionItem>
	);
}

/* ------------------------------------------------------------------ */
/*  ActionUserAccessControl — Ban / Unban                                  */
/* ------------------------------------------------------------------ */

function ActionUserAccessControl({ user }: { user: AdminUser }) {
	const { banUser, unbanUser } = useAdminUsers();
	const [open, setOpen] = useState(false);
	const [reason, setReason] = useState("");

	const handleConfirmBan = async () => {
		await banUser.trigger({ userId: user.id, reason });
		setOpen(false);
		setReason("");
	};

	if (user.banned) {
		return (
			<AsyncActionItem
				className="font-medium text-green-600"
				icon={<CheckCircle className="mr-2 h-4 w-4" />}
				onSelect={() => unbanUser.trigger({ userId: user.id })}
			>
				Unban User
			</AsyncActionItem>
		);
	}

	return (
		<>
			<DropdownMenuItem
				className="text-red-600"
				onSelect={(e) => {
					e.preventDefault();
					setOpen(true);
				}}
			>
				<Ban className="mr-2 h-4 w-4" />
				Ban User
			</DropdownMenuItem>

			<Dialog onOpenChange={setOpen} open={open}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Ban User: {user.name}</DialogTitle>
					</DialogHeader>
					<div className="py-4">
						<Input
							disabled={banUser.isMutating}
							onChange={(e) => setReason(e.target.value)}
							placeholder="Reason for ban"
							value={reason}
						/>
					</div>
					<DialogFooter>
						<Button onClick={() => setOpen(false)} variant="outline">
							Cancel
						</Button>
						<Button
							disabled={banUser.isMutating}
							onClick={handleConfirmBan}
							variant="destructive"
						>
							{banUser.isMutating && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Confirm Ban
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}

interface UserActionsProps {
	user: AdminUser;
	accountId: string;
}

export function AdminActions({ user, accountId }: UserActionsProps) {
	if (user.id === accountId) {
		return <div className="text-center text-muted-foreground">-</div>;
	}

	const items = [
		<ActionToggleUserRole key="role" user={user} />,
		<ActionUserAccessControl key="access" user={user} />,
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
