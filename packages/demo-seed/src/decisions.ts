/**
 * Synthetische Entscheidungsschicht des Demo-Seeds (WP-017, Slice 1).
 *
 * STRUKTUR / VOKABULAR (verbindlich): ausschließlich kanonische Objekttypen (hier genau ein Typ,
 * `Decision Record` aus F09 „Ziele, Entscheidungen & Services") und kanonische Beziehungstypen
 * R01–R25 aus `@isms/contracts` (Dok. 07 v1.0). Es wird NICHTS am Modell erfunden: kein Feld,
 * kein Objekttyp, kein Beziehungstyp, keine Lifecycle-Werteliste. Fachliche Lücken sind als
 * `OFFENE FRAGE` markiert (siehe unten).
 *
 * FACHLICHE HERLEITUNG:
 *   - Dok. 07 §6 (F09 enthält `Decision Record`), §7 (Objektvertrag), §8 (Lebenszyklus, u. a.
 *     „Überholt: durch neue Version ersetzt; historisch sichtbar"), §9 (R03 `owns`,
 *     R15 `evidences`, R23 `decided_in`, R24 `supersedes`), §11 (Bitemporalität).
 *   - Dok. 10 §9.2 („Nach Freigabe wird die Karte zum unveränderbaren Decision Record.
 *     Korrekturen erfolgen als neue Version oder Nachtrag.") – fachliche Grundlage der
 *     Ablösekette. §8.2 dient NUR als Muster für plausible Entscheidungsgegenstände; das dort
 *     genannte „Kostenband" wird ausdrücklich NICHT umgesetzt.
 *   - Dok. 05 §7 (Entscheidungs-Lifecycle: vorbereitet, zur Freigabe, genehmigt/abgelehnt,
 *     umgesetzt, überprüft).
 *
 * INHALT (bewusst synthetisch, `.claude/rules/demo-data.md`): Entscheidungsfragen, Gegenstände
 * und Kontexte sind frei erfunden und knüpfen an den vorhandenen Ransomware-/
 * Betriebsunterbrechungs-Strang des Nordwerk-Graphen an. KEINE realen Inhalte.
 *
 * AUSDRÜCKLICH NICHT enthalten (WP-017 Nicht-Ziele): keine Decision Card nach Dok. 10 §9.1,
 * also keine Auslöser-, Baseline-, Optionen-, Wirkungs-, Ressourcen-, Abhängigkeits-,
 * Empfehlungs-, Frist-, Approver- oder Outcome-Check-Angabe – auch nicht als Klartext in
 * `description`; KEINE Preise, Beträge, Währungen, Kostenbänder, Budgets; KEINE Bewertung,
 * Priorisierung oder Empfehlung.
 * Ein `Task`-Objekt (F08) entsteht hier ebenfalls nicht (siehe OFFENE FRAGE O-WP017-01).
 *
 * MANDANTENTRENNUNG: Jedes Objekt und jede Kante trägt genau eine `tenant_id` (Nordwerk); es
 * gibt KEINE mandantenübergreifende Beziehung (Dok. 07 P09/D11, Dok. 19). Andere Mandanten
 * erhalten in diesem Work Package bewusst keine Entscheidungen (siehe O-WP017-08).
 *
 * ------------------------------------------------------------------------------------------
 * OFFENE FRAGEN (nicht erfunden, bewusst offen gelassen – Vorschlag für
 * `docs/project/OPEN_QUESTIONS.md`):
 *
 * OFFENE FRAGE (O-WP017-01): `Task` (F08) kommt in Dok. 07 §9 in KEINER der Zeilen R01–R25 vor –
 *   weder als Quelle noch als Ziel. Eine Aufgabe wäre ein beziehungsloses Waisenobjekt. Es wird
 *   deshalb KEIN `Task` materialisiert und KEIN vorhandener Kantentyp zweckentfremdet.
 *
 * OFFENE FRAGE (O-WP017-02): Dok. 10, Abschnitt „Decision Cards" / „Pflichtfelder" (§9.1) verlangt
 *   für eine Decision Card 14 Pflichtfelder. Die Feldnamen lauten dort wörtlich: Entscheidungsfrage,
 *   Zielbezug, Auslöser, Baseline, Optionen, Wirkung, Ressourcen, Abhängigkeiten, Confidence,
 *   Empfehlung, „Owner und Approver", Frist, Outcome Check, Provenance. Im Objektvertrag
 *   (Dok. 07, „Objektvertrag, Identität und Metadaten") haben NEUN davon keinen Träger (Auslöser,
 *   Baseline, Optionen, Wirkung, Ressourcen, Abhängigkeiten, Empfehlung, Frist, Outcome Check),
 *   die übrigen FÜNF (Entscheidungsfrage, Zielbezug, Confidence, „Owner und Approver", Provenance)
 *   nur teilweise. Diese Angaben werden hier weder als Feld noch als Klartext erfunden.
 *
 * OFFENE FRAGE (O-WP017-03): `LIFECYCLE_STATUS_DECISION` (Dok. 05 §7) kennt keinen Zustand für
 *   „abgelöst/überholt". Der abgelöste Stand erhält deshalb den GENERISCHEN Zustand `Überholt`
 *   aus Dok. 07 §8 („durch neue Version ersetzt; historisch sichtbar"). Die Union der
 *   Vokabulare lässt das zu; eine kanonische Bestätigung steht aus.
 *
 * OFFENE FRAGE (O-WP017-04): Dok. 10 §9.1 führt „Zielbezug" und „Auslöser" als getrennte
 *   Pflichtfelder; kanonisch existiert nur R23 `decided_in`. Welches der beiden Felder R23
 *   abbildet, ist offen – die Kante wird deshalb neutral als Bezug modelliert und NICHT als
 *   Auslöser ausgegeben.
 *
 * OFFENE FRAGE (O-WP017-05): Dok. 10 §9.1 verlangt „Owner und Approver"; der Objektvertrag kennt
 *   nur `owner_ids` mit `owner_kind ∈ {fachlich, technisch}` und R03 `owns` (Verantwortung, nicht
 *   Freigabe). Ein Approver wird weder erfunden noch aus `owner_kind` umgedeutet.
 *
 * OFFENE FRAGE (O-WP017-07): Ablösung als Objektversion ODER als eigenständiges Objekt? Dok. 07
 *   §7 kennt `version` + `record_time.replaced_at`, Dok. 07 §9 R24 dagegen eine Kante zwischen
 *   zwei eigenständigen Objekten; eine Regel, wann welcher Mechanismus gilt, fehlt. Diese
 *   Schicht nutzt R24 (zwei eigenständige, historisch sichtbare Stände), lässt `version: 1` und
 *   setzt KEIN `replaced_at`. Die Wahl ist reversibel.
 *
 * OFFENE FRAGE (O-WP017-08): Ob der Betreiber-Mandant („Consulting Operator Demo") eigene
 *   Entscheidungen tragen soll, ist eine offene Produktfrage (vgl. O-WP012-03). Hier wird nur
 *   Nordwerk ausmodelliert; die übrigen Mandanten bleiben bewusst ohne Entscheidungen.
 *
 * OFFENE FRAGE (Kanten des abgelösten Stands): Dok. 07 §9 R24 verlangt „Explizite Ablösung OHNE
 *   historische Überschreibung". Der abgelöste Stand endet deshalb FACHLICH (`valid_time.to` am
 *   Objekt), seine Bezugs-, Nachweis- und Verantwortungskanten bleiben dagegen offen: ein
 *   Kantenende ist im Konzept nicht belegt und wird nicht erfunden.
 * ------------------------------------------------------------------------------------------
 */

