/**
 * Lebenszyklus-Ampelleiste des Cockpits (WP-025, DR-0008 / Dok. 08, Abschnitt „Lebenszyklus").
 *
 * OWNER-GRUNDSATZ „nichts nur Show": Die Segmentbreiten sind ECHTE Anteile der erfassten Stände
 * (`count / total`), gezählt über die Objekte des AKTIVEN Mandanten – nichts ist hartkodiert.
 * Die Reihenfolge ist die kanonische Katalogreihenfolge der Stände (keine Sortierung nach Menge
 * oder Bedeutung). Die Farben unterscheiden die Stände optisch; sie sind KEIN Urteil: die Leiste
 * trägt die Pflicht-Glosse „erfasster Stand, kein Prüfergebnis" (08-D07), und judgment-nahe Stände
 * behalten ihren `STAND_HINWEIS` (Lesart-Ergänzung, kein Umbenennen).
 *
 * Reine Wiederverwendung der bestehenden Verteilungsregel (`deriveLifecycleVerteilung`) – KEINE
 * zweite Zählregel. Ein leerer Mandant liefert `undefined` (ehrlicher Leerzustand, keine Leiste).
 *
 * React-frei und deterministisch testbar (Muster `lib/heute/dashboard.ts`).
 */

import {
  deriveLifecycleVerteilung,
  LIFECYCLE_GLOSSE,
  type LifecycleSlice,
} from '../heute/dashboard';
import { getObjectsForTenant, getTenant } from '../twin/data';

export interface CockpitLifecycleSegment extends LifecycleSlice {
  /** Anteil an der Grundgesamtheit (0..1) – die echte Segmentbreite. */
  readonly anteil: number;
}

export interface CockpitLifecycleBar {
  readonly segments: readonly CockpitLifecycleSegment[];
  readonly total: number;
  /** Pflicht-Glosse (08-D07): erfasster Stand, kein Prüfergebnis. */
  readonly glosse: string;
}

/**
 * Baut die Lebenszyklus-Ampelleiste des aktiven Mandanten aus dem Seed.
 * `undefined` bei unbekanntem oder leerem Mandanten (keine „0 von 0"-Leiste, ehrlicher Leerzustand).
 */
export function buildCockpitLebenszyklus(tenantId: string): CockpitLifecycleBar | undefined {
  const tenant = getTenant(tenantId);
  if (!tenant) return undefined;

  const objects = getObjectsForTenant(tenantId);
  if (objects.length === 0) return undefined;

  const total = objects.length;
  const slices = deriveLifecycleVerteilung(objects);
  return {
    segments: slices.map((slice) => ({
      ...slice,
      anteil: total > 0 ? slice.count / total : 0,
    })),
    total,
    glosse: LIFECYCLE_GLOSSE,
  };
}
