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

import { DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { IsmsContent } from '../IsmsContent';
import { IsmsView } from '../IsmsView';
import { SessionProvider } from '../../shell/SessionProvider';

function tenant(tenantId: string): DemoTenant {
  const found = DEMO_TENANTS.find((t) => t.tenant_id === tenantId);
  if (!found) throw new Error(`Testfixture fehlt: ${tenantId}`);
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
    render(<IsmsContent tenant={tenant(TENANT_ID.NORDWERK)} />);

    expect(
      screen.getByText('Wie ist die Risiko- und Control-Lage von Nordwerk Manufacturing SE?'),
    ).toBeInTheDocument();

    for (const section of ['Risiken', 'Controls', 'Maßnahmen', 'Nachweise']) {
      expect(screen.getByRole('heading', { level: 2, name: section })).toBeInTheDocument();
    }
  });

  it('zeigt die Risiko-Karte mit Herkunfts-Kette in Klartext (Szenario, Threat, Weakness, affects)', () => {
    render(<IsmsContent tenant={tenant(TENANT_ID.NORDWERK)} />);

    // Risiko mit Status als Text (nie nur Farbe, Dok. 06 06-D11).
    const riskCard = cardByHeading('Betriebsunterbrechung Auftragsabwicklung');
    expect(within(riskCard).getByText('Risiko (Risk) · Status: behandelt')).toBeInTheDocument();
    // Betroffenheit über die reale affects-Kante mit deutschem Label.
    expect(within(riskCard).getByText(/betrifft \(affects\)/)).toBeInTheDocument();
    expect(within(riskCard).getByText('Auftragsabwicklung')).toBeInTheDocument();

    // Szenario-Karte: Threat-Herkunft (bedroht/threatens) inkl. weiterer Bedrohungsziele.
    const scenarioCard = cardByHeading('Verschlüsselung der Auftragsdaten durch Ransomware');
    expect(within(scenarioCard).getByText(/bedroht \(threatens\)/)).toBeInTheDocument();
    expect(
      within(scenarioCard).getByText('Ransomware-Angriff auf Produktionsnetz'),
    ).toBeInTheDocument();
    expect(
      within(scenarioCard).getByText(/bedroht außerdem: Kundenauftragsdaten/),
    ).toBeInTheDocument();

    // Schwachstellen-Karte: Exposition (exponiert/exposes) auf das Asset.
    const weaknessCard = cardByHeading('Ungepatchte ERP-Integrationsschnittstelle');
    expect(within(weaknessCard).getByText(/exponiert \(exposes\)/)).toBeInTheDocument();
    expect(within(weaknessCard).getByText('Kundenauftragsdaten')).toBeInTheDocument();
  });

  it('weist Control „wirksam" und Implementation „implementiert" getrennt aus (08-D07)', () => {
    render(<IsmsContent tenant={tenant(TENANT_ID.NORDWERK)} />);
    const controlCard = cardByHeading('Backup & Recovery Control');

    // Control-Status als eigener Text an der Karte …
    expect(within(controlCard).getByText('Control · Status: wirksam')).toBeInTheDocument();

    // … und der Implementierungsstatus getrennt an der Implementation-Zeile.
    const impl = within(controlCard).getByText('Backup-Job Werk Nord (ERP)');
    expect(impl.parentElement?.textContent).toMatch(/Status: implementiert/);
    // Die Implementation-Zeile behauptet KEINE Wirksamkeit.
    expect(impl.parentElement?.textContent).not.toMatch(/wirksam/);

    // Requirement + Framework über satisfies/part_of.
    const requirement = within(controlCard).getByText('A.8.13 – Informationssicherung (Backup)');
    expect(requirement.parentElement?.textContent).toMatch(
      /Framework: ISO\/IEC 27001:2022 \(Demo-Katalog\)/,
    );

    // Evidence-Stand mit Kantenstatus (evidences).
    const evidenceItem = within(controlCard).getByText('Restore-Test-Protokoll Q2/2026');
    expect(evidenceItem.parentElement?.textContent).toMatch(/Kantenstatus: geprüft/);
  });

  it('zeigt Maßnahmen- und Nachweis-Karte mit Status und Bezug', () => {
    render(<IsmsContent tenant={tenant(TENANT_ID.NORDWERK)} />);

    const measureCard = cardByHeading('Härtung & Patch-Management ERP-Schnittstelle');
    expect(
      within(measureCard).getByText('Maßnahme (Measure) · Status: in Arbeit'),
    ).toBeInTheDocument();
    expect(within(measureCard).getByText(/behebt \(remediates\)/)).toBeInTheDocument();

    const evidenceCard = cardByHeading('Restore-Test-Protokoll Q2/2026');
    expect(
      within(evidenceCard).getByText('Nachweis (Evidence) · Status: akzeptiert'),
    ).toBeInTheDocument();
    expect(within(evidenceCard).getByText('Backup & Recovery Control')).toBeInTheDocument();
  });
});

describe('IsmsContent – Empty-State (Mandanten ohne ISMS-Kernobjekte)', () => {
  it('zeigt für den Consulting Operator den Empty-State, obwohl er Services trägt', () => {
    render(<IsmsContent tenant={tenant(TENANT_ID.CONSULTING_OPERATOR)} />);

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'Keine ISMS-Kernobjekte für Consulting Operator Demo',
      }),
    ).toBeInTheDocument();
    // Aus dem Seed abgeleitet: Nordwerk ist der (einzige) ausmodellierte ISMS-Mandant.
    expect(
      screen.getByText(/derzeit für Nordwerk Manufacturing SE ausmodelliert/),
    ).toBeInTheDocument();
    // Ehrlicher Hinweis: Services laufen (Ort „Services"), aber kein eigener ISMS-Kerngraph.
    expect(screen.getByText(/laufen Managed Services/)).toBeInTheDocument();
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
    render(<IsmsContent tenant={tenant(TENANT_ID.FINOVIA)} />);

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
