/**
 * Struktur-Assistent-Konstanten (WP-006 Slice 3) – Vollzähligkeit der Onboarding-/Lifecycle-
 * Strukturen aus Dok. 16 (am PDF verifiziert).
 *
 * Kardinalitäten (Abschnittstitel je Konstante in `struktur.ts`): 11 Lifecycle-Phasen (0–10),
 * 10 Qualification-Mindestfragen, 10 Charter-Mindestinhalte, 8 Firmenanlage-Mindestpunkte,
 * 9 Scope-Dimensionen, 6 Ausschluss-Pflichtangaben, 12 Strategie-DNA-Pflichtdimensionen,
 * 9 Zielprofiltypen, 7 Guided-Quickstart-Schritte. Der Test prüft die Konstante; das
 * Konzepttreue-Gate liest die Konstante gegen das PDF gegen.
 */
import { describe, expect, it } from 'vitest';

import {
  AUSSCHLUSS_PFLICHT,
  CHARTER_INHALTE,
  EXIT_ACCEPTANCE,
  FIRMENANLAGE_MINDEST,
  FREIGABEPFLICHTIG,
  GUIDED_QUICKSTART,
  LIFECYCLE_PHASEN,
  MATERIALISIERUNGS_LUECKEN,
  QUALIFICATION_FRAGEN,
  SCOPE_DIMENSIONEN,
  STRATEGIE_DNA_DIMENSIONEN,
  ZIELPROFILTYPEN,
} from '../struktur';

describe('Struktur-Assistent-Konstanten – Vollzähligkeit (am PDF verifiziert)', () => {
  it('11 Lifecycle-Phasen, lückenlos 0–10, je mit Ziel/Ergebnissen/Exit Gate', () => {
    expect(LIFECYCLE_PHASEN).toHaveLength(11);
    expect(LIFECYCLE_PHASEN.map((p) => p.nummer)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    for (const phase of LIFECYCLE_PHASEN) {
      expect(phase.ziel.length, `Phase ${phase.nummer}`).toBeGreaterThan(0);
      expect(phase.ergebnisse.length, `Phase ${phase.nummer}`).toBeGreaterThan(0);
      expect(phase.exitGate.length, `Phase ${phase.nummer}`).toBeGreaterThan(0);
    }
    // Der worttreue Exit-Gate-Wert der Phase 10 (Grundlage der dokumentierten Wächter-Ausnahme).
    expect(LIFECYCLE_PHASEN.find((p) => p.nummer === 10)?.exitGate).toBe(EXIT_ACCEPTANCE);
  });

  it('10 Qualification-Mindestfragen', () => {
    expect(QUALIFICATION_FRAGEN).toHaveLength(10);
    for (const frage of QUALIFICATION_FRAGEN) expect(frage.length).toBeGreaterThan(0);
  });

  it('10 Charter-Mindestinhalte', () => {
    expect(CHARTER_INHALTE).toHaveLength(10);
  });

  it('8 Firmenanlage-Mindestpunkte', () => {
    expect(FIRMENANLAGE_MINDEST).toHaveLength(8);
  });

  it('9 Scope-Dimensionen', () => {
    expect(SCOPE_DIMENSIONEN).toHaveLength(9);
  });

  it('6 Pflichtangaben je Ausschluss', () => {
    expect(AUSSCHLUSS_PFLICHT).toHaveLength(6);
  });

  it('12 Strategie-DNA-Pflichtdimensionen, je mit Leitfrage und Beispielen', () => {
    expect(STRATEGIE_DNA_DIMENSIONEN).toHaveLength(12);
    for (const dim of STRATEGIE_DNA_DIMENSIONEN) {
      expect(dim.leitfrage.length, dim.dimension).toBeGreaterThan(0);
      expect(dim.beispiele.length, dim.dimension).toBeGreaterThan(0);
    }
  });

  it('9 Zielprofiltypen, je mit Beschreibung', () => {
    expect(ZIELPROFILTYPEN).toHaveLength(9);
    for (const typ of ZIELPROFILTYPEN) expect(typ.beschreibung.length, typ.name).toBeGreaterThan(0);
  });

  it('7 Guided-Quickstart-Schritte', () => {
    expect(GUIDED_QUICKSTART).toHaveLength(7);
  });

  it('5 freigabepflichtige Gegenstände (16-D07) und 4 benannte Materialisierungs-Lücken', () => {
    expect(FREIGABEPFLICHTIG).toHaveLength(5);
    expect(MATERIALISIERUNGS_LUECKEN).toEqual([
      'ISMS-Scope',
      'Ausschluss',
      'Strategie-DNA',
      'Target Profile',
    ]);
  });
});
