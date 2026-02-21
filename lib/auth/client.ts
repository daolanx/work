import { creemClient } from "@creem_io/better-auth/client";
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { AUTH_CONFIG } from "@/lib/auth/paths";

export const authClient = createAuthClient({
	// baseURL: "http://localhost:3000",
	plugins: [adminClient(), creemClient()],
});

const signInSocial = async (provider: "github" | "google") => {
	return await authClient.signIn.social({
		provider,
		callbackURL: AUTH_CONFIG.defaultRedirectPath,
	});
};

export const signInWithGithub = () => signInSocial("github");
export const signInWithGoogle = () => signInSocial("google");
