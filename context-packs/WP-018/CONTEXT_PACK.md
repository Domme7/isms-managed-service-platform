# Context Pack – WP-018 Werkzeuge: Linter, sichtbare Abnahme (Playwright + axe), mechanische Wächter

## Ziel

Drei Slices, strikt nacheinander, **ein** Builder (alle berühren Root-Dateien – Parallelbau wäre
ein Writer-Konflikt, Briefing §3):

**Slice 1 – Linter/Formatter (schließt FINDING-0005):** Biome **oder** ESLint + Prettier, vom
Builder entschieden und per kurzem ADR dokumentiert (Kriterien: eine Konfigurationsdatei,
schnell, jsx-a11y-Äquivalent, wenig Abhängigkeiten). `pnpm lint` wird ein echtes Skript in Root
und allen fünf Paketen, plus Formatprüfung und CI-Schritt. Bestandsbereinigung in einem
**eigenen** Commit, verhaltensneutral.

**Slice 2 – Sichtbare Abnahme (DR-0007 E-03, wichtigste Einzelmaßnahme für den Owner):**
Playwright + axe-core. **Ein** Kommando (`pnpm qa:visual`) baut `apps/web` konfliktfrei
(getrenntes Build-Verzeichnis/eigener Port – Briefing §7 Lektion 10), startet den Server,
erzeugt Screenshots der sieben echten Seiten je Desktop und Mobil nach
`docs/project/visual/WP-018/` (**committete Artefakte**), führt axe aus und stoppt den Server –
auch im Fehlerfall. axe-Verstöße werden **Findings, nicht Fixes**.

**Slice 3 – kleine mechanische Wächter:** (a) Wächtertest „kein Prozessvokabular im gerenderten
Produkttext" über alle echten Orte, (b) `OBJECT_TYPE_LABEL_DE` als erschöpfendes
`Record<ObjectType, string | null>` – fehlende Glossen werden Compilefehler, **keine**
Übersetzung wird erfunden, (c) `scripts/seed_facts.py` + Beweis-Test in `packages/demo-seed`,
damit Seed-Zahlen zitierfähig sind statt abgeschrieben.

**Ausdrücklich NICHT Teil dieses WP:** PR-Flow/Branch-Protection (O-GH-002), PDF-↔-Markdown-
Treuecheck (WP-019), Produktcode-Änderungen jenseits der Label-Typisierung (insbesondere keine
A11y-Fixes – Findings stattdessen; einzige benannte Ausnahme: Acceptance 24 des WP), CI-Ausführung
des QA-Laufs (Kosten → O-COST-001), Visual-Regression-Baseline, Secret Scan/Supply-Chain/
statische Securityanalyse in CI, neue Übersetzungen/Glossen, Statusdatei-Generatoren.

## Verbindliche Prinzipien

- **Regel Null gilt auch für den eigenen Bauplan:** Die Soll-Vorgaben dieses WP kommen aus
  Dok. 20C – vor Übernahme eines Details am **PDF** gegenlesen
  (`python scripts/pdf_text.py 20C --suche "Fast Gate"`, `--suche "Accessibility"`);
  **Abschnittstitel** zitieren, nicht nur Nummern. Abgleichslage: die Markdown-Fassung von 20C
  ist material abweichend (FINDING-0007-Rohbefund, `docs/concept/abgleich/`), die dokumentierten
  Abweichungen betreffen aber Deckblatt/Steuerungsfeld, nicht die Gate-/Test-/Phasenabschnitte.
- **Neue Abhängigkeit ⇒ ADR** (DR-0007 E-03). ADR-0001 nennt bereits „Lint/Format: ESLint +
  Prettier" und „Playwright (E2E, ab UI-Flows)": eine Biome-Wahl **löst die ESLint-Zeile benannt
  ab** (keine stille Widerspruchsauflösung, `.claude/rules/docs.md`); die Playwright-Einführung
  ist die Aktivierung einer bestehenden ADR-Zusage, axe-core ist neu.
