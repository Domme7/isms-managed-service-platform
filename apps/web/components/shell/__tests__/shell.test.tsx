/**
 * Render-/Smoke-Tests der App-Shell & Login-Simulation (WP-011, Acceptance; Einstiegsfluss
 * WP-020 Slice 2 nach DR-0009).
 *
 * Prüft an den präsentationalen Komponenten gegen echte Quellen:
 *  1. Shell rendert die acht Nav-Orte; aktiver Ort markiert.
 *  2. Aktive Rolle + Mandant erscheinen in der Topbar; Wechsel löst Callback aus.
 *  3. Twin Explorer ist innerhalb der Shell erreichbar (eingebettet unter „Kunden").
 *  4. Anmeldung (AC 5): NUR der Mandant ist wählbar – keine Rollenauswahl, kein Passwort;
 *     Submit liefert die Mandanten-ID.
 *  5. Rollenwahl in der App (AC 7): Topbar führt „ohne Rolle"; Wahl und Abwahl feuern den
 *     Callback; die Moduswechsel-Rückmeldung benennt neutral↔Rolle sauber.
 *  7. WP-028 Slice 4: die Kopfleiste beschriftet die Auswahl als ANSICHT, führt keine
 *     Rollencodes und kein Demo-Vokabular; der Mandantenwechsler folgt der Sphäre der aktiven
 *     Rolle (`lib/shell/sphaere.ts`).
 *  6. Eine Platzhalterseite zeigt ihre klare Empty-Message.
 */
import type { ReactNode } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DEMO_TENANTS, TENANT_ID } from '@isms/demo-seed';
import { AppShell } from '../AppShell';
import { LoginForm } from '../LoginForm';
import { SessionProvider } from '../SessionProvider';
import { NAV_PLACES } from '../../../lib/shell/places';
import { DEMO_ROLES, getRole } from '../../../lib/shell/roles';
import { rollenReichweiteSatz } from '../../../lib/shell/sphaere';
import {
  SESSION_STORAGE_KEY,
  parseSession,
  resolveSession,
  type ResolvedSession,
} from '../../../lib/shell/session';
import { TenantOverview } from '../../twin/TenantOverview';
import LoginPage from '../../../app/login/page';

// Router-Mock NUR für den LoginPage-Test (AC 5): die Seite ruft `useRouter().push` nach dem
// Submit. Kein weiterer Testling dieser Datei nutzt next/navigation.
const routerPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: routerPush }),
}));

const EXECUTIVE_NORDWERK = resolveSession({
  roleId: 'R01',
  tenantId: TENANT_ID.NORDWERK,
}) as ResolvedSession;

/** Neutrale Sitzung (DR-0009): Mandant ohne Rolle – ein vollwertiger Zustand. */
const NEUTRAL_NORDWERK = resolveSession({
  tenantId: TENANT_ID.NORDWERK,
}) as ResolvedSession;

/**
 * BETREIBER-Sitzung (WP-028 Slice 4): Seit der Sphären-Kopplung (DR-0013 Nr. 11) ist der
 * Mandantenwechsler ausschließlich Teil der Portfolio-Sicht – Kundenrollen (R01–R06) und der
 * Auditor arbeiten in EINEM Unternehmen und bekommen ihn nicht. Die Wechsel-Tests laufen
 * deshalb mit einer Betreiberrolle; dass die Kundenrolle ihn NICHT bekommt, prüft ein eigener
 * Test (der wäre sonst die stille Lücke).
 */
const SERVICE_LEAD_NORDWERK = resolveSession({
  roleId: 'R08',
  tenantId: TENANT_ID.NORDWERK,
}) as ResolvedSession;

function renderShell(
  overrides: Partial<Parameters<typeof AppShell>[0]> = {},
  children: ReactNode = <p>Inhalt</p>,
) {
  const props = {
    places: NAV_PLACES,
    activeId: 'kunden' as const,
    session: EXECUTIVE_NORDWERK,
    hydrated: true,
    roles: DEMO_ROLES,
    tenants: DEMO_TENANTS,
    onSwitchRole: vi.fn(),
    onSwitchTenant: vi.fn(),
    onSignOut: vi.fn(),
    ...overrides,
  };
  render(<AppShell {...props}>{children}</AppShell>);
  return props;
}

