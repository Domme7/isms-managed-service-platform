/**
 * Dashboard-Schicht der strategischen Ebene 1 auf „Heute" (WP-020, DR-0008/DR-0010).
 *
 * QUELLEN (Regel Null, am PDF gegengelesen):
 *  - DR-0008 (Owner): „Statuskacheln, Lebenszyklus-Verteilungen, Abdeckungsbalken,
 *    Ampel-Badges auf erfassten Zuständen — je mit Drill-down." Verboten bleibt: die UI
 *    errechnet/behauptet eine Bewertung ohne Datenträger; Ampel ohne Drill-down;
 *    Lebenszyklus-Stand als Prüfergebnis (Dok. 08 08-D07).
 *  - Dok. 06, Abschnitt „Bewusst vermiedene Muster": keine „Dashboard- oder Ampelwände ohne
 *    erkennbare nächste Entscheidung"; Abschnitt „Datenvisualisierung, Accessibility &
 *    Responsive Design": „Jedes Diagramm beantwortet eine benannte Frage und nennt Scope sowie
 *    Datenstand"; Abschnitt „Globale Akzeptanzkriterien": „Keine kritische Bewertung ist nur
 *    Farbe oder unerklärter Score."
 *
 * EHRLICHKEITSGRENZE DIESES MODULS: Jede Zahl entsteht aus Seed-Feldern/-Kanten des AKTIVEN
 * Mandanten; nichts ist hartkodiert (Referenz: `python scripts/seed_facts.py` – nachgerechnet,
 * nie abgeschrieben). Es gibt KEIN Risiko-Level, KEINEN Reifegrad, KEINEN Trend, KEINEN
 * Zielwert, KEINEN Score und KEINE Empfehlung – diese Träger existieren erst ab WP-021.
 * Abdeckungen sind immer „x von y" mit sichtbarer Grundgesamtheit, nie ein Prozent-Score.
 *
 * KEINE ZWEITE ZÄHLREGEL (Muster `buildMissionControl`): Abdeckungen und Bestände werden aus
 * den BESTEHENDEN Ableitungen gelesen – `buildIsmsCoreView` (evidenced_by = eingehende
 * R15-`evidences`-Kante; mitigated_by = eingehende R12-`mitigates`-Kante),
 * `buildDecisionRegister`, `getManagedServicesForTenant`, `owner_ids` (dieselbe Regel wie
 * Beobachtung „Objekte ohne erfassten Owner" in `lib/heute/data.ts`, nur positiv gezählt).
 * BEWUSST NICHT: eine zweite Owner-Regel über R03-`owns`-Kanten – zwei verschiedene
 * Owner-Zählungen auf derselben Seite würden sich widersprechen; die belegte Feldregel
 * (`owner_ids`, Dok. 07, Abschnitt „Objektvertrag, Identität und Metadaten") gilt für
 * Beobachtung UND Kachel.
 *
 * WORTWAHL DER SICHTBAREN TEXTE: Alle Texte dieses Moduls erscheinen im Produkt auf „Heute"
 * und stehen unter dem Bewertungsvokabular-Wächter der Seite (`mission-control.test.tsx`) –
 * deshalb bewusst kein „bewertet", „Trend", „Prozent", „Priorität", „Frist" usw. außerhalb
 * der dort registrierten wortgleichen Negationen.
 *
 * React-frei und deterministisch testbar (Muster `lib/heute/data.ts`).
 */

import { ALL_LIFECYCLE_STATUS } from '@isms/contracts';
import type { ObjectEnvelope, RelationshipEnvelope } from '@isms/contracts';
import type { DemoTenant } from '@isms/demo-seed';

import { buildDecisionRegister } from '../entscheidungen/data';
import { buildIsmsCoreView } from '../isms/data';
import { getManagedServicesForTenant } from '../services/data';
import { derivePageContextFacts, type PageContextFacts } from '../shell/page-context';
import { getPlace } from '../shell/places';
import { getObjectsForTenant, getRelationshipsForTenant, getTenant } from '../twin/data';
import { tenantDetailHref } from '../twin/routes';
import { anzahl } from './data';

/* -----------------------------------------------------------------------------
 * Ampel-Badges: POSITIVLISTE der zulässigen Regeln (DR-0008, O-WP020-07)
 * --------------------------------------------------------------------------- */

/**
 * Ein Badge existiert NUR für eine dieser drei Regeln – jede Regel beruht auf einer ERFASSTEN
 * Lage (Feldwert oder Kantenlage), nie auf einem Urteil. Es gibt bewusst KEINE
 * Schwere-/Dringlichkeits-Zuordnung („Warnung", „hoch/mittel/gering"): welche erfasste Lage
 * welche Schwere trüge, ist eine offene Produktfrage (O-WP020-07) – strittige Zuordnungen
 * bleiben unmarkiert. Farbe kommt im CSS dazu, Symbol + Text stehen hier (nie nur Farbe,
 * Dok. 06 06-D11 / Abschnitt „Visuelles Designsystem": Status = Text + Symbol/Form + optional
 * Farbe). Die Positivliste ist per Test erzwungen: jedes erzeugte Badge trägt eine dieser
 * Regel-Kennungen, und es existiert keine vierte.
 */
