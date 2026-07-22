'use client';

/**
 * `/login` – Login-Simulation (WP-011).
 *
 * KEIN Passwort, KEINE echte Authentisierung/Autorisierung (`.claude/rules/security.md`, Dok. 19).
 * Der Nutzer wählt "als Rolle X bei Mandant Y anmelden"; die Auswahl wird im Client-Context
 * (localStorage) gespeichert und danach in die Shell (`/heute`) geführt.
 *
 * Eigene, schlichte Seitenstruktur (außerhalb der Shell-Gruppe) mit eigenem `main` + Skip-Link.
 */
import { useRouter } from 'next/navigation';
import { LoginForm } from '../../components/shell/LoginForm';
import { useSession } from '../../components/shell/SessionProvider';
import { DEMO_ROLES } from '../../lib/shell/roles';
import { defaultSession } from '../../lib/shell/session';
import { DEMO_TENANTS } from '@isms/demo-seed';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, session } = useSession();

  const initial = session ?? defaultSession();

  return (
    <>
      <a className="tw-skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <main id="inhalt" className="login-page">
        <div className="login-card">
          <p className="tw-eyebrow">ISMS Managed Service Platform</p>
          <h1>Anmelden – Simulation</h1>

          <div className="login-demo-notice" role="note">
            <strong>Demo — simulierte Rolle/Anmeldung, keine echte Sicherheit.</strong> Es gibt kein
            Passwort und keine Zugriffskontrolle. Die Auswahl bestimmt nur die Perspektive auf ein
            gemeinsames, synthetisches Datenmodell. Echte Authentisierung und serverseitige
            Mandantentrennung folgen in einem späteren Work Package (Dok. 19).
          </div>

          <LoginForm
            roles={DEMO_ROLES}
            tenants={DEMO_TENANTS}
            defaultRoleId={initial.roleId}
            defaultTenantId={initial.tenantId}
            onSubmit={(roleId, tenantId) => {
              signIn(roleId, tenantId);
              router.push('/heute');
            }}
          />
        </div>
      </main>
    </>
  );
}
