'use client';

/**
 * Einstieg `/` (WP-011): leitet auf einen sinnvollen Default weiter.
 *  - angemeldet (Simulation)  -> `/cockpit` (Startseite nach Login, DR-0010 Nr. 3)
 *  - nicht angemeldet         -> `/willkommen` (Produkt-Landing vor der Anmeldung, DR-0015 Nr. 7)
 *
 * COCKPIT ALS STARTSEITE (DR-0010 Nr. 3): Der Owner hat das Cockpit als Einstieg nach der
 * Anmeldung freigegeben; die ausführliche Tagesansicht „Heute" bleibt über den Cockpit-Link und
 * die Navigation erreichbar.
 *
 * LANDING VOR DER ANMELDUNG (DR-0015 Nr. 7): Ein neuer Besucher landet zuerst auf der
 * Erklärseite `/willkommen` (was ist das, für wen, was ist anders), von der ein CTA zur
 * Anmeldung führt – statt ihn ohne Kontext direkt ins Formular zu setzen.
 *
 * Da die Auswahl clientseitig (localStorage) liegt, erfolgt die Weiterleitung nach dem Mount.
 * Ohne JavaScript bleiben die expliziten Links als Fallback funktionsfähig.
 */
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from '../components/shell/SessionProvider';
import { einstiegHref } from '../lib/shell/sphaere';

export default function Home() {
  const router = useRouter();
  const { resolved, hydrated } = useSession();

  useEffect(() => {
    if (!hydrated) return;
    // Sphärengerechter Einstieg (DR-0017 Stage 1): Berater/Portfolio → Berater-Portfolio,
    // Kunde → eigenes Cockpit; nicht angemeldet → Produkt-Landing.
    router.replace(resolved ? einstiegHref(resolved.role) : '/willkommen');
  }, [hydrated, resolved, router]);

  return (
    <main className="tw-container" aria-busy={!hydrated}>
      <p className="tw-eyebrow">ISMS Managed Service Platform</p>
      <h1>Weiterleitung …</h1>
      <p className="tw-lead">
        Sie werden zum passenden Startpunkt geführt. Falls das nicht automatisch geschieht:
      </p>
      <p className="tw-empty-actions">
        <Link className="tw-cta" href="/login">
          Zur Anmeldung →
        </Link>
        <Link className="tw-cta" href="/cockpit">
          Zum Cockpit →
        </Link>
      </p>
    </main>
  );
}
