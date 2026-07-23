/**
 * Render-Tests der „Services"-Ansicht (WP-012 Slice 2, Acceptance).
 *
 * Prüft gegen den echten `DEMO_SEED` (keine Mocks):
 *  1. Mandanten-Sicht (R08 + Nordwerk): Leitfrage + drei Services mit aufgelösten Namen,
 *     SLA-Kurzinfo, Deliverable-Status als Text und qualitativem Vertrauensgrad.
 *  2. Portfolio-Sicht: erscheint für R08 (und R10, Consulting & Service World) inkl.
 *     Mandanten ohne Services; für R03 stattdessen der Vorbehaltshinweis (reine
 *     Anzeige-Verdichtung, keine Sicherheitsgrenze).
 *  3. Empty-State für Finovia (keine Services im Seed).
 *  4. „Nicht angemeldet"-Zustand mit Link zur Login-Simulation.
 */
import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEMO_SEED, TENANT_ID } from '@isms/demo-seed';
import { ServicesContent } from '../ServicesContent';
import { ServiceCard } from '../ServiceCard';
import { ServicesView } from '../ServicesView';
import { SessionProvider } from '../../shell/SessionProvider';
import { resolveSession, type ResolvedSession } from '../../../lib/shell/session';
import {
  buildPortfolioOverview,
  getManagedServicesForTenant,
  type ManagedServiceView,
  type ServiceScopeItem,
} from '../../../lib/services/data';
import { objectDetailHref } from '../../../lib/twin/object-detail';

function session(roleId: string, tenantId: string): ResolvedSession {
  const resolved = resolveSession({ roleId, tenantId });
  if (!resolved) throw new Error(`Testfixture nicht auflösbar: ${roleId}/${tenantId}`);
  return resolved;
}

describe('ServicesContent – Mandanten-Sicht (R08 + Nordwerk)', () => {
  it('zeigt die Leitfrage und die drei Nordwerk-Services mit aufgelösten Namen', () => {
    const { role, tenant } = session('R08', TENANT_ID.NORDWERK);
    render(<ServicesContent role={role} tenant={tenant} />);

    expect(
      screen.getByText(/Welche Services laufen für Nordwerk Manufacturing SE/),
    ).toBeInTheDocument();

    // Service-Karten als h3 (eindeutig gegenüber den Namen in der Portfolio-Liste).
    for (const name of [
      'Kontinuierliches Risiko- & Control-Monitoring',
      'Nachweis- & Evidence-Betrieb',
      'Management- & Entscheidungsreporting',
    ]) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument();
    }
  });

  it('zeigt SLA-Kurzinfo, Deliverable-Status als Text und qualitativen Vertrauensgrad', () => {
    const { role, tenant } = session('R08', TENANT_ID.NORDWERK);
    render(<ServicesContent role={role} tenant={tenant} />);

    // SLA über die tatsächliche part_of-Kante aufgelöst (Name enthält das synthetische Band).
    expect(screen.getByText('SLA – Nachweisbetrieb (Band „Priority")')).toBeInTheDocument();

    // Deliverable im Entwurf: Status als Text, nie nur Farbe (Dok. 06 06-D11).
    const draft = screen.getByText('Management-Report Q2/2026 (Entwurf, synthetisch)');
    expect(draft.parentElement?.textContent).toMatch(/Lebenszyklus-Stand: Entwurf/);

    // Wirkungsbeitrag qualitativ statt nackter Zahl (Dok. 06 P04; Muster aus dem Twin).
    expect(screen.getAllByText(/Vertrauensgrad: hoch \(0,8\)/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Vertrauensgrad: mittel \(0,75\)/).length).toBeGreaterThanOrEqual(1);
  });

  it('zeigt für R08 die Portfolio-Sicht über alle vier Mandanten (auch ohne Services)', () => {
    const { role, tenant } = session('R08', TENANT_ID.NORDWERK);
    render(<ServicesContent role={role} tenant={tenant} />);

    const portfolio = screen.getByRole('region', { name: 'Portfolio: Alle Mandanten' });
    // Alle vier Mandanten nebeneinander (reine Aggregation je Mandant, O-WP012-03).
    for (const tenantName of [
      'Nordwerk Manufacturing SE',
      'Finovia Digital Bank AG',
      'MediCore Health Services GmbH',
      'Consulting Operator Demo',
    ]) {
      expect(
        within(portfolio).getByRole('heading', { level: 3, name: tenantName }),
      ).toBeInTheDocument();
    }
    // Zähler aus dem Seed abgeleitet: 3 / 0 / 0 / 2.
    expect(within(portfolio).getByText('3 Managed Services')).toBeInTheDocument();
    expect(within(portfolio).getByText('2 Managed Services')).toBeInTheDocument();
    expect(within(portfolio).getAllByText('0 Managed Services')).toHaveLength(2);
    expect(
      within(portfolio).getAllByText('Keine Managed Services im aktuellen Demo-Datenbestand.'),
    ).toHaveLength(2);
  });
});

