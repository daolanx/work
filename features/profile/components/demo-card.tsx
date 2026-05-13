"use client";

import { useTheme } from "next-themes";
import type { ReactNode } from "react";
import { MagicCard } from "@/components/ui/magic-card";

interface DemoCardProps {
	children: ReactNode;
}

export function DemoCard({ children }: DemoCardProps) {
	const { theme } = useTheme();

	// 暗黑模式下使用更亮的渐变色，以便在深色背景上可见
	const isDark = theme === "dark";
	const gradientColor = isDark ? "#1a1a1a" : "#f5f5f5";
	const gradientFrom = isDark ? "#a1a1a1" : "#a3a3a3";
	const gradientTo = isDark ? "#d4d4d4" : "#d4d4d4";

	return (
		<MagicCard
			className="group overflow-hidden rounded-sm bg-white dark:bg-neutral-900"
			gradientColor={gradientColor}
			gradientFrom={gradientFrom}
			gradientTo={gradientTo}
		>
			{children}
		</MagicCard>
	);
}
