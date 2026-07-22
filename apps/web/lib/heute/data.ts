/**
 * View-Daten des Ortes „Heute" – Mission Control, read-only (WP-016 Slice 1).
 *
 * Reine, deterministische Ableitung aus `@isms/demo-seed` für GENAU EINEN Mandanten. Es wird
 * ausschließlich gerendert, was als Feld oder Kante im Seed steht; Lücken werden benannt statt
 * gefüllt (Dok. 07 §21 „Datenlücken werden nicht still verborgen", Dok. 06 §17 *Partial data*).
 * Diese Helfer sind bewusst frei von React/Next, damit sie deterministisch testbar sind
 * (Muster aus `lib/twin/data.ts`, `lib/isms/data.ts`, `lib/services/data.ts`).
 *
 * VERBINDLICHE GRENZEN (WP-016 Nicht-Ziele; Dok. 09 und Dok. 10 §10/§11/§14/§15/§18 sind
 * spätere Work Packages, Queue-Eintrag WP-008):
 *   KEINE Morning Mission, KEIN „Warum heute", KEIN Impact, KEINE empfohlene Reihenfolge,
 *   KEIN Veränderungsfeed, KEIN Delta, KEIN Trend, KEIN Score, KEIN Reifegrad, KEINE Ampel,
 *   KEIN Prozentwert, KEIN Schwellenwert, KEIN Prioritätsrang, KEINE Frist, KEINE Empfehlung,
 *   KEIN Serviceangebot (Dok. 13 MS15). Gezählt wird – bewertet wird nicht. Nichts in diesem
 *   Modul sortiert nach „Schwere"; Reihenfolgen sind Seed-, Kalender- oder Katalogreihenfolge.
 *
 * ERFASSUNG IST KEINE VERÄNDERUNG (Dok. 07 §11/D07): `record_time.recorded_at` ist die
 * Systemachse, `valid_time` die fachliche Achse. Aus einem Erfassungszeitpunkt wird hier
 * niemals ein „neu", „geändert" oder „seit Ihrem letzten Besuch" gemacht. Die Session-Simulation
 * speichert ohnehin nur Rolle und Mandant (WP-011) – ein „letzter Besuch" existiert nicht.
 *
 * MANDANTENTRENNUNG (Sicherheitsgrenze, Dok. 07 §17/P09): jede Ableitung arbeitet strikt
 * innerhalb EINES Mandanten. `buildMissionControlModel` filtert die übergebenen OBJEKT- und
 * KANTENLISTEN zusätzlich selbst auf `tenant_id` (Defense in Depth) – mandantenfremde Objekte
 * und Kanten verändern das Ergebnis deshalb auch dann nicht, wenn ein Aufrufer eine ungefilterte
 * Liste übergibt. Der vierte Parameter `stock` ist dagegen eine bereits MANDANTENGEBUNDENE
 * Vorberechnung des Aufrufers (`buildIsmsCoreView`, `getManagedServicesForTenant`) und wird nicht
 * erneut geprüft; er trägt Zahlen, keine Objekte oder Kennungen.
 *
 * // OFFENE FRAGE O-WP016-07: Der Objektvertrag (Dok. 07 §7) kennt kein Feld, das eine
 * // Erfassungswelle fachlich BENENNT („ISMS-Kerngraph", „Managed-Service-Schicht" sind Fakten
 * // der Seed-Quelldateien, keine Envelope-Daten). Als fachliche Zuordnung einer Welle werden
 * // deshalb die belegten Scope-Kennungen (`scope_ids`) der in ihr erfassten Objekte
 * // ausgewiesen – abgeleitet statt beschriftet. Im Demo-Seed ist die Zuordnung bewusst nicht
 * // trennscharf: die zweite Nordwerk-Welle trägt Objekte beider Scopes. Ein Wellenname wird
 * // NICHT erfunden.
 */

import type { ObjectEnvelope, ObjectFamilyId, RelationshipEnvelope } from '@isms/contracts';
import type { DemoTenant } from '@isms/demo-seed';

