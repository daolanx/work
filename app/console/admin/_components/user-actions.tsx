"use client";

import {
	Ban,
	CheckCircle,
	Loader2,
	MoreHorizontal,
	ShieldAlert,
	ShieldCheck,
} from "lucide-react";
import { Fragment, useMemo, useState } from "react";
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
import type { AdminActions, AdminUser } from "../_hooks/use-admin-users";

interface UserActionsProps extends AdminActions {
	user: AdminUser;
	currentUserId: string;
}

export function UserActions({
	user,
	currentUserId,
	banUser,
	setUserRole,
	unbanUser,
}: UserActionsProps) {
	const [isPending, setIsPending] = useState(false);
	const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
	const [banReason, setBanReason] = useState("");

	const isSelf = user.id === currentUserId;

	/**
	 * REFINED: A Higher-Order Function that wraps async actions
	 * This removes the need to write "await handleAction(() => ...)" repeatedly.
	 */
	const wrapAction =
		(fn: (...args: any[]) => Promise<void>) =>
		async (...args: any[]) => {
			if (isPending) return;
			setIsPending(true);
			try {
				await fn(...args);
			} finally {
				setIsPending(false);
			}
		};

	/**
	 * Pre-wrap the functions to clean up the configuration section
	 */
	const onToggleRole = wrapAction(() =>
		setUserRole(user.id, user.role === "admin" ? "user" : "admin"),
	);
	const onUnban = wrapAction(() => unbanUser(user.id));
	const onConfirmBan = wrapAction(async () => {
		await banUser(user.id, banReason);
		setIsBanDialogOpen(false);
	});

	const menuGroups = useMemo(
		() => [
			{
				label: "role-management",
				items: [
					{
						label: "Toggle Role",
						show: true,
						render: () => (
							<DropdownMenuItem onClick={onToggleRole}>
								{user.role === "admin" ? (
									<>
										<ShieldCheck className="mr-2 h-4 w-4" /> Demote to User
									</>
								) : (
									<>
										<ShieldAlert className="mr-2 h-4 w-4" /> Promote to Admin
									</>
								)}
							</DropdownMenuItem>
						),
					},
				],
			},
			{
				label: "access-control",
				items: [
					{
						label: "Unban User",
						show: user.banned,
						render: () => (
							<DropdownMenuItem
								className="font-medium text-green-600"
								onClick={onUnban}
							>
								<CheckCircle className="mr-2 h-4 w-4" /> Unban User
							</DropdownMenuItem>
						),
					},
					{
						label: "Ban User",
						show: !user.banned,
						render: () => (
							<DropdownMenuItem
								className="text-red-600"
								onClick={() => setIsBanDialogOpen(true)}
							>
								<Ban className="mr-2 h-4 w-4" /> Ban User
							</DropdownMenuItem>
						),
					},
				],
			},
		],
		[user, onToggleRole, onUnban],
	); // Dependencies are now much cleaner

	const activeGroups = useMemo(() => {
		return menuGroups
			.map((group) => ({
				...group,
				items: group.items.filter((item) => item.show),
			}))
			.filter((group) => group.items.length > 0);
	}, [menuGroups]);

	if (isSelf) return <div className="text-center text-muted-foreground">-</div>;

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className="h-8 w-8 p-0" disabled={isPending} variant="ghost">
						{isPending ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<MoreHorizontal className="h-4 w-4" />
						)}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-48">
					{activeGroups.map((group, groupIndex) => (
						<Fragment key={group.label}>
							{group.items.map((item) => (
								<Fragment key={item.label}>{item.render()}</Fragment>
							))}
							{groupIndex < activeGroups.length - 1 && (
								<DropdownMenuSeparator />
							)}
						</Fragment>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog onOpenChange={setIsBanDialogOpen} open={isBanDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Ban User: {user.name}</DialogTitle>
					</DialogHeader>
					<div className="py-4">
						<Input
							onChange={(e) => setBanReason(e.target.value)}
							onKeyDown={(e) =>
								e.key === "Enter" &&
								!isPending &&
								banReason.trim() &&
								onConfirmBan()
							}
							placeholder="Reason for ban"
							value={banReason}
						/>
					</div>
					<DialogFooter>
						<Button onClick={() => setIsBanDialogOpen(false)} variant="outline">
							Cancel
						</Button>
						<Button
							disabled={isPending || !banReason.trim()}
							onClick={onConfirmBan}
							variant="destructive"
						>
							Confirm Ban
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
