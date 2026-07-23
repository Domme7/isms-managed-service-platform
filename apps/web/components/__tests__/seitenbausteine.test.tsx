/**
 * Wächtertest: **jeder Live-Ort trägt die sichtbare Seitenbausteine-Ehrlichkeit**
 * (WP-020 Slice 3; Dok. 06, Abschnitt „Verbindliche Seitenbausteine").
 *
 * Geprüft wird der GERENDERTE Hinweis (`SeitenbausteineHinweis`) auf den sechs Orten der
 * Konvention (fünf Live-Hauptseiten + Objekt-360-Detailseite):
 *  1. Der Hinweis existiert (Section „Seitenbausteine dieser Seite").
 *  2. Er benennt EXAKT die Bausteine, die die Zuordnung als 'ohne_traeger'/'teilweise' führt –
 *     je mit Begründung (grund bzw. fehlt) im sichtbaren Text.
 *  3. KEINE leeren Attrappen: die Seite rendert für einen Baustein ohne Träger keinen leeren
 *     Platzhalter, sondern ausschließlich die benannte Lücke im Hinweis (per Fußnote belegt).
 *
 * META-ASSERTION gegen stilles Veralten (Muster `prozessvokabular.test.tsx`): das Register
 * unten wird gegen die `live: true`-Orte aus `NAV_PLACES` abgeglichen – ein künftiger echter
 * Ort macht diesen Test rot, bis er hier samt Baustein-Zuordnung eingetragen ist.
 */
import { render, within, type RenderResult } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS, NORDWERK_OBJECT_ID, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { EntscheidungenContent } from '../entscheidungen/EntscheidungenContent';
import { IsmsContent } from '../isms/IsmsContent';
import { ServicesContent } from '../services/ServicesContent';
import { MissionControlContent } from '../shell/MissionControlContent';
import { ObjectDetailView } from '../twin/ObjectDetailView';
import { TenantOverview } from '../twin/TenantOverview';
import { NAV_PLACES } from '../../lib/shell/places';
import { getRole, type DemoRole } from '../../lib/shell/roles';
import { bausteinAbdeckung, getBaustein, type BausteinOrt } from '../../lib/shell/seitenbausteine';
import { buildObjectDetail } from '../../lib/twin/object-detail';

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

function objektModel() {
  const model = buildObjectDetail(
    TENANT_ID.NORDWERK,
    NORDWERK_OBJECT_ID.RISK_BETRIEBSUNTERBRECHUNG,
  );
  if (!model) throw new Error('Testfixture fehlt: Objekt-360-Modell');
  return model;
}

/** REGISTER: je Konventions-Ort ein Render der zugehörigen Inhaltskomponente. */
const RENDERER_JE_ORT: Record<BausteinOrt, () => RenderResult> = {
  heute: () =>
    render(<MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />),
  kunden: () => render(<TenantOverview tenants={DEMO_TENANTS} />),
  isms: () => render(<IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />),
  entscheidungen: () =>
    render(<EntscheidungenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />),
  services: () =>
    render(<ServicesContent role={role('R08')} tenant={tenant(TENANT_ID.NORDWERK)} />),
  objekt360: () => render(<ObjectDetailView model={objektModel()} />),
};

function hinweisElement(container: HTMLElement): HTMLElement {
  const hinweis = container.querySelector<HTMLElement>(
    'section[aria-label="Seitenbausteine dieser Seite"]',
  );
  if (!hinweis) throw new Error('Seitenbausteine-Hinweis fehlt');
  return hinweis;
}

describe('Seitenbausteine-Konvention auf den sechs Live-Orten (Dok. 06)', () => {
  it('Meta: das Register deckt die live-Orte aus NAV_PLACES plus Objekt-360 ab', () => {
    const liveOrte = NAV_PLACES.filter((p) => p.live)
      .map((p) => String(p.id))
      .sort();
    expect(
      Object.keys(RENDERER_JE_ORT)
        .filter((o) => o !== 'objekt360')
        .sort(),
    ).toEqual(liveOrte);
    expect(Object.keys(RENDERER_JE_ORT)).toContain('objekt360');
  });

  for (const [ort, renderOrt] of Object.entries(RENDERER_JE_ORT) as [
    BausteinOrt,
    () => RenderResult,
  ][]) {
    it(`Ort „${ort}": Hinweis vorhanden, jede Lücke benannt mit Begründung, keine Attrappen`, () => {
      const { container, unmount } = renderOrt();
      const hinweis = hinweisElement(container);
      const text = hinweis.textContent ?? '';
      // Blindheitsschutz: ohne gerenderten Text wäre jede Assertion trivial.
      expect(text.length).toBeGreaterThan(80);

      const zuordnung = bausteinAbdeckung(ort);
      const luecken = zuordnung.filter(
        (z) => z.status === 'ohne_traeger' || z.status === 'teilweise',
      );
      // Die Konvention lebt: jeder Ort hat mindestens eine ehrlich benannte Lücke.
      expect(luecken.length).toBeGreaterThan(0);

      for (const eintrag of luecken) {
        const name = getBaustein(eintrag.baustein).name;
        expect(text, `${ort}: Baustein „${name}" fehlt im Hinweis`).toContain(name);
        const begruendung = eintrag.status === 'ohne_traeger' ? eintrag.grund : eintrag.fehlt;
        expect(begruendung, `${ort}/${name}: Begründung fehlt in der Zuordnung`).toBeTruthy();
        expect(text, `${ort}/${name}: Begründung fehlt im sichtbaren Text`).toContain(
          begruendung as string,
        );
      }

      // Keine leeren Attrappen: die Fußnote sagt das ausdrücklich, und der Hinweis rendert
      // ausschließlich benannte Lücken (keinen Platzhalter-Baustein ohne Begründungstext).
      expect(
        within(hinweis).getByText(/Leere Platzhalter für fehlende Bausteine werden bewusst nicht/),
      ).toBeInTheDocument();
      for (const li of Array.from(hinweis.querySelectorAll('li'))) {
        expect((li.textContent ?? '').length, `${ort}: leerer Listeneintrag`).toBeGreaterThan(20);
      }

      unmount();
    });
  }

  it('der Hinweis bleibt auch im Leerzustand eines Mandanten stehen (Aussage über die Seite)', () => {
    const { container, unmount } = render(
      <IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.FINOVIA)} />,
    );
    expect(hinweisElement(container)).toBeInTheDocument();
    unmount();
  });
});
