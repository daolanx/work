import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { AUTH_CONFIG } from "@/lib/auth/paths";

export const authClient = createAuthClient({
	plugins: [adminClient()],
});

const signInSocial = async (provider: "github" | "google") => {
	return await authClient.signIn.social({
		provider,
		callbackURL: AUTH_CONFIG.defaultRedirectPath,
	});
};

export const signInWithGithub = () => signInSocial("github");
export const signInWithGoogle = () => signInSocial("google");
