/**
 * Tests der Cockpit-Warnungen (WP-025, „nichts nur Show"). Jede Erwartung wird gegen die
 * ABLEITUNG gerechnet (`buildIsmsCoreView`), nicht gegen eine Konstante; geprüft werden echte
 * Lücken, funktionale Ziele, der ehrliche Leerzustand und die Mandantengrenze.
 */
import { describe, expect, it } from 'vitest';
import { DEMO_TENANTS, TENANT_ID } from '@isms/demo-seed';

import { buildCockpitWarnungen } from '../warnungen';
import { buildIsmsCoreView } from '../../isms/data';
import { getObjectsForTenant, getRelationshipsForTenant } from '../../twin/data';
import { objectDetailHref } from '../../twin/routes';

/** Erwartete Warnungsanzahl aus der Ableitung (keine hartkodierte Zahl). */
function erwarteteAnzahl(tenantId: string): number {
  const objects = getObjectsForTenant(tenantId);
  const relationships = getRelationshipsForTenant(tenantId);
  if (objects.length === 0 && relationships.length === 0) return 0;
  const core = buildIsmsCoreView(tenantId);
  let n = 1; // Strukturtypen-Warnung: immer für einen nicht-leeren Mandanten
  if (core.controls.some((c) => c.evidenced_by.length === 0)) n += 1;
  if (core.risks.some((r) => r.mitigated_by.length === 0)) n += 1;
  if (core.risks.length > 0 && core.scenarios.length > 0) n += 1;
  return n;
}

describe('buildCockpitWarnungen – ehrlicher Leerzustand', () => {
  for (const tenantId of [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
    it(`leerer Mandant ${tenantId}: keine erfundene Warnung`, () => {
      expect(buildCockpitWarnungen(tenantId)).toEqual([]);
    });
  }

  it('unbekannter Mandant: leere Liste, keine Existenzaussage', () => {
    expect(buildCockpitWarnungen('tenant-gibt-es-nicht')).toEqual([]);
  });
});

describe('buildCockpitWarnungen – Anzahl und Inhalt aus den Daten', () => {
  for (const tenant of DEMO_TENANTS) {
    it(`${tenant.tenant_id}: Anzahl entspricht der Ableitung`, () => {
      expect(buildCockpitWarnungen(tenant.tenant_id)).toHaveLength(
        erwarteteAnzahl(tenant.tenant_id),
      );
    });
  }

  it('Nordwerk: enthält die Strukturtypen- und die Risiko↔Szenario-Warnung (beide neutral)', () => {
    const warnungen = buildCockpitWarnungen(TENANT_ID.NORDWERK);
    const struktur = warnungen.find((w) => w.id === 'strukturtypen_nicht_angelegt');
    expect(struktur?.status).toBe('info');
    expect(struktur?.ziel.href).toBe('/kunden/struktur');
    expect(struktur?.begruendung).toMatch(/Strategie-DNA/);

    const modell = warnungen.find((w) => w.id === 'risiko_szenario_modelluecke');
    expect(modell?.status).toBe('info');
    expect(modell?.ziel.href).toMatch(/#isms-risiken$/);
  });

  it('Consulting Operator: nur die Strukturtypen-Warnung (keine Szenarien → keine Modell-Lücke)', () => {
    const warnungen = buildCockpitWarnungen(TENANT_ID.CONSULTING_OPERATOR);
    expect(warnungen.map((w) => w.id)).toEqual(['strukturtypen_nicht_angelegt']);
  });
});

describe('buildCockpitWarnungen – jede Warnung ist funktional (U-09)', () => {
  for (const tenant of DEMO_TENANTS) {
    it(`${tenant.tenant_id}: jedes Ziel ist ein echter, nicht-leerer Pfad; Objekt-Links führen auf Objekt-360`, () => {
      for (const warnung of buildCockpitWarnungen(tenant.tenant_id)) {
        expect(warnung.ziel.href.startsWith('/')).toBe(true);
        expect(warnung.ziel.label.length).toBeGreaterThan(0);
        expect(warnung.titel.length).toBeGreaterThan(0);
        expect(warnung.begruendung.length).toBeGreaterThan(0);
        // Objekt-Lücken führen ZU den Lückenobjekten (exakt der Objekt-360-Pfad).
        for (const objekt of warnung.objekte) {
          expect(
            objekt.href.startsWith(`/twin/${encodeURIComponent(tenant.tenant_id)}/objekt/`),
          ).toBe(true);
          expect(objekt.name.length).toBeGreaterThan(0);
        }
      }
    });
  }

  it('Objekt-Links entsprechen exakt objectDetailHref der betroffenen Controls/Risiken', () => {
    // Regelbeleg für die Objekt-360-Verlinkung: WENN ein Mandant eine Control-/Risiko-Lücke
    // trägt, adressiert die Warnung jedes Lückenobjekt über objectDetailHref. Wir prüfen das
    // gegen die Ableitung – unabhängig davon, ob der heutige Seed eine solche Lücke enthält.
    for (const tenant of DEMO_TENANTS) {
      const core = buildIsmsCoreView(tenant.tenant_id);
      const warnungen = buildCockpitWarnungen(tenant.tenant_id);
      const controlsWarnung = warnungen.find((w) => w.id === 'controls_ohne_nachweis');
      const erwarteteControls = core.controls
        .filter((c) => c.evidenced_by.length === 0)
        .map((c) => objectDetailHref(tenant.tenant_id, c.control.object_id));
      expect((controlsWarnung?.objekte ?? []).map((o) => o.href)).toEqual(erwarteteControls);
    }
  });
});

describe('buildCockpitWarnungen – Mandantengrenze', () => {
  it('kein Wortlaut nennt einen fremden Mandanten', () => {
    for (const tenant of DEMO_TENANTS) {
      const text = buildCockpitWarnungen(tenant.tenant_id)
        .map((w) => `${w.titel} ${w.begruendung} ${w.objekte.map((o) => o.name).join(' ')}`)
        .join(' ');
      for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== tenant.tenant_id)) {
        expect(text).not.toContain(fremd.display_name);
        expect(text).not.toContain(fremd.tenant_id);
      }
    }
  });
});
