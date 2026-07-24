/**
 * Reicher, synthetischer ISMS-Erweiterungsgraph des Flaggschiff-Mandanten
 * **Nordstern Manufacturing SE** (WP-021 Slice 1).
 *
 * WARUM DIESE DATEI (und warum `nordwerk-*`-IDs trotz „Nordstern"): Der Anzeigename des
 * Flaggschiffs wandert per Dok. 16 §34.1 („Demo-Unternehmen") von „Nordwerk" auf „Nordstern",
 * die STABILE `tenant_id` bleibt aber `tenant-nordwerk` (Dok. 07, Abschnitt „Objektvertrag,
 * Identität und Metadaten": `display_name` ist „änderbar, nicht identitätsstiftend", die ID ist
 * stabil, P02). WP-021 hält deshalb ALLE Objekt-/Beziehungs-IDs beim stabilen `tenant_id`-Namespace
 * `nordwerk-<typ>-<slug>` — exakt die in der WP-021-Umsetzung vorgeschriebene Konvention
 * („Namespace bleibt beim stabilen tenant_id"). So bricht keine der bestehenden ID-Referenzen.
 *
 * STRUKTUR / VOKABULAR (verbindlich): Objekttypen F01–F09 und Beziehungstypen R01–R25 sind strikt
 * dem kanonischen Vertrag `@isms/contracts` (Dok. 07 v1.0) entnommen. Es wird NICHTS am Modell
 * erfunden — kein Feld, kein Typ, kein Beziehungstyp, keine Lifecycle-Werteliste. Insbesondere
 * trägt diese Schicht KEINE numerische Bewertung (Reifegrad, Risiko-Level, KPI-Zielwert) — die
 * brauchen ein Trägerschema (E-02, CCP-008, Slice 7) und sind hier bewusst NICHT enthalten
 * (Stop Condition WP-021). Ausgewiesen wird nur, was die belegten Felder heute tragen.
 *
 * INHALT (bewusst synthetisch, `.claude/rules/demo-data.md`): Die Manufacturing-Storyline knüpft
 * an den bestehenden Ransomware-/Betriebsunterbrechungs-Strang an und ergänzt das Dok-16-Profil
 * („europäischer Produzent, Zielreife 3, begrenzte interne Kapazität, ZWEI Standorte,
 * bevorstehender Kunden-Audit"): ein zweiter Produktionsstandort, die OT-/Fertigungsseite
 * (Produktionsverfügbarkeit, Maschinendaten, MES, Produktionsnetz), der Schutz der
 * Konstruktionsdaten und der bevorstehende Kunden-Audit. KEINE realen Unternehmen, Personen oder
 * Preise.
 *
 * BEWUSSTE DECKUNGSLÜCKEN (damit die belegten Cockpit-Ampeln UNTERSCHIEDLICH ausschlagen, WP-020):
 *   - `CTRL_NETZSEGMENTIERUNG` trägt KEINE eingehende `evidences`-Kante (R15) → „Control ohne
 *     Nachweis" (mit `CTRL_BACKUP` evidenced + `CTRL_ZUGRIFFSKONTROLLE` evidenced sind 2 von 3
 *     Controls belegt → amber, n = 3 über der Kleinheitsschwelle).
 *   - `RISK_ABFLUSS_KONSTRUKTIONSDATEN` trägt KEINE eingehende `mitigates`-Kante (R12) → „Risiko
 *     ohne Minderung" (2 von 3 Risiken gemindert → amber).
 *   - `ASSET_MASCHINENDATEN` trägt KEINEN Owner (`owner_ids: []`) → kritisches Objekt ohne
 *     benannten Owner.
 *
 * DOK-07-DEMO-GRAPH-PFLICHT (Abschnitt „Synthetische Demodaten", von DR-0008 als „gefordert"
 * zitiert: je Tenant mindestens ein Konflikt, eine veraltete Quelle, ein erklärbarer Trust-State),
 * ausschließlich über BELEGTE Contract-Felder:
 *   - KONFLIKT: `WEAK_FERNWARTUNG` trägt zwei widersprüchliche `source_refs` (Scan meldet offen,
 *     Selbstauskunft meldet gehärtet) + Datenqualitäts-Dimension „Konsistenz" mit erklärendem
 *     Vermerk.
 *   - VERALTETE QUELLE: `ASSET_MASCHINENDATEN` stammt aus einem Inventar-Import 2024 (source_kind
 *     „Importjob") + Dimension „Aktualität" mit Vermerk „seither nicht aktualisiert".
 *   - ERKLÄRBARER TRUST-STATE: `RISK_ABFLUSS_KONSTRUKTIONSDATEN` trägt `confirmation_level:
 *     'Ungeprüft'` + Dimensionen „Herkunft"/„Vollständigkeit" mit Herkunft und offener
 *     Wirkungsabschätzung; die zugehörige `affects`-Kante trägt einen niedrigen `confidence`-Wert.
 *
 * ZEITMODELL: Diese Schicht ist Teil der ERSTEN Erfassungswelle (fachlich gültig ab 2026-01-01,
 * im System erfasst am 2026-01-15) — dieselbe Welle wie der ISMS-Kerngraph, weil sie die volle
 * anfängliche Modellierung des Flaggschiffs ist (die zweite Welle 2026-02-16 trägt bereits, dem
 * Manifest-Muster folgend, mehrere Schichten). Die „veraltete Quelle" wird deshalb NICHT über
 * `record_time` modelliert (das wäre die Systemachse), sondern über die belegte Quellreferenz und
 * die Dimension „Aktualität" — Bitemporalität bleibt gewahrt (`valid_time.from` < `record_time`).
 *
 * MANDANTENTRENNUNG: Jedes Objekt und jede Kante trägt genau `tenant_id = tenant-nordwerk`; es
 * entsteht KEINE mandantenübergreifende Kante (Dok. 07 P09/D11, Dok. 19).
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
import { NORDWERK_OBJECT_ID } from './nordwerk-graph';

const TENANT_NORDWERK = TENANT_ID.NORDWERK;

/**
 * Feste, deterministische Zeitpunkte (kein Date.now()/Random). Identisch zur ersten
 * Erfassungswelle des Kerngraphen: fachlich gültig ab 2026-01-01, im System erfasst 2026-01-15.
 */
