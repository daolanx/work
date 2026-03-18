import { Badge } from "@/components/ui/badge";
import {
	TASK_PRIORITY_ENUM_MAP,
	type TypeTaskPriority,
} from "@/constants/task-enums";
import { cn } from "@/lib/utils";

interface CellPriorityProps {
	value: string;
}

export function CellPriority({ value }: CellPriorityProps) {
	const key = (value?.toUpperCase() || "") as TypeTaskPriority;
	const config = TASK_PRIORITY_ENUM_MAP[key];

	if (!config) {
		return "-";
	}

	return (
		<Badge
			className={cn(
				"rounded-sm border px-1.5 py-0.5 transition-none",
				config.className,
			)}
		>
			{config.label}
		</Badge>
	);
}
