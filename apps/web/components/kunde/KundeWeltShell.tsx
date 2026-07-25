'use client';

/**
 * Rahmen der Kunde-Welt (DR-0018 Stufe 3): schlanke Kopf-Navigation mit den drei Orten
 * (Mein Dashboard · Meine Ablage · Services buchen), dem aktiven Mandanten als Kontext und einem
 * ruhigen Ausstieg. KEIN Mandantenwechsler (Sphärengrenze DR-0012: der Kunde arbeitet in genau
 * seinem Unternehmen) – der aktive Mandant bleibt sichtbarer Pflichtkontext (Dok. 06), wird aber
 * nicht als Auswahl angeboten.
 *
 * Eigenständige Welt ohne Berater-Shell-Chrome (eigene Route-Gruppe `(kunde)`). Der Zugang wird
 * über den Login gesetzt; wer ohne Auswahl hierher kommt, wird ruhig zur Anmeldung geführt.
 */
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import { useSession } from '../shell/SessionProvider';
import { KUNDE_WELT_ORTE, aktiverKundeWeltOrt } from '../../lib/kunde/welt';

export function KundeWeltShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '';
  const router = useRouter();
  const { resolved, hydrated, signOut } = useSession();

  const aktiv = aktiverKundeWeltOrt(pathname);

  if (!hydrated) {
    return (
      <main className="kw-standalone">
        <p className="tw-muted">Lade Ihren Bereich …</p>
      </main>
    );
  }

  if (!resolved) {
    return (
      <main className="kw-standalone">
        <div className="tw-empty" role="note">
          <p>Kein Zugang gewählt.</p>
          <p>
            <Link className="tw-cta" href="/login?welt=kunde">
              Zur Anmeldung →
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="kw-standalone">
      <div className="kw-shell" data-ck-theme="hell">
        <header className="kw-topbar">
          <div className="kw-brand">
            <span className="tw-eyebrow">Kundenbereich</span>
            <strong className="kw-mandant-name">{resolved.tenant.display_name}</strong>
          </div>
          <nav className="kw-nav" aria-label="Kundenbereich">
            {KUNDE_WELT_ORTE.map((ort) => (
              <Link
                key={ort.id}
                href={ort.href}
                className={`kw-nav-link${aktiv === ort.id ? ' kw-nav-link--aktiv' : ''}`}
                aria-current={aktiv === ort.id ? 'page' : undefined}
              >
                {ort.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="kw-abmelden"
            onClick={() => {
              signOut();
              router.push('/login');
            }}
          >
            Abmelden
          </button>
        </header>
        <div className="kw-inhalt">{children}</div>
      </div>
    </main>
  );
}
