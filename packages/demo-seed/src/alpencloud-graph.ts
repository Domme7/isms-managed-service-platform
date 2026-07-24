/**
 * Reicher, synthetischer ISMS-Objektgraph des Demo-Mandanten **AlpenCloud GmbH**
 * (WP-021 Slice 3).
 *
 * QUELLE (Regel Null, am PDF gegengelesen): Dok. 16, Abschnitt „Synthetische Demo-Daten und
 * Demo-Dramaturgie" → §34.1 „Demo-Unternehmen", Nr. 2: „AlpenCloud GmbH: Cloud-Softwareanbieter,
 * schnelles Wachstum, Zertifizierungsziel, hohe Automatisierungsbereitschaft."
 * (`python scripts/pdf_text.py 16 --suche "AlpenCloud"`). Storyline-Leitplanke aus
 * `work-packages/WP-021_DEMO_WELT_FUENF_FIRMEN.md`, Slice 3: viele Cloud-Ressourcen/Schnittstellen
 * (F04), ein Zertifizierungs-`Framework`/`Requirement` (F06), gute Control-Abdeckung, aber
 * Wachstums-Lücken (neue Assets ohne Owner/Nachweis). Erwartete belegte Ampel-Note: überwiegend
 * grün mit einzelnen amber-Deckungslücken.
 *
 * STRUKTUR / VOKABULAR (verbindlich): Objekttypen F01–F09 und Beziehungstypen R01–R25 sind strikt
 * dem kanonischen Vertrag `@isms/contracts` (Dok. 07 v1.0) entnommen. Es wird NICHTS am Modell
 * erfunden — kein Feld, kein Typ, kein Beziehungstyp, keine Lifecycle-Werteliste. Insbesondere
 * trägt diese Schicht KEINE numerische Bewertung (Reifegrad, Risiko-Level, KPI-Zielwert) — die
 * brauchen ein Trägerschema (E-02, CCP-008, Slice 7) und sind hier bewusst NICHT enthalten
 * (Stop Condition WP-021). `tags_custom_fields` bleibt ungenutzt. Es gibt KEINE Preis-/
 * Währungsangabe (Preis-Guardrail bleibt scharf).
 *
 * OBJEKTFAMILIEN: F01 (Organisation), F02 (Standort/OU/Rollen), F03 (Capability/Prozess/Assets),
 * F04 (Cloud-Ressourcen/Schnittstellen), F06 (Framework/Requirement/Controls), F07 (Threat/
 * Weakness/Szenario/Risiken), F08 (Evidence/Measure/Audit), F09 (Objective). F05 (Lieferkette)
 * bleibt bewusst außen vor — dieselbe Familienauswahl wie beim Flaggschiff (dort ebenfalls kein
 * F05); der Cloud-Unterauftragsverarbeiter ist als spätere Anreicherung benannt (siehe unten).
 *
 * BEWUSSTE DECKUNGSLÜCKEN (damit die belegten Cockpit-Ampeln UNTERSCHIEDLICH ausschlagen, WP-020):
 *   - `CTRL_API_GATEWAY` trägt KEINE eingehende `evidences`-Kante (R15) → „Control ohne Nachweis"
 *     (mit `CTRL_VERSCHLUESSELUNG` + `CTRL_IAM` evidenced sind 2 von 3 Controls belegt → amber,
 *     n = 3 über der Kleinheitsschwelle).
 *   - `RISK_ZERTIFIZIERUNGSLUECKE` trägt KEINE eingehende `mitigates`-Kante (R12) → „Risiko ohne
 *     Minderung" (2 von 3 Risiken gemindert → amber). Das ist das Wachstums-Risiko der Storyline.
 *   - `ASSET_TELEMETRIE` trägt KEINEN Owner (`owner_ids: []`) bei Schutzbedarf „hoch" → kritisches,
 *     neues (Wachstum) Objekt ohne benannten Owner.
 *
 * DOK-07-DEMO-GRAPH-PFLICHT (Dok. 07, Abschnitt „Synthetische Demodaten", von DR-0008 als
 * „gefordert" zitiert: je Tenant mindestens ein Konflikt, eine veraltete Quelle, ein erklärbarer
 * Trust-State), ausschließlich über BELEGTE Contract-Felder (kein neuer Träger):
 *   - KONFLIKT: `WEAK_INTEGRATION` trägt zwei widersprüchliche `source_refs` (Scan meldet offen,
 *     Selbstauskunft der Platform-Engineering-Einheit meldet gehärtet, unterschiedliche Priorität)
 *     + Datenqualitäts-Dimension „Konsistenz" mit erklärendem „Konflikt"-Vermerk.
 *   - VERALTETE QUELLE: `ASSET_TELEMETRIE` stammt aus einem Telemetrie-Inventar-Import 2024
 *     (source_kind „Importjob", Referenz mit Jahr 2024) + Dimension „Aktualität" mit Vermerk
 *     „seither nicht aktualisiert … veraltet".
 *   - ERKLÄRBARER TRUST-STATE: `RISK_ZERTIFIZIERUNGSLUECKE` trägt `confirmation_level: 'Ungeprüft'`
 *     + Dimensionen „Herkunft"/„Vollständigkeit"; die zugehörige `affects`-Kante (auf das
 *     Zertifizierungs-`Objective`) trägt einen erfassten, niedrigen `confidence` (0.4 < 0.5).
 *
 * ZEITMODELL / EIGENE ERFASSUNGSWELLE: AlpenCloud ist ein neuer Mandant und bildet eine EIGENE,
 * vierte Erfassungswelle (fachlich gültig ab 2026-04-01, im System erfasst am 2026-04-15).
 * Feste ISO-Daten (kein Date.now()/Zufall) — jeder Lauf ist identisch (Demo-Datenregel,
 * `.claude/rules/testing.md`). Für JEDES Objekt und JEDE Kante gilt
 * `Date.parse(valid_time.from) < Date.parse(record_time.recorded_at)` (Bitemporalität, Dok. 07
 * §11). Die „veraltete Quelle" wird NICHT über `record_time` modelliert (das ist die Systemachse),
 * sondern über die belegte Quellreferenz (2024) und die Dimension „Aktualität".
 *
 * MANDANTENTRENNUNG: Jedes Objekt und jede Kante trägt genau `tenant_id = tenant-alpencloud`; es
 * entsteht KEINE mandantenübergreifende Kante (Dok. 07 P09/D11, Dok. 19).
 *
 * INHALT (bewusst synthetisch, `.claude/rules/demo-data.md`): Firmen-, Prozess-, Asset-, Risiko-,
 * Control- und Evidence-Werte sind frei erfunden und plausibel. KEINE realen Unternehmen,
 * Personen oder Preise.
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

const TENANT_ALPENCLOUD = TENANT_ID.ALPENCLOUD;

/**
 * Feste, deterministische Zeitpunkte (kein Date.now()/Random). Eigene, vierte Erfassungswelle
 * des neuen Mandanten: fachlich gültig ab 2026-04-01, im System erfasst 2026-04-15.
 */
