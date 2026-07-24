/**
 * Reicher, synthetischer ISMS-Objektgraph des Demo-Mandanten **MediNova Clinics Holding**
 * (WP-021 Slice 5).
 *
 * QUELLE (Regel Null, am PDF gegengelesen): Dok. 16, Abschnitt „Synthetische Demo-Daten und
 * Demo-Dramaturgie" → §34.1 „Demo-Unternehmen", Nr. 4: „MediNova Clinics Holding: dezentrale
 * Gesundheitsgruppe, kritische Verfügbarkeit, Lieferanten- und Standortkomplexität."
 * (`PYTHONUTF8=1 python scripts/pdf_text.py 16 --suche "MediNova"`). Storyline-Leitplanke aus
 * `work-packages/WP-021_DEMO_WELT_FUENF_FIRMEN.md`, Slice 5: mehrere `Standort`-Objekte (F02),
 * mehrere `Lieferant`/`Abhängigkeit` (F05 — anders als AlpenCloud MUSS MediNova die Lieferkette
 * F05 belegen), kritische Verfügbarkeit (Verfügbarkeitsrisiken). Erwartete belegte Ampel-Note:
 * Verfügbarkeits-/Lieferantenrisiken sichtbar, MEHRERE Deckungslücken (amber/rot) — die dezentrale,
 * heterogene Gruppe trägt spürbar mehr Lücken als das Flaggschiff oder AlpenCloud.
 *
 * STRUKTUR / VOKABULAR (verbindlich): Objekttypen F01–F09 und Beziehungstypen R01–R25 sind strikt
 * dem kanonischen Vertrag `@isms/contracts` (Dok. 07 v1.0) entnommen. Es wird NICHTS am Modell
 * erfunden — kein Feld, kein Typ, kein Beziehungstyp, keine Lifecycle-Werteliste. Insbesondere
 * trägt diese Schicht KEINE numerische Bewertung (Reifegrad, Risiko-Level, KPI-Zielwert) — die
 * brauchen ein Trägerschema (E-02, CCP-008, Slice 7) und sind hier bewusst NICHT enthalten
 * (Stop Condition WP-021). `tags_custom_fields` bleibt ungenutzt. Es gibt KEINE Preis-/
 * Währungsangabe (Preis-Guardrail bleibt scharf).
 *
 * OBJEKTFAMILIEN: F01 (Organisation), F02 (Standorte/OU/Rollen — Standortkomplexität), F03
 * (Capability/Prozess/Patientendaten), F04 (KIS als kritisches System), **F05 (Dritte &
 * Lieferkette — der MediNova-Differenzierer: IT-Betriebsdienstleister, externer Labordienstleister,
 * Rechenzentrums-Unterauftragnehmer)**, F06 (Framework/Requirements/Controls), F07 (Threat/Weakness/
 * Szenario/Verfügbarkeits- und Lieferantenrisiken), F08 (Evidence/Measure/Assurance), F09
 * (Objective). MediNova ist der erste Mandant im Seed, der die Familie F05 belegt.
 *
 * BEWUSSTE DECKUNGSLÜCKEN (damit die belegten Cockpit-Ampeln UNTERSCHIEDLICH ausschlagen, WP-020;
 * MediNova trägt bewusst MEHRERE — dezentral, lieferantenlastig):
 *   - `CTRL_LIEFERANTENSTEUERUNG` trägt KEINE eingehende `evidences`-Kante (R15) → „Control ohne
 *     Nachweis" (mit `CTRL_NOTFALLBETRIEB` + `CTRL_ZUGRIFF_PATIENTENDATEN` evidenced sind 2 von 3
 *     Controls belegt → amber, n = 3 über der Kleinheitsschwelle).
 *   - `RISK_LIEFERANTEN_ABHAENGIGKEIT` trägt KEINE eingehende `mitigates`-Kante (R12) → „Risiko ohne
 *     Minderung" (das Klumpen-/Lieferantenrisiko der Storyline). ZUSÄTZLICH bleibt
 *     `RISK_STANDORT_VERFUEGBARKEIT` (dezentrale Standort-Verfügbarkeit) BEWUSST ohne Minderung —
 *     nur 1 von 3 Risiken gemindert → spürbar mehr Lücken als AlpenCloud.
 *   - `SYSTEM_KIS` trägt KEINEN Owner (`owner_ids: []`) bei Schutzbedarf „hoch" → das kritische,
 *     verfügbarkeitsrelevante Kernsystem der dezentralen Gruppe wird von einem externen Dienstleister
 *     betrieben (R04 `operates`), aber intern beansprucht niemand die Verantwortung (Governance-Lücke).
 *
 * DOK-07-DEMO-GRAPH-PFLICHT (Dok. 07, Abschnitt „Synthetische Demodaten", von DR-0008 als
 * „gefordert" zitiert: je Tenant mindestens ein Konflikt, eine veraltete Quelle, ein erklärbarer
 * Trust-State), ausschließlich über BELEGTE Contract-Felder (kein neuer Träger):
 *   - KONFLIKT: `WEAK_LIEFERANTEN_MONITORING` trägt zwei widersprüchliche `source_refs` (der
 *     Lieferanten-Scan meldet Monitoring-Lücken offen, die Selbstauskunft der zentralen IT meldet
 *     sie als geschlossen, unterschiedliche Priorität) + Datenqualitäts-Dimension „Konsistenz" mit
 *     erklärendem „Konflikt"-Vermerk.
 *   - VERALTETE QUELLE: `LIEFERANT_LABOR` stammt aus einem Lieferantenregister-Import 2023
 *     (source_kind „Importjob", Referenz mit Jahr 2023) + Dimension „Aktualität" mit Vermerk
 *     „seither nicht aktualisiert … veraltet".
 *   - ERKLÄRBARER TRUST-STATE: `RISK_LIEFERANTEN_ABHAENGIGKEIT` trägt `confirmation_level:
 *     'Ungeprüft'` + Dimensionen „Herkunft"/„Vollständigkeit"; die zugehörige `affects`-Kante (auf
 *     den stationären Versorgungsprozess) trägt einen erfassten, niedrigen `confidence` (0.4 < 0.5).
 *
 * ZEITMODELL / EIGENE ERFASSUNGSWELLE: MediNova ist ein neu ausmodellierter Slot und bildet eine
 * EIGENE Erfassungswelle (fachlich gültig ab 2026-06-01, im System erfasst am 2026-06-15) — bewusst
 * NACH AlpenCloud (2026-04-15) und eindeutig datiert, damit die 'tage'-Testliste erweiterbar bleibt.
 * Feste ISO-Daten (kein Date.now()/Zufall) — jeder Lauf ist identisch (Demo-Datenregel,
 * `.claude/rules/testing.md`). Für JEDES Objekt und JEDE Kante gilt
 * `Date.parse(valid_time.from) < Date.parse(record_time.recorded_at)` (Bitemporalität, Dok. 07
 * §11). Die „veraltete Quelle" wird NICHT über `record_time` modelliert (das ist die Systemachse),
 * sondern über die belegte Quellreferenz (2023) und die Dimension „Aktualität".
 *
 * ID-NAMESPACE: Der MediNova-Slot ist heute LEER (`tenant-medicore` trägt keine Objekte), also gibt
 * es keine bestehenden ID-Referenzen, die brechen könnten. Deshalb — analog zum neuen Mandanten
 * AlpenCloud — nutzt diese Schicht den anzeigenahen, klareren Namespace `medinova-<typ>-<slug>`
 * statt des historischen Slot-Namens `medicore-*`. Die STABILE `tenant_id` bleibt `tenant-medicore`
 * (P02, nicht identitätsstiftend; der Anzeigename wandert später separat in `tenants.ts` auf
 * „MediNova Clinics Holding" — das ist NICHT Teil dieser Datei).
 *
 * MANDANTENTRENNUNG: Jedes Objekt und jede Kante trägt genau `tenant_id = tenant-medicore`; es
 * entsteht KEINE mandantenübergreifende Kante (Dok. 07 P09/D11, Dok. 19).
 *
 * INHALT (bewusst synthetisch, `.claude/rules/demo-data.md`): Firmen-, Standort-, Prozess-, Asset-,
 * Lieferanten-, Risiko-, Control- und Evidence-Werte sind frei erfunden und plausibel. KEINE realen
 * Kliniken, Dienstleister, Personen oder Preise.
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

const TENANT_MEDINOVA = TENANT_ID.MEDICORE;

/**
 * Feste, deterministische Zeitpunkte (kein Date.now()/Random). Eigene Erfassungswelle des neu
 * ausmodellierten Slots: fachlich gültig ab 2026-06-01, im System erfasst 2026-06-15 (bewusst NACH
 * AlpenCloud 2026-04-15).
 */
