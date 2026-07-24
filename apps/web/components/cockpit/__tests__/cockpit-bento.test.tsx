/**
 * Render-Tests des Bento-Cockpits (WP-034 Slice 2, DR-0016 – Owner-Wahl Variante A).
 *
 * Geprüft wird gegen den echten `DEMO_SEED` (keine Mocks):
 *  1. Kopf + Kontextleiste + Legende + Leitfrage (dieselbe Ehrlichkeitsanatomie wie zuvor).
 *  2. Bento-Übersicht aus dem belegten Modell: Radar (vier Abdeckungen), Zahl- und Ringkacheln.
 *  3. EINTAUCHEN als echte Bedienung: Klick auf eine Kachel öffnet ihr vollständiges Detail
 *     (selbsterklärende Kachel mit echtem Quell-Link), „zurück" führt zur Übersicht.
 *  4. Ehrlichkeitsgrenze (DR-0008): keine Kachel-Zahl ist ein Prozent-Score; benannte Lücken da;
 *     der Radar zeigt „x von y", keinen erfundenen Domänen-Score.
 *  5. Sphärentrennung Kunde/Betreiber (DR-0012); neutral-fähig (DR-0009).
 *  6. Leerer Mandant: ehrlicher Leerzustand, kein Bento, kein fremder Mandant.
 *  7. Hell/Dunkel remappt die --ck-*-Token wirklich (nicht nur das Attribut).
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { CockpitBentoContent } from '../CockpitBentoContent';
import { buildHeuteDashboard } from '../../../lib/heute/dashboard';
import { getRole, type DemoRole } from '../../../lib/shell/roles';

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
function kachel(container: HTMLElement, key: string): HTMLElement {
  const el = container.querySelector<HTMLElement>(`[data-tilekey="${key}"]`);
  if (!el) throw new Error(`Bento-Kachel fehlt: ${key}`);
  return el;
}

/* -------------------------------------------------------------------------- */

