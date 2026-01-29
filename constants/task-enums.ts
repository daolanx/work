/**
 * TASK_PRIORITY_ENUMS
 */
export const TASK_PRIORITY_ENUM_MAP = {
	URGENT: {
		label: "Urgent",
		className:
			"bg-red-50 text-red-600 border-red-200/60 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
	},
	HIGH: {
		label: "High",
		className:
			"bg-orange-50 text-orange-600 border-orange-200/60 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
	},
	MEDIUM: {
		label: "Medium",
		className:
			"bg-blue-50 text-blue-600 border-blue-200/60 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
	},
	LOW: {
		label: "Low",
		className:
			"bg-gray-50 text-gray-600 border-gray-200/60 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20",
	},
} as const;

export type TypeTaskPriority = keyof typeof TASK_PRIORITY_ENUM_MAP;

export const TASK_PRIORITY_ENUM_KEYS = Object.keys(TASK_PRIORITY_ENUM_MAP) as [
	TypeTaskPriority,
	...TypeTaskPriority[],
];

export const TASK_PRIORITY_ENUMS = (
	Object.keys(TASK_PRIORITY_ENUM_MAP) as TypeTaskPriority[]
).map((key) => ({
	key,
	...TASK_PRIORITY_ENUM_MAP[key],
}));

/**
 * TASK_CATEGORY_ENUMS
 */

export const TASK_CATEGORY_ENUM_MAP = {
	PERSONAL: {
		label: "Personal",

		className: "text-purple-600 dark:text-purple-400 ",
	},
	WORK: {
		label: "Work",

		className: "text-blue-600  dark:text-blue-400 ",
	},
} as const;

export type TypeTaskCategory = keyof typeof TASK_CATEGORY_ENUM_MAP;

export const TASK_CATEGORY_ENUM_KEYS = Object.keys(TASK_CATEGORY_ENUM_MAP) as [
	TypeTaskCategory,
	...TypeTaskCategory[],
];

export const TASK_CATEGORY_ENUMS = (
	Object.keys(TASK_CATEGORY_ENUM_MAP) as TypeTaskCategory[]
).map((key) => ({
	key,
	...TASK_CATEGORY_ENUM_MAP[key],
}));

/**
 * TASK_STATUS_ENUMS
 */

export const TASK_STATUS_ENUM_MAP = {
	"To Do": {
		label: "To Do",
		className: "bg-slate-50 text-slate-600",
		icon: "IconCircleDashed",
		iconClassName: "text-slate-400",
	},
	"In Process": {
		label: "In Progress",
		className: "bg-blue-50 text-blue-700",
		icon: "IconCircleDot",
		iconClassName: "text-blue-600",
	},
	Done: {
		label: "Done",
		className: "bg-green-50 text-green-700",
		icon: "IconCircleCheckFilled",
		iconClassName: "text-green-500",
	},
	Canceled: {
		label: "Canceled",
		className: "bg-slate-100/50 text-slate-400",
		icon: "IconCircleMinus",
		iconClassName: "text-slate-300",
	},
} as const;

export type TypeTaskStatus = keyof typeof TASK_STATUS_ENUM_MAP;

export const TASK_STATUS_ENUM_KEYS = Object.keys(TASK_STATUS_ENUM_MAP) as [
	TypeTaskCategory,
	...TypeTaskCategory[],
];

export const TASK_STATUS_ENUMS = (
	Object.keys(TASK_STATUS_ENUM_MAP) as TypeTaskCategory[]
).map((key) => ({
	key,
	...TASK_STATUS_ENUM_MAP[key],
}));
