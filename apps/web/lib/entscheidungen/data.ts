/**
 * View-Daten des Ortes „Entscheidungen" – Entscheidungsregister, read-only (WP-017 Slice 2).
 *
 * Reine, deterministische Ableitung aus `@isms/demo-seed` für GENAU EINEN Mandanten. Gerendert
 * wird ausschließlich, was als Feld oder Kante im Datenbestand steht; Lücken werden benannt
 * statt gefüllt (Dok. 07 §21 „Datenlücken werden nicht still verborgen", Dok. 06 §17
 * *Partial data*). Die Helfer sind bewusst frei von React/Next, damit sie deterministisch
 * testbar sind (Muster `lib/isms/data.ts`, `lib/heute/data.ts`).
 *
 * WAS DIESE SEITE IST – UND WAS NICHT (WP-017 Nicht-Ziele):
 *   Sie zeigt die im kanonischen Objektvertrag (Dok. 07 §7) belegten Angaben zu Objekten des
 *   Typs `Decision Record` (F09) und deren kanonische Kanten. Sie ist ausdrücklich KEINE
 *   „Decision Card" im Sinne von Dok. 10 §9.1: von deren 14 Pflichtfeldern hat die Mehrheit im
 *   heutigen Objektvertrag keinen Träger. Die Lücke wird feldweise ausgesprochen
 *   (`DECISION_CARD_FIELDS`) und im Produkt sichtbar gemacht – sie wird nicht überbrückt.
 *
 *   KEIN Score, KEINE Ampel, KEIN Reifegrad, KEIN Trend, KEIN Prozent-/Schwellenwert, KEIN
 *   Prioritätsrang, KEINE Frist, KEINE Empfehlung, KEIN Serviceangebot, KEINE Preis-/
 *   Währungsangabe. Es wird gelistet und belegt – nicht gewichtet und nicht eingeordnet.
 *   Reihenfolge = Reihenfolge des Datenbestands (`DECISION_ORDER_RULE`, im Produkt sichtbar).
 *
 * ZWEI ZEITACHSEN, NIE VERMISCHT (Dok. 07 §11/D07): `valid_time` ist die fachliche Achse
 * (inklusive des geschlossenen Intervalls eines abgelösten Stands), `record_time` die
 * Systemachse. Aus einem Erfassungszeitpunkt wird hier niemals eine fachliche Änderung.
 *
 * ABLÖSUNG OHNE ÜBERSCHREIBUNG (Dok. 07 §9 R24, Dok. 10 §9.2): Vorgänger- und Nachfolgestand
 * werden BEIDE geführt, richtungstreu getrennt (`supersedes` ausgehend = löst ab,
 * `superseded_by` eingehend = wurde abgelöst) – der abgelöste Stand wird nicht ausgeblendet.
 *
 * MANDANTENTRENNUNG (Sicherheitsgrenze, Dok. 07 §17/P09): jede Ableitung arbeitet strikt
 * innerhalb EINES Mandanten. `buildDecisionRegisterModel` filtert die übergebenen Objekt- und
 * Kantenlisten zusätzlich selbst auf `tenant_id` (Defense in Depth) – mandantenfremde Objekte
 * und Kanten verändern das Ergebnis auch dann nicht, wenn ein Aufrufer ungefiltert übergibt.
 *
 * BUNDLE-GRENZE (O-WP014-09): Routen und Datumsformat kommen ausschließlich aus dem seed-freien
 * `lib/twin/routes.ts`, nie aus `lib/twin/object-detail.ts`.
 */

import { OBJECT_FAMILIES } from '@isms/contracts';
import type {
  ObjectEnvelope,
  ObjectFamilyId,
  ObjectType,
  QualityDimensionAssessment,
  RelationshipEnvelope,
  RelationshipType,
  SourceRef,
} from '@isms/contracts';
import type { DemoTenant } from '@isms/demo-seed';

import {
  confidenceQualitative,
  familyForType,
  getObjectsForTenant,
  getRelationshipsForTenant,
  getTenant,
  objectTypeDisplay,
  relationshipTypeId,
  relationshipTypeLabel,
} from '../twin/data';
import { calendarDay, formatIsoDateDe, objectDetailHref } from '../twin/routes';

/* -----------------------------------------------------------------------------
 * Kanonische Typen dieses Ortes (nur Vertragswerte, nichts erfunden)
 * --------------------------------------------------------------------------- */

/*
 * `satisfies` koppelt jede Konstante an den Contract: ein Tippfehler wäre sonst ein gültiger
 * String, würde fehlerfrei kompilieren und still auf die leere Menge filtern (Review-Fix). Der
 * Literaltyp bleibt dabei erhalten, die Vergleiche unten ändern sich nicht.
 */

/** Objekttyp aus dem kanonischen Katalog (Dok. 07 §6, Familie F09). */
export const DECISION_OBJECT_TYPE = 'Decision Record' satisfies ObjectType;

