/**
 * Unit-Tests der Objekt-360-View-Helfer (WP-014 Slice 1).
 *
 * Prüft gegen den echten Contract/Seed (keine Mocks, nur belegte Daten):
 *  1. Tenant-Isolation inkl. NEGATIV-BEWEIS (gültige Objekt-ID unter fremdem Mandanten).
 *  2. Identität, Owner-/Scope-Auflösung (inkl. sichtbarer roher ID als Fail-loud).
 *  3. Trennung eingehender und ausgehender Kanten, Labels/R-IDs, Vertrauensgrad.
 *  4. Historien-Ableitung aus den Daten (Wächtertest gegen erfundene Historie).
 *  5. Beobachtungen in „Was als Nächstes?" – ausschließlich belegte Verweise.
 */
import { describe, expect, it } from 'vitest';

import {
  DEMO_SEED,
  NORDWERK_OBJECT_ID,
  NORDWERK_SERVICE_OBJECT_ID,
  OPERATOR_OBJECT_ID,
  TENANT_ID,
} from '@isms/demo-seed';
import {
  buildObjectDetail,
  formatIsoDateDe,
  getObjectForTenant,
  getObjectRouteParams,
  objectDetailHref,
  type ObjectDetailModel,
} from '../object-detail';

const O = NORDWERK_OBJECT_ID;

function detailOrThrow(tenantId: string, objectId: string): ObjectDetailModel {
  const model = buildObjectDetail(tenantId, objectId);
  if (!model) throw new Error(`Testfixture fehlt: ${tenantId}/${objectId}`);
  return model;
}

describe('buildObjectDetail – Tenant-Isolation (Sicherheitsgrenze)', () => {
  it('liefert für eine gültige Objekt-ID unter einem FREMDEN Mandanten `undefined` (Negativ-Beweis)', () => {
    // Positiv-Kontrolle: im eigenen Mandanten existiert das Objekt.
    expect(buildObjectDetail(TENANT_ID.NORDWERK, O.RISK_BETRIEBSUNTERBRECHUNG)).toBeDefined();

    // Dieselbe, real existierende ID unter einem anderen Mandanten ist NICHT auffindbar.
    expect(
      buildObjectDetail(TENANT_ID.CONSULTING_OPERATOR, O.RISK_BETRIEBSUNTERBRECHUNG),
    ).toBeUndefined();
    expect(buildObjectDetail(TENANT_ID.FINOVIA, O.RISK_BETRIEBSUNTERBRECHUNG)).toBeUndefined();

    // Und in die Gegenrichtung ebenso.
    expect(
      buildObjectDetail(TENANT_ID.CONSULTING_OPERATOR, OPERATOR_OBJECT_ID.SERVICE_AUDIT_READINESS),
    ).toBeDefined();
    expect(
      buildObjectDetail(TENANT_ID.NORDWERK, OPERATOR_OBJECT_ID.SERVICE_AUDIT_READINESS),
    ).toBeUndefined();
  });

  it('antwortet auf unbekannte IDs identisch wie auf mandantenfremde (kein Sonderfall)', () => {
    const fremd = buildObjectDetail(TENANT_ID.FINOVIA, O.PROC_AUFTRAGSABWICKLUNG);
    const unbekannt = buildObjectDetail(TENANT_ID.FINOVIA, 'gibt-es-nicht');
    const unbekannterMandant = buildObjectDetail('tenant-gibt-es-nicht', O.PROC_AUFTRAGSABWICKLUNG);

    expect(fremd).toBeUndefined();
    expect(unbekannt).toBeUndefined();
    expect(unbekannterMandant).toBeUndefined();
  });

  it('löst Kanten nur innerhalb des eigenen Mandanten auf', () => {
    const model = detailOrThrow(TENANT_ID.NORDWERK, O.CTRL_BACKUP);
    const nordwerkIds = new Set(
      DEMO_SEED.objects.filter((o) => o.tenant_id === TENANT_ID.NORDWERK).map((o) => o.object_id),
    );

    const edges = [...model.connections.incoming, ...model.connections.outgoing];
    expect(edges.length).toBeGreaterThanOrEqual(1);
    for (const edge of edges) {
      expect(edge.neighbor_resolved).toBe(true);
      expect(nordwerkIds.has(edge.neighbor_id)).toBe(true);
    }
  });

  it('`getObjectForTenant` respektiert die Mandantengrenze', () => {
    expect(getObjectForTenant(TENANT_ID.NORDWERK, O.CTRL_BACKUP)?.display_name).toBe(
      'Backup & Recovery Control',
    );
    expect(getObjectForTenant(TENANT_ID.CONSULTING_OPERATOR, O.CTRL_BACKUP)).toBeUndefined();
  });
});

