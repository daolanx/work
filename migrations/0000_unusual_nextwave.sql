CREATE TABLE IF NOT EXISTS "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"header" text NOT NULL,
	"type" text NOT NULL,
	"status" text DEFAULT 'To Do' NOT NULL,
	"target" integer,
	"limit" integer,
	"reviewer" text DEFAULT 'Assign reviewer',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "visit_stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"desktop" integer DEFAULT 0 NOT NULL,
	"mobile" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "visit_stats_date_unique" UNIQUE("date")
);
