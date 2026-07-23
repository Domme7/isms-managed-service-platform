/**
 * Sphärengerechte Sicht des Ortes „Kunden" (WP-028 Slice 4, DR-0013 Nr. 11 / DR-0012).
 *
 * PROBLEM, das diese Datei löst: Bis hierher führte der Ort „Kunden" für JEDE Perspektive in
 * das Mandanten-Portfolio – auch für eine Kundenrolle. Eine Kundenrolle sah damit eine
 * mandantenübergreifende Liste, obwohl ihre Arbeitswelt ein einziges Unternehmen ist. Das war
 * kein Darstellungsdetail, sondern ein Sphären-Logikfehler.
 *
 * QUELLEN (Regel Null, am PDF gegengelesen – nichts erfunden):
 *  - Dok. 06, Abschnitt „Acht stabile Hauptorte", Zeile „Kunden": Inhalt „Portfolio und Customer
 *    Workspaces", Navigationsregel **„Für Kundenrollen ggf. direkt der eigene Workspace."**
 *    → Die Rollenabhängigkeit dieses Ortes steht wörtlich im Konzept.
 *  - Dok. 03, Abschnitt „Kanonisches Rollenmodell", Spalte „Sphäre": R01–R06 = Kunde,
 *    R07 = Unabhängig, R08–R11 = Betreiber, R12 = Beide.
 *  - Dok. 03, Abschnitt „Zielgruppen … fünf Rollenfamilien, ein gemeinsames Datenmodell":
 *    „Beim Betreiber koordinieren Serviceleitung, Engagement Management und Fachberater ein
 *    **Portfolio aus Mandanten**." → Das Portfolio ist die Betreiber-Arbeitswelt.
 *  - Dok. 03, Abschnitt „Rollenprinzipien": „**Externe Auditoren erhalten einen kontrollierten
 *    Prüfbereich statt pauschalem Vollzugriff.**" und „Serviceanbieter sehen nur Kunden und
 *    Daten, für die ein aktiver Auftrag und Scope besteht."
 *  - Dok. 03, Abschnitt „Assurance-, Administrations- und Supportrollen", Karte „Auditor /
 *    Assurance Reviewer": „Arbeitet in **zeitlich begrenzten Prüfphasen**"; „Read-only **Audit
 *    Workspace**".
 *
 * ENTSCHEIDUNG JE SPHÄRE (und ihre Begründung):
 *  - **Kunde (R01–R06) → Ein-Unternehmens-Sicht.** Wörtliche Navigationsregel aus Dok. 06.
 *  - **Betreiber (R08–R11) → Portfolio.** Das Portfolio ist laut Dok. 03 genau ihre Arbeitswelt.
 *  - **Beide (R12) → Portfolio.** Die Sphäre schließt die Betreiberseite ausdrücklich ein; die
 *    engere Sicht wäre ein Entzug ohne Beleg.
 *  - **Unabhängig (R07) → Ein-Unternehmens-Sicht.** BEGRÜNDETE ENTSCHEIDUNG (der Auftrag nennt
 *    sie ausdrücklich als offen): Der Auditor ist keine Betreiberrolle und koordiniert kein
 *    Portfolio; das Konzept gibt ihm einen „kontrollierten Prüfbereich statt pauschalem
 *    Vollzugriff" und einen „Audit Workspace" in „zeitlich begrenzten Prüfphasen". Eine
 *    mandantenübergreifende Liste wäre das Gegenteil davon. Gewählt wird deshalb die engere,
 *    belegbare Sicht – im Zweifel weniger Reichweite, nicht mehr.
 *  - **neutral (keine Rolle) → Portfolio.** Der neutrale Einstieg (DR-0009) nimmt keine Sphäre
 *    an; er zeigt den Ort in seiner Grundform und behauptet keine Zugehörigkeit.
 *
 * WAS DIESE DATEI AUSDRÜCKLICH **NICHT** IST: eine Zugriffsgrenze. Sie steuert Einstieg und
 * Darstellung, nicht Berechtigungen. Serverseitig durchgesetzte Zugriffsrechte entstehen erst
 * mit der Anmeldung nach Dok. 19 (`.claude/rules/security.md`). Genau deshalb macht diese Datei
 * auch KEINE Aussage über die Existenz oder Anzahl fremder Mandanten – die Ein-Unternehmens-
 * Sicht sagt ausschließlich etwas über den aktiven Mandanten (Mandantengrenze, Dok. 06,
 * Abschnitt „Sichtbarer Kontext", Kasten CROSS-TENANT-SCHUTZ).
 *
 * React-frei und deterministisch testbar.
 */