describe('getObjectRouteParams', () => {
  it('erzeugt genau ein Paar je Seed-Objekt und jedes Paar ist auflösbar', () => {
    const params = getObjectRouteParams();
    expect(params).toHaveLength(DEMO_SEED.objects.length);

    for (const { tenantId, objectId } of params) {
      const model = buildObjectDetail(tenantId, objectId);
      expect(model).toBeDefined();
      expect(model?.object.tenant_id).toBe(tenantId);
    }
  });
});

describe('Was ist das? – Identität, Scope, Owner', () => {
  const model = detailOrThrow(TENANT_ID.NORDWERK, O.PROC_AUFTRAGSABWICKLUNG);

  it('zeigt Typ, kanonische Objektfamilie, Lebenszyklus und Klassifikation aus dem Envelope', () => {
    expect(model.identity.object_type).toBe('Geschäftsprozess');
    expect(model.identity.family_id).toBe('F03');
    expect(model.identity.family_name).toBe('Geschäft & Information');
    expect(model.identity.lifecycle_status).toBe('Freigegeben');
    expect(model.identity.has_classification).toBe(true);
    expect(model.identity.protection_need).toBe('hoch');
    expect(model.identity.object_id).toBe(O.PROC_AUFTRAGSABWICKLUNG);
  });

  it('löst owner_ids gegen Seed-Objekte DESSELBEN Mandanten auf', () => {
    const owner = model.identity.owners[0];
    expect(owner.resolved).toBe(true);
    expect(owner.name).toBe('Prozessverantwortung Auftragsabwicklung');
    expect(owner.owner_kind).toBe('fachlich');
    expect(owner.role).toBe('Prozessverantwortung');
  });

  it('lässt eine nicht auflösbare scope_id sichtbar als rohe ID stehen (Fail-loud)', () => {
    // Der Demo-Seed materialisiert Scopes nicht als eigene Objekte (OFFENE FRAGE O-WP014-03).
    const scope = model.identity.scopes[0];
    expect(scope.resolved).toBe(false);
    expect(scope.scope_id).toBe('scope-nordwerk-isms-core');
    expect(scope.name).toBe(scope.scope_id);
    expect(scope.valid_from).toBeDefined();
  });

  it('meldet ein Objekt ohne Klassifikation ehrlich als unbelegt', () => {
    const measure = detailOrThrow(TENANT_ID.NORDWERK, O.MEASURE_PATCH);
    expect(measure.identity.has_classification).toBe(false);
    expect(measure.identity.protection_need).toBeUndefined();
    expect(measure.identity.confidentiality).toBeUndefined();
  });
});

