/**
 * Getrennte Anmeldewelten „Berater" und „Kunde" (DR-0015 Nr. 7 / DR-0012 A).
 *
 * Prüft die Substanz der Owner-Direktive:
 *  1. Zwei SICHTBAR getrennte Einstiege existieren (je eine benannte Region).
 *  2. Die Rollen JE WELT stammen aus der SPHÄRE (Dok. 03): Kunde ⇒ R01–R06, Berater ⇒ R08–R11 –
 *     abgeleitet aus `roles.ts`, nicht hartkodiert.
 *  3. Die Auswahl SETZT Rolle UND Mandant (bewusste Nutzerwahl, kein stiller Modus): `onEnter`
 *     bekommt genau die gewählte Rolle und den gewählten Mandanten.
 *  4. Die Reichweite der Sicht wird sphärengerecht benannt (Portfolio vs. ein Unternehmen) – aus
 *     `kundenSicht` (`sphaere.ts`).
 *  5. U-02: die Mandant-Klartextzeile ist da; KEINE Rollencodes im sichtbaren Text; keine Radios.
 *
 * Und die Integration am Login-Page: der Welten-Eintritt schreibt eine Sitzung MIT Rolle und
 * führt ins Cockpit; der neutrale Einstieg (DR-0009) bleibt als dritte Option erhalten.
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { DEMO_TENANTS, TENANT_ID } from '@isms/demo-seed';
import { LoginWelten } from '../LoginWelten';
import { SessionProvider } from '../SessionProvider';
import { DEMO_ROLES } from '../../../lib/shell/roles';
import { parseSession, SESSION_STORAGE_KEY } from '../../../lib/shell/session';
import LoginPage from '../../../app/login/page';

const routerPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: routerPush }),
}));

describe('LoginWelten – zwei sichtbar getrennte Einstiege (DR-0015 Nr. 7)', () => {
  it('rendert genau zwei Welten mit den Titeln „Kunde" und „Berater"', () => {
    render(
      <LoginWelten tenants={DEMO_TENANTS} defaultTenantId={TENANT_ID.NORDWERK} onEnter={vi.fn()} />,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Kunde' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Berater' })).toBeInTheDocument();
    // Die Gruppe ist als getrennte Einstiege benannt (Assistive Tech).
    expect(
      screen.getByRole('group', { name: 'Getrennte Einstiege: Berater und Kunde' }),
    ).toBeInTheDocument();
  });

  it('bietet je Welt die Rollen ihrer Sphäre (Kunde ⇒ R01–R06, Berater ⇒ R08–R11)', () => {
    render(
      <LoginWelten tenants={DEMO_TENANTS} defaultTenantId={TENANT_ID.NORDWERK} onEnter={vi.fn()} />,
    );
    const kundenRollen = DEMO_ROLES.filter((r) => r.sphere === 'Kunde');
    const betreiberRollen = DEMO_ROLES.filter((r) => r.sphere === 'Betreiber');

    const kundeSelect = screen.getByLabelText<HTMLSelectElement>('Rolle für die Kundensicht');
    for (const r of kundenRollen) {
      expect(within(kundeSelect).getByRole('option', { name: r.name })).toBeInTheDocument();
    }
    // Keine Fremdsphäre in der Kundenwelt (z. B. ein Betreiber).
    for (const r of betreiberRollen) {
      expect(within(kundeSelect).queryByRole('option', { name: r.name })).toBeNull();
    }

    const beraterSelect = screen.getByLabelText<HTMLSelectElement>('Rolle für die Beratersicht');
    for (const r of betreiberRollen) {
      expect(within(beraterSelect).getByRole('option', { name: r.name })).toBeInTheDocument();
    }
    for (const r of kundenRollen) {
      expect(within(beraterSelect).queryByRole('option', { name: r.name })).toBeNull();
    }

    // Kein Rollencode im sichtbaren Text (DR-0013 Nr. 12) – die ID bleibt der `value`.
    expect(kundeSelect.textContent ?? '').not.toMatch(/R\d{2}/);
    expect(beraterSelect.textContent ?? '').not.toMatch(/R\d{2}/);
    // Keine Radios (WP-020-Login-Muster): reine Selects.
    expect(screen.queryAllByRole('radio')).toHaveLength(0);
  });

  it('benennt die Reichweite sphärengerecht (Kunde = ein Unternehmen, Berater = Portfolio)', () => {
    render(
      <LoginWelten tenants={DEMO_TENANTS} defaultTenantId={TENANT_ID.NORDWERK} onEnter={vi.fn()} />,
    );
    const kunde = screen.getByRole('region', { name: 'Kunde' });
    expect(kunde.textContent).toContain('dieses eine Unternehmen');
    expect(kunde.textContent).toContain('ohne Portfolio-Übersicht');

    const berater = screen.getByRole('region', { name: 'Berater' });
    expect(berater.textContent).toContain('mandantenübergreifende Portfolio-Übersicht');
    expect(berater.textContent).toContain('Mandantenwechsel');
  });

  it('U-02: erklärt „Mandant" im Klartext – ohne Demo-/Simulations-Etikett', () => {
    const { container } = render(
      <LoginWelten tenants={DEMO_TENANTS} defaultTenantId={TENANT_ID.NORDWERK} onEnter={vi.fn()} />,
    );
    // Der Begriff „Mandant" steht in einem `<strong>`, die Erklärung im Elterntext – deshalb
    // gegen den zusammengesetzten Text prüfen (nicht gegen einen einzelnen Textknoten).
    const erklaerung = container.querySelector('.login-mandant-erklaerung')?.textContent ?? '';
    expect(erklaerung).toContain('Mandant = das Unternehmen, dessen Daten Sie ansehen');
    // Die Erklärzeile selbst trägt kein Demo-/Simulations-Etikett (DR-0011). Bewusst NUR die
    // Zeile geprüft: das Mandanten-Select listet Seed-Namen (z. B. „Consulting Operator Demo"),
    // die ein eigener Textpass nachzieht (WP-033) – der app-weite Wächter maskiert sie.
    expect(erklaerung).not.toMatch(/Demo/i);
    expect(erklaerung).not.toMatch(/Simulation/i);
    expect(erklaerung).not.toMatch(/simuliert/i);
  });

  it('setzt beim Eintritt Rolle UND Mandant (bewusste Nutzerwahl)', () => {
    const onEnter = vi.fn();
    render(
      <LoginWelten tenants={DEMO_TENANTS} defaultTenantId={TENANT_ID.NORDWERK} onEnter={onEnter} />,
    );

    // Kundenwelt: Rolle R05 (Asset / Control Owner) und Mandant Finovia wählen, dann eintreten.
    fireEvent.change(screen.getByLabelText('Rolle für die Kundensicht'), {
      target: { value: 'R05' },
    });
    fireEvent.change(screen.getByLabelText('Mandant für die Kundensicht'), {
      target: { value: TENANT_ID.GREENGRID },
    });
    const kunde = screen.getByRole('region', { name: 'Kunde' });
    fireEvent.click(within(kunde).getByRole('button', { name: /öffnen$/ }));

    expect(onEnter).toHaveBeenCalledWith('R05', TENANT_ID.GREENGRID);
  });

  it('die Beraterwelt setzt eine Betreiberrolle', () => {
    const onEnter = vi.fn();
    render(
      <LoginWelten tenants={DEMO_TENANTS} defaultTenantId={TENANT_ID.NORDWERK} onEnter={onEnter} />,
    );

    fireEvent.change(screen.getByLabelText('Rolle für die Beratersicht'), {
      target: { value: 'R09' },
    });
    const berater = screen.getByRole('region', { name: 'Berater' });
    fireEvent.click(within(berater).getByRole('button', { name: /öffnen$/ }));

    expect(onEnter).toHaveBeenCalledWith('R09', TENANT_ID.NORDWERK);
  });
});

describe('LoginPage – der Welten-Eintritt schreibt eine Sitzung MIT Rolle und führt sphärengerecht (Kunde→Cockpit, Berater→Portfolio)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    routerPush.mockClear();
  });

  it('Profil-Login (primär): „als Firma X eintreten" schreibt R03 + Firma und pusht /cockpit', () => {
    render(
      <SessionProvider>
        <LoginPage />
      </SessionProvider>,
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Als Kunde MediNova Clinics Holding eintreten' }),
    );
    const gespeichert = parseSession(window.localStorage.getItem(SESSION_STORAGE_KEY));
    // Slot tenant-medicore trägt die Anzeige „MediNova"; Kunde-Sphäre → eigenes Cockpit.
    expect(gespeichert).toEqual({ roleId: 'R03', tenantId: TENANT_ID.MEDICORE });
    // Kunde-Sphäre → eigene Kunde-Welt (Mein Dashboard, DR-0018 Stufe 3).
    expect(routerPush).toHaveBeenCalledWith('/mein-dashboard');
  });

  it('Profil-Login (primär): „als Berater/Admin eintreten" schreibt R08 und pusht /portfolio', () => {
    render(
      <SessionProvider>
        <LoginPage />
      </SessionProvider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Als Berater und Admin eintreten' }));
    const gespeichert = parseSession(window.localStorage.getItem(SESSION_STORAGE_KEY));
    expect(gespeichert?.roleId).toBe('R08');
    expect(routerPush).toHaveBeenCalledWith('/portfolio');
  });

  it('Kundenwelt: schreibt Rolle + Mandant und pusht /mein-dashboard', () => {
    render(
      <SessionProvider>
        <LoginPage />
      </SessionProvider>,
    );
    fireEvent.change(screen.getByLabelText('Rolle für die Kundensicht'), {
      target: { value: 'R03' },
    });
    fireEvent.change(screen.getByLabelText('Mandant für die Kundensicht'), {
      target: { value: TENANT_ID.NORDWERK },
    });
    const kunde = screen.getByRole('region', { name: 'Kunde' });
    fireEvent.click(within(kunde).getByRole('button', { name: /öffnen$/ }));

    const gespeichert = parseSession(window.localStorage.getItem(SESSION_STORAGE_KEY));
    expect(gespeichert).toEqual({ roleId: 'R03', tenantId: TENANT_ID.NORDWERK });
    // Kunde = Ein-Unternehmens-Sicht: der Einstieg führt in die eigene Kunde-Welt (DR-0018).
    expect(routerPush).toHaveBeenCalledWith('/mein-dashboard');
  });

  it('Beraterwelt: schreibt eine Betreiberrolle und pusht /portfolio (Berater-Einstieg, DR-0017)', () => {
    render(
      <SessionProvider>
        <LoginPage />
      </SessionProvider>,
    );
    fireEvent.change(screen.getByLabelText('Rolle für die Beratersicht'), {
      target: { value: 'R09' },
    });
    const berater = screen.getByRole('region', { name: 'Berater' });
    fireEvent.click(within(berater).getByRole('button', { name: /öffnen$/ }));

    const gespeichert = parseSession(window.localStorage.getItem(SESSION_STORAGE_KEY));
    expect(gespeichert?.roleId).toBe('R09');
    // Betreiber = Portfolio-Sphäre: der Einstieg führt auf das Berater-Portfolio (alle Kunden).
    expect(routerPush).toHaveBeenCalledWith('/portfolio');
  });

  it('der neutrale Einstieg (DR-0009) bleibt als dritte Option erhalten und schreibt keine Rolle', () => {
    render(
      <SessionProvider>
        <LoginPage />
      </SessionProvider>,
    );
    // Der neutrale `LoginForm` liegt im Aufklapper – seine Felder sind trotzdem im DOM.
    fireEvent.change(screen.getByLabelText('Mandant wählen'), {
      target: { value: TENANT_ID.GREENGRID },
    });
    fireEvent.click(screen.getByRole('button', { name: /anmelden$/i }));

    const gespeichert = parseSession(window.localStorage.getItem(SESSION_STORAGE_KEY));
    expect(gespeichert).toEqual({ tenantId: TENANT_ID.GREENGRID });
    expect(gespeichert?.roleId).toBeUndefined();
    // Neutral = Portfolio-Sphäre (DR-0009/DR-0017): der Einstieg führt auf das Berater-Portfolio.
    expect(routerPush).toHaveBeenCalledWith('/portfolio');
  });
});
