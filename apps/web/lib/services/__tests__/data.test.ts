/**
 * Unit-Tests der React-freien Service-View-Helfer (WP-012 Slice 2).
 *
 * Prüft gegen den echten `DEMO_SEED` (keine Mocks):
 *  - Service-Auflösung je Mandant (Nordwerk 3, Consulting Operator 2, Finovia/MediCore 0),
 *  - SLA-/Deliverable-/Review-Zuordnung über die tatsächlichen `part_of`-Kanten,
 *  - `covered_by`/`requires`/`contributes_to`/`delivered_by` mit aufgelösten display_name,
 *  - qualitativen Vertrauensgrad der Wirkungsbeiträge (Dok. 06 P04),
 *  - Portfolio-Aggregation je Mandant (reine Aggregation, O-WP012-03) und abgeleitete
 *    Service-Mandanten (nichts hartkodiert).
 */
import { describe, expect, it } from 'vitest';

import {
  DEMO_SEED,
  NORDWERK_SERVICE_OBJECT_ID,
  OPERATOR_OBJECT_ID,
  TENANT_ID,
} from '@isms/demo-seed';
import {
  buildPortfolioOverview,
  getManagedServicesForTenant,
  getServiceTenants,
  type ManagedServiceView,
} from '../data';

const S = NORDWERK_SERVICE_OBJECT_ID;
const P = OPERATOR_OBJECT_ID;

function serviceOrThrow(views: ManagedServiceView[], objectId: string): ManagedServiceView {
  const view = views.find((v) => v.service.object_id === objectId);
  if (!view) throw new Error(`Testfixture fehlt: ${objectId}`);
  return view;
}

