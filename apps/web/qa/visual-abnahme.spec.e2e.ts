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
 * Die sieben Seiten des Motivbestands (AC 10). Die Objekt-360-Seite nutzt die stabile
 * Seed-Konstante NORDWERK_OBJECT_ID.RISK_BETRIEBSUNTERBRECHUNG – kein ID-Literal.
 */
const SEITEN = [
  { slug: 'heute', pfad: '/heute' },
  { slug: 'twin', pfad: '/twin' },
  { slug: 'twin-tenant-nordwerk', pfad: `/twin/${MANDANT_ID}` },
  { slug: 'isms', pfad: '/isms' },
  { slug: 'services', pfad: '/services' },
  { slug: 'entscheidungen', pfad: '/entscheidungen' },
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
    // Überschreibt die R01-Sitzung aus dem beforeEach mit einer ROLLENLOSEN Sitzung
    // (Init-Skripte laufen in Registrierungsreihenfolge – dieses hier zuletzt): so entsteht
    // der Abnahme-Blick auf den Produkteinstieg nach DR-0009.
    const neutral = serializeSession({ tenantId: MANDANT_ID });
    await page.addInitScript(
      ([key, value]) => {
        window.localStorage.setItem(key, value);
      },
      [SESSION_STORAGE_KEY, neutral] as const,
    );
    await page.goto('/heute');
    await expect(page.locator('main h1').first()).toBeVisible();
    await expect(page.locator('main')).not.toContainText('Lade Kontext');
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: path.join(outDir as string, `heute-neutral.${testInfo.project.name}.png`),
    });

    if (testInfo.project.name === 'desktop') {
      const ergebnis = await new AxeBuilder({ page }).withTags([...AXE_TAGS]).analyze();
      axeEngine = { name: ergebnis.testEngine.name, version: ergebnis.testEngine.version };
      const anzahlVerstoesse: Record<string, number> = {};
      for (const verstoss of ergebnis.violations) {
        const impact = verstoss.impact ?? 'unbekannt';
        anzahlVerstoesse[impact] = (anzahlVerstoesse[impact] ?? 0) + 1;
      }
      axeErgebnisse.push({
        slug: 'heute-neutral',
        pfad: '/heute',
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
  });

  for (const seite of SEITEN) {
    test(`${seite.slug} (${seite.pfad})`, async ({ page }, testInfo) => {
      await page.goto(seite.pfad);

      // Bereitschaft pollen statt schlafen (.claude/rules/testing.md): Überschrift sichtbar,
      // Hydrations-Platzhalter „Lade Kontext …" verschwunden, Webfonts geladen.
      await expect(page.locator('main h1').first()).toBeVisible();
      await expect(page.locator('main')).not.toContainText('Lade Kontext');
      await page.evaluate(() => document.fonts.ready);

      // Größenstrategie (ADR-0004, Stop Condition des WP): exakt der Viewport (1440×900 bzw.
      // 390×844), bewusst KEIN fullPage – der Full-Page-Probelauf ergab 7,4 MB je Lauf mit
      // Einzeldateien > 1 MB und riss damit das 5-MB-Budget. Wer die ganze Seite sehen will,
      // scrollt im laufenden Produkt; die Screenshots sind der Abnahme-Erstblick.
      await page.screenshot({
        path: path.join(outDir as string, `${seite.slug}.${testInfo.project.name}.png`),
      });

      if (testInfo.project.name === 'desktop') {
        const ergebnis = await new AxeBuilder({ page }).withTags([...AXE_TAGS]).analyze();
        axeEngine = { name: ergebnis.testEngine.name, version: ergebnis.testEngine.version };
        const anzahlVerstoesse: Record<string, number> = {};
        for (const verstoss of ergebnis.violations) {
          const impact = verstoss.impact ?? 'unbekannt';
          anzahlVerstoesse[impact] = (anzahlVerstoesse[impact] ?? 0) + 1;
        }
        axeErgebnisse.push({
          slug: seite.slug,
          pfad: seite.pfad,
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
    });
  }
});
