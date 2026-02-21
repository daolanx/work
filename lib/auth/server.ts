import { creem } from "@creem_io/better-auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { db, schema } from "@/db";
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/email";

export const auth = betterAuth({
	trustedOrigins: [
		process.env.BETTER_AUTH_URL!,
		process.env.CREEM_DEBUG_URL!,
	].filter(Boolean),
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	session: {
		strategy: "jwt",
		expiresIn: 60 * 60 * 24 * 7,
		updateAge: 60 * 60 * 24,
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		resetPasswordTokenExpiresIn: 60 * 60, // 1h
		sendResetPassword: async ({ user, url }, _request) => {
			sendPasswordResetEmail(user, url);
		},
		onPasswordReset: async ({ user }, _request) => {
			console.log(`Password for user ${user.email} has been reset.`);
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url }) => {
			sendVerificationEmail(user, url);
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
	plugins: [
		nextCookies(),
		admin({
			initAdmin: true,
			defaultRole: "user",
		}),
		creem({
			apiKey: process.env.CREEM_API_KEY!,
			webhookSecret: process.env.CREEM_WEBHOOK_SECRET,
			testMode: true,
			// defaultSuccessUrl: '/success',
			persistSubscriptions: true,

			onCheckoutCompleted: async ({ customer, product }) => {
				console.log("[onCheckoutCompleted]", customer, product);
				// console.log(`${customer.email} purchased ${product.name}`);
			},
			onGrantAccess: async ({ customer, metadata }) => {
				const userId = metadata?.referenceId as string;
				console.log("[onGrantAccess]", userId, customer);
				// await grantAccess(userId, customer.email);
			},
			onRevokeAccess: async ({ metadata }) => {
				const userId = metadata?.referenceId as string;

				// await revokeAccess(userId, customer.email);
			},
		}),
	],
});

export type Auth = typeof auth;
