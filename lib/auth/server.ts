import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db, schema } from "@/db";
import { sendEmail } from "@/lib/email";

const isProd = process.env.NODE_ENV === "production";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		resetPasswordTokenExpiresIn: 60 * 60, // 1h
		sendResetPassword: async ({ user, url, token }, request) => {
			// In development, we only log to console to save Resend quota
			if (!isProd) {
				console.log("--- [DEV] Password Reset Link ---");
				console.log(`To: ${user.email}`);
				console.log(`URL: ${url}`);
				console.log("---------------------------------");
				return;
			}

			// In production, send the actual email via Resend
			await sendEmail({
				to: user.email,
				subject: "Reset your password",
				text: `Indie Console: Click the link to reset your password: ${url}`,
			});
		},
		onPasswordReset: async ({ user }, request) => {
			console.log(`Password for user ${user.email} has been reset.`);
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url, token }) => {
			// Environment check for verification emails
			if (!isProd) {
				console.log("--- [DEV] Email Verification Link ---");
				console.log(`To: ${user.email}`);
				console.log(`URL: ${url}`);
				console.log("--------------------------------------");
				return;
			}

			await sendEmail({
				to: user.email,
				subject: "Verify your email address",
				text: `Indie Console: Click the link to verify your email: ${url}`,
			});
		},
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
		google: {
			prompt: "select_account",
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	plugins: [nextCookies()],
});

export type Auth = typeof auth;
