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
import { BereichRahmen } from '../shell/BereichRahmen';
import { IsmsContent } from './IsmsContent';

export function IsmsView() {
  const { resolved, hydrated } = useSession();

  // DR-0017 Stage 3: dieselbe Dashboard-Fläche wie das Cockpit (`BereichRahmen`, folgt der
  // Cockpit-Themenwahl). Kopf, Leitfrage und Inhalt bleiben unverändert in `IsmsContent`.
  return (
    <BereichRahmen>
      {!hydrated ? (
        <>
          <p className="tw-eyebrow">ISMS</p>
          <h1>ISMS</h1>
          <p className="tw-muted">Lade Kontext …</p>
        </>
      ) : !resolved ? (
        <>
          <p className="tw-eyebrow">ISMS</p>
          <h1>ISMS</h1>
          <div className="tw-empty" role="note">
            <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>Kein Mandant gewählt</h2>
            <p style={{ marginTop: 0 }}>
              Es ist kein Mandant gewählt. Wählen Sie einen Mandanten, um die Risiko- und
              Control-Lage des aktiven Mandanten zu sehen.
            </p>
            <p style={{ marginBottom: 0 }}>
              <Link className="tw-cta" href="/login">
                Zur Anmeldung →
              </Link>
            </p>
          </div>
        </>
      ) : (
        <IsmsContent role={resolved.role} tenant={resolved.tenant} />
      )}
    </BereichRahmen>
  );
}
