import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { DEMO_SEED } from '@isms/demo-seed';
import { objectsRepo, relationshipsRepo } from './repositories';
// `reset` ist bewusst nur test/admin-intern verfügbar (nicht aus der Paketwurzel exportiert).
import { loadDemoSeed, reset } from './seed-loader';
import { freshMemoryDb } from './testkit';
import type { DbHandle } from './client';

const TENANT_NORDWERK = 'tenant-nordwerk';
const TENANT_OPERATOR = 'tenant-consulting-operator';

/**
 * Erwarteter Seed-Umfang (bewusst hart kodiert, damit stille Fixture-Drift auffällt):
 * Gesamt 40 Objekte / 54 Beziehungen, davon Nordwerk 31/43 (ISMS-Kerngraph 17/15 aus WP-003
 * plus Managed-Service-Schicht 14/28 aus WP-012) und Consulting Operator Demo 9/11.
 */
const EXPECTED = {
  totalObjects: 40,
  totalRelationships: 54,
  nordwerkObjects: 31,
  nordwerkRelationships: 43,
  operatorObjects: 9,
  operatorRelationships: 11,
} as const;

/**
 * Test 3 + 5 (WP-007): Seed lädt idempotent; DB-Zahlen == DEMO_SEED (gesamt und je Mandant);
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

  it('DEMO_SEED umfasst 40 Objekte und 54 Beziehungen (Fixture-Kontrolle)', () => {
    expect(DEMO_SEED.objects).toHaveLength(EXPECTED.totalObjects);
    expect(DEMO_SEED.relationships).toHaveLength(EXPECTED.totalRelationships);

    // Verteilung je Mandant (Nordwerk + Consulting Operator Demo tragen Objekte).
    const objectsOf = (tenantId: string) =>
      DEMO_SEED.objects.filter((o) => o.tenant_id === tenantId);
    const relsOf = (tenantId: string) =>
      DEMO_SEED.relationships.filter((r) => r.tenant_id === tenantId);
    expect(objectsOf(TENANT_NORDWERK)).toHaveLength(EXPECTED.nordwerkObjects);
    expect(relsOf(TENANT_NORDWERK)).toHaveLength(EXPECTED.nordwerkRelationships);
    expect(objectsOf(TENANT_OPERATOR)).toHaveLength(EXPECTED.operatorObjects);
    expect(relsOf(TENANT_OPERATOR)).toHaveLength(EXPECTED.operatorRelationships);
  });

  it('loadDemoSeed schreibt exakt den Seed-Umfang in die DB (tenant-scoped gelesen)', async () => {
    const result = await loadDemoSeed(handle.db);
    expect(result).toEqual({
      objects: EXPECTED.totalObjects,
      relationships: EXPECTED.totalRelationships,
    });

    // Tenant-scoped gelesen ergibt die Summe wieder exakt den Seed-Umfang – ohne dass ein
    // Mandant Objekte des anderen sieht.
    const nordwerkObjs = await objectsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    const nordwerkRels = await relationshipsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    const operatorObjs = await objectsRepo.listByTenant(handle.db, TENANT_OPERATOR);
    const operatorRels = await relationshipsRepo.listByTenant(handle.db, TENANT_OPERATOR);

    expect(nordwerkObjs).toHaveLength(EXPECTED.nordwerkObjects);
    expect(nordwerkRels).toHaveLength(EXPECTED.nordwerkRelationships);
    expect(operatorObjs).toHaveLength(EXPECTED.operatorObjects);
    expect(operatorRels).toHaveLength(EXPECTED.operatorRelationships);
    expect(nordwerkObjs.length + operatorObjs.length).toBe(DEMO_SEED.objects.length);
    expect(nordwerkRels.length + operatorRels.length).toBe(DEMO_SEED.relationships.length);
  });

  it('ist idempotent: zweimal laden ⇒ gleiche Counts, keine Duplikate', async () => {
    await loadDemoSeed(handle.db);
    await loadDemoSeed(handle.db);

    const objs = await objectsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    const rels = await relationshipsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    expect(objs).toHaveLength(EXPECTED.nordwerkObjects);
    expect(rels).toHaveLength(EXPECTED.nordwerkRelationships);

    expect(await objectsRepo.listByTenant(handle.db, TENANT_OPERATOR)).toHaveLength(
      EXPECTED.operatorObjects,
    );
    expect(await relationshipsRepo.listByTenant(handle.db, TENANT_OPERATOR)).toHaveLength(
      EXPECTED.operatorRelationships,
    );
  });

  it('geladene Beziehungen sind referenziell intakt und tenant-konsistent (je Mandant)', async () => {
    await loadDemoSeed(handle.db);

    // Wichtig: die Prüfung läuft je Mandant. Eine Kante muss allein innerhalb der
    // tenant-scoped Sicht auflösen – sonst wäre sie faktisch mandantenübergreifend.
    for (const tenantId of [TENANT_NORDWERK, TENANT_OPERATOR]) {
      const objs = await objectsRepo.listByTenant(handle.db, tenantId);
      const rels = await relationshipsRepo.listByTenant(handle.db, tenantId);
      const objectIds = new Set(objs.map((o) => o.object_id));

      const violations = rels.flatMap((rel) => {
        const problems: string[] = [];
        if (rel.tenant_id !== tenantId) problems.push(`${rel.relationship_id}: fremder Tenant`);
        if (!objectIds.has(rel.source_id)) problems.push(`${rel.relationship_id}: source fehlt`);
        if (!objectIds.has(rel.target_id)) problems.push(`${rel.relationship_id}: target fehlt`);
        return problems;
      });
      expect(violations, `Verletzungen in ${tenantId}`).toEqual([]);
    }
  });

  it('reset() (test/admin-only) leert beide Tabellen', async () => {
    await loadDemoSeed(handle.db);
    expect(await objectsRepo.listByTenant(handle.db, TENANT_NORDWERK)).toHaveLength(
      EXPECTED.nordwerkObjects,
    );

    await reset(handle.db);

    expect(await objectsRepo.listByTenant(handle.db, TENANT_NORDWERK)).toEqual([]);
    expect(await relationshipsRepo.listByTenant(handle.db, TENANT_NORDWERK)).toEqual([]);
    expect(await objectsRepo.listByTenant(handle.db, TENANT_OPERATOR)).toEqual([]);
    expect(await relationshipsRepo.listByTenant(handle.db, TENANT_OPERATOR)).toEqual([]);
  });
});
