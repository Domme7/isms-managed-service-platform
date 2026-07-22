/**
 * View-Daten der Objekt-360-Detailseite (WP-014 Slice 1, read-only).
 *
 * Reine, deterministische Ableitung EINES Objekts aus `@isms/demo-seed` (statischer Import,
 * kein Fetch/keine DB) entlang der fünf Fragen der universellen Seitenanatomie
 * (Dok. 06 §6 / Dok. 07 §10 Objekt-360- und Navigationsvertrag):
 *
 *   (1) Was ist das?              -> Identität, Typ + Objektfamilie, Lebenszyklus, Klassifikation,
 *                                    Beschreibung, Scope, Owner, Objekt-ID
 *   (2) Warum ist es wichtig?     -> Klassifikation/Schutzbedarf + BELEGTE Bezüge zu Risiken/Zielen
 *   (3) Womit hängt es zusammen?  -> eingehende und ausgehende Kanten GETRENNT, je mit Typ,
 *                                    Richtung, Herkunft der Aussage, Vertrauensgrad, Kantenstatus
 *                                    und fachlicher Gültigkeit
 *   (4) Wie entwickelt es sich?   -> valid_time und record_time als GETRENNTE Achsen, Version,
 *                                    Datenqualitäts-Dimensionen, Herkunft, abgeleitete Historie
 *   (5) Was als Nächstes?         -> ausschließlich belegte Verweise aus dem Graphen, als
 *                                    Beobachtung mit Quelle formuliert
 *
 * VERBINDLICHE GRENZEN (WP-014 Nicht-Ziele, Dok. 09/10 sind spätere WPs):
 * KEIN Scoring, KEIN Reifegrad, KEINE Kritikalitätsberechnung, KEIN verdichteter
 * Vertrauensindikator (Dok. 07 §12/D10), KEINE Empfehlung, KEIN Upselling (Dok. 13 MS15) und
 * KEINE erfundene Historie. Es wird ausschließlich gerendert, was als Feld oder Kante im Seed
 * steht; Lücken werden benannt statt gefüllt (Dok. 07 §21 „Datenlücken werden nicht still
 * verborgen").
 *
 * MANDANTENTRENNUNG (Sicherheitsgrenze, Dok. 07 §17/P09): jede Auflösung arbeitet strikt
 * innerhalb EINES Mandanten. Ein Objekt, dessen `tenant_id` nicht der Route entspricht, gilt als
 * NICHT EXISTENT – `buildObjectDetail` liefert dann `undefined`, exakt wie bei einer unbekannten
 * ID (keine abweichende Aussage, keine Counts, keine fremden Namen).
 *
 * Diese Helfer sind bewusst frei von React/Next, damit sie deterministisch testbar sind
 * (Muster aus `lib/twin/data.ts`, `lib/isms/data.ts`, `lib/services/data.ts`).
 *
 * // OFFENE FRAGE O-WP014-01: Dok. 07 §10 nennt „Kritikalität" als Pflichtinhalt der
 * // Objektseite, der Objektvertrag (§7, `packages/contracts/src/object.ts`) kennt jedoch KEIN
 * // Kritikalitätsfeld; F03 enthält zwar den Objekttyp „Kritikalität", der Seed materialisiert
 * // aber kein solches Objekt. Angezeigt wird deshalb ausschließlich die belegte
 * // `classification` (Vertraulichkeit/Schutzbedarf). Es wird KEINE Kritikalität abgeleitet,
 * // berechnet oder erfunden.
 *
 * // OFFENE FRAGE O-WP014-02: Dok. 06 §6 verlangt „Vertrauensgrad" querschnittlich sichtbar.
 * // Für ein OBJEKT existiert im Seed kein Vertrauensgrad: `quality_state.confidence_indicator`
 * // ist nicht gesetzt und darf in diesem WP auch nicht berechnet werden (Dok. 07 D10 erlaubt
 * // ihn, WP-014 baut ihn ausdrücklich NICHT). Angezeigt wird daher die belegte Dimension
 * // „Bestätigung" (Dok. 07 §12) – die einzige Dimension mit kanonischer Werteskala. Kanten
 * // tragen dagegen ein echtes `confidence` und werden über `confidenceQualitative` gezeigt.
 *
 * // OFFENE FRAGE O-WP014-03: `scope_ids` verweist im Seed auf Scope-Kennungen
 * // (z. B. `scope-nordwerk-isms-core`), die NICHT als eigene Seed-Objekte (Objekttyp
 * // „ISMS-Scope", F01) materialisiert sind. Die Scope-Zuordnung bleibt deshalb bewusst eine
 * // sichtbare rohe ID (Fail-loud) statt eines erfundenen Klartextnamens.
 */