const VALID_FROM = '2026-01-01T00:00:00.000Z';
const RECORDED_AT = '2026-01-15T08:00:00.000Z';

/** Gemeinsamer ISMS-Kern-Scope des Mandanten (identisch zum Kerngraphen – keine neue Kennung). */
const SCOPE_ISMS_CORE = 'scope-nordwerk-isms-core';

/** Standard-Quellreferenz: geführter Demo-Workshop (synthetisch). */
const WORKSHOP_SOURCE: SourceRef = {
  source_kind: 'Nutzer',
  reference: 'demo-workshop-nordstern',
  priority: 1,
};

/* -----------------------------------------------------------------------------
 * Stabile Objekt-IDs (P02) – Namespace bleibt beim stabilen tenant_id `nordwerk-*`.
 * --------------------------------------------------------------------------- */
export const NORDSTERN_OBJECT_ID = {
  // F02 Organisation & Verantwortung
  STANDORT_WERK_NORD: 'nordwerk-standort-werk-nord',
  STANDORT_WERK_SUED: 'nordwerk-standort-werk-sued',
  OU_KONSTRUKTION: 'nordwerk-ou-konstruktion',
  ROLE_OT_VERANTWORTUNG: 'nordwerk-role-ot-verantwortung',
  ROLE_KONSTRUKTIONSLEITUNG: 'nordwerk-role-konstruktionsleitung',
  // F03 Geschäft & Information
  CAP_PRODUKTIONSVERFUEGBARKEIT: 'nordwerk-cap-produktionsverfuegbarkeit',
  PROC_FERTIGUNGSSTEUERUNG: 'nordwerk-proc-fertigungssteuerung',
  ASSET_KONSTRUKTIONSDATEN: 'nordwerk-asset-konstruktionsdaten',
  ASSET_MASCHINENDATEN: 'nordwerk-asset-maschinendaten',
  // F04 Technologie & Infrastruktur
  SYSTEM_MES: 'nordwerk-system-mes',
  NETZZONE_OT: 'nordwerk-netzzone-ot',
  // F06 Governance & Anforderungen
  REQ_NETZSICHERHEIT: 'nordwerk-req-a-8-20-netzsicherheit',
  REQ_ZUGRIFFSSTEUERUNG: 'nordwerk-req-a-8-3-zugriffssteuerung',
  CTRL_NETZSEGMENTIERUNG: 'nordwerk-ctrl-netzsegmentierung',
  CTRL_ZUGRIFFSKONTROLLE: 'nordwerk-ctrl-zugriffskontrolle-konstruktion',
  CTRLIMPL_NETZSEGMENTIERUNG: 'nordwerk-ctrlimpl-netzsegmentierung-werk-nord',
  // F07 Risiko & Veränderung
  THREAT_SPIONAGE: 'nordwerk-threat-industriespionage',
  WEAK_FERNWARTUNG: 'nordwerk-weak-fernwartung-ot',
  SCENARIO_OT_KOMPROMITTIERUNG: 'nordwerk-scenario-ot-kompromittierung',
  RISK_PRODUKTIONSAUSFALL: 'nordwerk-risk-produktionsausfall-ot',
  RISK_ABFLUSS_KONSTRUKTIONSDATEN: 'nordwerk-risk-abfluss-konstruktionsdaten',
  // F08 Arbeit, Nachweis & Assurance
  EVIDENCE_ZUGRIFFSREVIEW: 'nordwerk-evidence-zugriffsreview-konstruktion',
  AUDIT_KUNDENAUDIT: 'nordwerk-audit-kundenaudit-iso27001',
  MEASURE_FERNWARTUNG_HAERTUNG: 'nordwerk-measure-fernwartung-haertung',
} as const;

