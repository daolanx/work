"use client";

import {
	IconChartBar,
	IconChevronRight,
	IconHelp,
	IconLayoutDashboard,
	IconList,
	IconPackage,
	IconRocket,
	IconSettings,
	IconShieldLock,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { useMemo } from "react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUser } from "../../_hooks/useUser";
import { NavUser } from "./nav-user";

// --- Types ---

type NavSubItem = {
	label: string; // Unified from title
	url: string;
	disabled?: boolean;
	roles?: string[];
};

type NavItem = {
	label: string; // Unified from title
	url?: string;
	icon?: React.ElementType;
	disabled?: boolean;
	roles?: string[];
	items?: NavSubItem[];
};

type NavGroup = {
	label?: string; // Optional group header
	items: NavItem[];
	className?: string;
};

// --- Configuration ---

const NAVIGATION_CONFIG: NavGroup[] = [
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

// --- Component ---

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useUser();
	const pathname = usePathname();

	// Unified filtering logic
	const filteredNavGroups = useMemo(() => {
		return NAVIGATION_CONFIG.map((group) => ({
			...group,
			items: group.items
				.filter(
					(item) =>
						!item.roles || (user?.role && item.roles.includes(user.role)),
				)
				.map((item) => ({
					...item,
					items: item.items?.filter(
						(sub) =>
							!sub.roles || (user?.role && sub.roles.includes(user.role)),
					),
				})),
		})).filter((group) => group.items.length > 0);
	}, [user?.role]);

	const renderMenuItems = (items: NavItem[]) => {
		return items.map((item) => {
			const hasItems = item.items && item.items.length > 0;
			const isActive =
				pathname === item.url ||
				item.items?.some((sub) => pathname === sub.url);

			const content = (
				<>
					{item.icon && <item.icon className="size-4 shrink-0" />}
					<span className="truncate">{item.label}</span>
					{item.disabled && (
						<span className="ml-auto rounded bg-muted px-1 font-medium text-[10px] opacity-70">
							SOON
						</span>
					)}
					{hasItems && !item.disabled && (
						<IconChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
					)}
				</>
			);

			if (!hasItems || item.disabled) {
				return (
					<SidebarMenuItem key={item.label}>
						<SidebarMenuButton
							asChild={!item.disabled}
							className={cn(item.disabled && "cursor-not-allowed opacity-50")}
							disabled={item.disabled}
							isActive={isActive}
							tooltip={item.label}
						>
							{item.disabled ? (
								<div className="flex w-full items-center gap-2">{content}</div>
							) : item.url ? (
								<Link href={item.url}>{content}</Link>
							) : (
								<div className="cursor-default">{content}</div>
							)}
						</SidebarMenuButton>
					</SidebarMenuItem>
				);
			}

			return (
				<Collapsible
					asChild
					className="group/collapsible"
					defaultOpen={isActive}
					key={item.label}
				>
					<SidebarMenuItem>
						<CollapsibleTrigger asChild>
							<SidebarMenuButton isActive={isActive} tooltip={item.label}>
								{content}
							</SidebarMenuButton>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<SidebarMenuSub>
								{item.items?.map((subItem) => (
									<SidebarMenuSubItem key={subItem.label}>
										<SidebarMenuSubButton
											asChild
											isActive={pathname === subItem.url}
										>
											<Link href={subItem.url}>{subItem.label}</Link>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								))}
							</SidebarMenuSub>
						</CollapsibleContent>
					</SidebarMenuItem>
				</Collapsible>
			);
		});
	};

	return (
		<Sidebar collapsible="offcanvas" variant="sidebar" {...props}>
			<SidebarHeader className="border-sidebar-border/50 border-b">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild size="lg">
							<Link href="/console">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)] ring-1 ring-white/10">
									<IconRocket className="size-5 stroke-[2.5] drop-shadow-sm" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">Console</span>
									<span className="truncate text-muted-foreground text-xs">
										Welcome, {user?.name}
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent className="gap-0">
				{filteredNavGroups.map((group, idx) => (
					<SidebarGroup className={group.className} key={group.label || idx}>
						{group.label && (
							<SidebarGroupLabel>{group.label}</SidebarGroupLabel>
						)}
						<SidebarMenu>{renderMenuItems(group.items)}</SidebarMenu>
					</SidebarGroup>
				))}
			</SidebarContent>

			<SidebarFooter className="border-sidebar-border/50 border-t">
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
