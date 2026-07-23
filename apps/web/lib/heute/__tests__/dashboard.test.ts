/**
 * Tests der Dashboard-Ableitungen (WP-020 Slice 4, DR-0008).
 *
 * Geprüft wird gegen den echten `DEMO_SEED` UND gegen synthetische Fixtures:
 *  1. Jede Kachel-Zahl ist abgeleitet, nicht hartkodiert – die Zählwege werden hier unabhängig
 *     aus den Seed-Kanten/-Feldern nachgerechnet (Referenz: `python scripts/seed_facts.py`,
 *     Seed 1.2.0: Nordwerk 34/51, Consulting Operator 9/11, Finovia/MediCore 0/0).
 *  2. Jede Kachel erklärt sich selbst: Frage, Scope, Datenstand (so weit erfasst),
 *     Ermittlungsregel, Drill-down (Struktur, nicht Wortlaut – Lektion 11).
 *  3. Ampel-Grenze (DR-0008/O-WP020-07): jedes Badge beruht auf einer Regel der Positivliste
 *     `BADGE_RULES`; es existiert keine vierte Regel und kein Urteil („hoch/mittel/gering",
 *     Reifegrad, Trend) in Badge-Texten. Lebenszyklus-Kacheln tragen die 08-D07-Glosse.
 *  4. Leere Mandanten (Finovia/MediCore) liefern die ehrliche Datenlücken-Kachel statt einer
 *     „0 von 0"-Wand; ein unbekannter Mandant liefert `undefined` (keine Existenzaussage).
 */
import { describe, expect, it } from 'vitest';

import { ALL_LIFECYCLE_STATUS } from '@isms/contracts';
import { DEMO_SEED, TENANT_ID } from '@isms/demo-seed';

import {
  BADGE_RULES,
  KLEINE_GRUNDGESAMTHEIT,
  LIFECYCLE_GLOSSE,
  STAND_HINWEIS,
  badgeFuerAbdeckung,
  buildHeuteDashboard,
  buildIsmsVerdichtung,
  countObjectsWithOwner,
  deriveLifecycleVerteilung,
  istKleineGrundgesamtheit,
  kleinheitTextFuer,
  type CoverageMerkmal,
  type CoverageTile,
  type TileExplanation,
} from '../dashboard';
import { getPlace } from '../../shell/places';
import { tenantDetailHref } from '../../twin/routes';
import { fixtureObject } from './fixtures';

const KATALOG: readonly string[] = [...new Set<string>(ALL_LIFECYCLE_STATUS)];

function nordwerkObjekte() {
  return DEMO_SEED.objects.filter((o) => o.tenant_id === TENANT_ID.NORDWERK);
}
function nordwerkKanten() {
  return DEMO_SEED.relationships.filter((r) => r.tenant_id === TENANT_ID.NORDWERK);
}

/** Unabhängige Nachrechnung: Objekte eines Typs mit mindestens einer eingehenden Kante. */
function mitEingehenderKante(objectType: string, relationshipType: string): number {
  const ziele = new Set(
    nordwerkKanten()
      .filter((r) => r.relationship_type === relationshipType)
      .map((r) => r.target_id),
  );
  return nordwerkObjekte().filter((o) => o.object_type === objectType && ziele.has(o.object_id))
    .length;
}

/* -----------------------------------------------------------------------------
 * 1. Reine Ableitungen (Fixtures)
 * --------------------------------------------------------------------------- */

