"use client";

import {
	IconCreditCard,
	IconDotsVertical,
	IconLogout,
	IconNotification,
	IconUserCircle,
} from "@tabler/icons-react";
import { Loader2 } from "lucide-react"; // Import loader for visual feedback
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

export function NavUser() {
	const { isMobile } = useSidebar();
	const { user } = useUser();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							size="lg"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage alt={user?.name} src={user?.avatar} />
								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
							</Avatar>
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
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage alt={user?.name} src={user?.avatar} />
									<AvatarFallback className="rounded-lg">CN</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{user?.name}</span>
									<span className="truncate text-muted-foreground text-xs">
										{user?.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className="cursor-not-allowed opacity-50">
								<IconUserCircle className="mr-2 size-4" />
								Account{" "}
								<span className="ml-auto rounded bg-muted px-1 font-medium text-[10px] opacity-70">
									SOON
								</span>
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-not-allowed opacity-50">
								<IconCreditCard className="mr-2 size-4" />
								Billing{" "}
								<span className="ml-auto rounded bg-muted px-1 font-medium text-[10px] opacity-70">
									SOON
								</span>
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-not-allowed opacity-50">
								<IconNotification className="mr-2 size-4" />
								Notifications{" "}
								<span className="ml-auto rounded bg-muted px-1 font-medium text-[10px] opacity-70">
									SOON
								</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />

						<NavLogoutItem />
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}

function NavLogoutItem() {
	const router = useRouter();
	const [isPending, setIsPending] = useState(false);

	const handleSignOut = async () => {
		try {
			setIsPending(true);
			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						// Redirect user and refresh server components to clear cache
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
				// Prevents the dropdown from closing immediately so the user sees the loading state
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