/**
 * WP-014 Slice 2 (Acceptance 10): Aus der Services-Ansicht führt jeder Objektname auf die
 * Objekt-360-Detailseite. In der Mandanten-Sicht ist das immer der AKTIVE Mandant der
 * Session-Simulation; in der Portfolio-Sicht immer der Mandant der jeweiligen Zeile – niemals
 * ein fremder Mandant (Dok. 07 §17/P09).
 */
/**
 * Fail-loud an der Mandantengrenze (Sicherheits-Review): ein im Mandanten nicht auflösbarer
 * Endpunkt darf NICHT verlinkt werden. Der Zweig ist mit dem echten Seed unerreichbar (keine
 * Dangling-Kanten) und wird deshalb mit einem synthetisch überschriebenen Serviceumfang belegt –
 * Muster `twin.test.tsx` (RelationshipList).
 */
describe('ServiceCard – nicht auflösbarer Endpunkt bleibt ohne Link', () => {
  it('rendert die rohe Kennung als Text statt als Objektlink', () => {
    const basis = getManagedServicesForTenant(TENANT_ID.NORDWERK)[0];
    expect(basis).toBeDefined();

    const geisterobjekt: ServiceScopeItem = {
      object_id: 'geist-ziel',
      name: 'geist-ziel',
      object_type: 'unbekannt',
      resolved: false,
    };
    const view: ManagedServiceView = {
      ...basis,
      slas: [],
      deliverables: [],
      reviews: [],
      covered: [geisterobjekt],
      required: [],
      contributions: [],
    };

    const { container } = render(<ServiceCard view={view} tenantId={TENANT_ID.NORDWERK} />);

    // Der Servicekopf verlinkt weiterhin auf sein eigenes Objekt; der Geisterverweis nicht.
    const hrefs = Array.from(container.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual([objectDetailHref(TENANT_ID.NORDWERK, basis.service.object_id)]);
    expect(screen.getByText('geist-ziel')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'geist-ziel' })).not.toBeInTheDocument();
  });
});

