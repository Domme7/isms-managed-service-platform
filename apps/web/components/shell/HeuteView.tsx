'use client';

/**
 * „Heute" – Standard-Startpunkt / Mission Control (WP-016 Slice 2, Dok. 06 §4/§7 S01, 06-D02).
 *
 * Sitzungs-/Zustandsrahmen analog `IsmsView`/`ServicesView`: Loading (vor Hydration), „nicht
 * angemeldet" mit Link zur Login-Simulation, sonst der Inhalt für die aktive Rolle und den
 * aktiven Mandanten. Der Inhalt liegt in `MissionControlContent` und ist damit ohne
 * Session-Mock testbar.
 *
 * Die Rollen-/Mandanten-Auswahl ist reine Demo-Perspektive – KEINE Authz, KEINE Sicherheitsgrenze
 * (`.claude/rules/frontend.md`, Dok. 19 folgt in einem späteren WP).
 *
 * BEWUSSTE DEMO-ENTSCHEIDUNG (übernommen aus WP-012 Code-Review MINOR-1, reversibel):
 * session-abhängig client-gerendert; dadurch landet der synthetische `DEMO_SEED` im
 * Client-Bundle – dieselbe dokumentierte Lage wie bei `/isms` und `/services` (O-WP014-09),
 * hier bewusst nicht verschärft. Für die Demo akzeptiert; spätere Alternative: Views
 * serverseitig ableiten (Muster `/twin`).
 */
import Link from 'next/link';
import { useSession } from './SessionProvider';
import { MissionControlContent } from './MissionControlContent';

export function HeuteView() {
  const { resolved, hydrated } = useSession();

  if (!hydrated) {
    return (
      <>
        <p className="tw-eyebrow">Heute</p>
        <h1>Heute</h1>
        <p className="tw-muted">Lade Kontext …</p>
      </>
    );
  }

  if (!resolved) {
    return (
      <>
        <p className="tw-eyebrow">Heute</p>
        <h1>Heute</h1>
        <div className="tw-empty" role="note">
          <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>Nicht angemeldet (Simulation)</h2>
          <p style={{ marginTop: 0 }}>
            Es ist keine Rolle und kein Mandant gewählt. Melden Sie sich in der Simulation an, um
            den rollenbezogenen Startpunkt für den aktiven Mandanten zu sehen.
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

  return <MissionControlContent role={resolved.role} tenant={resolved.tenant} />;
}
