import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env" }); // or .env.local
// biome-ignore lint/style/noNonNullAssertion: DATABASE_URL is required for production
export const db = drizzle(process.env.DATABASE_URL!);
