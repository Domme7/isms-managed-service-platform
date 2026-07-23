/**
 * Render-/Smoke-Tests der App-Shell & Login-Simulation (WP-011, Acceptance).
 *
 * Prüft an den präsentationalen Komponenten (ohne Router-Mocks) gegen echte Quellen:
 *  1. Shell rendert die acht Nav-Orte; aktiver Ort markiert.
 *  2. Aktive Rolle + Mandant erscheinen in der Topbar; Wechsel löst Callback aus.
 *  3. Twin Explorer ist innerhalb der Shell erreichbar (eingebettet unter „Kunden").
 *  4. Login-Simulation: Rolle + Mandant wählbar, Submit liefert die gewählten IDs (kein Passwort).
 *  5. Eine Platzhalterseite zeigt ihre klare Empty-Message.
 */
import type { ReactNode } from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DEMO_TENANTS, TENANT_ID } from '@isms/demo-seed';
import { AppShell } from '../AppShell';
import { LoginForm } from '../LoginForm';
import { PlaceholderPage } from '../PlaceholderPage';
import { NAV_PLACES, getPlace } from '../../../lib/shell/places';
import { DEMO_ROLES, getRole } from '../../../lib/shell/roles';
import { resolveSession, type ResolvedSession } from '../../../lib/shell/session';
import { TenantOverview } from '../../twin/TenantOverview';

const EXECUTIVE_NORDWERK = resolveSession({
  roleId: 'R01',
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

  it('löst beim Wechsel die jeweiligen Callbacks aus (reine Demo-Navigation)', () => {
    const props = renderShell();
    fireEvent.change(screen.getByLabelText('Aktive Rolle wechseln (Simulation)'), {
      target: { value: 'R07' },
    });
    expect(props.onSwitchRole).toHaveBeenCalledWith('R07');

    fireEvent.change(screen.getByLabelText('Aktiven Mandanten wechseln (Simulation)'), {
      target: { value: TENANT_ID.FINOVIA },
    });
    expect(props.onSwitchTenant).toHaveBeenCalledWith(TENANT_ID.FINOVIA);
  });

  it('zeigt den permanenten Demo-Hinweis (keine echte Sicherheit)', () => {
    renderShell();
    expect(screen.getByText(/keine echte Anmeldung/i)).toBeInTheDocument();
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

describe('LoginForm – Rolle + Mandant wählbar, kein Passwort', () => {
  it('bietet Rollen (R01–R12) und alle vier Mandanten zur Auswahl', () => {
    render(
      <LoginForm
        roles={DEMO_ROLES}
        tenants={DEMO_TENANTS}
        defaultRoleId="R01"
        defaultTenantId={TENANT_ID.NORDWERK}
        onSubmit={vi.fn()}
      />,
    );
    // Rolle als Radio-Auswahl (kein Passwortfeld).
    expect(screen.queryByLabelText(/passwort/i)).not.toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Executive Sponsor/ })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Auditor/ })).toBeInTheDocument();
    // Alle vier Mandanten als Optionen.
    for (const tenant of DEMO_TENANTS) {
      expect(
        screen.getByRole('option', { name: new RegExp(tenant.display_name) }),
      ).toBeInTheDocument();
    }
  });

  it('meldet beim Submit die gewählte Rolle + Mandant (kein echtes Auth)', () => {
    const onSubmit = vi.fn();
    render(
      <LoginForm
        roles={DEMO_ROLES}
        tenants={DEMO_TENANTS}
        defaultRoleId="R01"
        defaultTenantId={TENANT_ID.NORDWERK}
        onSubmit={onSubmit}
      />,
    );

    fireEvent.click(screen.getByRole('radio', { name: /Auditor/ }));
    fireEvent.change(screen.getByLabelText('Mandant wählen'), {
      target: { value: TENANT_ID.FINOVIA },
    });
    // Der Submit-Button spiegelt die Auswahl im Klartext.
    const auditor = getRole('R07')!;
    fireEvent.click(screen.getByRole('button', { name: new RegExp(`Als ${auditor.name} bei`) }));
    expect(onSubmit).toHaveBeenCalledWith('R07', TENANT_ID.FINOVIA);
  });
});

describe('PlaceholderPage – ehrliche Empty-Message', () => {
  it('zeigt Ort, Leitfrage und die „entsteht in einer späteren Phase"-Message', () => {
    render(<PlaceholderPage place={getPlace('reports')} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Reports' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /entsteht in einer späteren Phase/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/S10 – Reporting Studio/)).toBeInTheDocument();
  });
});