export const BADGE_RULES = {
  vollstaendig_belegt: {
    text: 'vollständig belegt',
    symbol: '✓',
    basis:
      'Erfasste Kanten-/Feldlage der Kachel: jedes gezählte Objekt der Grundgesamtheit trägt ' +
      'die gezählte Beziehung bzw. das gezählte Feld (x = y). Ob die belegte Lage fachlich ' +
      'ausreicht, sagt der Datenbestand nicht.',
  },
  luecke_erfasst: {
    text: 'Lücke erfasst',
    symbol: '○',
    basis:
      'Erfasste Kanten-/Feldlage der Kachel: mindestens ein Objekt der Grundgesamtheit trägt ' +
      'die gezählte Beziehung bzw. das gezählte Feld nicht (x < y). Ob die Lücke fachlich ' +
      'zulässig ist, sagt der Datenbestand nicht – das Badge behauptet es nicht.',
  },
  kein_datenbestand: {
    text: 'kein Datenbestand',
    symbol: '–',
    basis:
      'Erfasster Bestand des Mandanten: null Objekte und null Beziehungen im Demo-Datenbestand.',
  },
} as const;

export type BadgeRuleId = keyof typeof BADGE_RULES;

export interface DashboardBadge {
  /** Regel aus der Positivliste `BADGE_RULES` – per Test erzwungen (kein Badge außerhalb). */
  readonly rule: BadgeRuleId;
  readonly text: string;
  readonly symbol: string;
}

function badge(rule: BadgeRuleId): DashboardBadge {
  return { rule, text: BADGE_RULES[rule].text, symbol: BADGE_RULES[rule].symbol };
}

/** Badge einer Abdeckung – regelbasiert aus der erfassten Lage, nie aus einem Urteil. */
export function badgeFuerAbdeckung(covered: number, total: number): DashboardBadge | undefined {
  if (total <= 0) return undefined; // keine Grundgesamtheit -> kein Badge, benannte Lücke
  return covered >= total ? badge('vollstaendig_belegt') : badge('luecke_erfasst');
}

/* -----------------------------------------------------------------------------
 * Kachel-Modelle – jede Kachel erklärt sich selbst (Frage, Scope, Datenstand,
 * Ermittlungsregel, Drill-down; Dok. 06 „Datenvisualisierung …")
 * --------------------------------------------------------------------------- */

/** Gemeinsame Selbsterklärung jeder Kachel. */
export interface TileExplanation {
  /** Benannte Frage, die die Kachel beantwortet. */
  readonly frage: string;
  /** Scope der Zählung (wessen Daten, welche Grundgesamtheit). */
  readonly scope: string;
  /** Datenstand (Systemachse `record_time`, Kalendertag) – fehlt ehrlich, wenn nichts erfasst. */
  readonly datenstand?: string;
  readonly datenstandDisplay?: string;
  /** Ermittlungsregel im Klartext (wie gezählt wurde – inkl. Badge-Regel, falls vorhanden). */
  readonly regel: string;
  /** Drill-down-Ziel (DR-0008: keine Ampel ohne Weg in die Begründung). */
  readonly drilldown: { readonly label: string; readonly href: string };
}

/** Statuskachel: reine belegte Zählwerte (keine Bewertung). */
export interface StockTile extends TileExplanation {
  readonly id: 'bestand' | 'isms_kern' | 'entscheidungen' | 'services';
  readonly values: readonly { readonly label: string; readonly count: number }[];
}

/** Ein Balkenanteil der Lebenszyklus-Verteilung (erfasste Stände, kanonische Reihenfolge). */
export interface LifecycleSlice {
  readonly status: string;
  readonly count: number;
}

/** Lebenszyklus-Verteilung mit PFLICHT-Glosse (Dok. 08 08-D07). */
export interface LifecycleTile extends TileExplanation {
  readonly slices: readonly LifecycleSlice[];
  readonly total: number;
  /** 08-D07: Lebenszyklus-Stand ist ein erfasster Stand, KEIN Prüfergebnis. */
  readonly glosse: string;
}

