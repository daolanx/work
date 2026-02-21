// components/buy-license-button.tsx
"use client";

import { useState } from "react";
import { useUser } from "@/app/console/_hooks/useUser";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";

export function CheckoutButton({
	productId,
	name,
}: {
	productId: string;
	name: string;
}) {
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useUser();
	const handlePurchase = async () => {
		setIsLoading(true);
		try {
			const { data, error } = await authClient.creem.createCheckout({
				productId: productId,
				successUrl: `${window.location.origin}/console/plans?payment=success`,
				metadata: {
					referenceId: user?.id,
				},
			});

			if (error) {
				alert(error.message);
				return;
			}

			if (data && "url" in data && data.url) {
				window.location.href = data.url;
			} else if (data && "error" in data) {
				alert(data.error);
			}
		} catch (err) {
			console.error("Purchase error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
			disabled={isLoading}
			onClick={handlePurchase}
		>
			{isLoading ? "Redirect..." : name}
		</Button>
	);
}