import {
  OBJECT_FAMILIES,
  type ObjectEnvelope,
  type ObjectFamilyId,
  type ObjectType,
  type QualityDimensionAssessment,
  type RelationshipEnvelope,
  type RelationshipType,
  type SourceRef,
} from '@isms/contracts';
import { DEMO_SEED, type DemoTenant } from '@isms/demo-seed';
import {
  confidenceQualitative,
  familyForType,
  getObjectsForTenant,
  getRelationshipsForTenant,
  getTenant,
  relationshipTypeId,
  relationshipTypeLabel,
} from './data';

/* -----------------------------------------------------------------------------
 * Kanten aus Sicht EINES Objekts
 * --------------------------------------------------------------------------- */

/** Blickrichtung der Kante aus Sicht des betrachteten Objekts. */
export type EdgeOrientation = 'ausgehend' | 'eingehend';

/**
 * Eine Kante, aufgelöst auf das Nachbarobjekt. Trägt alles, was Dok. 07 §21 für eine sichtbare
 * Beziehung verlangt: Typ (kanonisch + Klartext + R-ID), Richtung, fachliche Gültigkeit und
 * Herkunft der Aussage (`assertion_kind`); zusätzlich – falls belegt – Vertrauensgrad,
 * Kantenstatus und Wirkungsannahme.
 */
export interface ObjectEdge {
  readonly relationship_id: string;
  /** Kanonischer Kantentyp (snake_case, Dok. 07 §9). */
  readonly relationship_type: string;
  /** Kanonische R-ID (z. B. „R07"), falls im Vokabular vorhanden. */
  readonly relationship_type_id?: string;
  /** Deutsches UI-Label (reine Präsentationsschicht), falls gemappt. */
  readonly relationship_type_label?: string;
  /** Ist das betrachtete Objekt Quelle („ausgehend") oder Ziel („eingehend")? */
  readonly orientation: EdgeOrientation;
  /** Richtungsangabe der Kante selbst (gerichtet | ungerichtet, Dok. 07 §9). */
  readonly direction: string;
  /** Nachbarobjekt – trägt die `object_id` für den Link auf dessen Detailseite. */
  readonly neighbor_id: string;
  readonly neighbor_name: string;
  readonly neighbor_type: string;
  readonly neighbor_lifecycle_status?: string;
  /** `false`, wenn der Endpunkt im Mandanten nicht auflösbar war (dann ist `neighbor_name` die rohe ID). */
  readonly neighbor_resolved: boolean;
  readonly assertion_kind: string;
  /** Qualitativ + Wert (z. B. „mittel (0,7)"), falls die Kante einen Vertrauensgrad trägt. */
  readonly confidence_display?: string;
  /**
   * Kantenstatus aus dem Seed (z. B. „geprüft", „im Serviceumfang", „Voraussetzung erfüllt");
   * wertoffen laut Contract. Die UI beschriftet ihn deshalb neutral als „Status der Beziehung" –
   * nicht als „Prüfstand", weil der Wert im Seed keine Prüfaussage sein muss (Review-Fix).
   */
  readonly edge_status?: string;
  /** Fachliche Gültigkeit der Kante (getrennt von der Systemerfassung). */
  readonly valid_from: string;
  readonly valid_to?: string | null;
  readonly effectiveness_assumption?: string;
}

/* -----------------------------------------------------------------------------
 * (1) Was ist das?
 * --------------------------------------------------------------------------- */

/** Owner-Referenz, gegen Seed-Objekte DESSELBEN Mandanten aufgelöst (fail-loud: rohe ID). */
export interface ResolvedOwner {
  readonly owner_id: string;
  readonly name: string;
  readonly resolved: boolean;
  readonly owner_kind: string;
  readonly role?: string;
  readonly valid_from?: string;
  readonly valid_to?: string | null;
}

