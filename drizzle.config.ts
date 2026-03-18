import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
	schema: "./db/*.schema.ts",
	out: "./migrations",
	dialect: "postgresql",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: DATABASE_URL is required for production
		url: process.env.DATABASE_URL!,
	},
});
