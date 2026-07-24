/**
 * Tests der Radar-Ableitung (WP-034, Cockpit-Redesign „Bento-Mosaik"). Geprüft wird, dass der
 * Radar KEINE neue Zahl erfindet: jede Achse spiegelt exakt die Abdeckungskachel des Seeds
 * (Anteil = covered/total, Status = dieselbe Ampel-Regel), inklusive der Ehrlichkeitsgrenzen
 * (leere und kleine Grundgesamtheit). Gerechnet wird gegen die ECHTEN Mandanten des Seeds.
 */
import { describe, expect, it } from 'vitest';
import { DEMO_TENANTS } from '@isms/demo-seed';

import { buildCockpitRadar, RADAR_LABEL } from '../radar';
import { coverageStatus } from '../ampel';
import { buildHeuteDashboard } from '../../heute/dashboard';

describe('buildCockpitRadar – Achsen sind die echten Abdeckungen, nichts erfunden', () => {
  it('leere Abdeckung → kein Radar (kein „0 von 0"-Sternbild)', () => {
    expect(buildCockpitRadar([])).toBeUndefined();
  });

  it('jede Achse spiegelt exakt Anteil und Status ihrer Abdeckungskachel je Seed-Mandant', () => {
    let gerechneteAchsen = 0;
    for (const tenant of DEMO_TENANTS) {
      const dashboard = buildHeuteDashboard(tenant.tenant_id);
      if (!dashboard || dashboard.coverage.length === 0) continue;

      const radar = buildCockpitRadar(dashboard.coverage);
      expect(radar).toBeDefined();
      if (!radar) continue;

      // Gleiche Anzahl und gleiche Reihenfolge wie die Abdeckungskacheln (keine Umsortierung).
      expect(radar.axes.map((a) => a.id)).toEqual(dashboard.coverage.map((t) => t.id));

      radar.axes.forEach((axis, i) => {
        const tile = dashboard.coverage[i];
        expect(axis.covered).toBe(tile.covered);
        expect(axis.total).toBe(tile.total);
        expect(axis.label).toBe(RADAR_LABEL[tile.id]);
        // Status folgt exakt der offengelegten Regel (keine zweite Ableitung).
        expect(axis.status).toBe(
          coverageStatus(tile.covered, tile.total, tile.kleineGrundgesamtheit),
        );
        // Anteil ist die ehrliche Geometrie: 0 ohne Grundgesamtheit, sonst covered/total in [0,1].
        const erwartet = tile.total > 0 ? tile.covered / tile.total : 0;
        expect(axis.anteil).toBeCloseTo(erwartet, 10);
        expect(axis.anteil).toBeGreaterThanOrEqual(0);
        expect(axis.anteil).toBeLessThanOrEqual(1);
        // Leere Grundgesamtheit sitzt zwingend im Zentrum (Anteil 0) und ist als solche markiert.
        if (tile.total === 0) {
          expect(axis.isEmpty).toBe(true);
          expect(axis.anteil).toBe(0);
        }
        expect(axis.kleineGrundgesamtheit).toBe(tile.kleineGrundgesamtheit);
        gerechneteAchsen += 1;
      });
    }
    // Sicherstellen, dass der Test tatsächlich an echten Daten gerechnet hat (kein Leerlauf).
    expect(gerechneteAchsen).toBeGreaterThan(0);
  });

  it('die offengelegte Regel benennt „x von y" und schließt einen Score aus', () => {
    const dashboard = DEMO_TENANTS.map((t) => buildHeuteDashboard(t.tenant_id)).find(
      (d) => d && d.coverage.length > 0,
    );
    const radar = dashboard ? buildCockpitRadar(dashboard.coverage) : undefined;
    expect(radar).toBeDefined();
    expect(radar?.regel).toMatch(/x von y/);
    expect(radar?.regel).toMatch(/[Kk]ein Score/);
  });
});
