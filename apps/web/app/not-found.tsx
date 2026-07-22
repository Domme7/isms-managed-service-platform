/**
 * Globales, gebrandetes 404 (WP-011 Review M1). Deutsch, gestylt, konsistent zum Twin-404.
 * Reine Navigation; keine Fachlogik.
 */
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="tw-container" id="inhalt">
      <p className="tw-eyebrow">Fehler 404</p>
      <h1>Seite nicht gefunden</h1>
      <p className="tw-lead">
        Diese Adresse gibt es in der synthetischen Demo-Welt nicht. Möglicherweise ist der Link
        veraltet oder wurde falsch eingegeben.
      </p>
      <p>
        <Link className="tw-card-link" href="/heute">
          ← Zur Startseite (Heute)
        </Link>
      </p>
    </main>
  );
}