import { buildIsmsCoreView } from '../isms/data';
import { getManagedServicesForTenant } from '../services/data';
import { getPlace, type PlaceId } from '../shell/places';
import {
  getObjectsForTenant,
  getRelationshipsForTenant,
  getTenant,
  groupObjectsByFamily,
  objectTypeDisplay,
} from '../twin/data';
import { EVIDENCE_TARGET_TYPES } from '../twin/object-detail';
import { formatIsoDateDe, objectDetailHref, tenantDetailHref } from '../twin/routes';

/* -----------------------------------------------------------------------------
 * (1) Wo stehe ich? – Bestand des aktiven Mandanten
 * --------------------------------------------------------------------------- */

export interface TenantStanding {
  readonly tenant: DemoTenant;
  /** Anzahl Objekte dieses Mandanten – aus dem Seed gezählt, nie hartkodiert. */
  readonly objectCount: number;
  /** Anzahl Beziehungen dieses Mandanten – aus dem Seed gezählt, nie hartkodiert. */
  readonly relationshipCount: number;
  /** `true`, wenn dieser Mandant weder Objekte noch Beziehungen trägt (ehrlicher Empty-State). */
  readonly isEmpty: boolean;
}

/* -----------------------------------------------------------------------------
 * (2) Was ist erfasst worden? – Erfassungswellen aus record_time
 * --------------------------------------------------------------------------- */

/**
 * Eine belegte Erfassungswelle: ein Kalendertag der SYSTEMACHSE (`record_time.recorded_at`) mit
 * der Anzahl der an diesem Tag erfassten Objekte und Kanten. Kein Ereignis, keine Änderung,
 * keine Historie – nur der Zeitpunkt, zu dem der Datensatz ins System kam.
 */
export interface RecordingWave {
  /**
   * Kalendertag der Erfassung als ISO-Datum („2026-01-15") – Sortier- und Gruppierschlüssel und
   * zugleich der maschinenlesbare Wert für `<time dateTime=…>`.
   *
   * Bewusst OHNE Uhrzeit: eine Welle ist eine Tagesgruppe. Der vollständige Zeitstempel eines
   * einzelnen Datensatzes wäre eine Uhrzeit, die für die Gruppe niemand belegt hat (Review-Fix);
   * ein reines Datum ist ein gültiger `time`-Wert und deckt sich exakt mit `dateDisplay`.
   */
  readonly recordedOn: string;
  /** Deutsches Datum über `formatIsoDateDe` („15.01.2026"). */
  readonly dateDisplay: string;
  readonly objectCount: number;
  readonly relationshipCount: number;
  /**
   * Fachliche Zuordnung, ABGELEITET: die verschiedenen Scope-Kennungen der in dieser Welle
   * erfassten Objekte (Dok. 07 §7 `scope_ids`), in Reihenfolge des ersten Auftretens.
   * Leer, wenn die Welle nur Kanten enthält oder kein Objekt eine Scope-Zuordnung trägt.
   * Siehe OFFENE FRAGE O-WP016-07.
   */
  readonly scopeIds: readonly string[];
}

/**
 * Gruppiert Objekte UND Kanten nach dem Kalendertag ihrer Systemerfassung.
 * Sortierung: Kalendertag aufsteigend (ISO-Datumsstrings sind lexikografisch sortierbar) –
 * eine Zeitachse, ausdrücklich KEINE Rangfolge.
 *
 * Reine Funktion über `(objects, relationships)`: dieselbe Ableitung lässt sich damit gegen den
 * echten Seed UND gegen synthetische Fixtures prüfen. Die Anzahl der Wellen wird nirgends
 * angenommen – sie entsteht ausschließlich aus den Daten.
 */
