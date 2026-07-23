/**
 * Tests der Detailtiefe-Logik (WP-020 Slice 3; Dok. 06, Abschnitt „Detailtiefe").
 *
 * Geprüft wird die react-freie Logik: versionierter Speicherschlüssel, defensives Parsen
 * (ungültige/veraltete/manipulierte Werte fallen auf `null`), mandantenfreie Serialisierung
 * (NUR die Stufe – Cross-Tenant-Schutz, Dok. 06 Kasten CROSS-TENANT-SCHUTZ) und die
 * vollständige, kumulative Ebenen-Zuordnung der vier WP-016-Abschnitte.
 */
import { describe, expect, it } from 'vitest';

import {
  DETAILTIEFEN,
  DETAILTIEFE_STANDARD,
  DETAILTIEFE_STORAGE_KEY,
  SECTION_EBENE,
  parseDetailtiefe,
  serializeDetailtiefe,
  type Detailtiefe,
} from '../detailtiefe';
import { MISSION_SECTION_IDS } from '../framing';

describe('Detailtiefe – Speicherformat', () => {
  it('verwendet einen versionierten Schlüssel (Muster SESSION_STORAGE_KEY)', () => {
    expect(DETAILTIEFE_STORAGE_KEY).toBe('isms-demo-detailtiefe-v1');
    expect(DETAILTIEFE_STORAGE_KEY).toMatch(/-v\d+$/);
  });

  it('serialisiert MANDANTENFREI: nur die Ziffer der Stufe, kein weiterer Zustand', () => {
    for (const tiefe of [1, 2, 3] as const) {
      const wert = serializeDetailtiefe(tiefe);
      expect(wert).toBe(String(tiefe));
      // Negativbeweis Cross-Tenant-Schutz: der gespeicherte Wert kann keinen Mandanten-,
      // Rollen- oder Objektbezug tragen – er ist exakt eine Ziffer.
      expect(wert).toMatch(/^[123]$/);
    }
  });

  it('parst gültige Werte zurück (Roundtrip)', () => {
    for (const tiefe of [1, 2, 3] as const) {
      expect(parseDetailtiefe(serializeDetailtiefe(tiefe))).toBe(tiefe);
    }
  });

  it('verwirft ungültige, veraltete oder manipulierte Werte defensiv (null)', () => {
    for (const kaputt of [null, '', '0', '4', 'zehn', '2.0', ' 2', 'tenant-nordwerk', '{}']) {
      expect(parseDetailtiefe(kaputt), String(kaputt)).toBeNull();
    }
  });
});

describe('Detailtiefe – Stufen und Ebenen-Zuordnung', () => {
  it('kennt genau drei Stufen mit Titel und Beschreibung; Standard ist die ruhige Ebene 1 (P06)', () => {
    expect(DETAILTIEFE_STANDARD).toBe(1);
    expect(DETAILTIEFEN.map((s) => s.stufe)).toEqual([1, 2, 3]);
    for (const stufe of DETAILTIEFEN) {
      expect(stufe.titel.length).toBeGreaterThan(0);
      expect(stufe.beschreibung.length).toBeGreaterThan(0);
    }
  });

  it('ordnet jeden der vier WP-016-Abschnitte genau einer Ebene 2 oder 3 zu (kumulativ)', () => {
    // Vollständigkeit: jede Abschnittskennung hat eine Ebene – ein fünfter Abschnitt ohne
    // Zuordnung bräche zuerst den Typecheck, dieser Test hält die Regel zusätzlich fest.
    expect(Object.keys(SECTION_EBENE).sort()).toEqual([...MISSION_SECTION_IDS].sort());
    for (const id of MISSION_SECTION_IDS) {
      const ebene: Detailtiefe = SECTION_EBENE[id];
      // Ebene 1 trägt keinen WP-016-Abschnitt: sie ist der verdichtete Zustand (DR-0008);
      // alles Bestehende lebt in Ebene 2/3 – Verdichtung ist Umordnung, kein Verlust.
      expect(ebene === 2 || ebene === 3).toBe(true);
    }
    // Die Rohdaten-Einstiege sind Ebene 3 (Dok. 06: „Ebene 3 zeigt Rohdaten, Mappings, …").
    expect(SECTION_EBENE.einstieg).toBe(3);
  });
});
