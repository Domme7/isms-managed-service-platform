/**
 * Querschnittliche Kontextleiste der Live-Hauptseiten (WP-020 Slice 1; Struktur- und
 * Verdichtungs-Fix im Review-Pass des WP).
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
 *  - Mandant und Produktrolle kommen aus der aktiven Auswahl (Session-Simulation: der Mandant
 *    und optional eine gewählte Rolle, DR-0009; `role === null` = neutraler Zustand).
 *    Eine Organisationseinheit unterhalb des Mandanten kennt der Datenbestand nicht; das
 *    PDF sagt „ggf." – sie wird deshalb weggelassen, nicht als Lücke behauptet.
 *  - Scope/Objektkontext und Datenstand liefert jede Seite aus ihrer eigenen, react-freien
 *    Ableitung (`lib/shell/page-context.ts` bzw. bestehende Seitenmodelle) – Label und
 *    Leerwert-Text sind seitenspezifisch, damit die Leiste dem Seiteninhalt nie widerspricht
 *    (Review-Lektion aus `/entscheidungen`: „Datenstand der Entscheidungen").
 *  - Vertretung, Vertraulichkeitsstufe/Exportrestriktion und Vertrauensgrad haben im heutigen
 *    Datenbestand KEINEN Träger: der Wert lautet knapp „nicht erfasst" (`CONTEXT_GAP_WERT`),
 *    die vollständigen Begründungen (`CONTEXT_GAPS`, weiterhin die EINE Quelle) stehen
 *    aufklappbar in derselben Leiste (progressive Offenlegung, Dok. 06 P06) – kein erfundener
 *    Wert, kein Textteppich in der Wertspalte.
 *
 * // OFFENE FRAGE O-WP016-08 (bestehend, hier referenziert statt dupliziert): „Vertrauensgrad"
 * // und „Version" sind im Objektvertrag Felder EINES Objekts bzw. EINER Kante; ein
 * // seitenweiter/mandantenweiter Wert existiert nicht, und eine Verdichtung wäre eine
 * // Bewertung (Dok. 07 D10, O-WP014-02). Vertretung und Vertraulichkeit/Exportrestriktion
 * // auf Mandantenebene haben ebenfalls keinen Träger. Die Lücken stehen deshalb als Klartext
 * // in der Leiste; die belegten Einzelwerte bleiben an Objekt-360 (Klassifikation,
 * // Bestätigung) und an den Kanten (Vertrauensgrad) sichtbar.
 *
 * STRUKTUR (FINDING-0008-Fix): benannte Region (`<section aria-label>`, implizite Rolle
 * `region`) mit nativer Definitionsliste OHNE ARIA-Rollen-Override – axe-sauber; Screenreader
 * erhalten den Namen über die Region und die Semantik über die echte `dl`. Sichtbarer Wortlaut
 * und Sechser-Reihenfolge der Kontextelemente sind unverändert (Product-Auflage).
 *
 * Präsentational und ohne eigene Datenzugriffe – jede Seite reicht ausschließlich belegte
 * Werte herein.
 */
import type { ReactNode } from 'react';
import type { DemoTenant } from '@isms/demo-seed';
import type { DemoRole } from '../../lib/shell/roles';

/**
 * Anzeige der aktiven Produktrolle im NEUTRALEN Zustand (WP-020 Slice 2, DR-0009) – EINE
 * Quelle für alle Live-Hauptseiten, per Wächtertest belegt. Neutral ist ein vollwertiger
 * Zustand, keine Datenlücke: die Rollenwahl ist in der Demo bewusst optional.
 */
export const CONTEXT_NEUTRAL_ROLE = 'neutral – keine Rolle gewählt';

/** Knapper Leitwert der drei unbelegten Kontextelemente (Begründung steht aufklappbar). */
export const CONTEXT_GAP_WERT = 'nicht erfasst';

/**
 * Die drei benannten Datenlücken der Kontextleiste – EINE Quelle für alle Live-Hauptseiten,
 * damit die Formulierung nirgends still auseinanderläuft; per Wächtertest je Ort belegt.
 * Jeder Text benennt die Lücke UND ihre Ursache – es wird kein Wert erfunden (DR-0005).
 */
export const CONTEXT_GAPS = {
  vertretung:
    'nicht erfasst – die Anmelde-Simulation speichert nur den Mandanten und optional eine ' +
    'gewählte Rolle; eine zeitlich begrenzte Vertretung kennt der Datenbestand nicht.',
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
  /** Aktive Produktrolle der Session-Simulation; `null` = neutraler Zustand (DR-0009). */
  role: DemoRole | null;
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
    /* Benannte Region + native dl ohne Rollen-Override (FINDING-0008-Fix, s. Kopfnotiz). */
    <section aria-label="Kontext dieser Seite">
      <dl className="od-context">
        <div>
          <dt>Aktiver Mandant</dt>
          <dd>{tenant.display_name}</dd>
        </div>
        <div>
          <dt>Aktive Produktrolle</dt>
          {/* AC-3-Formulierung: „Rolle (oder ‚neutral')" – neutral ist ein Zustand, kein Wert-
              Ausfall, und wird deshalb NICHT als Datenlücke gestylt. */}
          <dd>{role ? `${role.id} · ${role.name}` : CONTEXT_NEUTRAL_ROLE}</dd>
        </div>
        <div>
          <dt>Vertretung (zeitlich begrenzt)</dt>
          <dd className="od-context-gap">{CONTEXT_GAP_WERT}</dd>
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
          <dd className="od-context-gap">{CONTEXT_GAP_WERT}</dd>
        </div>
        <div>
          <dt>Vertrauensgrad bei abgeleiteten Aussagen</dt>
          <dd className="od-context-gap">{CONTEXT_GAP_WERT}</dd>
        </div>
        {children}
        {/* Begründungen der drei „nicht erfasst"-Werte: aufklappbar (P06); die Texte bleiben
            die EINE Quelle `CONTEXT_GAPS` und stehen unverändert im DOM (Wächter prüfen sie). */}
        <div className="od-context-hinweis">
          <dt>Warum „nicht erfasst"?</dt>
          <dd>
            <details className="od-context-details">
              <summary>Begründung der drei nicht erfassten Angaben</summary>
              <ul>
                <li>
                  <strong>Vertretung (zeitlich begrenzt):</strong> {CONTEXT_GAPS.vertretung}
                </li>
                <li>
                  <strong>Vertraulichkeitsstufe und Exportrestriktion:</strong>{' '}
                  {CONTEXT_GAPS.vertraulichkeit}
                </li>
                <li>
                  <strong>Vertrauensgrad bei abgeleiteten Aussagen:</strong>{' '}
                  {CONTEXT_GAPS.vertrauensgrad}
                </li>
              </ul>
            </details>
          </dd>
        </div>
      </dl>
    </section>
  );
}