export function deriveRecordingWaves(
  objects: readonly ObjectEnvelope[],
  relationships: readonly RelationshipEnvelope[],
): RecordingWave[] {
  interface Bucket {
    objectCount: number;
    relationshipCount: number;
    scopeIds: string[];
  }
  const buckets = new Map<string, Bucket>();

  const bucketFor = (recordedAt: string): Bucket => {
    const day = calendarDay(recordedAt);
    const existing = buckets.get(day);
    if (existing) return existing;
    const created: Bucket = { objectCount: 0, relationshipCount: 0, scopeIds: [] };
    buckets.set(day, created);
    return created;
  };

  for (const object of objects) {
    const bucket = bucketFor(object.record_time.recorded_at);
    bucket.objectCount += 1;
    for (const scope of object.scope_ids) {
      if (!bucket.scopeIds.includes(scope.scope_id)) bucket.scopeIds.push(scope.scope_id);
    }
  }
  for (const relationship of relationships) {
    bucketFor(relationship.record_time.recorded_at).relationshipCount += 1;
  }

  return [...buckets.entries()]
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([recordedOn, bucket]) => ({
      recordedOn,
      dateDisplay: formatIsoDateDe(recordedOn),
      objectCount: bucket.objectCount,
      relationshipCount: bucket.relationshipCount,
      scopeIds: bucket.scopeIds,
    }));
}

/** Kalendertag eines ISO-Zeitstempels; unlesbare Werte werden fail-loud roh durchgereicht. */
function calendarDay(iso: string): string {
  return /^\d{4}-\d{2}-\d{2}/.test(iso) ? iso.slice(0, 10) : iso;
}

/* -----------------------------------------------------------------------------
 * (2b) Historienlage – abgeleitet, nicht konstant
 * --------------------------------------------------------------------------- */

/**
 * Aussage zur Versionshistorie des Mandanten, AUS DEN DATEN abgeleitet – gleiches Muster wie
 * `ObjectHistoryState` in `lib/twin/object-detail.ts`, nur über den ganzen Mandanten. Eine
 * Historie gilt genau dann als belegt, wenn mindestens ein Objekt `version > 1` oder ein
 * `record_time.replaced_at` trägt oder mindestens eine `supersedes`-Kante (Dok. 07 §9 R24)
 * existiert. Trifft nichts davon zu, ist das eine echte Datenlücke – und wird als solche
 * ausgegeben, statt einen Verlauf zu konstruieren.
 */
export interface HistoryState {
  /** Höchste im Mandanten belegte Objektversion; 0, wenn der Mandant keine Objekte trägt. */
  readonly maxVersion: number;
  readonly objectsWithPreviousVersion: number;
  readonly objectsWithReplacementRecord: number;
  readonly supersedesEdgeCount: number;
  readonly hasHistory: boolean;
  /** Klartextaussage, vollständig aus den obigen Zählungen gebildet (kein konstanter Text). */
  readonly statement: string;
}

export function deriveHistoryState(
  objects: readonly ObjectEnvelope[],
  relationships: readonly RelationshipEnvelope[],
): HistoryState {
  const maxVersion = objects.reduce((max, o) => (o.version > max ? o.version : max), 0);
  const objectsWithPreviousVersion = objects.filter((o) => o.version > 1).length;
  const objectsWithReplacementRecord = objects.filter((o) =>
    Boolean(o.record_time.replaced_at),
  ).length;
  const supersedesEdgeCount = relationships.filter(
    (r) => r.relationship_type === 'supersedes',
  ).length;
  const hasHistory =
    objectsWithPreviousVersion > 0 || objectsWithReplacementRecord > 0 || supersedesEdgeCount > 0;

  return {
    maxVersion,
    objectsWithPreviousVersion,
    objectsWithReplacementRecord,
    supersedesEdgeCount,
    hasHistory,
    statement: historyStatement({
      objectCount: objects.length,
      maxVersion,
      objectsWithPreviousVersion,
      objectsWithReplacementRecord,
      supersedesEdgeCount,
      hasHistory,
    }),
  };
}

