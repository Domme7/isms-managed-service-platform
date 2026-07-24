/**
 * Sichtbare Abnahme: Screenshots + axe der sieben echten Seiten (WP-018 Slice 2, DR-0007 E-03).
 *
 * Konzeptverankerung (Dok. 20C, am PDF gegengelesen – Regel Null):
 *  - Abschnitt „Pull-Request Gate": „Accessibility-Prüfung für betroffene UI",
 *    „visuelle Regression für zentrale Screens, PDF und PPTX",
 *  - Abschnitt „Teststrategie", Zeilen Accessibility und Visual,
 *  - Abschnitt „Phase 1 – Product Shell und Demo Foundation": „Baseline für Accessibility,
 *    Visual Regression und E2E".
 *
 * GRENZEN (ehrlich, O-WP018-02/-03): kein Pixelvergleich (Screenshots sind Abnahme-Artefakte
 * für Menschen) und axe misst nur den automatisierbaren Teil von Accessibility – Tastatur und
 * Screenreader-Semantik bleiben manuelle Prüfung.
 *
 * axe-Verstöße werden FINDINGS, keine Fixes (WP-018 Nicht-Ziel; Ausnahme nur AC 24).
 *
 * Nur über `pnpm qa:visual <WP-Kennung>` starten (apps/web/qa/run.mjs setzt QA_OUT_DIR und
 * baut vorher nach `.next-qa`). Endung `.spec.e2e.ts` liegt bewusst außerhalb des
 * vitest-Einsammel-Musters (`*.test.ts` / `*.test.tsx`, siehe apps/web/vitest.config.ts).
 */

import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { AxeBuilder } from '@axe-core/playwright';
import { NORDWERK_OBJECT_ID, TENANT_ID } from '@isms/demo-seed';
import { expect, test } from '@playwright/test';
import { COCKPIT_STORAGE_KEY, serializeCockpitVariante } from '../lib/cockpit/varianten';
import { NAV_PLACES } from '../lib/shell/places';
import { getRole } from '../lib/shell/roles';
import { SESSION_STORAGE_KEY, serializeSession } from '../lib/shell/session';

const outDir = process.env.QA_OUT_DIR;
if (!outDir) {
  throw new Error(
    'QA_OUT_DIR fehlt. Diesen Spec nicht direkt starten, sondern über: pnpm qa:visual <WP-Kennung>',
  );
}

/**
 * Dokumentierte Default-Perspektive der sichtbaren Abnahme (AC 11, O-WP018-06):
 * Rolle R01 (Executive Sponsor) im Mandanten Nordwerk. Die IDs kommen aus dem Rollenmodell
 * bzw. dem Seed – nicht als lose Literale.
 *
 * SESSION-FORMAT SEIT WP-020 SLICE 2 (DR-0009): `roleId` ist OPTIONAL – ohne Rolle ist die
 * Sitzung der NEUTRALE Einstieg. Das hier gesetzte Format mit Rolle bleibt ein gültiges
 * neues Format (abwärtskompatibler Schlüssel `isms-demo-session-v1`, Begründung in
 * `lib/shell/session.ts`). Die gepinnte R01-Perspektive bleibt die dokumentierte
 * Default-Abnahme; ZUSÄTZLICH wird `/heute` einmal im neutralen Zustand aufgenommen
 * (`heute-neutral`), weil das seit DR-0009 der Produkteinstieg ist.
 */
const ROLLEN_ID = 'R01';
const MANDANT_ID = TENANT_ID.NORDWERK;
if (!getRole(ROLLEN_ID)) {
  throw new Error(`Rolle ${ROLLEN_ID} existiert nicht (Rollenmodell geändert?) – Spec anpassen.`);
}

