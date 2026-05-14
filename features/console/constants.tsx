import {
	IconChartBar,
	IconHelp,
	IconLayoutDashboard,
	IconList,
	IconPackage,
	IconRocket,
	IconSettings,
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

export const NAVIGATION_CONFIG: NavGroup[] = [
	{
		label: "Platform",
		items: [
			{ label: "Console", url: "/console", icon: IconLayoutDashboard },
			{
				label: "Projects",
				url: "/projects",
				icon: IconPackage,
				disabled: true,
				items: [
					{ label: "Ship Log", url: "/projects/changelog" },
					{ label: "Issues", url: "/projects/issues" },
					{ label: "Status", url: "/projects/status" },
				],
			},
			{ label: "Tasks", url: "/console/tasks", icon: IconList },
			{
				label: "Growth",
				icon: IconChartBar,
				disabled: true,
				items: [
					{ label: "Audience", url: "/growth/users" },
					{ label: "Revenue", url: "/growth/revenue" },
				],
			},
		],
	},
	{
		label: "Admin ",
		items: [
			{
				label: "User Management",
				url: "/console/admin",
				icon: IconShieldLock,
				roles: ["admin"],
			},
		],
	},
	{
		className: "mt-auto",
		items: [
			{
				label: "Settings",
				url: "/settings",
				icon: IconSettings,
				disabled: true,
			},
			{ label: "Help", url: "/help", icon: IconHelp, disabled: true },
			{
				label: "My Profile",
				url: "/",
				icon: () => (
					<IconRocket className="hover:animate-bounce hover:text-orange-600" />
				),
			},
		],
	},
];