/**
 * Kompakte Lebenszyklus-Kachel der Ebene 1 auf „Heute": Anzahl der VERSCHIEDENEN erfassten
 * Stände über die Grundgesamtheit – BEWUSST ohne die Stand-Namen selbst.
 *
 * WARUM (dokumentierte Spannung, im Abschlussbericht als Klärungspunkt geführt): Der
 * Bewertungsvokabular-Wächter von „Heute" (`mission-control.test.tsx`, WP-016) verbietet dort
 * u. a. das Wort „bewertet" im gerenderten Text – der Demo-Datenbestand trägt aber genau einen
 * ERFASSTEN Stand `'bewertet'` (Risk-Szenario, kanonisches Risiko-Vokabular). Die volle
 * Verteilung mit Stand-Namen auf „Heute" ließe sich nur grün bekommen, indem dieser Wächter
 * abgeschwächt würde – das ist eine benannte Stop-Bedingung des Work Packages (einzige
 * genehmigte Regelevolution ist der Rollenvarianten-Test in Slice 5). Deshalb: volle
 * Verteilung am Ort „ISMS" (`buildIsmsVerdichtung` – die Seite rendert erfasste Stände seit
 * jeher), auf „Heute" die Stand-ZÄHLUNG mit Drill-down dorthin. Keine stille Wächter-Änderung.
 */
export interface LifecycleSummaryTile extends TileExplanation {
  /** Anzahl der verschiedenen erfassten `lifecycle_status`-Werte. */
  readonly distinctCount: number;
  readonly total: number;
  readonly glosse: string;
}

/** Abdeckungsbalken „x von y" – nie Prozent ohne sichtbare Grundgesamtheit. */
export interface CoverageTile extends TileExplanation {
  readonly id:
    | 'controls_nachweis'
    | 'risiken_minderung'
    | 'objekte_owner'
    | 'kanten_vertrauensgrad';
  readonly covered: number;
  readonly total: number;
  /** `true`, wenn die Grundgesamtheit leer ist – dann benannte Lücke statt Balken. */
  readonly isEmpty: boolean;
  readonly emptyText?: string;
  readonly badge?: DashboardBadge;
}

/** Ehrliche Datenlücken-Kachel eines leeren Mandanten (Finovia/MediCore). */
export interface EmptyTenantTile extends TileExplanation {
  readonly text: string;
  readonly badge: DashboardBadge;
}

export interface HeuteDashboardModel {
  readonly isEmpty: boolean;
  /** Verdichteter Klartext-Zustand (Ebene 1) – jeder Satz aus abgeleiteten Zahlen gebildet. */
  readonly klartext: readonly string[];
  readonly stockTiles: readonly StockTile[];
  readonly lifecycleSummary?: LifecycleSummaryTile;
  readonly coverage: readonly CoverageTile[];
  readonly emptyTile?: EmptyTenantTile;
  /**
   * Trägt der AKTIVE Mandant mindestens ein Objekt vom Typ `Review` (F09)? Steuert die
   * mandantenabhängige Review-Aussage des ISMS-Manager-Rollenfokus (Domain-Review 2. Runde:
   * die Existenzaussage darf nicht statisch für jeden Mandanten gerendert werden – nur Nordwerk
   * trägt einen Outcome-Review, der Consulting Operator nicht).
   */
  readonly hatReview: boolean;
}

/** Verdichteter Überblick für den Ort „ISMS" (volle Verteilung + zwei Abdeckungen). */
export interface IsmsVerdichtungModel {
  readonly lifecycle: LifecycleTile;
  readonly coverage: readonly CoverageTile[];
}

/* -----------------------------------------------------------------------------
 * Reine Ableitungen (einzeln testbar)
 * --------------------------------------------------------------------------- */

/**
 * Kanonische Reihenfolge der Lebenszyklus-Stände: `ALL_LIFECYCLE_STATUS` aus dem Vertrag,
 * dedupliziert nach erstem Auftreten (die Vertragsliste enthält bewusst Mehrfachnennungen der
 * Klassen-Vokabulare). Das ist KATALOG-Reihenfolge, keine Sortierung nach Häufigkeit oder
 * Bedeutung (WP-016-Regel: Reihenfolgen sind Seed-, Kalender- oder Katalogreihenfolge).
 */
const LIFECYCLE_KATALOG: readonly string[] = [...new Set<string>(ALL_LIFECYCLE_STATUS)];

/**
 * Verteilung der ERFASSTEN `lifecycle_status`-Werte über die übergebenen Objekte.
 * Stände in Katalogreihenfolge; ein (im Vertrag eigentlich unmöglicher) nicht katalogisierter
 * Stand fiele ans Ende, statt still zu verschwinden (fail-soft, kein Datenverlust).
 * Bewusst strukturell typisiert (`lifecycle_status`), damit dieselbe Regel für Envelopes UND
 * die `IsmsObjectRef`-Karten der ISMS-Sicht gilt – EINE Verteilungsregel, nicht zwei.
 */
