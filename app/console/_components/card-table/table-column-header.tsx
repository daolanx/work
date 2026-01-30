"use client";

import { IconFilter } from "@tabler/icons-react";
import type { Column } from "@tanstack/react-table";
import { useEffect, useState } from "react";
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

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
}: DataTableColumnHeaderProps<TData, TValue>) {
	// Access custom options from column meta
	const options = (column.columnDef.meta as any)?.options as {
		label: string;
		value: string;
	}[];
	const currentFilterValue = column.getFilterValue();

	// Local state to manage selection before applying to the table
	const [tempValues, setTempValues] = useState<string[]>(
		(currentFilterValue as string[]) || [],
	);

	// Sync local state if filter is changed externally (e.g., "Clear All" button)
	useEffect(() => {
		setTempValues((currentFilterValue as string[]) || []);
	}, [currentFilterValue]);

	// Return simple title if column is not filterable
	if (!column.getCanFilter() || !options) {
		return <div className="px-4 py-3">{title}</div>;
	}

	// Apply filters only when the dropdown is closed to prevent excessive re-renders
	const handleOpenChange = (open: boolean) => {
		if (!open) {
			const finalValue = tempValues.length ? tempValues : undefined;
			// Shallow comparison to avoid redundant updates
			if (
				JSON.stringify(finalValue) !== JSON.stringify(column.getFilterValue())
			) {
				column.setFilterValue(finalValue);
			}
		}
	};

	const selectedSet = new Set(tempValues);

	return (
		<div className="flex items-center space-x-2 px-4">
			<DropdownMenu onOpenChange={handleOpenChange}>
				<DropdownMenuTrigger asChild>
					<Button
						className="-ml-3 h-8 data-[state=open]:bg-accent"
						size="sm"
						variant="ghost"
					>
						<span>{title}</span>
						<IconFilter
							className={cn(
								"ml-2 h-3.5 w-3.5",
								tempValues.length > 0
									? "fill-primary text-primary"
									: "text-muted-foreground",
							)}
						/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start" className="w-[200px]">
					{options.map((option) => {
						const isSelected = selectedSet.has(option.value);
						return (
							<DropdownMenuCheckboxItem
								checked={isSelected}
								key={option.value}
								// Prevent menu from closing during multi-select
								onCheckedChange={(checked) => {
									if (checked) {
										setTempValues((prev) => [...prev, option.value]);
									} else {
										setTempValues((prev) =>
											prev.filter((v) => v !== option.value),
										);
									}
								}}
								onSelect={(e) => e.preventDefault()}
							>
								{option.label}
							</DropdownMenuCheckboxItem>
						);
					})}
					{tempValues.length > 0 && (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="justify-center text-center"
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
		</div>
	);
}
