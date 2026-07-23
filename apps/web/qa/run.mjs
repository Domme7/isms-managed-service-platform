/**
 * Sichtbare Abnahme – Orchestrierung von `pnpm qa:visual <WP-Kennung>` (WP-018 Slice 2, ADR-0004).
 *
 * Ablauf (ein Kommando, kompletter Zyklus – DR-0007 E-03):
 *  1. Vorprüfungen OHNE Schreibaktion: WP-Kennung, Chromium vorhanden, QA-Port frei.
 *  2. Workspace-Abhängigkeiten von `apps/web` bauen (tsc → `packages/x/dist`, kein `.next`).
 *  3. QA-Build von `apps/web` in das GETRENNTE Verzeichnis `.next-qa` (NEXT_DIST_DIR,
 *     Briefing §7 Lektion 10: `apps/web/.next` des Dev-Servers wird nie berührt) –
 *     anschließend VERIFIZIERT die Build-Ziel-Wache genau das (Schritt 3b unten).
 *  4. Playwright-Lauf (Screenshots + axe) – der Server (Port 3100) wird vom Playwright-
 *     webServer gestartet und AUCH IM FEHLERFALL gestoppt; danach wird der Port nachgeprüft.
 *  5. Zusammenfassung: Dateiliste mit Größen, axe-Kurzbericht, Größen-Stop-Condition (> 5 MB).
 *
 * Läuft unter Windows/PowerShell; nach `pnpm install` + einmaligem
 * `pnpm --filter @isms/web exec playwright install chromium` ohne Netzwerkzugriff.
 */

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const webDir = fileURLToPath(new URL('..', import.meta.url));
const repoRoot = path.resolve(webDir, '..', '..');

/** Eigener QA-Port – bewusst NICHT 3000 (dort darf jederzeit der Dev-Server des Owners laufen). */
const QA_PORT = 3100;

/** Impact-Reihenfolge für den axe-Kurzbericht. */
const IMPACTS = ['critical', 'serious', 'moderate', 'minor'];

function abbruch(meldung) {
  // Neutrales Präfix: was bereits geschrieben wurde (oder eben nicht), sagt die jeweilige
  // kontextspezifische Einzelmeldung – ein pauschaler Zusatz hier wäre teils falsch.
  console.error(`\nABBRUCH:\n${meldung}`);
  process.exit(1);
}

/** Prüft, ob auf 127.0.0.1:<port> bereits etwas lauscht (Verbindungsprobe, kein Schreiben). */
function portBelegt(port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: '127.0.0.1', port, timeout: 1500 });
    socket.once('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.once('error', () => resolve(false));
    socket.once('timeout', () => {
      socket.destroy();
      resolve(false);
    });
  });
}

function kommando(beschreibung, argumente, optionen = {}) {
  console.log(`\n→ ${beschreibung}\n  pnpm ${argumente.join(' ')}`);
  // Ein Kommandostring statt (cmd, args): Windows braucht für pnpm.cmd eine Shell, und
  // Node warnt bei shell:true + Args-Array (DEP0190). Alle Argumente sind einfache Tokens
  // ohne Leerzeichen/Metazeichen (Pfade wandern über env, nicht über argv).
  const ergebnis = spawnSync(['pnpm', ...argumente].join(' '), {
    cwd: repoRoot,
    stdio: 'inherit',
    shell: true,
    ...optionen,
  });
  return ergebnis.status ?? 1;
}

