/**
 * Playwright-Konfiguration der sichtbaren Abnahme (WP-018 Slice 2, ADR-0004).
 *
 * Wird ausschließlich über `pnpm qa:visual <WP-Kennung>` (apps/web/qa/run.mjs) gestartet –
 * der Orchestrator baut vorher nach `.next-qa` und setzt QA_OUT_DIR/QA_WP/QA_PORT.
 *
 * Bewusste Entscheidungen:
 *  - `workers: 1` + `fullyParallel: false`: deterministische Reihenfolge, ein Prozess sammelt
 *    die axe-Ergebnisse für den Report ein.
 *  - `webServer`: Playwright startet `next start` auf dem QA-Port gegen `.next-qa` und stoppt
 *    den Prozessbaum auch bei roten Tests (Windows-fest); `reuseExistingServer: false` bricht
 *    ab, statt einen fremden Prozess auf dem Port mitzubenutzen.
 *  - `reducedMotion: 'reduce'` + `deviceScaleFactor: 1`: reproduzierbare Screenshots (AC 11).
 */

import path from 'node:path';
import { defineConfig } from '@playwright/test';

const qaPort = Number(process.env.QA_PORT ?? 3100);
const webDir = path.resolve(__dirname, '..');

export default defineConfig({
  testDir: __dirname,
  // Eigene Endung `.spec.e2e.ts`: bewusst außerhalb des vitest-Patterns `**/*.test.{ts,tsx}`
  // (apps/web/vitest.config.ts) – kein `vitest run` sammelt diese Dateien ein (AC 16).
  testMatch: '**/*.spec.e2e.ts',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  timeout: 90_000,
  outputDir: path.join(__dirname, 'test-results'),
  use: {
    baseURL: `http://127.0.0.1:${qaPort}`,
    deviceScaleFactor: 1,
    contextOptions: { reducedMotion: 'reduce' },
    trace: 'off',
    video: 'off',
    screenshot: 'off',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobil', use: { viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: `pnpm exec next start -p ${qaPort}`,
    url: `http://127.0.0.1:${qaPort}/login`,
    cwd: webDir,
    reuseExistingServer: false,
    timeout: 120_000,
    env: { NEXT_DIST_DIR: '.next-qa' },
  },
});
