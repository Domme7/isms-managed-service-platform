/**
 * View-Daten des Digital Twin Explorers (WP-004, read-only).
 *
 * Reine Ableitung aus `@isms/demo-seed` (statischer Import, kein Fetch/keine DB) und den
 * kanonischen Vokabularen aus `@isms/contracts`. Es werden AUSSCHLIESSLICH belegte Seed-Werte
 * gerendert – keine erfundenen Objekte/Beziehungen (Acceptance WP-004 / `.claude/rules/demo-data.md`).
 *
 * Diese Helfer sind bewusst frei von React/Next, damit sie deterministisch testbar sind.
 */

import {
  OBJECT_FAMILIES,
  OBJECT_FAMILY_ID,
  RELATIONSHIP_TYPES,
  type ObjectEnvelope,
  type ObjectFamilyId,
  type ObjectType,
  type RelationshipEnvelope,
} from '@isms/contracts';
import { DEMO_SEED, type DemoTenant } from '@isms/demo-seed';

/* -----------------------------------------------------------------------------
 * Mandanten
 * --------------------------------------------------------------------------- */

/** Alle vier Demo-Mandanten (stabile Reihenfolge aus dem Seed). */
export function getTenants(): readonly DemoTenant[] {
  return DEMO_SEED.tenants;
}

/** Ein Mandant nach `tenant_id`; `undefined` => Route soll 404 liefern. */
export function getTenant(tenantId: string): DemoTenant | undefined {
  return DEMO_SEED.tenants.find((t) => t.tenant_id === tenantId);
}

/**
 * Mandanten, die im aktuellen Demo-Seed bereits einen Objektgraphen tragen.
 * Aus dem Seed abgeleitet (`has_object_graph`) – NICHT hartkodiert, damit der Empty-State
 * automatisch korrekt bleibt, sobald weitere Graphen ergänzt werden.
 */
export function getModeledTenants(): DemoTenant[] {
  return DEMO_SEED.tenants.filter((t) => t.has_object_graph);
}

/* -----------------------------------------------------------------------------
 * Objekte je Mandant, gruppiert nach Objektfamilie F01–F09
 * --------------------------------------------------------------------------- */

/**
 * Reverse-Index Objekttyp -> Familien-ID, aufgebaut aus dem Contract-Vokabular.
 * Iteration in F01..F09-Reihenfolge; bei der dokumentierten Überschneidung von "Finding"
 * (F07 & F08) gewinnt die zuletzt gesehene Familie (F08). Der Nordwerk-Seed nutzt "Finding"
 * nicht, daher ist die Zuordnung hier eindeutig.
 */
const TYPE_TO_FAMILY: ReadonlyMap<string, ObjectFamilyId> = (() => {
  const map = new Map<string, ObjectFamilyId>();
  for (const fid of OBJECT_FAMILY_ID) {
    for (const type of OBJECT_FAMILIES[fid].types) {
      map.set(type, fid);
    }
  }
  return map;
})();

/** Familie eines Objekttyps (oder `undefined`, falls nicht im Katalog). */
export function familyForType(type: ObjectType): ObjectFamilyId | undefined {
  return TYPE_TO_FAMILY.get(type);
}

/**
 * Deutsche Klartext-Glossen für Objekttypen – REINE UI-PRÄSENTATIONSSCHICHT (Dok. 06 P03
 * „Klartext vor Fachsprache"), analog zu `REL_TYPE_TO_LABEL_DE` weiter unten.
 *
 * WICHTIG: Hier wird NICHTS neu übersetzt. Die Einträge sind exakt die Glossen, die bereits im
 * Produkt sichtbar sind (`components/isms/IsmsCards.tsx`: „Risiko (Risk)", „Risikoszenario
 * (Risk Scenario)", „Schwachstelle (Weakness)", „Maßnahme (Measure)", „Nachweis (Evidence)";
 * `components/services/ServiceCard.tsx`: „Ziel (Objective)", „Kennzahl (KPI)"). Sie wurden aus
 * den Komponenten hierher gezogen, damit es genau EINE Quelle gibt (Review-Fix). Typen ohne
 * belegte Glosse (z. B. „Control", „Managed Service", „Information Asset") bleiben bewusst
 * beim kanonischen Namen – eine Übersetzung wird nicht erfunden.
 */
const OBJECT_TYPE_LABEL_DE: Readonly<Record<string, string>> = {
  Risk: 'Risiko',
  'Risk Scenario': 'Risikoszenario',
  Weakness: 'Schwachstelle',
  Measure: 'Maßnahme',
  Evidence: 'Nachweis',
  Objective: 'Ziel',
  KPI: 'Kennzahl',
};

