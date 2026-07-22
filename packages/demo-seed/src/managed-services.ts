/**
 * Synthetische Managed-Service-Schicht des Demo-Seeds (WP-012, Slice 1).
 *
 * STRUKTUR / VOKABULAR (verbindlich): ausschließlich kanonische Objekttypen (hier vor allem
 * F09 „Ziele, Entscheidungen & Services": `Managed Service`, `SLA`, `Deliverable`, `Objective`,
 * `KPI`, `Review`; ergänzend F01/F02) und kanonische Beziehungstypen R01–R25 aus
 * `@isms/contracts` (Dok. 07 v1.0). Es wird NICHTS am Modell erfunden; fachliche Lücken sind
 * als `OFFENE FRAGE` markiert (siehe unten).
 *
 * FACHLICHE HERLEITUNG:
 *   - Dok. 13 (Managed-Service-Betriebsmodell): Service Instance (§4.3), Service Charter (§4.4),
 *     Service Run / Deliverable / Outcome Review (§4.5), Shared Responsibility (§5.3),
 *     MS01 „Outcome vor Aktivität", MS15 „keine versteckte Verkaufslogik".
 *   - Dok. 14 (Servicekatalog/SLA-Logik): Service Offers SO02/SO03/SO05/SO12 als fachliches
 *     Muster (§5.2), Service-Level-Bänder (§8.4) als ausdrücklich **illustrative Designannahmen**.
 *   - Dok. 15 (Berater-Operations): Portfolio/Engagement (§4.1/§4.2) – nur so weit, wie es über
 *     kanonische Typen abbildbar ist (siehe OFFENE FRAGEN).
 *
 * INHALT (bewusst synthetisch, `.claude/rules/demo-data.md`, D-015): Servicenamen,
 * Leistungsversprechen, SLA-Werte, Deliverables und Kennzahlen sind frei erfunden.
 * KEINE realen Kunden, Verträge, Templates **und keine Preise** (Preis-/Paketlogik ist bewusst
 * nicht Teil dieses Seeds).
 *
 * MANDANTENTRENNUNG: Jedes Objekt und jede Kante trägt genau eine `tenant_id`; es gibt KEINE
 * mandantenübergreifende Beziehung (Dok. 07 P09/D11, Dok. 19). Die Portfolio-Sicht über mehrere
 * Mandanten entsteht später ausschließlich durch Aggregation je Mandant, nicht durch Kanten.
 *
 * ------------------------------------------------------------------------------------------
 * OFFENE FRAGEN (nicht erfunden, bewusst offen gelassen – siehe WP-012-Report):
 *
 * OFFENE FRAGE (O-WP012-01): Dok. 13 §4.1–4.3 trennt **Service Definition**, **Service Offer**
 *   und **Service Instance**; Dok. 07 kennt dafür nur den einen Objekttyp `Managed Service`.
 *   Hier wird bewusst nur die kundenspezifische **Service Instance** materialisiert; Definition
 *   und Offer werden NICHT als eigene Typen erfunden.
 *
 * OFFENE FRAGE (O-WP012-02): Dok. 13 §4.5 kennt den **Service Run** als Periode/Trigger und
 *   Dok. 15 §4.4 das **Work Package**. Beide haben in Dok. 07 keinen Objekttyp. Deliverables
 *   werden deshalb direkt an die Service Instance gehängt (kein erfundener Zwischentyp).
 *
 * OFFENE FRAGE (O-WP012-03): Dok. 15 §4.1/§4.2 definieren **Portfolio** und **Engagement** als
 *   mandantenübergreifende Steuerungsobjekte. Kanonisch existiert kein solcher Typ, und eine
 *   mandantenübergreifende Kante wäre eine Verletzung der Mandantentrennung. Der Betreiber-Kontext
 *   wird daher je Mandant als tenant-eigenes `Team` abgebildet (siehe O-WP012-04).
 *
 * OFFENE FRAGE (O-WP012-04): R21 `delivered_by` zeigt laut Dok. 07 §9 auf ein „Provider Team".
 *   Ein Provider-Team gehört fachlich zum Betreiber, eine Kante über die Mandantengrenze ist
 *   jedoch verboten. Modellierungsentscheidung (reversibel, innerhalb des kanonischen Modells):
 *   je Mandant existiert ein tenant-eigenes `Team`-Objekt als Delivery-Verantwortung im
 *   jeweiligen Mandantenkontext.
 *
 * OFFENE FRAGE (O-WP012-05): Dok. 07 §7 kennt keine typisierten Felder für SLA-Zusagen
 *   (Betriebszeit, Reaktionszeit, Schwellen) oder KPI-Werte/Zielkorridore. Diese Angaben stehen
 *   deshalb als Klartext in `description` und sind NICHT als eigene Felder erfunden.
 *
 * OFFENE FRAGE (O-WP012-06): Für `Deliverable` nennt Dok. 07 §9 nur R21 `delivered_by` als
 *   Beispielkante. Die hier zusätzlich genutzten Kanten `part_of` (Deliverable gehört zur
 *   Service Instance) und `evidences` (Nachweispaket belegt ein Control, Dok. 13 §4.5
 *   „prüfbares Ergebnis") folgen der dokumentierten **Regel** des jeweiligen Typs, nicht seiner
 *   Beispielspalte. Eine kanonische Bestätigung der Typpaarung steht aus.
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

/**
 * Feste, deterministische Zeitpunkte (kein Date.now()/Random). Die Serviceschicht startet
 * fachlich bewusst nach dem ISMS-Kerngraphen (Nordwerk-Kern: gültig ab 2026-01-01, erfasst
 * am 2026-01-15) und bleibt bitemporal korrekt: valid_time.from < record_time.recorded_at.
 */
const SERVICE_VALID_FROM = '2026-02-01T00:00:00.000Z';
const SERVICE_RECORDED_AT = '2026-02-16T08:00:00.000Z';

/** Scopes (synthetisch). Der Nordwerk-ISMS-Kern-Scope entspricht dem des Kerngraphen. */
const SCOPE_NORDWERK_ISMS_CORE = 'scope-nordwerk-isms-core';
const SCOPE_NORDWERK_MANAGED_SERVICE = 'scope-nordwerk-managed-service';
const SCOPE_OPERATOR_SERVICE_BETRIEB = 'scope-consulting-operator-service-betrieb';

