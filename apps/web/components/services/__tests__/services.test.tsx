/**
 * Render-Tests der „Services"-Ansicht (WP-012 Slice 2, Acceptance).
 *
 * Prüft gegen den echten `DEMO_SEED` (keine Mocks):
 *  1. Mandanten-Sicht (R08 + Nordwerk): Leitfrage + drei Services mit aufgelösten Namen,
 *     SLA-Kurzinfo, Deliverable-Status als Text und qualitativem Vertrauensgrad.
 *  2. Portfolio-Sicht: erscheint für R08 (und R10, Consulting & Service World) inkl.
 *     Mandanten ohne Services; für R03 stattdessen der Vorbehaltshinweis (reine
 *     Anzeige-Verdichtung, keine Sicherheitsgrenze).
 *  3. Empty-State für Finovia (keine Services im Seed).
 *  4. „Nicht angemeldet"-Zustand mit Link zur Login-Simulation.
 */
import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { TENANT_ID } from '@isms/demo-seed';
import { ServicesContent } from '../ServicesContent';
import { ServicesView } from '../ServicesView';
import { SessionProvider } from '../../shell/SessionProvider';
import { resolveSession, type ResolvedSession } from '../../../lib/shell/session';

function session(roleId: string, tenantId: string): ResolvedSession {
  const resolved = resolveSession({ roleId, tenantId });
  if (!resolved) throw new Error(`Testfixture nicht auflösbar: ${roleId}/${tenantId}`);
  return resolved;
}

describe('ServicesContent – Mandanten-Sicht (R08 + Nordwerk)', () => {
  it('zeigt die Leitfrage und die drei Nordwerk-Services mit aufgelösten Namen', () => {
    const { role, tenant } = session('R08', TENANT_ID.NORDWERK);
    render(<ServicesContent role={role} tenant={tenant} />);

    expect(
      screen.getByText(/Welche Services laufen für Nordwerk Manufacturing SE/),
    ).toBeInTheDocument();

    // Service-Karten als h3 (eindeutig gegenüber den Namen in der Portfolio-Liste).
    for (const name of [
      'Kontinuierliches Risiko- & Control-Monitoring',
      'Nachweis- & Evidence-Betrieb',
      'Management- & Entscheidungsreporting',
    ]) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument();
    }
  });

  it('zeigt SLA-Kurzinfo, Deliverable-Status als Text und qualitativen Vertrauensgrad', () => {
    const { role, tenant } = session('R08', TENANT_ID.NORDWERK);
    render(<ServicesContent role={role} tenant={tenant} />);

    // SLA über die tatsächliche part_of-Kante aufgelöst (Name enthält das synthetische Band).
    expect(screen.getByText('SLA – Nachweisbetrieb (Band „Priority")')).toBeInTheDocument();

    // Deliverable im Entwurf: Status als Text, nie nur Farbe (Dok. 06 06-D11).
    const draft = screen.getByText('Management-Report Q2/2026 (Entwurf, synthetisch)');
    expect(draft.parentElement?.textContent).toMatch(/Status: Entwurf/);

    // Wirkungsbeitrag qualitativ statt nackter Zahl (Dok. 06 P04; Muster aus dem Twin).
    expect(screen.getAllByText(/Vertrauensgrad: hoch \(0,8\)/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Vertrauensgrad: mittel \(0,75\)/).length).toBeGreaterThanOrEqual(1);
  });

  it('zeigt für R08 die Portfolio-Sicht über alle vier Mandanten (auch ohne Services)', () => {
    const { role, tenant } = session('R08', TENANT_ID.NORDWERK);
    render(<ServicesContent role={role} tenant={tenant} />);

    const portfolio = screen.getByRole('region', { name: 'Portfolio: Alle Mandanten' });
    // Alle vier Mandanten nebeneinander (reine Aggregation je Mandant, O-WP012-03).
    for (const tenantName of [
      'Nordwerk Manufacturing SE',
      'Finovia Digital Bank AG',
      'MediCore Health Services GmbH',
      'Consulting Operator Demo',
    ]) {
      expect(
        within(portfolio).getByRole('heading', { level: 3, name: tenantName }),
      ).toBeInTheDocument();
    }
    // Zähler aus dem Seed abgeleitet: 3 / 0 / 0 / 2.
    expect(within(portfolio).getByText('3 Managed Services')).toBeInTheDocument();
    expect(within(portfolio).getByText('2 Managed Services')).toBeInTheDocument();
    expect(within(portfolio).getAllByText('0 Managed Services')).toHaveLength(2);
    expect(
      within(portfolio).getAllByText('Keine Managed Services im aktuellen Demo-Seed.'),
    ).toHaveLength(2);
  });
});

describe('ServicesContent – Rollen-Gating der Portfolio-Sicht (Welt-Mapping Dok. 06 §5)', () => {
  it('zeigt die Portfolio-Sicht NICHT für R03, sondern den Vorbehaltshinweis', () => {
    const { role, tenant } = session('R03', TENANT_ID.NORDWERK);
    render(<ServicesContent role={role} tenant={tenant} />);

    expect(
      screen.queryByRole('heading', { name: 'Portfolio: Alle Mandanten' }),
    ).not.toBeInTheDocument();
    expect(screen.getByText(/der Service-Organisation vorbehalten/)).toBeInTheDocument();
    // Ehrlicher Demo-Hinweis: UI-Verdichtung, keine Sicherheitsgrenze.
    expect(screen.getByText(/keine Sicherheitsgrenze/)).toBeInTheDocument();
  });

  it('zeigt die Portfolio-Sicht auch für R10 (ISMS Consultant, Consulting & Service World)', () => {
    const { role, tenant } = session('R10', TENANT_ID.NORDWERK);
    render(<ServicesContent role={role} tenant={tenant} />);

    expect(
      screen.getByRole('heading', { name: 'Portfolio: Alle Mandanten' }),
    ).toBeInTheDocument();
  });
});

describe('ServicesContent – Empty-State (Finovia ohne Services)', () => {
  it('zeigt eine ehrliche Meldung und verweist auf die Mandanten mit Services (aus dem Seed)', () => {
    const { role, tenant } = session('R08', TENANT_ID.FINOVIA);
    render(<ServicesContent role={role} tenant={tenant} />);

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Keine Managed Services für Finovia Digital Bank AG',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Services laufen derzeit für Nordwerk Manufacturing SE und Consulting Operator Demo/,
      ),
    ).toBeInTheDocument();
    // R08 sieht trotz Empty-State weiterhin das Portfolio (mandantenübergreifende Verdichtung).
    expect(
      screen.getByRole('heading', { name: 'Portfolio: Alle Mandanten' }),
    ).toBeInTheDocument();
  });
});

describe('ServicesView – „nicht angemeldet" (Simulation)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('zeigt den Hinweis samt Link zur Login-Simulation', () => {
    render(
      <SessionProvider>
        <ServicesView />
      </SessionProvider>,
    );

    expect(
      screen.getByRole('heading', { name: 'Nicht angemeldet (Simulation)' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Zur Anmelde-Simulation/ })).toHaveAttribute(
      'href',
      '/login',
    );
  });
});