describe('AppShell – Brotkrume statt Sidebar (DR-0017 Stage 4)', () => {
  it('rendert die Drill-Brotkrume mit Cockpit-Rücksprung; keine Acht-Orte-Sidebar mehr', () => {
    renderShell();
    const pfad = screen.getByRole('navigation', { name: 'Navigationspfad' });
    expect(within(pfad).getByRole('link', { name: 'Cockpit' })).toHaveAttribute('href', '/cockpit');
    // Die feste Acht-Orte-Sidebar ist mit DR-0017 entfallen (Navigation nur per Eintauchen); die
    // acht Bereiche leben als Kacheln im Cockpit. Auch der Sidebar-Hamburger ist weg.
    expect(screen.queryByRole('navigation', { name: 'Hauptnavigation' })).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Navigation ein-\/ausblenden/ }),
    ).not.toBeInTheDocument();
  });

  it('Marken-Link führt sphärengerecht in den Einstieg statt auf den alten Ort „Heute" (DR-0018 Stufe 2)', () => {
    // Berater/Portfolio-Sicht → Portfolio; Kunde-Sicht → eigene Welt (Mein Dashboard).
    renderShell({ session: SERVICE_LEAD_NORDWERK });
    expect(screen.getByRole('link', { name: /Managed Service Platform/ })).toHaveAttribute(
      'href',
      '/portfolio',
    );
  });

  it('benennt den aktiven Bereich am Ende des Drill-Pfads (aria-current)', () => {
    renderShell({ activeId: 'isms' });
    const pfad = screen.getByRole('navigation', { name: 'Navigationspfad' });
    expect(within(pfad).getByText('ISMS')).toHaveAttribute('aria-current', 'page');
  });

  it('Portfolio-Sicht (Berater): der Drill-Pfad trägt den Portfolio-Rücksprung', () => {
    renderShell({ session: SERVICE_LEAD_NORDWERK });
    const pfad = screen.getByRole('navigation', { name: 'Navigationspfad' });
    expect(within(pfad).getByRole('link', { name: 'Portfolio' })).toHaveAttribute(
      'href',
      '/portfolio',
    );
  });

  it('Kundensicht: der Drill-Pfad trägt keinen Portfolio-Rücksprung (kein Portfolio darüber)', () => {
    renderShell({ session: EXECUTIVE_NORDWERK });
    const pfad = screen.getByRole('navigation', { name: 'Navigationspfad' });
    expect(within(pfad).queryByRole('link', { name: 'Portfolio' })).not.toBeInTheDocument();
  });

  it('stellt main-Landmark und Skip-Link bereit', () => {
    renderShell();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Zum Inhalt springen/ })).toHaveAttribute(
      'href',
      '#inhalt',
    );
  });
});

describe('AppShell – aktive Rolle + Mandant in der Topbar', () => {
  it('zeigt die gewählte Rolle und den gewählten Mandanten als aktive Auswahl', () => {
    // Betreibersicht: hier steht der Mandant als AUSWAHL (in der Kundensicht als Kontext).
    renderShell({ session: SERVICE_LEAD_NORDWERK });
    const roleSelect = screen.getByLabelText<HTMLSelectElement>('Ansicht: Rolle');
    const tenantSelect = screen.getByLabelText<HTMLSelectElement>('Ansicht: Mandant');
    expect(roleSelect.value).toBe('R08');
    expect(tenantSelect.value).toBe(TENANT_ID.NORDWERK);
    // Als sichtbarer Text: die aktive Option trägt Rollennamen bzw. Mandantennamen.
    expect(
      within(roleSelect).getByRole<HTMLOptionElement>('option', { name: /Managed Service Lead/ })
        .selected,
    ).toBe(true);
    // Kein Rollencode im sichtbaren Optionstext (DR-0013 Nr. 12) – die ID bleibt der `value`.
    expect(roleSelect.textContent ?? '').not.toMatch(/R\d{2}/);
    expect(
      within(tenantSelect).getByRole<HTMLOptionElement>('option', {
        name: /Nordstern Manufacturing SE/,
      }).selected,
    ).toBe(true);
  });

  /**
   * WP-028 Slice 4 (DR-0011/DR-0013 Nr. 12): Der permanente Demo-Banner und der „DEMO"-Chip
   * sind entfallen; „Abmelden" (es gab nie eine Anmeldung) heißt jetzt „Ansicht zurücksetzen",
   * und die beiden Auswahlfelder sind als ANSICHT beschriftet. Die Regel bleibt: die
   * Kopfleiste sagt ehrlich, was sie tut.
   */
  it('benennt die Auswahl als Ansicht und trägt keine Demo-Kennzeichnung mehr', () => {
    renderShell();
    expect(screen.getByRole('group', { name: 'Ansicht: Rolle und Mandant' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ansicht zurücksetzen' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Abmelden' })).toBeNull();
    // Negativbeweis: kein Demo-/Simulations-Vokabular mehr im gerenderten Text der Shell.
    const text = document.body.textContent ?? '';
    expect(text).not.toMatch(/Demo/i);
    expect(text).not.toMatch(/Simulation/i);
    expect(text).not.toMatch(/synthetisch/i);
  });
});

