import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db, schema } from "@/db";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		nextCookies(),
		// admin({
		//   defaultRole: "user",
		//   adminRoles: ["admin"],
		// }),
	],

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
});

// import { headers } from "next/headers";
// import { cache } from "react";
// import { auth } from "./server";

// export const getServerSession = cache(async () => {
//   return await auth.api.getSession({ headers: await headers() });
// });
