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
import { MANAGED_SERVICE_OBJECTS, MANAGED_SERVICE_RELATIONSHIPS } from './managed-services';

/**
 * Version der Seed-Grundlage (SemVer). Muss zu `seed-manifest.json` passen.
 * 1.1.0 (WP-012 Slice 1): additive Managed-Service-Schicht (F09) für Nordwerk und den
 * Consulting Operator Demo; keine Änderung an bestehenden Objekten/Beziehungen.
 */
export const SEED_VERSION = '1.1.0';

export interface DemoSeed {
  readonly version: string;
  readonly tenants: readonly DemoTenant[];
  readonly objects: readonly ObjectEnvelope[];
  readonly relationships: readonly RelationshipEnvelope[];
}

/**
 * Der vollständige Demo-Seed: ISMS-Kerngraph (Nordwerk) + Managed-Service-Schicht
 * (Nordwerk und Consulting Operator Demo). Finovia und MediCore bleiben bewusst ohne
 * Objekte (Empty-State-Nachweis; Graphen folgen in späteren WPs).
 *
 * Die Verkettung ist eine reine Listenkonkatenation – jedes Objekt und jede Beziehung
 * trägt weiterhin genau eine `tenant_id`, es entsteht KEINE Cross-Tenant-Kante (P09).
 */
export const DEMO_SEED: DemoSeed = {
  version: SEED_VERSION,
  tenants: DEMO_TENANTS,
  objects: [...NORDWERK_OBJECTS, ...MANAGED_SERVICE_OBJECTS],
  relationships: [...NORDWERK_RELATIONSHIPS, ...MANAGED_SERVICE_RELATIONSHIPS],
};
