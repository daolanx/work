"use client";

import { ChevronRight } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTask } from "../../_hooks/use-task";
import { NotifyBell } from "./notify-bell";

// ==================== 1. Resource Configuration ====================

/**
 * Define how each resource interacts with its specific hook.
 * This pattern avoids calling hooks conditionally.
 */

type ResourceType = keyof typeof RESOURCE_RESOLVERS;

// 2. Define a strict interface for the match object
interface ResourceMatch {
	type: ResourceType;
	id: string;
}

const RESOURCE_RESOLVERS = {
	tasks: {
		pattern: /^\/console\/tasks\/(\d+)$/,
		Component: ({ id, fallback }: { id: string; fallback: string }) => {
			const { task, isLoading } = useTask(id); // Using your hook directly
			if (isLoading)
				return <span className="animate-pulse opacity-50">Loading...</span>;
			return <>{task?.title || fallback}</>;
		},
	},
	// Add other resources here:
	// users: { pattern: ..., Component: ... }
} as const;

// ==================== 2. Logic Hook ====================

function useBreadcrumbs() {
	const pathname = usePathname();

	return React.useMemo(() => {
		const parts = pathname.split("/").filter(Boolean);
		return parts.map((segment, index) => {
			const href = `/${parts.slice(0, index + 1).join("/")}`;
			const isLast = index === parts.length - 1;
			const fallbackLabel = segment.charAt(0).toUpperCase() + segment.slice(1);

			let resourceMatch: ResourceMatch | null = null;
			const resolverKeys = Object.keys(RESOURCE_RESOLVERS) as ResourceType[];

			// Find if this path segment represents a known resource

			for (const key of resolverKeys) {
				const config = RESOURCE_RESOLVERS[key];
				const match = href.match(config.pattern);
				if (match) {
					resourceMatch = { type: key, id: match[1] };
					break;
				}
			}

			return { href, fallbackLabel, isLast, resourceMatch };
		});
	}, [pathname]);
}

// ==================== 3. Segment Renderer ====================

const BreadcrumbSegmentLabel = ({
	segment,
}: {
	segment: ReturnType<typeof useBreadcrumbs>[number];
}) => {
	if (!segment.resourceMatch) {
		return <>{segment.fallbackLabel}</>;
	}

	const { type, id } = segment.resourceMatch;
	const Resolver = RESOURCE_RESOLVERS[type].Component;

	// Render the specific component that consumes the hook
	return <Resolver fallback={segment.fallbackLabel} id={id} />;
};

// ==================== 4. Site Header ====================

export function SiteHeader() {
	const segments = useBreadcrumbs();

	return (
		<header className="sticky top-0 z-30 flex h-14 w-full shrink-0 items-center gap-2 border-b bg-background/60 backdrop-blur-md transition-all">
			<div className="flex w-full items-center gap-2 px-4">
				<div className="flex items-center gap-2">
					<SidebarTrigger className="h-8 w-8 transition-colors hover:bg-accent" />
					<Separator className="h-4 w-[1px]" orientation="vertical" />
				</div>

				<Breadcrumb className="hidden md:block">
					<BreadcrumbList>
						{segments.map((segment) => (
							<React.Fragment key={segment.href}>
								<BreadcrumbItem>
									{segment.isLast ? (
										<BreadcrumbPage className="font-medium text-foreground">
											<BreadcrumbSegmentLabel segment={segment} />
										</BreadcrumbPage>
									) : (
										<BreadcrumbLink asChild>
											<Link
												className="transition-colors hover:text-foreground"
												href={segment.href}
											>
												<BreadcrumbSegmentLabel segment={segment} />
											</Link>
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
								{!segment.isLast && (
									<BreadcrumbSeparator>
										<ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
									</BreadcrumbSeparator>
								)}
							</React.Fragment>
						))}
					</BreadcrumbList>
				</Breadcrumb>

				<div className="ml-auto flex items-center gap-3">
					<NotifyBell />
				</div>
			</div>
		</header>
	);
}