describe('Womit hängt es zusammen? – Trennung eingehend/ausgehend', () => {
  const asset = detailOrThrow(TENANT_ID.NORDWERK, O.ASSET_KUNDENAUFTRAGSDATEN);

  it('trennt Kanten strikt nach source_id (ausgehend) und target_id (eingehend)', () => {
    for (const edge of asset.connections.outgoing) {
      expect(edge.orientation).toBe('ausgehend');
    }
    for (const edge of asset.connections.incoming) {
      expect(edge.orientation).toBe('eingehend');
    }

    // Das Informationsobjekt ist im Seed ausschließlich Ziel (processes/exposes/threatens/affects).
    expect(asset.connections.outgoing).toEqual([]);
    expect(asset.connections.incoming.map((e) => e.relationship_type).sort()).toEqual([
      'affects',
      'exposes',
      'processes',
      'threatens',
    ]);
  });

  it('liefert deutsches Label, kanonische R-ID, Nachbar-ID und fachliche Gültigkeit je Kante', () => {
    const processes = asset.connections.incoming.find((e) => e.relationship_type === 'processes');
    expect(processes).toBeDefined();
    expect(processes?.relationship_type_id).toBe('R07');
    expect(processes?.relationship_type_label).toBe('verarbeitet');
    expect(processes?.neighbor_id).toBe(O.PROC_AUFTRAGSABWICKLUNG);
    expect(processes?.neighbor_name).toBe('Auftragsabwicklung');
    expect(processes?.neighbor_type).toBe('Geschäftsprozess');
    expect(processes?.direction).toBe('gerichtet');
    expect(processes?.assertion_kind).toBe('assertiert');
    expect(processes?.valid_from).toBe('2026-01-01T00:00:00.000Z');
    expect(processes?.valid_to).toBeNull();
  });

  it('zeigt den Vertrauensgrad qualitativ + Wert (keine nackte Zahl)', () => {
    const exposes = asset.connections.incoming.find((e) => e.relationship_type === 'exposes');
    expect(exposes?.confidence_display).toBe('mittel (0,7)');

    // Kanten ohne Vertrauensgrad erfinden keinen.
    const processes = asset.connections.incoming.find((e) => e.relationship_type === 'processes');
    expect(processes?.confidence_display).toBeUndefined();
  });

  it('reicht Kantenstatus und Wirkungsannahme unverändert durch', () => {
    const control = detailOrThrow(TENANT_ID.NORDWERK, O.CTRL_BACKUP);
    const evidence = control.connections.incoming.find((e) => e.relationship_type === 'evidences');
    expect(evidence?.edge_status).toBe('geprüft');

    const mitigates = control.connections.outgoing.find((e) => e.relationship_type === 'mitigates');
    expect(mitigates?.effectiveness_assumption).toContain('Wiederherstellung');
  });
});

describe('Warum ist es wichtig? – nur belegte Bezüge zu Risiken und Zielen', () => {
  it('filtert auf die kanonischen Bezugskanten, ohne zu gewichten', () => {
    const asset = detailOrThrow(TENANT_ID.NORDWERK, O.ASSET_KUNDENAUFTRAGSDATEN);
    const types = asset.importance.edges.map((e) => e.relationship_type).sort();

    // processes (R07) ist KEIN Risiko-/Zielbezug und darf hier nicht erscheinen.
    expect(types).toEqual(['affects', 'exposes', 'threatens']);
    expect(asset.importance.protection_need).toBe('hoch');
  });

  it('bleibt leer, wenn im Seed kein Risiko-/Zielbezug belegt ist', () => {
    const org = detailOrThrow(TENANT_ID.NORDWERK, O.ORG);
    expect(org.importance.edges).toEqual([]);
  });
});

describe('Wie entwickelt es sich? – Historie wird abgeleitet, nicht erfunden', () => {
  it('trennt fachliche Gültigkeit und Systemerfassung als eigene Achsen', () => {
    const model = detailOrThrow(TENANT_ID.NORDWERK, O.PROC_AUFTRAGSABWICKLUNG);
    expect(model.evolution.valid_from).toBe('2026-01-01T00:00:00.000Z');
    expect(model.evolution.recorded_at).toBe('2026-01-15T08:00:00.000Z');
    expect(model.evolution.valid_from).not.toBe(model.evolution.recorded_at);
    expect(model.evolution.valid_to).toBeNull();
    expect(model.evolution.replaced_at).toBeUndefined();
  });

  it('liest die Bestätigungsstufe, ohne einen Vertrauensindikator zu berechnen', () => {
    const threat = detailOrThrow(TENANT_ID.NORDWERK, O.THREAT_RANSOMWARE);
    expect(threat.evolution.confirmation_level).toBe('maschinell plausibilisiert');
    expect(threat.evolution.quality_dimensions.map((d) => d.dimension)).toContain('Aktualität');
    expect(threat.object.quality_state.confidence_indicator).toBeUndefined();
  });

  it('leitet „keine Historie" aus Version, replaced_at und supersedes-Kanten ab (Wächtertest)', () => {
    // Der Seed trägt ausschließlich version 1, kein replaced_at und keine supersedes-Kante.
    // Sobald sich das ändert, muss dieser Test fehlschlagen – die Aussage der Seite ist
    // abgeleitet, nicht konstant.
    expect(DEMO_SEED.objects.every((o) => o.version === 1)).toBe(true);
    expect(DEMO_SEED.objects.every((o) => !o.record_time.replaced_at)).toBe(true);
    expect(DEMO_SEED.relationships.some((r) => r.relationship_type === 'supersedes')).toBe(false);

    for (const { tenantId, objectId } of getObjectRouteParams()) {
      const { history } = detailOrThrow(tenantId, objectId).evolution;
      expect(history.has_previous_version).toBe(false);
      expect(history.has_replacement_record).toBe(false);
      expect(history.supersedes).toEqual([]);
      expect(history.superseded_by).toEqual([]);
      expect(history.has_history).toBe(false);
      expect(history.version).toBe(1);
    }
  });
});

