# ADR-0004 – Browser-QA: Playwright + axe-core für die sichtbare Abnahme (`pnpm qa:visual`)

- Status: Accepted (delegierte Werkzeugwahl, DR-0007 E-03: „Neue Abhängigkeit → eigener ADR")
- Datum: 2026-07-23
- Owner: Builder WP-018 (Vorschlag), Reviewer-Gates WP-018 (Prüfung); die Maßnahme selbst ist
  Owner-entschieden (DR-0007 E-03 „Ich baue es. Reversibel, kostet nur Rechenzeit")
- Betroffene Work Packages: WP-018 (Slice 2), alle folgenden (sichtbare Abnahme je WP)

## Kontext

DR-0007 E-03: Der Prozess soll die stärkste Fähigkeit des Owners bedienen – Produkturteil auf
einem sichtbaren Bildschirm. Kontrast, Rollen und zugängliche Namen werden **gemessen** statt
behauptet. Zusätzlich fängt die sichtbare Abnahme die Fehlerklasse, die keine bisherige
Testschicht sieht (WP-016-Renderfehler, Briefing §7 Lektion 7).

Konzeptverankerung Dok. 20C (am **PDF** gegengelesen, Regel Null):

- Abschnitt **„Pull-Request Gate"**: „Accessibility-Prüfung für betroffene UI", „visuelle
  Regression für zentrale Screens, PDF und PPTX",
- Abschnitt **„Teststrategie"**: Zeile **Accessibility** („bedienbare UI – Tastatur, Semantik,
  Kontrast, Screenreader") und Zeile **Visual** („Layoutstabilität – zentrale Screens, PDF,
  PPTX") – zugleich der Beleg der Grenzen dieses Slices (O-WP018-02/-03),
- Abschnitt **„Phase 1 – Product Shell und Demo Foundation"**: „Baseline für Accessibility,
  Visual Regression und E2E" – diese Baseline wird hiermit nachgeliefert.

Zwingender Rahmen: **Dev-Server-Konflikt** (Briefing §7 Lektion 10) – `pnpm build` und
`next dev` teilten sich `apps/web/.next` und haben sich zweimal gegenseitig zerschossen
(Symptom: 404 auf `page.js`-Chunks, Seite hängt bei „Lade Kontext …"). Der QA-Lauf muss bauen
und dienen können, **während** der Owner-Dev-Server auf Port 3000 läuft.

## Entscheidungsbedarf

1. Werkzeuge für Screenshots und automatisierte Accessibility-Messung (neue Abhängigkeiten).
2. Build-/Port-/`distDir`-Strategie gegen den Dev-Server-Konflikt.
3. Screenshot-Größenstrategie (WP-Budget: ≤ 5 MB je Lauf, ≤ 1 MB je Datei).

## Entscheidung

### Abhängigkeiten (exakt gepinnt, devDependencies in `apps/web`)

| Paket | Version | Rolle |
|---|---|---|
| `@playwright/test` | `1.61.1` | Browser-Steuerung + Test-Runner der QA-Specs; **Aktivierung** der ADR-0001-Zusage „Playwright (E2E, ab UI-Flows)" – kein Widerspruch, sondern Einlösung. Echte E2E-Nutzerreisen (20C „Teststrategie" Zeile E2E) bleiben offen (O-WP018-01). |
| `@axe-core/playwright` | `4.12.1` | axe-Adapter; bringt transitiv `axe-core@4.12.1` (Lockfile-gepinnt) – die **neue** Abhängigkeit gegenüber ADR-0001. |

Browser: Chromium über `pnpm --filter @isms/web exec playwright install chromium` (einmalig,
dokumentiert; auf der Owner-Maschine lag die benötigte Chromium-Revision v1228 bereits im
Playwright-Cache – kein Download nötig). Browser-Binaries werden **nie** committet; zur
Laufzeit des QA-Laufs ist kein Netzwerkzugriff nötig (lokaler Server, lokaler Browser).

### Ein Kommando: `pnpm qa:visual <WP-Kennung>`

`apps/web/qa/run.mjs` orchestriert (Windows/PowerShell-fest, Node/pnpm, keine Bash-Abhängigkeit):

1. **Vorprüfungen ohne Schreibaktion:** WP-Kennung (Muster `WP-018`; ohne Argument klare
   deutsche Fehlermeldung), Chromium vorhanden, QA-Port frei. Konfliktlagen brechen **vor**
   der ersten schreibenden Aktion mit benanntem Grund ab.
2. Workspace-Abhängigkeiten (`@isms/contracts`, `@isms/demo-seed`) per `tsc` bauen – bewusst
   ohne turbo und ohne `@isms/web`, damit kein Weg in `apps/web/.next` führt.
3. QA-Build nach **`.next-qa`** (getrenntes Verzeichnis, s. u.).
4. Playwright-Lauf: Screenshots + axe; der Server läuft als Playwright-`webServer` und wird
   **auch im Fehlerfall** gestoppt (Prozessbaum-Kill, Windows-fest); `run.mjs` prüft den Port
   danach nach – ein Zombie wäre ein harter Fehler mit Anleitung.
5. Zusammenfassung: Artefaktliste mit Größen, Größen-Stop-Condition, axe-Kurzbericht.

Der Zielordner `docs/project/visual/<WP-Kennung>/` wird vor dem Lauf von Artefakten des
letzten Laufs geleert (nur `*.png` + `axe-report.json`), damit er exakt den aktuellen Lauf
zeigt – **committete Artefakte** für den Owner-Blick ins Repository.

### Build-/Port-/`distDir`-Entscheidung (Lektion 10)

- `apps/web/next.config.mjs`: `distDir: process.env.NEXT_DIST_DIR ?? '.next'`. **Nur** der
  QA-Lauf setzt `NEXT_DIST_DIR=.next-qa`; `next dev` und `pnpm build` nutzen unverändert
  `.next`. Bewusst **keine generelle** Verzeichnistrennung dev/build: minimal-invasiv, kein
  Umbau von `turbo.json`-`outputs` (bleibt `.next/**`), kein Risiko für CI/Cache; die
  Lektion-10-Regel „nie `pnpm build` neben laufendem Dev-Server" gilt außerhalb des QA-Laufs
  weiter. (Reversibel: generelle Trennung wäre ein kleiner Folge-ADR.)
- Eigener Port **3100** (nie 3000). Ein belegter Port 3100 bricht ab; ein belegter Port 3000
  ist ausdrücklich **kein** Konflikt und wird nur informativ gemeldet.
- Playwright-`webServer` mit `reuseExistingServer: false`: es wird nie ein fremder Prozess
  mitbenutzt.
- Flankierend: `.gitignore` um `.next-qa/`, `test-results/`, `playwright-report/` ergänzt;
  `apps/web/tsconfig.json`-`include` um `.next-qa/types/**` erweitert (verhindert, dass
  `next build` die tsconfig zur Laufzeit selbst umschreibt).
- **Beweis (AC 12):** `pnpm qa:visual WP-018` lief bei parallel laufendem
  `pnpm --filter @isms/web dev` vollständig grün; danach lieferte der Dev-Server `/heute`
  (8 Chunks) und `/twin` (7 Chunks) sämtlich HTTP 200 – kein 404-auf-Chunks-Symptom, keine
  `.next`-Korruption.

### Deterministische Sitzung und Motive

- Demo-Sitzung ohne Klickpfad: `context.addInitScript` setzt den localStorage-Schlüssel
  `SESSION_STORAGE_KEY` (Import aus `lib/shell/session.ts`, kein Literal) auf die
  dokumentierte Default-Perspektive **R01 / `tenant-nordwerk`** (O-WP018-06).
- Sieben Seiten (AC 10); die Objekt-360-Seite nutzt die Seed-Konstante
  `NORDWERK_OBJECT_ID.RISK_BETRIEBSUNTERBRECHUNG` (Import aus `@isms/demo-seed`).
- `prefers-reduced-motion: reduce` emuliert, `deviceScaleFactor: 1`, `workers: 1`
  (deterministische Reihenfolge, ein Prozess sammelt die axe-Ergebnisse).
- Bereitschaft wird gepollt statt geschlafen (`.claude/rules/testing.md`): Überschrift
  sichtbar, „Lade Kontext …" verschwunden, `document.fonts.ready`.

### Screenshot-Größenstrategie

**PNG, exakt der Viewport (Desktop 1440×900, Mobil 390×844), kein Full-Page.** Ein
Full-Page-Probelauf ergab **7,4 MB** je Lauf mit Einzeldateien bis 1,4 MB – die
Stop-Condition des WP (> 5 MB je Lauf / > 1 MB je Datei) griff, die Artefakte wurden **nicht**
committet. Mit Viewport-Screenshots misst der finale Lauf **1 024 KB gesamt** (größte Datei
114,6 KB). Die Screenshots sind der Abnahme-Erstblick; die ganze Seite sieht der Owner im
laufenden Produkt. `run.mjs` misst jede Datei und bricht bei Budgetverletzung mit Stop-Meldung
ab, statt still zu committen. Aufbewahrung über viele WPs bleibt offen (O-WP018-05).

### axe-Messung

- Regelwerk WCAG 2.x A/AA (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`) auf allen
  sieben Seiten im Desktop-Viewport; Report `docs/project/visual/<WP>/axe-report.json`
  (bewusst ohne Zeitstempel – wiederholter Lauf, gleicher Report; enthält Engine-Version,
  Regelwerk, je Seite Verstoßzahlen nach Impact + Stellen mit Selektor/HTML).
- **Verstöße werden Findings, keine Fixes** (WP-018 Nicht-Ziel; Ausnahme nur AC 24);
  „0 Verstöße" wird genauso ausgewiesen. Der Report trägt den Hinweis, dass axe nur den
  automatisierbaren Teil misst (O-WP018-03) – Tastatur/Screenreader bleiben manuell.

### Toolgrenze zu vitest

Specs liegen unter `apps/web/qa/` mit Endung **`.spec.e2e.ts`** – außerhalb des
vitest-Einsammel-Musters (`*.test.ts`/`*.test.tsx`, `apps/web/vitest.config.ts`).
`pnpm --filter @isms/web exec vitest run` sammelt keine Playwright-Datei ein; die
Testanzahl der Unit-Ebene bleibt durch Slice 2 unverändert.

## Begründung

- **Playwright statt Alternativen (Puppeteer, Cypress):** Playwright ist seit ADR-0001 die
  zugesagte E2E-Ebene – jede Alternative wäre eine neue Stack-Entscheidung; der Test-Runner
  liefert webServer-Lifecycle (Serverstopp im Fehlerfall, Windows-Prozessbaum-Kill),
  Viewport-Projekte und Media-Emulation ohne Eigenbau.
- **axe-core via `@axe-core/playwright`:** der De-facto-Standard für automatisierte
  WCAG-Messung; der Adapter ist die vom WP genannte Kandidatenwahl; eine direkte
  axe-core-Abhängigkeit wäre wirkungslos (der Adapter injiziert seine eigene, im Lockfile
  gepinnte Kopie).
- **QA-only-`distDir` statt genereller Trennung:** kleinste Änderung, die den Konflikt
  vollständig löst; `turbo.json` und CI bleiben unberührt; generelle Trennung bleibt als
  reversible Option dokumentiert.

## Folgen und Risiken

- **Kein CI-Lauf** von `pnpm qa:visual` (Playwright in Actions = Browser-Download + Minuten =
  Kosten → O-WP018-04/O-COST-001, Owner-Entscheidung). CI installiert nur die npm-Pakete,
  keine Browser – der CI-Install wird geringfügig größer, sonst unverändert.
- Screenshots je WP wachsen im Repository (~1 MB je Lauf); Aufbewahrungsstrategie ab dem
  zweiten Ordner ist offen (O-WP018-05).
- Kein Pixelvergleich: „reproduzierbar" heißt gleiche Motive/Namen/Datenstand, nicht
  pixelidentisch (O-WP018-02); beobachtet waren die Läufe byte-identisch, das wird aber
  nicht zugesichert.
- Playwright- und Chromium-Versionen sind gekoppelt; Updates sind bewusste
  Einzelentscheidungen (exakter Pin, danach einmal `playwright install chromium`).

## Security/Privacy/Tenant-Auswirkung

- Committete Screenshots/Reports zeigen ausschließlich **synthetische Seed-Daten**
  (`.claude/rules/demo-data.md`); keine Secrets, keine realen Daten, keine Tokens in Logs.
- Der QA-Server lauscht nur auf localhost und lebt nur für die Dauer des Laufs.
- Die axe-Messung erhöht die Chance, Zugänglichkeitsfehler sichtbar zu machen, bevor sie
  Produktwahrheit werden; Behebung läuft als Finding mit Product Gate.

## Rollback/Supersede-Regel

Reversibel per neuem ADR: beide devDependencies entfernen, `apps/web/qa/` und das
`qa:visual`-Skript löschen, `distDir`-Zeile in `next.config.mjs` und die
`.gitignore`-/tsconfig-Einträge zurücknehmen. Bereits committete Abnahme-Artefakte unter
`docs/project/visual/` bleiben als historische Evidenz (Archivierung gemäß späterer
O-WP018-05-Entscheidung).

## Evidence

- Dok. 20C (PDF), Abschnitte „Pull-Request Gate", „Teststrategie", „Phase 1 – Product Shell
  und Demo Foundation" (Regel-Null-Gegenlesen am 2026-07-23).
- Finaler Lauf `pnpm qa:visual WP-018`: 14 PNG + `axe-report.json`, 1 024 KB gesamt,
  14 passed / 2 skipped (Fehlprobe), Port 3100 danach frei.
- Fehlprobe (AC 9): `QA_VISUAL_PROBE_FAIL=1` → provozierter Fehler nach Serverstart,
  Exit ≠ 0, Port 3100 frei, kein Zombie.
- Konfliktbeweis (AC 12): Lauf grün bei parallelem Dev-Server; Dev-Server danach nachweislich
  funktionsfähig (alle `_next`-Chunks von `/heute` und `/twin` HTTP 200).
- axe-Ergebnis des Laufs: 3 × `serious` (`dlitem` auf `/heute`, `/entscheidungen`,
  Objekt-360 – das in ADR-0003 vorgemerkte `<dl role="group">`-Muster), sonst 0; als
  Findings zu dokumentieren, nicht gefixt (WP-018 AC 14).
