import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ObjectEnvelope, RelationshipEnvelope } from '@isms/contracts';
import { objectsRepo, relationshipsRepo } from './repositories';
import { loadDemoSeed } from './seed-loader';
import { freshMemoryDb } from './testkit';
import type { DbHandle } from './client';

const TENANT_NORDWERK = 'tenant-nordwerk';
const TENANT_GREENGRID = 'tenant-greengrid';
const TENANT_OPERATOR = 'tenant-consulting-operator';

/**
 * Seed-Umfang je Mandant (siehe seed-loader.spec.ts): Nordwerk/Nordstern 58 Objekte / 84
 * Beziehungen (ISMS-Kerngraph 17/15 + Managed-Service-Schicht 14/28 + Entscheidungsschicht 3/8
 * + Nordstern-ISMS-Erweiterung 24/33 aus WP-021 Slice 1), Consulting Operator Demo 9/11.
 */
const NORDWERK_OBJECT_COUNT = 58;
const NORDWERK_RELATIONSHIP_COUNT = 84;
const OPERATOR_OBJECT_COUNT = 9;
const FROM = '2026-02-01T00:00:00.000Z';
const RECORDED = '2026-02-05T08:00:00.000Z';

/** Minimaler, synthetischer Objekt-Envelope für einen ZWEITEN Mandanten (GreenGrid). */
function greengridObject(objectId: string): ObjectEnvelope {
  return ObjectEnvelope.parse({
    object_id: objectId,
    tenant_id: TENANT_GREENGRID,
    object_type: 'Information Asset',
    display_name: `GreenGrid-Asset ${objectId} (synthetisch)`,
    lifecycle_status: 'freigegeben',
    scope_ids: [],
    owner_ids: [],
    classification: {},
    source_refs: [{ source_kind: 'Nutzer', reference: 'greengrid-demo', priority: 1 }],
    valid_time: { from: FROM, to: null },
    record_time: { recorded_at: RECORDED, replaced_at: null },
    version: 1,
    quality_state: { dimensions: [] },
  });
}

function greengridRelationship(): RelationshipEnvelope {
  return RelationshipEnvelope.parse({
    relationship_id: 'greengrid-rel-1',
    tenant_id: TENANT_GREENGRID,
    relationship_type: 'part_of',
    source_id: 'greengrid-asset-b',
    target_id: 'greengrid-asset-a',
    direction: 'gerichtet',
    valid_time: { from: FROM, to: null },
    record_time: { recorded_at: RECORDED, replaced_at: null },
    assertion_kind: 'assertiert',
  });
}

/**
 * Test 4 (WP-007): Tenant-Isolation Positiv + Negativ. Nordwerk-Seed + ein synthetischer
 * zweiter Mandant (GreenGrid); die tenant-scoped Repositories dürfen NIE über die Grenze lesen.
 */