/**
 * WP-020 Slice 1 – Mandanten- und Rollenwechsel sind ANGEKÜNDIGTE Kontextänderungen.
 * QUELLE (Regel Null): Dok. 06, Abschnitt „Sichtbarer Kontext", Kasten CROSS-TENANT-SCHUTZ
 * („Ein Wechsel zwischen Mandanten benötigt eine klare visuelle Kontextänderung.") und
 * Abschnitt „Bewusst vermiedene Muster" („Rollenwechsel oder Mandantenwechsel ohne sichtbaren
 * Kontext."). Rückmeldung immer Text + Form (Symbol, Live-Region), nie nur Farbe (06-D11).
 */
describe('AppShell – Mandantenwechsel nur mit Bestätigung (CROSS-TENANT-SCHUTZ)', () => {
  it('wechselt NICHT still: die Select-Auswahl öffnet erst den Bestätigungsschritt', () => {
    const props = renderShell({ session: SERVICE_LEAD_NORDWERK });
    fireEvent.change(screen.getByLabelText('Ansicht: Mandant'), {
      target: { value: TENANT_ID.GREENGRID },
    });

    // Kein stiller Wechsel: der Callback ist noch NICHT gefeuert.
    expect(props.onSwitchTenant).not.toHaveBeenCalled();

    // Der Bestätigungsschritt benennt alten UND neuen Mandanten (Text + Struktur).
    const bestaetigung = screen.getByRole('group', { name: 'Mandantenwechsel bestätigen' });
    expect(bestaetigung.textContent).toContain('Nordstern Manufacturing SE');
    expect(bestaetigung.textContent).toContain('GreenGrid Energy Services');

    // Erst die explizite Bestätigung wechselt.
    fireEvent.click(
      within(bestaetigung).getByRole('button', { name: 'Zu GreenGrid Energy Services wechseln' }),
    );
    expect(props.onSwitchTenant).toHaveBeenCalledWith(TENANT_ID.GREENGRID);

    // Danach: benannte, sichtbare Rückmeldung als Live-Region mit beiden Namen und Symbol.
    const status = screen.getByRole('status');
    expect(status.textContent).toContain('Kontextänderung');
    expect(status.textContent).toContain('Nordstern Manufacturing SE');
    expect(status.textContent).toContain('GreenGrid Energy Services');
    expect(status.querySelector('[aria-hidden="true"]')).not.toBeNull();

    // Die Rückmeldung ist schließbar (kein Timeout, keine Animation).
    fireEvent.click(within(status).getByRole('button', { name: 'Hinweis schließen' }));
    expect(status.textContent).toBe('');
    // Fokus-Rückführung (Review Code F5): nach dem Schließen darf der Fokus nicht auf <body>
    // fallen – er wandert auf den Seiteninhalt (Tastatur-/Screenreader-Position bleibt erhalten).
    expect(document.getElementById('inhalt')).toHaveFocus();
  });

  it('Abbrechen (Button oder Escape) verwirft den Wechselwunsch ohne Callback', () => {
    const props = renderShell({ session: SERVICE_LEAD_NORDWERK });
    fireEvent.change(screen.getByLabelText('Ansicht: Mandant'), {
      target: { value: TENANT_ID.GREENGRID },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Abbrechen' }));
    expect(props.onSwitchTenant).not.toHaveBeenCalled();
    expect(
      screen.queryByRole('group', { name: 'Mandantenwechsel bestätigen' }),
    ).not.toBeInTheDocument();
    // Fokus-Rückführung (Review Code F5): nach „Abbrechen" kehrt der Fokus auf den
    // Mandanten-Wechsler zurück, statt auf <body> zu fallen.
    expect(screen.getByLabelText('Ansicht: Mandant')).toHaveFocus();

    // Escape bricht ebenfalls ab (Tastaturweg).
    fireEvent.change(screen.getByLabelText('Ansicht: Mandant'), {
      target: { value: TENANT_ID.GREENGRID },
    });
    fireEvent.keyDown(screen.getByRole('group', { name: 'Mandantenwechsel bestätigen' }), {
      key: 'Escape',
    });
    expect(props.onSwitchTenant).not.toHaveBeenCalled();
    expect(
      screen.queryByRole('group', { name: 'Mandantenwechsel bestätigen' }),
    ).not.toBeInTheDocument();
  });

  it('die erneute Auswahl des AKTIVEN Mandanten öffnet keinen Bestätigungsschritt', () => {
    renderShell({ session: SERVICE_LEAD_NORDWERK });
    fireEvent.change(screen.getByLabelText('Ansicht: Mandant'), {
      target: { value: TENANT_ID.NORDWERK },
    });
    expect(
      screen.queryByRole('group', { name: 'Mandantenwechsel bestätigen' }),
    ).not.toBeInTheDocument();
  });
});

describe('AppShell – Rollenwechsel als sichtbarer Moduswechsel (Dok. 06 „Rollenwechsel")', () => {
  it('wechselt direkt, meldet den Moduswechsel aber benannt zurück (alte und neue Rolle)', () => {
    const props = renderShell();
    fireEvent.change(screen.getByLabelText('Ansicht: Rolle'), {
      target: { value: 'R07' },
    });
    // Gleicher Mandant, gleiche Daten: der Wechsel selbst bleibt direkt …
    expect(props.onSwitchRole).toHaveBeenCalledWith('R07');

    // … aber nicht still: die Live-Region nennt beide Modi.
    const status = screen.getByRole('status');
    expect(status.textContent).toContain('Moduswechsel');
    // Rollen werden mit ihrem NAMEN benannt, nicht mit dem Rollencode (DR-0013 Nr. 12) –
    // die Aussage „von welcher Rolle zu welcher" bleibt vollständig prüfbar.
    expect(status.textContent).toContain('Executive Sponsor');
    expect(status.textContent).toContain('Auditor');
    expect(status.textContent).not.toMatch(/R\d{2}/);
    // Und sie sagt, was der Wechsel ändert UND was nicht.
    // WORTLAUT SPHÄRENGERECHT (Nachfix nach Gate-Runde 2): Die Rückmeldung nennt den Satz der
    // NEUEN Rolle. R07 (Auditor, Unabhängig → Ein-Unternehmens-Sphäre) bekommt genau die
    // Ein-Unternehmens-Fassung; die Zusage „nicht den Datenbestand des aktiven Mandanten und
    // keine Berechtigung" ist Teil desselben Satzes und bleibt geprüft.
    expect(status.textContent).toContain(rollenReichweiteSatz(getRole('R07') ?? null));
    expect(status.textContent).toMatch(/nicht den Datenbestand des aktiven Mandanten/);
  });

  it('AC 7: die Topbar führt „ohne Rolle" – die Abwahl feuert null und wird benannt', () => {
    const props = renderShell();
    const roleSelect = screen.getByLabelText<HTMLSelectElement>('Ansicht: Rolle');
    // Neutral steht als erste Option im Wechsler (Einstiegszustand, keine dreizehnte Rolle).
    expect(
      within(roleSelect).getByRole<HTMLOptionElement>('option', { name: 'ohne Rolle' }),
    ).toBeInTheDocument();

    fireEvent.change(roleSelect, { target: { value: '' } });
    expect(props.onSwitchRole).toHaveBeenCalledWith(null);

    // Die Rückmeldung benennt den Übergang Rolle → neutral sauber („Rolle abgewählt").
    const status = screen.getByRole('status');
    expect(status.textContent).toContain('Rolle abgewählt');
    expect(status.textContent).toContain('Executive Sponsor');
    expect(status.textContent).toContain('Ansicht ohne Rolle');
    // Neu = neutral ⇒ Portfolio-Fassung des Reichweitensatzes (kundenSicht(null) === 'portfolio').
    expect(status.textContent).toContain(rollenReichweiteSatz(null));
  });

  it('AC 7: aus dem neutralen Zustand benennt die Rückmeldung die Wahl („Rolle gewählt")', () => {
    const props = renderShell({ session: NEUTRAL_NORDWERK });
    const roleSelect = screen.getByLabelText<HTMLSelectElement>('Ansicht: Rolle');
    // Im neutralen Zustand zeigt der Wechsler neutral als aktive Auswahl.
    expect(roleSelect.value).toBe('');

    fireEvent.change(roleSelect, { target: { value: 'R03' } });
    expect(props.onSwitchRole).toHaveBeenCalledWith('R03');

    const status = screen.getByRole('status');
    expect(status.textContent).toContain('Rolle gewählt');
    expect(status.textContent).toContain('Ansicht ohne Rolle');
    expect(status.textContent).toContain('ISMS Manager');
  });

  it('die erneute Auswahl von neutral im neutralen Zustand feuert nichts (kein Schein-Wechsel)', () => {
    const props = renderShell({ session: NEUTRAL_NORDWERK });
    fireEvent.change(screen.getByLabelText('Ansicht: Rolle'), {
      target: { value: '' },
    });
    expect(props.onSwitchRole).not.toHaveBeenCalled();
    expect(screen.getByRole('status').textContent).toBe('');
  });
});

/**
 * SPHÄRE AN ROLLE GEKOPPELT (WP-028 Slice 4, DR-0013 Nr. 11 / DR-0012).
 *
 * Der Usability-Audit fand eine KUNDENrolle (Executive Sponsor) im mandantenübergreifenden
 * Portfolio – ein Sphären-Logikfehler. Geprüft wird deshalb an der Kopfleiste, dass die
 * Ein-Unternehmens-Sicht keinen Mandantenwechsler anbietet, den aktiven Mandanten aber
 * weiterhin SICHTBAR hält (Dok. 06, Abschnitt „Sichtbarer Kontext": Pflichtangabe).
 *
 * KEINE EXISTENZAUSSAGE über andere Mandanten: der Ersatztext nennt ausschließlich den
 * aktiven Mandanten (Mandantengrenze).
 */
describe('AppShell – Mandantenwechsler folgt der Sphäre (DR-0013 Nr. 11)', () => {
  it('Kundenrolle: kein Mandantenwechsler, aktiver Mandant bleibt sichtbar', () => {
    renderShell();
    expect(screen.queryByLabelText('Ansicht: Mandant')).toBeNull();
    const kopf = screen.getByRole('group', { name: 'Ansicht: Rolle und Mandant' });
    expect(kopf.textContent).toContain('Nordstern Manufacturing SE');
    // Keine Aussage über fremde Mandanten – weder Name noch Zahl.
    for (const fremd of DEMO_TENANTS.filter((x) => x.tenant_id !== TENANT_ID.NORDWERK)) {
      expect(kopf.textContent).not.toContain(fremd.display_name);
    }
  });

  it('Auditor (unabhängig): ebenfalls kein Mandantenwechsler (kontrollierter Prüfbereich)', () => {
    renderShell({
      session: resolveSession({ roleId: 'R07', tenantId: TENANT_ID.NORDWERK }) as ResolvedSession,
    });
    expect(screen.queryByLabelText('Ansicht: Mandant')).toBeNull();
  });

  it('Betreiberrolle und neutral: der Mandantenwechsler steht zur Verfügung', () => {
    renderShell({ session: SERVICE_LEAD_NORDWERK });
    expect(screen.getByLabelText('Ansicht: Mandant')).toBeInTheDocument();
    screen.getByRole('main');
  });

  it('neutral: der Mandantenwechsler steht zur Verfügung', () => {
    renderShell({ session: NEUTRAL_NORDWERK });
    expect(screen.getByLabelText('Ansicht: Mandant')).toBeInTheDocument();
  });
});

// Das SPHÄRENGERECHTE Ziel des Ortes „Kunden" (Kundenrolle → /kunden, Betreiber → /twin) ist seit
// DR-0017 (Brotkrume statt Sidebar) NICHT mehr Teil der Shell: die acht Bereiche sind Cockpit-
// Kacheln. Die Regel selbst (`kundenOrtHref`/`orteFuerRolle`) ist unverändert und in
// `lib/shell/__tests__/sphaere.test.ts` erschöpfend unit-getestet; hier bleibt nur die Einbettung
// des Seiteninhalts in die Shell.
describe('AppShell – Seiteninhalt eingebettet (DR-0017: Brotkrume statt Sidebar)', () => {
  it('rendert den Seiteninhalt im main-Landmark der Shell', () => {
    renderShell(
      { activeId: 'kunden', session: NEUTRAL_NORDWERK },
      <TenantOverview tenants={DEMO_TENANTS} />,
    );
    const main = screen.getByRole('main');
    expect(within(main).getByRole('heading', { level: 1, name: 'Kunden' })).toBeInTheDocument();
  });
});

describe('LoginForm – NUR der Mandant ist wählbar (WP-020 AC 5, DR-0009)', () => {
  it('bietet alle vier Mandanten, aber KEINE Rollenauswahl und kein Passwortfeld', () => {
    render(
      <LoginForm tenants={DEMO_TENANTS} defaultTenantId={TENANT_ID.NORDWERK} onSubmit={vi.fn()} />,
    );
    expect(screen.queryByLabelText(/passwort/i)).not.toBeInTheDocument();
    // Die Rollenwahl ist vom Login verschwunden (DR-0009: „Anmelden nur mit Mandant") –
    // keine Radios, keine Rollen-IDs, keine Rollennamen im Formular.
    expect(screen.queryAllByRole('radio')).toHaveLength(0);
    for (const role of DEMO_ROLES) {
      expect(screen.queryByText(role.id)).not.toBeInTheDocument();
      expect(screen.queryByText(role.name)).not.toBeInTheDocument();
    }
    // Der Hinweis benennt den neutralen Einstieg und die spätere, optionale Rollenwahl.
    expect(screen.getByText(/neutralen strategischen Einstieg/)).toBeInTheDocument();
    // Alle vier Mandanten als Optionen.
    for (const tenant of DEMO_TENANTS) {
      expect(
        screen.getByRole('option', { name: new RegExp(tenant.display_name) }),
      ).toBeInTheDocument();
    }
  });

  it('meldet beim Submit NUR die Mandanten-ID (kein echtes Auth, keine Rolle)', () => {
    const onSubmit = vi.fn();
    render(
      <LoginForm tenants={DEMO_TENANTS} defaultTenantId={TENANT_ID.NORDWERK} onSubmit={onSubmit} />,
    );

    fireEvent.change(screen.getByLabelText('Mandant wählen'), {
      target: { value: TENANT_ID.GREENGRID },
    });
    // Der Submit-Button spiegelt die Auswahl im Klartext – ohne Rollenbehauptung.
    fireEvent.click(screen.getByRole('button', { name: 'Bei GreenGrid Energy Services anmelden' }));
    expect(onSubmit).toHaveBeenCalledWith(TENANT_ID.GREENGRID);
  });
});

describe('LoginPage – Anmeldung erzeugt die NEUTRALE Sitzung (AC 5/6)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    routerPush.mockClear();
  });

  /**
   * WP-028 Slice 4 (DR-0011): Der Demo-Disclaimer („simulierte Anmeldung, keine echte
   * Sicherheit", „synthetisches Datenmodell") ist entfallen. WAS BLEIBT, ist die SACHAUSSAGE
   * über die Reichweite der Auswahl – und zwar an DIESER einen Stelle (DR-0013 Nr. 12).
   */
  it('benennt die Reichweite der Auswahl sachlich, ohne Demo-Kennzeichnung', () => {
    const { container } = render(
      <SessionProvider>
        <LoginPage />
      </SessionProvider>,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Anmelden' })).toBeInTheDocument();
    // Die Ehrlichkeits-Substanz bleibt: Ansicht ≠ Berechtigung, als benannte Lücke.
    const hinweis = screen.getByRole('note');
    expect(hinweis.textContent).toMatch(/Ansicht, keine Berechtigung/);
    expect(hinweis.textContent).toMatch(/noch nicht angebunden/);
    // Negativbeweis: keine Demo-/Simulations-Kennzeichnung mehr.
    const text = container.textContent ?? '';
    expect(text).not.toMatch(/Simulation/i);
    expect(text).not.toMatch(/keine echte Sicherheit/i);
    // BEWUSST NICHT geprüft: „synthetisch" – die Mandantenbeschreibung stammt aus dem
    // Datenbestand (`packages/demo-seed`) und wird in einem eigenen Textpass nachgezogen
    // (WP-033). Der app-weite Wächter maskiert Datenbestand-Texte genau deshalb.
    expect(screen.queryAllByRole('radio')).toHaveLength(0);
  });

  it('schreibt beim Anmelden eine ROLLENLOSE Sitzung und führt ins Berater-Portfolio (neutral = Portfolio-Sicht)', () => {
    render(
      <SessionProvider>
        <LoginPage />
      </SessionProvider>,
    );
    fireEvent.change(screen.getByLabelText('Mandant wählen'), {
      target: { value: TENANT_ID.NORDWERK },
    });
    fireEvent.click(screen.getByRole('button', { name: /anmelden$/i }));

    const gespeichert = parseSession(window.localStorage.getItem(SESSION_STORAGE_KEY));
    expect(gespeichert).toEqual({ tenantId: TENANT_ID.NORDWERK });
    expect(gespeichert?.roleId).toBeUndefined();
    // Neutral = Portfolio-Sphäre (DR-0017 Stage 1): der Einstieg führt auf das Berater-Portfolio.
    expect(routerPush).toHaveBeenCalledWith('/portfolio');
  });

  it('startet auch nach einer Alt-Sitzung MIT Rolle neutral (Mandant zuerst, Rolle in der App)', () => {
    window.localStorage.setItem(
      SESSION_STORAGE_KEY,
      `{"roleId":"R03","tenantId":"${TENANT_ID.NORDWERK}"}`,
    );
    render(
      <SessionProvider>
        <LoginPage />
      </SessionProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: /anmelden$/i }));

    const gespeichert = parseSession(window.localStorage.getItem(SESSION_STORAGE_KEY));
    expect(gespeichert?.roleId).toBeUndefined();
    expect(gespeichert?.tenantId).toBe(TENANT_ID.NORDWERK);
  });
});

