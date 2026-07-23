/**
 * Render-Tests der „ISMS"-Ansicht (WP-013 Slice 1, Acceptance).
 *
 * Prüft gegen den echten `DEMO_SEED` (keine Mocks):
 *  1. Nordwerk: Leitfrage + vier Sektionen (Risiken/Controls/Maßnahmen/Nachweise) mit
 *     aufgelösten Karten und Klartext-Kanten (deutsche Beziehungslabels).
 *  2. Getrennte Anzeige: Control „wirksam" vs. Implementation „implementiert" (08-D07).
 *  3. Empty-State für den Consulting Operator (Services vorhanden, ISMS leer) mit
 *     nächstem Schritt; ebenso Finovia.
 *  4. „Nicht angemeldet"-Zustand mit Link zur Login-Simulation.
 */
import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEMO_SEED, DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { IsmsContent } from '../IsmsContent';
import { MeasureCard } from '../IsmsCards';
import { IsmsView } from '../IsmsView';
import { SessionProvider } from '../../shell/SessionProvider';
import { buildIsmsVerdichtung } from '../../../lib/heute/dashboard';
import { buildIsmsCoreView, type IsmsLink, type MeasureView } from '../../../lib/isms/data';
import { getRole, type DemoRole } from '../../../lib/shell/roles';
import { objectDetailHref } from '../../../lib/twin/object-detail';

function tenant(tenantId: string): DemoTenant {
  const found = DEMO_TENANTS.find((t) => t.tenant_id === tenantId);
  if (!found) throw new Error(`Testfixture fehlt: ${tenantId}`);
  return found;
}

/** Rolle für die Kontextleiste (WP-020 Slice 1) – reine Anzeige, kein Gating (06-D05). */
function role(roleId: string): DemoRole {
  const found = getRole(roleId);
  if (!found) throw new Error(`Testfixture fehlt: ${roleId}`);
  return found;
}

/** Karte (li.sv-card) zu einer h3-Überschrift – für Assertions innerhalb einer Karte. */
function cardByHeading(name: string): HTMLElement {
  const heading = screen.getByRole('heading', { level: 3, name });
  const card = heading.closest('li');
  if (!card) throw new Error(`Karte zu Überschrift „${name}" nicht gefunden`);
  return card;
}

