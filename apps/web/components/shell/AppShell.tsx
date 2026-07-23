'use client';

/**
 * Zusammengesetzte App-Shell (WP-011): Skip-Link, Topbar, sichtbarer Demo-Hinweis, Seitennavigation
 * der acht Orte und `main`-Landmark (Dok. 06 §4, `.claude/rules/frontend.md`).
 *
 * WP-020 Slice 1 – MANDANTENWECHSEL UND ROLLENWECHSEL SIND ANGEKÜNDIGTE KONTEXTÄNDERUNGEN.
 * QUELLE (Regel Null, am PDF gegengelesen): Dok. 06, Abschnitt „Sichtbarer Kontext", Kasten
 * CROSS-TENANT-SCHUTZ: „Ein Wechsel zwischen Mandanten benötigt eine klare visuelle
 * Kontextänderung. Entwürfe, Uploads und Freigaben dürfen nicht still in einen anderen Mandanten
 * übernommen werden." – und Abschnitt „Bewusst vermiedene Muster": „Rollenwechsel oder
 * Mandantenwechsel ohne sichtbaren Kontext." Globales Akzeptanzkriterium: „Cross-Tenant-
 * Fehlaktionen werden visuell und technisch verhindert."
 *
 * Umsetzung (minimal begonnen, DR-0003-Lektion; Text + Form, nie nur Farbe – 06-D11):
 *  - Mandantenwechsel: Die Auswahl im Topbar-Select löst KEINEN Wechsel aus, sondern öffnet
 *    einen Bestätigungsschritt, der alten UND neuen Mandanten benennt. Erst „Zu … wechseln"
 *    wechselt; „Abbrechen" verwirft. Nach dem Wechsel erscheint eine benannte, sichtbare
 *    Umschalt-Rückmeldung (Live-Region `role="status"`) mit beiden Mandantennamen.
 *  - Rollenwechsel: wechselt direkt (gleicher Mandant, gleiche Daten – Dok. 06, Abschnitt
 *    „Rollenwechsel": der aktive Modus ist in der Shell sichtbar), erhält aber dieselbe
 *    benannte Umschalt-Rückmeldung als sichtbaren Moduswechsel.
 *  - Im read-only-Produkt existieren keine Entwürfe, Uploads oder Freigaben, die still
 *    übernommen werden könnten; dass auch kein ANZEIGE-Zustand des alten Mandanten weiterlebt,
 *    ist per Wächtertest belegt (`components/__tests__/leerzustand-mandantengrenze.test.tsx`).
 *
 * Präsentational bis auf lokalen UI-Zustand (mobiles Menü, Wechsel-Bestätigung, Rückmeldung).
 * Alle Sitzungsdaten und Aktionen kommen als Props aus dem Shell-Layout.
 */
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ShellNav } from './ShellNav';
import { Topbar } from './Topbar';
import type { NavPlace, PlaceId } from '../../lib/shell/places';
import type { DemoRole } from '../../lib/shell/roles';
import { ROLLEN_REICHWEITE_SATZ } from '../../lib/shell/sphaere';
import type { DemoTenant } from '@isms/demo-seed';
import type { ResolvedSession } from '../../lib/shell/session';

/** Eine vollzogene, anzukündigende Kontextänderung (Mandant oder Rolle/Modus). */
interface ContextChange {
  readonly kind: 'tenant' | 'role';
  /** Kurztitel des Moduswechsels („Rolle gewechselt" / „Rolle gewählt" / „Rolle abgewählt"). */
  readonly titel?: string;
  /** Anzeigename des vorherigen Kontexts (Mandantenname, Rollenname oder neutral). */
  readonly from: string;
  /** Anzeigename des neuen Kontexts. */
  readonly to: string;
}

