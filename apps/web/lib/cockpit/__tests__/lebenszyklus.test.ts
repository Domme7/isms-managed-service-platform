/**
 * Tests der Lebenszyklus-Ampelleiste (WP-025). Segmentbreiten = ECHTE Anteile der erfassten
 * Stände; geprüft gegen `deriveLifecycleVerteilung`, nicht gegen Konstanten. Leerer Mandant →
 * keine Leiste (ehrlicher Leerzustand).
 */
import { describe, expect, it } from 'vitest';
import { DEMO_TENANTS, TENANT_ID } from '@isms/demo-seed';

import { buildCockpitLebenszyklus } from '../lebenszyklus';
import { deriveLifecycleVerteilung } from '../../heute/dashboard';
import { getObjectsForTenant } from '../../twin/data';

describe('buildCockpitLebenszyklus', () => {
  for (const tenantId of [TENANT_ID.GREENGRID, TENANT_ID.MEDICORE]) {
    it(`leerer Mandant ${tenantId}: keine Leiste`, () => {
      expect(buildCockpitLebenszyklus(tenantId)).toBeUndefined();
    });
  }

  it('unbekannter Mandant: keine Leiste', () => {
    expect(buildCockpitLebenszyklus('tenant-gibt-es-nicht')).toBeUndefined();
  });

  it('Nordwerk: Segmente entsprechen der Verteilung, Summe = Grundgesamtheit', () => {
    const objects = getObjectsForTenant(TENANT_ID.NORDWERK);
    const erwartet = deriveLifecycleVerteilung(objects);
    const bar = buildCockpitLebenszyklus(TENANT_ID.NORDWERK);
    if (!bar) throw new Error('Leiste fehlt für Nordwerk');

    expect(bar.total).toBe(objects.length);
    expect(bar.segments.map((s) => s.status)).toEqual(erwartet.map((s) => s.status));
    expect(bar.segments.reduce((sum, s) => sum + s.count, 0)).toBe(objects.length);
    // Anteile sind echte count/total und summieren sich (bis auf Rundung) auf 1.
    for (const segment of bar.segments) {
      expect(segment.anteil).toBeCloseTo(segment.count / objects.length, 10);
    }
    expect(bar.segments.reduce((sum, s) => sum + s.anteil, 0)).toBeCloseTo(1, 10);
    expect(bar.glosse).toMatch(/kein Prüfergebnis/);
  });

  it('für jeden nicht-leeren Mandanten sind die Segmente vollständig aus dem Bestand abgeleitet', () => {
    for (const tenant of DEMO_TENANTS) {
      const objects = getObjectsForTenant(tenant.tenant_id);
      const bar = buildCockpitLebenszyklus(tenant.tenant_id);
      if (objects.length === 0) {
        expect(bar).toBeUndefined();
        continue;
      }
      if (!bar) throw new Error(`Leiste fehlt für ${tenant.tenant_id}`);
      expect(bar.segments.reduce((sum, s) => sum + s.count, 0)).toBe(objects.length);
    }
  });
});
