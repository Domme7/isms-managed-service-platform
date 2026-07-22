/**
 * Eigener 404 für den Digital-Twin-Bereich (WP-004, A3).
 * Rendert innerhalb des Twin-Layouts (`main#inhalt`), daher hier nur der Inhalt.
 */
import Link from 'next/link';

export default function TwinNotFound() {
  return (
    <>
      <p className="tw-eyebrow">Fehler 404</p>
      <h1>Mandant nicht gefunden</h1>
      <p className="tw-lead">
        Diesen Mandanten gibt es in der synthetischen Demo-Welt nicht. Möglicherweise ist die
        Adresse veraltet oder wurde falsch eingegeben.
      </p>
      <Link className="tw-back" href="/twin">
        ← Zur Mandantenübersicht
      </Link>
    </>
  );
}
