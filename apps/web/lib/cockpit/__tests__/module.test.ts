/**
 * Tests des modularen Cockpit-Baums (WP-034 Slice 3, DR-0016 Nachtrag 3). Geprüft wird die
 * BAUM-INTEGRITÄT (jede Kachel taucht in einen real existierenden Knoten – kein toter Drill-down)
 * und die EHRLICHKEIT (jede Zahl stammt aus der echten Ableitung; kein Prozent-Score). Gerechnet
 * wird gegen die echten Seed-Mandanten.
 */
import { describe, expect, it } from 'vitest';
import { DEMO_TENANTS, TENANT_ID } from '@isms/demo-seed';

import { buildCockpitModul, type ModulKachel } from '../module';
import { buildHeuteDashboard } from '../../heute/dashboard';

function alleKacheln(baum: ReturnType<typeof buildCockpitModul>): ModulKachel[] {
  if (!baum) return [];
  return Object.values(baum.knoten).flatMap((k) => [...(k.kacheln ?? [])]);
}

describe('buildCockpitModul – Baum-Integrität', () => {
  it('unbekannter Mandant → undefined (keine Existenzaussage)', () => {
    expect(buildCockpitModul('tenant-gibt-es-nicht')).toBeUndefined();
  });

  it('jede Kachel taucht in einen real existierenden Knoten (kein toter Drill-down)', () => {
    let gepruefteKacheln = 0;
    for (const tenant of DEMO_TENANTS) {
      const baum = buildCockpitModul(tenant.tenant_id);
      if (!baum || baum.isEmpty) continue;
      expect(baum.knoten[baum.wurzel]).toBeDefined();
      for (const kachel of alleKacheln(baum)) {
        expect(baum.knoten[kachel.ziel], `totes Ziel: ${kachel.ziel}`).toBeDefined();
        gepruefteKacheln += 1;
      }
      // Jeder Knoten ist entweder Bereich (kacheln) oder Blatt (detail) – nie beides/keines.
      for (const k of Object.values(baum.knoten)) {
        const istBereich = Array.isArray(k.kacheln);
        const istBlatt = Boolean(k.detail);
        expect(istBereich !== istBlatt, `Knoten weder/beides: ${k.id}`).toBe(true);
      }
    }
    expect(gepruefteKacheln).toBeGreaterThan(0);
  });

  it('Nordstern: Wurzel trägt Briefing-Hero, Radar und die Abdeckungs-/Zahlkacheln', () => {
    const baum = buildCockpitModul(TENANT_ID.NORDWERK);
    expect(baum).toBeDefined();
    if (!baum) return;
    const root = baum.knoten.root;
    const ids = (root.kacheln ?? []).map((k) => k.id);
    expect(ids).toContain('k_heute');
    expect(ids).toContain('k_abdeck');
    expect(ids).toContain('k_controls_nachweis');
    expect(ids).toContain('k_luecken');
    // Der Briefing-Hero ist wirklich ein Briefing (kein leerer Hero).
    const hero = (root.kacheln ?? []).find((k) => k.kind === 'briefing');
    expect(hero?.briefing?.punkte.length ?? 0).toBeGreaterThan(0);
  });

  it('Abdeckungskacheln spiegeln exakt die echten Zahlen; keine Kachel ist ein Prozent-Score', () => {
    const dashboard = buildHeuteDashboard(TENANT_ID.NORDWERK);
    const baum = buildCockpitModul(TENANT_ID.NORDWERK);
    if (!dashboard || !baum) throw new Error('Fixture fehlt');
    for (const tile of dashboard.coverage) {
      const kachel = alleKacheln(baum).find(
        (k) => k.ziel === `cov_${tile.id}` && k.covered !== undefined,
      );
      expect(kachel, `Kachel für ${tile.id} fehlt`).toBeDefined();
      expect(kachel?.covered).toBe(tile.covered);
      expect(kachel?.total).toBe(tile.total);
    }
    for (const kachel of alleKacheln(baum)) {
      expect(kachel.wert ?? '', 'Prozent-Score in einer Kachel').not.toMatch(/%|Prozent/);
    }
  });
});

describe('buildCockpitModul – leerer Mandant', () => {
  for (const tenantId of [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
    it(`${tenantId}: isEmpty mit ehrlicher Datenlücken-Kachel, keine Bento-Kacheln`, () => {
      const baum = buildCockpitModul(tenantId);
      expect(baum?.isEmpty).toBe(true);
      expect(baum?.emptyTile?.badge.rule).toBe('kein_datenbestand');
      expect(baum?.knoten.root.kacheln ?? []).toHaveLength(0);
    });
  }
});
