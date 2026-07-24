/**
 * Tests der Cockpit-Ampel (WP-025). Geprüft wird die MECHANISCHE Regel „x von y → Status" und
 * dass jeder Legenden-Eintrag Symbol + Text trägt (nie nur Farbe). `coverageTileStatus` wird
 * gegen die ECHTEN Abdeckungskacheln des Seeds gerechnet, nicht gegen Konstanten.
 */
import { describe, expect, it } from 'vitest';
import { DEMO_TENANTS } from '@isms/demo-seed';

import {
  AMPEL_HONESTY,
  AMPEL_LEGENDE,
  coverageStatus,
  coverageTileStatus,
  type CockpitStatus,
} from '../ampel';
import { buildHeuteDashboard } from '../../heute/dashboard';

describe('coverageStatus – offengelegte Regel', () => {
  it('keine Grundgesamtheit (y = 0) → neutraler Stand (info)', () => {
    expect(coverageStatus(0, 0)).toBe('info');
    expect(coverageStatus(5, 0)).toBe('info');
  });

  it('kleine Grundgesamtheit → neutral, auch bei x = y (kein Erfolgs-Grün über n≤2)', () => {
    expect(coverageStatus(1, 1, true)).toBe('info');
    expect(coverageStatus(2, 2, true)).toBe('info');
  });

  it('vollständig belegt (x = y) → ok', () => {
    expect(coverageStatus(10, 10)).toBe('ok');
    expect(coverageStatus(34, 34)).toBe('ok');
  });

  it('nichts erfasst bei bestehender Grundgesamtheit (x = 0, y > 0) → alert', () => {
    expect(coverageStatus(0, 11)).toBe('alert');
    expect(coverageStatus(0, 5)).toBe('alert');
  });

  it('teilweise (0 < x < y) → warn', () => {
    expect(coverageStatus(12, 34)).toBe('warn');
    expect(coverageStatus(11, 51)).toBe('warn');
  });
});

describe('coverageTileStatus – gegen die echten Abdeckungskacheln gerechnet', () => {
  it('spiegelt exakt die Regel inklusive Kleinheit je Kachel des Seeds', () => {
    for (const tenant of DEMO_TENANTS) {
      const dashboard = buildHeuteDashboard(tenant.tenant_id);
      if (!dashboard) continue;
      for (const tile of dashboard.coverage) {
        expect(coverageTileStatus(tile)).toBe(
          coverageStatus(tile.covered, tile.total, tile.kleineGrundgesamtheit),
        );
      }
    }
  });
});

describe('AMPEL_LEGENDE – vier Zustände, nie nur Farbe', () => {
  it('deckt genau die vier Status ab, jeder mit Symbol + Text + Regel', () => {
    const status = AMPEL_LEGENDE.map((e) => e.status);
    expect(new Set(status)).toEqual(new Set<CockpitStatus>(['ok', 'warn', 'alert', 'info']));
    for (const eintrag of AMPEL_LEGENDE) {
      expect(eintrag.symbol.length).toBeGreaterThan(0);
      expect(eintrag.label.length).toBeGreaterThan(0);
      expect(eintrag.regel.length).toBeGreaterThan(0);
    }
  });

  it('die Ehrlichkeitszeile nennt „kein Prüfergebnis"', () => {
    expect(AMPEL_HONESTY).toMatch(/kein Prüfergebnis/);
  });
});
