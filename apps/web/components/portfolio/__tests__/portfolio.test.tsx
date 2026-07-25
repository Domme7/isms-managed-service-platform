/**
 * Render-Tests des Berater-Portfolio-Dashboards (DR-0017 Stage 1).
 *
 * Gegen den echten `DEMO_SEED` (keine Mocks): Rangliste über alle Kundenfirmen (kein Provider),
 * Heatmap mit den vier Abdeckungs-Spalten, Eintauchen per `onDive`, ehrlicher Empty-State +
 * Ehrlichkeitszeilen.
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TENANT_ID } from '@isms/demo-seed';
import { DEMO_ROLES } from '../../../lib/shell/roles';
import { PortfolioContent } from '../PortfolioContent';

const berater = DEMO_ROLES.find((r) => r.id === 'R08');
if (!berater) throw new Error('Testfixture: Betreiberrolle R08 fehlt');

describe('PortfolioContent – Berater-Portfolio', () => {
  it('führt jede Kundenfirma als eintauchbare Karte (kein Provider)', () => {
    render(<PortfolioContent role={berater} />);
    for (const name of [
      'Nordstern Manufacturing SE',
      'Rheinbank Digital AG',
      'MediNova Clinics Holding',
      'AlpenCloud GmbH',
      'GreenGrid Energy Services',
    ]) {
      expect(
        screen.getByRole('button', { name: `Cockpit von ${name} öffnen` }),
      ).toBeInTheDocument();
    }
    // Der Provider (Consulting Operator) ist KEINE Kundenzeile.
    expect(
      screen.queryByRole('button', { name: /Consulting Operator Demo/ }),
    ).not.toBeInTheDocument();
  });

  it('rendert die Heatmap mit den vier Abdeckungs-Spalten', () => {
    render(<PortfolioContent role={berater} />);
    const heatmap = screen.getByRole('table');
    for (const spalte of ['Controls', 'Risiken', 'Owner', 'Vertrauen']) {
      expect(within(heatmap).getByRole('columnheader', { name: spalte })).toBeInTheDocument();
    }
    // Je Kunde eine Zeile mit Zeilenkopf (Firmenname).
    expect(
      within(heatmap).getByRole('rowheader', { name: 'Nordstern Manufacturing SE' }),
    ).toBeInTheDocument();
  });

  it('Klick auf eine Kundenkarte taucht mit deren tenant_id ein (Cockpit-Dive)', () => {
    const onDive = vi.fn();
    render(<PortfolioContent role={berater} onDive={onDive} />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Cockpit von Nordstern Manufacturing SE öffnen' }),
    );
    expect(onDive).toHaveBeenCalledWith(TENANT_ID.NORDWERK);
  });

  it('Klick auf eine Heatmap-Zelle taucht ebenfalls in denselben Kunden ein', () => {
    const onDive = vi.fn();
    render(<PortfolioContent role={berater} onDive={onDive} />);
    // Eine Zelle von Rheinbank (Slot finovia) – über das aria-label eindeutig.
    const zelle = screen.getAllByRole('button', {
      name: /Rheinbank Digital AG,.*Cockpit öffnen/,
    })[0];
    fireEvent.click(zelle);
    expect(onDive).toHaveBeenCalledWith(TENANT_ID.FINOVIA);
  });

  it('GreenGrid erscheint als ehrlicher Empty-State (kein Datenbestand erfasst)', () => {
    render(<PortfolioContent role={berater} />);
    expect(screen.getByText(/Noch kein Datenbestand erfasst/)).toBeInTheDocument();
  });

  it('trägt die Ehrlichkeitszeile (kein Prüfergebnis) und den Umschalter zur Eisenhower-Priorisierung', () => {
    render(<PortfolioContent role={berater} />);
    // Ehrlichkeitszeile bleibt: erfasste Datenlage nach Regel, kein Prüfergebnis/Score.
    expect(screen.getByText(/kein Prüfergebnis/)).toBeInTheDocument();
    // Umschalter mit beiden Sichten.
    expect(screen.getByRole('button', { name: 'Datenlage' })).toBeInTheDocument();
    const prioTab = screen.getByRole('button', { name: 'Priorisierung' });

    // Umschalten → Eisenhower-Board, ehrlich als ABLEITUNG benannt (kein erfundener Wert), Regel sichtbar.
    fireEvent.click(prioTab);
    expect(screen.getByText(/Abgeleitet aus dem Datenzustand/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Sofort erledigen/ })).toBeInTheDocument();
    expect(screen.getByText(/Quadrant = Wichtigkeit/)).toBeInTheDocument();
    // Die Frist ist als abgeleiteter Vorschlag gekennzeichnet, nicht als Kunden-Termin.
    expect(screen.getByText(/abgeleiteter Vorschlag/)).toBeInTheDocument();
  });

  it('rendert ohne Rolle (neutral) vollständig – kein Rollenzusatz, aber die Rangliste steht', () => {
    // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop (hier neutral = null), kein ARIA-Attribut.
    render(<PortfolioContent role={null} />);
    expect(
      screen.getByRole('button', { name: 'Cockpit von Nordstern Manufacturing SE öffnen' }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Ansicht als/)).not.toBeInTheDocument();
  });
});
