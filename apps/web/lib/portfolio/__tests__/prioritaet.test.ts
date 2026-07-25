/**
 * Priorisierung aus dem Datenzustand (Eisenhower-Ableitung). Prüft die OFFENGELEGTE Regel
 * deterministisch — synthetische Minimalobjekte für die reine Ableitung, echter `DEMO_SEED` für die
 * Sphärengrenze. Kein `Date.now()`: die Frist wird aus dem Erfassungsdatum gerechnet.
 */
import { describe, expect, it } from 'vitest';

import { type DEMO_SEED, TENANT_ID } from '@isms/demo-seed';
import { getRole, type DemoRole } from '../../shell/roles';
import { ableitenPrioritaet, buildEisenhower } from '../prioritaet';

type SeedObject = (typeof DEMO_SEED.objects)[number];

function role(roleId: string): DemoRole {
  const found = getRole(roleId);
  if (!found) throw new Error(`Testfixture fehlt: ${roleId}`);
  return found;
}

/** Minimalobjekt mit den vom Ableiter gelesenen Feldern; Rest strukturell gefüllt. */
function obj(over: Partial<SeedObject>): SeedObject {
  return {
    object_id: 'x',
    tenant_id: TENANT_ID.NORDWERK,
    object_type: 'Risk',
    display_name: 'Test',
    description: '',
    lifecycle_status: 'Freigegeben',
    scope_ids: [],
    owner_ids: [],
    classification: {},
    source_refs: [],
    valid_time: { from: '2026-01-01T00:00:00Z', to: null },
    record_time: { recorded_at: '2026-03-16T00:00:00Z' },
    version: 1,
    quality_state: { dimensions: [] },
    ...over,
  } as unknown as SeedObject;
}

const OWNER = { owner_id: 'o1', owner_kind: 'fachlich' as const };

describe('ableitenPrioritaet – Wichtigkeit aus echtem Schutzwert', () => {
  it('hoch bei hohem Schutzbedarf oder Vertraulichkeit, sonst niedrig', () => {
    expect(
      ableitenPrioritaet(obj({ classification: { protection_need: 'hoch' } })).wichtigkeit,
    ).toBe('hoch');
    expect(
      ableitenPrioritaet(obj({ classification: { confidentiality: 'vertraulich' } })).wichtigkeit,
    ).toBe('hoch');
    expect(
      ableitenPrioritaet(obj({ classification: { confidentiality: 'intern' } })).wichtigkeit,
    ).toBe('niedrig');
  });
});

describe('ableitenPrioritaet – Dringlichkeit als offengelegter Punktezähler', () => {
  it('offener Lebenszyklus + kein Owner ⇒ hoch (Score 4)', () => {
    const p = ableitenPrioritaet(obj({ lifecycle_status: 'in Arbeit', owner_ids: [] }));
    expect(p.dringlichkeitScore).toBe(4);
    expect(p.dringlichkeit).toBe('hoch');
    expect(p.gruende).toContain('kein Owner erfasst');
  });

  it('stabiler Stand mit Owner ⇒ niedrig (Score 0), Quadrant „später"', () => {
    const p = ableitenPrioritaet(obj({ lifecycle_status: 'Freigegeben', owner_ids: [OWNER] }));
    expect(p.dringlichkeitScore).toBe(0);
    expect(p.dringlichkeit).toBe('niedrig');
    expect(p.quadrant).toBe('spaeter');
  });

  it('nur „Ungeprüft" ⇒ mittel (Score 1)', () => {
    const p = ableitenPrioritaet(
      obj({
        lifecycle_status: 'Freigegeben',
        owner_ids: [OWNER],
        quality_state: {
          dimensions: [{ dimension: 'Bestätigung', confirmation_level: 'Ungeprüft' }],
        },
      }),
    );
    expect(p.dringlichkeitScore).toBe(1);
    expect(p.dringlichkeit).toBe('mittel');
  });
});

describe('ableitenPrioritaet – Quadrant und abgeleitete Frist', () => {
  it('wichtig × dringend ⇒ „sofort"', () => {
    const p = ableitenPrioritaet(
      obj({
        classification: { protection_need: 'hoch' },
        lifecycle_status: 'in Arbeit',
        owner_ids: [],
      }),
    );
    expect(p.quadrant).toBe('sofort');
  });

  it('niedrig × dringend ⇒ „delegieren"', () => {
    const p = ableitenPrioritaet(obj({ lifecycle_status: 'in Arbeit', owner_ids: [] }));
    expect(p.quadrant).toBe('delegieren');
  });

  it('Frist = Erfassungsdatum + Horizont (hoch 7 Tage), absolutes Datum, deterministisch', () => {
    const p = ableitenPrioritaet(
      obj({
        lifecycle_status: 'in Arbeit',
        owner_ids: [],
        record_time: { recorded_at: '2026-03-16T00:00:00Z' },
      }),
    );
    expect(p.dringlichkeit).toBe('hoch');
    expect(p.fristIso).toBe('2026-03-23');
  });

  it('niedrige Dringlichkeit ⇒ Horizont 90 Tage', () => {
    const p = ableitenPrioritaet(
      obj({
        lifecycle_status: 'Freigegeben',
        owner_ids: [OWNER],
        record_time: { recorded_at: '2026-03-16T00:00:00Z' },
      }),
    );
    expect(p.fristIso).toBe('2026-06-14');
  });
});

describe('buildEisenhower – Sphärengrenze + nur offene Objekte', () => {
  it('Portfolio-Sicht (R08) sammelt über Kundenmandanten; keine leeren/Provider-Objekte', () => {
    const board = buildEisenhower(role('R08'), TENANT_ID.NORDWERK);
    expect(board.gesamt).toBeGreaterThan(0);
    const alle = Object.values(board.quadranten).flat();
    // Kein Provider-Objekt (Consulting Operator ist kein Kundenmandant).
    expect(alle.some((i) => i.tenantId === TENANT_ID.CONSULTING_OPERATOR)).toBe(false);
    // Mehr als ein Kundenmandant vertreten (echte Portfolio-Aggregation).
    expect(new Set(alle.map((i) => i.tenantId)).size).toBeGreaterThan(1);
    // Jedes Item trägt ein offenes Signal (Score > 0) und einen Deep-Link.
    for (const i of alle) {
      expect(i.prioritaet.dringlichkeitScore).toBeGreaterThan(0);
      expect(i.href).toContain('/twin/');
    }
  });

  it('Kundensicht (R03) enthält nur den eigenen Mandanten', () => {
    const board = buildEisenhower(role('R03'), TENANT_ID.NORDWERK);
    const fremd = Object.values(board.quadranten)
      .flat()
      .filter((i) => i.tenantId !== TENANT_ID.NORDWERK);
    expect(fremd).toHaveLength(0);
  });

  it('Quadranten sind nach Frist aufsteigend sortiert (deterministisch)', () => {
    const board = buildEisenhower(role('R08'), TENANT_ID.NORDWERK);
    for (const items of Object.values(board.quadranten)) {
      const fristen = items.map((i) => i.prioritaet.fristIso);
      expect(fristen).toEqual([...fristen].sort((a, b) => a.localeCompare(b)));
    }
    expect(buildEisenhower(role('R08'), TENANT_ID.NORDWERK)).toEqual(board);
  });
});
