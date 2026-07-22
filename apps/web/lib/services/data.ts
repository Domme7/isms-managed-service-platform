/**
 * View-Daten der „Services"-Ansicht (WP-012 Slice 2, read-only).
 *
 * Reine Ableitung aus `@isms/demo-seed` (statischer Import, kein Fetch/keine DB). Es werden
 * AUSSCHLIESSLICH belegte Seed-Werte gerendert – nichts wird hartkodiert oder erfunden
 * (`.claude/rules/demo-data.md`, WP-012 Acceptance 3/4). Diese Helfer sind bewusst frei von
 * React/Next, damit sie deterministisch testbar sind (Muster aus `lib/twin/data.ts`).
 *
 * KANTEN DER MANAGED-SERVICE-SCHICHT (tatsächliche Seed-Kanten, Dok. 07 §9):
 *   SLA / Deliverable / Review --R01 part_of-->        Managed Service
 *   Managed Service            --R21 delivered_by-->   Team (Delivery-Verantwortung)
 *   Risk/Control/Impl/Evidence --R22 covered_by-->     Managed Service (liegt im Serviceumfang)
 *   Managed Service            --R19 requires-->       Control/Evidence (Voraussetzung)
 *   Managed Service            --R20 contributes_to--> Objective/KPI (Beitrag, mit Vertrauensgrad)
 *
 * MANDANTENTRENNUNG: Jede Auflösung arbeitet strikt innerhalb EINES Mandanten (`tenant_id`).
 * Die Portfolio-Übersicht ist eine reine Aggregation je Mandant nebeneinander – es gibt und
 * entsteht KEINE mandantenübergreifende Kante (OFFENE FRAGE O-WP012-03, Dok. 07 P09).
 */

import type { ObjectEnvelope, RelationshipEnvelope } from '@isms/contracts';
import { DEMO_SEED, type DemoTenant } from '@isms/demo-seed';
import { confidenceQualitative } from '../twin/data';

/* -----------------------------------------------------------------------------
 * View-Modelle
 * --------------------------------------------------------------------------- */

/** Über `part_of` an einen Service gehängtes Objekt (SLA, Deliverable oder Review). */
export interface ServiceComponentItem {
  readonly object_id: string;
  readonly name: string;
  readonly object_type: string;
  readonly lifecycle_status: string;
  readonly description: string;
}

/** Über `covered_by`/`requires` verknüpftes Objekt des ISMS-Graphen (aufgelöster Name). */
export interface ServiceScopeItem {
  readonly object_id: string;
  readonly name: string;
  readonly object_type: string;
  /** Kantenstatus aus dem Seed (z. B. „im Serviceumfang", „Voraussetzung erfüllt"). */
  readonly edge_status?: string;
}

/** `contributes_to`-Beitrag eines Service zu Objective/KPI (R20: Beitrag ohne Garantie). */
export interface ServiceContribution {
  readonly relationship_id: string;
  readonly target_id: string;
  readonly target_name: string;
  readonly target_type: string;
  readonly assertion_kind: string;
  /** Qualitativ + Wert (z. B. „mittel (0,75)"), falls die Kante einen Vertrauensgrad trägt. */
  readonly confidence_display?: string;
  readonly effectiveness_assumption?: string;
}

/** Vollständig aufgelöste Sicht auf einen Managed Service innerhalb EINES Mandanten. */
export interface ManagedServiceView {
  readonly service: ObjectEnvelope;
  readonly slas: readonly ServiceComponentItem[];
  readonly deliverables: readonly ServiceComponentItem[];
  readonly reviews: readonly ServiceComponentItem[];
  /** Delivery-Verantwortung (R21, Ziel-Team im selben Mandanten – O-WP012-04). */
  readonly delivery_team_names: readonly string[];
  /** Objekte im Serviceumfang (R22 covered_by, Quelle -> dieser Service). */
  readonly covered: readonly ServiceScopeItem[];
  /** Verbindliche Voraussetzungen (R19 requires, dieser Service -> Ziel). */
  readonly required: readonly ServiceScopeItem[];
  /** Wirkungsbeiträge zu Zielen/Kennzahlen (R20 contributes_to). */
  readonly contributions: readonly ServiceContribution[];
}

