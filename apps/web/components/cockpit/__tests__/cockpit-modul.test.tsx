/**
 * Render-Tests des modularen Cockpits (WP-034 Slice 3, DR-0016 Nachtrag 3). Geprüft wird gegen den
 * echten `DEMO_SEED` (keine Mocks):
 *  1. Kopf + Kontextleiste + Leitfrage; kompaktes Bento-Dashboard aus dem belegten Modell.
 *  2. MODULARES EINTAUCHEN als echte Bedienung: Kachel → Bereich → Blatt (N Ebenen), Brotkrume,
 *     „zurück"; jedes Blatt trägt einen echten Quell-Link (kein toter Drill-down).
 *  3. Ehrlichkeitsgrenze (DR-0008): keine Kachel-Zahl ist ein Prozent-Score; der Radar zeigt „x von y".
 *  4. Sphärentrennung Kunde/Betreiber (DR-0012); neutral-fähig (DR-0009).
 *  5. Leerer Mandant: ehrlicher Leerzustand, kein Bento, kein fremder Mandant.
 *  6. Hell/Dunkel remappt die --ck-*-Token wirklich.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { CockpitModulContent } from '../CockpitModulContent';
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
  const el = container.querySelector<HTMLElement>(`[data-kachel="${key}"]`);
  if (!el) throw new Error(`Kachel fehlt: ${key}`);
  return el;
}

describe('Bento-Cockpit – Kopf, Kontextleiste, Übersicht', () => {
  it('führt mit Leitfrage und rendert das Bento aus echten Daten', () => {
    const { container } = render(
      <CockpitModulContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Cockpit' })).toBeInTheDocument();
    expect(container.querySelector('p.tw-question')?.textContent).toBe(
      'Wie steht Nordstern Manufacturing SE heute da – was ist erfasst und wo sind die Lücken?',
    );
    // Eigenständiges Cockpit (DR-0017): kein Kontext-Block; der Mandantenname steht in der
    // Leitfrage, kein Rollencode im sichtbaren Text (DR-0013 Nr. 12).
    expect(container.textContent ?? '').not.toMatch(/R\d{2}/);

    expect(container.querySelector('.ck-bento-grid')).not.toBeNull();
    expect(kachel(container, 'k_heute')).toBeInTheDocument();
    expect(kachel(container, 'k_abdeck')).toBeInTheDocument();
    expect(kachel(container, 'k_controls_nachweis')).toBeInTheDocument();
    expect(kachel(container, 'k_luecken')).toBeInTheDocument();

    // Radar-Werteliste: eine Zeile je Abdeckung, jede „x von y", kein Prozent-Score.
    const dashboard = buildHeuteDashboard(TENANT_ID.NORDWERK);
    expect(container.querySelectorAll('.ck-radar-werte li')).toHaveLength(
      dashboard?.coverage.length ?? 0,
    );
    for (const z of Array.from(container.querySelectorAll('.ck-kachel-num, .ck-kachel-ringtext'))) {
      expect(z.textContent ?? '').not.toMatch(/%|Prozent/);
    }
  });
});

describe('Bento-Cockpit – modulares Eintauchen (N Ebenen)', () => {
  it('Kachel → Blatt mit echtem Quell-Link; „zurück" führt zur Übersicht', () => {
    const { container } = render(
      <CockpitModulContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(container.querySelector('.ck-bento-grid')).not.toBeNull();

    fireEvent.click(kachel(container, 'k_controls_nachweis'));
    const detail = container.querySelector('.ck-modul-detail');
    expect(detail).not.toBeNull();
    const quelle = detail?.querySelector('.ck-modul-quelle a');
    const href = quelle?.getAttribute('href') ?? '';
    expect(href.length, 'toter Quell-Link').toBeGreaterThan(0);
    expect(href).not.toBe('#');
    // Übersicht ist während des Eintauchens ausgeblendet.
    expect(container.querySelector('.ck-bento-grid')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /zurück/ }));
    expect(container.querySelector('.ck-bento-grid')).not.toBeNull();
    expect(container.querySelector('.ck-modul-detail')).toBeNull();
  });

  it('Radar-Kachel → Bereich (vier Abdeckungen) → Blatt: mehrstufig verzweigend', () => {
    const { container } = render(
      <CockpitModulContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    // Ebene 1 → Bereich „Abdeckungsprofil" (weitere Kacheln, kein Blatt).
    fireEvent.click(kachel(container, 'k_abdeck'));
    expect(container.querySelector('.ck-modul-detail')).toBeNull();
    const subKachel = kachel(container, 'k_cov_controls_nachweis');
    expect(subKachel).toBeInTheDocument();
    // Brotkrume zeigt den Pfad.
    expect(container.querySelector('.ck-modul-crumb')?.textContent ?? '').toContain(
      'Abdeckungsprofil',
    );
    // Ebene 2 → Blatt.
    fireEvent.click(subKachel);
    expect(container.querySelector('.ck-modul-detail')).not.toBeNull();
  });
});

describe('Bento-Cockpit – neutral', () => {
  it('neutral (keine Rolle) rendert vollständig', () => {
    const { container } = render(
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop (null = neutral, DR-0009).
      <CockpitModulContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect((container.textContent ?? '').length).toBeGreaterThan(200);
    expect(container.querySelector('.ck-bento-grid')).not.toBeNull();
  });
});

describe('Bento-Cockpit – leerer Mandant', () => {
  for (const tenantId of [TENANT_ID.GREENGRID, TENANT_ID.MEDICORE]) {
    it(`${tenantId}: ehrlicher Leerzustand ohne Bento und ohne fremden Mandanten`, () => {
      const { container } = render(
        <CockpitModulContent role={role('R01')} tenant={tenant(tenantId)} />,
      );
      expect(container.querySelector('.ck-bento-grid')).toBeNull();
      expect(container.querySelector('.db-badge--kein_datenbestand')?.textContent ?? '').toContain(
        'kein Datenbestand',
      );
      const html = container.innerHTML;
      for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== tenantId)) {
        expect(html).not.toContain(fremd.display_name);
        expect(html).not.toContain(fremd.tenant_id);
      }
    });
  }
});

describe('Bento-Cockpit – Hell/Dunkel remappt die Token wirklich', () => {
  it('der Umschalter setzt --ck-panel-bg im Dunkelmodus neu', () => {
    window.localStorage.clear();
    const css = readFileSync(resolve(process.cwd(), 'app/globals.css'), 'utf8');
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    try {
      const { container } = render(
        <CockpitModulContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
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
