import { describe, it, expect } from 'vitest';
import { ObjectEnvelope } from './object';

/** Deterministisches, synthetisches Basisobjekt (keine realen Daten). */
function validObject(): Record<string, unknown> {
  return {
    object_id: 'obj-0001',
    tenant_id: 'tenant-nordwerk',
    object_type: 'Geschäftsprozess',
    display_name: 'Auftragsabwicklung',
    description: 'Synthetischer Demo-Prozess',
    lifecycle_status: 'Freigegeben',
    scope_ids: [{ scope_id: 'scope-isms-core', valid_time: { from: '2026-01-01T00:00:00.000Z' } }],
    owner_ids: [{ owner_id: 'role-process-owner', owner_kind: 'fachlich', role: 'Prozessverantwortung' }],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
    source_refs: [{ source_kind: 'Nutzer', reference: 'user-demo-1', priority: 1 }],
    valid_time: { from: '2026-01-01T00:00:00.000Z', to: null },
    record_time: { recorded_at: '2026-01-01T00:00:00.000Z' },
    version: 1,
    quality_state: { dimensions: [{ dimension: 'Bestätigung', confirmation_level: 'freigegeben' }] },
  };
}

describe('ObjectEnvelope – Positivfälle', () => {
  it('akzeptiert ein vollständiges gültiges Objekt', () => {
    const result = ObjectEnvelope.safeParse(validObject());
    expect(result.success).toBe(true);
  });

  it('akzeptiert jeden kanonischen lifecycle_status unabhängig vom object_type (Typ-Kopplung außerhalb Slice-1-Scope, PROVENANCE #10)', () => {
    // In Slice 1 wird KEINE Kopplung lifecycle_status<->object_type erzwungen (PROVENANCE #10):
    // jeder object_type akzeptiert jeden kanonischen lifecycle_status. Hier: ein typspezifischer
    // Zustand aus Dok. 05 §7 (z. B. "wirksam") ist ein gültiger kanonischer Zustand.
    const objectWithTypeSpecificStatus = { ...validObject(), object_type: 'Control', lifecycle_status: 'wirksam' };
    expect(ObjectEnvelope.safeParse(objectWithTypeSpecificStatus).success).toBe(true);
    // Gegenprobe: derselbe Zustand ist auch für einen anderen object_type gültig.
    const unrelatedType = { ...validObject(), object_type: 'Lieferant', lifecycle_status: 'wirksam' };
    expect(ObjectEnvelope.safeParse(unrelatedType).success).toBe(true);
  });

  it('erlaubt leere scope_ids/owner_ids (Datenlücke sichtbar, nicht verboten)', () => {
    const draft = { ...validObject(), lifecycle_status: 'Entwurf', scope_ids: [], owner_ids: [] };
    expect(ObjectEnvelope.safeParse(draft).success).toBe(true);
  });

  it('setzt quality_state.dimensions auf [] wenn ausgelassen', () => {
    const parsed = ObjectEnvelope.parse({ ...validObject(), quality_state: {} });
    expect(parsed.quality_state.dimensions).toEqual([]);
  });

  it('trennt fachliche Gültigkeit (valid_time) von Systemzeit (record_time)', () => {
    const parsed = ObjectEnvelope.parse(validObject());
    expect(parsed.valid_time.from).toBe('2026-01-01T00:00:00.000Z');
    expect(parsed.record_time.recorded_at).toBe('2026-01-01T00:00:00.000Z');
  });

  it('erlaubt bewusst abweichende fachliche Zeit und Systemzeit (rückwirkend erfasste Wahrheit)', () => {
    // Fachlich gültig ab 2025, aber erst 2026 im System erfasst -> valid_time != record_time.
    const backdated = {
      ...validObject(),
      valid_time: { from: '2025-03-01T00:00:00.000Z' },
      record_time: { recorded_at: '2026-01-15T09:30:00.000Z' },
    };
    const parsed = ObjectEnvelope.parse(backdated);
    expect(parsed.valid_time.from).toBe('2025-03-01T00:00:00.000Z');
    expect(parsed.record_time.recorded_at).toBe('2026-01-15T09:30:00.000Z');
    // Beide Zeitachsen bleiben unabhängig lesbar und sind verschieden.
    expect(parsed.valid_time.from).not.toBe(parsed.record_time.recorded_at);
  });

  it('akzeptiert geschlossene Intervalle auf beiden Zeitachsen (valid_time.to UND record_time.replaced_at)', () => {
    const closed = {
      ...validObject(),
      valid_time: { from: '2025-01-01T00:00:00.000Z', to: '2025-12-31T23:59:59.000Z' },
      record_time: { recorded_at: '2025-01-02T00:00:00.000Z', replaced_at: '2026-02-01T00:00:00.000Z' },
    };
    const parsed = ObjectEnvelope.parse(closed);
    expect(parsed.valid_time.to).toBe('2025-12-31T23:59:59.000Z');
    expect(parsed.record_time.replaced_at).toBe('2026-02-01T00:00:00.000Z');
    // Geschlossenes fachliches Ende weicht vom systemseitigen Ersetzungszeitpunkt ab.
    expect(parsed.valid_time.to).not.toBe(parsed.record_time.replaced_at);
  });
});

