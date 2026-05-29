import {
	IconLayoutDashboard,
	IconList,
	IconRocket,
	IconShieldLock,
} from "@tabler/icons-react";

export type NavSubItem = {
	label: string;
	url: string;
	disabled?: boolean;
	roles?: string[];
};

export type NavItem = {
	label: string;
	url?: string;
	icon?: React.ElementType;
	disabled?: boolean;
	roles?: string[];
	items?: NavSubItem[];
};

export type NavGroup = {
	label?: string;
	items: NavItem[];
	className?: string;
};

export const ROLES = {
	admin: "admin",
	user: "user",
} as const;

export const ADMIN_USERS_KEY = "admin-users";

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const NAVIGATION_CONFIG: NavGroup[] = [
	{
		label: "nav.platform",
		items: [
			{
				label: "nav.console",
				url: "/console",
				icon: IconLayoutDashboard,
			},
			{ label: "nav.tasks", url: "/console/tasks", icon: IconList },
		],
	},
	{
		label: "nav.admin",
		items: [
			{
				label: "nav.user-management",
				url: "/console/admin",
				icon: IconShieldLock,
				roles: [ROLES.admin],
			},
		],
	},
	{
		className: "mt-auto",
		items: [
			{
				label: "nav.my-profile",
				url: "/",
				icon: () => (
					<IconRocket className="hover:animate-bounce hover:text-orange-600" />
				),
			},
		],
	},
];

// App-level auth/routing config moved to lib/auth-config.ts
// Re-exported here for backward compatibility.
export {
	AUTH_CONFIG,
	isPublicPath,
} from "@/lib/auth-config";