export function deriveLifecycleVerteilung(
  objects: readonly { readonly lifecycle_status: string }[],
): LifecycleSlice[] {
  const counts = new Map<string, number>();
  for (const object of objects) {
    counts.set(object.lifecycle_status, (counts.get(object.lifecycle_status) ?? 0) + 1);
  }
  const inKatalog = LIFECYCLE_KATALOG.filter((status) => counts.has(status));
  const ausserhalb = [...counts.keys()].filter((status) => !LIFECYCLE_KATALOG.includes(status));
  return [...inKatalog, ...ausserhalb].map((status) => ({
    status,
    count: counts.get(status) ?? 0,
  }));
}

/** Objekte mit mindestens einem erfassten Owner (`owner_ids`) – positive Lesart derselben
 *  Regel wie die Beobachtung „Objekte ohne erfassten Owner" (keine zweite Zählregel). */
export function countObjectsWithOwner(objects: readonly ObjectEnvelope[]): number {
  return objects.filter((o) => o.owner_ids.length > 0).length;
}

/** Beziehungen mit erfasstem Vertrauensgrad (`confidence`) – positive Lesart derselben Regel
 *  wie die Beobachtung „Beziehungen ohne erfassten Vertrauensgrad" (keine zweite Zählregel). */
export function countRelationshipsWithConfidence(
  relationships: readonly RelationshipEnvelope[],
): number {
  return relationships.filter((r) => typeof r.confidence === 'number').length;
}

/* -----------------------------------------------------------------------------
 * Aufbau des Dashboards eines Mandanten
 * --------------------------------------------------------------------------- */

/**
 * 08-D07-Glosse – sichtbarer Pflichttext an jeder Lebenszyklus-Kachel.
 * Wortwahl bewusst ohne das Partizip des B-Wortes: der Text erscheint auch auf „Heute",
 * dessen Vokabular-Wächter das Partizip verbietet (siehe `LifecycleSummaryTile`).
 */
export const LIFECYCLE_GLOSSE =
  'Lebenszyklus-Stände sind erfasste Stände aus dem Demo-Datenbestand – kein Prüfergebnis ' +
  'und keine geprüfte Wirksamkeit.';

/**
 * Baut das Dashboard-Modell des aktiven Mandanten vollständig aus dem Seed.
 * `undefined` bei unbekanntem Mandanten (Muster `buildMissionControl`, keine Existenzaussage
 * über fremde Mandanten); ein bekannter, leerer Mandant liefert die ehrliche
 * Datenlücken-Kachel statt einer Wand aus „0 von 0".
 */
export function buildHeuteDashboard(tenantId: string): HeuteDashboardModel | undefined {
  const tenant = getTenant(tenantId);
  if (!tenant) return undefined;

  const objects = getObjectsForTenant(tenantId);
  const relationships = getRelationshipsForTenant(tenantId);
  const tenantFacts = derivePageContextFacts(objects, relationships);

  if (objects.length === 0 && relationships.length === 0) {
    return buildEmptyTenantModel(tenant);
  }

  const ismsCore = buildIsmsCoreView(tenantId);
  const decisionRegister = buildDecisionRegister(tenantId);
  const services = getManagedServicesForTenant(tenantId);

  const ismsCoreCount =
    ismsCore.risks.length +
    ismsCore.scenarios.length +
    ismsCore.weaknesses.length +
    ismsCore.controls.length +
    ismsCore.measures.length +
    ismsCore.evidence.length;
  const decisionCount = decisionRegister?.decisions.length ?? 0;

  const facts: StockFacts = {
    objectCount: objects.length,
    relationshipCount: relationships.length,
    ismsCoreCount,
    serviceCount: services.length,
    decisionCount,
    tenantFacts,
  };

  return {
    isEmpty: false,
    klartext: buildKlartext(tenant, facts),
    stockTiles: buildStockTiles(tenant, {
      ...facts,
      ismsFacts: ismsCore.context,
      decisionRecordedOn: decisionRegister?.recordedOn,
      decisionRecordedOnDisplay: decisionRegister?.recordedOnDisplay,
    }),
    lifecycleSummary: buildLifecycleSummaryTile(tenant, objects, tenantFacts, !ismsCore.isEmpty),
    hatReview: objects.some((o) => o.object_type === 'Review'),
    coverage: [
      buildControlsCoverageTile(tenant, ismsCore, {
        label: 'ISMS: Controls mit Nachweis-Stand',
        href: getPlace('isms').href,
      }),
      buildRisksCoverageTile(tenant, ismsCore, {
        label: 'ISMS: Risiken mit Minderungs-Stand',
        href: getPlace('isms').href,
      }),
      buildOwnerCoverageTile(tenant, objects, tenantFacts),
      buildConfidenceCoverageTile(tenant, relationships, tenantFacts),
    ],
    emptyTile: undefined,
  };
}

