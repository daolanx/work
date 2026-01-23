import type { ColumnDef, Row } from "@tanstack/react-table";

export interface PaginationParams {
	pageIndex: number;
	pageSize: number;
}

export interface PaginatedResponse<T> {
	list: T[];
	total: number;
}

export type TableDataHook<T> = (params: PaginationParams) => {
	res?: PaginatedResponse<T>;
	isLoading: boolean;
	error?: Error;
};

export interface DataTableProps<T> {
	header: React.ReactNode | string | null;
	columns: ColumnDef<T>[];
	useDataHook: TableDataHook<T>;
	initialPageSize?: number;
	toolbar?: React.ReactNode;
}

export interface TablePaginationProps {
	total: number;
	pageSize: number;
	pageIndex: number;
	onPageChange: (index: number) => void;
	onPageSizeChange: (size: number) => void;
}

export interface TableBodyContentProps<T> {
	rows: Row<T>[];
	isLoading: boolean;
	columnCount: number;
	pageSize: number;
	emptyText?: string;
}