function groesseFormat(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function main() {
  // 1a. WP-Kennung (Pflichtargument, AC 9: ohne Argument klare Fehlermeldung statt Raten).
  const wp = process.argv[2];
  if (!wp || !/^WP-\d{3}$/.test(wp)) {
    abbruch(
      `Es fehlt die WP-Kennung als Argument (Muster "WP-018").\n` +
        `Aufruf: pnpm qa:visual WP-018\n` +
        `Die Kennung bestimmt den Zielordner docs/project/visual/<WP-Kennung>/.`,
    );
  }

  // 1b. Chromium vorhanden? (einmalige, dokumentierte Installation – danach offline, AC 16)
  const { default: playwright } = await import('@playwright/test');
  const chromiumPfad = playwright.chromium.executablePath();
  if (!existsSync(chromiumPfad)) {
    abbruch(
      `Der Playwright-Chromium-Browser ist nicht installiert (erwartet: ${chromiumPfad}).\n` +
        `Einmalig installieren: pnpm --filter @isms/web exec playwright install chromium`,
    );
  }

  // 1c. QA-Port frei? (Konfliktlage klar benennen statt still zu scheitern)
  if (await portBelegt(QA_PORT)) {
    abbruch(
      `Port ${QA_PORT} ist bereits belegt. Der QA-Lauf braucht diesen Port für seinen eigenen\n` +
        `Server und startet deshalb nicht. Bitte den blockierenden Prozess beenden (z. B. einen\n` +
        `früheren, hängen gebliebenen QA-Server) und den Lauf wiederholen.\n` +
        `Hinweis: Ein Dev-Server auf Port 3000 ist KEIN Konflikt – er darf weiterlaufen.`,
    );
  }

  // Reine Information: Der Dev-Server des Owners darf laufen (getrenntes distDir + eigener Port).
  if (await portBelegt(3000)) {
    console.log(
      `Hinweis: Auf Port 3000 läuft ein Server (vermutlich der Dev-Server). Das ist in Ordnung –\n` +
        `dieser QA-Lauf baut nach apps/web/.next-qa und nutzt Port ${QA_PORT}; apps/web/.next\n` +
        `wird nicht berührt (Briefing §7 Lektion 10).`,
    );
  }

  // 2. Workspace-Abhängigkeiten bauen (nur tsc → packages/*/dist; bewusst OHNE turbo und
  //    OHNE @isms/web, damit kein Weg in apps/web/.next führt).
  const abhaengigkeiten = ['@isms/contracts', '@isms/demo-seed'];
  const filterArgs = abhaengigkeiten.flatMap((paket) => ['--filter', paket]);
  if (kommando('Workspace-Abhängigkeiten bauen (tsc)', [...filterArgs, 'run', 'build']) !== 0) {
    abbruch('Der Build der Workspace-Abhängigkeiten ist fehlgeschlagen (siehe Ausgabe oben).');
  }

  // 3. QA-Build in das getrennte Verzeichnis `.next-qa`.
  //    Vorher den Ist-Zustand für die Build-Ziel-Wache (3b) festhalten.
  const qaDist = path.join(webDir, '.next-qa');
  const devDist = path.join(webDir, '.next');
  const devDistMtimeVorher = existsSync(devDist) ? statSync(devDist).mtimeMs : null;
  // 2 s Toleranz gegen grobe Dateisystem-Zeitstempel (z. B. FAT-Granularität).
  const laufStart = Date.now() - 2000;
  const buildStatus = kommando(
    'QA-Build von apps/web nach .next-qa (getrennt vom Dev-Server)',
    ['--filter', '@isms/web', 'exec', 'next', 'build'],
    { env: { ...process.env, NEXT_DIST_DIR: '.next-qa' } },
  );
  if (buildStatus !== 0) {
    abbruch('Der QA-Build ist fehlgeschlagen (siehe Ausgabe oben). apps/web/.next ist unberührt.');
  }

  // 3b. Build-Ziel-Wache. WARUM: Der gesamte Lektion-10-Schutz hängt an EINER Zeile in
  //     apps/web/next.config.mjs (`distDir: process.env.NEXT_DIST_DIR ?? '.next'`). Fiele sie
  //     weg, liefe dieser Lauf GRÜN weiter, baute aber wieder nach apps/web/.next – exakt die
  //     Korruptionsgefahr neben einem laufenden Dev-Server, die Lektion 10 verbietet. Deshalb
  //     wird das Build-Ziel hier VERIFIZIERT statt angenommen: `.next-qa/BUILD_ID` muss
  //     existieren und frischer als der Laufstart sein; `.next` (falls vorhanden) unverändert.
  const buildIdPfad = path.join(qaDist, 'BUILD_ID');
  if (!existsSync(buildIdPfad)) {
    abbruch(
      `Build-Ziel-Wache: apps/web/.next-qa/BUILD_ID existiert nach dem QA-Build nicht.\n` +
        `Der Build ist NICHT in .next-qa gelandet. Vermutliche Ursache: In apps/web/next.config.mjs\n` +
        `fehlt oder greift die Zeile "distDir: process.env.NEXT_DIST_DIR ?? '.next'" nicht mehr\n` +
        `(Briefing §7 Lektion 10). Nicht weiterarbeiten, bis der Build nachweislich nach .next-qa geht.`,
    );
  }
  if (statSync(buildIdPfad).mtimeMs < laufStart) {
    abbruch(
      `Build-Ziel-Wache: apps/web/.next-qa/BUILD_ID ist älter als der Start dieses Laufs –\n` +
        `der QA-Build hat .next-qa nicht neu geschrieben (Reststand eines früheren Laufs?).\n` +
        `Vermutlich landet der Build woanders; NEXT_DIST_DIR-Anbindung in apps/web/next.config.mjs\n` +
        `prüfen (Briefing §7 Lektion 10).`,
    );
  }
  const devDistMtimeNachher = existsSync(devDist) ? statSync(devDist).mtimeMs : null;
  if (devDistMtimeVorher !== devDistMtimeNachher) {
    abbruch(
      `Build-Ziel-Wache: apps/web/.next hat sich während des QA-Builds verändert\n` +
        `(mtime/Existenz vorher: ${devDistMtimeVorher}, nachher: ${devDistMtimeNachher}).\n` +
        `Der QA-Build darf .next niemals berühren – dort arbeitet ggf. der Dev-Server des Owners\n` +
        `(Briefing §7 Lektion 10). Ursache klären; falls parallel der Dev-Server aktiv kompiliert\n` +
        `hat, den Lauf in einer ruhigen Phase wiederholen.`,
    );
  }
  console.log(
    `\nBuild-Ziel-Wache: verifiziert – apps/web/.next-qa/BUILD_ID ist frisch (dieser Lauf),\n` +
      `apps/web/.next ist unberührt.`,
  );

  // 4a. Zielordner vorbereiten; Artefakte des LETZTEN Laufs entfernen, damit der Ordner
  //     exakt den aktuellen Lauf zeigt (gleiche Namen werden ohnehin überschrieben).
  const outDir = path.join(repoRoot, 'docs', 'project', 'visual', wp);
  mkdirSync(outDir, { recursive: true });
  for (const datei of readdirSync(outDir)) {
    if (datei.endsWith('.png') || datei === 'axe-report.json') {
      rmSync(path.join(outDir, datei));
    }
  }

  // 4b. Playwright-Lauf. Der Server (next start -p 3100, .next-qa) wird vom Playwright-
  //     webServer verwaltet und auch bei roten Tests wieder gestoppt (Nachprüfung unten).
  const probe = process.env.QA_VISUAL_PROBE_FAIL === '1';
  if (probe) {
    console.log(
      '\nFEHLPROBE aktiv (QA_VISUAL_PROBE_FAIL=1): Es wird ein Fehler nach Serverstart provoziert,',
    );
    console.log('um den Serverstopp im Fehlerfall nachzuweisen (AC 9).');
  }
  const playwrightArgs = [
    '--filter',
    '@isms/web',
    'exec',
    'playwright',
    'test',
    '--config',
    'qa/playwright.config.ts',
  ];
  if (probe) playwrightArgs.push('--max-failures=1');
  const testStatus = kommando('Screenshots + axe (Playwright, Chromium headless)', playwrightArgs, {
    env: { ...process.env, QA_OUT_DIR: outDir, QA_WP: wp, QA_PORT: String(QA_PORT) },
  });

  if (testStatus !== 0) {
    console.error(
      `\nHinweis: Der Playwright-Lauf war rot – die Artefakte unter docs/project/visual/${wp}/\n` +
        `sind der UNVOLLSTÄNDIGE Stand dieses Laufs (die alten Artefakte wurden vor dem Lauf\n` +
        `entfernt). Der letzte committete Stand ist wiederherstellbar:\n` +
        `  git restore docs/project/visual/${wp}`,
    );
  }

  // 4c. Nachprüfung: kein Zombie-Prozess, kein belegter Port (Stop Condition des WP).
  if (await portBelegt(QA_PORT)) {
    console.error(
      `\nFEHLER: Port ${QA_PORT} ist nach dem Lauf noch belegt – der QA-Server wurde nicht sauber\n` +
        `gestoppt. Bitte den Prozess manuell beenden (Windows: netstat -ano | findstr :${QA_PORT},\n` +
        `dann taskkill /PID <PID> /T /F) und den Befund melden.`,
    );
    process.exit(1);
  }
  console.log(`\nPort ${QA_PORT} ist wieder frei (Server gestoppt, auch im Fehlerfall).`);

  // 5. Zusammenfassung: Artefakte + Größen + axe-Kurzbericht.
  const dateien = readdirSync(outDir)
    .filter((datei) => datei.endsWith('.png') || datei === 'axe-report.json')
    .sort();
  let gesamt = 0;
  let einzelUeberLimit = false;
  console.log(`\nArtefakte unter docs/project/visual/${wp}/:`);
  for (const datei of dateien) {
    const groesse = statSync(path.join(outDir, datei)).size;
    gesamt += groesse;
    if (groesse > 1024 * 1024) einzelUeberLimit = true;
    console.log(`  ${datei.padEnd(48)} ${groesseFormat(groesse).padStart(10)}`);
  }
  console.log(`  ${'GESAMT'.padEnd(48)} ${groesseFormat(gesamt).padStart(10)}`);
  if (gesamt > 5 * 1024 * 1024 || einzelUeberLimit) {
    console.error(
      `\nSTOP CONDITION (WP-018): Artefaktgröße über dem Limit (> 5 MB je Lauf oder > 1 MB je\n` +
        `Datei). NICHT committen – Strategie dokumentieren (Format, Ausschnitt, Aufbewahrung).`,
    );
    process.exit(1);
  }

  const reportPfad = path.join(outDir, 'axe-report.json');
  if (existsSync(reportPfad)) {
    const report = JSON.parse(readFileSync(reportPfad, 'utf8'));
    console.log('\naxe-Kurzbericht (WCAG 2.x A/AA, Desktop-Viewport):');
    for (const seite of report.seiten) {
      const anzahl = IMPACTS.map((impact) => `${impact}: ${seite.anzahlVerstoesse[impact] ?? 0}`);
      console.log(`  ${seite.slug.padEnd(40)} ${anzahl.join('  ')}`);
    }
  } else if (testStatus === 0) {
    console.error('\nFEHLER: axe-report.json fehlt, obwohl der Lauf grün war – bitte melden.');
    process.exit(1);
  }

  process.exit(testStatus);
}

main().catch((fehler) => {
  console.error('\nUnerwarteter Fehler im QA-Lauf:', fehler);
  process.exit(1);
});
