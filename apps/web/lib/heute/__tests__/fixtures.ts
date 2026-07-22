/**
 * Synthetische Fixtures für die Mission-Control-Helfer (WP-016 Slice 1).
 *
 * Zweck: die Ableitungen (Wellen, Historie, Beobachtungen) gegen eine ANDERE Datenlage prüfen
 * als den Demo-Seed. Nur so ist belegt, dass die Aussagen abgeleitet und nicht hartkodiert sind
 * (WP-016 Acceptance 5). Ausschließlich synthetische Werte (`.claude/rules/demo-data.md`).
 */

import type { ObjectEnvelope, RelationshipEnvelope } from '@isms/contracts';

export const FIXTURE_TENANT = 'tenant-fixture';
export const FIXTURE_FOREIGN_TENANT = 'tenant-fixture-fremd';

/** Minimaler, vertragskonformer Objekt-Envelope; alle Abweichungen werden explizit übergeben. */
export function fixtureObject(
  overrides: Partial<ObjectEnvelope> & Pick<ObjectEnvelope, 'object_id'>,
): ObjectEnvelope {
  return {
    tenant_id: FIXTURE_TENANT,
    object_type: 'Control',
    display_name: `Fixture ${overrides.object_id}`,
    lifecycle_status: 'Freigegeben',
    scope_ids: [],
    owner_ids: [],
    classification: {},
    source_refs: [],
    valid_time: { from: '2030-01-01T00:00:00.000Z', to: null },
    record_time: { recorded_at: '2030-01-02T00:00:00.000Z' },
    version: 1,
    quality_state: { dimensions: [] },
    ...overrides,
  };
}

/** Minimale, vertragskonforme Kante. */
export function fixtureRelationship(
  overrides: Partial<RelationshipEnvelope> & Pick<RelationshipEnvelope, 'relationship_id'>,
): RelationshipEnvelope {
  return {
    tenant_id: FIXTURE_TENANT,
    relationship_type: 'part_of',
    source_id: 'fixture-a',
    target_id: 'fixture-b',
    direction: 'gerichtet',
    valid_time: { from: '2030-01-01T00:00:00.000Z', to: null },
    record_time: { recorded_at: '2030-01-02T00:00:00.000Z' },
    assertion_kind: 'assertiert',
    ...overrides,
  };
}
