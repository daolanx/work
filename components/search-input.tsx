"use client";

import { IconSearch, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export function SearchInput({
	placeholder = "Search...",
	onSearch,
}: {
	placeholder?: string;
	onSearch: (value: string) => void;
}) {
	const [value, setValue] = useState("");
	const debouncedValue = useDebounce(value, 500);

	useEffect(() => {
		onSearch(debouncedValue);
	}, [debouncedValue, onSearch]);

	const handleClear = () => {
		setValue("");
	};

	return (
		<div className="flex w-full max-w-sm items-center rounded-md border border-input bg-background px-3 ring-offset-background transition-shadow focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
			<IconSearch className="h-4 w-4 shrink-0 text-muted-foreground" />

			<Input
				className="h-8 flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
				onChange={(e) => setValue(e.target.value)}
				placeholder={placeholder}
				value={value}
			/>

			{value && (
				<Button
					className="ml-1 h-6 w-6 shrink-0 rounded-full hover:bg-muted"
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