const VALID_FROM = '2026-06-01T00:00:00.000Z';
const RECORDED_AT = '2026-06-15T08:00:00.000Z';

/** ISMS-Scope des Mandanten (synthetisch; reiner Scope-Bezeichner, kein Objekt). */
const SCOPE_VERFUEGBARKEIT = 'scope-medinova-verfuegbarkeit';

/** Standard-Quellreferenz: geführter Demo-Workshop (synthetisch). */
const WORKSHOP_SOURCE: SourceRef = {
  source_kind: 'Nutzer',
  reference: 'demo-workshop-medinova',
  priority: 1,
};

/** Wiederkehrende Framework-Katalogquelle (synthetisch). */
const KATALOG_SOURCE: SourceRef = {
  source_kind: 'Dokument',
  reference: 'synthetic-iso27001-katalog',
  priority: 1,
};

/* -----------------------------------------------------------------------------
 * Stabile Objekt-IDs (P02) – Namespace `medinova-<typ>-<slug>` (leerer Slot, keine Kollision).
 * Benannte Schlüssel für ALLE Objekte; die lücken-/pflichttragenden sind im Kopfkommentar erklärt.
 * --------------------------------------------------------------------------- */
export const MEDINOVA_OBJECT_ID = {
  // F01 Tenant & Unternehmenskontext
  ORG: 'medinova-org',
  // F02 Organisation & Verantwortung (Standortkomplexität)
  STANDORT_KLINIK_NORD: 'medinova-standort-klinik-nord',
  STANDORT_KLINIK_SUED: 'medinova-standort-klinik-sued',
  STANDORT_MVZ: 'medinova-standort-mvz-ambulanz',
  OU_IT_BETRIEB: 'medinova-ou-zentrale-it',
  ROLE_CISO: 'medinova-role-konzern-ciso',
  ROLE_KLINIK_IT_LEITUNG: 'medinova-role-klinik-it-leitung',
  // F03 Geschäft & Information
  CAP_PATIENTENVERSORGUNG: 'medinova-cap-patientenversorgung',
  PROC_STATIONAERE_VERSORGUNG: 'medinova-proc-stationaere-versorgung',
  ASSET_PATIENTENDATEN: 'medinova-asset-patientendaten',
  // F04 Technologie & Infrastruktur
  SYSTEM_KIS: 'medinova-system-krankenhausinformationssystem',
  // F05 Dritte & Lieferkette (der MediNova-Differenzierer)
  LIEFERANT_IT_BETRIEB: 'medinova-lieferant-it-betriebsdienstleister',
  LIEFERANT_LABOR: 'medinova-lieferant-externer-labordienstleister',
  UNTERAUFTRAGNEHMER_RZ: 'medinova-unterauftragnehmer-rechenzentrum',
  // F06 Governance & Anforderungen
  FRAMEWORK_ISO: 'medinova-framework-iso27001',
  REQ_LIEFERANTEN: 'medinova-req-a-5-19-lieferantenbeziehungen',
  REQ_VERFUEGBARKEIT: 'medinova-req-a-5-30-ikt-bereitschaft',
  CTRL_LIEFERANTENSTEUERUNG: 'medinova-ctrl-lieferantensteuerung-ueberwachung',
  CTRL_NOTFALLBETRIEB: 'medinova-ctrl-notfall-ausweichbetrieb-kis',
  CTRL_ZUGRIFF_PATIENTENDATEN: 'medinova-ctrl-zugriffskontrolle-patientendaten',
  // F07 Risiko & Veränderung
  THREAT_AUSFALL_DIENSTLEISTER: 'medinova-threat-ausfall-kritischer-dienstleister',
  WEAK_LIEFERANTEN_MONITORING: 'medinova-weak-lueckenhaftes-lieferanten-monitoring',
  SCENARIO_KIS_AUSFALL: 'medinova-scenario-kis-ausfall-ueber-dienstleister',
  RISK_VERFUEGBARKEIT_KIS: 'medinova-risk-ausfall-kritischer-patientensysteme',
  RISK_LIEFERANTEN_ABHAENGIGKEIT: 'medinova-risk-klumpenrisiko-dienstleisterabhaengigkeit',
  RISK_STANDORT_VERFUEGBARKEIT: 'medinova-risk-verfuegbarkeit-dezentraler-standorte',
  // F08 Arbeit, Nachweis & Assurance
  EVIDENCE_NOTFALLTEST: 'medinova-evidence-notfall-wiederanlauftest',
  EVIDENCE_ZUGRIFFSREVIEW: 'medinova-evidence-zugriffsreview-patientendaten',
  MEASURE_LIEFERANTEN_AUDIT: 'medinova-measure-lieferanten-audit-programm',
  // F09 Ziele, Entscheidungen & Services
  OBJECTIVE_VERFUEGBARKEIT: 'medinova-objective-kritische-verfuegbarkeit',
} as const;

