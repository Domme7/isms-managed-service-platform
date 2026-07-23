/**
 * Render-/Smoke-Tests der App-Shell & Login-Simulation (WP-011, Acceptance; Einstiegsfluss
 * WP-020 Slice 2 nach DR-0009).
 *
 * Prüft an den präsentationalen Komponenten gegen echte Quellen:
 *  1. Shell rendert die acht Nav-Orte; aktiver Ort markiert.
 *  2. Aktive Rolle + Mandant erscheinen in der Topbar; Wechsel löst Callback aus.
 *  3. Twin Explorer ist innerhalb der Shell erreichbar (eingebettet unter „Kunden").
 *  4. Login-Simulation (AC 5): NUR der Mandant ist wählbar – keine Rollenauswahl, kein
 *     Passwort; Submit liefert die Mandanten-ID; die Seite bleibt als Simulation beschriftet.
 *  5. Rollenwahl in der App (AC 7): Topbar führt „neutral · keine Rolle"; Wahl und Abwahl
 *     feuern den Callback; die Moduswechsel-Rückmeldung benennt neutral↔Rolle sauber.
 *  6. Eine Platzhalterseite zeigt ihre klare Empty-Message.
 */
import type { ReactNode } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DEMO_TENANTS, TENANT_ID } from '@isms/demo-seed';
import { AppShell } from '../AppShell';
import { LoginForm } from '../LoginForm';
import { PlaceholderPage } from '../PlaceholderPage';
import { SessionProvider } from '../SessionProvider';
import { NAV_PLACES } from '../../../lib/shell/places';
import { DEMO_ROLES } from '../../../lib/shell/roles';
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

