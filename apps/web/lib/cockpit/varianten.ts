/**
 * Cockpit-Start-Varianten (WP-025, DR-0010 Nr. 3 / DR-0012 Stufe A).
 *
 * DREI erlebbar unterschiedliche Startseiten-Entwürfe auf DEMSELBEN belegten Datenmodell
 * (`buildHeuteDashboard` / `buildMissionControl`) – zum visuellen Owner-Vergleich, nach dem der
 * Sprint anhält (Owner wählt Stil/Hybrid, O-WP025-05). Sie unterscheiden sich in
 * Informationsarchitektur und Erstkontakt, NICHT in der Datenmenge (P02 „eine Wahrheit, mehrere
 * Perspektiven"; Dok. 06 06-D05).
 *
 * QUELLEN (Regel Null, am PDF gegengelesen):
 *  - Dok. 06, Abschnitt „Mission Control & Morning Mission": „Es ist kein aggregiertes
 *    Reporting-Dashboard, sondern ein rollenspezifischer Arbeitsplatz." + WOW-Moment „innerhalb
 *    von 30 Sekunden". Die vier PDF-Fragen der Mission Control („Was hat sich verändert? Was
 *    braucht Aufmerksamkeit? Welche Entscheidung wartet? Wo kann ich heute die größte Wirkung
 *    erzielen?") haben HEUTE KEINEN Datenträger (Veränderung, Priorisierung, wartende
 *    Entscheidung, Wirkungsreihung) – keine Variante zeigt sie als eingelöstes Versprechen
 *    (DR-0013 Nr. 1). Variante B führt stattdessen mit den vier BELEGTEN Framing-Fragen.
 *  - Dok. 06, Abschnitt „Rollenbezogene Erlebniswelten" (§5): Weltname + Weltleitfrage je Welt
 *    (Variante C) – gelesen aus `lib/shell/roles.ts`, nichts erfunden.
 *  - Dok. 06, Abschnitt „Detailtiefe": „Nutzer können eine bevorzugte Tiefe speichern"
 *    (Variante B, Staffelung) und die Personalisierungs-Leitplanke.
 *  - Dok. 10, Abschnitt „Management-Modus": Umschalter „Wenn ich Geschäftsführer wäre" (Variante
 *    C, reduzierende Vorschau – siehe `CockpitVariantenContent`).
 *
 * KEIN NEUER HAUPTNAV-ORT (06-D01, acht Orte fix): Die Vergleichsseite lebt unter „Heute"
 * (Route `/cockpit`, im Navigations-Match dem Ort „Heute" zugeordnet – `lib/shell/places.ts`).
 *
 * React-frei und deterministisch testbar (Muster `lib/heute/detailtiefe.ts`).
 */

/** Kennung einer Cockpit-Variante. */
export type CockpitVarianteId = 'a' | 'b' | 'c';

/**
 * Versionierter, MANDANTENFREIER Speicherschlüssel der gewählten Variante (DR-0012 Stufe A,
 * Muster `DETAILTIEFE_STORAGE_KEY`). Gespeichert wird AUSSCHLIESSLICH die Kennung („a"|„b"|„c") –
 * kein Mandanten-, Rollen- oder Objektbezug, damit die Wahl beim Mandantenwechsel gefahrlos
 * weiterlebt (Cross-Tenant-Schutz) und reversibel/ohne Datenwirkung bleibt.
 *
 * WP-025 baut nur diesen EINEN Andockpunkt der kuratierten Personalisierung (Varianten-Wahl);
 * der volle Personalisierungs-Baukasten ist WP-029 (offen als O-WP025-01), kein Freiform-Layout.
 */
export const COCKPIT_STORAGE_KEY = 'isms-demo-cockpit-v1';

/** Standard-Variante beim Erstkontakt: A (nächster Nachbar des heutigen `/heute`, geringstes Risiko). */
export const COCKPIT_STANDARD: CockpitVarianteId = 'a';

export interface CockpitVarianteMeta {
  readonly id: CockpitVarianteId;
  /** Sichtbares Kurzzeichen des Umschalters (A/B/C). */
  readonly kennung: string;
  /** Sichtbarer Kurzname der Variante (Produktsprache, kein Design-Jargon). */
  readonly name: string;
  /** Ein Satz Leitidee (was der Erstkontakt zeigt) – sichtbar am Umschalter. */
  readonly leitidee: string;
  /** Für wen die Variante gedacht ist – kurze Wendung, sichtbar am Umschalter. */
  readonly zielnutzer: string;
}

/**
 * Die drei Varianten. Reihenfolge = Vergleichsreihenfolge (A → B → C, von „nah am heutigen
 * Stand" zu „höchster konzeptioneller Anspruch"). Sichtbarer Text bewusst OHNE Bewertungs- oder
 * Design-Vokabular („Ampel", „Trend", „Score" …): Die Varianten unterscheiden sich in der
 * Informationsarchitektur, nicht in einer erfundenen Bewertung (DR-0008).
 */
export const COCKPIT_VARIANTEN: readonly CockpitVarianteMeta[] = [
  {
    id: 'a',
    kennung: 'A',
    name: 'Verdichtung',
    leitidee:
      'Der Zustand des aktiven Mandanten als dichtes Kachelraster mit Status-Kennzeichen – ' +
      'Zahl groß, Kennzeichen und Weg in die Begründung an jeder Kachel.',
    zielnutzer: 'für den geübten Blick',
  },
  {
    id: 'b',
    kennung: 'B',
    name: 'Fragen & Antworten',
    leitidee:
      'Eine kurze Kette beantworteter Fragen – textgeführt und über die Detailtiefe gestaffelt, ' +
      'Kennzeichen sparsam.',
    zielnutzer: 'für den Einstieg',
  },
  {
    id: 'c',
    kennung: 'C',
    name: 'Erlebniswelt',
    leitidee:
      'Das Cockpit als Erlebniswelt der aktiven Rolle – Weltband mit Leitfrage, rollengewichtete ' +
      'Kacheln, Trennung von Kunden- und Betreibersicht am stärksten sichtbar.',
    zielnutzer: 'rollen- und sphärengebunden',
  },
] as const;

/** Variante nach Kennung; wirft bei unbekannter Kennung (statisch vollständig, Muster `getPlace`). */
export function getCockpitVariante(id: CockpitVarianteId): CockpitVarianteMeta {
  const meta = COCKPIT_VARIANTEN.find((v) => v.id === id);
  if (!meta) throw new Error(`Unbekannte Cockpit-Variante: ${id}`);
  return meta;
}

/**
 * Parst einen gespeicherten Wert defensiv: nur „a", „b", „c" sind gültig, alles andere
 * (fehlend, veraltet, manipuliert) fällt auf `null` – die Seite nutzt dann die Standard-Variante
 * (Muster `parseDetailtiefe`).
 */
export function parseCockpitVariante(raw: string | null): CockpitVarianteId | null {
  if (raw === 'a' || raw === 'b' || raw === 'c') return raw;
  return null;
}

/** Serialisiert die Variante für den Speicher – bewusst NUR die Kennung (mandantenfrei, s. o.). */
export function serializeCockpitVariante(id: CockpitVarianteId): string {
  return id;
}