/** R23 `decided_in` – „Risk/Change/Service -> Decision Record" (Dok. 07 §9). */
export const DECISION_REFERENCE_EDGE = 'decided_in' satisfies RelationshipType;
/** R15 `evidences` – „Evidence -> Control/Measure/Decision" (Dok. 07 §9). */
export const DECISION_EVIDENCE_EDGE = 'evidences' satisfies RelationshipType;
/** R24 `supersedes` – „Version/Policy/Decision -> Vorgänger" (Dok. 07 §9). */
export const DECISION_SUPERSEDES_EDGE = 'supersedes' satisfies RelationshipType;
/** R03 `owns` – „Person/Rolle/Einheit -> Objekt" (Dok. 07 §9). */
export const DECISION_OWNS_EDGE = 'owns' satisfies RelationshipType;

/**
 * Sichtbare Reihenfolgeregel an der Liste (Dok. 06 §6: die Regel steht am Inhalt, nicht im
 * Kleingedruckten). Ausdrücklich KEINE Priorisierung – es gibt in diesem Datenmodell weder
 * Frist noch Priorität, aus der sich eine Rangfolge ableiten ließe (O-WP016-04/O-WP017-06).
 */
export const DECISION_ORDER_RULE =
  'Gezeigt werden die Entscheidungen in der Reihenfolge des Datenbestands. Das ist eine feste ' +
  'Reihenfolge und keine Rangfolge: Es wird nichts gewichtet, nichts eingestuft und nichts ' +
  'empfohlen. Welche Entscheidung zuerst steht, sagt nichts über ihre Bedeutung aus.';

/* -----------------------------------------------------------------------------
 * View-Modelle
 * --------------------------------------------------------------------------- */

export type EdgeOrientation = 'eingehend' | 'ausgehend';

/**
 * Eine kanonische Kante an einer Entscheidung, auf das Nachbarobjekt DESSELBEN Mandanten
 * aufgelöst. Fehlt der Endpunkt (unerwartet – die Seed-Integritätstests schließen
 * Dangling-Kanten aus), trägt `name` fail-loud die rohe Kennung, `resolved` ist `false` und
 * `href` bleibt leer: ein Link würde eine Existenz behaupten, die nicht belegt ist.
 */
export interface DecisionEdge {
  readonly relationship_id: string;
  /** Kanonischer Typ (snake_case, Dok. 07 §9). */
  readonly relationship_type: string;
  /** Kanonische R-ID (z. B. „R23"), falls im Vertrag geführt. */
  readonly relationship_type_id?: string;
  /** Deutsches Klartextlabel (Dok. 06 D08), falls belegt – sonst technischer Name. */
  readonly relationship_type_label?: string;
  /** Blickrichtung AUS SICHT DER ENTSCHEIDUNG (die Kantenrichtung selbst bleibt unverändert). */
  readonly orientation: EdgeOrientation;
  readonly object_id: string;
  readonly name: string;
  readonly object_type: string;
  /** „Risiko (Risk)" bzw. kanonischer Typ, falls keine Glosse belegt ist. */
  readonly object_type_display: string;
  readonly lifecycle_status?: string;
  readonly resolved: boolean;
  /** Objekt-360-Route des Nachbarn – immer mit dem Mandanten dieser Entscheidung. */
  readonly href?: string;
  /** Herkunft der Aussage (`assertion_kind`, Dok. 07 §9/D05). */
  readonly assertion_kind: string;
  /** Status der Beziehung (Feld der Kante, wertoffen laut Contract). */
  readonly edge_status?: string;
  /** Qualitativ + Wert („mittel (0,7)"), falls die Kante einen Vertrauensgrad trägt. */
  readonly confidence_display?: string;
  /** Fachliche Gültigkeit DER KANTE. */
  readonly valid_from: string;
  readonly valid_to: string | null;
  /** Fachliche Gültigkeit DES NACHBAROBJEKTS (für die Ablösekette sichtbar gemacht). */
  readonly neighbor_valid_from?: string;
  readonly neighbor_valid_to?: string | null;
}

/** Owner-Referenz des Objekt-Envelopes, gegen Objekte desselben Mandanten aufgelöst. */
export interface DecisionOwner {
  readonly owner_id: string;
  readonly name: string;
  readonly resolved: boolean;
  readonly href?: string;
  readonly owner_kind: string;
  readonly role?: string;
  readonly valid_from?: string;
  readonly valid_to?: string | null;
}

