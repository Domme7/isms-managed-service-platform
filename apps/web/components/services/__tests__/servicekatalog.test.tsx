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

/**
 * Geldartiges Zahlenband OHNE Währungstoken (Security-Auflage): ein Band wie „3.500-6.500 pro
 * Monat" ODER – ganz ohne Kadenzwort – „3.500 bis 6.500" bliebe von der reinen Währungstoken-
 * Liste unentdeckt, ausgerechnet an der strengsten Guardrail (O-KUNDE-01). Erfasst zwei
 * GELDGROSSE Zahlen (Tausenderpunkt/-komma oder ≥4 Ziffern), verbunden durch „-", „–" oder
 * „bis"; das Kadenzwort ist optional. Kleine Rhythmen wie „6-16 Wochen" oder Einzelzahlen wie
 * „T-180 bis Post-Audit" lösen bewusst NICHT aus (kein Fehlalarm auf legitime Rhythmen/Zahlen).
 */
const GELDBAND =
  /(?:\d{1,3}(?:[.,]\d{3})+|\d{4,})\s?(?:bis|[-–])\s?(?:\d{1,3}(?:[.,]\d{3})+|\d{4,})(?:\s?(?:pro\s?Monat|monatlich|einmalig|\/\s?Monat|Monatsbereich))?/i;

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

  it('AC7 (DR-0015 P8): zeigt die illustrativen Plattformbänder – ehrlich als Produktannahme, ohne „Demo"-Etikett', () => {
    // Die Plattformbänder sind mandantenneutral (kein Bezug auf Seed-Daten); ein Mandant genügt.
    const { container } = render(
      <ServicekatalogContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';
    // Die synthetischen Bänder aus Dok. 14 werden gezeigt (Katalog ist nicht mehr strikt preisfrei).
    expect(text).toContain('Illustrative Plattformbänder');
    expect(text).toContain('EUR 500–1.500');
    expect(text).toContain('EUR 4.000–12.000+');
    // Provider/Practice: KEINE erfundene Zahl, sondern die benannte individuelle Vereinbarung.
    expect(text).toContain('individuelle Plattform- und Portfoliovereinbarung');
    // Ehrlich als Produktannahme gekennzeichnet. (Das „Demo"-Etikett-Verbot aus DR-0011 prüft der
    // `produktsprache`-Wächter; der Bänder-Hinweistext selbst ist in `preisbaender.test.ts` gegen
    // „Demo"/„Simulation" gesichert – hier NICHT blanket auf „Simulation" prüfen, das träfe das
    // legitime Fachwort „Wirkungssimulationen".)
    expect(text).toMatch(/Produktannahmen/);
    // Weiterhin keine Fremdwährung und kein erfundener Prozent-Score.
    expect(text).not.toMatch(/\bUSD\b/);
    expect(text).not.toMatch(/\$/);
    expect(text).not.toMatch(/\d+\s?%/);
  });

  it('AC7b: die Offer-/Paket-Preisformel bleibt eine benannte Lücke (kein je-Offer-Preis erfunden)', () => {
    const { container } = render(
      <ServicekatalogContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';
    expect(text).toContain('Wie wird der Preis gebildet?');
    expect(text).toMatch(/benannte Lücke|nicht hinterlegt/);
  });

  it('GELDBAND-Wächter erkennt währungslose Geldbänder, ohne Fehlalarm auf Rhythmen', () => {
    // Negativbeweis: ein währungsloses Geldband würde die Guardrail auslösen (ohne das Muster wäre
    // es durchgerutscht) …
    expect('3.500-6.500 pro Monat', 'währungsloses Geldband muss auffallen').toMatch(GELDBAND);
    expect('3.500 bis 6.500', 'Band OHNE Kadenzwort muss auffallen').toMatch(GELDBAND);
    // … legitime Rhythmen/Einzelzahlen dürfen NICHT auslösen (kein Fehlalarm).
    expect('einmalig / 6-16 Wochen', 'kleiner Wochen-Rhythmus').not.toMatch(GELDBAND);
    expect('T-180 bis Post-Audit', 'Einzelzahl ohne zweite Zahl').not.toMatch(GELDBAND);
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