/** Deutsches UI-Label eines Objekttyps (oder `undefined`, dann kanonischen Namen nutzen). */
export function objectTypeLabel(objectType: string): string | undefined {
  return OBJECT_TYPE_LABEL_DE[objectType];
}

/**
 * Objekttyp für die Anzeige: „Risiko (Risk)" bei belegter Glosse, sonst der kanonische Typ.
 * Der kanonische Typ bleibt IMMER sichtbar (Nachvollziehbarkeit zum Modell).
 */
export function objectTypeDisplay(objectType: string): string {
  const label = objectTypeLabel(objectType);
  return label ? `${label} (${objectType})` : objectType;
}

/** Alle Objekte eines Mandanten (harte Mandantengrenze über `tenant_id`). */
export function getObjectsForTenant(tenantId: string): ObjectEnvelope[] {
  return DEMO_SEED.objects.filter((o) => o.tenant_id === tenantId);
}

export interface FamilyGroup {
  readonly id: ObjectFamilyId;
  readonly name: string;
  readonly leitfrage: string;
  readonly objects: readonly ObjectEnvelope[];
}

/**
 * Gruppiert Objekte nach Objektfamilie in kanonischer F01..F09-Reihenfolge.
 * Familien ohne Objekte werden weggelassen (nur belegte Familien anzeigen).
 */
export function groupObjectsByFamily(objects: readonly ObjectEnvelope[]): FamilyGroup[] {
  return OBJECT_FAMILY_ID.map((fid) => {
    const family = OBJECT_FAMILIES[fid];
    return {
      id: fid,
      name: family.name,
      leitfrage: family.leitfrage,
      objects: objects.filter((o) => familyForType(o.object_type) === fid),
    };
  }).filter((group) => group.objects.length > 0);
}

/* -----------------------------------------------------------------------------
 * Beziehungen je Mandant, aufgelöst auf lesbare Namen
 * --------------------------------------------------------------------------- */

/** Reverse-Index Beziehungstyp (snake_case) -> kanonische R-ID (z. B. "processes" -> "R07"). */
const REL_TYPE_TO_ID: ReadonlyMap<string, string> = (() => {
  const map = new Map<string, string>();
  for (const key of Object.keys(RELATIONSHIP_TYPES) as (keyof typeof RELATIONSHIP_TYPES)[]) {
    const entry = RELATIONSHIP_TYPES[key];
    map.set(entry.type, entry.id);
  }
  return map;
})();

/** Kanonische R-ID zu einem Beziehungstyp (oder `undefined`). */
export function relationshipTypeId(relationshipType: string): string | undefined {
  return REL_TYPE_TO_ID.get(relationshipType);
}

/**
 * Deutsche Klartext-Labels für Beziehungstypen – REINE UI-PRÄSENTATIONSSCHICHT (Dok. 06
 * P03/P04/D08 „Klartext vor Fachsprache"). Der kanonische snake_case-Typ bleibt unverändert
 * und wird sekundär weiter angezeigt; hier wird NICHTS am Modell/Contract/Seed erfunden.
 * Abgedeckt sind die im Demo-Seed genutzten Typen (ISMS-Kerngraph WP-003 sowie
 * Managed-Service-Schicht WP-012); nicht abgebildete Typen fallen auf den
 * technischen Namen zurück.
 */
const REL_TYPE_TO_LABEL_DE: Readonly<Record<string, string>> = {
  part_of: 'ist Teil von',
  owns: 'verantwortet',
  processes: 'verarbeitet',
  exposes: 'exponiert',
  threatens: 'bedroht',
  affects: 'betrifft',
  mitigates: 'mindert',
  implements: 'setzt um',
  satisfies: 'erfüllt',
  evidences: 'belegt',
  remediates: 'behebt',
  // Managed-Service-Schicht (WP-012, Dok. 07 §9 R19–R22):
  requires: 'benötigt',
  contributes_to: 'trägt bei zu',
  delivered_by: 'erbracht durch',
  covered_by: 'abgedeckt durch',
  // Historie/Ablösung (WP-014, Dok. 07 §9 R24): die Objekt-360-Seite benennt die Ablösung
  // explizit, damit eine fehlende Versionshistorie in Klartext begründet werden kann.
  supersedes: 'löst ab',
  // Entscheidungsschicht (WP-017, Dok. 07 §9 R23 „Verknüpft fachlichen Zustand mit menschlicher
  // Entscheidung"). Bewusst NEUTRAL als Bezug formuliert und nicht als „Auslöser": welches der
  // beiden Decision-Card-Pflichtfelder (Zielbezug/Auslöser) R23 abbildet, ist offen
  // (O-WP017-04) – hier wird nichts entschieden, was das Konzept nicht sagt.
  decided_in: 'entschieden in',
};

