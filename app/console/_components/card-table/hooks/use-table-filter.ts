"use client";

import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useMemo } from "react";
import { create } from "zustand";

interface TableFilterState {
	pageIndex: number;
	pageSize: number;
	searchKey: string;
	columnFilters: ColumnFiltersState;
	sorting: SortingState;
	setPageIndex: (val: number) => void;
	setPageSize: (val: number) => void;
	setSearchKey: (val: string) => void;
	setColumnFilters: (val: ColumnFiltersState) => void;
	setSorting: (val: SortingState) => void;
	reset: () => void;
}

const stores: Record<string, any> = {};

const createTableStore = (initialPageSize: number) =>
	create<TableFilterState>((set) => ({
		pageIndex: 0,
		pageSize: initialPageSize,
		searchKey: "",
		columnFilters: [],
		sorting: [{ id: "createdAt", desc: true }],

		setPageIndex: (pageIndex) => set({ pageIndex }),
		setPageSize: (pageSize) => set({ pageSize }),
		setSearchKey: (searchKey) => set({ searchKey, pageIndex: 0 }),
		setColumnFilters: (columnFilters) => set({ columnFilters, pageIndex: 0 }),
		setSorting: (sorting) => set({ sorting }),
		reset: () =>
			set({
				pageIndex: 0,
				pageSize: initialPageSize,
				searchKey: "",
				columnFilters: [],
				sorting: [{ id: "createdAt", desc: true }],
			}),
	}));

export function useTableFilter(header: string, initialPageSize = 10) {
	const useStore = useMemo(() => {
		if (!stores[header]) stores[header] = createTableStore(initialPageSize);
		return stores[header];
	}, [header, initialPageSize]);

	return useStore() as TableFilterState;
}
