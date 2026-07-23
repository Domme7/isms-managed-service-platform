/**
 * Querschnittliche Kontextleiste der Live-Hauptseiten (WP-020 Slice 1).
 *
 * QUELLE (Regel Null, am PDF gegengelesen): Dok. 06, Abschnitt „Sichtbarer Kontext" nennt sechs
 * Kontextelemente:
 *   1. Aktiver Mandant und ggf. Organisationseinheit
 *   2. Aktive Produktrolle und zeitlich begrenzte Vertretung
 *   3. Scope oder Objektkontext
 *   4. Datenstand / letzter Synchronisationszeitpunkt
 *   5. Vertraulichkeitsstufe und Exportrestriktion
 *   6. Vertrauensgrad bei abgeleiteten Aussagen
 *
 * Diese Komponente rendert alle sechs in genau dieser Reihenfolge – SO WEIT BELEGT:
 *  - Mandant und Produktrolle kommen aus der aktiven Auswahl (Session-Simulation, WP-011).
 *    Eine Organisationseinheit unterhalb des Mandanten kennt der Datenbestand nicht; das
 *    PDF sagt „ggf." – sie wird deshalb weggelassen, nicht als Lücke behauptet.
 *  - Scope/Objektkontext und Datenstand liefert jede Seite aus ihrer eigenen, react-freien
 *    Ableitung (`lib/shell/page-context.ts` bzw. bestehende Seitenmodelle) – Label und
 *    Leerwert-Text sind seitenspezifisch, damit die Leiste dem Seiteninhalt nie widerspricht
 *    (Review-Lektion aus `/entscheidungen`: „Datenstand der Entscheidungen").
 *  - Vertretung, Vertraulichkeitsstufe/Exportrestriktion und Vertrauensgrad haben im heutigen
 *    Datenbestand KEINEN Träger und erscheinen als BENANNTE DATENLÜCKE (Texte unten in
 *    `CONTEXT_GAPS`) statt als erfundener Wert.
 *
 * // OFFENE FRAGE O-WP016-08 (bestehend, hier referenziert statt dupliziert): „Vertrauensgrad"
 * // und „Version" sind im Objektvertrag Felder EINES Objekts bzw. EINER Kante; ein
 * // seitenweiter/mandantenweiter Wert existiert nicht, und eine Verdichtung wäre eine
 * // Bewertung (Dok. 07 D10, O-WP014-02). Vertretung und Vertraulichkeit/Exportrestriktion
 * // auf Mandantenebene haben ebenfalls keinen Träger. Die Lücken stehen deshalb als Klartext
 * // in der Leiste; die belegten Einzelwerte bleiben an Objekt-360 (Klassifikation,
 * // Bestätigung) und an den Kanten (Vertrauensgrad) sichtbar.
 *
 * Präsentational und ohne eigene Datenzugriffe – jede Seite reicht ausschließlich belegte
 * Werte herein. `role="group"` auf `dl` wie in `ObjectDetailView` (dokumentiertes Muster:
 * `dl` hat keine verlässliche implizite Rolle).
 */
import type { ReactNode } from 'react';
import type { DemoTenant } from '@isms/demo-seed';
import type { DemoRole } from '../../lib/shell/roles';

/**
 * Die drei benannten Datenlücken der Kontextleiste – EINE Quelle für alle Live-Hauptseiten,
 * damit die Formulierung nirgends still auseinanderläuft; per Wächtertest je Ort belegt.
 * Jeder Text benennt die Lücke UND ihre Ursache – es wird kein Wert erfunden (DR-0005).
 */
export const CONTEXT_GAPS = {
  vertretung:
    'nicht erfasst – die Anmelde-Simulation speichert nur Rolle und Mandant; eine zeitlich ' +
    'begrenzte Vertretung kennt der Datenbestand nicht.',
  vertraulichkeit:
    'nicht erfasst – im Datenbestand tragen nur einzelne Objekte eine Vertraulichkeitsstufe ' +
    '(sichtbar auf der jeweiligen Objektseite); für Mandant oder Seite ist keine Stufe und ' +
    'keine Exportrestriktion erfasst.',
  vertrauensgrad:
    'kein seitenweiter Wert erfasst – belegte Vertrauensangaben stehen an einzelnen ' +
    'Beziehungen und Objekten; ein zusammengefasster Wert würde hier eine Aussage behaupten, ' +
    'die der Datenbestand nicht trägt.',
} as const;

export function PageContextBar({
  role,
  tenant,
  scopeLabel,
  scopeValue,
  datenstandLabel,
  datenstandValue,
  children,
}: {
  /** Aktive Produktrolle der Session-Simulation (heute immer gesetzt, WP-011). */
  role: DemoRole;
  /** Aktiver Mandant der Session-Simulation. */
  tenant: DemoTenant;
  /** Seitenspezifisches Label des Scope-/Objektkontexts (Element 3), z. B. „Scope-Kennungen". */
  scopeLabel: string;
  /** Belegter Scope-/Objektkontext oder ehrlicher Leerwert-Text der Seite. */
  scopeValue: ReactNode;
  /** Seitenspezifisches Datenstand-Label (Element 4), immer mit Achsen-Zusatz der Seite. */
  datenstandLabel: string;
  /** Belegter Datenstand (`<time>`) oder ehrlicher Leerwert-Text der Seite. */
  datenstandValue: ReactNode;
  /** Optionale seitenspezifische Zusatzeinträge (z. B. Erlebniswelt auf „Heute"). */
  children?: ReactNode;
}) {
  return (
    /* `role="group"` wie in `ObjectDetailView`: `dl` hat keine verlässliche implizite Rolle. */
    // biome-ignore lint/a11y/noInteractiveElementToNoninteractiveRole: bewusstes, dokumentiertes Muster – `dl` hat keine verlässliche implizite Rolle; die ARIA-Semantik zu ändern wäre eine Produktänderung.
    // biome-ignore lint/a11y/useSemanticElements: `role="group"` + `aria-label` auf `dl` ist gültiges ARIA; ein Ersatz durch `fieldset`/`section` würde gerendertes Markup ändern (nicht verhaltensneutral).
    <dl className="od-context" role="group" aria-label="Kontext dieser Seite">
      <div>
        <dt>Aktiver Mandant</dt>
        <dd>{tenant.display_name}</dd>
      </div>
      <div>
        <dt>Aktive Produktrolle</dt>
        <dd>{`${role.id} · ${role.name}`}</dd>
      </div>
      <div>
        <dt>Vertretung (zeitlich begrenzt)</dt>
        <dd className="od-context-gap">{CONTEXT_GAPS.vertretung}</dd>
      </div>
      <div>
        <dt>{scopeLabel}</dt>
        <dd>{scopeValue}</dd>
      </div>
      <div>
        <dt>{datenstandLabel}</dt>
        <dd>{datenstandValue}</dd>
      </div>
      <div>
        <dt>Vertraulichkeitsstufe und Exportrestriktion</dt>
        <dd className="od-context-gap">{CONTEXT_GAPS.vertraulichkeit}</dd>
      </div>
      <div>
        <dt>Vertrauensgrad bei abgeleiteten Aussagen</dt>
        <dd className="od-context-gap">{CONTEXT_GAPS.vertrauensgrad}</dd>
      </div>
      {children}
    </dl>
  );
}
