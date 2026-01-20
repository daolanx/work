CREATE TYPE "public"."status" AS ENUM('Done', 'In Process', 'To Do', 'Canceled');--> statement-breakpoint
CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"header" text NOT NULL,
	"type" text NOT NULL,
	"status" "status" DEFAULT 'To Do' NOT NULL,
	"target" integer,
	"limit" integer,
	"reviewer" text DEFAULT 'Assign reviewer',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