describe('IsmsContent – Nordwerk (vier Sektionen mit aufgelösten Karten)', () => {
  it('zeigt Leitfrage und die vier Sektionen Risiken/Controls/Maßnahmen/Nachweise', () => {
    render(<IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />);

    expect(
      screen.getByText('Wie ist die Risiko- und Control-Lage von Nordwerk Manufacturing SE?'),
    ).toBeInTheDocument();

    for (const section of ['Risiken', 'Controls', 'Maßnahmen', 'Nachweise']) {
      expect(screen.getByRole('heading', { level: 2, name: section })).toBeInTheDocument();
    }
  });

  it('zeigt die Risiko-Karte mit Herkunfts-Kette in Klartext (Szenario, Threat, Weakness, affects)', () => {
    render(<IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />);

    // Risiko mit Status als Text (nie nur Farbe, Dok. 06 06-D11).
    const riskCard = cardByHeading('Betriebsunterbrechung Auftragsabwicklung');
    expect(
      within(riskCard).getByText('Risiko (Risk) · Lebenszyklus-Stand: behandelt'),
    ).toBeInTheDocument();
    // Betroffenheit über die reale affects-Kante mit deutschem Label (WP-028/DR-0013: nur
    // Klartext, ohne R-Kennung und snake_case-Typ).
    expect(within(riskCard).getByText('Beziehung: betrifft')).toBeInTheDocument();
    expect(within(riskCard).getByText('Auftragsabwicklung')).toBeInTheDocument();

    // Szenario-Karte: Threat-Herkunft (bedroht) inkl. weiterer Bedrohungsziele.
    const scenarioCard = cardByHeading('Verschlüsselung der Auftragsdaten durch Ransomware');
    expect(within(scenarioCard).getByText('Beziehung: bedroht')).toBeInTheDocument();
    expect(
      within(scenarioCard).getByText('Ransomware-Angriff auf Produktionsnetz'),
    ).toBeInTheDocument();
    expect(
      within(scenarioCard).getByText(/bedroht außerdem: Kundenauftragsdaten/),
    ).toBeInTheDocument();

    // Schwachstellen-Karte: Exposition (exponiert/exposes) auf das Asset.
    const weaknessCard = cardByHeading('Ungepatchte ERP-Integrationsschnittstelle');
    expect(within(weaknessCard).getByText('Beziehung: exponiert')).toBeInTheDocument();
    expect(within(weaknessCard).getByText('Kundenauftragsdaten')).toBeInTheDocument();
  });

  it('weist Control „wirksam" und Implementation „implementiert" getrennt aus (08-D07)', () => {
    render(<IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const controlCard = cardByHeading('Backup & Recovery Control');

    // Control-Stand als eigener Text an der Karte – bewusst als Lebenszyklus-Stand gerahmt
    // (UX-Review MAJOR-1: „wirksam" ist kein Prüfergebnis).
    expect(
      within(controlCard).getByText('Control · Lebenszyklus-Stand: wirksam'),
    ).toBeInTheDocument();
    expect(within(controlCard).getByText(/kein Prüfergebnis/)).toBeInTheDocument();

    // … und der Implementierungsstatus getrennt an der Implementation-Zeile.
    const impl = within(controlCard).getByText('Backup-Job Werk Nord (ERP)');
    // Wortlaut identisch zur Objekt-360-Seite (Review-Fix): „Lebenszyklus-Stand", nicht „Status".
    expect(impl.parentElement?.textContent).toMatch(/Lebenszyklus-Stand: implementiert/);
    // Die Implementation-Zeile behauptet KEINE Wirksamkeit.
    expect(impl.parentElement?.textContent).not.toMatch(/wirksam/);

    // Requirement + Framework über satisfies/part_of.
    const requirement = within(controlCard).getByText('A.8.13 – Informationssicherung (Backup)');
    expect(requirement.parentElement?.textContent).toMatch(
      /Framework: ISO\/IEC 27001:2022 \(Demo-Katalog\)/,
    );

    // Evidence-Stand mit Kantenstatus (evidences) – wortgleich zur Objekt-360-Seite.
    const evidenceItem = within(controlCard).getByText('Restore-Test-Protokoll Q2/2026');
    expect(evidenceItem.parentElement?.textContent).toMatch(/Status der Beziehung: geprüft/);
    expect(controlCard.textContent).not.toContain('Prüfstand der Beziehung');
  });

  it('zeigt Maßnahmen- und Nachweis-Karte mit Status und Bezug', () => {
    render(<IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />);

    const measureCard = cardByHeading('Härtung & Patch-Management ERP-Schnittstelle');
    expect(
      within(measureCard).getByText('Maßnahme (Measure) · Lebenszyklus-Stand: in Arbeit'),
    ).toBeInTheDocument();
    expect(within(measureCard).getByText('Beziehung: behebt')).toBeInTheDocument();

    const evidenceCard = cardByHeading('Restore-Test-Protokoll Q2/2026');
    expect(
      within(evidenceCard).getByText('Nachweis (Evidence) · Lebenszyklus-Stand: akzeptiert'),
    ).toBeInTheDocument();
    expect(within(evidenceCard).getByText('Backup & Recovery Control')).toBeInTheDocument();
  });
});

/**
 * WP-020 Slice 4 (DR-0008): Verdichteter Überblick am Seitenkopf – volle Lebenszyklus-
 * Verteilung (mit 08-D07-Glosse) und zwei Abdeckungen „x von y", je mit Frage, Scope,
 * Datenstand, Ermittlungsregel und seiteninternem Drill-down auf die Karten.
 */
describe('IsmsContent – verdichteter Überblick (WP-020, DR-0008)', () => {
  it('zeigt für Nordwerk die Verteilung der Stände mit sichtbarer 08-D07-Glosse', () => {
    const verdichtung = buildIsmsVerdichtung(TENANT_ID.NORDWERK);
    if (!verdichtung) throw new Error('Testfixture fehlt: Nordwerk-Verdichtung');
    const { container } = render(
      <IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'Überblick aus belegten Daten' }),
    ).toBeInTheDocument();

    const kachel = container.querySelector('.db-tile[data-tile-id="lebenszyklus_verteilung"]');
    if (!kachel) throw new Error('Verteilungs-Kachel fehlt');
    // Jeder erfasste Stand erscheint mit „x von y" – Zahlen aus der Ableitung.
    for (const slice of verdichtung.lifecycle.slices) {
      const zeile = Array.from(kachel.querySelectorAll('.db-verteilung > li')).find(
        (li) => li.querySelector('.db-verteilung-stand')?.textContent === slice.status,
      );
      expect(zeile, slice.status).toBeTruthy();
      expect(zeile?.querySelector('.db-verteilung-zahl')?.textContent).toBe(
        `${slice.count} von ${verdichtung.lifecycle.total}`,
      );
    }
    // 08-D07-Glosse sichtbar an der Kachel (nicht nur irgendwo auf der Seite).
    expect(kachel.querySelector('.db-glosse')?.textContent).toMatch(/kein Prüfergebnis/);
    // Selbsterklärung: Ermittlungsregel + Drill-down auf die Karten dieser Seite.
    expect(kachel.querySelector('details.db-regel summary')?.textContent).toBe('So wird gezählt');
    expect(kachel.querySelector('.db-drill a')?.getAttribute('href')).toMatch(/^#isms-/);
  });

  it('zeigt die beiden Abdeckungen mit Anker-Drill-down auf existierende Seitenabschnitte', () => {
    const verdichtung = buildIsmsVerdichtung(TENANT_ID.NORDWERK);
    if (!verdichtung) throw new Error('Testfixture fehlt: Nordwerk-Verdichtung');
    const { container } = render(
      <IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );

    for (const tile of verdichtung.coverage) {
      const kachel = container.querySelector(`.db-tile[data-tile-id="${tile.id}"]`);
      if (!kachel) throw new Error(`Kachel fehlt: ${tile.id}`);
      expect(kachel.querySelector('.db-wert-zahl')?.textContent).toBe(
        `${tile.covered} von ${tile.total}`,
      );
      // Der Anker zeigt auf einen real existierenden Abschnitt dieser Seite (kein toter Link).
      const anker = kachel.querySelector('.db-drill a')?.getAttribute('href') ?? '';
      expect(anker.startsWith('#')).toBe(true);
      expect(container.querySelector(`[id="${anker.slice(1)}"]`)).not.toBeNull();
    }
  });

  it('zeigt für Mandanten ohne ISMS-Kernobjekte KEINEN Überblick (eigener Leerzustand)', () => {
    render(<IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.CONSULTING_OPERATOR)} />);
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Überblick aus belegten Daten' }),
    ).not.toBeInTheDocument();
  });
});

