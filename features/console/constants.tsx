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

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const NAVIGATION_CONFIG: NavGroup[] = [
	{
		label: "Platform",
		items: [
			{ label: "Console", url: "/console", icon: IconLayoutDashboard },
			{ label: "Tasks", url: "/console/tasks", icon: IconList },
		],
	},
	{
		label: "Admin",
		items: [
			{
				label: "User Management",
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
				label: "My Profile",
				url: "/",
				icon: () => (
					<IconRocket className="hover:animate-bounce hover:text-orange-600" />
				),
			},
		],
	},
];

/**
 * Authentication routing configuration
 */
export const AUTH_CONFIG = {
	loginPath: "/auth/login",
	authPathPrefix: "/auth/",
	defaultRedirectPath: "/console",
} as const;

/**
 * Public access configuration
 */
const PUBLIC_PATHS = {
	exact: new Set(["/", "/ai-chat", "/landing", "/flower-shop"]),
	// Paths starting with these prefixes are accessible without authentication
	prefixes: [
		AUTH_CONFIG.authPathPrefix,
		"/docs/",
		"/legal",
		"/api/auth/",
		"/api/ai-chat",
	],
} as const;

/**
 * Checks if a given pathname is publicly accessible
 */
export function isPublicPath(pathname: string): boolean {
	return (
		PUBLIC_PATHS.exact.has(pathname) ||
		PUBLIC_PATHS.prefixes.some((prefix) => pathname.startsWith(prefix))
	);
}
