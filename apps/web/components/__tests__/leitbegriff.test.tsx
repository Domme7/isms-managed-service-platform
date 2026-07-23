/**
 * Wächtertest: **ein Leitbegriff je Konzept – Nav-Label = Seitentitel** (WP-028 Slice 4,
 * DR-0013 Nr. 9).
 *
 * DER BEFUND, den dieser Test mechanisch macht: Der Ort „Kunden" hieß in der Navigation
 * „Kunden", auf der Seite „Digital Twin Explorer", im Aufmacher „DIGITALER
 * UNTERNEHMENSZWILLING", in der Überschrift darunter „Mandanten" und auf den Karten „Zwilling
 * ansehen" – fünf Beschriftungen für zwei Sachen, eine davon englisch. Wer sucht, was er
 * geklickt hat, findet es nicht wieder.
 *
 * FESTGELEGT (DR-0013 Nr. 9):
 *   **Mandant** = die Organisation · **Digitaler Zwilling** = ihr Objektgraph · durchgängig
 *   deutsch · **das Navigationslabel ist der Seitentitel**.
 *
 * Geprüft wird der GERENDERTE Seitentitel (h1) der Einstiegsseite jedes `live`-Ortes gegen das
 * `label` seines Navigationsortes. Die Regel ist bewusst „beginnt mit dem Nav-Label" statt
 * „ist gleich": eine Unterseite desselben Ortes darf präzisieren („Kundenbereich"), aber nicht
 * das Thema wechseln („Digital Twin Explorer").
 *
 * META-ASSERTION gegen stilles Veralten (Muster der übrigen Wächter): das Register wird gegen
 * die `live: true`-Orte aus `NAV_PLACES` abgeglichen.
 */
import { render, type RenderResult } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { AdministrationContent } from '../administration/AdministrationContent';
import { EntscheidungenContent } from '../entscheidungen/EntscheidungenContent';
import { IsmsContent } from '../isms/IsmsContent';
import { KundenStartContent } from '../kunden/KundenStartContent';
import { ReportsContent } from '../reports/ReportsContent';
import { ServicesContent } from '../services/ServicesContent';
import { WissenContent } from '../wissen/WissenContent';
import { MissionControlContent } from '../shell/MissionControlContent';
import { EigenerMandantEinstieg } from '../twin/EigenerMandantEinstieg';
import { TenantOverview } from '../twin/TenantOverview';
import { NAV_PLACES, getPlace, type PlaceId } from '../../lib/shell/places';
import { getRole, type DemoRole } from '../../lib/shell/roles';

function tenant(tenantId: string): DemoTenant {
  const found = DEMO_TENANTS.find((t) => t.tenant_id === tenantId);
  if (!found) throw new Error(`Testfixture fehlt: ${tenantId}`);
  return found;
}

function role(roleId: string): DemoRole {
  const found = getRole(roleId);
  if (!found) throw new Error(`Testfixture fehlt: ${roleId}`);
  return found;
}

const NORDWERK = tenant(TENANT_ID.NORDWERK);

/** Einstiegsseite je Live-Ort (die Seite, auf der das Navigationslabel landet). */
const EINSTIEG_JE_LIVE_ORT: Record<PlaceId, () => RenderResult> = {
  heute: () => render(<MissionControlContent role={role('R01')} tenant={NORDWERK} />),
  // Der Ort „Kunden" hat seit WP-028 Slice 4 ZWEI sphärengerechte Einstiege – beide müssen
  // denselben Titel tragen (der zweite wird unten zusätzlich geprüft).
  kunden: () => render(<TenantOverview tenants={DEMO_TENANTS} />),
  isms: () => render(<IsmsContent role={role('R03')} tenant={NORDWERK} />),
  entscheidungen: () => render(<EntscheidungenContent role={role('R03')} tenant={NORDWERK} />),
  services: () => render(<ServicesContent role={role('R08')} tenant={NORDWERK} />),
  reports: () => render(<ReportsContent role={role('R02')} tenant={NORDWERK} />),
  wissen: () => render(<WissenContent role={role('R03')} tenant={NORDWERK} />),
  administration: () => render(<AdministrationContent role={role('R12')} tenant={NORDWERK} />),
};

