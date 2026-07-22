import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ObjectEnvelope, RelationshipEnvelope } from '@isms/contracts';
import { objectsRepo, relationshipsRepo } from './repositories';
import { loadDemoSeed } from './seed-loader';
import { freshMemoryDb } from './testkit';
import type { DbHandle } from './client';

const TENANT_NORDWERK = 'tenant-nordwerk';
const TENANT_FINOVIA = 'tenant-finovia';
const FROM = '2026-02-01T00:00:00.000Z';
const RECORDED = '2026-02-05T08:00:00.000Z';

/** Minimaler, synthetischer Objekt-Envelope für einen ZWEITEN Mandanten (Finovia). */
function finoviaObject(objectId: string): ObjectEnvelope {
  return ObjectEnvelope.parse({
    object_id: objectId,
    tenant_id: TENANT_FINOVIA,
    object_type: 'Information Asset',
    display_name: `Finovia-Asset ${objectId} (synthetisch)`,
    lifecycle_status: 'freigegeben',
    scope_ids: [],
    owner_ids: [],
    classification: {},
    source_refs: [{ source_kind: 'Nutzer', reference: 'finovia-demo', priority: 1 }],
    valid_time: { from: FROM, to: null },
    record_time: { recorded_at: RECORDED, replaced_at: null },
    version: 1,
    quality_state: { dimensions: [] },
  });
}

function finoviaRelationship(): RelationshipEnvelope {
  return RelationshipEnvelope.parse({
    relationship_id: 'finovia-rel-1',
    tenant_id: TENANT_FINOVIA,
    relationship_type: 'part_of',
    source_id: 'finovia-asset-b',
    target_id: 'finovia-asset-a',
    direction: 'gerichtet',
    valid_time: { from: FROM, to: null },
    record_time: { recorded_at: RECORDED, replaced_at: null },
    assertion_kind: 'assertiert',
  });
}

/**
 * Test 4 (WP-007): Tenant-Isolation Positiv + Negativ. Nordwerk-Seed + ein synthetischer
 * zweiter Mandant (Finovia); die tenant-scoped Repositories dürfen NIE über die Grenze lesen.
 */
describe('Tenant-Isolation – Deny by Default (Positiv + Negativ)', () => {
  let handle: DbHandle;

  beforeEach(async () => {
    handle = await freshMemoryDb();
    await loadDemoSeed(handle.db); // Nordwerk-Daten
    await objectsRepo.upsert(handle.db, TENANT_FINOVIA, finoviaObject('finovia-asset-a'));
    await objectsRepo.upsert(handle.db, TENANT_FINOVIA, finoviaObject('finovia-asset-b'));
    await relationshipsRepo.upsert(handle.db, TENANT_FINOVIA, finoviaRelationship());
  });

  afterEach(async () => {
    await handle.close();
  });

  it('Positiv: Finovia sieht seine eigenen Objekte/Beziehungen', async () => {
    const objs = await objectsRepo.listByTenant(handle.db, TENANT_FINOVIA);
    expect(objs.map((o) => o.object_id).sort()).toEqual(['finovia-asset-a', 'finovia-asset-b']);

    const one = await objectsRepo.getById(handle.db, TENANT_FINOVIA, 'finovia-asset-a');
    expect(one?.tenant_id).toBe(TENANT_FINOVIA);

    const rel = await relationshipsRepo.getById(handle.db, TENANT_FINOVIA, 'finovia-rel-1');
    expect(rel?.relationship_id).toBe('finovia-rel-1');
  });

  it('Negativ (Objekte): Nordwerk sieht KEINE Finovia-Objekte', async () => {
    const nordwerkObjs = await objectsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    expect(nordwerkObjs).toHaveLength(17);
    const ids = nordwerkObjs.map((o) => o.object_id);
    expect(ids).not.toContain('finovia-asset-a');
    expect(ids).not.toContain('finovia-asset-b');
    expect(ids.every((id) => id.startsWith('nordwerk-'))).toBe(true);

    // Cross-Tenant getById liefert nichts.
    const leaked = await objectsRepo.getById(handle.db, TENANT_NORDWERK, 'finovia-asset-a');
    expect(leaked).toBeUndefined();
  });

  it('Negativ (Beziehungen): Nordwerk sieht KEINE Finovia-Beziehung', async () => {
    const nordwerkRels = await relationshipsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    expect(nordwerkRels).toHaveLength(15);
    expect(nordwerkRels.map((r) => r.relationship_id)).not.toContain('finovia-rel-1');

    const leaked = await relationshipsRepo.getById(handle.db, TENANT_NORDWERK, 'finovia-rel-1');
    expect(leaked).toBeUndefined();
  });

  it('Negativ (Schreiben): Upsert mit fremdem Tenant-Param wird abgewiesen', async () => {
    // Envelope gehört Finovia, aber unter Nordwerk zu schreiben ist ein Cross-Tenant-Versuch.
    await expect(
      objectsRepo.upsert(handle.db, TENANT_NORDWERK, finoviaObject('finovia-asset-a')),
    ).rejects.toThrow(/Tenant-Mismatch/);

    // Die Finovia-Daten bleiben unverändert, Nordwerk unberührt.
    const nordwerkObjs = await objectsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    expect(nordwerkObjs).toHaveLength(17);
  });

  it('Negativ (Schreiben, Beziehung): Upsert mit fremdem Tenant-Param wird abgewiesen', async () => {
    // Finovia-Beziehung unter Nordwerk zu schreiben ist ein Cross-Tenant-Versuch.
    await expect(
      relationshipsRepo.upsert(handle.db, TENANT_NORDWERK, finoviaRelationship()),
    ).rejects.toThrow(/Tenant-Mismatch/);

    // Nordwerk-Beziehungen bleiben unverändert.
    const nordwerkRels = await relationshipsRepo.listByTenant(handle.db, TENANT_NORDWERK);
    expect(nordwerkRels).toHaveLength(15);
    expect(nordwerkRels.map((r) => r.relationship_id)).not.toContain('finovia-rel-1');
  });
});
