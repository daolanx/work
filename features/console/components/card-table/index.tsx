"use client";

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useImperativeHandle } from "react";

// UI Components
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
// Internal Logic & Components
import { useTableFilter } from "./hooks/use-table-filter";
import { useTableRowFlash } from "./hooks/use-table-row-flash";
import { DataTableColumnHeader } from "./table-column-header";
import { TableColumnToggle } from "./table-column-toggle";
import { TableFacedFilters } from "./table-faced-fliters";
import { TablePagination } from "./table-pagination";
import { TableRowsSkeleton } from "./table-rows-skeleton";
import { TableSearch } from "./table-search";
import type { CardTableHandle, ExtendedDataTableProps } from "./types";

/**
 * CardTable Component
 * A highly decoupled table component that separates state management (filters),
 * data fetching, and UI rendering.
 */
function CardTable<T>({
	header,
	columns,
	useDataHook,
	toolbar,
	initialPageSize = 10,
	variant = "default",
	ref,
}: ExtendedDataTableProps<T> & { ref?: React.Ref<CardTableHandle> }) {
	// Temporary state for highlighting a specific row (e.g., after creation/update)
	const { triggerTableRowFlash, isRowFlashed } = useTableRowFlash();

	/**
	 * 1. State Management
	 * Uses a unique header key to retrieve or create a persistent filter store.
	 */
	const filter = useTableFilter(header as string, initialPageSize);

	/**
	 * 2. Data Fetching
	 * Subscribes to filter state changes. The hook re-runs automatically when
	 * pagination, search, or filters update.
	 */
	const { res, isLoading } = useDataHook(filter);

	/**
	 * 3. Table Instance
	 * Core logic for TanStack Table. Note that we use 'manual' modes because
	 * sorting, filtering, and pagination are handled server-side via useDataHook.
	 */
	const table = useReactTable({
		data: res?.list ?? [],
		columns,
		state: {
			pagination: { pageIndex: filter.pageIndex, pageSize: filter.pageSize },
			columnFilters: filter.columnFilters,
			sorting: filter.sorting,
		},
		manualPagination: true,
		manualFiltering: true,
		manualSorting: true,
		defaultColumn: {
			enableSorting: false,
		},
		rowCount: res?.total ?? 0,
		onPaginationChange: (updater) => {
			const next =
				typeof updater === "function"
					? updater({ pageIndex: filter.pageIndex, pageSize: filter.pageSize })
					: updater;
			filter.setPagination(next);
		},
		onColumnFiltersChange: (updater) => {
			const next =
				typeof updater === "function" ? updater(filter.columnFilters) : updater;
			filter.setColumnFilters(next);
		},
		onSortingChange: (updater) => {
			const next =
				typeof updater === "function" ? updater(filter.sorting) : updater;
			filter.setSorting(next);
		},
		getCoreRowModel: getCoreRowModel(),
	});

	/**
	 * 4. Imperative API
	 * Exposes methods to parent components via ref.
	 */
	useImperativeHandle(ref, () => ({
		reset: () => {
			filter.reset();
		},
		flashTableRow(rowId) {
			triggerTableRowFlash(rowId);
		},
	}));

	const isGhost = variant === "ghost";

	return (
		<Card
			className={cn(
				"transition-all",
				isGhost && "border-none bg-transparent shadow-none",
			)}
		>
			<CardHeader
				className={cn(
					"flex flex-row items-center justify-between",
					isGhost && "px-0 pt-0",
				)}
			>
				<CardTitle>{header}</CardTitle>
				<CardAction className="flex items-center gap-2">
					{/* Flat access to filter state and actions */}
					<TableSearch
						defaultValue={filter.searchKey}
						onSearch={filter.setSearchKey}
					/>
					<TableColumnToggle table={table} />
					{toolbar}
				</CardAction>
			</CardHeader>

			<CardContent className={isGhost ? "px-0 pb-0" : ""}>
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
							{isLoading ? (
								<TableRowsSkeleton
									columnCount={columns.length}
									pageSize={filter.pageSize}
								/>
							) : table.getRowModel().rows.length === 0 ? (
								<TableRow>
									<TableCell
										className="h-24 text-center text-muted-foreground"
										colSpan={columns.length}
									>
										No Data.
									</TableCell>
								</TableRow>
							) : (
								table.getRowModel().rows.map((row) => {
									const isFlashRow = !!isRowFlashed?.(
										// eslint-disable-next-line @typescript-eslint/no-explicit-any
										(row.original as any).id,
									);
									return (
										<TableRow
											className={cn(
												"transition-colors duration-500",
												isFlashRow &&
													"animate-fade-out-highlight bg-green-100/50",
											)}
											key={row.id}
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</TableCell>
											))}
										</TableRow>
									);
								})
							)}
						</TableBody>
					</Table>
				</div>
				<TablePagination table={table} />
			</CardContent>
		</Card>
	);
}

export { CardTable };
