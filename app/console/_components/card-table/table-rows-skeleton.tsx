import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const TableRowsSkeleton = ({
	pageSize,
	columnCount,
}: {
	pageSize: number;
	columnCount: number;
}) => {
	const rows = useMemo(
		() =>
			Array.from({ length: pageSize }, () => ({
				id: crypto.randomUUID(),
				cells: Array.from({ length: columnCount }, () => crypto.randomUUID()),
			})),
		[pageSize, columnCount],
	);

	return (
		<>
			{rows.map((row) => (
				<TableRow key={row.id}>
					{row.cells.map((cellId) => (
						<TableCell key={cellId}>
							<Skeleton className="h-5 w-full" />
						</TableCell>
					))}
				</TableRow>
			))}
		</>
	);
};
