"use client";

import {
	IconChevronLeft,
	IconChevronRight,
	IconCircleCheckFilled,
	IconDotsVertical,
	IconLayoutColumns,
	IconLoader,
	IconPlus,
} from "@tabler/icons-react";
import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

import { z } from "zod";
import { type PaginationParams, useTasks } from "@/app/hooks/useTasks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

function TableSkeleton() {
	const rows = ["sk1", "sk2", "sk3", "sk4", "sk5"];
	return (
		<div className="rounded-md border">
			<div className="h-10 border-b bg-muted/50" />
			<div className="divide-y">
				{rows.map((id) => (
					<div className="flex h-12 items-center space-x-4 px-4" key={id}>
						<Skeleton className="h-4 w-4" />
						<Skeleton className="h-4 w-1/4" />
						<Skeleton className="h-4 w-1/6" />
						<Skeleton className="h-4 w-1/12" />
						<Skeleton className="h-4 w-1/12" />
						<Skeleton className="h-4 w-1/4" />
					</div>
				))}
			</div>
		</div>
	);
}

export const schema = z.object({
	id: z.number(),
	header: z.string(),
	type: z.string(),
	status: z.string(),
	target: z.any(),
	limit: z.any(),
	reviewer: z.string(),
});

const columns: ColumnDef<z.infer<typeof schema>>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
				/>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "header",
		header: "Header",
		cell: ({ row }) => <TableCellViewer item={row.original} />,
		enableHiding: false,
	},
	{
		accessorKey: "type",
		header: "Section Type",
		cell: ({ row }) => (
			<Badge className="px-1.5 text-muted-foreground" variant="outline">
				{row.original.type}
			</Badge>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<Badge className="px-1.5 text-muted-foreground" variant="outline">
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
		header: () => <div className="text-right">Target</div>,
		cell: ({ row }) => (
			<div className="pr-4 text-right">{row.original.target}</div>
		),
	},
	{
		accessorKey: "limit",
		header: () => <div className="text-right">Limit</div>,
		cell: ({ row }) => (
			<div className="pr-4 text-right">{row.original.limit}</div>
		),
	},
	{
		accessorKey: "reviewer",
		header: "Reviewer",
		cell: ({ row }) => row.original.reviewer,
	},
	{
		id: "actions",
		cell: () => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className="size-8" size="icon" variant="ghost">
						<IconDotsVertical className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>Edit</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		),
	},
];

export function DataTable() {
	const [pagination, setPagination] = React.useState<PaginationParams>({
		pageIndex: 0,
		pageSize: 10,
	});

	const { res, isLoading } = useTasks(pagination);
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const table = useReactTable({
		data: res?.list ?? [],
		columns,
		state: {
			pagination,
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
		},
		manualPagination: true,
		rowCount: res?.total ?? 0,
		onPaginationChange: setPagination,
		getRowId: (row) => row.id.toString(),
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,

		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	return (
		<Tabs className="w-full flex-col gap-6" defaultValue="outline">
			<div className="flex items-center justify-between px-4 lg:px-6">
				<TabsList>
					<TabsTrigger value="outline">Outline</TabsTrigger>
					<TabsTrigger value="past-performance">Past Performance</TabsTrigger>
				</TabsList>
				<div className="flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size="sm" variant="outline">
								<IconLayoutColumns className="mr-2 size-4" />
								Columns
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
					<Button size="sm">
						<IconPlus className="mr-2 size-4" />
						Add Section
					</Button>
				</div>
			</div>

			<TabsContent className="px-4 lg:px-6" value="outline">
				{isLoading ? (
					<TableSkeleton />
				) : (
					<div className="rounded-md border">
						<Table>
							<TableHeader className="bg-muted/50">
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<TableHead key={header.id}>
												{flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
											</TableHead>
										))}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
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
											No results.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				)}

				<div className="flex items-center justify-between py-4">
					<div className="flex items-center gap-4">
						<div className="text-muted-foreground text-sm">
							Total {res?.total ?? 0} items
						</div>
						<select
							className="h-8 w-[70px] rounded-md border bg-transparent text-xs"
							onChange={(e) => {
								table.setPageSize(Number(e.target.value));
							}}
							value={pagination.pageSize}
						>
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<option key={pageSize} value={pageSize}>
									{pageSize} / page
								</option>
							))}
						</select>
					</div>
					<div className="flex items-center gap-2">
						<Button
							disabled={!table.getCanPreviousPage() || isLoading}
							onClick={() => table.previousPage()}
							size="icon"
							variant="outline"
						>
							<IconChevronLeft className="size-4" />
						</Button>

						<span className="font-medium text-sm">
							{pagination.pageIndex + 1} / {table.getPageCount()}
						</span>

						<Button
							disabled={!table.getCanNextPage() || isLoading}
							onClick={() => table.nextPage()}
							size="icon"
							variant="outline"
						>
							<IconChevronRight className="size-4" />
						</Button>
					</div>
				</div>
			</TabsContent>
		</Tabs>
	);
}

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
	const isMobile = useIsMobile();
	return (
		<Drawer direction={isMobile ? "bottom" : "right"}>
			<DrawerTrigger asChild>
				<Button
					className="h-auto p-0 font-medium text-foreground"
					variant="link"
				>
					{item.header}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm p-6">
					<DrawerHeader>
						<DrawerTitle>{item.header}</DrawerTitle>
						<DrawerDescription>
							Details for section: {item.type}
						</DrawerDescription>
					</DrawerHeader>
					<div className="space-y-4 py-4">
						<div className="grid gap-2">
							<Label>Status</Label>
							<Input readOnly value={item.status} />
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label>Target</Label>
								<Input readOnly value={item.target} />
							</div>
							<div className="grid gap-2">
								<Label>Limit</Label>
								<Input readOnly value={item.limit} />
							</div>
						</div>
					</div>
					<DrawerFooter className="px-0">
						<DrawerClose asChild>
							<Button variant="outline">Close</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
