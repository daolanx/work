"use client";

import { Loader2, Settings2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner"; // Assuming you use sonner or similar for notifications
import { Button } from "@/components/ui/button";
import { authClient } from "@/features/console/auth/lib/client";

export function ManageBillingButton() {
	const t = useTranslations("console");
	const [isLoading, setIsLoading] = useState(false);

	const handlePortal = async () => {
		setIsLoading(true);

		try {
			// Execute the portal creation from the Better Auth Creem plugin
			const { data, error } = await authClient.creem.createPortal();

			// Handle Better-Auth framework errors (e.g., session expired)
			if (error) {
				toast.error(error.message || t("payments.auth-error"));
				return;
			}

			// Safeguard against null data
			if (!data) {
				toast.error(t("payments.no-data"));
				return;
			}

			/**
			 * TYPE GUARD:
			 * Check if 'url' exists in data to satisfy TypeScript.
			 * This resolves: Property 'url' does not exist on type...
			 */
			if ("url" in data) {
				// Success: Redirect the current tab to the Creem Customer Portal
				// window.location.assign is safer than window.open against popup blockers
				window.location.assign(data.url);
			} else if ("error" in data) {
				// Handle API-specific errors returned inside the data object
				toast.error(data.error);
			}
		} catch (err) {
			// Catch unexpected network or runtime errors
			console.error("Portal redirect error:", err);
			toast.error(t("payments.server-error"));
		} finally {
			// Keep loading state until navigation begins
			setIsLoading(false);
		}
	};

	return (
		<Button
			className="w-full gap-2 sm:w-auto"
			disabled={isLoading}
			onClick={handlePortal}
			variant="outline"
		>
			{isLoading ? (
				<>
					<Loader2 className="h-4 w-4 animate-spin" />
					<span>{t("payments.connecting")}</span>
				</>
			) : (
				<>
					<Settings2 className="h-4 w-4" />
					<span>{t("payments.manage-subscription")}</span>
				</>
			)}
		</Button>
	);
}
