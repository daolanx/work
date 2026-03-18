"use client";

import { IconSearch, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * SearchInput Component
 * Optimized for explicit search invocation via 'Enter' key or 'Clear' action.
 */
export function SearchInput({
	placeholder = "Search...",
	defaultValue = "",
	onSearch,
}: {
	placeholder?: string;
	defaultValue?: string;
	onSearch: (value: string) => void;
}) {
	const [value, setValue] = useState(defaultValue);

	// Sync internal state with external defaultValue (e.g., on store reset)
	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	/**
	 * Triggers the search callback.
	 * Internalized to allow calls from multiple interaction points.
	 */
	const handleTriggerSearch = (val: string) => {
		onSearch(val.trim());
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleTriggerSearch(value);
		}
	};

	const handleClear = () => {
		setValue("");
		// Immediate trigger on clear for better UX
		handleTriggerSearch("");
	};

	return (
		<div className="flex h-9 w-full max-w-[240px] items-center rounded-md border border-input bg-background px-3 ring-offset-background transition-shadow focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-0">
			<IconSearch
				className="h-4 w-4 shrink-0 cursor-pointer text-muted-foreground"
				onClick={() => handleTriggerSearch(value)}
			/>

			<Input
				className="h-full flex-1 border-0 bg-transparent py-0 pr-0 text-sm placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0"
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder={placeholder}
				value={value}
			/>

			{value && (
				<Button
					className="ml-1 h-5 w-5 shrink-0 rounded-full p-0 hover:bg-muted"
					onClick={handleClear}
					size="icon"
					type="button"
					variant="ghost"
				>
					<IconX className="h-3 w-3 text-muted-foreground" />
					<span className="sr-only">Clear</span>
				</Button>
			)}
		</div>
	);
}