/** Standard-Quellreferenz der Serviceschicht: synthetische Service Charter (Dok. 13 §4.4). */
const CHARTER_SOURCE: SourceRef = {
  source_kind: 'Dokument',
  reference: 'synthetic-service-charter-2026',
  priority: 1,
};

/* -----------------------------------------------------------------------------
 * Gemeinsame Fabriken (tenant-parametrisiert, damit jede Kante/jedes Objekt genau
 * eine tenant_id trägt und Cross-Tenant-Konstrukte gar nicht erst entstehen können).
 * --------------------------------------------------------------------------- */

function makeObject(input: {
  tenant_id: string;
  object_id: string;
  object_type: ObjectType;
  display_name: string;
  description: string;
  lifecycle_status: LifecycleStatus;
  scope_ids: readonly string[];
  owner_ids?: OwnerRef[];
  classification?: Classification;
  source_refs?: SourceRef[];
  quality?: QualityDimensionAssessment[];
}): ObjectEnvelope {
  const scopes: ScopeAssignment[] = input.scope_ids.map((scope_id) => ({
    scope_id,
    valid_time: { from: SERVICE_VALID_FROM, to: null },
  }));

  return {
    object_id: input.object_id,
    tenant_id: input.tenant_id,
    object_type: input.object_type,
    display_name: input.display_name,
    description: input.description,
    lifecycle_status: input.lifecycle_status,
    scope_ids: scopes,
    owner_ids: input.owner_ids ?? [],
    classification: input.classification ?? { confidentiality: 'intern', protection_need: 'normal' },
    source_refs: input.source_refs ?? [CHARTER_SOURCE],
    valid_time: { from: SERVICE_VALID_FROM, to: null },
    record_time: { recorded_at: SERVICE_RECORDED_AT },
    version: 1,
    quality_state: {
      dimensions: input.quality ?? [{ dimension: 'Bestätigung', confirmation_level: 'freigegeben' }],
    },
  };
}

function makeRelationship(input: {
  tenant_id: string;
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
    tenant_id: input.tenant_id,
    relationship_type: input.relationship_type,
    source_id: input.source_id,
    target_id: input.target_id,
    direction: 'gerichtet',
    valid_time: { from: SERVICE_VALID_FROM, to: null },
    record_time: { recorded_at: SERVICE_RECORDED_AT },
    assertion_kind: input.assertion_kind,
    status: input.status,
    source_refs: input.source_refs ?? [CHARTER_SOURCE],
    confidence: input.confidence,
    effectiveness_assumption: input.effectiveness_assumption,
  };
}

/* =============================================================================
 * NORDWERK – Managed-Service-Schicht (tenant-nordwerk)
 * ============================================================================= */

/** Stabile Objekt-IDs der Nordwerk-Serviceschicht (P02: unveränderlich). */
export const NORDWERK_SERVICE_OBJECT_ID = {
  TEAM_SERVICE_DELIVERY: 'nordwerk-team-service-delivery',
  SERVICE_RISK_CONTROL_MONITORING: 'nordwerk-service-risk-control-monitoring',
  SERVICE_EVIDENCE_OPERATIONS: 'nordwerk-service-evidence-operations',
  SERVICE_MANAGEMENT_REPORTING: 'nordwerk-service-management-reporting',
  SLA_RISK_CONTROL_MONITORING: 'nordwerk-sla-risk-control-monitoring',
  SLA_EVIDENCE_OPERATIONS: 'nordwerk-sla-evidence-operations',
  SLA_MANAGEMENT_REPORTING: 'nordwerk-sla-management-reporting',
  DELIVERABLE_RISK_CONTROL_REVIEW: 'nordwerk-deliverable-risk-control-review',
  DELIVERABLE_CONTROL_ASSURANCE: 'nordwerk-deliverable-control-assurance-paket',
  DELIVERABLE_EVIDENCE_PACK: 'nordwerk-deliverable-evidence-pack',
  DELIVERABLE_MANAGEMENT_REPORT: 'nordwerk-deliverable-management-report',
  OBJECTIVE_AUDITFAEHIGKEIT: 'nordwerk-objective-auditfaehigkeit',
  KPI_CONTROL_NACHWEISQUOTE: 'nordwerk-kpi-control-nachweisquote',
  REVIEW_SERVICE_Q2_2026: 'nordwerk-review-service-q2-2026',
} as const;

const S = NORDWERK_SERVICE_OBJECT_ID;
const K = NORDWERK_OBJECT_ID;

/** Beide Scopes: der Service arbeitet im ISMS-Kern-Scope und im eigenen Service-Scope. */
const NORDWERK_SCOPES = [SCOPE_NORDWERK_ISMS_CORE, SCOPE_NORDWERK_MANAGED_SERVICE] as const;

function nordwerkServiceObject(
  input: Omit<Parameters<typeof makeObject>[0], 'tenant_id' | 'scope_ids'> & {
    scope_ids?: readonly string[];
  },
): ObjectEnvelope {
  return makeObject({
    ...input,
    tenant_id: TENANT_ID.NORDWERK,
    scope_ids: input.scope_ids ?? NORDWERK_SCOPES,
  });
}

/**
 * Nordwerk-Serviceschicht: 14 Objekte (F02 Team; F09 Managed Service, SLA, Deliverable,
 * Objective, KPI, Review). Alle Leistungsversprechen sind outcome-formuliert (Dok. 13 MS01)
 * und enthalten weder Preise noch Verkaufsargumente (MS15).
 */