describe('ObjectEnvelope – Negativfälle', () => {
  it('lehnt fehlendes tenant_id ab (Pflichtfeld, P09)', () => {
    const { tenant_id, ...withoutTenant } = validObject();
    expect(ObjectEnvelope.safeParse(withoutTenant).success).toBe(false);
  });

  it('lehnt fehlendes object_id ab', () => {
    const { object_id, ...rest } = validObject();
    expect(ObjectEnvelope.safeParse(rest).success).toBe(false);
  });

  it('lehnt unbekannten object_type ab', () => {
    expect(ObjectEnvelope.safeParse({ ...validObject(), object_type: 'Raumschiff' }).success).toBe(false);
  });

  it('lehnt unbekannten lifecycle_status ab', () => {
    expect(ObjectEnvelope.safeParse({ ...validObject(), lifecycle_status: 'zerknittert' }).success).toBe(false);
  });

  it('lehnt unbekannte Owner-Art ab', () => {
    const bad = { ...validObject(), owner_ids: [{ owner_id: 'x', owner_kind: 'magisch' }] };
    expect(ObjectEnvelope.safeParse(bad).success).toBe(false);
  });

  it('lehnt unbekanntes Top-Level-Feld ab (.strict – keine stille Schema-Erosion)', () => {
    expect(ObjectEnvelope.safeParse({ ...validObject(), secret_backdoor: true }).success).toBe(false);
  });

  it('lehnt nicht-ISO valid_time ab', () => {
    const bad = { ...validObject(), valid_time: { from: 'gestern' } };
    expect(ObjectEnvelope.safeParse(bad).success).toBe(false);
  });

  it('lehnt nicht-positive Version ab', () => {
    expect(ObjectEnvelope.safeParse({ ...validObject(), version: 0 }).success).toBe(false);
  });

  it('lehnt leeres object_id ab', () => {
    expect(ObjectEnvelope.safeParse({ ...validObject(), object_id: '' }).success).toBe(false);
  });

  it('lehnt leeres tenant_id ab (min(1))', () => {
    expect(ObjectEnvelope.safeParse({ ...validObject(), tenant_id: '' }).success).toBe(false);
  });

  it('lehnt Fremdfeld in ScopeAssignment ab (verschachteltes .strict)', () => {
    const bad = { ...validObject(), scope_ids: [{ scope_id: 'scope-1', rogue: true }] };
    expect(ObjectEnvelope.safeParse(bad).success).toBe(false);
  });

  it('lehnt Fremdfeld in OwnerRef ab (verschachteltes .strict)', () => {
    const bad = { ...validObject(), owner_ids: [{ owner_id: 'o1', owner_kind: 'fachlich', rogue: 1 }] };
    expect(ObjectEnvelope.safeParse(bad).success).toBe(false);
  });

  it('lehnt Fremdfeld in SourceRef ab (verschachteltes .strict)', () => {
    const bad = { ...validObject(), source_refs: [{ source_kind: 'Nutzer', reference: 'u1', rogue: 'x' }] };
    expect(ObjectEnvelope.safeParse(bad).success).toBe(false);
  });

  it('lehnt unbekannte source_kind ab', () => {
    const bad = { ...validObject(), source_refs: [{ source_kind: 'Kristallkugel', reference: 'u1' }] };
    expect(ObjectEnvelope.safeParse(bad).success).toBe(false);
  });

  it('lehnt unbekannte Datenqualitäts-Dimension ab', () => {
    const bad = { ...validObject(), quality_state: { dimensions: [{ dimension: 'Stimmung' }] } };
    expect(ObjectEnvelope.safeParse(bad).success).toBe(false);
  });

  it('lehnt unbekannte confirmation_level ab', () => {
    const bad = {
      ...validObject(),
      quality_state: { dimensions: [{ dimension: 'Bestätigung', confirmation_level: 'vielleicht' }] },
    };
    expect(ObjectEnvelope.safeParse(bad).success).toBe(false);
  });
});
