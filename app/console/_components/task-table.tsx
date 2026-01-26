"use client";
import {
	IconCircleCheckFilled,
	IconDotsVertical,
	IconLoader,
} from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTasks } from "../_hooks/useTasks";
import { CardTable } from "./card-table";

export default function TaskPage() {
	const columns = useMemo<ColumnDef<any>[]>(
		() => [
			{
				id: "select",
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() && "indeterminate")
						}
						onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(v) => row.toggleSelected(!!v)}
					/>
				),
				enableHiding: false,
			},
			{ accessorKey: "header", id: "header", header: "Header" },
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
								<IconDotsVertical className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() =>
									navigator.clipboard.writeText(row.original.id.toString())
								}
							>
								Copy Task ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>View details</DropdownMenuItem>
							<DropdownMenuItem className="text-destructive">
								Delete
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
