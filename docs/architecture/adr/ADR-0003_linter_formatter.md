# ADR-0003 – Linter/Formatter: Biome (benannte Ablösung der ESLint+Prettier-Zeile aus ADR-0001)

- Status: Accepted (delegierte Werkzeugwahl, DR-0007 E-03: „Neue Abhängigkeit → eigener ADR")
- Datum: 2026-07-23
- Owner: Builder WP-018 (Vorschlag), Reviewer-Gates WP-018 (Prüfung); Werkzeugwahl war per
  WP-018-Zuschnitt an den Builder delegiert
- Betroffene Work Packages: WP-018 (Slice 1), alle folgenden

## Kontext

FINDING-0005: Es gab keinen Linter im Stack – „Lint" in Acceptance Criteria lief ins Leere.
Dok. 20C, Abschnitt **„CI- und Quality-Gate-Pipeline"**, Unterabschnitt **„Fast Gate"** verlangt
bei jedem relevanten Push u. a. „Formatprüfung, Lint, Typprüfung, …"; Abschnitt
**„Phase 0 – Repository Bootstrap"** verlangt „Basis-CI mit Format, Lint, Typprüfung, Test,
Secret Scan und Docs Check" (am PDF gegengelesen, Regel Null; von diesem Soll liefert WP-018
nur Format + Lint, Rest benannt in O-WP018-01).

## Entscheidungsbedarf

Werkzeug für Lint **und** Formatprüfung im pnpm/Turborepo-Monorepo (fünf Pakete, TS/TSX,
Next.js 15, Windows-Maschine des Owners). Kriterien laut WP-018 (Owner-Zuschnitt):
**eine Konfigurationsdatei, schnell, jsx-a11y-Äquivalent, wenig Abhängigkeiten.**

## Optionen

- **A – Biome:** ein Werkzeug für Lint + Format, eine `biome.json`, Rust-Binary, a11y-Regelwerk
  (Portierung von `eslint-plugin-jsx-a11y`) plus React/Next-Domänen.
- **B – ESLint + Prettier:** Ökosystem-Standard, `next/core-web-vitals` verfügbar; aber
  mindestens zwei Konfigurationsdateien (ESLint-Flat-Config + Prettier-Config +
  `eslint-config-prettier` gegen Regelkonflikte), ≥ 6 direkte und hunderte transitive
  Abhängigkeiten, deutlich langsamer.

## Entscheidung

**Option A – Biome `2.5.5`** (exakt gepinnt, einzige neue Root-devDependency `@biomejs/biome`).