export const NORDWERK_SERVICE_OBJECTS: readonly ObjectEnvelope[] = [
  // --- F02 Organisation & Verantwortung: Delivery-Verantwortung im Mandantenkontext ---
  nordwerkServiceObject({
    object_id: S.TEAM_SERVICE_DELIVERY,
    object_type: 'Team',
    display_name: 'Managed-Service-Delivery-Team (Betreuung Nordwerk)',
    description:
      'Synthetisches Delivery-Team des Managed-Service-Betreibers, abgebildet im Mandanten ' +
      'Nordwerk. Trägt die Delivery-Verantwortung der aktiven Service Instances (Ziel von ' +
      'R21 delivered_by). Siehe OFFENE FRAGE O-WP012-04: ein Provider-Team wird bewusst ' +
      'tenant-eigen modelliert, weil mandantenübergreifende Kanten verboten sind.',
    lifecycle_status: 'Freigegeben',
  }),

  // --- F09 Ziele, Entscheidungen & Services: Service Instances (Dok. 13 §4.3) ---
  nordwerkServiceObject({
    object_id: S.SERVICE_RISK_CONTROL_MONITORING,
    object_type: 'Managed Service',
    display_name: 'Kontinuierliches Risiko- & Control-Monitoring',
    description:
      'Synthetische Service Instance (Dok. 13 §4.3), fachliches Muster SO02/SO03 (Dok. 14 §5.2). ' +
      'Ergebnisversprechen (Outcome vor Aktivität, MS01): Die priorisierten Risiken und Controls ' +
      'der Auftragsabwicklung bleiben aktuell bewertet, erklärbar und entscheidungsfähig; ' +
      'Abweichungen werden erkannt, bevor sie den Betrieb treffen. ' +
      'Shared Responsibility (MS03): Nordwerk verantwortet Risikoakzeptanz, Priorisierung und ' +
      'Umsetzung; der Betreiber verantwortet Analyse, Aufbereitung, Qualitätsprüfung und ' +
      'Eskalationsvorschlag. Rhythmus: monatlich, zusätzlich ereignisgetrieben. ' +
      'Keine Preis-, Paket- oder Vertragsangaben in diesem Demo-Seed.',
    lifecycle_status: 'aktiv', // Service-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: K.ROLE_CISO, owner_kind: 'fachlich', role: 'Kunden-Owner (Service)' }],
  }),
  nordwerkServiceObject({
    object_id: S.SERVICE_EVIDENCE_OPERATIONS,
    object_type: 'Managed Service',
    display_name: 'Nachweis- & Evidence-Betrieb',
    description:
      'Synthetische Service Instance (Dok. 13 §4.3), fachliches Muster SO05 (Dok. 14 §5.2). ' +
      'Ergebnisversprechen (MS01): Für die priorisierten Controls liegen jederzeit gültige, ' +
      'geprüfte und auffindbare Nachweise vor; ablaufende Nachweise werden vor Ablauf sichtbar. ' +
      'Shared Responsibility (MS03): Nordwerk liefert Rohnachweise und Freigaben; der Betreiber ' +
      'verantwortet Anforderung, Validierung, Ablaufsteuerung und Nachweispakete. ' +
      'Datenvertrauen ist Teil der Leistung (MS07): fehlende oder veraltete Nachweise werden als ' +
      'Servicehindernis ausgewiesen, nicht als erfülltes Ergebnis. Keine Preisangaben.',
    lifecycle_status: 'aktiv', // Service-Lifecycle (Dok. 05 §7)
    owner_ids: [
      { owner_id: K.ROLE_CISO, owner_kind: 'fachlich', role: 'Kunden-Owner (Service)' },
      { owner_id: K.OU_IT_BETRIEB, owner_kind: 'technisch', role: 'Nachweiszulieferung' },
    ],
  }),
  nordwerkServiceObject({
    object_id: S.SERVICE_MANAGEMENT_REPORTING,
    object_type: 'Managed Service',
    display_name: 'Management- & Entscheidungsreporting',
    description:
      'Synthetische Service Instance (Dok. 13 §4.3), fachliches Muster SO12 (Dok. 14 §5.2). ' +
      'Ergebnisversprechen (MS01): Leitung und CISO-Rolle erhalten je Quartal ein freigabefähiges, ' +
      'quellenbelegtes Bild von Risikolage, Control-Wirksamkeit und offenen Entscheidungen. ' +
      'Der Service befindet sich aktuell im Service Review (Dok. 13 §11): der Berichtsrhythmus ' +
      'wird gemeinsam angepasst. Keine Preis- oder Angebotsinhalte (MS15).',
    lifecycle_status: 'Review', // Service-Lifecycle (Dok. 05 §7)
    owner_ids: [{ owner_id: K.ROLE_CISO, owner_kind: 'fachlich', role: 'Kunden-Owner (Service)' }],
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'reviewed' },
      { dimension: 'Aktualität', note: 'Service Review Q2/2026 läuft; Konfiguration in Änderung.' },
    ],
  }),

  // --- F09: SLA (Leistungsversprechen) – ausschließlich synthetische, illustrative Werte ---
  nordwerkServiceObject({
    object_id: S.SLA_RISK_CONTROL_MONITORING,
    object_type: 'SLA',
    display_name: 'SLA – Risiko- & Control-Monitoring (Band „Standard")',
    description:
      'SYNTHETISCHES, ILLUSTRATIVES Leistungsversprechen – keine Vertragszusage und kein realer ' +
      'Kundenwert (Dok. 14 §8.4 bezeichnet die Bänder ausdrücklich als Designannahmen). ' +
      'Band „Standard": Betriebszeit Werktage/lokale Geschäftszeit; Acknowledgement P1 in 4 ' +
      'Geschäftsstunden, P2 in 1 Geschäftstag, P3 in 2 Geschäftstagen; Delivery Time: monatlicher ' +
      'Risiko- & Control-Review innerhalb von 5 Geschäftstagen nach Periodenende. ' +
      'Keine Preise und keine Service Credits im Demo-Seed. ' +
      'Siehe OFFENE FRAGE O-WP012-05: Dok. 07 §7 kennt keine typisierten SLA-Felder, daher Klartext.',
    lifecycle_status: 'Freigegeben',
  }),
  nordwerkServiceObject({
    object_id: S.SLA_EVIDENCE_OPERATIONS,
    object_type: 'SLA',
    display_name: 'SLA – Nachweisbetrieb (Band „Priority")',
    description:
      'SYNTHETISCHES, ILLUSTRATIVES Leistungsversprechen (Dok. 14 §8.4: Designannahmen, keine ' +
      'Vertragszusage). Band „Priority": verlängerte Geschäftszeit; Acknowledgement P1 in 2 ' +
      'Geschäftsstunden, P2 in 4 Geschäftsstunden; Data Freshness: akzeptierte Nachweise nicht ' +
      'älter als 90 Tage; Ablaufwarnung 30 Tage vor Ablauf. Die Uhr pausiert nur bei dokumentierter ' +
      'Kundenabhängigkeit (Dok. 14 §8.4). Keine Preise, keine Service Credits.',
    lifecycle_status: 'Freigegeben',
  }),
  nordwerkServiceObject({
    object_id: S.SLA_MANAGEMENT_REPORTING,
    object_type: 'SLA',
    display_name: 'SLA – Managementreporting (Band „Standard")',
    description:
      'SYNTHETISCHES, ILLUSTRATIVES Leistungsversprechen (Dok. 14 §8.4: Designannahmen). ' +
      'Delivery Time: Quartalsbericht spätestens 10 Geschäftstage nach Quartalsende; Review Time: ' +
      'Freigabeentwurf innerhalb von 3 Geschäftstagen nach Datenschluss. Audit- oder ' +
      'Zertifizierungserfolg ist ausdrücklich KEIN SLA (Dok. 14 §8.2). Keine Preise.',
    lifecycle_status: 'Freigegeben',
    quality: [{ dimension: 'Bestätigung', confirmation_level: 'reviewed' }],
  }),

  // --- F09: Deliverables (prüfbare Ergebnisse, Dok. 13 §4.5) ---
  nordwerkServiceObject({
    object_id: S.DELIVERABLE_RISK_CONTROL_REVIEW,
    object_type: 'Deliverable',
    display_name: 'Risiko- & Control-Review 2026-06 (synthetisch)',
    description:
      'Synthetisches, prüfbares Ergebnis eines Servicezyklus (Dok. 13 §4.5): aktualisierte ' +
      'Bewertung des Risikos „Betriebsunterbrechung Auftragsabwicklung", Status der zugehörigen ' +
      'Controls und vorgeschlagene Entscheidungen. Keine realen Inhalte.',
    lifecycle_status: 'Freigegeben',
  }),
  nordwerkServiceObject({
    object_id: S.DELIVERABLE_CONTROL_ASSURANCE,
    object_type: 'Deliverable',
    display_name: 'Control-Assurance-Paket Q2/2026 (synthetisch)',
    description:
      'Synthetisches Deliverable: Zusammenstellung von Control-Design, Umsetzungsstand und ' +
      'Wirksamkeitsaussage für die priorisierten Controls. Enthält ausdrücklich keine Zusicherung ' +
      'vollständiger Sicherheit (Dok. 13 §3.2).',
    lifecycle_status: 'Freigegeben',
    quality: [{ dimension: 'Bestätigung', confirmation_level: 'reviewed' }],
  }),
  nordwerkServiceObject({
    object_id: S.DELIVERABLE_EVIDENCE_PACK,
    object_type: 'Deliverable',
    display_name: 'Audit-Readiness-Evidence-Pack Q2/2026 (synthetisch)',
    description:
      'Synthetisches Nachweispaket des Evidence-Betriebs: gebündelte, geprüfte Nachweise zu den ' +
      'priorisierten Controls inklusive Gültigkeitsfenster und offener Lücken. Grundlage für die ' +
      'Kante `evidences` auf das Backup-&-Recovery-Control (siehe OFFENE FRAGE O-WP012-06).',
    lifecycle_status: 'Freigegeben',
  }),
  nordwerkServiceObject({
    object_id: S.DELIVERABLE_MANAGEMENT_REPORT,
    object_type: 'Deliverable',
    display_name: 'Management-Report Q2/2026 (Entwurf, synthetisch)',
    description:
      'Synthetisches Deliverable im Entwurf: Managementbild zu Risikolage, Control-Wirksamkeit und ' +
      'offenen Entscheidungen. Noch nicht freigegeben – der zugehörige Service befindet sich im ' +
      'Service Review, deshalb ist der Zustand bewusst sichtbar unfertig (Zustandstreue statt ' +
      'geschönter Demo).',
    lifecycle_status: 'Entwurf',
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'Ungeprüft' },
      { dimension: 'Vollständigkeit', note: 'Entwurfsstand: Kapitel „Wirksamkeit" noch offen.' },
    ],
  }),

  // --- F09: Ziel und Kennzahl (Wirkungsbezug der Services) ---
  nordwerkServiceObject({
    object_id: S.OBJECTIVE_AUDITFAEHIGKEIT,
    object_type: 'Objective',
    display_name: 'Auditfähigkeit ISO/IEC 27001 (Demo-Zielbild 2026)',
    description:
      'Synthetisches Ziel: Nordwerk ist für die priorisierten Controls jederzeit nachweisfähig ' +
      'und kann eine externe Prüfung ohne Sondersammlung von Nachweisen bestehen. ' +
      'Zielerreichung hängt auch von Kundenmitwirkung ab und ist deshalb kein SLA (Dok. 14 §8.2).',
    lifecycle_status: 'Freigegeben',
    owner_ids: [{ owner_id: K.ROLE_CISO, owner_kind: 'fachlich', role: 'Objective Owner' }],
    scope_ids: [SCOPE_NORDWERK_ISMS_CORE],
  }),
  nordwerkServiceObject({
    object_id: S.KPI_CONTROL_NACHWEISQUOTE,
    object_type: 'KPI',
    display_name: 'Nachweisquote priorisierter Controls',
    description:
      'Synthetische Messgröße: Anteil der priorisierten Controls mit gültigem, akzeptiertem ' +
      'Nachweis. Illustrativer Demo-Zielkorridor: 90 %. KPI ist Messgröße, nicht Leistungs' +
      'versprechen (Dok. 14 §8.1). Siehe OFFENE FRAGE O-WP012-05: Dok. 07 §7 kennt keine ' +
      'typisierten KPI-Wert-/Zielfelder, daher Klartext statt erfundener Felder.',
    lifecycle_status: 'Freigegeben',
    scope_ids: [SCOPE_NORDWERK_ISMS_CORE],
  }),

  // --- F09: Outcome Review (Dok. 13 §4.5) ---
  nordwerkServiceObject({
    object_id: S.REVIEW_SERVICE_Q2_2026,
    object_type: 'Review',
    display_name: 'Outcome Review Q2/2026 – Risiko- & Control-Monitoring',
    description:
      'Synthetischer Outcome Review (Dok. 13 §4.5): prüft, ob die zugesagte Wirkung tatsächlich ' +
      'eingetreten ist. Ergebnis (synthetisch): Wirkung für die Control-Nachweise bestätigt; ' +
      'Berichtsrhythmus des Reporting-Service wird angepasst. Ein Zyklus ohne Outcome Review gilt ' +
      'als dokumentiert, aber nicht als wirksam bestätigt.',
    lifecycle_status: 'Geprüft',
    quality: [{ dimension: 'Bestätigung', confirmation_level: 'reviewed' }],
  }),
] as const;

