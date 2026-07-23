/**
 * Wächtertest: **kein Leerzustand darf über einen fremden Mandanten sprechen** — und seit
 * WP-020 Slice 1 zusätzlich: **der Mandantenwechsel ist eine angekündigte Kontextänderung,
 * nach der kein Anzeigezustand des alten Mandanten weiterlebt.**
 *
 * Hintergrund — die Leerzustands-Fehlerklasse ist im Projekt DREIMAL unabhängig entstanden:
 *
 *  1. `/isms` (seit WP-013): „Die Risiko- und Control-Sicht ist derzeit für einen anderen
 *     Demo-Mandanten ausmodelliert; weitere folgen in späteren Ausbaustufen."
 *  2. `/entscheidungen` (WP-017): „Die Entscheidungsschicht ist im Demo-Datenbestand derzeit für
 *     einen Mandanten ausmodelliert."
 *  3. `/services` (seit WP-012, gefunden erst im Cross-Tenant-Umbau WP-020): „Services laufen
 *     derzeit für <Namen fremder Mandanten>; weitere Mandanten folgen in späteren Ausbaustufen."
 *
 * Alle entstanden aus derselben gut gemeinten Absicht: dem Nutzer erklären, dass die Leere kein
 * Fehler ist. Alle sind Existenzaussagen über FREMDE Mandanten und damit Verstöße gegen
 * Dok. 07, Abschnitt „Mandantenfähigkeit, Rechte und Datenschutz" (P09) — dort ausdrücklich:
 * verdeckte Objekte dürfen nicht über Trefferzahlen oder Meldungen erkennbar werden.
 *
 * Der zweite Fall wurde erst in der Gegenprüfung gefunden, der erste bestand vier und der
 * dritte acht Work Packages lang unbemerkt. Deshalb dieser Test: Der Leerzustand ist die
 * Stelle, an der die Versuchung entsteht, „nicht hier, aber woanders" zu sagen — mechanisch
 * geprüft statt durch Aufmerksamkeit.
 *
 * Geprüft wird der **gerenderte Text** der leeren Orte, nicht der Quelltext: eine künftige
 * Umformulierung mit demselben Effekt fällt dadurch ebenfalls auf.
 */
import { useState } from 'react';
import { fireEvent, render, screen, within, type RenderResult } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { IsmsContent } from '../isms/IsmsContent';
import { EntscheidungenContent } from '../entscheidungen/EntscheidungenContent';
import { ServicesContent } from '../services/ServicesContent';
import { AppShell } from '../shell/AppShell';
import { MissionControlContent } from '../shell/MissionControlContent';
import { NAV_PLACES } from '../../lib/shell/places';
import { DEMO_ROLES, getRole, type DemoRole } from '../../lib/shell/roles';
import { resolveSession } from '../../lib/shell/session';

function tenant(tenantId: string): DemoTenant {
  const found = DEMO_TENANTS.find((t) => t.tenant_id === tenantId);
  if (!found) throw new Error(`Testfixture fehlt: ${tenantId}`);
  return found;
}

function role(roleId: string): DemoRole {
  const found = getRole(roleId);
  if (!found) throw new Error(`Testfixture fehlt: ${roleId}`);
  return found;
}

/**
 * Formulierungen, mit denen eine Seite über andere Mandanten spricht. Bewusst über die konkreten
 * historischen Sätze hinaus: eine Umformulierung soll den Test ebenfalls auslösen.
 */
const FREMDER_MANDANT = [
  /anderen? (Demo-)?Mandanten/i,
  /andere (Demo-)?Mandanten/i,
  /f(ü|ue)r \d+ Mandanten/i,
  /\d+ von \d+ Mandanten/i,
  /Mandanten? ausmodelliert/i,
  /bei (einem|anderen) Mandanten/i,
  /weitere folgen/i,
];

/** Mandanten ohne eigenen Objektgraphen — hier greifen die Leerzustände. */
const LEERE_MANDANTEN = [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE];