**Verhältnis zu ADR-0001 (ausdrücklich, keine stille Widerspruchsauflösung):** ADR-0001 nennt in
der Stack-Tabelle „Lint/Format: ESLint + Prettier". **Diese eine Zeile wird hiermit benannt
abgelöst.** ADR-0001 erklärt Test-/Lint-Tooling selbst zur reversiblen Sub-Entscheidung
(„Rollback/Supersede-Regel: Reversible Sub-Entscheidungen … über neuen ADR/DR änderbar") –
genau dieser Weg wird hier beschritten. Alle übrigen Zeilen von ADR-0001 (inkl. „Playwright,
E2E, ab UI-Flows") bleiben unberührt; die Playwright-Aktivierung ist Gegenstand von ADR-0004
(WP-018 Slice 2).

### Kommandos

| Zweck | Kommando | Bemerkung |
|---|---|---|
| Lint (alle fünf Pakete) | `pnpm lint` → `turbo run lint` → je Paket `biome check .` | Exit ≠ 0 bei Fehlern; **enthält die Formatprüfung** der Paketdateien |
| Formatprüfung Monorepo (inkl. Root-JSON) | `pnpm format:check` → `biome format .` | Check-Modus, schreibt nichts |
| Autofix (lokal) | `pnpm exec biome check --write .` | sichere Fixes + Format |
| CI | `.github/workflows/app-ci.yml`: `pnpm lint` und `pnpm format:check` **vor** typecheck/test/build | bestehender Runner, keine neue kostenpflichtige Ressource |

### Konfiguration (eine Datei: `biome.json`)

- `vcs.useIgnoreFile: true` – `.gitignore` ist die einzige Ignore-Wahrheit (`.next`, `dist`,
  `coverage`, `next-env.d.ts` sind damit automatisch ausgenommen).
- `files.includes`: `apps/**`, `packages/**`, Root-`*.json`; **ausgenommen**
  `packages/db/drizzle` (von drizzle-kit generierte Artefakte – Formatieren würde bei jedem
  `db:generate` Churn erzeugen). `docs/`, `scripts/`, `work-packages/` werden bewusst nicht
  angefasst (kein Tooling-Durchgriff auf Konzept-/Statusdateien).
- Formatter: 2 Spaces, `lineWidth` 100, Single Quotes (JS/TS), Double Quotes (JSX) – am
  Ist-Bestand gemessen, um die Bestandsbereinigung minimal zu halten.
- Linter: Preset `recommended` **plus** Domänen `react`, `next`, `test` (jeweils
  `recommended`) – darüber ist das jsx-a11y-Äquivalent (`lint/a11y/*`) aktiv, belegt per
  Negativbeweis (AC 5).

### Regelabweichungen vom Preset (einzeln begründet, nicht leergedreht)

| Regel | Einstellung | Begründung |
|---|---|---|
| `style/noNonNullAssertion` | `off` | 31 Bestandsstellen; die `!`-Zusicherungen sitzen bewusst auf statischen Seed-Invarianten (z. B. `DEMO_ROLES[0]!`). Laufzeit-Guards nachzurüsten wäre eine Verhaltensänderung – genau das verbietet die Bestandsbereinigung. Flächige Streu-Disables wären schlechter als eine dokumentierte Konfigurationsentscheidung. Wiedervorlage, sobald Daten nicht mehr statisch aus dem Seed kommen (DB-Anbindung). |
| `correctness/noUnusedVariables` | `error` (Default: warn) | Totcode soll den Lauf brechen, nicht nur warnen – sonst wäre AC 4 (Exit ≠ 0 bei ungenutzter Variable) nicht erfüllt und Warnungen würden dauerhaft überlesen. Bestand: 0 Verstöße. |
| `correctness/noUnusedImports` | `error` (Default: warn) | gleiche Begründung; sicher autofixbar. Bestand: 0 Verstöße. |

### Inline-Ausnahmen der Bestandsbereinigung (Sammelliste; Begründung je Ort im Code)

Die Bereinigung durfte kein beobachtbares Verhalten und kein gerendertes Markup ändern
(WP-018, Stop Condition). Deshalb wurden 13 `biome-ignore`-Kommentare an 10 Orten (die drei
a11y-Paare sitzen je am selben Ort) mit Begründung gesetzt statt „gefixt":

- **6× `lint/suspicious/noArrayIndexKey`** – `EntscheidungenContent.tsx` (3),
  `ObjectDetailView.tsx` (2), `ObjectCard.tsx` (1): der Index ist dort nur
  Eindeutigkeits-Suffix hinter einem fachlichen Schlüssel; die Listen kommen statisch aus dem
  Seed (read-only, keine Umsortierung). Ein Schlüsselwechsel wäre eine nicht prüfbar
  verhaltensneutrale Produktcode-Änderung.
- **3× `lint/a11y/noInteractiveElementToNoninteractiveRole` + 3× `lint/a11y/useSemanticElements`**
  (paarweise dieselben Orte) – `MissionControlContent.tsx`, `EntscheidungenContent.tsx`,
  `ObjectDetailView.tsx`: das Muster `<dl role="group" aria-label>` ist ein dokumentierter
  früherer Review-Fix („`dl` hat keine verlässliche implizite Rolle"). Änderung der
  ARIA-Semantik = Produktänderung, gehört in die A11y-Beurteilung von Slice 2, nicht in die
  Tooling-Bereinigung.
- **1× `lint/a11y/useAriaPropsSupportedByRole`** – `TenantDetailView.tsx`
  (`aria-label` auf generischem `div`): echter A11y-Befund-Kandidat, **bewusst nicht still
  behoben** (WP-018-Nicht-Ziel „keine A11y-Fixes am Produkt"); für die sichtbare Abnahme
  (Slice 2 / axe-Findings) vorgemerkt.

Ein manueller Fix wurde vorgenommen (kein Suppress, da DOM-identisch):
`Topbar.tsx` `aria-expanded={navOpen ? true : false}` → `aria-expanded={navOpen}`
(`lint/complexity/noUselessTernary`; React rendert beide Formen als identisches
`aria-expanded="true"/"false"`).

## Begründung

Entlang der vier WP-Kriterien:

1. **Eine Konfigurationsdatei:** `biome.json` – Lint, Format, Ignore-Anbindung, Domänen in
   einer Datei. ESLint+Prettier bräuchte drei (Flat Config, Prettier-Config,
   Konflikt-Abschaltung).
2. **Schnell:** gemessen 130 Dateien in ~70 ms (kompletter Monorepo-Check); der gesamte
   `pnpm lint`-Lauf über fünf Pakete ~0,7 s.
3. **jsx-a11y-Äquivalent:** `lint/a11y/*` ist die Biome-Portierung von
   `eslint-plugin-jsx-a11y`; per Negativbeweis belegt (`<area>` ohne `alt` →
   `lint/a11y/useAltText`, Exit 1). Zusätzlich fängt die Next-Domäne `<img>` statt
   `next/image` (`lint/performance/noImgElement`).
4. **Wenig Abhängigkeiten:** genau **eine** direkte devDependency (`@biomejs/biome`,
   Rust-Binary je Plattform als optionalDependencies), statt ≥ 6 direkter Pakete mit großem
   transitiven Baum.

Bewusst in Kauf genommen (Grenzen von Biome, ehrlich benannt):

- **Kein `next/core-web-vitals`-Vollersatz:** die Biome-Next-Domäne deckt einen Teil ab
  (`noImgElement`, `noHeadElement`, …), nicht alle Next-ESLint-Regeln. Typfehler fängt
  weiterhin `tsc` (`pnpm typecheck`), keine typinformierten Lint-Regeln.
- **Kein Markdown/YAML-Support:** `.github/workflows/*.yml` und `docs/**/*.md` bleiben
  ungelintet (war auch bei Prettier-Format nur teilweise abgedeckt; Docs-Check ist ohnehin
  offener 20C-Rest, O-WP018-01).

## Folgen und Risiken

- `pnpm lint` und `pnpm format:check` sind echte Kommandos mit echtem Exit-Code, lokal und in
  CI (Schritte **vor** typecheck/test/build). FINDING-0005 kann geschlossen werden
  (Statuswechsel macht der Orchestrator beim WP-Abschluss).
- **Offline-fähig:** Biome ist ein lokales Binary; nach `pnpm install` kein Netzwerkzugriff
  zur Laufzeit (AC 8).
- Turbo-Task `lint` mit Input `$TURBO_ROOT$/biome.json`: Konfigänderungen invalidieren den
  Cache korrekt.
- Biome hat schnellere Major-Zyklen als ESLint; Version ist exakt gepinnt (`2.5.5`), Updates
  sind bewusste Einzelentscheidungen.
- Editor-Integration (VS Code Biome-Extension) ist optional und lokal; nichts im Repo hängt
  davon ab.

## Security/Privacy/Tenant-Auswirkung

Keine. Lint/Format läuft nur über committeten Quellcode, keine Laufzeitdaten, keine Secrets,
kein Netzwerk. Die a11y-Regeln erhöhen die Chance, Zugänglichkeitsfehler vor dem Merge zu
fangen.

## Rollback/Supersede-Regel

Rückkehr zu ESLint + Prettier (oder Wechsel auf ein Nachfolgewerkzeug) jederzeit per neuem
ADR: `biome.json` entfernen, `lint`-/`format:check`-Skripte ersetzen, CI-Schritte anpassen –
keine Quellcode-Abhängigkeit außer den `biome-ignore`-Kommentaren (grep-bar, mechanisch
ersetzbar).

## Evidence

- Dok. 20C (PDF), Abschnitte „CI- und Quality-Gate-Pipeline" → „Fast Gate" und
  „Phase 0 – Repository Bootstrap" (Regel-Null-Gegenlesen am 2026-07-23).
- `pnpm lint` grün über alle fünf Pakete; `pnpm format:check` grün; 428 Tests grün
  (frisch, `--force`); `pnpm typecheck` grün.
- Negativbeweise AC 4/5 (Protokoll in der Review-Notiz zu WP-018): ungenutzte Variable →
  `lint/correctness/noUnusedVariables`, Exit 1; A11y-Verletzung →
  `lint/a11y/useAltText`, Exit 1; Meldungen nennen Datei und Regel. Beweisdatei
  (`apps/web/lib/lint-negativbeweis.tsx`) wurde nie committet.
