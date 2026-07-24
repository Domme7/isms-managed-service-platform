/**
 * Reicher, synthetischer ISMS-Objektgraph des Demo-Mandanten **Rheinbank Digital AG**
 * (WP-021 Slice 4).
 *
 * QUELLE (Regel Null, am PDF gegengelesen): Dok. 16, Abschnitt „Synthetische Demo-Daten und
 * Demo-Dramaturgie" → §34.1 „Demo-Unternehmen", Nr. 3: „Rheinbank Digital AG: stark regulierter
 * Finanzdienstleister, mehrere Zielprofile, hohe Nachweistiefe und strikte Datenresidenz."
 * (`PYTHONUTF8=1 python scripts/pdf_text.py 16 --suche "Rheinbank"`). Storyline-Leitplanke aus
 * `work-packages/WP-021_DEMO_WELT_FUENF_FIRMEN.md`, Slice 4: mehrere Ziel-/Scope-Bezüge (mehrere
 * `Target Profile` in F09 + `ISMS-Scope` in F01), hohe Nachweistiefe (mehrere `Evidence`/`Audit`
 * in F08), strikte Datenresidenz (F04 `Cloud-Ressource`/`Netzwerkzone` in der Residenzregion +
 * `classification`). Erwartete belegte Ampel-Note: hohe Abdeckung, aber sichtbare
 * Nachweis-Aktualität als Trust-Thema (die Deckungslücke sitzt bewusst als alternder/fehlender
 * Nachweis an einem regulatorisch wichtigen Control).
 *
 * WARUM `tenant-finovia` bei Anzeigename „Rheinbank": Der Anzeigename wandert per Dok. 16 §34.1 auf
 * „Rheinbank Digital AG", die STABILE `tenant_id` bleibt aber `tenant-finovia` (Dok. 07, Abschnitt
 * „Objektvertrag, Identität und Metadaten": `display_name` ist „änderbar, nicht identitätsstiftend",
 * die ID ist stabil, P02). WP-021 hält deshalb ALLE Objekt-/Beziehungs-IDs beim anzeigenahen,
 * klareren Namespace `rheinbank-<typ>-<slug>` — der Slot `tenant-finovia` trägt heute KEINE Objekte,
 * es entsteht also keine ID-Kollision (der Anzeigename wird separat in `tenants.ts` gesetzt; das ist
 * NICHT Teil dieser Datei).
 *
 * STRUKTUR / VOKABULAR (verbindlich): Objekttypen F01–F09 und Beziehungstypen R01–R25 sind strikt
 * dem kanonischen Vertrag `@isms/contracts` (Dok. 07 v1.0) entnommen. Es wird NICHTS am Modell
 * erfunden — kein Feld, kein Typ, kein Beziehungstyp, keine Lifecycle-Werteliste. Insbesondere
 * trägt diese Schicht KEINE numerische Bewertung (Reifegrad, Risiko-Level, KPI-Zielwert) — die
 * brauchen ein Trägerschema (E-02, CCP-008, Slice 7) und sind hier bewusst NICHT enthalten
 * (Stop Condition WP-021). `tags_custom_fields` bleibt ungenutzt. Es gibt KEINE Preis-/
 * Währungsangabe (Preis-Guardrail bleibt scharf).
 *
 * OBJEKTFAMILIEN: F01 (Organisation/ISMS-Scope), F02 (Standort/OU/Rollen), F03 (Capability/Prozess/
 * Assets), F04 (Cloud-Ressource/Netzwerkzone/Schnittstelle in der Residenzregion), F06 (Framework/
 * Requirement/Controls), F07 (Threat/Weakness/Risiken), F08 (Evidence/Audit), F09 (Target Profile/
 * Objective). F05 (Lieferkette) bleibt bewusst außen vor — dieselbe Familienauswahl wie beim
 * Flaggschiff und bei AlpenCloud.
 *
 * NEUE BEZIEHUNGSTYPEN (erstmals im Seed belegt): `operates` (R04, OU betreibt Kernbanksystem/
 * Schnittstelle — operative Verantwortung getrennt von Ownership) und `caused_by` (R11, das
 * Residenz-Risiko wird auf die Fehlkonfiguration als Ursachenhypothese mit Vertrauensgrad
 * zurückgeführt).
 *
 * BEWUSSTE DECKUNGSLÜCKEN (damit die belegten Cockpit-Ampeln UNTERSCHIEDLICH ausschlagen, WP-020):
 *   - `CTRL_DATENRESIDENZ` trägt KEINE eingehende `evidences`-Kante (R15) → „Control ohne Nachweis".
 *     Bewusst am regulatorisch wichtigen Datenresidenz-Control: die letzte Residenz-Attestierung ist
 *     2024 abgelaufen (siehe `EVIDENCE_RESIDENZ_ATTEST`), ein aktueller Nachweis fehlt. Mit
 *     `CTRL_ZUGRIFFSKONTROLLE` + `CTRL_TRANSAKTIONSUEBERWACHUNG` evidenced sind 2 von 3 Controls
 *     belegt → amber, n = 3 über der Kleinheitsschwelle. Das ist das Nachweis-Aktualitäts-Trust-Thema
 *     der Storyline (hohe Abdeckung, sichtbare Nachweisalterung).
 *   - `RISK_DATENRESIDENZVERSTOSS` trägt KEINE eingehende `mitigates`-Kante (R12) → „Risiko ohne
 *     Minderung" (2 von 3 Risiken gemindert → amber). Das regulatorische Kernrisiko der Storyline.
 *   - `ASSET_TRANSAKTIONSPROTOKOLLE` trägt KEINEN Owner (`owner_ids: []`) bei Schutzbedarf „hoch" →
 *     kritisches Objekt (aufsichtsrelevante Transaktionsprotokolle) ohne benannten Owner.
 *
 * DOK-07-DEMO-GRAPH-PFLICHT (Dok. 07, Abschnitt „Synthetische Demodaten", von DR-0008 als
 * „gefordert" zitiert: je Tenant mindestens ein Konflikt, eine veraltete Quelle, ein erklärbarer
 * Trust-State), ausschließlich über BELEGTE Contract-Felder (kein neuer Träger):
 *   - KONFLIKT: `WEAK_RESIDENZ_KONFIGURATION` trägt zwei widersprüchliche `source_refs` (der
 *     Konfigurationsscan meldet einen Residenzverstoß offen, die Selbstauskunft des Bankbetriebs
 *     meldet die Zone als konform, unterschiedliche Priorität) + Datenqualitäts-Dimension
 *     „Konsistenz" mit erklärendem „Konflikt"-Vermerk.
 *   - VERALTETE QUELLE: `EVIDENCE_RESIDENZ_ATTEST` stammt aus einer Residenz-Attestierung 2024
 *     (source_kind „Datei", Referenz mit Jahr 2024, Lebenszyklus „abgelaufen") + Dimension
 *     „Aktualität" mit Vermerk „seither nicht erneuert … veraltet". Passend zum Profil sitzt die
 *     veraltete Quelle auf einem alternden Nachweis, nicht auf einem Asset.
 *   - ERKLÄRBARER TRUST-STATE: `RISK_DATENRESIDENZVERSTOSS` trägt `confirmation_level: 'Ungeprüft'`
 *     + Dimensionen „Herkunft"/„Vollständigkeit"; die zugehörige `affects`-Kante (auf das
 *     Aufsichtskonformitäts-`Objective`) trägt einen erfassten, niedrigen `confidence` (0.4 < 0.5).
 *
 * ZEITMODELL / EIGENE ERFASSUNGSWELLE: Rheinbank ist ein neu ausmodellierter Mandant und bildet eine
 * EIGENE Erfassungswelle mit FESTEM Datum (fachlich gültig ab 2026-05-01, im System erfasst am
 * 2026-05-15 — bewusst NACH AlpenCloud 2026-04-15 und eindeutig, damit die „tage"-Testliste
 * erweiterbar ist). Feste ISO-Daten (kein Date.now()/Zufall) — jeder Lauf ist identisch
 * (Demo-Datenregel, `.claude/rules/testing.md`). Für JEDES Objekt und JEDE Kante gilt
 * `Date.parse(valid_time.from) < Date.parse(record_time.recorded_at)` (Bitemporalität, Dok. 07
 * §11). Die „veraltete Quelle" wird NICHT über `record_time` modelliert (das ist die Systemachse),
 * sondern über die belegte Quellreferenz (2024) und die Dimension „Aktualität".
 *
 * MANDANTENTRENNUNG: Jedes Objekt und jede Kante trägt genau `tenant_id = tenant-finovia`; es
 * entsteht KEINE mandantenübergreifende Kante (Dok. 07 P09/D11, Dok. 19).
 *
 * INHALT (bewusst synthetisch, `.claude/rules/demo-data.md`): Firmen-, Prozess-, Asset-, Risiko-,
 * Control- und Nachweiswerte sind frei erfunden und plausibel. KEINE realen Unternehmen,
 * Personen, Preise oder behaupteten Aufsichtsprozesse.
 *
 * OFFEN (nicht am PDF belegbar, DR-0005 „benennen statt füllen"):
 *   - Eine dedizierte Datenresidenz-Eigenschaft existiert im Objektvertrag (Dok. 07 §7
 *     `classification` = „Vertraulichkeit und Schutzbedarf") NICHT. „strikte Datenresidenz" wird
 *     daher über `located_at` auf die Residenzregion (Standort) + Klartext in `description`
 *     modelliert, nicht als typisiertes/numerisches Feld.
 *   - Für `Target Profile` (F09) nennt Dok. 07 §9 keine typisierte Kante; die „mehreren Zielprofile"
 *     werden als eigenständige `Target Profile`-Objekte materialisiert und über `owns` (R03,
 *     Rolle -> Objekt) an die Verantwortung gebunden — kein erfundener Kantentyp.
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
  SourceRef,
} from '@isms/contracts';
import { TENANT_ID } from './tenants';

const TENANT_RHEINBANK = TENANT_ID.FINOVIA;

/**
 * Feste, deterministische Zeitpunkte (kein Date.now()/Random). Eigene Erfassungswelle des neu
 * ausmodellierten Mandanten: fachlich gültig ab 2026-05-01, im System erfasst 2026-05-15 (bewusst
 * nach der AlpenCloud-Welle 2026-04-15).
 */