describe('Leerzustände sprechen nie über fremde Mandanten (Dok. 07 „Mandantenfähigkeit", P09)', () => {
  const orte: { name: string; render: (t: DemoTenant) => RenderResult }[] = [
    { name: '/isms', render: (t) => render(<IsmsContent role={role('R03')} tenant={t} />) },
    {
      name: '/entscheidungen',
      render: (t) => render(<EntscheidungenContent role={role('R03')} tenant={t} />),
    },
    {
      name: '/heute',
      render: (t) => render(<MissionControlContent role={role('R03')} tenant={t} />),
    },
    {
      // WP-020 Slice 1: `/services` steht seither ebenfalls unter dem Wächter. Bewusst mit
      // einer Rolle AUSSERHALB der Consulting & Service World (R03): für R08–R11 rendert die
      // Seite zusätzlich die Portfolio-Übersicht — eine DOKUMENTIERTE mandantenübergreifende
      // Verdichtung (O-WP012-03), die legitim fremde Mandanten nennt und kein Leerzustand ist.
      // Der Wächter zielt auf den mandantenlokalen Leerzustand, den jede Rolle sieht.
      name: '/services',
      render: (t) => render(<ServicesContent role={role('R03')} tenant={t} />),
    },
  ];

  for (const ort of orte) {
    for (const tenantId of LEERE_MANDANTEN) {
      it(`${ort.name} nennt für ${tenantId} keinen fremden Mandanten`, () => {
        const { container } = ort.render(tenant(tenantId));
        const text = container.textContent ?? '';
        // Blindheitsschutz: der Leerzustand muss überhaupt etwas gerendert haben, sonst wäre
        // jede Negativassertion trivial erfüllt.
        expect(text.length).toBeGreaterThan(80);

        for (const muster of FREMDER_MANDANT) {
          expect(text).not.toMatch(muster);
        }

        // Und konkret: kein Anzeigename und keine ID eines anderen Mandanten im DOM.
        for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== tenantId)) {
          expect(text).not.toContain(fremd.display_name);
          expect(text).not.toContain(fremd.tenant_id);
        }
      });
    }
  }

  it('der Consulting Operator erfährt nichts über Nordwerks Entscheidungen', () => {
    // Dieser Mandant trägt Objekte, aber KEINE Entscheidungen - genau die Konstellation, in der
    // WP-017 ursprünglich „für einen Mandanten ausmodelliert" ausgab.
    const { container } = render(
      <EntscheidungenContent role={role('R08')} tenant={tenant(TENANT_ID.CONSULTING_OPERATOR)} />,
    );
    const text = container.textContent ?? '';
    expect(text.length).toBeGreaterThan(80);

    for (const muster of FREMDER_MANDANT) {
      expect(text).not.toMatch(muster);
    }
    expect(text).not.toContain('Nordwerk Manufacturing SE');
    expect(text).not.toContain(TENANT_ID.NORDWERK);
  });
});

