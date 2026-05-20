"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OAUTH_PROVIDERS } from "../constants";

type OAuthProvider = (typeof OAUTH_PROVIDERS)[number];

interface OAuthButtonProps {
	provider: OAuthProvider;
	disabled?: boolean;
	isSubmitting?: boolean;
	onSubmittingEnd?: (id: string | null) => void;
	onSubmittingStart?: (id: string | null) => void;
}

export function OAuthButton({
	provider,
	disabled,
	isSubmitting,
	onSubmittingEnd,
	onSubmittingStart,
}: OAuthButtonProps) {
	const { id, label, icon: Icon, signIn } = provider;

	const handleSignIn = async () => {
		onSubmittingStart?.(id);
		try {
			await signIn();
		} catch (error) {
			console.error(`${label} Sign-in Error:`, error);
			onSubmittingEnd?.(id);
		}
	};

	return (
		<Button
			className="h-11 w-full flex-1 cursor-pointer"
			disabled={disabled || isSubmitting}
			onClick={handleSignIn}
			type="button"
			variant="outline"
		>
			{isSubmitting ? (
				<Loader2 className="mr-2 h-4 w-4 animate-spin" />
			) : (
				<Icon className="mr-2" />
			)}
			{label}
		</Button>
	);
}
