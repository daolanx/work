"use client";

import { Loader2 } from "lucide-react";
import { type ReactNode, useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface AsyncActionItemProps {
	onSelect: () => Promise<void>;
	icon: ReactNode;
	className?: string;
	children: ReactNode;
}

export function AsyncActionItem({
	onSelect,
	icon,
	className,
	children,
}: AsyncActionItemProps) {
	const [loading, setLoading] = useState(false);

	return (
		<DropdownMenuItem
			className={className}
			disabled={loading}
			onSelect={async (e) => {
				e.preventDefault();
				setLoading(true);
				try {
					await onSelect();
				} finally {
					setLoading(false);
				}
			}}
		>
			{loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : icon}
			{children}
		</DropdownMenuItem>
	);
}
