'use client';

/**
 * Einstieg `/` (WP-011): leitet auf einen sinnvollen Default weiter.
 *  - angemeldet (Simulation)  -> `/heute` (Standard-Startpunkt, Dok. 06 06-D02)
 *  - nicht angemeldet         -> `/login` (Rollen-/Mandanten-Simulation)
 *
 * Da die Auswahl clientseitig (localStorage) liegt, erfolgt die Weiterleitung nach dem Mount.
 * Ohne JavaScript bleiben die expliziten Links als Fallback funktionsfähig.
 */
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from '../components/shell/SessionProvider';

export default function Home() {
  const router = useRouter();
  const { session, hydrated } = useSession();

  useEffect(() => {
    if (!hydrated) return;
    router.replace(session ? '/heute' : '/login');
  }, [hydrated, session, router]);

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
        <Link className="tw-cta" href="/heute">
          Zur App (Heute) →
        </Link>
      </p>
    </main>
  );
}
