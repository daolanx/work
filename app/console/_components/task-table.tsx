"use client";
import {
	IconCircleCheckFilled,
	IconDots,
	IconTrash,
	IconLoader,
	IconEye,
} from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTasks } from "../_hooks/useTasks";
import { CardTable } from "./card-table";

export default function TaskPage() {
	const columns = useMemo<ColumnDef<any>[]>(
		() => [
			{
				accessorKey: "header",
				id: "header",
				header: "Header",
				cell: ({ row }) => {
					return (
						<Link
							className="underline-offset-4 transition-colors hover:text-primary hover:underline"
							href={`/console/tasks/${row.original.id}`}
						>
							{row.original.header}
						</Link>
					);
				},
			},
			{
				accessorKey: "type",
				id: "type",
				header: "Type",
				cell: ({ row }) => <Badge variant="outline">{row.original.type}</Badge>,
			},
			{
				accessorKey: "status",
				id: "status",
				header: "Status",
				cell: ({ row }) => (
					<Badge
						className="font-normal text-muted-foreground"
						variant="outline"
					>
						{row.original.status === "Done" ? (
							<IconCircleCheckFilled className="mr-1 size-4 fill-green-500" />
						) : (
							<IconLoader className="mr-1 size-4 animate-spin" />
						)}
						{row.original.status}
					</Badge>
				),
			},
			{
				accessorKey: "target",
				id: "target",
				header: () => <div className="text-right">Target</div>,
				cell: ({ row }) => (
					<div className="text-right tabular-nums">
						{row.original.target ?? "-"}
					</div>
				),
			},
			{ accessorKey: "reviewer", id: "reviewer", header: "Reviewer" },
			{
				id: "actions",
				header: "Actions",
				enableHiding: false,
				cell: ({ row }) => (


					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="h-8 w-8 p-0" variant="ghost">
								<IconDots className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem asChild >
								<Link href={`/console/tasks/${row.original.id}`}>
									<IconEye />Detail
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="text-destructive">
								<IconTrash /> Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				),
			},
		],
		[],
	);

	return <CardTable columns={columns} header="Tasks" useDataHook={useTasks} />;
}
