/**
 * Kohärenter, synthetischer Objektgraph für den Demo-Mandanten Nordwerk Manufacturing SE.
 *
 * STRUKTUR / VOKABULAR (verbindlich): Objekttypen F01–F09 und Beziehungstypen R01–R25 sind
 * strikt dem kanonischen Vertrag `@isms/contracts` (abgeleitet aus Dok. 07 v1.0) entnommen.
 * Es wird NICHTS am Modell erfunden.
 *
 * INHALT (bewusst synthetisch, `.claude/rules/demo-data.md`): Firmen-, Prozess-, Asset-,
 * Risiko-, Control- und Evidence-Werte sind frei erfunden und plausibel. KEINE realen
 * Unternehmen, Personen oder Preise.
 *
 * Kette (Dok. 07 §19 "Neue Schwachstelle" / §21 Navigationsvertrag), gebildet ausschließlich
 * aus kanonischen Beziehungstypen und ihren dokumentierten Richtungen (source -> target):
 *
 *   Geschäftsprozess --R07 processes-->      Information Asset
 *   Weakness         --R08 exposes-->        Information Asset
 *   Threat           --R09 threatens-->      Risk Scenario / Information Asset
 *   Risk             --R10 affects-->        Geschäftsprozess / Information Asset
 *   Control          --R12 mitigates-->      Risk
 *   Control Impl.    --R13 implements-->     Control
 *   Control          --R14 satisfies-->      Requirement
 *   Evidence         --R15 evidences-->      Control
 *   Measure          --R18 remediates-->     Weakness
 *
 * Alle Objekte/Beziehungen tragen tenant_id = Nordwerk (harte Mandantengrenze, Dok. 07 P09, Dok. 19).
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

const TENANT_NORDWERK = TENANT_ID.NORDWERK;

/**
 * Feste, deterministische Zeitpunkte (kein Date.now()/Random, damit die Seed reproduzierbar
 * ist – Demo-Datenregel & `.claude/rules/testing.md`). Fachliche Gültigkeit (valid_time) und
 * Systemerfassung (record_time) sind bewusst unterschiedlich (Bitemporalität, Dok. 07 §11).
 */
const VALID_FROM = '2026-01-01T00:00:00.000Z';
const RECORDED_AT = '2026-01-15T08:00:00.000Z';

/** Gemeinsamer ISMS-Kern-Scope des Mandanten Nordwerk (synthetisch). */
const SCOPE_ISMS_CORE = 'scope-nordwerk-isms-core';

/** Standard-Quellreferenz: geführter Demo-Workshop (synthetisch). */
const WORKSHOP_SOURCE: SourceRef = {
  source_kind: 'Nutzer',
  reference: 'demo-workshop-nordwerk',
  priority: 1,
};

/* -----------------------------------------------------------------------------
 * Stabile Objekt-IDs (P02: unveränderlich, nie aus Namen abgeleitet -> hier bewusst
 * sprechende, aber feste Schlüssel für die Demo).
 * --------------------------------------------------------------------------- */
export const NORDWERK_OBJECT_ID = {
  ORG: 'nordwerk-org',
  OU_PRODUKTION: 'nordwerk-ou-produktion',
  OU_IT_BETRIEB: 'nordwerk-team-it-betrieb',
  ROLE_PROZESSVERANTWORTUNG: 'nordwerk-role-prozessverantwortung',
  ROLE_CISO: 'nordwerk-role-ciso',
  PROC_AUFTRAGSABWICKLUNG: 'nordwerk-proc-auftragsabwicklung',
  ASSET_KUNDENAUFTRAGSDATEN: 'nordwerk-asset-kundenauftragsdaten',
  FRAMEWORK_ISO27001: 'nordwerk-framework-iso27001',
  REQ_BACKUP: 'nordwerk-req-a-8-13-backup',
  CTRL_BACKUP: 'nordwerk-ctrl-backup-recovery',
  CTRLIMPL_BACKUP: 'nordwerk-ctrlimpl-backup-job-erp',
  THREAT_RANSOMWARE: 'nordwerk-threat-ransomware',
  WEAK_ERP_SCHNITTSTELLE: 'nordwerk-weak-erp-schnittstelle',
  SCENARIO_VERSCHLUESSELUNG: 'nordwerk-scenario-verschluesselung',
  RISK_BETRIEBSUNTERBRECHUNG: 'nordwerk-risk-betriebsunterbrechung',
  MEASURE_PATCH: 'nordwerk-measure-patch-management',
  EVIDENCE_RESTORE_TEST: 'nordwerk-evidence-restore-test',
} as const;

