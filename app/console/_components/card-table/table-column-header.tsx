"use client";

import {
	IconArrowDown,
	IconArrowsSort,
	IconArrowUp,
	IconFilter,
} from "@tabler/icons-react";
import type { Column } from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue> {
	column: Column<TData, TValue>;
	title: React.ReactNode;
}

interface HeaderActionButtonProps
	extends React.ComponentPropsWithoutRef<typeof Button> {
	isActive?: boolean;
	icon: React.ElementType;
	iconClassName?: string;
}

const HeaderActionButton = React.forwardRef<
	HTMLButtonElement,
	HeaderActionButtonProps
>(({ isActive, icon: Icon, className, iconClassName, ...props }, ref) => {
	return (
		<Button
			className={cn(
				"h-5 w-5 p-0 hover:bg-slate-200 focus-visible:ring-0 focus-visible:ring-offset-0",
				className,
			)}
			ref={ref}
			size="icon"
			variant="ghost"
			{...props}
		>
			<Icon
				className={cn(
					"h-3.5 w-3.5 transition-colors",
					isActive ? "text-blue-600" : "opacity-50",
					iconClassName,
				)}
			/>
		</Button>
	);
});

HeaderActionButton.displayName = "HeaderActionButton";

const ColumnSorter = ({ column }: { column: Column<any, any> }) => {
	const isSorted = column.getIsSorted();

	const SortIcon = useMemo(() => {
		if (isSorted === "desc") return IconArrowDown;
		if (isSorted === "asc") return IconArrowUp;
		return IconArrowsSort;
	}, [isSorted]);

	return (
		<HeaderActionButton
			icon={SortIcon}
			isActive={!!isSorted}
			onClick={() => column.toggleSorting(isSorted === "asc")}
		/>
	);
};

const ColumnFilter = ({
	column,
	options,
}: {
	column: Column<any, any>;
	options: { label: string; value: string }[];
}) => {
	const currentFilterValue = column.getFilterValue() as string[];
	const [tempValues, setTempValues] = useState<string[]>(
		currentFilterValue || [],
	);
	useEffect(() => {
		setTempValues(currentFilterValue || []);
	}, [currentFilterValue]);

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			const finalValue = tempValues.length ? tempValues : undefined;
			if (
				JSON.stringify(finalValue) !== JSON.stringify(column.getFilterValue())
			) {
				column.setFilterValue(finalValue);
			}
		}
	};

	return (
		<DropdownMenu onOpenChange={handleOpenChange}>
			<DropdownMenuTrigger asChild>
				<HeaderActionButton
					icon={IconFilter}
					isActive={tempValues.length > 0}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-[180px]">
				{options.map((option) => (
					<DropdownMenuCheckboxItem
						checked={tempValues.includes(option.value)}
						key={option.value}
						onCheckedChange={(checked) => {
							setTempValues((prev) =>
								checked
									? [...prev, option.value]
									: prev.filter((v) => v !== option.value),
							);
						}}
						onSelect={(e) => e.preventDefault()}
					>
						{option.label}
					</DropdownMenuCheckboxItem>
				))}
				{tempValues.length > 0 && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="justify-center text-red-500 text-xs focus:text-red-500"
							onSelect={() => {
								setTempValues([]);
								column.setFilterValue(undefined);
							}}
						>
							Clear Filters
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
}: DataTableColumnHeaderProps<TData, TValue>) {
	const options = (column.columnDef.meta as any)?.options;
	const canFilter = column.getCanFilter() && options;
	const canSort = column.getCanSort();

	return (
		<div className="flex items-center space-x-1 px-4 py-1">
			<span className="font-medium text-slate-700 text-sm">{title}</span>
			{canSort && <ColumnSorter column={column} />}
			{canFilter && <ColumnFilter column={column} options={options} />}
		</div>
	);
}
