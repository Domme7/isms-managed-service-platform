/**
 * Unit-Tests der Mission-Control-View-Helfer des Ortes „Heute" (WP-016 Slice 1).
 *
 * Prüft gegen den echten Seed UND gegen synthetische Fixtures:
 *  1. Erfassungswellen – aus `record_time.recorded_at` ABGELEITET (Anzahl nirgends angenommen).
 *  2. Historienaussage – abgeleitet, mit Fixture-Negativbeweis (andere Datenlage ⇒ andere Aussage).
 *  3. Die vier Beobachtungen – Zählung, Grundgesamtheit, Ermittlungsregel; 0 wird ausgewiesen.
 *  4. Einstiegspunkte – Familienreihenfolge, Mandantentreue jedes Links.
 *  5. Tenant-Isolation als Sicherheitsgrenze inkl. Negativbeweis.
 *  6. Wächtertest gegen jede Form von Bewertung (Score/Ampel/Rang/Frist/Empfehlung).
 */
import { describe, expect, it } from 'vitest';

import { OBJECT_FAMILY_ID, OBJECT_TYPE } from '@isms/contracts';
import { DEMO_SEED, TENANT_ID, type DemoTenant } from '@isms/demo-seed';

import { buildDecisionRegister } from '../../entscheidungen/data';
import { buildIsmsCoreView } from '../../isms/data';
import { getManagedServicesForTenant } from '../../services/data';
import { getPlace } from '../../shell/places';
import { familyForType } from '../../twin/data';
import { EVIDENCE_TARGET_TYPES } from '../../twin/object-detail';
import { objectDetailHref, tenantDetailHref } from '../../twin/routes';
import {
  buildMissionControl,
  buildMissionControlModel,
  deriveHistoryState,
  deriveObservations,
  deriveObjectEntryPoints,
  deriveRecordingWaves,
  type MissionControlModel,
  type TenantStock,
} from '../data';
import {
  FIXTURE_FOREIGN_TENANT,
  FIXTURE_TENANT,
  fixtureObject,
  fixtureRelationship,
} from './fixtures';

/* -----------------------------------------------------------------------------
 * Hilfen
 * --------------------------------------------------------------------------- */

function modelOrThrow(tenantId: string): MissionControlModel {
  const model = buildMissionControl(tenantId);
  if (!model) throw new Error(`Testfixture fehlt: ${tenantId}`);
  return model;
}

/** Erste Bestandszahl eines Orts-Einstiegs – über die Orts-ID statt über einen Index. */
function stockOf(model: MissionControlModel, placeId: string): number {
  const entry = model.placeEntryPoints.find((p) => p.placeId === placeId);
  if (!entry) throw new Error(`Kein Orts-Einstieg für „${placeId}"`);
  return entry.stock[0].count;
}

const objectsOf = (tenantId: string) => DEMO_SEED.objects.filter((o) => o.tenant_id === tenantId);
const relationshipsOf = (tenantId: string) =>
  DEMO_SEED.relationships.filter((r) => r.tenant_id === tenantId);

const FIXTURE_TENANT_META: DemoTenant = {
  tenant_id: FIXTURE_TENANT,
  display_name: 'Fixture Mandant',
  industry: 'synthetisch',
  description: 'synthetische Testfixture',
  has_object_graph: true,
};

const NO_STOCK: TenantStock = {
  ismsCoreObjectCount: 0,
  managedServiceCount: 0,
  decisionCount: 0,
};

/* -----------------------------------------------------------------------------
 * (2) Was ist erfasst worden? – Erfassungswellen
 * --------------------------------------------------------------------------- */