const VALID_FROM = '2026-04-01T00:00:00.000Z';
const RECORDED_AT = '2026-04-15T08:00:00.000Z';

/** ISMS-/Zertifizierungs-Scope des Mandanten (synthetisch; reiner Scope-Bezeichner, kein Objekt). */
const SCOPE_ZERTIFIZIERUNG = 'scope-alpencloud-zertifizierung';

/** Standard-Quellreferenz: geführter Demo-Workshop (synthetisch). */
const WORKSHOP_SOURCE: SourceRef = {
  source_kind: 'Nutzer',
  reference: 'demo-workshop-alpencloud',
  priority: 1,
};

/* -----------------------------------------------------------------------------
 * Stabile Objekt-IDs (P02) – Namespace `alpencloud-<typ>-<slug>` (stabiler tenant_id-Namespace).
 * Benannte Schlüssel für ALLE Objekte; die lücken-/pflichttragenden sind im Kopfkommentar erklärt.
 * --------------------------------------------------------------------------- */
export const ALPENCLOUD_OBJECT_ID = {
  // F01 Tenant & Unternehmenskontext
  ORG: 'alpencloud-org',
  // F02 Organisation & Verantwortung
  STANDORT_REGION: 'alpencloud-standort-region-eu',
  OU_PLATFORM_ENG: 'alpencloud-ou-platform-engineering',
  ROLE_CISO: 'alpencloud-role-ciso',
  ROLE_PLATTFORM_LEAD: 'alpencloud-role-plattform-leitung',
  // F03 Geschäft & Information
  CAP_PLATTFORMBETRIEB: 'alpencloud-cap-saas-plattformbetrieb',
  PROC_PROVISIONIERUNG: 'alpencloud-proc-mandanten-provisionierung',
  ASSET_KUNDENDATEN: 'alpencloud-asset-kundendaten',
  ASSET_TELEMETRIE: 'alpencloud-asset-telemetrie-logdaten',
  // F04 Technologie & Infrastruktur
  CLOUD_K8S: 'alpencloud-cloud-kubernetes-produktion',
  CLOUD_OBJEKTSPEICHER: 'alpencloud-cloud-objektspeicher-kundendaten',
  API_PUBLIC: 'alpencloud-schnittstelle-oeffentliche-api',
  API_INTEGRATION: 'alpencloud-schnittstelle-integration-webhooks',
  // F06 Governance & Anforderungen
  FRAMEWORK_ISO: 'alpencloud-framework-iso27001',
  REQ_CLOUD: 'alpencloud-req-a-5-23-cloud-dienste',
  CTRL_VERSCHLUESSELUNG: 'alpencloud-ctrl-verschluesselung-ruhende-kundendaten',
  CTRL_IAM: 'alpencloud-ctrl-automatisierte-zugriffssteuerung',
  CTRL_API_GATEWAY: 'alpencloud-ctrl-sicheres-api-gateway',
  CTRLIMPL_KMS: 'alpencloud-ctrlimpl-kms-objektspeicher',
  // F07 Risiko & Veränderung
  THREAT_API_ANGRIFF: 'alpencloud-threat-angriff-oeffentliche-api',
  WEAK_INTEGRATION: 'alpencloud-weak-ungehaertete-integrationsschnittstelle',
  SCENARIO_DATENABFLUSS: 'alpencloud-scenario-datenabfluss-ueber-api',
  RISK_DATENABFLUSS: 'alpencloud-risk-abfluss-kundendaten',
  RISK_ZERTIFIZIERUNGSLUECKE: 'alpencloud-risk-kontrolluecke-wachstum',
  RISK_VERFUEGBARKEIT: 'alpencloud-risk-ausfall-plattform',
  // F08 Arbeit, Nachweis & Assurance
  EVIDENCE_COMPLIANCE_SCAN: 'alpencloud-evidence-automatisierter-compliance-scan',
  EVIDENCE_IAM_REVIEW: 'alpencloud-evidence-iam-zugriffsreview',
  MEASURE_API_HAERTUNG: 'alpencloud-measure-haertung-integrationsschnittstelle',
  AUDIT_ZERTIFIZIERUNG: 'alpencloud-audit-zertifizierung-iso27001',
  // F09 Ziele, Entscheidungen & Services
  OBJECTIVE_ZERTIFIZIERUNG: 'alpencloud-objective-erstzertifizierung-iso27001',
} as const;

