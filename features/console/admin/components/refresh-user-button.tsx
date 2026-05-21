"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { GuardAction } from "@/features/console/admin/components/guard";
import { useAdminUsers } from "../hooks/use-admin";

export function RefreshUserButton() {
	const { mutate, isLoading, isValidating } = useAdminUsers();

	const refreshing = isValidating && !isLoading;

	return (
		<GuardAction>
			<Button
				disabled={refreshing}
				onClick={() => mutate()}
				size="sm"
				variant="outline"
			>
				{refreshing ? (
					<Spinner className="mr-2" />
				) : (
					<RefreshCw className="mr-2 h-4 w-4" />
				)}
				Refresh
			</Button>
		</GuardAction>
	);
}