/** Typisierte Objektfabrik (füllt die deterministischen Envelope-Pflichtfelder, Dok. 07 §7). */
function medinovaObject(input: {
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
    tenant_id: TENANT_MEDINOVA,
    object_type: input.object_type,
    display_name: input.display_name,
    description: input.description,
    lifecycle_status: input.lifecycle_status,
    scope_ids: [{ scope_id: SCOPE_VERFUEGBARKEIT, valid_time: { from: VALID_FROM, to: null } }],
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
function medinovaRelationship(input: {
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
    tenant_id: TENANT_MEDINOVA,
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

const M = MEDINOVA_OBJECT_ID;

/* =============================================================================
 * Objekte (30) über F01, F02, F03, F04, F05, F06, F07, F08, F09.
 * ============================================================================= */

export const MEDINOVA_OBJECTS: readonly ObjectEnvelope[] = [
  // --- F01 Tenant & Unternehmenskontext ---
  medinovaObject({
    object_id: M.ORG,
    object_type: 'Organisation',
    display_name: 'MediNova Clinics Holding',
    description:
      'Dezentrale Gesundheitsgruppe mit kritischer Verfügbarkeit sowie Lieferanten- ' +
      'und Standortkomplexität (Dok. 16 §34.1 Nr. 4). Wurzelorganisation des Demo-Graphen.',
    lifecycle_status: 'Freigegeben',
    classification: { confidentiality: 'intern', protection_need: 'normal' },
  }),

  // --- F02 Organisation & Verantwortung (Standortkomplexität: drei Standorte) ---
  medinovaObject({
    object_id: M.STANDORT_KLINIK_NORD,
    object_type: 'Standort',
    display_name: 'Klinik Nord (Akutklinik, primärer Betriebsstandort)',
    description:
      'Akutklinik-Standort; primärer Betriebsstandort des zentralen ' +
      'Krankenhausinformationssystems (KIS). Trägt die höchste Verfügbarkeitsanforderung.',
    lifecycle_status: 'Freigegeben',
  }),
  medinovaObject({
    object_id: M.STANDORT_KLINIK_SUED,
    object_type: 'Standort',
    display_name: 'Klinik Süd (Fachklinik)',
    description:
      'Zweiter Klinikstandort. Teil der dezentralen Gruppe; nutzt das zentrale KIS ' +
      'mit, ist aber organisatorisch eigenständig (Standortkomplexität, Dok. 16 §34.1 Nr. 4).',
    lifecycle_status: 'Freigegeben',
  }),
  medinovaObject({
    object_id: M.STANDORT_MVZ,
    object_type: 'Standort',
    display_name: 'Medizinisches Versorgungszentrum (ambulanter Standort)',
    description:
      'Dritter, ambulanter Standort. Bewusst dünner modelliert — die dezentrale ' +
      'Gruppe zieht Governance und Nachweise an den kleineren Standorten langsamer nach.',
    lifecycle_status: 'Freigegeben',
  }),
  medinovaObject({
    object_id: M.OU_IT_BETRIEB,
    object_type: 'Organisationseinheit',
    display_name: 'Zentrale IT',
    description:
      'Organisationseinheit; koordiniert die IT über die Standorte hinweg. In der ' +
      'dezentralen Gruppe knapp besetzt — der KIS-Betrieb ist an einen externen Dienstleister ' +
      'ausgelagert.',
    lifecycle_status: 'Freigegeben',
  }),
  medinovaObject({
    object_id: M.ROLE_CISO,
    object_type: 'fachliche Rolle',
    display_name: 'Konzern-Informationssicherheitsbeauftragte Rolle (CISO)',
    description:
      'Fachliche Rolle statt Einzelperson (Datenminimierung, Dok. 07 P12/D12). Fachliche Ownerin ' +
      'von Controls, Verfügbarkeits- und Lieferantenrisiken und dem Verfügbarkeitsziel.',
    lifecycle_status: 'Freigegeben',
  }),
  medinovaObject({
    object_id: M.ROLE_KLINIK_IT_LEITUNG,
    object_type: 'fachliche Rolle',
    display_name: 'Klinik-IT-Leitung',
    description:
      'Fachliche Rolle statt Einzelperson (Datenminimierung, Dok. 07 P12/D12). Fachliche Ownerin ' +
      'des stationären Versorgungsprozesses und der Patientendaten.',
    lifecycle_status: 'Freigegeben',
  }),

  // --- F03 Geschäft & Information ---
  medinovaObject({
    object_id: M.CAP_PATIENTENVERSORGUNG,
    object_type: 'Business Capability',
    display_name: 'Patientenversorgung (kritische Verfügbarkeit)',
    description:
      'Geschäftsfähigkeit: die durchgängige, verfügbare Versorgung der Patientinnen ' +
      'und Patienten über alle Standorte. ISMS-Fokus der Gruppe (kritische Verfügbarkeit).',
    lifecycle_status: 'Freigegeben',
  }),
  medinovaObject({
    object_id: M.PROC_STATIONAERE_VERSORGUNG,
    object_type: 'Geschäftsprozess',
    display_name: 'Stationäre Patientenversorgung',
    description:
      'Kernprozess: Aufnahme, Behandlung und Dokumentation der stationären ' +
      'Versorgung über das KIS. Verfügbarkeitskritisch.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [
      { owner_id: M.ROLE_KLINIK_IT_LEITUNG, owner_kind: 'fachlich', role: 'Prozessverantwortung' },
    ],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),
  medinovaObject({
    object_id: M.ASSET_PATIENTENDATEN,
    object_type: 'Information Asset',
    display_name: 'Patienten- und Behandlungsdaten',
    description:
      'Informationswert: die besonders schützenswerten Patienten-, Diagnose- und ' +
      'Behandlungsdaten. Werden auch vom externen Labordienstleister verarbeitet.',
    lifecycle_status: 'freigegeben', // Informations-Lifecycle (Dok. 05 §7)
    owner_ids: [
      { owner_id: M.ROLE_KLINIK_IT_LEITUNG, owner_kind: 'fachlich', role: 'Information Owner' },
    ],
    classification: { confidentiality: 'vertraulich', protection_need: 'hoch' },
  }),

  // --- F04 Technologie & Infrastruktur ---
  medinovaObject({
    object_id: M.SYSTEM_KIS,
    object_type: 'System',
    display_name: 'Krankenhausinformationssystem (KIS)',
    description:
      'Verfügbarkeitskritisches Kernsystem der Gruppe. Wird von einem externen ' +
      'IT-Betriebsdienstleister betrieben und ist bewusst OHNE benannten internen Owner erfasst ' +
      '(kritisches Objekt ohne Owner): in der dezentralen Gruppe beansprucht intern niemand die ' +
      'Verantwortung für das ausgelagerte Kernsystem (Governance-Lücke).',
    // DECKUNGSLÜCKE (kritisch ohne Owner): Schutzbedarf „hoch", KEIN Owner.
    lifecycle_status: 'Freigegeben',
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),

  // --- F05 Dritte & Lieferkette (der MediNova-Differenzierer) ---
  medinovaObject({
    object_id: M.LIEFERANT_IT_BETRIEB,
    object_type: 'Lieferant',
    display_name: 'IT-Betriebsdienstleister (KIS-Betrieb)',
    description:
      'Externer Dienstleister, der den Betrieb des KIS verantwortet. Zentrale ' +
      'Verfügbarkeitsabhängigkeit der Gruppe; stützt sich seinerseits auf einen ' +
      'Rechenzentrums-Unterauftragnehmer.',
    lifecycle_status: 'Freigegeben',
    classification: { confidentiality: 'intern' },
  }),
  medinovaObject({
    object_id: M.LIEFERANT_LABOR,
    object_type: 'Lieferant',
    display_name: 'Externer Labordienstleister',
    description:
      'Externer Labordienstleister, der Diagnostik- und Laborauswertungen erbringt ' +
      'und dabei Patientendaten verarbeitet. Im Datenbestand aus einem veralteten ' +
      'Lieferantenregister übernommen.',
    // VERALTETE QUELLE (Dok.-07-Demo-Graph-Pflicht) über belegte Felder: alte Import-Quelle 2023 +
    // Dimension „Aktualität".
    lifecycle_status: 'Beobachtet',
    classification: { confidentiality: 'intern' },
    source_refs: [
      { source_kind: 'Importjob', reference: 'synthetic-lieferantenregister-2023', priority: 1 },
    ],
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'Ungeprüft' },
      {
        dimension: 'Aktualität',
        note:
          'Veraltete Quelle: der Eintrag stammt aus dem Lieferantenregister-Import 2023 und wurde ' +
          'seither nicht aktualisiert.',
      },
      {
        dimension: 'Herkunft',
        note: 'Automatischer Registerimport ohne fachliche Bestätigung des Lieferantenmanagements.',
      },
    ],
  }),
  medinovaObject({
    object_id: M.UNTERAUFTRAGNEHMER_RZ,
    object_type: 'Unterauftragnehmer',
    display_name: 'Rechenzentrums-Unterauftragnehmer',
    description:
      'Unterauftragnehmer des IT-Betriebsdienstleisters: stellt die Rechenzentrums- ' +
      'und Hosting-Kapazität für das KIS bereit. Zweite Stufe der Lieferkette (Sub-Processor).',
    lifecycle_status: 'Freigegeben',
    classification: { confidentiality: 'intern' },
  }),

  // --- F06 Governance & Anforderungen ---
  medinovaObject({
    object_id: M.FRAMEWORK_ISO,
    object_type: 'Framework',
    display_name: 'ISO/IEC 27001:2022 (Demo-Katalog, Klinikverbund)',
    description:
      'Framework-Kontext für die Anforderungen an Lieferantensteuerung und ' +
      'Verfügbarkeit. Kein Abdruck realer Normtexte.',
    lifecycle_status: 'Freigegeben',
    source_refs: [KATALOG_SOURCE],
  }),
  medinovaObject({
    object_id: M.REQ_LIEFERANTEN,
    object_type: 'Requirement',
    display_name: 'A.5.19 – Informationssicherheit in Lieferantenbeziehungen',
    description:
      'Anforderung: Sicherheitsanforderungen an Dienstleister werden vereinbart, ' +
      'gesteuert und überwacht.',
    lifecycle_status: 'Freigegeben',
    source_refs: [KATALOG_SOURCE],
  }),
  medinovaObject({
    object_id: M.REQ_VERFUEGBARKEIT,
    object_type: 'Requirement',
    display_name: 'A.5.30 – IKT-Bereitschaft für Business Continuity',
    description:
      'Anforderung: die IKT-Bereitschaft für die Aufrechterhaltung kritischer ' +
      'Dienste wird geplant, umgesetzt und getestet.',
    lifecycle_status: 'Freigegeben',
    source_refs: [KATALOG_SOURCE],
  }),
  medinovaObject({
    object_id: M.CTRL_LIEFERANTENSTEUERUNG,
    object_type: 'Control',
    display_name: 'Lieferantensteuerung und -überwachung',
    description:
      'Control zur Steuerung und laufenden Überwachung der kritischen Dienstleister. ' +
      'Umgesetzt, aber im Datenbestand OHNE Nachweis erfasst (bewusste Deckungslücke: Control ohne ' +
      'Nachweis).',
    lifecycle_status: 'implementiert', // Control-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: M.ROLE_CISO, owner_kind: 'fachlich', role: 'Control Owner' }],
  }),
  medinovaObject({
    object_id: M.CTRL_NOTFALLBETRIEB,
    object_type: 'Control',
    display_name: 'Notfall- und Ausweichbetrieb KIS',
    description:
      'Control: geplanter Notfall-/Ausweichbetrieb für das KIS, damit die ' +
      'Patientenversorgung einen Dienstleister- oder Systemausfall übersteht. Durch einen ' +
      'Wiederanlauftest belegt.',
    lifecycle_status: 'wirksam', // Control-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: M.OU_IT_BETRIEB, owner_kind: 'technisch', role: 'Betrieb' }],
  }),
  medinovaObject({
    object_id: M.CTRL_ZUGRIFF_PATIENTENDATEN,
    object_type: 'Control',
    display_name: 'Zugriffskontrolle Patientendaten',
    description:
      'Control zur Steuerung des Zugriffs auf die Patienten- und Behandlungsdaten ' +
      '(auch an der Schnittstelle zum externen Labordienstleister). Durch einen Zugriffsreview belegt.',
    lifecycle_status: 'wirksam', // Control-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: M.ROLE_CISO, owner_kind: 'fachlich', role: 'Control Owner' }],
  }),

  // --- F07 Risiko & Veränderung ---
  medinovaObject({
    object_id: M.THREAT_AUSFALL_DIENSTLEISTER,
    object_type: 'Threat',
    display_name: 'Ausfall eines kritischen Dienstleisters',
    description:
      'Bedrohung: Ausfall oder schwere Störung eines kritischen Dienstleisters ' +
      '(IT-Betrieb oder Rechenzentrum) unterbricht den KIS-Betrieb.',
    lifecycle_status: 'Beobachtet',
    source_refs: [
      { source_kind: 'Extraktionsregel', reference: 'synthetic-threat-feed', priority: 1 },
    ],
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'maschinell plausibilisiert' },
      { dimension: 'Aktualität', note: 'Bedrohungssignal, Demo-Stand 2026-06.' },
    ],
  }),
  medinovaObject({
    object_id: M.WEAK_LIEFERANTEN_MONITORING,
    object_type: 'Weakness',
    display_name: 'Lückenhaftes Lieferanten-Monitoring',
    description:
      'Schwäche: das laufende Monitoring der kritischen Dienstleister ist über die ' +
      'dezentralen Standorte uneinheitlich. Der Datenbestand trägt zwei widersprüchliche Quellen zu ' +
      'ihrem Zustand (Konflikt, siehe Konsistenz-Vermerk).',
    lifecycle_status: 'Geprüft',
    // KONFLIKT (Dok.-07-Demo-Graph-Pflicht) über belegte Felder: zwei widersprüchliche
    // `source_refs` (unterschiedliche Priorität) + Dimension „Konsistenz".
    source_refs: [
      { source_kind: 'Import', reference: 'synthetic-lieferanten-scan-2026-06', priority: 1 },
      { source_kind: 'Nutzer', reference: 'demo-selbstauskunft-zentrale-it-2026-06', priority: 2 },
    ],
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'maschinell plausibilisiert' },
      {
        dimension: 'Konsistenz',
        note:
          'Konflikt: der Lieferanten-Scan meldet das Monitoring als lückenhaft offen, die ' +
          'Selbstauskunft der zentralen IT meldet es als geschlossen. Widerspruch nicht aufgelöst.',
      },
    ],
  }),
  medinovaObject({
    object_id: M.SCENARIO_KIS_AUSFALL,
    object_type: 'Risk Scenario',
    display_name: 'KIS-Ausfall durch Dienstleisterstörung',
    description:
      'Risikoszenario: eine Störung beim IT-Betriebsdienstleister oder seinem ' +
      'Rechenzentrums-Unterauftragnehmer führt zum Ausfall des KIS und damit der Versorgung.',
    lifecycle_status: 'bewertet', // Risiko-Lifecycle (Dok. 05 §7)
  }),
  medinovaObject({
    object_id: M.RISK_VERFUEGBARKEIT_KIS,
    object_type: 'Risk',
    display_name: 'Ausfall der kritischen Patientensysteme',
    description:
      'Risiko: Ausfall des KIS beeinträchtigt die stationäre Versorgung. Wird durch ' +
      'den Notfall-/Ausweichbetrieb gemindert.',
    lifecycle_status: 'behandelt', // Risiko-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: M.ROLE_CISO, owner_kind: 'fachlich', role: 'Risk Owner' }],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),
  medinovaObject({
    object_id: M.RISK_LIEFERANTEN_ABHAENGIGKEIT,
    object_type: 'Risk',
    display_name: 'Klumpenrisiko Dienstleisterabhängigkeit',
    description:
      'Risiko: die starke Abhängigkeit von einem einzelnen IT-Betriebsdienstleister ' +
      '(mit eigenem Sub-Processor) bündelt das Verfügbarkeitsrisiko. Neu identifiziert und im ' +
      'Datenbestand OHNE mindernde Beziehung erfasst (bewusste Deckungslücke: Risiko ohne Minderung).',
    // ERKLÄRBARER TRUST-STATE (Dok.-07-Demo-Graph-Pflicht) über belegte Felder: niedrige
    // Bestätigung + Herkunft/Vollständigkeit; die affects-Kante trägt niedrigen confidence.
    lifecycle_status: 'identifiziert', // Risiko-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: M.ROLE_CISO, owner_kind: 'fachlich', role: 'Risk Owner' }],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'Ungeprüft' },
      {
        dimension: 'Herkunft',
        note:
          'Aus dem Lieferanten-Risikoworkshop 2026-06 abgeleitet, noch nicht mit dem ' +
          'Lieferantenmanagement abgeglichen.',
      },
      {
        dimension: 'Vollständigkeit',
        note: 'Wirkungsabschätzung offen; im Datenbestand ist keine mindernde Beziehung erfasst.',
      },
    ],
  }),
  medinovaObject({
    object_id: M.RISK_STANDORT_VERFUEGBARKEIT,
    object_type: 'Risk',
    display_name: 'Verfügbarkeit dezentraler Standorte',
    description:
      'Risiko: an den kleineren, dezentralen Standorten sind Ausweich- und ' +
      'Wiederanlaufvorkehrungen ungleich reifer. Bewusst OHNE mindernde Beziehung erfasst ' +
      '(zusätzliche Deckungslücke: Verfügbarkeitsrisiko ohne Minderung).',
    lifecycle_status: 'bewertet', // Risiko-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: M.ROLE_CISO, owner_kind: 'fachlich', role: 'Risk Owner' }],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),

  // --- F08 Arbeit, Nachweis & Assurance ---
  medinovaObject({
    object_id: M.EVIDENCE_NOTFALLTEST,
    object_type: 'Evidence',
    display_name: 'Notfall- und Wiederanlauftest KIS',
    description:
      'Nachweis: dokumentierter Test des Notfall-/Ausweichbetriebs und Wiederanlaufs ' + 'des KIS.',
    lifecycle_status: 'akzeptiert', // Evidence-Lifecycle (Dok. 05 §7)
    quality: [{ dimension: 'Bestätigung', confirmation_level: 'reviewed' }],
    source_refs: [
      { source_kind: 'Datei', reference: 'synthetic-notfalltest-kis-2026-06', priority: 1 },
    ],
  }),
  medinovaObject({
    object_id: M.EVIDENCE_ZUGRIFFSREVIEW,
    object_type: 'Evidence',
    display_name: 'Zugriffsreview Patientendaten Q2/2026',
    description:
      'Nachweis: dokumentierter Review der Zugriffsberechtigungen auf die Patienten- ' +
      'und Behandlungsdaten, inklusive der Labor-Schnittstelle.',
    lifecycle_status: 'akzeptiert', // Evidence-Lifecycle (Dok. 05 §7)
    quality: [{ dimension: 'Bestätigung', confirmation_level: 'reviewed' }],
    source_refs: [
      {
        source_kind: 'Datei',
        reference: 'synthetic-zugriffsreview-patientendaten-q2-2026',
        priority: 1,
      },
    ],
  }),
  medinovaObject({
    object_id: M.MEASURE_LIEFERANTEN_AUDIT,
    object_type: 'Measure',
    display_name: 'Lieferanten-Audit-Programm',
    description:
      'Maßnahme: Aufbau eines wiederkehrenden Audit-/Überwachungsprogramms für die ' +
      'kritischen Dienstleister, um das lückenhafte Monitoring zu schließen.',
    lifecycle_status: 'in Arbeit', // Maßnahmen-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: M.ROLE_CISO, owner_kind: 'fachlich', role: 'Maßnahmenverantwortung' }],
  }),

  // --- F09 Ziele, Entscheidungen & Services ---
  medinovaObject({
    object_id: M.OBJECTIVE_VERFUEGBARKEIT,
    object_type: 'Objective',
    display_name: 'Sicherstellung kritischer Verfügbarkeit',
    description:
      'Ziel: die kritische Verfügbarkeit der Patientenversorgung über alle Standorte ' +
      'und Dienstleister hinweg sicherzustellen (Dok. 16 §34.1 Nr. 4). Kein numerischer Zielwert ' +
      'und keine Kennzahl sind erfasst.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [{ owner_id: M.ROLE_CISO, owner_kind: 'fachlich', role: 'Objective Owner' }],
  }),
] as const;

/* =============================================================================
 * Beziehungen (36) – ausschließlich kanonische Typen R01–R25 in dokumentierter Richtung.
 * Erstmals im Seed belegt: R04 `operates` (Lieferant -> System) und R11 `caused_by`
 * (Risk -> Weakness/Ursache).
 * ============================================================================= */

export const MEDINOVA_RELATIONSHIPS: readonly RelationshipEnvelope[] = [
  // R01 part_of: Organisationseinheit und Standorte -> Organisation
  medinovaRelationship({
    relationship_id: 'medinova-rel-01-part_of-ou-it-org',
    relationship_type: 'part_of',
    source_id: M.OU_IT_BETRIEB,
    target_id: M.ORG,
    assertion_kind: 'assertiert',
  }),
  medinovaRelationship({
    relationship_id: 'medinova-rel-02-part_of-standort-nord-org',
    relationship_type: 'part_of',
    source_id: M.STANDORT_KLINIK_NORD,
    target_id: M.ORG,
    assertion_kind: 'assertiert',
  }),
  medinovaRelationship({
    relationship_id: 'medinova-rel-03-part_of-standort-sued-org',
    relationship_type: 'part_of',
    source_id: M.STANDORT_KLINIK_SUED,
    target_id: M.ORG,
    assertion_kind: 'assertiert',
  }),
  medinovaRelationship({
    relationship_id: 'medinova-rel-04-part_of-standort-mvz-org',
    relationship_type: 'part_of',
    source_id: M.STANDORT_MVZ,
    target_id: M.ORG,
    assertion_kind: 'assertiert',
  }),
  // R01 part_of: Requirements -> Framework
  medinovaRelationship({
    relationship_id: 'medinova-rel-05-part_of-req-lieferanten-framework',
    relationship_type: 'part_of',
    source_id: M.REQ_LIEFERANTEN,
    target_id: M.FRAMEWORK_ISO,
    assertion_kind: 'importiert',
    source_refs: [KATALOG_SOURCE],
  }),
  medinovaRelationship({
    relationship_id: 'medinova-rel-06-part_of-req-verfuegbarkeit-framework',
    relationship_type: 'part_of',
    source_id: M.REQ_VERFUEGBARKEIT,
    target_id: M.FRAMEWORK_ISO,
    assertion_kind: 'importiert',
    source_refs: [KATALOG_SOURCE],
  }),

  // R02 located_at: KIS -> primärer Betriebsstandort
  medinovaRelationship({
    relationship_id: 'medinova-rel-07-located_at-kis-standort-nord',
    relationship_type: 'located_at',
    source_id: M.SYSTEM_KIS,
    target_id: M.STANDORT_KLINIK_NORD,
    assertion_kind: 'assertiert',
  }),

  // R03 owns: fachliche Rollen / Einheit -> Objekte
  medinovaRelationship({
    relationship_id: 'medinova-rel-08-owns-ciso-ctrl-lieferantensteuerung',
    relationship_type: 'owns',
    source_id: M.ROLE_CISO,
    target_id: M.CTRL_LIEFERANTENSTEUERUNG,
    assertion_kind: 'assertiert',
  }),
  medinovaRelationship({
    relationship_id: 'medinova-rel-09-owns-ciso-risk-lieferanten-abhaengigkeit',
    relationship_type: 'owns',
    source_id: M.ROLE_CISO,
    target_id: M.RISK_LIEFERANTEN_ABHAENGIGKEIT,
    assertion_kind: 'assertiert',
  }),
  medinovaRelationship({
    relationship_id: 'medinova-rel-10-owns-klinik-it-proc-versorgung',
    relationship_type: 'owns',
    source_id: M.ROLE_KLINIK_IT_LEITUNG,
    target_id: M.PROC_STATIONAERE_VERSORGUNG,
    assertion_kind: 'assertiert',
  }),
  medinovaRelationship({
    relationship_id: 'medinova-rel-11-owns-klinik-it-asset-patientendaten',
    relationship_type: 'owns',
    source_id: M.ROLE_KLINIK_IT_LEITUNG,
    target_id: M.ASSET_PATIENTENDATEN,
    assertion_kind: 'assertiert',
  }),
  medinovaRelationship({
    relationship_id: 'medinova-rel-12-owns-ou-it-ctrl-notfallbetrieb',
    relationship_type: 'owns',
    source_id: M.OU_IT_BETRIEB,
    target_id: M.CTRL_NOTFALLBETRIEB,
    assertion_kind: 'assertiert',
  }),

  // R04 operates (ERSTMALS im Seed): externer Dienstleister -> System (operativer Betrieb; das KIS
  // bleibt bewusst OHNE internen Owner — die operative Verantwortung liegt außerhalb).
  medinovaRelationship({
    relationship_id: 'medinova-rel-13-operates-lieferant-it-kis',
    relationship_type: 'operates',
    source_id: M.LIEFERANT_IT_BETRIEB,
    target_id: M.SYSTEM_KIS,
    assertion_kind: 'assertiert',
    status: 'ausgelagerter Betrieb',
  }),

  // R05 supports: Prozess -> Capability
  medinovaRelationship({
    relationship_id: 'medinova-rel-14-supports-proc-capability',
    relationship_type: 'supports',
    source_id: M.PROC_STATIONAERE_VERSORGUNG,
    target_id: M.CAP_PATIENTENVERSORGUNG,
    assertion_kind: 'assertiert',
  }),

  // R06 depends_on: Prozess/System -> System/Lieferant (Verfügbarkeits-/Lieferkettenabhängigkeit)
  medinovaRelationship({
    relationship_id: 'medinova-rel-15-depends_on-proc-kis',
    relationship_type: 'depends_on',
    source_id: M.PROC_STATIONAERE_VERSORGUNG,
    target_id: M.SYSTEM_KIS,
    assertion_kind: 'assertiert',
  }),
  medinovaRelationship({
    relationship_id: 'medinova-rel-16-depends_on-kis-lieferant-it',
    relationship_type: 'depends_on',
    source_id: M.SYSTEM_KIS,
    target_id: M.LIEFERANT_IT_BETRIEB,
    assertion_kind: 'assertiert',
  }),
  medinovaRelationship({
    relationship_id: 'medinova-rel-17-depends_on-proc-lieferant-labor',
    relationship_type: 'depends_on',
    source_id: M.PROC_STATIONAERE_VERSORGUNG,
    target_id: M.LIEFERANT_LABOR,
    assertion_kind: 'assertiert',
  }),
  // Zweite Stufe der Lieferkette: der IT-Betriebsdienstleister hängt an seinem Sub-Processor.
  medinovaRelationship({
    relationship_id: 'medinova-rel-18-depends_on-lieferant-it-unterauftragnehmer-rz',
    relationship_type: 'depends_on',
    source_id: M.LIEFERANT_IT_BETRIEB,
    target_id: M.UNTERAUFTRAGNEHMER_RZ,
    assertion_kind: 'assertiert',
  }),

  // R07 processes: Prozess/Lieferant -> Information Asset
  medinovaRelationship({
    relationship_id: 'medinova-rel-19-processes-proc-patientendaten',
    relationship_type: 'processes',
    source_id: M.PROC_STATIONAERE_VERSORGUNG,
    target_id: M.ASSET_PATIENTENDATEN,
    assertion_kind: 'assertiert',
  }),
  // Datenverarbeitung durch Dritte: der externe Labordienstleister verarbeitet Patientendaten.
  medinovaRelationship({
    relationship_id: 'medinova-rel-20-processes-lieferant-labor-patientendaten',
    relationship_type: 'processes',
    source_id: M.LIEFERANT_LABOR,
    target_id: M.ASSET_PATIENTENDATEN,
    assertion_kind: 'assertiert',
  }),

  // R08 exposes: Weakness -> Information Asset
  medinovaRelationship({
    relationship_id: 'medinova-rel-21-exposes-weak-monitoring-patientendaten',
    relationship_type: 'exposes',
    source_id: M.WEAK_LIEFERANTEN_MONITORING,
    target_id: M.ASSET_PATIENTENDATEN,
    assertion_kind: 'importiert',
    confidence: 0.6,
    source_refs: [
      { source_kind: 'Import', reference: 'synthetic-lieferanten-scan-2026-06', priority: 1 },
    ],
  }),

  // R09 threatens: Threat -> Risk Scenario
  medinovaRelationship({
    relationship_id: 'medinova-rel-22-threatens-threat-scenario',
    relationship_type: 'threatens',
    source_id: M.THREAT_AUSFALL_DIENSTLEISTER,
    target_id: M.SCENARIO_KIS_AUSFALL,
    assertion_kind: 'abgeleitet',
    confidence: 0.5,
  }),

  // R10 affects: Risk -> Geschäftsprozess / Objective
  medinovaRelationship({
    relationship_id: 'medinova-rel-23-affects-risk-verfuegbarkeit-proc',
    relationship_type: 'affects',
    source_id: M.RISK_VERFUEGBARKEIT_KIS,
    target_id: M.PROC_STATIONAERE_VERSORGUNG,
    assertion_kind: 'abgeleitet',
    confidence: 0.7,
  }),
  medinovaRelationship({
    relationship_id: 'medinova-rel-24-affects-risk-lieferanten-abhaengigkeit-proc',
    relationship_type: 'affects',
    source_id: M.RISK_LIEFERANTEN_ABHAENGIGKEIT,
    target_id: M.PROC_STATIONAERE_VERSORGUNG,
    assertion_kind: 'abgeleitet',
    // Niedriger Vertrauensgrad – Teil des erklärbaren Trust-States (neu identifiziert, ungeprüft).
    confidence: 0.4,
  }),
  medinovaRelationship({
    relationship_id: 'medinova-rel-25-affects-risk-standort-objective',
    relationship_type: 'affects',
    source_id: M.RISK_STANDORT_VERFUEGBARKEIT,
    target_id: M.OBJECTIVE_VERFUEGBARKEIT,
    assertion_kind: 'abgeleitet',
    confidence: 0.6,
  }),

  // R11 caused_by (ERSTMALS im Seed): das Klumpenrisiko wird durch die Monitoring-Schwäche
  // (Ursache) mitverursacht – kausale Hypothese mit Vertrauensgrad (Dok. 07 §9 R11).
  medinovaRelationship({
    relationship_id: 'medinova-rel-26-caused_by-risk-abhaengigkeit-weak-monitoring',
    relationship_type: 'caused_by',
    source_id: M.RISK_LIEFERANTEN_ABHAENGIGKEIT,
    target_id: M.WEAK_LIEFERANTEN_MONITORING,
    assertion_kind: 'abgeleitet',
    confidence: 0.5,
  }),

  // R12 mitigates: Control -> Risk / Risk Scenario
  // (RISK_LIEFERANTEN_ABHAENGIGKEIT und RISK_STANDORT_VERFUEGBARKEIT erhalten BEWUSST keine
  // mitigates-Kante → mehrere Deckungslücken.)
  medinovaRelationship({
    relationship_id: 'medinova-rel-27-mitigates-ctrl-notfallbetrieb-risk-verfuegbarkeit',
    relationship_type: 'mitigates',
    source_id: M.CTRL_NOTFALLBETRIEB,
    target_id: M.RISK_VERFUEGBARKEIT_KIS,
    assertion_kind: 'freigegeben',
    confidence: 0.75,
    effectiveness_assumption:
      'Erwartete Reduktion der Ausfallwirkung durch geplanten Notfall-/Ausweichbetrieb des KIS ' +
      '(synthetische Annahme, keine Garantie).',
  }),
  medinovaRelationship({
    relationship_id: 'medinova-rel-28-mitigates-ctrl-notfallbetrieb-scenario',
    relationship_type: 'mitigates',
    source_id: M.CTRL_NOTFALLBETRIEB,
    target_id: M.SCENARIO_KIS_AUSFALL,
    assertion_kind: 'freigegeben',
    confidence: 0.6,
  }),

  // R14 satisfies: Control -> Requirement
  medinovaRelationship({
    relationship_id: 'medinova-rel-29-satisfies-ctrl-lieferantensteuerung-req',
    relationship_type: 'satisfies',
    source_id: M.CTRL_LIEFERANTENSTEUERUNG,
    target_id: M.REQ_LIEFERANTEN,
    assertion_kind: 'freigegeben',
  }),
  medinovaRelationship({
    relationship_id: 'medinova-rel-30-satisfies-ctrl-notfallbetrieb-req',
    relationship_type: 'satisfies',
    source_id: M.CTRL_NOTFALLBETRIEB,
    target_id: M.REQ_VERFUEGBARKEIT,
    assertion_kind: 'freigegeben',
  }),

  // R15 evidences: Evidence -> Control
  // (CTRL_LIEFERANTENSTEUERUNG erhält BEWUSST keine evidences-Kante → Deckungslücke.)
  medinovaRelationship({
    relationship_id: 'medinova-rel-31-evidences-notfalltest-ctrl-notfallbetrieb',
    relationship_type: 'evidences',
    source_id: M.EVIDENCE_NOTFALLTEST,
    target_id: M.CTRL_NOTFALLBETRIEB,
    assertion_kind: 'freigegeben',
    status: 'geprüft',
  }),
  medinovaRelationship({
    relationship_id: 'medinova-rel-32-evidences-zugriffsreview-ctrl-zugriff',
    relationship_type: 'evidences',
    source_id: M.EVIDENCE_ZUGRIFFSREVIEW,
    target_id: M.CTRL_ZUGRIFF_PATIENTENDATEN,
    assertion_kind: 'freigegeben',
    status: 'geprüft',
  }),

  // R18 remediates: Measure -> Weakness
  medinovaRelationship({
    relationship_id: 'medinova-rel-33-remediates-measure-audit-weak-monitoring',
    relationship_type: 'remediates',
    source_id: M.MEASURE_LIEFERANTEN_AUDIT,
    target_id: M.WEAK_LIEFERANTEN_MONITORING,
    assertion_kind: 'assertiert',
  }),

  // R19 requires: Objective -> Control (verbindliche Abhängigkeit im Scope)
  medinovaRelationship({
    relationship_id: 'medinova-rel-34-requires-objective-ctrl-notfallbetrieb',
    relationship_type: 'requires',
    source_id: M.OBJECTIVE_VERFUEGBARKEIT,
    target_id: M.CTRL_NOTFALLBETRIEB,
    assertion_kind: 'assertiert',
    status: 'im Scope',
  }),
  // Das Verfügbarkeitsziel verlangt die (noch unbelegte) Lieferantensteuerungs-Control – macht die
  // Deckungslücke an der Zielerreichung sichtbar.
  medinovaRelationship({
    relationship_id: 'medinova-rel-35-requires-objective-ctrl-lieferantensteuerung',
    relationship_type: 'requires',
    source_id: M.OBJECTIVE_VERFUEGBARKEIT,
    target_id: M.CTRL_LIEFERANTENSTEUERUNG,
    assertion_kind: 'assertiert',
    status: 'offen',
  }),

  // R20 contributes_to: Control -> Objective (begründeter Wirkungsbeitrag ohne Garantie)
  medinovaRelationship({
    relationship_id: 'medinova-rel-36-contributes_to-ctrl-notfallbetrieb-objective',
    relationship_type: 'contributes_to',
    source_id: M.CTRL_NOTFALLBETRIEB,
    target_id: M.OBJECTIVE_VERFUEGBARKEIT,
    assertion_kind: 'assertiert',
  }),
] as const;