import type {
  AssertionKind,
  Classification,
  LifecycleStatus,
  ObjectEnvelope,
  ObjectType,
  OwnerRef,
  QualityDimensionAssessment,
  RelationshipEnvelope,
  RelationshipType,
  ScopeAssignment,
  SourceRef,
} from '@isms/contracts';
import { TENANT_ID } from './tenants';
import { NORDWERK_OBJECT_ID } from './nordwerk-graph';
import { NORDWERK_SERVICE_OBJECT_ID } from './managed-services';

/**
 * Feste, deterministische Zeitpunkte (kein Date.now()/Random). Die Entscheidungsschicht ist die
 * DRITTE Erfassungswelle des Seeds (Kerngraph: erfasst 2026-01-15; Serviceschicht: erfasst
 * 2026-02-16). Anders als die beiden bestehenden Schichten trägt sie je Objekt eine eigene
 * fachliche Gültigkeit, weil der abgelöste Stand ein GESCHLOSSENES `valid_time`-Intervall
 * braucht. Bitemporalität bleibt für jedes Objekt und jede Kante gewahrt:
 * `valid_time.from < record_time.recorded_at` (Dok. 07 §11).
 */
const DECISION_RECORDED_AT = '2026-03-16T08:00:00.000Z';

/** Fachliche Gültigkeit des abgelösten Stands: geschlossenes Intervall (von … bis). */
const D1_VALID_FROM = '2026-01-05T00:00:00.000Z';
const D1_VALID_TO = '2026-03-01T00:00:00.000Z';

