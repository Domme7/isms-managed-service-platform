import { describe, it, expect } from 'vitest';
import { RelationshipEnvelope } from './relationship';
import { RELATIONSHIP_TYPE } from './vocabularies';

/** Deterministische, synthetische Basis-Beziehung (keine realen Daten). */
function validRelationship(): Record<string, unknown> {
  return {
    relationship_id: 'rel-0001',
    tenant_id: 'tenant-nordwerk',
    relationship_type: 'mitigates',
    source_id: 'obj-control-1',
    target_id: 'obj-risk-1',
    valid_time: { from: '2026-01-01T00:00:00.000Z' },
    record_time: { recorded_at: '2026-01-01T00:00:00.000Z' },
    assertion_kind: 'assertiert',
  };
}

describe('RelationshipEnvelope – Positivfälle', () => {
  it('akzeptiert eine gültige Beziehung', () => {
    expect(RelationshipEnvelope.safeParse(validRelationship()).success).toBe(true);
  });

  it('setzt direction per Default auf "gerichtet"', () => {
    const parsed = RelationshipEnvelope.parse(validRelationship());
    expect(parsed.direction).toBe('gerichtet');
  });

  it('akzeptiert jeden kanonischen Beziehungstyp R01–R25', () => {
    for (const type of RELATIONSHIP_TYPE) {
      const rel = { ...validRelationship(), relationship_type: type };
      expect(RelationshipEnvelope.safeParse(rel).success).toBe(true);
    }
  });

  it('akzeptiert optionale Felder (confidence, weight, owner_ids, source_refs)', () => {
    const rel = {
      ...validRelationship(),
      confidence: 0.8,
      weight: 2,
      effectiveness_assumption: 'erwartete Risikoreduktion',
      owner_ids: [{ owner_id: 'role-risk-owner', owner_kind: 'fachlich' }],
      source_refs: [{ source_kind: 'Import', reference: 'importjob-42' }],
      version: 1,
    };
    expect(RelationshipEnvelope.safeParse(rel).success).toBe(true);
  });

  it('trennt fachliche Gültigkeit von Erfassungszeit (Bitemporalität)', () => {
    const parsed = RelationshipEnvelope.parse(validRelationship());
    expect(parsed.valid_time.from).toBe('2026-01-01T00:00:00.000Z');
    expect(parsed.record_time.recorded_at).toBe('2026-01-01T00:00:00.000Z');
  });

  it('erlaubt bewusst abweichende fachliche Zeit und Systemzeit (rückwirkend erfasste Beziehung)', () => {
    const backdated = {
      ...validRelationship(),
      valid_time: { from: '2024-06-01T00:00:00.000Z' },
      record_time: { recorded_at: '2026-01-10T08:00:00.000Z' },
    };
    const parsed = RelationshipEnvelope.parse(backdated);
    expect(parsed.valid_time.from).toBe('2024-06-01T00:00:00.000Z');
    expect(parsed.record_time.recorded_at).toBe('2026-01-10T08:00:00.000Z');
    expect(parsed.valid_time.from).not.toBe(parsed.record_time.recorded_at);
  });

  it('akzeptiert geschlossene Intervalle auf beiden Zeitachsen (valid_time.to UND record_time.replaced_at)', () => {
    const closed = {
      ...validRelationship(),
      valid_time: { from: '2024-01-01T00:00:00.000Z', to: '2024-12-31T23:59:59.000Z' },
      record_time: {
        recorded_at: '2024-01-05T00:00:00.000Z',
        replaced_at: '2025-06-01T00:00:00.000Z',
      },
    };
    const parsed = RelationshipEnvelope.parse(closed);
    expect(parsed.valid_time.to).toBe('2024-12-31T23:59:59.000Z');
    expect(parsed.record_time.replaced_at).toBe('2025-06-01T00:00:00.000Z');
    expect(parsed.valid_time.to).not.toBe(parsed.record_time.replaced_at);
  });
});

describe('RelationshipEnvelope – Negativfälle', () => {
  it('lehnt unbekannten relationship_type ab', () => {
    expect(
      RelationshipEnvelope.safeParse({
        ...validRelationship(),
        relationship_type: 'befreundet_mit',
      }).success,
    ).toBe(false);
  });

  it('lehnt unbekannte assertion_kind ab', () => {
    expect(
      RelationshipEnvelope.safeParse({ ...validRelationship(), assertion_kind: 'geträumt' })
        .success,
    ).toBe(false);
  });

  it('lehnt fehlendes source_id ab', () => {
    const { source_id, ...rest } = validRelationship();
    expect(RelationshipEnvelope.safeParse(rest).success).toBe(false);
  });

  it('lehnt fehlendes target_id ab', () => {
    const { target_id, ...rest } = validRelationship();
    expect(RelationshipEnvelope.safeParse(rest).success).toBe(false);
  });

  it('lehnt fehlendes tenant_id ab (Mandantenbezug, D11)', () => {
    const { tenant_id, ...rest } = validRelationship();
    expect(RelationshipEnvelope.safeParse(rest).success).toBe(false);
  });

  it('lehnt fehlende assertion_kind ab (Pflicht laut §9)', () => {
    const { assertion_kind, ...rest } = validRelationship();
    expect(RelationshipEnvelope.safeParse(rest).success).toBe(false);
  });

  it('lehnt unbekanntes Top-Level-Feld ab (.strict)', () => {
    expect(RelationshipEnvelope.safeParse({ ...validRelationship(), rogue: 1 }).success).toBe(
      false,
    );
  });

  it('lehnt unbekannte direction ab', () => {
    expect(
      RelationshipEnvelope.safeParse({ ...validRelationship(), direction: 'diagonal' }).success,
    ).toBe(false);
  });

  it('lehnt leeres relationship_id ab (min(1))', () => {
    expect(
      RelationshipEnvelope.safeParse({ ...validRelationship(), relationship_id: '' }).success,
    ).toBe(false);
  });

  it('lehnt leeres source_id ab (min(1))', () => {
    expect(RelationshipEnvelope.safeParse({ ...validRelationship(), source_id: '' }).success).toBe(
      false,
    );
  });

  it('lehnt leeres tenant_id ab (min(1))', () => {
    expect(RelationshipEnvelope.safeParse({ ...validRelationship(), tenant_id: '' }).success).toBe(
      false,
    );
  });
});
