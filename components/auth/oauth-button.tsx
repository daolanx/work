"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GithubIcon, GoogleIcon } from "@/components/ui/icons";
import { signInWithGithub, signInWithGoogle } from "@/lib/auth/client";

interface OAuthButtonProps {
	provider: "google" | "github";
	disabled?: boolean;
	onLoading?: (loading: boolean) => void;
}

const PROVIDER_CONFIG = {
	google: {
		label: "Google",
		icon: GoogleIcon,
		signIn: signInWithGoogle,
	},
	github: {
		label: "GitHub",
		icon: GithubIcon,
		signIn: signInWithGithub,
	},
};

export function OAuthButton({
	provider,
	disabled,
	onLoading,
}: OAuthButtonProps) {
	const [isLoading, setIsLoading] = useState(false);
	const { label, icon: Icon, signIn } = PROVIDER_CONFIG[provider];

	const handleSignIn = async () => {
		setIsLoading(true);
		onLoading?.(true);
		try {
			await signIn();
		} catch (error) {
			console.error(`${label} Sign-in Error:`, error);
			setIsLoading(false);
			onLoading?.(false);
		}
	};

	return (
		<Button
			className="h-11 w-full flex-1 cursor-pointer"
			disabled={disabled || isLoading}
			onClick={handleSignIn}
			type="button"
			variant="outline"
		>
			{isLoading ? (
				<Loader2 className="mr-2 h-4 w-4 animate-spin" />
			) : (
				<Icon className="mr-2" />
			)}
			{label}
		</Button>
	);
}