/** Scope-Zuordnung mit expliziter Gültigkeit (Dok. 07 §7). */
export interface ResolvedScope {
  readonly scope_id: string;
  readonly name: string;
  readonly resolved: boolean;
  readonly valid_from?: string;
  readonly valid_to?: string | null;
}

export interface ObjectIdentity {
  readonly object_id: string;
  readonly object_type: string;
  readonly family_id?: ObjectFamilyId;
  readonly family_name?: string;
  readonly family_leitfrage?: string;
  readonly lifecycle_status: string;
  readonly description?: string;
  readonly confidentiality?: string;
  readonly protection_need?: string;
  readonly has_classification: boolean;
  readonly scopes: readonly ResolvedScope[];
  readonly owners: readonly ResolvedOwner[];
}

/* -----------------------------------------------------------------------------
 * (2) Warum ist es wichtig?
 * --------------------------------------------------------------------------- */

/**
 * Kantentypen, über die ein Objekt im kanonischen Modell mit Risiken und Zielen verbunden ist
 * (Dok. 07 §9): R10 affects, R09 threatens, R08 exposes, R12 mitigates, R20 contributes_to,
 * R19 requires. Beide Richtungen werden berücksichtigt, da die Kantenrichtung der Semantik des
 * Typs folgt, nicht der Leserichtung.
 *
 * `satisfies readonly RelationshipType[]` koppelt die Liste hart an das kanonische Vokabular
 * (`packages/contracts/src/vocabularies.ts`): ein Tippfehler bricht den Typecheck, statt die
 * Filterung still leerlaufen zu lassen (Review-Fix).
 */
export const IMPORTANCE_EDGE_TYPES = [
  'affects',
  'threatens',
  'exposes',
  'mitigates',
  'contributes_to',
  'requires',
] as const satisfies readonly RelationshipType[];

export interface ObjectImportance {
  readonly confidentiality?: string;
  readonly protection_need?: string;
  readonly has_classification: boolean;
  /** Belegte Bezüge zu Risiken/Zielen – OHNE Gewichtung, Reihenfolge = Seed-Reihenfolge. */
  readonly edges: readonly ObjectEdge[];
}

/* -----------------------------------------------------------------------------
 * (3) Womit hängt es zusammen?
 * --------------------------------------------------------------------------- */

export interface ObjectConnections {
  /** Kanten, bei denen dieses Objekt `source_id` ist. */
  readonly outgoing: readonly ObjectEdge[];
  /** Kanten, bei denen dieses Objekt `target_id` ist. */
  readonly incoming: readonly ObjectEdge[];
}

/* -----------------------------------------------------------------------------
 * (4) Wie entwickelt es sich?
 * --------------------------------------------------------------------------- */

/**
 * Historienlage, AUS DEN DATEN abgeleitet (nicht hartkodiert): eine Historie gilt nur dann als
 * belegt, wenn der Envelope eine Vorgängerversion (`version > 1`) oder einen
 * Ersetzungszeitpunkt (`record_time.replaced_at`) trägt oder eine `supersedes`-Kante (R24)
 * existiert. Trifft nichts davon zu, ist das eine echte Datenlücke – und wird als solche
 * ausgegeben, statt einen Verlauf zu konstruieren.
 */
export interface ObjectHistoryState {
  readonly version: number;
  readonly has_previous_version: boolean;
  readonly replaced_at?: string | null;
  readonly has_replacement_record: boolean;
  /** R24: dieses Objekt löst ein anderes ab (ausgehende supersedes-Kanten). */
  readonly supersedes: readonly ObjectEdge[];
  /** R24: dieses Objekt wird abgelöst (eingehende supersedes-Kanten). */
  readonly superseded_by: readonly ObjectEdge[];
  /** `true`, sobald eine der obigen Quellen eine Historie belegt. */
  readonly has_history: boolean;
}

export interface ObjectEvolution {
  /** Fachliche Gültigkeit (valid_time) – niemals mit der Systemerfassung vermischen. */
  readonly valid_from: string;
  readonly valid_to?: string | null;
  /** Systemerfassung (record_time) – eigene Zeitachse (Dok. 07 §11/D07). */
  readonly recorded_at: string;
  readonly replaced_at?: string | null;
  readonly version: number;
  readonly quality_dimensions: readonly QualityDimensionAssessment[];
  readonly source_refs: readonly SourceRef[];
  /**
   * Belegte Bestätigungsstufe aus `quality_state` (Dok. 07 §12) – gelesen, NICHT berechnet
   * (siehe OFFENE FRAGE O-WP014-02).
   */
  readonly confirmation_level?: string;
  readonly history: ObjectHistoryState;
}

