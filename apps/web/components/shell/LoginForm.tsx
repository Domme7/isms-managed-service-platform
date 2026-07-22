'use client';

/**
 * Login-Simulation (WP-011): "Als Rolle X bei Mandant Y anmelden" – KEIN Passwort, KEINE echte Auth.
 *
 * Rein präsentational + lokaler Auswahlzustand: die Rollen-/Mandantenliste und `onSubmit` kommen als
 * Props herein (deterministisch testbar ohne Router). Rollen sind nach Erlebniswelt (Dok. 06 §5)
 * gruppiert, damit der Zusammenhang Rolle → Welt sichtbar wird. Es wird nichts über Dok. 03/06
 * hinaus erfunden.
 */
import { useMemo, useState } from 'react';
import type { DemoRole, WorldId } from '../../lib/shell/roles';
import { EXPERIENCE_WORLDS } from '../../lib/shell/roles';
import type { DemoTenant } from '@isms/demo-seed';

export function LoginForm({
  roles,
  tenants,
  defaultRoleId,
  defaultTenantId,
  onSubmit,
}: {
  roles: readonly DemoRole[];
  tenants: readonly DemoTenant[];
  defaultRoleId: string;
  defaultTenantId: string;
  onSubmit: (roleId: string, tenantId: string) => void;
}) {
  const [roleId, setRoleId] = useState(defaultRoleId);
  const [tenantId, setTenantId] = useState(defaultTenantId);

  const selectedRole = roles.find((r) => r.id === roleId) ?? roles[0];
  const selectedTenant = tenants.find((t) => t.tenant_id === tenantId) ?? tenants[0];

  // Rollen je Erlebniswelt (stabile Weltreihenfolge, dann Rollenreihenfolge aus Dok. 03).
  const rolesByWorld = useMemo(() => {
    const worldOrder: readonly WorldId[] = ['executive', 'operations', 'consulting', 'assurance'];
    return worldOrder
      .map((wid) => ({
        world: EXPERIENCE_WORLDS[wid],
        roles: roles.filter((r) => r.worldId === wid),
      }))
      .filter((group) => group.roles.length > 0);
  }, [roles]);

  return (
    <form
      className="login-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(roleId, tenantId);
      }}
    >
      <fieldset className="login-fieldset">
        <legend className="login-legend">Rolle wählen</legend>
        <p className="login-hint">
          Die aktive Rolle bestimmt nur Verdichtung und Startpunkt derselben Daten (Dok. 06 P02),
          nicht Ihre Rechte.
        </p>
        <div className="login-role-groups">
          {rolesByWorld.map((group) => (
            <div key={group.world.id} className="login-role-group">
              <h3 className="login-role-world">{group.world.name}</h3>
              <div className="login-role-options" role="radiogroup" aria-label={group.world.name}>
                {group.roles.map((role) => {
                  const active = role.id === roleId;
                  return (
                    <label
                      key={role.id}
                      className={`login-role-option${active ? ' login-role-option--active' : ''}`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.id}
                        checked={active}
                        onChange={() => setRoleId(role.id)}
                      />
                      <span className="login-role-id">{role.id}</span>
                      <span className="login-role-name">{role.name}</span>
                      <span className="login-role-resp">{role.responsibility}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="login-fieldset">
        <legend className="login-legend">Mandant wählen</legend>
        <label className="login-field">
          <span className="login-field-label">Mandant</span>
          <select
            className="shell-select login-tenant-select"
            value={tenantId}
            onChange={(e) => setTenantId(e.target.value)}
            aria-label="Mandant wählen"
          >
            {tenants.map((tenant) => (
              <option key={tenant.tenant_id} value={tenant.tenant_id}>
                {tenant.display_name}
              </option>
            ))}
          </select>
        </label>
        {selectedTenant ? (
          <p className="login-tenant-desc">{selectedTenant.description}</p>
        ) : null}
      </fieldset>

      <button type="submit" className="login-submit">
        {selectedRole && selectedTenant
          ? `Als ${selectedRole.name} bei ${selectedTenant.display_name} anmelden`
          : 'Anmelden'}
      </button>
    </form>
  );
}
