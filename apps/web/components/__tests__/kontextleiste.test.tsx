/**
 * Wächtertest: **jede Live-Hauptseite trägt die vollständige oder ehrlich benannte
 * Kontextleiste** (WP-020 Slice 1).
 *
 * QUELLE (Regel Null, am PDF gegengelesen): Dok. 06, Abschnitt „Sichtbarer Kontext" – sechs
 * Kontextelemente: aktiver Mandant (und ggf. Organisationseinheit) · aktive Produktrolle und
 * zeitlich begrenzte Vertretung · Scope oder Objektkontext · Datenstand / letzter
 * Synchronisationszeitpunkt · Vertraulichkeitsstufe und Exportrestriktion · Vertrauensgrad bei
 * abgeleiteten Aussagen. Abschnitt „Globale Akzeptanzkriterien": „Jede Hauptseite hat
 * Leitfrage, sichtbaren Kontext und nachvollziehbare Aktion."
 *
 * Geprüft wird je Live-Hauptseite:
 *  1. Die Kontextleiste existiert (`role="group"`, „Kontext dieser Seite").
 *  2. BELEGTE Elemente zeigen belegte Werte: Mandant (Anzeigename), Produktrolle
 *     („R0x · Name"), ein Scope-/Objektkontext-Eintrag, ein Datenstand-Eintrag.
 *  3. UNBELEGTE Elemente stehen als BENANNTE DATENLÜCKE mit exakt dem gemeinsamen Text aus
 *     `CONTEXT_GAPS` (kein erfundener Wert, keine still abweichende Zweitformulierung) –
 *     Vertretung, Vertraulichkeitsstufe/Exportrestriktion, Vertrauensgrad (Muster O-WP016-08).
 *
 * META-ASSERTION gegen stilles Veralten (Muster `prozessvokabular.test.tsx`): das Register
 * unten wird gegen die `live: true`-Orte aus `NAV_PLACES` abgeglichen – ein künftiger echter
 * Ort macht diesen Test rot, bis seine Hauptseite hier mit Kontextleiste eingetragen ist.
 *
 * REICHWEITE (benannt statt behauptet): Geprüft werden die HAUPTSEITEN der Live-Orte. Die
 * Objekt-360-Detailseite trägt ihre eigene, objektbezogene Kontextzeile (Objekttyp, Version,
 * Bestätigung) aus WP-014; ihr Abgleich mit den Trust-Layer-Angaben ist ein späterer,
 * eigenständiger Schritt dieses Umbaus und wird hier nicht vorweggenommen.
 */
import { render, screen, type RenderResult } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { EntscheidungenContent } from '../entscheidungen/EntscheidungenContent';
import { IsmsContent } from '../isms/IsmsContent';
import { ServicesContent } from '../services/ServicesContent';
import { MissionControlContent } from '../shell/MissionControlContent';
import { CONTEXT_GAPS, CONTEXT_NEUTRAL_ROLE } from '../shell/PageContextBar';
import { SessionProvider } from '../shell/SessionProvider';
import { TwinContextBar } from '../twin/TwinContextBar';
import { NAV_PLACES, type PlaceId } from '../../lib/shell/places';
import { getRole, type DemoRole } from '../../lib/shell/roles';
import { SESSION_STORAGE_KEY, serializeSession } from '../../lib/shell/session';

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

/** Rendert die Kontextleiste des Ortes „Kunden" mit echter Session-Simulation (R01/Nordwerk). */
function renderTwinKontext(): RenderResult {
  window.localStorage.setItem(
    SESSION_STORAGE_KEY,
    serializeSession({ roleId: 'R01', tenantId: TENANT_ID.NORDWERK }),
  );
  return render(
    <SessionProvider>
      <TwinContextBar />
    </SessionProvider>,
  );
}

/**
 * REGISTER: je Live-Ort die Hauptseite mit Kontextleiste (Nordwerk als belegter Mandant).
 * Ein neuer `live: true`-Ort in `NAV_PLACES` macht die Meta-Assertion unten rot, bis er hier
 * eingetragen ist.
 */
const HAUPTSEITE_JE_LIVE_ORT: Partial<Record<PlaceId, () => RenderResult>> = {
  heute: () =>
    render(<MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />),
  kunden: renderTwinKontext,
  isms: () => render(<IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />),
  entscheidungen: () =>
    render(<EntscheidungenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />),
  services: () =>
    render(<ServicesContent role={role('R08')} tenant={tenant(TENANT_ID.NORDWERK)} />),
};

