/**
 * Render-Tests des Ortes „Entscheidungen" (WP-017 Slice 2, Acceptance 11–22).
 *
 * Geprüft wird gegen den echten `DEMO_SEED` (keine Mocks):
 *  1. Leitfrage aus `places.ts` – und DIREKT darunter die Grenze der Frage (nicht am Seitenende).
 *  2. Rahmungssatz zu Lebenszyklus-Ständen WORTGLEICH aus `components/isms/IsmsContent.tsx`.
 *  3. Register je Entscheidung: Frage, Kontext, Lebenszyklus-Stand, Owner, getrennte Zeitachsen.
 *  4. Bezug (R23) und Nachweis (R15) richtungstreu; fehlender Nachweis wird benannt.
 *  5. Ablösekette (R24) in BEIDEN Richtungen, beidseitig verlinkt, Vorgänger nicht ausgeblendet.
 *  6. Alle Objekt-Links mandantentreu; Negativbeweis: kein fremder Name, keine fremde ID im DOM.
 *  7. Zwei UNTERSCHIEDLICH formulierte Leerzustände (Graph ohne Entscheidungen / gar kein Graph).
 *  8. Identische Datenmenge über alle zwölf Rollen (Dok. 06 06-D05).
 *  9. Negativbeweis Bewertung: kein Score/Ampel/Prozent/Rang/Frist/Empfehlung/Geldangabe.
 * 10. Ehrlichkeitsblock: feldweise Lücke, ohne Roadmap-, Termin- oder Funktionsversprechen.
 * 11. A11y: Heading-Hierarchie ohne Sprung, Status immer als Text.
 * 12. Sitzungsrahmen `EntscheidungenView`: „nicht angemeldet" und angemeldeter Zustand.
 */
import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { DEMO_SEED, DEMO_TENANTS, TENANT_ID, type DemoTenant } from '@isms/demo-seed';

import { EntscheidungenContent } from '../EntscheidungenContent';
import { EntscheidungenView } from '../EntscheidungenView';
import { IsmsContent } from '../../isms/IsmsContent';
import { SessionProvider } from '../../shell/SessionProvider';
import {
  DECISION_CARD_FIELDS,
  DECISION_CARD_FIELDS_DOK06,
  DECISION_RECORD_CONTENTS,
  buildDecisionRegister,
  countFields,
} from '../../../lib/entscheidungen/data';
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

/** Der Registerabschnitt – Suchraum für alles, was je Entscheidung gerendert wird. */
function registerAbschnitt(): HTMLElement {
  return screen
    .getByRole('heading', { level: 2, name: 'Erfasste Entscheidungen' })
    .closest('section') as HTMLElement;
}

/** Karte (li.sv-card) zu einer h3-Überschrift – für Assertions innerhalb einer Entscheidung. */
function karteZurFrage(name: string | RegExp): HTMLElement {
  const heading = screen.getByRole('heading', { level: 3, name });
  const card = heading.closest('li');
  if (!card) throw new Error(`Karte zu Überschrift „${String(name)}" nicht gefunden`);
  return card;
}

const NORDWERK_MODEL = buildDecisionRegister(TENANT_ID.NORDWERK);
if (!NORDWERK_MODEL) throw new Error('Testfixture fehlt: Nordwerk-Register');

const ABGELOEST = NORDWERK_MODEL.decisions.find((d) => d.superseded_by.length > 0);
const NACHFOLGER = NORDWERK_MODEL.decisions.find((d) => d.supersedes.length > 0);
if (!ABGELOEST || !NACHFOLGER) throw new Error('Testfixture fehlt: Ablösepaar im Datenbestand');

/* -----------------------------------------------------------------------------
 * 1./2. Seitenaufbau, Leitfrage und Rahmungssätze
 * --------------------------------------------------------------------------- */

