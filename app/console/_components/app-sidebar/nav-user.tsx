"use client";

import {
	IconCreditCard,
	IconDotsVertical,
	IconLogout,
	IconNotification,
	IconSettings,
	IconUser,
} from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth/client";
import { AUTH_CONFIG } from "@/lib/auth/paths";
import { useUser } from "../../_hooks/useUser";

/**
 * Configuration for individual menu items
 */
interface NavMenuItemConfig {
	label: string;
	icon: React.ElementType;
	href?: string;
	onClick?: () => void;
	disabled?: boolean;
	comingSoon?: boolean;
}

export function NavUser() {
	const { isMobile } = useSidebar();
	const { user } = useUser();

	/**
	 * Menu items grouped by category.
	 */
	const menuGroups: NavMenuItemConfig[][] = [
		[
			{
				label: "Profile",
				icon: IconUser,
				href: "/console/profile",
			},
			{
				label: "Billing",
				icon: IconCreditCard,
				disabled: true,
				comingSoon: true,
			},
			{
				label: "Notifications",
				icon: IconNotification,
				disabled: true,
				comingSoon: true,
			},
		],
		[
			{
				label: "Settings",
				icon: IconSettings,
				disabled: true,
				comingSoon: true,
			},
		],
	];

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							size="lg"
						>
							<UserAvatar user={user} />
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{user?.name}</span>
								<span className="truncate text-muted-foreground text-xs">
									{user?.email}
								</span>
							</div>
							<IconDotsVertical className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						align="end"
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<UserAvatar className="h-8 w-8 rounded-lg" user={user} />
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{user?.name}</span>
									<span className="truncate text-muted-foreground text-xs">
										{user?.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>

						{menuGroups.map((group, index) => {
							const groupKey = `group-${group[0]?.label || index}`;
							return (
								<div key={groupKey}>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										{group.map((item) => (
											<NavMenuItem item={item} key={item.label} />
										))}
									</DropdownMenuGroup>
								</div>
							);
						})}

						<DropdownMenuSeparator />
						<NavLogoutItem />
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

/**
 * Reusable menu item component that handles both Links and Action buttons
 */
function NavMenuItem({ item }: { item: NavMenuItemConfig }) {
	const Icon = item.icon;

	// Wrap the label and icon in a div with fixed gap
	const content = (
		<div className="flex w-full items-center gap-2">
			<Icon className="size-4 shrink-0" />
			<span className="truncate">{item.label}</span>
			{item.comingSoon && (
				<span className="ml-auto rounded bg-muted px-1 font-medium text-[10px] opacity-70">
					SOON
				</span>
			)}
		</div>
	);

	return (
		<DropdownMenuItem
			asChild={!!item.href}
			className={
				item.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
			}
			disabled={item.disabled}
			onClick={item.onClick}
		>
			{item.href ? (
				<Link className="flex w-full items-center" href={item.href}>
					{content}
				</Link>
			) : (
				content
			)}
		</DropdownMenuItem>
	);
}

/**
 * Shared Avatar component to maintain visual consistency
 */
function UserAvatar({
	user,
	className = "h-8 w-8",
}: {
	user: any;
	className?: string;
}) {
	return (
		<Avatar className={className}>
			<AvatarImage alt={user?.name} src={user?.image} />
			<AvatarFallback className="rounded-lg">
				{user?.name ? user.name.slice(0, 2).toUpperCase() : "NA"}
			</AvatarFallback>
		</Avatar>
	);
}

/**
 * Specialized Logout item with loading state management
 */
function NavLogoutItem() {
	const router = useRouter();
	const [isPending, setIsPending] = useState(false);

	const handleSignOut = async () => {
		try {
			setIsPending(true);
			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						// Redirect to landing page and clear client cache
						router.push(AUTH_CONFIG.defaultRedirectPath);
						router.refresh();
					},
				},
			});
		} catch (error) {
			console.error("Sign out failed:", error);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<DropdownMenuItem
			className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
			disabled={isPending}
			onSelect={(e) => {
				// Prevent default behavior to keep dropdown open during loading
				e.preventDefault();
				handleSignOut();
			}}
		>
			{isPending ? (
				<Loader2 className="mr-2 size-4 animate-spin" />
			) : (
				<IconLogout className="mr-2 size-4" />
			)}
			<span>{isPending ? "Logging out..." : "Log out"}</span>
		</DropdownMenuItem>
	);
}
