/**
 * Eigener 404 für den Digital-Twin-Bereich (WP-004, A3).
 * Seit WP-011 unter der Shell-Gruppe: rendert innerhalb des Shell-`main#inhalt`,
 * daher hier nur der Inhalt.
 */
import Link from 'next/link';

export default function TwinNotFound() {
  return (
    <>
      <p className="tw-eyebrow">Fehler 404</p>
      <h1>Mandant nicht gefunden</h1>
      <p className="tw-lead">
        Diesen Mandanten gibt es im Datenbestand nicht. Möglicherweise ist die Adresse veraltet oder
        wurde falsch eingegeben.
      </p>
      {/* Neutral beschriftet (WP-028 Slice 4): wohin der Ort „Kunden" führt, entscheidet die
          Sphäre der aktiven Rolle (`lib/shell/sphaere.ts`) – dieser Link behauptet deshalb
          keine Mandantenliste. */}
      <Link className="tw-back" href="/twin">
        ← Zurück zu Kunden
      </Link>
    </>
  );
}
