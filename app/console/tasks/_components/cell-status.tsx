import * as Icons from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
	TASK_STATUS_ENUM_MAP,
	type TypeTaskStatus,
} from "@/constants/task-enums";
import { cn } from "@/lib/utils";

interface CellStatusProps {
	value: string;
}

export function CellStatus({ value }: CellStatusProps) {
	const key = (value || "") as TypeTaskStatus;
	const config = TASK_STATUS_ENUM_MAP[key];

	if (!config) {
		return "-";
	}

	const Icon = Icons[config.icon] as any;

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
