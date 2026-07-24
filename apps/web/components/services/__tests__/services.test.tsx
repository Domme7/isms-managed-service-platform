/**
 * Render-Tests der „Services"-Ansicht (WP-012 Slice 2, Acceptance).
 *
 * Prüft gegen den echten `DEMO_SEED` (keine Mocks):
 *  1. Mandanten-Sicht (R08 + Nordwerk): Leitfrage + drei Services mit aufgelösten Namen,
 *     SLA-Kurzinfo, Deliverable-Status als Text und qualitativem Vertrauensgrad.
 *  2. Portfolio-Sicht: erscheint genau dann, wenn `kundenSicht(role) === 'portfolio'` (eine
 *     Quelle, `lib/shell/sphaere.ts`) – inkl. Mandanten ohne Services. In der
 *     Ein-Unternehmens-Sicht wird der Abschnitt GAR NICHT gerendert (reine
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
import { DEMO_ROLES } from '../../../lib/shell/roles';
import { resolveSession, type ResolvedSession } from '../../../lib/shell/session';
import { kundenSicht } from '../../../lib/shell/sphaere';
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
      within(portfolio).getAllByText('Keine Managed Services im aktuellen Datenbestand.'),
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

/**
 * REGEL-ERHALTEND UMGESTELLT AUF EINE SPHÄREN-QUELLE (WP-028-Fixpass; Code- und
 * Security-Auflage, DR-0013 Nr. 11 / DR-0012).
 *
 * ALTE REGEL: eigenes Welt-Mapping dieser Seite (`role.worldId === 'consulting'`) plus ein
 * Vorbehaltstext für alle übrigen Perspektiven.
 * NEUE REGEL: `kundenSicht(role) === 'portfolio'` – dieselbe Funktion wie am Ort „Kunden".
 *
 * WAS DAS BEHEBT (beides war ein echter Befund, keine Kosmetik):
 *  1. Divergenz: R12 sah das Portfolio auf `/twin`, aber nicht auf `/services`; neutral
 *     umgekehrt. Zwei Regeln für dieselbe Frage laufen zwangsläufig auseinander.
 *  2. Mandantengrenze: Jede KUNDENrolle las auf ihrer eigenen Serviceseite „Die
 *     mandantenübergreifende Portfolio-Sicht ist der Service-Organisation vorbehalten" – eine
 *     Reichweiten-/Existenzaussage über einen mandantenübergreifenden Bestand in genau der
 *     Sphäre, die davon frei sein soll.
 *
 * NICHT ABGESCHWÄCHT: Die Portfolio-Sicht bleibt für Kundenrollen abwesend – strenger sogar,
 * denn jetzt fehlt auch der Satz über sie. Der Test prüft beides: Abwesenheit der Liste UND
 * Abwesenheit jeder mandantenübergreifenden Formulierung.
 */
describe('ServicesContent – Sphären-Gating der Portfolio-Sicht (eine Quelle: lib/shell/sphaere)', () => {
  it('rendert für Kundenrollen GAR KEINEN mandantenübergreifenden Abschnitt (R03)', () => {
    const { role, tenant } = session('R03', TENANT_ID.NORDWERK);
    const { container } = render(<ServicesContent role={role} tenant={tenant} />);

    expect(
      screen.queryByRole('heading', { name: 'Portfolio: Alle Mandanten' }),
    ).not.toBeInTheDocument();
    // Auch kein Ersatz-Abschnitt und keine Aussage über einen mandantenübergreifenden Bestand.
    expect(screen.queryByRole('heading', { name: /Portfolio/ })).not.toBeInTheDocument();
    const text = container.textContent ?? '';
    expect(text).not.toMatch(/der Service-Organisation vorbehalten/);
    expect(text).not.toMatch(/mandantenübergreifend/i);
    expect(text).not.toMatch(/alle Mandanten/i);
  });

  it('rendert auch für den Auditor (R07, Ein-Unternehmens-Sicht) keinen Portfolio-Abschnitt', () => {
    const { role, tenant } = session('R07', TENANT_ID.NORDWERK);
    const { container } = render(<ServicesContent role={role} tenant={tenant} />);

    expect(screen.queryByRole('heading', { name: /Portfolio/ })).not.toBeInTheDocument();
    expect(container.textContent ?? '').not.toMatch(/mandantenübergreifend/i);
  });

  it('zeigt die Portfolio-Sicht für R10 und R08 (Betreibersphäre)', () => {
    for (const roleId of ['R08', 'R10']) {
      const { role, tenant } = session(roleId, TENANT_ID.NORDWERK);
      const { unmount } = render(<ServicesContent role={role} tenant={tenant} />);
      expect(
        screen.getByRole('heading', { name: 'Portfolio: Alle Mandanten' }),
        roleId,
      ).toBeInTheDocument();
      unmount();
    }
  });

  /**
   * DIE BEHOBENE DIVERGENZ, festgenagelt: `/services` und der Ort „Kunden" beantworten die
   * Sphärenfrage jetzt identisch – für JEDE der dreizehn Perspektiven.
   */
  it('deckt sich für alle dreizehn Perspektiven mit kundenSicht() (keine zweite Regel)', () => {
    for (const perspektive of [...DEMO_ROLES, null]) {
      const { container, unmount } = render(
        <ServicesContent
          role={perspektive}
          tenant={
            session('R08', TENANT_ID.NORDWERK).tenant /* Mandant konstant, Rolle ist die Variable */
          }
        />,
      );
      const sichtbar = container.querySelector('h2#portfolio') !== null;
      expect(sichtbar, perspektive?.id ?? 'neutral').toBe(kundenSicht(perspektive) === 'portfolio');
      unmount();
    }
  });
});