- **Der Builder committet nie selbst** (Briefing §2). Einführung und Bestandsbereinigung werden
  vom Orchestrator **getrennt** committet; explizit stagen, nie `git add -A` (Briefing §7
  Lektion 9).
- **Kein Produktcode jenseits der Label-Typen.** Die Bestandsbereinigung (Slice 1) und die
  Label-Umstellung (Slice 3b) müssen **verhaltensneutral** sein – per Test belegt, nicht
  behauptet. axe-Befunde am Produkt: Finding, kein Fix.
- **Wächter prüfen die Regel, nicht den Wortlaut** (Briefing §7 Lektion 11). Dokumentierte
  Ausnahmen bestehender Wächter respektieren; eigene Ausnahmen nur nach dem etablierten Muster
  „Ausnahme auslassen **und** ihre Existenz prüfen" (Vorbild in den Entscheidungen-Tests).
  Ein Wächter, der nur durch Abschwächung grün wird, ist eine Stop Condition.
- **Keine Übersetzung erfinden.** Fehlende deutsche Glossen werden explizit `null`
  (O-WP014-11, O-WP017-09 bleiben offen). Der Kommentar über `OBJECT_TYPE_LABEL_DE`
  („Hier wird NICHTS neu übersetzt") bleibt sinngemäß bestehen.
- **Zahlen am Seed nachrechnen, nie übernehmen** (Briefing §7 Lektion 6). `seed_facts.py` leitet
  aus dem Seed ab, **nicht** aus `seed-manifest.json` (sonst zirkulärer Abgleich); der Beweis-Test
  in `packages/demo-seed` bindet Skriptquelle, `DEMO_SEED` und Manifest aneinander.
- **`.next`-Konflikt ernst nehmen** (Briefing §7 Lektion 10): Build und Dev-Server teilen sich
  heute `apps/web/.next` und haben sich zweimal gegenseitig zerschossen. Der QA-Lauf nutzt ein
  getrenntes Build-Verzeichnis und einen eigenen Port – oder bricht **vor** der ersten
  schreibenden Aktion mit klarer Meldung ab. Stille Korruption disqualifiziert die Lösung.
  Bei genereller Verzeichnistrennung: `turbo.json`-`outputs` und `.gitignore` im selben Pass.
- **Offline nach Installation:** kein Werkzeug darf zur Laufzeit von Lint/Format/Tests/QA-Lauf
  Netzwerkzugriff brauchen (Stop Condition). Einmalige Browser-Installation
  (`pnpm exec playwright install chromium`) ist erlaubt und wird dokumentiert.
- **Windows-fähig:** der Owner arbeitet unter Windows/PowerShell – das QA-Skript ist ein
  Node-/pnpm-Kommando, kein Bash-Einzeiler.
- **Repo-Hygiene:** Screenshots mit `deviceScaleFactor: 1`; über 5 MB je Lauf (oder 1 MB je
  Datei) → Strategie dokumentieren statt still committen. Browser-Binaries werden nie committet.
- **Deterministische Sitzung statt Klickpfad:** die Demo-„Sitzung" ist nur ein
  localStorage-Eintrag (`isms-demo-session-v1`, `{roleId, tenantId}`) – das Skript setzt ihn
  direkt (z. B. `addInitScript`), dokumentierte Default-Perspektive R01 / `tenant-nordwerk`.
- **Vitest-Grenze:** `apps/web/vitest.config.ts` sammelt `**/*.test.{ts,tsx}` ein –
  Playwright-Specs bekommen ein eigenes Verzeichnis/eine eigene Endung und tauchen in keinem
  `vitest run` auf.
- **Gates risikobasiert und dokumentiert** (Dok. 20B §36 via FINDING-0006): Code-Review +
  `platform-devops-reliability` (Zweitreview, begründet statt `product-user-lead`) +
  `qa-test-engineer` für die neuen Wächtertests; Domain Gate bewusst unbesetzt (kein
  Fachinhalt); bedingtes Product Gate bei Produkttext-Korrekturen (AC 24). Zweite Reviewrunde
  nach dem Fix-Pass ist Pflicht.

## Pflichtquellen

### Konzept (gezielt lesen – nicht ganze Dokumente)

- **Dok. 20C** (`docs/concept/pdf/Dokument_20C_Claude_Code_GitHub_Checkpoints_Bauplan_v1.0.pdf`;
  Arbeitsfassung `docs/concept/active/20C_CLAUDE_CODE_GITHUB_CHECKPOINTS_BAUPLAN_v1.0.md`):
  - Abschnitt **„CI- und Quality-Gate-Pipeline"**, Unterabschnitte **„Fast Gate"**
    (Formatprüfung, Lint, Typprüfung, …, Secret Scan, verbotene Datei-/Größenprüfung – Soll-Bild,
    aus dem hier nur Format + Lint gebaut wird → O-WP018-01) und **„Pull-Request Gate"**
    („Accessibility-Prüfung für betroffene UI", „visuelle Regression für zentrale Screens" –
    Verankerung von Slice 2),
  - Abschnitt **„Teststrategie"**: Zeilen **Accessibility** („Tastatur, Semantik, Kontrast,
    Screenreader") und **Visual** („zentrale Screens") – Beleg für die Grenzen von axe
    (O-WP018-02/-03),
  - Abschnitt **„Phase 0 – Repository Bootstrap"** („Basis-CI mit Format, Lint, …") – der
    Lint-Teil war seit Phase 0 Soll; FINDING-0005 ist die Abweichung,
  - Abschnitt **„Phase 1 – Product Shell und Demo Foundation"** („Baseline für Accessibility,
    Visual Regression und E2E") – wird hiermit nachgeliefert.
  - **Aus Dok. 20C wird sonst nichts implementiert** (insbesondere kein PR-Flow, keine
    Branch-Protection, kein Merge-Regime – Abschnitt zu Branchschutz nur zur Abgrenzung).
