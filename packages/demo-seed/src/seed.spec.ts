import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  ObjectEnvelope,
  RelationshipEnvelope,
  OBJECT_FAMILIES,
  OBJECT_FAMILY_ID,
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
  it('jedes Objekt trägt genau eine tenant_id aus der Mandantenliste', () => {
    const known = new Set(tenants.map((t) => t.tenant_id));
    const foreign = objects
      .filter((o) => !o.tenant_id || !known.has(o.tenant_id))
      .map((o) => o.object_id);
    expect(foreign).toEqual([]);
  });

  it('Objekte verteilen sich exakt auf die ausmodellierten Mandanten (pro Tenant)', () => {
    const byTenant = (tenantId: string) => objects.filter((o) => o.tenant_id === tenantId);

    // Nordwerk: 17 Objekte ISMS-Kerngraph (WP-003) + 14 Objekte Serviceschicht (WP-012).
    expect(byTenant(TENANT_ID.NORDWERK)).toHaveLength(31);
    // Consulting Operator Demo: eigene Serviceschicht (WP-012 Slice 1).
    expect(byTenant(TENANT_ID.CONSULTING_OPERATOR)).toHaveLength(9);
    // Finovia/MediCore bleiben bewusst leer (Empty-State-Nachweis in der UI).
    expect(byTenant(TENANT_ID.FINOVIA)).toEqual([]);
    expect(byTenant(TENANT_ID.MEDICORE)).toEqual([]);
  });

  it('Beziehungen verteilen sich exakt auf die ausmodellierten Mandanten (pro Tenant)', () => {
    const byTenant = (tenantId: string) => relationships.filter((r) => r.tenant_id === tenantId);

    // Nordwerk: 15 Kanten Kerngraph + 28 Kanten Serviceschicht.
    expect(byTenant(TENANT_ID.NORDWERK)).toHaveLength(43);
    expect(byTenant(TENANT_ID.CONSULTING_OPERATOR)).toHaveLength(11);
    expect(byTenant(TENANT_ID.FINOVIA)).toEqual([]);
    expect(byTenant(TENANT_ID.MEDICORE)).toEqual([]);
  });

  it('ein Mandant sieht ausschließlich seine eigenen Objekte (Sichtprüfung je Tenant)', () => {
    for (const tenant of tenants) {
      const visible = objects.filter((o) => o.tenant_id === tenant.tenant_id);
      expect(visible.every((o) => o.tenant_id === tenant.tenant_id)).toBe(true);
      // Kein Objekt eines anderen Mandanten taucht in dieser Sicht auf.
      const foreignIds = objects
        .filter((o) => o.tenant_id !== tenant.tenant_id)
        .map((o) => o.object_id);
      const leaked = visible.map((o) => o.object_id).filter((id) => foreignIds.includes(id));
      expect(leaked).toEqual([]);
    }
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

  it('`has_object_graph` stimmt für JEDEN Mandanten mit dem tatsächlichen Seed überein', () => {
    for (const tenant of tenants) {
      const count = objects.filter((o) => o.tenant_id === tenant.tenant_id).length;
      expect(
        { tenant: tenant.tenant_id, flag: tenant.has_object_graph },
        `has_object_graph passt nicht zu ${count} Objekten`,
      ).toEqual({ tenant: tenant.tenant_id, flag: count > 0 });
    }
  });

  it('ausmodelliert sind Nordwerk und der Consulting Operator Demo; Finovia/MediCore nicht', () => {
    const withGraph = tenants.filter((t) => t.has_object_graph).map((t) => t.tenant_id);
    expect(withGraph).toEqual([TENANT_ID.NORDWERK, TENANT_ID.CONSULTING_OPERATOR]);
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

describe('Demo-Seed – Managed-Service-Schicht (WP-012 Slice 1)', () => {
  const services = objects.filter((o) => o.object_type === 'Managed Service');
  const partOfTargets = (targetId: string) =>
    relationships.filter((r) => r.relationship_type === 'part_of' && r.target_id === targetId);
  const objectById = new Map(objects.map((o) => [o.object_id, o] as const));

  it('mehrere Mandanten tragen Managed Services (Voraussetzung der Portfolio-Sicht)', () => {
    const tenantsWithServices = [...new Set(services.map((s) => s.tenant_id))].sort();
    expect(tenantsWithServices).toEqual(
      [TENANT_ID.CONSULTING_OPERATOR, TENANT_ID.NORDWERK].sort(),
    );
    expect(services.filter((s) => s.tenant_id === TENANT_ID.NORDWERK)).toHaveLength(3);
    expect(services.filter((s) => s.tenant_id === TENANT_ID.CONSULTING_OPERATOR)).toHaveLength(2);
  });

  it('jeder Managed Service besitzt genau ein SLA und mindestens ein Deliverable (part_of)', () => {
    for (const service of services) {
      const parts = partOfTargets(service.object_id)
        .map((r) => objectById.get(r.source_id))
        .filter((o): o is NonNullable<typeof o> => Boolean(o));
      const slas = parts.filter((o) => o.object_type === 'SLA');
      const deliverables = parts.filter((o) => o.object_type === 'Deliverable');

      expect(slas.map((o) => o.object_id), `SLA fehlt für ${service.object_id}`).toHaveLength(1);
      expect(
        deliverables.length,
        `Deliverable fehlt für ${service.object_id}`,
      ).toBeGreaterThanOrEqual(1);
    }
  });

  it('jeder Managed Service hat eine Delivery-Verantwortung (delivered_by -> Team, gleicher Tenant)', () => {
    for (const service of services) {
      const edges = relationships.filter(
        (r) => r.relationship_type === 'delivered_by' && r.source_id === service.object_id,
      );
      expect(edges.length, `delivered_by fehlt für ${service.object_id}`).toBeGreaterThanOrEqual(1);
      for (const edge of edges) {
        const target = objectById.get(edge.target_id);
        expect(target?.object_type).toBe('Team');
        expect(target?.tenant_id).toBe(service.tenant_id);
      }
    }
  });

  it('Serviceobjekte docken an den bestehenden ISMS-Kerngraphen an (covered_by/requires)', () => {
    const nordwerkService = 'nordwerk-service-risk-control-monitoring';
    const covered = relationships
      .filter((r) => r.relationship_type === 'covered_by' && r.target_id === nordwerkService)
      .map((r) => r.source_id);
    // Risiko, Control und Control-Implementierung des Kerngraphen liegen im Serviceumfang.
    expect(covered).toContain('nordwerk-risk-betriebsunterbrechung');
    expect(covered).toContain('nordwerk-ctrl-backup-recovery');
    expect(covered).toContain('nordwerk-ctrlimpl-backup-job-erp');

    const requires = relationships.filter(
      (r) => r.relationship_type === 'requires' && r.source_id.startsWith('nordwerk-service-'),
    );
    expect(requires.length).toBeGreaterThanOrEqual(1);
  });

  it('enthält keine Preis-, Währungs- oder Vertragsbetragsangaben (D-015, synthetisch)', () => {
    // Harte Guardrail: weder Währungszeichen noch Beträge dürfen im Seed auftauchen.
    const currency = /(€|\bEUR\b|\bUSD\b|\$|\bCHF\b|\bTagessatz\b|\bStundensatz\b)/;
    const offenders = objects
      .filter((o) => currency.test(`${o.display_name} ${o.description ?? ''}`))
      .map((o) => o.object_id);
    expect(offenders).toEqual([]);
  });
});

describe('Demo-Seed – Manifest-Konsistenz', () => {
  // Pfad robust aus dem Testdatei-Verzeichnis ableiten (src/ -> Paketwurzel), unabhängig vom cwd.
  // Modul-Target ist commonjs -> __dirname (Node-Global) statt import.meta.url.
  const manifestPath = resolve(__dirname, '..', 'seed-manifest.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8')) as {
    seed_version: string;
    counts: {
      tenants: number;
      objects: number;
      relationships: number;
      objects_by_tenant: Record<string, number>;
      relationships_by_tenant: Record<string, number>;
    };
    tenants: { tenant_id: string; has_object_graph: boolean }[];
    object_families_used: string[];
    relationship_types_used: string[];
  };

  it('seed_version stimmt mit SEED_VERSION überein', () => {
    expect(manifest.seed_version).toBe(SEED_VERSION);
  });

  it('counts im Manifest stimmen mit dem tatsächlichen Seed überein', () => {
    expect(manifest.counts.tenants).toBe(tenants.length);
    expect(manifest.counts.objects).toBe(objects.length);
    expect(manifest.counts.relationships).toBe(relationships.length);
  });

  it('Pro-Tenant-Counts im Manifest stimmen mit dem tatsächlichen Seed überein', () => {
    const actualObjects = Object.fromEntries(
      tenants.map((t) => [t.tenant_id, objects.filter((o) => o.tenant_id === t.tenant_id).length]),
    );
    const actualRelationships = Object.fromEntries(
      tenants.map((t) => [
        t.tenant_id,
        relationships.filter((r) => r.tenant_id === t.tenant_id).length,
      ]),
    );
    expect(manifest.counts.objects_by_tenant).toEqual(actualObjects);
    expect(manifest.counts.relationships_by_tenant).toEqual(actualRelationships);
  });

  it('`has_object_graph` im Manifest stimmt mit den Mandantendefinitionen überein', () => {
    const fromSeed = tenants.map((t) => ({
      tenant_id: t.tenant_id,
      has_object_graph: t.has_object_graph,
    }));
    expect(
      manifest.tenants.map((t) => ({
        tenant_id: t.tenant_id,
        has_object_graph: t.has_object_graph,
      })),
    ).toEqual(fromSeed);
  });

  it('`relationship_types_used` im Manifest ist genau die im Seed genutzte Menge', () => {
    const used = [...new Set(relationships.map((r) => r.relationship_type))].sort();
    expect([...manifest.relationship_types_used].sort()).toEqual(used);
  });

  it('`object_families_used` im Manifest ist genau die im Seed belegte Menge', () => {
    const typeToFamily = new Map<string, string>();
    for (const familyId of OBJECT_FAMILY_ID) {
      for (const type of OBJECT_FAMILIES[familyId].types) {
        // Bei der dokumentierten Überschneidung ("Finding" in F07 und F08) gewinnt die
        // zuletzt gesehene Familie; der Seed nutzt "Finding" nicht.
        typeToFamily.set(type, familyId);
      }
    }
    const used = [...new Set(objects.map((o) => typeToFamily.get(o.object_type)))].sort();
    expect([...manifest.object_families_used].sort()).toEqual(used);
  });
});