describe('Was als Nächstes? – ausschließlich belegte Beobachtungen', () => {
  it('nennt die über remediates verknüpfte Maßnahme mit ihrem Status', () => {
    const weakness = detailOrThrow(TENANT_ID.NORDWERK, O.WEAK_ERP_SCHNITTSTELLE);
    const massnahme = weakness.next_observations.find((o) => o.kind === 'massnahme');

    expect(massnahme?.name).toBe('Härtung & Patch-Management ERP-Schnittstelle');
    expect(massnahme?.lifecycle_status).toBe('in Arbeit');
    expect(massnahme?.relationship_type).toBe('remediates');
    expect(massnahme?.object_id).toBe(O.MEASURE_PATCH);
  });

  it('nennt den über covered_by zuständigen Managed Service und den Nachweis', () => {
    const control = detailOrThrow(TENANT_ID.NORDWERK, O.CTRL_BACKUP);

    const service = control.next_observations.find((o) => o.kind === 'service');
    expect(service?.object_id).toBe(NORDWERK_SERVICE_OBJECT_ID.SERVICE_RISK_CONTROL_MONITORING);
    expect(service?.relationship_type).toBe('covered_by');
    expect(service?.lifecycle_status).toBe('aktiv');

    const nachweis = control.next_observations.find((o) => o.kind === 'nachweis');
    expect(nachweis?.object_id).toBe(O.EVIDENCE_RESTORE_TEST);
    expect(nachweis?.relationship_type).toBe('evidences');

    // Kein „ohne_nachweis", solange ein Nachweis belegt ist.
    expect(control.next_observations.some((o) => o.kind === 'ohne_nachweis')).toBe(false);
  });

  it('benennt einen fehlenden Nachweisbezug als Beobachtung statt ihn zu verschweigen', () => {
    const org = detailOrThrow(TENANT_ID.NORDWERK, O.ORG);
    expect(org.next_observations.map((o) => o.kind)).toEqual(['ohne_nachweis']);
  });
});

describe('formatIsoDateDe', () => {
  it('formatiert deterministisch in UTC als TT.MM.JJJJ', () => {
    expect(formatIsoDateDe('2026-01-15T08:00:00.000Z')).toBe('15.01.2026');
    expect(formatIsoDateDe('2026-02-01T00:00:00.000Z')).toBe('01.02.2026');
  });

  it('reicht einen unlesbaren Wert fail-loud roh durch', () => {
    expect(formatIsoDateDe('kein-datum')).toBe('kein-datum');
  });
});

describe('objectDetailHref (WP-014 Slice 2)', () => {
  it('bildet die Route mit dem Mandanten des Objekts', () => {
    expect(objectDetailHref(TENANT_ID.NORDWERK, O.PROC_AUFTRAGSABWICKLUNG)).toBe(
      `/twin/${TENANT_ID.NORDWERK}/objekt/${O.PROC_AUFTRAGSABWICKLUNG}`,
    );
  });

  it('erzeugt für JEDES Seed-Objekt eine Route, die auf eine existierende Seite zeigt', () => {
    // Gegenprobe zu `generateStaticParams`: jeder gebildete Link ist auch auflösbar.
    for (const { tenantId, objectId } of getObjectRouteParams()) {
      expect(objectDetailHref(tenantId, objectId)).toBe(`/twin/${tenantId}/objekt/${objectId}`);
      expect(buildObjectDetail(tenantId, objectId)).toBeDefined();
    }
  });
});
