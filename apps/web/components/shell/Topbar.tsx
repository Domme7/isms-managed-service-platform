/**
 * Globale Topbar der Shell (WP-011, Dok. 06 §4; Wechsler-Umbau WP-020 Slice 1).
 *
 * Zeigt Betreiber-/Produktidentität, den sichtbaren Kontext (aktive Rolle + Mandant, Dok. 06 P07 /
 * 06-D04) sowie die jederzeit bedienbaren Wechsler und "Abmelden". Der Wechsel erfolgt über
 * native `<select>` (tastatur- und screenreaderfreundlich) – das ist reine Demo-Perspektive,
 * KEINE Autorisierung.
 *
 * MANDANTENWECHSEL IST NICHT MEHR STILL (Dok. 06, Abschnitt „Sichtbarer Kontext", Kasten
 * CROSS-TENANT-SCHUTZ: „Ein Wechsel zwischen Mandanten benötigt eine klare visuelle
 * Kontextänderung."): Die Auswahl im Mandanten-Select wechselt NICHT direkt, sondern meldet nur
 * einen Wechselwunsch (`onRequestTenantSwitch`). Bestätigung und sichtbare Rückmeldung liegen in
 * `AppShell` – das Select zeigt bis zur Bestätigung weiterhin den tatsächlich aktiven Mandanten
 * und behauptet nie einen Kontext, der noch nicht gilt.
 *
 * Der Rollenwechsel bleibt direkt (gleicher Mandant, gleiche Daten – Dok. 06, Abschnitt
 * „Rollenwechsel": sichtbarer Moduswechsel), erhält aber in `AppShell` dieselbe benannte
 * Umschalt-Rückmeldung.
 *
 * Rein präsentational: alle Zustände/Aktionen kommen als Props herein (leicht testbar).
 */
import Link from 'next/link';
import type { DemoRole } from '../../lib/shell/roles';
import type { DemoTenant } from '@isms/demo-seed';
import type { ResolvedSession } from '../../lib/shell/session';

export function Topbar({
  session,
  hydrated,
  roles,
  tenants,
  onSwitchRole,
  onRequestTenantSwitch,
  onSignOut,
  onToggleNav,
  navOpen,
  navControlsId = 'shell-nav',
}: {
  session: ResolvedSession | null;
  hydrated: boolean;
  roles: readonly DemoRole[];
  tenants: readonly DemoTenant[];
  onSwitchRole: (roleId: string) => void;
  /** Meldet einen Wechselwunsch – der eigentliche Wechsel folgt erst nach Bestätigung. */
  onRequestTenantSwitch: (tenantId: string) => void;
  onSignOut: () => void;
  onToggleNav?: () => void;
  navOpen?: boolean;
  navControlsId?: string;
}) {
  return (
    <header className="shell-topbar">
      <div className="shell-topbar-left">
        <button
          type="button"
          className="shell-nav-toggle"
          aria-controls={navControlsId}
          aria-expanded={navOpen}
          onClick={onToggleNav}
        >
          <span aria-hidden="true">☰</span>
          <span className="shell-visually-hidden">Navigation ein-/ausblenden</span>
        </button>
        <Link href="/heute" className="shell-brand">
          <span className="shell-brand-mark" aria-hidden="true">
            ISMS
          </span>
          <span className="shell-brand-name">Managed Service Platform</span>
        </Link>
        <span className="shell-demo-badge" title="Simulierte Anmeldung – keine echte Sicherheit">
          DEMO
        </span>
      </div>

      <div className="shell-topbar-right">
        {!hydrated ? (
          <span className="shell-context-loading" aria-hidden="true">
            …
          </span>
        ) : session ? (
          <>
            <div className="shell-switch">
              <label className="shell-switch-field">
                <span className="shell-switch-label">Rolle</span>
                <select
                  className="shell-select"
                  value={session.role.id}
                  onChange={(e) => onSwitchRole(e.target.value)}
                  aria-label="Aktive Rolle wechseln (Simulation)"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.id} · {role.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="shell-switch-field">
                <span className="shell-switch-label">Mandant</span>
                {/* Kontrolliert über den AKTIVEN Mandanten: bis zur Bestätigung in `AppShell`
                    springt die Anzeige auf den tatsächlichen Kontext zurück – das Select zeigt
                    nie einen Mandanten an, der noch nicht aktiv ist (CROSS-TENANT-SCHUTZ). */}
                <select
                  className="shell-select"
                  value={session.tenant.tenant_id}
                  onChange={(e) => onRequestTenantSwitch(e.target.value)}
                  aria-label="Aktiven Mandanten wechseln (Simulation)"
                >
                  {tenants.map((tenant) => (
                    <option key={tenant.tenant_id} value={tenant.tenant_id}>
                      {tenant.display_name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button type="button" className="shell-signout" onClick={onSignOut}>
              Abmelden
            </button>
          </>
        ) : (
          <Link href="/login" className="shell-signin-link">
            Anmelden (Simulation)
          </Link>
        )}
      </div>
    </header>
  );
}