describe('Bento-Cockpit – Kopf, Kontextleiste, Legende', () => {
  it('führt mit der belegten Leitfrage und rendert die Kontextleiste', () => {
    const { container } = render(
      <CockpitBentoContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Cockpit' })).toBeInTheDocument();
    expect(container.querySelector('p.tw-question')?.textContent).toBe(
      'Wie steht Nordstern Manufacturing SE heute da – was ist erfasst und wo sind die Lücken?',
    );
    const kontext = screen.getByRole('region', { name: 'Kontext dieser Seite' });
    expect(within(kontext).getByText('Nordstern Manufacturing SE')).toBeInTheDocument();
    expect(within(kontext).getByText('16.03.2026')).toBeInTheDocument();
    expect(kontext.textContent ?? '').not.toMatch(/R\d{2}/);
    // Legende (nie nur Farbe): vier Zustände + Ehrlichkeitszeile.
    const legende = container.querySelector('.ck-legende') as HTMLElement;
    expect(legende.querySelectorAll('.ck-legende-item')).toHaveLength(4);
    expect(legende.textContent ?? '').toMatch(/kein Prüfergebnis/);
  });
});

describe('Bento-Cockpit – Übersicht aus dem belegten Modell', () => {
  it('rendert Radar (vier Abdeckungen als „x von y") und je Abdeckung eine Ringkachel', () => {
    const { container } = render(
      <CockpitBentoContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const dashboard = buildHeuteDashboard(TENANT_ID.NORDWERK);
    if (!dashboard) throw new Error('Dashboard fehlt');

    // Radar-Werteliste: eine Zeile je Abdeckung, jede als „x von y" (kein Score).
    const werte = container.querySelectorAll('.ck-radar-werte li');
    expect(werte).toHaveLength(dashboard.coverage.length);
    for (const li of Array.from(werte)) {
      expect(li.textContent ?? '').toMatch(/\d+ von \d+|keine Grundgesamtheit/);
      expect(li.textContent ?? '', 'Prozent-Score im Radar').not.toMatch(/%|Prozent/);
    }

    // Je Abdeckung eine adressierbare Ringkachel + Radar + Bestand.
    for (const t of dashboard.coverage) expect(kachel(container, t.id)).toBeInTheDocument();
    expect(kachel(container, 'radar')).toBeInTheDocument();
    expect(kachel(container, 'bestand')).toBeInTheDocument();

    // KEINE Kachel-Zahl ist ein Prozentwert (immer „x von y").
    for (const z of Array.from(container.querySelectorAll('.ck-bento-num, .ck-bento-wert'))) {
      expect(z.textContent ?? '').not.toMatch(/%|Prozent/);
    }
  });
});

describe('Bento-Cockpit – Eintauchen als echte Bedienung', () => {
  it('Klick auf eine Ringkachel öffnet ihr vollständiges Detail mit echtem Quell-Link; „zurück" führt zur Übersicht', () => {
    const { container } = render(
      <CockpitBentoContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    // Übersicht ist da.
    expect(container.querySelector('.ck-bento')).not.toBeNull();

    fireEvent.click(kachel(container, 'controls_nachweis'));

    // Detail zeigt die vollständige, selbsterklärende Kachel (mit Ermittlungsregel + Drill-down).
    const detail = container.querySelector('.ck-bento-detail') as HTMLElement;
    expect(detail).not.toBeNull();
    const tile = detail.querySelector('.db-tile[data-tile-id="controls_nachweis"]');
    expect(tile).not.toBeNull();
    const quelle = detail.querySelector('.db-drill a');
    const href = quelle?.getAttribute('href') ?? '';
    expect(href.length, 'toter Quell-Link').toBeGreaterThan(0);
    expect(href).not.toBe('#');
    // Übersicht ist während des Eintauchens ausgeblendet.
    expect(container.querySelector('.ck-bento')).toBeNull();

    // Zurück führt zur Übersicht.
    fireEvent.click(screen.getByRole('button', { name: /zurück zur Übersicht/ }));
    expect(container.querySelector('.ck-bento')).not.toBeNull();
    expect(container.querySelector('.ck-bento-detail')).toBeNull();
  });

  it('Klick auf den Radar taucht in alle vier Abdeckungen (vollständige Kacheln)', () => {
    const { container } = render(
      <CockpitBentoContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const dashboard = buildHeuteDashboard(TENANT_ID.NORDWERK);
    if (!dashboard) throw new Error('Dashboard fehlt');

    fireEvent.click(kachel(container, 'radar'));
    const detail = container.querySelector('.ck-bento-detail') as HTMLElement;
    expect(detail).not.toBeNull();
    expect(detail.querySelectorAll('.ck-bento-detail-grid > li .db-tile')).toHaveLength(
      dashboard.coverage.length,
    );
    // Die offengelegte Radar-Regel steht im Detail (kein Score).
    expect(detail.querySelector('.ck-bento-detail-lead')?.textContent ?? '').toMatch(/x von y/);
  });
});

describe('Bento-Cockpit – Ehrlichkeitsgrenze und Rückweg', () => {
  it('benennt „Was hier bewusst nicht steht" und führt zurück nach „Heute"', () => {
    const { container } = render(
      <CockpitBentoContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(
      screen.getByRole('heading', { level: 2, name: 'Was hier bewusst nicht steht' }),
    ).toBeInTheDocument();
    expect(container.querySelector('a[href="/heute"]')).not.toBeNull();
    // Warnungen aus echten Lücken + Lebenszyklus-Leiste sind da.
    expect(container.querySelectorAll('.ck-warnung').length).toBeGreaterThan(0);
    expect(container.querySelector('.ck-lebenszyklus')).not.toBeNull();
  });
});

describe('Bento-Cockpit – Sphärentrennung und neutral', () => {
  it('Kundenrolle (R03) sieht die Ein-Unternehmens-Sphäre; Betreiber (R08) das Portfolio', () => {
    const kunde = render(
      <CockpitBentoContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(kunde.container.textContent ?? '').toContain('Kundensicht: dieses eine Unternehmen.');
    kunde.unmount();

    const betreiber = render(
      <CockpitBentoContent role={role('R08')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(betreiber.container.textContent ?? '').toContain('Betreibersicht: Portfolio.');
  });

  it('neutral (keine Rolle) rendert vollständig, inkl. Kontextleiste', () => {
    const { container } = render(
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop (null = neutral, DR-0009).
      <CockpitBentoContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect((container.textContent ?? '').length).toBeGreaterThan(200);
    expect(screen.getByRole('region', { name: 'Kontext dieser Seite' })).toBeInTheDocument();
    expect(container.querySelector('.ck-bento')).not.toBeNull();
  });
});

describe('Bento-Cockpit – leerer Mandant', () => {
  for (const tenantId of [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
    it(`${tenantId}: ehrlicher Leerzustand ohne Bento und ohne fremden Mandanten`, () => {
      const { container } = render(
        <CockpitBentoContent role={role('R01')} tenant={tenant(tenantId)} />,
      );
      // Kein Bento, keine Legende (keine Farben ohne Bestand), aber die ehrliche Datenlücken-Kachel.
      expect(container.querySelector('.ck-bento')).toBeNull();
      expect(container.querySelector('.ck-legende')).toBeNull();
      expect(container.querySelector('.db-badge--kein_datenbestand')?.textContent ?? '').toContain(
        'kein Datenbestand',
      );
      // Keine Existenzaussage über fremde Mandanten.
      const html = container.innerHTML;
      for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== tenantId)) {
        expect(html).not.toContain(fremd.display_name);
        expect(html).not.toContain(fremd.tenant_id);
      }
    });
  }
});

describe('Bento-Cockpit – Hell/Dunkel remappt die Token wirklich', () => {
  it('der Umschalter setzt --ck-panel-bg im Dunkelmodus neu (nicht nur das Attribut)', () => {
    window.localStorage.clear();
    const css = readFileSync(resolve(process.cwd(), 'app/globals.css'), 'utf8');
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    try {
      const { container } = render(
        <CockpitBentoContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
      );
      const wrapper = container.querySelector('.ck-cockpit') as HTMLElement;
      expect(wrapper.getAttribute('data-ck-theme')).toBe('hell');
      const tokenHell = getComputedStyle(wrapper).getPropertyValue('--ck-panel-bg').trim();

      fireEvent.click(screen.getByRole('button', { name: /Dunkles Design/ }));
      expect(wrapper.getAttribute('data-ck-theme')).toBe('dunkel');
      const tokenDunkel = getComputedStyle(wrapper).getPropertyValue('--ck-panel-bg').trim();
      expect(tokenDunkel.length).toBeGreaterThan(0);
      expect(tokenDunkel).not.toBe(tokenHell);
    } finally {
      style.remove();
    }
  });
});