/** Typisierte Objektfabrik (füllt die deterministischen Envelope-Pflichtfelder, Dok. 07 §7). */
function nordsternObject(input: {
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
      dimensions: input.quality ?? [
        { dimension: 'Bestätigung', confirmation_level: 'freigegeben' },
      ],
    },
  };
}

/** Typisierte Beziehungsfabrik (gerichtet, source -> target; Dok. 07 §9). */
function nordsternRelationship(input: {
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

const N = NORDSTERN_OBJECT_ID;
const K = NORDWERK_OBJECT_ID;

/* =============================================================================
 * Objekte (24) über F02, F03, F04, F06, F07, F08.
 * ============================================================================= */

export const NORDSTERN_OBJECTS: readonly ObjectEnvelope[] = [
  // --- F02 Organisation & Verantwortung ---
  nordsternObject({
    object_id: N.STANDORT_WERK_NORD,
    object_type: 'Standort',
    display_name: 'Werk Nord (Produktionsstandort A)',
    description:
      'Synthetischer erster Produktionsstandort (Dok. 16 §34.1: „zwei Standorte"). Betreibt die ' +
      'Fertigungssteuerung und das OT-/Produktionsnetz.',
    lifecycle_status: 'Freigegeben',
  }),
  nordsternObject({
    object_id: N.STANDORT_WERK_SUED,
    object_type: 'Standort',
    display_name: 'Werk Süd (Produktionsstandort B)',
    description:
      'Synthetischer zweiter Produktionsstandort (Dok. 16 §34.1). Bewusst noch dünn modelliert – ' +
      'die begrenzte interne Kapazität (Dok. 16 §34.1) zeigt sich als sichtbare Datenlücke.',
    lifecycle_status: 'Freigegeben',
  }),
  nordsternObject({
    object_id: N.OU_KONSTRUKTION,
    object_type: 'Organisationseinheit',
    display_name: 'Konstruktion & Entwicklung',
    description:
      'Synthetische Organisationseinheit; erzeugt und verantwortet die schützenswerten ' +
      'Konstruktions- und CAD-Daten.',
    lifecycle_status: 'Freigegeben',
  }),
  nordsternObject({
    object_id: N.ROLE_OT_VERANTWORTUNG,
    object_type: 'fachliche Rolle',
    display_name: 'OT-/Produktionssicherheitsverantwortung',
    description:
      'Fachliche Rolle statt Einzelperson (Datenminimierung, Dok. 07 P12/D12). Verantwortet ' +
      'Fertigungssteuerung, OT-Controls und Produktionsrisiken.',
    lifecycle_status: 'Freigegeben',
  }),
  nordsternObject({
    object_id: N.ROLE_KONSTRUKTIONSLEITUNG,
    object_type: 'fachliche Rolle',
    display_name: 'Konstruktionsleitung',
    description:
      'Fachliche Rolle statt Einzelperson (Datenminimierung, Dok. 07 P12/D12). Fachliche ' +
      'Ownerin der Konstruktionsdaten und der zugehörigen Zugriffskontrolle.',
    lifecycle_status: 'Freigegeben',
  }),

  // --- F03 Geschäft & Information ---
  nordsternObject({
    object_id: N.CAP_PRODUKTIONSVERFUEGBARKEIT,
    object_type: 'Business Capability',
    display_name: 'Produktionsverfügbarkeit',
    description:
      'Synthetische Geschäftsfähigkeit: die Fähigkeit, die Fertigung an beiden Standorten ' +
      'verfügbar zu halten. ISMS-Fokus des Flaggschiffs laut Mandantenprofil.',
    lifecycle_status: 'Freigegeben',
  }),
  nordsternObject({
    object_id: N.PROC_FERTIGUNGSSTEUERUNG,
    object_type: 'Geschäftsprozess',
    display_name: 'Fertigungssteuerung',
    description:
      'Synthetischer Kernprozess: Steuerung und Überwachung der Fertigung über das ' +
      'Manufacturing-Execution-System (MES) an Werk Nord.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [
      { owner_id: N.ROLE_OT_VERANTWORTUNG, owner_kind: 'fachlich', role: 'Prozessverantwortung' },
    ],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),
  nordsternObject({
    object_id: N.ASSET_KONSTRUKTIONSDATEN,
    object_type: 'Information Asset',
    display_name: 'Konstruktions- und CAD-Daten',
    description:
      'Synthetischer Informationswert: Konstruktionszeichnungen, Stücklisten und CAD-Modelle. ' +
      'Besonders schützenswert gegen Abfluss (Industriespionage).',
    lifecycle_status: 'freigegeben', // Informations-Lifecycle (Dok. 05 §7)
    owner_ids: [
      { owner_id: N.ROLE_KONSTRUKTIONSLEITUNG, owner_kind: 'fachlich', role: 'Information Owner' },
    ],
    classification: { confidentiality: 'vertraulich', protection_need: 'hoch' },
  }),
  nordsternObject({
    object_id: N.ASSET_MASCHINENDATEN,
    object_type: 'Information Asset',
    display_name: 'Maschinen- und Anlagendaten (OT)',
    description:
      'Synthetischer Informationswert: Betriebs-, Zustands- und Steuerungsdaten der ' +
      'Produktionsanlagen. Bewusst OHNE benannten Owner erfasst (kritisches Objekt ohne Owner) ' +
      'und aus einer veralteten Inventarquelle übernommen.',
    // VERALTETE QUELLE (Dok.-07-Demo-Graph-Pflicht) über belegte Felder: alte Import-Quelle +
    // Dimension „Aktualität". KEIN Owner (bewusste Deckungslücke).
    lifecycle_status: 'geprüft', // Informations-Lifecycle (Dok. 05 §7)
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
    source_refs: [
      { source_kind: 'Importjob', reference: 'synthetic-asset-inventar-2024', priority: 1 },
    ],
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'Ungeprüft' },
      {
        dimension: 'Aktualität',
        note:
          'Veraltete Quelle: der Bestand stammt aus dem Asset-Inventar-Import 2024 und wurde ' +
          'seither nicht aktualisiert.',
      },
      {
        dimension: 'Herkunft',
        note: 'Automatischer Inventar-Import ohne fachliche Bestätigung.',
      },
    ],
  }),

  // --- F04 Technologie & Infrastruktur ---
  nordsternObject({
    object_id: N.SYSTEM_MES,
    object_type: 'System',
    display_name: 'MES-Fertigungsleitsystem',
    description:
      'Synthetisches Manufacturing-Execution-System; verarbeitet die Maschinen- und ' +
      'Anlagendaten und steuert die Fertigung.',
    lifecycle_status: 'Freigegeben',
    owner_ids: [{ owner_id: K.OU_IT_BETRIEB, owner_kind: 'technisch', role: 'Betrieb' }],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),
  nordsternObject({
    object_id: N.NETZZONE_OT,
    object_type: 'Netzwerkzone',
    display_name: 'OT-/Produktionsnetz Werk Nord',
    description:
      'Synthetische Netzwerkzone der Produktion (OT). Von der Büro-IT zu trennen – Gegenstand ' +
      'der Netzsegmentierungs-Control.',
    lifecycle_status: 'Freigegeben',
  }),

  // --- F06 Governance & Anforderungen ---
  nordsternObject({
    object_id: N.REQ_NETZSICHERHEIT,
    object_type: 'Requirement',
    display_name: 'A.8.20 – Netzwerksicherheit',
    description: 'Synthetische Anforderung: Netzwerke werden gesichert und segmentiert.',
    lifecycle_status: 'Freigegeben',
    source_refs: [
      { source_kind: 'Dokument', reference: 'synthetic-iso27001-katalog', priority: 1 },
    ],
  }),
  nordsternObject({
    object_id: N.REQ_ZUGRIFFSSTEUERUNG,
    object_type: 'Requirement',
    display_name: 'A.8.3 – Zugriffssteuerung auf Informationen',
    description:
      'Synthetische Anforderung: Zugriff auf Informationen wird eingeschränkt und geprüft.',
    lifecycle_status: 'Freigegeben',
    source_refs: [
      { source_kind: 'Dokument', reference: 'synthetic-iso27001-katalog', priority: 1 },
    ],
  }),
  nordsternObject({
    object_id: N.CTRL_NETZSEGMENTIERUNG,
    object_type: 'Control',
    display_name: 'Netzsegmentierung OT/IT',
    description:
      'Synthetisches Control zur Trennung von Produktions- und Büronetz. Umgesetzt, aber ' +
      'im Datenbestand OHNE Nachweis erfasst (bewusste Deckungslücke: Control ohne Nachweis).',
    lifecycle_status: 'implementiert', // Control-Lifecycle (Dok. 05 §7)
    owner_ids: [
      { owner_id: N.ROLE_OT_VERANTWORTUNG, owner_kind: 'fachlich', role: 'Control Owner' },
    ],
  }),
  nordsternObject({
    object_id: N.CTRL_ZUGRIFFSKONTROLLE,
    object_type: 'Control',
    display_name: 'Zugriffskontrolle Konstruktionsdaten',
    description:
      'Synthetisches Control zur Steuerung des Zugriffs auf die Konstruktionsdaten. Durch einen ' +
      'Zugriffsreview belegt.',
    lifecycle_status: 'wirksam', // Control-Lifecycle (Dok. 05 §7)
    owner_ids: [
      { owner_id: N.ROLE_KONSTRUKTIONSLEITUNG, owner_kind: 'fachlich', role: 'Control Owner' },
    ],
  }),
  nordsternObject({
    object_id: N.CTRLIMPL_NETZSEGMENTIERUNG,
    object_type: 'Control Implementation',
    display_name: 'OT-Firewall & VLAN-Trennung Werk Nord',
    description:
      'Synthetische lokale Umsetzung der Netzsegmentierungs-Control an Werk Nord ' +
      '(Firewall-Regelwerk und VLAN-Trennung).',
    lifecycle_status: 'implementiert', // Control-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: K.OU_IT_BETRIEB, owner_kind: 'technisch', role: 'Betrieb' }],
  }),

  // --- F07 Risiko & Veränderung ---
  nordsternObject({
    object_id: N.THREAT_SPIONAGE,
    object_type: 'Threat',
    display_name: 'Industriespionage / gezielter Datendiebstahl',
    description:
      'Synthetische Bedrohung: gezielter Abfluss von Konstruktions- und Fertigungs-Know-how.',
    lifecycle_status: 'Beobachtet',
    source_refs: [
      { source_kind: 'Extraktionsregel', reference: 'synthetic-threat-feed', priority: 1 },
    ],
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'maschinell plausibilisiert' },
      { dimension: 'Aktualität', note: 'Synthetisches Bedrohungssignal, Demo-Stand 2026-01.' },
    ],
  }),
  nordsternObject({
    object_id: N.WEAK_FERNWARTUNG,
    object_type: 'Weakness',
    display_name: 'Ungehärteter Fernwartungszugang (OT)',
    description:
      'Synthetische Schwäche: ein Fernwartungszugang zu Produktionsanlagen. Der Datenbestand ' +
      'trägt zwei widersprüchliche Quellen zu ihrem Zustand (Konflikt, siehe Konsistenz-Vermerk).',
    lifecycle_status: 'Geprüft',
    // KONFLIKT (Dok.-07-Demo-Graph-Pflicht) über belegte Felder: zwei widersprüchliche
    // `source_refs` + Dimension „Konsistenz".
    source_refs: [
      { source_kind: 'Import', reference: 'synthetic-vuln-scan-2026-01', priority: 1 },
      { source_kind: 'Nutzer', reference: 'demo-selbstauskunft-ot-betrieb-2026-01', priority: 2 },
    ],
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'maschinell plausibilisiert' },
      {
        dimension: 'Konsistenz',
        note:
          'Konflikt: der Schwachstellenscan meldet den Fernwartungszugang als offen, die ' +
          'Selbstauskunft des OT-Betriebs meldet ihn als bereits gehärtet. Widerspruch nicht ' +
          'aufgelöst.',
      },
    ],
  }),
  nordsternObject({
    object_id: N.SCENARIO_OT_KOMPROMITTIERUNG,
    object_type: 'Risk Scenario',
    display_name: 'Kompromittierung des Produktionsnetzes über Fernwartung',
    description:
      'Synthetisches Risikoszenario: Angreifer nutzen den ungehärteten Fernwartungszugang und ' +
      'kompromittieren das OT-/Produktionsnetz.',
    lifecycle_status: 'bewertet', // Risiko-Lifecycle (Dok. 05 §7)
  }),
  nordsternObject({
    object_id: N.RISK_PRODUKTIONSAUSFALL,
    object_type: 'Risk',
    display_name: 'Produktionsausfall durch OT-Störung',
    description:
      'Synthetisches Risiko: Ausfall der Fertigung durch eine Störung im OT-/Produktionsnetz. ' +
      'Wird durch die Netzsegmentierung gemindert.',
    lifecycle_status: 'behandelt', // Risiko-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: N.ROLE_OT_VERANTWORTUNG, owner_kind: 'fachlich', role: 'Risk Owner' }],
    classification: { confidentiality: 'intern', protection_need: 'hoch' },
  }),
  nordsternObject({
    object_id: N.RISK_ABFLUSS_KONSTRUKTIONSDATEN,
    object_type: 'Risk',
    display_name: 'Abfluss vertraulicher Konstruktionsdaten',
    description:
      'Synthetisches Risiko: unbefugter Abfluss der Konstruktions- und CAD-Daten. Neu ' +
      'identifiziert und im Datenbestand OHNE mindernde Beziehung erfasst (bewusste ' +
      'Deckungslücke: Risiko ohne Minderung).',
    // ERKLÄRBARER TRUST-STATE (Dok.-07-Demo-Graph-Pflicht) über belegte Felder: niedrige
    // Bestätigung + Herkunft/Vollständigkeit-Vermerke; die affects-Kante trägt niedrigen confidence.
    lifecycle_status: 'identifiziert', // Risiko-Lifecycle (Dok. 05 §7)
    owner_ids: [
      { owner_id: N.ROLE_KONSTRUKTIONSLEITUNG, owner_kind: 'fachlich', role: 'Risk Owner' },
    ],
    classification: { confidentiality: 'vertraulich', protection_need: 'hoch' },
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'Ungeprüft' },
      {
        dimension: 'Herkunft',
        note:
          'Aus dem Konstruktions-Workshop 2026-01 abgeleitet, noch nicht mit dem OT-Betrieb ' +
          'abgeglichen.',
      },
      {
        dimension: 'Vollständigkeit',
        note: 'Wirkungsabschätzung offen; im Datenbestand ist keine mindernde Beziehung erfasst.',
      },
    ],
  }),

  // --- F08 Arbeit, Nachweis & Assurance ---
  nordsternObject({
    object_id: N.EVIDENCE_ZUGRIFFSREVIEW,
    object_type: 'Evidence',
    display_name: 'Zugriffsreview Konstruktionsdaten Q1/2026',
    description:
      'Synthetischer Nachweis: dokumentierter Review der Zugriffsberechtigungen auf die ' +
      'Konstruktionsdaten.',
    lifecycle_status: 'akzeptiert', // Evidence-Lifecycle (Dok. 05 §7)
    quality: [{ dimension: 'Bestätigung', confirmation_level: 'reviewed' }],
    source_refs: [
      {
        source_kind: 'Datei',
        reference: 'synthetic-zugriffsreview-konstruktion-q1-2026',
        priority: 1,
      },
    ],
  }),
  nordsternObject({
    object_id: N.AUDIT_KUNDENAUDIT,
    object_type: 'Audit',
    display_name: 'Bevorstehender Kunden-Audit ISO/IEC 27001 (Q3/2026)',
    description:
      'Synthetischer, bevorstehender Kunden-Audit (Dok. 16 §34.1: „bevorstehender Kunden-Audit"). ' +
      'In Vorbereitung; prüft die priorisierten Controls und ihre Nachweise.',
    lifecycle_status: 'Vorbereitung', // Audit-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: K.ROLE_CISO, owner_kind: 'fachlich', role: 'Audit Owner' }],
  }),
  nordsternObject({
    object_id: N.MEASURE_FERNWARTUNG_HAERTUNG,
    object_type: 'Measure',
    display_name: 'Härtung des Fernwartungszugangs (OT)',
    description:
      'Synthetische Maßnahme: Absicherung und Härtung des Fernwartungszugangs zu den ' +
      'Produktionsanlagen.',
    lifecycle_status: 'in Arbeit', // Maßnahmen-Lifecycle (Dok. 05 §7)
  }),
] as const;

