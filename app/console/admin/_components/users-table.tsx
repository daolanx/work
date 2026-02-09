"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { AdminActions, AdminUser } from "../_hooks/use-admin-users";
import { UserActions } from "./user-actions";

interface UsersTableProps {
	users: AdminUser[];
	currentUserId: string;
	// Use the automated type we extracted from the hook
	actions: AdminActions;
}

export function UsersTable({ users, currentUserId, actions }: UsersTableProps) {
	return (
		<div className="rounded-md">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>User</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell>
								<div className="flex items-center gap-3">
									{/* Avatar Implementation */}
									<Avatar className="h-9 w-9">
										<AvatarImage alt={user.name} src={user.image} />
										<AvatarFallback className="text-xs">
											{user.name?.slice(0, 2).toUpperCase() || "??"}
										</AvatarFallback>
									</Avatar>

									<div className="flex flex-col">
										<div className="mb-1 font-medium leading-none">
											{user.name}
											{user.id === currentUserId && (
												<span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground uppercase tracking-wider">
													You
												</span>
											)}
										</div>
										<div className="text-muted-foreground text-xs">
											{user.email}
										</div>
									</div>
								</div>
							</TableCell>

							<TableCell>
								<Badge
									variant={user.role === "admin" ? "default" : "secondary"}
								>
									{user.role}
								</Badge>
							</TableCell>

							<TableCell>
								{user.banned ? (
									<Badge variant="destructive">Banned</Badge>
								) : (
									<Badge
										className="border-green-200 bg-green-50/50 text-green-600"
										variant="outline"
									>
										Active
									</Badge>
								)}
							</TableCell>

							<TableCell className="text-right">
								<UserActions
									currentUserId={currentUserId}
									user={user}
									{...actions}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