/**
 * Der Nachfolgestand beginnt fachlich exakt dort, wo der abgelöste Stand endet – lückenlos und
 * überschneidungsfrei. Derselbe Zeitpunkt trägt auch den offenen Stand zum Berichtsrhythmus.
 */
const D2_VALID_FROM = D1_VALID_TO;
const D3_VALID_FROM = '2026-03-01T00:00:00.000Z';

/** Scopes (synthetisch) – identisch zu den bestehenden Schichten, keine neuen Kennungen. */
const SCOPE_NORDWERK_ISMS_CORE = 'scope-nordwerk-isms-core';
const SCOPE_NORDWERK_MANAGED_SERVICE = 'scope-nordwerk-managed-service';

/** Standard-Quellreferenz der Entscheidungsschicht: synthetisches Entscheidungsprotokoll. */
const DECISION_SOURCE: SourceRef = {
  source_kind: 'Dokument',
  reference: 'synthetic-entscheidungsprotokoll-nordwerk-2026',
  priority: 1,
};

/* -----------------------------------------------------------------------------
 * Typisierte Fabriken (tenant-parametrisiert; je Objekt/Kante setzbare fachliche Gültigkeit).
 * --------------------------------------------------------------------------- */

function makeDecisionObject(input: {
  object_id: string;
  object_type: ObjectType;
  display_name: string;
  description: string;
  lifecycle_status: LifecycleStatus;
  valid_from: string;
  /** Fachliches Ende; `null` = offen. Nur der abgelöste Stand trägt hier einen Wert. */
  valid_to?: string | null;
  scope_ids: readonly string[];
  owner_ids: OwnerRef[];
  classification?: Classification;
  source_refs?: SourceRef[];
  quality?: QualityDimensionAssessment[];
}): ObjectEnvelope {
  const scopes: ScopeAssignment[] = input.scope_ids.map((scope_id) => ({
    scope_id,
    valid_time: { from: input.valid_from, to: input.valid_to ?? null },
  }));

  return {
    object_id: input.object_id,
    tenant_id: TENANT_ID.NORDWERK,
    object_type: input.object_type,
    display_name: input.display_name,
    description: input.description,
    lifecycle_status: input.lifecycle_status,
    scope_ids: scopes,
    owner_ids: input.owner_ids,
    classification: input.classification ?? { confidentiality: 'intern', protection_need: 'normal' },
    source_refs: input.source_refs ?? [DECISION_SOURCE],
    valid_time: { from: input.valid_from, to: input.valid_to ?? null },
    record_time: { recorded_at: DECISION_RECORDED_AT },
    // Bewusst 1 und ohne `replaced_at`: die Ablösung ist fachlich (R24), keine Datensatzversion
    // (siehe OFFENE FRAGE O-WP017-07).
    version: 1,
    quality_state: {
      dimensions: input.quality ?? [{ dimension: 'Bestätigung', confirmation_level: 'freigegeben' }],
    },
  };
}