/**
 * Der Motivbestand: JEDER Live-Ort plus die Sub-Seiten (Mandanten-Detail, Objekt-360) und die
 * Kunden-Startseite. Die Objekt-360-Seite nutzt die stabile Seed-Konstante
 * NORDWERK_OBJECT_ID.RISK_BETRIEBSUNTERBRECHUNG – kein ID-Literal.
 *
 * WP-032: Mit `reports`, `wissen` und `administration` sind alle acht Orte live – die
 * Owner-Abnahme muss sie sehen, sonst zeigt die sichtbare Abnahme ein unvollständiges Produkt
 * (die Meta-Prüfung unten erzwingt das mechanisch).
 */
const SEITEN = [
  { slug: 'heute', pfad: '/heute' },
  { slug: 'twin', pfad: '/twin' },
  { slug: 'twin-tenant-nordwerk', pfad: `/twin/${MANDANT_ID}` },
  { slug: 'kunden', pfad: '/kunden' },
  { slug: 'isms', pfad: '/isms' },
  { slug: 'services', pfad: '/services' },
  { slug: 'entscheidungen', pfad: '/entscheidungen' },
  { slug: 'reports', pfad: '/reports' },
  { slug: 'wissen', pfad: '/wissen' },
  { slug: 'administration', pfad: '/administration' },
  {
    slug: 'objekt-360-risk-betriebsunterbrechung',
    pfad: `/twin/${MANDANT_ID}/objekt/${NORDWERK_OBJECT_ID.RISK_BETRIEBSUNTERBRECHUNG}`,
  },
] as const;

/** WCAG-2.x-A/AA-Regelwerk (AC 13) – deckt u. a. Kontrast, Rollen und zugängliche Namen ab. */
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

interface AxeSeitenErgebnis {
  readonly slug: string;
  readonly pfad: string;
  readonly anzahlVerstoesse: Record<string, number>;
  readonly verstoesse: ReadonlyArray<{
    readonly id: string;
    readonly impact: string;
    readonly beschreibung: string;
    readonly hilfe: string;
    readonly hilfeUrl: string;
    readonly wcagTags: readonly string[];
    readonly stellen: ReadonlyArray<{
      readonly ziel: string;
      readonly html: string;
      readonly zusammenfassung: string;
    }>;
  }>;
}

const axeErgebnisse: AxeSeitenErgebnis[] = [];
let axeEngine = { name: 'axe-core', version: 'unbekannt' };

/**
 * Schreibt den Report nach jeder Seite komplett neu (ein Worker, keine Races): auch ein
 * abgebrochener Lauf hinterlässt einen ehrlichen Teilstand. Vorbehalt: Startet Playwright nach
 * einem Fehler einen neuen Worker, beginnt dessen `axeErgebnisse` leer – der Report enthält
 * dann nur die Seiten SEIT dem Restart. Ein Teil-Report aus einem roten Lauf ist deshalb als
 * unvollständige Momentaufnahme zu lesen, nie als vollständige Messung. Bewusst ohne
 * Zeitstempel, damit ein wiederholter Lauf bei unverändertem Produkt denselben Report
 * erzeugt (AC 10).
 */
function schreibeReport(): void {
  const report = {
    hinweis:
      'axe misst nur den automatisierbaren Teil von Accessibility (O-WP018-03). ' +
      '0 Verstöße heißt NICHT „vollständig zugänglich". Verstöße werden Findings, keine Fixes.',
    werkzeug: axeEngine,
    regelwerk: AXE_TAGS,
    viewport: 'desktop-1440x900',
    perspektive: { rolleId: ROLLEN_ID, tenantId: MANDANT_ID },
    seiten: axeErgebnisse,
  };
  writeFileSync(
    path.join(outDir as string, 'axe-report.json'),
    `${JSON.stringify(report, null, 2)}\n`,
  );
}

/**
 * Gemeinsame axe-Sammlung je Seite (Code-Finding im Review-Pass: die Sammellogik war
 * dupliziert). Läuft nur im Desktop-Projekt; schreibt den Report nach jeder Seite neu.
 */