describe('ServicesContent – Empty-State (Finovia ohne Services)', () => {
  /**
   * MANDANTENLOKAL seit WP-020 Slice 1. Bis dahin stand hier die Assertion auf den Satz
   * „Services laufen derzeit für Nordwerk Manufacturing SE und Consulting Operator Demo;
   * weitere Mandanten folgen …" – dieser Test nagelte damit eine Mandantengrenzverletzung
   * fest (Existenzaussage über FREMDE Mandanten im Leerzustand, Dok. 07 „Mandantenfähigkeit,
   * Rechte und Datenschutz"/P09; dieselbe Fehlerklasse wie /isms in WP-013 und
   * /entscheidungen in WP-017). Der Leerzustand spricht jetzt nur über DIESEN Mandanten;
   * mechanisch bewacht in `components/__tests__/leerzustand-mandantengrenze.test.tsx`.
   */
  it('zeigt eine ehrliche, MANDANTENLOKALE Meldung ohne Aussage über fremde Mandanten', () => {
    // Bewusst R03 (Customer Operations World): ohne die – dokumentiert mandantenübergreifende –
    // Portfolio-Sicht lässt sich die Mandantenlokalität des Leerzustands über den ganzen
    // Seiteninhalt prüfen.
    const { role, tenant } = session('R03', TENANT_ID.FINOVIA);
    const { container } = render(<ServicesContent role={role} tenant={tenant} />);

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Keine Managed Services für Finovia Digital Bank AG',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/sind im aktuellen Datenbestand keine\s+Managed Services modelliert/),
    ).toBeInTheDocument();
    // Kein fremder Mandant – weder Name noch Kennung (die Kontextleiste und der Leerzustand
    // sprechen ausschließlich über den aktiven Mandanten).
    expect(container.textContent).not.toContain('Nordwerk Manufacturing SE');
    expect(container.textContent).not.toContain('Consulting Operator Demo');
    expect(container.textContent).not.toContain(TENANT_ID.NORDWERK);
    expect(container.textContent).not.toContain(TENANT_ID.CONSULTING_OPERATOR);
    // SPHÄRENGERECHT (Nachfix nach Gate-Runde 2): R03 ist Ein-Unternehmens-Sphäre – der
    // Mandantenwechsel wird nicht angeboten, also fehlt die „Mandant wechseln"-CTA hier
    // ERSATZLOS (`mandantenwechselSichtbar` ist falsch). Ein Bedienelement, das ohne Wort
    // verschwindet, täuschte sonst eine durchgesetzte Grenze vor. Für eine Portfolio-Rolle
    // steht die CTA weiterhin (Test darunter).
    expect(screen.queryByRole('link', { name: /Mandant wechseln/ })).toBeNull();
  });

  it('R08 sieht trotz Empty-State weiterhin das Portfolio (dokumentierte Verdichtung)', () => {
    const { role, tenant } = session('R08', TENANT_ID.FINOVIA);
    render(<ServicesContent role={role} tenant={tenant} />);

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Keine Managed Services für Finovia Digital Bank AG',
      }),
    ).toBeInTheDocument();
    // Die Portfolio-Sicht (O-WP012-03) ist KEIN Leerzustand und bleibt für die
    // Consulting & Service World sichtbar.
    expect(screen.getByRole('heading', { name: 'Portfolio: Alle Mandanten' })).toBeInTheDocument();
    // In der Portfolio-Sphäre wird der Mandantenwechsel angeboten – die Leerzustands-CTA steht
    // (Gegenprobe zum R03-Fall: die CTA hängt an `mandantenwechselSichtbar`, nicht am Zustand).
    expect(screen.getByRole('link', { name: /Mandant wechseln/ })).toHaveAttribute(
      'href',
      '/login',
    );
  });
});

describe('ServicesView – „kein Mandant gewählt"', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('zeigt den Hinweis samt Link zur Anmeldung', () => {
    render(
      <SessionProvider>
        <ServicesView />
      </SessionProvider>,
    );

    expect(screen.getByRole('heading', { name: 'Kein Mandant gewählt' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Zur Anmeldung/ })).toHaveAttribute('href', '/login');
  });
});