describe('EntscheidungenContent – Leitfrage und ihre Grenze', () => {
  it('zeigt die Leitfrage des Ortes wörtlich aus places.ts', () => {
    render(<EntscheidungenContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Entscheidungen' })).toBeInTheDocument();
    expect(screen.getByText(getPlace('entscheidungen').question)).toBeInTheDocument();
  });

  it('stellt die Grenze der Leitfrage DIREKT darunter, nicht ans Seitenende', () => {
    const { container } = render(
      <EntscheidungenContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    const frage = screen.getByText(getPlace('entscheidungen').question);
    const rahmung = container.querySelector('#entscheidungen-rahmung');

    expect(rahmung).not.toBeNull();
    // Unmittelbarer nächster Knoten – kein Inhalt darf sich dazwischenschieben.
    expect(frage.nextElementSibling).toBe(rahmung);
    // Anker seit dem Review-Pass an den Zwei-Satz-Kopf angepasst (Regel unverändert: die
    // Grenze wird benannt, die belegbare Ersatzfrage steht dabei, die Begründung im DOM).
    expect(rahmung?.textContent ?? '').toMatch(/Diese Frage beantwortet die Seite heute nicht/);
    expect(rahmung?.textContent ?? '').toMatch(/Dringlichkeit/);
    // Und die engere, tatsächlich belegbare Frage steht mit ihr zusammen.
    expect(rahmung?.textContent ?? '').toMatch(/Welche Entscheidungen sind erfasst, worauf/);
    // Der Begründungsapparat bleibt vollständig im DOM (aufklappbar, P06).
    expect(rahmung?.textContent ?? '').toMatch(/Frist, einen Aufwand/);

    // Gegenprobe: die Rahmung steht VOR dem Register, nicht erst im Ehrlichkeitsblock.
    const register = container.querySelector('section[aria-labelledby="entscheidungen-register"]');
    expect(register).not.toBeNull();
    expect(
      (rahmung as Element).compareDocumentPosition(register as Element) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('übernimmt den Rahmungssatz zu Lebenszyklus-Ständen WORTGLEICH aus IsmsContent', () => {
    const satzAus = (container: HTMLElement): string => {
      const treffer = Array.from(container.querySelectorAll('p.tw-muted')).find((p) =>
        (p.textContent ?? '').startsWith('Zum Verständnis:'),
      );
      if (!treffer) throw new Error('Rahmungssatz „Zum Verständnis:" nicht gefunden');
      return treffer.textContent ?? '';
    };

    const isms = render(<IsmsContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const referenz = satzAus(isms.container);
    isms.unmount();

    const entscheidungen = render(
      <EntscheidungenContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );
    expect(satzAus(entscheidungen.container)).toBe(referenz);
    // Der Wortlaut selbst bleibt festgenagelt (er trägt die Aussage 08-D07).
    expect(referenz).toMatch(/Lebenszyklus-Stände aus dem Demo-Datenbestand/);
    expect(referenz).toMatch(/keine Prüfergebnisse/);
    expect(referenz).toMatch(/Status der Beziehung/);
  });

  /**
   * WP-028 (DR-0013 „kein internes Vokabular im UI"): Der gerenderte Produkttext nennt KEINE
   * Konzept-Quellenkennung mehr – weder eine Dokumentnummer („Dok. 07"), noch eine blanke
   * §-Nummer, noch eine stabile Entscheidungs-ID („07-D06"). Die Quellenbelege leben ab jetzt
   * ausschließlich in Code-Kommentaren und Tests, nicht in der Oberfläche. (Zuvor lautete die
   * Regel „Abschnittstitel statt Nummer"; DR-0013 verschärft sie zu „gar keine Quellenkennung".)
   */
  it('nennt im gerenderten Text keine Dokument-, Paragraphen- oder Entscheidungskennung', () => {
    for (const tenantId of [TENANT_ID.NORDWERK, TENANT_ID.CONSULTING_OPERATOR]) {
      const { container, unmount } = render(
        <EntscheidungenContent role={role('R01')} tenant={tenant(tenantId)} />,
      );
      const text = container.textContent ?? '';

      expect(/Dok\.\s*\d/.test(text), `${tenantId}: Dokumentkennung im Produkttext`).toBe(false);
      expect(/§\s*\d/.test(text), `${tenantId}: Paragraphenkennung im Produkttext`).toBe(false);
      expect(/\b\d\d-D\d\d\b/.test(text), `${tenantId}: Entscheidungs-ID im Produkttext`).toBe(
        false,
      );
      unmount();
    }
  });
});

/* -----------------------------------------------------------------------------
 * 3. Register je Entscheidung
 * --------------------------------------------------------------------------- */

describe('EntscheidungenContent – Register je Entscheidung (nur Belegtes)', () => {
  beforeEach(() => {
    render(<EntscheidungenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />);
  });

  it('zeigt jede Entscheidung des Mandanten als eigene Karte mit ihrer Frage', () => {
    const ueberschriften = within(registerAbschnitt())
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent ?? '');
    for (const decision of NORDWERK_MODEL.decisions) {
      expect(ueberschriften).toContain(decision.question);
    }
    expect(ueberschriften).toHaveLength(NORDWERK_MODEL.decisions.length);
  });

  it('nennt Lebenszyklus-Stand, Kontext, Owner und Objekt-ID aus dem Datenbestand', () => {
    for (const decision of NORDWERK_MODEL.decisions) {
      const karte = karteZurFrage(decision.question);
      // Status immer als Text, nie nur als Farbe (Dok. 06 06-D11).
      expect(
        within(karte).getByText('Lebenszyklus-Stand (kein Prüf- oder Freigabeergebnis)'),
      ).toBeInTheDocument();
      expect(within(karte).getByText(decision.lifecycle_status)).toBeInTheDocument();
      expect(within(karte).getByText(decision.object_id)).toBeInTheDocument();
      if (decision.context) {
        expect(within(karte).getByText(decision.context)).toBeInTheDocument();
      }
      for (const owner of decision.owners) {
        expect(within(karte).getAllByText(owner.name).length).toBeGreaterThan(0);
      }
    }
  });

  it('weist fachliche Gültigkeit und Systemerfassung als getrennte Achsen aus', () => {
    const karte = karteZurFrage(ABGELOEST.question);
    expect(within(karte).getByText('fachlich gültig')).toBeInTheDocument();
    expect(within(karte).getByText('im System erfasst am')).toBeInTheDocument();
    expect(within(karte).getByText('im System ersetzt am')).toBeInTheDocument();
    expect(
      within(karte).getByText('nicht erfasst – dieser Datensatz wurde nicht ersetzt'),
    ).toBeInTheDocument();

    // Der abgelöste Stand trägt ein GESCHLOSSENES Intervall: „bis" ist sichtbar.
    const gueltigkeit = within(karte).getByText('fachlich gültig').nextElementSibling;
    expect(gueltigkeit?.textContent ?? '').toMatch(/^ab .* bis /);

    // Der Nachfolgestand ist offen – und sagt das aus, statt die Lücke zu verschweigen.
    const nachfolgerKarte = karteZurFrage(NACHFOLGER.question);
    const offen = within(nachfolgerKarte).getByText('fachlich gültig').nextElementSibling;
    expect(offen?.textContent ?? '').toMatch(/offen – kein Enddatum erfasst/);
  });

  it('macht die Reihenfolgeregel sichtbar und sortiert nicht nach Dringlichkeit', () => {
    expect(screen.getByText(NORDWERK_MODEL.orderRule)).toBeInTheDocument();
    const gerendert = within(registerAbschnitt())
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent ?? '');
    expect(gerendert).toEqual(NORDWERK_MODEL.decisions.map((d) => d.question));
  });

  /**
   * Der Lebenszyklus-Stand wird AM WERT gerahmt, nicht nur seitenweit oben: „genehmigt" ist der
   * einzige Stand, der wie eine erteilte Freigabe klingt, und die Karten stehen mehrere
   * Bildschirmhöhen unter dem Rahmungssatz (Review-Fix, Muster aus WP-016).
   */
  it('rahmt den Lebenszyklus-Stand in JEDER Karte als kein Prüf- oder Freigabeergebnis', () => {
    for (const decision of NORDWERK_MODEL.decisions) {
      const karte = karteZurFrage(decision.question);
      expect(
        within(karte).getByText('Lebenszyklus-Stand (kein Prüf- oder Freigabeergebnis)'),
      ).toBeInTheDocument();
    }
    const genehmigt = NORDWERK_MODEL.decisions.find((d) => d.lifecycle_status === 'genehmigt');
    expect(genehmigt, 'Testfixture fehlt: Stand „genehmigt"').toBeDefined();
  });

  /**
   * Die sechs invarianten Leseregeln stehen EINMALIG am Abschnitt. Vorher trug sie jede Karte,
   * also bei drei Entscheidungen 18-mal – Rahmung verdrängte den Inhalt (Review-Fix).
   */
  it('führt die invarianten Leseregeln genau einmal, nicht je Karte', () => {
    const abschnitt = registerAbschnitt();
    for (const regel of [
      /Ein abgelöster Stand bleibt vollständig sichtbar/,
      /werden getrennt geführt und nicht zu einem einzigen/,
      /Verantwortung ist keine Freigabe/,
      /bewusst neutral als Bezug gezeigt/,
      /Der „Status der Beziehung" ist ein Feld der\s+Beziehung/,
      /nicht zu einem Gesamtwert verrechnet/,
    ]) {
      expect(within(abschnitt).getAllByText(regel), String(regel)).toHaveLength(1);
    }
  });

  /**
   * Der abgelöste Stand endet fachlich, seine Kanten bleiben bewusst offen. Ohne diesen Satz
   * liest sich das im Register wie ein Datenfehler (Review-Fix).
   */
  it('benennt am geschlossenen Intervall, dass die Beziehungen kein Enddatum tragen', () => {
    const karte = karteZurFrage(ABGELOEST.question);
    expect(
      within(karte).getByText(/Das Enddatum gilt für diesen Stand selbst/),
    ).toBeInTheDocument();
    // Gegenprobe: an einem offenen Stand steht der Satz nicht.
    const offen = karteZurFrage(NACHFOLGER.question);
    expect(
      within(offen).queryByText(/Das Enddatum gilt für diesen Stand selbst/),
    ).not.toBeInTheDocument();
  });
});

/* -----------------------------------------------------------------------------
 * 4./5. Bezug, Nachweis und Ablösekette
 * --------------------------------------------------------------------------- */

describe('EntscheidungenContent – Bezug, Nachweis und Ablösekette', () => {
  it('zeigt den R23-Bezug richtungstreu mit Klartextlabel und Kantenangaben', () => {
    render(<EntscheidungenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const karte = karteZurFrage(ABGELOEST.question);
    const bezug = ABGELOEST.references[0];
    expect(bezug).toBeDefined();

    // WP-028/DR-0013: nur das Klartext-Label „entschieden in" (ohne R-Kennung und snake_case).
    expect(
      within(karte).getAllByText('entschieden in', { selector: 'span.tw-rel-type' }).length,
    ).toBeGreaterThan(0);
    expect(within(karte).getAllByRole('link', { name: bezug.name }).length).toBeGreaterThan(0);
    expect(
      within(karte).getAllByText(new RegExp(`Herkunft der Aussage: ${bezug.assertion_kind}`))
        .length,
    ).toBeGreaterThan(0);
    // Ein fehlender Vertrauensgrad wird ausgeschrieben, nicht weggelassen (Dok. 07 §21).
    expect(within(karte).getAllByText(/Vertrauensgrad: nicht erfasst/).length).toBeGreaterThan(0);
    expect(
      within(karte).getAllByText(new RegExp(`Status der Beziehung: ${bezug.edge_status}`)).length,
    ).toBeGreaterThan(0);
  });

  it('benennt eine fehlende Nachweis-Beziehung, statt sie wegzulassen', () => {
    render(<EntscheidungenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />);
    const ohneNachweis = NORDWERK_MODEL.decisions.filter((d) => d.evidence.length === 0);
    expect(ohneNachweis.length).toBeGreaterThan(0);

    for (const decision of ohneNachweis) {
      const karte = karteZurFrage(decision.question);
      expect(
        within(karte).getByText(/zeigt im Datenbestand keine Nachweis-Beziehung/),
      ).toBeInTheDocument();
    }

    const mitNachweis = NORDWERK_MODEL.decisions.filter((d) => d.evidence.length > 0);
    for (const decision of mitNachweis) {
      const karte = karteZurFrage(decision.question);
      // WP-028/DR-0013: nur das Klartext-Label „belegt" (ohne R-Kennung und snake_case).
      expect(
        within(karte).getAllByText('belegt', { selector: 'span.tw-rel-type' }).length,
      ).toBeGreaterThan(0);
      for (const edge of decision.evidence) {
        expect(within(karte).getAllByRole('link', { name: edge.name }).length).toBeGreaterThan(0);
      }
    }
  });

  it('zeigt die Ablösung in BEIDEN Richtungen und blendet den Vorgänger nicht aus', () => {
    render(<EntscheidungenContent role={role('R03')} tenant={tenant(TENANT_ID.NORDWERK)} />);

    // Der abgelöste Stand steht weiterhin als eigene Karte im Register.
    const vorgaengerKarte = karteZurFrage(ABGELOEST.question);
    const nachfolgerKarte = karteZurFrage(NACHFOLGER.question);

    // Nachfolger: „Löst ab" mit Link auf den Vorgänger.
    expect(within(nachfolgerKarte).getByText('Löst ab (früherer Stand):')).toBeInTheDocument();
    expect(
      within(nachfolgerKarte).getByText('Dieser Stand wurde im Datenbestand nicht abgelöst.'),
    ).toBeInTheDocument();
    const linkAufVorgaenger = within(nachfolgerKarte).getByRole('link', {
      name: ABGELOEST.question,
    });
    expect(linkAufVorgaenger).toHaveAttribute('href', ABGELOEST.href);

    // Vorgänger: „Wurde abgelöst durch" mit Link auf den Nachfolger.
    expect(
      within(vorgaengerKarte).getByText('Wurde abgelöst durch (späterer Stand):'),
    ).toBeInTheDocument();
    expect(
      within(vorgaengerKarte).getByText(
        'Dieser Stand löst im Datenbestand keinen früheren Stand ab.',
      ),
    ).toBeInTheDocument();
    const linkAufNachfolger = within(vorgaengerKarte).getByRole('link', {
      name: NACHFOLGER.question,
    });
    expect(linkAufNachfolger).toHaveAttribute('href', NACHFOLGER.href);

    // Beide Seiten nennen die fachliche Gültigkeit des jeweils GENANNTEN Stands.
    expect(
      within(nachfolgerKarte).getAllByText(/Genannter Stand fachlich gültig/).length,
    ).toBeGreaterThan(0);
    expect(
      within(vorgaengerKarte).getAllByText(/Genannter Stand fachlich gültig/).length,
    ).toBeGreaterThan(0);
    // A11y: unter EINER h4 stehen zwei Kantenlisten – jede trägt einen eigenen Namen.
    expect(
      within(nachfolgerKarte).getByRole('list', { name: 'Löst ab (früherer Stand):' }),
    ).toBeInTheDocument();
    expect(
      within(vorgaengerKarte).getByRole('list', {
        name: 'Wurde abgelöst durch (späterer Stand):',
      }),
    ).toBeInTheDocument();

    // WP-028/DR-0013: nur das Klartext-Label „löst ab"; die R-Kennung und der snake_case-Typ
    // „(supersedes)" erscheinen NICHT mehr im gerenderten Text.
    expect(
      within(nachfolgerKarte).getAllByText('löst ab', { selector: 'span.tw-rel-type' }).length,
    ).toBeGreaterThan(0);
    expect(within(nachfolgerKarte).queryByText('(supersedes)')).not.toBeInTheDocument();
    expect(
      within(vorgaengerKarte).getAllByText('löst ab', { selector: 'span.tw-rel-type' }).length,
    ).toBeGreaterThan(0);
  });
});

/* -----------------------------------------------------------------------------
 * 6. Mandantentreue Links und Negativbeweis Mandantentrennung
 * --------------------------------------------------------------------------- */

describe('EntscheidungenContent – Mandantentrennung (Dok. 07 §17/P09)', () => {
  it('adressiert jeden Objekt-Link im aktiven Mandanten (nie ein fremdes Objekt)', () => {
    const { container } = render(
      <EntscheidungenContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />,
    );

    const eigeneIds = new Set(
      DEMO_SEED.objects.filter((o) => o.tenant_id === TENANT_ID.NORDWERK).map((o) => o.object_id),
    );
    const prefix = `/twin/${TENANT_ID.NORDWERK}/objekt/`;
    const hrefs = Array.from(container.querySelectorAll('a[href*="/objekt/"]')).map(
      (a) => a.getAttribute('href') ?? '',
    );

    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href.startsWith(prefix)).toBe(true);
      expect(eigeneIds.has(decodeURIComponent(href.slice(prefix.length)))).toBe(true);
    }
  });

  for (const tenantId of [TENANT_ID.NORDWERK, TENANT_ID.CONSULTING_OPERATOR, TENANT_ID.FINOVIA]) {
    it(`zeigt für ${tenantId} keinen Namen und keine ID eines fremden Mandanten`, () => {
      const { container } = render(
        <EntscheidungenContent role={role('R01')} tenant={tenant(tenantId)} />,
      );
      const html = container.innerHTML;

      for (const fremd of DEMO_TENANTS.filter((t) => t.tenant_id !== tenantId)) {
        expect(html).not.toContain(fremd.display_name);
        expect(html).not.toContain(fremd.tenant_id);
      }
      for (const object of DEMO_SEED.objects.filter((o) => o.tenant_id !== tenantId)) {
        expect(html).not.toContain(object.object_id);
        expect(html).not.toContain(object.display_name);
      }
    });
  }
});

/* -----------------------------------------------------------------------------
 * 7. Leerzustände – zwei fachlich verschiedene Fälle, unterschiedlich formuliert
 * --------------------------------------------------------------------------- */

describe('EntscheidungenContent – Leerzustände', () => {
  it('Consulting Operator: Datenbestand vorhanden, Entscheidungsschicht fehlt', () => {
    const operator = tenant(TENANT_ID.CONSULTING_OPERATOR);
    render(<EntscheidungenContent role={role('R05')} tenant={operator} />);

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: `Keine Entscheidungen für ${operator.display_name}`,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Dieser Mandant ist also nicht leer/)).toBeInTheDocument();
    expect(screen.getByText(/ist ein Datenbestand modelliert/)).toBeInTheDocument();
    // Klar abgegrenzt gegen den anderen Leerfall.
    expect(screen.queryByText(/überhaupt nichts modelliert/)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Mandant wechseln/ })).toHaveAttribute(
      'href',
      '/login',
    );

    /* Die Kontextzeile darf dem Inhalt auf demselben Bildschirm nicht widersprechen: der
       Datenstand wird AUSSCHLIESSLICH aus den Entscheidungen gebildet. Vorher stand hier
       „keine Erfassung im Datenbestand", während zwei Zeilen darunter ein modellierter
       Datenbestand ausgewiesen wurde (Review-Fix). */
    const kontext = screen.getByRole('region', { name: 'Kontext dieser Seite' });
    expect(
      within(kontext).getByText('Datenstand der Entscheidungen (zuletzt im System erfasst)'),
    ).toBeInTheDocument();
    expect(within(kontext).getByText('keine Entscheidung erfasst')).toBeInTheDocument();
    expect(kontext.textContent ?? '').not.toContain('keine Erfassung im Datenbestand');
  });

  /**
   * SICHERHEITSGRENZE (Dok. 07, „Mandantenfähigkeit, Rechte und Datenschutz"): Der Leerzustand
   * darf über FREMDE Mandanten nichts aussagen – auch nicht als Zahl. Vorher stand hier, für wie
   * viele Mandanten die Entscheidungsschicht ausmodelliert ist; ein Mandant ohne Entscheidungen
   * erfuhr damit, dass ein anderer welche trägt (Review-Fix).
   */
  for (const tenantId of [TENANT_ID.CONSULTING_OPERATOR, TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
    it(`${tenantId}: der Leerzustand sagt nichts über andere Mandanten`, () => {
      const { container } = render(
        <EntscheidungenContent role={role('R05')} tenant={tenant(tenantId)} />,
      );
      const leer = container.querySelector('.tw-empty') as HTMLElement;
      expect(leer).not.toBeNull();
      const text = leer.textContent ?? '';

      for (const muster of [
        /Mandanten? ausmodelliert/i,
        /f(ü|ue)r \d+ Mandanten/i,
        /f(ü|ue)r einen Mandanten/i,
        /anderen? Mandanten/i,
        /Mandanten im Demo-Datenbestand/i,
      ]) {
        expect(muster.test(text), `„${muster}" ist eine Aussage über fremde Mandanten`).toBe(false);
      }
      // Und die mandantenlokale Formulierung steht statt ihrer.
      expect(text).toMatch(/Für diesen Mandanten ist im synthetischen Datenbestand keine/);
    });
  }

  for (const tenantId of [TENANT_ID.FINOVIA, TENANT_ID.MEDICORE]) {
    it(`${tenantId}: gar kein Datenbestand – anders formuliert als ein Mandant mit Graph`, () => {
      const leer = tenant(tenantId);
      render(<EntscheidungenContent role={role('R05')} tenant={leer} />);

      expect(
        screen.getByRole('heading', {
          level: 3,
          name: `Keine Entscheidungen für ${leer.display_name}`,
        }),
      ).toBeInTheDocument();
      expect(screen.getByText(/überhaupt nichts modelliert/)).toBeInTheDocument();
      expect(screen.queryByText(/Dieser Mandant ist also nicht leer/)).not.toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Mandant wechseln/ })).toHaveAttribute(
        'href',
        '/login',
      );
      // Der Ehrlichkeitsblock bleibt auch im Leerzustand stehen (die Lücke gilt weiterhin).
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'Was eine Entscheidung hier noch nicht zeigt',
        }),
      ).toBeInTheDocument();
    });
  }
});