/** Eine Entscheidung mit allem, was der Datenbestand über sie belegt. */
export interface DecisionEntry {
  readonly object_id: string;
  /** Objekt-360-Route dieser Entscheidung (immer im aktiven Mandanten). */
  readonly href: string;
  /** Entscheidungsfrage = `display_name` (Dok. 10 §9.1 „Entscheidungsfrage", teilweise). */
  readonly question: string;
  /** Kontext/Gegenstand = `description`; `undefined`, wenn nicht erfasst. */
  readonly context?: string;
  /** Lebenszyklus-Stand (Objektstatus, KEIN Freigabeergebnis – Dok. 08 08-D05: ohne
   *  Bestätigung durch Owner/Reviewer gilt nichts als fachlich freigegeben; die getrennte
   *  Prüfergebnis-Grenze 08-D07 bleibt control-bezogen). */
  readonly lifecycle_status: string;
  readonly object_type: string;
  readonly object_type_display: string;
  readonly family_id?: ObjectFamilyId;
  readonly family_name?: string;
  readonly scope_ids: readonly string[];
  readonly owners: readonly DecisionOwner[];
  /** Eingehende R03-Kanten („verantwortet") – Verantwortung, ausdrücklich keine Freigabe. */
  readonly owned_by: readonly DecisionEdge[];
  /** Fachliche Achse (valid_time). `valid_to === null` = offenes Intervall. */
  readonly valid_from: string;
  readonly valid_to: string | null;
  /** Systemachse (record_time) – getrennt von der fachlichen Achse geführt. */
  readonly recorded_at: string;
  readonly replaced_at: string | null;
  readonly version: number;
  /** Bezugsobjekte über R23 (eingehend: Risiko/Service -> diese Entscheidung). */
  readonly references: readonly DecisionEdge[];
  /** Nachweise über R15 (eingehend: Nachweis -> diese Entscheidung). */
  readonly evidence: readonly DecisionEdge[];
  /** R24 ausgehend: dieser Stand löst den genannten Vorgängerstand ab. */
  readonly supersedes: readonly DecisionEdge[];
  /** R24 eingehend: dieser Stand wurde durch den genannten Nachfolgestand abgelöst. */
  readonly superseded_by: readonly DecisionEdge[];
  readonly source_refs: readonly SourceRef[];
  /** Qualitätsdimensionen unverrechnet (Dok. 07 D10: kein verdichteter Indikator). */
  readonly quality_dimensions: readonly QualityDimensionAssessment[];
  /** Bestätigungsstufe der Dimension „Bestätigung", falls erfasst. */
  readonly confirmation_level?: string;
}

/** Vollständiges, read-only Entscheidungsregister EINES Mandanten. */
export interface DecisionRegisterModel {
  readonly tenant: DemoTenant;
  readonly decisions: readonly DecisionEntry[];
  /** `true`, wenn dieser Mandant keine Entscheidung trägt. */
  readonly isEmpty: boolean;
  /**
   * `true`, wenn der Mandant überhaupt Objekte trägt. Trennt die beiden fachlich
   * VERSCHIEDENEN Leerfälle: Datenbestand vorhanden, aber ohne Entscheidung – gegenüber
   * gar keinem Datenbestand (Dok. 06 §17, O-WP017-08).
   */
  readonly hasObjectGraph: boolean;
  readonly objectCount: number;
  readonly relationshipCount: number;
  /** Belegte Scope-Kennungen der Entscheidungen (Dok. 07 §7; Scopes sind keine Objekte). */
  readonly scopeIds: readonly string[];
  /** Jüngste Systemerfassung UNTER DEN ENTSCHEIDUNGEN (Kalendertag), sonst `undefined`. */
  readonly recordedOn?: string;
  readonly recordedOnDisplay?: string;
  readonly orderRule: string;
}

/* -----------------------------------------------------------------------------
 * Auflösung (harte Mandantengrenze über tenant_id)
 * --------------------------------------------------------------------------- */

function toEdge(
  rel: RelationshipEnvelope,
  orientation: EdgeOrientation,
  tenantId: string,
  byId: ReadonlyMap<string, ObjectEnvelope>,
): DecisionEdge {
  const neighborId = orientation === 'ausgehend' ? rel.target_id : rel.source_id;
  const neighbor = byId.get(neighborId);
  const neighborType = neighbor?.object_type ?? 'unbekannt';

  return {
    relationship_id: rel.relationship_id,
    relationship_type: rel.relationship_type,
    relationship_type_id: relationshipTypeId(rel.relationship_type),
    relationship_type_label: relationshipTypeLabel(rel.relationship_type),
    orientation,
    object_id: neighborId,
    name: neighbor?.display_name ?? neighborId,
    object_type: neighborType,
    object_type_display: objectTypeDisplay(neighborType),
    lifecycle_status: neighbor?.lifecycle_status,
    resolved: neighbor !== undefined,
    // Fail-loud: ein nicht auflösbarer Endpunkt bekommt KEINEN Link (Muster `ObjectDetailView`).
    href: neighbor ? objectDetailHref(tenantId, neighborId) : undefined,
    assertion_kind: rel.assertion_kind,
    edge_status: rel.status,
    confidence_display:
      typeof rel.confidence === 'number'
        ? confidenceQualitative(rel.confidence).display
        : undefined,
    valid_from: rel.valid_time.from,
    valid_to: rel.valid_time.to ?? null,
    neighbor_valid_from: neighbor?.valid_time.from,
    neighbor_valid_to: neighbor ? (neighbor.valid_time.to ?? null) : undefined,
  };
}

