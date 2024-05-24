CREATE TABLE IF NOT EXISTS "invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"create_ts" timestamp DEFAULT now() NOT NULL,
	"user_id" text NOT NULL,
	"description" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"status" text NOT NULL,
	"value" text NOT NULL
);