describe('ServicesContent – Verlinkung auf die Objekt-360-Seite (WP-014 Slice 2)', () => {
  it('verlinkt Servicekopf, Komponenten, Serviceumfang und Wirkungsbeitrag', () => {
    const { role, tenant } = session('R08', TENANT_ID.NORDWERK);
    render(<ServicesContent role={role} tenant={tenant} />);

    const views = getManagedServicesForTenant(TENANT_ID.NORDWERK);
    expect(views.length).toBeGreaterThanOrEqual(1);

    for (const view of views) {
      const heading = screen.getByRole('heading', { level: 3, name: view.service.display_name });
      expect(within(heading).getByRole('link')).toHaveAttribute(
        'href',
        objectDetailHref(TENANT_ID.NORDWERK, view.service.object_id),
      );

      const card = heading.closest('li');
      if (!card) throw new Error(`Servicekarte fehlt: ${view.service.display_name}`);

      const verknuepft = [
        ...view.slas.map((i) => ({ name: i.name, object_id: i.object_id })),
        ...view.deliverables.map((i) => ({ name: i.name, object_id: i.object_id })),
        ...view.reviews.map((i) => ({ name: i.name, object_id: i.object_id })),
        ...view.covered.map((i) => ({ name: i.name, object_id: i.object_id })),
        ...view.required.map((i) => ({ name: i.name, object_id: i.object_id })),
        ...view.contributions.map((c) => ({ name: c.target_name, object_id: c.target_id })),
      ];
      for (const item of verknuepft) {
        expect(within(card).getAllByRole('link', { name: item.name })[0]).toHaveAttribute(
          'href',
          objectDetailHref(TENANT_ID.NORDWERK, item.object_id),
        );
      }
    }
  });

  it('verlinkt in der Portfolio-Sicht jeden Service im Mandanten SEINER Zeile', () => {
    const { role, tenant } = session('R08', TENANT_ID.NORDWERK);
    render(<ServicesContent role={role} tenant={tenant} />);

    const portfolio = screen.getByRole('region', { name: 'Portfolio: Alle Mandanten' });
    const entries = buildPortfolioOverview().filter((e) => e.service_count > 0);
    // Mindestens ein Eintrag betrifft einen ANDEREN Mandanten als den aktiven – genau dort
    // muss der Link dessen eigenen Mandanten tragen (keine Mandantenvermischung).
    expect(entries.some((e) => e.tenant.tenant_id !== TENANT_ID.NORDWERK)).toBe(true);

    for (const entry of entries) {
      const card = within(portfolio)
        .getByRole('heading', { level: 3, name: entry.tenant.display_name })
        .closest('li');
      if (!card) throw new Error(`Portfolio-Karte fehlt: ${entry.tenant.display_name}`);

      for (const service of entry.services) {
        expect(within(card).getByRole('link', { name: service.name })).toHaveAttribute(
          'href',
          objectDetailHref(entry.tenant.tenant_id, service.object_id),
        );
      }
    }
  });

  it('adressiert jeden Objektlink auf ein Objekt genau dieses Mandanten', () => {
    const { role, tenant } = session('R08', TENANT_ID.NORDWERK);
    const { container } = render(<ServicesContent role={role} tenant={tenant} />);

    const tenantByObjectId = new Map(
      DEMO_SEED.objects.map((o) => [o.object_id, o.tenant_id] as const),
    );
    const hrefs = Array.from(container.querySelectorAll('a[href*="/objekt/"]')).map(
      (a) => a.getAttribute('href') ?? '',
    );
    expect(hrefs.length).toBeGreaterThanOrEqual(1);

    for (const href of hrefs) {
      const treffer = /^\/twin\/([^/]+)\/objekt\/([^/]+)$/.exec(href);
      expect(treffer).not.toBeNull();
      const [, tenantId, objectId] = treffer as RegExpExecArray;
      // Der Mandant im Link ist exakt der Mandant des verlinkten Objekts.
      expect(tenantByObjectId.get(objectId)).toBe(tenantId);
    }
  });
});

describe('ServicesContent – Rollen-Gating der Portfolio-Sicht (Welt-Mapping Dok. 06 §5)', () => {
  it('zeigt die Portfolio-Sicht NICHT für R03, sondern den Vorbehaltshinweis', () => {
    const { role, tenant } = session('R03', TENANT_ID.NORDWERK);
    render(<ServicesContent role={role} tenant={tenant} />);

    expect(
      screen.queryByRole('heading', { name: 'Portfolio: Alle Mandanten' }),
    ).not.toBeInTheDocument();
    expect(screen.getByText(/der Service-Organisation vorbehalten/)).toBeInTheDocument();
    // Ehrlicher Demo-Hinweis: UI-Verdichtung, keine Sicherheitsgrenze.
    expect(screen.getByText(/keine Sicherheitsgrenze/)).toBeInTheDocument();
  });

  it('zeigt die Portfolio-Sicht auch für R10 (ISMS Consultant, Consulting & Service World)', () => {
    const { role, tenant } = session('R10', TENANT_ID.NORDWERK);
    render(<ServicesContent role={role} tenant={tenant} />);

    expect(screen.getByRole('heading', { name: 'Portfolio: Alle Mandanten' })).toBeInTheDocument();
  });
});

describe('ServicesContent – Empty-State (Finovia ohne Services)', () => {
  it('zeigt eine ehrliche Meldung und verweist auf die Mandanten mit Services (aus dem Seed)', () => {
    const { role, tenant } = session('R08', TENANT_ID.FINOVIA);
    render(<ServicesContent role={role} tenant={tenant} />);

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Keine Managed Services für Finovia Digital Bank AG',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Services laufen derzeit für Nordwerk Manufacturing SE und Consulting Operator Demo/,
      ),
    ).toBeInTheDocument();
    // R08 sieht trotz Empty-State weiterhin das Portfolio (mandantenübergreifende Verdichtung).
    expect(screen.getByRole('heading', { name: 'Portfolio: Alle Mandanten' })).toBeInTheDocument();
  });
});

describe('ServicesView – „nicht angemeldet" (Simulation)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('zeigt den Hinweis samt Link zur Login-Simulation', () => {
    render(
      <SessionProvider>
        <ServicesView />
      </SessionProvider>,
    );

    expect(
      screen.getByRole('heading', { name: 'Nicht angemeldet (Simulation)' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Zur Anmelde-Simulation/ })).toHaveAttribute(
      'href',
      '/login',
    );
  });
});
