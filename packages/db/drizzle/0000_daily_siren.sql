CREATE TABLE "objects" (
	"object_id" text NOT NULL,
	"tenant_id" text NOT NULL,
	"object_type" text NOT NULL,
	"display_name" text NOT NULL,
	"lifecycle_status" text NOT NULL,
	"valid_from" text NOT NULL,
	"valid_to" text,
	"recorded_at" text NOT NULL,
	"replaced_at" text,
	"version" integer NOT NULL,
	"scope_ids" jsonb NOT NULL,
	"owner_ids" jsonb NOT NULL,
	"classification" jsonb NOT NULL,
	"source_refs" jsonb NOT NULL,
	"quality_state" jsonb NOT NULL,
	"description" jsonb,
	"tags_custom_fields" jsonb,
	CONSTRAINT "objects_tenant_id_object_id_pk" PRIMARY KEY("tenant_id","object_id")
);
--> statement-breakpoint
CREATE TABLE "relationships" (
	"relationship_id" text NOT NULL,
	"tenant_id" text NOT NULL,
	"relationship_type" text NOT NULL,
	"source_id" text NOT NULL,
	"target_id" text NOT NULL,
	"direction" text DEFAULT 'gerichtet' NOT NULL,
	"assertion_kind" text NOT NULL,
	"valid_from" text NOT NULL,
	"valid_to" text,
	"recorded_at" text NOT NULL,
	"replaced_at" text,
	"version" integer,
	"status" jsonb,
	"confidence" jsonb,
	"source_refs" jsonb,
	"owner_ids" jsonb,
	"weight" jsonb,
	"effectiveness_assumption" jsonb,
	"tags_custom_fields" jsonb,
	CONSTRAINT "relationships_tenant_id_relationship_id_pk" PRIMARY KEY("tenant_id","relationship_id")
);
--> statement-breakpoint
CREATE INDEX "objects_tenant_type_idx" ON "objects" USING btree ("tenant_id","object_type");--> statement-breakpoint
CREATE INDEX "relationships_tenant_source_idx" ON "relationships" USING btree ("tenant_id","source_id");--> statement-breakpoint
CREATE INDEX "relationships_tenant_target_idx" ON "relationships" USING btree ("tenant_id","target_id");