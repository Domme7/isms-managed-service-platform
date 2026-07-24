/**
 * Kuratierte Cockpit-Personalisierung (WP-029): der react-freie Kern.
 * Prüft: defensives Parsen, Dedupe, Toggle und die STABILE „angeheftet zuerst"-Sortierung –
 * inklusive der Invariante, dass NICHTS entfernt wird (nur umgeordnet).
 */
import { describe, expect, it } from 'vitest';

import { parsePins, serializePins, sortByPins, togglePin } from '../personalisierung';

const ORTE = [{ id: 'heute' }, { id: 'kunden' }, { id: 'isms' }, { id: 'services' }] as const;

describe('parsePins – defensiv', () => {
  it('fällt bei null/kaputt/Nicht-Array auf keine Anheftung', () => {
    expect(parsePins(null)).toEqual([]);
    expect(parsePins('kein json')).toEqual([]);
    expect(parsePins('{"a":1}')).toEqual([]);
    expect(parsePins('"isms"')).toEqual([]);
  });

  it('nimmt nur Zeichenketten und entfernt Dubletten', () => {
    expect(parsePins('["isms","heute","isms",5,null]')).toEqual(['isms', 'heute']);
  });
});

describe('serializePins / togglePin', () => {
  it('serialisiert dublettenfrei und ist rundreisefest', () => {
    expect(parsePins(serializePins(['isms', 'isms', 'heute']))).toEqual(['isms', 'heute']);
  });

  it('heftet an und löst, ohne die übrigen zu berühren', () => {
    expect(togglePin(['isms'], 'heute')).toEqual(['isms', 'heute']);
    expect(togglePin(['isms', 'heute'], 'isms')).toEqual(['heute']);
  });
});

describe('sortByPins – angeheftet zuerst, stabil, nichts entfernt', () => {
  it('stellt angeheftete in kanonischer Reihenfolge voran, der Rest folgt kanonisch', () => {
    const sortiert = sortByPins(ORTE, ['services', 'isms']);
    expect(sortiert.map((o) => o.id)).toEqual(['isms', 'services', 'heute', 'kunden']);
  });

  it('entfernt nichts – alle Orte bleiben (Invariante: nichts wegkonfigurierbar)', () => {
    expect(sortByPins(ORTE, ['isms']).length).toBe(ORTE.length);
    expect(sortByPins(ORTE, []).map((o) => o.id)).toEqual(ORTE.map((o) => o.id));
  });

  it('ignoriert unbekannte Pin-IDs (inert)', () => {
    expect(sortByPins(ORTE, ['gibt-es-nicht']).map((o) => o.id)).toEqual(ORTE.map((o) => o.id));
  });
});
