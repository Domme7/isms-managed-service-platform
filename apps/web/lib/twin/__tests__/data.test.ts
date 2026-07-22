/**
 * Unit-Tests der React-freien View-Helfer (WP-004, C2).
 *
 * Prüft gegen den echten Contract/Seed (keine Mocks): Familien-Zuordnung, R-ID-/Klartext-Mapping,
 * die kanonische F01..F09-Reihenfolge der Gruppierung und – insbesondere – den ID-Fallback in
 * `resolveRelationships` (konstruierte Dangling-Kante => rohe ID greift). Deutsche Labels sind
 * reine UI-Schicht; hier wird nichts am Modell erfunden.
 */
import { describe, expect, it } from 'vitest';

import { NORDWERK_OBJECTS, NORDWERK_RELATIONSHIPS } from '@isms/demo-seed';
import {
  confidenceQualitative,
  familyForType,
  getModeledTenants,
  groupObjectsByFamily,
  relationshipTypeId,
  relationshipTypeLabel,
  resolveRelationships,
} from '../data';

describe('familyForType', () => {
  it('ordnet Objekttypen ihrer kanonischen Familie zu', () => {
    expect(familyForType('Organisation')).toBe('F01');
    expect(familyForType('Geschäftsprozess')).toBe('F03');
    expect(familyForType('Control')).toBe('F06');
    expect(familyForType('Risk')).toBe('F07');
    expect(familyForType('Evidence')).toBe('F08');
  });
});

describe('relationshipTypeId / relationshipTypeLabel', () => {
  it('liefert die kanonische R-ID', () => {
    expect(relationshipTypeId('part_of')).toBe('R01');
    expect(relationshipTypeId('processes')).toBe('R07');
    expect(relationshipTypeId('evidences')).toBe('R15');
    expect(relationshipTypeId('nicht-existent')).toBeUndefined();
  });

  it('liefert deutsche UI-Labels (reine Präsentationsschicht)', () => {
    expect(relationshipTypeLabel('processes')).toBe('verarbeitet');
    expect(relationshipTypeLabel('owns')).toBe('verantwortet');
    expect(relationshipTypeLabel('mitigates')).toBe('mindert');
    // Nicht gemappter Typ -> undefined (Aufrufer fällt auf technischen Namen zurück).
    expect(relationshipTypeLabel('related_to')).toBeUndefined();
  });
});

describe('groupObjectsByFamily', () => {
  it('gruppiert in kanonischer F01..F09-Reihenfolge und lässt leere Familien weg', () => {
    const groups = groupObjectsByFamily(NORDWERK_OBJECTS);

    // Nordwerk belegt genau F01, F02, F03, F06, F07, F08.
    expect(groups.map((g) => g.id)).toEqual(['F01', 'F02', 'F03', 'F06', 'F07', 'F08']);

    // Reihenfolge ist strikt aufsteigend und jede Gruppe ist nicht leer.
    const ids = groups.map((g) => g.id);
    expect([...ids].sort()).toEqual(ids);
    for (const group of groups) {
      expect(group.objects.length).toBeGreaterThanOrEqual(1);
    }
  });
});

describe('resolveRelationships', () => {
  it('löst source_id/target_id über die Objekte auf display_name auf', () => {
    const resolved = resolveRelationships(NORDWERK_OBJECTS, NORDWERK_RELATIONSHIPS);
    const processes = resolved.find((r) => r.relationship_type === 'processes');

    expect(processes).toBeDefined();
    expect(processes?.source_name).toBe('Auftragsabwicklung');
    expect(processes?.target_name).toBe('Kundenauftragsdaten');
    expect(processes?.relationship_type_id).toBe('R07');
    expect(processes?.relationship_type_label).toBe('verarbeitet');
  });

  it('fällt bei einer Dangling-Kante auf die rohe ID zurück (Lücke sichtbar)', () => {
    const dangling = {
      ...NORDWERK_RELATIONSHIPS[0],
      relationship_id: 'test-dangling',
      source_id: 'ghost-source',
      target_id: 'ghost-target',
    };

    const resolved = resolveRelationships(NORDWERK_OBJECTS, [dangling]);
    expect(resolved).toHaveLength(1);
    expect(resolved[0].source_name).toBe('ghost-source');
    expect(resolved[0].target_name).toBe('ghost-target');
  });
});

describe('confidenceQualitative', () => {
  it('bildet Werte auf Bänder ab und formatiert mit deutschem Dezimalkomma', () => {
    expect(confidenceQualitative(0.8).band).toBe('hoch');
    expect(confidenceQualitative(0.7).band).toBe('mittel');
    expect(confidenceQualitative(0.4).band).toBe('niedrig');
    expect(confidenceQualitative(0.7).display).toBe('mittel (0,7)');
  });
});

describe('getModeledTenants', () => {
  it('leitet ausmodellierte Mandanten aus dem Seed ab (nicht hartkodiert)', () => {
    const modeled = getModeledTenants();
    expect(modeled.length).toBeGreaterThanOrEqual(1);
    expect(modeled.every((t) => t.has_object_graph)).toBe(true);
    expect(modeled.map((t) => t.display_name)).toContain('Nordwerk Manufacturing SE');
  });
});