function historyStatement(facts: {
  objectCount: number;
  maxVersion: number;
  objectsWithPreviousVersion: number;
  objectsWithReplacementRecord: number;
  supersedesEdgeCount: number;
  hasHistory: boolean;
}): string {
  if (facts.objectCount === 0) {
    return (
      'Dieser Mandant trägt im Datenbestand keine Objekte. Damit ist auch keine Versionshistorie ' +
      'erfasst – es gibt nichts, dessen Verlauf gezeigt werden könnte.'
    );
  }
  if (!facts.hasHistory) {
    return (
      `Eine Versionshistorie ist im Datenbestand nicht erfasst: alle ${facts.objectCount} Objekte ` +
      `tragen Version ${facts.maxVersion}, kein Objekt trägt einen Ersetzungszeitpunkt ` +
      '(record_time.replaced_at), und es gibt keine „supersedes"-Beziehung (Dok. 07 §9 R24). ' +
      'Ein Erfassungszeitpunkt ist deshalb keine Änderung und kein Verlauf.'
    );
  }
  const belege: string[] = [];
  if (facts.objectsWithPreviousVersion > 0) {
    belege.push(
      `${facts.objectsWithPreviousVersion} Objekte tragen eine Version größer 1 ` +
        `(höchste belegte Version: ${facts.maxVersion})`,
    );
  }
  if (facts.objectsWithReplacementRecord > 0) {
    belege.push(
      `${facts.objectsWithReplacementRecord} Objekte tragen einen Ersetzungszeitpunkt ` +
        '(record_time.replaced_at)',
    );
  }
  if (facts.supersedesEdgeCount > 0) {
    belege.push(
      `${facts.supersedesEdgeCount} „supersedes"-Beziehungen sind erfasst (Dok. 07 §9 R24)`,
    );
  }
  return `Eine Versionshistorie ist im Datenbestand belegt: ${belege.join('; ')}.`;
}

/* -----------------------------------------------------------------------------
 * (3) Was weiß ich über die Datenlage? – gezählte, unbewertete Beobachtungen
 * --------------------------------------------------------------------------- */

export type ObservationId =
  | 'ohne_owner'
  | 'scope_ohne_objekt'
  | 'kante_ohne_vertrauensgrad'
  | 'ohne_nachweisbezug';

/**
 * Eine Beobachtung über den Datenbestand: WAS gezählt wurde (`label`), WIE VIELE (`count`),
 * WOVON (`total` + `totalLabel`) und NACH WELCHER REGEL (`method`, Klartext).
 *
 * Bewusst ohne Bewertung: keine Ampel, kein Score, kein Schwellenwert, kein Prozentwert, kein
 * Rang und keine Empfehlung. `count === 0` wird ausgewiesen, nicht unterdrückt – eine leere
 * Beobachtung ist selbst eine Aussage über die Datenlage.
 */
export interface DataObservation {
  readonly id: ObservationId;
  readonly label: string;
  readonly count: number;
  readonly total: number;
  readonly totalLabel: string;
  readonly method: string;
}

/** Verbindet Bezeichnungen deutsch: „A", „A und B", „A, B und C" (Muster `TenantDetailView`). */
function joinDe(items: readonly string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  return `${items.slice(0, -1).join(', ')} und ${items[items.length - 1]}`;
}

/**
 * Sichtbare Aufzählung der laut Dok. 07 §9 R15 nachweisfähigen Objekttypen – ERZEUGT aus
 * `EVIDENCE_TARGET_TYPES` statt ausgeschrieben. Ändert sich die Konstante, ändert sich der Text
 * mit (Review-Fix: vorher stand „Control, Measure und Decision Record" als Literal im Satz und
 * wäre bei einer Änderung still falsch geworden).
 */
const NACHWEISFAEHIGE_TYPEN = joinDe(EVIDENCE_TARGET_TYPES);