/* -----------------------------------------------------------------------------
 * (5) Was als Nächstes?
 * --------------------------------------------------------------------------- */

/**
 * Art der Beobachtung. Es sind ausschließlich BELEGTE Verweise (bzw. eine belegbare
 * Nicht-Existenz) – bewusst keine Empfehlung, kein Vorschlag, keine Priorisierung.
 *
 * `service` und `deckung` sind dieselbe Kante (R22 covered_by) aus den beiden möglichen
 * Blickrichtungen: `service` = dieses Objekt liegt im Umfang eines Managed Service (ausgehend),
 * `deckung` = dieses Objekt deckt ein anderes Objekt im Serviceumfang ab (eingehend). Ohne die
 * zweite Richtung blieben die Serviceseiten hier leer, obwohl der Seed die Kanten trägt
 * (Review-Fix). Beides ist eine Seed-Aussage, kein Angebot.
 */
export type NextObservationKind =
  | 'massnahme'
  | 'service'
  | 'deckung'
  | 'nachweis'
  | 'ohne_nachweis';

/**
 * Objekttypen, die laut Dok. 07 §9 R15 überhaupt Ziel einer `evidences`-Kante sein können –
 * nur für sie ist ein FEHLENDER Nachweisbezug eine belegbare Beobachtung. R15 lautet:
 * „evidences | Evidence -> Control/Measure/Decision" (Dok. 07 §9 Zeile R15,
 * `packages/contracts/src/vocabularies.ts` R15). Die kanonische Schreibweise der Typen stammt
 * aus demselben Vokabular (F06 „Control", F08 „Measure", F09 „Decision Record").
 *
 * EHRLICHE EINORDNUNG (keine stille Auflösung, `.claude/rules/docs.md`): „Evidence ->
 * Control/Measure/Decision" steht in Dok. 07 §9 in der BEISPIEL-Spalte, und das Projekt hat
 * diese Spalte in WP-012 (OFFENE FRAGE O-WP012-06) bewusst als NICHT abschließend behandelt.
 * Hier wird sie trotzdem als Einschränkung genutzt, weil die Alternative – die Beobachtung
 * „Kein Nachweis verweist auf dieses Objekt." für JEDEN Objekttyp – eine Erwartung behauptet,
 * die das Modell für Organisation, Rolle, SLA, KPI, Objective oder Managed Service nirgends
 * belegt. Das ist eine reine, reversible ANZEIGE-Entscheidung: sie ändert weder Seed noch
 * Contract und unterdrückt keinen belegten Nachweis (vorhandene `evidences`-Kanten werden
 * unabhängig vom Objekttyp weiterhin als Beobachtung gezeigt).
 *
 * „Control Implementation" (F06) ist bewusst NICHT enthalten: R15 nennt „Control", und der
 * eigene Objekttyp der Umsetzung wird hier nicht stillschweigend mitgemeint.
 *
 * `satisfies readonly ObjectType[]` koppelt die Liste hart an den Objekttyp-Katalog: eine
 * abweichende Schreibweise bricht den Typecheck, statt die Beobachtung still abzuschalten
 * (Review-Fix; „Decision Record" ist im Demo-Seed nicht materialisiert und wäre sonst von
 * keinem Test gedeckt).
 */
export const EVIDENCE_TARGET_TYPES = [
  'Control',
  'Measure',
  'Decision Record',
] as const satisfies readonly ObjectType[];

export interface NextObservation {
  readonly kind: NextObservationKind;
  /** Beleg-Kante (fehlt nur bei `ohne_nachweis` – dort ist die Abwesenheit der Beleg). */
  readonly relationship_id?: string;
  readonly relationship_type?: string;
  readonly object_id?: string;
  readonly name?: string;
  readonly object_type?: string;
  readonly lifecycle_status?: string;
}

/* -----------------------------------------------------------------------------
 * Aggregiertes View-Modell der Objekt-Detailseite
 * --------------------------------------------------------------------------- */