- **Dok. 20B §36** (Quality Gates) – **nur über FINDING-0006** und die Gate-Matrix in
  `CONTINUATION_BRIEFING.md` §2; Grundlage der Gate-Besetzung dieses WP.

### Entscheidungen und Findings (der eigentliche Auftrag)

- `docs/decisions/DR-0007_owner_entscheidungen_e01_e02_e03.md` – **E-03** („Ich baue es.
  Reversibel, kostet nur Rechenzeit"; Playwright + axe, Screenshots je WP ins Repository,
  Kontrast/Fokus **gemessen** statt behauptet, neue Abhängigkeit → eigener ADR, FINDING-0005
  wird mitgeschlossen) und die Reihenfolge-Begründung (WP-018 vor WP-019/020/021).
- `docs/project/risks/FINDING-0005_kein_linter_im_stack.md` – Befund, Optionen, „Umgang bis zur
  Entscheidung"; wird durch Slice 1 geschlossen (Statuswechsel gehört zum Abschluss).
- `docs/project/risks/FINDING-0006_domain_und_qa_gate_nicht_besetzt.md` – warum das QA Gate
  für die neuen Wächtertests besetzt wird und Gate-Entscheidungen dokumentiert sein müssen.
- `docs/architecture/adr/ADR-0001_app_stack_und_monorepo.md` – Stack-Tabelle: „Lint/Format:
  ESLint + Prettier", „Playwright (E2E, ab UI-Flows)" – das Verhältnis der neuen ADRs hierzu
  ist ausdrücklich zu klären; `ADR-0000_TEMPLATE.md` als Muster.
- `docs/decisions/DR-0003` (minimales Design – die Screenshots zeigen bewusst den minimalen
  Stand), `DR-0006` (PDF-Produktwahrheit), `docs/project/OWNER_DECISIONS.md` (Karten inkl.
  Defaults).