function nordwerkServiceRelationship(
  input: Omit<Parameters<typeof makeRelationship>[0], 'tenant_id'>,
): RelationshipEnvelope {
  return makeRelationship({ ...input, tenant_id: TENANT_ID.NORDWERK });
}

/**
 * Nordwerk-Serviceschicht: 28 Beziehungen, ausschließlich kanonische Typen in der in Dok. 07 §9
 * dokumentierten Richtung (source -> target):
 *
 *   SLA/Deliverable/Review --R01 part_of-->       Managed Service
 *   Managed Service/Deliv. --R21 delivered_by-->  Team (Delivery-Verantwortung)
 *   Risk/Control/Evidence  --R22 covered_by-->    Managed Service   (Objekt liegt im Serviceumfang)
 *   Managed Service        --R19 requires-->      Control/Evidence
 *   Managed Service/Control--R20 contributes_to-->Objective/KPI
 *   Deliverable            --R15 evidences-->     Control
 *   Risk                   --R10 affects-->       Objective
 */
export const NORDWERK_SERVICE_RELATIONSHIPS: readonly RelationshipEnvelope[] = [
  // --- R01 part_of: SLA gehört zur Service Instance ---
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-16-part_of-sla-service-monitoring',
    relationship_type: 'part_of',
    source_id: S.SLA_RISK_CONTROL_MONITORING,
    target_id: S.SERVICE_RISK_CONTROL_MONITORING,
    assertion_kind: 'freigegeben',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-17-part_of-sla-service-evidence',
    relationship_type: 'part_of',
    source_id: S.SLA_EVIDENCE_OPERATIONS,
    target_id: S.SERVICE_EVIDENCE_OPERATIONS,
    assertion_kind: 'freigegeben',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-18-part_of-sla-service-reporting',
    relationship_type: 'part_of',
    source_id: S.SLA_MANAGEMENT_REPORTING,
    target_id: S.SERVICE_MANAGEMENT_REPORTING,
    assertion_kind: 'freigegeben',
  }),

  // --- R01 part_of: Deliverables und Outcome Review gehören zur Service Instance ---
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-19-part_of-deliverable-review-service-monitoring',
    relationship_type: 'part_of',
    source_id: S.DELIVERABLE_RISK_CONTROL_REVIEW,
    target_id: S.SERVICE_RISK_CONTROL_MONITORING,
    assertion_kind: 'assertiert',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-20-part_of-deliverable-assurance-service-monitoring',
    relationship_type: 'part_of',
    source_id: S.DELIVERABLE_CONTROL_ASSURANCE,
    target_id: S.SERVICE_RISK_CONTROL_MONITORING,
    assertion_kind: 'assertiert',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-21-part_of-deliverable-evidencepack-service-evidence',
    relationship_type: 'part_of',
    source_id: S.DELIVERABLE_EVIDENCE_PACK,
    target_id: S.SERVICE_EVIDENCE_OPERATIONS,
    assertion_kind: 'assertiert',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-22-part_of-deliverable-report-service-reporting',
    relationship_type: 'part_of',
    source_id: S.DELIVERABLE_MANAGEMENT_REPORT,
    target_id: S.SERVICE_MANAGEMENT_REPORTING,
    assertion_kind: 'assertiert',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-23-part_of-review-service-monitoring',
    relationship_type: 'part_of',
    source_id: S.REVIEW_SERVICE_Q2_2026,
    target_id: S.SERVICE_RISK_CONTROL_MONITORING,
    assertion_kind: 'freigegeben',
  }),

  // --- R21 delivered_by: Delivery-Verantwortung (Managed Service/Deliverable -> Team) ---
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-24-delivered_by-service-monitoring-team',
    relationship_type: 'delivered_by',
    source_id: S.SERVICE_RISK_CONTROL_MONITORING,
    target_id: S.TEAM_SERVICE_DELIVERY,
    assertion_kind: 'freigegeben',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-25-delivered_by-service-evidence-team',
    relationship_type: 'delivered_by',
    source_id: S.SERVICE_EVIDENCE_OPERATIONS,
    target_id: S.TEAM_SERVICE_DELIVERY,
    assertion_kind: 'freigegeben',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-26-delivered_by-service-reporting-team',
    relationship_type: 'delivered_by',
    source_id: S.SERVICE_MANAGEMENT_REPORTING,
    target_id: S.TEAM_SERVICE_DELIVERY,
    assertion_kind: 'freigegeben',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-27-delivered_by-deliverable-review-team',
    relationship_type: 'delivered_by',
    source_id: S.DELIVERABLE_RISK_CONTROL_REVIEW,
    target_id: S.TEAM_SERVICE_DELIVERY,
    assertion_kind: 'assertiert',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-28-delivered_by-deliverable-assurance-team',
    relationship_type: 'delivered_by',
    source_id: S.DELIVERABLE_CONTROL_ASSURANCE,
    target_id: S.TEAM_SERVICE_DELIVERY,
    assertion_kind: 'assertiert',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-29-delivered_by-deliverable-evidencepack-team',
    relationship_type: 'delivered_by',
    source_id: S.DELIVERABLE_EVIDENCE_PACK,
    target_id: S.TEAM_SERVICE_DELIVERY,
    assertion_kind: 'assertiert',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-30-delivered_by-deliverable-report-team',
    relationship_type: 'delivered_by',
    source_id: S.DELIVERABLE_MANAGEMENT_REPORT,
    target_id: S.TEAM_SERVICE_DELIVERY,
    assertion_kind: 'assertiert',
  }),

  // --- R22 covered_by: welche Objekte des ISMS-Kerngraphen im Serviceumfang liegen ---
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-31-covered_by-risk-service-monitoring',
    relationship_type: 'covered_by',
    source_id: K.RISK_BETRIEBSUNTERBRECHUNG,
    target_id: S.SERVICE_RISK_CONTROL_MONITORING,
    assertion_kind: 'freigegeben',
    status: 'im Serviceumfang',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-32-covered_by-control-service-monitoring',
    relationship_type: 'covered_by',
    source_id: K.CTRL_BACKUP,
    target_id: S.SERVICE_RISK_CONTROL_MONITORING,
    assertion_kind: 'freigegeben',
    status: 'im Serviceumfang',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-33-covered_by-controlimpl-service-monitoring',
    relationship_type: 'covered_by',
    source_id: K.CTRLIMPL_BACKUP,
    target_id: S.SERVICE_RISK_CONTROL_MONITORING,
    assertion_kind: 'freigegeben',
    status: 'im Serviceumfang',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-34-covered_by-evidence-service-evidence',
    relationship_type: 'covered_by',
    source_id: K.EVIDENCE_RESTORE_TEST,
    target_id: S.SERVICE_EVIDENCE_OPERATIONS,
    assertion_kind: 'freigegeben',
    status: 'im Serviceumfang',
  }),

  // --- R19 requires: verbindliche Abhängigkeit des Service im eigenen Scope ---
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-35-requires-service-monitoring-control',
    relationship_type: 'requires',
    source_id: S.SERVICE_RISK_CONTROL_MONITORING,
    target_id: K.CTRL_BACKUP,
    assertion_kind: 'assertiert',
    status: 'Voraussetzung erfüllt',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-36-requires-service-evidence-evidence',
    relationship_type: 'requires',
    source_id: S.SERVICE_EVIDENCE_OPERATIONS,
    target_id: K.EVIDENCE_RESTORE_TEST,
    assertion_kind: 'assertiert',
    status: 'Voraussetzung erfüllt',
  }),

  // --- R20 contributes_to: begründeter Wirkungsbeitrag ohne Garantie ---
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-37-contributes_to-service-monitoring-objective',
    relationship_type: 'contributes_to',
    source_id: S.SERVICE_RISK_CONTROL_MONITORING,
    target_id: S.OBJECTIVE_AUDITFAEHIGKEIT,
    assertion_kind: 'abgeleitet',
    confidence: 0.6,
    effectiveness_assumption:
      'Erwarteter Beitrag durch fortlaufend aktuelle Risiko-/Control-Bewertung (synthetische ' +
      'Annahme, keine Garantie – Wirkung hängt auch von Kundenmitwirkung ab).',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-38-contributes_to-service-evidence-objective',
    relationship_type: 'contributes_to',
    source_id: S.SERVICE_EVIDENCE_OPERATIONS,
    target_id: S.OBJECTIVE_AUDITFAEHIGKEIT,
    assertion_kind: 'abgeleitet',
    confidence: 0.75,
    effectiveness_assumption:
      'Erwarteter Beitrag durch dauerhaft gültige, geprüfte Nachweise (synthetische Annahme).',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-39-contributes_to-service-reporting-objective',
    relationship_type: 'contributes_to',
    source_id: S.SERVICE_MANAGEMENT_REPORTING,
    target_id: S.OBJECTIVE_AUDITFAEHIGKEIT,
    assertion_kind: 'abgeleitet',
    confidence: 0.4,
    effectiveness_assumption:
      'Erwarteter, eher indirekter Beitrag über Entscheidungsqualität und Sichtbarkeit ' +
      '(synthetische Annahme, bewusst niedriger Vertrauensgrad).',
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-40-contributes_to-service-evidence-kpi',
    relationship_type: 'contributes_to',
    source_id: S.SERVICE_EVIDENCE_OPERATIONS,
    target_id: S.KPI_CONTROL_NACHWEISQUOTE,
    assertion_kind: 'abgeleitet',
    confidence: 0.8,
  }),
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-41-contributes_to-control-kpi',
    relationship_type: 'contributes_to',
    source_id: K.CTRL_BACKUP,
    target_id: S.KPI_CONTROL_NACHWEISQUOTE,
    assertion_kind: 'assertiert',
  }),

  // --- R15 evidences: Nachweispaket belegt das Control (siehe OFFENE FRAGE O-WP012-06) ---
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-42-evidences-deliverable-control',
    relationship_type: 'evidences',
    source_id: S.DELIVERABLE_EVIDENCE_PACK,
    target_id: K.CTRL_BACKUP,
    assertion_kind: 'freigegeben',
    status: 'geprüft',
  }),

  // --- R10 affects: das Risiko wirkt auf das Ziel (Dok. 07 §9: Risk -> Objective) ---
  nordwerkServiceRelationship({
    relationship_id: 'nordwerk-rel-43-affects-risk-objective',
    relationship_type: 'affects',
    source_id: K.RISK_BETRIEBSUNTERBRECHUNG,
    target_id: S.OBJECTIVE_AUDITFAEHIGKEIT,
    assertion_kind: 'abgeleitet',
    confidence: 0.5,
  }),
] as const;

