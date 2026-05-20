import { GithubIcon, GoogleIcon } from "@/components/ui/icons";
import {
	signInWithGithub,
	signInWithGoogle,
} from "@/features/console/auth/lib/client";

export const OAUTH_PROVIDERS = [
	{
		id: "google",
		label: "Google",
		icon: GoogleIcon,
		signIn: signInWithGoogle,
	},
	{
		id: "github",
		label: "GitHub",
		icon: GithubIcon,
		signIn: signInWithGithub,
	},
] as const;

export const LOGIN_TYPE = {
	normal: "normal",
	demo: "demo",
} as const;

export type LoginType = (typeof LOGIN_TYPE)[keyof typeof LOGIN_TYPE];