describe('deriveRecordingWaves – Erfassungswellen werden abgeleitet, nicht angenommen', () => {
  it('leitet für Nordwerk genau die belegten Kalendertage ab (keine feste Anzahl im Code)', () => {
    const objects = objectsOf(TENANT_ID.NORDWERK);
    const relationships = relationshipsOf(TENANT_ID.NORDWERK);

    // Erwartung aus den DATEN, nicht aus dem Work Package: die Anzahl der Wellen ist die
    // Anzahl verschiedener Erfassungstage. Ändert sich der Seed, ändert sich beides gemeinsam.
    const belegteTage = new Set([
      ...objects.map((o) => o.record_time.recorded_at.slice(0, 10)),
      ...relationships.map((r) => r.record_time.recorded_at.slice(0, 10)),
    ]);

    const waves = deriveRecordingWaves(objects, relationships);
    expect(waves).toHaveLength(belegteTage.size);
    // Seit WP-017 trägt Nordwerk drei Erfassungswellen (Kerngraph, Serviceschicht,
    // Entscheidungsschicht) – die Zahl folgt weiterhin den Daten, nicht dem Work Package.
    expect(waves).toHaveLength(3);

    expect(waves.map((w) => w.dateDisplay)).toEqual(['15.01.2026', '16.02.2026', '16.03.2026']);
    expect(waves[0]).toMatchObject({
      recordedOn: '2026-01-15',
      objectCount: 17,
      relationshipCount: 15,
    });
    expect(waves[1]).toMatchObject({
      recordedOn: '2026-02-16',
      objectCount: 14,
      relationshipCount: 28,
    });
    expect(waves[2]).toMatchObject({
      recordedOn: '2026-03-16',
      objectCount: 3,
      relationshipCount: 8,
    });
    // Eine Welle ist eine TAGESGRUPPE und trägt deshalb bewusst KEINEN Zeitstempel eines
    // einzelnen Datensatzes: die Anzeige würde daraus sonst eine Uhrzeit der ganzen Gruppe machen.
    for (const wave of waves) {
      expect(Object.keys(wave).sort()).toEqual([
        'dateDisplay',
        'objectCount',
        'recordedOn',
        'relationshipCount',
        'scopeIds',
      ]);
      expect(wave.recordedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }

    // Jede Welle ist vollständig verbucht – keine Kante und kein Objekt fällt heraus.
    expect(waves.reduce((sum, w) => sum + w.objectCount, 0)).toBe(objects.length);
    expect(waves.reduce((sum, w) => sum + w.relationshipCount, 0)).toBe(relationships.length);
  });

  it('leitet für den Consulting Operator GENAU EINE Welle ab (Gegenprobe zu den drei Nordwerk-Wellen)', () => {
    const waves = deriveRecordingWaves(
      objectsOf(TENANT_ID.CONSULTING_OPERATOR),
      relationshipsOf(TENANT_ID.CONSULTING_OPERATOR),
    );
    expect(waves).toHaveLength(1);
    expect(waves[0]).toMatchObject({
      dateDisplay: '16.02.2026',
      objectCount: 9,
      relationshipCount: 11,
    });
  });

  it('liefert für einen Mandanten ohne Daten keine Welle (statt einer erfundenen)', () => {
    expect(deriveRecordingWaves([], [])).toEqual([]);
    expect(
      deriveRecordingWaves(objectsOf(TENANT_ID.FINOVIA), relationshipsOf(TENANT_ID.FINOVIA)),
    ).toEqual([]);
  });

  it('sortiert nach Kalendertag aufsteigend und zählt Objekte und Kanten getrennt (Fixture)', () => {
    const objects = [
      fixtureObject({ object_id: 'c', record_time: { recorded_at: '2031-03-05T12:00:00.000Z' } }),
      fixtureObject({ object_id: 'a', record_time: { recorded_at: '2030-01-02T06:00:00.000Z' } }),
      fixtureObject({ object_id: 'b', record_time: { recorded_at: '2030-01-02T23:30:00.000Z' } }),
    ];
    const relationships = [
      fixtureRelationship({
        relationship_id: 'r1',
        record_time: { recorded_at: '2030-06-30T00:00:00.000Z' },
      }),
    ];

    const waves = deriveRecordingWaves(objects, relationships);
    expect(waves.map((w) => w.recordedOn)).toEqual(['2030-01-02', '2030-06-30', '2031-03-05']);
    expect(waves.map((w) => [w.objectCount, w.relationshipCount])).toEqual([
      [2, 0],
      [0, 1],
      [1, 0],
    ]);
    expect(waves[0].dateDisplay).toBe('02.01.2030');
  });

  it('weist als fachliche Zuordnung die belegten Scope-Kennungen aus (abgeleitet, ohne Wellenname)', () => {
    // Reale Datenlage: die zweite Nordwerk-Welle trägt Objekte BEIDER Scopes. Ein Wellenname
    // („ISMS-Kerngraph"/„Managed-Service-Schicht") wäre deshalb eine Behauptung – siehe
    // OFFENE FRAGE O-WP016-07.
    const waves = deriveRecordingWaves(
      objectsOf(TENANT_ID.NORDWERK),
      relationshipsOf(TENANT_ID.NORDWERK),
    );
    expect(waves[0].scopeIds).toEqual(['scope-nordwerk-isms-core']);
    expect(waves[1].scopeIds).toEqual([
      'scope-nordwerk-isms-core',
      'scope-nordwerk-managed-service',
    ]);
    // Die Entscheidungsschicht legt keine neue Scope-Kennung an; sie nutzt die belegten.
    expect(waves[2].scopeIds).toEqual([
      'scope-nordwerk-isms-core',
      'scope-nordwerk-managed-service',
    ]);

    const operator = deriveRecordingWaves(
      objectsOf(TENANT_ID.CONSULTING_OPERATOR),
      relationshipsOf(TENANT_ID.CONSULTING_OPERATOR),
    );
    expect(operator[0].scopeIds).toEqual(['scope-consulting-operator-service-betrieb']);
  });

  it('erfindet keine Scope-Zuordnung, wenn keine erfasst ist (Fixture)', () => {
    const waves = deriveRecordingWaves([fixtureObject({ object_id: 'ohne-scope' })], []);
    expect(waves[0].scopeIds).toEqual([]);
  });
});

/* -----------------------------------------------------------------------------
 * (2b) Historienaussage – abgeleitet, nicht konstant
 * --------------------------------------------------------------------------- */

describe('deriveHistoryState – die Aussage folgt den Daten (Fixture-Negativbeweis)', () => {
  const seedState = deriveHistoryState(
    objectsOf(TENANT_ID.NORDWERK),
    relationshipsOf(TENANT_ID.NORDWERK),
  );
  /**
   * Fixture-Referenz „keine Historie". Sie ersetzt den Seed als Kontrastpunkt genau dort, wo der
   * Seed seit WP-017 SELBST eine Ablösung trägt – der Negativbeweis „andere Datenlage ⇒ andere
   * Aussage" bleibt damit vollständig erhalten, ohne von der aktuellen Seed-Lage abzuhängen.
   */
  const fixtureOhneHistorie = deriveHistoryState(
    [fixtureObject({ object_id: 'ohne-historie' })],
    [],
  );

  it('leitet die BELEGTE Historie aus Version, replaced_at und supersedes-Kanten ab', () => {
    // Gegenprobe an den Rohdaten: die Aussage folgt dem Seed, nicht dem Text. Seit WP-017 trägt
    // Nordwerk genau eine Ablösekette (R24) – Datensatzversionen und Ersetzungszeitpunkte
    // bleiben dagegen bewusst ungenutzt (fachliche Ablösung statt Datensatzversion, O-WP017-07).
    const supersedesKanten = relationshipsOf(TENANT_ID.NORDWERK).filter(
      (r) => r.relationship_type === 'supersedes',
    );
    expect(objectsOf(TENANT_ID.NORDWERK).every((o) => o.version === 1)).toBe(true);
    expect(objectsOf(TENANT_ID.NORDWERK).every((o) => !o.record_time.replaced_at)).toBe(true);
    expect(supersedesKanten).toHaveLength(1);

    expect(seedState.hasHistory).toBe(true);
    expect(seedState.maxVersion).toBe(1);
    expect(seedState.objectsWithPreviousVersion).toBe(0);
    expect(seedState.objectsWithReplacementRecord).toBe(0);
    expect(seedState.supersedesEdgeCount).toBe(supersedesKanten.length);
    expect(seedState.statement).toContain('belegt');
    // Die Zahl im Satz stammt aus den Daten – und der Numerus stimmt bei genau einem Beleg.
    // WP-028/DR-0013: „supersedes" erscheint im Nutzertext als Klartext „Ablösungs-Beziehung".
    expect(seedState.statement).toContain('1 Ablösungs-Beziehung ist erfasst');
    expect(seedState.statement).not.toContain('Beziehungen sind erfasst');
    // Die beiden anderen Belegarten sind NICHT belegt und stehen deshalb auch nicht im Satz.
    expect(seedState.statement).not.toContain('Version größer 1');
    expect(seedState.statement).not.toContain('Ersetzungszeitpunkt');
  });

  it('liefert für einen Mandanten OHNE Ablösung weiterhin „keine Historie" (Gegenprobe am Seed)', () => {
    // Zweite Ausprägung derselben Ableitung, ebenfalls am echten Seed: der Consulting Operator
    // trägt keine supersedes-Kante – die Aussage bleibt dort die benannte Lücke.
    const operator = deriveHistoryState(
      objectsOf(TENANT_ID.CONSULTING_OPERATOR),
      relationshipsOf(TENANT_ID.CONSULTING_OPERATOR),
    );
    expect(
      relationshipsOf(TENANT_ID.CONSULTING_OPERATOR).some(
        (r) => r.relationship_type === 'supersedes',
      ),
    ).toBe(false);
    expect(operator.hasHistory).toBe(false);
    expect(operator.supersedesEdgeCount).toBe(0);
    expect(operator.statement).toContain('nicht erfasst');
    expect(operator.statement).toContain(
      `alle ${objectsOf(TENANT_ID.CONSULTING_OPERATOR).length} Objekte`,
    );
  });

  it('erzeugt bei `version: 2` eine ANDERE Aussage', () => {
    const state = deriveHistoryState(
      [fixtureObject({ object_id: 'v2', version: 2 }), fixtureObject({ object_id: 'v1' })],
      [],
    );
    expect(state.hasHistory).toBe(true);
    expect(state.maxVersion).toBe(2);
    expect(state.objectsWithPreviousVersion).toBe(1);
    expect(state.statement).not.toBe(seedState.statement);
    expect(state.statement).toContain('belegt');
    expect(state.statement).toContain('Version größer 1');
  });

  it('erzeugt bei gesetztem `record_time.replaced_at` eine ANDERE Aussage', () => {
    const state = deriveHistoryState(
      [
        fixtureObject({
          object_id: 'ersetzt',
          record_time: {
            recorded_at: '2030-01-02T00:00:00.000Z',
            replaced_at: '2030-05-05T00:00:00.000Z',
          },
        }),
      ],
      [],
    );
    expect(state.hasHistory).toBe(true);
    expect(state.objectsWithReplacementRecord).toBe(1);
    expect(state.statement).not.toBe(seedState.statement);
    expect(state.statement).toContain('Ersetzungszeitpunkt');
  });

  it('erzeugt bei einer `supersedes`-Kante (R24) eine ANDERE Aussage', () => {
    const state = deriveHistoryState(
      [fixtureObject({ object_id: 'a' }), fixtureObject({ object_id: 'b' })],
      [
        fixtureRelationship({
          relationship_id: 'r-supersedes',
          relationship_type: 'supersedes',
          source_id: 'a',
          target_id: 'b',
        }),
      ],
    );
    expect(state.hasHistory).toBe(true);
    expect(state.supersedesEdgeCount).toBe(1);
    // Kontrast gegen die Datenlage OHNE Historie (der Seed trägt seit WP-017 selbst genau eine
    // Ablösekette und taugt hier deshalb nicht mehr als Gegenstück).
    expect(state.statement).not.toBe(fixtureOhneHistorie.statement);
    // WP-028/DR-0013: Klartext statt „supersedes" im Nutzertext.
    expect(state.statement).toContain('Ablösungs-Beziehung');
    // Umgekehrte Probe: gleiche Datenlage ⇒ gleiche Aussage. Die Fixture bildet exakt die Lage
    // des Seeds nach (eine supersedes-Kante, keine Version > 1, kein Ersetzungszeitpunkt) und
    // muss deshalb denselben Satz erzeugen – die Aussage ist abgeleitet, nicht datenspezifisch.
    expect(state.statement).toBe(seedState.statement);
  });

  it('benennt einen leeren Mandanten ehrlich, statt eine Historie zu behaupten', () => {
    const state = deriveHistoryState([], []);
    expect(state.hasHistory).toBe(false);
    expect(state.maxVersion).toBe(0);
    expect(state.statement).not.toBe(seedState.statement);
    expect(state.statement).toContain('keine Objekte');
  });
});

/* -----------------------------------------------------------------------------
 * (3) Was weiß ich über die Datenlage? – vier gezählte Beobachtungen
 * --------------------------------------------------------------------------- */

describe('deriveObservations – gezählt, nicht bewertet', () => {
  it('liefert immer genau die vier definierten Beobachtungen in fester Reihenfolge', () => {
    for (const tenantId of DEMO_SEED.tenants.map((t) => t.tenant_id)) {
      const observations = deriveObservations(objectsOf(tenantId), relationshipsOf(tenantId));
      expect(observations.map((o) => o.id)).toEqual([
        'ohne_owner',
        'scope_ohne_objekt',
        'kante_ohne_vertrauensgrad',
        'ohne_nachweisbezug',
      ]);
      for (const observation of observations) {
        expect(observation.label.length).toBeGreaterThan(0);
        expect(observation.method.length).toBeGreaterThan(0);
        expect(observation.totalLabel.length).toBeGreaterThan(0);
        expect(Number.isInteger(observation.count)).toBe(true);
        expect(observation.count).toBeLessThanOrEqual(observation.total);
      }
    }
  });

  it('zählt für Nordwerk die belegten Werte (gegen den Seed nachgerechnet)', () => {
    const objects = objectsOf(TENANT_ID.NORDWERK);
    const relationships = relationshipsOf(TENANT_ID.NORDWERK);
    const observations = deriveObservations(objects, relationships);
    const byId = new Map(observations.map((o) => [o.id, o] as const));

    expect(byId.get('ohne_owner')).toMatchObject({ count: 22, total: 34 });
    expect(byId.get('scope_ohne_objekt')).toMatchObject({ count: 2, total: 2 });
    expect(byId.get('kante_ohne_vertrauensgrad')).toMatchObject({ count: 40, total: 51 });
    // Seit WP-017 zählen auch die drei `Decision Record`-Objekte zu den nachweisfähigen Typen
    // (EVIDENCE_TARGET_TYPES); genau eine Entscheidung trägt eine `evidences`-Kante.
    expect(byId.get('ohne_nachweisbezug')).toMatchObject({ count: 3, total: 5 });

    // Unabhängige Gegenrechnung an den Rohdaten (der Test rechnet nicht die Funktion nach,
    // sondern die REGEL – so fällt eine geänderte Regel auf).
    expect(byId.get('ohne_owner')?.count).toBe(objects.filter((o) => !o.owner_ids.length).length);
    expect(byId.get('kante_ohne_vertrauensgrad')?.count).toBe(
      relationships.filter((r) => r.confidence === undefined).length,
    );
  });

  it('zählt für den Consulting Operator die belegten Werte und weist die 0 AUS', () => {
    const observations = deriveObservations(
      objectsOf(TENANT_ID.CONSULTING_OPERATOR),
      relationshipsOf(TENANT_ID.CONSULTING_OPERATOR),
    );
    const byId = new Map(observations.map((o) => [o.id, o] as const));

    expect(byId.get('ohne_owner')).toMatchObject({ count: 7, total: 9 });
    expect(byId.get('scope_ohne_objekt')).toMatchObject({ count: 1, total: 1 });
    expect(byId.get('kante_ohne_vertrauensgrad')).toMatchObject({ count: 11, total: 11 });
    // Der Mandant trägt keine nachweisfähigen Objekte: 0 von 0 – die Beobachtung bleibt sichtbar.
    expect(byId.get('ohne_nachweisbezug')).toMatchObject({ count: 0, total: 0 });
    expect(observations).toHaveLength(4);
  });

  it('führt in der vierten Beobachtung GENAU die nachweisfähigen Typen auf (aus der Konstante)', () => {
    // AC 1 „nichts hartkodiert": Label und Ermittlungsregel nennen die Typen aus
    // EVIDENCE_TARGET_TYPES. Stünde die Liste als Fließtext im Satz, bliebe sie bei einer
    // Änderung der Konstante still falsch – dieser Test schlägt dann an (Review-Fix).
    const observation = deriveObservations(objectsOf(TENANT_ID.NORDWERK), []).find(
      (o) => o.id === 'ohne_nachweisbezug',
    );
    if (!observation) throw new Error('Beobachtung „ohne_nachweisbezug" fehlt');

    for (const typ of EVIDENCE_TARGET_TYPES) {
      expect(observation.totalLabel, typ).toContain(typ);
      expect(observation.method, typ).toContain(typ);
    }
    // Und kein weiterer kanonischer Objekttyp steht im Label.
    const erlaubt: readonly string[] = EVIDENCE_TARGET_TYPES;
    for (const typ of OBJECT_TYPE.filter((t) => !erlaubt.includes(t))) {
      expect(observation.totalLabel, typ).not.toContain(typ);
    }
  });

  it('weist auch für einen leeren Mandanten alle vier Beobachtungen mit 0 aus', () => {
    const observations = deriveObservations([], []);
    expect(observations).toHaveLength(4);
    expect(observations.every((o) => o.count === 0 && o.total === 0)).toBe(true);
  });

  it('prüft jede der vier Regeln an einer Fixture mit bekannter Abweichung', () => {
    const objects = [
      // ohne Owner, mit nicht materialisiertem Scope, nachweisfähig (Control) ohne Nachweis
      fixtureObject({
        object_id: 'ctrl-1',
        object_type: 'Control',
        scope_ids: [{ scope_id: 'scope-fixture-fehlt' }],
      }),
      // mit Owner, mit materialisiertem Scope, nachweisfähig (Measure) MIT Nachweis
      fixtureObject({
        object_id: 'measure-1',
        object_type: 'Measure',
        owner_ids: [{ owner_id: 'ctrl-1', owner_kind: 'fachlich' }],
        scope_ids: [{ scope_id: 'scope-fixture-objekt' }],
      }),
      // das Scope-Objekt selbst (macht die Kennung „scope-fixture-objekt" auflösbar)
      fixtureObject({
        object_id: 'scope-fixture-objekt',
        object_type: 'ISMS-Scope',
        owner_ids: [{ owner_id: 'ctrl-1', owner_kind: 'fachlich' }],
      }),
      // kein Nachweisziel laut R15 – zählt nicht in die vierte Beobachtung
      fixtureObject({ object_id: 'org-1', object_type: 'Organisation' }),
      fixtureObject({ object_id: 'evidence-1', object_type: 'Evidence' }),
    ];
    const relationships = [
      fixtureRelationship({
        relationship_id: 'r-evidences',
        relationship_type: 'evidences',
        source_id: 'evidence-1',
        target_id: 'measure-1',
        confidence: 0.8,
      }),
      fixtureRelationship({ relationship_id: 'r-ohne-confidence' }),
    ];

    const byId = new Map(deriveObservations(objects, relationships).map((o) => [o.id, o] as const));
    // (a) 3 von 5 Objekten ohne Owner
    expect(byId.get('ohne_owner')).toMatchObject({ count: 3, total: 5 });
    // (b) 1 von 2 Scope-Kennungen ohne gleichnamiges Objekt
    expect(byId.get('scope_ohne_objekt')).toMatchObject({ count: 1, total: 2 });
    // (c) 1 von 2 Kanten ohne Vertrauensgrad
    expect(byId.get('kante_ohne_vertrauensgrad')).toMatchObject({ count: 1, total: 2 });
    // (d) 1 von 2 nachweisfähigen Objekten (Control ohne, Measure mit Nachweis);
    //     Organisation, Evidence und ISMS-Scope sind laut R15 keine Nachweisziele.
    expect(byId.get('ohne_nachweisbezug')).toMatchObject({ count: 1, total: 2 });
  });
});

/* -----------------------------------------------------------------------------
 * (4) Wo steige ich ein? – Orte und Objektfamilien
 * --------------------------------------------------------------------------- */

describe('Einstiegspunkte – Familienreihenfolge und Mandantentreue', () => {
  it('liefert je belegter Objektfamilie GENAU EINEN Einstieg in kanonischer Reihenfolge', () => {
    const objects = objectsOf(TENANT_ID.NORDWERK);
    const entries = deriveObjectEntryPoints(TENANT_ID.NORDWERK, objects);

    expect(entries.map((e) => e.familyId)).toEqual([
      'F01',
      'F02',
      'F03',
      'F06',
      'F07',
      'F08',
      'F09',
    ]);
    // Die Reihenfolge ist eine Teilfolge des kanonischen Katalogs F01–F09.
    const canonical = [...OBJECT_FAMILY_ID];
    const positions = entries.map((e) => canonical.indexOf(e.familyId));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(new Set(entries.map((e) => e.familyId)).size).toBe(entries.length);

    // Je Familie das ERSTE Objekt in Datenbestandsreihenfolge – keine Auswahl nach Wichtigkeit.
    for (const entry of entries) {
      const erstesDerFamilie = objects.find((o) => familyForType(o.object_type) === entry.familyId);
      expect(entry.objectId).toBe(erstesDerFamilie?.object_id);
      expect(entry.name).toBe(erstesDerFamilie?.display_name);
      expect(entry.familyObjectCount).toBe(
        objects.filter((o) => familyForType(o.object_type) === entry.familyId).length,
      );
    }
    expect(entries.reduce((sum, e) => sum + e.familyObjectCount, 0)).toBe(objects.length);
  });

  it('bildet jeden Objekt-Link über `objectDetailHref` mit dem AKTIVEN Mandanten', () => {
    for (const tenantId of [TENANT_ID.NORDWERK, TENANT_ID.CONSULTING_OPERATOR]) {
      for (const entry of deriveObjectEntryPoints(tenantId, objectsOf(tenantId))) {
        expect(entry.href).toBe(objectDetailHref(tenantId, entry.objectId));
        expect(entry.href).toContain(tenantId);
      }
    }
  });

  it('liefert für den Consulting Operator die drei belegten Familien', () => {
    const entries = deriveObjectEntryPoints(
      TENANT_ID.CONSULTING_OPERATOR,
      objectsOf(TENANT_ID.CONSULTING_OPERATOR),
    );
    expect(entries.map((e) => e.familyId)).toEqual(['F01', 'F02', 'F09']);
    expect(entries.map((e) => e.familyObjectCount)).toEqual([1, 2, 6]);
  });

  it('nennt die vier belegten Orte mit dem Bestand des aktiven Mandanten', () => {
    const model = modelOrThrow(TENANT_ID.NORDWERK);
    // Reihenfolge der Navigation (Dok. 06 §4): Kunden, ISMS, Entscheidungen, Services.
    expect(model.placeEntryPoints.map((p) => p.placeId)).toEqual([
      'kunden',
      'isms',
      'entscheidungen',
      'services',
    ]);
    expect(model.placeEntryPoints.map((p) => p.href)).toEqual([
      `/twin/${TENANT_ID.NORDWERK}`,
      '/isms',
      '/entscheidungen',
      '/services',
    ]);
    expect(model.placeEntryPoints[0].stock).toEqual([
      { label: 'Objekte', count: 34 },
      { label: 'Beziehungen', count: 51 },
    ]);
    expect(stockOf(model, 'isms')).toBe(6);
    expect(stockOf(model, 'entscheidungen')).toBe(3);
    expect(stockOf(model, 'services')).toBe(3);
    expect(model.placeEntryPoints.every((p) => p.isEmpty === false)).toBe(true);
    expect(model.placeEntryPoints[0].href).toBe(tenantDetailHref(TENANT_ID.NORDWERK));
  });

  it('trägt an KEINEM Ebene-3-Einstieg eine aspirative Ortsleitfrage (die Zielseite führt anders)', () => {
    const model = modelOrThrow(TENANT_ID.NORDWERK);
    const [zwilling, isms, entscheidungen, services] = model.placeEntryPoints;

    // KEIN Einstieg wirbt mehr mit der aspirativen Ortsleitfrage (Nachfix nach Gate-Runde 2,
    // DR-0013 Nr. 1). Vorher trugen ISMS und Services `place.question` – aber KEINE Zielseite
    // rendert ihre aspirative Leitfrage als Überschrift: `/isms` führt mit „Wie ist die Risiko-
    // und Control-Lage von <Mandant>?", `/services` mit „Welche Services laufen für <Mandant> …?".
    // Ungerahmt am Einstieg warb die aspirative Frage mit einer fremden Erwartung. Jetzt tragen
    // alle vier Einstiege KEINE Frage (Muster der bereits bereinigten Zwilling/Entscheidungen).
    expect(zwilling.question).toBeUndefined();
    expect(isms.question).toBeUndefined();
    expect(entscheidungen.question).toBeUndefined();
    expect(services.question).toBeUndefined();

    // Gegenprobe: die Ortskonstanten tragen ihre aspirative Frage weiterhin (sie leben im
    // Nav-Modell, werden nur an diesen Einstiegen nicht gerendert – ob der Wortlaut selbst
    // überarbeitet wird, ist Produkt-/Owner-Frage O-WP032-02).
    expect(getPlace('kunden').question).toMatch(/Portfolio/);
    expect(getPlace('isms').question).toMatch(/Warum ist ein Risiko hoch/);
    expect(getPlace('services').question).toMatch(/mit welcher Qualität/);
    expect(getPlace('entscheidungen').question).toMatch(/jetzt erforderlich/);
  });

  it('benennt leere Orte, statt sie zu verstecken (06-D01)', () => {
    const model = modelOrThrow(TENANT_ID.FINOVIA);
    expect(model.placeEntryPoints).toHaveLength(4);
    expect(model.placeEntryPoints.every((p) => p.isEmpty)).toBe(true);
    expect(model.placeEntryPoints.map((p) => p.href)).toEqual([
      `/twin/${TENANT_ID.FINOVIA}`,
      '/isms',
      '/entscheidungen',
      '/services',
    ]);
  });

  it('übernimmt die Bestandsangaben aus den vorhandenen Helfern (keine zweite Zählregel)', () => {
    for (const tenant of DEMO_SEED.tenants) {
      const model = modelOrThrow(tenant.tenant_id);
      const core = buildIsmsCoreView(tenant.tenant_id);
      const erwartet =
        core.risks.length +
        core.scenarios.length +
        core.weaknesses.length +
        core.controls.length +
        core.measures.length +
        core.evidence.length;
      expect(stockOf(model, 'isms')).toBe(erwartet);
      expect(stockOf(model, 'services')).toBe(getManagedServicesForTenant(tenant.tenant_id).length);
      // Der Entscheidungs-Bestand kommt aus dem Register des Ortes selbst, nicht aus einer
      // zweiten Zählung über die Objekttypen (Review-Fix: /heute kannte den Ort gar nicht).
      expect(stockOf(model, 'entscheidungen')).toBe(
        buildDecisionRegister(tenant.tenant_id)?.decisions.length ?? 0,
      );
    }
  });
});

/* -----------------------------------------------------------------------------
 * (1) + Gesamtmodell, Mandantengrenze
 * --------------------------------------------------------------------------- */

describe('buildMissionControl – Bestand, Empty-State und Mandantengrenze', () => {
  it('zeigt den aus dem Seed abgeleiteten Bestand des aktiven Mandanten', () => {
    const nordwerk = modelOrThrow(TENANT_ID.NORDWERK);
    expect(nordwerk.tenantStanding.tenant.display_name).toBe('Nordwerk Manufacturing SE');
    expect(nordwerk.tenantStanding.objectCount).toBe(34);
    expect(nordwerk.tenantStanding.relationshipCount).toBe(51);
    expect(nordwerk.tenantStanding.isEmpty).toBe(false);

    const operator = modelOrThrow(TENANT_ID.CONSULTING_OPERATOR);
    expect(operator.tenantStanding.objectCount).toBe(9);
    expect(operator.tenantStanding.relationshipCount).toBe(11);
    expect(operator.tenantStanding.isEmpty).toBe(false);
  });

  it('liefert für einen bewusst leeren Mandanten ein vollständiges, leeres Modell', () => {
    for (const tenantId of [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
      const model = modelOrThrow(tenantId);
      expect(model.tenantStanding.isEmpty).toBe(true);
      expect(model.tenantStanding.objectCount).toBe(0);
      expect(model.tenantStanding.relationshipCount).toBe(0);
      expect(model.recordingWaves).toEqual([]);
      expect(model.observations).toHaveLength(4);
      expect(model.objectEntryPoints).toEqual([]);
      expect(model.placeEntryPoints).toHaveLength(4);
      expect(model.historyState.hasHistory).toBe(false);
      expect(model.objectEntryRule.length).toBeGreaterThan(0);
    }
  });

  it('liefert für einen unbekannten Mandanten `undefined` (keine Existenzaussage)', () => {
    expect(buildMissionControl('tenant-gibt-es-nicht')).toBeUndefined();
    expect(buildMissionControl('')).toBeUndefined();
  });

  it('NEGATIVBEWEIS: mandantenfremde Objekte und Kanten verändern kein Ergebnis', () => {
    const eigen = [
      fixtureObject({ object_id: 'eigen-1', object_type: 'Control' }),
      fixtureObject({ object_id: 'eigen-2', object_type: 'Organisation' }),
    ];
    const eigeneKanten = [fixtureRelationship({ relationship_id: 'eigen-r1' })];

    const fremd = [
      fixtureObject({
        object_id: 'fremd-1',
        tenant_id: FIXTURE_FOREIGN_TENANT,
        object_type: 'Measure',
        display_name: 'Fremder Mandant – geheimes Objekt',
        record_time: { recorded_at: '2029-09-09T00:00:00.000Z' },
        version: 7,
        scope_ids: [{ scope_id: 'scope-fremd' }],
      }),
    ];
    const fremdeKanten = [
      fixtureRelationship({
        relationship_id: 'fremd-r1',
        tenant_id: FIXTURE_FOREIGN_TENANT,
        relationship_type: 'supersedes',
        record_time: { recorded_at: '2029-09-09T00:00:00.000Z' },
      }),
    ];

    const ohneFremde = buildMissionControlModel(FIXTURE_TENANT_META, eigen, eigeneKanten, NO_STOCK);
    const mitFremden = buildMissionControlModel(
      FIXTURE_TENANT_META,
      [...fremd, ...eigen, ...fremd],
      [...fremdeKanten, ...eigeneKanten],
      NO_STOCK,
    );

    expect(mitFremden).toEqual(ohneFremde);
    // Und die fremden Merkmale schlagen nirgends durch (Welle 2029, Version 7, supersedes).
    const serialisiert = JSON.stringify(mitFremden);
    expect(serialisiert).not.toContain(FIXTURE_FOREIGN_TENANT);
    expect(serialisiert).not.toContain('fremd-1');
    expect(serialisiert).not.toContain('geheimes Objekt');
    expect(mitFremden.historyState.hasHistory).toBe(false);
    expect(mitFremden.recordingWaves).toHaveLength(1);
  });

  it('NEGATIVBEWEIS: kein fremder Mandant, Name oder Objekt im Modell des aktiven Mandanten', () => {
    for (const tenant of DEMO_SEED.tenants) {
      const serialisiert = JSON.stringify(modelOrThrow(tenant.tenant_id));

      for (const fremd of DEMO_SEED.tenants.filter((t) => t.tenant_id !== tenant.tenant_id)) {
        expect(serialisiert).not.toContain(fremd.tenant_id);
        expect(serialisiert).not.toContain(fremd.display_name);
      }
      for (const object of DEMO_SEED.objects.filter((o) => o.tenant_id !== tenant.tenant_id)) {
        expect(serialisiert).not.toContain(object.object_id);
      }
    }
  });

  it('rechnet identisch, ob der Seed vorgefiltert übergeben wird oder nicht (Defense in Depth)', () => {
    for (const tenant of DEMO_SEED.tenants) {
      const model = modelOrThrow(tenant.tenant_id);
      const ausGesamtseed = buildMissionControlModel(
        tenant,
        DEMO_SEED.objects,
        DEMO_SEED.relationships,
        {
          ismsCoreObjectCount: stockOf(model, 'isms'),
          managedServiceCount: stockOf(model, 'services'),
          decisionCount: stockOf(model, 'entscheidungen'),
        },
      );
      expect(ausGesamtseed).toEqual(model);
    }
  });
});

/* -----------------------------------------------------------------------------
 * Wächtertest: keine Bewertung
 * --------------------------------------------------------------------------- */

describe('Wächtertest – gezählt wird, bewertet wird nicht', () => {
  it('trägt je Beobachtung ausschließlich Kennung, Text, Zählung und Grundgesamtheit', () => {
    // Ein zusätzliches Feld (score, severity, rank, due_date, recommendation …) muss auffallen.
    for (const observation of modelOrThrow(TENANT_ID.NORDWERK).observations) {
      expect(Object.keys(observation).sort()).toEqual([
        'count',
        'id',
        'label',
        'method',
        'total',
        'totalLabel',
      ]);
    }
  });

  it('verwendet in Beobachtungs- und Historientexten kein Bewertungsvokabular', () => {
    // Regex statt `includes`: die Prüfung ist ausdrücklich SCHREIBWEISENUNABHÄNGIG („score" klein
    // geschrieben fiel vorher durch) und deckt auch Partizipien ab („empfohlen" matcht weder
    // /empfehl/ noch /Empfehlung/) – Review-Fix.
    const verboten = [
      /\bScore\b/i,
      /Ampel/i,
      /Reifegrad/i,
      /\bTrend/i,
      /Prozent/i,
      /%/,
      /Schwellenwert/i,
      /\bRang\b/i,
      /Priorität/i,
      /\bFrist/i,
      /fällig/i,
      /Empfehlung/i,
      /empfehl/i,
      /empfohlen/i,
      /Handlungsbedarf/i,
      /dringend/i,
      /vorrangig/i,
      /bewertet/i,
      /kritisch/i,
      /Schweregrad/i,
    ];
    for (const tenant of DEMO_SEED.tenants) {
      const model = modelOrThrow(tenant.tenant_id);
      const texte = [
        ...model.observations.flatMap((o) => [o.label, o.totalLabel, o.method]),
        model.historyState.statement,
      ].join('\n');
      for (const muster of verboten) {
        expect(muster.test(texte), `${tenant.tenant_id}: „${muster}"`).toBe(false);
      }
    }
  });

  it('sortiert Wellen chronologisch und Beobachtungen katalogfest – nie nach Häufigkeit', () => {
    const model = modelOrThrow(TENANT_ID.NORDWERK);
    const tage = model.recordingWaves.map((w) => w.recordedOn);
    expect(tage).toEqual([...tage].sort());

    // Die Beobachtungsreihenfolge ist unabhängig von den Zählwerten (hier absteigend 40, 22, 3, 2
    // – die Katalogreihenfolge bleibt davon unberührt).
    expect(model.observations.map((o) => o.id)).toEqual([
      'ohne_owner',
      'scope_ohne_objekt',
      'kante_ohne_vertrauensgrad',
      'ohne_nachweisbezug',
    ]);
  });
});
