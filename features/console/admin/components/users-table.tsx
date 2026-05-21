"use client";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	type Table as ReactTable,
	useReactTable,
} from "@tanstack/react-table";
import { RefreshCw } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	ProtectAction,
	ProtectSection,
} from "@/features/console/components/protect";
import { useUser } from "@/features/console/user/hooks/use-user";
import { cn } from "@/lib/utils";
import { ROLES } from "../../constants";
import type { AdminUser } from "../hooks/use-admin";
import { useAdminUsers } from "../hooks/use-admin";
import { AdminActions } from "./admin-actions";

export function UsersTable() {
	const { user: currentUser } = useUser();
	const { users, isLoading, isValidating } = useAdminUsers();

	const columns: ColumnDef<AdminUser>[] = [
		{
			accessorKey: "name",
			header: "User",
			cell: ({ row }) => {
				const user = row.original;
				return (
					<div className="flex items-center gap-3">
						<Avatar className="h-9 w-9">
							<AvatarImage alt={user.name} src={user.image} />
							<AvatarFallback className="text-xs">
								{user.name?.slice(0, 2).toUpperCase() || "??"}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<div className="mb-1 font-medium leading-none">
								{user.name}
								{user.id === currentUser?.id && (
									<span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground uppercase tracking-wider">
										You
									</span>
								)}
							</div>
							<div className="text-muted-foreground text-xs">{user.email}</div>
						</div>
					</div>
				);
			},
		},
		{
			accessorKey: "role",
			header: "Role",
			cell: ({ row }) => (
				<Badge
					variant={row.original.role === "admin" ? "default" : "secondary"}
				>
					{row.original.role}
				</Badge>
			),
		},
		{
			accessorKey: "banned",
			header: "Status",
			cell: ({ row }) =>
				row.original.banned ? (
					<Badge variant="destructive">Banned</Badge>
				) : (
					<Badge
						className="border-green-200 bg-green-50/50 text-green-600"
						variant="outline"
					>
						Active
					</Badge>
				),
		},
		{
			id: "actions",
			header: () => <div className="text-right">Actions</div>,
			cell: ({ row }) => (
				<div className="text-right">
					<AdminActions accountId={currentUser?.id ?? ""} user={row.original} />
				</div>
			),
		},
	];

	const table = useReactTable({
		data: users,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<ProtectSection access={ROLES.admin}>
			<div
				className={cn(
					"rounded-md",
					isValidating && !isLoading && "pointer-events-none opacity-60",
				)}
			>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell
									className="h-24 text-center"
									colSpan={columns.length}
								>
									Loading...
								</TableCell>
							</TableRow>
						) : table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									className="h-24 text-center"
									colSpan={columns.length}
								>
									No users.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</ProtectSection>
	);
}

export function RefreshTableButton() {
	const { mutate, isLoading, isValidating } = useAdminUsers();
	const refreshing = isValidating && !isLoading;

	return (
		<ProtectAction access={ROLES.admin}>
			<Button
				disabled={refreshing}
				onClick={() => mutate()}
				size="sm"
				variant="outline"
			>
				{refreshing ? (
					<Spinner className="mr-2" />
				) : (
					<RefreshCw className="mr-2 h-4 w-4" />
				)}
				Refresh
			</Button>
		</ProtectAction>
	);
}
