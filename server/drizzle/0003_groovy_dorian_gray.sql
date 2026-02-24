ALTER TABLE "P2C" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "P2C" ALTER COLUMN "longitude" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "P2C" ALTER COLUMN "longitude" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "P2C" ALTER COLUMN "latitude" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "P2C" ALTER COLUMN "latitude" SET NOT NULL;