describe('deriveLifecycleVerteilung – Katalogreihenfolge, fail-soft', () => {
  it('zählt je erfasstem Stand und ordnet in kanonischer Katalogreihenfolge', () => {
    const objects = [
      fixtureObject({ object_id: 'a', lifecycle_status: 'aktiv' }),
      fixtureObject({ object_id: 'b', lifecycle_status: 'Entwurf' }),
      fixtureObject({ object_id: 'c', lifecycle_status: 'aktiv' }),
    ];
    const slices = deriveLifecycleVerteilung(objects);

    expect(slices.map((s) => s.count).reduce((a, b) => a + b, 0)).toBe(objects.length);
    expect(slices.find((s) => s.status === 'aktiv')?.count).toBe(2);
    expect(slices.find((s) => s.status === 'Entwurf')?.count).toBe(1);
    // Reihenfolge = Katalog, keine Häufigkeitssortierung.
    const indizes = slices.map((s) => KATALOG.indexOf(s.status));
    expect([...indizes].sort((a, b) => a - b)).toEqual(indizes);
  });

  it('lässt einen nicht katalogisierten Stand ans Ende fallen statt ihn zu verschlucken', () => {
    const slices = deriveLifecycleVerteilung([
      fixtureObject({ object_id: 'a', lifecycle_status: 'aktiv' }),
      // Im Vertrag unmöglich – hier bewusst erzwungen, um fail-soft zu belegen.
      fixtureObject({ object_id: 'b', lifecycle_status: 'nicht-katalogisiert' as never }),
    ]);
    expect(slices[slices.length - 1]).toEqual({ status: 'nicht-katalogisiert', count: 1 });
  });

  it('liefert für eine leere Grundgesamtheit eine leere Verteilung (nichts erfunden)', () => {
    expect(deriveLifecycleVerteilung([])).toEqual([]);
  });
});

describe('countObjectsWithOwner – positive Lesart der Beobachtungsregel', () => {
  it('zählt Objekte mit mindestens einem Eintrag in owner_ids', () => {
    const objects = [
      fixtureObject({ object_id: 'a', owner_ids: [{ owner_id: 'p1', owner_kind: 'fachlich' }] }),
      fixtureObject({ object_id: 'b', owner_ids: [] }),
    ];
    expect(countObjectsWithOwner(objects)).toBe(1);
    expect(countObjectsWithOwner([])).toBe(0);
  });
});

/**
 * Testmerkmal einer Abdeckung – dieselbe Struktur wie im Produkt, aber bewusst neutral
 * benannt: geprüft wird die REGEL, nicht der Wortlaut einer konkreten Kachel.
 */
const MERKMAL: CoverageMerkmal = {
  alle: 'Prüfobjekte tragen das Merkmal',
  fehlend: 'Prüfobjekte ohne das Merkmal',
  einheit: ['Prüfobjekt', 'Prüfobjekte'],
};