describe('getManagedServicesForTenant – Auflösung je Mandant', () => {
  it('liefert 3 Services für Nordwerk, 2 für den Consulting Operator, 0 für Finovia/MediCore', () => {
    expect(getManagedServicesForTenant(TENANT_ID.NORDWERK)).toHaveLength(3);
    expect(getManagedServicesForTenant(TENANT_ID.CONSULTING_OPERATOR)).toHaveLength(2);
    expect(getManagedServicesForTenant(TENANT_ID.FINOVIA)).toHaveLength(0);
    expect(getManagedServicesForTenant(TENANT_ID.MEDICORE)).toHaveLength(0);
  });

  it('ordnet SLA, Deliverables und Outcome Review dem Monitoring-Service über part_of zu', () => {
    const views = getManagedServicesForTenant(TENANT_ID.NORDWERK);
    const monitoring = serviceOrThrow(views, S.SERVICE_RISK_CONTROL_MONITORING);

    expect(monitoring.service.display_name).toBe('Kontinuierliches Risiko- & Control-Monitoring');
    expect(monitoring.slas.map((s) => s.name)).toEqual([
      'SLA – Risiko- & Control-Monitoring (Band „Standard")',
    ]);
    expect(monitoring.deliverables.map((d) => d.name).sort()).toEqual(
      [
        'Control-Assurance-Paket Q2/2026 (synthetisch)',
        'Risiko- & Control-Review 2026-06 (synthetisch)',
      ].sort(),
    );
    expect(monitoring.reviews.map((r) => r.name)).toEqual([
      'Outcome Review Q2/2026 – Risiko- & Control-Monitoring',
    ]);
    // Delivery-Verantwortung (R21 delivered_by -> tenant-eigenes Team, O-WP012-04).
    expect(monitoring.delivery_team_names).toEqual([
      'Managed-Service-Delivery-Team (Betreuung Nordwerk)',
    ]);
  });

  it('trägt den Deliverable-Status mit (Entwurf sichtbar, Zustandstreue statt geschönter Demo)', () => {
    const views = getManagedServicesForTenant(TENANT_ID.NORDWERK);
    const reporting = serviceOrThrow(views, S.SERVICE_MANAGEMENT_REPORTING);

    expect(reporting.service.lifecycle_status).toBe('Review');
    expect(reporting.deliverables).toEqual([
      expect.objectContaining({
        name: 'Management-Report Q2/2026 (Entwurf, synthetisch)',
        lifecycle_status: 'Entwurf',
      }),
    ]);
  });

  it('löst covered_by (Serviceumfang) und requires (Voraussetzungen) mit Kantenstatus auf', () => {
    const views = getManagedServicesForTenant(TENANT_ID.NORDWERK);
    const monitoring = serviceOrThrow(views, S.SERVICE_RISK_CONTROL_MONITORING);

    expect(monitoring.covered.map((c) => c.name).sort()).toEqual(
      [
        'Backup & Recovery Control',
        'Backup-Job Werk Nord (ERP)',
        'Betriebsunterbrechung Auftragsabwicklung',
      ].sort(),
    );
    expect(monitoring.covered.every((c) => c.edge_status === 'im Serviceumfang')).toBe(true);

    expect(monitoring.required).toEqual([
      expect.objectContaining({
        name: 'Backup & Recovery Control',
        object_type: 'Control',
        edge_status: 'Voraussetzung erfüllt',
      }),
    ]);
  });

  it('löst contributes_to mit qualitativem Vertrauensgrad und Wirkannahme auf', () => {
    const views = getManagedServicesForTenant(TENANT_ID.NORDWERK);
    const evidence = serviceOrThrow(views, S.SERVICE_EVIDENCE_OPERATIONS);

    expect(evidence.contributions.map((c) => c.target_name).sort()).toEqual(
      [
        'Auditfähigkeit ISO/IEC 27001 (Demo-Zielbild 2026)',
        'Nachweisquote priorisierter Controls',
      ].sort(),
    );

    const objective = evidence.contributions.find((c) => c.target_type === 'Objective');
    expect(objective?.confidence_display).toBe('mittel (0,75)');
    expect(objective?.effectiveness_assumption).toMatch(/synthetische Annahme/);

    const kpi = evidence.contributions.find((c) => c.target_type === 'KPI');
    expect(kpi?.confidence_display).toBe('hoch (0,8)');
  });

  it('löst die Operator-Services mit eigenem SLA, Deliverable und Delivery-Team auf', () => {
    const views = getManagedServicesForTenant(TENANT_ID.CONSULTING_OPERATOR);
    const audit = serviceOrThrow(views, P.SERVICE_AUDIT_READINESS);

    expect(audit.service.lifecycle_status).toBe('aktiv');
    expect(audit.slas.map((s) => s.name)).toEqual([
      'SLA – Audit-Readiness-Betrieb (Band „Priority")',
    ]);
    expect(audit.deliverables.map((d) => d.name)).toEqual([
      'Audit-Readiness-Paket 2026-06 (synthetisch)',
    ]);
    expect(audit.delivery_team_names).toEqual(['Delivery-Team Managed ISMS']);

    const policy = serviceOrThrow(views, P.SERVICE_POLICY_LIFECYCLE);
    expect(policy.service.lifecycle_status).toBe('konfiguriert');
  });

  it('löst alle Endpunkte auf display_name auf (keine rohen IDs sichtbar)', () => {
    for (const tenantId of [TENANT_ID.NORDWERK, TENANT_ID.CONSULTING_OPERATOR]) {
      for (const view of getManagedServicesForTenant(tenantId)) {
        const names = [
          ...view.slas.map((i) => i.name),
          ...view.deliverables.map((i) => i.name),
          ...view.reviews.map((i) => i.name),
          ...view.covered.map((i) => i.name),
          ...view.required.map((i) => i.name),
          ...view.contributions.map((i) => i.target_name),
          ...view.delivery_team_names,
        ];
        expect(names.length).toBeGreaterThan(0);
        for (const name of names) {
          // Seed-IDs beginnen mit dem Mandanten-Präfix; display_name nie.
          expect(name).not.toMatch(/^(nordwerk|operator)-/);
        }
      }
    }
  });
});

describe('buildPortfolioOverview – Aggregation je Mandant (O-WP012-03)', () => {
  it('aggregiert alle vier Mandanten in Seed-Reihenfolge mit korrekten Zählern (3/0/0/2)', () => {
    const entries = buildPortfolioOverview();

    expect(entries.map((e) => e.tenant.tenant_id)).toEqual(
      DEMO_SEED.tenants.map((t) => t.tenant_id),
    );
    expect(entries.map((e) => e.service_count)).toEqual([3, 0, 0, 2]);
    // Zähler und Liste sind konsistent (nur Objekte des jeweiligen Mandanten).
    for (const entry of entries) {
      expect(entry.services).toHaveLength(entry.service_count);
    }

    const nordwerk = entries[0]!;
    expect(nordwerk.services.map((s) => s.name)).toContain(
      'Kontinuierliches Risiko- & Control-Monitoring',
    );
    // Status je Service verfügbar (Textdarstellung in der UI, nie nur Farbe).
    expect(nordwerk.services.every((s) => s.lifecycle_status.length > 0)).toBe(true);
  });

  it('getServiceTenants leitet die Mandanten mit Services aus dem Seed ab (nicht hartkodiert)', () => {
    expect(getServiceTenants().map((t) => t.tenant_id)).toEqual([
      TENANT_ID.NORDWERK,
      TENANT_ID.CONSULTING_OPERATOR,
    ]);
  });
});
