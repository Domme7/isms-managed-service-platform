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

import { OBJECT_FAMILY_ID } from '@isms/contracts';
import { DEMO_SEED, TENANT_ID, type DemoTenant } from '@isms/demo-seed';

import { buildIsmsCoreView } from '../../isms/data';
import { getManagedServicesForTenant } from '../../services/data';
import { familyForType } from '../../twin/data';
import { objectDetailHref } from '../../twin/routes';
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

const NO_STOCK: TenantStock = { ismsCoreObjectCount: 0, managedServiceCount: 0 };

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
    expect(waves).toHaveLength(2);

    expect(waves.map((w) => w.dateDisplay)).toEqual(['15.01.2026', '16.02.2026']);
    expect(waves[0]).toMatchObject({
      recordedOn: '2026-01-15',
      recordedAt: '2026-01-15T08:00:00.000Z',
      objectCount: 17,
      relationshipCount: 15,
    });
    expect(waves[1]).toMatchObject({
      recordedOn: '2026-02-16',
      recordedAt: '2026-02-16T08:00:00.000Z',
      objectCount: 14,
      relationshipCount: 28,
    });

    // Jede Welle ist vollständig verbucht – keine Kante und kein Objekt fällt heraus.
    expect(waves.reduce((sum, w) => sum + w.objectCount, 0)).toBe(objects.length);
    expect(waves.reduce((sum, w) => sum + w.relationshipCount, 0)).toBe(relationships.length);
  });

  it('leitet für den Consulting Operator GENAU EINE Welle ab (Gegenprobe zu „zwei Wellen")', () => {
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

  it('leitet „keine Historie" aus Version, replaced_at und supersedes-Kanten ab', () => {
    // Gegenprobe an den Rohdaten: sobald sich der Seed ändert, muss dieser Test fehlschlagen.
    expect(objectsOf(TENANT_ID.NORDWERK).every((o) => o.version === 1)).toBe(true);
    expect(objectsOf(TENANT_ID.NORDWERK).every((o) => !o.record_time.replaced_at)).toBe(true);
    expect(
      relationshipsOf(TENANT_ID.NORDWERK).some((r) => r.relationship_type === 'supersedes'),
    ).toBe(false);

    expect(seedState.hasHistory).toBe(false);
    expect(seedState.maxVersion).toBe(1);
    expect(seedState.objectsWithPreviousVersion).toBe(0);
    expect(seedState.objectsWithReplacementRecord).toBe(0);
    expect(seedState.supersedesEdgeCount).toBe(0);
    expect(seedState.statement).toContain('nicht erfasst');
    // Die Zahl im Satz stammt aus den Daten, nicht aus dem Text.
    expect(seedState.statement).toContain(`alle ${objectsOf(TENANT_ID.NORDWERK).length} Objekte`);
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
    expect(state.statement).not.toBe(seedState.statement);
    expect(state.statement).toContain('supersedes');
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

    expect(byId.get('ohne_owner')).toMatchObject({ count: 22, total: 31 });
    expect(byId.get('scope_ohne_objekt')).toMatchObject({ count: 2, total: 2 });
    expect(byId.get('kante_ohne_vertrauensgrad')).toMatchObject({ count: 32, total: 43 });
    expect(byId.get('ohne_nachweisbezug')).toMatchObject({ count: 1, total: 2 });

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

    expect(entries.map((e) => e.familyId)).toEqual(['F01', 'F02', 'F03', 'F06', 'F07', 'F08', 'F09']);
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

  it('nennt die drei belegten Orte mit dem Bestand des aktiven Mandanten', () => {
    const model = modelOrThrow(TENANT_ID.NORDWERK);
    expect(model.placeEntryPoints.map((p) => p.placeId)).toEqual(['kunden', 'isms', 'services']);
    expect(model.placeEntryPoints.map((p) => p.href)).toEqual([
      `/twin/${TENANT_ID.NORDWERK}`,
      '/isms',
      '/services',
    ]);
    expect(model.placeEntryPoints[0].stock).toEqual([
      { label: 'Objekte', count: 31 },
      { label: 'Beziehungen', count: 43 },
    ]);
    expect(model.placeEntryPoints[1].stock[0].count).toBe(6);
    expect(model.placeEntryPoints[2].stock[0].count).toBe(3);
    expect(model.placeEntryPoints.every((p) => p.isEmpty === false)).toBe(true);
  });

  it('benennt leere Orte, statt sie zu verstecken (06-D01)', () => {
    const model = modelOrThrow(TENANT_ID.FINOVIA);
    expect(model.placeEntryPoints).toHaveLength(3);
    expect(model.placeEntryPoints.every((p) => p.isEmpty)).toBe(true);
    expect(model.placeEntryPoints.map((p) => p.href)).toEqual([
      `/twin/${TENANT_ID.FINOVIA}`,
      '/isms',
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
      expect(model.placeEntryPoints[1].stock[0].count).toBe(erwartet);
      expect(model.placeEntryPoints[2].stock[0].count).toBe(
        getManagedServicesForTenant(tenant.tenant_id).length,
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
    expect(nordwerk.tenantStanding.objectCount).toBe(31);
    expect(nordwerk.tenantStanding.relationshipCount).toBe(43);
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
      expect(model.placeEntryPoints).toHaveLength(3);
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

    const ohneFremde = buildMissionControlModel(
      FIXTURE_TENANT_META,
      eigen,
      eigeneKanten,
      NO_STOCK,
    );
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
          ismsCoreObjectCount: model.placeEntryPoints[1].stock[0].count,
          managedServiceCount: model.placeEntryPoints[2].stock[0].count,
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
    const verboten = [
      'Score',
      'Ampel',
      'Reifegrad',
      'Trend',
      'Prozent',
      '%',
      'Schwellenwert',
      'Rang',
      'Priorität',
      'Frist',
      'fällig',
      'Empfehlung',
      'empfehlen',
      'kritisch',
      'Schweregrad',
    ];
    for (const tenant of DEMO_SEED.tenants) {
      const model = modelOrThrow(tenant.tenant_id);
      const texte = [
        ...model.observations.flatMap((o) => [o.label, o.totalLabel, o.method]),
        model.historyState.statement,
      ].join('\n');
      for (const wort of verboten) {
        expect(texte).not.toContain(wort);
      }
    }
  });

  it('sortiert Wellen chronologisch und Beobachtungen katalogfest – nie nach Häufigkeit', () => {
    const model = modelOrThrow(TENANT_ID.NORDWERK);
    const tage = model.recordingWaves.map((w) => w.recordedOn);
    expect(tage).toEqual([...tage].sort());

    // Die Beobachtungsreihenfolge ist unabhängig von den Zählwerten (hier absteigend 32, 22, 2, 1
    // – die Katalogreihenfolge bleibt davon unberührt).
    expect(model.observations.map((o) => o.id)).toEqual([
      'ohne_owner',
      'scope_ohne_objekt',
      'kante_ohne_vertrauensgrad',
      'ohne_nachweisbezug',
    ]);
  });
});