/**
 * Verdichteter Überblick für den Ort „ISMS": volle Lebenszyklus-Verteilung der
 * ISMS-KERNOBJEKTE plus die beiden dort fachlich passenden Abdeckungen (WP-Zuschnitt: „… und,
 * wo fachlich passend, auf /isms"; Begründung der Verortung der vollen Verteilung am
 * `LifecycleSummaryTile`-Kommentar). Drill-downs sind seiteninterne Anker auf die Karten
 * dieser Seite – dort steht der Stand je Objekt. `undefined` bei unbekanntem Mandanten;
 * ein Mandant ohne ISMS-Kernobjekte liefert `undefined`, weil die Seite dann ihren eigenen
 * ehrlichen Leerzustand zeigt (keine „0 von 0"-Wand zusätzlich).
 */
export function buildIsmsVerdichtung(tenantId: string): IsmsVerdichtungModel | undefined {
  const tenant = getTenant(tenantId);
  if (!tenant) return undefined;

  const ismsCore = buildIsmsCoreView(tenantId);
  if (ismsCore.isEmpty) return undefined;

  // Grundgesamtheit = exakt die Kernobjekte der Seite; gezählt über dieselben Envelopes wie
  // `buildIsmsCoreView` (keine zweite Zählregel – die View-Objekte tragen den Stand bereits).
  const coreObjects = [
    ...ismsCore.risks.map((v) => v.risk),
    ...ismsCore.scenarios.map((v) => v.scenario),
    ...ismsCore.weaknesses.map((v) => v.weakness),
    ...ismsCore.controls.map((v) => v.control),
    ...ismsCore.measures.map((v) => v.measure),
    ...ismsCore.evidence.map((v) => v.evidence),
  ];
  const slices = deriveLifecycleVerteilung(coreObjects);

  const lifecycle: LifecycleTile = {
    frage: 'Welche Lebenszyklus-Stände tragen die ISMS-Kernobjekte?',
    slices,
    total: coreObjects.length,
    glosse: LIFECYCLE_GLOSSE,
    scope: `ISMS-Kernobjekte von ${tenant.display_name} (Risiken, Szenarien, Schwachstellen, Controls, Maßnahmen, Nachweise)`,
    datenstand: ismsCore.context.recordedOn,
    datenstandDisplay: ismsCore.context.recordedOnDisplay,
    regel:
      'Gezählt wird der erfasste Lebenszyklus-Stand je ISMS-Kernobjekt. Reihenfolge: kanonische ' +
      'Katalogreihenfolge der Stände – keine Sortierung nach Häufigkeit oder Bedeutung.',
    drilldown: {
      label: 'Zu den Karten dieser Seite (Stand an jeder Karte)',
      href: '#isms-risiken',
    },
  };

  return {
    lifecycle,
    coverage: [
      buildControlsCoverageTile(tenant, ismsCore, {
        label: 'Controls dieser Seite (Nachweis-Stand je Karte)',
        href: '#isms-controls',
      }),
      buildRisksCoverageTile(tenant, ismsCore, {
        label: 'Risiken dieser Seite (Minderungs-Stand je Karte)',
        href: '#isms-risiken',
      }),
    ],
  };
}

interface StockFacts {
  readonly objectCount: number;
  readonly relationshipCount: number;
  readonly ismsCoreCount: number;
  readonly serviceCount: number;
  readonly decisionCount: number;
  readonly tenantFacts: PageContextFacts;
}

/**
 * Klartext-Zustand der Ebene 1: ausschließlich Sätze aus abgeleiteten Zahlen plus die
 * ehrliche Grenze dessen, was der Datenbestand NICHT trägt (Summary/Pulse verlangt laut
 * Dok. 06 „Verbindliche Seitenbausteine" Trend, Veränderung und wichtigste Ursache – dafür
 * existiert kein Träger; das wird gesagt statt gefüllt).
 */
function buildKlartext(tenant: DemoTenant, facts: StockFacts): string[] {
  const zuletzt = facts.tenantFacts.recordedOnDisplay
    ? `, zuletzt im System erfasst am ${facts.tenantFacts.recordedOnDisplay}`
    : '';
  return [
    `${tenant.display_name}: ${anzahl(facts.objectCount, 'Objekt', 'Objekte')} und ` +
      `${anzahl(facts.relationshipCount, 'Beziehung', 'Beziehungen')} im Demo-Datenbestand` +
      `${zuletzt}.`,
    `Belegt sind ${anzahl(facts.ismsCoreCount, 'ISMS-Kernobjekt', 'ISMS-Kernobjekte')}, ` +
      `${anzahl(facts.serviceCount, 'Managed Service', 'Managed Services')} und ` +
      `${anzahl(facts.decisionCount, 'erfasste Entscheidung', 'erfasste Entscheidungen')}.`,
    'Eine Veränderung seit dem letzten Besuch, eine Entwicklung über die Zeit oder eine ' +
      'wichtigste Ursache ist im Datenbestand nicht belegt und wird hier nicht behauptet.',
  ];
}

