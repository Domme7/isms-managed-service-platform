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
import { RelationshipList } from '../RelationshipList';
import { TenantDetailView } from '../TenantDetailView';
import { TenantOverview } from '../TenantOverview';
import { buildTenantDetail, getTenant, type ResolvedRelationship } from '../../../lib/twin/data';
import { objectDetailHref } from '../../../lib/twin/object-detail';

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

  it('markiert je Mandant genau den aus dem Seed abgeleiteten Graph-Zustand', () => {
    render(<TenantOverview tenants={DEMO_SEED.tenants} />);

    // Aus dem Seed abgeleitet statt hartkodiert: seit WP-012 tragen Nordwerk UND der
    // Consulting Operator Demo Objekte; Finovia/MediCore bleiben ohne Graph (Empty-State).
    const withGraph = DEMO_SEED.tenants.filter((t) => t.has_object_graph);
    const withoutGraph = DEMO_SEED.tenants.filter((t) => !t.has_object_graph);

    expect(withGraph.length).toBeGreaterThanOrEqual(2);
    expect(withoutGraph.map((t) => t.tenant_id)).toContain(TENANT_ID.FINOVIA);
    expect(screen.getAllByText(/Objektgraph vorhanden/)).toHaveLength(withGraph.length);
    expect(screen.getAllByText(/kein Objektgraph/)).toHaveLength(withoutGraph.length);
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
    // WP-028/DR-0013: nur das deutsche Klartext-Label ist sichtbar; die kanonische R-Kennung
    // und der technische snake_case-Typ erscheinen nicht mehr im gerenderten Text.
    expect(within(edge).getByText(/verarbeitet/)).toBeInTheDocument();
    expect(within(edge).queryByText(/processes/)).not.toBeInTheDocument();
    expect(edge.textContent).not.toContain('R07');

    // Generisch: KEINE rohe object_id irgendwo im Detail-Output (alle Endpunkte aufgelöst).
    const nordwerkObjects = DEMO_SEED.objects.filter((o) => o.tenant_id === TENANT_ID.NORDWERK);
    expect(nordwerkObjects.length).toBeGreaterThanOrEqual(1);
    for (const object of nordwerkObjects) {
      expect(screen.queryByText(object.object_id)).not.toBeInTheDocument();
    }
  });
});

/**
 * WP-014 Slice 2 (Acceptance 4/10): Der Twin-Explorer endet nicht mehr in Listen – Objektkarten
 * und beide Endpunkte jeder Beziehung führen auf die Objekt-360-Detailseite. Der Mandant des
 * Links ist immer der Mandant der Route (kein Link über die Mandantengrenze, Dok. 07 §17/P09).
 */
