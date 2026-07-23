/**
 * Tests der react-freien Glossar-Ableitung (WP-032 Slice 3).
 *
 * Geprüft wird gegen den KANONISCHEN VERTRAG (`@isms/contracts`), nicht gegen abgeschriebene
 * Zahlen: Der Glossar muss das Vokabular vollzählig wiedergeben (Dok. 07, Abschnitte
 * „Kanonische Objektfamilien" und „Kanonischer Beziehungskatalog"), es aber strukturell
 * unmöglich machen, dass eine Kennung ins Produkt gelangt (DR-0013 Nr. 2, O-WP032-05).
 */
import { describe, expect, it } from 'vitest';

import {
  OBJECT_FAMILIES,
  OBJECT_FAMILY_ID,
  OBJECT_TYPE,
  RELATIONSHIP_TYPES,
  RELATIONSHIP_TYPE_ID,
} from '@isms/contracts';
import { objectTypeLabel, relationshipTypeLabel } from '../../twin/data';
import { buildGlossar } from '../glossar';

describe('buildGlossar – Vollzähligkeit gegen den kanonischen Vertrag', () => {
  it('gibt alle neun Objektfamilien mit Namen und Leitfrage in kanonischer Reihenfolge wieder', () => {
    const glossar = buildGlossar();
    expect(glossar.familien).toHaveLength(9);
    expect(glossar.familien.map((f) => f.name)).toEqual(
      OBJECT_FAMILY_ID.map((fid) => OBJECT_FAMILIES[fid].name),
    );
    expect(glossar.familien.map((f) => f.leitfrage)).toEqual(
      OBJECT_FAMILY_ID.map((fid) => OBJECT_FAMILIES[fid].leitfrage),
    );
  });

  it('gibt je Familie alle Objektarten des Vertrags wieder – keine fehlt, keine kommt dazu', () => {
    const glossar = buildGlossar();
    OBJECT_FAMILY_ID.forEach((fid, index) => {
      const vertrag = OBJECT_FAMILIES[fid].types;
      const familie = glossar.familien[index];
      expect(familie.arten, `${OBJECT_FAMILIES[fid].name}`).toHaveLength(vertrag.length);
      // Jede Art ist im Anzeigenamen enthalten (Klartext + Katalogname oder Katalogname allein).
      vertrag.forEach((typ, i) => {
        expect(familie.arten[i].anzeige, `${typ} fehlt`).toContain(typ);
      });
    });
  });

  it('zählt Objektarten und Sprachabdeckung aus dem Vertrag, nicht aus einer Konstanten', () => {
    const glossar = buildGlossar();
    const verschieden = new Set(OBJECT_TYPE);
    expect(glossar.objektartenGesamt).toBe(verschieden.size);
    expect(glossar.objektartenMitKlartext).toBe(
      [...verschieden].filter((t) => objectTypeLabel(t) !== undefined).length,
    );
    // Die Sprachschicht deckt das Vokabular nur teilweise ab – das ist die benannte Lücke,
    // nicht ein Fehler: Sie muss echt kleiner sein, sonst wäre die Aussage der Seite falsch.
    expect(glossar.objektartenMitKlartext).toBeGreaterThan(0);
    expect(glossar.objektartenMitKlartext).toBeLessThan(glossar.objektartenGesamt);
    // Die dokumentierte Doppelzuordnung des Katalogs („Finding" in zwei Familien) wird benannt,
    // nicht still entdoppelt.
    expect(glossar.hatMehrfachZuordnung).toBe(OBJECT_TYPE.length > verschieden.size);
    expect(glossar.hatMehrfachZuordnung).toBe(true);
  });

  it('zeigt genau die Beziehungsarten mit freigegebener Klartext-Bezeichnung – in Vertragsreihenfolge', () => {
    const glossar = buildGlossar();
    const erwartet = RELATIONSHIP_TYPE_ID.map((rid) => RELATIONSHIP_TYPES[rid])
      .filter((e) => relationshipTypeLabel(e.type) !== undefined)
      .map((e) => ({ klartext: relationshipTypeLabel(e.type) as string, bedeutung: e.rule }));

    expect(glossar.beziehungen).toEqual(erwartet);
    expect(glossar.beziehungenGesamt).toBe(RELATIONSHIP_TYPE_ID.length);
    // Die Lücke ist echt: es gibt Arten ohne Klartext, und sie werden NICHT gezeigt.
    expect(glossar.beziehungen.length).toBeLessThan(glossar.beziehungenGesamt);
    expect(glossar.beziehungen.length).toBeGreaterThan(0);
  });

  it('das Modell trägt strukturell KEIN Feld für Kennungen oder technische Namen', () => {
    const glossar = buildGlossar();
    // Familien: nur Name, Leitfrage, Arten – kein `id`.
    for (const familie of glossar.familien) {
      expect(Object.keys(familie).sort()).toEqual(['arten', 'leitfrage', 'name']);
      for (const art of familie.arten) {
        expect(Object.keys(art).sort()).toEqual(['anzeige', 'hatKlartext']);
      }
    }
    // Beziehungen: nur Klartext und Bedeutung – kein `type`, kein `id`, kein `example`.
    for (const beziehung of glossar.beziehungen) {
      expect(Object.keys(beziehung).sort()).toEqual(['bedeutung', 'klartext']);
    }
  });

  it('Negativbeweis: kein Code und kein technischer Name in irgendeinem Modellwert', () => {
    const glossar = buildGlossar();
    const werte = [
      ...glossar.familien.flatMap((f) => [f.name, f.leitfrage, ...f.arten.map((a) => a.anzeige)]),
      ...glossar.beziehungen.flatMap((b) => [b.klartext, b.bedeutung]),
    ];
    const text = werte.join(' | ');

    for (const verboten of [
      /\bF0[1-9]\b/, // Familienkennung
      /\bR\d{2}\b/, // Beziehungskennung
      /[a-z]+_[a-z]+/, // technischer Beziehungsname (snake_case)
      /Dok\.\s?\d/,
      /§/,
    ]) {
      expect(text, `verbotenes Muster „${verboten}"`).not.toMatch(verboten);
    }

    // Blindheitsschutz: der geprüfte Text ist wirklich der Glossarinhalt.
    expect(text.length).toBeGreaterThan(500);
    expect(text).toContain('Risiko & Veränderung');
    expect(text).toContain('belegt');
  });

  it('ist deterministisch und mandantenfrei (zwei Aufrufe liefern dasselbe)', () => {
    expect(buildGlossar()).toEqual(buildGlossar());
  });
});