/* =============================================================================
 * Beziehungen (33) – ausschließlich kanonische Typen R01–R25 in dokumentierter Richtung.
 * ============================================================================= */

export const NORDSTERN_RELATIONSHIPS: readonly RelationshipEnvelope[] = [
  // R01 part_of: Standorte und Organisationseinheit -> Organisation
  nordsternRelationship({
    relationship_id: 'nordstern-rel-01-part_of-standort-nord-org',
    relationship_type: 'part_of',
    source_id: N.STANDORT_WERK_NORD,
    target_id: K.ORG,
    assertion_kind: 'assertiert',
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-02-part_of-standort-sued-org',
    relationship_type: 'part_of',
    source_id: N.STANDORT_WERK_SUED,
    target_id: K.ORG,
    assertion_kind: 'assertiert',
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-03-part_of-ou-konstruktion-org',
    relationship_type: 'part_of',
    source_id: N.OU_KONSTRUKTION,
    target_id: K.ORG,
    assertion_kind: 'assertiert',
  }),
  // R01 part_of: Requirements -> Framework (bestehendes ISO-Framework des Kerngraphen)
  nordsternRelationship({
    relationship_id: 'nordstern-rel-04-part_of-req-netz-framework',
    relationship_type: 'part_of',
    source_id: N.REQ_NETZSICHERHEIT,
    target_id: K.FRAMEWORK_ISO27001,
    assertion_kind: 'importiert',
    source_refs: [
      { source_kind: 'Dokument', reference: 'synthetic-iso27001-katalog', priority: 1 },
    ],
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-05-part_of-req-zugriff-framework',
    relationship_type: 'part_of',
    source_id: N.REQ_ZUGRIFFSSTEUERUNG,
    target_id: K.FRAMEWORK_ISO27001,
    assertion_kind: 'importiert',
    source_refs: [
      { source_kind: 'Dokument', reference: 'synthetic-iso27001-katalog', priority: 1 },
    ],
  }),

  // R02 located_at: OT-Netzzone und Maschinendaten -> Standort Werk Nord
  nordsternRelationship({
    relationship_id: 'nordstern-rel-06-located_at-netzzone-standort',
    relationship_type: 'located_at',
    source_id: N.NETZZONE_OT,
    target_id: N.STANDORT_WERK_NORD,
    assertion_kind: 'assertiert',
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-07-located_at-maschinendaten-standort',
    relationship_type: 'located_at',
    source_id: N.ASSET_MASCHINENDATEN,
    target_id: N.STANDORT_WERK_NORD,
    assertion_kind: 'importiert',
    source_refs: [
      { source_kind: 'Importjob', reference: 'synthetic-asset-inventar-2024', priority: 1 },
    ],
  }),

  // R03 owns: fachliche Rollen -> Objekte
  nordsternRelationship({
    relationship_id: 'nordstern-rel-08-owns-role-ot-proc',
    relationship_type: 'owns',
    source_id: N.ROLE_OT_VERANTWORTUNG,
    target_id: N.PROC_FERTIGUNGSSTEUERUNG,
    assertion_kind: 'assertiert',
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-09-owns-role-konstruktion-asset',
    relationship_type: 'owns',
    source_id: N.ROLE_KONSTRUKTIONSLEITUNG,
    target_id: N.ASSET_KONSTRUKTIONSDATEN,
    assertion_kind: 'assertiert',
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-10-owns-role-ot-ctrl-netzseg',
    relationship_type: 'owns',
    source_id: N.ROLE_OT_VERANTWORTUNG,
    target_id: N.CTRL_NETZSEGMENTIERUNG,
    assertion_kind: 'assertiert',
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-11-owns-role-konstruktion-ctrl-zugriff',
    relationship_type: 'owns',
    source_id: N.ROLE_KONSTRUKTIONSLEITUNG,
    target_id: N.CTRL_ZUGRIFFSKONTROLLE,
    assertion_kind: 'assertiert',
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-12-owns-role-konstruktion-risk-abfluss',
    relationship_type: 'owns',
    source_id: N.ROLE_KONSTRUKTIONSLEITUNG,
    target_id: N.RISK_ABFLUSS_KONSTRUKTIONSDATEN,
    assertion_kind: 'assertiert',
  }),

  // R05 supports: Prozess -> Capability
  nordsternRelationship({
    relationship_id: 'nordstern-rel-13-supports-proc-capability',
    relationship_type: 'supports',
    source_id: N.PROC_FERTIGUNGSSTEUERUNG,
    target_id: N.CAP_PRODUKTIONSVERFUEGBARKEIT,
    assertion_kind: 'assertiert',
  }),

  // R07 processes: Prozess/System -> Information Asset
  nordsternRelationship({
    relationship_id: 'nordstern-rel-14-processes-proc-maschinendaten',
    relationship_type: 'processes',
    source_id: N.PROC_FERTIGUNGSSTEUERUNG,
    target_id: N.ASSET_MASCHINENDATEN,
    assertion_kind: 'assertiert',
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-15-processes-proc-konstruktionsdaten',
    relationship_type: 'processes',
    source_id: N.PROC_FERTIGUNGSSTEUERUNG,
    target_id: N.ASSET_KONSTRUKTIONSDATEN,
    assertion_kind: 'assertiert',
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-16-processes-system-maschinendaten',
    relationship_type: 'processes',
    source_id: N.SYSTEM_MES,
    target_id: N.ASSET_MASCHINENDATEN,
    assertion_kind: 'assertiert',
  }),

  // R08 exposes: Weakness -> Information Asset
  nordsternRelationship({
    relationship_id: 'nordstern-rel-17-exposes-weak-maschinendaten',
    relationship_type: 'exposes',
    source_id: N.WEAK_FERNWARTUNG,
    target_id: N.ASSET_MASCHINENDATEN,
    assertion_kind: 'importiert',
    confidence: 0.7,
    source_refs: [{ source_kind: 'Import', reference: 'synthetic-vuln-scan-2026-01', priority: 1 }],
  }),

  // R09 threatens: Threat -> Risk Scenario / Information Asset
  nordsternRelationship({
    relationship_id: 'nordstern-rel-18-threatens-threat-scenario',
    relationship_type: 'threatens',
    source_id: N.THREAT_SPIONAGE,
    target_id: N.SCENARIO_OT_KOMPROMITTIERUNG,
    assertion_kind: 'abgeleitet',
    confidence: 0.5,
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-19-threatens-threat-konstruktionsdaten',
    relationship_type: 'threatens',
    source_id: N.THREAT_SPIONAGE,
    target_id: N.ASSET_KONSTRUKTIONSDATEN,
    assertion_kind: 'abgeleitet',
    confidence: 0.6,
  }),

  // R10 affects: Risk -> Geschäftsprozess / Information Asset
  nordsternRelationship({
    relationship_id: 'nordstern-rel-20-affects-risk-produktionsausfall-proc',
    relationship_type: 'affects',
    source_id: N.RISK_PRODUKTIONSAUSFALL,
    target_id: N.PROC_FERTIGUNGSSTEUERUNG,
    assertion_kind: 'abgeleitet',
    confidence: 0.7,
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-21-affects-risk-produktionsausfall-maschinendaten',
    relationship_type: 'affects',
    source_id: N.RISK_PRODUKTIONSAUSFALL,
    target_id: N.ASSET_MASCHINENDATEN,
    assertion_kind: 'abgeleitet',
    confidence: 0.6,
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-22-affects-risk-abfluss-konstruktionsdaten',
    relationship_type: 'affects',
    source_id: N.RISK_ABFLUSS_KONSTRUKTIONSDATEN,
    target_id: N.ASSET_KONSTRUKTIONSDATEN,
    assertion_kind: 'abgeleitet',
    // Niedriger Vertrauensgrad – Teil des erklärbaren Trust-States (neu identifiziert, ungeprüft).
    confidence: 0.4,
  }),

  // R12 mitigates: Control/Measure -> Risk / Risk Scenario
  // (RISK_ABFLUSS_KONSTRUKTIONSDATEN erhält BEWUSST keine mitigates-Kante → Deckungslücke.)
  nordsternRelationship({
    relationship_id: 'nordstern-rel-23-mitigates-ctrl-netzseg-risk',
    relationship_type: 'mitigates',
    source_id: N.CTRL_NETZSEGMENTIERUNG,
    target_id: N.RISK_PRODUKTIONSAUSFALL,
    assertion_kind: 'freigegeben',
    confidence: 0.75,
    effectiveness_assumption:
      'Erwartete Reduktion der Ausfallwahrscheinlichkeit durch Trennung von OT und Büro-IT ' +
      '(synthetische Annahme, keine Garantie).',
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-24-mitigates-ctrl-netzseg-scenario',
    relationship_type: 'mitigates',
    source_id: N.CTRL_NETZSEGMENTIERUNG,
    target_id: N.SCENARIO_OT_KOMPROMITTIERUNG,
    assertion_kind: 'freigegeben',
    confidence: 0.6,
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-25-mitigates-measure-haertung-scenario',
    relationship_type: 'mitigates',
    source_id: N.MEASURE_FERNWARTUNG_HAERTUNG,
    target_id: N.SCENARIO_OT_KOMPROMITTIERUNG,
    assertion_kind: 'assertiert',
    effectiveness_assumption:
      'Erwartete Verringerung der Eintrittswahrscheinlichkeit durch Härtung des ' +
      'Fernwartungszugangs.',
  }),

  // R13 implements: Control Implementation -> Control
  nordsternRelationship({
    relationship_id: 'nordstern-rel-26-implements-ctrlimpl-ctrl',
    relationship_type: 'implements',
    source_id: N.CTRLIMPL_NETZSEGMENTIERUNG,
    target_id: N.CTRL_NETZSEGMENTIERUNG,
    assertion_kind: 'assertiert',
  }),

  // R14 satisfies: Control -> Requirement
  nordsternRelationship({
    relationship_id: 'nordstern-rel-27-satisfies-ctrl-netzseg-req',
    relationship_type: 'satisfies',
    source_id: N.CTRL_NETZSEGMENTIERUNG,
    target_id: N.REQ_NETZSICHERHEIT,
    assertion_kind: 'freigegeben',
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-28-satisfies-ctrl-zugriff-req',
    relationship_type: 'satisfies',
    source_id: N.CTRL_ZUGRIFFSKONTROLLE,
    target_id: N.REQ_ZUGRIFFSSTEUERUNG,
    assertion_kind: 'freigegeben',
  }),

  // R15 evidences: Evidence -> Control
  // (CTRL_NETZSEGMENTIERUNG erhält BEWUSST keine evidences-Kante → Deckungslücke.)
  nordsternRelationship({
    relationship_id: 'nordstern-rel-29-evidences-review-ctrl-zugriff',
    relationship_type: 'evidences',
    source_id: N.EVIDENCE_ZUGRIFFSREVIEW,
    target_id: N.CTRL_ZUGRIFFSKONTROLLE,
    assertion_kind: 'freigegeben',
    status: 'geprüft',
  }),

  // R18 remediates: Measure -> Weakness
  nordsternRelationship({
    relationship_id: 'nordstern-rel-30-remediates-measure-weak',
    relationship_type: 'remediates',
    source_id: N.MEASURE_FERNWARTUNG_HAERTUNG,
    target_id: N.WEAK_FERNWARTUNG,
    assertion_kind: 'assertiert',
  }),

  // R19 requires: Audit -> Control / Evidence (verbindliche Prüfabhängigkeit im Scope)
  nordsternRelationship({
    relationship_id: 'nordstern-rel-31-requires-audit-ctrl-zugriff',
    relationship_type: 'requires',
    source_id: N.AUDIT_KUNDENAUDIT,
    target_id: N.CTRL_ZUGRIFFSKONTROLLE,
    assertion_kind: 'assertiert',
    status: 'im Prüfumfang',
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-32-requires-audit-evidence',
    relationship_type: 'requires',
    source_id: N.AUDIT_KUNDENAUDIT,
    target_id: N.EVIDENCE_ZUGRIFFSREVIEW,
    assertion_kind: 'assertiert',
    status: 'im Prüfumfang',
  }),
  nordsternRelationship({
    relationship_id: 'nordstern-rel-33-requires-audit-ctrl-backup',
    relationship_type: 'requires',
    source_id: N.AUDIT_KUNDENAUDIT,
    target_id: K.CTRL_BACKUP,
    assertion_kind: 'assertiert',
    status: 'im Prüfumfang',
  }),
] as const;