/* -----------------------------------------------------------------------------
 * 8. Gleiche Daten für alle zwölf Rollen (Dok. 06 06-D05, Dok. 10 ENTSCHEIDUNG 10-02)
 * --------------------------------------------------------------------------- */

/**
 * Datenprofil einer gerenderten Seite: alle Linkziele (und damit alle Objekt-IDs) sowie alle
 * datenführenden Textbausteine. Die Kontextzeile gehört dazu – ausgenommen ist genau das eine
 * bewusst rollenabhängige Feld (Rahmung, keine Daten).
 */
function datenprofil(container: HTMLElement): { hrefs: string[]; werte: string[] } {
  const hrefs = Array.from(container.querySelectorAll('a[href]'))
    .map((a) => a.getAttribute('href') ?? '')
    .sort();
  const werte = Array.from(
    container.querySelectorAll(
      '.tw-card-title, .tw-meta dd, .sv-desc, .sv-item-name, .sv-item-meta, .sv-item-note, .tw-rel-meta, .tw-rel-node, .tw-quality-list li',
    ),
  ).map((el) => el.textContent ?? '');

  // WP-020 Slice 1: Label „Aktive Produktrolle" nach Dok. 06 „Sichtbarer Kontext" – die Regel
  // (alle übrigen Kontextwerte sind rollenUNabhängig) bleibt unverändert.
  const rollenabhaengig = ['Aktive Produktrolle'];
  const kontextWerte = Array.from(container.querySelectorAll('.od-context > div'))
    .filter((eintrag) => !rollenabhaengig.includes(eintrag.querySelector('dt')?.textContent ?? ''))
    .map((eintrag) => eintrag.querySelector('dd')?.textContent ?? '');
  expect(kontextWerte.length).toBeGreaterThan(0);

  return { hrefs, werte: [...werte, ...kontextWerte].sort() };
}

