/**
 * Tests des Trust-Layer-Abgleichs (WP-020 Slice 5; Dok. 06, Abschnitt „Sonder-, Fehler- und
 * Vertrauenszustände", Absatz „Trust Layer" – acht Angaben).
 *
 * Geprüft wird die react-freie Dokumentationsquelle:
 *  1. Exakt die acht PDF-Angaben in Quellreihenfolge, je mit Deckungsgrad und Trägertext.
 *  2. Die (Teil-)Träger sind KEINE Behauptungen: sie verweisen auf real existierende
 *     Vertrags-Vokabulare (Qualitätsdimensionen, Bestätigungsstufen) – hier verankert.
 *  3. Nichts wird berechnet, nichts versprochen (kein Termin-/Funktionsversprechen).
 */
import { describe, expect, it } from 'vitest';

import { CONFIRMATION_LEVEL, DATA_QUALITY_DIMENSION } from '@isms/contracts';
import { DEMO_SEED } from '@isms/demo-seed';
import { TRUST_LAYER_ANGABEN, TRUST_LAYER_QUELLE, countTrustAngaben } from '../trust-layer';

describe('TRUST_LAYER_ANGABEN – die acht Angaben aus Dok. 06', () => {
  it('umfasst exakt die acht Angaben in Quellreihenfolge', () => {
    expect(TRUST_LAYER_ANGABEN.map((a) => a.angabe)).toEqual([
      'Herkunft',
      'Letzter Datenzeitpunkt',
      'Vollständigkeit',
      'Widersprüchliche Quellen',
      'Modell-/Regelversion',
      'Annahmen',
      'Menschliche Reviews',
      'Auswirkung von Datenlücken',
    ]);
    expect(TRUST_LAYER_QUELLE).toContain('Sonder-, Fehler- und Vertrauenszustände');
  });

  it('trägt je Angabe einen Deckungsgrad und einen nicht-leeren Trägertext', () => {
    for (const angabe of TRUST_LAYER_ANGABEN) {
      expect(['belegt', 'teilweise', 'kein Träger']).toContain(angabe.abdeckung);
      expect(angabe.traeger.length, angabe.angabe).toBeGreaterThan(20);
    }
    // Gezählt, nicht geschrieben – und die Summe deckt alle acht ab.
    expect(
      countTrustAngaben('belegt') +
        countTrustAngaben('teilweise') +
        countTrustAngaben('kein Träger'),
    ).toBe(TRUST_LAYER_ANGABEN.length);
  });

  it('verankert die (Teil-)Träger an real existierenden Vertrags-Vokabularen', () => {
    // Vollständigkeit/Konsistenz/Herkunft sind erfassbare Qualitätsdimensionen (Dok. 07,
    // Abschnitt „Herkunft, Datenqualität und Vertrauen") – die Teil-Deckung ist damit belegt,
    // nicht behauptet.
    for (const dimension of ['Herkunft', 'Vollständigkeit', 'Konsistenz']) {
      expect(DATA_QUALITY_DIMENSION).toContain(dimension);
    }
    // „Menschliche Reviews": die Bestätigungs-Skala enthält „reviewed" (erfasster Stand).
    expect(CONFIRMATION_LEVEL).toContain('reviewed');
    // „Annahmen": mindestens eine Beziehung im Seed trägt eine Wirkungsannahme.
    expect(
      DEMO_SEED.relationships.filter((r) => typeof r.effectiveness_assumption === 'string').length,
    ).toBeGreaterThan(0);
  });

  it('die als „kein Träger" benannten Angaben bleiben Lücken – und versprechen nichts', () => {
    const ohneTraeger = TRUST_LAYER_ANGABEN.filter((a) => a.abdeckung === 'kein Träger');
    expect(ohneTraeger.map((a) => a.angabe)).toEqual([
      'Modell-/Regelversion',
      'Auswirkung von Datenlücken',
    ]);
    for (const angabe of TRUST_LAYER_ANGABEN) {
      expect(angabe.traeger, angabe.angabe).not.toMatch(
        /kommt bald|in Kürze|demnächst|geplant für|wird künftig|Roadmap/i,
      );
    }
  });
});
