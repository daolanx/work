"use client";

import {
	IconChartBar,
	IconChevronRight,
	IconHelp,
	IconInnerShadowTop,
	IconLayoutDashboard,
	IconList,
	IconPackage,
	IconRocket,
	IconSettings,
	IconTerminal2,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
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

type NavItem = {
	title: string;
	url?: string;
	icon?: React.ElementType;
	disabled?: boolean;
	isActive?: boolean;
	items?: {
		title: string;
		url: string;
		disabled?: boolean;
	}[];
};

const data: {
	navMain: NavItem[];
	navManagement: NavItem[];
	navSecondary: NavItem[];
} = {
	navMain: [
		{ title: "Console", url: "/console", icon: IconLayoutDashboard },
		{
			title: "Projects",
			url: "/projects",
			icon: IconPackage,
			disabled: true,
			items: [
				{ title: "Ship Log", url: "/projects/changelog" },
				{ title: "Issues", url: "/projects/issues" },
				{ title: "Status", url: "/projects/status" },
			],
		},
		{ title: "Tasks", url: "/console/tasks", icon: IconList },
	],
	navManagement: [
		{
			title: "Growth",
			icon: IconChartBar,
			disabled: true,
			items: [
				{ title: "Audience", url: "/growth/users" },
				{ title: "Revenue", url: "/growth/revenue" },
			],
		},
	],
	navSecondary: [
		{ title: "Settings", url: "/settings", icon: IconSettings, disabled: true },
		{ title: "Help", url: "/help", icon: IconHelp, disabled: true },
		{
			title: "My Profile", url: "/", icon: () => {
				return <>

					<IconRocket className="hover:animate-bounce hover:text-orange-600" /></>
			},
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useUser();
	const pathname = usePathname();

	const renderMenuItems = (items: typeof data.navMain) => {
		return items.map((item) => {
			const hasItems = item.items && item.items.length > 0;
			const isActive =
				pathname === item.url ||
				item.items?.some((sub) => pathname === sub.url);

			const content = (
				<>
					{item.icon && <item.icon className="size-4 shrink-0" />}
					<span className="truncate">{item.title}</span>
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
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton
							asChild={!item.disabled}
							className={cn(item.disabled && "cursor-not-allowed opacity-50")}
							disabled={item.disabled}
							isActive={isActive}
							tooltip={item.title}
						>
							{item.disabled ? (
								<div className="flex w-full items-center gap-2">{content}</div>
							) : (
								<Link href={item.url!}>{content}</Link>
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
					key={item.title}
				>
					<SidebarMenuItem>
						<CollapsibleTrigger asChild>
							<SidebarMenuButton isActive={isActive} tooltip={item.title}>
								{content}
							</SidebarMenuButton>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<SidebarMenuSub>
								{item.items?.map((subItem) => (
									<SidebarMenuSubItem key={subItem.title}>
										<SidebarMenuSubButton
											asChild
											isActive={pathname === subItem.url}
										>
											<Link href={subItem.url}>{subItem.title}</Link>
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
										Welcome, {user?.name?.split(" ")[0]}
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent className="gap-0">
				<SidebarGroup>
					<SidebarGroupLabel>Platform</SidebarGroupLabel>
					<SidebarMenu>{renderMenuItems(data.navMain)}</SidebarMenu>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Management</SidebarGroupLabel>
					<SidebarMenu>{renderMenuItems(data.navManagement)}</SidebarMenu>
				</SidebarGroup>

				<SidebarGroup className="mt-auto">
					<SidebarMenu>{renderMenuItems(data.navSecondary)}</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="border-sidebar-border/50 border-t">
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}
