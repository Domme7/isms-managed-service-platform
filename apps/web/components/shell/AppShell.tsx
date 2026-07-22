'use client';

/**
 * Zusammengesetzte App-Shell (WP-011): Skip-Link, Topbar, sichtbarer Demo-Hinweis, Seitennavigation
 * der acht Orte und `main`-Landmark (Dok. 06 §4, `.claude/rules/frontend.md`).
 *
 * Präsentational bis auf den lokalen Zustand des mobilen Menüs (Nav bleibt stets im DOM und wird
 * nur per CSS/`data-open` ein-/ausgeblendet – gut für Tastatur und Tests). Alle Sitzungsdaten und
 * Aktionen kommen als Props aus dem Shell-Layout (das den Client-Context anbindet).
 */
import { useState } from 'react';
import type { ReactNode } from 'react';
import { ShellNav } from './ShellNav';
import { Topbar } from './Topbar';
import type { NavPlace, PlaceId } from '../../lib/shell/places';
import type { DemoRole } from '../../lib/shell/roles';
import type { DemoTenant } from '@isms/demo-seed';
import type { ResolvedSession } from '../../lib/shell/session';

export function AppShell({
  places,
  activeId,
  session,
  hydrated,
  roles,
  tenants,
  onSwitchRole,
  onSwitchTenant,
  onSignOut,
  children,
}: {
  places: readonly NavPlace[];
  activeId?: PlaceId;
  session: ResolvedSession | null;
  hydrated: boolean;
  roles: readonly DemoRole[];
  tenants: readonly DemoTenant[];
  onSwitchRole: (roleId: string) => void;
  onSwitchTenant: (tenantId: string) => void;
  onSignOut: () => void;
  children: ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);
  const navId = 'shell-nav';

  return (
    <div className="shell">
      <a className="tw-skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>

      <Topbar
        session={session}
        hydrated={hydrated}
        roles={roles}
        tenants={tenants}
        onSwitchRole={onSwitchRole}
        onSwitchTenant={onSwitchTenant}
        onSignOut={onSignOut}
        onToggleNav={() => setNavOpen((open) => !open)}
        navOpen={navOpen}
        navControlsId={navId}
      />

      {/* Sichtbarer, permanenter Demo-Hinweis (Dok. 06 §20 „Demo-Kennzeichnung sichtbar"). */}
      <div className="shell-demo-banner" role="note">
        <strong>Demo-Simulation.</strong> Rolle und Mandant sind frei wählbar und stellen KEINE
        echte Anmeldung, Autorisierung oder Sicherheitsgrenze dar. Alle Daten sind synthetisch.
      </div>

      <div className="shell-body" data-nav-open={navOpen ? 'true' : 'false'}>
        <ShellNav
          places={places}
          activeId={activeId}
          id={navId}
          onNavigate={() => setNavOpen(false)}
        />
        <main id="inhalt" className="shell-main">
          <div className="tw-container">{children}</div>
        </main>
      </div>
    </div>
  );
}