function buildStockTiles(
  tenant: DemoTenant,
  facts: StockFacts & {
    readonly ismsFacts: PageContextFacts;
    readonly decisionRecordedOn?: string;
    readonly decisionRecordedOnDisplay?: string;
  },
): StockTile[] {
  const isms = getPlace('isms');
  const entscheidungen = getPlace('entscheidungen');
  const services = getPlace('services');
  const tenantScope = `Datenbestand von ${tenant.display_name} (nur der aktive Mandant)`;

  return [
    {
      id: 'bestand',
      frage: 'Wie groß ist der erfasste Datenbestand dieses Mandanten?',
      values: [
        { label: 'Objekte', count: facts.objectCount },
        { label: 'Beziehungen', count: facts.relationshipCount },
      ],
      scope: tenantScope,
      datenstand: facts.tenantFacts.recordedOn,
      datenstandDisplay: facts.tenantFacts.recordedOnDisplay,
      regel:
        'Gezählt werden alle Objekte und Beziehungen mit der Mandanten-Kennung des aktiven ' +
        'Mandanten. Es wird nur gezählt – nichts wird gewichtet.',
      drilldown: { label: 'Zwilling dieses Mandanten', href: tenantDetailHref(tenant.tenant_id) },
    },
    {
      id: 'isms_kern',
      frage: 'Wie viele ISMS-Kernobjekte sind erfasst?',
      values: [{ label: 'ISMS-Kernobjekte', count: facts.ismsCoreCount }],
      scope: tenantScope,
      datenstand: facts.ismsFacts.recordedOn,
      datenstandDisplay: facts.ismsFacts.recordedOnDisplay,
      regel:
        'Gezählt werden Risiken, Szenarien, Schwachstellen, Controls, Maßnahmen und Nachweise ' +
        'des aktiven Mandanten – dieselbe Zählung wie am Ort „ISMS".',
      drilldown: { label: isms.label, href: isms.href },
    },
    {
      id: 'entscheidungen',
      frage: 'Wie viele Entscheidungen sind erfasst?',
      values: [{ label: 'erfasste Entscheidungen', count: facts.decisionCount }],
      scope: tenantScope,
      datenstand: facts.decisionRecordedOn,
      datenstandDisplay: facts.decisionRecordedOnDisplay,
      regel:
        'Gezählt werden Objekte vom Typ „Decision Record" des aktiven Mandanten – dieselbe ' +
        'Zählung wie am Ort „Entscheidungen".',
      drilldown: { label: entscheidungen.label, href: entscheidungen.href },
    },
    {
      id: 'services',
      frage: 'Wie viele Managed Services sind für diesen Mandanten erfasst?',
      values: [{ label: 'Managed Services', count: facts.serviceCount }],
      scope: tenantScope,
      datenstand: facts.tenantFacts.recordedOn,
      datenstandDisplay: facts.tenantFacts.recordedOnDisplay,
      regel:
        'Gezählt werden Objekte vom Typ „Managed Service" des aktiven Mandanten – dieselbe ' +
        'Zählung wie am Ort „Services".',
      drilldown: { label: services.label, href: services.href },
    },
  ];
}

/**
 * Kompakte Stand-Zählung für Ebene 1 (Begründung am `LifecycleSummaryTile`-Kommentar).
 *
 * DRILL-DOWN MANDANTENABHÄNGIG (Review-Finding Code F1): Die Verteilung der Stände lebt am
 * Ort „ISMS" NUR für Mandanten mit ISMS-Kernobjekten (`buildIsmsVerdichtung` liefert sonst
 * `undefined`, die Seite zeigt ihren Leerzustand). Ohne Kernobjekte (z. B. Consulting
 * Operator) führt der Weg deshalb in die Objektliste des Mandanten – dort steht der Stand je
 * Objekt; ein Link auf eine nicht existierende Verteilung wäre ein totes Versprechen.
 */
function buildLifecycleSummaryTile(
  tenant: DemoTenant,
  objects: readonly ObjectEnvelope[],
  tenantFacts: PageContextFacts,
  hatIsmsVerdichtung: boolean,
): LifecycleSummaryTile {
  const distinctCount = new Set(objects.map((o) => o.lifecycle_status)).size;
  const isms = getPlace('isms');
  return {
    frage: 'Wie viele verschiedene Lebenszyklus-Stände sind erfasst?',
    distinctCount,
    total: objects.length,
    glosse: LIFECYCLE_GLOSSE,
    scope: `Alle ${anzahl(objects.length, 'Objekt', 'Objekte')} von ${tenant.display_name}`,
    datenstand: tenantFacts.recordedOn,
    datenstandDisplay: tenantFacts.recordedOnDisplay,
    regel:
      'Gezählt werden die verschiedenen erfassten Lebenszyklus-Stände über alle ' +
      `Objekte des aktiven Mandanten. ${
        hatIsmsVerdichtung
          ? 'Die Verteilung im Einzelnen steht am Ort „ISMS" (ISMS-Kernobjekte) und als ' +
            'Stand je Objekt in der Objektliste.'
          : 'Der Stand je Objekt steht in der Objektliste dieses Mandanten; eine Verteilung ' +
            'der ISMS-Kernobjekte gibt es für diesen Mandanten nicht (keine Kernobjekte erfasst).'
      }`,
    drilldown: hatIsmsVerdichtung
      ? {
          label: `${isms.label}: Verteilung der Stände der ISMS-Kernobjekte`,
          href: isms.href,
        }
      : {
          label: 'Objektliste dieses Mandanten (Stand je Objekt auf der Objektseite)',
          href: tenantDetailHref(tenant.tenant_id),
        },
  };
}

