/**
 * Startseite – führt in den Digital Twin Explorer (WP-004).
 * Reine Navigation; keine Fachlogik.
 */
import Link from 'next/link';

export default function Home() {
  return (
    <main className="tw-container">
      <p className="tw-eyebrow">ISMS Managed Service Platform</p>
      <h1>Digitaler Unternehmenszwilling</h1>
      <p className="tw-lead">
        Erste sichtbare Produktfläche der Demo-Welt: ein read-only Explorer, der den synthetischen
        Demo-Seed rendert – Mandanten, Objekte nach Familie und ihre Beziehungen.
      </p>

      <nav aria-label="Haupteinstieg">
        <ul className="tw-grid">
          <li>
            <Link className="tw-card tw-card-link" href="/twin">
              <span className="tw-card-title">Digital Twin Explorer</span>
              <span className="tw-card-sub">Mandanten &amp; Objektgraph ansehen</span>
              <span className="tw-cta" aria-hidden="true">
                Öffnen →
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      <p className="tw-muted" style={{ marginTop: '2rem', fontSize: '0.85rem' }}>
        Stack laut ADR-0001 · WP-004 · Daten aus <code>@isms/demo-seed</code> (rein synthetisch,
        keine DB/Auth).
      </p>
    </main>
  );
}