/* -----------------------------------------------------------------------------
 * Mandantenwechsel: angekündigte Kontextänderung ohne Zustandsübertrag (WP-020 Slice 1)
 * -----------------------------------------------------------------------------
 *
 * QUELLE (Regel Null, am PDF gegengelesen): Dok. 06, Abschnitt „Sichtbarer Kontext", Kasten
 * CROSS-TENANT-SCHUTZ: „Ein Wechsel zwischen Mandanten benötigt eine klare visuelle
 * Kontextänderung. Entwürfe, Uploads und Freigaben dürfen nicht still in einen anderen
 * Mandanten übernommen werden." Abschnitt „Globale Akzeptanzkriterien": „Cross-Tenant-
 * Fehlaktionen werden visuell und technisch verhindert."
 *
 * WAS DIESER TEST BEWEIST (read-only-Stand):
 *  1. Der Wechsel ist ANGEKÜNDIGT: erst ein Bestätigungsschritt, der alten UND neuen
 *     Mandanten benennt – vorher ändert sich nichts.
 *  2. Der Wechsel ist SICHTBAR: nach der Bestätigung erscheint eine benannte Rückmeldung
 *     (Live-Region `role="status"`, Text + Symbol – nicht nur Farbe, 06-D11).
 *  3. KEIN ZUSTANDSÜBERTRAG: nach dem Wechsel (und dem Schließen der Rückmeldung, die den
 *     alten Namen als Teil der Ankündigung nennen darf) kommt der alte Mandant – Name und
 *     Kennung – im gesamten DOM nicht mehr vor. Ausgenommen ist ausschließlich der
 *     Mandanten-WECHSLER der Topbar: er listet als Demo-Auswahl bewusst alle wählbaren
 *     Mandanten (dieselbe Liste wie die Anmelde-Simulation), das ist Auswahl, kein Kontext.
 *
 * WAS READ-ONLY NICHT PRÜFBAR IST (benannt statt behauptet): Entwürfe, Uploads und Freigaben
 * existieren im Produkt nicht – dass sie nicht übernommen werden, ist derzeit gegenstandslos
 * und wird mit dem ersten Schreib-WP testpflichtig (Anker O-WP020-04 in `AppShell`). Ebenen-/
 * Tiefen-Zustände (Detailtiefe) existieren noch nicht; sobald sie entstehen, gehört ihr
 * Zurücksetzen beim Mandantenwechsel in genau diesen Test.
 */

/** Gesamter Seitentext OHNE die Wechsler-Selects (siehe Begründung im Blockkommentar). */
function textOhneWechsler(): string {
  const klon = document.body.cloneNode(true) as HTMLElement;
  for (const select of Array.from(klon.querySelectorAll('select'))) select.remove();
  return klon.textContent ?? '';
}

/**
 * Harness mit ECHTER `AppShell` und echtem Seiteninhalt: der Mandantenwechsel läuft über den
 * realen Bestätigungsfluss, der Inhalt („Heute") rendert immer den aktiven Mandanten.
 */
function WechselHarness({ startTenantId }: { startTenantId: string }) {
  const [tenantId, setTenantId] = useState(startTenantId);
  const session = resolveSession({ roleId: 'R03', tenantId });
  if (!session) throw new Error(`Testfixture nicht auflösbar: R03/${tenantId}`);

  return (
    <AppShell
      places={NAV_PLACES}
      activeId="heute"
      session={session}
      hydrated
      roles={DEMO_ROLES}
      tenants={DEMO_TENANTS}
      onSwitchRole={() => {}}
      onSwitchTenant={setTenantId}
      onSignOut={() => {}}
    >
      <MissionControlContent role={session.role} tenant={session.tenant} />
    </AppShell>
  );
}

