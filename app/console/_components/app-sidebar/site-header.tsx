"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
	const pathname = usePathname();

	// Split pathname into segments: /console/tasks/2 -> ["console", "tasks", "2"]
	const segments = pathname.split("/").filter(Boolean);

	return (
		<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator
					className="mx-2 data-[orientation=vertical]:h-4"
					orientation="vertical"
				/>

				<Breadcrumb>
					<BreadcrumbList>
						{segments.map((segment, index) => {
							const href = `/${segments.slice(0, index + 1).join("/")}`;
							const isLast = index === segments.length - 1;

							// Capitalize the segment for display
							const label = segment.charAt(0).toUpperCase() + segment.slice(1);

							return (
								<React.Fragment key={href}>
									{index !== 0 && <BreadcrumbSeparator />}

									<BreadcrumbItem>
										{isLast ? (
											<BreadcrumbPage>{label}</BreadcrumbPage>
										) : (
											<BreadcrumbLink asChild>
												<Link href={href}>{label}</Link>
											</BreadcrumbLink>
										)}
									</BreadcrumbItem>
								</React.Fragment>
							);
						})}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
}
