/**
 * Render-/Smoke-Test des Digital Twin Explorers (WP-004, Acceptance-Test).
 *
 * Verifiziert gegen den echten `DEMO_SEED` (keine Mocks, nur belegte Daten):
 *  1. Übersicht listet alle 4 Demo-Mandanten.
 *  2. Nordwerk-Detail rendert >= 1 Objekt und >= 1 Beziehung mit aufgelösten display_name.
 *  3. Empty-State erscheint für einen Mandanten ohne Objektgraphen.
 */
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_SEED, TENANT_ID } from '@isms/demo-seed';
import { TenantDetailView } from '../TenantDetailView';
import { TenantOverview } from '../TenantOverview';
import { buildTenantDetail, getTenant } from '../../../lib/twin/data';

function tenantOrThrow(tenantId: string) {
  const tenant = getTenant(tenantId);
  if (!tenant) throw new Error(`Testfixture fehlt: ${tenantId}`);
  return tenant;
}

describe('TenantOverview', () => {
  it('listet alle vier Demo-Mandanten', () => {
    render(<TenantOverview tenants={DEMO_SEED.tenants} />);

    expect(DEMO_SEED.tenants).toHaveLength(4);
    for (const tenant of DEMO_SEED.tenants) {
      expect(screen.getByText(tenant.display_name)).toBeInTheDocument();
    }
  });

  it('markiert Nordwerk mit "Objektgraph vorhanden"', () => {
    render(<TenantOverview tenants={DEMO_SEED.tenants} />);
    expect(screen.getByText(/Objektgraph vorhanden/)).toBeInTheDocument();
    expect(screen.getAllByText(/kein Objektgraph/).length).toBeGreaterThanOrEqual(3);
  });
});

describe('TenantDetailView – Nordwerk (mit Graph)', () => {
  const model = buildTenantDetail(tenantOrThrow(TENANT_ID.NORDWERK));

  it('rendert mindestens ein Objekt aus dem Seed', () => {
    render(<TenantDetailView model={model} />);

    expect(model.objectCount).toBeGreaterThanOrEqual(1);
    // Ein konkretes, im Seed belegtes Objekt – als Objektkarten-Überschrift, eindeutig
    // gegenüber den gleichnamigen Endpunkten in der Beziehungsliste.
    expect(screen.getByRole('heading', { name: 'Kundenauftragsdaten' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Objekte nach Familie/ })).toBeInTheDocument();
    // Datenqualität wird als Aussage (Bestätigungsstufe), nicht als nackte Anzahl gezeigt.
    expect(screen.getAllByText(/maschinell plausibilisiert/).length).toBeGreaterThanOrEqual(1);
  });

  it('rendert mindestens eine Beziehung mit aufgelösten display_name (nicht mit IDs)', () => {
    render(<TenantDetailView model={model} />);

    expect(model.relationshipCount).toBeGreaterThanOrEqual(1);

    // Die processes-Kante Auftragsabwicklung -> Kundenauftragsdaten muss mit lesbaren Namen und
    // deutschem Klartext-Label erscheinen; die aria-label fasst Quelle/Klartext-Typ/Ziel zusammen.
    const edge = screen.getByLabelText('Auftragsabwicklung verarbeitet Kundenauftragsdaten');
    expect(edge).toBeInTheDocument();
    // Klartext-Label primär, technischer Typ sekundär weiterhin sichtbar.
    expect(within(edge).getByText(/verarbeitet/)).toBeInTheDocument();
    expect(within(edge).getByText(/processes/)).toBeInTheDocument();

    // Generisch: KEINE rohe object_id irgendwo im Detail-Output (alle Endpunkte aufgelöst).
    const nordwerkObjects = DEMO_SEED.objects.filter(
      (o) => o.tenant_id === TENANT_ID.NORDWERK,
    );
    expect(nordwerkObjects.length).toBeGreaterThanOrEqual(1);
    for (const object of nordwerkObjects) {
      expect(screen.queryByText(object.object_id)).not.toBeInTheDocument();
    }
  });
});

describe('TenantDetailView – Empty-State (ohne Graph)', () => {
  it('zeigt einen aus dem Seed abgeleiteten Empty-State für Finovia', () => {
    const model = buildTenantDetail(tenantOrThrow(TENANT_ID.FINOVIA));
    render(<TenantDetailView model={model} />);

    expect(model.objectCount).toBe(0);
    expect(screen.getByText(/Kein Objektgraph in dieser Demo-Slice/i)).toBeInTheDocument();
    // Kein Objekt-/Beziehungsbereich, wenn kein Graph vorhanden ist.
    expect(screen.queryByRole('heading', { name: /Objekte nach Familie/ })).not.toBeInTheDocument();

    // "Nächster Schritt": Link auf einen tatsächlich ausmodellierten Mandanten (aus dem Seed
    // abgeleitet, nicht hartkodiert). Nordwerk trägt has_object_graph = true.
    const nextLink = screen.getByRole('link', { name: /Nordwerk Manufacturing SE ansehen/ });
    expect(nextLink).toHaveAttribute('href', `/twin/${TENANT_ID.NORDWERK}`);
  });
});
