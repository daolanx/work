"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { CardTable } from "../../_components/card-table";
import { useTasks } from "../../_hooks/use-task";
import { CellCategory } from "./cell-category";
import { CellPriority } from "./cell-priority";
import { CellStatus } from "./cell-status";
import { CreateTaskButton } from "./create-task-button";

export default function TaskTable({
	variant,
}: {
	variant?: "default" | "ghost";
}) {
	const columns = useMemo<ColumnDef<any>[]>(
		() => [
			{
				accessorKey: "title",
				id: "title",
				header: "Title",
				cell: ({ row }) => (
					<Link
						className="font-medium text-slate-900 hover:text-blue-600 hover:underline"
						href={`/console/tasks/${row.original.id}`}
					>
						{row.original.title}
					</Link>
				),
			},
			{
				accessorKey: "priority",
				id: "priority",
				header: "Priority",
				cell: ({ row }) => <CellPriority value={row.original.priority} />,
			},
			{
				accessorKey: "status",
				id: "status",
				header: "Status",
				cell: ({ row }) => <CellStatus value={row.original.status} />,
			},
			{
				accessorKey: "category",
				id: "category",
				header: "Category",
				cell: ({ row }) => <CellCategory value={row.original.category} />,
			},
			{
				id: "actions",
				header: "Actions",

				cell: ({ row }) => (
					<Link
						className="text-slate-900 hover:text-blue-600 hover:underline"
						href={`/console/tasks/${row.original.id}`}
					>
						Detail
					</Link>
				),
			},
		],
		[],
	);

	return (
		<CardTable
			columns={columns}
			header="Tasks"
			toolbar={<CreateTaskButton />}
			useDataHook={useTasks}
			variant={variant}
		/>
	);
}
