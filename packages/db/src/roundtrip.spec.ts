import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ObjectEnvelope, RelationshipEnvelope } from '@isms/contracts';
import { objectsRepo, relationshipsRepo } from './repositories';
import { freshMemoryDb } from './testkit';
import type { DbHandle } from './client';

const TENANT = 'tenant-nordwerk';
const FROM = '2026-01-01T00:00:00.000Z';
const RECORDED = '2026-01-15T08:00:00.000Z';

/**
 * Test 2 (WP-007): Roundtrip mit tiefer Gleichheit inkl. bitemporaler Felder + jsonb.
 * Fixtures setzen offene Intervalle explizit (`to: null`, `replaced_at: null`) und füllen alle
 * jsonb-Teile, damit die Persistenz die Vertragswerte verbatim erhält.
 */
const OBJECT_FIXTURE = ObjectEnvelope.parse({
  object_id: 'rt-object-1',
  tenant_id: TENANT,
  object_type: 'Information Asset',
  display_name: 'Roundtrip Asset (synthetisch)',
  description: 'Synthetisches Objekt für den Roundtrip-Test.',
  lifecycle_status: 'freigegeben',
  scope_ids: [{ scope_id: 'scope-rt', valid_time: { from: FROM, to: null } }],
  owner_ids: [
    {
      owner_id: 'role-rt',
      owner_kind: 'fachlich',
      role: 'Owner',
      valid_time: { from: FROM, to: null },
    },
  ],
  classification: { confidentiality: 'vertraulich', protection_need: 'hoch' },
  source_refs: [{ source_kind: 'Nutzer', reference: 'rt-workshop', priority: 1 }],
  valid_time: { from: FROM, to: null },
  record_time: { recorded_at: RECORDED, replaced_at: null },
  version: 3,
  quality_state: {
    dimensions: [{ dimension: 'Bestätigung', confirmation_level: 'freigegeben' }],
    confidence_indicator: 0.9,
  },
  tags_custom_fields: { demo: true, count: 3, note: 'jsonb-erweiterung' },
});

const RELATIONSHIP_FIXTURE = RelationshipEnvelope.parse({
  relationship_id: 'rt-rel-1',
  tenant_id: TENANT,
  relationship_type: 'mitigates',
  source_id: 'rt-object-1',
  target_id: 'rt-object-1',
  direction: 'gerichtet',
  valid_time: { from: FROM, to: null },
  record_time: { recorded_at: RECORDED, replaced_at: null },
  assertion_kind: 'freigegeben',
  status: 'geprüft',
  source_refs: [{ source_kind: 'Nutzer', reference: 'rt-workshop', priority: 1 }],
  confidence: 0.75,
  owner_ids: [{ owner_id: 'role-rt', owner_kind: 'fachlich' }],
  weight: 0.5,
  effectiveness_assumption: 'Synthetische Wirksamkeitsannahme für den Roundtrip.',
  version: 2,
  tags_custom_fields: { reviewed: true },
});

describe('Roundtrip – Objekt/Beziehung (bitemporal + jsonb)', () => {
  let handle: DbHandle;

  beforeEach(async () => {
    handle = await freshMemoryDb();
  });

  afterEach(async () => {
    await handle.close();
  });

  it('Objekt: upsert → getById liefert tief-gleichen Envelope', async () => {
    await objectsRepo.upsert(handle.db, TENANT, OBJECT_FIXTURE);
    const read = await objectsRepo.getById(handle.db, TENANT, 'rt-object-1');
    expect(read).toEqual(OBJECT_FIXTURE);
    // Bitemporalität explizit geprüft.
    expect(read?.valid_time).toEqual({ from: FROM, to: null });
    expect(read?.record_time).toEqual({ recorded_at: RECORDED, replaced_at: null });
    // jsonb-Erweiterung erhalten.
    expect(read?.tags_custom_fields).toEqual({ demo: true, count: 3, note: 'jsonb-erweiterung' });
  });

  it('Beziehung: upsert → getById liefert tief-gleichen Envelope', async () => {
    await objectsRepo.upsert(handle.db, TENANT, OBJECT_FIXTURE);
    await relationshipsRepo.upsert(handle.db, TENANT, RELATIONSHIP_FIXTURE);
    const read = await relationshipsRepo.getById(handle.db, TENANT, 'rt-rel-1');
    expect(read).toEqual(RELATIONSHIP_FIXTURE);
    expect(read?.valid_time).toEqual({ from: FROM, to: null });
    expect(read?.record_time).toEqual({ recorded_at: RECORDED, replaced_at: null });
    expect(read?.confidence).toBe(0.75);
    expect(read?.weight).toBe(0.5);
  });

  it('upsert ist idempotent (zweiter Aufruf ändert nichts, kein Duplikat)', async () => {
    await objectsRepo.upsert(handle.db, TENANT, OBJECT_FIXTURE);
    await objectsRepo.upsert(handle.db, TENANT, OBJECT_FIXTURE);
    const all = await objectsRepo.listByTenant(handle.db, TENANT);
    expect(all).toHaveLength(1);
    expect(all[0]).toEqual(OBJECT_FIXTURE);
  });

  it('Objekt-Upsert aktualisiert bestehende Zeile (onConflictDoUpdate.set)', async () => {
    await objectsRepo.upsert(handle.db, TENANT, OBJECT_FIXTURE);
    const updated = ObjectEnvelope.parse({
      ...OBJECT_FIXTURE,
      display_name: 'Roundtrip Asset (aktualisiert)',
      version: 4,
    });
    await objectsRepo.upsert(handle.db, TENANT, updated);

    const all = await objectsRepo.listByTenant(handle.db, TENANT);
    expect(all).toHaveLength(1); // kein Duplikat, gleiche PK
    const read = await objectsRepo.getById(handle.db, TENANT, 'rt-object-1');
    expect(read?.display_name).toBe('Roundtrip Asset (aktualisiert)');
    expect(read?.version).toBe(4);
    expect(read).toEqual(updated);
  });

  it('Beziehungs-Upsert aktualisiert bestehende Zeile (onConflictDoUpdate.set)', async () => {
    await objectsRepo.upsert(handle.db, TENANT, OBJECT_FIXTURE);
    await relationshipsRepo.upsert(handle.db, TENANT, RELATIONSHIP_FIXTURE);
    const updated = RelationshipEnvelope.parse({
      ...RELATIONSHIP_FIXTURE,
      status: 'überarbeitet',
      confidence: 0.42,
    });
    await relationshipsRepo.upsert(handle.db, TENANT, updated);

    const all = await relationshipsRepo.listByTenant(handle.db, TENANT);
    expect(all).toHaveLength(1);
    const read = await relationshipsRepo.getById(handle.db, TENANT, 'rt-rel-1');
    expect(read?.status).toBe('überarbeitet');
    expect(read?.confidence).toBe(0.42);
    expect(read).toEqual(updated);
  });
});
