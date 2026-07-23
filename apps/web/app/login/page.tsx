'use client';

/**
 * `/login` – Login-Simulation (WP-011; Umbau WP-020 Slice 2 nach DR-0009).
 *
 * KEIN Passwort, KEINE echte Authentisierung/Autorisierung (`.claude/rules/security.md`, Dok. 19).
 * Der Nutzer wählt NUR den Mandanten (DR-0009: „Anmelden nur mit Mandant"); die Auswahl wird im
 * Client-Context (localStorage) gespeichert und danach in die neutrale Ebene 1 (`/heute`)
 * geführt. Die Rollenwahl lebt in der App (Topbar) und ist optional.
 *
 * BEWUSSTE ENTSCHEIDUNG (reversibel, im Fluss von DR-0009 begründet): Die Anmeldung startet
 * IMMER neutral – auch wenn vorher eine Rolle gewählt war. „Mandant zuerst, Rolle in der App"
 * gilt für jeden Anmeldevorgang; eine still übernommene Alt-Rolle wäre ein unangekündigter
 * Modus. Eine BESTEHENDE Sitzung wird davon nicht berührt (nur der Submit schreibt).
 *
 * Eigene, schlichte Seitenstruktur (außerhalb der Shell-Gruppe) mit eigenem `main` + Skip-Link.
 */
import { useRouter } from 'next/navigation';
import { LoginForm } from '../../components/shell/LoginForm';
import { useSession } from '../../components/shell/SessionProvider';
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
          <h1>Anmelden</h1>

          {/* DIE EINE STELLE, an der die Reichweite der Auswahl ehrlich benannt wird
              (WP-028 Slice 4). Vorher stand hier der Demo-Disclaimer („simulierte Anmeldung,
              keine echte Sicherheit", „synthetisches Datenmodell") und zusätzlich ein
              Demo-Banner auf JEDER Seite – beides ist mit DR-0011 entfallen.
              WAS BLEIBT, IST DIE SACHAUSSAGE, nicht die Demo-Kennzeichnung: Rolle und Mandant
              sind eine Ansicht auf denselben Datenbestand, keine durchgesetzte Zugriffsgrenze.
              Formuliert als Sach-Lücke („noch nicht angebunden"), nicht als Entschuldigung, und
              bewusst NUR HIER – nicht auf jeder Seite (DR-0013 Nr. 12). Die geprüfte Anmeldung
              mit getrennten Identitäten ist ein eigenes Vorhaben (Dok. 19). */}
          <div className="login-notice" role="note">
            <strong>Rolle und Mandant sind eine Ansicht, keine Berechtigung.</strong> Die Auswahl
            steuert Darstellung und Reihenfolge derselben Daten. Ein Passwort und eine geprüfte,
            serverseitig durchgesetzte Zugriffskontrolle sind hier noch nicht angebunden.
          </div>

          <LoginForm
            tenants={DEMO_TENANTS}
            defaultTenantId={initial.tenantId}
            onSubmit={(tenantId) => {
              // Neutraler Einstieg (DR-0009): keine Rolle beim Anmelden – Wahl in der App.
              signIn(null, tenantId);
              router.push('/heute');
            }}
          />
        </div>
      </main>
    </>
  );
}
