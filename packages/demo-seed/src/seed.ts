/**
 * Aggregierter, deterministischer Demo-Seed.
 *
 * Bündelt die vier synthetischen Mandanten und den kohärenten Nordwerk-Objektgraphen zu einer
 * reinen In-Memory-Fixture. KEINE DB, KEIN ORM: der Seed wird später nur auf Repositories
 * gemappt. "Reset" bedeutet erneuter Import von `DEMO_SEED` – da alle IDs und Zeitstempel fest
 * kodiert sind, ist jeder Lauf identisch (Demo-Datenregel, `.claude/rules/testing.md`).
 */

import type { ObjectEnvelope, RelationshipEnvelope } from '@isms/contracts';
import { DEMO_TENANTS, type DemoTenant } from './tenants';
import { NORDWERK_OBJECTS, NORDWERK_RELATIONSHIPS } from './nordwerk-graph';

/** Version der Seed-Grundlage (SemVer). Muss zu `seed-manifest.json` passen. */
export const SEED_VERSION = '1.0.0';

export interface DemoSeed {
  readonly version: string;
  readonly tenants: readonly DemoTenant[];
  readonly objects: readonly ObjectEnvelope[];
  readonly relationships: readonly RelationshipEnvelope[];
}

/**
 * Der vollständige Demo-Seed. Aktuell trägt nur Nordwerk einen Objektgraphen; die übrigen
 * drei Mandanten sind als stabile Definitionen vorhanden (Graphen folgen in späteren WPs).
 */
export const DEMO_SEED: DemoSeed = {
  version: SEED_VERSION,
  tenants: DEMO_TENANTS,
  objects: NORDWERK_OBJECTS,
  relationships: NORDWERK_RELATIONSHIPS,
};
