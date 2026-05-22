"use client";

import { IconChevronRight, IconRocket } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
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
import { NAVIGATION_CONFIG, type NavItem } from "@/features/console/constants";
import { useUser } from "@/features/console/user/hooks/use-user";
import { cn } from "@/lib/utils";
import { NavUser } from "./nav-user";

// --- Component ---

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useUser();
	const pathname = usePathname();
	const t = useTranslations("console");

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
					<span className="truncate">{t(item.label)}</span>
					{item.disabled && (
						<span className="ml-auto rounded bg-muted px-1 font-medium text-[10px] opacity-70">
							{t("common.soon")}
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
							tooltip={t(item.label)}
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
							<SidebarMenuButton isActive={isActive} tooltip={t(item.label)}>
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
											<Link href={subItem.url}>{t(subItem.label)}</Link>
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
									<span className="truncate font-semibold">
										{t("nav.console")}
									</span>
									<span className="truncate text-muted-foreground text-xs">
										{t("sidebar.welcome", { name: user?.name ?? "" })}
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
							<SidebarGroupLabel>{t(group.label)}</SidebarGroupLabel>
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