- `docs/project/CONTINUATION_BRIEFING.md` – **§2** (Arbeitszyklus, Gate-Matrix), **§3**
  (Parallelität), **§7 Lektionen 6, 9, 10, 11** (Zahlen nachrechnen; explizit stagen;
  `.next`-Konflikt; Wächter prüfen Regeln). Lektion 10 nennt WP-018 als Kandidaten für das
  getrennte Build-Verzeichnis – der Abschluss dieses WP aktualisiert die Lektion.
- `docs/project/OPEN_QUESTIONS.md` – O-GH-002 und O-COST-001 (bewusst **nicht** Teil dieses WP),
  **O-WP014-11** und **O-WP017-09** (fehlende Glossen – bleiben offen, `null` statt Erfindung);
  neue Fragen als `O-WP018-*` anschließen.

### Code-Stellen (Ist-Stand, vor dem Bau lesen)

- **Root:** `package.json` (Skripte `build`/`test`/`typecheck`/`dev` – `lint` fehlt; pnpm
  11.15.1, Node ≥ 20), `turbo.json` (Tasks; **`build.outputs` enthält `.next/**`** – relevant
  bei Verzeichnistrennung), `pnpm-workspace.yaml` (fünf Pakete: `apps/web`, `apps/api`,
  `packages/contracts`, `packages/demo-seed`, `packages/db`).
- **CI:** `.github/workflows/app-ci.yml` (Schritte install → typecheck → test → build; der
  Lint-Schritt wird davor eingefügt; Runner `ubuntu-latest`, Node 24).
- **`apps/web`:**
  - `package.json` (Skripte; `dev`/`start` auf Port 3000 – der QA-Server nimmt einen anderen),
  - `vitest.config.ts` (include `**/*.test.{ts,tsx}`, exclude `node_modules`/`.next`/`dist` –
    Playwright-Specs müssen außerhalb bleiben),
  - `next.config.mjs` (heute ohne `distDir`; Kandidat für die env-gesteuerte Trennung;
    `transpilePackages` beachten),
  - `lib/shell/session.ts` – `SESSION_STORAGE_KEY = 'isms-demo-session-v1'`,
    `DemoSession { roleId, tenantId }`, `defaultSession()`; die Sitzung ist reine Perspektive,
    keine Auth,
  - `lib/shell/places.ts` – `NAV_PLACES` mit `live: true`-Flags (heute: heute, kunden/twin,
    isms, services, entscheidungen) – Quelle der Meta-Assertion des Prozessvokabular-Wächters,
  - `lib/twin/data.ts` – **`OBJECT_TYPE_LABEL_DE` (Zeile 82)** mit dem Kommentar „Hier wird
    NICHTS neu übersetzt"; `objectTypeLabel` (string | undefined) und `objectTypeDisplay`
    (Fallback = kanonischer Name) – das zu erhaltende Verhalten.
- **`packages/contracts`:** `src/vocabularies.ts` – `OBJECT_TYPE` (Zeile 179) und
  `export type ObjectType` (Zeile 190) – der Schlüsseltyp für die erschöpfende Label-Map.
- **`packages/demo-seed`:** `src/seed.ts` (Schichtaggregation) und `src/index.ts` (Exporte) –
  Andockpunkt für die Faktenableitung; `src/nordwerk-graph.ts`
  (`NORDWERK_OBJECT_ID.RISK_BETRIEBSUNTERBRECHUNG` – stabiles Objekt-360-Motiv);
  `seed-manifest.json` (`counts`, `layers`, `recording_waves` – Stand Seed 1.2.0: 43/62 gesamt,
  Nordwerk 34/51, Consulting Operator 9/11; **Orientierung, am Seed nachrechnen**);
  `src/seed.spec.ts` (Manifest-Konsistenztests als Muster für den neuen Beweis-Test).
- **`scripts/`:** `validate_handoff.py`, `checkpoint.py`, `pdf_text.py` – Stil-Muster für
  `seed_facts.py` (Python 3, argparse, klare deutsche Meldungen, kein Netz).

### Tests und Wächter-Muster (vor dem Bau lesen)

