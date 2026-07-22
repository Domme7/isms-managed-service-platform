/**
 * Seed-Loader — schreibt den synthetischen `DEMO_SEED` (`@isms/demo-seed`) idempotent in die DB.
 *
 * Nutzt ausschließlich die tenant-scoped Repositories: jedes Objekt/jede Beziehung wird unter
 * IHREM eigenen `tenant_id` upsertet (Deny by Default bleibt gewahrt — kein Bulk-Insert, der
 * den Mandanten umgeht). Da alle IDs/Zeitstempel im Seed fest kodiert sind, ist "erneut laden"
 * = identischer Zustand (Idempotenz, `.claude/rules/demo-data.md`).
 */

import { DEMO_SEED, type DemoSeed } from '@isms/demo-seed';
import type { IsmsDb } from './client';
import { objects, relationships } from './schema';
import { objectsRepo, relationshipsRepo } from './repositories';

export interface SeedLoadResult {
  readonly objects: number;
  readonly relationships: number;
}

/**
 * Lädt den Seed idempotent. Erst Objekte, dann Beziehungen (referenzielle Reihenfolge).
 * Rückgabe: Anzahl geschriebener Objekte/Beziehungen (== Seed-Umfang).
 */
export async function loadDemoSeed(
  db: IsmsDb,
  seed: DemoSeed = DEMO_SEED,
): Promise<SeedLoadResult> {
  for (const obj of seed.objects) {
    await objectsRepo.upsert(db, obj.tenant_id, obj);
  }
  for (const rel of seed.relationships) {
    await relationshipsRepo.upsert(db, rel.tenant_id, rel);
  }
  return { objects: seed.objects.length, relationships: seed.relationships.length };
}

/**
 * Administratives/Test-only Vollreset: leert BEIDE Tabellen. Bewusst NICHT tenant-scoped und
 * daher NICHT Teil der Repository-API und NICHT aus der Paketwurzel re-exportiert (LOW-1).
 * Ausschließlich für Test-Setup/lokale Neuinitialisierung; ein Laufzeit-Guard verhindert die
 * versehentliche Ausführung in Produktion.
 */
export async function reset(db: IsmsDb): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('reset() ist test/admin-only');
  }
  await db.delete(relationships);
  await db.delete(objects);
}
