/**
 * Kanonische Seed-Fakten auf Abruf (WP-018 Wächter 3c).
 *
 * HINTERGRUND (Briefing §7 Lektion 6): Zahlen aus Builder-Berichten wanderten schon einmal
 * ungeprüft in Statusdateien. Diese Ableitung ist die EINE Stelle, an der die kanonischen
 * Zahlen des Demo-Seeds GEZÄHLT statt abgeschrieben werden. Konsumenten:
 *  - `scripts/seed_facts.py` (ruft `computeSeedFacts()` über die gebauten Exporte via Node auf),
 *  - `src/seed-facts.spec.ts` (beweist die Übereinstimmung mit `DEMO_SEED` UND
 *    `seed-manifest.json` – die Ableitung selbst liest das Manifest bewusst NICHT,
 *    sonst wäre der Abgleich zirkulär).
 *
 * KEINE Seed-Datenänderung: reine Zählung über die bestehenden Schicht-Exporte, analog zu
 * den Integritätshelfern in `integrity.ts`.
 */

import type { ObjectEnvelope, RelationshipEnvelope } from '@isms/contracts';
import { DECISION_OBJECTS, DECISION_RELATIONSHIPS } from './decisions';
import {
  NORDWERK_SERVICE_OBJECTS,
  NORDWERK_SERVICE_RELATIONSHIPS,
  OPERATOR_OBJECTS,
  OPERATOR_RELATIONSHIPS,
} from './managed-services';
import { NORDWERK_OBJECTS, NORDWERK_RELATIONSHIPS } from './nordwerk-graph';
import { DEMO_SEED } from './seed';

/** Zählpaar Objekte/Beziehungen. */
export interface SeedCountPair {
  readonly objects: number;
  readonly relationships: number;
}

/** Kanonische, aus dem Seed GEZÄHLTE Fakten (nie aus dem Manifest abgeschrieben). */
export interface SeedFacts {
  readonly seed_version: string;
  readonly totals: SeedCountPair;
  /** Je Mandant (alle Mandanten aus dem Seed, auch die bewusst leeren). */
  readonly by_tenant: Readonly<Record<string, SeedCountPair>>;
  /** Je Erfassungsschicht der Seed-Aggregation (`seed.ts`-Konkatenationsreihenfolge). */
  readonly by_layer: Readonly<Record<string, SeedCountPair>>;
}

/**
 * Die Schichten der Seed-Aggregation. Quelle sind die Schicht-Exporte selbst – exakt die
 * Listen, aus denen `DEMO_SEED` in `seed.ts` konkateniert wird. Die Schlüssel entsprechen den
 * `layers`-Schlüsseln in `seed-manifest.json`; die ZAHLEN kommen ausschließlich aus den Listen.
 */
const SEED_LAYERS: ReadonlyArray<{
  readonly key: string;
  readonly objects: readonly ObjectEnvelope[];
  readonly relationships: readonly RelationshipEnvelope[];
}> = [
  { key: 'isms_core_nordwerk', objects: NORDWERK_OBJECTS, relationships: NORDWERK_RELATIONSHIPS },
  {
    key: 'managed_service_nordwerk',
    objects: NORDWERK_SERVICE_OBJECTS,
    relationships: NORDWERK_SERVICE_RELATIONSHIPS,
  },
  {
    key: 'managed_service_consulting_operator',
    objects: OPERATOR_OBJECTS,
    relationships: OPERATOR_RELATIONSHIPS,
  },
  { key: 'decisions_nordwerk', objects: DECISION_OBJECTS, relationships: DECISION_RELATIONSHIPS },
];

/**
 * Zählt die kanonischen Seed-Fakten: gesamt, je Mandant, je Schicht.
 * Deterministisch, ohne I/O, ohne Manifest-Lektüre.
 */
export function computeSeedFacts(): SeedFacts {
  const byTenant: Record<string, SeedCountPair> = {};
  for (const tenant of DEMO_SEED.tenants) {
    byTenant[tenant.tenant_id] = {
      objects: DEMO_SEED.objects.filter((o) => o.tenant_id === tenant.tenant_id).length,
      relationships: DEMO_SEED.relationships.filter((r) => r.tenant_id === tenant.tenant_id).length,
    };
  }

  const byLayer: Record<string, SeedCountPair> = {};
  for (const layer of SEED_LAYERS) {
    byLayer[layer.key] = {
      objects: layer.objects.length,
      relationships: layer.relationships.length,
    };
  }

  // Partitions-Invariante fail-loud: die Schichten müssen den Seed exakt abdecken – weder
  // ein Objekt doppelt noch eines außerhalb einer Schicht (sonst wären „je Schicht"-Zahlen
  // still unvollständig statt kanonisch).
  const layerObjectIds = SEED_LAYERS.flatMap((l) => l.objects.map((o) => o.object_id));
  const layerRelationshipIds = SEED_LAYERS.flatMap((l) =>
    l.relationships.map((r) => r.relationship_id),
  );
  const seedObjectIds = DEMO_SEED.objects.map((o) => o.object_id);
  const seedRelationshipIds = DEMO_SEED.relationships.map((r) => r.relationship_id);
  if (
    layerObjectIds.length !== seedObjectIds.length ||
    layerRelationshipIds.length !== seedRelationshipIds.length ||
    !layerObjectIds.every((id, i) => id === seedObjectIds[i]) ||
    !layerRelationshipIds.every((id, i) => id === seedRelationshipIds[i])
  ) {
    throw new Error(
      'Seed-Fakten inkonsistent: die Schichtlisten decken DEMO_SEED nicht exakt ab. ' +
        'Die Schichtdefinition in seed-facts.ts muss der Konkatenation in seed.ts folgen.',
    );
  }

  return {
    seed_version: DEMO_SEED.version,
    totals: {
      objects: DEMO_SEED.objects.length,
      relationships: DEMO_SEED.relationships.length,
    },
    by_tenant: byTenant,
    by_layer: byLayer,
  };
}