export interface ObjectDetailModel {
  readonly tenant: DemoTenant;
  readonly object: ObjectEnvelope;
  readonly identity: ObjectIdentity;
  readonly importance: ObjectImportance;
  readonly connections: ObjectConnections;
  readonly evolution: ObjectEvolution;
  readonly next_observations: readonly NextObservation[];
}

/* -----------------------------------------------------------------------------
 * Auflösung (strikt innerhalb eines Mandanten)
 * --------------------------------------------------------------------------- */

/**
 * Ein Objekt innerhalb EINES Mandanten. Ein Objekt eines anderen Mandanten liefert
 * `undefined` – identisch zur unbekannten ID (keine Existenzaussage, Dok. 07 §17).
 */
export function getObjectForTenant(tenantId: string, objectId: string): ObjectEnvelope | undefined {
  return getObjectsForTenant(tenantId).find((o) => o.object_id === objectId);
}

/**
 * Alle (Mandant, Objekt)-Paare des Seeds für `generateStaticParams`. Aus dem Seed abgeleitet,
 * damit neue Objekte automatisch eine Detailseite erhalten.
 */
export function getObjectRouteParams(): { tenantId: string; objectId: string }[] {
  return DEMO_SEED.objects.map((o) => ({ tenantId: o.tenant_id, objectId: o.object_id }));
}

/**
 * Baut eine Kante aus Sicht des betrachteten Objekts. Der Endpunkt wird über die Objekte
 * DESSELBEN Mandanten aufgelöst; fehlt er (unerwartet – die Seed-Integritätstests schließen
 * Dangling-Kanten aus), fällt der Name bewusst auf die rohe ID zurück und `neighbor_resolved`
 * wird `false`, damit die Lücke sichtbar wird statt still zu verschwinden (Fail-loud-Muster
 * aus `resolveRelationships` in `lib/twin/data.ts`).
 */
function toEdge(
  rel: RelationshipEnvelope,
  orientation: EdgeOrientation,
  byId: ReadonlyMap<string, ObjectEnvelope>,
): ObjectEdge {
  const neighborId = orientation === 'ausgehend' ? rel.target_id : rel.source_id;
  const neighbor = byId.get(neighborId);
  return {
    relationship_id: rel.relationship_id,
    relationship_type: rel.relationship_type,
    relationship_type_id: relationshipTypeId(rel.relationship_type),
    relationship_type_label: relationshipTypeLabel(rel.relationship_type),
    orientation,
    direction: rel.direction,
    neighbor_id: neighborId,
    neighbor_name: neighbor?.display_name ?? neighborId,
    neighbor_type: neighbor?.object_type ?? 'unbekannt',
    neighbor_lifecycle_status: neighbor?.lifecycle_status,
    neighbor_resolved: neighbor !== undefined,
    assertion_kind: rel.assertion_kind,
    confidence_display:
      typeof rel.confidence === 'number' ? confidenceQualitative(rel.confidence).display : undefined,
    edge_status: rel.status,
    valid_from: rel.valid_time.from,
    valid_to: rel.valid_time.to,
    effectiveness_assumption: rel.effectiveness_assumption,
  };
}

/** (1) Identität, Scope und Verantwortung – ausschließlich belegte Envelope-Felder. */
function buildIdentity(
  object: ObjectEnvelope,
  byId: ReadonlyMap<string, ObjectEnvelope>,
): ObjectIdentity {
  const familyId = familyForType(object.object_type);
  const family = familyId ? OBJECT_FAMILIES[familyId] : undefined;
  const { confidentiality, protection_need } = object.classification;

  return {
    object_id: object.object_id,
    object_type: object.object_type,
    family_id: familyId,
    family_name: family?.name,
    family_leitfrage: family?.leitfrage,
    lifecycle_status: object.lifecycle_status,
    description: object.description,
    confidentiality,
    protection_need,
    has_classification: Boolean(confidentiality || protection_need),
    scopes: object.scope_ids.map((scope) => {
      // Scopes sind im Seed nicht als Objekte materialisiert (O-WP014-03) – die Auflösung
      // wird trotzdem versucht, damit sie automatisch greift, sobald es Scope-Objekte gibt.
      const scopeObject = byId.get(scope.scope_id);
      return {
        scope_id: scope.scope_id,
        name: scopeObject?.display_name ?? scope.scope_id,
        resolved: scopeObject !== undefined,
        valid_from: scope.valid_time?.from,
        valid_to: scope.valid_time?.to,
      };
    }),
    owners: object.owner_ids.map((owner) => {
      const ownerObject = byId.get(owner.owner_id);
      return {
        owner_id: owner.owner_id,
        name: ownerObject?.display_name ?? owner.owner_id,
        resolved: ownerObject !== undefined,
        owner_kind: owner.owner_kind,
        role: owner.role,
        valid_from: owner.valid_time?.from,
        valid_to: owner.valid_time?.to,
      };
    }),
  };
}