function toEntry(
  object: ObjectEnvelope,
  tenantId: string,
  byId: ReadonlyMap<string, ObjectEnvelope>,
  relationships: readonly RelationshipEnvelope[],
): DecisionEntry {
  const incoming = (type: string): DecisionEdge[] =>
    relationships
      .filter((r) => r.relationship_type === type && r.target_id === object.object_id)
      .map((r) => toEdge(r, 'eingehend', tenantId, byId));
  const outgoing = (type: string): DecisionEdge[] =>
    relationships
      .filter((r) => r.relationship_type === type && r.source_id === object.object_id)
      .map((r) => toEdge(r, 'ausgehend', tenantId, byId));

  const familyId = familyForType(object.object_type);
  const confirmation = object.quality_state.dimensions.find(
    (d) => d.confirmation_level !== undefined,
  );

  return {
    object_id: object.object_id,
    href: objectDetailHref(tenantId, object.object_id),
    question: object.display_name,
    context: object.description,
    lifecycle_status: object.lifecycle_status,
    object_type: object.object_type,
    object_type_display: objectTypeDisplay(object.object_type),
    family_id: familyId,
    family_name: familyId ? OBJECT_FAMILIES[familyId].name : undefined,
    scope_ids: object.scope_ids.map((s) => s.scope_id),
    owners: object.owner_ids.map((owner) => {
      const ownerObject = byId.get(owner.owner_id);
      return {
        owner_id: owner.owner_id,
        name: ownerObject?.display_name ?? owner.owner_id,
        resolved: ownerObject !== undefined,
        href: ownerObject ? objectDetailHref(tenantId, owner.owner_id) : undefined,
        owner_kind: owner.owner_kind,
        role: owner.role,
        valid_from: owner.valid_time?.from,
        valid_to: owner.valid_time?.to ?? null,
      };
    }),
    owned_by: incoming(DECISION_OWNS_EDGE),
    valid_from: object.valid_time.from,
    valid_to: object.valid_time.to ?? null,
    recorded_at: object.record_time.recorded_at,
    replaced_at: object.record_time.replaced_at ?? null,
    version: object.version,
    references: incoming(DECISION_REFERENCE_EDGE),
    evidence: incoming(DECISION_EVIDENCE_EDGE),
    // Richtungstreu getrennt (Dok. 07 §9 R24: Quelle ist der NACHFOLGER).
    supersedes: outgoing(DECISION_SUPERSEDES_EDGE),
    superseded_by: incoming(DECISION_SUPERSEDES_EDGE),
    source_refs: object.source_refs,
    quality_dimensions: object.quality_state.dimensions,
    confirmation_level: confirmation?.confirmation_level,
  };
}

/**
 * Baut das Register aus übergebenen Listen – die REINE Kernfunktion (gegen Fixtures prüfbar).
 *
 * Filtert Objekte und Kanten selbst auf `tenant.tenant_id`: die Mandantengrenze ist eine
 * Sicherheitsgrenze und darf nicht davon abhängen, dass der Aufrufer bereits richtig gefiltert
 * hat (Dok. 07 §17/P09).
 */
export function buildDecisionRegisterModel(
  tenant: DemoTenant,
  objects: readonly ObjectEnvelope[],
  relationships: readonly RelationshipEnvelope[],
): DecisionRegisterModel {
  const tenantId = tenant.tenant_id;
  const ownObjects = objects.filter((o) => o.tenant_id === tenantId);
  const ownRelationships = relationships.filter((r) => r.tenant_id === tenantId);
  const byId = new Map(ownObjects.map((o) => [o.object_id, o] as const));

  // Reihenfolge = Reihenfolge des Datenbestands (siehe DECISION_ORDER_RULE) – kein `sort`.
  const decisions = ownObjects
    .filter((o) => o.object_type === DECISION_OBJECT_TYPE)
    .map((o) => toEntry(o, tenantId, byId, ownRelationships));

  const scopeIds: string[] = [];
  for (const decision of decisions) {
    for (const scopeId of decision.scope_ids) {
      if (!scopeIds.includes(scopeId)) scopeIds.push(scopeId);
    }
  }

  // Jüngster Erfassungstag der Entscheidungen (Systemachse) – Zeichenkettenvergleich genügt,
  // ISO-Kalendertage sind lexikografisch sortierbar.
  let recordedOn: string | undefined;
  for (const decision of decisions) {
    const day = calendarDay(decision.recorded_at);
    if (recordedOn === undefined || day > recordedOn) recordedOn = day;
  }

  return {
    tenant,
    decisions,
    isEmpty: decisions.length === 0,
    hasObjectGraph: ownObjects.length > 0,
    objectCount: ownObjects.length,
    relationshipCount: ownRelationships.length,
    scopeIds,
    recordedOn,
    recordedOnDisplay: recordedOn ? formatIsoDateDe(recordedOn) : undefined,
    orderRule: DECISION_ORDER_RULE,
  };
}