/**
 * Typisierte Fabrik für ein Nordwerk-Objekt. Füllt die deterministischen Envelope-Pflichtfelder
 * (Dok. 07 §7) auf; alle fachlichen Werte sind explizit anzugeben. Rückgabetyp ist der
 * kanonische `ObjectEnvelope`, sodass Fehlgebrauch bereits beim Typecheck auffällt.
 */
function nordwerkObject(input: {
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
    tenant_id: TENANT_NORDWERK,
    object_type: input.object_type,
    display_name: input.display_name,
    description: input.description,
    lifecycle_status: input.lifecycle_status,
    scope_ids: [{ scope_id: SCOPE_ISMS_CORE, valid_time: { from: VALID_FROM, to: null } }],
    owner_ids: input.owner_ids ?? [],
    classification: input.classification ?? {},
    source_refs: input.source_refs ?? [WORKSHOP_SOURCE],
    valid_time: { from: VALID_FROM, to: null },
    record_time: { recorded_at: RECORDED_AT },
    version: 1,
    quality_state: {
      dimensions: input.quality ?? [{ dimension: 'Bestätigung', confirmation_level: 'freigegeben' }],
    },
  };
}

/**
 * Typisierte Fabrik für eine Nordwerk-Beziehung (Dok. 07 §9). Richtung ist "gerichtet"
 * (source_id -> target_id). Rückgabetyp ist der kanonische `RelationshipEnvelope`.
 */
