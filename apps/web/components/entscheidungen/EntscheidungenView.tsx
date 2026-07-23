'use client';

/**
 * „Entscheidungen" – read-only Entscheidungsregister (WP-017 Slice 2, Dok. 06 §4/§7 S03).
 *
 * Sitzungs-/Zustandsrahmen analog `IsmsView`/`HeuteView`: Loading (vor Hydration), „nicht
 * angemeldet" mit Link zur Login-Simulation, sonst der Inhalt für die aktive Rolle und den
 * aktiven Mandanten. Der Inhalt liegt in `EntscheidungenContent` und ist damit ohne
 * Session-Mock testbar.
 *
 * Die Rollen-/Mandanten-Auswahl ist reine Demo-Perspektive – KEINE Authz, KEINE Sicherheitsgrenze
 * (`.claude/rules/frontend.md`, Dok. 19 folgt in einem späteren WP). Alle Rollen sehen dieselben
 * Daten (Dok. 06 06-D05, Dok. 10 ENTSCHEIDUNG 10-02).
 *
 * BEWUSSTE DEMO-ENTSCHEIDUNG (übernommen aus WP-012 Code-Review MINOR-1, reversibel):
 * session-abhängig client-gerendert; dadurch landet der synthetische `DEMO_SEED` im
 * Client-Bundle – dieselbe dokumentierte Lage wie bei `/isms`, `/services` und `/heute`
 * (O-WP014-09), hier bewusst nicht verschärft. Spätere Alternative: Views serverseitig ableiten
 * (Muster `/twin`).
 */
import Link from 'next/link';
import { useSession } from '../shell/SessionProvider';
import { EntscheidungenContent } from './EntscheidungenContent';

export function EntscheidungenView() {
  const { resolved, hydrated } = useSession();

  if (!hydrated) {
    return (
      <>
        <p className="tw-eyebrow">Entscheidungen</p>
        <h1>Entscheidungen</h1>
        <p className="tw-muted">Lade Kontext …</p>
      </>
    );
  }

  if (!resolved) {
    return (
      <>
        <p className="tw-eyebrow">Entscheidungen</p>
        <h1>Entscheidungen</h1>
        <div className="tw-empty" role="note">
          <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>Nicht angemeldet (Simulation)</h2>
          <p style={{ marginTop: 0 }}>
            Es ist keine Rolle und kein Mandant gewählt. Melden Sie sich in der Simulation an, um
            die erfassten Entscheidungen des aktiven Mandanten zu sehen.
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

  return <EntscheidungenContent role={resolved.role} tenant={resolved.tenant} />;
}