/**
 * Die vier belegbaren Beobachtungen. Reihenfolge = feste Katalogreihenfolge dieser Liste,
 * ausdrücklich KEINE Sortierung nach Schwere oder Häufigkeit.
 *
 * // Beobachtung (b) benennt die bekannte Lücke O-WP014-03 (Scopes sind im Demo-Seed nicht als
 * // eigene Objekte materialisiert). Die interne Findings-ID steht bewusst NUR HIER im Kommentar
 * // und nicht im Nutzertext: im Produkt wird die Sache benannt, nicht die Fundstelle
 * // (Review-Fix; Konzeptverweise wie „Dok. 07 §9 R15" bleiben dagegen sichtbar, weil sie die
 * // Herkunft der Regel belegen).
 */
export function deriveObservations(
  objects: readonly ObjectEnvelope[],
  relationships: readonly RelationshipEnvelope[],
): DataObservation[] {
  // (a) Objekte mit leerem `owner_ids` (Dok. 07 §7: fachlicher/technischer Owner).
  const ohneOwner = objects.filter((o) => o.owner_ids.length === 0).length;

  // (b) Verschiedene Scope-Kennungen aus `scope_ids`, zu denen kein gleichnamiges Objekt
  //     existiert (bekannte Lücke O-WP014-03: Scopes sind im Seed nicht materialisiert).
  const objectIds = new Set(objects.map((o) => o.object_id));
  const scopeIds = new Set<string>();
  for (const object of objects) {
    for (const scope of object.scope_ids) scopeIds.add(scope.scope_id);
  }
  const scopeOhneObjekt = [...scopeIds].filter((id) => !objectIds.has(id)).length;

  // (c) Kanten ohne erfassten Vertrauensgrad (Dok. 07 §9: „Vertrauensgrad", Skala offen).
  const ohneVertrauensgrad = relationships.filter((r) => typeof r.confidence !== 'number').length;

  // (d) Objekte, die laut Dok. 07 §9 R15 Ziel einer `evidences`-Kante sein können
  //     (EVIDENCE_TARGET_TYPES aus `lib/twin/object-detail.ts`), auf die keine solche Kante
  //     zeigt. Für andere Objekttypen wäre „kein Nachweis" eine erfundene Erwartung.
  const evidenceTargetTypes: readonly string[] = EVIDENCE_TARGET_TYPES;
  const nachweisfaehige = objects.filter((o) => evidenceTargetTypes.includes(o.object_type));
  const belegteZiele = new Set(
    relationships.filter((r) => r.relationship_type === 'evidences').map((r) => r.target_id),
  );
  const ohneNachweis = nachweisfaehige.filter((o) => !belegteZiele.has(o.object_id)).length;

  return [
    {
      id: 'ohne_owner',
      label: 'Objekte ohne erfassten Owner',
      count: ohneOwner,
      total: objects.length,
      // Dativ: die Labels erscheinen ausschließlich in der Form „<count> von <total> <label>".
      totalLabel: 'Objekten dieses Mandanten',
      method:
        'Gezählt werden Objekte dieses Mandanten, deren Feld „owner_ids" leer ist (Dok. 07 §7). ' +
        'Ob ein Owner fachlich erforderlich ist, sagt der Datenbestand nicht – hier steht nur, ' +
        'ob einer erfasst ist.',
    },
    {
      id: 'scope_ohne_objekt',
      label: 'Scope-Kennungen ohne eigenes Objekt',
      count: scopeOhneObjekt,
      total: scopeIds.size,
      totalLabel: 'verschiedenen Scope-Kennungen dieses Mandanten',
      method:
        'Gezählt werden die verschiedenen Kennungen aus „scope_ids" aller Objekte dieses ' +
        'Mandanten, zu denen es im Datenbestand kein Objekt mit derselben Kennung gibt. ' +
        'Scopes sind im Demo-Datenbestand nicht als eigene Objekte angelegt; die Zuordnung ' +
        'bleibt deshalb als rohe Kennung sichtbar.',
    },
    {
      id: 'kante_ohne_vertrauensgrad',
      label: 'Beziehungen ohne erfassten Vertrauensgrad',
      count: ohneVertrauensgrad,
      total: relationships.length,
      totalLabel: 'Beziehungen dieses Mandanten',
      method:
        'Gezählt werden Beziehungen dieses Mandanten ohne Wert im Feld „confidence" ' +
        '(Dok. 07 §9). Ein fehlender Vertrauensgrad wird nicht ersetzt und nicht geschätzt. ' +
        'Ob für eine Beziehung fachlich ein Vertrauensgrad erforderlich ist, sagt der ' +
        'Datenbestand nicht – hier steht nur, ob einer erfasst ist.',
    },
    {
      id: 'ohne_nachweisbezug',
      label: 'Nachweisfähige Objekte ohne eingehende Nachweis-Beziehung',
      count: ohneNachweis,
      total: nachweisfaehige.length,
      totalLabel: `Objekten der Typen ${NACHWEISFAEHIGE_TYPEN}`,
      method:
        `Gezählt werden Objekte der Typen ${NACHWEISFAEHIGE_TYPEN} – laut ` +
        'Dok. 07 §9 R15 die möglichen Ziele einer „evidences"-Beziehung –, auf die im ' +
        'Datenbestand keine solche Beziehung zeigt. Andere Objekttypen bleiben außen vor, ' +
        'weil für sie kein Nachweisbezug vorgesehen ist. Ob für ein Objekt fachlich ein ' +
        'Nachweis erforderlich ist, sagt der Datenbestand nicht – hier steht nur, ob eine ' +
        'Nachweis-Beziehung erfasst ist.',
    },
  ];
}