/**
 * Dünne Seed-Anbindung. Liefert `undefined` bei unbekanntem Mandanten – identisch zum Muster in
 * `lib/twin/object-detail.ts` (keine Existenzaussage über fremde Mandanten). Ein bekannter, aber
 * entscheidungsfreier Mandant liefert dagegen ein vollständiges, wohldefiniertes leeres Modell:
 * der Leerzustand ist eine Aussage, kein Fehler.
 */
export function buildDecisionRegister(tenantId: string): DecisionRegisterModel | undefined {
  const tenant = getTenant(tenantId);
  if (!tenant) return undefined;
  return buildDecisionRegisterModel(
    tenant,
    getObjectsForTenant(tenantId),
    getRelationshipsForTenant(tenantId),
  );
}

/*
 * BEWUSST NICHT VORHANDEN: eine Funktion, die zählt, WIE VIELE Mandanten Entscheidungen tragen.
 *
 * Eine solche Zahl wäre eine Aussage über FREMDE Mandanten und damit ein Bruch der
 * Mandantengrenze – auch dann, wenn kein fremder Name im DOM steht: der Leerzustand eines
 * Mandanten verriete, dass ein anderer Mandant Entscheidungen führt. Die Mandantengrenze ist
 * eine Sicherheitsgrenze (Dok. 07, „Mandantenfähigkeit, Rechte und Datenschutz"), keine
 * Anzeigekonvention. Der Leerzustand ist deshalb rein mandantenlokal formuliert (Review-Fix;
 * dies war die einzige mandantenübergreifende Zählung im Produkt).
 */

/* -----------------------------------------------------------------------------
 * Ehrlichkeitsblock: Decision Card (Dok. 10 §9.1) gegen den Objektvertrag (Dok. 07 §7)
 * --------------------------------------------------------------------------- */

/**
 * Deckungsgrad eines Decision-Card-Pflichtfelds im heutigen Modell.
 *  - `teilweise`: es gibt einen Träger, aber er leistet weniger als das Pflichtfeld verlangt,
 *  - `kein Träger`: weder Objekt-Envelope noch Kanten-Envelope kennen ein solches Feld.
 */
export type FieldCoverage = 'teilweise' | 'kein Träger';

export interface DecisionCardField {
  /** Feldname wörtlich aus Dok. 10 §9.1 (Reihenfolge der Tabelle dort). */
  readonly field: string;
  readonly coverage: FieldCoverage;
  /** Heutiger Träger bzw. – bei `kein Träger` – die Aussage, was fehlt. */
  readonly carrier: string;
}

/**
 * Die 14 Pflichtfelder der Decision Card (Dok. 10 §9.1) mit ihrem heutigen Träger im
 * kanonischen Objekt-/Beziehungsvertrag (Dok. 07 §7/§9).
 *
 * Diese Liste ist eine Aussage über den HEUTIGEN Vertrag, kein Zeitplan. Sie wird im Produkt
 * feldweise gezeigt (Dok. 06 §17 *Partial data*, Dok. 10 §24.4 „Datenlücke statt falscher
 * Sicherheit") und im Test gegen `packages/contracts` festgenagelt: entsteht für eines der als
 * „kein Träger" benannten Felder ein Vertragsfeld, wird der Test rot statt der Text still falsch.
 *
 * // OFFENE FRAGE O-WP017-02: Dass die Mehrheit dieser Pflichtfelder im Objektvertrag keinen
 * // Träger hat, ist eine Konzeptlücke (Envelope-Erweiterung, eigener Objekttyp „Decision Card"
 * // oder Moduldaten außerhalb des Zwillings?). Hier wird nichts erfunden und nichts umgedeutet.
 * // OFFENE FRAGE (Zählung): Dok. 10 §9.1 führt 14 Zeilen; die Zuordnung „teilweise" vs. „kein
 * // Träger" ist die Auswertung dieses Work Packages gegen Dok. 07 §7. Die im Produkt gezeigten
 * // Anzahlen werden deshalb AUS DIESER LISTE gezählt und nirgends als Konstante geschrieben.
 */
