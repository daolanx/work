import { IconTag } from "@tabler/icons-react";
import {
	TASK_CATEGORY_ENUM_MAP,
	type TypeTaskCategory,
} from "@/constants/task-enums";

interface CellCategoryProps {
	value: string | undefined;
}

export function CellCategory({ value }: CellCategoryProps) {
	const key = (value?.toUpperCase() || "") as TypeTaskCategory;
	const config = TASK_CATEGORY_ENUM_MAP[key];

	if (!config) {
		return <span>-</span>;
	}

	return (
		<span className="flex items-center gap-x-1 font-medium text-gray-600 text-xs dark:text-gray-400">
			<IconTag className={config.className} size="14" />
			{config.label}
		</span>
	);
}
