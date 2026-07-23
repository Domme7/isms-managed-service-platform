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
import { NORDWERK_DECISION_OBJECT_ID } from './decisions';
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

    // Nordwerk: 17 Objekte ISMS-Kerngraph (WP-003) + 14 Objekte Serviceschicht (WP-012)
    // + 3 Objekte Entscheidungsschicht (WP-017).
    expect(byTenant(TENANT_ID.NORDWERK)).toHaveLength(34);
    // Consulting Operator Demo: eigene Serviceschicht (WP-012 Slice 1).
    expect(byTenant(TENANT_ID.CONSULTING_OPERATOR)).toHaveLength(9);
    // Finovia/MediCore bleiben bewusst leer (Empty-State-Nachweis in der UI).
    expect(byTenant(TENANT_ID.FINOVIA)).toEqual([]);
    expect(byTenant(TENANT_ID.MEDICORE)).toEqual([]);
  });

  it('Beziehungen verteilen sich exakt auf die ausmodellierten Mandanten (pro Tenant)', () => {
    const byTenant = (tenantId: string) => relationships.filter((r) => r.tenant_id === tenantId);

    // Nordwerk: 15 Kanten Kerngraph + 28 Kanten Serviceschicht + 8 Kanten Entscheidungsschicht.
    expect(byTenant(TENANT_ID.NORDWERK)).toHaveLength(51);
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
    const violations = findCrossTenantRelationships([...objects, foreignObject], [crossTenantEdge]);
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
    const unknown = objects
      .filter((o) => !objectTypes.includes(o.object_type))
      .map((o) => o.object_id);
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

  it('Bitemporalität gilt auch für alle Beziehungen (valid_from < recorded_at)', () => {
    // WP-012-Review M3: Beziehungen nutzen dieselben Zeitachsen wie Objekte – explizit absichern.
    const notOrdered = relationships
      .filter((r) => !(Date.parse(r.valid_time.from) < Date.parse(r.record_time.recorded_at)))
      .map((r) => r.relationship_id);
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
    expect(tenantsWithServices).toEqual([TENANT_ID.CONSULTING_OPERATOR, TENANT_ID.NORDWERK].sort());
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

      expect(
        slas.map((o) => o.object_id),
        `SLA fehlt für ${service.object_id}`,
      ).toHaveLength(1);
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
    // Harte Guardrail (case-insensitive, WP-012-Review): weder Währungszeichen noch Beträge –
    // geprüft über Objekte, Beziehungstexte UND Mandantenbeschreibungen.
    const currency =
      /(€|\bEUR\b|\bEuro\b|\bCent\b|\bUSD\b|\$|\bGBP\b|\bCHF\b|\bTagessatz\b|\bStundensatz\b)/i;
    const offenders = [
      ...objects
        .filter((o) => currency.test(`${o.display_name} ${o.description ?? ''}`))
        .map((o) => o.object_id),
      ...relationships
        .filter((r) => currency.test(`${r.status ?? ''} ${r.effectiveness_assumption ?? ''}`))
        .map((r) => r.relationship_id),
      ...tenants
        .filter((t) => currency.test(`${t.display_name} ${t.description ?? ''}`))
        .map((t) => t.tenant_id),
    ];
    expect(offenders).toEqual([]);
  });
});