/** (5) Belegte Verweise als Beobachtung mit Quelle – ohne jede Empfehlung. */
function buildNextObservations(
  objectType: string,
  outgoing: readonly ObjectEdge[],
  incoming: readonly ObjectEdge[],
): NextObservation[] {
  const observations: NextObservation[] = [];

  // Verknüpfte Maßnahmen: Nachbar vom Objekttyp „Measure" über remediates (R18) oder
  // mitigates (R12) – in beide Richtungen, da die Kantenrichtung der Typsemantik folgt.
  for (const edge of [...outgoing, ...incoming]) {
    if (edge.neighbor_type !== 'Measure') continue;
    if (edge.relationship_type !== 'remediates' && edge.relationship_type !== 'mitigates') continue;
    observations.push({
      kind: 'massnahme',
      relationship_id: edge.relationship_id,
      relationship_type: edge.relationship_type,
      object_id: edge.neighbor_id,
      name: edge.neighbor_name,
      object_type: edge.neighbor_type,
      lifecycle_status: edge.neighbor_lifecycle_status,
    });
  }

  // Zuständiger Managed Service: dieses Objekt liegt über covered_by (R22) im Serviceumfang.
  for (const edge of outgoing) {
    if (edge.relationship_type !== 'covered_by') continue;
    observations.push({
      kind: 'service',
      relationship_id: edge.relationship_id,
      relationship_type: edge.relationship_type,
      object_id: edge.neighbor_id,
      name: edge.neighbor_name,
      object_type: edge.neighbor_type,
      lifecycle_status: edge.neighbor_lifecycle_status,
    });
  }

  // Gegenrichtung derselben Kante (Review-Fix): dieses Objekt ist ZIEL einer covered_by-Kante,
  // deckt also andere Objekte im Serviceumfang ab. Das ist die Regel-Blickrichtung jeder
  // Managed-Service-Seite; ohne sie widerspräche „Was als Nächstes?" dem Abschnitt „Womit hängt
  // es zusammen?" derselben Seite. Reine Seed-Aussage, kein Serviceangebot.
  for (const edge of incoming) {
    if (edge.relationship_type !== 'covered_by') continue;
    observations.push({
      kind: 'deckung',
      relationship_id: edge.relationship_id,
      relationship_type: edge.relationship_type,
      object_id: edge.neighbor_id,
      name: edge.neighbor_name,
      object_type: edge.neighbor_type,
      lifecycle_status: edge.neighbor_lifecycle_status,
    });
  }

  // Nachweisbezug (R15 evidences, Evidence -> dieses Objekt). Fehlt er, ist die Abwesenheit
  // selbst die belegte Beobachtung – sie wird benannt und nicht still weggelassen.
  // ABER nur bei Objekttypen, die laut R15 überhaupt Ziel einer Nachweiskante sein können
  // (siehe EVIDENCE_TARGET_TYPES): für eine Organisation, eine Rolle, ein SLA oder eine
  // Kennzahl sieht das Modell keinen Nachweisbezug vor – dort wäre „kein Nachweis" eine
  // erfundene Erwartung statt einer Beobachtung.
  const evidenceEdges = incoming.filter((edge) => edge.relationship_type === 'evidences');
  const evidenceTargetTypes: readonly string[] = EVIDENCE_TARGET_TYPES;
  if (evidenceEdges.length > 0) {
    for (const edge of evidenceEdges) {
      observations.push({
        kind: 'nachweis',
        relationship_id: edge.relationship_id,
        relationship_type: edge.relationship_type,
        object_id: edge.neighbor_id,
        name: edge.neighbor_name,
        object_type: edge.neighbor_type,
        lifecycle_status: edge.neighbor_lifecycle_status,
      });
    }
  } else if (evidenceTargetTypes.includes(objectType)) {
    observations.push({ kind: 'ohne_nachweis' });
  }

  return observations;
}

