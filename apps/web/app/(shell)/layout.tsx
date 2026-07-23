'use client';

/**
 * Layout der Shell-Route-Gruppe `(shell)` (WP-011).
 *
 * Bindet den Client-Context (gewählte Rolle/Mandant) und den aktuellen Pfad an die
 * präsentationale `AppShell` (Topbar + acht Orte + `main`). Die Route-Gruppe verändert die URLs
 * NICHT – enthaltene Seiten (`/heute`, `/twin` …) bleiben unter ihren Pfaden.
 *
 * SPHÄRENGERECHTES ZIEL DES ORTES „KUNDEN" (WP-028 Slice 4, DR-0013 Nr. 11): Die
 * NAVIGATIONSSTRUKTUR bleibt unverändert (06-D01: acht stabile Orte, gleiche Labels, gleiche
 * Reihenfolge) – nur das Ziel des Ortes „Kunden" folgt der Sphäre der aktiven Rolle, genau wie
 * Dok. 06 es vorsieht („Für Kundenrollen ggf. direkt der eigene Workspace"). Regel und Belege:
 * `lib/shell/sphaere.ts`.
 *
 * KEINE Autorisierung: Rollen-/Mandantenwahl ist Perspektive, keine Zugriffsgrenze.
 */
import type { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AppShell } from '../../components/shell/AppShell';
import { useSession } from '../../components/shell/SessionProvider';
import { NAV_PLACES, activePlaceId } from '../../lib/shell/places';
import { DEMO_ROLES } from '../../lib/shell/roles';
import { orteFuerRolle } from '../../lib/shell/sphaere';
import { DEMO_TENANTS } from '@isms/demo-seed';

export default function ShellLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '';
  const router = useRouter();
  const { resolved, session, hydrated, signIn, signOut } = useSession();

  return (
    <AppShell
      places={orteFuerRolle(NAV_PLACES, resolved?.role ?? null)}
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
