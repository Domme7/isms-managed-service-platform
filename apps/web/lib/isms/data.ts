/**
 * View-Daten der „ISMS"-Ansicht (WP-013 Slice 1, read-only Risk & Control-Sicht, Dok. 06 §7 S06).
 *
 * Reine Ableitung aus `@isms/demo-seed` (statischer Import, kein Fetch/keine DB). Es werden
 * AUSSCHLIESSLICH belegte Seed-Werte gerendert – nichts wird hartkodiert oder erfunden
 * (`.claude/rules/demo-data.md`, WP-013 Acceptance 1). Diese Helfer sind bewusst frei von
 * React/Next, damit sie deterministisch testbar sind (Muster aus `lib/twin/data.ts` /
 * `lib/services/data.ts`).
 *
 * KANTEN JE BLOCK (tatsächliche Seed-Kanten, Richtung strikt nach Dok. 07 §9):
 *   Risiken:
 *     Risk            --R10 affects-->    Prozess/Information/Objective  (Wirkung)
 *     Control/Measure --R12 mitigates-->  Risk                          (wird gemindert durch)
 *     Threat          --R09 threatens--> Risk Scenario / Asset          (Szenario-Herkunft)
 *     Weakness        --R08 exposes-->   Information Asset              (Ursprung/Exposition)
 *     Measure         --R18 remediates--> Weakness                      (wird behoben durch)
 *   Controls:
 *     Control Impl.   --R13 implements--> Control                       (Umsetzung)
 *     Control         --R14 satisfies-->  Requirement                   (erfüllte Anforderung)
 *     Requirement     --R01 part_of-->    Framework                     (Framework-Zuordnung)
 *     Evidence/Deliv. --R15 evidences-->  Control                       (Nachweis-Stand)
 *     Control         --R12 mitigates-->  Risk/Risk Scenario            (Risikobezug)
 *   Maßnahmen:
 *     Measure         --R18 remediates--> Weakness/Finding              (behebt)
 *     Measure         --R12 mitigates-->  Risk Scenario/Risk            (mindert)
 *   Evidence:
 *     Evidence        --R15 evidences-->  Control/Measure/Decision      (belegt)
 *   Optionaler Hinweis (KEIN Acceptance-Kriterium, kein Upselling):
 *     Objekt          --R22 covered_by--> Managed Service               (liegt im Serviceumfang)
 *
 * WICHTIG (Modelltreue statt Erfindung): Dok. 07 §9 kennt KEINE direkte Kante zwischen
 * Risk und Risk Scenario; der Seed enthält entsprechend keine. Risk, Risk Scenario und
 * Weakness werden deshalb als eigenständige Karten mit ihren tatsächlichen Kanten
 * aufgelöst – es wird keine Szenario→Risiko-Zuordnung konstruiert.
 * // OFFENE FRAGE O-WP013-01: Wie wird die fachliche Zuordnung Risk <-> Risk Scenario im
 * // Graph modelliert (eigener Beziehungstyp oder Ableitung)? Dok. 07 §9 / Dok. 08 §10.1
 * // legen das nicht als Kante fest; hier bewusst NICHT erfunden.
 *
 * GETRENNTE STÄNDE (08-D07/08-D20): Der `lifecycle_status` des Controls (z. B. „wirksam")
 * und der `lifecycle_status` der Control Implementation (z. B. „implementiert") werden
 * getrennt durchgereicht und niemals zusammengerechnet. KEIN Scoring, KEINE Reifegrade,
 * KEINE Aggregation (Abgrenzung zu Dok. 09/10).
 *
 * MANDANTENTRENNUNG: Jede Auflösung arbeitet strikt innerhalb EINES Mandanten (`tenant_id`);
 * es wird keine Kante über die Mandantengrenze gelesen (Dok. 07 P09; per Test belegt).
 */

import type { ObjectEnvelope, RelationshipEnvelope } from '@isms/contracts';
import { DEMO_SEED, type DemoTenant } from '@isms/demo-seed';
import { confidenceQualitative } from '../twin/data';

/* -----------------------------------------------------------------------------
 * View-Modelle
 * --------------------------------------------------------------------------- */