/* -----------------------------------------------------------------------------
 * Abdeckungs-Kacheln – EINE Zählregel je Abdeckung, mehrfach verortet
 * (auf „Heute" mit Drill-down zum Ort, auf „ISMS" mit Anker auf die Karten)
 *
 * DATENSTAND-SCOPING (Review-Finding Code F7, bewusste Entscheidung): Der „Datenstand" jeder
 * Abdeckungskachel ist der jüngste ERFASSUNGSTAG DER GEZÄHLTEN OBJEKTE (Envelope-Systemachse
 * der Grundgesamtheit – Controls/Risiken über `ismsCore.context`, Objekte/Beziehungen über
 * die Mandanten-Fakten). Die KANTEN, die die Zählung tragen (R15/R12), fließen NICHT in den
 * Datenstand ein: die Kachel beantwortet eine Frage über die Objekte der Grundgesamtheit
 * („wie viele Controls tragen …"), und ein Kanten-Zeitstempel könnte jünger sein als jedes
 * gezählte Objekt – der ausgewiesene Stand würde dann eine Aktualität der OBJEKTE behaupten,
 * die nicht erfasst ist. Die Kantenzeiten bleiben an den Kanten selbst sichtbar (Objekt-360).
 * --------------------------------------------------------------------------- */

type IsmsCoreViewModel = ReturnType<typeof buildIsmsCoreView>;
type Drilldown = TileExplanation['drilldown'];

function buildControlsCoverageTile(
  tenant: DemoTenant,
  ismsCore: IsmsCoreViewModel,
  drilldown: Drilldown,
): CoverageTile {
  const covered = ismsCore.controls.filter((c) => c.evidenced_by.length > 0).length;
  return {
    id: 'controls_nachweis',
    frage: 'Wie viele Controls haben mindestens einen Nachweis?',
    covered,
    total: ismsCore.controls.length,
    isEmpty: ismsCore.controls.length === 0,
    emptyText:
      'Für diesen Mandanten sind keine Controls im Datenbestand erfasst – eine Abdeckung ist ' +
      'nicht berechenbar und wird nicht erfunden.',
    badge: badgeFuerAbdeckung(covered, ismsCore.controls.length),
    scope: `Controls von ${tenant.display_name}`,
    datenstand: ismsCore.context.recordedOn,
    datenstandDisplay: ismsCore.context.recordedOnDisplay,
    regel:
      'Gezählt werden Controls mit mindestens einer eingehenden Nachweis-Beziehung. Auch ein ' +
      'abgelaufener oder abgelehnter Nachweis zählt hier als Beziehung. Ob ein Nachweis ' +
      'fachlich ausreicht, sagt der Datenbestand nicht. Badge-Regel: „vollständig belegt" ' +
      'bei x = y, „Lücke erfasst" bei x < y – eine erfasste Lage, kein Urteil.',
    drilldown,
  };
}

function buildRisksCoverageTile(
  tenant: DemoTenant,
  ismsCore: IsmsCoreViewModel,
  drilldown: Drilldown,
): CoverageTile {
  const covered = ismsCore.risks.filter((r) => r.mitigated_by.length > 0).length;
  return {
    id: 'risiken_minderung',
    frage: 'Wie viele Risiken sind durch mindestens eine Maßnahme oder ein Control gemindert?',
    covered,
    total: ismsCore.risks.length,
    isEmpty: ismsCore.risks.length === 0,
    emptyText:
      'Für diesen Mandanten sind keine Risiken im Datenbestand erfasst – eine Abdeckung ist ' +
      'nicht berechenbar und wird nicht erfunden.',
    badge: badgeFuerAbdeckung(covered, ismsCore.risks.length),
    scope: `Risiken von ${tenant.display_name}`,
    datenstand: ismsCore.context.recordedOn,
    datenstandDisplay: ismsCore.context.recordedOnDisplay,
    regel:
      'Gezählt werden Risiken mit mindestens einer eingehenden Minderungs-Beziehung ' +
      'von einem Control oder einer Maßnahme. Über die Wirksamkeit der Minderung sagt die ' +
      'Beziehung nichts aus. Badge-Regel wie oben (erfasste Lage, kein Urteil).',
    drilldown,
  };
}