/** Anzeigename des neutralen Zustands in Wechsel-Rückmeldungen (DR-0009). */
const NEUTRAL_ANZEIGE = 'Ansicht ohne Rolle';

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
  /** `null` = Rolle abwählen (neutraler Zustand, DR-0009). */
  onSwitchRole: (roleId: string | null) => void;
  onSwitchTenant: (tenantId: string) => void;
  onSignOut: () => void;
  children: ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);
  /** Angefragter, noch NICHT aktiver Mandant – `null`, wenn keine Bestätigung offen ist. */
  const [pendingTenantId, setPendingTenantId] = useState<string | null>(null);
  /** Letzte vollzogene Kontextänderung – bleibt sichtbar, bis sie geschlossen wird. */
  const [contextChange, setContextChange] = useState<ContextChange | null>(null);
  const confirmRef = useRef<HTMLDivElement | null>(null);
  const announceRef = useRef<HTMLDivElement | null>(null);
  const navId = 'shell-nav';
  /** ID des Mandanten-Selects – Ziel der Fokus-Rückführung nach „Abbrechen" (Code F5). */
  const tenantSelectId = 'shell-mandant-select';

  const pendingTenant = pendingTenantId
    ? tenants.find((t) => t.tenant_id === pendingTenantId)
    : undefined;

  // Fokus in den Bestätigungsschritt bewegen, sobald er erscheint: die Kontextänderung ist
  // angekündigt und nicht übersehbar – auch für Tastatur- und Screenreader-Nutzung.
  useEffect(() => {
    if (pendingTenant) confirmRef.current?.focus();
  }, [pendingTenant]);

  // Nach einem BESTÄTIGTEN Mandantenwechsel wandert der Fokus auf die Rückmeldung (der geklickte
  // Bestätigungs-Button ist aus dem DOM verschwunden). Beim ROLLENWECHSEL bleibt der Fokus
  // bewusst auf dem Select – wer Rollen per Pfeiltaste durchgeht, darf nicht unterbrochen
  // werden; die Live-Region `role="status"` kündigt die Änderung trotzdem an.
  useEffect(() => {
    if (contextChange?.kind === 'tenant') announceRef.current?.focus();
  }, [contextChange]);

  function requestTenantSwitch(tenantId: string): void {
    if (!session || tenantId === session.tenant.tenant_id) return;
    setPendingTenantId(tenantId);
  }

  function confirmTenantSwitch(): void {
    if (!session || !pendingTenant) return;
    const from = session.tenant.display_name;
    onSwitchTenant(pendingTenant.tenant_id);
    setContextChange({ kind: 'tenant', from, to: pendingTenant.display_name });
    setPendingTenantId(null);
  }

  function cancelTenantSwitch(): void {
    setPendingTenantId(null);
    // Fokus-Rückführung (Review-Finding Code F5): der Bestätigungsblock verschwindet aus dem
    // DOM – ohne Rückführung landete der Fokus am Dokumentanfang. Zurück zum Auslöser.
    document.getElementById(tenantSelectId)?.focus();
  }

  /**
   * Rollenwechsel = sichtbarer Moduswechsel (Dok. 06, Abschnitt „Rollenwechsel"): er ändert
   * Reihenfolge und Hervorhebung, „nicht rückwirkend Daten, Verantwortlichkeiten oder Decision
   * Records". Seit WP-020 Slice 2 (DR-0009) gehören auch die Übergänge neutral→Rolle
   * („Rolle gewählt") und Rolle→neutral („Rolle abgewählt") dazu – beide werden in der
   * Rückmeldung sauber benannt. ZUKUNFTSSICHERHEIT: In einer produktiven Umgebung käme die
   * Rolle aus dem Konto (Dok. 19); die freie Wahl inklusive „neutral" ist Demo-Eigenschaft.
   *
   * // PFLICHT-ANKER O-WP020-04 – „Kritische Aktionen speichern die aktive Rolle mit"
   * // (Dok. 06, Abschnitt „Rollenwechsel", wörtlich). Im heutigen read-only-Produkt existiert
   * // keine kritische Aktion (kein Schreiben, keine Freigabe, kein Export). Jedes KÜNFTIGE
   * // Work Package, das eine schreibende oder freigebende Aktion einführt, MUSS beim Auslösen
   * // dieser Aktion die dann aktive Rolle (`session.role?.id` – im neutralen Zustand:
   * // „keine Rolle gewählt") in den Aktions-/Audit-Datensatz schreiben; ob eine kritische
   * // Aktion im NEUTRALEN Zustand überhaupt zulässig ist, MUSS dieses Work Package explizit
   * // entscheiden. Dieser Anker ist die verbindliche Erinnerung daran – er darf nur zusammen
   * // mit einer Umsetzung entfernt werden.
   */
  function switchRole(roleId: string | null): void {
    if (!session) return;
    const currentId = session.role?.id ?? null;
    if (roleId === currentId) return;
    const toRole = roleId !== null ? roles.find((r) => r.id === roleId) : null;
    if (roleId !== null && !toRole) return;

    // Ohne Rollencode (DR-0013 Nr. 12): der Name benennt die Rolle eindeutig, die ID ist
    // Kennung im Datenmodell und kein Anzeigetext.
    const from = session.role ? session.role.name : NEUTRAL_ANZEIGE;
    const to = toRole ? toRole.name : NEUTRAL_ANZEIGE;
    const titel =
      session.role === null ? 'Rolle gewählt' : toRole ? 'Rolle gewechselt' : 'Rolle abgewählt';
    onSwitchRole(roleId);
    setContextChange({ kind: 'role', titel, from, to });
  }

  function signOut(): void {
    // Kein Zustand überlebt die Abmeldung: offene Bestätigung und Rückmeldung werden verworfen.
    setPendingTenantId(null);
    setContextChange(null);
    onSignOut();
  }

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
        onSwitchRole={switchRole}
        onRequestTenantSwitch={requestTenantSwitch}
        onSignOut={signOut}
        onToggleNav={() => setNavOpen((open) => !open)}
        navOpen={navOpen}
        navControlsId={navId}
        tenantSelectId={tenantSelectId}
      />

      {/* Bestätigungsschritt des Mandantenwechsels: benennt alten UND neuen Mandanten, bevor
          irgendetwas wechselt (CROSS-TENANT-SCHUTZ). Text + Form (Rahmen, Struktur, Buttons),
          nie nur Farbe (06-D11). Kein Heading-Element: die Shell liegt VOR dem h1 der Seite,
          ein h2 hier bräche die Überschriftenreihenfolge. Escape bricht ab. */}
      {session && pendingTenant ? (
        // biome-ignore lint/a11y/useSemanticElements: `role="group"` + `aria-label` auf `div` ist gültiges ARIA für diese flüchtige Bestätigungsregion; `fieldset` verlangt eine `legend` und ist für Formular-Controls gedacht – ein Wechsel würde Markup und Screenreader-Ausgabe ändern, ohne die Zugänglichkeit zu verbessern (dokumentiertes Muster wie `od-context`).
        <div
          className="shell-context-confirm"
          role="group"
          aria-label="Mandantenwechsel bestätigen"
          ref={confirmRef}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Escape') cancelTenantSwitch();
          }}
        >
          <p className="shell-context-confirm-text">
            <span className="shell-context-icon" aria-hidden="true">
              ⇄
            </span>
            <strong>Mandantenwechsel bestätigen:</strong> Sie arbeiten gerade im Mandanten{' '}
            <strong>{session.tenant.display_name}</strong>. Nach dem Wechsel zeigen alle Ansichten
            ausschließlich Daten von <strong>{pendingTenant.display_name}</strong> – es wird nichts
            aus dem bisherigen Mandanten übernommen.
          </p>
          <div className="shell-context-actions">
            <button
              type="button"
              className="shell-context-confirm-btn"
              onClick={confirmTenantSwitch}
            >
              Zu {pendingTenant.display_name} wechseln
            </button>
            <button type="button" className="shell-context-cancel-btn" onClick={cancelTenantSwitch}>
              Abbrechen
            </button>
          </div>
        </div>
      ) : null}

      {/* Umschalt-Rückmeldung als PERSISTENTE Live-Region: der Container mit `role="status"`
          bleibt im DOM, damit eingesetzter Inhalt zuverlässig angekündigt wird. Sichtbar bis zum
          Schließen – kein Timeout, keine Animation (deterministisch testbar, respektiert
          `prefers-reduced-motion` durch Verzicht statt Ausnahme). */}
      <div role="status" ref={announceRef} tabIndex={-1} className="shell-context-status">
        {contextChange ? (
          <div className={`shell-context-announce shell-context-announce--${contextChange.kind}`}>
            <span className="shell-context-icon" aria-hidden="true">
              ⇄
            </span>
            <p className="shell-context-announce-text">
              {contextChange.kind === 'tenant' ? (
                <>
                  <strong>Kontextänderung – Mandant gewechselt:</strong> von{' '}
                  <strong>{contextChange.from}</strong> zu <strong>{contextChange.to}</strong>. Alle
                  Ansichten zeigen jetzt ausschließlich Daten von {contextChange.to}.
                </>
              ) : (
                <>
                  <strong>Moduswechsel – {contextChange.titel ?? 'Rolle gewechselt'}:</strong> von{' '}
                  <strong>{contextChange.from}</strong> zu <strong>{contextChange.to}</strong>.{' '}
                  {/* Reichweitensatz aus EINER Quelle (WP-028-Fixpass, Product-Auflage): Seit der
                      Sphärenkopplung ändert der Rollenwechsel auch den EINSTIEG des Ortes
                      „Kunden" – „Daten und Mandant bleiben unverändert" allein verschwieg das.
                      Die zwei Zusagen, die weiterhin gelten, stehen unverändert im Satz. */}
                  {ROLLEN_REICHWEITE_SATZ}
                </>
              )}
            </p>
            <button
              type="button"
              className="shell-context-dismiss-btn"
              onClick={() => {
                setContextChange(null);
                // Fokus-Rückführung (Code F5): der Schließen-Button verschwindet mit dem
                // Hinweis – stabiler Anker ist der Seiteninhalt (main#inhalt, tabIndex -1).
                document.getElementById('inhalt')?.focus();
              }}
            >
              Hinweis schließen
            </button>
          </div>
        ) : null}
      </div>

      {/* ENTFALLEN mit WP-028 Slice 4 (DR-0011): der permanente Demo-Banner unter der Kopfleiste
          („Demo-Simulation. … Alle Daten sind synthetisch."). Er stand auf jeder Seite über dem
          Inhalt und war reine Meta-Kennzeichnung.
          WO DIE SUBSTANZ GEBLIEBEN IST (die Grenze aus DR-0011 „Was bleibt"):
           - Dass Rolle und Mandant eine ANSICHT sind und keine Berechtigung, sagt jetzt die
             Kopfleiste selbst („Ansicht: Rolle / Mandant", „Ansicht zurücksetzen") und einmal
             ruhig der Einstieg (`/login`).
           - Die Datenehrlichkeit (erfasst ≠ geprüft, „x von y", benannte Lücken) und die
             Mandantengrenze („nur der aktive Mandant") stehen unverändert im Seiteninhalt und
             sind weiterhin per Wächtertest belegt. */}

      <div className="shell-body" data-nav-open={navOpen ? 'true' : 'false'}>
        <ShellNav
          places={places}
          activeId={activeId}
          id={navId}
          onNavigate={() => setNavOpen(false)}
        />
        {/* tabIndex -1: programmatisches Fokusziel (Skip-Link-Ziel und Fokus-Rückführung nach
            dem Schließen der Wechsel-Rückmeldung, Code F5) – nicht in der Tab-Reihenfolge. */}
        <main id="inhalt" className="shell-main" tabIndex={-1}>
          <div className="tw-container">{children}</div>
        </main>
      </div>
    </div>
  );
}