/**
 * WP-014 Slice 2 (Acceptance 10): Aus der ISMS-Ansicht führt jeder Objektname auf die
 * Objekt-360-Detailseite. Der Mandant des Links ist ausschließlich der AKTIVE Mandant der
 * Session-Simulation – hier der als Prop übergebene Mandant (Dok. 07 §17/P09).
 */
describe('IsmsContent – Verlinkung auf die Objekt-360-Seite (WP-014 Slice 2)', () => {
  const view = buildIsmsCoreView(TENANT_ID.NORDWERK);
  const kartenkoepfe = [
    ...view.risks.map((v) => v.risk),
    ...view.scenarios.map((v) => v.scenario),
    ...view.weaknesses.map((v) => v.weakness),
    ...view.controls.map((v) => v.control),
    ...view.measures.map((v) => v.measure),
    ...view.evidence.map((v) => v.evidence),
  ];

  it('verlinkt jeden Kartenkopf auf die Detailseite seines Objekts', () => {
    render(<IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />);

    expect(kartenkoepfe.length).toBeGreaterThanOrEqual(6);
    for (const ref of kartenkoepfe) {
      const heading = screen.getByRole('heading', { level: 3, name: ref.name });
      expect(within(heading).getByRole('link')).toHaveAttribute(
        'href',
        objectDetailHref(TENANT_ID.NORDWERK, ref.object_id),
      );
    }
  });

  it('verlinkt die verknüpften Objekte einer Karte (LinkItems) auf ihre Detailseite', () => {
    render(<IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />);

    const controlView = view.controls.find((c) => c.control.name === 'Backup & Recovery Control');
    if (!controlView) throw new Error('Testfixture fehlt: Control „Backup & Recovery Control"');
    const controlCard = cardByHeading(controlView.control.name);

    // Umsetzung, erfüllte Anforderung, Nachweis und Risikobezug – alle als Links.
    const verknuepft = [
      ...controlView.implementations,
      ...controlView.satisfies,
      ...controlView.evidenced_by,
      ...controlView.mitigates,
    ];
    expect(verknuepft.length).toBeGreaterThanOrEqual(4);
    for (const link of verknuepft) {
      expect(within(controlCard).getByRole('link', { name: link.name })).toHaveAttribute(
        'href',
        objectDetailHref(TENANT_ID.NORDWERK, link.object_id),
      );
    }
  });

  it('adressiert JEDEN Objektlink im aktiven Mandanten (nie ein fremdes Objekt)', () => {
    const { container } = render(
      <IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );

    const nordwerkIds = new Set(
      DEMO_SEED.objects.filter((o) => o.tenant_id === TENANT_ID.NORDWERK).map((o) => o.object_id),
    );
    const prefix = objectDetailHref(TENANT_ID.NORDWERK, '');
    const hrefs = Array.from(container.querySelectorAll('a[href*="/objekt/"]')).map(
      (a) => a.getAttribute('href') ?? '',
    );

    expect(hrefs.length).toBeGreaterThanOrEqual(kartenkoepfe.length);
    for (const href of hrefs) {
      expect(href.startsWith(prefix)).toBe(true);
      expect(nordwerkIds.has(href.slice(prefix.length))).toBe(true);
    }
  });
});