export const DECISION_CARD_FIELDS: readonly DecisionCardField[] = [
  {
    field: 'Entscheidungsfrage',
    coverage: 'teilweise',
    carrier:
      'Träger ist der Objektname. Ein typisiertes Frageobjekt mit belegter Wahlmöglichkeit kennt ' +
      'das Datenmodell nicht.',
  },
  {
    field: 'Zielbezug',
    coverage: 'teilweise',
    carrier:
      'Träger ist die Beziehung „entschieden in" auf ein Risiko oder einen Managed Service. Ein ' +
      'Bezug auf ein Zielprofil ist damit nicht belegt.',
  },
  {
    field: 'Auslöser',
    coverage: 'kein Träger',
    carrier:
      'Kein Feld und keine eigene Beziehung. Ob die Beziehung „entschieden in" den Zielbezug oder ' +
      'den Auslöser abbildet, ist im Konzept nicht entschieden; die Beziehung wird deshalb neutral ' +
      'als Bezug gezeigt und nicht als Auslöser ausgegeben.',
  },
  {
    field: 'Baseline',
    coverage: 'kein Träger',
    carrier:
      'Kein Feld für die erwartete Entwicklung ohne neue Entscheidung – weder am Objekt noch ' +
      'an der Beziehung.',
  },
  {
    // Feldname wörtlich „Optionen"; die Bedeutung („mindestens eine realistische
    // Handlungsalternative und Nichtstun") steht im Trägertext, nicht im Namen (Review-Fix).
    field: 'Optionen',
    coverage: 'kein Träger',
    carrier:
      'Kein Feld und kein Objekttyp für Handlungsalternativen – auch nicht für das Nichtstun, ' +
      'das die Pflichtangabe ausdrücklich einschließt. Eine Handlungsalternative wäre hier frei ' +
      'erfunden, kein Datenbestand.',
  },
  {
    // Review-Pass (Domain-Finding): von „kein Träger" auf „teilweise" gehoben – der VERTRAG
    // kennt die Wirkungsannahme an Beziehungen, und der Datenbestand nutzt sie (an
    // Service-Beziehungen); damit konsistent zum Trust-Layer-Abgleich („Annahmen": teilweise).
    // // CCP-004-VORBEHALT: `effectiveness_assumption` ist nicht PDF-gedeckt (Change Proposal
    // // offen). Fällt die Entscheidung auf „Feld entfernen", fällt dieses Feld auf
    // // „kein Träger" zurück – dieser Eintrag ist dann mitzupflegen.
    field: 'Wirkung',
    coverage: 'teilweise',
    carrier:
      'Teil-Träger ist die Wirkungsannahme der Beziehung – im technischen Vertrag vorhanden (die ' +
      'Konzept- und PDF-Deckung ist noch offen) und im Datenbestand an Service-Beziehungen ' +
      'erfasst; die Entscheidungs-Beziehungen dieses Datenbestands tragen sie nicht. Ein eigenes ' +
      'Feld für erwartete Wirkung auf Risiko, Ziel, Service oder Zeit gibt es nicht.',
  },
  {
    field: 'Ressourcen',
    coverage: 'kein Träger',
    carrier:
      'Kein Feld für Aufwand, Kapazität oder Skills. Geldangaben sind im Demo-Datenbestand ' +
      'ausdrücklich ausgeschlossen und werden hier auch nicht ersatzweise geschätzt.',
  },
  {
    field: 'Abhängigkeiten',
    coverage: 'kein Träger',
    carrier:
      'Keine Beziehung zwischen zwei Entscheidungen außer der Ablösung. Eine Voraussetzung ' +
      'zwischen Entscheidungen ist im kanonischen Beziehungskatalog nicht vorgesehen.',
  },
  {
    field: 'Confidence',
    coverage: 'teilweise',
    carrier:
      'Träger ist der Vertrauensgrad der BEZIEHUNG. Am Objekt selbst gibt es kein solches Feld; ' +
      'die Datenqualität wird als Dimensionen geführt und hier unverrechnet gezeigt.',
  },
  {
    field: 'Empfehlung',
    coverage: 'kein Träger',
    carrier:
      'Kein Feld – und in dieser read-only Sicht auch bewusst kein abgeleiteter Vorschlag: eine ' +
      'Empfehlung wäre hier eine Behauptung ohne Datengrundlage.',
  },
  {
    field: 'Owner und Approver',
    coverage: 'teilweise',
    carrier:
      'Träger ist die Owner-Angabe (fachlich/technisch) zusammen mit der Beziehung ' +
      '„verantwortet". Eine freigabeberechtigte Rolle (Approver) kennt das Modell nicht; ' +
      'Verantwortung wird hier nicht zu einer Freigabe umgedeutet.',
  },
  {
    field: 'Frist',
    coverage: 'kein Träger',
    carrier:
      'Kein Feld für einen spätesten sinnvollen Entscheidungszeitpunkt. Die beiden erfassten ' +
      'Zeitachsen sind fachliche Gültigkeit und Systemerfassung – beides ist keine Fälligkeit.',
  },
  {
    field: 'Outcome Check',
    coverage: 'kein Träger',
    carrier:
      'Kein Feld dafür, wie und wann die Wirkung überprüft wird, und keine Beziehung auf ein ' +
      'Ergebnis der Überprüfung.',
  },
  {
    field: 'Provenance',
    coverage: 'teilweise',
    carrier:
      'Träger sind Quellreferenzen, die Herkunft der Aussage an der Beziehung und die ' +
      'Datenqualität. Eine Methoden- oder Szenarioversion ist nicht erfasst.',
  },
];

