'use client';

/**
 * Ort „Administration" – session-gebundener Rahmen (WP-032 Slice 1, read-only).
 *
 * Zustandsrahmen analog `KundenStartView`/`ServicesView` (`.claude/rules/frontend.md`:
 * Loading, Empty, Error): Ladezustand vor der Hydration, „nicht angemeldet" mit Verweis zur
 * Anmeldung, sonst der Inhalt für den aktiven Mandanten. Die Rollen-/Mandantenwahl ist reine
 * Perspektive – KEINE Autorisierung und KEINE Sicherheitsgrenze; die Seite benennt das sichtbar.
 *
 * NEUTRAL-FÄHIG (DR-0009): ohne gewählte Rolle rendert der Inhalt vollständig (`role={null}`).
 *
 * BEWUSSTE ENTSCHEIDUNG (Muster O-WP014-09, wie `/services`/`/isms`/`/kunden`):
 * session-abhängig client-gerendert; der Bestand liegt dadurch im Client-Bundle dieser Route.
 * Akzeptiert und dokumentiert – dieser Ort verschärft die bekannte Grenze nicht (er zeigt keine
 * Daten, die die anderen Orte nicht ohnehin zeigen).
 */
import Link from 'next/link';
import { useSession } from '../shell/SessionProvider';
import { AdministrationContent } from './AdministrationContent';

export function AdministrationView() {
  const { resolved, hydrated } = useSession();

  if (!hydrated) {
    return (
      <>
        <p className="tw-eyebrow">Administration · Konfiguration und Zuständigkeiten</p>
        <h1>Administration</h1>
        <p className="tw-muted">Lade Kontext …</p>
      </>
    );
  }

  if (!resolved) {
    return (
      <>
        <p className="tw-eyebrow">Administration · Konfiguration und Zuständigkeiten</p>
        <h1>Administration</h1>
        <div className="tw-empty" role="note">
          <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>Nicht angemeldet</h2>
          <p style={{ marginTop: 0 }}>
            Es ist kein Mandant gewählt. Melden Sie sich an, um den Konfigurationsstand des aktiven
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

  return <AdministrationContent role={resolved.role} tenant={resolved.tenant} />;
}
