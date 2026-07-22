import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  ObjectEnvelope,
  RelationshipEnvelope,
  OBJECT_TYPE,
  RELATIONSHIP_TYPE,
} from '@isms/contracts';
import { DEMO_SEED, SEED_VERSION } from './seed';
import { DEMO_TENANTS, TENANT_ID } from './tenants';
import {
  findCrossTenantRelationships,
  findDanglingRelationships,
  findDuplicateIds,
  findUnresolvedOwnerRefs,
} from './integrity';

const { objects, relationships, tenants } = DEMO_SEED;

describe('Demo-Seed – Schema-Validität (gegen @isms/contracts)', () => {
  it('jedes Seed-Objekt parst als ObjectEnvelope', () => {
    const failures = objects
      .map((obj) => ({ id: obj.object_id, result: ObjectEnvelope.safeParse(obj) }))
      .filter((entry) => !entry.result.success)
      .map((entry) => entry.id);
    expect(failures).toEqual([]);
  });

  it('jede Seed-Beziehung parst als RelationshipEnvelope', () => {
    const failures = relationships
      .map((rel) => ({ id: rel.relationship_id, result: RelationshipEnvelope.safeParse(rel) }))
      .filter((entry) => !entry.result.success)
      .map((entry) => entry.id);
    expect(failures).toEqual([]);
  });
});

describe('Demo-Seed – Stabile, eindeutige IDs (P02)', () => {
  it('keine doppelten object_id', () => {
    expect(findDuplicateIds(objects.map((o) => o.object_id))).toEqual([]);
  });

  it('keine doppelten relationship_id', () => {
    expect(findDuplicateIds(relationships.map((r) => r.relationship_id))).toEqual([]);
  });

  it('kein leerer Identifikator im Seed', () => {
    const empty = [
      ...objects.map((o) => o.object_id),
      ...relationships.map((r) => r.relationship_id),
    ].filter((id) => id.trim().length === 0);
    expect(empty).toEqual([]);
  });

  it('object_id und relationship_id überschneiden sich nicht', () => {
    const objectIds = new Set(objects.map((o) => o.object_id));
    const overlap = relationships.map((r) => r.relationship_id).filter((id) => objectIds.has(id));
    expect(overlap).toEqual([]);
  });

  it('beweist den Duplikat-Detektor: eine bekannte Dublette wird gemeldet (nicht stur [])', () => {
    // Negativ-Beweis: der Detektor liefert bei einer echten Dublette diese ID zurück.
    expect(findDuplicateIds(['a', 'b', 'a', 'c'])).toEqual(['a']);
    // Kontrast: bei eindeutiger Eingabe bleibt das Ergebnis leer.
    expect(findDuplicateIds(['a', 'b', 'c'])).toEqual([]);
  });
});

describe('Demo-Seed – Tenant-Isolation (P09, D11, Dok. 19)', () => {
  it('alle Objekte gehören zu tenant-nordwerk', () => {
    const foreign = objects.filter((o) => o.tenant_id !== TENANT_ID.NORDWERK).map((o) => o.object_id);
    expect(foreign).toEqual([]);
  });

  it('jede Beziehung trägt eine tenant_id', () => {
    const missing = relationships.filter((r) => !r.tenant_id || r.tenant_id.trim().length === 0);
    expect(missing).toEqual([]);
  });

  it('der Seed enthält keine Cross-Tenant-Beziehung', () => {
    expect(findCrossTenantRelationships(objects, relationships)).toEqual([]);
  });

  it('beweist die Isolation: eine konstruierte Cross-Tenant-Kante wird erkannt', () => {
    // Negativ-Beweis: fremdes Objekt (anderer Tenant) + Kante darauf -> muss als Verletzung gelten.
    const foreignObject = {
      ...objects[0],
      object_id: 'foreign-obj-finovia',
      tenant_id: TENANT_ID.FINOVIA,
    };
    const crossTenantEdge = {
      ...relationships[0],
      relationship_id: 'cross-tenant-edge',
      tenant_id: TENANT_ID.NORDWERK,
      source_id: objects[0].object_id,
      target_id: foreignObject.object_id,
    };
    const violations = findCrossTenantRelationships(
      [...objects, foreignObject],
      [crossTenantEdge],
    );
    expect(violations.length).toBeGreaterThan(0);
    expect(violations.some((v) => v.relationship_id === 'cross-tenant-edge')).toBe(true);
  });
});

