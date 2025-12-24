CREATE TABLE "deals" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_id" integer NOT NULL,
	"title" varchar(150) NOT NULL,
	"description" text NOT NULL,
	"original_price" numeric(10, 2) NOT NULL,
	"deal_price" numeric(10, 2) NOT NULL,
	"quantity_total" integer NOT NULL,
	"quantity_left" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"image_url" varchar(500),
	"pickup_location" varchar(200) NOT NULL,
	"status" varchar(20) DEFAULT 'active',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "deals" ADD CONSTRAINT "deals_business_id_business_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."business"("id") ON DELETE cascade ON UPDATE no action;