/** Kernobjekt einer Karte (Risk, Control, Measure, Evidence, …) mit belegtem Seed-Stand. */
export interface IsmsObjectRef {
  readonly object_id: string;
  readonly name: string;
  readonly object_type: string;
  /** Lifecycle-Status wörtlich aus dem Seed (immer als Text anzeigen, nie nur Farbe). */
  readonly lifecycle_status: string;
  readonly description: string;
}

/** Über eine Kante verknüpftes Objekt, auf `display_name` aufgelöst (fail-loud: rohe ID). */
export interface IsmsLink {
  readonly relationship_id: string;
  /** Kanonischer Kantentyp (snake_case, Dok. 07 §9) – für das deutsche UI-Label. */
  readonly relationship_type: string;
  readonly object_id: string;
  readonly name: string;
  readonly object_type: string;
  /** Objektstatus des verknüpften Objekts (falls im Mandanten auflösbar). */
  readonly lifecycle_status?: string;
  /** Kantenstatus aus dem Seed (z. B. „geprüft" bei evidences). */
  readonly edge_status?: string;
  readonly assertion_kind: string;
  /** Qualitativ + Wert (z. B. „mittel (0,7)"), falls die Kante einen Vertrauensgrad trägt. */
  readonly confidence_display?: string;
  readonly effectiveness_assumption?: string;
}

/** Bedrohungs-Herkunft eines Szenarios inkl. weiterer Ziele derselben Bedrohung. */
export interface IsmsThreatLink extends IsmsLink {
  /** Weitere reale `threatens`-Ziele desselben Threats (z. B. das exponierte Asset). */
  readonly also_threatens: readonly string[];
}

/** Erfüllte Anforderung inkl. Framework-Zuordnung über `part_of`. */
export interface IsmsRequirementLink extends IsmsLink {
  readonly framework_name?: string;
}

/** Risiko mit Wirkung (`affects`) und mindernden Controls/Maßnahmen (`mitigates`). */
export interface RiskView {
  readonly risk: IsmsObjectRef;
  readonly affects: readonly IsmsLink[];
  readonly mitigated_by: readonly IsmsLink[];
  /** Optionaler Hinweis: Namen der Services, in deren Umfang das Risiko liegt (R22). */
  readonly covered_by_services: readonly string[];
}

/** Risikoszenario mit Bedrohungs-Herkunft (`threatens`) und Minderung (`mitigates`). */
export interface ScenarioView {
  readonly scenario: IsmsObjectRef;
  readonly threatened_by: readonly IsmsThreatLink[];
  readonly mitigated_by: readonly IsmsLink[];
}

/** Schwachstelle mit Exposition (`exposes`) und behebender Maßnahme (`remediates`). */
export interface WeaknessView {
  readonly weakness: IsmsObjectRef;
  readonly exposes: readonly IsmsLink[];
  readonly remediated_by: readonly IsmsLink[];
}

/**
 * Control mit Umsetzung (`implements`), erfüllter Anforderung (`satisfies` + `part_of`),
 * Nachweis-Stand (`evidences`) und Risikobezug (`mitigates`). Control- und
 * Implementierungsstatus bleiben getrennte Felder (08-D07).
 */
export interface ControlView {
  readonly control: IsmsObjectRef;
  readonly implementations: readonly IsmsLink[];
  readonly satisfies: readonly IsmsRequirementLink[];
  readonly evidenced_by: readonly IsmsLink[];
  readonly mitigates: readonly IsmsLink[];
  readonly covered_by_services: readonly string[];
}

/** Maßnahme mit Status und Bezug: behebt (`remediates`) bzw. mindert (`mitigates`). */
export interface MeasureView {
  readonly measure: IsmsObjectRef;
  readonly remediates: readonly IsmsLink[];
  readonly mitigates: readonly IsmsLink[];
}

/** Nachweis mit Status und dem, was er belegt (`evidences`). */
export interface EvidenceView {
  readonly evidence: IsmsObjectRef;
  readonly evidences: readonly IsmsLink[];
  readonly covered_by_services: readonly string[];
}

