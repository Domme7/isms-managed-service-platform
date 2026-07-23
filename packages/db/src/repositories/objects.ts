/**
 * Objekt-Repository — TENANT-SCOPED, Deny by Default (Dok. 18 TA04 / Dok. 19 SP01/SP03).
 *
 * Harte Regel: JEDE Funktion nimmt `tenantId` als ersten Parameter, und KEINE Query läuft
 * ohne `eq(objects.tenant_id, tenantId)`. Es gibt bewusst keine tenant-lose Lese-/Schreib-API.
 */

import { and, eq } from 'drizzle-orm';
import type { ObjectEnvelope } from '@isms/contracts';
import type { IsmsDb } from '../client';
import { objects } from '../schema';
import { objectToRow, rowToObject } from './mappers';

/** Alle Objekte genau eines Mandanten. */
export async function listByTenant(db: IsmsDb, tenantId: string): Promise<ObjectEnvelope[]> {
  const rows = await db.select().from(objects).where(eq(objects.tenant_id, tenantId));
  return rows.map(rowToObject);
}

/** Ein Objekt des Mandanten oder `undefined` — fremder Tenant liefert nie einen Treffer. */
export async function getById(
  db: IsmsDb,
  tenantId: string,
  objectId: string,
): Promise<ObjectEnvelope | undefined> {
  const rows = await db
    .select()
    .from(objects)
    .where(and(eq(objects.tenant_id, tenantId), eq(objects.object_id, objectId)))
    .limit(1);
  const row = rows[0];
  return row ? rowToObject(row) : undefined;
}

/**
 * Upsert (idempotent) eines Objekts UNTER `tenantId`. Der Mapper weist einen abweichenden
 * Envelope-`tenant_id` ab; der Conflict-Target ist der zusammengesetzte PK (tenant_id, object_id).
 */
export async function upsert(db: IsmsDb, tenantId: string, obj: ObjectEnvelope): Promise<void> {
  const row = objectToRow(tenantId, obj);
  const { tenant_id: _t, object_id: _o, ...updatable } = row;
  await db
    .insert(objects)
    .values(row)
    .onConflictDoUpdate({
      target: [objects.tenant_id, objects.object_id],
      set: updatable,
    });
}
