/**
 * Geteilte Cockpit-Themenwahl (Hell/Dunkel).
 *
 * Warum geteilt (DR-0017, „durchgehende Sprache über das ganze Produkt"): Seit Stage 3 tragen
 * nicht nur das Cockpit, sondern auch die Bereichsflächen (`BereichRahmen`) dieselbe Farbwelt.
 * Damit ein im Cockpit gewähltes Dunkel beim Eintauchen in einen Bereich erhalten bleibt, lesen
 * beide denselben VERSIONIERTEN localStorage-Schlüssel. Nur das Cockpit trägt den Umschalter;
 * die Bereiche folgen der dort getroffenen Wahl (sie LESEN den Schlüssel, sie schreiben ihn nie).
 *
 * Der Schlüssel ist mandanten- und rollenfrei (reine Anzeigepräferenz je Gerät), Muster wie
 * `DETAILTIEFE_STORAGE_KEY` – so lebt beim Mandantenwechsel kein Zustand des alten Mandanten weiter.
 */
export type CockpitTheme = 'hell' | 'dunkel';

export const COCKPIT_THEME_KEY = 'isms-cockpit-theme-v1';

/**
 * Defensiv: nur der eine abweichende Wert „dunkel" wird übernommen, jeder andere (inkl. `null`,
 * veralteter oder beschädigter Wert) fällt auf „hell" – der ruhige Standard (Muster `parseSession`).
 */
export function parseCockpitTheme(raw: string | null): CockpitTheme {
  return raw === 'dunkel' ? 'dunkel' : 'hell';
}