function makeDecisionRelationship(input: {
  relationship_id: string;
  relationship_type: RelationshipType;
  source_id: string;
  target_id: string;
  assertion_kind: AssertionKind;
  valid_from: string;
  status?: string;
  source_refs?: SourceRef[];
}): RelationshipEnvelope {
  return {
    relationship_id: input.relationship_id,
    tenant_id: TENANT_ID.NORDWERK,
    relationship_type: input.relationship_type,
    source_id: input.source_id,
    target_id: input.target_id,
    direction: 'gerichtet',
    // Offenes Ende: siehe OFFENE FRAGE „Kanten des abgelösten Stands" im Kopfkommentar.
    valid_time: { from: input.valid_from, to: null },
    record_time: { recorded_at: DECISION_RECORDED_AT },
    assertion_kind: input.assertion_kind,
    status: input.status,
    source_refs: input.source_refs ?? [DECISION_SOURCE],
  };
}

/* =============================================================================
 * NORDWERK – Entscheidungsschicht (tenant-nordwerk)
 * ============================================================================= */

/** Stabile Objekt-IDs der Nordwerk-Entscheidungsschicht (P02: unveränderlich). */
export const NORDWERK_DECISION_OBJECT_ID = {
  /** Abgelöster Stand der Risikobehandlung (Absicherung allein über Backup/Wiederherstellung). */
  DECISION_RISIKOBEHANDLUNG_BACKUP: 'nordwerk-decision-risikobehandlung-backup',
  /** Nachfolgestand: zusätzlich Härtung der ERP-Schnittstelle. */
  DECISION_RISIKOBEHANDLUNG_HAERTUNG: 'nordwerk-decision-risikobehandlung-haertung',
  /** Offener Stand zum Berichtsrhythmus des Reporting-Service. */
  DECISION_BERICHTSRHYTHMUS: 'nordwerk-decision-berichtsrhythmus-reporting',
} as const;

const D = NORDWERK_DECISION_OBJECT_ID;
const K = NORDWERK_OBJECT_ID;
const S = NORDWERK_SERVICE_OBJECT_ID;

/** Owner jeder Entscheidung: die vorhandene CISO-Rolle des Mandanten (Owner-Ref löst auf). */
const CISO_OWNER: OwnerRef = {
  owner_id: K.ROLE_CISO,
  owner_kind: 'fachlich',
  role: 'Entscheidungs-Owner',
};

/**
 * Nordwerk-Entscheidungsschicht: 3 Objekte vom kanonischen Typ `Decision Record` (F09).
 *
 * `display_name` trägt die Entscheidungsfrage, `description` Gegenstand und Kontext – nicht
 * deren Bewertung. Die Lebenszyklus-Stände stammen aus Dok. 05 §7 (Entscheidung) bzw. – für den
 * abgelösten Stand – aus dem generischen Katalog Dok. 07 §8 (siehe OFFENE FRAGE O-WP017-03).
 */
