/**
 * `lib/kunden/data.ts` – react-freie Ableitung der Kunden-Startseite (WP-006 Slice 1).
 *
 * Belegt: die Auflösung ist streng MANDANTENLOKAL (jede Liste enthält nur Objekte mit der
 * `tenant_id` des übergebenen Mandanten) und wählt die richtigen Objekttypen. Kardinalitäten
 * werden aus dem Seed abgeleitet (nicht abgeschrieben), damit der Test bei Seed-Wachstum ehrlich
 * mitwandert statt zu erstarren.
 */
import { describe, expect, it } from 'vitest';

import { DEMO_SEED, DEMO_TENANTS, TENANT_ID } from '@isms/demo-seed';
import { buildCustomerWorkspace } from '../data';

function tenant(tenantId: string) {
  const found = DEMO_TENANTS.find((t) => t.tenant_id === tenantId);
  if (!found) throw new Error(`Testfixture fehlt: ${tenantId}`);
  return found;
}

/** Erwartete Anzahl aus dem Seed, streng je Mandant gezählt (Referenzwert). */
function seedCount(tenantId: string, types: readonly string[]): number {
  return DEMO_SEED.objects.filter((o) => o.tenant_id === tenantId && types.includes(o.object_type))
    .length;
}

describe('buildCustomerWorkspace – mandantenlokale Ableitung', () => {
  it('Nordwerk: Scopes, Ziele/Kennzahlen, Services, Nachweise und Entscheidungen aus dem Seed', () => {
    const model = buildCustomerWorkspace(tenant(TENANT_ID.NORDWERK));

    expect(model.isEmpty).toBe(false);
    // Scopes: die belegten Scope-Kennungen des Mandanten (rohe IDs, keine Objekte).
    expect(model.scopeIds).toContain('scope-nordwerk-isms-core');
    expect(model.scopeIds).toContain('scope-nordwerk-managed-service');

    // Ziele/Kennzahlen = Objective + KPI; Nachweise = Evidence; Entscheidungen = Decision Record.
    expect(model.objectives.length).toBe(seedCount(TENANT_ID.NORDWERK, ['Objective', 'KPI']));
    expect(model.objectives.length).toBeGreaterThan(0);
    expect(model.evidence.length).toBe(seedCount(TENANT_ID.NORDWERK, ['Evidence']));
    expect(model.services.length).toBe(seedCount(TENANT_ID.NORDWERK, ['Managed Service']));
    expect(model.decisionCount).toBe(seedCount(TENANT_ID.NORDWERK, ['Decision Record']));

    // Datenstand ist ein belegter Kalendertag (Systemachse), Scope-Kennungen sind belegt.
    expect(model.context.recordedOn).toBeDefined();
    expect(model.context.scopeIds.length).toBeGreaterThan(0);
  });

  it('jede abgeleitete Liste bleibt streng im aktiven Mandanten (keine Fremdobjekte)', () => {
    const model = buildCustomerWorkspace(tenant(TENANT_ID.NORDWERK));
    const idsOfTenant = new Set(
      DEMO_SEED.objects.filter((o) => o.tenant_id === TENANT_ID.NORDWERK).map((o) => o.object_id),
    );
    for (const ref of [...model.objectives, ...model.evidence]) {
      expect(idsOfTenant.has(ref.object_id)).toBe(true);
    }
    for (const view of model.services) {
      expect(idsOfTenant.has(view.service.object_id)).toBe(true);
    }
  });

  it('leerer Mandant (Finovia): alles leer, isEmpty=true, kein erfundener Datenstand', () => {
    const model = buildCustomerWorkspace(tenant(TENANT_ID.FINOVIA));
    expect(model.isEmpty).toBe(true);
    expect(model.scopeIds).toEqual([]);
    expect(model.objectives).toEqual([]);
    expect(model.evidence).toEqual([]);
    expect(model.services).toEqual([]);
    expect(model.decisionCount).toBe(0);
    expect(model.context.recordedOn).toBeUndefined();
  });

  it('Objekttyp-Glosse wird durchgereicht (Ziel/Kennzahl/Nachweis, kanonischer Typ bleibt sichtbar)', () => {
    const model = buildCustomerWorkspace(tenant(TENANT_ID.NORDWERK));
    const displays = [...model.objectives, ...model.evidence].map((r) => r.object_type_display);
    expect(displays).toContain('Ziel (Objective)');
    expect(displays).toContain('Kennzahl (KPI)');
    expect(displays).toContain('Nachweis (Evidence)');
  });
});