/* -----------------------------------------------------------------------------
 * Auflösung je Mandant (harte Mandantengrenze über tenant_id)
 * --------------------------------------------------------------------------- */

/**
 * Baut einen `ServiceComponentItem` aus einem aufgelösten Objekt. Fehlt der Endpunkt
 * (unerwartet – die Seed-Integritätstests schließen Dangling-Kanten aus), fällt der Name
 * bewusst auf die rohe ID zurück, damit die Lücke sichtbar wird statt still zu verschwinden
 * (Muster aus `resolveRelationships` in `lib/twin/data.ts`).
 *
 * PRÄZISIERUNG (Code-Review MINOR-2): Im `part_of`-Zweig greift dieses Fail-loud nur
 * teilweise — eine dangling Quelle erhielte `object_type: 'unbekannt'` und würde damit
 * keiner der drei Listen (SLA/Deliverable/Review) zugeordnet, also NICHT angezeigt.
 * Abgesichert wird das ausschließlich durch die Seed-Integritätstests (kein Dangling im
 * Seed, `packages/demo-seed/src/seed.spec.ts`). Sollte der Seed je dynamisch werden,
 * unbekannte `part_of`-Quellen sichtbar machen (eigene „Sonstige"-Liste).
 */
function toComponentItem(obj: ObjectEnvelope | undefined, fallbackId: string): ServiceComponentItem {
  if (!obj) {
    return {
      object_id: fallbackId,
      name: fallbackId,
      object_type: 'unbekannt',
      lifecycle_status: 'unbekannt',
      description: '',
    };
  }
  return {
    object_id: obj.object_id,
    name: obj.display_name,
    object_type: obj.object_type,
    lifecycle_status: obj.lifecycle_status,
    // `description` ist im Envelope optional; leere Beschreibung wird als leer gerendert.
    description: obj.description ?? '',
  };
}

function toScopeItem(
  obj: ObjectEnvelope | undefined,
  fallbackId: string,
  edgeStatus?: string,
): ServiceScopeItem {
  return {
    object_id: obj?.object_id ?? fallbackId,
    name: obj?.display_name ?? fallbackId,
    object_type: obj?.object_type ?? 'unbekannt',
    edge_status: edgeStatus,
  };
}

function buildServiceView(
  service: ObjectEnvelope,
  relationships: readonly RelationshipEnvelope[],
  byId: ReadonlyMap<string, ObjectEnvelope>,
): ManagedServiceView {
  const slas: ServiceComponentItem[] = [];
  const deliverables: ServiceComponentItem[] = [];
  const reviews: ServiceComponentItem[] = [];
  const delivery_team_names: string[] = [];
  const covered: ServiceScopeItem[] = [];
  const required: ServiceScopeItem[] = [];
  const contributions: ServiceContribution[] = [];

  for (const rel of relationships) {
    switch (rel.relationship_type) {
      case 'part_of': {
        // SLA/Deliverable/Review -> Service: nur Kanten AUF diesen Service; die Zuordnung in
        // die drei Listen erfolgt über den kanonischen Objekttyp der Quelle.
        if (rel.target_id !== service.object_id) break;
        const source = byId.get(rel.source_id);
        const item = toComponentItem(source, rel.source_id);
        if (item.object_type === 'SLA') slas.push(item);
        else if (item.object_type === 'Deliverable') deliverables.push(item);
        else if (item.object_type === 'Review') reviews.push(item);
        // Andere part_of-Quellen (z. B. Team -> Organisation) betreffen keinen Service.
        break;
      }
      case 'delivered_by': {
        // Service -> Team (Delivery-Verantwortung im selben Mandanten, O-WP012-04).
        if (rel.source_id !== service.object_id) break;
        delivery_team_names.push(byId.get(rel.target_id)?.display_name ?? rel.target_id);
        break;
      }
      case 'covered_by': {
        // Risk/Control/Implementierung/Evidence -> Service (liegt im Serviceumfang).
        if (rel.target_id !== service.object_id) break;
        covered.push(toScopeItem(byId.get(rel.source_id), rel.source_id, rel.status));
        break;
      }
      case 'requires': {
        // Service -> Control/Evidence (verbindliche Voraussetzung im Scope).
        if (rel.source_id !== service.object_id) break;
        required.push(toScopeItem(byId.get(rel.target_id), rel.target_id, rel.status));
        break;
      }
      case 'contributes_to': {
        // Service -> Objective/KPI (begründeter Beitrag ohne Garantie, R20).
        if (rel.source_id !== service.object_id) break;
        const target = byId.get(rel.target_id);
        contributions.push({
          relationship_id: rel.relationship_id,
          target_id: rel.target_id,
          target_name: target?.display_name ?? rel.target_id,
          target_type: target?.object_type ?? 'unbekannt',
          assertion_kind: rel.assertion_kind,
          confidence_display:
            typeof rel.confidence === 'number'
              ? confidenceQualitative(rel.confidence).display
              : undefined,
          effectiveness_assumption: rel.effectiveness_assumption,
        });
        break;
      }
      default:
        break;
    }
  }

  return { service, slas, deliverables, reviews, delivery_team_names, covered, required, contributions };
}

