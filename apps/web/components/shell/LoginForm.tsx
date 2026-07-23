'use client';

/**
 * Login-Simulation (WP-011; Umbau WP-020 Slice 2 nach DR-0009): „Bei Mandant Y anmelden" –
 * KEIN Passwort, KEINE echte Auth, und seit DR-0009 auch KEINE Rollenwahl mehr.
 *
 * EINSTIEGSFLUSS (DR-0009, Owner-Entscheidung; benannte Abweichung von 06-D02 dort
 * dokumentiert): Angemeldet wird nur mit dem Mandanten; der Einstieg ist die neutrale
 * strategische Ebene 1 auf „Heute". Die Rollenwahl lebt IN DER APP (Topbar) und ist optional –
 * kein erzwungener Rundgang (Dok. 04 J01). ZUKUNFTSSICHERHEIT: In einer produktiven Umgebung
 * käme die Rolle aus dem Konto (Dok. 19); die freie Wahl ist eine Demo-Eigenschaft.
 *
 * Rein präsentational + lokaler Auswahlzustand: Mandantenliste und `onSubmit` kommen als Props
 * herein (deterministisch testbar ohne Router).
 */
import { useState } from 'react';
import type { DemoTenant } from '@isms/demo-seed';

export function LoginForm({
  tenants,
  defaultTenantId,
  onSubmit,
}: {
  tenants: readonly DemoTenant[];
  defaultTenantId: string;
  onSubmit: (tenantId: string) => void;
}) {
  const [tenantId, setTenantId] = useState(defaultTenantId);
  const selectedTenant = tenants.find((t) => t.tenant_id === tenantId) ?? tenants[0];

  return (
    <form
      className="login-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(tenantId);
      }}
    >
      <fieldset className="login-fieldset">
        <legend className="login-legend">Mandant wählen</legend>
        <p className="login-hint">
          Angemeldet wird nur mit dem Mandanten. Sie starten auf dem neutralen strategischen
          Einstieg; eine Rolle können Sie danach jederzeit oben in der Leiste wählen und wieder
          abwählen – sie ändert nur Betonung und Reihenfolge derselben Daten, nicht Ihre Rechte.
        </p>
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
        {selectedTenant ? <p className="login-tenant-desc">{selectedTenant.description}</p> : null}
      </fieldset>

      <button type="submit" className="login-submit">
        {selectedTenant ? `Bei ${selectedTenant.display_name} anmelden` : 'Anmelden'}
      </button>
    </form>
  );
}
