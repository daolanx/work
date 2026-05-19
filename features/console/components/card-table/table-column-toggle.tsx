import { IconLayoutColumns } from "@tabler/icons-react";
import type { Column, Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function TableColumnToggle<T>({ table }: { table: Table<T> }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button size="sm" variant="outline">
					<IconLayoutColumns className="mr-2 h-4 w-4" /> Column
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{table
					.getAllColumns()
					.filter((c: Column<T>) => c.getCanHide())
					.map((column: Column<T>) => (
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
	);
}

export { TableColumnToggle };
