import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as authSchema from "./auth.schema";
import * as bizSchema from "./biz.schema";

const sql = neon(process.env.DATABASE_URL!);

export const schema = { ...authSchema, ...bizSchema };

export const db = drizzle(sql, {
	schema,
});
