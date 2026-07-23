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
   * `true`, wenn dieser Ort echten, aus dem Bestand abgeleiteten Inhalt zeigt.
   *
   * Seit WP-032 trifft das auf ALLE acht Orte zu. Das Feld bleibt bestehen, weil die
   * Navigation daraus weiterhin ihre Regel ableitet (ein Ort ohne echten Inhalt wird nie
   * still als fertig dargestellt) und weil alle vier Wächter ihre Register gegen die
   * `live: true`-Orte abgleichen.
   *
   * ENTFALLEN mit WP-032 Slice 3: das frühere Feld `plannedScreen`. Es war ausschließlich
   * Eingabe der Platzhalterseite; nachdem alle acht Orte echten Inhalt zeigen, hatte es weder
   * Träger noch Leser (siehe gelöschte `components/shell/PlaceholderPage.tsx`).
   */
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
    // WP-016 Slice 2: der Ort zeigt echten, aus dem Demo-Seed abgeleiteten Inhalt
    // (Mission Control read-only, ohne Morning Mission – die Lücke wird auf der Seite benannt).
    live: true,
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
    // WP-013 Slice 1: der Ort zeigt echten, aus dem Demo-Seed abgeleiteten Inhalt.
    live: true,
  },
  {
    id: 'entscheidungen',
    label: 'Entscheidungen',
    href: '/entscheidungen',
    hint: 'Decision Records, Freigaben, Risikoakzeptanz, Investitionsoptionen',
    // KONZEPTANKER (bewusst unverändert): die Leitfrage des Screenkatalogs. „jetzt erforderlich"
    // ist eine DRINGLICHKEITS-Aussage und setzt Frist, Aufwand, Kapazität und Priorität voraus –
    // vier Angaben, die das Datenmodell nicht kennt (O-WP017-06). Bis WP-028 stand die Frage als
    // sichtbare Überschrift auf der Seite und wurde im nächsten Satz zurückgenommen; das machte
    // die Seite zum schlimmsten Fall des Rechtfertigungs-Modus (rund 250 Wörter Meta-Text vor
    // der ersten Entscheidung). Seit WP-028 Slice 3 rendert die Seite sie NICHT mehr (DR-0013
    // Nr. 1, Muster der WP-032-Orte) und führt mit der Frage, die sie beantwortet; die fehlende
    // Dringlichkeits-Grundlage wird ruhig am Seitenende benannt. Ob der `question`-Wortlaut
    // selbst überarbeitet wird, ist eine Produkt-/Owner-Entscheidung (O-WP032-02).
    question: 'Welche Geschäftsentscheidung ist jetzt erforderlich?',
    match: ['/entscheidungen'],
    // WP-017 Slice 2: der Ort zeigt echten, aus dem Demo-Seed abgeleiteten Inhalt (read-only
    // Entscheidungsregister).
    live: true,
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
    // KONZEPTANKER (bewusst unverändert): die Leitfrage des Screenkatalogs. Sie setzt einen
    // Generator voraus, den es nicht gibt („aus demselben Datenstand entstehen"). Die Seite
    // rendert sie deshalb NICHT als sichtbare Überschrift, die sie im nächsten Satz zurücknehmen
    // müsste (DR-0013 Nr. 1), sondern führt mit der Frage, die sie heute beantwortet: welche
    // Berichte das Produkt vorsieht und welches Material des aktiven Mandanten dafür erfasst
    // ist. Ob der `question`-Wortlaut selbst überarbeitet wird, ist eine Produkt-/
    // Owner-Entscheidung (O-WP032-02) und wird hier nicht vorweggenommen.
    question: 'Welche Geschichte soll aus demselben Datenstand entstehen?',
    match: ['/reports'],
    // WP-032 Slice 2: der Ort zeigt echten Inhalt (gezählte Datengrundlage des aktiven
    // Mandanten + Berichts-/Präsentationsstruktur). Damit entfällt die Platzhalter-Ankündigung.
    live: true,
  },
  {
    id: 'wissen',
    label: 'Wissen',
    href: '/wissen',
    hint: 'Suche, Glossar, Vorlagen, Best Practices, Lernhinweise',
    // KONZEPTANKER (bewusst unverändert): die Leitfrage des Screenkatalogs. Von ihren drei
    // Teilen kann die Seite heute nur „Erklärung" beantworten – Vorlagen und bewährte Vorgehen
    // haben keinen Träger, und kontextsensitiv ist die Seite gar nicht. Sie rendert die Frage
    // deshalb NICHT als sichtbare Überschrift, die sie im nächsten Satz zurücknehmen müsste
    // (DR-0013 Nr. 1), sondern führt mit der Begriffsfrage und benennt die drei Lücken am
    // Seitenende. `question`-Wortlaut = Produkt-/Owner-Entscheidung (O-WP032-02).
    question: 'Wo finde ich Erklärung, Vorlage und bewährtes Vorgehen zum aktuellen Kontext?',
    match: ['/wissen'],
    // WP-032 Slice 3: der Ort zeigt echten Inhalt (Glossar des kanonischen Vokabulars).
    live: true,
  },
  {
    id: 'administration',
    label: 'Administration',
    href: '/administration',
    hint: 'Nutzer, Rechte, Integrationen, Konfiguration, Audit Logs, Betrieb',
    // KONZEPTANKER (bewusst unverändert): die Leitfrage des Screenkatalogs. Sie verlangt ein
    // Sicherheits-URTEIL, das der heutige Bau nicht bejahen kann (keine Konten, keine geprüften
    // Rechte, keine angebundenen Systeme). Die Seite rendert sie deshalb NICHT als sichtbare
    // Überschrift, die sie im nächsten Satz zurücknehmen müsste (DR-0013 Nr. 1), sondern führt
    // mit der Frage, die sie heute beantwortet, und beantwortet die drei Teilfragen
    // (konfiguriert / verbunden / sicher) am Seitenende einzeln und ehrlich – ohne Zusage und
    // ohne Fehlalarm (offene Frage O-WP032-03). Ob der `question`-Wortlaut selbst überarbeitet
    // wird, ist eine Produkt-/Owner-Entscheidung (O-WP032-02) und wird hier nicht vorweggenommen.
    question: 'Ist der Tenant sicher, korrekt konfiguriert und verbunden?',
    match: ['/administration'],
    // WP-032 Slice 1: der Ort zeigt echten, aus dem Bestand abgeleiteten Inhalt (read-only
    // Konfigurationsstand des aktiven Mandanten + Rollen-/Rechte-/Integrations-/Betriebsmodell
    // als Struktur). Damit entfällt die Platzhalter-Ankündigung eines geplanten Screens.
    live: true,
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
