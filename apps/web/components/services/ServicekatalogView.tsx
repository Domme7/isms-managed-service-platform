'use client';

/**
 * Servicekatalog ansehen (`/services/katalog`, WP-006 Slice 2) – session-gebundener Rahmen.
 *
 * Sitzungs-/Zustandsrahmen analog `ServicesView`/`KundenStartView`: Loading (vor Hydration),
 * „nicht angemeldet" mit Verweis zur Anmeldung, sonst der Katalog für aktive Rolle + Mandant.
 * Rollen-/Mandanten-Auswahl ist reine Perspektive – KEINE Authz (`.claude/rules/frontend.md`).
 *
 * NEUTRAL-FÄHIG (DR-0009): ohne gewählte Rolle rendert der Katalog vollständig (`role={null}`).
 *
 * BEWUSSTE ENTSCHEIDUNG (Muster wie `/services`): session-abhängig client-gerendert.
 */
import Link from 'next/link';
import { useSession } from '../shell/SessionProvider';
import { ServicekatalogContent } from './ServicekatalogContent';

export function ServicekatalogView() {
  const { resolved, hydrated } = useSession();

  if (!hydrated) {
    return (
      <>
        <p className="tw-eyebrow">Services · Katalog</p>
        <h1>Servicekatalog</h1>
        <p className="tw-muted">Lade Kontext …</p>
      </>
    );
  }

  if (!resolved) {
    return (
      <>
        <p className="tw-eyebrow">Services · Katalog</p>
        <h1>Servicekatalog</h1>
        <div className="tw-empty" role="note">
          <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>Nicht angemeldet</h2>
          <p style={{ marginTop: 0 }}>
            Es ist kein Mandant gewählt. Melden Sie sich an, um den Servicekatalog samt der aktiven
            Services des Mandanten zu sehen.
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

  return <ServicekatalogContent role={resolved.role} tenant={resolved.tenant} />;
}