/* =============================================================================
 * CONSULTING OPERATOR DEMO – eigener Mandant des Betreibers (tenant-consulting-operator)
 *
 * Zweck: die Portfolio-Sicht soll später MEHRERE Mandanten mit Services zeigen. Der Seed
 * bildet dabei ausdrücklich KEINE mandantenübergreifende Leistungserbringung ab – jede Kante
 * endet an der Mandantengrenze (P09). Siehe OFFENE FRAGE O-WP012-03.
 * ============================================================================= */

export const OPERATOR_OBJECT_ID = {
  ORG: 'operator-org',
  TEAM_DELIVERY: 'operator-team-managed-isms-delivery',
  ROLE_SERVICE_LEAD: 'operator-role-managed-service-lead',
  SERVICE_AUDIT_READINESS: 'operator-service-audit-readiness',
  SERVICE_POLICY_LIFECYCLE: 'operator-service-policy-lifecycle',
  SLA_AUDIT_READINESS: 'operator-sla-audit-readiness',
  SLA_POLICY_LIFECYCLE: 'operator-sla-policy-lifecycle',
  DELIVERABLE_AUDIT_READINESS_PACK: 'operator-deliverable-audit-readiness-pack',
  DELIVERABLE_POLICY_REVIEW_REPORT: 'operator-deliverable-policy-review-report',
} as const;