/**
 * Fail-loud an der Mandantengrenze (Sicherheits-Review): ein im Mandanten nicht auflösbarer
 * Verweis darf NICHT verlinkt werden. Der Zweig ist mit dem echten Seed unerreichbar (keine
 * Dangling-Kanten) und wird deshalb mit einer synthetischen, handgebauten Karte belegt –
 * Muster `twin.test.tsx` (RelationshipList).
 */
describe('IsmsCards – nicht auflösbarer Verweis bleibt ohne Link', () => {
  it('rendert die rohe Kennung als Text statt als Objektlink', () => {
    const geisterlink: IsmsLink = {
      relationship_id: 'test-dangling',
      relationship_type: 'remediates',
      object_id: 'geist-ziel',
      name: 'geist-ziel',
      object_type: 'unbekannt',
      resolved: false,
      assertion_kind: 'assertiert',
    };
    const view: MeasureView = {
      measure: {
        object_id: 'test-measure',
        name: 'Synthetische Testmaßnahme',
        object_type: 'Measure',
        lifecycle_status: 'in Arbeit',
        description: '',
      },
      remediates: [geisterlink],
      mitigates: [],
    };

    const { container } = render(<MeasureCard view={view} tenantId={TENANT_ID.NORDWERK} />);

    // Der Kartenkopf verlinkt weiterhin auf das eigene Objekt; der Geisterverweis nicht.
    const hrefs = Array.from(container.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual([objectDetailHref(TENANT_ID.NORDWERK, 'test-measure')]);
    expect(screen.getByText('geist-ziel')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'geist-ziel' })).not.toBeInTheDocument();
  });
});

describe('IsmsContent – Empty-State (Mandanten ohne ISMS-Kernobjekte)', () => {
  it('zeigt für den Consulting Operator den Empty-State, obwohl er Services trägt', () => {
    render(<IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.CONSULTING_OPERATOR)} />);

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Keine ISMS-Kernobjekte für Consulting Operator Demo',
      }),
    ).toBeInTheDocument();
    // Der Leerzustand sagt ausschließlich etwas über DIESEN Mandanten.
    //
    // Bis 2026-07-23 stand hier die Erwartung „derzeit für einen anderen Demo-Mandanten
    // ausmodelliert". Der Test hat also genau die Mandantengrenzverletzung festgeschrieben, die er
    // hätte verhindern sollen: ein Nutzer ohne eigene Objekte erfuhr, dass ein FREMDER Mandant
    // welche trägt (Dok. 07, Abschnitt „Mandantenfähigkeit, Rechte und Datenschutz" / P09).
    // Gefunden erst, als derselbe Defekt in WP-017 ein zweites Mal entstand.
    expect(
      screen.getByText(/Der Ort bleibt erreichbar und zeigt hier ausschließlich, was für diesen/),
    ).toBeInTheDocument();
    expect(document.body.textContent ?? '').not.toMatch(/anderen? (Demo-)?Mandanten/i);
    expect(document.body.textContent ?? '').not.toContain('Nordwerk Manufacturing SE');
    // Ehrlicher Hinweis: der Betreiber ist Erbringer, nicht Empfänger (UX-Review MINOR-7).
    expect(screen.getByText(/sind Managed-Service-Objekte modelliert/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services');
    // Nächster Schritt (Dok. 06 §17).
    expect(screen.getByRole('link', { name: /Mandant wechseln/ })).toHaveAttribute(
      'href',
      '/login',
    );
    // Keine der vier Inhalts-Sektionen erscheint.
    expect(screen.queryByRole('heading', { level: 2, name: 'Risiken' })).not.toBeInTheDocument();
  });

  it('zeigt für Finovia den Empty-State ohne Services-Hinweis', () => {
    render(<IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.FINOVIA)} />);

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Keine ISMS-Kernobjekte für Finovia Digital Bank AG',
      }),
    ).toBeInTheDocument();
    // Finovia trägt im Seed auch keine Services – der Hinweis darf nicht erscheinen.
    expect(screen.queryByText(/laufen Managed Services/)).not.toBeInTheDocument();
  });
});

describe('IsmsView – „nicht angemeldet" (Simulation)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('zeigt den Hinweis samt Link zur Login-Simulation', () => {
    render(
      <SessionProvider>
        <IsmsView />
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
