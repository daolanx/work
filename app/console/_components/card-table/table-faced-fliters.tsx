"use client";

import { IconRotateClockwise2, IconX } from "@tabler/icons-react";
import type { Table } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TableFacedFiltersProps<TData> {
	table: Table<TData>;
}

export function TableFacedFilters<TData>({
	table,
}: TableFacedFiltersProps<TData>) {
	const { columnFilters } = table.getState();

	// Filter out empty filter states to determine if the toolbar should be visible
	const activeFilters = columnFilters.filter(
		(f) => Array.isArray(f.value) && f.value.length > 0,
	);

	const hasFilters = activeFilters.length > 0;

	const handleRemoveFilter = (id: string, value: any) => {
		const column = table.getColumn(id);
		const currentValues = (column?.getFilterValue() as any[]) ?? [];
		const nextValues = currentValues.filter((v) => v !== value);

		// Set to undefined when empty to trigger TanStack Table's internal cleanup
		column?.setFilterValue(nextValues.length > 0 ? nextValues : undefined);
	};

	return (
		<div
			className={cn(
				"flex flex-wrap items-center gap-2 overflow-hidden transition-all duration-300 ease-in-out",
				// Container animation: handles expansion, opacity, and vertical shift
				hasFilters
					? "mb-4 max-h-40 translate-y-0 opacity-100"
					: "pointer-events-none mb-0 max-h-0 -translate-y-2 opacity-0",
			)}
		>
			{activeFilters.map((filter) => {
				const column = table.getColumn(filter.id);
				// Casting meta to any to access custom options without global type augmentation
				const options = (column?.columnDef.meta as any)?.options;

				return (filter.value as any[]).map((val) => {
					const option = options?.find((o: any) => o.value === val);
					const label = option?.label ?? val;
					const customClassName = option?.className;

					return (
						<Badge
							className={cn(
								"shrink-0 py-1 pr-1 pl-2 font-medium shadow-sm transition-all",
								customClassName || "bg-secondary text-secondary-foreground",
							)}
							key={`${filter.id}-${val}`}
							variant="outline"
						>
							{/* Field Label */}
							<span className="mr-1.5 font-normal opacity-70">
								{typeof column?.columnDef.header === "string"
									? column.columnDef.header
									: filter.id}
								:
							</span>

							{/* Value Label */}
							{label}

							{/* Individual Remove Button */}
							<button
								className="ml-1.5 rounded-full p-0.5 transition-colors hover:bg-black/10 dark:hover:bg-white/20"
								onClick={() => handleRemoveFilter(filter.id, val)}
								type="button"
							>
								<IconX className="h-3 w-3" />
							</button>
						</Badge>
					);
				});
			})}

			{/* Global Reset Button */}
			{hasFilters && (
				<Button
					className="h-8 px-2 text-muted-foreground text-xs transition-opacity hover:text-foreground"
					onClick={() => table.resetColumnFilters()}
					size="sm"
					variant="ghost"
				>
					<IconRotateClockwise2 className="mr-1 h-3 w-3" />
					Clear All
				</Button>
			)}
		</div>
	);
}
