/**
 * Ampel-Semantik des Cockpits (WP-025, moderne Dashboard-Sprache – Owner-Freigabe DR-0010 Nr. 3).
 *
 * OWNER-GRUNDSATZ „nichts nur Show": Jede Farbe im Cockpit kodiert AUSSCHLIESSLICH eine ERFASSTE
 * Datenlage nach der hier offengelegten Regel – kein Prüfergebnis, kein Wirksamkeits- oder
 * Sicherheitsurteil (DR-0008). Der Status wird MECHANISCH aus „x von y" abgeleitet; es gibt keine
 * erfundene Schwere und keine Farbe ohne Regel.
 *
 * NIE NUR FARBE (Dok. 06 06-D11 / „Visuelles Designsystem"): Jeder Ampel-Eintrag trägt Symbol
 * (Form, `aria-hidden`) UND Text. Die Farbe kommt erst im CSS dazu; die Aussage steht als Text.
 *
 * React-frei und deterministisch testbar (Muster `lib/heute/dashboard.ts`).
 */

import type { CoverageTile } from '../heute/dashboard';

/**
 * Die vier Ampel-Zustände des Cockpits – exakt die Legende, die der Nutzer sieht.
 *  - `ok`    (grün)   = belegt/vollständig
 *  - `warn`  (amber)  = teilweise / erfasste Datenlücke
 *  - `alert` (rot)    = Grundgesamtheit besteht, aber nichts ist erfasst
 *  - `info`  (indigo) = neutraler Stand (keine belastbare Grundgesamtheit / zu wenige Fälle)
 */
export type CockpitStatus = 'ok' | 'warn' | 'alert' | 'info';

/**
 * Status einer Abdeckung „x von y" – die EINE offengelegte Regel des Cockpits.
 *
 * `klein` = kleine Grundgesamtheit (n≤2, `istKleineGrundgesamtheit` in `lib/heute/dashboard.ts`):
 * dann KEIN Erfolgs-Grün, auch bei x = y. Ein grüner Vollring über „1 von 1" läse sich wie eine
 * vollständige Landschaft, obwohl genau ein Fall erfasst ist (DR-0013 Nr. 7) – deshalb neutral.
 */
export function coverageStatus(covered: number, total: number, klein = false): CockpitStatus {
  if (total <= 0) return 'info'; // keine Grundgesamtheit -> neutral, kein Alarm
  if (klein) return 'info'; // zu wenige Fälle für eine Aussage -> neutral
  if (covered >= total) return 'ok';
  if (covered === 0) return 'alert'; // Grundgesamtheit da, aber nichts erfasst
  return 'warn'; // erfasste Datenlücke
}

/** Status einer Abdeckungskachel – liest Grundgesamtheit und Kleinheit direkt aus dem Modell. */
export function coverageTileStatus(tile: CoverageTile): CockpitStatus {
  return coverageStatus(tile.covered, tile.total, tile.kleineGrundgesamtheit);
}

export interface AmpelEintrag {
  readonly status: CockpitStatus;
  /** Form (Symbol) – `aria-hidden`, nie alleinige Bedeutungsträgerin. */
  readonly symbol: string;
  /** Sichtbarer Kurztext des Zustands. */
  readonly label: string;
  /** Die offengelegte Ableitungsregel im Klartext. */
  readonly regel: string;
}

/** Die sichtbare Ampel-Legende (einmal oben im Cockpit) – Reihenfolge grün → amber → rot → indigo. */
export const AMPEL_LEGENDE: readonly AmpelEintrag[] = [
  {
    status: 'ok',
    symbol: '●',
    label: 'belegt / vollständig',
    regel: 'jedes gezählte Objekt trägt die erfasste Beziehung (x = y)',
  },
  {
    status: 'warn',
    symbol: '◐',
    label: 'teilweise / Datenlücke',
    regel: 'ein Teil der Grundgesamtheit trägt sie nicht (0 < x < y)',
  },
  {
    status: 'alert',
    symbol: '▲',
    label: 'nichts erfasst',
    regel: 'die Grundgesamtheit besteht, aber kein Objekt trägt sie (x = 0, y > 0)',
  },
  {
    status: 'info',
    symbol: '■',
    label: 'neutraler Stand',
    regel: 'keine belastbare Grundgesamtheit (y = 0) oder zu wenige Fälle für eine Aussage',
  },
] as const;

/** Ehrlichkeitszeile unter der Legende (DR-0008): Farbe ist Datenlage, kein Prüfergebnis. */
export const AMPEL_HONESTY =
  'Farbe kodiert die erfasste Datenlage nach der hier offengelegten Regel – kein Prüfergebnis ' +
  'und kein Wirksamkeitsurteil.';
