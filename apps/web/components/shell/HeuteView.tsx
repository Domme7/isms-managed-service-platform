'use client';

/**
 * "Heute" – Standard-Startpunkt / Mission Control (WP-011, Dok. 06 §8 / 06-D02).
 *
 * Leichte rollenabhängige Sicht (WP-011 Scope 6, Dok. 06 P02): dieselbe Wahrheit, andere Rahmung.
 * Zeigt aktive Rolle + Mandant + die Leitfrage der zugehörigen Erlebniswelt (Dok. 06 §5) und
 * verweist ehrlich darauf, dass die volle Mission Control (S01) in einer späteren Phase entsteht.
 * KEIN erfundener Inhalt, KEINE Fachlogik.
 */
import Link from 'next/link';
import { useSession } from './SessionProvider';
import { worldForRole } from '../../lib/shell/roles';

export function HeuteView() {
  const { resolved, hydrated } = useSession();

  if (!hydrated) {
    return (
      <>
        <p className="tw-eyebrow">Heute</p>
        <h1>Mission Control</h1>
        <p className="tw-muted">Lade Kontext …</p>
      </>
    );
  }

  if (!resolved) {
    return (
      <>
        <p className="tw-eyebrow">Heute</p>
        <h1>Mission Control</h1>
        <div className="tw-empty" role="note">
          <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>Nicht angemeldet (Simulation)</h2>
          <p style={{ marginTop: 0 }}>
            Es ist noch keine Rolle gewählt. Melden Sie sich in der Simulation an, um den
            rollenbezogenen Startpunkt zu sehen.
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

  const { role, tenant } = resolved;
  const world = worldForRole(role);

  return (
    <>
      <p className="tw-eyebrow">Heute · Mission Control</p>
      <h1>Guten Tag – {role.name}</h1>

      {/* Sichtbarer Kontext (Dok. 06 P07 / 06-D04). */}
      <p className="tw-lead">
        Aktiver Mandant: <strong>{tenant.display_name}</strong>. Ihre Erlebniswelt:{' '}
        <strong>{world.name}</strong>.
      </p>

      {/* Leitfrage der Rolle/Welt (Dok. 06 §5) – rollenabhängige Rahmung derselben Daten. */}
      <p className="tw-question">{world.leitfrage}</p>

      <div className="tw-empty" role="note">
        <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>
          Mission Control entsteht in einer späteren Phase
        </h2>
        <p style={{ marginTop: 0 }}>
          Hier erscheint die rollenbezogene Morning Mission (S01, Dok. 06 §8): Veränderungen seit dem
          letzten Besuch, wenige wirkungsstarke Entscheidungen und die Wiederaufnahme. Aktuell zeigt
          die Demo bereits den digitalen Zwilling.
        </p>
        <p style={{ marginBottom: 0 }}>
          <Link className="tw-cta" href="/twin">
            Digitalen Zwilling ansehen →
          </Link>
        </p>
      </div>
    </>
  );
}
