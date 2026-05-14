"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Manages the visual state for highlighting a specific table row.
 * Renamed to be task-specific to align with business logic.
 */
export function useTableRowFlash(duration = 3000) {
	const [flashTaskId, setFlashTaskId] = useState<string | null>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	/**
	 * Triggers a temporary highlight effect for a row identified by Task ID.
	 * Automatically clears after the duration.
	 */
	const triggerTaskRowFlash = useCallback(
		(taskId: string) => {
			// Clear any existing timer to avoid overlapping state updates
			if (timerRef.current) clearTimeout(timerRef.current);

			setFlashTaskId(taskId);

			timerRef.current = setTimeout(() => {
				setFlashTaskId(null);
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
		flashTaskId,
		triggerTaskRowFlash,
		isRowFlashed: (taskId: string) => flashTaskId === taskId,
	};
}
