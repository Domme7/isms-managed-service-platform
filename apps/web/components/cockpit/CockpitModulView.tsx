'use client';

/**
 * „Cockpit" – EIGENSTÄNDIGES, full-screen modulares Dashboard (WP-034 Slice 4, DR-0017).
 *
 * Das Cockpit lebt bewusst OHNE Shell-Chrome (kein Sidebar-Reiter) – es bringt seinen eigenen,
 * schlanken Rahmen mit: den Mandant-Wechsler im Kopf (statt der Shell-Topbar) und die acht
 * Bereiche als Kacheln zum Tieferklicken (in `CockpitModulContent`). Navigation läuft nur über
 * Eintauchen (DR-0017). Der Inhalt liegt in `CockpitModulContent` und ist ohne Session-Mock testbar.
 */
import Link from 'next/link';
import { DEMO_TENANTS } from '@isms/demo-seed';
import { useSession } from '../shell/SessionProvider';
import { CockpitModulContent } from './CockpitModulContent';

function Rahmen({ children }: { children: React.ReactNode }) {
  return <main className="ck-standalone">{children}</main>;
}

export function CockpitModulView() {
  const { resolved, session, hydrated, signIn } = useSession();

  if (!hydrated) {
    return (
      <Rahmen>
        <div className="ck-cockpit" data-ck-theme="hell">
          <p className="tw-eyebrow">Cockpit</p>
          <h1>Cockpit</h1>
          <p className="tw-muted">Lade Kontext …</p>
        </div>
      </Rahmen>
    );
  }

  if (!resolved) {
    return (
      <Rahmen>
        <div className="ck-cockpit" data-ck-theme="hell">
          <p className="tw-eyebrow">Cockpit</p>
          <h1>Cockpit</h1>
          <div className="tw-empty" role="note">
            <h2 style={{ marginTop: 0, border: 'none', padding: 0 }}>Kein Mandant gewählt</h2>
            <p style={{ marginTop: 0 }}>
              Es ist kein Mandant gewählt. Wählen Sie einen Mandanten, um das Cockpit zu öffnen.
            </p>
            <p style={{ marginBottom: 0 }}>
              <Link className="tw-cta" href="/login">
                Zur Anmeldung →
              </Link>
            </p>
          </div>
        </div>
      </Rahmen>
    );
  }

  // Mandant-Wechsler (ersetzt die Shell-Topbar): eigenständig, im Cockpit-Kopf, themengerecht.
  const mandantWechsler = (
    <label className="ck-mandant">
      <span className="ck-mandant-label">Mandant</span>
      <select
        className="ck-mandant-select"
        value={session?.tenantId ?? resolved.tenant.tenant_id}
        onChange={(e) => signIn(session?.roleId ?? null, e.target.value)}
      >
        {DEMO_TENANTS.map((t) => (
          <option key={t.tenant_id} value={t.tenant_id}>
            {t.display_name}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <Rahmen>
      <CockpitModulContent
        role={resolved.role}
        tenant={resolved.tenant}
        kopfZusatz={mandantWechsler}
      />
    </Rahmen>
  );
}