const VALID_FROM = '2026-05-01T00:00:00.000Z';
const RECORDED_AT = '2026-05-15T08:00:00.000Z';

/** ISMS-/Aufsichts-Scope des Mandanten (synthetischer Scope-Bezeichner; deckt sich mit der ID des
 *  ISMS-Scope-Objekts, ohne dass scope_ids eine Kante bildet). */
const SCOPE_KERNBANK_ID = 'rheinbank-scope-kernbankbetrieb';

/** Standard-Quellreferenz: geführter Demo-Workshop (synthetisch). */
const WORKSHOP_SOURCE: SourceRef = {
  source_kind: 'Nutzer',
  reference: 'demo-workshop-rheinbank',
  priority: 1,
};

/** Wiederkehrende Aufsichtskatalog-Quelle (synthetisch, kein Abdruck realer Normtexte). */
const KATALOG_SOURCE: SourceRef = {
  source_kind: 'Dokument',
  reference: 'synthetic-aufsichtskatalog',
  priority: 1,
};

/* -----------------------------------------------------------------------------
 * Stabile Objekt-IDs (P02) – Namespace `rheinbank-<typ>-<slug>` (anzeigenah; der Slot-tenant_id
 * `tenant-finovia` trägt heute keine Objekte, also keine Kollision).
 * Benannte Schlüssel für ALLE Objekte; die lücken-/pflichttragenden sind im Kopfkommentar erklärt.
 * --------------------------------------------------------------------------- */
