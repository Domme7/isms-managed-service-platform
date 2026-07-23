'use client';

/**
 * Kunden-Startseite „verwalten" – session-gebundener Rahmen (WP-006 Slice 1).
 *
 * Sitzungs-/Zustandsrahmen analog `ServicesView`: Loading (vor Hydration), „nicht angemeldet"
 * mit Verweis zur Anmeldung, sonst der Inhalt für aktive Rolle + Mandant. Die Rollen-/
 * Mandanten-Auswahl ist reine Perspektive – KEINE Authz, KEINE Sicherheitsgrenze
 * (`.claude/rules/frontend.md`, Dok. 19 folgt in einem späteren Work Package).
 *
 * NEUTRAL-FÄHIG (DR-0009): ohne gewählte Rolle rendert der Inhalt vollständig (`role={null}`);
 * es gibt KEINEN erzwungenen Redirect in den Kundenbereich (06-D02 als sichtbarer Einstieg
 * gelöst, O-WP006-03).
 *
 * BEWUSSTE ENTSCHEIDUNG (Muster O-WP014-09, wie `/services`/`/isms`): session-abhängig
 * client-gerendert; dadurch landet der Seed-Anteil im Client-Bundle dieser Route. Akzeptiert und
 * dokumentiert.
 */
import Link from 'next/link';
import { useSession } from '../shell/SessionProvider';
import { KundenStartContent } from './KundenStartContent';

export function KundenStartView() {
  const { resolved, hydrated } = useSession();

  if (!hydrated) {
    return (
      <>
        <p className="tw-eyebrow">Kunden · Kundenbereich</p>
        <h1>Kundenbereich</h1>
        <p className="tw-muted">Lade Kontext …</p>
      </>
    );
  }

  if (!resolved) {
    return (
      <>
        <p className="tw-eyebrow">Kunden · Kundenbereich</p>
        <h1>Kundenbereich</h1>
        <div className="tw-empty" role="note">
          <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>Nicht angemeldet</h2>
          <p style={{ marginTop: 0 }}>
            Es ist kein Mandant gewählt. Melden Sie sich an, um den Kundenbereich des aktiven
            Mandanten zu sehen.
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

  return <KundenStartContent role={resolved.role} tenant={resolved.tenant} />;
}
