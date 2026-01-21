"use client";

import { IconLayoutColumns } from "@tabler/icons-react";
import {
	flexRender,
	getCoreRowModel,
	type PaginationState,
	type RowSelectionState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { TablePagination } from "./table-pagination";
import { TableRowsSkeleton } from "./table-rows-skeleton";
import type { DataTableProps, TableBodyContentProps } from "./types";

export function CardTable<T>({
	header,
	columns,
	useDataHook,
	initialPageSize = 10,
}: DataTableProps<T>) {
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: initialPageSize,
	});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

	const { res, isLoading } = useDataHook({
		pageIndex: pagination.pageIndex,
		pageSize: pagination.pageSize,
	});

	const table = useReactTable({
		data: res?.list ?? [],
		columns,
		state: { pagination, columnVisibility, rowSelection },
		manualPagination: true,
		rowCount: res?.total ?? 0,
		onPaginationChange: setPagination,
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle>{header}</CardTitle>
				<CardAction>
					{" "}
					<div className="flex items-center justify-between">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button size="sm" variant="outline">
									<IconLayoutColumns className="mr-2 h-4 w-4" /> Column
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{table
									.getAllColumns()
									.filter((c) => c.getCanHide())
									.map((column) => (
										<DropdownMenuCheckboxItem
											checked={column.getIsVisible()}
											className="capitalize"
											key={column.id}
											onCheckedChange={(v) => column.toggleVisibility(!!v)}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className="overflow-hidden">
					<Table>
						<TableHeader className="bg-muted/50">
							{table.getHeaderGroups().map((hg) => (
								<TableRow key={hg.id}>
									{hg.headers.map((h) => (
										<TableHead key={h.id}>
											{h.isPlaceholder
												? null
												: flexRender(h.column.columnDef.header, h.getContext())}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							<TableBodyContent
								columnCount={columns.length}
								isLoading={isLoading}
								pageSize={pagination.pageSize}
								rows={table.getRowModel().rows}
							/>
						</TableBody>
					</Table>
				</div>
				<TablePagination
					onPageChange={table.setPageIndex}
					onPageSizeChange={table.setPageSize}
					pageIndex={pagination.pageIndex}
					pageSize={pagination.pageSize}
					total={res?.total ?? 0}
				/>
			</CardContent>
		</Card>
	);
}

function TableBodyContent<T>({
	rows,
	isLoading,
	columnCount,
	pageSize,
	emptyText = "No Data.",
}: TableBodyContentProps<T>) {
	if (isLoading) {
		return <TableRowsSkeleton columnCount={columnCount} pageSize={pageSize} />;
	}

	if (!rows.length) {
		return (
			<TableRow>
				<TableCell className="h-24 text-center" colSpan={columnCount}>
					{emptyText}
				</TableCell>
			</TableRow>
		);
	}

	return (
		<>
			{rows.map((row) => (
				<TableRow data-state={row.getIsSelected() && "selected"} key={row.id}>
					{row.getVisibleCells().map((cell) => (
						<TableCell key={cell.id}>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</TableCell>
					))}
				</TableRow>
			))}
		</>
	);
}
