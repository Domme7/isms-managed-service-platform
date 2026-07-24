/**
 * Produkt-Landing `/willkommen` (DR-0015 Nr. 7 / DR-0014).
 *
 * Prüft die Substanz der Owner-Idee:
 *  1. Sie beantwortet „Was ist das?" (Produktname + beschreibender Titel + Lead).
 *  2. „Für wen?": die vier rollenbezogenen Erlebniswelten stammen WÖRTLICH aus `roles.ts`
 *     (`EXPERIENCE_WORLDS`) – nichts erfunden.
 *  3. Ehrliche Differenzierer (digitaler Zwilling, Decision Center, Managed-Service-Modell,
 *     Ehrlichkeit) und die ehrliche Grenze („kein Ersatz für SIEM/CMDB/…").
 *  4. CTA führt zur Anmeldung.
 *  5. KEINE Impersonation, KEINE Preise/Zahlenversprechen, KEINE Demo-Kennzeichnung.
 */
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS } from '@isms/demo-seed';
import { WillkommenContent } from '../WillkommenContent';
import { EXPERIENCE_WORLDS } from '../../../lib/shell/roles';

describe('WillkommenContent – Produkt-Landing vor der Anmeldung (DR-0015)', () => {
  it('beantwortet „Was ist das?" mit Produktname, Titel und Lead', () => {
    render(<WillkommenContent />);
    expect(screen.getByText('ISMS Managed Service Platform')).toBeInTheDocument();
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent ?? '').toMatch(/digitaler Zwilling/);
    // Der Lead nennt die Produktverfassung (mandantenfähig, rollenbasiert, Managed Services).
    expect(screen.getByText(/mandantenfähiges, rollenbasiertes/)).toBeInTheDocument();
  });

  it('zeigt „Für wen?" als die vier Erlebniswelten mit ihren Leitfragen (aus roles.ts)', () => {
    render(<WillkommenContent />);
    const liste = screen.getByRole('list', { name: 'Rollenbezogene Erlebniswelten' });
    for (const welt of Object.values(EXPERIENCE_WORLDS)) {
      expect(within(liste).getByRole('heading', { level: 3, name: welt.name })).toBeInTheDocument();
      // Die Leitfrage steht wörtlich (in Anführungszeichen) – nicht neu erfunden.
      expect(liste.textContent).toContain(welt.leitfrage);
    }
  });

  it('nennt die vier ehrlichen Differenzierer und die ehrliche Grenze', () => {
    render(<WillkommenContent />);
    for (const titel of [
      'Digitaler Unternehmenszwilling',
      'Decision Center',
      'Managed-Service-Modell',
      'Ehrlichkeit vor Wirkung',
    ]) {
      expect(screen.getByRole('heading', { level: 3, name: titel })).toBeInTheDocument();
    }
    // Ehrliche Grenze aus der Produktverfassung (kein Ersatz operativer Quellsysteme).
    expect(screen.getByText(/kein Ersatz für operative Quellsysteme/)).toBeInTheDocument();
    expect(screen.getByText(/SIEM, CMDB, Ticketing/)).toBeInTheDocument();
  });

  it('führt per CTA zur Anmeldung', () => {
    render(<WillkommenContent />);
    const loginLinks = screen
      .getAllByRole('link')
      .filter((a) => a.getAttribute('href') === '/login');
    expect(loginLinks.length).toBeGreaterThanOrEqual(1);
  });

  it('bleibt ehrlich: keine Impersonation, keine Preise, keine Demo-Kennzeichnung', () => {
    const { container } = render(<WillkommenContent />);
    const text = container.textContent ?? '';
    // Keine Mandantennamen/IDs (keine Impersonation, DR-0015).
    for (const t of DEMO_TENANTS) {
      expect(text).not.toContain(t.display_name);
    }
    // Keine Preise (kein €/EUR/„Preis" auf der Landing) und keine Demo-Kennzeichnung (DR-0011).
    expect(text).not.toMatch(/€|\bEUR\b|\bPreis/i);
    expect(text).not.toMatch(/\bDemo\b/i);
    expect(text).not.toMatch(/Simulation/i);
    expect(text).not.toMatch(/synthetisch/i);
  });
});