/* -----------------------------------------------------------------------------
 * (4) Wo steige ich ein? – belegte Orte und je Objektfamilie ein Einstieg
 * --------------------------------------------------------------------------- */

/** Eine Bestandsangabe an einem Einstieg (rein zählend, ohne Wertung). */
export interface EntryStockItem {
  readonly label: string;
  readonly count: number;
}

/** Einstieg in einen der belegten Orte (Dok. 06 §4/06-D01 – Orte bleiben stabil). */
export interface PlaceEntryPoint {
  readonly placeId: PlaceId;
  readonly label: string;
  readonly href: string;
  /**
   * Leitfrage des Ortes, gelesen aus `lib/shell/places.ts` (Dok. 06 §7). Optional: sie entfällt,
   * wenn der Einstieg nicht auf den Ort selbst, sondern auf eine engere Zielseite führt und die
   * Leitfrage des Ortes dort nicht beantwortet wird (siehe Einstieg „Zwilling dieses Mandanten").
   */
  readonly question?: string;
  readonly stock: readonly EntryStockItem[];
  /** `true`, wenn alle Bestandsangaben 0 sind – der Ort wird trotzdem BENANNT, nicht versteckt. */
  readonly isEmpty: boolean;
}

/** Ein Objekt-Einstieg je belegter Objektfamilie (Objekt-360-Seite des aktiven Mandanten). */
export interface ObjectEntryPoint {
  readonly familyId: ObjectFamilyId;
  readonly familyName: string;
  readonly familyLeitfrage: string;
  readonly objectId: string;
  readonly name: string;
  /** Objekttyp für die Anzeige („Risiko (Risk)"), aus `lib/twin/data.ts`. */
  readonly objectTypeDisplay: string;
  /** Anzahl Objekte dieser Familie im Mandanten – Kontext zur Auswahlregel, keine Wertung. */
  readonly familyObjectCount: number;
  /** Route der Objekt-360-Seite – IMMER über `objectDetailHref` mit dem aktiven Mandanten. */
  readonly href: string;
}

/**
 * Auswahlregel der Objekt-Einstiege, im Produkt sichtbar an der Liste: je Objektfamilie das
 * ERSTE Objekt in Datenbestandsreihenfolge, Familien in kanonischer Reihenfolge F01–F09.
 * Das ist ausdrücklich KEINE Priorisierung und keine Auswahl nach Wichtigkeit – die
 * vollständige Objektliste bleibt der Zwilling.
 */