const P = OPERATOR_OBJECT_ID;

function operatorObject(
  input: Omit<Parameters<typeof makeObject>[0], 'tenant_id' | 'scope_ids'> & {
    scope_ids?: readonly string[];
  },
): ObjectEnvelope {
  return makeObject({
    ...input,
    tenant_id: TENANT_ID.CONSULTING_OPERATOR,
    scope_ids: input.scope_ids ?? [SCOPE_OPERATOR_SERVICE_BETRIEB],
  });
}

/** Consulting Operator Demo: 9 Objekte (F01 Organisation; F02 Team/Rolle; F09 Service/SLA/Deliverable). */
export const OPERATOR_OBJECTS: readonly ObjectEnvelope[] = [
  // --- F01 Tenant & Unternehmenskontext ---
  operatorObject({
    object_id: P.ORG,
    object_type: 'Organisation',
    display_name: 'Consulting Operator Demo',
    description:
      'Synthetischer Managed-Service-Betreiber als eigener Demo-Mandant (Dok. 07 §20). ' +
      'Wurzelorganisation der Betreiber-Serviceschicht in dieser Demo.',
    lifecycle_status: 'Freigegeben',
  }),

  // --- F02 Organisation & Verantwortung ---
  operatorObject({
    object_id: P.TEAM_DELIVERY,
    object_type: 'Team',
    display_name: 'Delivery-Team Managed ISMS',
    description:
      'Synthetisches Delivery-Team des Betreibers; Ziel der Kanten `delivered_by` innerhalb ' +
      'dieses Mandanten (Dok. 07 §9 R21).',
    lifecycle_status: 'Freigegeben',
  }),
  operatorObject({
    object_id: P.ROLE_SERVICE_LEAD,
    object_type: 'fachliche Rolle',
    display_name: 'Managed Service Lead',
    description:
      'Fachliche Rolle statt Einzelperson (Datenminimierung, Dok. 07 P12/D12). Verantwortet ' +
      'Serviceportfolio, Methode und Qualität im Rahmen des Mandats (Dok. 13 §5.1).',
    lifecycle_status: 'Freigegeben',
  }),

  // --- F09 Service Instances des Betreibers ---
  operatorObject({
    object_id: P.SERVICE_AUDIT_READINESS,
    object_type: 'Managed Service',
    display_name: 'Audit-Readiness-Betrieb (Demo)',
    description:
      'Synthetische Service Instance im eigenen Mandanten des Betreibers, fachliches Muster SO06 ' +
      '(Dok. 14 §5.2). Ergebnisversprechen (MS01): Prüftermine sind planbar vorbereitet, ' +
      'Nachweislücken und Findings werden früh sichtbar und gesteuert. ' +
      'Wichtig: Dieser Seed modelliert KEINE mandantenübergreifende Leistungserbringung; alle ' +
      'Beziehungen enden an der Mandantengrenze (siehe OFFENE FRAGE O-WP012-03). Keine Preise.',
    lifecycle_status: 'aktiv', // Service-Lifecycle (Dok. 05 §7)
    owner_ids: [
      { owner_id: P.ROLE_SERVICE_LEAD, owner_kind: 'fachlich', role: 'Managed Service Lead' },
    ],
  }),
  operatorObject({
    object_id: P.SERVICE_POLICY_LIFECYCLE,
    object_type: 'Managed Service',
    display_name: 'Policy-Lifecycle-Betrieb (Demo)',
    description:
      'Synthetische Service Instance, fachliches Muster SO04 (Dok. 14 §5.2). ' +
      'Ergebnisversprechen (MS01): Vorgaben sind aktuell, freigegeben, verständlich und ' +
      'tatsächlich anwendbar; fällige Reviews laufen nicht still ab. Der Service ist konfiguriert, ' +
      'aber noch nicht aktiv – der Zustand wird bewusst ehrlich gezeigt. Keine Preise.',
    lifecycle_status: 'konfiguriert', // Service-Lifecycle (Dok. 05 §7)
    owner_ids: [
      { owner_id: P.ROLE_SERVICE_LEAD, owner_kind: 'fachlich', role: 'Managed Service Lead' },
    ],
    quality: [
      { dimension: 'Bestätigung', confirmation_level: 'reviewed' },
      { dimension: 'Vollständigkeit', note: 'Transition noch nicht abgeschlossen (Dok. 13 §9).' },
    ],
  }),

  // --- F09 SLA (synthetisch/illustrativ) ---
  operatorObject({
    object_id: P.SLA_AUDIT_READINESS,
    object_type: 'SLA',
    display_name: 'SLA – Audit-Readiness-Betrieb (Band „Priority")',
    description:
      'SYNTHETISCHES, ILLUSTRATIVES Leistungsversprechen (Dok. 14 §8.4: Designannahmen, keine ' +
      'Vertragszusage). Band „Priority": Acknowledgement P1 in 2 Geschäftsstunden, P2 in 4 ' +
      'Geschäftsstunden; Delivery Time: Readiness-Statusbild spätestens 5 Geschäftstage vor ' +
      'jedem Meilenstein. Auditerfolg ist ausdrücklich kein SLA (Dok. 14 §8.2). Keine Preise.',
    lifecycle_status: 'Freigegeben',
  }),
  operatorObject({
    object_id: P.SLA_POLICY_LIFECYCLE,
    object_type: 'SLA',
    display_name: 'SLA – Policy-Lifecycle-Betrieb (Band „Standard")',
    description:
      'SYNTHETISCHES, ILLUSTRATIVES Leistungsversprechen (Dok. 14 §8.4: Designannahmen). ' +
      'Band „Standard": Acknowledgement P3 in 2 Geschäftstagen; Review Time: Kommentierung eines ' +
      'eingereichten Policy-Entwurfs innerhalb von 5 Geschäftstagen. Keine Preise, keine Credits.',
    lifecycle_status: 'Freigegeben',
  }),

  // --- F09 Deliverables ---
  operatorObject({
    object_id: P.DELIVERABLE_AUDIT_READINESS_PACK,
    object_type: 'Deliverable',
    display_name: 'Audit-Readiness-Paket 2026-06 (synthetisch)',
    description:
      'Synthetisches, prüfbares Ergebnis (Dok. 13 §4.5): Readiness-Status, offene Nachweislücken ' +
      'und priorisierte Vorbereitungsschritte. Keine realen Prüfinhalte.',
    lifecycle_status: 'Freigegeben',
  }),
  operatorObject({
    object_id: P.DELIVERABLE_POLICY_REVIEW_REPORT,
    object_type: 'Deliverable',
    display_name: 'Policy-Review-Bericht 2026-06 (Entwurf, synthetisch)',
    description:
      'Synthetisches Deliverable im Entwurf: Übersicht fälliger und überholter Vorgaben mit ' +
      'Vorschlag zur Reihenfolge. Noch nicht freigegeben, da der zugehörige Service erst ' +
      'konfiguriert ist.',
    lifecycle_status: 'Entwurf',
    quality: [{ dimension: 'Bestätigung', confirmation_level: 'Ungeprüft' }],
  }),
] as const;