describe('badgeFuerAbdeckung – Positivliste (DR-0008, O-WP020-07)', () => {
  /**
   * REGEL-ERHALTEND UMGESTELLT (WP-028 Slice 3, DR-0013 Nr. 7): Die Zuordnung Lage → Regel ist
   * unverändert (x = y → „vollständig belegt"-Regel, x < y → Lücken-Regel). NEU geprüft wird
   * zusätzlich der ZAHLENGEBUNDENE Text, weil „vollständig belegt"/„Lücke erfasst" als
   * pauschales Urteil bzw. als schiefes Deutsch gelesen wurden. Nichts wurde abgeschwächt: die
   * Positivliste bleibt geschlossen und wird unten weiterhin auf genau drei Regeln festgenagelt.
   */
  it('vergibt die Regel „vollständig belegt" bei x = y und die Lücken-Regel bei x < y', () => {
    expect(badgeFuerAbdeckung(5, 5, MERKMAL)?.rule).toBe('vollstaendig_belegt');
    expect(badgeFuerAbdeckung(3, 5, MERKMAL)?.rule).toBe('luecke_erfasst');
    expect(badgeFuerAbdeckung(0, 5, MERKMAL)?.rule).toBe('luecke_erfasst');
  });

  it('formuliert den Badge-Text zahlengebunden statt als pauschales Urteil', () => {
    expect(badgeFuerAbdeckung(5, 5, MERKMAL)?.text).toBe('alle 5 Prüfobjekte tragen das Merkmal');
    // „Datenlücke: y − x …" – die FEHLMENGE, nicht das schiefe „Lücke erfasst".
    expect(badgeFuerAbdeckung(3, 5, MERKMAL)?.text).toBe(
      'Datenlücke: 2 Prüfobjekte ohne das Merkmal',
    );
    // Der Grenzsatz hängt am Badge selbst (sichtbar, nicht nur im `title`).
    expect(badgeFuerAbdeckung(5, 5, MERKMAL)?.grenze).toMatch(/sagt der Datenbestand nicht/);
    expect(badgeFuerAbdeckung(3, 5, MERKMAL)?.grenze).toMatch(/sagt der Datenbestand nicht/);
  });

  it('vergibt KEIN Badge ohne Grundgesamtheit (benannte Lücke statt Urteil)', () => {
    expect(badgeFuerAbdeckung(0, 0, MERKMAL)).toBeUndefined();
  });

  /**
   * NEUE REGEL (DR-0013 Nr. 7): Bei n≤2 gibt es kein Erfolgs-Badge und keinen Vollbalken –
   * „1 von 1" mit grünem Häkchen liest sich wie eine vollständige Landschaft. Eine erfasste
   * LÜCKE wird auch bei kleiner Grundgesamtheit weiterhin benannt (sie zu verschweigen wäre
   * eine Ehrlichkeitslücke); an die Stelle des Erfolgszeichens tritt der Kleinheits-Hinweis.
   */
  it('kleine Grundgesamtheit (n≤2): kein Erfolgs-Badge, aber weiterhin die benannte Lücke', () => {
    expect(KLEINE_GRUNDGESAMTHEIT).toBe(2);
    expect(badgeFuerAbdeckung(1, 1, MERKMAL)).toBeUndefined();
    expect(badgeFuerAbdeckung(2, 2, MERKMAL)).toBeUndefined();
    expect(badgeFuerAbdeckung(1, 2, MERKMAL)?.rule).toBe('luecke_erfasst');
    // Ab n = 3 gilt wieder die vollständige Lage.
    expect(badgeFuerAbdeckung(3, 3, MERKMAL)?.rule).toBe('vollstaendig_belegt');

    expect(istKleineGrundgesamtheit(0)).toBe(false); // keine Grundgesamtheit ist kein „klein"
    expect(istKleineGrundgesamtheit(1)).toBe(true);
    expect(istKleineGrundgesamtheit(3)).toBe(false);
  });

  it('macht die absolute Kleinheit sichtbar, statt sie in einen Anteil zu verstecken', () => {
    expect(kleinheitTextFuer(1, MERKMAL)).toContain('nur 1 Prüfobjekt erfasst');
    expect(kleinheitTextFuer(2, MERKMAL)).toContain('nur 2 Prüfobjekte erfasst');
    expect(kleinheitTextFuer(3, MERKMAL)).toBeUndefined();
    expect(kleinheitTextFuer(0, MERKMAL)).toBeUndefined();
  });

  it('die Positivliste umfasst exakt drei Regeln, jede mit Text, Symbol, Grenze und Basis', () => {
    expect(Object.keys(BADGE_RULES).sort()).toEqual([
      'kein_datenbestand',
      'luecke_erfasst',
      'vollstaendig_belegt',
    ]);
    for (const regel of Object.values(BADGE_RULES)) {
      // `text` ist seit WP-028 der merkmalfreie Rückfalltext (die Abdeckungs-Badges bilden
      // ihren Text zahlengebunden); er bleibt Pflicht und bleibt urteilsfrei.
      expect(regel.text.length).toBeGreaterThan(0);
      expect(regel.symbol.length).toBeGreaterThan(0);
      // Jede Basis benennt eine ERFASSTE Lage – kein Urteil, keine Bewertungsskala.
      expect(regel.basis).toMatch(/Erfasste|Erfasster/);
      // Der Grenzsatz ist Pflicht und sagt, was der Datenbestand NICHT hergibt.
      expect(regel.grenze).toMatch(/sagt der Datenbestand nicht/);
      expect(regel.text).not.toMatch(/hoch|mittel|gering|Reifegrad|Trend|Risiko/i);
    }
  });
});

