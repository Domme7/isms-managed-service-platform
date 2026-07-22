/**
 * Unit-Tests der React-freien ISMS-View-Helfer (WP-013 Slice 1).
 *
 * Prüft gegen den echten `DEMO_SEED` (keine Mocks):
 *  - Nordwerk: >=1 Risiko/Control/Maßnahme/Evidence korrekt aufgelöst, inkl. Herkunft
 *    (threatens/exposes), Requirement+Framework (satisfies/part_of) und Evidence-Zuordnung
 *    (evidences mit Kantenstatus),
 *  - getrennte Stände: Control „wirksam" vs. Implementation „implementiert" (08-D07),
 *  - Tenant-Isolation inkl. Negativ-Beweis: Finovia/MediCore UND Consulting Operator liefern
 *    eine leere ISMS-Sicht, obwohl der Operator Managed Services trägt (WP-013 Acceptance 5/6),
 *  - Auflösungs-Beweis: keine rohen Seed-IDs als Anzeigenamen.
 */
import { describe, expect, it } from 'vitest';

import { DEMO_SEED, NORDWERK_OBJECT_ID, TENANT_ID } from '@isms/demo-seed';
import {
  buildIsmsCoreView,
  getIsmsCoreTenants,
  hasManagedServices,
  type IsmsCoreView,
} from '../data';

const O = NORDWERK_OBJECT_ID;

function nordwerkView(): IsmsCoreView {
  return buildIsmsCoreView(TENANT_ID.NORDWERK);
}

