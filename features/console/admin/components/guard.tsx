import { ShieldAlert } from "lucide-react";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/features/console/user/hooks/use-user";

type GuardRender = (children: React.ReactNode) => React.ReactNode;

function Guard({
	access = "admin",
	loading,
	fallback,
	children,
}: {
	access?: string;
	loading?: React.ReactNode | GuardRender;
	fallback?: React.ReactNode | GuardRender;
	children: React.ReactNode;
}): React.ReactNode {
	const { user, isLoading } = useUser();
	const noAccess = access && user?.role !== access;

	if (isLoading) {
		return typeof loading === "function"
			? loading(children)
			: (loading ?? <>Loading...</>);
	}
	if (noAccess) {
		return typeof fallback === "function"
			? fallback(children)
			: (fallback ?? <>No permission</>);
	}
	return children;
}

function GuardPanel({
	children,
	fallback,
	loading,
}: {
	children: React.ReactNode;
	fallback?: React.ReactNode;
	loading?: React.ReactNode;
}) {
	return (
		<Guard
			fallback={
				fallback || (
					<div className="flex h-[400px] items-center justify-center p-6 text-center">
						<Alert className="max-w-md" variant="destructive">
							<ShieldAlert className="h-4 w-4" />
							<AlertTitle>Access Denied</AlertTitle>
							<AlertDescription>
								You do not have the required permissions to view this content.
								Please contact your system administrator if you believe this is
								an error.
							</AlertDescription>
						</Alert>
					</div>
				)
			}
			loading={
				loading || (
					<div className="space-y-4 p-6">
						<Skeleton className="h-6 w-48" />
						<Skeleton className="h-4 w-72" />
						<div className="space-y-3 pt-4">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-3/4" />
						</div>
					</div>
				)
			}
		>
			{children}
		</Guard>
	);
}

function GuardAction({ children }: { children: React.ReactNode }) {
	return (
		<Guard
			fallback={(ch) => (
				<Tooltip>
					<TooltipTrigger asChild>
						<span className="inline-flex">
							{React.cloneElement(
								ch as React.ReactElement<Record<string, unknown>>,
								{ disabled: true },
							)}
						</span>
					</TooltipTrigger>
					<TooltipContent>No permission</TooltipContent>
				</Tooltip>
			)}
			loading={(ch) => (
				<Tooltip>
					<TooltipTrigger asChild>
						<span className="inline-flex">
							{React.cloneElement(
								ch as React.ReactElement<Record<string, unknown>>,
								{ disabled: true },
							)}
						</span>
					</TooltipTrigger>
					<TooltipContent>Loading...</TooltipContent>
				</Tooltip>
			)}
		>
			{children}
		</Guard>
	);
}

export { Guard, GuardPanel, GuardAction };
