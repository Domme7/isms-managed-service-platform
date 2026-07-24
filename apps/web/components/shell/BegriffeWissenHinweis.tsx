/**
 * U-03 (Usability-Audit 2026-07-24): persistente, ruhige Zeile „Begriffe erklärt → Wissen".
 *
 * Fachvokabular (Control, Nachweis, SLA, Scope, Sphäre, Lebenszyklus-Stand, digitaler Zwilling)
 * trifft einen Neueinsteiger auf den vokabularstarken Orten sofort – aber von keiner Fachseite
 * führte bisher ein Weg zum Glossar. Diese Zeile schließt die Lücke auf ISMS, Services,
 * Kundenbereich und Objekt-360 (die im Audit benannten Orte).
 *
 * BEWUSST NUR EIN NAVIGATIONSLINK: keine Fachaussage, keine Bewertung, kein neuer Datenträger –
 * damit ist die Zeile für alle Ehrlichkeits-/Vokabular-Wächter unkritisch. Der Glossar selbst
 * lebt am Ort „Wissen" (`/wissen`, `components/wissen/WissenContent.tsx`).
 */
import Link from 'next/link';

export function BegriffeWissenHinweis() {
  return (
    <p className="tw-begriffe-hinweis">
      <span className="tw-begriffe-marker" aria-hidden="true">
        i
      </span>
      <span>
        Unbekannter Fachbegriff?{' '}
        <Link href="/wissen">Begriffe erklärt im Glossar unter „Wissen"</Link>.
      </span>
    </p>
  );
}