export const RHEINBANK_OBJECT_ID = {
  // F01 Tenant & Unternehmenskontext
  ORG: 'rheinbank-org',
  SCOPE_KERNBANK: SCOPE_KERNBANK_ID,
  // F02 Organisation & Verantwortung
  STANDORT_RESIDENZ: 'rheinbank-standort-rechenzentrum-residenzregion',
  OU_BANKBETRIEB: 'rheinbank-ou-it-bankbetrieb',
  ROLE_CISO: 'rheinbank-role-ciso',
  ROLE_COMPLIANCE: 'rheinbank-role-compliance-aufsicht',
  // F03 Geschäft & Information
  CAP_ZAHLUNGSVERKEHR: 'rheinbank-cap-digitaler-zahlungsverkehr',
  PROC_ZAHLUNGSABWICKLUNG: 'rheinbank-proc-zahlungsabwicklung',
  ASSET_KONTODATEN: 'rheinbank-asset-kundenkonto-zahlungsdaten',
  ASSET_TRANSAKTIONSPROTOKOLLE: 'rheinbank-asset-transaktionsprotokolle',
  // F04 Technologie & Infrastruktur
  CLOUD_KERNBANKSYSTEM: 'rheinbank-cloud-kernbanksystem-residenzregion',
  NETZZONE_ZAHLUNGSVERKEHR: 'rheinbank-netzzone-zahlungsverkehr',
  SCHNITTSTELLE_ZAHLUNGSDIENST: 'rheinbank-schnittstelle-zahlungsdienst-clearing',
  // F06 Governance & Anforderungen
  FRAMEWORK_AUFSICHT: 'rheinbank-framework-aufsichtsrecht',
  REQ_DATENRESIDENZ: 'rheinbank-req-datenresidenz',
  CTRL_DATENRESIDENZ: 'rheinbank-ctrl-datenresidenz',
  CTRL_ZUGRIFFSKONTROLLE: 'rheinbank-ctrl-zugriffskontrolle-zahlungsdaten',
  CTRL_TRANSAKTIONSUEBERWACHUNG: 'rheinbank-ctrl-transaktionsueberwachung',
  // F07 Risiko & Veränderung
  THREAT_ZAHLUNGSBETRUG: 'rheinbank-threat-zahlungsbetrug',
  WEAK_RESIDENZ_KONFIGURATION: 'rheinbank-weak-residenz-konfiguration',
  RISK_DATENRESIDENZVERSTOSS: 'rheinbank-risk-datenresidenzverstoss',
  RISK_ZAHLUNGSBETRUG: 'rheinbank-risk-zahlungsbetrug',
  RISK_UNBEFUGTER_ZUGRIFF: 'rheinbank-risk-unbefugter-zugriff-zahlungsdaten',
  // F08 Arbeit, Nachweis & Assurance
  EVIDENCE_RESIDENZ_ATTEST: 'rheinbank-evidence-datenresidenz-attest',
  EVIDENCE_ZUGRIFFSREVIEW: 'rheinbank-evidence-zugriffsreview-zahlungsdaten',
  EVIDENCE_MONITORING: 'rheinbank-evidence-transaktionsmonitoring',
  AUDIT_AUFSICHT: 'rheinbank-audit-aufsichtspruefung',
  // F09 Ziele, Entscheidungen & Services
  TARGET_AUFSICHTSKONFORM: 'rheinbank-target-aufsichtskonformes-zielprofil',
  TARGET_ZAHLUNGSDIENST: 'rheinbank-target-zahlungsdienste-zielprofil',
  OBJECTIVE_AUFSICHTSKONFORMITAET: 'rheinbank-objective-aufsichtskonformitaet',
} as const;

/** Typisierte Objektfabrik (füllt die deterministischen Envelope-Pflichtfelder, Dok. 07 §7). */
function rheinbankObject(input: {
  object_id: string;
  object_type: ObjectType;
  display_name: string;
  description: string;
  lifecycle_status: LifecycleStatus;
  owner_ids?: OwnerRef[];
  classification?: Classification;
  source_refs?: SourceRef[];
  quality?: QualityDimensionAssessment[];
}): ObjectEnvelope {
  return {
    object_id: input.object_id,
    tenant_id: TENANT_RHEINBANK,
    object_type: input.object_type,
    display_name: input.display_name,
    description: input.description,
    lifecycle_status: input.lifecycle_status,
    scope_ids: [{ scope_id: SCOPE_KERNBANK_ID, valid_time: { from: VALID_FROM, to: null } }],
    owner_ids: input.owner_ids ?? [],
    classification: input.classification ?? {},
    source_refs: input.source_refs ?? [WORKSHOP_SOURCE],
    valid_time: { from: VALID_FROM, to: null },
    record_time: { recorded_at: RECORDED_AT },
    version: 1,
    quality_state: {
      dimensions: input.quality ?? [
        { dimension: 'Bestätigung', confirmation_level: 'freigegeben' },
      ],
    },
  };
}

/** Typisierte Beziehungsfabrik (gerichtet, source -> target; Dok. 07 §9). */
function rheinbankRelationship(input: {
  relationship_id: string;
  relationship_type: RelationshipType;
  source_id: string;
  target_id: string;
  assertion_kind: AssertionKind;
  status?: string;
  confidence?: number;
  effectiveness_assumption?: string;
  source_refs?: SourceRef[];
}): RelationshipEnvelope {
  return {
    relationship_id: input.relationship_id,
    tenant_id: TENANT_RHEINBANK,
    relationship_type: input.relationship_type,
    source_id: input.source_id,
    target_id: input.target_id,
    direction: 'gerichtet',
    valid_time: { from: VALID_FROM, to: null },
    record_time: { recorded_at: RECORDED_AT },
    assertion_kind: input.assertion_kind,
    status: input.status,
    source_refs: input.source_refs ?? [WORKSHOP_SOURCE],
    confidence: input.confidence,
    effectiveness_assumption: input.effectiveness_assumption,
  };
}

const R = RHEINBANK_OBJECT_ID;

/* =============================================================================
 * Objekte (30) über F01, F02, F03, F04, F06, F07, F08, F09.
 * ============================================================================= */

