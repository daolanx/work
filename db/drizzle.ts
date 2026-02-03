import { drizzle } from "drizzle-orm/neon-http";

// Next.js automatically handles process.env, so no dotenv config needed here.
// biome-ignore lint/style/noNonNullAssertion: DATABASE_URL is required
export const db = drizzle(process.env.DATABASE_URL!);