describe('buildIsmsCoreView – Nordwerk (ISMS-Kerngraph vollständig aufgelöst)', () => {
  it('liefert je Objektklasse mindestens einen Eintrag (Risiko, Szenario, Schwachstelle, Control, Maßnahme, Evidence)', () => {
    const view = nordwerkView();
    expect(view.isEmpty).toBe(false);
    expect(view.risks.length).toBeGreaterThanOrEqual(1);
    expect(view.scenarios.length).toBeGreaterThanOrEqual(1);
    expect(view.weaknesses.length).toBeGreaterThanOrEqual(1);
    expect(view.controls.length).toBeGreaterThanOrEqual(1);
    expect(view.measures.length).toBeGreaterThanOrEqual(1);
    expect(view.evidence.length).toBeGreaterThanOrEqual(1);
  });

  it('löst das Risiko mit Wirkung (affects) und Minderung (mitigates) auf', () => {
    const risk = nordwerkView().risks.find((r) => r.risk.object_id === O.RISK_BETRIEBSUNTERBRECHUNG);
    expect(risk?.risk.name).toBe('Betriebsunterbrechung Auftragsabwicklung');
    expect(risk?.risk.lifecycle_status).toBe('behandelt');

    // R10 affects: Risiko -> Geschäftsprozess / Information Asset / Objective (reale Seed-Kanten).
    const affected = risk!.affects.map((a) => a.name);
    expect(affected).toContain('Auftragsabwicklung');
    expect(affected).toContain('Kundenauftragsdaten');

    // R12 mitigates: Control -> Risiko, mit Wirkannahme und qualitativem Vertrauensgrad.
    expect(risk!.mitigated_by).toEqual([
      expect.objectContaining({
        name: 'Backup & Recovery Control',
        object_type: 'Control',
        confidence_display: 'hoch (0,8)',
      }),
    ]);
    expect(risk!.mitigated_by[0]!.effectiveness_assumption).toMatch(/synthetische Annahme/);

    // Optionaler Service-Hinweis (R22 covered_by) – reine Anzeige, keine Acceptance-Pflicht.
    expect(risk!.covered_by_services).toContain('Kontinuierliches Risiko- & Control-Monitoring');
  });

  it('löst die Szenario-Herkunft (threatens) inkl. weiterer Bedrohungsziele auf', () => {
    const scenario = nordwerkView().scenarios.find(
      (s) => s.scenario.object_id === O.SCENARIO_VERSCHLUESSELUNG,
    );
    expect(scenario?.scenario.name).toBe('Verschlüsselung der Auftragsdaten durch Ransomware');
    expect(scenario?.scenario.lifecycle_status).toBe('bewertet');

    // R09 threatens: Threat -> Risk Scenario; derselbe Threat bedroht zusätzlich das Asset.
    expect(scenario!.threatened_by).toEqual([
      expect.objectContaining({
        name: 'Ransomware-Angriff auf Produktionsnetz',
        object_type: 'Threat',
        lifecycle_status: 'Beobachtet',
        also_threatens: ['Kundenauftragsdaten'],
      }),
    ]);

    // R12 mitigates: Maßnahme -> Szenario.
    expect(scenario!.mitigated_by.map((m) => m.name)).toEqual([
      'Härtung & Patch-Management ERP-Schnittstelle',
    ]);
  });

  it('löst die Schwachstelle mit Exposition (exposes) und Behebung (remediates) auf', () => {
    const weakness = nordwerkView().weaknesses.find(
      (w) => w.weakness.object_id === O.WEAK_ERP_SCHNITTSTELLE,
    );
    expect(weakness?.weakness.name).toBe('Ungepatchte ERP-Integrationsschnittstelle');

    // R08 exposes: Weakness -> Information Asset (mit qualitativem Vertrauensgrad der Kante).
    expect(weakness!.exposes).toEqual([
      expect.objectContaining({
        name: 'Kundenauftragsdaten',
        object_type: 'Information Asset',
        confidence_display: 'mittel (0,7)',
      }),
    ]);

    // R18 remediates: Measure -> Weakness.
    expect(weakness!.remediated_by.map((m) => m.name)).toEqual([
      'Härtung & Patch-Management ERP-Schnittstelle',
    ]);
  });

  it('löst das Control mit Implementation, Requirement inkl. Framework und Evidence-Stand auf', () => {
    const control = nordwerkView().controls.find((c) => c.control.object_id === O.CTRL_BACKUP);
    expect(control?.control.name).toBe('Backup & Recovery Control');

    // R13 implements: Control Implementation -> Control.
    expect(control!.implementations).toEqual([
      expect.objectContaining({
        name: 'Backup-Job Werk Nord (ERP)',
        object_type: 'Control Implementation',
      }),
    ]);

    // R14 satisfies + R01 part_of: Requirement inkl. Framework-Zuordnung.
    expect(control!.satisfies).toEqual([
      expect.objectContaining({
        name: 'A.8.13 – Informationssicherung (Backup)',
        object_type: 'Requirement',
        framework_name: 'ISO/IEC 27001:2022 (Demo-Katalog)',
      }),
    ]);

    // R15 evidences: beide realen Nachweis-Kanten (Evidence UND Deliverable) mit Kantenstatus.
    expect(control!.evidenced_by.map((e) => e.name).sort()).toEqual(
      [
        'Restore-Test-Protokoll Q2/2026',
        'Audit-Readiness-Evidence-Pack Q2/2026 (synthetisch)',
      ].sort(),
    );
    expect(control!.evidenced_by.every((e) => e.edge_status === 'geprüft')).toBe(true);

    // R12 mitigates: Control -> Risiko (Risikobezug des Controls).
    expect(control!.mitigates.map((m) => m.name)).toEqual([
      'Betriebsunterbrechung Auftragsabwicklung',
    ]);
  });

  it('hält Control-Status und Implementierungsstatus strikt getrennt (08-D07: implementiert ≠ wirksam)', () => {
    const control = nordwerkView().controls.find((c) => c.control.object_id === O.CTRL_BACKUP)!;
    // Beide Stände stammen wörtlich aus dem Seed und bleiben getrennte Felder.
    expect(control.control.lifecycle_status).toBe('wirksam');
    expect(control.implementations[0]!.lifecycle_status).toBe('implementiert');
    expect(control.control.lifecycle_status).not.toBe(control.implementations[0]!.lifecycle_status);
  });

  it('löst die Maßnahme mit Status und Bezug (remediates/mitigates) auf', () => {
    const measure = nordwerkView().measures.find((m) => m.measure.object_id === O.MEASURE_PATCH);
    expect(measure?.measure.name).toBe('Härtung & Patch-Management ERP-Schnittstelle');
    expect(measure?.measure.lifecycle_status).toBe('in Arbeit');
    expect(measure!.remediates.map((r) => r.name)).toEqual([
      'Ungepatchte ERP-Integrationsschnittstelle',
    ]);
    expect(measure!.mitigates.map((m) => m.name)).toEqual([
      'Verschlüsselung der Auftragsdaten durch Ransomware',
    ]);
  });

  it('löst den Nachweis mit Status und belegtem Objekt auf', () => {
    const evidence = nordwerkView().evidence.find(
      (e) => e.evidence.object_id === O.EVIDENCE_RESTORE_TEST,
    );
    expect(evidence?.evidence.name).toBe('Restore-Test-Protokoll Q2/2026');
    expect(evidence?.evidence.lifecycle_status).toBe('akzeptiert');
    expect(evidence!.evidences).toEqual([
      expect.objectContaining({
        name: 'Backup & Recovery Control',
        object_type: 'Control',
        edge_status: 'geprüft',
      }),
    ]);
    expect(evidence!.covered_by_services).toContain('Nachweis- & Evidence-Betrieb');
  });

  it('löst alle Endpunkte auf display_name auf (keine rohen Seed-IDs sichtbar)', () => {
    const view = nordwerkView();
    const names = [
      ...view.risks.flatMap((r) => [
        r.risk.name,
        ...r.affects.map((a) => a.name),
        ...r.mitigated_by.map((m) => m.name),
        ...r.covered_by_services,
      ]),
      ...view.scenarios.flatMap((s) => [
        s.scenario.name,
        ...s.threatened_by.flatMap((t) => [t.name, ...t.also_threatens]),
        ...s.mitigated_by.map((m) => m.name),
      ]),
      ...view.weaknesses.flatMap((w) => [
        w.weakness.name,
        ...w.exposes.map((e) => e.name),
        ...w.remediated_by.map((m) => m.name),
      ]),
      ...view.controls.flatMap((c) => [
        c.control.name,
        ...c.implementations.map((i) => i.name),
        ...c.satisfies.flatMap((s) => [s.name, s.framework_name ?? '']),
        ...c.evidenced_by.map((e) => e.name),
        ...c.mitigates.map((m) => m.name),
        ...c.covered_by_services,
      ]),
      ...view.measures.flatMap((m) => [
        m.measure.name,
        ...m.remediates.map((r) => r.name),
        ...m.mitigates.map((x) => x.name),
      ]),
      ...view.evidence.flatMap((e) => [
        e.evidence.name,
        ...e.evidences.map((x) => x.name),
        ...e.covered_by_services,
      ]),
    ].filter((n) => n.length > 0);

    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      // Seed-IDs beginnen mit dem Mandanten-Präfix; display_name nie.
      expect(name).not.toMatch(/^(nordwerk|operator)-/);
    }
  });
});