import type { NavPlace } from './places';
import type { DemoRole } from './roles';

/** Wie der Ort „Kunden" für die aktive Perspektive eröffnet wird. */
export type KundenSicht =
  /** Mandanten-Portfolio (Betreiber-/Beraterarbeitswelt, Dok. 06 S04). */
  | 'portfolio'
  /** Der eigene Mandant (Customer Workspace, Dok. 06 S02 / Navigationsregel „Kunden"). */
  | 'ein_unternehmen';

/** Route des eigenen Kundenbereichs (Ein-Unternehmens-Cockpit, Dok. 06 S02). */
export const KUNDENBEREICH_HREF = '/kunden';

/** Route des Mandanten-Portfolios (Übersicht, Dok. 06 „Portfolio und Customer Workspaces"). */
export const PORTFOLIO_HREF = '/twin';

/**
 * Sicht des Ortes „Kunden" für eine Perspektive. `null` = neutraler Einstieg (DR-0009).
 *
 * Bewusst über die Sphäre statt über eine Rollen-ID-Liste: die Sphäre ist die kanonische
 * Spalte aus Dok. 03; eine handgepflegte ID-Liste würde bei einer künftigen Rolle still
 * veralten. Der `switch` ist erschöpfend – eine neue Sphäre wäre ein Compilefehler.
 */
export function kundenSicht(role: DemoRole | null): KundenSicht {
  if (role === null) return 'portfolio';
  switch (role.sphere) {
    case 'Kunde':
      return 'ein_unternehmen';
    case 'Unabhängig':
      return 'ein_unternehmen';
    case 'Betreiber':
      return 'portfolio';
    case 'Beide':
      return 'portfolio';
  }
}

/**
 * Steht der Mandantenwechsler in dieser Perspektive zur Verfügung?
 *
 * Dieselbe Regel wie die Sicht des Ortes „Kunden" – und aus demselben Grund: Wer in einem
 * einzigen Unternehmen arbeitet (Kundenrollen) oder in einem kontrollierten Prüfbereich
 * (Auditor), hat keinen Mandantenwechsel als Arbeitsschritt. Der aktive Mandant bleibt in der
 * Kopfleiste trotzdem SICHTBAR (Dok. 06, Abschnitt „Sichtbarer Kontext": der aktive Mandant
 * ist Pflichtangabe) – er wird nur nicht mehr als Auswahl angeboten.
 *
 * Nicht ausweglos: Die Perspektive selbst bleibt jederzeit wechselbar (Rollenauswahl,
 * „Ansicht zurücksetzen"), weil sie eine Ansicht ist und keine Berechtigung.
 */
export function mandantenwechselSichtbar(role: DemoRole | null): boolean {
  return kundenSicht(role) === 'portfolio';
}

/**
 * Zielroute des Navigationsortes „Kunden" für die aktive Perspektive.
 * Ein-Unternehmens-Sicht → eigener Kundenbereich; sonst → Portfolio.
 */
export function kundenOrtHref(role: DemoRole | null): string {
  return kundenSicht(role) === 'ein_unternehmen' ? KUNDENBEREICH_HREF : PORTFOLIO_HREF;
}

/**
 * Die acht Orte mit sphärengerechtem Ziel des Ortes „Kunden".
 *
 * Die NAVIGATIONSSTRUKTUR bleibt unangetastet (06-D01: acht stabile Orte, gleiche Reihenfolge,
 * gleiche Labels) – es ändert sich ausschließlich das Ziel EINES Ortes, und zwar genau so, wie
 * Dok. 06 es für ihn vorsieht („Für Kundenrollen ggf. direkt der eigene Workspace"). Die
 * `match`-Präfixe bleiben ebenfalls unverändert: `/twin` UND `/kunden` gehören beide zum Ort.
 */
export function orteFuerRolle(
  places: readonly NavPlace[],
  role: DemoRole | null,
): readonly NavPlace[] {
  const href = kundenOrtHref(role);
  return places.map((place) =>
    place.id === 'kunden' && place.href !== href ? { ...place, href } : place,
  );
}