/** Vollständige, read-only ISMS-Kernsicht EINES Mandanten. */
export interface IsmsCoreView {
  readonly risks: readonly RiskView[];
  readonly scenarios: readonly ScenarioView[];
  readonly weaknesses: readonly WeaknessView[];
  readonly controls: readonly ControlView[];
  readonly measures: readonly MeasureView[];
  readonly evidence: readonly EvidenceView[];
  /** `true`, wenn der Mandant keinerlei ISMS-Kernobjekte trägt (Empty-State). */
  readonly isEmpty: boolean;
}

/* -----------------------------------------------------------------------------
 * Auflösung je Mandant (harte Mandantengrenze über tenant_id)
 * --------------------------------------------------------------------------- */

function toRef(obj: ObjectEnvelope): IsmsObjectRef {
  return {
    object_id: obj.object_id,
    name: obj.display_name,
    object_type: obj.object_type,
    lifecycle_status: obj.lifecycle_status,
    // `description` ist im Envelope optional; leere Beschreibung wird als leer gerendert.
    description: obj.description ?? '',
  };
}

/**
 * Baut einen `IsmsLink` aus einer Kante + dem aufzulösenden Endpunkt. Fehlt der Endpunkt
 * (unerwartet – die Seed-Integritätstests schließen Dangling-Kanten aus), fällt der Name
 * bewusst auf die rohe ID zurück, damit die Lücke sichtbar wird statt still zu verschwinden
 * (Fail-loud-Muster aus `resolveRelationships` in `lib/twin/data.ts`).
 */
function toLink(
  rel: RelationshipEnvelope,
  endpointId: string,
  byId: ReadonlyMap<string, ObjectEnvelope>,
): IsmsLink {
  const obj = byId.get(endpointId);
  return {
    relationship_id: rel.relationship_id,
    relationship_type: rel.relationship_type,
    object_id: endpointId,
    name: obj?.display_name ?? endpointId,
    object_type: obj?.object_type ?? 'unbekannt',
    lifecycle_status: obj?.lifecycle_status,
    edge_status: rel.status,
    assertion_kind: rel.assertion_kind,
    confidence_display:
      typeof rel.confidence === 'number' ? confidenceQualitative(rel.confidence).display : undefined,
    effectiveness_assumption: rel.effectiveness_assumption,
  };
}

