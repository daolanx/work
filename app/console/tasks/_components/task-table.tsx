"use client";

import { format } from "date-fns";
import Link from "next/link";
import { useRef } from "react";
import {
	TASK_CATEGORY_ENUMS,
	TASK_PRIORITY_ENUMS,
	TASK_STATUS_ENUMS,
} from "@/constants/task-enums";
import { getRelativeTimeString } from "@/lib/date";
import { CardTable, type CardTableHandle } from "../../_components/card-table";
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
	const columns = [
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
			meta: {
				options: TASK_PRIORITY_ENUMS,
			},
			cell: ({ row }) => <CellPriority value={row.original.priority} />,
		},
		{
			accessorKey: "status",
			id: "status",
			header: "Status",
			meta: {
				options: TASK_STATUS_ENUMS,
			},
			cell: ({ row }) => <CellStatus value={row.original.status} />,
		},
		{
			accessorKey: "category",
			id: "category",
			header: "Category",
			meta: {
				options: TASK_CATEGORY_ENUMS,
			},
			cell: ({ row }) => <CellCategory value={row.original.category} />,
		},
		{
			accessorKey: "createdAt",
			id: "createdAt",
			header: "Created",
			enableSorting: true,
			sortDescFirst: true,
			cell: ({ row }) => {
				const date = row.original.createdAt;
				if (!date) return <span className="text-slate-400">-</span>;
				return (
					<div title={format(new Date(date), "PPPpp")}>
						{getRelativeTimeString(date)}
					</div>
				);
			},
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
	];

	const tableRef = useRef<CardTableHandle>(null);
	const handleCreateSuccess = (newTaskId: string) => {
		if (newTaskId) {
			tableRef.current?.reset(newTaskId);
		} else {
			tableRef.current?.reset();
		}
	};

	return (
		<CardTable
			columns={columns}
			header="Tasks"
			ref={tableRef}
			toolbar={<CreateTaskButton onSuccess={handleCreateSuccess} />}
			useDataHook={useTasks}
			variant={variant}
		/>
	);
}
