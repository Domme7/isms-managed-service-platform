/**
 * Kuratierte Cockpit-Personalisierung (WP-029, DR-0012 B(a)): der Nutzer kann Bereichs-Kacheln
 * ANHEFTEN, sodass sie im Cockpit zuerst erscheinen. Bewusst KEIN freier Layout-Builder
 * (06-O09 ist offen, WP-031 gated) und KEIN Ausblenden: alle acht Bereiche bleiben sichtbar –
 * die Personalisierung ordnet nur um. Damit gilt die Konzept-Invariante „sicherheitskritische
 * Signale bleiben immer sichtbar / sind nie wegkonfigurierbar" (Dok. 06 §6.2) trivialerweise.
 *
 * QUELLE (Regel Null): Dok. 06 §6.2 (bevorzugte Voreinstellung speichern; Warnungen immer
 * sichtbar) und die im WORK_QUEUE gebündelte WP-029-Aussage „Kacheln umsortieren/anheften".
 * Der NICHT autonom baubare Teil (Management-Modus „Wenn ich Geschäftsführer wäre", Dok. 10 §6.3)
 * braucht Decision-Center-Daten (Optionen/Wirkung/Nichtstun), die der Datenbestand nicht trägt –
 * er ist als Owner/Daten-Gate notiert, hier NICHT erfunden.
 *
 * Gerätelokal + VERSIONIERT (Muster `DETAILTIEFE_STORAGE_KEY`/`COCKPIT_THEME_KEY`), mandanten- und
 * rollenfrei – so lebt beim Mandantenwechsel kein Zustand des alten Mandanten weiter
 * (Cross-Tenant-Schutz). React-frei und deterministisch testbar.
 */
export const COCKPIT_PINS_KEY = 'isms-cockpit-bereich-pins-v1';

/**
 * Defensiv: akzeptiert ausschließlich ein JSON-Array von Zeichenketten (die Bereichs-IDs). Jeder
 * ungültige/beschädigte Wert fällt auf „keine Anheftung" – nie ein kaputter Zustand. Dubletten
 * werden entfernt; die Reihenfolge des gespeicherten Arrays ist ohne Bedeutung (die Anzeige
 * sortiert stabil nach der kanonischen Bereichsreihenfolge).
 */
export function parsePins(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const wert = JSON.parse(raw);
    if (!Array.isArray(wert)) return [];
    return [...new Set(wert.filter((x): x is string => typeof x === 'string'))];
  } catch {
    return [];
  }
}

export function serializePins(pins: readonly string[]): string {
  return JSON.stringify([...new Set(pins)]);
}

/** Heftet die ID an bzw. löst sie – ohne die übrigen Anheftungen zu berühren. */
export function togglePin(pins: readonly string[], id: string): string[] {
  return pins.includes(id) ? pins.filter((p) => p !== id) : [...pins, id];
}

/**
 * Sortiert die Orte STABIL: angeheftete zuerst, dann die übrigen – jeweils in der ursprünglichen
 * (kanonischen) Reihenfolge. Nichts wird entfernt, nur umgeordnet; unbekannte Pin-IDs sind inert.
 */
export function sortByPins<T extends { id: string }>(
  orte: readonly T[],
  pins: readonly string[],
): T[] {
  const gepinnt = new Set(pins);
  return [...orte.filter((o) => gepinnt.has(o.id)), ...orte.filter((o) => !gepinnt.has(o.id))];
}