describe('Mandantenwechsel ist eine angekündigte Kontextänderung (Dok. 06 CROSS-TENANT-SCHUTZ)', () => {
  const NORDWERK_NAME = 'Nordwerk Manufacturing SE';
  const FINOVIA_NAME = 'Finovia Digital Bank AG';

  function wechselAnfordern(): void {
    fireEvent.change(screen.getByLabelText('Aktiven Mandanten wechseln (Simulation)'), {
      target: { value: TENANT_ID.FINOVIA },
    });
  }

  it('kündigt den Wechsel an: Bestätigung nennt beide Mandanten, vorher wechselt nichts', () => {
    render(<WechselHarness startTenantId={TENANT_ID.NORDWERK} />);
    wechselAnfordern();

    const bestaetigung = screen.getByRole('group', { name: 'Mandantenwechsel bestätigen' });
    // Beide Mandanten stehen BENANNT in der Ankündigung (Text, nicht nur Farbe).
    expect(bestaetigung.textContent).toContain(NORDWERK_NAME);
    expect(bestaetigung.textContent).toContain(FINOVIA_NAME);
    // Es gibt einen expliziten Bestätigungs- und einen Abbrechen-Schritt.
    expect(
      within(bestaetigung).getByRole('button', { name: `Zu ${FINOVIA_NAME} wechseln` }),
    ).toBeInTheDocument();
    expect(within(bestaetigung).getByRole('button', { name: 'Abbrechen' })).toBeInTheDocument();

    // Vor der Bestätigung ist NICHTS gewechselt: der Inhalt zeigt weiter den alten Mandanten.
    const main = screen.getByRole('main');
    expect(main.textContent).toContain(NORDWERK_NAME);
    expect(main.textContent).not.toContain(FINOVIA_NAME);
  });

  it('Abbrechen verwirft den Wechselwunsch vollständig', () => {
    render(<WechselHarness startTenantId={TENANT_ID.NORDWERK} />);
    wechselAnfordern();
    fireEvent.click(screen.getByRole('button', { name: 'Abbrechen' }));

    expect(
      screen.queryByRole('group', { name: 'Mandantenwechsel bestätigen' }),
    ).not.toBeInTheDocument();
    // Kein Wechsel, keine Rückmeldung: der Kontext ist unverändert Nordwerk.
    expect(screen.getByRole('status').textContent).toBe('');
    expect(screen.getByRole('main').textContent).toContain(NORDWERK_NAME);
    expect(
      screen.getByLabelText<HTMLSelectElement>('Aktiven Mandanten wechseln (Simulation)').value,
    ).toBe(TENANT_ID.NORDWERK);
  });

  it('nach Bestätigung: sichtbare benannte Rückmeldung, danach lebt kein Zustand des alten Mandanten weiter', () => {
    render(<WechselHarness startTenantId={TENANT_ID.NORDWERK} />);
    wechselAnfordern();
    fireEvent.click(screen.getByRole('button', { name: `Zu ${FINOVIA_NAME} wechseln` }));

    // (2) Sichtbare, benannte Rückmeldung: Live-Region nennt beide Mandanten, trägt Text +
    // Symbol (Form) – eine reine Farbänderung würde diesen Test nicht bestehen.
    const status = screen.getByRole('status');
    expect(status.textContent).toContain('Kontextänderung');
    expect(status.textContent).toContain(NORDWERK_NAME);
    expect(status.textContent).toContain(FINOVIA_NAME);
    expect(status.querySelector('[aria-hidden="true"]')).not.toBeNull();

    // Der Inhalt zeigt bereits ausschließlich den neuen Mandanten (ehrlicher Leerzustand).
    const main = screen.getByRole('main');
    expect(main.textContent).toContain(FINOVIA_NAME);
    expect(main.textContent).not.toContain(NORDWERK_NAME);
    expect(main.textContent).not.toContain(TENANT_ID.NORDWERK);

    // (3) Negativbeweis Zustandsübertrag: nach dem Schließen der Rückmeldung kommt der alte
    // Mandant im gesamten DOM nicht mehr vor – einzige dokumentierte Ausnahme ist der
    // Demo-Wechsler (Selects), siehe Blockkommentar.
    fireEvent.click(screen.getByRole('button', { name: 'Hinweis schließen' }));
    const text = textOhneWechsler();
    expect(text.length).toBeGreaterThan(80);
    expect(text).not.toContain(NORDWERK_NAME);
    expect(text).not.toContain(TENANT_ID.NORDWERK);
  });

  it('Negativbeweis der Ankündigung selbst: ohne Wechselwunsch existiert keine Ankündigung', () => {
    // Schutz gegen eine trivial grüne Zukunft, in der Bestätigung/Rückmeldung immer (oder nie)
    // gerendert würden: im Ruhezustand gibt es weder Bestätigungsschritt noch Rückmeldungstext.
    render(<WechselHarness startTenantId={TENANT_ID.NORDWERK} />);
    expect(
      screen.queryByRole('group', { name: 'Mandantenwechsel bestätigen' }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('status').textContent).toBe('');
  });
});
