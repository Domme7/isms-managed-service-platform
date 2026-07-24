/**
 * Globale Topbar der Shell (WP-011, Dok. 06 §4; Wechsler-Umbau WP-020 Slice 1;
 * Ehrlichkeits- und Sphären-Umbau WP-028 Slice 4).
 *
 * Zeigt Produktidentität, den sichtbaren Kontext (aktive Rolle + Mandant, Dok. 06, Abschnitt
 * „Sichtbarer Kontext") sowie die jederzeit bedienbaren Ansichts-Umschalter.
 *
 * WP-028 SLICE 4 – DIE KOPFLEISTE SAGT, WAS SIE TUT (DR-0013 Nr. 12):
 *  1. **„Ansicht: Rolle / Mandant"** statt zweier nackter Auswahlfelder. Die beiden Felder
 *     steuern Darstellung und Reihenfolge, nicht Berechtigungen – die Beschriftung sagt das
 *     jetzt selbst, statt es einem Beipackzettel zu überlassen.
 *  2. **„Ansicht zurücksetzen"** statt „Abmelden". Es gibt keine Anmeldung, die man beenden
 *     könnte; der Knopf verwirft die gewählte Ansicht. Ein „Abmelden" hätte eine Sicherheit
 *     behauptet, die hier nicht existiert.
 *  3. **Keine Rollencodes im sichtbaren Text.** „R01 · Executive Sponsor" → „Executive Sponsor"
 *     (DR-0013 Nr. 2: kein internes Vokabular im UI). Der Code bleibt unverändert im
 *     Datenmodell (`DemoRole.id`) und trägt weiterhin `key`/`value` der Auswahl – er ist
 *     Kennung, kein Anzeigetext.
 *  4. **Kein Demo-Abzeichen, kein Demo-Titel** (DR-0011): der frühere „DEMO"-Chip mit dem
 *     Titel „Simulierte Anmeldung – keine echte Sicherheit" ist ersatzlos entfallen.
 *
 * SPHÄRE AN ROLLE GEKOPPELT (DR-0013 Nr. 11 / DR-0012, `lib/shell/sphaere.ts`): In der
 * Ein-Unternehmens-Sicht (Kundenrollen und Auditor) wird der Mandant NICHT als Auswahl
 * angeboten. Er bleibt trotzdem sichtbar – der aktive Mandant ist Pflichtangabe des sichtbaren
 * Kontexts (Dok. 06). Es wird dabei keine Aussage über andere Mandanten getroffen.
 *
 * MANDANTENWECHSEL IST NICHT STILL (Dok. 06, Abschnitt „Sichtbarer Kontext", Kasten
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
 * ROLLENWAHL IN DER APP (WP-020 Slice 2, DR-0009): Der Rollen-Wechsler führt zusätzlich den
 * NEUTRALEN Zustand („ohne Rolle") – Wahl UND Abwahl sind jederzeit möglich.
 * ZUKUNFTSSICHERHEIT: In einer produktiven Umgebung käme die Rolle aus dem Konto (Dok. 19);
 * die freie Wahl inklusive „ohne Rolle" ist eine Eigenschaft dieses Aufbaustands. Der
 * Pflicht-Anker O-WP020-04 („Kritische Aktionen speichern die aktive Rolle mit") lebt
 * unverändert in `AppShell`.
 *
 * Rein präsentational: alle Zustände/Aktionen kommen als Props herein (leicht testbar).
 */
import Link from 'next/link';
import type { DemoRole } from '../../lib/shell/roles';
import type { DemoTenant } from '@isms/demo-seed';
import type { ResolvedSession } from '../../lib/shell/session';
import { ANSICHT_NICHT_BERECHTIGUNG_SATZ, mandantenwechselSichtbar } from '../../lib/shell/sphaere';

/** Select-Wert des neutralen Zustands (kein Rollen-ID-Namensraum: R01–R12 bleiben frei). */
const NEUTRAL_VALUE = '';

