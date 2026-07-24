'use client';

/**
 * Ort „Reports" – session-gebundener Rahmen (WP-032 Slice 2, read-only).
 *
 * Zustandsrahmen analog `AdministrationView`/`KundenStartView` (`.claude/rules/frontend.md`:
 * Loading, Empty, Error): Ladezustand vor der Hydration, „nicht angemeldet" mit Verweis zur
 * Anmeldung, sonst der Inhalt für den aktiven Mandanten.
 *
 * NEUTRAL-FÄHIG (DR-0009): ohne gewählte Rolle rendert der Inhalt vollständig (`role={null}`).
 *
 * BEWUSSTE ENTSCHEIDUNG (Muster O-WP014-09, wie die übrigen Live-Orte): session-abhängig
 * client-gerendert; der Bestand liegt dadurch im Client-Bundle dieser Route. Akzeptiert und
 * dokumentiert – diese Seite zeigt ausschließlich Zählungen über Material, das die Fachorte
 * ohnehin vollständig anzeigen, und verschärft die bekannte Grenze damit nicht.
 */
import Link from 'next/link';
import { useSession } from '../shell/SessionProvider';
import { BereichRahmen } from '../shell/BereichRahmen';
import { ReportsContent } from './ReportsContent';

export function ReportsView() {
  const { resolved, hydrated } = useSession();

  // DR-0017 Stage 3: dieselbe Dashboard-Fläche wie das Cockpit (`BereichRahmen`, folgt der
  // Cockpit-Themenwahl). Kopf, Leitfrage und Inhalt bleiben unverändert in `ReportsContent`.
  return (
    <BereichRahmen>
      {!hydrated ? (
        <>
          <p className="tw-eyebrow">Reports · Berichtsstruktur und Datengrundlage</p>
          <h1>Reports</h1>
          <p className="tw-muted">Lade Kontext …</p>
        </>
      ) : !resolved ? (
        <>
          <p className="tw-eyebrow">Reports · Berichtsstruktur und Datengrundlage</p>
          <h1>Reports</h1>
          <div className="tw-empty" role="note">
            <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>Nicht angemeldet</h2>
            <p style={{ marginTop: 0 }}>
              Es ist kein Mandant gewählt. Melden Sie sich an, um die Datengrundlage des aktiven
              Mandanten zu sehen.
            </p>
            <p style={{ marginBottom: 0 }}>
              <Link className="tw-cta" href="/login">
                Zur Anmeldung →
              </Link>
            </p>
          </div>
        </>
      ) : (
        <ReportsContent role={resolved.role} tenant={resolved.tenant} />
      )}
    </BereichRahmen>
  );
}