export const NORDWERK_DECISION_OBJECTS: readonly ObjectEnvelope[] = [
  makeDecisionObject({
    object_id: D.DECISION_RISIKOBEHANDLUNG_BACKUP,
    object_type: 'Decision Record',
    display_name:
      'Womit wird das Risiko der Betriebsunterbrechung in der Auftragsabwicklung abgesichert?',
    // `description` trägt AUSSCHLIESSLICH Gegenstand und Kontext. Bezug (R23), Nachweis (R15)
    // und Ablösung (R24) stehen als Kanten im Datenbestand und werden hier NICHT zusätzlich als
    // Klartext geführt: ein zweiter Träger derselben Aussage würde divergieren, sobald sich eine
    // Kante ändert (Review-Fix).
    description:
      'Synthetischer Decision Record: In diesem Stand stützt sich die Absicherung der ' +
      'Auftragsabwicklung gegen einen Ausfall der Kundenauftragsdaten allein auf Datensicherung ' +
      'und Wiederherstellung; die ERP-Integrationsschnittstelle bleibt unverändert.',
    // Generischer Zustand aus Dok. 07 §8: „Überholt: durch neue Version ersetzt; historisch
    // sichtbar" – der Entscheidungs-Lifecycle kennt dafür keinen Wert (O-WP017-03).
    lifecycle_status: 'Überholt',
    valid_from: D1_VALID_FROM,
    valid_to: D1_VALID_TO,
    scope_ids: [SCOPE_NORDWERK_ISMS_CORE],
    owner_ids: [CISO_OWNER],
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'freigegeben' },
      {
        dimension: 'Aktualität',
        note: 'Fachlich beendeter Stand; ein Nachfolgestand ist im Datenbestand erfasst.',
      },
    ],
  }),

  makeDecisionObject({
    object_id: D.DECISION_RISIKOBEHANDLUNG_HAERTUNG,
    object_type: 'Decision Record',
    display_name:
      'Wird die Absicherung der Auftragsabwicklung um die Härtung der ERP-Schnittstelle erweitert?',
    // Ebenfalls ohne Kantenfakten (siehe Kommentar am abgelösten Stand).
    description:
      'Synthetischer Decision Record: Nachfolgestand zur Absicherung der Auftragsabwicklung. ' +
      'Datensicherung und Wiederherstellung bleiben bestehen und werden um die Härtung der ' +
      'ERP-Integrationsschnittstelle ergänzt; damit gehört auch die vorhandene ' +
      'Patch-Management-Maßnahme zum Gegenstand der Risikobehandlung.',
    // Entscheidungs-Lifecycle (Dok. 05 §7). „genehmigt" ist ein Lebenszyklus-Stand des
    // Datensatzes und KEINE im Produkt erteilte Freigabe (Dok. 08 08-D07).
    lifecycle_status: 'genehmigt',
    valid_from: D2_VALID_FROM,
    scope_ids: [SCOPE_NORDWERK_ISMS_CORE],
    owner_ids: [CISO_OWNER],
  }),

  makeDecisionObject({
    object_id: D.DECISION_BERICHTSRHYTHMUS,
    object_type: 'Decision Record',
    display_name: 'In welchem Rhythmus liefert der Reporting-Service sein Managementbild?',
    // Weder Kantenfakten (R23) noch der eigene Lebenszyklus-Stand werden hier doppelt geführt:
    // beides steht als Feld bzw. Kante im Datenbestand (Review-Fix).
    description:
      'Synthetischer Decision Record: offener Stand zum Berichtsrhythmus des Managed Service ' +
      '„Management- & Entscheidungsreporting". Gegenstand ist, in welchem Rhythmus und an welchen ' +
      'Empfängerkreis das Managementbild künftig geliefert wird.',
    lifecycle_status: 'zur Freigabe', // Entscheidungs-Lifecycle (Dok. 05 §7)
    valid_from: D3_VALID_FROM,
    scope_ids: [SCOPE_NORDWERK_ISMS_CORE, SCOPE_NORDWERK_MANAGED_SERVICE],
    owner_ids: [CISO_OWNER],
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'Ungeprüft' },
      {
        dimension: 'Vollständigkeit',
        note: 'Offener Stand: der Berichtsrhythmus ist im Datenbestand noch nicht festgehalten.',
      },
    ],
  }),
] as const;

/**
 * Nordwerk-Entscheidungsschicht: 8 Beziehungen, ausschließlich kanonische Typen in der in
 * Dok. 07 §9 dokumentierten Richtung (source -> target):
 *
 *   Risk / Managed Service --R23 decided_in-->  Decision Record   („Risk/Change/Service -> Decision Record")
 *   Decision Record        --R24 supersedes-->  Decision Record   („Version/Policy/Decision -> Vorgänger")
 *   Evidence               --R15 evidences-->   Decision Record   („Evidence -> Control/Measure/Decision")
 *   fachliche Rolle        --R03 owns-->        Decision Record   („Person/Rolle/Einheit -> Objekt")
 */