/** Kontextleisten-Eintrag (dt/dd) nach exaktem dt-Label. */
function eintrag(kontext: HTMLElement, label: string): { dt: string; dd: string } {
  const treffer = Array.from(kontext.querySelectorAll(':scope > div')).find(
    (div) => div.querySelector('dt')?.textContent === label,
  );
  if (!treffer) throw new Error(`Kontextleisten-Eintrag fehlt: „${label}"`);
  return {
    dt: treffer.querySelector('dt')?.textContent ?? '',
    dd: treffer.querySelector('dd')?.textContent ?? '',
  };
}

describe('Kontextleiste der Live-Hauptseiten (Dok. 06 „Sichtbarer Kontext")', () => {
  it('Meta: das Register deckt exakt die live-Orte aus NAV_PLACES ab (neuer echter Ort ⇒ hier eintragen)', () => {
    const liveOrte = NAV_PLACES.filter((p) => p.live)
      .map((p) => p.id)
      .sort();
    expect(Object.keys(HAUPTSEITE_JE_LIVE_ORT).sort()).toEqual(liveOrte);
  });

  for (const [ort, renderOrt] of Object.entries(HAUPTSEITE_JE_LIVE_ORT)) {
    it(`Ort „${ort}": belegte Elemente belegt, unbelegte als benannte Datenlücke`, () => {
      const ergebnis = renderOrt();
      const kontext = screen.getByRole('group', { name: 'Kontext dieser Seite' });

      // (2) Belegte Elemente mit belegten Werten.
      expect(eintrag(kontext, 'Aktiver Mandant').dd).toBe('Nordwerk Manufacturing SE');
      expect(eintrag(kontext, 'Aktive Produktrolle').dd).toMatch(/^R\d{2} · .+/);

      // Scope-/Objektkontext- und Datenstand-Eintrag existieren mit nicht-leerem Wert; das
      // Label ist seitenspezifisch (z. B. „Scope-Kennungen der Entscheidungen"), der
      // Achsen-Zusatz des Datenstands ist Pflicht (Systemachse, Dok. 07 §11).
      const labels = Array.from(kontext.querySelectorAll('dt')).map((dt) => dt.textContent ?? '');
      const scopeLabel = labels.find((l) => l.includes('Scope') || l.includes('Objektkontext'));
      const datenstandLabel = labels.find((l) => l.startsWith('Datenstand'));
      expect(scopeLabel, `${ort}: Scope-/Objektkontext-Eintrag fehlt`).toBeDefined();
      expect(datenstandLabel, `${ort}: Datenstand-Eintrag fehlt`).toBeDefined();
      expect(datenstandLabel).toMatch(/im System erfasst/);
      expect(eintrag(kontext, scopeLabel as string).dd.length).toBeGreaterThan(0);
      expect(eintrag(kontext, datenstandLabel as string).dd.length).toBeGreaterThan(0);
      // Nordwerk trägt einen Datenbestand: der Datenstand ist ein maschinenlesbares Datum.
      expect(kontext.querySelectorAll('time[datetime]').length).toBeGreaterThan(0);

      // (3) Unbelegte Elemente: exakt der gemeinsame Lückentext – kein erfundener Wert.
      expect(eintrag(kontext, 'Vertretung (zeitlich begrenzt)').dd).toBe(CONTEXT_GAPS.vertretung);
      expect(eintrag(kontext, 'Vertraulichkeitsstufe und Exportrestriktion').dd).toBe(
        CONTEXT_GAPS.vertraulichkeit,
      );
      expect(eintrag(kontext, 'Vertrauensgrad bei abgeleiteten Aussagen').dd).toBe(
        CONTEXT_GAPS.vertrauensgrad,
      );

      ergebnis.unmount();
    });
  }

  /**
   * NEUTRALER ZUSTAND (WP-020 Slice 2, DR-0009; AC-3-Formulierung „Rolle (oder ‚neutral')"):
   * jede Live-Hauptseite rendert auch OHNE Rolle vollständig, und die Leiste nennt exakt den
   * gemeinsamen Neutral-Text statt einer erfundenen Rolle. Meta-Absicherung wie oben: das
   * Register deckt die live-Orte ab (dieselbe Registerprüfung greift).
   */
  const NEUTRAL_JE_LIVE_ORT: Partial<Record<PlaceId, () => RenderResult>> = {
    heute: () =>
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop dieser Komponente (hier bewusst `null` = neutral, DR-0009), kein ARIA-Attribut – Fehlalarm der Regel.
      render(<MissionControlContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />),
    kunden: () => {
      window.localStorage.setItem(
        SESSION_STORAGE_KEY,
        serializeSession({ tenantId: TENANT_ID.NORDWERK }),
      );
      return render(
        <SessionProvider>
          <TwinContextBar />
        </SessionProvider>,
      );
    },
    isms: () =>
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop dieser Komponente (hier bewusst `null` = neutral, DR-0009), kein ARIA-Attribut – Fehlalarm der Regel.
      render(<IsmsContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />),
    entscheidungen: () =>
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop dieser Komponente (hier bewusst `null` = neutral, DR-0009), kein ARIA-Attribut – Fehlalarm der Regel.
      render(<EntscheidungenContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />),
    services: () =>
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop dieser Komponente (hier bewusst `null` = neutral, DR-0009), kein ARIA-Attribut – Fehlalarm der Regel.
      render(<ServicesContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />),
  };

  it('Meta: das Neutral-Register deckt exakt die live-Orte ab (neuer echter Ort ⇒ hier eintragen)', () => {
    const liveOrte = NAV_PLACES.filter((p) => p.live)
      .map((p) => p.id)
      .sort();
    expect(Object.keys(NEUTRAL_JE_LIVE_ORT).sort()).toEqual(liveOrte);
  });

  for (const [ort, renderOrt] of Object.entries(NEUTRAL_JE_LIVE_ORT)) {
    it(`Ort „${ort}": rendert ohne Rolle vollständig, Leiste nennt „neutral" statt eines Werts`, () => {
      const ergebnis = renderOrt();
      const kontext = screen.getByRole('group', { name: 'Kontext dieser Seite' });

      // Blindheitsschutz: die Seite hat wirklich Inhalt gerendert (keine Fehl-/Leerseite).
      expect((ergebnis.container.textContent ?? '').length).toBeGreaterThan(200);
      expect(eintrag(kontext, 'Aktiver Mandant').dd).toBe('Nordwerk Manufacturing SE');
      expect(eintrag(kontext, 'Aktive Produktrolle').dd).toBe(CONTEXT_NEUTRAL_ROLE);
      // Negativbeweis: es wird keine Rollen-ID erfunden.
      expect(eintrag(kontext, 'Aktive Produktrolle').dd).not.toMatch(/R\d{2}/);
      // Die drei benannten Datenlücken bleiben unverändert (neutral ändert keine Daten).
      expect(eintrag(kontext, 'Vertretung (zeitlich begrenzt)').dd).toBe(CONTEXT_GAPS.vertretung);

      ergebnis.unmount();
    });
  }

  it('leerer Mandant: die Leiste bleibt vollständig und erfindet kein Datum und keinen Scope', () => {
    // Finovia trägt keinen Objektgraphen – Datenstand/Scope müssen als ehrlicher Leerwert
    // erscheinen, nicht als erfundener Wert; die drei Lückentexte bleiben unverändert.
    const { unmount } = render(
      <IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.FINOVIA)} />,
    );
    const kontext = screen.getByRole('group', { name: 'Kontext dieser Seite' });

    expect(eintrag(kontext, 'Aktiver Mandant').dd).toBe('Finovia Digital Bank AG');
    expect(kontext.querySelectorAll('time')).toHaveLength(0);
    expect(eintrag(kontext, 'Scope-Kennungen der ISMS-Kernobjekte').dd).toBe(
      'keine Scope-Zuordnung erfasst',
    );
    expect(eintrag(kontext, 'Datenstand der ISMS-Kernobjekte (zuletzt im System erfasst)').dd).toBe(
      'kein ISMS-Kernobjekt erfasst',
    );
    expect(eintrag(kontext, 'Vertretung (zeitlich begrenzt)').dd).toBe(CONTEXT_GAPS.vertretung);
    unmount();
  });

  it('Negativbeweis: die Lückentexte behaupten keinen Wert und keine Stufe', () => {
    // Die drei Texte müssen Lücken BENENNEN („nicht erfasst"/„kein … erfasst") und dürfen
    // keine erfundene Ausprägung tragen – mechanische Absicherung der DR-0005-Grenze.
    for (const text of Object.values(CONTEXT_GAPS)) {
      expect(text).toMatch(/nicht erfasst|kein seitenweiter Wert erfasst/);
    }
  });
});