/** Typisierte Objektfabrik (füllt die deterministischen Envelope-Pflichtfelder, Dok. 07 §7). */
function alpencloudObject(input: {
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
    tenant_id: TENANT_ALPENCLOUD,
    object_type: input.object_type,
    display_name: input.display_name,
    description: input.description,
    lifecycle_status: input.lifecycle_status,
    scope_ids: [{ scope_id: SCOPE_ZERTIFIZIERUNG, valid_time: { from: VALID_FROM, to: null } }],
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
function alpencloudRelationship(input: {
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
    tenant_id: TENANT_ALPENCLOUD,
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

const A = ALPENCLOUD_OBJECT_ID;

/** Wiederkehrende Framework-Katalogquelle (synthetisch). */
const KATALOG_SOURCE: SourceRef = {
  source_kind: 'Dokument',
  reference: 'synthetic-iso27001-katalog',
  priority: 1,
};

/* =============================================================================
 * Objekte (30) über F01, F02, F03, F04, F06, F07, F08, F09.
 * ============================================================================= */

export const ALPENCLOUD_OBJECTS: readonly ObjectEnvelope[] = [
  // --- F01 Tenant & Unternehmenskontext ---
  alpencloudObject({
    object_id: A.ORG,
    object_type: 'Organisation',
    display_name: 'AlpenCloud GmbH',
    description:
      'Cloud-Softwareanbieter (SaaS) mit schnellem Wachstum und einem ' +
      'Zertifizierungsziel (Dok. 16 §34.1 Nr. 2). Wurzelorganisation des Datenbestands.',
    lifecycle_status: 'Freigegeben',
    classification: { confidentiality: 'intern', protection_need: 'normal' },
  }),

  // --- F02 Organisation & Verantwortung ---
  alpencloudObject({
    object_id: A.STANDORT_REGION,
    object_type: 'Standort',
    display_name: 'Betriebsregion EU (primäre Cloud-Region)',
    description:
      'Primäre Betriebsregion, in der die produktiven Cloud-Ressourcen betrieben ' +
      'werden. Primäre Betriebszuordnung der Plattform (Dok. 07 §9 R02).',
    lifecycle_status: 'Freigegeben',
  }),
  alpencloudObject({
    object_id: A.OU_PLATFORM_ENG,
    object_type: 'Organisationseinheit',
    display_name: 'Platform Engineering',
    description:
      'Organisationseinheit; betreibt die Cloud-Ressourcen und die technische ' +
      'Umsetzung der Controls (technischer Owner).',
    lifecycle_status: 'Freigegeben',
  }),
  alpencloudObject({
    object_id: A.ROLE_CISO,
    object_type: 'fachliche Rolle',
    display_name: 'Informationssicherheitsbeauftragte Rolle (CISO, Cloud-Betrieb)',
    description:
      'Fachliche Rolle statt Einzelperson (Datenminimierung, Dok. 07 P12/D12). Fachliche Ownerin ' +
      'von Controls, Risiken, Zertifizierungsziel und dem bevorstehenden Zertifizierungsaudit.',
    lifecycle_status: 'Freigegeben',
  }),
  alpencloudObject({
    object_id: A.ROLE_PLATTFORM_LEAD,
    object_type: 'fachliche Rolle',
    display_name: 'Plattform-Engineering-Leitung',
    description:
      'Fachliche Rolle statt Einzelperson (Datenminimierung, Dok. 07 P12/D12). Fachliche Ownerin ' +
      'des Provisionierungsprozesses und der Kundendaten.',
    lifecycle_status: 'Freigegeben',
  }),

  // --- F03 Geschäft & Information ---
  alpencloudObject({
    object_id: A.CAP_PLATTFORMBETRIEB,
    object_type: 'Business Capability',
    display_name: 'SaaS-Plattformbetrieb',
    description:
      'Geschäftsfähigkeit: die mandantenfähige Cloud-Software verfügbar und ' +
      'sicher zu betreiben. ISMS-Fokus des wachsenden Cloud-Anbieters.',
    lifecycle_status: 'Freigegeben',
  }),
  alpencloudObject({
    object_id: A.PROC_PROVISIONIERUNG,
    object_type: 'Geschäftsprozess',
    display_name: 'Mandanten-Provisionierung',
    description:
      'Kernprozess: automatisierte Bereitstellung und Verwaltung von Kundenmandanten ' +
      'auf der Cloud-Plattform.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [
      { owner_id: A.ROLE_PLATTFORM_LEAD, owner_kind: 'fachlich', role: 'Prozessverantwortung' },
    ],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),
  alpencloudObject({
    object_id: A.ASSET_KUNDENDATEN,
    object_type: 'Information Asset',
    display_name: 'Kundendaten (Mandantendaten)',
    description:
      'Informationswert: die in der SaaS-Plattform verarbeiteten Mandanten- und ' +
      'Kundendaten. Besonders schützenswert gegen Abfluss.',
    lifecycle_status: 'freigegeben', // Informations-Lifecycle (Dok. 05 §7)
    owner_ids: [
      { owner_id: A.ROLE_PLATTFORM_LEAD, owner_kind: 'fachlich', role: 'Information Owner' },
    ],
    classification: { confidentiality: 'vertraulich', protection_need: 'hoch' },
  }),
  alpencloudObject({
    object_id: A.ASSET_TELEMETRIE,
    object_type: 'Information Asset',
    display_name: 'Plattform-Telemetrie- und Logdaten',
    description:
      'Informationswert: Betriebs-, Zugriffs- und Telemetriedaten der Plattform. ' +
      'Im Wachstum neu hinzugekommen und bewusst OHNE benannten Owner erfasst (kritisches Objekt ' +
      'ohne Owner) sowie aus einer veralteten Inventarquelle übernommen.',
    // DECKUNGSLÜCKE (kritisch ohne Owner) + VERALTETE QUELLE (Dok.-07-Demo-Graph-Pflicht):
    // KEIN Owner; alte Import-Quelle 2024 + Dimension „Aktualität".
    // Hinweis (Konzept-Review): Bearbeitungsstand (`lifecycle_status`) und Vertrauensachse
    // (`confirmation_level`) sind orthogonal (Dok. 07 §8 vs. §12) – „geprüft" meint den
    // Informations-Lebenszyklus, nicht die Bestätigung; die Quelle bleibt „Ungeprüft".
    lifecycle_status: 'geprüft', // Informations-Lifecycle (Dok. 05 §7)
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
    source_refs: [
      { source_kind: 'Importjob', reference: 'synthetic-telemetrie-inventar-2024', priority: 1 },
    ],
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'Ungeprüft' },
      {
        dimension: 'Aktualität',
        note:
          'Veraltete Quelle: der Bestand stammt aus dem Telemetrie-Inventar-Import 2024 und wurde ' +
          'seither nicht aktualisiert.',
      },
      {
        dimension: 'Herkunft',
        note: 'Automatischer Inventar-Import ohne fachliche Bestätigung.',
      },
    ],
  }),

  // --- F04 Technologie & Infrastruktur ---
  alpencloudObject({
    object_id: A.CLOUD_K8S,
    object_type: 'Cloud-Ressource',
    display_name: 'Kubernetes-Produktionscluster',
    description:
      'Cloud-Ressource: der produktive Container-Cluster, auf dem die ' +
      'Plattformdienste und Schnittstellen laufen.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [{ owner_id: A.OU_PLATFORM_ENG, owner_kind: 'technisch', role: 'Betrieb' }],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),
  alpencloudObject({
    object_id: A.CLOUD_OBJEKTSPEICHER,
    object_type: 'Cloud-Ressource',
    display_name: 'Objektspeicher (Kundendaten-Bucket)',
    description:
      'Cloud-Ressource: der Objektspeicher, in dem die ruhenden Kundendaten abgelegt ' +
      'werden. Gegenstand der Verschlüsselungs-Control.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [{ owner_id: A.OU_PLATFORM_ENG, owner_kind: 'technisch', role: 'Betrieb' }],
    classification: { confidentiality: 'vertraulich', protection_need: 'hoch' },
  }),
  alpencloudObject({
    object_id: A.API_PUBLIC,
    object_type: 'Schnittstelle',
    display_name: 'Öffentliche REST-API',
    description:
      'Öffentlich exponierte Programmierschnittstelle der Plattform. Gegenstand der ' +
      'API-Gateway-Control.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [{ owner_id: A.OU_PLATFORM_ENG, owner_kind: 'technisch', role: 'Betrieb' }],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),
  alpencloudObject({
    object_id: A.API_INTEGRATION,
    object_type: 'Schnittstelle',
    display_name: 'Webhook-/Integrations-Schnittstelle',
    description:
      'Im Wachstum neu eingeführte Integrations-Schnittstelle (Webhooks). Noch in ' +
      'Änderung und Gegenstand einer offenen Härtungsmaßnahme.',
    lifecycle_status: 'In Änderung', // generischer Lebenszyklus (Dok. 07 §8): neu/im Umbau
    owner_ids: [{ owner_id: A.OU_PLATFORM_ENG, owner_kind: 'technisch', role: 'Betrieb' }],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),

  // --- F06 Governance & Anforderungen ---
  alpencloudObject({
    object_id: A.FRAMEWORK_ISO,
    object_type: 'Framework',
    display_name: 'ISO/IEC 27001:2022 (Zertifizierungs-Framework, illustrativer Katalog)',
    description:
      'Framework-Kontext für das Zertifizierungsziel (Dok. 16 §34.1 Nr. 2). ' +
      'Kein Abdruck realer Normtexte.',
    lifecycle_status: 'Freigegeben',
    source_refs: [KATALOG_SOURCE],
  }),
  alpencloudObject({
    object_id: A.REQ_CLOUD,
    object_type: 'Requirement',
    display_name: 'A.5.23 – Informationssicherheit für Cloud-Dienste',
    description:
      'Anforderung: Cloud-Dienste werden gemäß den Sicherheitsvorgaben beschafft, ' +
      'genutzt und verwaltet.',
    lifecycle_status: 'Freigegeben',
    source_refs: [KATALOG_SOURCE],
  }),
  alpencloudObject({
    object_id: A.CTRL_VERSCHLUESSELUNG,
    object_type: 'Control',
    display_name: 'Verschlüsselung ruhender Kundendaten',
    description:
      'Control: Verschlüsselung der ruhenden Kundendaten im Objektspeicher. Durch ' +
      'einen automatisierten Compliance-Scan belegt.',
    lifecycle_status: 'wirksam', // Control-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: A.ROLE_CISO, owner_kind: 'fachlich', role: 'Control Owner' }],
  }),
  alpencloudObject({
    object_id: A.CTRL_IAM,
    object_type: 'Control',
    display_name: 'Automatisierte Zugriffssteuerung (IAM)',
    description:
      'Control: automatisierte, rollenbasierte Zugriffssteuerung auf Plattform und ' +
      'Kundendaten (hohe Automatisierungsbereitschaft, Dok. 16 §34.1 Nr. 2). Durch einen ' +
      'Zugriffsreview belegt.',
    lifecycle_status: 'wirksam', // Control-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: A.ROLE_CISO, owner_kind: 'fachlich', role: 'Control Owner' }],
  }),
  alpencloudObject({
    object_id: A.CTRL_API_GATEWAY,
    object_type: 'Control',
    display_name: 'Sicheres API-Gateway (Rate-Limiting & Authentisierung)',
    description:
      'Control zur Absicherung der öffentlichen API (Authentisierung, ' +
      'Durchsatzbegrenzung). Umgesetzt, aber im Datenbestand OHNE Nachweis erfasst (bewusste ' +
      'Deckungslücke: Control ohne Nachweis).',
    lifecycle_status: 'implementiert', // Control-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: A.ROLE_CISO, owner_kind: 'fachlich', role: 'Control Owner' }],
  }),
  alpencloudObject({
    object_id: A.CTRLIMPL_KMS,
    object_type: 'Control Implementation',
    display_name: 'KMS-Verschlüsselung im Objektspeicher',
    description:
      'Lokale Umsetzung der Verschlüsselungs-Control: serverseitige KMS-Verschlüsselung ' +
      'des Kundendaten-Objektspeichers.',
    lifecycle_status: 'implementiert', // Control-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: A.OU_PLATFORM_ENG, owner_kind: 'technisch', role: 'Betrieb' }],
  }),

  // --- F07 Risiko & Veränderung ---
  alpencloudObject({
    object_id: A.THREAT_API_ANGRIFF,
    object_type: 'Threat',
    display_name: 'Angriff auf die öffentliche API',
    description:
      'Bedrohung: gezielter Angriff auf die öffentlich exponierte Programmier- ' +
      'schnittstelle mit dem Ziel, Kundendaten abzugreifen.',
    lifecycle_status: 'Beobachtet',
    source_refs: [
      { source_kind: 'Extraktionsregel', reference: 'synthetic-threat-feed', priority: 1 },
    ],
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'maschinell plausibilisiert' },
      { dimension: 'Aktualität', note: 'Bedrohungssignal, Stand 2026-04.' },
    ],
  }),
  alpencloudObject({
    object_id: A.WEAK_INTEGRATION,
    object_type: 'Weakness',
    display_name: 'Ungehärtete Integrations-Schnittstelle',
    description:
      'Schwäche an der neuen Webhook-/Integrations-Schnittstelle. Der Datenbestand ' +
      'trägt zwei widersprüchliche Quellen zu ihrem Zustand (Konflikt, siehe Konsistenz-Vermerk).',
    lifecycle_status: 'Geprüft',
    // KONFLIKT (Dok.-07-Demo-Graph-Pflicht) über belegte Felder: zwei widersprüchliche
    // `source_refs` (unterschiedliche Priorität) + Dimension „Konsistenz".
    source_refs: [
      { source_kind: 'Import', reference: 'synthetic-vuln-scan-2026-04', priority: 1 },
      { source_kind: 'Nutzer', reference: 'demo-selbstauskunft-platform-eng-2026-04', priority: 2 },
    ],
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'maschinell plausibilisiert' },
      {
        dimension: 'Konsistenz',
        note:
          'Konflikt: der Schwachstellenscan meldet die Integrations-Schnittstelle als ungehärtet ' +
          'offen, die Selbstauskunft des Platform-Engineering meldet sie als bereits gehärtet. ' +
          'Widerspruch nicht aufgelöst.',
      },
    ],
  }),
  alpencloudObject({
    object_id: A.SCENARIO_DATENABFLUSS,
    object_type: 'Risk Scenario',
    display_name: 'Datenabfluss über die öffentliche API',
    description:
      'Risikoszenario: Angreifer nutzen eine ungehärtete Schnittstelle und greifen ' +
      'über die öffentliche API Kundendaten ab.',
    // Bewusste Entlehnung (Domänen-Review): Dok. 05 §7 führt keine eigene Zeile „Risk Scenario";
    // der Zustand „bewertet" stammt aus dem Risiko-Lebenszyklus (Szenarien werden bewertet).
    lifecycle_status: 'bewertet', // Risiko-Lifecycle (Dok. 05 §7)
  }),
  alpencloudObject({
    object_id: A.RISK_DATENABFLUSS,
    object_type: 'Risk',
    display_name: 'Abfluss von Kundendaten über die API',
    description:
      'Risiko: unbefugter Abfluss der Kundendaten über die Plattform-Schnittstellen. ' +
      'Wird durch die Verschlüsselung ruhender Daten gemindert.',
    lifecycle_status: 'behandelt', // Risiko-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: A.ROLE_CISO, owner_kind: 'fachlich', role: 'Risk Owner' }],
    classification: { confidentiality: 'vertraulich', protection_need: 'hoch' },
  }),
  alpencloudObject({
    object_id: A.RISK_ZERTIFIZIERUNGSLUECKE,
    object_type: 'Risk',
    display_name: 'Kontroll-Lücke durch Wachstum gefährdet die Zertifizierung',
    description:
      'Risiko: das schnelle Wachstum bringt neue Assets und Schnittstellen schneller ' +
      'hervor, als Nachweise und Owner nachgezogen werden — die Control-Abdeckung droht hinter dem ' +
      'Zertifizierungsziel zurückzubleiben. Neu identifiziert und im Datenbestand OHNE mindernde ' +
      'Beziehung erfasst (bewusste Deckungslücke: Risiko ohne Minderung).',
    // ERKLÄRBARER TRUST-STATE (Dok.-07-Demo-Graph-Pflicht) über belegte Felder: niedrige
    // Bestätigung + Herkunft/Vollständigkeit; die affects-Kante trägt niedrigen confidence.
    lifecycle_status: 'identifiziert', // Risiko-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: A.ROLE_CISO, owner_kind: 'fachlich', role: 'Risk Owner' }],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'Ungeprüft' },
      {
        dimension: 'Herkunft',
        note:
          'Aus dem Zertifizierungs-Readiness-Workshop 2026-04 abgeleitet, noch nicht mit dem ' +
          'Platform-Engineering abgeglichen.',
      },
      {
        dimension: 'Vollständigkeit',
        note: 'Wirkungsabschätzung offen; im Datenbestand ist keine mindernde Beziehung erfasst.',
      },
    ],
  }),
  alpencloudObject({
    object_id: A.RISK_VERFUEGBARKEIT,
    object_type: 'Risk',
    display_name: 'Ausfall der SaaS-Plattform (Verfügbarkeit)',
    description:
      'Risiko: Ausfall oder Überlast der öffentlichen API beeinträchtigt die ' +
      'Verfügbarkeit der Plattform. Wird durch das sichere API-Gateway gemindert.',
    lifecycle_status: 'behandelt', // Risiko-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: A.ROLE_CISO, owner_kind: 'fachlich', role: 'Risk Owner' }],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),

  // --- F08 Arbeit, Nachweis & Assurance ---
  alpencloudObject({
    object_id: A.EVIDENCE_COMPLIANCE_SCAN,
    object_type: 'Evidence',
    display_name: 'Automatisierter Compliance-Scan (Verschlüsselung)',
    description:
      'Nachweis: automatisierter Compliance-Scan, der die Verschlüsselung der ' +
      'ruhenden Kundendaten fortlaufend bestätigt (hohe Automatisierung, Dok. 16 §34.1 Nr. 2).',
    lifecycle_status: 'akzeptiert', // Evidence-Lifecycle (Dok. 05 §7)
    quality: [{ dimension: 'Bestätigung', confirmation_level: 'maschinell plausibilisiert' }],
    source_refs: [
      { source_kind: 'Connector', reference: 'synthetic-compliance-scan-2026-04', priority: 1 },
    ],
  }),
  alpencloudObject({
    object_id: A.EVIDENCE_IAM_REVIEW,
    object_type: 'Evidence',
    display_name: 'IAM-Zugriffsreview Q1/2026',
    description:
      'Nachweis: dokumentierter Review der automatisierten Zugriffsberechtigungen ' +
      '(IAM) auf Plattform und Kundendaten.',
    lifecycle_status: 'akzeptiert', // Evidence-Lifecycle (Dok. 05 §7)
    quality: [{ dimension: 'Bestätigung', confirmation_level: 'reviewed' }],
    source_refs: [{ source_kind: 'Datei', reference: 'synthetic-iam-review-q1-2026', priority: 1 }],
  }),
  alpencloudObject({
    object_id: A.MEASURE_API_HAERTUNG,
    object_type: 'Measure',
    display_name: 'Härtung der Integrations-Schnittstelle',
    description: 'Maßnahme: Absicherung und Härtung der neuen Webhook-/Integrations-Schnittstelle.',
    lifecycle_status: 'in Arbeit', // Maßnahmen-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: A.OU_PLATFORM_ENG, owner_kind: 'technisch', role: 'Betrieb' }],
  }),
  alpencloudObject({
    object_id: A.AUDIT_ZERTIFIZIERUNG,
    object_type: 'Audit',
    display_name: 'Zertifizierungsaudit ISO/IEC 27001 (Stufe 1/2)',
    description:
      'Bevorstehendes Zertifizierungsaudit (Zertifizierungsziel, Dok. 16 §34.1 ' +
      'Nr. 2). In Vorbereitung; prüft die priorisierten Controls und ihre Nachweise.',
    lifecycle_status: 'Vorbereitung', // Audit-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: A.ROLE_CISO, owner_kind: 'fachlich', role: 'Audit Owner' }],
  }),

  // --- F09 Ziele, Entscheidungen & Services ---
  alpencloudObject({
    object_id: A.OBJECTIVE_ZERTIFIZIERUNG,
    object_type: 'Objective',
    display_name: 'Erstzertifizierung ISO/IEC 27001',
    description:
      'Ziel: die Erstzertifizierung nach ISO/IEC 27001 zu erreichen (Zertifizierungs- ' +
      'ziel, Dok. 16 §34.1 Nr. 2). Kein numerischer Zielwert und keine Kennzahl sind erfasst.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [{ owner_id: A.ROLE_CISO, owner_kind: 'fachlich', role: 'Objective Owner' }],
  }),
] as const;

/* =============================================================================
 * Beziehungen (34) – ausschließlich kanonische Typen R01–R25 in dokumentierter Richtung.
 * ============================================================================= */

export const ALPENCLOUD_RELATIONSHIPS: readonly RelationshipEnvelope[] = [
  // R01 part_of: Organisationseinheit und Standort -> Organisation
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-01-part_of-ou-platform-org',
    relationship_type: 'part_of',
    source_id: A.OU_PLATFORM_ENG,
    target_id: A.ORG,
    assertion_kind: 'assertiert',
  }),
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-02-part_of-standort-org',
    relationship_type: 'part_of',
    source_id: A.STANDORT_REGION,
    target_id: A.ORG,
    assertion_kind: 'assertiert',
  }),
  // R01 part_of: Requirement -> Framework
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-03-part_of-req-framework',
    relationship_type: 'part_of',
    source_id: A.REQ_CLOUD,
    target_id: A.FRAMEWORK_ISO,
    assertion_kind: 'importiert',
    source_refs: [KATALOG_SOURCE],
  }),

  // R02 located_at: Cloud-Ressourcen -> Betriebsregion (primäre Betriebszuordnung)
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-04-located_at-k8s-region',
    relationship_type: 'located_at',
    source_id: A.CLOUD_K8S,
    target_id: A.STANDORT_REGION,
    assertion_kind: 'assertiert',
  }),
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-05-located_at-objektspeicher-region',
    relationship_type: 'located_at',
    source_id: A.CLOUD_OBJEKTSPEICHER,
    target_id: A.STANDORT_REGION,
    assertion_kind: 'assertiert',
  }),

  // R03 owns: fachliche Rollen -> Objekte
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-06-owns-role-lead-asset-kundendaten',
    relationship_type: 'owns',
    source_id: A.ROLE_PLATTFORM_LEAD,
    target_id: A.ASSET_KUNDENDATEN,
    assertion_kind: 'assertiert',
  }),
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-07-owns-role-ciso-risk-datenabfluss',
    relationship_type: 'owns',
    source_id: A.ROLE_CISO,
    target_id: A.RISK_DATENABFLUSS,
    assertion_kind: 'assertiert',
  }),

  // R05 supports: Prozess -> Capability
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-08-supports-proc-capability',
    relationship_type: 'supports',
    source_id: A.PROC_PROVISIONIERUNG,
    target_id: A.CAP_PLATTFORMBETRIEB,
    assertion_kind: 'assertiert',
  }),

  // R06 depends_on: Prozess/Schnittstellen/Asset -> Cloud-Ressource (Laufzeit-/Speicherabhängigkeit)
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-09-depends_on-proc-k8s',
    relationship_type: 'depends_on',
    source_id: A.PROC_PROVISIONIERUNG,
    target_id: A.CLOUD_K8S,
    assertion_kind: 'assertiert',
  }),
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-10-depends_on-api-public-k8s',
    relationship_type: 'depends_on',
    source_id: A.API_PUBLIC,
    target_id: A.CLOUD_K8S,
    assertion_kind: 'assertiert',
  }),
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-11-depends_on-api-integration-k8s',
    relationship_type: 'depends_on',
    source_id: A.API_INTEGRATION,
    target_id: A.CLOUD_K8S,
    assertion_kind: 'assertiert',
  }),
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-12-depends_on-kundendaten-objektspeicher',
    relationship_type: 'depends_on',
    source_id: A.ASSET_KUNDENDATEN,
    target_id: A.CLOUD_OBJEKTSPEICHER,
    assertion_kind: 'assertiert',
  }),

  // R07 processes: Prozess -> Information Asset
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-13-processes-proc-kundendaten',
    relationship_type: 'processes',
    source_id: A.PROC_PROVISIONIERUNG,
    target_id: A.ASSET_KUNDENDATEN,
    assertion_kind: 'assertiert',
  }),
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-14-processes-proc-telemetrie',
    relationship_type: 'processes',
    source_id: A.PROC_PROVISIONIERUNG,
    target_id: A.ASSET_TELEMETRIE,
    assertion_kind: 'assertiert',
  }),

  // R08 exposes: Weakness -> Information Asset
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-15-exposes-weak-kundendaten',
    relationship_type: 'exposes',
    source_id: A.WEAK_INTEGRATION,
    target_id: A.ASSET_KUNDENDATEN,
    assertion_kind: 'importiert',
    confidence: 0.7,
    source_refs: [{ source_kind: 'Import', reference: 'synthetic-vuln-scan-2026-04', priority: 1 }],
  }),

  // R09 threatens: Threat -> Risk Scenario / Information Asset
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-16-threatens-threat-scenario',
    relationship_type: 'threatens',
    source_id: A.THREAT_API_ANGRIFF,
    target_id: A.SCENARIO_DATENABFLUSS,
    assertion_kind: 'abgeleitet',
    confidence: 0.5,
  }),
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-17-threatens-threat-kundendaten',
    relationship_type: 'threatens',
    source_id: A.THREAT_API_ANGRIFF,
    target_id: A.ASSET_KUNDENDATEN,
    assertion_kind: 'abgeleitet',
    confidence: 0.6,
  }),

  // R10 affects: Risk -> Information Asset / Objective / Geschäftsprozess
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-18-affects-risk-datenabfluss-kundendaten',
    relationship_type: 'affects',
    source_id: A.RISK_DATENABFLUSS,
    target_id: A.ASSET_KUNDENDATEN,
    assertion_kind: 'abgeleitet',
    confidence: 0.7,
  }),
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-19-affects-risk-zertifizierung-objective',
    relationship_type: 'affects',
    source_id: A.RISK_ZERTIFIZIERUNGSLUECKE,
    target_id: A.OBJECTIVE_ZERTIFIZIERUNG,
    assertion_kind: 'abgeleitet',
    // Niedriger Vertrauensgrad – Teil des erklärbaren Trust-States (neu identifiziert, ungeprüft).
    confidence: 0.4,
  }),
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-20-affects-risk-verfuegbarkeit-proc',
    relationship_type: 'affects',
    source_id: A.RISK_VERFUEGBARKEIT,
    target_id: A.PROC_PROVISIONIERUNG,
    assertion_kind: 'abgeleitet',
    confidence: 0.6,
  }),

  // R12 mitigates: Control/Measure -> Risk / Risk Scenario
  // (RISK_ZERTIFIZIERUNGSLUECKE erhält BEWUSST keine mitigates-Kante → Deckungslücke.)
  // Fachliche Zuordnung (Domänen-Review): der Abfluss ÜBER DIE authentisierte API wird durch die
  // rollenbasierte Zugriffssteuerung (IAM) gemindert – NICHT durch Verschlüsselung ruhender Daten
  // (die schützt gegen Diebstahl im Ruhezustand, nicht gegen Exfiltration über die API). Die
  // Verschlüsselung bleibt bewusst OHNE mitigates-Kante: sie erfüllt eine Anforderung und ist
  // belegt, mindert aber keines der drei erfassten Risiken direkt (ehrliche Modellierung).
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-21-mitigates-ctrl-iam-risk-datenabfluss',
    relationship_type: 'mitigates',
    source_id: A.CTRL_IAM,
    target_id: A.RISK_DATENABFLUSS,
    assertion_kind: 'freigegeben',
    confidence: 0.6,
    effectiveness_assumption:
      'Erwartete Reduktion des unbefugten Datenabrufs über die API durch rollenbasierte ' +
      'Zugriffssteuerung (synthetische Annahme, keine Garantie).',
  }),
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-22-mitigates-ctrl-gateway-risk-verfuegbarkeit',
    relationship_type: 'mitigates',
    source_id: A.CTRL_API_GATEWAY,
    target_id: A.RISK_VERFUEGBARKEIT,
    assertion_kind: 'assertiert',
    confidence: 0.55,
    effectiveness_assumption:
      'Erwartete Reduktion von Überlast/Missbrauch durch Authentisierung und Durchsatzbegrenzung ' +
      'am API-Gateway (synthetische Annahme).',
  }),
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-23-mitigates-measure-haertung-scenario',
    relationship_type: 'mitigates',
    source_id: A.MEASURE_API_HAERTUNG,
    target_id: A.SCENARIO_DATENABFLUSS,
    assertion_kind: 'assertiert',
    effectiveness_assumption:
      'Erwartete Verringerung der Eintrittswahrscheinlichkeit durch Härtung der ' +
      'Integrations-Schnittstelle.',
  }),

  // R13 implements: Control Implementation -> Control
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-24-implements-ctrlimpl-ctrl-verschluesselung',
    relationship_type: 'implements',
    source_id: A.CTRLIMPL_KMS,
    target_id: A.CTRL_VERSCHLUESSELUNG,
    assertion_kind: 'assertiert',
  }),

  // R14 satisfies: Control -> Requirement
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-25-satisfies-ctrl-verschluesselung-req',
    relationship_type: 'satisfies',
    source_id: A.CTRL_VERSCHLUESSELUNG,
    target_id: A.REQ_CLOUD,
    assertion_kind: 'freigegeben',
  }),
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-26-satisfies-ctrl-iam-req',
    relationship_type: 'satisfies',
    source_id: A.CTRL_IAM,
    target_id: A.REQ_CLOUD,
    assertion_kind: 'freigegeben',
  }),

  // R15 evidences: Evidence -> Control
  // (CTRL_API_GATEWAY erhält BEWUSST keine evidences-Kante → Deckungslücke.)
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-27-evidences-scan-ctrl-verschluesselung',
    relationship_type: 'evidences',
    source_id: A.EVIDENCE_COMPLIANCE_SCAN,
    target_id: A.CTRL_VERSCHLUESSELUNG,
    assertion_kind: 'freigegeben',
    status: 'geprüft',
  }),
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-28-evidences-iam-review-ctrl-iam',
    relationship_type: 'evidences',
    source_id: A.EVIDENCE_IAM_REVIEW,
    target_id: A.CTRL_IAM,
    assertion_kind: 'freigegeben',
    status: 'geprüft',
  }),

  // R18 remediates: Measure -> Weakness
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-29-remediates-measure-weak-integration',
    relationship_type: 'remediates',
    source_id: A.MEASURE_API_HAERTUNG,
    target_id: A.WEAK_INTEGRATION,
    assertion_kind: 'assertiert',
  }),

  // R19 requires: Audit/Objective -> Control / Evidence (verbindliche Abhängigkeit im Scope)
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-30-requires-audit-ctrl-verschluesselung',
    relationship_type: 'requires',
    source_id: A.AUDIT_ZERTIFIZIERUNG,
    target_id: A.CTRL_VERSCHLUESSELUNG,
    assertion_kind: 'assertiert',
    status: 'im Prüfumfang',
  }),
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-31-requires-audit-evidence-scan',
    relationship_type: 'requires',
    source_id: A.AUDIT_ZERTIFIZIERUNG,
    target_id: A.EVIDENCE_COMPLIANCE_SCAN,
    assertion_kind: 'assertiert',
    status: 'im Prüfumfang',
  }),
  // Das Zertifizierungsziel verlangt die (noch unbelegte) API-Gateway-Control – macht die
  // Deckungslücke an der Zielerreichung sichtbar.
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-32-requires-objective-ctrl-gateway',
    relationship_type: 'requires',
    source_id: A.OBJECTIVE_ZERTIFIZIERUNG,
    target_id: A.CTRL_API_GATEWAY,
    assertion_kind: 'assertiert',
    status: 'offen',
  }),

  // R20 contributes_to: Control -> Objective (begründeter Wirkungsbeitrag ohne Garantie)
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-33-contributes_to-ctrl-verschluesselung-objective',
    relationship_type: 'contributes_to',
    source_id: A.CTRL_VERSCHLUESSELUNG,
    target_id: A.OBJECTIVE_ZERTIFIZIERUNG,
    assertion_kind: 'assertiert',
  }),
  alpencloudRelationship({
    relationship_id: 'alpencloud-rel-34-contributes_to-ctrl-iam-objective',
    relationship_type: 'contributes_to',
    source_id: A.CTRL_IAM,
    target_id: A.OBJECTIVE_ZERTIFIZIERUNG,
    assertion_kind: 'assertiert',
  }),
] as const;
