/**
 * Ort „Reports" (`/reports`, WP-032 Slice 2) – Acceptance Criteria 6–9.
 *
 * Geprüft wird die präsentationale `ReportsContent` mit echtem Bestand (deterministisch, keine
 * DB/kein Fetch). Die mechanischen Querschnitts-Negativbeweise (Mandantengrenze,
 * Prozessvokabular, Kontextleiste, Seitenbausteine) laufen zusätzlich in den vier Wächtern
 * unter `components/__tests__/`; hier stehen die inhaltlichen Belege des Ortes.
 *
 * DREI FEHLERKLASSEN, die hier besonders teuer wären und deshalb einzeln negativ bewiesen
 * werden: eine Erzeugungs-/Exportaktion, eine Preisangabe und eine erfundene Wertung
 * (Ampel/Score/Trend/Prozent) über den aktiven Mandanten.
 */
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { ReportsContent } from '../ReportsContent';
import { buildReportGrundlage } from '../../../lib/reports/data';
import {
  CLAIM_BESTANDTEILE,
  CONTENT_BLOCK_TYPEN,
  ENGINE_VERHINDERT,
  MANUELLE_INHALTE,
  PRESENTATION_CASES,
  REPORT_GRUPPEN,
  REPORT_LEBENSZYKLUS,
  REPORT_PACKAGE_FELDER,
  SNAPSHOT_BESTANDTEILE,
  reportTypenAnzahl,
} from '../../../lib/reports/katalog';
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
 * Sichtbarer Text OHNE die querschnittliche Kontextleiste – gleiche Begründung wie auf dem Ort
 * „Administration": `PageContextBar` rendert die Produktrolle als „R02 · …", und dieses Format
 * verlangt der Kontextleisten-Wächter ausdrücklich. Die Rollencode-Freiheit des UI gehört zum
 * app-weiten Sprachdurchgang, nicht zu dieser Seite (bekannter Regelkonflikt).
 */
function textOhneKontextleiste(container: HTMLElement): string {
  const klon = container.cloneNode(true) as HTMLElement;
  for (const leiste of Array.from(
    klon.querySelectorAll('section[aria-label="Kontext dieser Seite"]'),
  )) {
    leiste.remove();
  }
  return klon.textContent ?? '';
}

