/**
 * Beziehungs-Repository — TENANT-SCOPED, Deny by Default (Dok. 18 TA04 / Dok. 19 SP01/SP03).
 *
 * Wie das Objekt-Repository: `tenantId` ist Pflicht-Erstparameter; keine Query ohne
 * `eq(relationships.tenant_id, tenantId)`.
 */

import { and, eq } from 'drizzle-orm';
import type { RelationshipEnvelope } from '@isms/contracts';
import type { IsmsDb } from '../client';
import { relationships } from '../schema';
import { relationshipToRow, rowToRelationship } from './mappers';

/** Alle Beziehungen genau eines Mandanten. */
export async function listByTenant(
  db: IsmsDb,
  tenantId: string,
): Promise<RelationshipEnvelope[]> {
  const rows = await db
    .select()
    .from(relationships)
    .where(eq(relationships.tenant_id, tenantId));
  return rows.map(rowToRelationship);
}

/** Eine Beziehung des Mandanten oder `undefined` — fremder Tenant liefert nie einen Treffer. */
export async function getById(
  db: IsmsDb,
  tenantId: string,
  relationshipId: string,
): Promise<RelationshipEnvelope | undefined> {
  const rows = await db
    .select()
    .from(relationships)
    .where(
      and(
        eq(relationships.tenant_id, tenantId),
        eq(relationships.relationship_id, relationshipId),
      ),
    )
    .limit(1);
  const row = rows[0];
  return row ? rowToRelationship(row) : undefined;
}

/** Upsert (idempotent) einer Beziehung UNTER `tenantId`; Conflict-Target = PK (tenant_id, relationship_id). */
export async function upsert(
  db: IsmsDb,
  tenantId: string,
  rel: RelationshipEnvelope,
): Promise<void> {
  const row = relationshipToRow(tenantId, rel);
  const { tenant_id: _t, relationship_id: _r, ...updatable } = row;
  await db
    .insert(relationships)
    .values(row)
    .onConflictDoUpdate({
      target: [relationships.tenant_id, relationships.relationship_id],
      set: updatable,
    });
}