/** Anzahl der Pflichtfelder mit dem angegebenen Deckungsgrad – gezählt, nicht geschrieben. */
export function countDecisionCardFields(coverage: FieldCoverage): number {
  return DECISION_CARD_FIELDS.filter((f) => f.coverage === coverage).length;
}

/** Anzahl je Deckungsgrad für eine BELIEBIGE Feldliste – gezählt, nie geschrieben. */
export function countFields(fields: readonly DecisionCardField[], coverage: FieldCoverage): number {
  return fields.filter((f) => f.coverage === coverage).length;
}

/* -----------------------------------------------------------------------------
 * Die ZWEITE Pflichtfeldliste: Dok. 06 „Decision Card – Pflichtfelder"
 * (WP-020 Slice 5; O-WP017-11 – der Widerspruch beider Listen bleibt OFFEN)
 * --------------------------------------------------------------------------- */

/**
 * QUELLE (Regel Null, am PDF gegengelesen): Dok. 06, Abschnitt „Collaboration, Entscheidungen
 * & Freigaben", Liste „Decision Card – Pflichtfelder" – ACHT Felder, wörtlich:
 * Entscheidungsfrage und Frist · Optionen einschließlich Nichtstun · Business-/Zielwirkung und
 * Risiken · Kosten-, Zeit- und Kapazitätsannahmen · Datenquellen, Lücken und Vertrauensgrad ·
 * Empfehlung und Gegenargument · Entscheider, Vertretung und Freigabestufe · Review-Datum und
 * Erfolgskriterium.
 *
 * // OFFENE FRAGE O-WP017-11 (bestehend, hier NICHT entschieden): Dok. 06 (8 Felder) und
 * // Dok. 10 §9.1 (14 Felder) beschreiben dieselbe Decision Card mit ZWEI verschiedenen
 * // Pflichtfeldlisten, die sich weder in Zählung noch Zuschnitt decken. Welche Liste
 * // kanonisch ist, entscheidet der Concept Author – diese Datei zeigt den Abgleich gegen
 * // BEIDE und erklärt keine zur Wahrheit.
 *
 * Deckungsgrade sind dieselbe Auswertung gegen Dok. 07 wie bei der Dok.-10-Liste oben
 * (gebündelte Felder gelten als `teilweise`, wenn mindestens ein Teil einen Träger hat und
 * mindestens ein Teil keinen – der Trägertext benennt beides). Feldnamen wörtlich aus dem PDF;
 * die Trägertexte vermeiden bewusst Geld-Vokabular (Wächter der Seite).
 */
export const DECISION_CARD_FIELDS_DOK06: readonly DecisionCardField[] = [
  {
    field: 'Entscheidungsfrage und Frist',
    coverage: 'teilweise',
    carrier:
      'Träger der Entscheidungsfrage ist der Objektname. Für eine Frist gibt es kein Feld – die ' +
      'beiden erfassten Zeitachsen (fachliche Gültigkeit, Systemerfassung) sind keine Fälligkeit.',
  },
  {
    field: 'Optionen einschließlich Nichtstun',
    coverage: 'kein Träger',
    carrier:
      'Kein Feld und kein Objekttyp für Handlungsalternativen – auch nicht für das Nichtstun. ' +
      'Dieselbe Lücke führt die Dok.-10-Liste oben als „Optionen".',
  },
  {
    field: 'Business-/Zielwirkung und Risiken',
    coverage: 'teilweise',
    carrier:
      'Träger des Risiko-Bezugs ist die Beziehung „entschieden in" auf ein Risiko bzw. einen ' +
      'Managed Service. Ein Feld für eine Business- oder Zielwirkung gibt es nicht.',
  },
  {
    field: 'Kosten-, Zeit- und Kapazitätsannahmen',
    coverage: 'kein Träger',
    carrier:
      'Kein Feld für Zeit- oder Kapazitätsannahmen; Geldangaben sind im Demo-Datenbestand ' +
      'ausdrücklich ausgeschlossen und werden auch nicht ersatzweise geschätzt.',
  },
  {
    field: 'Datenquellen, Lücken und Vertrauensgrad',
    coverage: 'teilweise',
    carrier:
      'Träger sind die Quellreferenzen, die Datenqualitäts-Dimensionen und der Vertrauensgrad ' +
      'der Beziehung. Eine Lücken-Aufstellung je Entscheidung gibt es nicht.',
  },
  {
    field: 'Empfehlung und Gegenargument',
    coverage: 'kein Träger',
    carrier:
      'Kein Feld – und in dieser read-only Sicht auch bewusst kein abgeleiteter Vorschlag; ' +
      'ein Gegenargument hätte ebenfalls keinen Träger.',
  },
  {
    field: 'Entscheider, Vertretung und Freigabestufe',
    coverage: 'teilweise',
    carrier:
      'Träger der Verantwortung sind die Owner-Angabe und die Beziehung „verantwortet". Für die ' +
      'Vertretung gibt es keinen typisierten Träger an der Entscheidung: der Objekttyp Vertretung ' +
      'existiert im Katalog, aber ohne kanonische Kante zur Entscheidung. Eine Freigabestufe ' +
      'kennt das Modell nicht – Verantwortung wird nicht zu einer Freigabe umgedeutet.',
  },
  {
    field: 'Review-Datum und Erfolgskriterium',
    coverage: 'kein Träger',
    carrier:
      'Kein Feld für einen Zeitpunkt der Überprüfung und keines für ein Erfolgskriterium; ' +
      'dieselbe Lücke führt die erste Liste als „Outcome Check" bzw. der Decision Record als ' +
      '„Reviewtermin".',
  },
];

