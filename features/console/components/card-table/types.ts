import type {
	ColumnDef,
	ColumnFiltersState,
	Row,
	SortingState,
} from "@tanstack/react-table";

export interface PaginationParams {
	pageIndex: number;
	pageSize: number;
	searchKey?: string;
	columnFilters?: ColumnFiltersState;
	sorting?: SortingState;
}

export interface ExtendedDataTableProps<T> extends DataTableProps<T> {
	variant?: "default" | "ghost";
	isRowFlashed?: (taskId: string) => boolean;
}

export interface CardTableHandle {
	/**
	 * Resets table to initial state.
	 */
	reset: () => void;

	/**
	 * Briefly flashes a row to draw the user's attention.
	 * Ideal for new or updated tasks.
	 */
	flashTaskRow: (taskId: string) => void;
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
	header: string;
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
