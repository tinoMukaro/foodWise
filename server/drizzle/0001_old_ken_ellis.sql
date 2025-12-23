CREATE TABLE "business" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"type" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"phone" varchar NOT NULL,
	"phone2" varchar,
	"location" varchar NOT NULL,
	"opening_hours" varchar NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "business_email_unique" UNIQUE("email")
);