/** Sichtbarer Name des neutralen Zustands – ohne Rollencode, wie alle Rollennamen. */
export const NEUTRAL_ROLLEN_OPTION = 'ohne Rolle';

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
  tenantSelectId,
}: {
  session: ResolvedSession | null;
  hydrated: boolean;
  roles: readonly DemoRole[];
  tenants: readonly DemoTenant[];
  /** `null` = Rolle abwählen (neutraler Zustand, DR-0009). */
  onSwitchRole: (roleId: string | null) => void;
  /** Meldet einen Wechselwunsch – der eigentliche Wechsel folgt erst nach Bestätigung. */
  onRequestTenantSwitch: (tenantId: string) => void;
  /** Verwirft die gewählte Ansicht (Rolle + Mandant) – es gibt keine Anmeldung zu beenden. */
  onSignOut: () => void;
  onToggleNav?: () => void;
  navOpen?: boolean;
  navControlsId?: string;
  /** Optionale DOM-ID des Mandanten-Selects (Fokus-Rückführung nach „Abbrechen", Code F5). */
  tenantSelectId?: string;
}) {
  // Sphärengerecht: in der Ein-Unternehmens-Sicht ist der Mandant Kontext, keine Auswahl.
  const mandantWaehlbar = session ? mandantenwechselSichtbar(session.role) : true;

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
      </div>

      <div className="shell-topbar-right">
        {!hydrated ? (
          <span className="shell-context-loading" aria-hidden="true">
            …
          </span>
        ) : session ? (
          <>
            {/* Eine benannte Gruppe statt zweier zusammenhangloser Felder: die Beschriftung
                sagt, dass hier die ANSICHT gesteuert wird (DR-0013 Nr. 12). */}
            {/* biome-ignore lint/a11y/useSemanticElements: `role="group"` + `aria-label` auf einem `div` ist gültiges ARIA für diese Kopfzeilen-Gruppe; `fieldset` verlangt eine `legend` und ist für Formular-Abschnitte gedacht – hier steuern die Felder eine Ansicht, es gibt kein Formular und kein Submit. Dokumentiertes Bestandsmuster (`AppShell`, `od-context`). */}
            <div className="shell-switch" role="group" aria-label="Ansicht: Rolle und Mandant">
              <span className="shell-switch-title" aria-hidden="true">
                Ansicht:
              </span>
              <label className="shell-switch-field">
                <span className="shell-switch-label">Rolle</span>
                <select
                  className="shell-select"
                  value={session.role?.id ?? NEUTRAL_VALUE}
                  onChange={(e) =>
                    onSwitchRole(e.target.value === NEUTRAL_VALUE ? null : e.target.value)
                  }
                  aria-label="Ansicht: Rolle"
                >
                  {/* Neutral steht ZUERST: es ist der Einstiegszustand (DR-0009), keine
                      dreizehnte Rolle. Wahl und Abwahl sind jederzeit möglich. */}
                  <option value={NEUTRAL_VALUE}>{NEUTRAL_ROLLEN_OPTION}</option>
                  {roles.map((role) => (
                    /* `value` trägt die Rollen-ID (Kennung), der sichtbare Text nur den
                       Namen – kein Rollencode im UI (DR-0013 Nr. 12). */
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </label>
              {mandantWaehlbar ? (
                <label className="shell-switch-field">
                  <span className="shell-switch-label">Mandant</span>
                  {/* Kontrolliert über den AKTIVEN Mandanten: bis zur Bestätigung in `AppShell`
                      springt die Anzeige auf den tatsächlichen Kontext zurück – das Select zeigt
                      nie einen Mandanten an, der noch nicht aktiv ist (CROSS-TENANT-SCHUTZ). */}
                  <select
                    className="shell-select"
                    id={tenantSelectId}
                    value={session.tenant.tenant_id}
                    onChange={(e) => onRequestTenantSwitch(e.target.value)}
                    aria-label="Ansicht: Mandant"
                  >
                    {tenants.map((tenant) => (
                      <option key={tenant.tenant_id} value={tenant.tenant_id}>
                        {tenant.display_name}
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                /* Ein-Unternehmens-Sicht: der aktive Mandant bleibt sichtbarer Pflichtkontext
                   (Dok. 06), wird aber nicht zur Auswahl gestellt. Bewusst KEINE Aussage über
                   andere Mandanten – weder ihre Zahl noch ihre Existenz. */
                /* Native Definitionsliste statt ARIA-Verdrahtung: Beschriftung und Wert sind
                   ohne Attribute verbunden (Muster der Kontextleiste `od-context`). */
                /* RUHIGE ZEILE STATT NONVERBALER BEHAUPTUNG (WP-028-Fixpass, Security-Auflage):
                   Ein Auswahlfeld, das ohne ein Wort verschwindet, liest sich wie eine
                   DURCHGESETZTE Grenze. Das wäre eine Sicherheitsbehauptung, die dieser
                   Aufbaustand nicht einlösen kann – serverseitig durchgesetzte Rechte entstehen
                   erst mit Dok. 19 (`.claude/rules/security.md`, FINDING-0004). Die Zeile sagt
                   deshalb, was wahr ist: Die gewählte Sicht bestimmt die ANSICHT, nicht die
                   Berechtigung. Sie sagt bewusst NICHTS über andere Mandanten – weder ihre Zahl
                   noch ihre Existenz, auch nicht negativ (Mandantengrenze). */
                <dl className="shell-switch-field shell-switch-field--fest">
                  <dt className="shell-switch-label">Mandant</dt>
                  <dd className="shell-switch-value">{session.tenant.display_name}</dd>
                  {/* Ansicht-≠-Berechtigung aus EINER Quelle (Nachfix nach Gate-Runde 2): derselbe
                      Satz stand bis hierher in zwei Wortlauten (hier + `EigenerMandantEinstieg`)
                      und ohne Wächter. Jetzt `ANSICHT_NICHT_BERECHTIGUNG_SATZ` aus `sphaere.ts`,
                      per `rollenreichweite.test.tsx` an beiden Stellen geprüft. */}
                  <dd className="shell-switch-note">{ANSICHT_NICHT_BERECHTIGUNG_SATZ}</dd>
                </dl>
              )}
            </div>
            <button type="button" className="shell-signout" onClick={onSignOut}>
              Ansicht zurücksetzen
            </button>
          </>
        ) : (
          <Link href="/login" className="shell-signin-link">
            Mandant wählen
          </Link>
        )}
      </div>
    </header>
  );
}
