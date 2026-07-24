'use client';

/**
 * „Cockpit" – modulares Ein-Screen-Dashboard (WP-034 Slice 3, DR-0016 Nachtrag 3).
 *
 * Sitzungsrahmen wie zuvor: Loading (vor Hydration), „kein Mandant gewählt" mit Link zur Anmeldung,
 * sonst das modulare Cockpit. Der Inhalt liegt in `CockpitModulContent` (ohne Session-Mock testbar).
 * KEIN neuer Hauptnav-Ort (06-D01): `/cockpit` hängt unter „Heute".
 */
import Link from 'next/link';
import { useSession } from '../shell/SessionProvider';
import { CockpitModulContent } from './CockpitModulContent';

export function CockpitModulView() {
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

  return <CockpitModulContent role={resolved.role} tenant={resolved.tenant} />;
}
