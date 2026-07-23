/**
 * Tests der Seitenbausteine-Konvention (WP-020 Slice 3; Dok. 06, Abschnitt „Verbindliche
 * Seitenbausteine" – neun Bausteine; Zählungskonflikt zu 06-D03 „fünfteilige Seitenanatomie"
 * ist als O-WP020-02 registriert, die Neuner-Liste wird hier als normativ behandelt).
 *
 * Geprüft wird die react-freie Dokumentationsquelle:
 *  1. Die Bausteinliste umfasst exakt die neun PDF-Bausteine (Namen wörtlich).
 *  2. Jeder der sechs Live-Orte ordnet ALLE neun Bausteine genau einmal zu.
 *  3. Jeder Status trägt seine Pflicht-Begründung: 'ohne_traeger' → grund;
 *     'teilweise' → wo + fehlt; 'vorhanden'/'verweis' → wo (Code-Beleg der Zuordnung).
 *  4. Kein sichtbarer Begründungstext erfindet einen Wert oder ein Versprechen.
 */
import { describe, expect, it } from 'vitest';

import {
  BAUSTEIN_ABDECKUNG,
  SEITENBAUSTEINE,
  bausteinAbdeckung,
  getBaustein,
  type BausteinOrt,
} from '../seitenbausteine';
import { NAV_PLACES } from '../places';

/** Die neun Bausteine wörtlich aus der PDF-Tabelle (Spalte „Baustein"). */
const PDF_BAUSTEINE = [
  'Question Header',
  'Context Bar',
  'Summary / Pulse',
  'Relationship Panel',
  'Impact Panel',
  'Decision Card',
  'Action Rail',
  'History / Decision Record',
  'Trust Layer',
];

describe('SEITENBAUSTEINE – die neun Bausteine aus Dok. 06', () => {
  it('umfasst exakt die neun Bausteine mit den PDF-Namen, je mit Zweck und Pflichtinhalt', () => {
    expect(SEITENBAUSTEINE.map((b) => b.name)).toEqual(PDF_BAUSTEINE);
    for (const baustein of SEITENBAUSTEINE) {
      expect(baustein.zweck.length).toBeGreaterThan(0);
      expect(baustein.pflichtinhalt.length).toBeGreaterThan(0);
      expect(getBaustein(baustein.id)).toBe(baustein);
    }
  });
});

describe('BAUSTEIN_ABDECKUNG – Zuordnung je Live-Ort', () => {
  const orte = Object.keys(BAUSTEIN_ABDECKUNG) as BausteinOrt[];

  it('Meta: deckt exakt die fünf live-Orte aus NAV_PLACES plus die Objekt-360-Seite ab', () => {
    const liveOrte = NAV_PLACES.filter((p) => p.live)
      .map((p) => String(p.id))
      .sort();
    expect([...orte].filter((o) => o !== 'objekt360').sort()).toEqual(liveOrte);
    expect(orte).toContain('objekt360');
  });

  for (const ort of orte) {
    it(`${ort}: alle neun Bausteine genau einmal, jeder Status mit Pflicht-Begründung`, () => {
      const zuordnung = bausteinAbdeckung(ort);
      expect(zuordnung.map((z) => z.baustein).sort()).toEqual(
        SEITENBAUSTEINE.map((b) => b.id).sort(),
      );
      expect(new Set(zuordnung.map((z) => z.baustein)).size).toBe(9);

      for (const eintrag of zuordnung) {
        switch (eintrag.status) {
          case 'ohne_traeger':
            expect(eintrag.grund, `${ort}/${eintrag.baustein}`).toBeTruthy();
            break;
          case 'teilweise':
            expect(eintrag.wo, `${ort}/${eintrag.baustein}`).toBeTruthy();
            expect(eintrag.fehlt, `${ort}/${eintrag.baustein}`).toBeTruthy();
            break;
          case 'vorhanden':
          case 'verweis':
            expect(eintrag.wo, `${ort}/${eintrag.baustein}`).toBeTruthy();
            break;
          default: {
            const unbekannt: never = eintrag.status;
            throw new Error(`Unbekannter Status: ${String(unbekannt)}`);
          }
        }
      }
    });
  }

  it('kein sichtbarer Begründungstext verspricht Zukunft oder erfindet einen Wert', () => {
    for (const ort of orte) {
      for (const eintrag of bausteinAbdeckung(ort)) {
        const sichtbar = `${eintrag.grund ?? ''} ${eintrag.fehlt ?? ''} ${eintrag.wo ?? ''}`;
        // Datenlücke statt Roadmap: kein Termin- oder Funktionsversprechen.
        expect(sichtbar, `${ort}/${eintrag.baustein}`).not.toMatch(
          /kommt bald|in Kürze|geplant für|folgt in/i,
        );
      }
    }
  });
});
