import {
	date,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

import {
	TASK_CATEGORY_ENUM_KEYS,
	TASK_PRIORITY_ENUM_KEYS,
} from "@/constants/task-enums";
import { user } from "./auth.schema";

export const tasks = pgTable("tasks", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	content: text("content"),
	priority: text("priority", { enum: TASK_PRIORITY_ENUM_KEYS }),
	category: text("category", { enum: TASK_CATEGORY_ENUM_KEYS }),
	status: text("status", { enum: ["Done", "In Process", "To Do", "Canceled"] })
		.notNull()
		.default("To Do"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
});

export const visitStats = pgTable("visit_stats", {
	id: serial("id").primaryKey(),
	date: date("date").notNull().unique(),
	desktop: integer("desktop").default(0).notNull(),
	mobile: integer("mobile").default(0).notNull(),
});