describe('AppShell – Navigation der acht Orte', () => {
  it('rendert genau acht Navigationsorte mit ihren Labels', () => {
    renderShell();
    const nav = screen.getByRole('navigation', { name: 'Hauptnavigation' });
    const links = within(nav).getAllByRole('link');
    expect(links).toHaveLength(8);
    for (const label of [
      'Heute',
      'Kunden',
      'ISMS',
      'Entscheidungen',
      'Services',
      'Reports',
      'Wissen',
      'Administration',
    ]) {
      expect(within(nav).getByRole('link', { name: new RegExp(label) })).toBeInTheDocument();
    }
  });

  it('kennzeichnet genau die noch nicht ausgebauten Orte als „noch nicht verfügbar"', () => {
    // WP-017 Slice 2: „Entscheidungen" ist live und darf diese Kennzeichnung NICHT mehr tragen.
    // Abgeleitet aus `NAV_PLACES` statt hartkodiert – der Test zieht mit jedem weiteren Ort mit.
    renderShell();
    const nav = screen.getByRole('navigation', { name: 'Hauptnavigation' });
    for (const place of NAV_PLACES) {
      const link = within(nav).getByRole('link', { name: new RegExp(place.label) });
      const nichtVerfuegbar = (link.textContent ?? '').includes('noch nicht verfügbar');
      expect(nichtVerfuegbar, `Ort „${place.label}"`).toBe(place.live !== true);
    }
    expect(NAV_PLACES.filter((p) => p.live === true).map((p) => p.id)).toContain('entscheidungen');
  });

  it('markiert den aktiven Ort mit aria-current="page"', () => {
    renderShell({ activeId: 'kunden' });
    const nav = screen.getByRole('navigation', { name: 'Hauptnavigation' });
    const kunden = within(nav).getByRole('link', { name: /Kunden/ });
    expect(kunden).toHaveAttribute('aria-current', 'page');
    expect(within(nav).getByRole('link', { name: /Heute/ })).not.toHaveAttribute('aria-current');
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
    renderShell();
    const roleSelect = screen.getByLabelText<HTMLSelectElement>(
      'Aktive Rolle wechseln (Simulation)',
    );
    const tenantSelect = screen.getByLabelText<HTMLSelectElement>(
      'Aktiven Mandanten wechseln (Simulation)',
    );
    expect(roleSelect.value).toBe('R01');
    expect(tenantSelect.value).toBe(TENANT_ID.NORDWERK);
    // Als sichtbarer Text: die aktive Option trägt Rollennamen bzw. Mandantennamen.
    expect(
      within(roleSelect).getByRole<HTMLOptionElement>('option', { name: /Executive Sponsor/ })
        .selected,
    ).toBe(true);
    expect(
      within(tenantSelect).getByRole<HTMLOptionElement>('option', {
        name: /Nordwerk Manufacturing SE/,
      }).selected,
    ).toBe(true);
  });

  it('zeigt den permanenten Demo-Hinweis (keine echte Sicherheit)', () => {
    renderShell();
    expect(screen.getByText(/keine echte Anmeldung/i)).toBeInTheDocument();
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
    const props = renderShell();
    fireEvent.change(screen.getByLabelText('Aktiven Mandanten wechseln (Simulation)'), {
      target: { value: TENANT_ID.FINOVIA },
    });

    // Kein stiller Wechsel: der Callback ist noch NICHT gefeuert.
    expect(props.onSwitchTenant).not.toHaveBeenCalled();

    // Der Bestätigungsschritt benennt alten UND neuen Mandanten (Text + Struktur).
    const bestaetigung = screen.getByRole('group', { name: 'Mandantenwechsel bestätigen' });
    expect(bestaetigung.textContent).toContain('Nordwerk Manufacturing SE');
    expect(bestaetigung.textContent).toContain('Finovia Digital Bank AG');

    // Erst die explizite Bestätigung wechselt.
    fireEvent.click(
      within(bestaetigung).getByRole('button', { name: 'Zu Finovia Digital Bank AG wechseln' }),
    );
    expect(props.onSwitchTenant).toHaveBeenCalledWith(TENANT_ID.FINOVIA);

    // Danach: benannte, sichtbare Rückmeldung als Live-Region mit beiden Namen und Symbol.
    const status = screen.getByRole('status');
    expect(status.textContent).toContain('Kontextänderung');
    expect(status.textContent).toContain('Nordwerk Manufacturing SE');
    expect(status.textContent).toContain('Finovia Digital Bank AG');
    expect(status.querySelector('[aria-hidden="true"]')).not.toBeNull();

    // Die Rückmeldung ist schließbar (kein Timeout, keine Animation).
    fireEvent.click(within(status).getByRole('button', { name: 'Hinweis schließen' }));
    expect(status.textContent).toBe('');
    // Fokus-Rückführung (Review Code F5): nach dem Schließen darf der Fokus nicht auf <body>
    // fallen – er wandert auf den Seiteninhalt (Tastatur-/Screenreader-Position bleibt erhalten).
    expect(document.getElementById('inhalt')).toHaveFocus();
  });

  it('Abbrechen (Button oder Escape) verwirft den Wechselwunsch ohne Callback', () => {
    const props = renderShell();
    fireEvent.change(screen.getByLabelText('Aktiven Mandanten wechseln (Simulation)'), {
      target: { value: TENANT_ID.FINOVIA },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Abbrechen' }));
    expect(props.onSwitchTenant).not.toHaveBeenCalled();
    expect(
      screen.queryByRole('group', { name: 'Mandantenwechsel bestätigen' }),
    ).not.toBeInTheDocument();
    // Fokus-Rückführung (Review Code F5): nach „Abbrechen" kehrt der Fokus auf den
    // Mandanten-Wechsler zurück, statt auf <body> zu fallen.
    expect(screen.getByLabelText('Aktiven Mandanten wechseln (Simulation)')).toHaveFocus();

    // Escape bricht ebenfalls ab (Tastaturweg).
    fireEvent.change(screen.getByLabelText('Aktiven Mandanten wechseln (Simulation)'), {
      target: { value: TENANT_ID.FINOVIA },
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
    renderShell();
    fireEvent.change(screen.getByLabelText('Aktiven Mandanten wechseln (Simulation)'), {
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
    fireEvent.change(screen.getByLabelText('Aktive Rolle wechseln (Simulation)'), {
      target: { value: 'R07' },
    });
    // Gleicher Mandant, gleiche Daten: der Wechsel selbst bleibt direkt …
    expect(props.onSwitchRole).toHaveBeenCalledWith('R07');

    // … aber nicht still: die Live-Region nennt beide Modi.
    const status = screen.getByRole('status');
    expect(status.textContent).toContain('Moduswechsel');
    expect(status.textContent).toContain('R01 · Executive Sponsor');
    expect(status.textContent).toContain('R07 · Auditor');
    // Und sie sagt, was der Wechsel NICHT ändert (keine rückwirkende Datenänderung).
    expect(status.textContent).toMatch(/Daten und Mandant bleiben unverändert/);
  });

  it('AC 7: die Topbar führt „neutral · keine Rolle" – die Abwahl feuert null und wird benannt', () => {
    const props = renderShell();
    const roleSelect = screen.getByLabelText<HTMLSelectElement>(
      'Aktive Rolle wechseln (Simulation)',
    );
    // Neutral steht als erste Option im Wechsler (Einstiegszustand, keine dreizehnte Rolle).
    expect(
      within(roleSelect).getByRole<HTMLOptionElement>('option', { name: 'neutral · keine Rolle' }),
    ).toBeInTheDocument();

    fireEvent.change(roleSelect, { target: { value: '' } });
    expect(props.onSwitchRole).toHaveBeenCalledWith(null);

    // Die Rückmeldung benennt den Übergang Rolle → neutral sauber („Rolle abgewählt").
    const status = screen.getByRole('status');
    expect(status.textContent).toContain('Rolle abgewählt');
    expect(status.textContent).toContain('R01 · Executive Sponsor');
    expect(status.textContent).toContain('neutraler Einstieg (keine Rolle)');
    expect(status.textContent).toMatch(/Daten und Mandant bleiben unverändert/);
  });

  it('AC 7: aus dem neutralen Zustand benennt die Rückmeldung die Wahl („Rolle gewählt")', () => {
    const props = renderShell({ session: NEUTRAL_NORDWERK });
    const roleSelect = screen.getByLabelText<HTMLSelectElement>(
      'Aktive Rolle wechseln (Simulation)',
    );
    // Im neutralen Zustand zeigt der Wechsler neutral als aktive Auswahl.
    expect(roleSelect.value).toBe('');

    fireEvent.change(roleSelect, { target: { value: 'R03' } });
    expect(props.onSwitchRole).toHaveBeenCalledWith('R03');

    const status = screen.getByRole('status');
    expect(status.textContent).toContain('Rolle gewählt');
    expect(status.textContent).toContain('neutraler Einstieg (keine Rolle)');
    expect(status.textContent).toContain('R03 · ISMS Manager');
  });

  it('die erneute Auswahl von neutral im neutralen Zustand feuert nichts (kein Schein-Wechsel)', () => {
    const props = renderShell({ session: NEUTRAL_NORDWERK });
    fireEvent.change(screen.getByLabelText('Aktive Rolle wechseln (Simulation)'), {
      target: { value: '' },
    });
    expect(props.onSwitchRole).not.toHaveBeenCalled();
    expect(screen.getByRole('status').textContent).toBe('');
  });
});

describe('AppShell – Twin Explorer eingebettet unter „Kunden"', () => {
  it('rendert den Explorer innerhalb der Shell und der Kunden-Ort zeigt auf /twin', () => {
    renderShell({ activeId: 'kunden' }, <TenantOverview tenants={DEMO_TENANTS} />);

    // Explorer-Inhalt liegt im main-Landmark der Shell.
    const main = screen.getByRole('main');
    expect(
      within(main).getByRole('heading', { name: 'Digital Twin Explorer' }),
    ).toBeInTheDocument();

    // Der Nav-Ort „Kunden" verlinkt den Explorer.
    const nav = screen.getByRole('navigation', { name: 'Hauptnavigation' });
    expect(within(nav).getByRole('link', { name: /Kunden/ })).toHaveAttribute('href', '/twin');
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
      target: { value: TENANT_ID.FINOVIA },
    });
    // Der Submit-Button spiegelt die Auswahl im Klartext – ohne Rollenbehauptung.
    fireEvent.click(screen.getByRole('button', { name: 'Bei Finovia Digital Bank AG anmelden' }));
    expect(onSubmit).toHaveBeenCalledWith(TENANT_ID.FINOVIA);
  });
});

describe('LoginPage – Simulation beschriftet, Anmeldung erzeugt die NEUTRALE Sitzung (AC 5/6)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    routerPush.mockClear();
  });

  it('bleibt als Simulation beschriftet und enthält keine Rollenauswahl', () => {
    render(
      <SessionProvider>
        <LoginPage />
      </SessionProvider>,
    );
    expect(
      screen.getByRole('heading', { level: 1, name: 'Anmelden – Simulation' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/keine echte Sicherheit/i)).toBeInTheDocument();
    expect(screen.queryAllByRole('radio')).toHaveLength(0);
  });

  it('schreibt beim Anmelden eine ROLLENLOSE Sitzung und führt nach /heute', () => {
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
    expect(routerPush).toHaveBeenCalledWith('/heute');
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

describe('PlaceholderPage – ehrliche Empty-Message', () => {
  /**
   * FIXTURE-WECHSEL (WP-032 Slice 2): Bis hierher lief dieser Test auf dem Ort „Reports". Der
   * ist seit Slice 2 live und trägt deshalb keinen `plannedScreen` mehr. Geprüft wird jetzt der
   * verbliebene Platzhalter-Ort. Die REGEL bleibt unverändert (Ort, Leitfrage, ehrliche
   * Empty-Message, Klartext-Screenname ohne Screen-Code) – gewechselt hat nur das Testobjekt.
   * Der Testling wird bewusst aus `NAV_PLACES` gezogen, damit er nicht auf einen Ort zeigt, der
   * inzwischen live ist.
   */
  const platzhalter = NAV_PLACES.find((p) => p.live !== true);

  it('es gibt (noch) einen Platzhalter-Ort, auf dem diese Message greift', () => {
    // Blindheitsschutz: ohne Platzhalter-Ort wäre der Test unten leer statt grün. Fällt der
    // letzte Ort weg, muss hier bewusst auf eine synthetische Fixture umgestellt werden.
    expect(platzhalter, 'kein Platzhalter-Ort mehr in NAV_PLACES').toBeDefined();
    expect(platzhalter?.plannedScreen).toBeTruthy();
  });

  it('zeigt Ort, Leitfrage und die „entsteht in einer späteren Phase"-Message', () => {
    if (!platzhalter) throw new Error('Testfixture fehlt: Platzhalter-Ort');
    render(<PlaceholderPage place={platzhalter} />);
    expect(screen.getByRole('heading', { level: 1, name: platzhalter.label })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /entsteht in einer späteren Phase/i }),
    ).toBeInTheDocument();
    // WP-028/DR-0013: der geplante Screen erscheint als Klartext-Name, ohne Screen-Code („S…").
    expect(screen.getByText(new RegExp(platzhalter.plannedScreen as string))).toBeInTheDocument();
    expect(screen.queryByText(/\bS\d{2}\b/)).not.toBeInTheDocument();
  });
});