export const OBJECT_ENTRY_RULE =
  'Gezeigt wird je Objektfamilie das erste Objekt in der Reihenfolge des Datenbestands, ' +
  'Familien in der kanonischen Reihenfolge F01–F09. Das ist eine feste Reihenfolge und keine ' +
  'Priorisierung: Es wird nichts bewertet, gewichtet oder empfohlen. Die vollständige ' +
  'Objektliste steht im Zwilling des Mandanten.';

/**
 * Bestandsangaben, die dieses Modul nicht selbst zählen darf, ohne die vorhandene Fachlogik zu
 * duplizieren: die ISMS-Kernsicht (`buildIsmsCoreView`) und die Managed Services
 * (`getManagedServicesForTenant`) sind bereits definiert. `buildMissionControl` ermittelt beide
 * und reicht sie in die reinen Funktionen hinein – so bleiben diese fixture-testbar.
 */
export interface TenantStock {
  readonly ismsCoreObjectCount: number;
  readonly managedServiceCount: number;
}

export function deriveObjectEntryPoints(
  tenantId: string,
  objects: readonly ObjectEnvelope[],
): ObjectEntryPoint[] {
  return groupObjectsByFamily(objects).map((group) => {
    // `groupObjectsByFamily` liefert ausschließlich Familien mit mindestens einem Objekt.
    const first = group.objects[0];
    return {
      familyId: group.id,
      familyName: group.name,
      familyLeitfrage: group.leitfrage,
      objectId: first.object_id,
      name: first.display_name,
      objectTypeDisplay: objectTypeDisplay(first.object_type),
      familyObjectCount: group.objects.length,
      // Mandantentreu: der Link trägt immer den aktiven Mandanten (Dok. 07 §17/P09).
      href: objectDetailHref(tenantId, first.object_id),
    };
  });
}

export function derivePlaceEntryPoints(
  tenantId: string,
  objects: readonly ObjectEnvelope[],
  relationships: readonly RelationshipEnvelope[],
  stock: TenantStock,
): PlaceEntryPoint[] {
  const isms = getPlace('isms');
  const services = getPlace('services');

  const entries: PlaceEntryPoint[] = [
    {
      placeId: getPlace('kunden').id,
      // Abweichend vom Navigationslabel „Kunden": dieser Einstieg führt NICHT ins Portfolio,
      // sondern in den Customer Workspace GENAU DIESES Mandanten (Dok. 06 §4, Hinweis „Für
      // Kundenrollen ggf. direkt der eigene Workspace"). Der Ort selbst bleibt „kunden".
      //
      // Die Leitfrage des Ortes („Wessen digitalen Zwilling und Portfolio sehe ich …") bleibt
      // deshalb WEG: eine Portfolio-Sicht ist auf „Heute" Nicht-Ziel, und die Zielseite dieses
      // Links beantwortet sie nicht (Review-Fix). Label und Bestandsangabe sagen bereits, was
      // dort steht; für /isms und /services bleibt die Leitfrage des Ortes unverändert.
      label: 'Zwilling dieses Mandanten',
      href: tenantDetailHref(tenantId),
      stock: [
        { label: 'Objekte', count: objects.length },
        { label: 'Beziehungen', count: relationships.length },
      ],
    },
    {
      placeId: isms.id,
      label: isms.label,
      href: isms.href,
      question: isms.question,
      stock: [
        {
          label: 'ISMS-Kernobjekte (Risiken, Szenarien, Schwachstellen, Controls, Maßnahmen, Nachweise)',
          count: stock.ismsCoreObjectCount,
        },
      ],
    },
    {
      placeId: services.id,
      label: services.label,
      href: services.href,
      question: services.question,
      stock: [{ label: 'Managed Services', count: stock.managedServiceCount }],
    },
  ].map((entry) => ({ ...entry, isEmpty: entry.stock.every((item) => item.count === 0) }));

  return entries;
}

/* -----------------------------------------------------------------------------
 * Aggregiertes View-Modell des Ortes „Heute"
 * --------------------------------------------------------------------------- */