/**
 * Baut das vollständige Detailmodell für EIN Paar (`tenantId`, `objectId`).
 * Liefert `undefined`, wenn der Mandant unbekannt ist ODER das Objekt nicht zu diesem
 * Mandanten gehört – in beiden Fällen identisch (Tenant-Isolation, Dok. 07 §17/P09).
 */
export function buildObjectDetail(
  tenantId: string,
  objectId: string,
): ObjectDetailModel | undefined {
  const tenant = getTenant(tenantId);
  if (!tenant) return undefined;

  // Genau EINE Suchimplementierung (Review-Fix): `getObjectForTenant` ist die Stelle, an der
  // die Mandantengrenze für ein einzelnes Objekt gezogen wird. Die vollständige Objektliste
  // wird ohnehin für die Nachbar-Auflösung (`byId`) gebraucht.
  const objects = getObjectsForTenant(tenantId);
  const object = getObjectForTenant(tenantId, objectId);
  if (!object) return undefined;

  const byId = new Map(objects.map((o) => [o.object_id, o] as const));
  const relationships = getRelationshipsForTenant(tenantId);

  const outgoing = relationships
    .filter((r) => r.source_id === objectId)
    .map((r) => toEdge(r, 'ausgehend', byId));
  const incoming = relationships
    .filter((r) => r.target_id === objectId)
    .map((r) => toEdge(r, 'eingehend', byId));

  const identity = buildIdentity(object, byId);

  const importanceTypes: readonly string[] = IMPORTANCE_EDGE_TYPES;
  const importanceEdges = [...outgoing, ...incoming].filter((edge) =>
    importanceTypes.includes(edge.relationship_type),
  );

  const confirmation = object.quality_state.dimensions.find(
    (dim) => dim.dimension === 'Bestätigung',
  );

  const supersedes = outgoing.filter((edge) => edge.relationship_type === 'supersedes');
  const supersededBy = incoming.filter((edge) => edge.relationship_type === 'supersedes');
  const hasPreviousVersion = object.version > 1;
  const hasReplacementRecord = Boolean(object.record_time.replaced_at);

  return {
    tenant,
    object,
    identity,
    importance: {
      confidentiality: identity.confidentiality,
      protection_need: identity.protection_need,
      has_classification: identity.has_classification,
      edges: importanceEdges,
    },
    connections: { outgoing, incoming },
    evolution: {
      valid_from: object.valid_time.from,
      valid_to: object.valid_time.to,
      recorded_at: object.record_time.recorded_at,
      replaced_at: object.record_time.replaced_at,
      version: object.version,
      quality_dimensions: object.quality_state.dimensions,
      source_refs: object.source_refs,
      confirmation_level: confirmation?.confirmation_level,
      history: {
        version: object.version,
        has_previous_version: hasPreviousVersion,
        replaced_at: object.record_time.replaced_at,
        has_replacement_record: hasReplacementRecord,
        supersedes,
        superseded_by: supersededBy,
        has_history:
          hasPreviousVersion ||
          hasReplacementRecord ||
          supersedes.length > 0 ||
          supersededBy.length > 0,
      },
    },
    next_observations: buildNextObservations(object.object_type, outgoing, incoming),
  };
}

/* -----------------------------------------------------------------------------
 * Darstellungshilfen (React-frei, deterministisch)
 * --------------------------------------------------------------------------- */

/**
 * `objectDetailHref` und `formatIsoDateDe` wohnen in `lib/twin/routes.ts` – bewusst in einem
 * SEED-FREIEN Modul, damit Client-Komponenten sie nutzen können, ohne den statischen
 * `DEMO_SEED`-Import dieses Moduls (alle Mandanten) in ihren Bundle-Graphen zu ziehen
 * (Review-Fix). Hier bleibt der Re-Export, damit Route, View-Modell und Tests unverändert
 * eine Importstelle haben.
 */
export { formatIsoDateDe, objectDetailHref } from './routes';
