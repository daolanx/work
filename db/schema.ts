import {
	integer,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const statusEnum = pgEnum("status", [
	"Done",
	"In Process",
	"To Do",
	"Canceled",
]);

export const tasks = pgTable("tasks", {
	id: serial("id").primaryKey(),
	header: text("header").notNull(),
	type: text("type").notNull(),
	status: statusEnum("status").default("To Do").notNull(),
	target: integer("target"),
	limit: integer("limit"),
	reviewer: text("reviewer").default("Assign reviewer"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
