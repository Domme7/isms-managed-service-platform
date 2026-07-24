/**
 * Tests des Profil-Logins (5-Profile-Modell, DR-0017 / Owner-Richtung 2026-07-24).
 *
 * Beweist: je Kundenfirma ein Kunden-Profil (kein Provider), ein Berater/Admin-Profil, KEINE feine
 * Rollenwahl im Einstieg; die Profile setzen die richtige Sphären-Rolle + den richtigen Mandanten.
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TENANT_ID } from '@isms/demo-seed';
import { getCustomerTenants } from '../../../lib/portfolio/data';
import { BERATER_PROFIL_ROLE, KUNDE_PROFIL_ROLE, LoginProfile } from '../LoginProfile';

const customers = getCustomerTenants();

function renderProfile(onEnter = vi.fn()) {
  render(
    <LoginProfile customers={customers} beraterTenantId={TENANT_ID.NORDWERK} onEnter={onEnter} />,
  );
  return onEnter;
}

describe('LoginProfile – 5-Profile-Login', () => {
  it('zeigt je Kundenfirma ein Kunden-Profil (kein Provider) + ein Berater/Admin-Profil', () => {
    renderProfile();
    for (const firma of customers) {
      expect(
        screen.getByRole('button', { name: `Als Kunde ${firma.display_name} eintreten` }),
      ).toBeInTheDocument();
    }
    expect(
      screen.getByRole('button', { name: 'Als Berater und Admin eintreten' }),
    ).toBeInTheDocument();
    // Der Provider (Consulting Operator) ist kein Kunden-Profil.
    expect(screen.queryByRole('button', { name: /Consulting Operator/ })).not.toBeInTheDocument();
    // KEINE feine Rollenwahl im Einstieg (kein Select).
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });

  it('Kunden-Profil setzt die Standard-Kundenrolle (ISMS Manager, R03) + den Firmen-Mandanten', () => {
    const onEnter = renderProfile();
    fireEvent.click(
      screen.getByRole('button', { name: 'Als Kunde Rheinbank Digital AG eintreten' }),
    );
    // Slot tenant-finovia trägt die Anzeige „Rheinbank" – die stabile ID wird gesetzt.
    expect(onEnter).toHaveBeenCalledWith(KUNDE_PROFIL_ROLE, TENANT_ID.FINOVIA);
    expect(KUNDE_PROFIL_ROLE).toBe('R03');
  });

  it('Berater-Profil setzt die Betreiberrolle (Managed Service Lead, R08)', () => {
    const onEnter = renderProfile();
    fireEvent.click(screen.getByRole('button', { name: 'Als Berater und Admin eintreten' }));
    expect(onEnter).toHaveBeenCalledWith(BERATER_PROFIL_ROLE, TENANT_ID.NORDWERK);
    expect(BERATER_PROFIL_ROLE).toBe('R08');
  });

  it('trennt Kunden- und Beratersicht sichtbar (zwei Profil-Gruppen mit eigener Überschrift)', () => {
    renderProfile();
    expect(
      screen.getByRole('heading', { name: 'Als Kunde eines Unternehmens' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Als Berater und Admin' })).toBeInTheDocument();
  });
});
