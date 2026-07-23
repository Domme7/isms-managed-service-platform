/**
 * Render-Tests des Ortes „Heute" – Mission Control (WP-016 Slice 2, Acceptance 1–14).
 *
 * Geprüft wird gegen den echten `DEMO_SEED` (keine Mocks):
 *  1. Leitfrage aus `places.ts`, vier Abschnitte + Ehrlichkeitsblock, Reihenfolge je Welt.
 *  2. „Wo stehe ich?": Rolle (R-ID, Produktrolle, Sphäre, Kernverantwortung), Mandant, Bestand.
 *  3. „Was ist erfasst worden?": Wellen mit deutschem Datum und Anzahl, abgeleitete Historienaussage.
 *  4. „Was weiß ich über die Datenlage?": vier Beobachtungen mit Zählung, Grundgesamtheit, Regel.
 *  5. „Wo steige ich ein?": Orte mit Bestand, je Familie ein Objekt-Einstieg, mandantentreue Links.
 *  6. Empty-States für Finovia und MediCore (keine Zahlen, keine fremden Namen/IDs).
 *  7. Identische Datenmenge über ALLE ZWÖLF Rollen (Dok. 06 06-D05).
 *  8. Negativbeweis Mandantentrennung: kein fremder Name, keine fremde ID im DOM.
 *  9. Negativbeweis Bewertung: kein Score/Ampel/Reifegrad/Trend/Prozent/Rang/Empfehlung im Text.
 * 10. Sitzungsrahmen `HeuteView`: „nicht angemeldet" und angemeldeter Zustand.
 *
 * Die im Ehrlichkeitsblock behaupteten Datenlücken werden zusätzlich GEGEN DEN DATENBESTAND
 * festgenagelt (keine `Task`-Objekte) – und die seit WP-017 belegte Lage (`Decision Record` und
 * genau eine `supersedes`-Kante) wird ebenso festgenagelt, damit der Text weder still veraltet
 * noch still zu viel behauptet.
 */
import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEMO_SEED, DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { HeuteView } from '../HeuteView';
import { MissionControlContent } from '../MissionControlContent';
import { SessionProvider } from '../SessionProvider';
import { buildDecisionRegister } from '../../../lib/entscheidungen/data';
import { buildMissionControl } from '../../../lib/heute/data';
import { framingForRole, MISSION_SECTIONS } from '../../../lib/heute/framing';
import { getPlace } from '../../../lib/shell/places';
import { DEMO_ROLES, getRole, type DemoRole } from '../../../lib/shell/roles';
import { SESSION_STORAGE_KEY, serializeSession } from '../../../lib/shell/session';

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

/** Alle sichtbaren Abschnittsüberschriften (h2) in Dokumentreihenfolge. */
function abschnittsTitel(): string[] {
  return screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent ?? '');
}

/* -----------------------------------------------------------------------------
 * 1. Seitenaufbau: Leitfrage, vier Abschnitte, Ehrlichkeitsblock
 * --------------------------------------------------------------------------- */

