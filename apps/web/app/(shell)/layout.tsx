'use client';

/**
 * Layout der Shell-Route-Gruppe `(shell)` (WP-011).
 *
 * Bindet den Client-Context (simulierte Rolle/Mandant) und den aktuellen Pfad an die
 * präsentationale `AppShell` (Topbar + acht Orte + `main`). Die Route-Gruppe verändert die URLs
 * NICHT – enthaltene Seiten (`/heute`, `/twin`, Platzhalter …) bleiben unter ihren Pfaden.
 *
 * KEINE Autorisierung: Rollen-/Mandantenwechsel ist reine Demo-Navigation.
 */
import type { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AppShell } from '../../components/shell/AppShell';
import { useSession } from '../../components/shell/SessionProvider';
import { NAV_PLACES, activePlaceId } from '../../lib/shell/places';
import { DEMO_ROLES } from '../../lib/shell/roles';
import { DEMO_TENANTS } from '@isms/demo-seed';

export default function ShellLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '';
  const router = useRouter();
  const { resolved, session, hydrated, signIn, signOut } = useSession();

  return (
    <AppShell
      places={NAV_PLACES}
      activeId={activePlaceId(pathname)}
      session={resolved}
      hydrated={hydrated}
      roles={DEMO_ROLES}
      tenants={DEMO_TENANTS}
      onSwitchRole={(roleId) => {
        // Rolle wechseln oder abwählen (`null` = neutral, DR-0009); aktiver Mandant bleibt
        // (Fallback: erster Mandant).
        signIn(roleId, session?.tenantId ?? DEMO_TENANTS[0]!.tenant_id);
      }}
      onSwitchTenant={(tenantId) => {
        // Mandant wechseln; eine gewählte Rolle bleibt gewählt, neutral bleibt neutral –
        // der Wechsel erfindet keine Rolle (DR-0009).
        signIn(session?.roleId ?? null, tenantId);
      }}
      onSignOut={() => {
        signOut();
        router.push('/login');
      }}
    >
      {children}
    </AppShell>
  );
}