describe('Demo-Seed – Entscheidungsschicht (WP-017 Slice 1)', () => {
  const objectById = new Map(objects.map((o) => [o.object_id, o] as const));
  const decisions = objects.filter((o) => o.object_type === 'Decision Record');
  const incoming = (targetId: string, type: string) =>
    relationships.filter((r) => r.relationship_type === type && r.target_id === targetId);

  it('materialisiert Entscheidungen ausschließlich im Mandanten Nordwerk', () => {
    expect(decisions.map((d) => d.object_id)).toEqual([
      NORDWERK_DECISION_OBJECT_ID.DECISION_RISIKOBEHANDLUNG_BACKUP,
      NORDWERK_DECISION_OBJECT_ID.DECISION_RISIKOBEHANDLUNG_HAERTUNG,
      NORDWERK_DECISION_OBJECT_ID.DECISION_BERICHTSRHYTHMUS,
    ]);
    expect([...new Set(decisions.map((d) => d.tenant_id))]).toEqual([TENANT_ID.NORDWERK]);
    // Gegenprobe: kein anderer Mandant trägt eine Entscheidung (O-WP017-08).
    for (const tenantId of [TENANT_ID.CONSULTING_OPERATOR, TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
      expect(decisions.filter((d) => d.tenant_id === tenantId)).toEqual([]);
    }
  });

  it('bindet jede Entscheidung über eine EINGEHENDE decided_in-Kante an ein bestehendes Objekt (R23)', () => {
    for (const decision of decisions) {
      const edges = incoming(decision.object_id, 'decided_in');
      expect(edges.length, `decided_in fehlt für ${decision.object_id}`).toBeGreaterThanOrEqual(1);
      for (const edge of edges) {
        const source = objectById.get(edge.source_id);
        // Richtung laut Dok. 07 §9 R23: „Risk/Change/Service -> Decision Record".
        expect(source?.object_type, edge.relationship_id).toBeDefined();
        expect(['Risk', 'Change', 'Managed Service']).toContain(source?.object_type);
        expect(source?.tenant_id).toBe(decision.tenant_id);
      }
    }
    // Kein Waisenobjekt: keine decided_in-Kante zeigt auf etwas anderes als eine Entscheidung.
    for (const edge of relationships.filter((r) => r.relationship_type === 'decided_in')) {
      expect(objectById.get(edge.target_id)?.object_type).toBe('Decision Record');
    }
  });

  it('trägt genau EIN supersedes-Paar in der Richtung Nachfolger → Vorgänger (R24)', () => {
    const edges = relationships.filter((r) => r.relationship_type === 'supersedes');
    expect(edges).toHaveLength(1);

    const successor = objectById.get(edges[0].source_id);
    const predecessor = objectById.get(edges[0].target_id);
    expect(successor?.object_id).toBe(
      NORDWERK_DECISION_OBJECT_ID.DECISION_RISIKOBEHANDLUNG_HAERTUNG,
    );
    expect(predecessor?.object_id).toBe(
      NORDWERK_DECISION_OBJECT_ID.DECISION_RISIKOBEHANDLUNG_BACKUP,
    );
    expect(successor?.tenant_id).toBe(predecessor?.tenant_id);

    // Der abgelöste Stand endet FACHLICH (geschlossenes Intervall), die Nachfolgerin beginnt
    // genau dort – lückenlos und überschneidungsfrei.
    expect(predecessor?.valid_time.to).toBeTruthy();
    expect(successor?.valid_time.from).toBe(predecessor?.valid_time.to);
    expect(successor?.valid_time.to ?? null).toBeNull();

    // Ablösung OHNE historische Überschreibung: keine Datensatzversion, kein Ersetzungszeitpunkt
    // (bewusste, reversible Wahl – siehe O-WP017-07).
    for (const decision of [successor, predecessor]) {
      expect(decision?.version).toBe(1);
      expect(decision?.record_time.replaced_at ?? null).toBeNull();
    }
    // Der abgelöste Stand bleibt sichtbar und trägt den generischen Zustand (O-WP017-03).
    expect(predecessor?.lifecycle_status).toBe('Überholt');
  });

  it('belegt mindestens eine Entscheidung über eine evidences-Kante vom Typ `Evidence` (R15)', () => {
    const belegte = decisions.filter((d) => incoming(d.object_id, 'evidences').length > 0);
    expect(belegte.length).toBeGreaterThanOrEqual(1);

    for (const decision of belegte) {
      for (const edge of incoming(decision.object_id, 'evidences')) {
        // Beispielspalte R15: „Evidence -> Control/Measure/Decision" – die Quelle ist ein
        // Objekt vom Typ `Evidence` (keine zweite Typpaarungs-Abweichung nach O-WP012-06).
        expect(objectById.get(edge.source_id)?.object_type).toBe('Evidence');
      }
    }
  });

  it('trägt je Entscheidung einen auflösbaren Owner UND eine eingehende owns-Kante derselben Rolle (R03)', () => {
    for (const decision of decisions) {
      expect(decision.owner_ids.length, decision.object_id).toBeGreaterThanOrEqual(1);

      const ownsSources = incoming(decision.object_id, 'owns').map((r) => r.source_id);
      for (const owner of decision.owner_ids) {
        const ownerObject = objectById.get(owner.owner_id);
        expect(ownerObject, `Owner ${owner.owner_id} existiert nicht`).toBeDefined();
        expect(ownerObject?.tenant_id).toBe(decision.tenant_id);
        expect(ownsSources, `owns-Kante fehlt für ${decision.object_id}`).toContain(owner.owner_id);
      }
    }
  });

  it('enthält keine Frist-, Aufwands-, Prioritäts-, Alternativen-, Baseline- oder Wirkungsangabe', () => {
    // WP-017 Nicht-Ziele: eine Decision Card (Dok. 10 §9.1) darf auch nicht als Klartext durch
    // die Hintertür entstehen. Geprüft werden Name, Beschreibung, Owner-Rolle und Kantentexte
    // der Entscheidungsschicht (der Währungs-Guardrail oben bleibt davon unberührt).
    const verboten =
      /(\bFrist|fällig|Deadline|\bTermin|Aufwand|Kapazität|Priorit|Alternativ|\bOption|Baseline|Wirkungsgrad|Wirkungswert|Kostenband|Budget|Outcome Check|Empfehlung|empfehl|empfohlen|\bScore\b|Ampel|Reifegrad|Schwellenwert|\bRang\b|dringend|vorrangig|Schweregrad)/i;
    const decisionIds = new Set(decisions.map((d) => d.object_id));

    const offenders = [
      ...decisions
        .filter((d) =>
          verboten.test(
            `${d.display_name} ${d.description ?? ''} ${d.owner_ids.map((o) => o.role ?? '').join(' ')}`,
          ),
        )
        .map((d) => d.object_id),
      ...relationships
        .filter((r) => decisionIds.has(r.source_id) || decisionIds.has(r.target_id))
        .filter((r) => verboten.test(`${r.status ?? ''} ${r.effectiveness_assumption ?? ''}`))
        .map((r) => r.relationship_id),
    ];
    expect(offenders).toEqual([]);

    // Negativ-Beweis: die Begriffsliste greift überhaupt (sonst wäre der Test blind).
    expect(verboten.test('Frist bis Quartalsende')).toBe(true);
  });

  it('bildet eine eigene, dritte Erfassungswelle (Systemachse) und bleibt bitemporal korrekt', () => {
    const tage = [
      ...new Set(
        [
          ...objects.map((o) => o.record_time.recorded_at),
          ...relationships.map((r) => r.record_time.recorded_at),
        ].map((iso) => iso.slice(0, 10)),
      ),
    ].sort();
    expect(tage).toEqual(['2026-01-15', '2026-02-16', '2026-03-16']);

    const decisionEdges = relationships.filter((r) =>
      decisions.some((d) => d.object_id === r.source_id || d.object_id === r.target_id),
    );
    expect(decisionEdges).toHaveLength(8);
    for (const entry of [...decisions, ...decisionEdges]) {
      expect(entry.record_time.recorded_at.slice(0, 10)).toBe('2026-03-16');
      expect(Date.parse(entry.valid_time.from)).toBeLessThan(
        Date.parse(entry.record_time.recorded_at),
      );
    }
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