/** Deutsches UI-Label eines Beziehungstyps (oder `undefined`, dann technischen Namen nutzen). */
export function relationshipTypeLabel(relationshipType: string): string | undefined {
  return REL_TYPE_TO_LABEL_DE[relationshipType];
}

/**
 * Qualitative Einordnung eines Vertrauensgrads (0..1) als Klartext + Wert (Dok. 06 D08:
 * Unsicherheit sichtbar, nicht als nackte Zahl). Schwellen (reine Anzeigeentscheidung,
 * reversibel): hoch >= 0.8, mittel >= 0.5, sonst niedrig. Der Wert wird mit deutschem
 * Dezimalkomma dargestellt (z. B. „mittel (0,7)").
 */
export type ConfidenceBand = 'niedrig' | 'mittel' | 'hoch';

export function confidenceQualitative(value: number): { band: ConfidenceBand; display: string } {
  const band: ConfidenceBand = value >= 0.8 ? 'hoch' : value >= 0.5 ? 'mittel' : 'niedrig';
  const formatted = value.toLocaleString('de-DE');
  return { band, display: `${band} (${formatted})` };
}

/** Beziehung mit auf `display_name` aufgelösten Endpunkten (für die lesbare Kette). */
export interface ResolvedRelationship {
  readonly relationship_id: string;
  readonly relationship_type: string;
  readonly relationship_type_id?: string;
  readonly relationship_type_label?: string;
  /**
   * Rohe Endpunkt-Kennungen. Ergänzt in WP-014 Slice 2, damit die Beziehungsliste beide
   * Endpunkte auf ihre Objekt-360-Detailseite verlinken kann (Dok. 07 §10). Die Namensfelder
   * bleiben unverändert – hier wird nichts umbenannt und nichts am Modell erfunden.
   */
  readonly source_id: string;
  readonly target_id: string;
  readonly source_name: string;
  readonly target_name: string;
  /**
   * `false`, wenn der Endpunkt in der übergebenen Objektmenge nicht auflösbar war (dann trägt
   * `*_name` die rohe ID). Die UI verlinkt einen solchen Endpunkt bewusst NICHT – ein Link
   * würde eine Existenz behaupten, die nicht belegt ist (Fail-loud statt stiller Lücke).
   */
  readonly source_resolved: boolean;
  readonly target_resolved: boolean;
  readonly assertion_kind: string;
  readonly confidence?: number;
}

/** Alle Beziehungen eines Mandanten. */
export function getRelationshipsForTenant(tenantId: string): RelationshipEnvelope[] {
  return DEMO_SEED.relationships.filter((r) => r.tenant_id === tenantId);
}

/**
 * Löst `source_id`/`target_id` über die übergebenen Objekte auf `display_name` auf.
 * Fällt bewusst auf die rohe ID zurück, falls ein Endpunkt (unerwartet) fehlt – so wird eine
 * Lücke sichtbar, statt still zu verschwinden.
 */
export function resolveRelationships(
  objects: readonly ObjectEnvelope[],
  relationships: readonly RelationshipEnvelope[],
): ResolvedRelationship[] {
  const nameById = new Map(objects.map((o) => [o.object_id, o.display_name] as const));
  return relationships.map((r) => ({
    relationship_id: r.relationship_id,
    relationship_type: r.relationship_type,
    relationship_type_id: relationshipTypeId(r.relationship_type),
    relationship_type_label: relationshipTypeLabel(r.relationship_type),
    source_id: r.source_id,
    target_id: r.target_id,
    source_name: nameById.get(r.source_id) ?? r.source_id,
    target_name: nameById.get(r.target_id) ?? r.target_id,
    source_resolved: nameById.has(r.source_id),
    target_resolved: nameById.has(r.target_id),
    assertion_kind: r.assertion_kind,
    confidence: r.confidence,
  }));
}

/* -----------------------------------------------------------------------------
 * Aggregiertes View-Modell einer Mandanten-Detailseite
 * --------------------------------------------------------------------------- */

export interface TenantDetailModel {
  readonly tenant: DemoTenant;
  readonly familyGroups: FamilyGroup[];
  readonly relationships: ResolvedRelationship[];
  readonly objectCount: number;
  readonly relationshipCount: number;
}

/** Baut das komplette, gerenderte Modell einer Detailseite aus dem Seed. */
export function buildTenantDetail(tenant: DemoTenant): TenantDetailModel {
  const objects = getObjectsForTenant(tenant.tenant_id);
  const relationships = getRelationshipsForTenant(tenant.tenant_id);
  return {
    tenant,
    familyGroups: groupObjectsByFamily(objects),
    relationships: resolveRelationships(objects, relationships),
    objectCount: objects.length,
    relationshipCount: relationships.length,
  };
}
