"use client";

import { IconLayoutColumns } from "@tabler/icons-react";
import {
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
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
import { cn } from "@/lib/utils";
import { DataTableColumnHeader } from "./table-column-header";
import { TableFacedFilters } from "./table-faced-fliters";
import { TablePagination } from "./table-pagination";
import { TableRowsSkeleton } from "./table-rows-skeleton";
import type { DataTableProps, TableBodyContentProps } from "./types";

interface ExtendedDataTableProps<T> extends DataTableProps<T> {
	variant?: "default" | "ghost";
}

export function CardTable<T>({
	header,
	columns,
	useDataHook,
	toolbar,
	initialPageSize = 10,
	variant = "default",
}: ExtendedDataTableProps<T>) {
	// Centralized state for server-side operations
	const [filters, setFilters] = useState({
		pageIndex: 0,
		pageSize: initialPageSize,
		searchKey: "",
		columnFilters: [] as ColumnFiltersState,
	});

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const isGhost = variant === "ghost";

	// Fetch data based on current filter/pagination state
	const { res, isLoading } = useDataHook(filters);

	const memoData = useMemo(() => res?.list ?? [], [res?.list]);
	const memoColumn = useMemo(() => columns, [columns]);

	const table = useReactTable({
		data: memoData,
		columns: memoColumn,
		state: {
			pagination: { pageIndex: filters.pageIndex, pageSize: filters.pageSize },
			columnVisibility,
			columnFilters: filters.columnFilters,
		},
		manualPagination: true,
		manualFiltering: true,
		rowCount: res?.total ?? 0,
		onPaginationChange: (updater) => {
			setFilters((prev) => {
				const next =
					typeof updater === "function"
						? updater({ pageIndex: prev.pageIndex, pageSize: prev.pageSize })
						: updater;
				return { ...prev, ...next };
			});
		},
		onColumnFiltersChange: (updater) => {
			setFilters((prev) => {
				const next =
					typeof updater === "function" ? updater(prev.columnFilters) : updater;
				// Reset to first page when filters change
				return { ...prev, columnFilters: next, pageIndex: 0 };
			});
		},
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
	});

	const handleSearch = useCallback((val: string) => {
		setFilters((prev) => ({ ...prev, searchKey: val, pageIndex: 0 }));
	}, []);

	return (
		<Card
			className={cn(
				"transition-all",
				isGhost && "border-none bg-transparent shadow-none",
			)}
		>
			<CardHeader
				className={cn(
					"flex flex-row items-center justify-between space-y-0",
					isGhost && "px-0 pt-0",
				)}
			>
				<CardTitle>{header}</CardTitle>
				<CardAction>
					<div className="flex items-center gap-2">
						<SearchInput onSearch={handleSearch} />

						{/* Column Visibility Toggle */}
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
											key={column.id}
											onCheckedChange={(v) => column.toggleVisibility(!!v)}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									))}
							</DropdownMenuContent>
						</DropdownMenu>
						{toolbar}
					</div>
				</CardAction>
			</CardHeader>

			<CardContent className={isGhost ? "px-0 pb-0" : ""}>
				{/* Active Filter Badges */}
				<TableFacedFilters table={table} />

				<div className="rounded-md border">
					<Table>
						<TableHeader className="bg-muted/50">
							{table.getHeaderGroups().map((hg) => (
								<TableRow key={hg.id}>
									{hg.headers.map((h) => (
										<TableHead className="p-0" key={h.id}>
											<DataTableColumnHeader
												column={h.column}
												title={flexRender(
													h.column.columnDef.header,
													h.getContext(),
												)}
											/>
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							<TableBodyContent
								columnCount={columns.length}
								isLoading={isLoading}
								pageSize={filters.pageSize}
								rows={table.getRowModel().rows}
							/>
						</TableBody>
					</Table>
				</div>

				<TablePagination
					onPageChange={(idx) => table.setPageIndex(idx)}
					onPageSizeChange={(size) => table.setPageSize(size)}
					pageIndex={filters.pageIndex}
					pageSize={filters.pageSize}
					total={res?.total ?? 0}
				/>
			</CardContent>
		</Card>
	);
}

/**
 * Sub-component to handle Table Body rendering states (Loading, Empty, Data)
 */
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
