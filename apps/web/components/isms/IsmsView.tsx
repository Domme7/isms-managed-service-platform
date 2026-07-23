'use client';

/**
 * „ISMS" – read-only Risk & Control-Sicht (WP-013 Slice 1, Dok. 06 §4/§7 S06).
 *
 * Sitzungs-/Zustandsrahmen analog `ServicesView`: Loading (vor Hydration), „nicht angemeldet"
 * mit Link zur Login-Simulation, sonst Inhalt für den aktiven Mandanten.
 * Die Rollen-/Mandanten-Auswahl ist reine Demo-Perspektive – KEINE Authz, KEINE
 * Sicherheitsgrenze (`.claude/rules/frontend.md`, Dok. 19 folgt in einem späteren WP).
 *
 * BEWUSSTE DEMO-ENTSCHEIDUNG (übernommen aus WP-012 Code-Review MINOR-1, reversibel):
 * session-abhängig client-gerendert; dadurch landet der synthetische `DEMO_SEED` im
 * Client-Bundle. Für die Demo akzeptiert; spätere Alternative: Views serverseitig ableiten
 * (Muster `/twin`), relevant sobald Bundle-Budgets (Dok. 18) verbindlich werden.
 */
import Link from 'next/link';
import { useSession } from '../shell/SessionProvider';
import { IsmsContent } from './IsmsContent';

export function IsmsView() {
  const { resolved, hydrated } = useSession();

  if (!hydrated) {
    return (
      <>
        <p className="tw-eyebrow">ISMS</p>
        <h1>ISMS</h1>
        <p className="tw-muted">Lade Kontext …</p>
      </>
    );
  }

  if (!resolved) {
    return (
      <>
        <p className="tw-eyebrow">ISMS</p>
        <h1>ISMS</h1>
        <div className="tw-empty" role="note">
          <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>
            Nicht angemeldet (Simulation)
          </h2>
          <p style={{ marginTop: 0 }}>
            Es ist keine Rolle und kein Mandant gewählt. Melden Sie sich in der Simulation an, um
            die Risiko- und Control-Lage des aktiven Mandanten zu sehen.
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

  return <IsmsContent role={resolved.role} tenant={resolved.tenant} />;
}
