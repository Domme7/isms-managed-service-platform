/**
 * Reine, wiederverwendbare Integritätsprüfungen über einen Objekt-/Beziehungs-Seed.
 *
 * Dies sind deterministische Datenqualitäts-Helfer (Data-Graph-Analytics: Integrity Tests,
 * Data-Quality-Evidence). Sie erzwingen die in Dok. 07 / Dok. 19 verankerten Invarianten:
 *   - stabile, eindeutige IDs (P02),
 *   - referenzielle Integrität (Beziehung zeigt auf existierende Objekte),
 *   - Mandantentrennung ohne Cross-Tenant-Kanten (P09, D11, Dok. 19).
 *
 * Keine Persistenz, kein I/O – nur In-Memory-Auswertung.
 */

import type { ObjectEnvelope, RelationshipEnvelope } from '@isms/contracts';

/** Liefert die Menge mehrfach vorkommender IDs (leeres Array = alle eindeutig). */
export function findDuplicateIds(ids: readonly string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) {
      duplicates.add(id);
    }
    seen.add(id);
  }
  return [...duplicates];
}

/** Indexiert Objekte nach `object_id` (letzter Eintrag gewinnt bei Duplikaten). */
export function indexObjectsById(objects: readonly ObjectEnvelope[]): Map<string, ObjectEnvelope> {
  return new Map(objects.map((o) => [o.object_id, o]));
}

export interface RelationshipViolation {
  readonly relationship_id: string;
  readonly reason: string;
}

/**
 * Referenzielle Integrität: jede Beziehung muss auf im Seed vorhandene Objekte zeigen
 * (source_id und target_id). Gibt eine Liste der Verletzungen zurück (leer = intakt).
 */
export function findDanglingRelationships(
  objects: readonly ObjectEnvelope[],
  relationships: readonly RelationshipEnvelope[],
): RelationshipViolation[] {
  const index = indexObjectsById(objects);
  const violations: RelationshipViolation[] = [];
  for (const rel of relationships) {
    if (!index.has(rel.source_id)) {
      violations.push({
        relationship_id: rel.relationship_id,
        reason: `source_id "${rel.source_id}" existiert nicht im Seed`,
      });
    }
    if (!index.has(rel.target_id)) {
      violations.push({
        relationship_id: rel.relationship_id,
        reason: `target_id "${rel.target_id}" existiert nicht im Seed`,
      });
    }
  }
  return violations;
}

/**
 * Mandantentrennung (Dok. 07 P09/D11, Dok. 19): eine Beziehung darf keine Objekte über
 * eine `tenant_id`-Grenze hinweg verbinden. Geprüft wird:
 *   - Beziehung.tenant_id == Quellobjekt.tenant_id,
 *   - Beziehung.tenant_id == Zielobjekt.tenant_id,
 *   - Quellobjekt.tenant_id == Zielobjekt.tenant_id.
 * Fehlt ein referenziertes Objekt, wird das hier NICHT als Tenant-Verletzung gewertet
 * (das deckt `findDanglingRelationships` ab).
 */
export function findCrossTenantRelationships(
  objects: readonly ObjectEnvelope[],
  relationships: readonly RelationshipEnvelope[],
): RelationshipViolation[] {
  const index = indexObjectsById(objects);
  const violations: RelationshipViolation[] = [];
  for (const rel of relationships) {
    const source = index.get(rel.source_id);
    const target = index.get(rel.target_id);
    if (source && source.tenant_id !== rel.tenant_id) {
      violations.push({
        relationship_id: rel.relationship_id,
        reason: `Quellobjekt-Tenant "${source.tenant_id}" != Beziehungs-Tenant "${rel.tenant_id}"`,
      });
    }
    if (target && target.tenant_id !== rel.tenant_id) {
      violations.push({
        relationship_id: rel.relationship_id,
        reason: `Zielobjekt-Tenant "${target.tenant_id}" != Beziehungs-Tenant "${rel.tenant_id}"`,
      });
    }
    if (source && target && source.tenant_id !== target.tenant_id) {
      violations.push({
        relationship_id: rel.relationship_id,
        reason: `Cross-Tenant-Kante: Quelle "${source.tenant_id}" -> Ziel "${target.tenant_id}"`,
      });
    }
  }
  return violations;
}

export interface OwnerRefViolation {
  readonly object_id: string;
  readonly owner_id: string;
  readonly reason: string;
}

/**
 * Owner-Ref-Kohärenz: jede in `owner_ids` referenzierte Owner-Entität (Rolle/Team/Einheit,
 * Dok. 07 P11/P12) muss als eigenes Seed-Objekt existieren – Owner sind fachliche Beziehungen,
 * keine impliziten Freitextfelder. Gibt die Liste unauflösbarer Owner-Refs zurück (leer = intakt).
 */
export function findUnresolvedOwnerRefs(objects: readonly ObjectEnvelope[]): OwnerRefViolation[] {
  const index = indexObjectsById(objects);
  const violations: OwnerRefViolation[] = [];
  for (const obj of objects) {
    for (const owner of obj.owner_ids) {
      if (!index.has(owner.owner_id)) {
        violations.push({
          object_id: obj.object_id,
          owner_id: owner.owner_id,
          reason: `owner_id "${owner.owner_id}" existiert nicht als Seed-Objekt`,
        });
      }
    }
  }
  return violations;
}