describe('MissionControlContent – Seitenaufbau und Abschnitte', () => {
  it('zeigt Ort, Leitfrage aus places.ts und die vier Abschnitte plus Ehrlichkeitsblock', () => {
    render(<MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />);

    expect(screen.getByRole('heading', { level: 1, name: 'Heute' })).toBeInTheDocument();
    expect(screen.getByText(getPlace('heute').question)).toBeInTheDocument();
    // Der Lead muss BEIDE Hälften der Leitfrage dementieren: „seit meinem letzten Besuch" ist
    // nicht belegt, und „was verdient Aufmerksamkeit" wird bewusst nicht beantwortet. Ohne
    // Assertion könnte dieser Satz still verschwinden – er ist die Ehrlichkeitsklammer der Seite.
    expect(screen.getByText(/ist nicht belegt – und auch/)).toBeInTheDocument();
    expect(screen.getByText(/priorisiert nicht/)).toBeInTheDocument();

    for (const section of Object.values(MISSION_SECTIONS)) {
      expect(screen.getByRole('heading', { level: 2, name: section.title })).toBeInTheDocument();
    }
    expect(
      screen.getByRole('heading', { level: 2, name: 'Was hier bewusst nicht steht' }),
    ).toBeInTheDocument();
  });

  it('ordnet die vier Abschnitte je Erlebniswelt und stellt den Ehrlichkeitsblock ans Ende', () => {
    // Alle zwölf Rollen: die gerenderte Reihenfolge entspricht exakt der Rahmung ihrer Welt.
    for (const demoRole of DEMO_ROLES) {
      const framing = framingForRole(demoRole.id);
      if (!framing) throw new Error(`Rahmung fehlt für ${demoRole.id}`);

      const { unmount } = render(
        <MissionControlContent role={demoRole} tenant={tenant(TENANT_ID.NORDWERK)} />,
      );
      expect(abschnittsTitel()).toEqual([
        ...framing.sectionOrder.map((id) => MISSION_SECTIONS[id].title),
        'Was hier bewusst nicht steht',
      ]);
      unmount();
    }

    // Gegenprobe, dass die Rahmung überhaupt unterscheidet (sonst wäre der Test wertlos).
    const executive = framingForRole('R01');
    const consulting = framingForRole('R08');
    expect(executive?.sectionOrder).not.toEqual(consulting?.sectionOrder);
  });

  it('zeigt den querschnittlichen Kontext: Rolle, Welt, Mandant, Scope und Datenstand', () => {
    render(<MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const kontext = screen.getByRole('group', { name: 'Kontext dieser Seite' });

    expect(within(kontext).getByText('R01 · Executive Sponsor')).toBeInTheDocument();
    expect(within(kontext).getByText('Executive World')).toBeInTheDocument();
    expect(within(kontext).getByText('Nordwerk Manufacturing SE')).toBeInTheDocument();
    expect(
      within(kontext).getByText(/scope-nordwerk-isms-core · scope-nordwerk-managed-service/),
    ).toBeInTheDocument();
    // Datenstand = Systemachse (record_time) der zuletzt erfassten Welle, als Kalendertag.
    // Seit WP-017 ist das die dritte Welle (Entscheidungsschicht).
    expect(within(kontext).getByText('16.03.2026')).toBeInTheDocument();
    expect(within(kontext).getByText('16.03.2026').closest('time')).toHaveAttribute(
      'dateTime',
      '2026-03-16',
    );
  });
});

/* -----------------------------------------------------------------------------
 * 2. Wo stehe ich?
 * --------------------------------------------------------------------------- */

describe('MissionControlContent – „Wo stehe ich?"', () => {
  it('nennt Rolle mit R-ID, Produktrolle, Sphäre, Kernverantwortung und Weltleitfrage', () => {
    const auditor = role('R07');
    render(<MissionControlContent role={auditor} tenant={tenant(TENANT_ID.NORDWERK)} />);

    const abschnitt = screen
      .getByRole('heading', { level: 2, name: MISSION_SECTIONS.standort.title })
      .closest('section') as HTMLElement;

    expect(within(abschnitt).getByText(auditor.id)).toBeInTheDocument();
    expect(within(abschnitt).getByText(auditor.name)).toBeInTheDocument();
    expect(within(abschnitt).getByText(auditor.sphere)).toBeInTheDocument();
    expect(within(abschnitt).getByText(auditor.responsibility)).toBeInTheDocument();
    expect(
      within(abschnitt).getByText(
        'Ist die Aussage belastbar, der Zugriff kontrolliert und der Betrieb nachvollziehbar?',
      ),
    ).toBeInTheDocument();
    // Rolle ist Perspektive, keine Berechtigung.
    expect(within(abschnitt).getByText(/dieselben Daten desselben Mandanten/)).toBeInTheDocument();
    expect(within(abschnitt).getByText(/keine Rangfolge/)).toBeInTheDocument();
    // Die Leitfrage der Erlebniswelt fragt je nach Welt nach Entscheidungen, Kurs oder Portfolio –
    // alles Dinge, die diese Seite bewusst NICHT beantwortet. Sie darf deshalb nicht ungerahmt
    // stehen (Review-Fix), sonst erzeugt sie genau die Erwartung, die der Lead ausräumt.
    expect(
      within(abschnitt).getByText(/rahmt die Erlebniswelt, nicht diese Seite/),
    ).toBeInTheDocument();
    // Kein Funktionsversprechen: die Seite sagt, was NICHT abgebildet ist, nicht was kommt.
    expect(abschnitt.textContent ?? '').toMatch(/nicht abgebildet/);
    expect(abschnitt.textContent ?? '').not.toMatch(/Work Package|entsteht in einem eigenen/);
  });

  it('wiederholt den Namen der Erlebniswelt nicht (er steht querschnittlich in der Kontextzeile)', () => {
    render(<MissionControlContent role={role('R07')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const abschnitt = screen
      .getByRole('heading', { level: 2, name: MISSION_SECTIONS.standort.title })
      .closest('section') as HTMLElement;
    const kontext = screen.getByRole('group', { name: 'Kontext dieser Seite' });

    expect(within(kontext).getByText('Assurance & Administration World')).toBeInTheDocument();
    expect(abschnitt.textContent ?? '').not.toContain('Assurance & Administration World');
  });

  it('zeigt Mandant, Branche und den aus dem Seed abgeleiteten Bestand (Nordwerk 34/51)', () => {
    const nordwerk = tenant(TENANT_ID.NORDWERK);
    render(<MissionControlContent role={role('R01')} tenant={nordwerk} />);

    const abschnitt = screen
      .getByRole('heading', { level: 2, name: MISSION_SECTIONS.standort.title })
      .closest('section') as HTMLElement;

    expect(within(abschnitt).getByText(nordwerk.display_name)).toBeInTheDocument();
    expect(within(abschnitt).getByText(nordwerk.industry)).toBeInTheDocument();
    expect(within(abschnitt).getByText('34')).toBeInTheDocument();
    expect(within(abschnitt).getByText('Objekte dieses Mandanten')).toBeInTheDocument();
    expect(within(abschnitt).getByText('51')).toBeInTheDocument();
    expect(within(abschnitt).getByText('Beziehungen dieses Mandanten')).toBeInTheDocument();
  });

  it('zeigt den Bestand des Consulting Operator (9/11)', () => {
    render(
      <MissionControlContent role={role('R08')} tenant={tenant(TENANT_ID.CONSULTING_OPERATOR)} />,
    );
    const abschnitt = screen
      .getByRole('heading', { level: 2, name: MISSION_SECTIONS.standort.title })
      .closest('section') as HTMLElement;

    expect(within(abschnitt).getByText('9')).toBeInTheDocument();
    expect(within(abschnitt).getByText('11')).toBeInTheDocument();
  });
});

/* -----------------------------------------------------------------------------
 * 3. Was ist erfasst worden?
 * --------------------------------------------------------------------------- */

describe('MissionControlContent – „Was ist erfasst worden?"', () => {
  function erfassungsAbschnitt(): HTMLElement {
    return screen
      .getByRole('heading', { level: 2, name: MISSION_SECTIONS.erfassung.title })
      .closest('section') as HTMLElement;
  }

  it('listet für Nordwerk genau drei Wellen mit Datum, Anzahl und Scope-Kennungen', () => {
    render(<MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const abschnitt = erfassungsAbschnitt();

    const wellen = within(abschnitt).getAllByRole('listitem');
    expect(wellen).toHaveLength(3);

    expect(within(wellen[0]).getByText('15.01.2026')).toBeInTheDocument();
    // Das maschinenlesbare Datum deckt sich mit dem sichtbaren Text: eine Welle ist eine
    // Tagesgruppe, eine Uhrzeit ist für sie nicht belegt (Review-Fix).
    expect(within(wellen[0]).getByText('15.01.2026').closest('time')).toHaveAttribute(
      'dateTime',
      '2026-01-15',
    );
    expect(
      within(wellen[0]).getByText(/17 Objekte · 15 Beziehungen an diesem Tag im System erfasst/),
    ).toBeInTheDocument();
    expect(
      within(wellen[0]).getByText(
        /Belegte Scope-Kennungen dieser Welle: scope-nordwerk-isms-core$/,
      ),
    ).toBeInTheDocument();

    expect(within(wellen[1]).getByText('16.02.2026')).toBeInTheDocument();
    expect(
      within(wellen[1]).getByText(/14 Objekte · 28 Beziehungen an diesem Tag im System erfasst/),
    ).toBeInTheDocument();
    expect(
      within(wellen[1]).getByText(/scope-nordwerk-isms-core, scope-nordwerk-managed-service/),
    ).toBeInTheDocument();

    // Dritte Welle (WP-017, Entscheidungsschicht) – ohne neue Scope-Kennung.
    expect(within(wellen[2]).getByText('16.03.2026')).toBeInTheDocument();
    expect(
      within(wellen[2]).getByText(/3 Objekte · 8 Beziehungen an diesem Tag im System erfasst/),
    ).toBeInTheDocument();
    expect(
      within(wellen[2]).getByText(/scope-nordwerk-isms-core, scope-nordwerk-managed-service/),
    ).toBeInTheDocument();
  });

  it('listet für den Consulting Operator genau eine Welle (16.02.2026, 9 Objekte / 11 Beziehungen)', () => {
    render(
      <MissionControlContent role={role('R08')} tenant={tenant(TENANT_ID.CONSULTING_OPERATOR)} />,
    );
    const wellen = within(erfassungsAbschnitt()).getAllByRole('listitem');

    expect(wellen).toHaveLength(1);
    expect(within(wellen[0]).getByText('16.02.2026')).toBeInTheDocument();
    expect(
      within(wellen[0]).getByText(/9 Objekte · 11 Beziehungen an diesem Tag im System erfasst/),
    ).toBeInTheDocument();
  });

  it('grenzt Erfassung von Veränderung ab und zeigt die abgeleitete Historienaussage', () => {
    const model = buildMissionControl(TENANT_ID.NORDWERK);
    if (!model) throw new Error('Testfixture fehlt: Nordwerk-Modell');

    render(<MissionControlContent role={role('R07')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const abschnitt = erfassungsAbschnitt();

    expect(
      within(abschnitt).getByRole('heading', {
        level: 3,
        name: 'Ein Erfassungszeitpunkt ist keine Veränderung',
      }),
    ).toBeInTheDocument();
    // Die Aussage stammt aus der Datenableitung, nicht aus einem konstanten Seitentext.
    // Seit WP-017 ist sie für Nordwerk BELEGT (eine Ablösekette, Dok. 07 §9 R24) – der Wächter
    // prüft deshalb die belegte Aussage samt korrektem Numerus bei genau einem Beleg.
    expect(
      within(abschnitt).getAllByText(model.historyState.statement).length,
    ).toBeGreaterThanOrEqual(1);
    expect(model.historyState.statement).toMatch(
      /Eine Versionshistorie ist im Datenbestand belegt: 1 „supersedes"-Beziehung ist erfasst/,
    );
    expect(model.historyState.statement).not.toMatch(/Beziehungen sind erfasst/);

    // Gegenprobe am ECHTEN Seed: ein Mandant ohne Ablösung behält die benannte Lücke.
    const operator = buildMissionControl(TENANT_ID.CONSULTING_OPERATOR);
    if (!operator) throw new Error('Testfixture fehlt: Operator-Modell');
    expect(operator.historyState.statement).toMatch(/keine „supersedes"-Beziehung/);

    // Ablösung ist kein Änderungsfeed – das muss der Abschnitt weiterhin aussprechen.
    expect(within(abschnitt).getByText(/kein Änderungsfeed/)).toBeInTheDocument();
  });
});

/* -----------------------------------------------------------------------------
 * 4. Was weiß ich über die Datenlage?
 * --------------------------------------------------------------------------- */

describe('MissionControlContent – „Was weiß ich über die Datenlage?"', () => {
  function datenlageAbschnitt(): HTMLElement {
    return screen
      .getByRole('heading', { level: 2, name: MISSION_SECTIONS.datenlage.title })
      .closest('section') as HTMLElement;
  }

  it('zeigt genau die vier Beobachtungen mit Zählung, Grundgesamtheit und Ermittlungsregel', () => {
    const model = buildMissionControl(TENANT_ID.NORDWERK);
    if (!model) throw new Error('Testfixture fehlt: Nordwerk-Modell');

    render(<MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const eintraege = within(datenlageAbschnitt()).getAllByRole('listitem');

    expect(eintraege).toHaveLength(4);
    expect(model.observations).toHaveLength(4);

    model.observations.forEach((observation, index) => {
      const eintrag = eintraege[index];
      expect(within(eintrag).getByText(observation.label)).toBeInTheDocument();
      expect(
        within(eintrag).getByText(new RegExp(`${observation.count} von ${observation.total} `)),
      ).toBeInTheDocument();
      expect(
        within(eintrag).getByText(`Ermittlungsregel: ${observation.method}`),
      ).toBeInTheDocument();
    });
  });

  it('nennt die belegten Zählwerte für Nordwerk (22/34, 2/2, 40/51, 3/5)', () => {
    render(<MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const abschnitt = datenlageAbschnitt();

    // Nach „von" steht der Dativ – die Zeile wird als ganzer Satz gelesen.
    expect(within(abschnitt).getByText(/22 von 34 Objekten dieses Mandanten/)).toBeInTheDocument();
    expect(
      within(abschnitt).getByText(/2 von 2 verschiedenen Scope-Kennungen dieses Mandanten/),
    ).toBeInTheDocument();
    expect(
      within(abschnitt).getByText(/40 von 51 Beziehungen dieses Mandanten/),
    ).toBeInTheDocument();
    // Seit WP-017 sind auch die drei `Decision Record`-Objekte nachweisfähig (R15); genau eines
    // trägt eine `evidences`-Kante.
    expect(
      within(abschnitt).getByText(
        /3 von 5 Objekten der Typen Control, Measure und Decision Record/,
      ),
    ).toBeInTheDocument();
  });

  it('weist eine Zählung von 0 sichtbar aus, statt sie zu unterdrücken', () => {
    render(
      <MissionControlContent role={role('R08')} tenant={tenant(TENANT_ID.CONSULTING_OPERATOR)} />,
    );
    // Der Consulting Operator trägt keine nachweisfähigen Objekttypen: 0 von 0.
    expect(
      within(datenlageAbschnitt()).getByText(
        /0 von 0 Objekten der Typen Control, Measure und Decision Record/,
      ),
    ).toBeInTheDocument();
  });
});

/* -----------------------------------------------------------------------------
 * 5. Wo steige ich ein?
 * --------------------------------------------------------------------------- */

describe('MissionControlContent – „Wo steige ich ein?"', () => {
  function einstiegAbschnitt(): HTMLElement {
    return screen
      .getByRole('heading', { level: 2, name: MISSION_SECTIONS.einstieg.title })
      .closest('section') as HTMLElement;
  }

  it('verlinkt die vier belegten Orte mit dem Bestand des aktiven Mandanten', () => {
    render(<MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const abschnitt = einstiegAbschnitt();

    expect(
      within(abschnitt).getByRole('link', { name: 'Zwilling dieses Mandanten' }),
    ).toHaveAttribute('href', `/twin/${TENANT_ID.NORDWERK}`);
    expect(within(abschnitt).getByRole('link', { name: 'ISMS' })).toHaveAttribute('href', '/isms');
    // Seit WP-017 ist auch der Ort „Entscheidungen" belegt – er fehlte hier, obwohl die
    // Überschrift „Orte mit Bestand dieses Mandanten" lautet (Review-Fix).
    expect(within(abschnitt).getByRole('link', { name: 'Entscheidungen' })).toHaveAttribute(
      'href',
      '/entscheidungen',
    );
    expect(within(abschnitt).getByRole('link', { name: 'Services' })).toHaveAttribute(
      'href',
      '/services',
    );

    expect(within(abschnitt).getByText(/34 Objekte · 51 Beziehungen/)).toBeInTheDocument();
    expect(within(abschnitt).getByText(/6 ISMS-Kernobjekte/)).toBeInTheDocument();
    expect(within(abschnitt).getByText(/3 erfasste Entscheidungen/)).toBeInTheDocument();
    expect(within(abschnitt).getByText(/3 Managed Services/)).toBeInTheDocument();

    // Die Bestandszahl stammt aus demselben Register wie die Zielseite – keine zweite Zählregel.
    expect(buildDecisionRegister(TENANT_ID.NORDWERK)?.decisions).toHaveLength(3);

    // Der Zwilling-Einstieg führt in den Workspace DIESES Mandanten, nicht ins Portfolio – die
    // Portfolio-Leitfrage des Ortes „Kunden" darf an ihm nicht stehen (Review-Fix).
    const zwilling = within(abschnitt)
      .getByRole('link', { name: 'Zwilling dieses Mandanten' })
      .closest('li') as HTMLElement;
    expect(zwilling.textContent ?? '').not.toContain(getPlace('kunden').question);
    expect(zwilling.textContent ?? '').not.toMatch(/Portfolio/);
    // Die Leitfragen der beiden Orte, deren Zielseite sie beantwortet, bleiben sichtbar.
    expect(within(abschnitt).getByText(getPlace('isms').question)).toBeInTheDocument();
    expect(within(abschnitt).getByText(getPlace('services').question)).toBeInTheDocument();
    // Die Leitfrage des Ortes „Entscheidungen" dagegen NICHT: die Zielseite beantwortet sie
    // ausdrücklich nicht, ungerahmt wäre sie hier ein Versprechen.
    const entscheidungen = within(abschnitt)
      .getByRole('link', { name: 'Entscheidungen' })
      .closest('li') as HTMLElement;
    expect(entscheidungen.textContent ?? '').not.toContain(getPlace('entscheidungen').question);
  });

  it('benennt einen Ort ohne Bestand, statt ihn auszublenden (Consulting Operator)', () => {
    render(
      <MissionControlContent role={role('R08')} tenant={tenant(TENANT_ID.CONSULTING_OPERATOR)} />,
    );
    const eintrag = within(einstiegAbschnitt())
      .getByRole('link', { name: 'Entscheidungen' })
      .closest('li') as HTMLElement;

    expect(eintrag.textContent ?? '').toMatch(/0 erfasste Entscheidungen/);
    expect(eintrag.textContent ?? '').toMatch(/im Datenbestand nichts modelliert/);
  });

  /**
   * REGRESSION (Browser-Befund aus dem Review): `.sv-item-meta` ist in `globals.css` eine
   * INLINE-Auszeichnung (nur Farbe und Schriftgröße), `.sv-item-note` dagegen `display: block`.
   * Zwei aufeinanderfolgende `.sv-item-meta` in einem Listeneintrag liefen im Browser zu einem
   * Fließtext zusammen („… 43 BeziehungenWessen digitalen Zwilling …"), weil JSX den reinen
   * Zeilenumbruch zwischen zwei Elementen entfernt.
   *
   * Geprüft wird deshalb die STRUKTUR (höchstens eine Metazeile je Eintrag, jede weitere Zeile
   * ist eine block-level Note) – `textContent` allein kann den fehlenden Umbruch nicht sehen und
   * war genau deshalb blind. Zusätzlich wird nachgewiesen, dass beide Aussagen überhaupt im
   * Eintrag stehen.
   */
  it('setzt je Listeneintrag höchstens EINE inline-Metazeile (sonst laufen zwei Zeilen zusammen)', () => {
    for (const tenantId of [TENANT_ID.NORDWERK, TENANT_ID.CONSULTING_OPERATOR]) {
      const { container, unmount } = render(
        <MissionControlContent role={role('R01')} tenant={tenant(tenantId)} />,
      );

      const eintraege = Array.from(container.querySelectorAll('.sv-items > li'));
      expect(eintraege.length).toBeGreaterThan(0);
      for (const li of eintraege) {
        const metaKinder = Array.from(li.children).filter((el) =>
          el.classList.contains('sv-item-meta'),
        );
        expect(metaKinder.length, li.textContent ?? '').toBeLessThanOrEqual(1);
      }
      unmount();
    }
  });

  it('zeigt Bestand UND Leitfrage je Objekt-Einstieg – die Leitfrage als eigene Zeile', () => {
    const model = buildMissionControl(TENANT_ID.NORDWERK);
    if (!model) throw new Error('Testfixture fehlt: Nordwerk-Modell');

    render(<MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const abschnitt = einstiegAbschnitt();

    for (const entry of model.objectEntryPoints) {
      const li = within(abschnitt)
        .getByRole('link', { name: entry.name })
        .closest('li') as HTMLElement;
      const text = li.textContent ?? '';
      expect(text).toContain(entry.objectTypeDisplay);
      expect(text).toContain(entry.familyLeitfrage);
      // Die Leitfrage steht in der block-level Note, nicht in einer zweiten Inline-Metazeile.
      expect(li.querySelector('.sv-item-note')?.textContent).toBe(entry.familyLeitfrage);
    }
  });

  it('benennt einen Ort ohne Bestand, statt ihn auszublenden (Consulting Operator: ISMS leer)', () => {
    render(
      <MissionControlContent role={role('R08')} tenant={tenant(TENANT_ID.CONSULTING_OPERATOR)} />,
    );
    const abschnitt = einstiegAbschnitt();

    expect(within(abschnitt).getByRole('link', { name: 'ISMS' })).toBeInTheDocument();
    expect(within(abschnitt).getByText(/0 ISMS-Kernobjekte/)).toBeInTheDocument();
    expect(
      within(abschnitt).getAllByText(/an diesem Ort im Datenbestand nichts modelliert/).length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('zeigt je belegter Objektfamilie genau einen Einstieg in kanonischer Reihenfolge', () => {
    const model = buildMissionControl(TENANT_ID.NORDWERK);
    if (!model) throw new Error('Testfixture fehlt: Nordwerk-Modell');

    render(<MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const abschnitt = einstiegAbschnitt();

    // Auswahlregel steht sichtbar an der Liste und ist ausdrücklich keine Priorisierung.
    expect(within(abschnitt).getByText(model.objectEntryRule)).toBeInTheDocument();

    for (const entry of model.objectEntryPoints) {
      expect(within(abschnitt).getByRole('link', { name: entry.name })).toHaveAttribute(
        'href',
        entry.href,
      );
      expect(
        // getByText normalisiert Whitespace: das trennende Leerzeichen am Ende entfällt.
        within(abschnitt).getByText(new RegExp(`^${entry.familyId} · ${entry.familyName}:$`)),
      ).toBeInTheDocument();
    }
    expect(model.objectEntryPoints.map((e) => e.familyId)).toEqual([
      'F01',
      'F02',
      'F03',
      'F06',
      'F07',
      'F08',
      'F09',
    ]);
  });

  it('adressiert jeden Objekt-Link im aktiven Mandanten (nie ein fremdes Objekt)', () => {
    const { container } = render(
      <MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );

    const eigeneIds = new Set(
      DEMO_SEED.objects.filter((o) => o.tenant_id === TENANT_ID.NORDWERK).map((o) => o.object_id),
    );
    const prefix = `/twin/${TENANT_ID.NORDWERK}/objekt/`;
    const hrefs = Array.from(container.querySelectorAll('a[href*="/objekt/"]')).map(
      (a) => a.getAttribute('href') ?? '',
    );

    expect(hrefs).toHaveLength(7);
    for (const href of hrefs) {
      expect(href.startsWith(prefix)).toBe(true);
      expect(eigeneIds.has(decodeURIComponent(href.slice(prefix.length)))).toBe(true);
    }
  });
});

/* -----------------------------------------------------------------------------
 * 6. Empty-States (Finovia, MediCore)
 * --------------------------------------------------------------------------- */

describe('MissionControlContent – Empty-States für Mandanten ohne Datenbestand', () => {
  for (const tenantId of [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
    const leer = tenant(tenantId);

    it(`zeigt für ${leer.display_name} einen ehrlichen Leerzustand mit nächstem Schritt`, () => {
      render(<MissionControlContent role={role('R01')} tenant={leer} />);

      expect(
        screen.getByRole('heading', {
          level: 4,
          name: `Kein Datenbestand für ${leer.display_name}`,
        }),
      ).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Mandant wechseln/ })).toHaveAttribute(
        'href',
        '/login',
      );
      // Keine Erfassung, keine Objekt-Einstiege – jeweils benannt, nicht versteckt.
      expect(screen.getByText(/es gibt weder Objekte noch Beziehungen/)).toBeInTheDocument();
      expect(
        screen.getByText(new RegExp(`Für ${leer.display_name} sind im Demo-Datenbestand keine`)),
      ).toBeInTheDocument();
      // Die vier Abschnitte bleiben stehen; die Zählungen weisen 0 aus.
      expect(abschnittsTitel()).toHaveLength(5);
      expect(screen.getByText(/0 von 0 Objekten dieses Mandanten/)).toBeInTheDocument();
    });

    it(`nennt für ${leer.display_name} keinen anderen Mandanten`, () => {
      const { container } = render(<MissionControlContent role={role('R01')} tenant={leer} />);
      const html = container.innerHTML;

      for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== tenantId)) {
        expect(html).not.toContain(fremd.display_name);
        expect(html).not.toContain(fremd.tenant_id);
      }
    });
  }
});

/* -----------------------------------------------------------------------------
 * 7. Gleiche Daten für alle zwölf Rollen (Dok. 06 06-D05)
 * --------------------------------------------------------------------------- */

/**
 * Datenprofil einer gerenderten Seite: alle Linkziele (und damit alle Objekt-IDs) sowie alle
 * datenführenden Textbausteine (Wellen, Zählungen, Bestände, Einstiege). Beides wird sortiert
 * verglichen, weil die Rolle die REIHENFOLGE der Abschnitte ändern darf – die Datenmenge nicht.
 */
function datenprofil(container: HTMLElement): { hrefs: string[]; werte: string[] } {
  const hrefs = Array.from(container.querySelectorAll('a[href]'))
    .map((a) => a.getAttribute('href') ?? '')
    .sort();
  const werte = Array.from(
    container.querySelectorAll(
      '.tw-stat-num, .tw-stat-label, .sv-item-name, .sv-item-meta, .sv-item-note',
    ),
  ).map((el) => el.textContent ?? '');

  // Die Kontextzeile gehört ausdrücklich dazu: dort stehen Mandant, Scope-Kennungen und
  // Datenstand – der wahrscheinlichste Ort für ein versehentliches Rollen-Gating. Ausgenommen
  // sind genau die zwei bewusst rollenabhängigen Felder (Rahmung, keine Daten).
  // WP-020 Slice 1: Label „Aktive Produktrolle" nach Dok. 06 „Sichtbarer Kontext" – die Regel
  // (alle übrigen Kontextwerte sind rollenUNabhängig) bleibt unverändert; die neuen benannten
  // Datenlücken (Vertretung, Vertraulichkeit, Vertrauensgrad) werden mitverglichen.
  const rollenabhaengig = ['Aktive Produktrolle', 'Erlebniswelt'];
  const kontextWerte = Array.from(container.querySelectorAll('.od-context > div'))
    .filter((eintrag) => !rollenabhaengig.includes(eintrag.querySelector('dt')?.textContent ?? ''))
    .map((eintrag) => eintrag.querySelector('dd')?.textContent ?? '');
  expect(kontextWerte.length).toBeGreaterThan(0);

  return { hrefs, werte: [...werte, ...kontextWerte].sort() };
}

describe('MissionControlContent – identische Datenmenge über alle zwölf Rollen', () => {
  it('zeigt für R01–R12 dieselben Objekt-IDs und dieselben Zählwerte', () => {
    expect(DEMO_ROLES).toHaveLength(12);

    let referenz: { hrefs: string[]; werte: string[] } | undefined;
    for (const demoRole of DEMO_ROLES) {
      const { container, unmount } = render(
        <MissionControlContent role={demoRole} tenant={tenant(TENANT_ID.NORDWERK)} />,
      );
      const profil = datenprofil(container);
      if (!referenz) {
        referenz = profil;
        expect(profil.hrefs.length).toBeGreaterThan(0);
        expect(profil.werte.length).toBeGreaterThan(0);
      } else {
        expect(profil).toEqual(referenz);
      }
      unmount();
    }
  });
});

/* -----------------------------------------------------------------------------
 * 8. Mandantentrennung im DOM
 * --------------------------------------------------------------------------- */

describe('MissionControlContent – Negativbeweis Mandantentrennung (Dok. 07 §17/P09)', () => {
  it('zeigt für Nordwerk keinen Namen und keine ID eines fremden Mandanten', () => {
    const { container } = render(
      <MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const html = container.innerHTML;

    for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== TENANT_ID.NORDWERK)) {
      expect(html).not.toContain(fremd.display_name);
      expect(html).not.toContain(fremd.tenant_id);
    }
    for (const object of DEMO_SEED.objects.filter((o) => o.tenant_id !== TENANT_ID.NORDWERK)) {
      expect(html).not.toContain(object.object_id);
      expect(html).not.toContain(object.display_name);
    }
  });
});

/* -----------------------------------------------------------------------------
 * 9. Keine Bewertung im gerenderten Text (WP-016 Acceptance 7)
 * --------------------------------------------------------------------------- */

/**
 * Bewertungsvokabular, das auf dieser Seite NIRGENDS vorkommen darf. Ergänzt um Partizipien und
 * Dringlichkeitswörter (Review-Fix): „empfohlen" matcht weder /empfehl/ noch /Empfehlung/ und
 * lief deshalb bisher am Wächter vorbei.
 */
const BEWERTUNG_VERBOTEN = [
  /\bScore\b/i,
  /Ampel/i,
  /Reifegrad/i,
  /\bTrend/i,
  /Prozent/i,
  /%/,
  /Schwellenwert/i,
  /\bRang\b/i,
  /Schweregrad/i,
  /Empfehlung/i,
  /empfehl/i,
  /empfohlen/i,
  /Handlungsbedarf/i,
  /dringend/i,
  /vorrangig/i,
  /bewertet/i,
  /kritisch/i,
  /Serviceangebot/i,
];

/**
 * WORTGLEICHE NEGATIONEN aus dem Produkt: Sätze, die genau dieses Vokabular ausdrücklich
 * VERNEINEN. Sie sind die ehrliche Rahmung der Seite („gezählt wird – bewertet wird nicht") und
 * dürfen nicht dadurch aus dem Produkt gedrängt werden, dass der Wächter jedes Vorkommen des
 * Wortes verbietet. Sie werden vor der Prüfung aus dem Text entfernt – und jede Ausnahme wird
 * selbst geprüft: verschwindet der Satz, schlägt der Test fehl, statt still zu verfallen.
 */
const ERLAUBTE_NEGATIONEN = [
  'Es wird nichts bewertet, gewichtet oder empfohlen.',
  'Hier wird gezählt und benannt, nicht bewertet:',
];

/**
 * Zusätzlich verboten in den vier Datenabschnitten. Im Ehrlichkeitsblock sind diese Begriffe
 * zulässig und notwendig: dort wird BENANNT, dass der Objektvertrag kein Feld für Fälligkeit,
 * Aufwand, Kapazität oder Priorität kennt. Eine benannte Lücke ist keine Bewertung.
 */
const NUR_IM_LUECKENBLOCK = [/\bFrist/i, /fällig/i, /Priorität/i];

describe('MissionControlContent – kein Score, keine Ampel, keine Empfehlung', () => {
  it('enthält für keine der zwölf Rollen Bewertungsvokabular im sichtbaren Text', () => {
    for (const demoRole of DEMO_ROLES) {
      for (const tenantId of [
        TENANT_ID.NORDWERK,
        TENANT_ID.CONSULTING_OPERATOR,
        TENANT_ID.FINOVIA,
      ]) {
        const { container, unmount } = render(
          <MissionControlContent role={demoRole} tenant={tenant(tenantId)} />,
        );
        let text = container.textContent ?? '';
        for (const negation of ERLAUBTE_NEGATIONEN) {
          expect(
            text,
            `${demoRole.id}/${tenantId}: die begründete Ausnahme „${negation}" steht nicht mehr im Text`,
          ).toContain(negation);
          text = text.split(negation).join(' ');
        }
        for (const muster of BEWERTUNG_VERBOTEN) {
          expect(
            muster.test(text),
            `${demoRole.id}/${tenantId}: „${muster}" darf nicht im Text stehen`,
          ).toBe(false);
        }

        // Die vier Datenabschnitte ohne den Ehrlichkeitsblock.
        const klon = container.cloneNode(true) as HTMLElement;
        klon.querySelector('section[aria-labelledby="heute-luecke"]')?.remove();
        const datentext = klon.textContent ?? '';
        for (const muster of NUR_IM_LUECKENBLOCK) {
          expect(
            muster.test(datentext),
            `${demoRole.id}/${tenantId}: „${muster}" darf nicht in den Datenabschnitten stehen`,
          ).toBe(false);
        }
        unmount();
      }
    }
  });
});

/* -----------------------------------------------------------------------------
 * 10. Ehrlichkeitsblock – Aussagen gegen den Datenbestand festgenagelt
 * --------------------------------------------------------------------------- */

describe('MissionControlContent – Ehrlichkeitsblock „Was hier bewusst nicht steht"', () => {
  function lueckenAbschnitt(): HTMLElement {
    return screen
      .getByRole('heading', { level: 2, name: 'Was hier bewusst nicht steht' })
      .closest('section') as HTMLElement;
  }

  it('benennt Morning Mission, Veränderungsfeed und Wiederaufnahme mit ihrer Ursache', () => {
    render(<MissionControlContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const abschnitt = lueckenAbschnitt();

    expect(
      within(abschnitt).getByText('Morning Mission (Tagesmission mit Reihenfolge)'),
    ).toBeInTheDocument();
    expect(within(abschnitt).getByText(/Veränderungsfeed/)).toBeInTheDocument();
    expect(within(abschnitt).getByText(/Wiederaufnahme/)).toBeInTheDocument();

    // Kanonischer Typname: `OBJECT_TYPE_LABEL_DE` (einzige Quelle deutscher Glossen) führt für
    // „Task" bewusst keine Übersetzung – hier wird keine erfunden.
    expect(within(abschnitt).getByText(/keine Objekte des Typs\s+„Task"/)).toBeInTheDocument();
    expect(abschnitt.textContent ?? '').not.toMatch(/Aufgabe \(Task\)|Entscheidung \(Decision/);
    // WP-017: Der Satz darf NICHT mehr behaupten, es gäbe keine `Decision Record`-Objekte –
    // seit der Entscheidungsschicht wäre das falsch.
    expect(abschnitt.textContent ?? '').not.toMatch(/„Decision Record"/);
    expect(
      within(abschnitt).getByText(/kein Ereignis- und kein Änderungsobjekt/),
    ).toBeInTheDocument();
    // Ablösung ≠ Änderungsfeed: die belegte Historie darf nicht zum Ereignisstrom umgedeutet werden.
    expect(within(abschnitt).getByText(/ergibt kein „neu seit …"/)).toBeInTheDocument();
    expect(within(abschnitt).getByText(/keinen Besuchszeitpunkt/)).toBeInTheDocument();
    // Datenlücke statt Roadmap: kein Termin- und kein Funktionsversprechen.
    expect(within(abschnitt).getByText(/kein Zeitplan/)).toBeInTheDocument();
    expect(abschnitt.textContent ?? '').not.toMatch(/kommt bald|in Kürze|geplant für/i);
  });

  it('deckt sich mit dem Datenbestand: KEINE Task-Objekte (Beleg für die fehlende Morning Mission)', () => {
    // Diese Hälfte des Wächters bleibt hart: `Task` (F08) hat in Dok. 07 §9 keine einzige
    // Beziehungszeile und wird deshalb bewusst nicht materialisiert (O-WP017-01). Sobald ein
    // `Task`-Objekt entsteht, ist die Begründung auf der Seite zu prüfen.
    expect(DEMO_SEED.objects.filter((o) => o.object_type === 'Task')).toEqual([]);
  });

  it('deckt sich mit dem Datenbestand: Decision Records und GENAU EINE supersedes-Kante sind belegt', () => {
    // Zweite Hälfte des vormals gemeinsamen Wächters: seit WP-017 ist diese Lage belegt statt
    // leer. Sie wird hier festgenagelt, damit der Ehrlichkeitsblock nicht still zu viel oder zu
    // wenig behauptet.
    const entscheidungen = DEMO_SEED.objects.filter((o) => o.object_type === 'Decision Record');
    expect(entscheidungen.length).toBeGreaterThanOrEqual(1);
    expect([...new Set(entscheidungen.map((o) => o.tenant_id))]).toEqual([TENANT_ID.NORDWERK]);

    const ablösungen = DEMO_SEED.relationships.filter((r) => r.relationship_type === 'supersedes');
    expect(ablösungen).toHaveLength(1);

    // Die Ablösung ist FACHLICH modelliert: keine Datensatzversion, kein Ersetzungszeitpunkt
    // (O-WP017-07). Beides bleibt damit weiterhin ehrlich als „nicht genutzt" beschreibbar.
    expect(DEMO_SEED.objects.filter((o) => o.version !== 1)).toEqual([]);
    expect(DEMO_SEED.objects.filter((o) => o.record_time.replaced_at)).toEqual([]);
  });
});

/* -----------------------------------------------------------------------------
 * 11. Sitzungsrahmen
 * --------------------------------------------------------------------------- */

describe('HeuteView – Sitzungsrahmen (Simulation)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('zeigt ohne Anmeldung den Hinweis samt Link zur Login-Simulation', () => {
    render(
      <SessionProvider>
        <HeuteView />
      </SessionProvider>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Heute' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Nicht angemeldet (Simulation)' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Zur Anmelde-Simulation/ })).toHaveAttribute(
      'href',
      '/login',
    );
  });

  it('rendert mit gewählter Rolle und gewähltem Mandanten die Mission-Control-Inhalte', () => {
    window.localStorage.setItem(
      SESSION_STORAGE_KEY,
      serializeSession({ roleId: 'R03', tenantId: TENANT_ID.NORDWERK }),
    );

    render(
      <SessionProvider>
        <HeuteView />
      </SessionProvider>,
    );

    expect(screen.getByText(getPlace('heute').question)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: MISSION_SECTIONS.standort.title }),
    ).toBeInTheDocument();
    expect(screen.getByText('R03 · ISMS Manager')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Nicht angemeldet (Simulation)' })).toBeNull();
  });
});
