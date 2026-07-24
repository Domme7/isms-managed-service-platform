/**
 * Servicekatalog ansehen (`/services/katalog`, WP-006 Slice 2) – Acceptance Criteria 6–9.
 *
 * Geprüft wird die präsentationale `ServicekatalogContent` mit echtem `DEMO_SEED` (deterministisch,
 * keine DB/kein Fetch). Die Kundensphäre-Negativbeweise laufen zusätzlich im Wächter
 * `leerzustand-mandantengrenze.test.tsx`; hier stehen die inhaltlichen Belege.
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { ServicekatalogContent } from '../ServicekatalogContent';
import {
  PAKETFAMILIEN,
  SERVICEFAMILIEN,
  SERVICE_OFFERS,
  SERVICE_TIEFEN,
} from '../../../lib/services/katalog';
import { getRole, type DemoRole } from '../../../lib/shell/roles';

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

describe('Servicekatalog – Slice 2', () => {
  it('AC6: zeigt alle 12 Familien, 15 Offers, 4 Tiefen und 6 Pakete vollständig und quellentreu', () => {
    const { container } = render(
      <ServicekatalogContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';

    for (const familie of SERVICEFAMILIEN) {
      expect(text, `Familie ${familie.id} fehlt`).toContain(familie.name);
      expect(text, `Outcome ${familie.id} fehlt`).toContain(familie.outcome);
    }
    for (const offer of SERVICE_OFFERS) {
      expect(text, `Offer ${offer.id} fehlt`).toContain(offer.name);
    }
    for (const tiefe of SERVICE_TIEFEN) {
      expect(text, `Tiefe ${tiefe.id} fehlt`).toContain(tiefe.kurzname);
    }
    for (const paket of PAKETFAMILIEN) {
      expect(text, `Paket ${paket.name} fehlt`).toContain(paket.name);
    }
  });

  it('AC7: preisfrei – kein Währungszeichen/EUR/Zahlenband; Preisstellen sind benannte Lücken', () => {
    for (const tenantId of [TENANT_ID.NORDWERK, TENANT_ID.CONSULTING_OPERATOR, TENANT_ID.FINOVIA]) {
      const { container, unmount } = render(
        <ServicekatalogContent role={role('R03')} tenant={tenant(tenantId)} />,
      );
      const text = container.textContent ?? '';
      for (const verboten of [
        /€/,
        /\bEUR\b/,
        /\bUSD\b/,
        /\$/,
        /\d+\s?%/,
        /\d[\d.,]*\s?(Euro|Mio)/,
      ]) {
        expect(text, `Servicekatalog/${tenantId}: „${verboten}"`).not.toMatch(verboten);
      }
      // Die Preisstellen (Angebotskarte-Frage 8, Paketbestandteil) erscheinen als benannte Lücke.
      expect(text).toContain('Wie wird der Preis gebildet?');
      expect(text).toMatch(/bewusst ohne Preise|nicht hinterlegt – der Katalog ist bewusst ohne/);
      unmount();
    }
  });

  it('AC8: zwei getrennte Herkünfte, keine behauptete Zuordnung Instanz↔Offer', () => {
    const { container } = render(
      <ServicekatalogContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';
    // Herkunft (a): Konzeptstruktur.
    expect(text).toContain('Katalogstruktur aus dem Konzept');
    // Herkunft (b): Datenbestand des aktiven Mandanten – eigene, getrennte Sektion.
    expect(
      screen.getByRole('heading', { level: 2, name: 'Aktive Services dieses Mandanten' }),
    ).toBeInTheDocument();
    // Kein erfundenes Mapping: der Text sagt ausdrücklich, dass keine Zuordnung behauptet wird.
    expect(text).toContain('eine Zuordnung wird nicht behauptet');
    expect(text).toContain('keinen Bezug zu den Offers');
  });

  it('AC9: ansehen statt buchen – kein Buchungs-/Aktivierungs-Element, Stufe-2-Beschriftung vorhanden', () => {
    const { container } = render(
      <ServicekatalogContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    // Keine Bedienelemente, die eine Buchung/Aktivierung auslösen (read-only: nur Links).
    expect(container.querySelectorAll('button, input, textarea, select, form')).toHaveLength(0);
    const text = container.textContent ?? '';
    for (const verboten of [/in den Warenkorb/i, /jetzt buchen/i, /jetzt aktivieren/i, /kaufen/i]) {
      expect(text, `Buchungs-CTA „${verboten}"`).not.toMatch(verboten);
    }
    // Die Stufe-2-Beschriftung (Buchung erst nach menschlicher Freigabe) ist vorhanden.
    expect(text).toMatch(/erst nach menschlicher Freigabe/);
  });

  it('neutral: rendert vollständig ohne Rolle (Kundenrollen-Rahmung ist Betonung, keine Bedingung)', () => {
    const { container } = render(
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop (null = neutral, DR-0009).
      <ServicekatalogContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';
    expect(text).toContain('Neutraler Einstieg');
    // Auch neutral ist der Katalog vollständig (Stichprobe: erste und letzte Familie/Offer).
    expect(text).toContain(SERVICEFAMILIEN[0].name);
    expect(text).toContain(SERVICE_OFFERS[SERVICE_OFFERS.length - 1].name);
  });
});
