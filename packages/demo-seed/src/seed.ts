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
import { DECISION_OBJECTS, DECISION_RELATIONSHIPS } from './decisions';
import { NORDSTERN_OBJECTS, NORDSTERN_RELATIONSHIPS } from './nordstern-graph';
import { ALPENCLOUD_OBJECTS, ALPENCLOUD_RELATIONSHIPS } from './alpencloud-graph';

/**
 * Version der Seed-Grundlage (SemVer). Muss zu `seed-manifest.json` passen.
 * 1.1.0 (WP-012 Slice 1): additive Managed-Service-Schicht (F09) für Nordwerk und den
 * Consulting Operator Demo; keine Änderung an bestehenden Objekten/Beziehungen.
 * 1.2.0 (WP-017 Slice 1): additive Entscheidungsschicht (`Decision Record`, F09) für Nordwerk
 * inklusive erster Ablösekette über R24 `supersedes`; keine Änderung an bestehenden
 * Objekten/Beziehungen.
 * 1.3.0 (WP-021 Slice 1): additive ISMS-Erweiterung des Flaggschiffs Nordstern (zweiter Standort,
 * OT-/Fertigungsseite, Konstruktionsdaten, bevorstehender Kunden-Audit) inklusive bewusster
 * Deckungslücken und der Dok-07-Demo-Graph-Pflicht (Konflikt/veraltete Quelle/Trust-State);
 * stabile `tenant_id`, keine Änderung an bestehenden Objekten/Beziehungen.
 * 1.4.0 (WP-021 Slice 3 Vorstufe): zwei weitere Dok-16-Kundenmandanten (AlpenCloud, GreenGrid)
 * als Empty-State ergänzt — Mandantenwelt auf sechs erweitert; noch KEINE neuen Objekte/Kanten.
 * 1.5.0 (WP-021 Slice 3): AlpenCloud GmbH erhält einen eigenen ISMS-Graphen (30 Objekte, 34 Kanten,
 * eigene vierte Erfassungswelle 2026-04-15) mit bewussten Deckungslücken + Dok-07-Demo-Graph-Pflicht;
 * KEINE numerische Bewertung (Slice 7, gated). Neuer Beziehungstyp `depends_on` erstmals belegt.
 */
export const SEED_VERSION = '1.5.0';

export interface DemoSeed {
  readonly version: string;
  readonly tenants: readonly DemoTenant[];
  readonly objects: readonly ObjectEnvelope[];
  readonly relationships: readonly RelationshipEnvelope[];
}

/**
 * Der vollständige Demo-Seed: ISMS-Kerngraph (Nordwerk) + Managed-Service-Schicht
 * (Nordwerk und Consulting Operator Demo) + Entscheidungsschicht (nur Nordwerk).
 * AlpenCloud trägt seit WP-021 Slice 3 einen eigenen ISMS-Graphen. Finovia, MediCore und GreenGrid
 * bleiben (noch) ohne Objekte (Empty-State); Rheinbank-Slot/MediNova-Slot folgen in Slices 4–5,
 * GreenGrid bleibt bewusst leer.
 *
 * REIHENFOLGE (bewusst): die Entscheidungsschicht wird HINTER der Managed-Service-Schicht
 * angehängt. Dadurch bleibt innerhalb der Objektfamilie F09 das erste Objekt unverändert – und
 * damit auch die aus dem Datenbestand abgeleiteten Objekt-Einstiege auf „Heute" stabil.
 *
 * Die Verkettung ist eine reine Listenkonkatenation – jedes Objekt und jede Beziehung
 * trägt weiterhin genau eine `tenant_id`, es entsteht KEINE Cross-Tenant-Kante (P09).
 */
export const DEMO_SEED: DemoSeed = {
  version: SEED_VERSION,
  tenants: DEMO_TENANTS,
  // REIHENFOLGE (bewusst): die Nordstern-Erweiterung wird ganz HINTEN angehängt. Dadurch bleibt
  // je bestehender Objektfamilie das erste Objekt unverändert (stabile „erstes-je-Familie"-
  // Ableitungen); die neue Familie F04 fügt sich als eigener Einstieg ein.
  objects: [
    ...NORDWERK_OBJECTS,
    ...MANAGED_SERVICE_OBJECTS,
    ...DECISION_OBJECTS,
    ...NORDSTERN_OBJECTS,
    ...ALPENCLOUD_OBJECTS,
  ],
  relationships: [
    ...NORDWERK_RELATIONSHIPS,
    ...MANAGED_SERVICE_RELATIONSHIPS,
    ...DECISION_RELATIONSHIPS,
    ...NORDSTERN_RELATIONSHIPS,
    ...ALPENCLOUD_RELATIONSHIPS,
  ],
};