/* -----------------------------------------------------------------------------
 * 2. Dashboard des aktiven Mandanten (echter Seed, unabhängig nachgerechnet)
 * --------------------------------------------------------------------------- */

describe('buildHeuteDashboard – Nordwerk (Zahlen unabhängig nachgerechnet)', () => {
  const model = buildHeuteDashboard(TENANT_ID.NORDWERK);
  if (!model) throw new Error('Testfixture fehlt: Nordwerk-Dashboard');

  it('Bestandskachel: 34 Objekte / 51 Beziehungen (Seed 1.2.0, seed_facts-Referenz)', () => {
    const bestand = model.stockTiles.find((t) => t.id === 'bestand');
    expect(bestand?.values).toEqual([
      { label: 'Objekte', count: nordwerkObjekte().length },
      { label: 'Beziehungen', count: nordwerkKanten().length },
    ]);
    // Anker gegen stilles Wegdriften der Referenzzahlen (Seed 1.2.0).
    expect(nordwerkObjekte()).toHaveLength(34);
    expect(nordwerkKanten()).toHaveLength(51);
  });

  it('Abdeckung Controls↔Nachweis entspricht der unabhängigen R15-Nachrechnung', () => {
    const tile = model.coverage.find((t) => t.id === 'controls_nachweis');
    expect(tile?.total).toBe(nordwerkObjekte().filter((o) => o.object_type === 'Control').length);
    expect(tile?.covered).toBe(mitEingehenderKante('Control', 'evidences'));
    expect(tile?.isEmpty).toBe(false);
  });

  it('Abdeckung Risiken↔Minderung entspricht der unabhängigen R12-Nachrechnung', () => {
    const tile = model.coverage.find((t) => t.id === 'risiken_minderung');
    expect(tile?.total).toBe(nordwerkObjekte().filter((o) => o.object_type === 'Risk').length);
    expect(tile?.covered).toBe(mitEingehenderKante('Risk', 'mitigates'));
  });

  it('Abdeckung Objekte↔Owner entspricht der unabhängigen owner_ids-Nachrechnung', () => {
    const tile = model.coverage.find((t) => t.id === 'objekte_owner');
    expect(tile?.total).toBe(nordwerkObjekte().length);
    expect(tile?.covered).toBe(nordwerkObjekte().filter((o) => o.owner_ids.length > 0).length);
  });

  it('Abdeckung Kanten↔Vertrauensgrad entspricht der unabhängigen confidence-Nachrechnung', () => {
    const tile = model.coverage.find((t) => t.id === 'kanten_vertrauensgrad');
    expect(tile?.total).toBe(nordwerkKanten().length);
    expect(tile?.covered).toBe(
      nordwerkKanten().filter((r) => typeof r.confidence === 'number').length,
    );
    // Positive Lesart derselben Regel wie die Ebene-2-Beobachtung: beide zusammen ergeben
    // exakt die Grundgesamtheit (keine zweite, abweichende Zählregel).
    const ohne = nordwerkKanten().filter((r) => typeof r.confidence !== 'number').length;
    expect((tile?.covered ?? 0) + ohne).toBe(nordwerkKanten().length);
  });

  it('Lebenszyklus-Kachel zählt die verschiedenen Stände und trägt die 08-D07-Glosse', () => {
    const erwartet = new Set(nordwerkObjekte().map((o) => o.lifecycle_status)).size;
    expect(model.lifecycleSummary?.distinctCount).toBe(erwartet);
    expect(model.lifecycleSummary?.total).toBe(nordwerkObjekte().length);
    expect(model.lifecycleSummary?.glosse).toBe(LIFECYCLE_GLOSSE);
    expect(LIFECYCLE_GLOSSE).toMatch(/kein Prüfergebnis/);
  });

  it('Klartext-Zustand nennt die abgeleiteten Zahlen und die ehrliche Grenze', () => {
    expect(model.klartext.length).toBeGreaterThanOrEqual(3);
    expect(model.klartext[0]).toContain(`${nordwerkObjekte().length} Objekte`);
    expect(model.klartext[0]).toContain(`${nordwerkKanten().length} Beziehungen`);
    // Kein Delta, keine Entwicklung, keine wichtigste Ursache – als Grenze benannt.
    expect(model.klartext[model.klartext.length - 1]).toMatch(/nicht belegt/);
  });
});