- `apps/web/components/__tests__/leerzustand-mandantengrenze.test.tsx` – das Registrier-Muster
  („neue Orte hier eintragen", Meta-Abgleich) für den Prozessvokabular-Wächter.
- `apps/web/components/entscheidungen/__tests__/entscheidungen.test.tsx` (Kommentar „EINE
  dokumentierte Ausnahme", Zeilen ~130–140) – das Muster für dokumentierte Wächter-Ausnahmen:
  Ausnahme auslassen **und** prüfen, dass sie noch existiert, damit sie nicht still zur Regel
  wird.
- Bestehende Render-Einstiege der Orte (für den Wächter wiederverwenden, nicht duplizieren):
  `components/shell/__tests__/mission-control.test.tsx`,
  `components/isms/`-Tests, `components/services/__tests__/services.test.tsx`,
  `components/entscheidungen/__tests__/entscheidungen.test.tsx`,
  `components/twin/__tests__/` (inkl. Objekt-360).
- **Erwarteter Ripple: keiner.** Kein bestehender Test darf durch dieses WP rot werden oder
  umgeschrieben werden müssen (Ausnahme: AC 24-Fall). Wird einer rot, ist das ein Zeichen, dass
  eine Änderung nicht verhaltensneutral war – anhalten und prüfen, nicht den Test anpassen.

### Projektregeln und Statuswahrheit

- `CLAUDE.md` (Stop Conditions, Definition of Done, „Offene Technikentscheidungen": Stack-Fragen
  nie still festlegen → ADR),
- `docs/project/CURRENT_STATE.md`, `docs/project/WORK_QUEUE.md` (WP-018-Zeile: „ADR für neue
  Abhängigkeiten"), `docs/project/handovers/LATEST.md`,
- `.claude/rules/architecture.md` (materiale Technologieentscheidungen → ADR),
  `.claude/rules/testing.md` (keine instabilen Sleeps – relevant für Serverstart-Warten im
  QA-Skript: auf Bereitschaft pollen, nicht schlafen), `.claude/rules/frontend.md`
  (Accessibility ist Teil von Done), `.claude/rules/security.md` (Logs ohne Secrets),
  `.claude/rules/docs.md` (keine stille Widerspruchsauflösung), `.claude/rules/demo-data.md`
  (Deterministic Demo Mode ohne Live-KI/Drittanbieter – gilt auch für den QA-Lauf).

## Nicht im Context Pack

- **PR-Flow, Branch-Protection, Merge Queue, CODEOWNERS** (Dok. 20C-Abschnitte zu Branchschutz/
  Delivery Flow) – O-GH-002, braucht den Owner am GitHub-UI.
- **PDF-↔-Markdown-Treue der Konzeptdokumente** (FINDING-0007) – WP-019; dieses WP liest 20C
  nur als Soll-Quelle des eigenen Bauplans.
- **Secret Scan, Dependency-/Supply-Chain-Prüfung, statische Securityanalyse, Docs-/Linkcheck,
  Demo-Seed-Validierung in CI** – 20C-Soll, benannt als O-WP018-01, eigene WPs.
- **Visuelle Regression mit Baseline/Pixel-Diff und E2E-Nutzerreisen** (20C „Teststrategie"
  Zeilen Visual/E2E) – hier entstehen nur Abnahme-Screenshots und axe-Messungen.
- **A11y-Korrekturen am Produkt** – axe-Verstöße werden Findings; Behebung ist ein Folge-WP
  (Ausnahme: AC 24 des Work Package).
- **Alle Produkt-Konzeptdokumente (Dok. 03–19)** – dieses WP baut keinen Produktinhalt; wer sie
  zu brauchen glaubt, ist im falschen WP.
- **DB-Anbindung, Auth, RLS** (FINDING-0004), **Morning Mission/Decision Center** (Dok. 10),
  **Demo-Welt-Umbau** (WP-021, DR-0007 E-01), **Konzeptfassungen** (WP-019).
- **Kostenpflichtige oder produktive Ressourcen jeder Art** – Owner (O-COST-001).
