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

type ProtectRender = (children: React.ReactNode) => React.ReactNode;

interface IProtect {
	access?: string;
	loading?: React.ReactNode | ProtectRender;
	fallback?: React.ReactNode | ProtectRender;
	children: React.ReactNode;
}

function Protect({
	access,
	loading,
	fallback,
	children,
}: IProtect): React.ReactNode {
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

function ProtectSection({ access, children, fallback, loading }: IProtect) {
	return (
		<Protect
			access={access}
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
		</Protect>
	);
}

function ProtectAction({
	access,
	children,
	disabledTooltip = "No permission",
	loadingTooltip = "Loading...",
}: IProtect & {
	disabledTooltip?: string;
	loadingTooltip?: string;
}) {
	return (
		<Protect
			access={access}
			fallback={(ch) => (
				<Tooltip>
					<TooltipTrigger asChild>
						<span className="inline-flex">
							{React.isValidElement<Record<string, unknown>>(ch)
								? React.cloneElement(ch, { disabled: true })
								: ch}
						</span>
					</TooltipTrigger>
					<TooltipContent>{disabledTooltip}</TooltipContent>
				</Tooltip>
			)}
			loading={(ch) => (
				<Tooltip>
					<TooltipTrigger asChild>
						<span className="inline-flex">
							{React.isValidElement<Record<string, unknown>>(ch)
								? React.cloneElement(ch, { disabled: true })
								: ch}
						</span>
					</TooltipTrigger>
					<TooltipContent>{loadingTooltip}</TooltipContent>
				</Tooltip>
			)}
		>
			{children}
		</Protect>
	);
}

export { Protect, ProtectSection, ProtectAction };
