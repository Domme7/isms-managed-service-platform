/**
 * Radar-/Web-Chart des Cockpits (WP-034, Cockpit-Redesign „Bento-Mosaik", DR-0016).
 *
 * OWNER-GRUNDSATZ „nichts nur Show" (DR-0008/DR-0014): Der Radar ist KEINE neue Datenquelle und
 * KEIN erfundenes Reifegrad-/Domänenprofil. Seine Achsen sind exakt die VIER bereits abgeleiteten
 * Abdeckungen des aktiven Mandanten (`buildHeuteDashboard().coverage`), und jeder Achsenwert ist
 * der ehrliche Anteil `covered/total` DERSELBEN „x von y"-Zahl, die die Deckungsringe zeigen.
 * Der Radar ist damit nur eine zweite, verdichtete DARSTELLUNG bereits belegter Zahlen – kein
 * Score, keine Gewichtung, keine Bewertung.
 *
 * EHRLICHKEITSGRENZEN, die hier eingehalten werden:
 *  - Kein Prozent-Score als Bewertung: der Anteil ist Geometrie (Länge der Achse), die sichtbare
 *    Aussage bleibt „x von y" am jeweiligen Punkt/Detail (DR-0008).
 *  - Kleine Grundgesamtheit (n≤2): der Punkt wird NEUTRAL (`info`) geführt – dieselbe Regel wie
 *    Ring/Badge (`coverageStatus`), kein Erfolgs-Grün über „1 von 1" (DR-0013 Nr. 7).
 *  - Leere Grundgesamtheit (total = 0): der Punkt sitzt im Zentrum (Anteil 0) UND wird als
 *    „keine Grundgesamtheit" markiert – er behauptet keine „0 %"-Abdeckung, sondern eine fehlende
 *    Zählbasis (die Kachel/Detailsicht benennt das im Klartext).
 *
 * React-frei und deterministisch testbar (Muster `lib/cockpit/ampel.ts`).
 */

import { coverageStatus, type CockpitStatus } from './ampel';
import type { CoverageTile } from '../heute/dashboard';

/**
 * Kurzlabel je Abdeckungs-Achse (Domänensprache, kein Feldname). Bewusst wortgleich zu
 * `KPI_LABEL` in `CockpitKpiBand` gehalten, damit Radar und Ring denselben Namen tragen – die
 * Achse „Vertrauensangabe" ist dieselbe Zahl wie der Ring „Beziehungen mit Vertrauensangabe".
 */
export const RADAR_LABEL: Readonly<Record<CoverageTile['id'], string>> = {
  controls_nachweis: 'Controls mit Nachweis',
  risiken_minderung: 'Risiken mit Minderung',
  objekte_owner: 'Objekte mit Owner',
  kanten_vertrauensgrad: 'Beziehungen mit Vertrauensangabe',
};

/** Kurzlabel für die enge Radar-Werteliste (verhindert den Umbruch in der schmalen Kachel). */
export const RADAR_KURZ: Readonly<Record<CoverageTile['id'], string>> = {
  controls_nachweis: 'Controls',
  risiken_minderung: 'Risiken',
  objekte_owner: 'Objekte m. Owner',
  kanten_vertrauensgrad: 'Vertrauensangabe',
};

/** Eine Radar-Achse = eine erfasste Abdeckung, mit ehrlichem Anteil und Ampel-Status. */
export interface CockpitRadarAxis {
  readonly id: CoverageTile['id'];
  readonly label: string;
  /** Kurzlabel für die enge Radar-Werteliste. */
  readonly kurz: string;
  readonly covered: number;
  readonly total: number;
  /** Anteil 0…1 (Geometrie der Achse); 0 bei fehlender Grundgesamtheit – nie ein Score im Text. */
  readonly anteil: number;
  /** Ampel-Status nach der EINEN offengelegten Regel (`coverageStatus`) – Farbe des Punktes. */
  readonly status: CockpitStatus;
  /** `true`, wenn keine Grundgesamtheit besteht (total = 0) – Punkt im Zentrum, benannte Lücke. */
  readonly isEmpty: boolean;
  /** `true` bei n≤2: Punkt neutral geführt (kein Erfolgs-Grün über zu wenige Fälle). */
  readonly kleineGrundgesamtheit: boolean;
}

/** Radar-Modell des Cockpits – Achsen in Dashboard-Reihenfolge plus die offengelegte Regel. */
export interface CockpitRadarModel {
  readonly axes: readonly CockpitRadarAxis[];
  /** Benannte Frage, die der Radar beantwortet (Dok. 06 „jedes Diagramm beantwortet eine Frage"). */
  readonly frage: string;
  /** Die offengelegte Ableitungsregel im Klartext (DR-0008: keine Grafik ohne erklärte Herkunft). */
  readonly regel: string;
}

/**
 * Baut das Radar-Modell aus den Abdeckungskacheln des Dashboards. `undefined`, wenn keine
 * Abdeckung existiert (leerer Mandant → das Cockpit zeigt dort seine ehrliche Datenlücke, keinen
 * Radar). Es wird NICHTS gerechnet, das nicht schon in `coverage` steht.
 */
export function buildCockpitRadar(
  coverage: readonly CoverageTile[],
): CockpitRadarModel | undefined {
  if (coverage.length === 0) return undefined;

  const axes: CockpitRadarAxis[] = coverage.map((tile) => {
    const anteil = tile.total > 0 ? Math.max(0, Math.min(1, tile.covered / tile.total)) : 0;
    return {
      id: tile.id,
      label: RADAR_LABEL[tile.id],
      kurz: RADAR_KURZ[tile.id],
      covered: tile.covered,
      total: tile.total,
      anteil,
      status: coverageStatus(tile.covered, tile.total, tile.kleineGrundgesamtheit),
      isEmpty: tile.isEmpty,
      kleineGrundgesamtheit: tile.kleineGrundgesamtheit,
    };
  });

  return {
    axes,
    frage: 'Wie verteilt sich die erfasste Abdeckung über die vier Dimensionen?',
    regel:
      'Die vier Achsen sind die vier erfassten Abdeckungen dieses Mandanten; jeder Wert ist der ' +
      'Anteil „x von y" der jeweiligen Grundgesamtheit – dieselben Zahlen wie die Deckungsringe, ' +
      'nur verdichtet dargestellt. Kein Score und keine Bewertung: eine Achse ohne Grundgesamtheit ' +
      'sitzt im Zentrum und wird als fehlende Zählbasis benannt, bei zu wenigen Fällen (höchstens ' +
      'zwei) bleibt der Punkt neutral.',
  };
}
