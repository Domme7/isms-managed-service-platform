'use client';

/**
 * „Services" – read-only Managed-Service-Sicht (WP-012 Slice 2, Dok. 06 §4/§7 S09).
 *
 * Sitzungs-/Zustandsrahmen analog `HeuteView`: Loading (vor Hydration), „nicht angemeldet"
 * mit Link zur Login-Simulation, sonst Inhalt für aktive Rolle + Mandant.
 * Die Rollen-/Mandanten-Auswahl ist reine Demo-Perspektive – KEINE Authz, KEINE
 * Sicherheitsgrenze (`.claude/rules/frontend.md`, Dok. 19 folgt in einem späteren WP).
 */
import Link from 'next/link';
import { useSession } from '../shell/SessionProvider';
import { ServicesContent } from './ServicesContent';

export function ServicesView() {
  const { resolved, hydrated } = useSession();

  if (!hydrated) {
    return (
      <>
        <p className="tw-eyebrow">Services</p>
        <h1>Services</h1>
        <p className="tw-muted">Lade Kontext …</p>
      </>
    );
  }

  if (!resolved) {
    return (
      <>
        <p className="tw-eyebrow">Services</p>
        <h1>Services</h1>
        <div className="tw-empty" role="note">
          <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>Nicht angemeldet (Simulation)</h2>
          <p style={{ marginTop: 0 }}>
            Es ist keine Rolle und kein Mandant gewählt. Melden Sie sich in der Simulation an, um
            die Managed Services des aktiven Mandanten zu sehen.
          </p>
          <p style={{ marginBottom: 0 }}>
            <Link className="tw-cta" href="/login">
              Zur Anmelde-Simulation →
            </Link>
          </p>
        </div>
      </>
    );
  }

  return <ServicesContent role={resolved.role} tenant={resolved.tenant} />;
}
