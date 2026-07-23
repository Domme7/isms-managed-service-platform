/**
 * Envelope ↔ Row-Mapping zwischen `@isms/contracts` und dem Drizzle-Schema.
 *
 * Regeln:
 *   - Beim LESEN wird der rekonstruierte Envelope gegen `@isms/contracts` (Zod) validiert —
 *     die Persistenz kann so den Vertrag nicht still verletzen (Context Pack: "Zod-validieren
 *     beim Lesen erwünscht").
 *   - Offene bitemporale Intervalle werden kanonisch als `null` geführt (valid_to/replaced_at),
 *     nicht durch Weglassen — eindeutige, treue Darstellung.
 *   - Optionale Skalar-/Objektfelder werden nur gesetzt, wenn in der Zeile vorhanden (≠ null),
 *     passend zur `optional`-Semantik des Vertrags.
 */

import {
  ObjectEnvelope,
  RelationshipEnvelope,
  type OwnerRef,
  type SourceRef,
} from '@isms/contracts';
import type { NewObjectRow, NewRelationshipRow, ObjectRow, RelationshipRow } from '../schema';

/* -------------------------------------------------------------------------- */
/* Objekt                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Envelope → Insert-Row. `tenantId` ist der autoritative Mandant (Deny by Default):
 * ein abweichender `tenant_id` im Envelope wird als Cross-Tenant-Versuch abgewiesen.
 */
export function objectToRow(tenantId: string, obj: ObjectEnvelope): NewObjectRow {
  if (obj.tenant_id !== tenantId) {
    throw new Error(
      `Tenant-Mismatch beim Schreiben von Objekt "${obj.object_id}": ` +
        `Envelope-tenant_id "${obj.tenant_id}" != erzwungener Tenant "${tenantId}".`,
    );
  }
  return {
    object_id: obj.object_id,
    tenant_id: tenantId,
    object_type: obj.object_type,
    display_name: obj.display_name,
    lifecycle_status: obj.lifecycle_status,
    valid_from: obj.valid_time.from,
    valid_to: obj.valid_time.to ?? null,
    recorded_at: obj.record_time.recorded_at,
    replaced_at: obj.record_time.replaced_at ?? null,
    version: obj.version,
    scope_ids: obj.scope_ids,
    owner_ids: obj.owner_ids,
    classification: obj.classification,
    source_refs: obj.source_refs,
    quality_state: obj.quality_state,
    description: obj.description ?? null,
    tags_custom_fields: obj.tags_custom_fields ?? null,
  };
}

/** Row → validierter Envelope (Zod-`parse`; wirft bei Vertragsverletzung). */
export function rowToObject(row: ObjectRow): ObjectEnvelope {
  const raw: Record<string, unknown> = {
    object_id: row.object_id,
    tenant_id: row.tenant_id,
    object_type: row.object_type,
    display_name: row.display_name,
    lifecycle_status: row.lifecycle_status,
    scope_ids: row.scope_ids,
    owner_ids: row.owner_ids,
    classification: row.classification,
    source_refs: row.source_refs,
    quality_state: row.quality_state,
    valid_time: { from: row.valid_from, to: row.valid_to },
    record_time: { recorded_at: row.recorded_at, replaced_at: row.replaced_at },
    version: row.version,
  };
  if (row.description != null) raw.description = row.description;
  if (row.tags_custom_fields != null) raw.tags_custom_fields = row.tags_custom_fields;
  return ObjectEnvelope.parse(raw);
}

/* -------------------------------------------------------------------------- */
/* Beziehung                                                                   */
/* -------------------------------------------------------------------------- */

export function relationshipToRow(tenantId: string, rel: RelationshipEnvelope): NewRelationshipRow {
  if (rel.tenant_id !== tenantId) {
    throw new Error(
      `Tenant-Mismatch beim Schreiben von Beziehung "${rel.relationship_id}": ` +
        `Envelope-tenant_id "${rel.tenant_id}" != erzwungener Tenant "${tenantId}".`,
    );
  }
  return {
    relationship_id: rel.relationship_id,
    tenant_id: tenantId,
    relationship_type: rel.relationship_type,
    source_id: rel.source_id,
    target_id: rel.target_id,
    direction: rel.direction,
    assertion_kind: rel.assertion_kind,
    valid_from: rel.valid_time.from,
    valid_to: rel.valid_time.to ?? null,
    recorded_at: rel.record_time.recorded_at,
    replaced_at: rel.record_time.replaced_at ?? null,
    version: rel.version ?? null,
    status: rel.status ?? null,
    confidence: rel.confidence ?? null,
    source_refs: rel.source_refs ?? null,
    owner_ids: rel.owner_ids ?? null,
    weight: rel.weight ?? null,
    effectiveness_assumption: rel.effectiveness_assumption ?? null,
    tags_custom_fields: rel.tags_custom_fields ?? null,
  };
}

export function rowToRelationship(row: RelationshipRow): RelationshipEnvelope {
  const raw: Record<string, unknown> = {
    relationship_id: row.relationship_id,
    tenant_id: row.tenant_id,
    relationship_type: row.relationship_type,
    source_id: row.source_id,
    target_id: row.target_id,
    direction: row.direction,
    assertion_kind: row.assertion_kind,
    valid_time: { from: row.valid_from, to: row.valid_to },
    record_time: { recorded_at: row.recorded_at, replaced_at: row.replaced_at },
  };
  if (row.version != null) raw.version = row.version;
  if (row.status != null) raw.status = row.status;
  if (row.confidence != null) raw.confidence = row.confidence;
  if (row.source_refs != null) raw.source_refs = row.source_refs as SourceRef[];
  if (row.owner_ids != null) raw.owner_ids = row.owner_ids as OwnerRef[];
  if (row.weight != null) raw.weight = row.weight;
  if (row.effectiveness_assumption != null) {
    raw.effectiveness_assumption = row.effectiveness_assumption;
  }
  if (row.tags_custom_fields != null) raw.tags_custom_fields = row.tags_custom_fields;
  return RelationshipEnvelope.parse(raw);
}
