'use client';

/**
 * `/login` – Anmeldung mit GETRENNTEN Welten (WP-011; DR-0009; getrennte Welten DR-0015 Nr. 7).
 *
 * KEIN Passwort, KEINE echte Authentisierung/Autorisierung (`.claude/rules/security.md`, Dok. 19).
 *
 * ZWEI GETRENNTE EINSTIEGE (DR-0015 Nr. 7 / DR-0012 A): „Kunde" und „Berater" sind sichtbar
 * getrennt (`LoginWelten`). Die Auswahl setzt Rolle und Mandant der jeweiligen Sphäre und führt
 * ins Cockpit – eine ABSICHTSVOLLE Nutzerwahl, kein still übernommener Modus. Noch simuliert,
 * als „beschriftete Vorschau" gekennzeichnet (nicht „Demo/Simulation", DR-0011). Die echte,
 * föderierte Trennung ist ein eigenes Vorhaben (WP-030, Dok. 19).
 *
 * DER NEUTRALE EINSTIEG BLEIBT (DR-0009): „nur Mandant, Rolle in der App" ist als ausdrückliche
 * dritte Option erhalten (`LoginForm` im Aufklapper) – wer keine Sphäre vorwählen will, startet
 * neutral in die strategische Ebene 1. Beide Wege schreiben dieselbe Client-Auswahl
 * (localStorage) und führen ins Cockpit (Startseite, DR-0010 Nr. 3).
 *
 * Eigene, schlichte Seitenstruktur (außerhalb der Shell-Gruppe) mit eigenem `main` + Skip-Link.
 */
import { useRouter } from 'next/navigation';
import { LoginForm } from '../../components/shell/LoginForm';
import { LoginWelten } from '../../components/shell/LoginWelten';
import { useSession } from '../../components/shell/SessionProvider';
import { defaultSession } from '../../lib/shell/session';
import { DEMO_TENANTS } from '@isms/demo-seed';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, session } = useSession();

  const initial = session ?? defaultSession();

  // Beide Wege enden im Cockpit (Startseite, DR-0010 Nr. 3). Eine bestehende Sitzung wird nur
  // durch den Submit überschrieben (nicht beim bloßen Öffnen der Seite).
  const eintreten = (roleId: string | null, tenantId: string) => {
    signIn(roleId, tenantId);
    router.push('/cockpit');
  };

  return (
    <>
      <a className="tw-skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <main id="inhalt" className="login-page">
        <div className="login-card">
          <p className="tw-eyebrow">ISMS Managed Service Platform</p>
          <h1>Anmelden</h1>

          {/* DIE EINE STELLE, an der die Reichweite der Auswahl ehrlich benannt wird (DR-0013
              Nr. 12): keine Demo-Kennzeichnung, aber die Sachaussage bleibt. „Ansicht, keine
              Berechtigung" und „noch nicht angebunden" werden von `shell.test.tsx` festgenagelt. */}
          <div className="login-notice" role="note">
            <strong>Berater und Kunde sind getrennte Einstiege in dieselbe Plattform</strong> – hier
            als beschriftete Vorschau ohne echtes Konto. Rolle und Mandant sind eine Ansicht, keine
            Berechtigung: Die Auswahl steuert Darstellung und Reihenfolge derselben Daten. Ein
            Passwort und eine geprüfte, serverseitig durchgesetzte Zugriffskontrolle sind hier noch
            nicht angebunden.
          </div>

          <LoginWelten
            tenants={DEMO_TENANTS}
            defaultTenantId={initial.tenantId}
            onEnter={(roleId, tenantId) => eintreten(roleId, tenantId)}
          />

          {/* NEUTRALER EINSTIEG (DR-0009) als ausdrückliche dritte Option, ruhig aufklappbar. */}
          <details className="login-neutral">
            <summary className="login-neutral-summary">
              Lieber ohne Rolle starten? Nur einen Mandanten wählen.
            </summary>
            <LoginForm
              tenants={DEMO_TENANTS}
              defaultTenantId={initial.tenantId}
              onSubmit={(tenantId) => eintreten(null, tenantId)}
            />
          </details>
        </div>
      </main>
    </>
  );
}