export const RHEINBANK_OBJECTS: readonly ObjectEnvelope[] = [
  // --- F01 Tenant & Unternehmenskontext ---
  rheinbankObject({
    object_id: R.ORG,
    object_type: 'Organisation',
    display_name: 'Rheinbank Digital AG',
    description:
      'Stark regulierter Finanzdienstleister (Direktbank) mit hoher Nachweistiefe ' +
      'und strikter Datenresidenz (Dok. 16 §34.1 Nr. 3). Wurzelorganisation des Datenbestands.',
    lifecycle_status: 'Freigegeben',
    classification: { confidentiality: 'intern', protection_need: 'normal' },
  }),
  rheinbankObject({
    object_id: R.SCOPE_KERNBANK,
    object_type: 'ISMS-Scope',
    display_name: 'ISMS-Scope Kernbankbetrieb',
    description:
      'ISMS-Geltungsbereich: der regulierte Kernbank- und Zahlungsverkehrsbetrieb. ' +
      'Rahmt Prozesse, Assets, Cloud-Ressourcen, Controls und Nachweise dieses Mandanten.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [{ owner_id: R.ROLE_COMPLIANCE, owner_kind: 'fachlich', role: 'Scope Owner' }],
  }),

  // --- F02 Organisation & Verantwortung ---
  rheinbankObject({
    object_id: R.STANDORT_RESIDENZ,
    object_type: 'Standort',
    display_name: 'Rechenzentrumsregion (Datenresidenzregion)',
    description:
      'Aufsichtlich vorgegebene Betriebs-/Datenresidenzregion. Die produktiven ' +
      'Cloud-Ressourcen und die Zahlungsverkehrs-Netzzone MÜSSEN hier verbleiben (strikte ' +
      'Datenresidenz, Dok. 16 §34.1 Nr. 3). Primäre Betriebszuordnung (Dok. 07 §9 R02).',
    lifecycle_status: 'Freigegeben',
  }),
  rheinbankObject({
    object_id: R.OU_BANKBETRIEB,
    object_type: 'Organisationseinheit',
    display_name: 'IT-Bankbetrieb',
    description:
      'Organisationseinheit; betreibt Kernbanksystem, Netzzone und ' +
      'Zahlungsdienst-Schnittstelle (operative Verantwortung, technischer Owner).',
    lifecycle_status: 'Freigegeben',
  }),
  rheinbankObject({
    object_id: R.ROLE_CISO,
    object_type: 'fachliche Rolle',
    display_name: 'Informationssicherheitsbeauftragte Rolle (CISO, Bankbetrieb)',
    description:
      'Fachliche Rolle statt Einzelperson (Datenminimierung, Dok. 07 P12/D12). Fachliche Ownerin ' +
      'der Risiken, der technischen Controls, des Aufsichtskonformitätsziels.',
    lifecycle_status: 'Freigegeben',
  }),
  rheinbankObject({
    object_id: R.ROLE_COMPLIANCE,
    object_type: 'fachliche Rolle',
    display_name: 'Compliance-/Aufsichtsbeauftragte Rolle',
    description:
      'Fachliche Rolle statt Einzelperson (Datenminimierung, Dok. 07 P12/D12). Verantwortet die ' +
      'ISMS-Scope-Abgrenzung, die aufsichtlichen Zielprofile, die Datenresidenz-Anforderung und ' +
      'die Aufsichtsprüfung.',
    lifecycle_status: 'Freigegeben',
  }),

  // --- F03 Geschäft & Information ---
  rheinbankObject({
    object_id: R.CAP_ZAHLUNGSVERKEHR,
    object_type: 'Business Capability',
    display_name: 'Digitaler Zahlungsverkehr',
    description:
      'Geschäftsfähigkeit: den regulierten digitalen Zahlungsverkehr sicher und ' +
      'nachweisbar zu betreiben. ISMS-Fokus des regulierten Finanzdienstleisters.',
    lifecycle_status: 'Freigegeben',
  }),
  rheinbankObject({
    object_id: R.PROC_ZAHLUNGSABWICKLUNG,
    object_type: 'Geschäftsprozess',
    display_name: 'Zahlungsabwicklung',
    description:
      'Kernprozess: Annahme, Prüfung, Ausführung und Protokollierung von ' +
      'Kundenzahlungen über das Kernbanksystem und die Zahlungsdienst-Schnittstelle.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [
      { owner_id: R.ROLE_COMPLIANCE, owner_kind: 'fachlich', role: 'Prozessverantwortung' },
    ],
    classification: { confidentiality: 'vertraulich', protection_need: 'hoch' },
  }),
  rheinbankObject({
    object_id: R.ASSET_KONTODATEN,
    object_type: 'Information Asset',
    display_name: 'Kundenkonto- und Zahlungsverkehrsdaten',
    description:
      'Informationswert: die im Kernbanksystem verarbeiteten Konto-, Saldo- und ' +
      'Zahlungsverkehrsdaten. Besonders schützenswert und residenzpflichtig.',
    lifecycle_status: 'freigegeben', // Informations-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: R.ROLE_COMPLIANCE, owner_kind: 'fachlich', role: 'Information Owner' }],
    classification: { confidentiality: 'vertraulich', protection_need: 'hoch' },
  }),
  rheinbankObject({
    object_id: R.ASSET_TRANSAKTIONSPROTOKOLLE,
    object_type: 'Information Asset',
    display_name: 'Transaktions- und Prüfprotokolle (Audit Trail)',
    description:
      'Informationswert: die aufsichtsrelevanten Transaktions-, Zugriffs- und ' +
      'Prüfprotokolle der Zahlungsabwicklung. Aufsichtlich hoch schützenswert, aber bewusst OHNE ' +
      'benannten Owner erfasst (kritisches Objekt ohne Owner).',
    // DECKUNGSLÜCKE (kritisch ohne Owner): KEIN Owner bei Schutzbedarf „hoch".
    lifecycle_status: 'geprüft', // Informations-Lifecycle (Dok. 05 §7)
    classification: { confidentiality: 'vertraulich', protection_need: 'hoch' },
  }),

  // --- F04 Technologie & Infrastruktur ---
  rheinbankObject({
    object_id: R.CLOUD_KERNBANKSYSTEM,
    object_type: 'Cloud-Ressource',
    display_name: 'Kernbanksystem (residenzgebundene Cloud-Ressource)',
    description:
      'Cloud-Ressource: das produktive Kernbanksystem. Wird ausschließlich in der ' +
      'Datenresidenzregion betrieben (strikte Datenresidenz) und verarbeitet die ' +
      'Kundenkonto-/Zahlungsverkehrsdaten.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [{ owner_id: R.OU_BANKBETRIEB, owner_kind: 'technisch', role: 'Betrieb' }],
    classification: { confidentiality: 'vertraulich', protection_need: 'hoch' },
  }),
  rheinbankObject({
    object_id: R.NETZZONE_ZAHLUNGSVERKEHR,
    object_type: 'Netzwerkzone',
    display_name: 'Zahlungsverkehrs-Netzzone (Residenzregion)',
    description:
      'Segmentierte Netzwerkzone des Zahlungsverkehrs innerhalb der ' +
      'Datenresidenzregion. Gegenstand der Datenresidenz-Control.',
    lifecycle_status: 'Freigegeben',
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),
  rheinbankObject({
    object_id: R.SCHNITTSTELLE_ZAHLUNGSDIENST,
    object_type: 'Schnittstelle',
    display_name: 'Zahlungsdienst-/Clearing-Schnittstelle',
    description:
      'Programmierschnittstelle zur Anbindung des Zahlungs-/Clearing-Verkehrs. ' +
      'Wird vom IT-Bankbetrieb betrieben und hängt am Kernbanksystem.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [{ owner_id: R.OU_BANKBETRIEB, owner_kind: 'technisch', role: 'Betrieb' }],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),

  // --- F06 Governance & Anforderungen ---
  rheinbankObject({
    object_id: R.FRAMEWORK_AUFSICHT,
    object_type: 'Framework',
    display_name: 'Aufsichtsrechtlicher Anforderungsrahmen (illustrativer Katalog)',
    description:
      'Aufsichtsrechtlicher Rahmen für den regulierten Finanzdienstleister ' +
      '(Dok. 16 §34.1 Nr. 3). Kein Abdruck realer Aufsichtstexte.',
    lifecycle_status: 'Freigegeben',
    source_refs: [KATALOG_SOURCE],
  }),
  rheinbankObject({
    object_id: R.REQ_DATENRESIDENZ,
    object_type: 'Requirement',
    display_name: 'Anforderung: strikte Datenresidenz',
    description:
      'Anforderung: schützenswerte Konto-/Zahlungsverkehrsdaten dürfen die ' +
      'vorgegebene Datenresidenzregion nicht verlassen; die Einhaltung ist nachzuweisen.',
    lifecycle_status: 'Freigegeben',
    source_refs: [KATALOG_SOURCE],
  }),
  rheinbankObject({
    object_id: R.CTRL_DATENRESIDENZ,
    object_type: 'Control',
    display_name: 'Datenresidenz-Kontrolle (regulatorisch)',
    description:
      'Regulatorisch wichtiges Control: technische und organisatorische Bindung ' +
      'der Konto-/Zahlungsverkehrsdaten an die Residenzregion. Umgesetzt, aber im Datenbestand ' +
      'OHNE aktuellen Nachweis erfasst — die letzte Residenz-Attestierung ist 2024 abgelaufen ' +
      '(bewusste Deckungslücke: Control ohne Nachweis; Nachweis-Aktualität als Trust-Thema).',
    lifecycle_status: 'implementiert', // Control-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: R.ROLE_COMPLIANCE, owner_kind: 'fachlich', role: 'Control Owner' }],
  }),
  rheinbankObject({
    object_id: R.CTRL_ZUGRIFFSKONTROLLE,
    object_type: 'Control',
    display_name: 'Zugriffskontrolle auf Zahlungsdaten',
    description:
      'Control: rollenbasierte, protokollierte Zugriffssteuerung auf die ' +
      'Kundenkonto-/Zahlungsverkehrsdaten. Durch einen Zugriffsreview belegt.',
    lifecycle_status: 'wirksam', // Control-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: R.ROLE_CISO, owner_kind: 'fachlich', role: 'Control Owner' }],
  }),
  rheinbankObject({
    object_id: R.CTRL_TRANSAKTIONSUEBERWACHUNG,
    object_type: 'Control',
    display_name: 'Transaktionsüberwachung (Betrugserkennung)',
    description:
      'Control: kontinuierliche Überwachung der Zahlungstransaktionen zur ' +
      'Erkennung von Betrug und Anomalien. Durch einen Monitoring-Nachweis belegt.',
    lifecycle_status: 'wirksam', // Control-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: R.ROLE_CISO, owner_kind: 'fachlich', role: 'Control Owner' }],
  }),

  // --- F07 Risiko & Veränderung ---
  rheinbankObject({
    object_id: R.THREAT_ZAHLUNGSBETRUG,
    object_type: 'Threat',
    display_name: 'Zahlungsbetrug / Kontenmissbrauch',
    description:
      'Bedrohung: betrügerische Zahlungen und Kontenmissbrauch mit dem Ziel, ' +
      'Kundengelder und -daten abzugreifen.',
    lifecycle_status: 'Beobachtet',
    source_refs: [
      { source_kind: 'Extraktionsregel', reference: 'synthetic-threat-feed', priority: 1 },
    ],
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'maschinell plausibilisiert' },
      { dimension: 'Aktualität', note: 'Bedrohungssignal, Stand 2026-05.' },
    ],
  }),
  rheinbankObject({
    object_id: R.WEAK_RESIDENZ_KONFIGURATION,
    object_type: 'Weakness',
    display_name: 'Fehlkonfiguration mit Datenabfluss aus der Residenzregion',
    description:
      'Schwäche: eine Konfiguration der Zahlungsverkehrs-Netzzone, die einen ' +
      'Datenabfluss aus der Residenzregion ermöglichen könnte. Der Datenbestand trägt zwei ' +
      'widersprüchliche Quellen zu ihrem Zustand (Konflikt, siehe Konsistenz-Vermerk).',
    lifecycle_status: 'Geprüft',
    // KONFLIKT (Dok.-07-Demo-Graph-Pflicht) über belegte Felder: zwei widersprüchliche
    // `source_refs` (unterschiedliche Priorität) + Dimension „Konsistenz".
    source_refs: [
      { source_kind: 'Import', reference: 'synthetic-residenz-scan-2026-05', priority: 1 },
      { source_kind: 'Nutzer', reference: 'demo-selbstauskunft-bankbetrieb-2026-05', priority: 2 },
    ],
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'maschinell plausibilisiert' },
      {
        dimension: 'Konsistenz',
        note:
          'Konflikt: der Konfigurationsscan meldet einen möglichen Datenabfluss aus der ' +
          'Residenzregion als offen, die Selbstauskunft des IT-Bankbetriebs meldet die Netzzone ' +
          'als residenzkonform. Widerspruch nicht aufgelöst.',
      },
    ],
  }),
  rheinbankObject({
    object_id: R.RISK_DATENRESIDENZVERSTOSS,
    object_type: 'Risk',
    display_name: 'Verstoß gegen die Datenresidenz (aufsichtsrelevant)',
    description:
      'Risiko: schützenswerte Konto-/Zahlungsverkehrsdaten verlassen die vorgegebene ' +
      'Residenzregion — ein aufsichtsrelevanter Verstoß. Neu identifiziert und im Datenbestand ' +
      'OHNE mindernde Beziehung erfasst (bewusste Deckungslücke: Risiko ohne Minderung).',
    // ERKLÄRBARER TRUST-STATE (Dok.-07-Demo-Graph-Pflicht) über belegte Felder: niedrige
    // Bestätigung + Herkunft/Vollständigkeit; die affects-Kante trägt niedrigen confidence.
    lifecycle_status: 'identifiziert', // Risiko-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: R.ROLE_CISO, owner_kind: 'fachlich', role: 'Risk Owner' }],
    classification: { confidentiality: 'vertraulich', protection_need: 'hoch' },
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'Ungeprüft' },
      {
        dimension: 'Herkunft',
        note:
          'Aus der aufsichtlichen Residenz-Readiness-Sichtung 2026-05 abgeleitet, noch nicht mit ' +
          'dem IT-Bankbetrieb abgeglichen.',
      },
      {
        dimension: 'Vollständigkeit',
        note: 'Wirkungsabschätzung offen; im Datenbestand ist keine mindernde Beziehung erfasst.',
      },
    ],
  }),
  rheinbankObject({
    object_id: R.RISK_ZAHLUNGSBETRUG,
    object_type: 'Risk',
    display_name: 'Finanzieller Schaden durch Zahlungsbetrug',
    description:
      'Risiko: betrügerische Zahlungen führen zu finanziellem Schaden und ' +
      'Reputationsverlust. Wird durch die Transaktionsüberwachung gemindert.',
    lifecycle_status: 'behandelt', // Risiko-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: R.ROLE_CISO, owner_kind: 'fachlich', role: 'Risk Owner' }],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),
  rheinbankObject({
    object_id: R.RISK_UNBEFUGTER_ZUGRIFF,
    object_type: 'Risk',
    display_name: 'Unbefugter Zugriff auf Zahlungsdaten',
    description:
      'Risiko: unbefugter Zugriff auf die Kundenkonto-/Zahlungsverkehrsdaten. ' +
      'Wird durch die Zugriffskontrolle gemindert.',
    lifecycle_status: 'behandelt', // Risiko-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: R.ROLE_CISO, owner_kind: 'fachlich', role: 'Risk Owner' }],
    classification: { confidentiality: 'vertraulich', protection_need: 'hoch' },
  }),

  // --- F08 Arbeit, Nachweis & Assurance ---
  rheinbankObject({
    object_id: R.EVIDENCE_RESIDENZ_ATTEST,
    object_type: 'Evidence',
    display_name: 'Datenresidenz-Attestierung 2024 (abgelaufen)',
    description:
      'Nachweis: eine Attestierung der Datenresidenz aus 2024. Sie ist abgelaufen ' +
      'und seither nicht erneuert — die Datenresidenz-Control trägt deshalb aktuell KEINEN gültigen ' +
      'Nachweis (Nachweis-Aktualität als Trust-Thema).',
    // VERALTETE QUELLE (Dok.-07-Demo-Graph-Pflicht) über belegte Felder: alte Quelle 2024 +
    // Dimension „Aktualität". Lebenszyklus „abgelaufen".
    lifecycle_status: 'abgelaufen', // Evidence-Lifecycle (Dok. 05 §7)
    source_refs: [
      { source_kind: 'Datei', reference: 'synthetic-residenz-attest-2024', priority: 1 },
    ],
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'Ungeprüft' },
      {
        dimension: 'Aktualität',
        note:
          'Veraltete Quelle: die Residenz-Attestierung stammt aus 2024 und wurde seither nicht ' +
          'erneuert — der Nachweis ist veraltet und abgelaufen.',
      },
      {
        dimension: 'Herkunft',
        note: 'Einmalige Attestierungsdatei ohne aktuelle fachliche Bestätigung.',
      },
    ],
  }),
  rheinbankObject({
    object_id: R.EVIDENCE_ZUGRIFFSREVIEW,
    object_type: 'Evidence',
    display_name: 'Zugriffsreview Zahlungsdaten Q2/2026',
    description:
      'Nachweis: dokumentierter Review der Zugriffsberechtigungen auf die ' +
      'Kundenkonto-/Zahlungsverkehrsdaten.',
    lifecycle_status: 'akzeptiert', // Evidence-Lifecycle (Dok. 05 §7)
    quality: [{ dimension: 'Bestätigung', confirmation_level: 'reviewed' }],
    source_refs: [
      {
        source_kind: 'Datei',
        reference: 'synthetic-zugriffsreview-zahlungsdaten-q2-2026',
        priority: 1,
      },
    ],
  }),
  rheinbankObject({
    object_id: R.EVIDENCE_MONITORING,
    object_type: 'Evidence',
    display_name: 'Transaktionsmonitoring-Auswertung Q2/2026',
    description:
      'Nachweis: automatisierte Auswertung der Transaktionsüberwachung, die die ' +
      'kontinuierliche Betrugserkennung belegt (hohe Nachweistiefe, Dok. 16 §34.1 Nr. 3).',
    lifecycle_status: 'akzeptiert', // Evidence-Lifecycle (Dok. 05 §7)
    quality: [{ dimension: 'Bestätigung', confirmation_level: 'maschinell plausibilisiert' }],
    source_refs: [
      {
        source_kind: 'Connector',
        reference: 'synthetic-transaktionsmonitoring-2026-05',
        priority: 1,
      },
    ],
  }),
  rheinbankObject({
    object_id: R.AUDIT_AUFSICHT,
    object_type: 'Audit',
    display_name: 'Aufsichtsprüfung Datenresidenz & Nachweisführung',
    description:
      'Bevorstehende Aufsichtsprüfung (hohe Nachweistiefe, Dok. 16 §34.1 Nr. 3). ' +
      'In Vorbereitung; prüft die Datenresidenz-Control und die priorisierten Nachweise.',
    lifecycle_status: 'Vorbereitung', // Audit-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: R.ROLE_COMPLIANCE, owner_kind: 'fachlich', role: 'Audit Owner' }],
  }),

  // --- F09 Ziele, Entscheidungen & Services ---
  rheinbankObject({
    object_id: R.TARGET_AUFSICHTSKONFORM,
    object_type: 'Target Profile',
    display_name: 'Zielprofil: aufsichtskonformer Kernbankbetrieb',
    description:
      'Zielprofil für den regulierten Kernbankbetrieb (eines von mehreren ' +
      'Zielprofilen, Dok. 16 §34.1 Nr. 3). Kein numerischer Reifegrad und kein Zielwert sind ' +
      'erfasst.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [{ owner_id: R.ROLE_COMPLIANCE, owner_kind: 'fachlich', role: 'Zielprofil Owner' }],
  }),
  rheinbankObject({
    object_id: R.TARGET_ZAHLUNGSDIENST,
    object_type: 'Target Profile',
    display_name: 'Zielprofil: Zahlungsdienste-Absicherung',
    description:
      'Zweites Zielprofil mit Schwerpunkt auf der Absicherung des Zahlungsdienst-/ ' +
      'Clearing-Verkehrs (mehrere Zielprofile, Dok. 16 §34.1 Nr. 3). Kein numerischer Reifegrad ' +
      'und kein Zielwert sind erfasst.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [{ owner_id: R.ROLE_COMPLIANCE, owner_kind: 'fachlich', role: 'Zielprofil Owner' }],
  }),
  rheinbankObject({
    object_id: R.OBJECTIVE_AUFSICHTSKONFORMITAET,
    object_type: 'Objective',
    display_name: 'Aufsichtskonformität und lückenlose Nachweisführung',
    description:
      'Ziel: dauerhafte Aufsichtskonformität durch strikte Datenresidenz und ' +
      'lückenlose, aktuelle Nachweisführung. Kein numerischer Zielwert und keine Kennzahl sind ' +
      'erfasst.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [{ owner_id: R.ROLE_CISO, owner_kind: 'fachlich', role: 'Objective Owner' }],
  }),
] as const;