function operatorRelationship(
  input: Omit<Parameters<typeof makeRelationship>[0], 'tenant_id'>,
): RelationshipEnvelope {
  return makeRelationship({ ...input, tenant_id: TENANT_ID.CONSULTING_OPERATOR });
}

/** Consulting Operator Demo: 11 Beziehungen (R01 part_of, R03 owns, R21 delivered_by). */
export const OPERATOR_RELATIONSHIPS: readonly RelationshipEnvelope[] = [
  // R01 part_of: Team -> Organisation
  operatorRelationship({
    relationship_id: 'operator-rel-01-part_of-team-org',
    relationship_type: 'part_of',
    source_id: P.TEAM_DELIVERY,
    target_id: P.ORG,
    assertion_kind: 'assertiert',
  }),
  // R01 part_of: SLA -> Managed Service
  operatorRelationship({
    relationship_id: 'operator-rel-02-part_of-sla-service-audit',
    relationship_type: 'part_of',
    source_id: P.SLA_AUDIT_READINESS,
    target_id: P.SERVICE_AUDIT_READINESS,
    assertion_kind: 'freigegeben',
  }),
  operatorRelationship({
    relationship_id: 'operator-rel-03-part_of-sla-service-policy',
    relationship_type: 'part_of',
    source_id: P.SLA_POLICY_LIFECYCLE,
    target_id: P.SERVICE_POLICY_LIFECYCLE,
    assertion_kind: 'freigegeben',
  }),
  // R01 part_of: Deliverable -> Managed Service
  operatorRelationship({
    relationship_id: 'operator-rel-04-part_of-deliverable-service-audit',
    relationship_type: 'part_of',
    source_id: P.DELIVERABLE_AUDIT_READINESS_PACK,
    target_id: P.SERVICE_AUDIT_READINESS,
    assertion_kind: 'assertiert',
  }),
  operatorRelationship({
    relationship_id: 'operator-rel-05-part_of-deliverable-service-policy',
    relationship_type: 'part_of',
    source_id: P.DELIVERABLE_POLICY_REVIEW_REPORT,
    target_id: P.SERVICE_POLICY_LIFECYCLE,
    assertion_kind: 'assertiert',
  }),
  // R21 delivered_by: Managed Service/Deliverable -> Team
  operatorRelationship({
    relationship_id: 'operator-rel-06-delivered_by-service-audit-team',
    relationship_type: 'delivered_by',
    source_id: P.SERVICE_AUDIT_READINESS,
    target_id: P.TEAM_DELIVERY,
    assertion_kind: 'freigegeben',
  }),
  operatorRelationship({
    relationship_id: 'operator-rel-07-delivered_by-service-policy-team',
    relationship_type: 'delivered_by',
    source_id: P.SERVICE_POLICY_LIFECYCLE,
    target_id: P.TEAM_DELIVERY,
    assertion_kind: 'freigegeben',
  }),
  operatorRelationship({
    relationship_id: 'operator-rel-08-delivered_by-deliverable-audit-team',
    relationship_type: 'delivered_by',
    source_id: P.DELIVERABLE_AUDIT_READINESS_PACK,
    target_id: P.TEAM_DELIVERY,
    assertion_kind: 'assertiert',
  }),
  operatorRelationship({
    relationship_id: 'operator-rel-09-delivered_by-deliverable-policy-team',
    relationship_type: 'delivered_by',
    source_id: P.DELIVERABLE_POLICY_REVIEW_REPORT,
    target_id: P.TEAM_DELIVERY,
    assertion_kind: 'assertiert',
  }),
  // R03 owns: fachliche Rolle -> Managed Service
  operatorRelationship({
    relationship_id: 'operator-rel-10-owns-role-service-audit',
    relationship_type: 'owns',
    source_id: P.ROLE_SERVICE_LEAD,
    target_id: P.SERVICE_AUDIT_READINESS,
    assertion_kind: 'assertiert',
  }),
  operatorRelationship({
    relationship_id: 'operator-rel-11-owns-role-service-policy',
    relationship_type: 'owns',
    source_id: P.ROLE_SERVICE_LEAD,
    target_id: P.SERVICE_POLICY_LIFECYCLE,
    assertion_kind: 'assertiert',
  }),
] as const;

/* =============================================================================
 * Aggregat der Serviceschicht (über beide Mandanten – reine Listenverkettung,
 * KEINE mandantenübergreifende Beziehung).
 * ============================================================================= */

export const MANAGED_SERVICE_OBJECTS: readonly ObjectEnvelope[] = [
  ...NORDWERK_SERVICE_OBJECTS,
  ...OPERATOR_OBJECTS,
] as const;

export const MANAGED_SERVICE_RELATIONSHIPS: readonly RelationshipEnvelope[] = [
  ...NORDWERK_SERVICE_RELATIONSHIPS,
  ...OPERATOR_RELATIONSHIPS,
] as const;
