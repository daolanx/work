"use client";

import { Bell, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);

	return (
		<header className="sticky top-0 z-30 flex h-14 w-full shrink-0 items-center gap-2 border-b bg-background/60 backdrop-blur-md transition-all duration-300 ease-in-out">
			<div className="flex w-full items-center gap-2 px-4">
				<div className="flex items-center gap-2">
					<SidebarTrigger className="h-8 w-8 transition-colors hover:bg-accent" />
					<Separator className="h-4 w-[1px] bg-border" orientation="vertical" />
				</div>

				<Breadcrumb className="hidden md:block">
					<BreadcrumbList>
						{segments.map((segment, index) => {
							const href = `/${segments.slice(0, index + 1).join("/")}`;
							const isLast = index === segments.length - 1;
							const label = segment.charAt(0).toUpperCase() + segment.slice(1);

							return (
								<React.Fragment key={href}>
									<BreadcrumbItem>
										{isLast ? (
											<BreadcrumbPage className="font-medium text-foreground">
												{label}
											</BreadcrumbPage>
										) : (
											<BreadcrumbLink asChild>
												<Link
													className="transition-colors hover:text-foreground"
													href={href}
												>
													{label}
												</Link>
											</BreadcrumbLink>
										)}
									</BreadcrumbItem>
									{!isLast && (
										<BreadcrumbSeparator>
											<ChevronRight className="h-3.5 w-3.5" />
										</BreadcrumbSeparator>
									)}
								</React.Fragment>
							);
						})}
					</BreadcrumbList>
				</Breadcrumb>

				<div className="ml-auto flex items-center gap-3">
					<Popover>
						<PopoverTrigger asChild>
							<Button
								className="relative h-9 w-9 rounded-full transition-transform active:scale-95"
								size="icon"
								variant="ghost"
							>
								<Bell className="h-[1.1rem] w-[1.1rem] text-muted-foreground transition-colors hover:text-foreground" />
								<span className="absolute top-2.5 right-2.5 flex h-2 w-2">
									<span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
									<span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
								</span>
								<span className="sr-only">Notifications</span>
							</Button>
						</PopoverTrigger>
						<PopoverContent
							align="end"
							className="fade-in zoom-in-95 w-80 animate-in overflow-hidden p-0 shadow-lg duration-200"
							sideOffset={8}
						>
							<div className="p-4">
								<div className="mb-1 flex items-center justify-between">
									<h4 className="font-semibold text-sm">Notifications</h4>
									<span className="rounded bg-muted px-1.5 py-0.5 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
										3 New
									</span>
								</div>
								<p className="text-muted-foreground text-xs">
									You have 3 unread messages.
								</p>
							</div>
							<Separator />
							<div className="max-h-[300px] overflow-y-auto p-2">
								<NotificationItem
									description="Version 2.0 is now live. Check out the new features."
									time="2h ago"
									title="System Update"
								/>
								<NotificationItem
									description="You have been assigned to the 'Project X' dashboard."
									time="5h ago"
									title="New Task Assigned"
								/>
							</div>
							<div className="border-t bg-muted/40 p-2 text-center">
								<button
									className="font-medium text-primary text-xs transition-all hover:underline"
									type="button"
								>
									View all notifications
								</button>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</header>
	);
}

function NotificationItem({
	title,
	description,
	time,
}: {
	title: string;
	description: string;
	time: string;
}) {
	return (
		<div className="group relative flex cursor-pointer flex-col gap-1 rounded-md p-2 transition-colors hover:bg-accent">
			<div className="flex items-center justify-between">
				<span className="font-medium text-sm leading-none">{title}</span>
				<span className="text-[10px] text-muted-foreground">{time}</span>
			</div>
			<p className="line-clamp-1 text-muted-foreground text-xs">
				{description}
			</p>
		</div>
	);
}
