/**
 * Unit-Tests der React-freien View-Helfer (WP-004, C2).
 *
 * Prüft gegen den echten Contract/Seed (keine Mocks): Familien-Zuordnung, R-ID-/Klartext-Mapping,
 * die kanonische F01..F09-Reihenfolge der Gruppierung und – insbesondere – den ID-Fallback in
 * `resolveRelationships` (konstruierte Dangling-Kante => rohe ID greift). Deutsche Labels sind
 * reine UI-Schicht; hier wird nichts am Modell erfunden.
 */
import { describe, expect, it } from 'vitest';

import { NORDWERK_OBJECTS, NORDWERK_RELATIONSHIPS, TENANT_ID } from '@isms/demo-seed';
import {
  confidenceQualitative,
  familyForType,
  getModeledTenants,
  getObjectsForTenant,
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
    // `NORDWERK_OBJECTS` ist der ISMS-Kerngraph (WP-003) OHNE die Managed-Service-Schicht.
    const groups = groupObjectsByFamily(NORDWERK_OBJECTS);

    // Der Kerngraph belegt genau F01, F02, F03, F06, F07, F08.
    expect(groups.map((g) => g.id)).toEqual(['F01', 'F02', 'F03', 'F06', 'F07', 'F08']);

    // Reihenfolge ist strikt aufsteigend und jede Gruppe ist nicht leer.
    const ids = groups.map((g) => g.id);
    expect([...ids].sort()).toEqual(ids);
    for (const group of groups) {
      expect(group.objects.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('die vollständige Mandantensicht von Nordwerk enthält zusätzlich F09 (Serviceschicht)', () => {
    // Seit WP-012 trägt Nordwerk auch F09-Objekte (Managed Service, SLA, Deliverable,
    // Objective, KPI, Review) – die Detailseite muss sie mit anzeigen.
    const groups = groupObjectsByFamily(getObjectsForTenant(TENANT_ID.NORDWERK));
    expect(groups.map((g) => g.id)).toEqual(['F01', 'F02', 'F03', 'F06', 'F07', 'F08', 'F09']);

    const f09 = groups.find((g) => g.id === 'F09');
    expect(f09?.objects.map((o) => o.object_type)).toContain('Managed Service');
    expect(f09?.objects.map((o) => o.object_type)).toContain('SLA');
    expect(f09?.objects.map((o) => o.object_type)).toContain('Deliverable');
  });

  it('der Consulting Operator Demo hat eine eigene, isolierte Objektsicht', () => {
    const operatorObjects = getObjectsForTenant(TENANT_ID.CONSULTING_OPERATOR);
    expect(operatorObjects.length).toBeGreaterThanOrEqual(1);
    expect(operatorObjects.every((o) => o.tenant_id === TENANT_ID.CONSULTING_OPERATOR)).toBe(true);

    // Keine Vermischung mit Nordwerk-Objekten (Mandantengrenze in der View-Schicht).
    const nordwerkIds = new Set(
      getObjectsForTenant(TENANT_ID.NORDWERK).map((o) => o.object_id),
    );
    expect(operatorObjects.filter((o) => nordwerkIds.has(o.object_id))).toEqual([]);
  });

  it('Finovia bleibt ohne Objekte (Empty-State-Nachweis)', () => {
    expect(getObjectsForTenant(TENANT_ID.FINOVIA)).toEqual([]);
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