export interface MissionControlModel {
  readonly tenantStanding: TenantStanding;
  readonly recordingWaves: readonly RecordingWave[];
  readonly historyState: HistoryState;
  readonly observations: readonly DataObservation[];
  readonly placeEntryPoints: readonly PlaceEntryPoint[];
  readonly objectEntryPoints: readonly ObjectEntryPoint[];
  /** Sichtbare Auswahlregel der Objekt-Einstiege (siehe `OBJECT_ENTRY_RULE`). */
  readonly objectEntryRule: string;
}

/**
 * Baut das vollständige Modell aus übergebenen Listen – die REINE Kernfunktion.
 *
 * Filtert die OBJEKT- und KANTENLISTEN zusätzlich selbst auf `tenant.tenant_id`: die
 * Mandantengrenze ist eine Sicherheitsgrenze und darf nicht davon abhängen, dass der Aufrufer
 * bereits richtig gefiltert hat (Dok. 07 §17/P09). Fremde Objekte und Kanten verändern deshalb
 * kein Ergebnis.
 *
 * `stock` ist davon ausgenommen und wird ungeprüft übernommen: es ist eine bereits
 * mandantengebundene Vorberechnung des Aufrufers (zwei Zahlen, keine Objekte und keine
 * Kennungen). Wer hier fremde Zahlen hineingibt, sieht fremde Zahlen – das ist eine Aussage über
 * diese Signatur, keine stille Zusicherung (Review-Fix; vorher behauptete der Kommentar mehr
 * Isolation, als der Code leistet).
 */
export function buildMissionControlModel(
  tenant: DemoTenant,
  objects: readonly ObjectEnvelope[],
  relationships: readonly RelationshipEnvelope[],
  stock: TenantStock,
): MissionControlModel {
  const tenantId = tenant.tenant_id;
  const ownObjects = objects.filter((o) => o.tenant_id === tenantId);
  const ownRelationships = relationships.filter((r) => r.tenant_id === tenantId);

  return {
    tenantStanding: {
      tenant,
      objectCount: ownObjects.length,
      relationshipCount: ownRelationships.length,
      isEmpty: ownObjects.length === 0 && ownRelationships.length === 0,
    },
    recordingWaves: deriveRecordingWaves(ownObjects, ownRelationships),
    historyState: deriveHistoryState(ownObjects, ownRelationships),
    observations: deriveObservations(ownObjects, ownRelationships),
    placeEntryPoints: derivePlaceEntryPoints(tenantId, ownObjects, ownRelationships, stock),
    objectEntryPoints: deriveObjectEntryPoints(tenantId, ownObjects),
    objectEntryRule: OBJECT_ENTRY_RULE,
  };
}

/**
 * Dünne Seed-Anbindung: holt Mandant, Objekte, Kanten und die beiden vorhandenen
 * Bestandsangaben und übergibt sie an die reine Kernfunktion.
 *
 * Liefert `undefined` bei unbekanntem Mandanten – identisch zum Muster in
 * `lib/twin/object-detail.ts` (keine Existenzaussage über fremde Mandanten). Ein bekannter,
 * aber leerer Mandant (Finovia, MediCore) liefert dagegen ein vollständiges, wohldefiniertes
 * Modell mit Nullwerten: der Empty-State ist eine Aussage, kein Fehler.
 */
export function buildMissionControl(tenantId: string): MissionControlModel | undefined {
  const tenant = getTenant(tenantId);
  if (!tenant) return undefined;

  const ismsCore = buildIsmsCoreView(tenantId);
  const stock: TenantStock = {
    ismsCoreObjectCount:
      ismsCore.risks.length +
      ismsCore.scenarios.length +
      ismsCore.weaknesses.length +
      ismsCore.controls.length +
      ismsCore.measures.length +
      ismsCore.evidence.length,
    managedServiceCount: getManagedServicesForTenant(tenantId).length,
  };

  return buildMissionControlModel(
    tenant,
    getObjectsForTenant(tenantId),
    getRelationshipsForTenant(tenantId),
    stock,
  );
}