/*
 * ENTFALLEN mit WP-032 Slice 3: `describe('PlaceholderPage – ehrliche Empty-Message')`.
 *
 * Der Blindheitsschutz dieses Blocks (eingebaut in Slice 2) hat planmäßig ausgelöst: Mit dem
 * Ausbau des letzten Ortes gibt es keinen nicht-liven Ort mehr, also keine gültige Eingabe für
 * die Platzhalterseite – ihre Prop war ein `NavPlace`, und kein `NavPlace` kann sie noch
 * sinnvoll füllen. Statt den Test auf eine synthetische Fixture umzustellen (und damit eine
 * Komponente ohne Aufrufer weiter zu prüfen), wurden Komponente und Test entfernt; die
 * Begründung steht in `lib/shell/places.ts` beim Feld `live`.
 *
 * An ihre Stelle tritt die positive Meilenstein-Assertion in
 * `lib/shell/__tests__/shell-logic.test.ts` („alle acht Orte sind live"), die rot wird, sobald
 * ein Ort je zurückgestuft würde. Die acht Orte selbst bleiben geprüft – jetzt als Kacheln im
 * Cockpit (`cockpit-modul.test.tsx`, „BereichKacheln"), seit DR-0017 Stage 4 die feste
 * Seiten-Sidebar (`ShellNav`) entfallen ist (Navigation nur noch per Eintauchen). Die REGEL ist
 * also unverändert in Kraft, nur ihre Platzhalterseite ist gegenstandslos geworden.
 */
