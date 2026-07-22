import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DEMO_SEED } from '@isms/demo-seed';
import { objectsRepo, relationshipsRepo } from './repositories';
// `reset` ist bewusst nur test/admin-intern verfügbar (nicht aus der Paketwurzel exportiert).
import { loadDemoSeed, reset } from './seed-loader';
import { freshMemoryDb } from './testkit';
import type { DbHandle } from './client';

const TENANT_NORDWERK = 'tenant-nordwerk';

/**
 * Test 3 + 5 (WP-007): Seed lädt idempotent; DB-Zahlen == DEMO_SEED (17 Objekte / 15 Beziehungen);
 * referenzielle Integrität der geladenen Beziehungen (source/target existieren, gleicher Tenant).
 */
describe('Seed-Loader – Count-Abgleich, Idempotenz, referenzielle Integrität', () => {
  let handle: DbHandle;

  beforeEach(async () => {
    handle = await freshMemoryDb();
  });

  afterEach(async () => {
    await handle.close();
  });

  it('DEMO_SEED umfasst 17 Objekte und 15 Beziehungen (Fixture-Kontrolle)', () => {
    expect(DEMO_SEED.objects).toHaveLength(17);
    expect(DEMO_SEED.relationships).toHaveLength(15);
  });

  it('loadDemoSeed schreibt exakt den Seed-Umfang in die DB', async () => {
    const result = await loadDemoSeed(handle.db);
    expect(result).toEqual({ objects: 17, relationships: 15 });

    const objs = await objectsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    const rels = await relationshipsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    expect(objs).toHaveLength(DEMO_SEED.objects.length);
    expect(rels).toHaveLength(DEMO_SEED.relationships.length);
  });

  it('ist idempotent: zweimal laden ⇒ gleiche Counts, keine Duplikate', async () => {
    await loadDemoSeed(handle.db);
    await loadDemoSeed(handle.db);

    const objs = await objectsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    const rels = await relationshipsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    expect(objs).toHaveLength(17);
    expect(rels).toHaveLength(15);
  });

  it('geladene Beziehungen sind referenziell intakt und tenant-konsistent', async () => {
    await loadDemoSeed(handle.db);

    const objs = await objectsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    const rels = await relationshipsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    const objectIds = new Set(objs.map((o) => o.object_id));

    const violations = rels.flatMap((rel) => {
      const problems: string[] = [];
      if (rel.tenant_id !== TENANT_NORDWERK) problems.push(`${rel.relationship_id}: fremder Tenant`);
      if (!objectIds.has(rel.source_id)) problems.push(`${rel.relationship_id}: source fehlt`);
      if (!objectIds.has(rel.target_id)) problems.push(`${rel.relationship_id}: target fehlt`);
      return problems;
    });
    expect(violations).toEqual([]);
  });

  it('reset() (test/admin-only) leert beide Tabellen', async () => {
    await loadDemoSeed(handle.db);
    expect(await objectsRepo.listByTenant(handle.db, TENANT_NORDWERK)).toHaveLength(17);

    await reset(handle.db);

    expect(await objectsRepo.listByTenant(handle.db, TENANT_NORDWERK)).toEqual([]);
    expect(await relationshipsRepo.listByTenant(handle.db, TENANT_NORDWERK)).toEqual([]);
  });
});
