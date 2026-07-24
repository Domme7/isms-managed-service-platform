/**
 * Render-Tests des Ortes „Heute" – Mission Control (WP-016 Slice 2, Acceptance 1–14;
 * umgebaut in WP-020 Slice 3/4: strategische Ebene 1 + Detailtiefe + Dashboard-Kacheln).
 *
 * Geprüft wird gegen den echten `DEMO_SEED` (keine Mocks):
 *  1. Sichtbare Leitfrage = die BEANTWORTETE Frage (DR-0013 Nr. 1; die aspirative Frage aus
 *     `places.ts` steht seit dem WP-028-Fixpass nachweislich NICHT mehr im DOM),
 *     Ebene-1-Abschnitt + vier WP-016-Abschnitte + Ehrlichkeitsblock, Reihenfolge je Welt.
 *  2. „Wo stehe ich?": Rolle (Produktrolle, Sphäre, Kernverantwortung), Mandant, Bestand.
 *     Der Rollencode steht seit WP-028 Slice 4 NICHT mehr im sichtbaren Text (DR-0013 Nr. 12);
 *     er bleibt Kennung im Datenmodell.
 *  3. „Was ist erfasst worden?": Wellen mit deutschem Datum und Anzahl, abgeleitete Historienaussage.
 *  4. „Was weiß ich über die Datenlage?": vier Beobachtungen mit Zählung, Grundgesamtheit, Regel.
 *  5. „Wo steige ich ein?": Orte mit Bestand, je Familie ein Objekt-Einstieg, mandantentreue Links.
 *  6. Empty-States für Finovia und MediCore (keine Zahlen, keine fremden Namen/IDs).
 *  7. Identische Datenmenge über ALLE ZWÖLF Rollen (Dok. 06 06-D05) – inklusive der Kacheln.
 *  8. Negativbeweis Mandantentrennung: kein fremder Name, keine fremde ID im DOM.
 *  9. Negativbeweis Bewertung: kein Score/Ampel/Reifegrad/Trend/Prozent/Rang/Empfehlung im Text.
 * 10. Sitzungsrahmen `HeuteView`: „nicht angemeldet" und angemeldeter Zustand.
 * 11. Detailtiefe (WP-020): Standardtiefe 1, kumulative Ebenen, Persistenz über den
 *     versionierten localStorage-Schlüssel, mandantenfreier Speicherwert, kein
 *     Informationsverlust (alle WP-016-Abschnitte über die Tiefenwahl erreichbar).
 * 12. Dashboard-Kacheln (WP-020, DR-0008): Selbsterklärung je Kachel (Struktur), „x von y",
 *     Badges nur aus der Positivliste, Datenlücken-Kachel leerer Mandanten.
 *
 * RENDER-KONVENTION SEIT WP-020: `MissionControlContent` OHNE `onTiefeChange` startet bewusst
 * in VOLLER Tiefe 3 (unkontrollierter Wächter-/Alt-Test-Modus, Begründung in der Komponente) –
 * die Alt-Assertions prüfen damit weiterhin den GESAMTEN Inhalt. Die echte Seite (`HeuteView`)
 * startet kontrolliert in der Standardtiefe 1; das prüft der Detailtiefe-Block.
 *
 * Die im Ehrlichkeitsblock behaupteten Datenlücken werden zusätzlich GEGEN DEN DATENBESTAND
 * festgenagelt (keine `Task`-Objekte) – und die seit WP-017 belegte Lage (`Decision Record` und
 * genau eine `supersedes`-Kante) wird ebenso festgenagelt, damit der Text weder still veraltet
 * noch still zu viel behauptet.
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEMO_SEED, DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';
import { HeuteView } from '../HeuteView';
import { MissionControlContent } from '../MissionControlContent';
import { SessionProvider } from '../SessionProvider';
import { buildDecisionRegister } from '../../../lib/entscheidungen/data';
import { buildMissionControl } from '../../../lib/heute/data';
import { BADGE_RULES, buildHeuteDashboard } from '../../../lib/heute/dashboard';
import { DETAILTIEFE_STORAGE_KEY } from '../../../lib/heute/detailtiefe';
import { framingForRole, MISSION_SECTIONS } from '../../../lib/heute/framing';
import {
  KANONISCHE_KACHELORDNUNG,
  NORMIERTE_ROLLEN,
  fokusLueckenTextFuer,
  kachelOrdnungForRole,
  varianteForRole,
} from '../../../lib/heute/rollenvarianten';
import { getPlace } from '../../../lib/shell/places';
import { rollenReichweiteSatz } from '../../../lib/shell/sphaere';
import { DEMO_ROLES, getRole, type DemoRole } from '../../../lib/shell/roles';
import { SESSION_STORAGE_KEY, serializeSession } from '../../../lib/shell/session';

/** Überschrift des Ebene-1-Abschnitts (WP-020 Slice 3/4). */
const EBENE1_TITEL = 'Wie ist der Stand?';

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
  /**
   * REGEL-ERHALTEND UMGESTELLT (WP-028-Fixpass, DR-0013 Nr. 1 – Muster der vier bereits
   * umgestellten Orte `/reports`, `/wissen`, `/administration`, `/entscheidungen`).
   *
   * ALTE ERWARTUNG: Die Seite rendert die aspirative Leitfrage aus `places.ts` und dementiert
   * sie weiter unten. Damit war der Wächter Mitverursacher des Rechtfertigungs-Modus – er
   * ERZWANG die Frage, die die Seite nicht beantwortet.
   * NEUE ERWARTUNG: sichtbar ist die Frage, die die Seite HEUTE beantwortet; die aspirative
   * Frage steht nachweislich NICHT im DOM (Negativbeweis, neue und strengere Bedingung).
   *
   * NICHTS ABGESCHWÄCHT: Die Ehrlichkeits-Substanz („seit meinem letzten Besuch" und eine
   * Priorisierung sind nicht belegt) wird unverändert wortgleich verlangt.
   */
  it('führt mit der Frage, die die Seite beantwortet – nicht mit der aspirativen Leitfrage', () => {
    const { container } = render(
      <MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Heute' })).toBeInTheDocument();
    const frage = container.querySelector('p.tw-question')?.textContent ?? '';
    expect(frage).toBe(
      'Wie ist der Stand von Nordwerk Manufacturing SE – was ist erfasst und wo sind die Lücken?',
    );
    // Negativbeweis: die aspirative Screenkatalog-Frage wird weder gestellt noch verneint
    // (Konzeptanker bleibt in `lib/shell/places.ts`).
    expect(container.textContent ?? '').not.toContain(getPlace('heute').question);
    // Die Ehrlichkeitsklammer bleibt – sie dementiert jetzt nichts mehr, sondern benennt ruhig,
    // was die Seite nicht beantwortet. Ohne Assertion könnte dieser Satz still verschwinden.
    expect(screen.getByText(/Nicht belegt und deshalb hier nicht beantwortet/)).toBeInTheDocument();
    expect(screen.getByText(/seit meinem letzten Besuch.*eine Priorisierung/)).toBeInTheDocument();

    // WP-020: die Ebene 1 steht als eigener Abschnitt VOR den WP-016-Abschnitten.
    expect(screen.getByRole('heading', { level: 2, name: EBENE1_TITEL })).toBeInTheDocument();
    for (const section of Object.values(MISSION_SECTIONS)) {
      expect(screen.getByRole('heading', { level: 2, name: section.title })).toBeInTheDocument();
    }
    expect(
      screen.getByRole('heading', { level: 2, name: 'Was hier bewusst nicht steht' }),
    ).toBeInTheDocument();
  });

  it('ordnet die vier Abschnitte je Erlebniswelt und stellt den Ehrlichkeitsblock ans Ende', () => {
    // Alle zwölf Rollen: die gerenderte Reihenfolge entspricht exakt der Rahmung ihrer Welt.
    // WP-020 (geplanter Umbau, Regel erhalten): NEU steht die rollenNEUTRALE Ebene 1 vorweg;
    // die Welt-Reihenfolge der WP-016-Abschnitte und der Ehrlichkeitsblock am Ende bleiben
    // unverändert die geprüfte Regel.
    for (const demoRole of DEMO_ROLES) {
      const framing = framingForRole(demoRole.id);
      if (!framing) throw new Error(`Rahmung fehlt für ${demoRole.id}`);

      const { unmount } = render(
        <MissionControlContent role={demoRole} tenant={tenant(TENANT_ID.NORDWERK)} />,
      );
      expect(abschnittsTitel()).toEqual([
        EBENE1_TITEL,
        ...framing.sectionOrder.map((id) => MISSION_SECTIONS[id].title),
        'Was hier bewusst nicht steht',
      ]);
      unmount();
    }

    // Gegenprobe, dass die Rahmung überhaupt unterscheidet (sonst wäre der Test wertlos).
    const executive = framingForRole('R01');
    const consulting = framingForRole('R08');
    expect(executive?.sectionOrder).not.toEqual(consulting?.sectionOrder);

    // WP-020 Slice 2 (DR-0009): der NEUTRALE Zustand rendert rollenlos in KANONISCHER
    // Reihenfolge – ohne Welt-Rahmung, mit demselben Ehrlichkeitsblock am Ende.
    const { unmount } = render(
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop dieser Komponente (hier bewusst `null` = neutral, DR-0009), kein ARIA-Attribut – Fehlalarm der Regel.
      <MissionControlContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(abschnittsTitel()).toEqual([
      EBENE1_TITEL,
      MISSION_SECTIONS.standort.title,
      MISSION_SECTIONS.erfassung.title,
      MISSION_SECTIONS.datenlage.title,
      MISSION_SECTIONS.einstieg.title,
      'Was hier bewusst nicht steht',
    ]);
    unmount();
  });

  it('zeigt den querschnittlichen Kontext: Rolle, Welt, Mandant, Scope und Datenstand', () => {
    render(<MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const kontext = screen.getByRole('region', { name: 'Kontext dieser Seite' });

    // Rolle mit NAMEN benannt, ohne Rollencode (DR-0013 Nr. 12).
    expect(within(kontext).getByText('Executive Sponsor')).toBeInTheDocument();
    expect(kontext.textContent ?? '').not.toMatch(/R\d{2}/);
    expect(within(kontext).getByText('Executive World')).toBeInTheDocument();
    expect(within(kontext).getByText('Nordwerk Manufacturing SE')).toBeInTheDocument();
    // SCOPE-KENNUNGEN VERLAGERT (WP-028-Fixpass, DR-0013 Nr. 2 nennt Scope-IDs unter „weg"):
    // Über der Falz steht die ZÄHLUNG, die Kennungen stehen im Aufklappteil derselben Zeile.
    // NICHTS ABGESCHWÄCHT – beides wird geprüft: die Zählung stimmt mit dem Datenbestand
    // überein, und jede belegte Kennung ist weiterhin im DOM erreichbar.
    expect(within(kontext).getByText('2 Scopes erfasst')).toBeInTheDocument();
    for (const scopeId of ['scope-nordwerk-isms-core', 'scope-nordwerk-managed-service']) {
      expect(within(kontext).getByText(scopeId), scopeId).toBeInTheDocument();
    }
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
  it('nennt Produktrolle, Sphäre, Kernverantwortung und Weltleitfrage – ohne Rollencode', () => {
    const auditor = role('R07');
    render(<MissionControlContent role={auditor} tenant={tenant(TENANT_ID.NORDWERK)} />);

    const abschnitt = screen
      .getByRole('heading', { level: 2, name: MISSION_SECTIONS.standort.title })
      .closest('section') as HTMLElement;

    // Der Rollencode ist aus dem sichtbaren Text entfallen (DR-0013 Nr. 12); die Rolle bleibt
    // über ihren Namen eindeutig benannt – die Aussage des Abschnitts ändert sich nicht.
    expect(abschnitt.textContent ?? '').not.toMatch(/\bR\d{2}\b/);
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
    // Kein Funktionsversprechen: die Seite sagt, was NICHT da ist, nicht was kommt.
    // Wortlaut seit WP-028 Slice 4 als SACH-Lücke statt als Demo-Vorbehalt („in dieser Demo
    // nicht abgebildet" → „hier noch nicht angebunden", DR-0011); die Aussage bleibt dieselbe.
    expect(abschnitt.textContent ?? '').toMatch(/noch nicht angebunden/);
    expect(abschnitt.textContent ?? '').not.toMatch(/Demo|Simulation/i);
    expect(abschnitt.textContent ?? '').not.toMatch(/Work Package|entsteht in einem eigenen/);
  });

  it('wiederholt den Namen der Erlebniswelt nicht (er steht querschnittlich in der Kontextzeile)', () => {
    render(<MissionControlContent role={role('R07')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const abschnitt = screen
      .getByRole('heading', { level: 2, name: MISSION_SECTIONS.standort.title })
      .closest('section') as HTMLElement;
    const kontext = screen.getByRole('region', { name: 'Kontext dieser Seite' });

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
    // WP-028/DR-0013: „supersedes" erscheint im Nutzertext als Klartext „Ablösungs-Beziehung".
    expect(model.historyState.statement).toMatch(
      /Eine Versionshistorie ist im Datenbestand belegt: 1 Ablösungs-Beziehung ist erfasst/,
    );
    expect(model.historyState.statement).not.toMatch(/Beziehungen sind erfasst/);

    // Gegenprobe am ECHTEN Seed: ein Mandant ohne Ablösung behält die benannte Lücke.
    const operator = buildMissionControl(TENANT_ID.CONSULTING_OPERATOR);
    if (!operator) throw new Error('Testfixture fehlt: Operator-Modell');
    expect(operator.historyState.statement).toMatch(/keine Ablösungs-Beziehung/);

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
        within(eintrag).getByText(`So wird gezählt: ${observation.method}`),
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
      within(abschnitt).getByRole('link', { name: 'Digitaler Zwilling dieses Mandanten' }),
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
      .getByRole('link', { name: 'Digitaler Zwilling dieses Mandanten' })
      .closest('li') as HTMLElement;
    expect(zwilling.textContent ?? '').not.toContain(getPlace('kunden').question);
    expect(zwilling.textContent ?? '').not.toMatch(/Portfolio/);
    // KEIN Ebene-3-Einstieg wirbt mehr mit der aspirativen Ortsleitfrage (Nachfix nach
    // Gate-Runde 2, DR-0013 Nr. 1): keine Zielseite rendert ihre `place.question` als Überschrift.
    // Vorher standen ISMS und Services hier mit ihrer aspirativen Frage – jetzt tragen alle
    // Einstiege KEINE Frage mehr (Label und Bestandsangabe genügen).
    for (const ort of ['isms', 'services', 'entscheidungen'] as const) {
      expect(abschnitt.textContent ?? '', ort).not.toContain(getPlace(ort).question);
    }
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
        // WP-028/DR-0013: die Objektfamilie erscheint ohne Familien-Code (kein „F0X · " im UI).
        within(abschnitt).getByText(new RegExp(`^${entry.familyName}:$`)),
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
      // WP-020: die Aussage steht jetzt ZWEIMAL – in der Ebene-1-Datenlücken-Kachel und im
      // WP-016-Leerzustand des Standort-Abschnitts. Beide sind gewollt; die Regel (Aussage
      // vorhanden, mandantenlokal) bleibt unverändert geprüft.
      expect(
        screen.getAllByText(new RegExp(`Für ${leer.display_name} sind im Datenbestand keine`))
          .length,
      ).toBeGreaterThanOrEqual(1);
      // Ebene 1 + die vier Abschnitte bleiben stehen; die Zählungen weisen 0 aus.
      expect(abschnittsTitel()).toHaveLength(6);
      expect(screen.getByText(/0 von 0 Objekten dieses Mandanten/)).toBeInTheDocument();
      // WP-020: die Ebene 1 zeigt für den leeren Mandanten die ehrliche Datenlücken-Kachel
      // (Badge „kein Datenbestand" mit Symbol + Text, Details im Kachel-Block unten).
      const badge = document.querySelector('.db-badge--kein_datenbestand');
      expect(badge?.textContent).toContain('kein Datenbestand');
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
      // WP-020: die Ebene-1-Kacheln und der Klartext-Zustand gehören ausdrücklich mit in den
      // Vergleich – die Ebene 1 ist rollenNEUTRAL, kein Wort darf je Rolle abweichen.
      '.tw-stat-num, .tw-stat-label, .sv-item-name, .sv-item-meta, .sv-item-note, .db-tile, .db-klartext li',
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

/**
 * KONTROLLIERT UMGESTELLTE INVARIANTE (WP-020 Slice 5 – die einzige im WP genehmigte
 * Regelevolution): Bis Slice 4 hieß die Regel „alle zwölf Rollen sehen dieselben Daten in
 * derselben Darstellung". Seit der Rollenvarianten-Personalisierung lautet sie:
 *   „Dieselben Daten bleiben für JEDE Perspektive erreichbar (keine getrennte Wahrheit,
 *    Dok. 06 P02/06-D05); eine Rolle darf ausschließlich die dokumentierte BETONUNG/
 *    REIHENFOLGE ändern – exakt nach der normativen Tabelle „Rollenvarianten" bzw. der
 *    Welt-Ableitung (O-WP020-03), geprüft im Rollenvarianten-Block unten."
 * Der Vergleich hier arbeitet deshalb SORTIERT (Datenmenge, nicht Reihenfolge); die exakte
 * Reihenfolge je Rolle prüft der Rollenvarianten-Block gegen `kachelOrdnungForRole`. Vom
 * Vergleich ausgenommen bleiben nur die dokumentiert rollenabhängigen RAHMUNGS-Texte
 * (Kontextzeile Rolle/Erlebniswelt, Welt-Rahmungsnote, Rollenfokus-Block – alles Rahmung,
 * keine Daten; der Rollenfokus nutzt eigene `rv-`Klassen und liegt damit außerhalb des
 * Datenprofils). Die Regel wurde umgebaut, nicht gelöscht.
 */
describe('MissionControlContent – dieselben Daten für alle zwölf Rollen (keine getrennte Wahrheit)', () => {
  it('zeigt für R01–R12 dieselben Objekt-IDs und dieselben Zählwerte (sortiert verglichen)', () => {
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

  it('neutral zeigt dieselben Daten wie jede Rolle (Erweiterung WP-020 Slice 2, DR-0009)', () => {
    // ERWEITERT, NICHT ABGESCHWÄCHT: der 12-Rollen-Vergleich oben bleibt unverändert; hier
    // kommt der neutrale Zustand als dreizehnte Perspektive dazu. Einzige dokumentierte,
    // selbst geprüfte Differenz: die Welt-Rahmungsnote der Rollen-Sicht (reine Rahmung der
    // Erlebniswelt-Leitfrage, kein Datum) existiert im neutralen Zustand nicht – ohne Rolle
    // gibt es keine Welt-Leitfrage, die gerahmt werden müsste.
    const WELT_RAHMUNGSNOTE =
      'Diese Leitfrage rahmt die Erlebniswelt, nicht diese Seite: hier wird gezählt und benannt.';

    const rolleRender = render(
      <MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const rolleProfil = datenprofil(rolleRender.container);
    rolleRender.unmount();

    const neutralRender = render(
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop dieser Komponente (hier bewusst `null` = neutral, DR-0009), kein ARIA-Attribut – Fehlalarm der Regel.
      <MissionControlContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const neutralProfil = datenprofil(neutralRender.container);
    neutralRender.unmount();

    // Die Ausnahme existiert wirklich (und genau einmal) – sonst verfällt sie still.
    expect(rolleProfil.werte.filter((w) => w === WELT_RAHMUNGSNOTE)).toHaveLength(1);
    expect(neutralProfil.werte).not.toContain(WELT_RAHMUNGSNOTE);

    expect(neutralProfil.hrefs).toEqual(rolleProfil.hrefs);
    expect(neutralProfil.werte).toEqual(rolleProfil.werte.filter((w) => w !== WELT_RAHMUNGSNOTE));
  });
});

/* -----------------------------------------------------------------------------
 * 7b. Rollenvarianten der Ebene 1 (WP-020 Slice 5 – AC 17)
 * --------------------------------------------------------------------------- */

/** Gerenderte Kachel-Reihenfolge (data-tile-id in DOM-Reihenfolge). */
function gerenderteKachelOrdnung(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll('.db-grid > li > .db-tile')).map(
    (el) => el.getAttribute('data-tile-id') ?? '',
  );
}

describe('MissionControlContent – Rollenvarianten (Dok. 06 Tabelle „Rollenvarianten")', () => {
  it('ordnet die Kacheln für JEDE Perspektive exakt nach der dokumentierten Variante – ohne Entzug', () => {
    // Alle zwölf Rollen + neutral: DOM-Reihenfolge == dokumentierte Ordnung; Kachel-MENGE
    // ist immer vollständig (Betonung, kein Entzug – die umgestellte Invariante).
    for (const perspektive of [...DEMO_ROLES, null]) {
      const { container, unmount } = render(
        <MissionControlContent role={perspektive} tenant={tenant(TENANT_ID.NORDWERK)} />,
      );
      const erwartet = kachelOrdnungForRole(perspektive?.id ?? null);
      const gerendert = gerenderteKachelOrdnung(container);
      expect(gerendert, perspektive?.id ?? 'neutral').toEqual([...erwartet]);
      expect([...gerendert].sort()).toEqual([...KANONISCHE_KACHELORDNUNG].sort());
      unmount();
    }
  });

  /**
   * REGEL-ERHALTEND UMGESTELLT (WP-028 Slice 3, DR-0013 Nr. 5 „Rollenfokus ohne Beipackzettel").
   *
   * ALTE ERWARTUNG: der Fokus-Kasten nennt sichtbar die Herkunft der Variante („im Konzept
   * normiert", „Tabelle „Rollenvarianten"") und trägt drei Absätze Fließtext.
   * NEUE ERWARTUNG: sichtbar ist EIN Nutzen-Satz; die Herkunfts-/Quellenangabe ist Code-Doku.
   *
   * NICHT ABGESCHWÄCHT: Die drei EHRLICHKEITS-Aussagen (Fokus-Lücken, Bestandslage beim
   * aktiven Mandanten, Erreichbarkeits-Zusage) werden weiterhin WORTGLEICH im DOM verlangt –
   * nur eben im ruhigen Aufklappteil. Neu hinzugekommen ist die Gegenprobe, dass die
   * Konzept-Theorie NICHT mehr im Produkttext steht; der Wächter ist damit strenger als vorher.
   */
  it('AC 17: die vier normierten Rollen tragen einen Nutzen-Satz und die benannten Lücken', () => {
    for (const roleId of Object.keys(NORMIERTE_ROLLEN)) {
      const { container, unmount } = render(
        <MissionControlContent role={role(roleId)} tenant={tenant(TENANT_ID.NORDWERK)} />,
      );
      const zuordnung = varianteForRole(roleId);
      if (!zuordnung.variante) throw new Error(`Variante fehlt: ${roleId}`);
      const fokus = container.querySelector('.rv-fokus');
      const text = fokus?.textContent ?? '';

      // Sichtbar über dem Aufklappteil: genau der eine Nutzen-Satz.
      expect(fokus?.querySelector('.rv-fokus-text')?.textContent, roleId).toBe(
        zuordnung.variante.nutzenSatz,
      );
      // Ehrlichkeits-Substanz vollständig im DOM (ruhig, nicht entfernt).
      expect(text, roleId).toContain(zuordnung.variante.fokusBelegtText);
      expect(text, roleId).toContain(zuordnung.variante.fokusLueckenText);
      expect(text, roleId).toContain(zuordnung.variante.ausblendungText);
      // Erreichbarkeits-Zusage (keine getrennte Wahrheit, alles über Drill-down/Tiefe).
      expect(text, roleId).toMatch(/nichts entzogen/);
      // … und sie steht wirklich im Aufklappteil, nicht als Absatzwand über den Kacheln.
      const details = fokus?.querySelector('details.rv-details');
      expect(details, roleId).not.toBeNull();
      expect(details?.textContent, roleId).toContain(zuordnung.variante.fokusLueckenText);
      // Gegenprobe: keine Konzept-Theorie mehr im Produkttext.
      for (const jargon of [
        /im Konzept normiert/,
        /gegenstandslos/,
        /reversible Anzeigeentscheidung/,
        /Tabelle „Rollenvarianten"/,
        /Quelle der Variante/,
      ]) {
        expect(jargon.test(text), `${roleId}: „${jargon}" gehört in die Code-Doku`).toBe(false);
      }
      unmount();
    }
    // Stichprobe der geforderten Lücken-Benennung (AC 17: „z. B. Freigaben, Investition").
    const executive = varianteForRole('R01').variante;
    expect(executive?.fokusLueckenText).toContain('Freigaben');
    expect(executive?.fokusLueckenText).toContain('Investition');
  });

  /**
   * REGEL-ERHALTEND UMGESTELLT (s. o.): Die Welt-Ableitung ist eine Design-Entscheidung, keine
   * Datenaussage – sie wird nicht mehr im Produkttext erklärt (Begründung: Modul-Kopf von
   * `lib/heute/rollenvarianten.ts`, O-WP020-03). Die REGEL bleibt hart geprüft: R02 erhält
   * exakt die Kachel-Reihenfolge der Executive-Variante, nichts wird erfunden.
   */
  it('Welt-Ableitung: nicht normierte Rollen erhalten die Reihenfolge ihrer Welt-Variante', () => {
    const { container, unmount } = render(
      <MissionControlContent role={role('R02')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(gerenderteKachelOrdnung(container)).toEqual([...kachelOrdnungForRole('R01')]);
    const text = container.querySelector('.rv-fokus')?.textContent ?? '';
    expect(text).toContain(varianteForRole('R02').variante?.nutzenSatz ?? '');
    expect(text).not.toContain('reversible Anzeigeentscheidung');
    unmount();
  });

  /**
   * REGEL-ERHALTEND UMGESTELLT (s. o.): Statt eines Kastens mit dem Satz „es wird keine Betonung
   * erfunden" zeigt die Seite jetzt GAR KEINEN Rollenfokus – die Abwesenheit IST die Aussage.
   * Die Regel selbst wird unverändert und weiterhin hart geprüft: kanonische Reihenfolge.
   */
  it('Assurance-Rollen erhalten BEWUSST keine Reihenfolge-Betonung (keine Zeile in der Tabelle)', () => {
    for (const roleId of ['R07', 'R12']) {
      const { container, unmount } = render(
        <MissionControlContent role={role(roleId)} tenant={tenant(TENANT_ID.NORDWERK)} />,
      );
      expect(gerenderteKachelOrdnung(container), roleId).toEqual([...KANONISCHE_KACHELORDNUNG]);
      expect(container.querySelector('.rv-fokus'), roleId).toBeNull();
      unmount();
    }
  });

  it('neutral bleibt kanonisch und ohne Rollenfokus (der Neutral-Hinweis rahmt stattdessen)', () => {
    const { container } = render(
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop dieser Komponente (hier bewusst `null` = neutral), kein ARIA-Attribut – Fehlalarm der Regel.
      <MissionControlContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(container.querySelector('.rv-fokus')).toBeNull();
    expect(container.querySelector('.ht-neutral')).not.toBeNull();
    expect(gerenderteKachelOrdnung(container)).toEqual([...KANONISCHE_KACHELORDNUNG]);
  });

  it('leerer Mandant: kein Rollenfokus – ohne Kacheln gibt es nichts zu betonen', () => {
    const { container } = render(
      <MissionControlContent role={role('R03')} tenant={tenant(TENANT_ID.FINOVIA)} />,
    );
    expect(container.querySelector('.rv-fokus')).toBeNull();
    expect(container.querySelector('.db-tile[data-tile-id="datenluecke"]')).not.toBeNull();
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
  it('enthält für keine der zwölf Rollen und für neutral Bewertungsvokabular im sichtbaren Text', () => {
    // WP-020 Slice 2: der NEUTRALE Zustand steht als dreizehnte Perspektive mit unter dem
    // Wächter – seine Texte (Erstbesuchs-Hinweis, Neutral-Zeilen) dürfen genauso wenig werten.
    for (const demoRole of [...DEMO_ROLES, null]) {
      const kennung = demoRole?.id ?? 'neutral';
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
            `${kennung}/${tenantId}: die begründete Ausnahme „${negation}" steht nicht mehr im Text`,
          ).toContain(negation);
          text = text.split(negation).join(' ');
        }
        for (const muster of BEWERTUNG_VERBOTEN) {
          expect(
            muster.test(text),
            `${kennung}/${tenantId}: „${muster}" darf nicht im Text stehen`,
          ).toBe(false);
        }

        // Die vier Datenabschnitte ohne den Ehrlichkeitsblock.
        const klon = container.cloneNode(true) as HTMLElement;
        klon.querySelector('section[aria-labelledby="heute-luecke"]')?.remove();
        let datentext = klon.textContent ?? '';
        // BEGRÜNDETE AUSNAHME (WP-020 Slice 2, AC 9): Die Kernverantwortung der aktiven Rolle
        // ist seit dem Wortlaut-Abgleich das WÖRTLICHE PDF-Zitat aus Dok. 03, Spalte
        // „Kernverantwortung" – für R02/R04 enthält es „Prioritäten"/„Priorität". Das ist die
        // zitierte ROLLENBESCHREIBUNG, keine Priorisierung von Daten durch diese Seite. Muster
        // wie die Quellen-Priorität in `entscheidungen.test.tsx`: die Ausnahme wird entfernt
        // UND ihr Vorhandensein geprüft, damit sie nicht still verfällt oder verrutscht.
        if (demoRole) {
          expect(
            datentext,
            `${kennung}/${tenantId}: die zitierte Kernverantwortung steht nicht mehr im Text`,
          ).toContain(demoRole.responsibility);
          datentext = datentext.split(demoRole.responsibility).join(' ');
        }
        // BEGRÜNDETE AUSNAHME (WP-020 Slice 5, AC 17): Der Rollenfokus benennt die Fokusinhalte
        // OHNE Träger mit dem PDF-Vokabular der Tabelle „Rollenvarianten" – für die
        // Consultant-Variante enthält das „Mandantenpriorität". Das ist eine ZITIERTE, als
        // Lücke benannte Konzeptvorgabe, keine Priorisierung von Daten durch diese Seite.
        // Dieselbe Mechanik: exakter Satz aus `rollenvarianten.ts` wird entfernt UND sein
        // Vorhandensein geprüft (nur wo der Fokus rendert – nicht bei leeren Mandanten,
        // dort gibt es bewusst keinen Rollenfokus).
        const fokusZuordnung = demoRole ? varianteForRole(demoRole.id) : null;
        const fokusVariante = fokusZuordnung?.variante ?? null;
        if (fokusVariante && tenantId !== TENANT_ID.FINOVIA) {
          // Der GERENDERTE Lückentext ist mandantenabhängig (ISMS-Manager ergänzt die
          // Review-Existenz nur, wenn der Mandant einen Review trägt) – exakt das strippen,
          // was der Block wirklich zeigt, dieselbe Ableitung wie das Produkt (`hatReview`).
          const hatReview = buildHeuteDashboard(tenantId)?.hatReview ?? false;
          const gerendert = fokusLueckenTextFuer(fokusVariante, hatReview);
          expect(
            datentext,
            `${kennung}/${tenantId}: der Fokus-Lückentext steht nicht mehr im Text`,
          ).toContain(gerendert);
          datentext = datentext.split(gerendert).join(' ');
        }
        // AUSNAHME ENTFALLEN (WP-028 Slice 3, DR-0013 Nr. 5): Bis dahin rendete der Block
        // „Quelle der Variante" die WÖRTLICHEN PDF-Spaltenzitate; für „Consultant" enthielt der
        // Missionsfokus „Mandantenpriorität" und musste vor dem Wächter-Scan gestrippt werden.
        // Der Quellenblock ist aus der Oberfläche entfernt (die Quelle lebt als Code-Doku in
        // `lib/heute/rollenvarianten.ts` und wird dort per Test gegen die PDF-Tabelle
        // festgenagelt). Die Ausnahme ist damit gegenstandslos – und ihr Wegfall macht den
        // Wächter STRENGER: das Wort darf jetzt gar nicht mehr aus dieser Quelle auftauchen.
        // Gegenprobe, damit die Zitate nicht still zurückkehren:
        if (fokusVariante) {
          expect(
            datentext,
            `${kennung}/${tenantId}: das wörtliche Spaltenzitat gehört in die Code-Doku`,
          ).not.toContain(fokusVariante.missionsfokusQuote);
          expect(
            datentext,
            `${kennung}/${tenantId}: das wörtliche Spaltenzitat gehört in die Code-Doku`,
          ).not.toContain(fokusVariante.ausblendungQuote);
        }
        for (const muster of NUR_IM_LUECKENBLOCK) {
          expect(
            muster.test(datentext),
            `${kennung}/${tenantId}: „${muster}" darf nicht in den Datenabschnitten stehen`,
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
 * 11. Detailtiefe (WP-020 Slice 3; Dok. 06 „Detailtiefe" / P06)
 * --------------------------------------------------------------------------- */

/** Rendert die ECHTE Seite (HeuteView) mit gesetzter Session – der kontrollierte Tiefen-Pfad. */
function renderHeuteSeite(tenantId: string = TENANT_ID.NORDWERK) {
  window.localStorage.setItem(SESSION_STORAGE_KEY, serializeSession({ roleId: 'R03', tenantId }));
  return render(
    <SessionProvider>
      <HeuteView />
    </SessionProvider>,
  );
}

describe('HeuteView – Detailtiefe: Standardtiefe, Erreichbarkeit, Persistenz', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('startet in Ebene 1 (P06): Kacheln sichtbar, WP-016-Abschnitte erst ab Tiefe 2/3', () => {
    renderHeuteSeite();

    // Ebene 1, Kontextleiste, Ehrlichkeitsblock und Bausteine-Hinweis sind IMMER sichtbar
    // (Invariante: keine Tiefe unterdrückt Kontext oder benannte Grenzen).
    expect(screen.getByRole('heading', { level: 2, name: EBENE1_TITEL })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Kontext dieser Seite' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Was hier bewusst nicht steht' }),
    ).toBeInTheDocument();
    expect(
      document.querySelector('section[aria-label="Seitenbausteine dieser Seite"]'),
    ).not.toBeNull();

    // Die tieferen Abschnitte sind in Ebene 1 NICHT gerendert – aber über den sichtbaren
    // Schalter erreichbar (kein Informationsverlust, nur Umordnung).
    for (const section of Object.values(MISSION_SECTIONS)) {
      expect(screen.queryByRole('heading', { level: 2, name: section.title })).toBeNull();
    }
    expect(screen.getByRole('radio', { name: /Ebene 1/ })).toBeChecked();
  });

  it('macht ALLE WP-016-Abschnitte über die Tiefenwahl erreichbar (Umordnung, kein Verlust)', () => {
    renderHeuteSeite();

    // Ebene 2: Standort, Erfassung, Datenlage erscheinen; die Rohdaten-Einstiege noch nicht.
    fireEvent.click(screen.getByRole('radio', { name: /Ebene 2/ }));
    expect(
      screen.getByRole('heading', { level: 2, name: MISSION_SECTIONS.standort.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: MISSION_SECTIONS.erfassung.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: MISSION_SECTIONS.datenlage.title }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 2, name: MISSION_SECTIONS.einstieg.title }),
    ).toBeNull();

    // Ebene 3: auch die Einstiege – damit ist der komplette WP-016-Stand erreichbar.
    fireEvent.click(screen.getByRole('radio', { name: /Ebene 3/ }));
    for (const section of Object.values(MISSION_SECTIONS)) {
      expect(screen.getByRole('heading', { level: 2, name: section.title })).toBeInTheDocument();
    }
    expect(
      screen.getByRole('heading', { level: 2, name: 'Was hier bewusst nicht steht' }),
    ).toBeInTheDocument();
  });

  it('speichert die bevorzugte Tiefe unter dem versionierten Schlüssel und übersteht einen Reload', () => {
    const erste = renderHeuteSeite();
    fireEvent.click(screen.getByRole('radio', { name: /Ebene 3/ }));

    // Persistiert wird NUR die Stufe – mandanten- und rollenfrei (Cross-Tenant-Schutz).
    expect(window.localStorage.getItem(DETAILTIEFE_STORAGE_KEY)).toBe('3');
    expect(window.localStorage.getItem(DETAILTIEFE_STORAGE_KEY)).toMatch(/^[123]$/);
    erste.unmount();

    // „Reload": neuer Render liest den gespeicherten Wert – Ebene 3 ist sofort aktiv.
    renderHeuteSeite();
    expect(screen.getByRole('radio', { name: /Ebene 3/ })).toBeChecked();
    expect(
      screen.getByRole('heading', { level: 2, name: MISSION_SECTIONS.einstieg.title }),
    ).toBeInTheDocument();
  });

  it('fällt bei manipuliertem/veraltetem Speicherwert auf die Standardtiefe zurück', () => {
    window.localStorage.setItem(DETAILTIEFE_STORAGE_KEY, 'zehn');
    renderHeuteSeite();
    expect(screen.getByRole('radio', { name: /Ebene 1/ })).toBeChecked();
    for (const section of Object.values(MISSION_SECTIONS)) {
      expect(screen.queryByRole('heading', { level: 2, name: section.title })).toBeNull();
    }
  });
});

/* -----------------------------------------------------------------------------
 * 11b. Neutraler Einstieg (WP-020 Slice 2, DR-0009 – AC 6/7)
 * --------------------------------------------------------------------------- */

describe('HeuteView – neutraler Einstieg nach Anmeldung ohne Rollenwahl (AC 6)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('rendert ohne Rolle vollständig: gekennzeichnete neutrale Ebene 1 mit Erstbesuchs-Hinweis', () => {
    // Exakt die Sitzung, die die Anmeldung seit DR-0009 schreibt: nur der Mandant.
    window.localStorage.setItem(
      SESSION_STORAGE_KEY,
      serializeSession({ tenantId: TENANT_ID.NORDWERK }),
    );
    const { container } = render(
      <SessionProvider>
        <HeuteView />
      </SessionProvider>,
    );

    // Keine Fehl-/Leerseite: die Ebene 1 steht komplett (Kacheln, Kontext, Grenzen).
    expect(screen.getByRole('heading', { level: 1, name: 'Heute' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: EBENE1_TITEL })).toBeInTheDocument();
    expect(container.querySelectorAll('.db-tile').length).toBeGreaterThan(0);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Was hier bewusst nicht steht' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Kein Mandant gewählt' })).toBeNull();

    // Kennzeichnung + Erstbesuchs-Hinweis auf die OPTIONALE Rollenwahl (Dok. 04 J01:
    // kein erzwungener Rundgang) – Klartext, kein Overlay.
    const hinweis = container.querySelector('.ht-neutral');
    expect(hinweis?.textContent).toContain('Neutraler strategischer Einstieg');
    // Wortlaut seit dem Product-Fix (F4) gekürzt; die inhaltliche Regel bleibt geprüft:
    // (a) er weist auf den Ort der OPTIONALEN Rollenwahl, (b) sie ist reversibel/jederzeit.
    // „Kein erzwungener Rundgang" (Dok. 04 J01) ist jetzt EIGENSCHAFT des Hinweises (passiv,
    // role="note", kein Overlay) – geprüft über Optionalität + Abwählbarkeit statt der Phrase.
    expect(hinweis?.textContent).toMatch(/oben unter .Rolle./);
    expect(hinweis?.textContent).toMatch(/Optional/);
    expect(hinweis?.textContent).toMatch(/jederzeit/);
    expect(hinweis?.textContent).toMatch(/abwählbar/);
    expect(hinweis?.getAttribute('role')).toBe('note');

    // Kontextleiste nennt „neutral" statt einer erfundenen Rolle (AC 3).
    const kontext = screen.getByRole('region', { name: 'Kontext dieser Seite' });
    expect(kontext.textContent).toContain('neutral – keine Rolle gewählt');
  });

  it('mit gewählter Rolle steht der Rollen-Hinweis; die Abwahl kehrt zur neutralen Ebene 1 zurück (AC 7)', () => {
    // Inhaltsseite der Reversibilität (der Topbar-Klickpfad liegt in shell.test.tsx):
    // dieselbe Komponente, einmal mit Rolle, einmal neutral – der Hinweis folgt dem Zustand.
    //
    // WP-028 Slice 4 (DR-0013 Nr. 12): Der Ein-Satz-Hinweis zur Reichweite der Rollenwahl
    // steht jetzt in BEIDEN Zuständen. Vorher verschwand er mit der Rollenwahl – also genau
    // dann, wenn die Frage „was ändert die Rolle eigentlich?" aufkommt. Geprüft wird deshalb
    // nicht mehr sein Verschwinden, sondern sein zustandsgerechter Wortlaut.
    const mitRolle = render(
      <MissionControlContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const rollenHinweis = mitRolle.container.querySelector('.ht-neutral');
    expect(rollenHinweis).not.toBeNull();
    expect(rollenHinweis?.textContent).toContain('Ansicht ISMS Manager');
    // WORTLAUT SPHÄRENGERECHT (Nachfix nach Gate-Runde 2): der Satz wird je Sphäre der aktiven
    // Rolle gebildet. R03 (ISMS Manager, Kunde → Ein-Unternehmens-Fassung) bekommt genau diese.
    // Die Zusagen (derselbe Datenbestand, keine Berechtigung) sind Teil des Satzes und werden im
    // Wächter `components/__tests__/rollenreichweite.test.tsx` je Sphäre festgenagelt.
    expect(rollenHinweis?.textContent).toContain(rollenReichweiteSatz(role('R03')));
    expect(rollenHinweis?.textContent).not.toContain('Neutraler strategischer Einstieg');
    expect(rollenHinweis?.textContent).not.toMatch(/R\d{2}/);
    mitRolle.unmount();

    const neutral = render(
      // biome-ignore lint/a11y/useValidAriaRole: `role` ist die DemoRole-Prop dieser Komponente (hier bewusst `null` = neutral, DR-0009), kein ARIA-Attribut – Fehlalarm der Regel.
      <MissionControlContent role={null} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(neutral.container.querySelector('.ht-neutral')?.textContent).toContain(
      'Neutraler strategischer Einstieg',
    );
    // Der Standort-Abschnitt benennt den neutralen Zustand, statt Rollenfelder zu erfinden.
    expect(neutral.container.textContent).toContain('Keine Rolle gewählt');
    neutral.unmount();
  });
});

/* -----------------------------------------------------------------------------
 * 12. Dashboard-Kacheln der Ebene 1 (WP-020 Slice 4, DR-0008)
 * --------------------------------------------------------------------------- */

describe('MissionControlContent – Dashboard-Kacheln (Selbsterklärung, Badges, Datenlücken)', () => {
  it('rendert je Kachel Frage, Scope/Datenstand, Ermittlungsregel und Drill-down (Struktur)', () => {
    const dashboard = buildHeuteDashboard(TENANT_ID.NORDWERK);
    if (!dashboard) throw new Error('Testfixture fehlt: Nordwerk-Dashboard');
    const { container } = render(
      <MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );

    const kacheln = Array.from(container.querySelectorAll('.db-tile'));
    // Vier Statuskacheln + Lebenszyklus-Zählung + drei Abdeckungen (aus dem Modell, nicht
    // hartkodiert angenommen).
    expect(kacheln).toHaveLength(
      dashboard.stockTiles.length +
        (dashboard.lifecycleSummary ? 1 : 0) +
        dashboard.coverage.length,
    );

    for (const kachel of kacheln) {
      // Struktur, nicht Wortlaut (Lektion 11): Frage-Überschrift, Meta-Zeile mit Scope und
      // Datenstand, aufklappbare Ermittlungsregel, Drill-down-Link.
      expect(kachel.querySelector('.db-frage')?.textContent).toMatch(/\?$/);
      expect(kachel.querySelector('.db-meta')?.textContent).toMatch(/Scope: /);
      expect(kachel.querySelector('.db-meta')?.textContent).toMatch(/Datenstand/);
      expect(kachel.querySelector('details.db-regel summary')?.textContent).toBe('So wird gezählt');
      expect(
        (kachel.querySelector('details.db-regel p')?.textContent ?? '').length,
      ).toBeGreaterThan(20);
      expect(kachel.querySelector('.db-drill a')?.getAttribute('href')).toBeTruthy();
    }
  });

  /**
   * ERWEITERT (WP-028 Slice 3, DR-0013 Nr. 7): Balken und Badge sind nur noch dort Pflicht, wo
   * die Grundgesamtheit sie trägt. Bei n≤2 MÜSSEN beide fehlen und der Kleinheits-Hinweis
   * MUSS stehen – das ist eine zusätzliche Prüfung, keine Lockerung: vorher war „1 von 1" mit
   * Vollbalken und grünem Häkchen erlaubt und wurde als vollständige Lage gelesen.
   */
  it('zeigt Abdeckungen als „x von y" mit Balken-FORM und Badge (Symbol + Text, nie nur Farbe)', () => {
    const dashboard = buildHeuteDashboard(TENANT_ID.NORDWERK);
    if (!dashboard) throw new Error('Testfixture fehlt: Nordwerk-Dashboard');
    const { container } = render(
      <MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );

    for (const tile of dashboard.coverage) {
      const kachel = container.querySelector(`.db-tile[data-tile-id="${tile.id}"]`);
      if (!kachel) throw new Error(`Kachel fehlt: ${tile.id}`);
      // Die Zahl kommt aus der Ableitung – exakt „x von y" mit sichtbarer Grundgesamtheit.
      expect(kachel.querySelector('.db-wert-zahl')?.textContent).toBe(
        `${tile.covered} von ${tile.total}`,
      );
      if (tile.kleineGrundgesamtheit) {
        // n≤2: kein Balken, kein Erfolgs-Badge – dafür die absolute Kleinheit als Text.
        expect(kachel.querySelector('.db-balken'), tile.id).toBeNull();
        expect(kachel.querySelector('.db-kleinheit')?.textContent, tile.id).toBe(
          tile.kleinheitText,
        );
      } else {
        // Balken = zusätzliche Form, dekorativ (die Aussage steht als Text daneben).
        expect(kachel.querySelector('.db-balken')?.getAttribute('aria-hidden')).toBe('true');
        expect(kachel.querySelector('.db-kleinheit'), tile.id).toBeNull();
      }
      // Badge: Symbol (aria-hidden) + Text aus der Positivliste – nie nur Farbe (06-D11).
      const badge = kachel.querySelector('.db-badge');
      if (tile.badge) {
        expect(badge?.querySelector('[aria-hidden="true"]')).not.toBeNull();
        expect(badge?.textContent).toContain(tile.badge.text);
        expect(Object.keys(BADGE_RULES)).toContain(tile.badge.rule);
        // DR-0013 Nr. 7: der Grenzsatz steht SICHTBAR an der Kachel, nicht nur im `title`.
        expect(kachel.querySelector('.db-badge-grenze')?.textContent, tile.id).toBe(
          tile.badge.grenze,
        );
      } else {
        expect(badge).toBeNull();
      }
    }
  });

  /**
   * REGEL-ERHALTEND UMGESTELLT (WP-028 Slice 3, DR-0013 Nr. 7): Die zulässigen Badge-Texte
   * waren bis dahin die drei statischen Regel-Texte. Seit der Badge-Sprachpräzisierung ist der
   * Text ZAHLENGEBUNDEN („alle 34 Objekte haben einen benannten Owner"), also nicht mehr aus
   * einer festen Liste ableitbar. Geprüft wird deshalb gegen die Texte AUS DEM MODELL – die
   * eigentliche Regel („kein Badge außerhalb der Positivliste, kein Urteil im Text") bleibt
   * unverändert scharf und wird zusätzlich um das Formmuster ergänzt.
   */
  it('vergibt kein Badge außerhalb der Positivliste und kein Urteil (kein hoch/mittel/gering)', () => {
    for (const tenantId of [TENANT_ID.NORDWERK, TENANT_ID.CONSULTING_OPERATOR, TENANT_ID.FINOVIA]) {
      const model = buildHeuteDashboard(tenantId);
      if (!model) throw new Error(`Testfixture fehlt: ${tenantId}`);
      const { container, unmount } = render(
        <MissionControlContent role={role('R01')} tenant={tenant(tenantId)} />,
      );
      const zulaessigeTexte = [
        ...model.coverage.map((t) => t.badge?.text),
        model.emptyTile?.badge.text,
      ].filter((t): t is string => t !== undefined);
      const badges = Array.from(container.querySelectorAll('.db-badge'));
      for (const badge of badges) {
        const text = (badge.textContent ?? '').replace(/^[^\wÄÖÜäöü]+/u, '').trim();
        expect(zulaessigeTexte, `${tenantId}: „${text}"`).toContain(text);
        expect(text).not.toMatch(/hoch|mittel|gering|Reifegrad|Trend|Risiko/i);
        // Zahlengebunden oder der merkmalfreie Rückfalltext – nie ein pauschales Urteil.
        expect(
          /^(alle \d+ |Datenlücke: \d+ )/.test(text) ||
            Object.values(BADGE_RULES).some((r) => r.text === text),
          `${tenantId}: „${text}" ist weder zahlengebunden noch Rückfalltext`,
        ).toBe(true);
      }
      unmount();
    }
  });

  it('zeigt für leere Mandanten EINE Datenlücken-Kachel statt einer Kachelwand', () => {
    const { container } = render(
      <MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.FINOVIA)} />,
    );
    const kacheln = Array.from(container.querySelectorAll('.db-tile'));
    expect(kacheln).toHaveLength(1);
    expect(kacheln[0].getAttribute('data-tile-id')).toBe('datenluecke');
    expect(kacheln[0].querySelector('.db-badge--kein_datenbestand')).not.toBeNull();
    // Auch die Datenlücken-Kachel erklärt sich: Regel + Drill-down in den (leeren) Zwilling.
    expect(kacheln[0].querySelector('details.db-regel')).not.toBeNull();
    expect(kacheln[0].querySelector('.db-drill a')?.getAttribute('href')).toBe(
      `/twin/${TENANT_ID.FINOVIA}`,
    );
  });

  it('trägt die 08-D07-Glosse sichtbar an der Lebenszyklus-Kachel', () => {
    const { container } = render(
      <MissionControlContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const kachel = container.querySelector('.db-tile[data-tile-id="lebenszyklus_zaehlung"]');
    expect(kachel?.querySelector('.db-glosse')?.textContent).toMatch(/kein Prüfergebnis/);
  });
});

/* -----------------------------------------------------------------------------
 * 13. Sitzungsrahmen
 * --------------------------------------------------------------------------- */

describe('HeuteView – Sitzungsrahmen (Perspektive, keine Authz)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('zeigt ohne gewählten Mandanten den Hinweis samt Link zur Anmeldung', () => {
    render(
      <SessionProvider>
        <HeuteView />
      </SessionProvider>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Heute' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Kein Mandant gewählt' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Zur Anmeldung/ })).toHaveAttribute('href', '/login');
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

    // Die beantwortete Leitfrage (DR-0013 Nr. 1) – nicht die aspirative aus `places.ts`.
    expect(
      screen.getByText(
        'Wie ist der Stand von Nordwerk Manufacturing SE – was ist erfasst und wo sind die Lücken?',
      ),
    ).toBeInTheDocument();
    // WP-020 (geplanter Umbau): die Seite startet in der ruhigen Ebene 1 (P06) – sichtbar sind
    // der Ebene-1-Abschnitt und der Kontext; die WP-016-Abschnitte sind über den
    // Tiefenschalter erreichbar (eigener Detailtiefe-Testblock oben).
    expect(screen.getByRole('heading', { level: 2, name: EBENE1_TITEL })).toBeInTheDocument();
    expect(screen.getByText('ISMS Manager')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Kein Mandant gewählt' })).toBeNull();
  });
});