describe('Tenant-Isolation – Deny by Default (Positiv + Negativ)', () => {
  let handle: DbHandle;

  beforeEach(async () => {
    handle = await freshMemoryDb();
    await loadDemoSeed(handle.db); // Nordwerk-Daten
    await objectsRepo.upsert(handle.db, TENANT_GREENGRID, greengridObject('greengrid-asset-a'));
    await objectsRepo.upsert(handle.db, TENANT_GREENGRID, greengridObject('greengrid-asset-b'));
    await relationshipsRepo.upsert(handle.db, TENANT_GREENGRID, greengridRelationship());
  });

  afterEach(async () => {
    await handle.close();
  });

  it('Positiv: GreenGrid sieht seine eigenen Objekte/Beziehungen', async () => {
    const objs = await objectsRepo.listByTenant(handle.db, TENANT_GREENGRID);
    expect(objs.map((o) => o.object_id).sort()).toEqual(['greengrid-asset-a', 'greengrid-asset-b']);

    const one = await objectsRepo.getById(handle.db, TENANT_GREENGRID, 'greengrid-asset-a');
    expect(one?.tenant_id).toBe(TENANT_GREENGRID);

    const rel = await relationshipsRepo.getById(handle.db, TENANT_GREENGRID, 'greengrid-rel-1');
    expect(rel?.relationship_id).toBe('greengrid-rel-1');
  });

  it('Negativ (Objekte): Nordwerk sieht KEINE GreenGrid-Objekte', async () => {
    const nordwerkObjs = await objectsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    expect(nordwerkObjs).toHaveLength(NORDWERK_OBJECT_COUNT);
    const ids = nordwerkObjs.map((o) => o.object_id);
    expect(ids).not.toContain('greengrid-asset-a');
    expect(ids).not.toContain('greengrid-asset-b');
    expect(ids.every((id) => id.startsWith('nordwerk-'))).toBe(true);

    // Cross-Tenant getById liefert nichts.
    const leaked = await objectsRepo.getById(handle.db, TENANT_NORDWERK, 'greengrid-asset-a');
    expect(leaked).toBeUndefined();
  });

  it('Negativ (Objekte): Nordwerk sieht KEINE Objekte des Consulting Operator Demo', async () => {
    // Seit WP-012 trägt ein zweiter Seed-Mandant eigene Objekte – die Trennung muss auch
    // zwischen zwei ausmodellierten Mandanten halten, nicht nur gegen einen Testmandanten.
    const nordwerkObjs = await objectsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    const operatorObjs = await objectsRepo.listByTenant(handle.db, TENANT_OPERATOR);

    expect(operatorObjs).toHaveLength(OPERATOR_OBJECT_COUNT);
    expect(operatorObjs.every((o) => o.object_id.startsWith('operator-'))).toBe(true);

    const nordwerkIds = new Set(nordwerkObjs.map((o) => o.object_id));
    expect(operatorObjs.filter((o) => nordwerkIds.has(o.object_id))).toEqual([]);

    // Cross-Tenant getById in beide Richtungen liefert nichts.
    expect(
      await objectsRepo.getById(handle.db, TENANT_NORDWERK, 'operator-service-audit-readiness'),
    ).toBeUndefined();
    expect(
      await objectsRepo.getById(handle.db, TENANT_OPERATOR, 'nordwerk-service-evidence-operations'),
    ).toBeUndefined();
  });

  it('Negativ (Beziehungen): Nordwerk sieht KEINE GreenGrid-Beziehung', async () => {
    const nordwerkRels = await relationshipsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    expect(nordwerkRels).toHaveLength(NORDWERK_RELATIONSHIP_COUNT);
    expect(nordwerkRels.map((r) => r.relationship_id)).not.toContain('greengrid-rel-1');

    const leaked = await relationshipsRepo.getById(handle.db, TENANT_NORDWERK, 'greengrid-rel-1');
    expect(leaked).toBeUndefined();
  });

  it('Negativ (Schreiben): Upsert mit fremdem Tenant-Param wird abgewiesen', async () => {
    // Envelope gehört GreenGrid, aber unter Nordwerk zu schreiben ist ein Cross-Tenant-Versuch.
    await expect(
      objectsRepo.upsert(handle.db, TENANT_NORDWERK, greengridObject('greengrid-asset-a')),
    ).rejects.toThrow(/Tenant-Mismatch/);

    // Die GreenGrid-Daten bleiben unverändert, Nordwerk unberührt.
    const nordwerkObjs = await objectsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    expect(nordwerkObjs).toHaveLength(NORDWERK_OBJECT_COUNT);
  });

  it('Negativ (Schreiben, Beziehung): Upsert mit fremdem Tenant-Param wird abgewiesen', async () => {
    // GreenGrid-Beziehung unter Nordwerk zu schreiben ist ein Cross-Tenant-Versuch.
    await expect(
      relationshipsRepo.upsert(handle.db, TENANT_NORDWERK, greengridRelationship()),
    ).rejects.toThrow(/Tenant-Mismatch/);

    // Nordwerk-Beziehungen bleiben unverändert.
    const nordwerkRels = await relationshipsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    expect(nordwerkRels).toHaveLength(NORDWERK_RELATIONSHIP_COUNT);
    expect(nordwerkRels.map((r) => r.relationship_id)).not.toContain('greengrid-rel-1');
  });
});