describe('Demo-Seed – Referenzielle Integrität', () => {
  it('jede Beziehung zeigt auf existierende Objekte (kein Dangling)', () => {
    expect(findDanglingRelationships(objects, relationships)).toEqual([]);
  });

  it('erkennt eine Beziehung auf ein nicht existierendes Zielobjekt', () => {
    const dangling = {
      ...relationships[0],
      relationship_id: 'dangling-target-edge',
      target_id: 'objekt-existiert-nicht',
    };
    const violations = findDanglingRelationships(objects, [dangling]);
    expect(violations.some((v) => v.relationship_id === 'dangling-target-edge')).toBe(true);
  });

  it('erkennt eine Beziehung mit nicht existierendem Quellobjekt', () => {
    const dangling = {
      ...relationships[0],
      relationship_id: 'dangling-source-edge',
      source_id: 'quelle-existiert-nicht',
    };
    const violations = findDanglingRelationships(objects, [dangling]);
    expect(violations.some((v) => v.relationship_id === 'dangling-source-edge')).toBe(true);
  });
});

describe('Demo-Seed – Owner-Ref-Kohärenz (Dok. 07 P11/P12)', () => {
  it('jede owner_id löst auf ein existierendes Seed-Objekt auf', () => {
    expect(findUnresolvedOwnerRefs(objects)).toEqual([]);
  });

  it('erkennt eine unauflösbare owner_id (Negativ-Beweis)', () => {
    const objectWithBadOwner = {
      ...objects[0],
      object_id: 'obj-mit-fehlendem-owner',
      owner_ids: [{ owner_id: 'owner-existiert-nicht', owner_kind: 'fachlich' as const }],
    };
    const violations = findUnresolvedOwnerRefs([...objects, objectWithBadOwner]);
    expect(violations.some((v) => v.owner_id === 'owner-existiert-nicht')).toBe(true);
  });
});

describe('Demo-Seed – Vokabular-Konformität (kanonische Contract-Vokabulare)', () => {
  const objectTypes = OBJECT_TYPE as readonly string[];
  const relationshipTypes = RELATIONSHIP_TYPE as readonly string[];

  it('alle object_type liegen im kanonischen OBJECT_TYPE (F01–F09)', () => {
    const unknown = objects.filter((o) => !objectTypes.includes(o.object_type)).map((o) => o.object_id);
    expect(unknown).toEqual([]);
  });

  it('alle relationship_type liegen im kanonischen RELATIONSHIP_TYPE (R01–R25)', () => {
    const unknown = relationships
      .filter((r) => !relationshipTypes.includes(r.relationship_type))
      .map((r) => r.relationship_id);
    expect(unknown).toEqual([]);
  });
});

describe('Demo-Seed – Mandanten & Determinismus', () => {
  it('genau vier Demo-Mandanten mit stabilen, eindeutigen IDs', () => {
    expect(tenants).toHaveLength(4);
    expect(findDuplicateIds(tenants.map((t) => t.tenant_id))).toEqual([]);
  });

  it('nur Nordwerk trägt in Slice 2 einen Objektgraphen', () => {
    const withGraph = tenants.filter((t) => t.has_object_graph).map((t) => t.tenant_id);
    expect(withGraph).toEqual([TENANT_ID.NORDWERK]);
  });

  it('DEMO_TENANTS und DEMO_SEED.tenants sind dieselbe Quelle', () => {
    expect(tenants).toBe(DEMO_TENANTS);
  });

  it('Bitemporalität: fachliche Gültigkeit liegt echt vor der Systemerfassung (über alle Objekte)', () => {
    const notOrdered = objects
      .filter((o) => !(Date.parse(o.valid_time.from) < Date.parse(o.record_time.recorded_at)))
      .map((o) => o.object_id);
    expect(notOrdered).toEqual([]);
  });
});

describe('Demo-Seed – Manifest-Konsistenz', () => {
  // Pfad robust aus dem Testdatei-Verzeichnis ableiten (src/ -> Paketwurzel), unabhängig vom cwd.
  // Modul-Target ist commonjs -> __dirname (Node-Global) statt import.meta.url.
  const manifestPath = resolve(__dirname, '..', 'seed-manifest.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as {
    seed_version: string;
    counts: { tenants: number; objects: number; relationships: number };
  };

  it('seed_version stimmt mit SEED_VERSION überein', () => {
    expect(manifest.seed_version).toBe(SEED_VERSION);
  });

  it('counts im Manifest stimmen mit dem tatsächlichen Seed überein', () => {
    expect(manifest.counts.tenants).toBe(tenants.length);
    expect(manifest.counts.objects).toBe(objects.length);
    expect(manifest.counts.relationships).toBe(relationships.length);
  });
});