/**
 * Alle Managed Services eines Mandanten, vollständig aufgelöst (Seed-Reihenfolge).
 * Mandanten ohne Services liefern eine leere Liste (Empty-State in der UI).
 */
export function getManagedServicesForTenant(tenantId: string): ManagedServiceView[] {
  const objects = DEMO_SEED.objects.filter((o) => o.tenant_id === tenantId);
  const relationships = DEMO_SEED.relationships.filter((r) => r.tenant_id === tenantId);
  const byId = new Map(objects.map((o) => [o.object_id, o] as const));

  return objects
    .filter((o) => o.object_type === 'Managed Service')
    .map((service) => buildServiceView(service, relationships, byId));
}

/* -----------------------------------------------------------------------------
 * Portfolio-Übersicht (Aggregation je Mandant – KEINE Cross-Tenant-Kanten)
 * --------------------------------------------------------------------------- */

export interface PortfolioServiceSummary {
  readonly object_id: string;
  readonly name: string;
  readonly lifecycle_status: string;
}

export interface PortfolioTenantEntry {
  readonly tenant: DemoTenant;
  readonly service_count: number;
  readonly services: readonly PortfolioServiceSummary[];
}

/**
 * Mandantenübergreifende Portfolio-Übersicht: je Mandant (Seed-Reihenfolge) Anzahl und Namen
 * seiner Managed Services. WICHTIG: reine Anzeige-Aggregation NEBENEINANDER – jede Zeile
 * entsteht ausschließlich aus Objekten des jeweiligen Mandanten; es wird keine Beziehung über
 * die Mandantengrenze gelesen oder erzeugt (O-WP012-03, Dok. 07 P09).
 */
export function buildPortfolioOverview(): PortfolioTenantEntry[] {
  return DEMO_SEED.tenants.map((tenant) => {
    const services = DEMO_SEED.objects.filter(
      (o) => o.tenant_id === tenant.tenant_id && o.object_type === 'Managed Service',
    );
    return {
      tenant,
      service_count: services.length,
      services: services.map((s) => ({
        object_id: s.object_id,
        name: s.display_name,
        lifecycle_status: s.lifecycle_status,
      })),
    };
  });
}

/**
 * Mandanten mit mindestens einem Managed Service – aus dem Seed abgeleitet (NICHT hartkodiert),
 * damit der Empty-State automatisch korrekt bleibt, sobald weitere Mandanten Services erhalten.
 */
export function getServiceTenants(): DemoTenant[] {
  return buildPortfolioOverview()
    .filter((entry) => entry.service_count > 0)
    .map((entry) => entry.tenant);
}
