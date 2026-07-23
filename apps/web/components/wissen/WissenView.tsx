'use client';

/**
 * Ort „Wissen" – session-gebundener Rahmen (WP-032 Slice 3, read-only).
 *
 * Zustandsrahmen analog `ReportsView`/`AdministrationView` (`.claude/rules/frontend.md`:
 * Loading, Empty, Error): Ladezustand vor der Hydration, „nicht angemeldet" mit Verweis zur
 * Anmeldung, sonst der Glossar mit sichtbarem Kontext.
 *
 * WARUM AUCH HIER EINE SESSION NÖTIG IST, OBWOHL DER INHALT MANDANTENUNABHÄNGIG IST: Die
 * Kontextleiste ist auf jeder Hauptseite Pflicht (Dok. 06 „Sichtbarer Kontext"), damit niemand
 * den aktiven Mandanten aus dem Blick verliert. Der Glossar selbst würde ohne Session
 * funktionieren – er zeigt für alle dasselbe.
 *
 * NEUTRAL-FÄHIG (DR-0009): ohne gewählte Rolle rendert der Inhalt vollständig (`role={null}`).
 */
import Link from 'next/link';
import { useSession } from '../shell/SessionProvider';
import { WissenContent } from './WissenContent';

export function WissenView() {
  const { resolved, hydrated } = useSession();

  if (!hydrated) {
    return (
      <>
        <p className="tw-eyebrow">Wissen · Glossar</p>
        <h1>Wissen</h1>
        <p className="tw-muted">Lade Kontext …</p>
      </>
    );
  }

  if (!resolved) {
    return (
      <>
        <p className="tw-eyebrow">Wissen · Glossar</p>
        <h1>Wissen</h1>
        <div className="tw-empty" role="note">
          <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>Nicht angemeldet</h2>
          <p style={{ marginTop: 0 }}>
            Es ist kein Mandant gewählt. Melden Sie sich an, um den Glossar mit sichtbarem Kontext
            zu öffnen.
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

  return <WissenContent role={resolved.role} tenant={resolved.tenant} />;
}