function h1Text(ergebnis: RenderResult): string {
  const h1 = ergebnis.container.querySelector('h1');
  if (!h1) throw new Error('Seite ohne h1 – die Seitenanatomie verlangt einen Seitentitel');
  return (h1.textContent ?? '').trim();
}

describe('Ein Leitbegriff je Konzept: Nav-Label = Seitentitel (DR-0013 Nr. 9)', () => {
  it('Meta: das Register deckt exakt die live-Orte aus NAV_PLACES ab (neuer echter Ort ⇒ hier eintragen)', () => {
    const liveOrte = NAV_PLACES.filter((p) => p.live)
      .map((p) => p.id)
      .sort();
    expect(Object.keys(EINSTIEG_JE_LIVE_ORT).sort()).toEqual(liveOrte);
  });

  for (const [ort, renderOrt] of Object.entries(EINSTIEG_JE_LIVE_ORT)) {
    it(`Ort „${ort}": der Seitentitel beginnt mit dem Navigationslabel`, () => {
      const ergebnis = renderOrt();
      const label = getPlace(ort as PlaceId).label;
      expect(h1Text(ergebnis), `${ort}: Seitentitel ≠ Navigationslabel`).toMatch(
        new RegExp(`^${label}`),
      );
      ergebnis.unmount();
    });
  }

  it('der zweite Einstieg des Ortes „Kunden" trägt denselben Titel (Ein-Unternehmens-Sicht)', () => {
    const ergebnis = render(
      <EigenerMandantEinstieg
        role={role('R01')}
        tenant={NORDWERK}
        objectCount={34}
        relationshipCount={51}
        scopeIds={['scope-nordwerk-isms-core']}
        recordedOn="2026-03-16"
        recordedOnDisplay="16.03.2026"
      />,
    );
    expect(h1Text(ergebnis)).toBe('Kunden');
    ergebnis.unmount();
  });

  it('die Unterseite „Kundenbereich" präzisiert den Ort, ohne das Thema zu wechseln', () => {
    const ergebnis = render(<KundenStartContent role={role('R03')} tenant={NORDWERK} />);
    expect(h1Text(ergebnis)).toMatch(/^Kunden/);
    ergebnis.unmount();
  });

  /**
   * Der Begriffs-Wildwuchs selbst: „Digital Twin Explorer", „Objektgraph" und „Zwilling" als
   * eigenständige Bezeichnungen sind aus der Oberfläche verschwunden. Geprüft an allen
   * Einstiegsseiten plus den beiden Kunden-Ansichten.
   */
  it('kein englischer Seitentitel und kein zweiter Name für denselben Gegenstand', () => {
    const varianten: (() => RenderResult)[] = [
      ...Object.values(EINSTIEG_JE_LIVE_ORT),
      () => render(<KundenStartContent role={role('R03')} tenant={NORDWERK} />),
    ];
    for (const renderOrt of varianten) {
      const ergebnis = renderOrt();
      const text = ergebnis.container.textContent ?? '';
      expect(text).not.toMatch(/Digital Twin/i);
      // „Objektgraph" war der zweite Name für den digitalen Zwilling.
      expect(text).not.toMatch(/Objektgraph/);
      // „Zwilling" darf nur als „digitaler Zwilling" auftreten, nie allein.
      for (const treffer of text.match(/.{0,12}Zwilling/g) ?? []) {
        expect(treffer, `„${treffer}" – Leitbegriff ist „digitaler Zwilling"`).toMatch(
          /[Dd]igitale[rn]?\s+Zwilling$/,
        );
      }
      ergebnis.unmount();
    }
  });

  it('Negativbeweis: die Regel würde einen abweichenden Titel erkennen', () => {
    const ergebnis = render(<h1>Digital Twin Explorer</h1>);
    expect(h1Text(ergebnis)).not.toMatch(/^Kunden/);
    expect(h1Text(ergebnis)).toMatch(/Digital Twin/i);
    ergebnis.unmount();
  });
});