/* -----------------------------------------------------------------------------
 * Zweite, EIGENSTÄNDIGE Feldliste: der Decision Record selbst
 * --------------------------------------------------------------------------- */

/**
 * Dok. 10, Abschnitt „Decision Cards" (Unterabschnitt „Decision Record", §9.2) definiert den
 * Decision Record NICHT als Kurzform der Card, sondern mit einer EIGENEN Inhaltsliste:
 *
 *   „Nach Freigabe wird die Karte zum unveränderbaren Decision Record. Korrekturen erfolgen als
 *    neue Version oder Nachtrag. Festgehalten werden Option, Begründung, Freigabe, Bedingungen,
 *    erwartete Wirkung, Reviewtermin und spätere Ist-Wirkung."
 *
 * Diese sieben Inhalte kommen zu den 14 Card-Pflichtfeldern HINZU und werden deshalb getrennt
 * geführt – gezählt werden sie nicht zusammen, sonst entstünde eine erfundene Gesamtzahl.
 *
 * Der zweite Satz trägt außerdem das Korrekturmodell: unveränderbar, Korrektur als neue Version
 * oder Nachtrag. Genau das bildet die Ablösekette (R24) im Datenbestand ab – zwei eigenständige,
 * historisch sichtbare Stände statt einer Überschreibung (vgl. Entscheidung 07-D06,
 * „Freigegebene historische Zustände werden nicht überschrieben").
 *
 * // OFFENE FRAGE O-WP017-07 (bestehend): Ob „neue Version" die Datensatzversion oder die
 * // fachliche Ablösung meint, sagt das Konzept nicht. Hier wird nichts entschieden.
 */
export const DECISION_RECORD_CONTENTS: readonly DecisionCardField[] = [
  {
    field: 'Option',
    coverage: 'kein Träger',
    carrier:
      'Kein Feld für die gewählte Handlungsalternative. Der Objektname trägt die ' +
      'Entscheidungsfrage, nicht die gewählte Antwort.',
  },
  {
    field: 'Begründung',
    coverage: 'kein Träger',
    carrier:
      'Kein typisiertes Begründungsfeld. Der freie Beschreibungstext trägt Gegenstand und ' +
      'Kontext der Entscheidung und wird hier nicht zu einer Begründung umgedeutet.',
  },
  {
    field: 'Freigabe',
    coverage: 'kein Träger',
    carrier:
      'Kein Feld für eine erteilte Freigabe, keinen Freigebenden und keinen Freigabezeitpunkt. ' +
      'Der Lebenszyklus-Stand eines Datensatzes ist ausdrücklich kein Freigabeergebnis.',
  },
  {
    field: 'Bedingungen',
    coverage: 'kein Träger',
    carrier: 'Kein Feld für Auflagen oder Vorbehalte, unter denen die Entscheidung gilt.',
  },
  {
    field: 'erwartete Wirkung',
    coverage: 'kein Träger',
    carrier:
      'Kein Feld am Objekt. Dieselbe Lücke ist oben schon als Card-Pflichtfeld „Wirkung" ' +
      'benannt – der Decision Record führt sie eigenständig auf.',
  },
  {
    field: 'Reviewtermin',
    coverage: 'kein Träger',
    carrier:
      'Kein Feld für einen Zeitpunkt der Überprüfung. Die beiden erfassten Zeitachsen sind ' +
      'fachliche Gültigkeit und Systemerfassung.',
  },
  {
    field: 'spätere Ist-Wirkung',
    coverage: 'kein Träger',
    carrier:
      'Kein Feld für die tatsächlich eingetretene Wirkung und keine Beziehung auf ein ' +
      'Ergebnis ihrer Messung.',
  },
];