async function sammleAxe(
  page: import('@playwright/test').Page,
  slug: string,
  pfad: string,
): Promise<void> {
  const ergebnis = await new AxeBuilder({ page }).withTags([...AXE_TAGS]).analyze();
  axeEngine = { name: ergebnis.testEngine.name, version: ergebnis.testEngine.version };
  const anzahlVerstoesse: Record<string, number> = {};
  for (const verstoss of ergebnis.violations) {
    const impact = verstoss.impact ?? 'unbekannt';
    anzahlVerstoesse[impact] = (anzahlVerstoesse[impact] ?? 0) + 1;
  }
  axeErgebnisse.push({
    slug,
    pfad,
    anzahlVerstoesse,
    verstoesse: ergebnis.violations.map((verstoss) => ({
      id: verstoss.id,
      impact: verstoss.impact ?? 'unbekannt',
      beschreibung: verstoss.description,
      hilfe: verstoss.help,
      hilfeUrl: verstoss.helpUrl,
      wcagTags: verstoss.tags.filter((tag) => tag.startsWith('wcag')),
      stellen: verstoss.nodes.map((stelle) => ({
        ziel: stelle.target.join(' '),
        html: stelle.html,
        zusammenfassung: stelle.failureSummary ?? '',
      })),
    })),
  });
  schreibeReport();
}

/** Setzt eine abweichende Sitzung VOR dem ersten Seiten-Skript (überschreibt das beforeEach:
 *  Init-Skripte laufen in Registrierungsreihenfolge, dieses zuletzt). */
async function setzeSitzung(page: import('@playwright/test').Page, sitzung: string): Promise<void> {
  await page.addInitScript(
    ([key, value]) => {
      window.localStorage.setItem(key, value);
    },
    [SESSION_STORAGE_KEY, sitzung] as const,
  );
}

/** Bereitschaft pollen statt schlafen (.claude/rules/testing.md). */
async function warteAufSeite(page: import('@playwright/test').Page): Promise<void> {
  await expect(page.locator('main h1').first()).toBeVisible();
  await expect(page.locator('main')).not.toContainText('Lade Kontext');
  await page.evaluate(() => document.fonts.ready);
}