describe('Reports – AC 6: Struktur vollständig und quellentreu', () => {
  it('zeigt alle Berichts- und Artefakttypen der fünf Gruppen', () => {
    const { container } = render(
      <ReportsContent role={role('R02')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';

    expect(
      screen.getByRole('heading', { level: 2, name: 'Welche Berichte die Plattform vorsieht' }),
    ).toBeInTheDocument();
    expect(reportTypenAnzahl()).toBe(43);
    for (const gruppe of REPORT_GRUPPEN) {
      expect(text, `Gruppe „${gruppe.titel}" fehlt`).toContain(gruppe.titel);
      for (const typ of gruppe.typen) {
        expect(text, `Berichtstyp „${typ.name}" fehlt`).toContain(typ.name);
      }
    }
  });

  it('zeigt den kanonischen Case-Katalog samt Nicht-Abschließend-Hinweis', () => {
    const { container } = render(
      <ReportsContent role={role('R02')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';
    for (const fall of PRESENTATION_CASES) {
      expect(text, `Fall „${fall.name}" fehlt`).toContain(fall.name);
      expect(text, `Beschreibung von „${fall.name}" fehlt`).toContain(fall.inhalt);
    }
    expect(text).toContain('nicht abschließend');
  });

  it('zeigt Report-Package-Pflichtfelder, Lebenszyklus und Bausteintypen mit Mindestanforderung', () => {
    const { container } = render(
      <ReportsContent role={role('R02')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';

    for (const feld of REPORT_PACKAGE_FELDER) {
      expect(text, `Pflichtfeld „${feld.feld}" fehlt`).toContain(feld.feld);
      expect(text, `Bedeutung von „${feld.feld}" fehlt`).toContain(feld.bedeutung);
    }
    for (const station of REPORT_LEBENSZYKLUS) {
      expect(text, `Lebenszyklus-Station „${station}" fehlt`).toContain(station);
    }
    for (const block of CONTENT_BLOCK_TYPEN) {
      expect(text, `Bausteintyp „${block.name}" fehlt`).toContain(block.name);
      expect(text, `Mindestanforderung von „${block.name}" fehlt`).toContain(
        block.mindestanforderung,
      );
    }
    // Die Ehrlichkeitsliste der Quelle ist vollständig sichtbar.
    for (const punkt of ENGINE_VERHINDERT) {
      expect(text, `Ausschluss „${punkt}" fehlt`).toContain(punkt);
    }
  });
});

describe('Reports – AC 7: belegbare Datengrundlage ohne Wertung', () => {
  it('zeigt gezählte Grundgesamtheiten des aktiven Mandanten mit Ermittlungsregel', () => {
    render(<ReportsContent role={role('R02')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const grundlage = screen
      .getByRole('heading', { level: 2, name: 'Datengrundlage von Nordwerk Manufacturing SE' })
      .closest('section');
    if (!grundlage) throw new Error('Abschnitt „Datengrundlage" fehlt');
    const text = (grundlage as HTMLElement).textContent ?? '';

    const model = buildReportGrundlage(tenant(TENANT_ID.NORDWERK));
    expect(model.isEmpty).toBe(false);
    for (const gruppe of model.gruppen) {
      const summe = gruppe.posten.reduce((s, p) => s + p.anzahl, 0);
      if (summe === 0) continue;
      expect(text, `Gruppe „${gruppe.titel}" fehlt`).toContain(gruppe.titel);
      for (const posten of gruppe.posten) {
        const bezeichnung = posten.anzahl === 1 ? posten.bezeichnungEinzahl : posten.bezeichnung;
        expect(text, `Posten „${posten.bezeichnung}" fehlt`).toContain(
          `${posten.anzahl} ${bezeichnung}`,
        );
        expect(text, `Ermittlungsregel zu „${posten.bezeichnung}" fehlt`).toContain(
          posten.ermittlung,
        );
      }
    }

    // Drill-down auf die zuständigen Fachorte – mandantenfreie Routen.
    for (const href of ['/isms', '/services', '/entscheidungen']) {
      expect(
        within(grundlage as HTMLElement)
          .getAllByRole('link')
          .some((link) => link.getAttribute('href') === href),
        `Drill-down „${href}" fehlt`,
      ).toBe(true);
    }
  });

  it('keine Zuordnung Bericht ↔ Objekt und keine Wertung im Grundlagen-Abschnitt', () => {
    const { unmount } = render(
      <ReportsContent role={role('R02')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const grundlage = screen
      .getByRole('heading', { level: 2, name: 'Datengrundlage von Nordwerk Manufacturing SE' })
      .closest('section');
    const text = (grundlage as HTMLElement).textContent ?? '';

    // Die Seite sagt ausdrücklich, dass sie keine Zuordnung trifft.
    expect(text).toContain('Welcher Bericht welches Material verwendet');
    // … und rendert im Grundlagen-Abschnitt keinen Berichtstyp-Namen als Zuordnung.
    for (const name of ['Executive One-Pager', 'Investment Brief', 'Audit Readiness Pack']) {
      expect(text, `Zuordnung zu „${name}" im Grundlagen-Abschnitt`).not.toContain(name);
    }
    // Keine Wertung: kein Prozent, keine Ampel, kein Score, kein Reifegrad ÜBER DEN MANDANTEN.
    for (const verboten of [
      /\d+\s?%/,
      /\bgrün\b/i,
      /\bgelb\b/i,
      /\brot\b/i,
      /\bScore\b/i,
      /\bReifegrad\b/i,
      /vollständig belegt/i,
    ]) {
      expect(text, `Wertung „${verboten}" in der Grundlage`).not.toMatch(verboten);
    }
    unmount();
  });
});

describe('Reports – AC 8: keine Erzeugung, kein Export, keine Preise', () => {
  const FIXTURES = [
    { tenantId: TENANT_ID.NORDWERK, roleId: 'R02' },
    { tenantId: TENANT_ID.CONSULTING_OPERATOR, roleId: 'R10' },
    { tenantId: TENANT_ID.FINOVIA, roleId: 'R03' },
    { tenantId: TENANT_ID.MEDICORE, roleId: null },
  ];

  for (const { tenantId, roleId } of FIXTURES) {
    it(`${tenantId} (${roleId ?? 'neutral'}): kein Bedienelement mit Erzeugungs-/Schreibsemantik`, () => {
      const { container, unmount } = render(
        <ReportsContent role={roleId ? role(roleId) : null} tenant={tenant(tenantId)} />,
      );
      // Read-only: kein Formular, kein Eingabefeld, kein Button, keine Auswahl.
      // (`details`/`summary` ist Offenlegung, keine Aktion.)
      expect(container.querySelectorAll('form, input, select, textarea, button')).toHaveLength(0);
      // Alle Links sind interne Navigation zu bestehenden Orten – kein Download, kein Export.
      for (const link of Array.from(container.querySelectorAll('a'))) {
        const href = link.getAttribute('href') ?? '';
        expect(href.startsWith('/'), `externer/erzeugender Link: ${href}`).toBe(true);
        expect(link.hasAttribute('download')).toBe(false);
      }
      unmount();
    });

    it(`${tenantId} (${roleId ?? 'neutral'}): preisfrei im gerenderten Text`, () => {
      const { container, unmount } = render(
        <ReportsContent role={roleId ? role(roleId) : null} tenant={tenant(tenantId)} />,
      );
      const text = container.textContent ?? '';
      expect(text.length).toBeGreaterThan(200); // Blindheitsschutz
      for (const verboten of [
        /€/,
        /\bEUR\b/,
        /\bUSD\b/,
        /\$/,
        /\d+\s?%/,
        /\d[\d.,]*\s?(Euro|Mio)/,
      ]) {
        expect(text, `${tenantId}: Preisangabe „${verboten}"`).not.toMatch(verboten);
      }
      unmount();
    });
  }

  it('die Nicht-Erzeugung ist ruhig benannt – am Seitenende, nicht als Eingangswand', () => {
    const { container } = render(
      <ReportsContent role={role('R02')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';
    expect(
      screen.getByRole('heading', { level: 2, name: 'Was hier heute nicht entsteht' }),
    ).toBeInTheDocument();
    expect(text).toContain('Auf dieser Seite entsteht kein Bericht');
    expect(text).toContain('Die Ausgabe als Präsentation, PDF oder Datenexport');

    // Antwort-Modus: der Lückenabschnitt steht NACH Grundlage und Struktur.
    const ueberschriften = Array.from(container.querySelectorAll('h2')).map(
      (h) => h.textContent ?? '',
    );
    expect(ueberschriften[0]).toContain('Datengrundlage von');
    expect(ueberschriften[ueberschriften.length - 1]).toBe('Was hier heute nicht entsteht');
  });

  it('die Preisstelle ist als Lücke benannt, ohne eine Zahl zu erfinden', () => {
    const { container } = render(
      <ReportsContent role={role('R02')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';
    expect(text).toContain('Im Datenbestand sind keine Preise hinterlegt');
    expect(text).toContain('kein Betrag, keine Spanne und keine Schätzung');
    // Die Strukturwörter der Quelle bleiben trotzdem stehen (Regel Null).
    expect(text).toContain('Kostenband');
    expect(text).toContain('Preisannahmen');
  });

  it('Claims, eingefrorener Datenstand und geschützte Texte erscheinen als Struktur, nicht als Inhalt', () => {
    const { container } = render(
      <ReportsContent role={role('R02')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const text = container.textContent ?? '';

    expect(text).toContain('Im Bestand ist keine solche Aussage erfasst');
    for (const teil of CLAIM_BESTANDTEILE) {
      expect(text, `Claim-Bestandteil „${teil}" fehlt`).toContain(teil);
    }
    expect(text).toContain('Es gibt hier keinen eingefrorenen Datenstand');
    for (const teil of SNAPSHOT_BESTANDTEILE) {
      expect(text, `Snapshot-Bestandteil „${teil}" fehlt`).toContain(teil);
    }
    for (const klasse of MANUELLE_INHALTE) {
      expect(text, `Schutzklasse „${klasse.feld}" fehlt`).toContain(klasse.feld);
    }
  });
});

describe('Reports – AC 9: Mandantengrenze und Leerzustand', () => {
  for (const demoTenant of DEMO_TENANTS) {
    it(`${demoTenant.tenant_id}: nennt keinen anderen Mandanten`, () => {
      const { container } = render(<ReportsContent role={role('R02')} tenant={demoTenant} />);
      const text = container.textContent ?? '';
      expect(text.length).toBeGreaterThan(200);

      for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== demoTenant.tenant_id)) {
        expect(text, `Anzeigename von ${fremd.tenant_id}`).not.toContain(fremd.display_name);
        expect(text, `Kennung von ${fremd.tenant_id}`).not.toContain(fremd.tenant_id);
      }
      // Kein Link, der einen fremden Mandanten adressiert.
      for (const link of Array.from(container.querySelectorAll('a'))) {
        const href = link.getAttribute('href') ?? '';
        for (const fremd of DEMO_TENANTS) {
          if (fremd.tenant_id !== demoTenant.tenant_id) expect(href).not.toContain(fremd.tenant_id);
        }
      }
    });
  }

  for (const tenantId of [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
    it(`${tenantId}: leere Grundlage mandantenlokal benannt, Struktur bleibt sichtbar`, () => {
      const { container, unmount } = render(
        <ReportsContent role={role('R03')} tenant={tenant(tenantId)} />,
      );
      const text = container.textContent ?? '';
      const t = tenant(tenantId);

      // Leerzustand sofort über der Falz (DR-0013 Nr. 10) und im Abschnitt.
      expect(text).toContain(`Für ${t.display_name} ist bisher kein Material erfasst`);
      expect(
        screen.getByRole('heading', { level: 3, name: 'Noch kein Material erfasst' }),
      ).toBeInTheDocument();
      // Keine Zahlenwand aus Nullen und kein erfundener Datenstand.
      expect(container.querySelectorAll('time[datetime]')).toHaveLength(0);
      // Die mandantenneutrale Konzeptstruktur bleibt vollständig sichtbar.
      expect(
        screen.getByRole('heading', { level: 2, name: 'Welche Berichte die Plattform vorsieht' }),
      ).toBeInTheDocument();
      expect(text).toContain('Executive Board Update');
      unmount();
    });
  }
});

describe('Reports – Antwort-Modus und Produktsprache (DR-0013 / DR-0011)', () => {
  it('die sichtbare Leitfrage ist die, die die Seite heute beantwortet', () => {
    const { container } = render(
      <ReportsContent role={role('R02')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const frage = container.querySelector('.tw-question')?.textContent ?? '';
    expect(frage).toContain('Welche Berichte sieht die Plattform vor');
    // Die aspirative Screenkatalog-Frage wird NICHT gerendert (sie setzt einen Generator voraus).
    expect(container.textContent ?? '').not.toContain(
      'Welche Geschichte soll aus demselben Datenstand entstehen?',
    );
  });

  it('kein internes Vokabular im eigenen Seiteninhalt', () => {
    for (const tenantId of [TENANT_ID.NORDWERK, TENANT_ID.FINOVIA]) {
      const { container, unmount } = render(
        <ReportsContent role={role('R02')} tenant={tenant(tenantId)} />,
      );
      const text = textOhneKontextleiste(container);
      expect(text.length).toBeGreaterThan(200); // Blindheitsschutz

      for (const verboten of [
        /Dok\.\s?\d/,
        /§/,
        /\d{2}-D\d{2}/,
        /\bR\d{2}\b/,
        /\bF0[1-9]\b/,
        /scope_ids|record_time|tenant_id|owner_ids|lifecycle_status/,
        /Work Package/i,
        /Screen S\d/,
        /\bSimulation\b/i,
        /Demo-Seed/i,
        /Demo-Datenbestand/i,
      ]) {
        expect(text, `${tenantId}: internes Vokabular „${verboten}"`).not.toMatch(verboten);
      }
      unmount();
    }
  });

  it('rendert ohne gewählte Rolle vollständig (neutraler Einstieg)', () => {
    const { container } = render(
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop (null = neutral, DR-0009), kein ARIA-Attribut.
      <ReportsContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect((container.textContent ?? '').length).toBeGreaterThan(200);
    for (const name of [
      'Datengrundlage von Nordwerk Manufacturing SE',
      'Welche Berichte die Plattform vorsieht',
      'Wiederverwendbare Präsentationsfälle',
      'Woraus ein Bericht besteht',
      'Was hier heute nicht entsteht',
    ]) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
  });
});
