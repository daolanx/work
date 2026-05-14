import { useMemo } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import type { TablePaginationProps } from "./types";

export const TablePagination = ({
	total,
	pageSize,
	pageIndex,
	onPageChange,
	onPageSizeChange,
}: TablePaginationProps) => {
	const pageCount = Math.ceil(total / pageSize);
	const pages = useMemo(() => {
		const acc: { id: string; value: number | string }[] = [];
		for (let i = 0; i < pageCount; i++) {
			if (
				i === 0 ||
				i === pageCount - 1 ||
				(i >= pageIndex - 1 && i <= pageIndex + 1)
			) {
				acc.push({ id: `page-${i}`, value: i });
			} else if (i === pageIndex - 2 || i === pageIndex + 2) {
				acc.push({ id: `ellipsis-${i}`, value: "ellipsis" });
			}
		}
		return acc;
	}, [pageCount, pageIndex]);

	if (total <= 0) return null;

	return (
		<div className="flex flex-col items-center justify-between gap-4 px-2 py-4 font-medium md:flex-row">
			<div className="flex items-center gap-6 text-muted-foreground text-sm">
				<span>Total: {total}</span>
				<div className="flex items-center gap-2">
					<span>PageSize:</span>
					<Select
						onValueChange={(v) => onPageSizeChange(Number(v))}
						value={`${pageSize}`}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{[10, 20, 50].map((v) => (
								<SelectItem key={v} value={`${v}`}>
									{v}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			<Pagination className="mx-0 w-auto justify-end">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							className={
								pageIndex === 0
									? "pointer-events-none opacity-50"
									: "cursor-pointer"
							}
							onClick={() => onPageChange(pageIndex - 1)}
						/>
					</PaginationItem>
					{pages.map((p) => (
						<PaginationItem key={p.id}>
							{p.value === "ellipsis" ? (
								<PaginationEllipsis />
							) : (
								<PaginationLink
									className="cursor-pointer"
									isActive={pageIndex === p.value}
									onClick={() => onPageChange(p.value as number)}
								>
									{(p.value as number) + 1}
								</PaginationLink>
							)}
						</PaginationItem>
					))}
					<PaginationItem>
						<PaginationNext
							className={
								pageIndex >= pageCount - 1
									? "pointer-events-none opacity-50"
									: "cursor-pointer"
							}
							onClick={() => onPageChange(pageIndex + 1)}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};
