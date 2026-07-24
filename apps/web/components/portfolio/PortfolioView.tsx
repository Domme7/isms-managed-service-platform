/**
 * Session-Rahmen des Berater-Portfolios (DR-0017 Stage 1).
 *
 * Löst die aktive Rolle aus der Sitzung auf und rendert `PortfolioContent`. Die
 * **Sphärengrenze** (DR-0012) wird hier durchgesetzt: nur die Portfolio-Sicht (Berater/Betreiber
 * bzw. neutral, `kundenSicht === 'portfolio'`) sieht das Portfolio; ein Kunde-Profil wird auf sein
 * eigenes Cockpit geführt (es soll nur sich selbst sehen).
 *
 * Eintauchen: Klick auf einen Kunden setzt ihn als aktiven Mandanten (`signIn`) und navigiert ins
 * Cockpit — exakt der Fluss aus `login/page.tsx`. So bleibt das Cockpit das eine Dive-Ziel.
 */
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { kundenSicht } from '../../lib/shell/sphaere';
import { useSession } from '../shell/SessionProvider';
import { PortfolioContent } from './PortfolioContent';

function Rahmen({ children }: { children: React.ReactNode }) {
  return (
    <main className="pf-standalone">
      <p className="pf-lade">{children}</p>
    </main>
  );
}

export function PortfolioView() {
  const router = useRouter();
  const { resolved, hydrated, session, signIn } = useSession();

  const istKunde = hydrated && resolved !== null && kundenSicht(resolved.role) !== 'portfolio';

  // Kunde-Profil: kein Portfolio — sanft ins eigene Cockpit umleiten (Sphärengrenze, DR-0012).
  useEffect(() => {
    if (istKunde) router.replace('/cockpit');
  }, [istKunde, router]);

  if (!hydrated) return <Rahmen>Lade Portfolio…</Rahmen>;
  if (!resolved)
    return (
      <Rahmen>
        Kein Zugang gewählt. <Link href="/login">Zur Anmeldung →</Link>
      </Rahmen>
    );
  if (istKunde)
    return (
      <Rahmen>
        Diese Ansicht ist der Portfolio-Sicht vorbehalten.{' '}
        <Link href="/cockpit">Zu Ihrem Cockpit →</Link>
      </Rahmen>
    );

  const eintauchen = (tenantId: string) => {
    signIn(session?.roleId ?? null, tenantId);
    router.push('/cockpit');
  };

  return <PortfolioContent role={resolved.role} onDive={eintauchen} />;
}
