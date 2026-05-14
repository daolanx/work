import {
	IconCircleCheckFilled,
	IconCircleDashed,
	IconCircleDot,
	IconCircleMinus,
} from "@tabler/icons-react";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import {
	TASK_STATUS_ENUM_MAP,
	type TypeTaskStatus,
} from "@/features/console/task/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
	IconCircleDashed,
	IconCircleDot,
	IconCircleCheckFilled,
	IconCircleMinus,
};

interface CellStatusProps {
	value: string;
}

export function CellStatus({ value }: CellStatusProps) {
	const key = (value || "") as TypeTaskStatus;
	const config = TASK_STATUS_ENUM_MAP[key];

	if (!config) {
		return "-";
	}

	const Icon = iconMap[config.icon];

	return (
		<Badge
			className={cn(
				"flex items-center border-none px-2 py-0.5 font-medium",
				config.className,
			)}
			variant="outline"
		>
			<Icon className={cn("mr-1.5 size-3.5", config.iconClassName)} />
			<span className="whitespace-nowrap">{config.label}</span>
		</Badge>
	);
}