describe('buildIsmsCoreView – Tenant-Isolation und Empty-Sicht (Acceptance 5/6)', () => {
  it('liefert für Finovia und MediCore eine vollständig leere ISMS-Sicht', () => {
    for (const tenantId of [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
      const view = buildIsmsCoreView(tenantId);
      expect(view.isEmpty).toBe(true);
      expect(view.risks).toHaveLength(0);
      expect(view.controls).toHaveLength(0);
      expect(view.measures).toHaveLength(0);
      expect(view.evidence).toHaveLength(0);
    }
  });

  it('liefert für den Consulting Operator eine leere ISMS-Sicht, obwohl er Services trägt (Negativ-Beweis)', () => {
    const view = buildIsmsCoreView(TENANT_ID.CONSULTING_OPERATOR);
    // Der Operator besitzt eigene Objekte (Services etc.) …
    expect(hasManagedServices(TENANT_ID.CONSULTING_OPERATOR)).toBe(true);
    // … aber KEIN einziges Nordwerk-Risiko/-Control/-Nachweis erscheint in seiner Sicht:
    // die globale Seed enthält diese Objekte, die Auflösung endet an der Mandantengrenze.
    expect(view.isEmpty).toBe(true);
    expect(view.risks).toHaveLength(0);
    expect(view.scenarios).toHaveLength(0);
    expect(view.weaknesses).toHaveLength(0);
    expect(view.controls).toHaveLength(0);
    expect(view.measures).toHaveLength(0);
    expect(view.evidence).toHaveLength(0);
  });

  it('kein Objekt eines fremden Mandanten erscheint in der Nordwerk-Sicht (Kanten strikt tenant-lokal)', () => {
    const view = nordwerkView();
    const operatorNames = new Set(
      DEMO_SEED.objects
        .filter((o) => o.tenant_id === TENANT_ID.CONSULTING_OPERATOR)
        .map((o) => o.display_name),
    );
    const allNordwerkNames = [
      ...view.controls.flatMap((c) => [...c.evidenced_by.map((e) => e.name), ...c.covered_by_services]),
      ...view.risks.flatMap((r) => r.covered_by_services),
      ...view.evidence.flatMap((e) => e.covered_by_services),
    ];
    for (const name of allNordwerkNames) {
      expect(operatorNames.has(name)).toBe(false);
    }
  });

  it('getIsmsCoreTenants leitet die Mandanten mit ISMS-Kernobjekten aus dem Seed ab (nicht hartkodiert)', () => {
    expect(getIsmsCoreTenants().map((t) => t.tenant_id)).toEqual([TENANT_ID.NORDWERK]);
  });
});
