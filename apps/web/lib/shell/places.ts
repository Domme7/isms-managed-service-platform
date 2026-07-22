/**
 * Die acht stabilen Orte der globalen Shell (WP-011).
 *
 * QUELLE (verbindlich): Dok. 06 v1.0 §4 + Entscheidung 06-D01:
 *   "Die Hauptnavigation besteht aus acht stabilen Orten: Heute, Kunden, ISMS,
 *    Entscheidungen, Services, Reports, Wissen und Administration."
 * Kurzbeschreibungen (`hint`) sinngemäß aus Dok. 06 §4; Leitfragen (`question`) aus dem
 * Screenkatalog Dok. 06 §7. Es wird kein Ort erfunden und keiner weggelassen.
 *
 * Reine Navigations-/Präsentationsdaten – KEINE Autorisierung. Sichtbarkeit je Rolle wird
 * bewusst nicht hart erzwungen (Simulation, Dok. 19 folgt später).
 */

export type PlaceId =
  | 'heute'
  | 'kunden'
  | 'isms'
  | 'entscheidungen'
  | 'services'
  | 'reports'
  | 'wissen'
  | 'administration';

export interface NavPlace {
  readonly id: PlaceId;
  /** Sichtbares Navigationslabel (Dok. 06 §4). */
  readonly label: string;
  /** Zielroute. */
  readonly href: string;
  /** Kurzbeschreibung des Ortes (Dok. 06 §4). */
  readonly hint: string;
  /** Leitfrage der Seite (Dok. 06 §7 / Seitenanatomie). */
  readonly question: string;
  /** Pfad-Präfixe, die diesen Ort als "aktiv" markieren. */
  readonly match: readonly string[];
  /**
   * Geplanter Screen aus Dok. 06 §7 (nur für Platzhalter, ehrliche Empty-Message).
   * Bei `live: true` entfällt dies, weil bereits echter Inhalt vorhanden ist.
   */
  readonly plannedScreen?: string;
  /** `true`, wenn dieser Ort bereits echten (nicht simulierten) Inhalt zeigt. */
  readonly live?: boolean;
}

export const NAV_PLACES: readonly NavPlace[] = [
  {
    id: 'heute',
    label: 'Heute',
    href: '/heute',
    hint: 'Mission Control, Wiederaufnahme, persönliche Entscheidungen und Aufgaben',
    question: 'Was hat sich seit meinem letzten Besuch verändert und was verdient Aufmerksamkeit?',
    match: ['/heute'],
    plannedScreen: 'S01 – Mission Control',
  },
  {
    id: 'kunden',
    label: 'Kunden',
    href: '/twin',
    hint: 'Portfolio und Customer Workspaces',
    question: 'Wessen digitalen Zwilling und Portfolio sehe ich – und wie hängt es zusammen?',
    // Der Digital Twin Explorer (WP-004) lebt unter /twin und ist hier eingehängt.
    match: ['/twin', '/kunden'],
    live: true,
  },
  {
    id: 'isms',
    label: 'ISMS',
    href: '/isms',
    hint: 'Digital Twin, Scope, Risiken, Controls, Maßnahmen, Policies, Evidence, Audits',
    question: 'Warum ist ein Risiko hoch, welche Controls wirken und wie ist es belegt?',
    match: ['/isms'],
    plannedScreen: 'S06 – Risk & Control Workspace',
  },
  {
    id: 'entscheidungen',
    label: 'Entscheidungen',
    href: '/entscheidungen',
    hint: 'Decision Records, Freigaben, Risikoakzeptanz, Investitionsoptionen',
    question: 'Welche Geschäftsentscheidung ist jetzt erforderlich?',
    match: ['/entscheidungen'],
    plannedScreen: 'S03 – Executive Experience / Decision Center',
  },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    hint: 'Katalog, aktive Services, Delivery, SLA, Wert und Reviews',
    question: 'Was wird geliefert, mit welcher Qualität und welchem Wert?',
    match: ['/services'],
    // WP-012 Slice 2: der Ort zeigt echten, aus dem Demo-Seed abgeleiteten Inhalt.
    live: true,
  },
  {
    id: 'reports',
    label: 'Reports',
    href: '/reports',
    hint: 'Briefings, PDF/PPTX, Management Review, Exporte',
    question: 'Welche Geschichte soll aus demselben Datenstand entstehen?',
    match: ['/reports'],
    plannedScreen: 'S10 – Reporting Studio',
  },
  {
    id: 'wissen',
    label: 'Wissen',
    href: '/wissen',
    hint: 'Suche, Glossar, Vorlagen, Best Practices, Lernhinweise',
    question: 'Wo finde ich Erklärung, Vorlage und bewährtes Vorgehen zum aktuellen Kontext?',
    match: ['/wissen'],
    plannedScreen: 'Wissen (Dok. 06 §4)',
  },
  {
    id: 'administration',
    label: 'Administration',
    href: '/administration',
    hint: 'Nutzer, Rechte, Integrationen, Konfiguration, Audit Logs, Betrieb',
    question: 'Ist der Tenant sicher, korrekt konfiguriert und verbunden?',
    match: ['/administration'],
    plannedScreen: 'S11 – Administration & Integration Health',
  },
] as const;

/** Ort nach ID. */
export function getPlace(id: PlaceId): NavPlace {
  const place = NAV_PLACES.find((p) => p.id === id);
  // NAV_PLACES ist vollständig und statisch – dieser Fall kann nicht eintreten.
  if (!place) throw new Error(`Unbekannter Ort: ${id}`);
  return place;
}

/**
 * Aktiver Ort für einen Pfad. Trifft bei exakter Übereinstimmung oder Präfix
 * (`/twin/nordwerk` -> "kunden"). `/` und Unbekanntes -> `undefined`.
 * Längster Treffer gewinnt, damit spezifischere Präfixe Vorrang haben.
 */
export function activePlaceId(pathname: string): PlaceId | undefined {
  let best: { id: PlaceId; length: number } | undefined;
  for (const place of NAV_PLACES) {
    for (const prefix of place.match) {
      const hit = pathname === prefix || pathname.startsWith(`${prefix}/`);
      if (hit && (!best || prefix.length > best.length)) {
        best = { id: place.id, length: prefix.length };
      }
    }
  }
  return best?.id;
}