function buildOwnerCoverageTile(
  tenant: DemoTenant,
  objects: readonly ObjectEnvelope[],
  tenantFacts: PageContextFacts,
): CoverageTile {
  const covered = countObjectsWithOwner(objects);
  return {
    id: 'objekte_owner',
    frage: 'Wie viele Objekte haben einen benannten Owner?',
    covered,
    total: objects.length,
    isEmpty: objects.length === 0,
    emptyText:
      'Für diesen Mandanten sind keine Objekte im Datenbestand erfasst – eine Abdeckung ist ' +
      'nicht berechenbar und wird nicht erfunden.',
    badge: badgeFuerAbdeckung(covered, objects.length),
    scope: `Alle Objekte von ${tenant.display_name}`,
    datenstand: tenantFacts.recordedOn,
    datenstandDisplay: tenantFacts.recordedOnDisplay,
    regel:
      'Gezählt werden Objekte mit mindestens einem benannten Owner – dieselbe Regel wie die ' +
      'Beobachtung „Objekte ohne erfassten Owner" in Ebene 2, nur positiv gezählt. Ob ein ' +
      'Owner fachlich erforderlich ist, sagt der Datenbestand nicht. Badge-Regel wie oben.',
    drilldown: {
      label: 'Objektliste dieses Mandanten (Owner je Objekt auf der Objektseite)',
      href: tenantDetailHref(tenant.tenant_id),
    },
  };
}

function buildConfidenceCoverageTile(
  tenant: DemoTenant,
  relationships: readonly RelationshipEnvelope[],
  tenantFacts: PageContextFacts,
): CoverageTile {
  const covered = countRelationshipsWithConfidence(relationships);
  return {
    id: 'kanten_vertrauensgrad',
    frage: 'Wie viele Beziehungen tragen einen erfassten Vertrauensgrad?',
    covered,
    total: relationships.length,
    isEmpty: relationships.length === 0,
    emptyText:
      'Für diesen Mandanten sind keine Beziehungen im Datenbestand erfasst – eine Abdeckung ' +
      'ist nicht berechenbar und wird nicht erfunden.',
    badge: badgeFuerAbdeckung(covered, relationships.length),
    scope: `Alle Beziehungen von ${tenant.display_name}`,
    datenstand: tenantFacts.recordedOn,
    datenstandDisplay: tenantFacts.recordedOnDisplay,
    regel:
      'Gezählt werden Beziehungen dieses Mandanten mit einem erfassten Vertrauensgrad – ' +
      'dieselbe Regel wie die Beobachtung „Beziehungen ohne erfassten Vertrauensgrad" in ' +
      'Ebene 2, nur positiv gezählt. Ein fehlender Vertrauensgrad wird nicht ersetzt und nicht ' +
      'geschätzt. Badge-Regel wie oben (erfasste Lage, kein Urteil).',
    drilldown: {
      label: 'Zwilling dieses Mandanten (Vertrauensgrad je Beziehung)',
      href: tenantDetailHref(tenant.tenant_id),
    },
  };
}

/** Modell eines leeren Mandanten: EINE ehrliche Datenlücken-Kachel statt „0 von 0"-Wänden. */
function buildEmptyTenantModel(tenant: DemoTenant): HeuteDashboardModel {
  return {
    isEmpty: true,
    klartext: [
      `${tenant.display_name}: 0 Objekte und 0 Beziehungen im Demo-Datenbestand.`,
      'Es wird bewusst kein Ersatzinhalt gezeigt – die Datenlücke ist das Ergebnis.',
    ],
    stockTiles: [],
    lifecycleSummary: undefined,
    coverage: [],
    hatReview: false,
    emptyTile: {
      frage: 'Welche Datenlage hat dieser Mandant?',
      text:
        `Für ${tenant.display_name} sind im Demo-Datenbestand keine Objekte und keine ` +
        'Beziehungen modelliert. Deshalb gibt es hier keine Kacheln, keine Verteilung und ' +
        'keine Abdeckung – und es wird nichts erfunden.',
      badge: badge('kein_datenbestand'),
      scope: `Datenbestand von ${tenant.display_name} (nur der aktive Mandant)`,
      datenstand: undefined,
      datenstandDisplay: undefined,
      regel:
        'Gezählt werden alle Objekte und Beziehungen mit der Mandanten-Kennung des aktiven ' +
        'Mandanten; beide Zählungen ergeben null. Badge-Regel: „kein Datenbestand" – eine ' +
        'erfasste Lage, kein Urteil.',
      drilldown: {
        label: 'Zwilling dieses Mandanten (zeigt denselben leeren Stand)',
        href: tenantDetailHref(tenant.tenant_id),
      },
    },
  };
}
