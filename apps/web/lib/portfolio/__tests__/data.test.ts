/**
 * Tests der Berater-Portfolio-Aggregation (DR-0017 Stage 1).
 *
 * Beweist gegen den echten `DEMO_SEED` (keine Mocks):
 *  1. Der Provider (Consulting Operator) ist KEINE Kundenzeile; alle fünf Kundenfirmen sind da.
 *  2. GreenGrid ist der ehrliche Empty-State (kein Objektgraph).
 *  3. Rangordnung: gefüllte Kunden vor leeren; gefüllte nach Lücken-Last absteigend.
 *  4. KEINE zweite Zählregel: jeder Zell-Status stammt aus `coverageTileStatus` der belegten
 *     Abdeckung; die Lücken-Last ist exakt die Summe der offenen ISMS-Punkte aus `buildHeuteDashboard`.
 *  5. Determinismus.
 */
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS, TENANT_ID } from '@isms/demo-seed';
import { coverageTileStatus } from '../../cockpit/ampel';
import { buildHeuteDashboard } from '../../heute/dashboard';
import { PORTFOLIO_DIMENSIONS, buildPortfolioDashboard, getCustomerTenants } from '../data';

describe('getCustomerTenants – Provider ausgeschlossen', () => {
  it('enthält alle fünf Kundenfirmen, aber NICHT den Consulting Operator (Provider)', () => {
    const ids = getCustomerTenants().map((t) => t.tenant_id);
    expect(ids).not.toContain(TENANT_ID.CONSULTING_OPERATOR);
    expect(ids).toContain(TENANT_ID.NORDWERK);
    expect(ids).toContain(TENANT_ID.FINOVIA); // Rheinbank
    expect(ids).toContain(TENANT_ID.MEDICORE); // MediNova
    expect(ids).toContain(TENANT_ID.ALPENCLOUD);
    expect(ids).toContain(TENANT_ID.GREENGRID);
    // Genau die Kundenmandanten (alle Demo-Mandanten minus Provider).
    expect(ids).toHaveLength(DEMO_TENANTS.length - 1);
  });
});

describe('buildPortfolioDashboard – Rangliste + Heatmap-Datenbasis', () => {
  const model = buildPortfolioDashboard();

  it('führt genau die Kundenfirmen als Zeilen (kein Provider)', () => {
    expect(model.customers.map((c) => c.tenant.tenant_id)).not.toContain(
      TENANT_ID.CONSULTING_OPERATOR,
    );
    expect(model.customers).toHaveLength(DEMO_TENANTS.length - 1);
  });

  it('trägt vier Heatmap-Dimensionen aus den echten Cockpit-Abdeckungen', () => {
    expect(model.dimensions).toBe(PORTFOLIO_DIMENSIONS);
    expect(model.dimensions.map((d) => d.id)).toEqual([
      'controls_nachweis',
      'risiken_minderung',
      'objekte_owner',
      'kanten_vertrauensgrad',
    ]);
    // Jede Zeile trägt genau eine Zelle je Dimension, in gleicher Reihenfolge.
    for (const row of model.customers) {
      expect(row.cells.map((c) => c.dimension)).toEqual(model.dimensions.map((d) => d.id));
    }
  });

  it('GreenGrid ist der ehrliche Empty-State (kein Objektgraph, Lücken-Last 0, kein Datenstand)', () => {
    const greengrid = model.customers.find((c) => c.tenant.tenant_id === TENANT_ID.GREENGRID);
    expect(greengrid, 'GreenGrid fehlt').toBeDefined();
    expect(greengrid?.isEmpty).toBe(true);
    expect(greengrid?.lueckenLast).toBe(0);
    expect(greengrid?.datenstand).toBeNull();
    expect(greengrid?.cells.every((c) => c.isEmpty && c.total === 0)).toBe(true);
    // Die vier gefüllten Kundenfirmen tragen einen Graphen.
    expect(model.gefuellteKunden).toBe(4);
    expect(model.leereKunden).toBe(1);
  });

  it('Rangordnung: gefüllte Kunden vor leeren, gefüllte nach Lücken-Last absteigend', () => {
    const gefuellt = model.customers.filter((c) => !c.isEmpty);
    const leer = model.customers.filter((c) => c.isEmpty);
    // Alle gefüllten stehen vor allen leeren.
    const ersterLeererIndex = model.customers.findIndex((c) => c.isEmpty);
    if (ersterLeererIndex >= 0) {
      expect(model.customers.slice(ersterLeererIndex).every((c) => c.isEmpty)).toBe(true);
    }
    // Monotone Lücken-Last (absteigend) über die gefüllten Zeilen.
    for (let i = 1; i < gefuellt.length; i++) {
      expect(gefuellt[i - 1].lueckenLast).toBeGreaterThanOrEqual(gefuellt[i].lueckenLast);
    }
    expect(gefuellt.length + leer.length).toBe(model.customers.length);
  });

  it('KEINE zweite Zählregel: jeder Zell-Status stammt aus coverageTileStatus der belegten Abdeckung', () => {
    for (const row of model.customers.filter((c) => !c.isEmpty)) {
      const dashboard = buildHeuteDashboard(row.tenant.tenant_id);
      expect(dashboard, `Dashboard fehlt für ${row.tenant.tenant_id}`).toBeDefined();
      const tileById = new Map((dashboard?.coverage ?? []).map((t) => [t.id, t] as const));
      for (const cell of row.cells) {
        const tile = tileById.get(cell.dimension);
        expect(tile, `${row.tenant.tenant_id}/${cell.dimension}`).toBeDefined();
        expect(cell.status).toBe(coverageTileStatus(tile!));
        expect(cell.covered).toBe(tile!.covered);
        expect(cell.total).toBe(tile!.total);
        expect(cell.offen).toBe(Math.max(0, tile!.total - tile!.covered));
      }
    }
  });

  it('Lücken-Last = Summe offener Punkte über die drei ISMS-Abdeckungen (direkte Gegenrechnung)', () => {
    const rankingIds = new Set(
      PORTFOLIO_DIMENSIONS.filter((d) => d.zaehltInLueckenLast).map((d) => d.id),
    );
    // Vertrauensgrad zählt bewusst NICHT in die Lücken-Last.
    expect(rankingIds.has('kanten_vertrauensgrad')).toBe(false);
    expect(rankingIds.size).toBe(3);

    for (const row of model.customers.filter((c) => !c.isEmpty)) {
      const dashboard = buildHeuteDashboard(row.tenant.tenant_id);
      const erwartet = (dashboard?.coverage ?? [])
        .filter((t) => rankingIds.has(t.id))
        .reduce((sum, t) => sum + Math.max(0, t.total - t.covered), 0);
      expect(row.lueckenLast).toBe(erwartet);
    }
  });

  it('mindestens eine gefüllte Firma trägt echte offene Punkte (die Rangliste ist nicht flach)', () => {
    const maxLast = Math.max(...model.customers.map((c) => c.lueckenLast));
    expect(maxLast).toBeGreaterThan(0);
  });

  it('ist deterministisch (zwei Läufe liefern denselben Stand)', () => {
    const a = buildPortfolioDashboard();
    const b = buildPortfolioDashboard();
    expect(a.customers.map((c) => `${c.tenant.tenant_id}:${c.lueckenLast}`)).toEqual(
      b.customers.map((c) => `${c.tenant.tenant_id}:${c.lueckenLast}`),
    );
  });
});
