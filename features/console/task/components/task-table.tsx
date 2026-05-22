"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import { CardTable } from "@/features/console/components/card-table";
import type { CardTableHandle } from "@/features/console/components/card-table/types";
import { getRelativeTimeString } from "@/lib/date";
import {
	TASK_CATEGORY_ENUMS,
	TASK_PRIORITY_ENUMS,
	TASK_STATUS_ENUMS,
} from "../constants";
import { useTasks } from "../hooks/use-task";
import { CellCategory } from "./cell-category";
import { CellPriority } from "./cell-priority";
import { CellStatus } from "./cell-status";
import { CreateTaskButton } from "./create-task-button";

export default function TaskTable({
	variant,
}: {
	variant?: "default" | "ghost";
}) {
	const t = useTranslations("console");
	const locale = useLocale();
	const tableRef = useRef<CardTableHandle>(null);
	const columns = [
		{
			accessorKey: "title",
			id: "title",
			header: t("tasks.title"),
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
			header: t("tasks.priority"),
			meta: {
				options: TASK_PRIORITY_ENUMS,
			},
			cell: ({ row }) => <CellPriority value={row.original.priority} />,
		},
		{
			accessorKey: "status",
			id: "status",
			header: t("tasks.status"),
			meta: {
				options: TASK_STATUS_ENUMS,
			},
			cell: ({ row }) => <CellStatus value={row.original.status} />,
		},
		{
			accessorKey: "category",
			id: "category",
			header: t("tasks.category"),
			meta: {
				options: TASK_CATEGORY_ENUMS,
			},
			cell: ({ row }) => <CellCategory value={row.original.category} />,
		},
		{
			accessorKey: "createdAt",
			id: "createdAt",
			header: t("tasks.created"),
			enableSorting: true,
			sortDescFirst: true,
			cell: ({ row }) => {
				const date = row.original.createdAt;
				if (!date) return <span className="text-slate-400">-</span>;
				return (
					<div
						title={new Intl.DateTimeFormat(locale, {
							dateStyle: "long",
							timeStyle: "short",
						}).format(new Date(date))}
					>
						{getRelativeTimeString(date)}
					</div>
				);
			},
		},
		{
			id: "actions",
			header: t("tasks.actions"),
			cell: ({ row }) => (
				<Link
					className="text-slate-900 hover:text-blue-600 hover:underline"
					href={`/console/tasks/${row.original.id}`}
				>
					{t("tasks.detail")}
				</Link>
			),
		},
	];
	const handleCreateSuccess = (newTaskId: string) => {
		tableRef.current?.reset();
		if (newTaskId) {
			tableRef.current?.flashTableRow(newTaskId);
		}
	};

	return (
		<CardTable
			columns={columns}
			header={t("tasks.tasks")}
			ref={tableRef}
			toolbar={<CreateTaskButton onSuccess={handleCreateSuccess} />}
			useDataHook={useTasks}
			variant={variant}
		/>
	);
}