test.describe('Sichtbare Abnahme (Screenshots + axe)', () => {
  test.beforeEach(async ({ context }) => {
    // Deterministische Demo-Sitzung OHNE UI-Klickpfad (AC 11): der localStorage-Schlüssel
    // wird vor dem ersten Seiten-Skript gesetzt (Schlüssel + Format aus lib/shell/session.ts).
    const wert = serializeSession({ roleId: ROLLEN_ID, tenantId: MANDANT_ID });
    await context.addInitScript(
      ([key, value]) => {
        window.localStorage.setItem(key, value);
      },
      [SESSION_STORAGE_KEY, wert] as const,
    );
  });

  /**
   * META-PRÜFUNG (Muster der Wächter): Der Motivbestand deckt JEDEN Live-Ort ab. Wird künftig
   * ein Ort live geschaltet, ohne ihn hier einzutragen, wird dieser Test rot — statt dass die
   * sichtbare Owner-Abnahme still ein unvollständiges Produkt zeigt. (WP-032: genau das war
   * passiert — reports/wissen/administration fehlten im ersten Lauf.)
   */
  test('Meta: der Motivbestand deckt alle Live-Orte ab', () => {
    const abgedeckt = new Set<string>(SEITEN.map((s) => s.pfad));
    const fehlend = NAV_PLACES.filter((p) => p.live === true && !abgedeckt.has(p.href)).map(
      (p) => `${p.label} (${p.href})`,
    );
    expect(fehlend, 'Live-Orte ohne Screenshot-Motiv').toEqual([]);
  });

  test('Fehlprobe Serverstopp (nur mit QA_VISUAL_PROBE_FAIL=1)', () => {
    // Nachweis für AC 9: Ein provozierter Fehler NACH dem Serverstart darf keinen
    // Zombie-Prozess und keinen belegten Port hinterlassen (run.mjs prüft den Port nach).
    test.skip(process.env.QA_VISUAL_PROBE_FAIL !== '1', 'Nur für den AC-9-Nachweis provoziert.');
    throw new Error(
      'Provozierter Fehler nach Serverstart (AC 9) – der Server muss trotzdem stoppen.',
    );
  });

  test('heute-neutral (/heute ohne Rolle – neutraler Einstieg, DR-0009)', async ({
    page,
  }, testInfo) => {
    await setzeSitzung(page, serializeSession({ tenantId: MANDANT_ID }));
    await page.goto('/heute');
    await warteAufSeite(page);
    await page.screenshot({
      path: path.join(outDir as string, `heute-neutral.${testInfo.project.name}.png`),
    });
    if (testInfo.project.name === 'desktop') await sammleAxe(page, 'heute-neutral', '/heute');
  });

  for (const seite of SEITEN) {
    test(`${seite.slug} (${seite.pfad})`, async ({ page }, testInfo) => {
      await page.goto(seite.pfad);
      await warteAufSeite(page);

      // Größenstrategie (ADR-0004, Stop Condition des WP): exakt der Viewport (1440×900 bzw.
      // 390×844), bewusst KEIN fullPage – der Full-Page-Probelauf ergab 7,4 MB je Lauf mit
      // Einzeldateien > 1 MB und riss damit das 5-MB-Budget. Wer die ganze Seite sehen will,
      // scrollt im laufenden Produkt; die Screenshots sind der Abnahme-Erstblick.
      await page.screenshot({
        path: path.join(outDir as string, `${seite.slug}.${testInfo.project.name}.png`),
      });

      if (testInfo.project.name === 'desktop') await sammleAxe(page, seite.slug, seite.pfad);
    });
  }

  /**
   * ZUSATZMOTIVE der Dashboard-Schicht (Review-Pass, Product-Finding: die Owner-Abnahme muss
   * die Kacheln, den Rollenfokus, die /isms-Verdichtung und den leeren Mandanten wirklich
   * SEHEN). Abschnittsbezogene Element-Screenshots (Locator statt Viewport-Clip), nur Desktop
   * – die Kernseiten oben bleiben unverändert der Mobil-/Desktop-Bestand.
   */
  const ZUSATZMOTIVE: readonly {
    readonly slug: string;
    readonly pfad: string;
    readonly sitzung: string;
    /** CSS-Selektor des Abschnitts; `null` = ganzer Viewport (z. B. leerer Mandant). */
    readonly ausschnitt: string | null;
    /** axe nur für neue SEITEN-Zustände (Element-Shots derselben Seite doppeln nicht). */
    readonly mitAxe: boolean;
  }[] = [
    {
      slug: 'heute-dashboard-neutral',
      pfad: '/heute',
      sitzung: serializeSession({ tenantId: MANDANT_ID }),
      ausschnitt: 'section[aria-labelledby="heute-stand"]',
      mitAxe: false, // Seite bereits als heute-neutral vollständig ge-axed
    },
    {
      slug: 'heute-dashboard-r01',
      pfad: '/heute',
      sitzung: serializeSession({ roleId: 'R01', tenantId: MANDANT_ID }),
      ausschnitt: 'section[aria-labelledby="heute-stand"]',
      mitAxe: false, // Seite bereits als „heute" (R01) vollständig ge-axed
    },
    {
      slug: 'heute-dashboard-r03',
      pfad: '/heute',
      sitzung: serializeSession({ roleId: 'R03', tenantId: MANDANT_ID }),
      ausschnitt: 'section[aria-labelledby="heute-stand"]',
      mitAxe: true, // neuer Seitenzustand (ISMS-Manager-Variante)
    },
    {
      slug: 'heute-rollenfokus',
      pfad: '/heute',
      sitzung: serializeSession({ roleId: 'R03', tenantId: MANDANT_ID }),
      ausschnitt: '.rv-fokus',
      mitAxe: false,
    },
    {
      slug: 'isms-verdichtung',
      pfad: '/isms',
      sitzung: serializeSession({ roleId: 'R01', tenantId: MANDANT_ID }),
      ausschnitt: 'section[aria-labelledby="isms-ueberblick"]',
      mitAxe: false, // Seite bereits als „isms" vollständig ge-axed
    },
    {
      slug: 'heute-leerer-mandant',
      pfad: '/heute',
      sitzung: serializeSession({ roleId: 'R01', tenantId: TENANT_ID.FINOVIA }),
      ausschnitt: null,
      mitAxe: true, // neuer Seitenzustand (Datenlücken-Kachel)
    },
    /**
     * WP-028 Slice 4 (DR-0013 Nr. 11): Der Ort „Kunden" hat seit der Sphären-Kopplung ZWEI
     * Einstiege. Die gepinnte Default-Perspektive der Abnahme ist R01 – eine KUNDENrolle –,
     * die Seite `twin` oben zeigt deshalb ab jetzt die Ein-Unternehmens-Sicht. Damit die
     * Owner-Abnahme das Portfolio nicht verliert, wird es hier zusätzlich mit einer
     * Betreiberrolle aufgenommen. Beide Zustände sind eigenständige Seitenzustände und
     * werden deshalb beide ge-axed.
     */
    {
      slug: 'kunden-portfolio-r08',
      pfad: '/twin',
      sitzung: serializeSession({ roleId: 'R08', tenantId: MANDANT_ID }),
      ausschnitt: null,
      mitAxe: true,
    },
  ];

  for (const motiv of ZUSATZMOTIVE) {
    test(`${motiv.slug} (${motiv.pfad}, Zusatzmotiv)`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop', 'Zusatzmotiv nur Desktop (Review-Pass).');
      await setzeSitzung(page, motiv.sitzung);
      await page.goto(motiv.pfad);
      await warteAufSeite(page);

      if (motiv.ausschnitt) {
        const abschnitt = page.locator(motiv.ausschnitt).first();
        await abschnitt.scrollIntoViewIfNeeded();
        await abschnitt.screenshot({
          path: path.join(outDir as string, `${motiv.slug}.${testInfo.project.name}.png`),
        });
      } else {
        await page.screenshot({
          path: path.join(outDir as string, `${motiv.slug}.${testInfo.project.name}.png`),
        });
      }

      if (motiv.mitAxe) await sammleAxe(page, motiv.slug, motiv.pfad);
    });
  }

  /**
   * COCKPIT-VARIANTEN (WP-025, DR-0010 Nr. 3 – der eigentliche Owner-Vergleichspunkt): Die
   * Vergleichsseite `/cockpit` hängt unter „Heute" (kein neuer Nav-Ort). Jede der drei Varianten
   * wird deterministisch über den mandantenfreien localStorage-Schlüssel `COCKPIT_STORAGE_KEY`
   * angesteuert und erst nach Erscheinen ihres eindeutigen Bühnen-Ankers geschossen (kein
   * Hydration-Rennen). Alle drei werden ge-axed (eigenständige DOM-Zustände: Kachelraster,
   * Fragenkette, Weltband + Management-Modus). Default-Perspektive R01/Nordwerk (AC-gepinnt).
   */
  for (const variante of ['a', 'b', 'c'] as const) {
    test(`cockpit-variante-${variante} (/cockpit, WP-025 Owner-Vergleich)`, async ({
      page,
    }, testInfo) => {
      test.skip(
        testInfo.project.name !== 'desktop',
        'Cockpit-Varianten nur Desktop (Owner-Vergleich).',
      );
      // Session (beforeEach setzt R01/Nordwerk) + die deterministische Varianten-Wahl.
      await page.addInitScript(
        ([key, value]) => {
          window.localStorage.setItem(key, value);
        },
        [COCKPIT_STORAGE_KEY, serializeCockpitVariante(variante)] as const,
      );
      await page.goto('/cockpit');
      await warteAufSeite(page);
      // Auf den eindeutigen Bühnen-Anker der Variante warten (statt zu schlafen).
      await expect(page.locator(`[data-cockpit-variante="${variante}"]`)).toBeVisible();
      await page.screenshot({
        path: path.join(
          outDir as string,
          `cockpit-variante-${variante}.${testInfo.project.name}.png`,
        ),
      });
      await sammleAxe(page, `cockpit-variante-${variante}`, '/cockpit');
    });
  }
});