/** Baut die komplette ISMS-Kernsicht eines Mandanten aus dem Seed (deterministisch). */
export function buildIsmsCoreView(tenantId: string): IsmsCoreView {
  const objects = DEMO_SEED.objects.filter((o) => o.tenant_id === tenantId);
  const relationships = DEMO_SEED.relationships.filter((r) => r.tenant_id === tenantId);
  const byId = new Map(objects.map((o) => [o.object_id, o] as const));

  const ofType = (type: string): ObjectEnvelope[] => objects.filter((o) => o.object_type === type);
  const edges = (type: string): RelationshipEnvelope[] =>
    relationships.filter((r) => r.relationship_type === type);

  /** Ziele (Quelle -> X) einer Kantenart für ein Objekt. */
  const outgoing = (type: string, sourceId: string): IsmsLink[] =>
    edges(type)
      .filter((r) => r.source_id === sourceId)
      .map((r) => toLink(r, r.target_id, byId));

  /** Quellen (X -> Ziel) einer Kantenart für ein Objekt. */
  const incoming = (type: string, targetId: string): IsmsLink[] =>
    edges(type)
      .filter((r) => r.target_id === targetId)
      .map((r) => toLink(r, r.source_id, byId));

  /**
   * Optionaler Service-Hinweis (R22 `covered_by`, Objekt -> Managed Service/Contract).
   * Reine Anzeige belegter Kanten – bewusst OHNE jede Empfehlungs-/Verkaufslogik (Dok. 13 MS15).
   */
  const coveredByServiceNames = (objectId: string): string[] =>
    edges('covered_by')
      .filter((r) => r.source_id === objectId)
      .map((r) => byId.get(r.target_id)?.display_name ?? r.target_id);

  const risks: RiskView[] = ofType('Risk').map((risk) => ({
    risk: toRef(risk),
    affects: outgoing('affects', risk.object_id),
    mitigated_by: incoming('mitigates', risk.object_id),
    covered_by_services: coveredByServiceNames(risk.object_id),
  }));

  const scenarios: ScenarioView[] = ofType('Risk Scenario').map((scenario) => ({
    scenario: toRef(scenario),
    threatened_by: incoming('threatens', scenario.object_id).map((link) => ({
      ...link,
      // Weitere reale threatens-Ziele DESSELBEN Threats (z. B. Threat -> Asset, Dok. 07 R09).
      also_threatens: edges('threatens')
        .filter((r) => r.source_id === link.object_id && r.target_id !== scenario.object_id)
        .map((r) => byId.get(r.target_id)?.display_name ?? r.target_id),
    })),
    mitigated_by: incoming('mitigates', scenario.object_id),
  }));

  const weaknesses: WeaknessView[] = ofType('Weakness').map((weakness) => ({
    weakness: toRef(weakness),
    exposes: outgoing('exposes', weakness.object_id),
    remediated_by: incoming('remediates', weakness.object_id),
  }));

  const controls: ControlView[] = ofType('Control').map((control) => ({
    control: toRef(control),
    implementations: incoming('implements', control.object_id),
    satisfies: outgoing('satisfies', control.object_id).map((link) => {
      // Framework-Zuordnung des Requirements über dessen part_of-Kante (R01). Bevorzugt ein
      // auflösbares Framework-Ziel; ansonsten fail-loud die rohe Ziel-ID.
      const partOf = edges('part_of').filter((r) => r.source_id === link.object_id);
      const framework =
        partOf.find((r) => byId.get(r.target_id)?.object_type === 'Framework') ?? partOf[0];
      return {
        ...link,
        framework_name: framework
          ? (byId.get(framework.target_id)?.display_name ?? framework.target_id)
          : undefined,
      };
    }),
    evidenced_by: incoming('evidences', control.object_id),
    mitigates: outgoing('mitigates', control.object_id),
    covered_by_services: coveredByServiceNames(control.object_id),
    // HINWEIS: Auch die Control Implementation kann eine covered_by-Kante tragen (im Seed:
    // Backup-Job -> Monitoring-Service). Dieser Hinweis wird hier bewusst nicht zusätzlich
    // an der Implementierungszeile wiederholt – vollständig sichtbar im Ort „Services".
  }));

  const measures: MeasureView[] = ofType('Measure').map((measure) => ({
    measure: toRef(measure),
    remediates: outgoing('remediates', measure.object_id),
    mitigates: outgoing('mitigates', measure.object_id),
  }));

  const evidence: EvidenceView[] = ofType('Evidence').map((ev) => ({
    evidence: toRef(ev),
    evidences: outgoing('evidences', ev.object_id),
    covered_by_services: coveredByServiceNames(ev.object_id),
  }));

  return {
    risks,
    scenarios,
    weaknesses,
    controls,
    measures,
    evidence,
    isEmpty:
      risks.length === 0 &&
      scenarios.length === 0 &&
      weaknesses.length === 0 &&
      controls.length === 0 &&
      measures.length === 0 &&
      evidence.length === 0,
  };
}

/* -----------------------------------------------------------------------------
 * Abgeleitete Mandanten-Hilfen (NICHT hartkodiert, für ehrliche Empty-States)
 * --------------------------------------------------------------------------- */

/**
 * Mandanten, deren ISMS-Kernsicht im aktuellen Seed Inhalte trägt – aus dem Seed abgeleitet,
 * damit die Empty-State-Aussage automatisch korrekt bleibt, sobald weitere Graphen entstehen.
 */
export function getIsmsCoreTenants(): DemoTenant[] {
  return DEMO_SEED.tenants.filter((t) => !buildIsmsCoreView(t.tenant_id).isEmpty);
}

/**
 * Ob ein Mandant Managed Services trägt (für den ehrlichen Empty-State-Hinweis des
 * Consulting Operators: Services vorhanden, aber keine eigenen ISMS-Kernobjekte).
 */
export function hasManagedServices(tenantId: string): boolean {
  return DEMO_SEED.objects.some(
    (o) => o.tenant_id === tenantId && o.object_type === 'Managed Service',
  );
}