/* =============================================================================
 * Beziehungen (34) – ausschließlich kanonische Typen R01–R25 in dokumentierter Richtung.
 * NEU im Seed erstmals belegt: R04 `operates`, R11 `caused_by`.
 * ============================================================================= */

export const RHEINBANK_RELATIONSHIPS: readonly RelationshipEnvelope[] = [
  // R01 part_of: Organisationseinheit, Standort und ISMS-Scope -> Organisation
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-01-part_of-ou-org',
    relationship_type: 'part_of',
    source_id: R.OU_BANKBETRIEB,
    target_id: R.ORG,
    assertion_kind: 'assertiert',
  }),
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-02-part_of-standort-org',
    relationship_type: 'part_of',
    source_id: R.STANDORT_RESIDENZ,
    target_id: R.ORG,
    assertion_kind: 'assertiert',
  }),
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-03-part_of-scope-org',
    relationship_type: 'part_of',
    source_id: R.SCOPE_KERNBANK,
    target_id: R.ORG,
    assertion_kind: 'assertiert',
  }),
  // R01 part_of: Requirement -> Framework
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-04-part_of-req-framework',
    relationship_type: 'part_of',
    source_id: R.REQ_DATENRESIDENZ,
    target_id: R.FRAMEWORK_AUFSICHT,
    assertion_kind: 'importiert',
    source_refs: [KATALOG_SOURCE],
  }),

  // R02 located_at: Cloud-Ressource und Netzzone -> Residenzregion (strikte Datenresidenz)
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-05-located_at-cloud-residenz',
    relationship_type: 'located_at',
    source_id: R.CLOUD_KERNBANKSYSTEM,
    target_id: R.STANDORT_RESIDENZ,
    assertion_kind: 'assertiert',
  }),
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-06-located_at-netzzone-residenz',
    relationship_type: 'located_at',
    source_id: R.NETZZONE_ZAHLUNGSVERKEHR,
    target_id: R.STANDORT_RESIDENZ,
    assertion_kind: 'assertiert',
  }),

  // R03 owns: fachliche Rollen -> Objekte (Compliance verantwortet Scope/Zielprofile/Audit)
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-07-owns-compliance-scope',
    relationship_type: 'owns',
    source_id: R.ROLE_COMPLIANCE,
    target_id: R.SCOPE_KERNBANK,
    assertion_kind: 'assertiert',
  }),
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-08-owns-compliance-target-aufsicht',
    relationship_type: 'owns',
    source_id: R.ROLE_COMPLIANCE,
    target_id: R.TARGET_AUFSICHTSKONFORM,
    assertion_kind: 'assertiert',
  }),
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-09-owns-compliance-target-zahlungsdienst',
    relationship_type: 'owns',
    source_id: R.ROLE_COMPLIANCE,
    target_id: R.TARGET_ZAHLUNGSDIENST,
    assertion_kind: 'assertiert',
  }),
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-10-owns-compliance-audit',
    relationship_type: 'owns',
    source_id: R.ROLE_COMPLIANCE,
    target_id: R.AUDIT_AUFSICHT,
    assertion_kind: 'assertiert',
  }),
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-11-owns-ciso-risk-residenz',
    relationship_type: 'owns',
    source_id: R.ROLE_CISO,
    target_id: R.RISK_DATENRESIDENZVERSTOSS,
    assertion_kind: 'assertiert',
  }),
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-12-owns-ciso-ctrl-zugriff',
    relationship_type: 'owns',
    source_id: R.ROLE_CISO,
    target_id: R.CTRL_ZUGRIFFSKONTROLLE,
    assertion_kind: 'assertiert',
  }),

  // R04 operates (NEU): OU betreibt Kernbanksystem und Schnittstelle (operative Verantwortung,
  // getrennt von Ownership).
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-13-operates-ou-cloud',
    relationship_type: 'operates',
    source_id: R.OU_BANKBETRIEB,
    target_id: R.CLOUD_KERNBANKSYSTEM,
    assertion_kind: 'assertiert',
  }),
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-14-operates-ou-schnittstelle',
    relationship_type: 'operates',
    source_id: R.OU_BANKBETRIEB,
    target_id: R.SCHNITTSTELLE_ZAHLUNGSDIENST,
    assertion_kind: 'assertiert',
  }),

  // R05 supports: Prozess -> Capability
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-15-supports-proc-capability',
    relationship_type: 'supports',
    source_id: R.PROC_ZAHLUNGSABWICKLUNG,
    target_id: R.CAP_ZAHLUNGSVERKEHR,
    assertion_kind: 'assertiert',
  }),

  // R06 depends_on: Prozess/Schnittstelle -> Cloud-Ressource (Laufzeitabhängigkeit)
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-16-depends_on-proc-cloud',
    relationship_type: 'depends_on',
    source_id: R.PROC_ZAHLUNGSABWICKLUNG,
    target_id: R.CLOUD_KERNBANKSYSTEM,
    assertion_kind: 'assertiert',
  }),
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-17-depends_on-schnittstelle-cloud',
    relationship_type: 'depends_on',
    source_id: R.SCHNITTSTELLE_ZAHLUNGSDIENST,
    target_id: R.CLOUD_KERNBANKSYSTEM,
    assertion_kind: 'assertiert',
  }),

  // R07 processes: Prozess -> Information Asset
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-18-processes-proc-kontodaten',
    relationship_type: 'processes',
    source_id: R.PROC_ZAHLUNGSABWICKLUNG,
    target_id: R.ASSET_KONTODATEN,
    assertion_kind: 'assertiert',
  }),
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-19-processes-proc-protokolle',
    relationship_type: 'processes',
    source_id: R.PROC_ZAHLUNGSABWICKLUNG,
    target_id: R.ASSET_TRANSAKTIONSPROTOKOLLE,
    assertion_kind: 'assertiert',
  }),

  // R08 exposes: Weakness -> Information Asset
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-20-exposes-weak-kontodaten',
    relationship_type: 'exposes',
    source_id: R.WEAK_RESIDENZ_KONFIGURATION,
    target_id: R.ASSET_KONTODATEN,
    assertion_kind: 'importiert',
    confidence: 0.7,
    source_refs: [
      { source_kind: 'Import', reference: 'synthetic-residenz-scan-2026-05', priority: 1 },
    ],
  }),

  // R09 threatens: Threat -> Information Asset
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-21-threatens-threat-kontodaten',
    relationship_type: 'threatens',
    source_id: R.THREAT_ZAHLUNGSBETRUG,
    target_id: R.ASSET_KONTODATEN,
    assertion_kind: 'abgeleitet',
    confidence: 0.6,
  }),

  // R10 affects: Risk -> Objective / Prozess / Information Asset
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-22-affects-risk-residenz-objective',
    relationship_type: 'affects',
    source_id: R.RISK_DATENRESIDENZVERSTOSS,
    target_id: R.OBJECTIVE_AUFSICHTSKONFORMITAET,
    assertion_kind: 'abgeleitet',
    // Niedriger Vertrauensgrad – Teil des erklärbaren Trust-States (neu identifiziert, ungeprüft).
    confidence: 0.4,
  }),
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-23-affects-risk-betrug-proc',
    relationship_type: 'affects',
    source_id: R.RISK_ZAHLUNGSBETRUG,
    target_id: R.PROC_ZAHLUNGSABWICKLUNG,
    assertion_kind: 'abgeleitet',
    confidence: 0.6,
  }),
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-24-affects-risk-zugriff-kontodaten',
    relationship_type: 'affects',
    source_id: R.RISK_UNBEFUGTER_ZUGRIFF,
    target_id: R.ASSET_KONTODATEN,
    assertion_kind: 'abgeleitet',
    confidence: 0.6,
  }),

  // R11 caused_by (NEU): Residenz-Risiko -> Fehlkonfiguration (Ursachenhypothese, Vertrauensgrad)
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-25-caused_by-risk-residenz-weak',
    relationship_type: 'caused_by',
    source_id: R.RISK_DATENRESIDENZVERSTOSS,
    target_id: R.WEAK_RESIDENZ_KONFIGURATION,
    assertion_kind: 'abgeleitet',
    // Kausale Hypothese, noch nicht bestätigt (niedriger Vertrauensgrad).
    confidence: 0.4,
  }),

  // R12 mitigates: Control -> Risk
  // (RISK_DATENRESIDENZVERSTOSS erhält BEWUSST keine mitigates-Kante → Deckungslücke.)
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-26-mitigates-ctrl-zugriff-risk-zugriff',
    relationship_type: 'mitigates',
    source_id: R.CTRL_ZUGRIFFSKONTROLLE,
    target_id: R.RISK_UNBEFUGTER_ZUGRIFF,
    assertion_kind: 'freigegeben',
    confidence: 0.8,
    effectiveness_assumption:
      'Erwartete Reduktion unbefugter Zugriffe durch rollenbasierte, protokollierte ' +
      'Zugriffssteuerung (synthetische Annahme, keine Garantie).',
  }),
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-27-mitigates-ctrl-transaktion-risk-betrug',
    relationship_type: 'mitigates',
    source_id: R.CTRL_TRANSAKTIONSUEBERWACHUNG,
    target_id: R.RISK_ZAHLUNGSBETRUG,
    assertion_kind: 'freigegeben',
    confidence: 0.7,
    effectiveness_assumption:
      'Erwartete Verringerung des Betrugsschadens durch kontinuierliche Transaktionsüberwachung ' +
      '(synthetische Annahme).',
  }),

  // R14 satisfies: Control/Evidence -> Requirement
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-28-satisfies-ctrl-residenz-req',
    relationship_type: 'satisfies',
    source_id: R.CTRL_DATENRESIDENZ,
    target_id: R.REQ_DATENRESIDENZ,
    assertion_kind: 'freigegeben',
  }),
  // Die 2024er Attestierung erfüllte die Anforderung – ist aber veraltet/abgelaufen (siehe Objekt).
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-29-satisfies-evidence-attest-req',
    relationship_type: 'satisfies',
    source_id: R.EVIDENCE_RESIDENZ_ATTEST,
    target_id: R.REQ_DATENRESIDENZ,
    assertion_kind: 'importiert',
    status: 'abgelaufen',
    source_refs: [
      { source_kind: 'Datei', reference: 'synthetic-residenz-attest-2024', priority: 1 },
    ],
  }),

  // R15 evidences: Evidence -> Control
  // (CTRL_DATENRESIDENZ erhält BEWUSST keine evidences-Kante → Deckungslücke; der letzte Nachweis
  //  ist 2024 abgelaufen und wird NICHT als gültige Nachweis-Kante geführt.)
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-30-evidences-zugriffsreview-ctrl-zugriff',
    relationship_type: 'evidences',
    source_id: R.EVIDENCE_ZUGRIFFSREVIEW,
    target_id: R.CTRL_ZUGRIFFSKONTROLLE,
    assertion_kind: 'freigegeben',
    status: 'geprüft',
  }),
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-31-evidences-monitoring-ctrl-transaktion',
    relationship_type: 'evidences',
    source_id: R.EVIDENCE_MONITORING,
    target_id: R.CTRL_TRANSAKTIONSUEBERWACHUNG,
    assertion_kind: 'freigegeben',
    status: 'geprüft',
  }),

  // R19 requires: Audit -> Control / Evidence (verbindliche Prüfabhängigkeit im Scope)
  // Die Aufsichtsprüfung verlangt die (aktuell unbelegte) Datenresidenz-Control – macht die
  // Deckungslücke an der Aufsichtsprüfung sichtbar.
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-32-requires-audit-ctrl-residenz',
    relationship_type: 'requires',
    source_id: R.AUDIT_AUFSICHT,
    target_id: R.CTRL_DATENRESIDENZ,
    assertion_kind: 'assertiert',
    status: 'im Prüfumfang',
  }),
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-33-requires-audit-evidence-zugriff',
    relationship_type: 'requires',
    source_id: R.AUDIT_AUFSICHT,
    target_id: R.EVIDENCE_ZUGRIFFSREVIEW,
    assertion_kind: 'assertiert',
    status: 'im Prüfumfang',
  }),

  // R20 contributes_to: Control -> Objective (begründeter Wirkungsbeitrag ohne Garantie)
  rheinbankRelationship({
    relationship_id: 'rheinbank-rel-34-contributes_to-ctrl-residenz-objective',
    relationship_type: 'contributes_to',
    source_id: R.CTRL_DATENRESIDENZ,
    target_id: R.OBJECTIVE_AUFSICHTSKONFORMITAET,
    assertion_kind: 'assertiert',
  }),
] as const;
