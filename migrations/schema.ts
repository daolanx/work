import { sql } from "drizzle-orm";
import {
	date,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	unique,
} from "drizzle-orm/pg-core";

export const users = pgTable(
	"users",
	{
		id: serial().primaryKey().notNull(),
		name: text().notNull(),
		email: text().notNull(),
		createdAt: timestamp("created_at", { mode: "string" })
			.defaultNow()
			.notNull(),
	},
	(table) => [unique("users_email_unique").on(table.email)],
);

export const visitStats = pgTable(
	"visit_stats",
	{
		id: serial().primaryKey().notNull(),
		date: date().notNull(),
		desktop: integer().default(0).notNull(),
		mobile: integer().default(0).notNull(),
	},
	(table) => [unique("visit_stats_date_unique").on(table.date)],
);

export const tasks = pgTable("tasks", {
	id: serial().primaryKey().notNull(),
	header: text().notNull(),
	type: text().notNull(),
	status: text().default("To Do").notNull(),
	target: integer(),
	limit: integer(),
	reviewer: text().default("Assign reviewer"),
	createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});
