/**
 * Kunde-Welt-Modell (DR-0018 Stufe 3): drei stabile Orte + Ablage aus echten Objekten.
 * Gegen den echten `DEMO_SEED` (keine Mocks) – Mandantengrenze und kanonische Ordner geprüft.
 */
import { describe, expect, it } from 'vitest';

import { TENANT_ID } from '@isms/demo-seed';
import { KUNDE_WELT_ORTE, aktiverKundeWeltOrt, buildAblage } from '../welt';
import { getObjectsForTenant } from '../../twin/data';

describe('KUNDE_WELT_ORTE – drei stabile Orte', () => {
  it('führt genau Mein Dashboard, Meine Ablage, Services buchen in fester Reihenfolge', () => {
    expect(KUNDE_WELT_ORTE.map((o) => o.id)).toEqual([
      'mein-dashboard',
      'meine-ablage',
      'services-buchen',
    ]);
    expect(KUNDE_WELT_ORTE.map((o) => o.href)).toEqual([
      '/mein-dashboard',
      '/meine-ablage',
      '/services-buchen',
    ]);
  });

  it('markiert den aktiven Ort über sein Pfad-Präfix', () => {
    expect(aktiverKundeWeltOrt('/mein-dashboard')).toBe('mein-dashboard');
    expect(aktiverKundeWeltOrt('/meine-ablage')).toBe('meine-ablage');
    expect(aktiverKundeWeltOrt('/services-buchen')).toBe('services-buchen');
    expect(aktiverKundeWeltOrt('/portfolio')).toBeNull();
  });
});

describe('buildAblage – Verwaltungsordner aus echten Objekten', () => {
  it('zählt genau die Objekte des Mandanten (harte Mandantengrenze)', () => {
    const ablage = buildAblage(TENANT_ID.NORDWERK);
    expect(ablage.objekteGesamt).toBe(getObjectsForTenant(TENANT_ID.NORDWERK).length);
    expect(ablage.objekteGesamt).toBeGreaterThan(0);
  });

  it('bildet nur belegte Ordner, Summe der Ordner = Gesamtzahl', () => {
    const ablage = buildAblage(TENANT_ID.NORDWERK);
    expect(ablage.ordner.length).toBeGreaterThan(0);
    for (const ordner of ablage.ordner) {
      expect(ordner.objects.length).toBeGreaterThan(0);
    }
    const summe = ablage.ordner.reduce((n, o) => n + o.objects.length, 0);
    expect(summe).toBe(ablage.objekteGesamt);
  });

  it('legt keine fremden Mandanten-Objekte ab', () => {
    const ablage = buildAblage(TENANT_ID.NORDWERK);
    for (const ordner of ablage.ordner) {
      for (const o of ordner.objects) {
        expect(o.tenant_id).toBe(TENANT_ID.NORDWERK);
      }
    }
  });
});