function nordwerkRelationship(input: {
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
    tenant_id: TENANT_NORDWERK,
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

const O = NORDWERK_OBJECT_ID;

/* =============================================================================
 * Objekte (17) über sechs Objektfamilien: F01, F02, F03, F06, F07, F08.
 * Alle in owner_ids referenzierten Rollen/Einheiten sind als echte Seed-Objekte
 * materialisiert (F02), sodass jede owner_id auf ein existierendes Objekt auflöst.
 * ============================================================================= */

export const NORDWERK_OBJECTS: readonly ObjectEnvelope[] = [
  // --- F01 Tenant & Unternehmenskontext ---
  nordwerkObject({
    object_id: O.ORG,
    object_type: 'Organisation',
    display_name: 'Nordwerk Manufacturing SE',
    description: 'Synthetischer Fertigungskonzern (Wurzelorganisation des Demo-Graphen).',
    lifecycle_status: 'Freigegeben',
    classification: { confidentiality: 'intern', protection_need: 'normal' },
  }),

  // --- F02 Organisation & Verantwortung ---
  nordwerkObject({
    object_id: O.OU_PRODUKTION,
    object_type: 'Organisationseinheit',
    display_name: 'Werk Nord – Produktion',
    description: 'Synthetische Produktionseinheit; betreibt die Auftragsabwicklung.',
    lifecycle_status: 'Freigegeben',
  }),
  nordwerkObject({
    object_id: O.ROLE_PROZESSVERANTWORTUNG,
    object_type: 'fachliche Rolle',
    display_name: 'Prozessverantwortung Auftragsabwicklung',
    description:
      'Fachliche Rolle statt Einzelperson (Datenminimierung, Dok. 07 P12/D12). ' +
      'Trägt Verantwortung für Prozess und zugehörige Informationswerte.',
    lifecycle_status: 'Freigegeben',
  }),
  nordwerkObject({
    object_id: O.ROLE_CISO,
    object_type: 'fachliche Rolle',
    display_name: 'CISO (Informationssicherheitsbeauftragte Rolle)',
    description:
      'Fachliche Rolle statt Einzelperson (Datenminimierung, Dok. 07 P12/D12). ' +
      'Fachlicher Owner von Control und Risiko im Demo-Graphen.',
    lifecycle_status: 'Freigegeben',
  }),
  nordwerkObject({
    object_id: O.OU_IT_BETRIEB,
    object_type: 'Organisationseinheit',
    display_name: 'IT-Betrieb',
    description:
      'Synthetische Organisationseinheit; technischer Owner der Backup-Control-Implementierung.',
    lifecycle_status: 'Freigegeben',
  }),

  // --- F03 Geschäft & Information ---
  nordwerkObject({
    object_id: O.PROC_AUFTRAGSABWICKLUNG,
    object_type: 'Geschäftsprozess',
    display_name: 'Auftragsabwicklung',
    description: 'Synthetischer Kernprozess: Annahme, Planung und Fertigung von Kundenaufträgen.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [
      { owner_id: O.ROLE_PROZESSVERANTWORTUNG, owner_kind: 'fachlich', role: 'Prozessverantwortung' },
    ],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),
  nordwerkObject({
    object_id: O.ASSET_KUNDENAUFTRAGSDATEN,
    object_type: 'Information Asset',
    display_name: 'Kundenauftragsdaten',
    description: 'Synthetischer Informationswert: Auftrags-, Stückzahl- und Lieferdaten der Kunden.',
    lifecycle_status: 'freigegeben', // Informations-Lifecycle (Dok. 05 §7)
    owner_ids: [
      { owner_id: O.ROLE_PROZESSVERANTWORTUNG, owner_kind: 'fachlich', role: 'Information Owner' },
    ],
    classification: { confidentiality: 'vertraulich', protection_need: 'hoch' },
  }),

  // --- F06 Governance & Anforderungen ---
  nordwerkObject({
    object_id: O.FRAMEWORK_ISO27001,
    object_type: 'Framework',
    display_name: 'ISO/IEC 27001:2022 (Demo-Katalog)',
    description: 'Synthetischer Framework-Kontext für die Demo. Kein Abdruck realer Normtexte.',
    lifecycle_status: 'Freigegeben',
    source_refs: [{ source_kind: 'Dokument', reference: 'synthetic-iso27001-katalog', priority: 1 }],
  }),
  nordwerkObject({
    object_id: O.REQ_BACKUP,
    object_type: 'Requirement',
    display_name: 'A.8.13 – Informationssicherung (Backup)',
    description: 'Synthetische Anforderung: geprüfte, wiederherstellbare Datensicherung.',
    lifecycle_status: 'Freigegeben',
    source_refs: [{ source_kind: 'Dokument', reference: 'synthetic-iso27001-katalog', priority: 1 }],
  }),
  nordwerkObject({
    object_id: O.CTRL_BACKUP,
    object_type: 'Control',
    display_name: 'Backup & Recovery Control',
    description: 'Synthetisches generisches Control zur Sicherung und Wiederherstellung kritischer Daten.',
    lifecycle_status: 'wirksam', // Control-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: O.ROLE_CISO, owner_kind: 'fachlich', role: 'Control Owner' }],
  }),
  nordwerkObject({
    object_id: O.CTRLIMPL_BACKUP,
    object_type: 'Control Implementation',
    display_name: 'Backup-Job Werk Nord (ERP)',
    description: 'Synthetische lokale Umsetzung des Backup-Controls für die ERP-Auftragsdaten.',
    lifecycle_status: 'implementiert', // Control-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: O.OU_IT_BETRIEB, owner_kind: 'technisch', role: 'Betrieb' }],
  }),

  // --- F07 Risiko & Veränderung ---
  nordwerkObject({
    object_id: O.THREAT_RANSOMWARE,
    object_type: 'Threat',
    display_name: 'Ransomware-Angriff auf Produktionsnetz',
    description: 'Synthetische Bedrohung: Verschlüsselung produktionsrelevanter Systeme und Daten.',
    lifecycle_status: 'Beobachtet',
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'maschinell plausibilisiert' },
      { dimension: 'Aktualität', note: 'Synthetisches Bedrohungssignal, Demo-Stand 2026-01.' },
    ],
    source_refs: [{ source_kind: 'Extraktionsregel', reference: 'synthetic-threat-feed', priority: 1 }],
  }),
  nordwerkObject({
    object_id: O.WEAK_ERP_SCHNITTSTELLE,
    object_type: 'Weakness',
    display_name: 'Ungepatchte ERP-Integrationsschnittstelle',
    description: 'Synthetische Schwäche: veraltete Middleware-Version an der ERP-Schnittstelle.',
    lifecycle_status: 'Geprüft',
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'maschinell plausibilisiert' },
      { dimension: 'Herkunft', note: 'Import aus synthetischem Schwachstellenscan.' },
    ],
    source_refs: [{ source_kind: 'Import', reference: 'synthetic-vuln-scan-2026-02', priority: 1 }],
  }),
  nordwerkObject({
    object_id: O.SCENARIO_VERSCHLUESSELUNG,
    object_type: 'Risk Scenario',
    display_name: 'Verschlüsselung der Auftragsdaten durch Ransomware',
    description:
      'Synthetisches Risikoszenario: Ransomware nutzt die ERP-Schwäche und verschlüsselt ' +
      'die Kundenauftragsdaten.',
    lifecycle_status: 'bewertet', // Risiko-Lifecycle (Dok. 05 §7)
  }),
  nordwerkObject({
    object_id: O.RISK_BETRIEBSUNTERBRECHUNG,
    object_type: 'Risk',
    display_name: 'Betriebsunterbrechung Auftragsabwicklung',
    description:
      'Synthetisches Risiko: Ausfall der Auftragsabwicklung durch Verlust/Verschlüsselung ' +
      'der Kundenauftragsdaten.',
    lifecycle_status: 'behandelt', // Risiko-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: O.ROLE_CISO, owner_kind: 'fachlich', role: 'Risk Owner' }],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),

  // --- F08 Arbeit, Nachweis & Assurance ---
  nordwerkObject({
    object_id: O.MEASURE_PATCH,
    object_type: 'Measure',
    display_name: 'Härtung & Patch-Management ERP-Schnittstelle',
    description: 'Synthetische Maßnahme: Aktualisierung und Härtung der ERP-Integrationsschnittstelle.',
    lifecycle_status: 'in Arbeit', // Maßnahmen-Lifecycle (Dok. 05 §7)
  }),
  nordwerkObject({
    object_id: O.EVIDENCE_RESTORE_TEST,
    object_type: 'Evidence',
    display_name: 'Restore-Test-Protokoll Q2/2026',
    description: 'Synthetischer Nachweis: erfolgreicher Wiederherstellungstest der Auftragsdaten.',
    lifecycle_status: 'akzeptiert', // Evidence-Lifecycle (Dok. 05 §7)
    quality: [{ dimension: 'Bestätigung', confirmation_level: 'reviewed' }],
    source_refs: [{ source_kind: 'Datei', reference: 'synthetic-restore-protokoll-q2-2026', priority: 1 }],
  }),
] as const;

/* =============================================================================
 * Beziehungen (15) – ausschließlich kanonische Typen R01–R25 in dokumentierter Richtung.
 * ============================================================================= */

export const NORDWERK_RELATIONSHIPS: readonly RelationshipEnvelope[] = [
  // R01 part_of: Organisationseinheit -> Organisation
  nordwerkRelationship({
    relationship_id: 'nordwerk-rel-01-part_of-ou-org',
    relationship_type: 'part_of',
    source_id: O.OU_PRODUKTION,
    target_id: O.ORG,
    assertion_kind: 'assertiert',
  }),
  // R01 part_of: Requirement -> Framework (Anforderung ist Teil des Frameworks)
  nordwerkRelationship({
    relationship_id: 'nordwerk-rel-02-part_of-req-framework',
    relationship_type: 'part_of',
    source_id: O.REQ_BACKUP,
    target_id: O.FRAMEWORK_ISO27001,
    assertion_kind: 'importiert',
    source_refs: [{ source_kind: 'Dokument', reference: 'synthetic-iso27001-katalog', priority: 1 }],
  }),
  // R03 owns: fachliche Rolle -> Geschäftsprozess
  nordwerkRelationship({
    relationship_id: 'nordwerk-rel-03-owns-role-proc',
    relationship_type: 'owns',
    source_id: O.ROLE_PROZESSVERANTWORTUNG,
    target_id: O.PROC_AUFTRAGSABWICKLUNG,
    assertion_kind: 'assertiert',
  }),
  // R07 processes: Geschäftsprozess -> Information Asset   [Kette 1/5]
  nordwerkRelationship({
    relationship_id: 'nordwerk-rel-04-processes-proc-asset',
    relationship_type: 'processes',
    source_id: O.PROC_AUFTRAGSABWICKLUNG,
    target_id: O.ASSET_KUNDENAUFTRAGSDATEN,
    assertion_kind: 'assertiert',
  }),
  // R08 exposes: Weakness -> Information Asset
  nordwerkRelationship({
    relationship_id: 'nordwerk-rel-05-exposes-weak-asset',
    relationship_type: 'exposes',
    source_id: O.WEAK_ERP_SCHNITTSTELLE,
    target_id: O.ASSET_KUNDENAUFTRAGSDATEN,
    assertion_kind: 'importiert',
    confidence: 0.7,
    source_refs: [{ source_kind: 'Import', reference: 'synthetic-vuln-scan-2026-02', priority: 1 }],
  }),
  // R09 threatens: Threat -> Risk Scenario   [Kette 2/5]
  nordwerkRelationship({
    relationship_id: 'nordwerk-rel-06-threatens-threat-scenario',
    relationship_type: 'threatens',
    source_id: O.THREAT_RANSOMWARE,
    target_id: O.SCENARIO_VERSCHLUESSELUNG,
    assertion_kind: 'abgeleitet',
    confidence: 0.6,
  }),
  // R09 threatens: Threat -> Information Asset
  nordwerkRelationship({
    relationship_id: 'nordwerk-rel-07-threatens-threat-asset',
    relationship_type: 'threatens',
    source_id: O.THREAT_RANSOMWARE,
    target_id: O.ASSET_KUNDENAUFTRAGSDATEN,
    assertion_kind: 'abgeleitet',
    confidence: 0.6,
  }),
  // R10 affects: Risk -> Geschäftsprozess
  nordwerkRelationship({
    relationship_id: 'nordwerk-rel-08-affects-risk-proc',
    relationship_type: 'affects',
    source_id: O.RISK_BETRIEBSUNTERBRECHUNG,
    target_id: O.PROC_AUFTRAGSABWICKLUNG,
    assertion_kind: 'abgeleitet',
    confidence: 0.75,
  }),
  // R10 affects: Risk -> Information Asset   [Kette 3/5]
  nordwerkRelationship({
    relationship_id: 'nordwerk-rel-09-affects-risk-asset',
    relationship_type: 'affects',
    source_id: O.RISK_BETRIEBSUNTERBRECHUNG,
    target_id: O.ASSET_KUNDENAUFTRAGSDATEN,
    assertion_kind: 'abgeleitet',
    confidence: 0.75,
  }),
  // R12 mitigates: Control -> Risk   [Kette 4/5]
  nordwerkRelationship({
    relationship_id: 'nordwerk-rel-10-mitigates-ctrl-risk',
    relationship_type: 'mitigates',
    source_id: O.CTRL_BACKUP,
    target_id: O.RISK_BETRIEBSUNTERBRECHUNG,
    assertion_kind: 'freigegeben',
    confidence: 0.8,
    effectiveness_assumption:
      'Erwartete Reduktion der Ausfalldauer durch getestete Wiederherstellung (synthetische Annahme).',
  }),
  // R12 mitigates: Measure -> Risk Scenario
  nordwerkRelationship({
    relationship_id: 'nordwerk-rel-11-mitigates-measure-scenario',
    relationship_type: 'mitigates',
    source_id: O.MEASURE_PATCH,
    target_id: O.SCENARIO_VERSCHLUESSELUNG,
    assertion_kind: 'assertiert',
    effectiveness_assumption:
      'Erwartete Verringerung der Eintrittswahrscheinlichkeit durch Schließen der ERP-Schwäche.',
  }),
  // R18 remediates: Measure -> Weakness
  nordwerkRelationship({
    relationship_id: 'nordwerk-rel-12-remediates-measure-weak',
    relationship_type: 'remediates',
    source_id: O.MEASURE_PATCH,
    target_id: O.WEAK_ERP_SCHNITTSTELLE,
    assertion_kind: 'assertiert',
  }),
  // R13 implements: Control Implementation -> Control
  nordwerkRelationship({
    relationship_id: 'nordwerk-rel-13-implements-ctrlimpl-ctrl',
    relationship_type: 'implements',
    source_id: O.CTRLIMPL_BACKUP,
    target_id: O.CTRL_BACKUP,
    assertion_kind: 'assertiert',
  }),
  // R14 satisfies: Control -> Requirement
  nordwerkRelationship({
    relationship_id: 'nordwerk-rel-14-satisfies-ctrl-req',
    relationship_type: 'satisfies',
    source_id: O.CTRL_BACKUP,
    target_id: O.REQ_BACKUP,
    assertion_kind: 'freigegeben',
  }),
  // R15 evidences: Evidence -> Control   [Kette 5/5]
  nordwerkRelationship({
    relationship_id: 'nordwerk-rel-15-evidences-evidence-ctrl',
    relationship_type: 'evidences',
    source_id: O.EVIDENCE_RESTORE_TEST,
    target_id: O.CTRL_BACKUP,
    assertion_kind: 'freigegeben',
    status: 'geprüft',
  }),
] as const;