/* -----------------------------------------------------------------------------
 * 3. Selbsterklärung jeder Kachel (AC-Struktur: Frage, Scope, Datenstand, Regel,
 *    Drill-down) über alle bekannten Mandanten
 * --------------------------------------------------------------------------- */

function alleKacheln(tenantId: string): TileExplanation[] {
  const model = buildHeuteDashboard(tenantId);
  if (!model) throw new Error(`Testfixture fehlt: ${tenantId}`);
  return [
    ...model.stockTiles,
    ...(model.lifecycleSummary ? [model.lifecycleSummary] : []),
    ...model.coverage,
    ...(model.emptyTile ? [model.emptyTile] : []),
  ];
}

describe('Dashboard-Kacheln – jede Kachel erklärt sich selbst', () => {
  for (const tenantId of Object.values(TENANT_ID)) {
    it(`${tenantId}: Frage, Scope, Ermittlungsregel und Drill-down sind je Kachel vorhanden`, () => {
      const kacheln = alleKacheln(tenantId);
      expect(kacheln.length).toBeGreaterThan(0);
      for (const kachel of kacheln) {
        expect(kachel.frage.endsWith('?'), kachel.frage).toBe(true);
        expect(kachel.scope.length).toBeGreaterThan(0);
        expect(kachel.regel.length).toBeGreaterThan(0);
        expect(kachel.drilldown.label.length).toBeGreaterThan(0);
        expect(kachel.drilldown.href.length).toBeGreaterThan(0);
        // Datenstand: entweder beide Felder (ISO + Anzeige) oder ehrlich keins.
        expect(Boolean(kachel.datenstand)).toBe(Boolean(kachel.datenstandDisplay));
      }
    });
  }

  // Regressionswache (Review 2. Runde, Code/QA-Finding F1): der Lebenszyklus-Drilldown darf
  // NICHT statisch auf `/isms` zeigen – für Mandanten ohne ISMS-Kernobjekte existiert dort keine
  // Verteilung (toter Link auf den Leerzustand). Der alte Bug (immer `/isms`) hätte die
  // generische „href.length > 0"-Prüfung oben bestanden; hier wird das Ziel je Zweig festgenagelt.
  it('Lebenszyklus-Drilldown ist mandantenabhängig (F1): mit ISMS-Kern → /isms, sonst Objektliste', () => {
    // Nordwerk trägt ISMS-Kernobjekte → Verteilung existiert → Drilldown auf /isms.
    expect(buildHeuteDashboard(TENANT_ID.NORDWERK)?.lifecycleSummary?.drilldown.href).toBe(
      getPlace('isms').href,
    );
    // Consulting Operator hat Objekte, aber keine ISMS-Kernobjekte → kein /isms-Ziel.
    const operator = buildHeuteDashboard(TENANT_ID.CONSULTING_OPERATOR);
    expect(operator?.lifecycleSummary?.drilldown.href).toBe(
      tenantDetailHref(TENANT_ID.CONSULTING_OPERATOR),
    );
    expect(operator?.lifecycleSummary?.drilldown.href).not.toBe(getPlace('isms').href);
  });

  it('Mandanten mit Datenbestand tragen einen Datenstand (Systemachse, Kalendertag)', () => {
    for (const tenantId of [TENANT_ID.NORDWERK, TENANT_ID.CONSULTING_OPERATOR]) {
      const model = buildHeuteDashboard(tenantId);
      const bestand = model?.stockTiles.find((t) => t.id === 'bestand');
      expect(bestand?.datenstand).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

/* -----------------------------------------------------------------------------
 * 4. Ampel-Grenze: Positivliste erzwungen (AC 15)
 * --------------------------------------------------------------------------- */

describe('Dashboard-Badges – nur Regeln der Positivliste, kein Urteil', () => {
  it('jedes erzeugte Badge trägt eine Regel-Kennung aus BADGE_RULES', () => {
    const zulaessig = new Set(Object.keys(BADGE_RULES));
    for (const tenantId of Object.values(TENANT_ID)) {
      const model = buildHeuteDashboard(tenantId);
      if (!model) throw new Error(`Testfixture fehlt: ${tenantId}`);
      const badges = [
        ...model.coverage.map((t: CoverageTile) => t.badge),
        model.emptyTile?.badge,
      ].filter((b) => b !== undefined);
      for (const badge of badges) {
        expect(zulaessig.has(badge.rule), `${tenantId}: ${badge.rule}`).toBe(true);
        expect(badge.symbol).toBe(BADGE_RULES[badge.rule].symbol);
        expect(badge.grenze).toBe(BADGE_RULES[badge.rule].grenze);
        /* REGEL-ERHALTEND UMGESTELLT (WP-028 Slice 3, DR-0013 Nr. 7): Der Badge-TEXT war bis
           dahin identisch mit dem statischen Regel-Text. Seit der Sprachpräzisierung ist er
           zahlengebunden („alle 34 Objekte haben einen benannten Owner"), also nicht mehr
           gegen eine feste Konstante prüfbar. Geprüft wird stattdessen die FORM – entweder
           zahlengebunden oder der merkmalfreie Rückfalltext der Regel. Die eigentliche Regel
           („kein Badge außerhalb der Positivliste") steht unverändert eine Zeile darüber. */
        expect(
          /^(alle \d+ |Datenlücke: \d+ )/.test(badge.text) ||
            badge.text === BADGE_RULES[badge.rule].text,
          `${tenantId}: „${badge.text}" ist weder zahlengebunden noch Rückfalltext`,
        ).toBe(true);
      }
    }
  });

  it('Lebenszyklus- und Statuskacheln tragen KEIN Badge (kein Urteil über Stände/Bestände)', () => {
    for (const tenantId of [TENANT_ID.NORDWERK, TENANT_ID.CONSULTING_OPERATOR]) {
      const model = buildHeuteDashboard(tenantId);
      if (!model) throw new Error(`Testfixture fehlt: ${tenantId}`);
      // Struktur-Beweis: Stock-/Lebenszyklus-Kacheln haben schlicht kein Badge-Feld; die
      // Abdeckungs-Badges beruhen auf x/y-Lagen, nie auf einem Stand-Namen.
      for (const tile of model.stockTiles) {
        expect('badge' in tile).toBe(false);
      }
      if (model.lifecycleSummary) expect('badge' in model.lifecycleSummary).toBe(false);
    }
  });
});

/* -----------------------------------------------------------------------------
 * 5. Leere und unbekannte Mandanten
 * --------------------------------------------------------------------------- */

describe('buildHeuteDashboard – leere Mandanten und Mandantengrenze', () => {
  for (const tenantId of [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
    it(`${tenantId}: EINE ehrliche Datenlücken-Kachel statt einer „0 von 0"-Wand`, () => {
      const model = buildHeuteDashboard(tenantId);
      if (!model) throw new Error(`Testfixture fehlt: ${tenantId}`);
      expect(model.isEmpty).toBe(true);
      expect(model.stockTiles).toEqual([]);
      expect(model.coverage).toEqual([]);
      expect(model.lifecycleSummary).toBeUndefined();
      expect(model.emptyTile?.badge.rule).toBe('kein_datenbestand');
      expect(model.klartext[0]).toContain('0 Objekte und 0 Beziehungen');
      // Kein fremder Mandant in den Texten (Dok. 07 „Mandantenfähigkeit", P09).
      const text = JSON.stringify(model);
      for (const fremd of DEMO_SEED.tenants.filter((t) => t.tenant_id !== tenantId)) {
        expect(text).not.toContain(fremd.display_name);
        expect(text).not.toContain(fremd.tenant_id);
      }
    });
  }

  it('unbekannter Mandant: undefined – keine Existenzaussage, kein Ersatzinhalt', () => {
    expect(buildHeuteDashboard('tenant-unbekannt')).toBeUndefined();
    expect(buildIsmsVerdichtung('tenant-unbekannt')).toBeUndefined();
  });
});

/* -----------------------------------------------------------------------------
 * 6. Verdichteter Überblick für den Ort „ISMS"
 * --------------------------------------------------------------------------- */

describe('buildIsmsVerdichtung – Verteilung und Abdeckungen des Ortes „ISMS"', () => {
  it('Nordwerk: Verteilung summiert exakt die ISMS-Kernobjekte, Stände in Katalogreihenfolge', () => {
    const verdichtung = buildIsmsVerdichtung(TENANT_ID.NORDWERK);
    if (!verdichtung) throw new Error('Testfixture fehlt: Nordwerk-Verdichtung');

    const kernTypen = ['Risk', 'Risk Scenario', 'Weakness', 'Control', 'Measure', 'Evidence'];
    const kernobjekte = nordwerkObjekte().filter((o) => kernTypen.includes(o.object_type));

    expect(verdichtung.lifecycle.total).toBe(kernobjekte.length);
    expect(verdichtung.lifecycle.slices.map((s) => s.count).reduce((a, b) => a + b, 0)).toBe(
      kernobjekte.length,
    );
    // Jeder Stand ist ein ERFASSTER Stand aus dem Vertragskatalog (nichts erfunden).
    for (const slice of verdichtung.lifecycle.slices) {
      expect(KATALOG.includes(slice.status), slice.status).toBe(true);
      expect(kernobjekte.filter((o) => o.lifecycle_status === slice.status)).toHaveLength(
        slice.count,
      );
    }
    const indizes = verdichtung.lifecycle.slices.map((s) => KATALOG.indexOf(s.status));
    expect([...indizes].sort((a, b) => a - b)).toEqual(indizes);
    // 08-D07-Glosse ist Pflicht.
    expect(verdichtung.lifecycle.glosse).toBe(LIFECYCLE_GLOSSE);
  });

  it('trägt die beiden ISMS-Abdeckungen mit seiteninternen Anker-Drill-downs', () => {
    const verdichtung = buildIsmsVerdichtung(TENANT_ID.NORDWERK);
    if (!verdichtung) throw new Error('Testfixture fehlt: Nordwerk-Verdichtung');

    expect(verdichtung.coverage.map((t) => t.id)).toEqual([
      'controls_nachweis',
      'risiken_minderung',
    ]);
    for (const tile of verdichtung.coverage) {
      // Drill-down bleibt auf der Seite (Karten mit Stand je Objekt) – ein Anker, kein Score.
      expect(tile.drilldown.href.startsWith('#isms-')).toBe(true);
    }
    // Dieselbe Zählregel wie auf „Heute" (keine zweite Zählregel).
    const heute = buildHeuteDashboard(TENANT_ID.NORDWERK);
    expect(verdichtung.coverage[0].covered).toBe(
      heute?.coverage.find((t) => t.id === 'controls_nachweis')?.covered,
    );
    expect(verdichtung.coverage[1].covered).toBe(
      heute?.coverage.find((t) => t.id === 'risiken_minderung')?.covered,
    );
  });

  it('liefert für Mandanten ohne ISMS-Kernobjekte undefined (eigener Leerzustand der Seite)', () => {
    for (const tenantId of [TENANT_ID.CONSULTING_OPERATOR, TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
      expect(buildIsmsVerdichtung(tenantId), tenantId).toBeUndefined();
    }
  });

  /**
   * WP-028 Slice 3 (DR-0013 Nr. 8): Der Stand „wirksam" widerspricht auf derselben Seite dem
   * Satz „keine bewertete Wirksamkeit". Aufgelöst wird das AM WORT – nicht durch Umbenennen
   * (Vertrag/Seed, Owner-Entscheidung E-02). Der Test nagelt beides fest: der Stand bleibt
   * wörtlich erhalten UND trägt seine Lesart.
   */
  it('kennzeichnet urteilsklingende Stände am Wort, ohne sie umzubenennen', () => {
    const verdichtung = buildIsmsVerdichtung(TENANT_ID.NORDWERK);
    if (!verdichtung) throw new Error('Testfixture fehlt: Nordwerk-Verdichtung');

    const wirksam = verdichtung.lifecycle.slices.find((s) => s.status === 'wirksam');
    expect(wirksam, 'Testfixture fehlt: erfasster Stand „wirksam"').toBeDefined();
    // Der Stand heißt unverändert „wirksam" (kein stilles Umbenennen des Seed-Vokabulars) …
    expect(wirksam?.status).toBe('wirksam');
    // … und trägt die Lesart, die dem Seitensatz nicht widerspricht.
    expect(wirksam?.hinweis).toBe(STAND_HINWEIS.wirksam);
    expect(wirksam?.hinweis).toMatch(/kein Wirksamkeitsurteil/);

    // Stände ohne Urteils-Anmutung bleiben unkommentiert – nichts wird erfunden.
    const behandelt = verdichtung.lifecycle.slices.find((s) => s.status === 'behandelt');
    expect(behandelt?.hinweis).toBeUndefined();
  });

  /**
   * Nordwerk trägt genau ein Control und genau ein Risiko. Vor WP-028 zeigten beide Kacheln
   * „1 von 1" mit Vollbalken und grünem Häkchen – für einen CISO die Anmutung einer
   * vollständigen Control-Landschaft (Usability-Audit). Jetzt: Zahl bleibt, Erfolgssymbolik
   * geht, die absolute Kleinheit steht als Text da.
   */
  it('Nordwerk: die beiden ISMS-Abdeckungen sind kleine Grundgesamtheiten (n = 1)', () => {
    const verdichtung = buildIsmsVerdichtung(TENANT_ID.NORDWERK);
    if (!verdichtung) throw new Error('Testfixture fehlt: Nordwerk-Verdichtung');

    for (const tile of verdichtung.coverage) {
      expect(tile.total, tile.id).toBeLessThanOrEqual(KLEINE_GRUNDGESAMTHEIT);
      expect(tile.kleineGrundgesamtheit, tile.id).toBe(true);
      expect(tile.badge, `${tile.id}: kein Erfolgs-Badge bei n≤2`).toBeUndefined();
      expect(tile.kleinheitText, tile.id).toMatch(/^Kleine Grundgesamtheit: nur 1 /);
    }
  });

  /**
   * Gegenprobe zur Regel oben: Wo die Grundgesamtheit groß genug ist, gibt es weiterhin Badge,
   * Balken und KEINEN Kleinheits-Hinweis – die Regel greift nicht flächendeckend.
   */
  it('Nordwerk: Owner- und Vertrauensgrad-Abdeckung tragen Badge statt Kleinheits-Hinweis', () => {
    const model = buildHeuteDashboard(TENANT_ID.NORDWERK);
    if (!model) throw new Error('Testfixture fehlt: Nordwerk-Dashboard');

    for (const id of ['objekte_owner', 'kanten_vertrauensgrad'] as const) {
      const tile = model.coverage.find((t) => t.id === id);
      expect(tile?.total, id).toBeGreaterThan(KLEINE_GRUNDGESAMTHEIT);
      expect(tile?.kleineGrundgesamtheit, id).toBe(false);
      expect(tile?.kleinheitText, id).toBeUndefined();
      expect(tile?.badge, id).toBeDefined();
      // Zahlengebundener Text (DR-0013 Nr. 7) – kein pauschales „vollständig belegt".
      expect(tile?.badge?.text, id).toMatch(/^(alle \d+ |Datenlücke: \d+ )/);
    }
  });
});
