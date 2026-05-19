"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Manages the visual state for highlighting a specific table row.
 */
export function useTableRowFlash(duration = 3000) {
	const [flashTableId, setFlashTableId] = useState<string | null>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	/**
	 * Triggers a temporary highlight effect for a row identified by row ID.
	 * Automatically clears after the duration.
	 */
	const triggerTableRowFlash = useCallback(
		(rowId: string) => {
			// Clear any existing timer to avoid overlapping state updates
			if (timerRef.current) clearTimeout(timerRef.current);

			setFlashTableId(rowId);

			timerRef.current = setTimeout(() => {
				setFlashTableId(null);
				timerRef.current = null;
			}, duration);
		},
		[duration],
	);

	// Cleanup timer on unmount
	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	return {
		flashTableId,
		triggerTableRowFlash,
		isRowFlashed: (rowId: string) => flashTableId === rowId,
	};
}
