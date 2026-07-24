'use client';

/**
 * Struktur-Assistent (`/kunden/struktur`, WP-006 Slice 3) – session-gebundener Rahmen.
 *
 * Sitzungs-/Zustandsrahmen analog `KundenStartView`: Loading (vor Hydration), „nicht angemeldet"
 * mit Verweis zur Anmeldung, sonst die geführte Read-Ansicht für aktive Rolle + Mandant. Der
 * Assistent ERFASST NICHTS (kein Eingabefeld, kein neuer localStorage-Schlüssel); Rolle/Mandant
 * dienen ausschließlich der Kontextleiste. KEINE Authz (`.claude/rules/frontend.md`).
 *
 * NEUTRAL-FÄHIG (DR-0009): ohne gewählte Rolle rendert der Assistent vollständig (`role={null}`).
 */
import Link from 'next/link';
import { useSession } from '../shell/SessionProvider';
import { StrukturAssistentContent } from './StrukturAssistentContent';

export function StrukturAssistentView() {
  const { resolved, hydrated } = useSession();

  if (!hydrated) {
    return (
      <>
        <p className="tw-eyebrow">Kunden · Struktur-Assistent</p>
        <h1>Struktur-Assistent</h1>
        <p className="tw-muted">Lade Kontext …</p>
      </>
    );
  }

  if (!resolved) {
    return (
      <>
        <p className="tw-eyebrow">Kunden · Struktur-Assistent</p>
        <h1>Struktur-Assistent</h1>
        <div className="tw-empty" role="note">
          <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>Nicht angemeldet</h2>
          <p style={{ marginTop: 0 }}>
            Es ist kein Mandant gewählt. Melden Sie sich an, um den Struktur-Assistenten im Kontext
            des aktiven Mandanten zu sehen. Der Assistent erklärt die Aufbau-Struktur des Konzepts
            und erfasst nichts.
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

  return <StrukturAssistentContent role={resolved.role} tenant={resolved.tenant} />;
}
