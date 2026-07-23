/**
 * Unit-Tests der Rollenrahmung des Ortes „Heute" (WP-016 Slice 1).
 *
 * Kernaussage dieses Tests: die Rahmung ordnet und benennt – sie entzieht nichts. Alle zwölf
 * Rollen R01–R12 lösen auf genau eine Erlebniswelt auf, jede Welt zeigt dieselben vier
 * Abschnitte, und die Rahmung trägt keinerlei Daten (Dok. 06 06-D05, Dok. 10 ENTSCHEIDUNG 10-02;
 * kein Rollen-Gating, Dok. 19 folgt separat).
 */
import { describe, expect, it } from 'vitest';

import { DEMO_ROLES, EXPERIENCE_WORLDS, worldForRole, type WorldId } from '../../shell/roles';
import {
  MISSION_SECTIONS,
  MISSION_SECTION_IDS,
  WORLD_FRAMINGS,
  framingForRole,
  framingForWorld,
  type MissionSectionId,
} from '../framing';

const WORLD_IDS = Object.keys(WORLD_FRAMINGS) as WorldId[];

describe('Rollen und Welten – alle zwölf Rollen sind gerahmt', () => {
  it('kennt genau die zwölf kanonischen Rollen', () => {
    expect(DEMO_ROLES).toHaveLength(12);
    expect(DEMO_ROLES.map((r) => r.id)).toEqual([
      'R01',
      'R02',
      'R03',
      'R04',
      'R05',
      'R06',
      'R07',
      'R08',
      'R09',
      'R10',
      'R11',
      'R12',
    ]);
  });

  it('löst jede Rolle auf genau eine Welt auf und liefert deren Rahmung', () => {
    for (const role of DEMO_ROLES) {
      const framing = framingForRole(role.id);
      expect(framing, role.id).toBeDefined();
      expect(framing?.worldId).toBe(worldForRole(role).id);
      expect(framing).toBe(framingForWorld(worldForRole(role).id));
    }
  });

  it('liefert für eine unbekannte Rollen-ID `undefined` (keine erfundene Welt)', () => {
    expect(framingForRole('R99')).toBeUndefined();
    expect(framingForRole('')).toBeUndefined();
  });

  it('liest Weltname und Leitfrage aus `lib/shell/roles.ts`, statt sie zu kopieren', () => {
    for (const worldId of WORLD_IDS) {
      const framing = framingForWorld(worldId);
      // Identität statt Gleichheit: es gibt genau eine Quelle für Name und Leitfrage.
      expect(framing.world).toBe(EXPERIENCE_WORLDS[worldId]);
      expect(framing.world.name.length).toBeGreaterThan(0);
      expect(framing.world.leitfrage.length).toBeGreaterThan(0);
    }
  });
});

describe('Abschnittsreihenfolge – Betonung ohne Datenunterschied', () => {
  it('zeigt in jeder Welt alle vier Abschnitte genau einmal (nichts wird ausgeblendet)', () => {
    for (const worldId of WORLD_IDS) {
      const order = framingForWorld(worldId).sectionOrder;
      expect(order).toHaveLength(4);
      expect([...order].sort()).toEqual([...MISSION_SECTION_IDS].sort());
    }
  });

  it('beginnt in jeder Welt mit „Wo stehe ich?" (Dok. 06 §6: Rolle/Mandant/Datenstand sichtbar)', () => {
    for (const worldId of WORLD_IDS) {
      expect(framingForWorld(worldId).sectionOrder[0]).toBe<MissionSectionId>('standort');
    }
  });

  it('rahmt die vier Welten unterschiedlich (die Rahmung ist wirksam, nicht dekorativ)', () => {
    const reihenfolgen = WORLD_IDS.map((id) => framingForWorld(id).sectionOrder.join('>'));
    expect(new Set(reihenfolgen).size).toBe(4);
  });

  it('trägt zu jeder Abschnittskennung eine sichtbare Überschrift (jede ist eine Frage)', () => {
    // Die Reihenfolge einer Welt wird von `MissionControlContent` direkt über `sectionOrder`
    // gerendert; der frühere Helfer `orderedSections` war unbenutzt und ist entfernt.
    expect(
      framingForWorld('assurance').sectionOrder.map((id) => MISSION_SECTIONS[id].title),
    ).toEqual([
      'Wo stehe ich?',
      'Was ist erfasst worden?',
      'Was weiß ich über die Datenlage?',
      'Wo steige ich ein?',
    ]);

    for (const id of MISSION_SECTION_IDS) {
      expect(MISSION_SECTIONS[id].id).toBe(id);
      expect(MISSION_SECTIONS[id].title.endsWith('?')).toBe(true);
    }
  });
});

describe('Quellen – die Rahmung zitiert Dok. 06 §5 und erfindet nichts', () => {
  it('trägt je Welt „Erlebnis" und „Bewusst vermeiden" wörtlich, mit Quellzeile', () => {
    for (const worldId of WORLD_IDS) {
      const framing = framingForWorld(worldId);
      expect(framing.quoteSource).toContain('Dok. 06');
      expect(framing.quoteSource).toContain('§5');
      expect(framing.experienceQuote.length).toBeGreaterThan(0);
      expect(framing.avoidQuote.length).toBeGreaterThan(0);
      expect(framing.orderRationale.length).toBeGreaterThan(0);
    }
  });

  it('gibt die Zitate der Executive World unverändert wieder (Wortlaut verbindlich)', () => {
    const framing = framingForWorld('executive');
    expect(framing.experienceQuote).toBe(
      'Klartext, 3-5 Entscheidungen, Business Impact, Optionen, Investitionswirkung, Unsicherheit.',
    );
    expect(framing.avoidQuote).toBe('Keine Roh-Control-Listen, keine operative Task-Wand.');
  });

  it('unterscheidet die Zitate je Welt (keine Sammelformulierung)', () => {
    expect(new Set(WORLD_IDS.map((id) => framingForWorld(id).experienceQuote)).size).toBe(4);
    expect(new Set(WORLD_IDS.map((id) => framingForWorld(id).avoidQuote)).size).toBe(4);
  });
});

describe('Kein Rollen-Gating – die Rahmung trägt keine Daten', () => {
  it('besteht je Welt ausschließlich aus Anzeige-Metadaten', () => {
    for (const worldId of WORLD_IDS) {
      expect(Object.keys(framingForWorld(worldId)).sort()).toEqual([
        'avoidQuote',
        'experienceQuote',
        'orderRationale',
        'quoteSource',
        'sectionOrder',
        'world',
        'worldId',
      ]);
    }
  });

  it('liefert für alle zwölf Rollen dieselbe Abschnittsmenge (nur die Reihenfolge variiert)', () => {
    const mengen = DEMO_ROLES.map((role) => {
      const framing = framingForRole(role.id);
      if (!framing) throw new Error(`Rahmung fehlt: ${role.id}`);
      return [...framing.sectionOrder].sort().join(',');
    });
    expect(new Set(mengen).size).toBe(1);
    expect(mengen[0]).toBe([...MISSION_SECTION_IDS].sort().join(','));
  });

  it('teilt sich die Rahmung strikt nach Welt, nicht nach Rolle', () => {
    for (const worldId of WORLD_IDS) {
      const rollenDerWelt = DEMO_ROLES.filter((r) => worldForRole(r).id === worldId);
      expect(rollenDerWelt.length).toBeGreaterThanOrEqual(1);
      for (const role of rollenDerWelt) {
        expect(framingForRole(role.id)).toBe(framingForWorld(worldId));
      }
    }
  });
});
