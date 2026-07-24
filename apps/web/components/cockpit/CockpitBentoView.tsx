'use client';

/**
 * „Cockpit" – Bento-Mosaik-Startseite (WP-034 Slice 2, DR-0016, Owner-Wahl Variante A).
 *
 * Sitzungs-/Zustandsrahmen analog `CockpitView`: Loading (vor Hydration), „kein Mandant gewählt"
 * mit Link zur Anmeldung, sonst das Bento-Cockpit für die aktive Rolle und den aktiven Mandanten.
 * Der Inhalt liegt in `CockpitBentoContent` und ist damit ohne Session-Mock testbar.
 *
 * KEIN NEUER HAUPTNAV-ORT (06-D01): Die Route `/cockpit` hängt unter „Heute" (Navigations-Match
 * in `lib/shell/places.ts`); die Rollen-/Mandanten-Auswahl ist reine Demo-Perspektive, KEINE
 * Authz. Die A/B/C-Personalisierung entfällt hier (DR-0016: das Bento-Dashboard löst die drei
 * Langscroll-Stile ab); die ausführliche Tagesansicht bleibt unter „Heute".
 */
import Link from 'next/link';
import { useSession } from '../shell/SessionProvider';
import { CockpitBentoContent } from './CockpitBentoContent';

export function CockpitBentoView() {
  const { resolved, hydrated } = useSession();

  if (!hydrated) {
    return (
      <>
        <p className="tw-eyebrow">Cockpit</p>
        <h1>Cockpit</h1>
        <p className="tw-muted">Lade Kontext …</p>
      </>
    );
  }

  if (!resolved) {
    return (
      <>
        <p className="tw-eyebrow">Cockpit</p>
        <h1>Cockpit</h1>
        <div className="tw-empty" role="note">
          <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>Kein Mandant gewählt</h2>
          <p style={{ marginTop: 0 }}>
            Es ist kein Mandant gewählt. Wählen Sie einen Mandanten, um das Cockpit zu öffnen – die
            Rollenwahl ist danach optional in der Kopfleiste möglich.
          </p>
          <p style={{ marginBottom: 0 }}>
            <Link className="tw-cta" href="/login">
              Zur Anmeldung →
            </Link>
          </p>
        </div>
      </>
    );
  }

  return <CockpitBentoContent role={resolved.role} tenant={resolved.tenant} />;
}
