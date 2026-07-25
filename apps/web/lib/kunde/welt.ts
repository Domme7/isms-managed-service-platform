/**
 * Kunde-Welt (DR-0018 Stufe 3): die Selbstbedienungs-Welt eines einzelnen Kunden.
 *
 * WARUM EIGENE WELT: Ein Kunde arbeitet in genau EINEM Unternehmen (Sphäre „Kunde", Dok. 03;
 * Navigationsregel „Für Kundenrollen ggf. direkt der eigene Workspace", Dok. 06). Statt der
 * mandantenübergreifenden Berater-Shell bekommt er drei fokussierte Orte auf SEINEN echten Daten:
 *   - Mein Dashboard — sein ISMS auf einen Blick (das Mandanten-Cockpit, eingebettet).
 *   - Meine Ablage — Verwaltungsordner über seine echten Objekte (ablegen & kategorisieren).
 *   - Services buchen — der Servicekatalog im Kundenrahmen.
 *
 * SPHÄRENGRENZE (DR-0012): Die Welt liest ausschließlich den aktiven Mandanten (`tenant_id`), kein
 * mandantenübergreifender Blick, kein Mandantenwechsler. Das ist Darstellung/Einstieg, KEINE
 * serverseitige Zugriffsgrenze (die entsteht mit Dok. 19 / FINDING-0004).
 *
 * QUELLEN (Regel Null): Die Ablage-Ordner sind die kanonischen Objektfamilien F01..F09 aus
 * `lib/twin/data.ts` (`groupObjectsByFamily`, abgeleitet aus Dok. 04/18) — hier wird keine neue
 * Taxonomie erfunden. React-frei, deterministisch testbar.
 */
import { type FamilyGroup, getObjectsForTenant, groupObjectsByFamily } from '../twin/data';

/** Die drei Orte der Kunde-Welt (stabile Reihenfolge, feste Routen). */
export type KundeWeltOrtId = 'mein-dashboard' | 'meine-ablage' | 'services-buchen';

export interface KundeWeltOrt {
  readonly id: KundeWeltOrtId;
  readonly label: string;
  readonly href: string;
  /** Leitfrage des Ortes – was der Kunde hier beantwortet bekommt. */
  readonly frage: string;
  /** Pfad-Präfixe, die diesen Ort aktiv markieren. */
  readonly match: readonly string[];
}

export const KUNDE_WELT_ORTE: readonly KundeWeltOrt[] = [
  {
    id: 'mein-dashboard',
    label: 'Mein Dashboard',
    href: '/mein-dashboard',
    frage: 'Wie steht es um mein Informationssicherheits-Management?',
    match: ['/mein-dashboard'],
  },
  {
    id: 'meine-ablage',
    label: 'Meine Ablage',
    href: '/meine-ablage',
    frage: 'Wo liegen meine Objekte, geordnet und wiederauffindbar?',
    match: ['/meine-ablage'],
  },
  {
    id: 'services-buchen',
    label: 'Services buchen',
    href: '/services-buchen',
    frage: 'Welche Leistungen kann ich hinzubuchen?',
    match: ['/services-buchen'],
  },
];

/** Aktiver Ort der Kunde-Welt für einen Pfad (oder `null` außerhalb der Welt). */
export function aktiverKundeWeltOrt(pathname: string): KundeWeltOrtId | null {
  const treffer = KUNDE_WELT_ORTE.find((o) => o.match.some((m) => pathname.startsWith(m)));
  return treffer?.id ?? null;
}

/**
 * Ein Verwaltungsordner der Ablage: eine Objektfamilie mit ihren Objekten des aktiven Mandanten.
 * Kanonische F01..F09-Reihenfolge, leere Familien werden nicht gezeigt (nur belegte Ordner).
 */
export type AblageOrdner = FamilyGroup;

export interface AblageModell {
  readonly ordner: readonly AblageOrdner[];
  /** Gesamtzahl abgelegter Objekte über alle Ordner (ehrlicher Nenner, kein erfundener Wert). */
  readonly objekteGesamt: number;
}

/**
 * Baut die Ablage eines Mandanten aus seinen ECHTEN Objekten (harte Mandantengrenze über
 * `tenant_id` in `getObjectsForTenant`). Reine Ableitung — kein gespeicherter Tag, kein neues Feld.
 */
export function buildAblage(tenantId: string): AblageModell {
  const objekte = getObjectsForTenant(tenantId);
  const ordner = groupObjectsByFamily(objekte);
  return { ordner, objekteGesamt: objekte.length };
}