describe('TenantDetailView – Verlinkung auf die Objekt-360-Seite (WP-014 Slice 2)', () => {
  const model = buildTenantDetail(tenantOrThrow(TENANT_ID.NORDWERK));

  it('verlinkt jeden Objektnamen der Objektkarten auf seine Detailseite', () => {
    render(<TenantDetailView model={model} />);

    // Reihenfolge der Karten = Reihenfolge der Familiengruppen (kanonisch F01..F09).
    const erwartet = model.familyGroups.flatMap((group) => group.objects);
    const kartenkoepfe = screen.getAllByRole('heading', { level: 4 });
    expect(kartenkoepfe).toHaveLength(erwartet.length);
    expect(erwartet.length).toBeGreaterThanOrEqual(1);

    kartenkoepfe.forEach((heading, index) => {
      const object = erwartet[index];
      const link = within(heading).getByRole('link');
      expect(link).toHaveTextContent(object.display_name);
      expect(link).toHaveAttribute('href', objectDetailHref(TENANT_ID.NORDWERK, object.object_id));
    });
  });

  it('verlinkt BEIDE Endpunkte jeder Beziehung auf die jeweilige Detailseite', () => {
    const { container } = render(<TenantDetailView model={model} />);

    const items = Array.from(container.querySelectorAll('li.tw-rel-item'));
    expect(items).toHaveLength(model.relationships.length);

    items.forEach((item, index) => {
      const rel = model.relationships[index];
      const hrefs = Array.from(item.querySelectorAll('a')).map((a) => a.getAttribute('href'));
      expect(hrefs).toEqual([
        objectDetailHref(TENANT_ID.NORDWERK, rel.source_id),
        objectDetailHref(TENANT_ID.NORDWERK, rel.target_id),
      ]);
    });
  });

  it('hält jeden Objektlink im Mandanten der Route (kein Kontextverlust)', () => {
    const { container } = render(<TenantDetailView model={model} />);

    const nordwerkIds = new Set(
      DEMO_SEED.objects.filter((o) => o.tenant_id === TENANT_ID.NORDWERK).map((o) => o.object_id),
    );
    const hrefs = Array.from(container.querySelectorAll('a[href*="/objekt/"]')).map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs.length).toBeGreaterThanOrEqual(1);

    const prefix = `/twin/${TENANT_ID.NORDWERK}/objekt/`;
    for (const href of hrefs) {
      expect(href?.startsWith(prefix)).toBe(true);
      // Jedes Linkziel ist ein Objekt DIESES Mandanten – nie ein fremdes.
      expect(nordwerkIds.has((href as string).slice(prefix.length))).toBe(true);
    }
  });

  it('verlinkt einen nicht auflösbaren Endpunkt bewusst NICHT (Fail-loud)', () => {
    // Synthetische, konstruierte Kante: der Endpunkt existiert nicht als Objekt.
    const dangling: ResolvedRelationship = {
      relationship_id: 'test-dangling',
      relationship_type: 'processes',
      relationship_type_id: 'R07',
      relationship_type_label: 'verarbeitet',
      source_id: 'geist-quelle',
      target_id: 'geist-ziel',
      source_name: 'geist-quelle',
      target_name: 'geist-ziel',
      source_resolved: false,
      target_resolved: false,
      assertion_kind: 'assertiert',
    };

    const { container } = render(
      <RelationshipList relationships={[dangling]} tenantId={TENANT_ID.NORDWERK} />,
    );

    expect(container.querySelectorAll('a')).toHaveLength(0);
    expect(screen.getAllByText('geist-quelle').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('geist-ziel').length).toBeGreaterThanOrEqual(1);
  });
});

describe('TenantDetailView – Empty-State (ohne Graph)', () => {
  it('zeigt einen MANDANTENLOKALEN Empty-State für Finovia (kein fremder Mandant)', () => {
    // Review-Pass WP-020 (Security-Finding, Regel VERSCHÄRFT statt abgeschwächt): der frühere
    // Empty-State nannte fremde Mandanten samt Links („Ausmodelliert ist bislang …") – die
    // vierte Fundstelle der Leerzustands-Leak-Klasse (Dok. 07 „Mandantenfähigkeit"/P09).
    // Dieser Test hatte den Leak festgeschrieben; jetzt beweist er das Gegenteil.
    const model = buildTenantDetail(tenantOrThrow(TENANT_ID.FINOVIA));
    const { container } = render(<TenantDetailView model={model} />);

    expect(model.objectCount).toBe(0);
    expect(
      screen.getByRole('heading', { name: 'Kein Objektgraph für Finovia Digital Bank AG' }),
    ).toBeInTheDocument();
    // Kein Objekt-/Beziehungsbereich, wenn kein Graph vorhanden ist.
    expect(screen.queryByRole('heading', { name: /Objekte nach Familie/ })).not.toBeInTheDocument();

    // Nächster Schritt führt in die Mandanten-ÜBERSICHT (bewusst mandantenübergreifende
    // Portfolio-Seite) – NICHT auf fremde Detailseiten.
    expect(screen.getByRole('link', { name: /Zur Mandantenübersicht/ })).toHaveAttribute(
      'href',
      '/twin',
    );
    // Negativbeweis: kein Name und keine ID eines anderen Mandanten im DOM.
    const html = container.innerHTML;
    for (const fremd of DEMO_SEED.tenants.filter((t) => t.tenant_id !== TENANT_ID.FINOVIA)) {
      expect(html).not.toContain(fremd.display_name);
      expect(html).not.toContain(fremd.tenant_id);
    }
  });
});