export const NORDWERK_DECISION_RELATIONSHIPS: readonly RelationshipEnvelope[] = [
  // --- R23 decided_in: fachlicher Zustand -> menschliche Entscheidung ---
  //
  // `status` ist ein Feld DER KANTE und wird deshalb beziehungsbezogen formuliert („Bezug auf
  // den … Stand"). Vorher spiegelte er den Lebenszyklus-Stand des ZIELOBJEKTS („abgelöster
  // Stand") und stand im Produkt unmittelbar neben ebendiesem Objektstatus – zwei verschiedene
  // Felder mit derselben Aussage (Review-Fix).
  makeDecisionRelationship({
    relationship_id: 'nordwerk-rel-44-decided_in-risk-decision-backup',
    relationship_type: 'decided_in',
    source_id: K.RISK_BETRIEBSUNTERBRECHUNG,
    target_id: D.DECISION_RISIKOBEHANDLUNG_BACKUP,
    assertion_kind: 'freigegeben',
    valid_from: D1_VALID_FROM,
    status: 'Bezug auf den abgelösten Stand',
  }),
  makeDecisionRelationship({
    relationship_id: 'nordwerk-rel-45-decided_in-risk-decision-haertung',
    relationship_type: 'decided_in',
    source_id: K.RISK_BETRIEBSUNTERBRECHUNG,
    target_id: D.DECISION_RISIKOBEHANDLUNG_HAERTUNG,
    assertion_kind: 'freigegeben',
    valid_from: D2_VALID_FROM,
    status: 'Bezug auf den aktuellen Stand',
  }),
  makeDecisionRelationship({
    relationship_id: 'nordwerk-rel-46-decided_in-service-decision-berichtsrhythmus',
    relationship_type: 'decided_in',
    source_id: S.SERVICE_MANAGEMENT_REPORTING,
    target_id: D.DECISION_BERICHTSRHYTHMUS,
    assertion_kind: 'assertiert',
    valid_from: D3_VALID_FROM,
    status: 'Bezug auf den offenen Stand',
  }),

  // --- R24 supersedes: Nachfolger -> Vorgänger (Ablösung ohne historische Überschreibung) ---
  makeDecisionRelationship({
    relationship_id: 'nordwerk-rel-47-supersedes-decision-haertung-backup',
    relationship_type: 'supersedes',
    source_id: D.DECISION_RISIKOBEHANDLUNG_HAERTUNG,
    target_id: D.DECISION_RISIKOBEHANDLUNG_BACKUP,
    assertion_kind: 'freigegeben',
    valid_from: D2_VALID_FROM,
    status: 'fachlich abgelöst',
  }),

  // --- R15 evidences: Nachweis -> Entscheidung (Beispielspalte „Evidence -> … /Decision") ---
  makeDecisionRelationship({
    relationship_id: 'nordwerk-rel-48-evidences-evidence-decision-backup',
    relationship_type: 'evidences',
    source_id: K.EVIDENCE_RESTORE_TEST,
    target_id: D.DECISION_RISIKOBEHANDLUNG_BACKUP,
    assertion_kind: 'freigegeben',
    valid_from: D1_VALID_FROM,
    status: 'geprüft',
  }),

  // --- R03 owns: fachliche Rolle -> Decision Record (Verantwortung, keine Freigabe) ---
  makeDecisionRelationship({
    relationship_id: 'nordwerk-rel-49-owns-role-decision-backup',
    relationship_type: 'owns',
    source_id: K.ROLE_CISO,
    target_id: D.DECISION_RISIKOBEHANDLUNG_BACKUP,
    assertion_kind: 'assertiert',
    valid_from: D1_VALID_FROM,
  }),
  makeDecisionRelationship({
    relationship_id: 'nordwerk-rel-50-owns-role-decision-haertung',
    relationship_type: 'owns',
    source_id: K.ROLE_CISO,
    target_id: D.DECISION_RISIKOBEHANDLUNG_HAERTUNG,
    assertion_kind: 'assertiert',
    valid_from: D2_VALID_FROM,
  }),
  makeDecisionRelationship({
    relationship_id: 'nordwerk-rel-51-owns-role-decision-berichtsrhythmus',
    relationship_type: 'owns',
    source_id: K.ROLE_CISO,
    target_id: D.DECISION_BERICHTSRHYTHMUS,
    assertion_kind: 'assertiert',
    valid_from: D3_VALID_FROM,
  }),
] as const;

/* =============================================================================
 * Aggregat der Entscheidungsschicht. Nur Nordwerk trägt Entscheidungen (O-WP017-08);
 * die Verkettung ist eine reine Listenverkettung ohne mandantenübergreifende Kante.
 * ============================================================================= */

export const DECISION_OBJECTS: readonly ObjectEnvelope[] = [...NORDWERK_DECISION_OBJECTS] as const;

export const DECISION_RELATIONSHIPS: readonly RelationshipEnvelope[] = [
  ...NORDWERK_DECISION_RELATIONSHIPS,
] as const;