describe('EntscheidungenContent – identische Datenmenge über alle zwölf Rollen', () => {
  it('zeigt für R01–R12 dieselben Objekt-IDs und dieselben Werte', () => {
    expect(DEMO_ROLES).toHaveLength(12);

    let referenz: { hrefs: string[]; werte: string[] } | undefined;
    for (const demoRole of DEMO_ROLES) {
      const { container, unmount } = render(
        <EntscheidungenContent role={demoRole} tenant={tenant(TENANT_ID.NORDWERK)} />,
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
 * 9. Keine Bewertung, keine Priorisierung, keine Geldangabe (Acceptance 18)
 * --------------------------------------------------------------------------- */

/** Vokabular, das auf dieser Seite NIRGENDS vorkommen darf. */
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
  /Serviceangebot/i,
  /Handlungsbedarf/i,
  /\bkritisch/i,
];

/** Geld ist im gesamten Demo-Datenbestand ausgeschlossen (WP-017 Nicht-Ziele, Guardrail). */
const GELD_VERBOTEN = [
  /€/,
  /\bEUR\b/,
  /Euro/i,
  /Preis/i,
  /Kosten/i,
  /Budget/i,
  /Währung/i,
  /Betrag/i,
];

/**
 * WORTGLEICHE NEGATION aus dem Produkt: der Satz verneint das Vokabular ausdrücklich und ist die
 * ehrliche Rahmung der Liste. Er wird vor der Prüfung entfernt – und sein Vorhandensein wird
 * selbst geprüft, damit die Ausnahme nicht still verfällt (Muster aus WP-016).
 */
const ERLAUBTE_NEGATIONEN = ['Es wird nichts gewichtet, nichts eingestuft und nichts empfohlen.'];

/**
 * BEGRÜNDETE AUSNAHME: Das Feld „priority" eines Quellenverweises (Dok. 07 §7 „Mehrere Quellen
 * mit Priorität möglich") erscheint als „· Priorität: 1". Das ist eine Rangfolge unter QUELLEN
 * und ausdrücklich keine Priorität oder Dringlichkeit der Entscheidung – dieselbe Anzeige wie auf
 * der Objekt-360-Seite. Sie wird vor der Prüfung entfernt, ihr Vorhandensein aber geprüft, damit
 * die Ausnahme nicht still zu einer echten Priorisierung verrutscht.
 */
const QUELLEN_PRIORITAET = /· Priorität: \d+/g;

/**
 * BEGRÜNDETE AUSNAHME (WP-020 Slice 5, AC 18): Der Feldabgleich zeigt die Dok.-06-Liste
 * „Decision Card – Pflichtfelder" mit WÖRTLICHEN Feldnamen – eines heißt „Kosten-, Zeit- und
 * Kapazitätsannahmen". Das ist ein zitierter Konzept-Feldname in einer Lückenliste, keine
 * Geldangabe der Seite (der Trägertext sagt ausdrücklich, dass Geldangaben ausgeschlossen
 * bleiben). Der exakte Name kommt aus der Datenquelle (nie dupliziert), wird vor der Prüfung
 * entfernt und sein Vorhandensein geprüft, damit die Ausnahme nicht still wächst.
 */
const DOK06_GELDWORT_FELD = (() => {
  const feld = DECISION_CARD_FIELDS_DOK06.find((f) => f.field.includes('Kosten'))?.field;
  if (!feld) {
    // Fail-loud (QA-Finding): ohne Anker würde ein leerer String gestrippt und die Ausnahme
    // liefe still ins Leere – der Wächter wäre an dieser Stelle blind.
    throw new Error('Ausnahme-Anker fehlt: Dok.-06-Feld mit „Kosten" nicht gefunden');
  }
  return feld;
})();

/**
 * Zusätzlich verboten in den DATENABSCHNITTEN. Im Rahmungsabsatz unter der Leitfrage und im
 * Ehrlichkeitsblock sind diese Begriffe zulässig und notwendig: dort wird BENANNT, dass es kein
 * Feld für Frist, Priorität oder Empfehlung gibt. Eine benannte Lücke ist keine Bewertung.
 */
const NUR_IN_DER_LUECKE = [
  /\bFrist/i,
  /f(ä|ae)llig/i,
  /Priorität/i,
  /dringend/i,
  /Dringlichkeit/i,
  /Empfehlung/i,
  /empfehl/i,
  /empfohlen/i,
];

describe('EntscheidungenContent – kein Score, keine Priorisierung, keine Geldangabe', () => {
  it('enthält für keine Rolle, neutral und keinen Mandanten Bewertungs- oder Geldvokabular', () => {
    // Review-Pass (QA-Finding): der NEUTRALE Zustand steht als fünfte Perspektive mit unter
    // dem Wächter – auch seine Leisten-/Kopftexte dürfen weder werten noch Geld nennen.
    for (const demoRole of [role('R01'), role('R03'), role('R07'), role('R12'), null]) {
      for (const tenantId of [
        TENANT_ID.NORDWERK,
        TENANT_ID.CONSULTING_OPERATOR,
        TENANT_ID.FINOVIA,
      ]) {
        const kennung = demoRole?.id ?? 'neutral';
        const { container, unmount } = render(
          <EntscheidungenContent role={demoRole} tenant={tenant(tenantId)} />,
        );
        let text = container.textContent ?? '';
        for (const negation of ERLAUBTE_NEGATIONEN) {
          if (tenantId === TENANT_ID.NORDWERK) {
            expect(
              text,
              `${kennung}/${tenantId}: die begründete Ausnahme „${negation}" steht nicht mehr im Text`,
            ).toContain(negation);
          }
          text = text.split(negation).join(' ');
        }
        // WP-020 Slice 5: der zitierte Dok.-06-Feldname mit Geldwort (Begründung oben an
        // `DOK06_GELDWORT_FELD`) – der Abgleich rendert für jeden bekannten Mandanten.
        expect(
          text,
          `${kennung}/${tenantId}: der zitierte Dok.-06-Feldname steht nicht mehr im Text`,
        ).toContain(DOK06_GELDWORT_FELD);
        text = text.split(DOK06_GELDWORT_FELD).join(' ');
        for (const muster of [...BEWERTUNG_VERBOTEN, ...GELD_VERBOTEN]) {
          expect(
            muster.test(text),
            `${kennung}/${tenantId}: „${muster}" darf nicht im Text stehen`,
          ).toBe(false);
        }

        // Datenabschnitte ohne Rahmungsabsatz und ohne Ehrlichkeitsblock.
        const klon = container.cloneNode(true) as HTMLElement;
        klon.querySelector('#entscheidungen-rahmung')?.remove();
        klon.querySelector('section[aria-labelledby="entscheidungen-luecke"]')?.remove();
        let datentext = klon.textContent ?? '';
        for (const negation of ERLAUBTE_NEGATIONEN) {
          datentext = datentext.split(negation).join(' ');
        }
        if (tenantId === TENANT_ID.NORDWERK) {
          expect(
            datentext.match(QUELLEN_PRIORITAET),
            `${kennung}/${tenantId}: die Quellen-Priorität steht nicht mehr im Text`,
          ).not.toBeNull();
        }
        datentext = datentext.replace(QUELLEN_PRIORITAET, ' ');
        for (const muster of NUR_IN_DER_LUECKE) {
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
 * 10. Ehrlichkeitsblock
 * --------------------------------------------------------------------------- */

describe('Wächter-Fixture-Negativbeweise (Review-Pass, QA-Finding)', () => {
  it('jedes BEWERTUNG_VERBOTEN- und GELD_VERBOTEN-Muster greift auf ein Fixture – Produkttext nicht', () => {
    const bewertungsFixture =
      'Score Ampel Reifegrad Trend 10 Prozent % Schwellenwert Rang Schweregrad ' +
      'Serviceangebot Handlungsbedarf kritisch';
    for (const muster of BEWERTUNG_VERBOTEN) {
      expect(muster.test(bewertungsFixture), `Fixture löst „${muster}" nicht aus`).toBe(true);
    }
    const geldFixture = '€ 5 EUR Euro Preis Kosten Budget Währung Betrag';
    for (const muster of GELD_VERBOTEN) {
      expect(muster.test(geldFixture), `Fixture löst „${muster}" nicht aus`).toBe(true);
    }
    // Unauffällige Produktsprache schlägt nicht an (Wächter nicht überscharf).
    const legitim = 'Erfasste Entscheidung mit Nachweisbezug und getrennten Zeitachsen.';
    for (const muster of [...BEWERTUNG_VERBOTEN, ...GELD_VERBOTEN]) {
      expect(muster.test(legitim), `„${muster}" schlägt auf legitimen Text an`).toBe(false);
    }
  });
});

describe('EntscheidungenContent – Ehrlichkeitsblock „Was eine Entscheidung hier noch nicht zeigt"', () => {
  function lueckenAbschnitt(): HTMLElement {
    return screen
      .getByRole('heading', { level: 2, name: 'Was eine Entscheidung hier noch nicht zeigt' })
      .closest('section') as HTMLElement;
  }

  beforeEach(() => {
    render(<EntscheidungenContent role={role('R01')} tenant={tenant(TENANT_ID.NORDWERK)} />);
  });

  /** Die Liste der 14 Card-Pflichtfelder – getrennt von der Decision-Record-Liste darunter. */
  function pflichtfeldListe(): HTMLElement {
    return lueckenAbschnitt().querySelector('#entscheidungen-luecke-pflichtfelder') as HTMLElement;
  }

  it('sagt ausdrücklich, dass dies keine Decision Card im Sinne des Konzepts ist', () => {
    const abschnitt = lueckenAbschnitt();
    expect(within(abschnitt).getByText(/keine Decision Card/)).toBeInTheDocument();
    // WP-028/DR-0013: die fachliche Zielvorgabe wird in Domänensprache benannt, ohne
    // Dokument-/Paragraphenkennung im gerenderten Text.
    expect(abschnitt.textContent ?? '').toMatch(/im Sinne der fachlichen Zielvorgabe des Konzepts/);
    expect(abschnitt.textContent ?? '').not.toMatch(/Dok\.\s*10/);
  });

  it('nennt jedes der 14 Pflichtfelder feldweise mit seinem Deckungsgrad', () => {
    const abschnitt = lueckenAbschnitt();
    for (const feld of DECISION_CARD_FIELDS) {
      expect(within(abschnitt).getByText(feld.field)).toBeInTheDocument();
      expect(within(abschnitt).getByText(feld.carrier)).toBeInTheDocument();
    }
    // Deckungsgrad als Text, nie nur als Farbe – gezählt in der Pflichtfeldliste selbst, damit
    // die zweite Liste (Decision Record, Dok. 10 §9.2) die Zahl nicht verfälscht.
    const ohneTraeger = DECISION_CARD_FIELDS.filter((f) => f.coverage === 'kein Träger').length;
    // Review-Pass (Domain-Finding): „Wirkung" ist von „kein Träger" auf „teilweise" gehoben
    // (Teil-Träger Wirkungsannahme der Beziehung; CCP-004-Vorbehalt in der Datenquelle) –
    // damit 8 statt 9 ohne Träger.
    expect(ohneTraeger).toBe(8);
    expect(
      within(pflichtfeldListe()).getAllByText(/im heutigen Datenmodell: kein Träger/),
    ).toHaveLength(ohneTraeger);
    expect(
      within(pflichtfeldListe()).getAllByText(/im heutigen Datenmodell: teilweise/),
    ).toHaveLength(6);
    // Und die Kopfzeile nennt genau diese beiden Zahlen (gezählt, nicht geschrieben).
    expect(abschnitt.textContent ?? '').toMatch(/8 keinen Träger/);
    expect(abschnitt.textContent ?? '').toMatch(/6 nur teilweise/);
  });

  /**
   * Dok. 10 beschreibt den Decision Record im selben Abschnitt EIGENSTÄNDIG (§9.2) – mit einer
   * zweiten Inhaltsliste. Sie wird getrennt geführt und getrennt gezählt (Review-Fix).
   */
  it('führt die Decision-Record-Inhalte aus Dok. 10 §9.2 getrennt und mit dem Korrekturmodell', () => {
    const abschnitt = lueckenAbschnitt();
    const liste = abschnitt.querySelector('#entscheidungen-luecke-record') as HTMLElement;
    expect(liste).not.toBeNull();

    for (const inhalt of DECISION_RECORD_CONTENTS) {
      expect(within(liste).getByText(inhalt.field)).toBeInTheDocument();
      expect(within(liste).getByText(inhalt.carrier)).toBeInTheDocument();
    }
    expect(within(liste).getAllByText(/im heutigen Datenmodell: kein Träger/)).toHaveLength(
      DECISION_RECORD_CONTENTS.length,
    );

    // Das Zitat steht wörtlich da – und die Ablösekette wird als genau dieses Korrekturmodell
    // benannt, ohne mehr zu behaupten, als der Datenbestand trägt.
    const text = abschnitt.textContent ?? '';
    expect(text).toContain('Nach Freigabe wird die Karte zum unveränderbaren Decision Record.');
    expect(text).toContain('Korrekturen erfolgen als neue Version oder Nachtrag.');
    expect(text).toMatch(/Korrekturen entstehen als neuer Stand, nicht als Überschreibung/);
  });

  /**
   * WP-020 Slice 5 (AC 18): der Feldabgleich läuft jetzt gegen BEIDE Pflichtfeldlisten –
   * Dok. 10 „Pflichtfelder" (oben) UND Dok. 06 „Decision Card – Pflichtfelder" – samt benanntem
   * Widerspruch (O-WP017-11 bleibt offen: keine Liste wird kanonisch erklärt).
   */
  it('AC 18: zeigt die Dok.-06-Zweitliste feldweise mit Deckungsgrad', () => {
    const abschnitt = lueckenAbschnitt();
    const liste = abschnitt.querySelector('#entscheidungen-luecke-dok06') as HTMLElement;
    expect(liste).not.toBeNull();

    expect(DECISION_CARD_FIELDS_DOK06).toHaveLength(8);
    for (const feld of DECISION_CARD_FIELDS_DOK06) {
      expect(within(liste).getByText(feld.field)).toBeInTheDocument();
      expect(within(liste).getByText(feld.carrier)).toBeInTheDocument();
    }
    // Deckungsgrade als Text – gezählt aus der Liste, nirgends als Konstante geschrieben.
    expect(within(liste).getAllByText(/im heutigen Datenmodell: kein Träger/)).toHaveLength(
      countFields(DECISION_CARD_FIELDS_DOK06, 'kein Träger'),
    );
    expect(within(liste).getAllByText(/im heutigen Datenmodell: teilweise/)).toHaveLength(
      countFields(DECISION_CARD_FIELDS_DOK06, 'teilweise'),
    );
    // Die Feldnamen sind die WÖRTLICHEN acht aus dem PDF-Abschnitt „Collaboration,
    // Entscheidungen & Freigaben" – festgenagelt gegen stilles Umformulieren.
    expect(DECISION_CARD_FIELDS_DOK06.map((f) => f.field)).toEqual([
      'Entscheidungsfrage und Frist',
      'Optionen einschließlich Nichtstun',
      'Business-/Zielwirkung und Risiken',
      'Kosten-, Zeit- und Kapazitätsannahmen',
      'Datenquellen, Lücken und Vertrauensgrad',
      'Empfehlung und Gegenargument',
      'Entscheider, Vertretung und Freigabestufe',
      'Review-Datum und Erfolgskriterium',
    ]);
  });

  it('AC 18: benennt den Widerspruch beider Listen, ohne eine zur kanonischen zu erklären', () => {
    const abschnitt = lueckenAbschnitt();
    const text = abschnitt.textContent ?? '';

    // Beide Listen mit ihren Zählungen benannt (WP-028/DR-0013: ohne Dokument-/Abschnittskennung
    // im gerenderten Text).
    expect(text).toMatch(/widerspricht der ersten Liste/);
    expect(text).not.toContain('Collaboration, Entscheidungen & Freigaben');
    expect(text).toContain(`${DECISION_CARD_FIELDS_DOK06.length} Feldern`);
    expect(text).toContain(`${DECISION_CARD_FIELDS.length} Felder`);
    // Der Widerspruch bleibt OFFEN – keine Liste wird entschieden (O-WP017-11).
    expect(text).toMatch(/Welche Liste kanonisch ist, ist im Konzept nicht entschieden/);
    expect(text).toMatch(/wird hier nicht entschieden/);
    // Und es wird weiterhin KEINE Decision Card gebaut (bestehende Aussage bleibt).
    expect(within(abschnitt).getByText(/keine Decision Card/)).toBeInTheDocument();
  });

  it('benennt die Grenze der Leitfrage auch hier – ohne sie zu beantworten', () => {
    const abschnitt = lueckenAbschnitt();
    expect(abschnitt.textContent ?? '').toContain(getPlace('entscheidungen').question);
    expect(within(abschnitt).getByText(/nicht zu beantworten/)).toBeInTheDocument();
  });

  it('gibt kein Roadmap-, Termin- oder Funktionsversprechen und kein internes Prozessvokabular', () => {
    const abschnitt = lueckenAbschnitt();
    const text = abschnitt.textContent ?? '';
    expect(text).toMatch(/kein Zeitplan/);
    for (const muster of [
      /kommt bald/i,
      /in Kürze/i,
      /demnächst/i,
      /geplant für/i,
      /wird künftig/i,
      /Roadmap/i,
      /Work Package/i,
      /Arbeitspaket/i,
      /\bWP-\d/,
      /Sprint/i,
      /Backlog/i,
    ]) {
      expect(muster.test(text), `„${muster}" darf im Produkttext nicht stehen`).toBe(false);
    }
  });

  it('nennt kein internes Prozessvokabular auf der ganzen Seite', () => {
    const seite = screen.getByRole('heading', { level: 1, name: 'Entscheidungen' })
      .parentElement as HTMLElement;
    const text = seite.textContent ?? '';
    for (const muster of [/Work Package/i, /Arbeitspaket/i, /\bWP-\d/, /Backlog/i, /Sprint/i]) {
      expect(muster.test(text), `„${muster}" darf im Produkttext nicht stehen`).toBe(false);
    }
  });
});

/* -----------------------------------------------------------------------------
 * 11. A11y – Heading-Hierarchie ohne Sprung
 * --------------------------------------------------------------------------- */

describe('EntscheidungenContent – Heading-Hierarchie', () => {
  for (const tenantId of [TENANT_ID.NORDWERK, TENANT_ID.CONSULTING_OPERATOR, TENANT_ID.FINOVIA]) {
    it(`beginnt bei h1 und springt für ${tenantId} keine Ebene`, () => {
      render(<EntscheidungenContent role={role('R01')} tenant={tenant(tenantId)} />);
      const level = screen
        .getAllByRole('heading')
        .map((h) => Number(h.tagName.slice(1)))
        .filter((n) => Number.isFinite(n));

      expect(level[0]).toBe(1);
      expect(level.filter((n) => n === 1)).toHaveLength(1);
      let vorher = level[0];
      for (const aktuell of level.slice(1)) {
        expect(aktuell - vorher, `Sprung von h${vorher} auf h${aktuell}`).toBeLessThanOrEqual(1);
        vorher = aktuell;
      }
    });
  }
});

/* -----------------------------------------------------------------------------
 * 12. Sitzungsrahmen
 * --------------------------------------------------------------------------- */

describe('EntscheidungenView – Sitzungsrahmen (Simulation, keine Authz)', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('zeigt ohne Anmeldung einen Hinweis mit Link auf die Login-Simulation', () => {
    render(
      <SessionProvider>
        <EntscheidungenView />
      </SessionProvider>,
    );
    expect(
      screen.getByRole('heading', { name: /Nicht angemeldet \(Simulation\)/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Zur Anmelde-Simulation/ })).toHaveAttribute(
      'href',
      '/login',
    );
  });

  it('zeigt mit aktiver Session das Register des gewählten Mandanten', () => {
    window.localStorage.setItem(
      SESSION_STORAGE_KEY,
      serializeSession({ roleId: 'R03', tenantId: TENANT_ID.NORDWERK }),
    );
    render(
      <SessionProvider>
        <EntscheidungenView />
      </SessionProvider>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Entscheidungen' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Erfasste Entscheidungen' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: NORDWERK_MODEL.decisions[0].question }),
    ).toBeInTheDocument();
  });
});
