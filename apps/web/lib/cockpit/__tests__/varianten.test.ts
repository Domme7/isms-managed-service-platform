/**
 * Tests der React-freien Cockpit-Varianten-Registry (WP-025).
 *
 * Geprüft wird:
 *  1. Genau drei Varianten (A/B/C) mit belegten Anzeigefeldern.
 *  2. Der Speicherschlüssel ist versioniert und mandantenfrei (nur die Kennung wird serialisiert).
 *  3. Defensives Parsen: nur „a"/„b"/„c" gültig, alles andere → null (Standard greift).
 */
import { describe, expect, it } from 'vitest';

import {
  COCKPIT_STANDARD,
  COCKPIT_STORAGE_KEY,
  COCKPIT_VARIANTEN,
  getCockpitVariante,
  parseCockpitVariante,
  serializeCockpitVariante,
  type CockpitVarianteId,
} from '../varianten';

describe('COCKPIT_VARIANTEN – drei Start-Varianten (WP-025 Design-Vorlage §2)', () => {
  it('umfasst genau A, B, C mit belegten Anzeigefeldern', () => {
    expect(COCKPIT_VARIANTEN.map((v) => v.id)).toEqual(['a', 'b', 'c']);
    expect(COCKPIT_VARIANTEN.map((v) => v.kennung)).toEqual(['A', 'B', 'C']);
    for (const meta of COCKPIT_VARIANTEN) {
      expect(meta.name.length).toBeGreaterThan(0);
      expect(meta.leitidee.length).toBeGreaterThan(0);
      expect(meta.zielnutzer.length).toBeGreaterThan(0);
      expect(getCockpitVariante(meta.id)).toBe(meta);
    }
  });

  it('führt kein Bewertungs- oder Design-Theorie-Vokabular im Anzeigetext', () => {
    const text = COCKPIT_VARIANTEN.map((v) => `${v.name} ${v.leitidee} ${v.zielnutzer}`).join(' ');
    for (const verboten of [/Ampel/i, /\bScore\b/i, /Reifegrad/i, /\bTrend/i, /Prozent/i, /%/]) {
      expect(verboten.test(text), `verbotenes Vokabular: ${verboten}`).toBe(false);
    }
  });

  it('Standard ist A (nächster Nachbar des heutigen Startpunkts)', () => {
    expect(COCKPIT_STANDARD).toBe('a');
  });
});

describe('Cockpit-Varianten-Speicher – versioniert und mandantenfrei', () => {
  it('nutzt einen versionierten Schlüssel (Muster DETAILTIEFE_STORAGE_KEY)', () => {
    expect(COCKPIT_STORAGE_KEY).toBe('isms-demo-cockpit-v1');
    expect(COCKPIT_STORAGE_KEY).toMatch(/-v\d+$/);
  });

  it('serialisiert AUSSCHLIESSLICH die Kennung (kein Mandanten-/Rollen-/Objektbezug)', () => {
    for (const id of ['a', 'b', 'c'] as const) {
      const raw = serializeCockpitVariante(id);
      expect(raw).toBe(id);
      // Mandantenfrei: der gespeicherte Wert enthält keine Mandanten-/Rollen-/Objektkennung.
      expect(raw).not.toMatch(/tenant|role|R\d{2}|object/i);
      expect(parseCockpitVariante(raw)).toBe(id);
    }
  });

  it('parst defensiv: nur a/b/c gültig, alles andere → null', () => {
    for (const gueltig of ['a', 'b', 'c'] as CockpitVarianteId[]) {
      expect(parseCockpitVariante(gueltig)).toBe(gueltig);
    }
    for (const ungueltig of [null, '', 'd', 'A', 'ab', 'x', '1']) {
      expect(parseCockpitVariante(ungueltig)).toBeNull();
    }
  });
});
