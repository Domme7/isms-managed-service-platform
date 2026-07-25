/**
 * Drei Kunden-Tags (DR-0019): Vorschlag aus echter Ableitung, gerätelokaler Store (defensiv),
 * Fristen-Rechnung deterministisch (kein Date.now — „heute" ist Parameter).
 */
import { describe, expect, it } from 'vitest';

import { type DEMO_SEED, TENANT_ID } from '@isms/demo-seed';
import {
  effektiveTags,
  fristZustand,
  getObjektTags,
  mitObjektTags,
  naechsteFaelligkeit,
  parseTagStore,
  serializeTagStore,
  vorschlagFuer,
  type ObjektTags,
} from '../tags';

type SeedObject = (typeof DEMO_SEED.objects)[number];

/** Minimalobjekt mit den von der Ableitung gelesenen Feldern (Muster aus prioritaet.test.ts). */
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

const KUNDEN_TAGS: ObjektTags = {
  frist: { faelligAmIso: '2026-09-30', wiederholung: 'jaehrlich' },
  prio: 'wichtig',
  stempel: 'wir_kuemmern_uns',
  quelle: 'kunde',
};

describe('vorschlagFuer – transparenter Tag-Vorschlag aus der Eisenhower-Ableitung', () => {
  it('sofort (wichtig × dringend) ⇒ wichtig + nur_warnen, Frist = abgeleitete Frist, einmalig', () => {
    const v = vorschlagFuer(
      obj({
        classification: { protection_need: 'hoch' },
        lifecycle_status: 'in Arbeit',
        owner_ids: [],
      }),
    );
    expect(v.prio).toBe('wichtig');
    expect(v.stempel).toBe('nur_warnen');
    expect(v.frist).toEqual({ faelligAmIso: '2026-03-23', wiederholung: 'einmalig' });
    expect(v.quelle).toBe('vorschlag');
  });

  it('delegieren (unwichtig × dringend) ⇒ mittel; später (stabil) ⇒ unwichtig + selbst', () => {
    expect(vorschlagFuer(obj({ lifecycle_status: 'in Arbeit', owner_ids: [] })).prio).toBe(
      'mittel',
    );
    const stabil = vorschlagFuer(obj({ lifecycle_status: 'Freigegeben', owner_ids: [OWNER] }));
    expect(stabil.prio).toBe('unwichtig');
    expect(stabil.stempel).toBe('selbst');
  });

  it('schlägt NIE „Wir kümmern uns" vor (Betreuung ist eine Buchungsentscheidung)', () => {
    for (const kandidat of [
      obj({}),
      obj({ lifecycle_status: 'in Arbeit', owner_ids: [] }),
      obj({ classification: { protection_need: 'hoch' }, lifecycle_status: 'abgelaufen' }),
    ]) {
      expect(vorschlagFuer(kandidat).stempel).not.toBe('wir_kuemmern_uns');
    }
  });
});

describe('TagStore – defensives Lesen, immutables Schreiben', () => {
  it('Roundtrip: serialize → parse erhält gültige Einträge', () => {
    const store = mitObjektTags({}, TENANT_ID.NORDWERK, 'obj-1', KUNDEN_TAGS);
    expect(parseTagStore(serializeTagStore(store))).toEqual(store);
  });

  it('unlesbares JSON und fremde Formen ergeben {} statt eines Fehlers', () => {
    expect(parseTagStore(null)).toEqual({});
    expect(parseTagStore('kein json')).toEqual({});
    expect(parseTagStore('[1,2]')).toEqual({});
  });

  it('verwirft einzelne ungültige Einträge, behält gültige', () => {
    const roh = JSON.stringify({
      [TENANT_ID.NORDWERK]: {
        'obj-ok': KUNDEN_TAGS,
        'obj-kaputt': { prio: 'MEGA', frist: { faelligAmIso: 'irgendwann' } },
      },
    });
    const store = parseTagStore(roh);
    expect(getObjektTags(store, TENANT_ID.NORDWERK, 'obj-ok')).toEqual(KUNDEN_TAGS);
    expect(getObjektTags(store, TENANT_ID.NORDWERK, 'obj-kaputt')).toBeUndefined();
  });

  it('mitObjektTags schreibt immutabel und hebt quelle auf „kunde" (Speichern = Bestätigen)', () => {
    const leer: ReturnType<typeof parseTagStore> = {};
    const store = mitObjektTags(leer, TENANT_ID.NORDWERK, 'obj-1', {
      ...KUNDEN_TAGS,
      quelle: 'vorschlag',
    });
    expect(leer).toEqual({});
    expect(getObjektTags(store, TENANT_ID.NORDWERK, 'obj-1')?.quelle).toBe('kunde');
  });
});

describe('effektiveTags – Kundeneingabe geht vor Vorschlag', () => {
  it('ohne Eintrag: Vorschlag; mit Eintrag: die Kunden-Tags', () => {
    const o = obj({ object_id: 'obj-1' });
    expect(effektiveTags({}, o).quelle).toBe('vorschlag');
    const store = mitObjektTags({}, TENANT_ID.NORDWERK, 'obj-1', KUNDEN_TAGS);
    expect(effektiveTags(store, o)).toEqual(KUNDEN_TAGS);
  });
});

describe('Fristen-Rechnung – deterministisch über den Kalendertag', () => {
  it('fristZustand: vor heute überfällig, binnen 7 Tagen bald fällig, sonst ok', () => {
    expect(fristZustand('2026-07-24', '2026-07-25')).toBe('ueberfaellig');
    expect(fristZustand('2026-07-25', '2026-07-25')).toBe('faellig_bald');
    expect(fristZustand('2026-08-01', '2026-07-25')).toBe('faellig_bald');
    expect(fristZustand('2026-08-02', '2026-07-25')).toBe('ok');
  });

  it('naechsteFaelligkeit: einmalig bleibt (überfällig bleibt überfällig)', () => {
    expect(
      naechsteFaelligkeit({ faelligAmIso: '2026-01-31', wiederholung: 'einmalig' }, '2026-07-25'),
    ).toBe('2026-01-31');
  });

  it('naechsteFaelligkeit: wiederkehrend rollt bis zum nächsten Termin ab heute', () => {
    expect(
      naechsteFaelligkeit({ faelligAmIso: '2026-01-15', wiederholung: 'monatlich' }, '2026-07-25'),
    ).toBe('2026-08-15');
    expect(
      naechsteFaelligkeit({ faelligAmIso: '2024-03-01', wiederholung: 'jaehrlich' }, '2026-07-25'),
    ).toBe('2027-03-01');
    expect(
      naechsteFaelligkeit(
        { faelligAmIso: '2026-08-01', wiederholung: 'quartalsweise' },
        '2026-07-25',
      ),
    ).toBe('2026-08-01');
  });
});
