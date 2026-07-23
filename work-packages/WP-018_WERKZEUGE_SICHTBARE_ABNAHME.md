# WP-018 – Werkzeuge: Linter, sichtbare Abnahme (Playwright + axe), mechanische Wächter

## Identität

- **Phase:** quer (Tooling/Prozessmechanik; kein Produktinhalt) – Owner-entschieden in **DR-0007 E-03**
- **Priorität:** P1 (Queue: **Next**; vorgezogen, weil alle folgenden Work Packages – insbesondere
  WP-021 mit seinem großen Ripple – davon profitieren, DR-0007 „Daraus folgende Reihenfolge")
- **Status:** Draft (Aktivierung/Integration durch Orchestrator)
- **Risk Class:** Low (Tooling, keine Produktlogik, keine DB/Auth/Kosten) – **aber:** jede neue
  Abhängigkeit braucht einen ADR (DR-0007 E-03: „Neue Abhängigkeit → eigener ADR"), und Slice 2
  berührt mit dem Build-Verzeichnis eine Stelle, die sich zweimal als Korruptionsquelle erwiesen
  hat (Briefing §7 Lektion 10).
- **Builder:** **ein** Builder für alle drei Slices (alle berühren Root-Dateien wie `package.json`
  und `turbo.json` – Parallelbau wäre ein Writer-Konflikt, Briefing §3). Vorschlag
  `frontend-engineer` (der Schwerpunkt liegt in `apps/web`), alternativ `backend-engineer`;
  der Orchestrator entscheidet. Slices strikt nacheinander; **der Builder committet nie selbst**
  (Briefing §2), der Orchestrator committet je Slice getrennt.
- **Reviewer/Gates (risikobasiert nach Dok. 20B §36 / FINDING-0006, Besetzung Owner-entschieden
  im WP-018-Zuschnitt):**
  - **Code Quality Gate:** `code-reviewer` (immer),
  - **Zweitreview:** `platform-devops-reliability` – **anstelle** von `product-user-lead`,
    begründete Abweichung von der Standardmatrix: dieses WP ändert keine Produktoberfläche
    (die Label-Typisierung in Slice 3 ist per Acceptance 21 nachweislich ausgabeneutral),
    dafür CI, Build-Verzeichnisse, Prozess-Skripte – genau das Feld dieses Gates,
  - **QA Gate:** `qa-test-engineer` für die neuen Wächtertests (FINDING-0006: sonst prüft der
    Builder seine eigenen Tests),
  - **bedingt Product Gate:** falls der Prozessvokabular-Wächter Bestandsverstöße findet und
    Produkttext korrigiert werden muss (Acceptance 24), wird `product-user-lead` für genau diese
    Änderung ergänzt – dann trägt die Begründung „keine Produktoberflächenänderung" nicht mehr,
  - **Domain Gate bewusst unbesetzt:** kein fachlicher ISMS-Inhalt in diesem WP (dokumentierte
    Gate-Entscheidung, nicht Vergessen – vgl. FINDING-0006).
  - Builder ≠ Reviewer; der Builder schließt kein Finding selbst (Dok. 20B §31.3); nach dem
    Fix-Pass eine **zweite Runde** derselben Reviewer (Briefing §2 – hat bisher jedes Mal eine
    vom Fix erzeugte Regression gefunden).
- **Human Gates:** keine neue Owner-Freigabe nötig – E-03 ist entschieden (DR-0007). **Aber:**
  kostenpflichtige CI-Ressourcen (O-COST-001) und Branch-Protection (O-GH-002) bleiben Owner-Themen
  und sind ausdrücklich **nicht** Teil dieses WP. Die delegierte Werkzeugwahl wird per ADR
  dokumentiert (Muster `docs/architecture/adr/ADR-0000_TEMPLATE.md` / ADR-0001).
- **Abhängigkeiten:** WP-017 ✓ (erst seit dort sind alle sechs Orte des Kernwegs echt –
  der Motivbestand der sichtbaren Abnahme), FINDING-0005 (kein Linter), FINDING-0006
  (Gate-Matrix), DR-0007 E-03, ADR-0001 (Stack nennt bereits „Lint/Format: ESLint + Prettier"
  und „Playwright (E2E, ab UI-Flows)" – siehe Slice 1/2), Briefing §7 Lektion 10
  (`.next`-Konflikt – Pflichtinput für Slice 2).

## Ziel

**Der Prozess erzeugt Qualität über Mechanik statt nur über Aufmerksamkeit – und der Owner sieht
das Produkt erstmals im Rahmen jeder Abnahme** (DR-0007 E-03).

Drei Slices:

1. **Linter/Formatter** – schließt FINDING-0005: „Lint" hört auf, ein leeres Wort in Acceptance
   Criteria zu sein, und wird ein echtes Kommando mit echtem Exit-Code, lokal und in CI.
2. **Sichtbare Abnahme** – Playwright + axe-core: **ein** Kommando erzeugt reproduzierbar
   Screenshots aller echten Orte (Desktop + Mobil) als **committete Artefakte** unter
   `docs/project/visual/WP-0xx/` plus einen axe-Report (Kontrast, Rollen, zugängliche Namen).
   Damit bedient der Prozess erstmals die stärkste Fähigkeit des Owners: Produkturteil auf einem
   sichtbaren Bildschirm (DR-0007 E-03 „Warum das zählt"). Zusätzlich fängt es die Fehlerklasse,
   die alle bisherigen Testschichten strukturell nicht sehen (WP-016-Renderfehler,
   Briefing §7 Lektion 7).
3. **Kleine mechanische Wächter** – drei Befunde der Prozessprüfung werden von „Reviewer muss
   daran denken" auf „Test/Compiler wird rot" umgestellt: Prozessvokabular im Produkttext,
   fehlende deutsche Objekttyp-Glossen, Seed-Zahlen in Statusberichten.

**Konzeptverankerung (Dok. 20C – die Zitate sind vor Übernahme am PDF gegenzulesen, Regel Null;
Werkzeug: `python scripts/pdf_text.py 20C --suche "Fast Gate"`):**

- Abschnitt **„CI- und Quality-Gate-Pipeline"**, Unterabschnitt **„Fast Gate"**: „Formatprüfung,
  Lint, Typprüfung, betroffene Unit Tests, Schema- und Contract-Validierung, Secret Scan,
  verbotene Datei- und Größenprüfung" bei jedem relevanten Push. WP-018 liefert davon
  **Formatprüfung und Lint** nach; der Rest bleibt benannt offen (O-WP018-01).
- Unterabschnitt **„Pull-Request Gate"**: „Accessibility-Prüfung für betroffene UI" und
  „visuelle Regression für zentrale Screens" – die fachliche Verankerung von Slice 2.
- Abschnitt **„Teststrategie"**, Zeilen **Accessibility** („Tastatur, Semantik, Kontrast,
  Screenreader") und **Visual** („zentrale Screens") – zugleich der Beleg, was axe **nicht**
  abdeckt (O-WP018-02/-03).
- Abschnitt **„Phase 0 – Repository Bootstrap"**: „Basis-CI mit Format, Lint, Typprüfung, Test,
  Secret Scan und Docs Check läuft" – der Lint-Teil war seit Phase 0 Soll; FINDING-0005 ist die
  benannte Abweichung, die hier endet.
- Abschnitt **„Phase 1 – Product Shell und Demo Foundation"**: „Baseline für Accessibility,
  Visual Regression und E2E" – diese Baseline wird hiermit nachgeliefert.

Abgleichslage 20C: Die Markdown-Arbeitsfassung ist material abweichend (FINDING-0007-Rohbefund:
6 Abweichungen, 1 hoch), **alle dokumentierten Abweichungen betreffen Deckblatt/Steuerungsfeld**,
keine die oben zitierten Abschnitte. Trotzdem gilt Regel Null: Details am PDF gegenlesen,
Abschnittstitel zitieren.

## Nicht-Ziele

- **kein PR-Flow und keine Branch-Protection** (O-GH-002 – braucht den Owner am GitHub-UI;
  eigener Punkt, nicht dieses WP),
- **kein PDF-↔-Markdown-Treuecheck** und keine Korrektur von Konzeptfassungen (WP-019),
- **keine Produktcode-Änderungen jenseits der Label-Typisierung** aus Slice 3 – insbesondere
  **keine A11y-Fixes am Produkt**: axe-Verstöße werden Findings, nicht Sofortfixes
  (einzige benannte Ausnahme: Acceptance 24),
- **keine erfundenen Übersetzungen**: fehlende deutsche Glossen werden explizit `null`,
  nicht gefüllt (O-WP014-11 und O-WP017-09 bleiben offen),
- **keine CI-Ausführung des QA-Laufs** (Playwright in GitHub Actions = CI-Minuten = Kosten →
  O-COST-001, Owner; der QA-Lauf ist lokal),
- **keine Visual-Regression-Baseline mit Pixelvergleich** (Dok. 20C „Teststrategie" Zeile Visual
  – späteres WP, O-WP018-02); dieses WP erzeugt Screenshots für Menschen, keine Diff-Pipeline,
- **kein Secret Scan, keine Supply-Chain-/statische Securityanalyse, kein Docs-/Linkcheck in CI**
  (20C-„Fast Gate"/„Pull-Request Gate"-Soll; benannt in O-WP018-01, eigene WPs),
- **kein Generator für Statusdateien** – `CURRENT_STATE.md` & Co. bleiben manuell; `seed_facts.py`
  liefert nur zitierfähige Zahlen,
- **kein neues Designsystem, keine visuelle Aufwertung „nebenbei"** (DR-0003): die Screenshots
  zeigen den minimalen Stand – genau das ist ihr Zweck.

## Scope

### Slice 1 – Linter/Formatter (schließt FINDING-0005)

**Werkzeugwahl durch den Builder, dokumentiert per kurzem ADR** (`docs/architecture/adr/`,
Muster ADR-0000/ADR-0001): **Biome** oder **ESLint + Prettier**. Kriterien (Owner-Zuschnitt):
eine Konfigurationsdatei, schnell, jsx-a11y-Äquivalent, wenig Abhängigkeiten.

**Verhältnis zu ADR-0001 explizit klären:** ADR-0001 nennt im akzeptierten Stack bereits
„Lint/Format: ESLint + Prettier". Fällt die Wahl auf Biome, **löst der neue ADR diese Zeile
ausdrücklich ab** – keine stille Widerspruchsauflösung (`.claude/rules/docs.md`). Fällt sie auf
ESLint + Prettier, bestätigt der ADR die Zeile und dokumentiert die konkrete Regelbasis
(z. B. `next/core-web-vitals`, `@typescript-eslint`, `jsx-a11y`).

**Umsetzung:**

- `lint`-Skript in **jedem** der fünf Workspace-Pakete (`apps/web`, `apps/api`,
  `packages/contracts`, `packages/demo-seed`, `packages/db`) und im Root
  (`pnpm lint` → `turbo run lint`; `lint`-Task in `turbo.json` ergänzen),
- Formatprüfung nach Dok. 20C „Fast Gate" (bei Biome in `lint`/`check` integriert, bei
  Prettier als `format:check` – der ADR benennt das Kommando),
- **CI-Job ergänzen:** Lint-Schritt in `.github/workflows/app-ci.yml` **vor** Test/Build
  (bestehender Runner, keine neuen kostenpflichtigen Ressourcen),
- **Bestandsbereinigung in einem eigenen Commit**, getrennt von der Einführung
  (Owner-Zuschnitt; außerdem Briefing §7 Lektion 9: explizit stagen). Die Bereinigung ändert
  **kein beobachtbares Verhalten** – alle bestehenden Tests bleiben grün, kein gerenderter
  Produkttext ändert sich. Jede Regelabschaltung und jede Inline-Ausnahme wird einzeln begründet
  (Kommentar am Ort + Sammelliste im ADR oder in der Review-Notiz). Regeln werden konfiguriert,
  nicht leergedreht: eine Regel, die flächig deaktiviert werden müsste, wird als bewusste
  Konfigurationsentscheidung im ADR begründet – nicht per Streu-Disables versteckt.

### Slice 2 – Sichtbare Abnahme: Screenshots + axe (DR-0007 E-03)

**Neue Abhängigkeiten** (→ eigener ADR, siehe Acceptance 15): **Playwright** (in ADR-0001 bereits
„ab UI-Flows" vorgesehen – dieser Slice ist die Aktivierung) und **axe-core** (+ Playwright-Adapter,
z. B. `@axe-core/playwright`).

**Ein Kommando:** `pnpm qa:visual` (Root; WP-Kennung als Argument, ohne Argument klare
Fehlermeldung statt Raten). Der Lauf:

1. baut `apps/web` in ein **vom Dev-Server getrenntes** Build-Verzeichnis (siehe unten),
2. startet den Server auf einem **eigenen Port** (nicht 3000),
3. setzt die Demo-Sitzung **deterministisch** über den localStorage-Schlüssel
   `isms-demo-session-v1` (`apps/web/lib/shell/session.ts`; dokumentierte Rolle + Mandant,
   Default R01 / `tenant-nordwerk`) – kein UI-Login-Klickpfad,
4. erzeugt Screenshots der **sieben Seiten** – `/heute`, `/twin`, `/twin/tenant-nordwerk`,
   `/isms`, `/services`, `/entscheidungen` und **eine Objekt-360-Seite** (stabile Seed-Konstante
   `NORDWERK_OBJECT_ID.RISK_BETRIEBSUNTERBRECHUNG` aus `packages/demo-seed`, im Skript aus dem
   Seed bezogen, nicht als Literal) – je **Desktop 1440×900** und **Mobil 390×844**,
   `deviceScaleFactor: 1`, `prefers-reduced-motion: reduce` emuliert,
5. führt auf denselben Seiten **axe-core** aus (WCAG-2.x-A/AA-Regelwerk; mindestens Kontrast,
   Rollen, zugängliche Namen) und schreibt den Report als Artefakt,
6. legt alles unter `docs/project/visual/<WP-Kennung>/` ab (dieser Lauf: `WP-018/`) –
   **committete Artefakte**, damit der Owner im Repository sieht, was gebaut ist,
7. **stoppt den Server – auch im Fehlerfall** (kein Zombie-Prozess, kein belegter Port).

Das Skript läuft unter **Windows/PowerShell** (die Maschine des Owners) und braucht nach der
einmaligen, dokumentierten Browser-Installation (`pnpm exec playwright install chromium`)
**keinen Netzwerkzugriff zur Laufzeit**.

**Dev-Server-Konflikt (Briefing §7 Lektion 10 – Pflichtteil, nicht Kür):** `pnpm build` und
`next dev` teilen sich heute `apps/web/.next` und zerschießen sich gegenseitig (zweimal passiert;
Symptom: 404 auf `page.js`, Seite hängt bei „Lade Kontext …"). Der QA-Lauf **muss** das lösen:

- **mindestens:** eigener Port **und** eigenes Build-Verzeichnis für den QA-Build (z. B.
  `distDir` per Umgebungsvariable in `apps/web/next.config.mjs`, QA nutzt `.next-qa`) oder ein
  Standalone-Build,
- **Kandidat (Owner-Zuschnitt):** getrenntes Build-Verzeichnis **generell** (dev vs. build) –
  zulässig, wenn der Builder es sauber umsetzt; dann ist `turbo.json`
  (`outputs: [".next/**", …]`) im **selben Pass** nachzuziehen und `.gitignore` zu prüfen,
- **Rückfallebene:** erkennt das Skript eine Konfliktlage, die es nicht sicher lösen kann,
  bricht es **vor der ersten schreibenden Aktion** mit einer klaren deutschen Meldung ab,
  die den Konflikt benennt. **Stille Korruption ist ein Abbruchkriterium**, kein akzeptierter
  Restfehler.

**axe-Verstöße werden Findings, nicht Fixes:** jeder Verstoß mit Impact `serious`/`critical`
wird unter `docs/project/risks/` dokumentiert (Sammel-Finding zulässig), `moderate`/`minor`
mindestens im committeten Report + Review-Notiz. Produktkorrekturen sind ein **Folge-WP**
(Nicht-Ziel; Ausnahme nur Acceptance 24). „0 Verstöße" wird genauso ausgewiesen wie Verstöße –
nichts ist still.

**Toolabgrenzung:** Playwright-Specs liegen außerhalb des vitest-Patterns
(`apps/web/vitest.config.ts` sammelt `**/*.test.{ts,tsx}` ein) – eigenes Verzeichnis und/oder
eigene Endung (z. B. `qa/*.spec.ts`), damit `vitest run` sie nie anfasst.

### Slice 3 – Kleine mechanische Wächter (aus der Prozessprüfung)

**a) Wächtertest „kein Prozessvokabular im Produkt":** Die Fehlerklasse (Projekt-Interna im
gerenderten Produkttext) trat in WP-012, WP-013 und WP-016 auf und wurde bisher nur von
aufmerksamen Reviewern gefunden. Neuer Test (Vorschlag:
`apps/web/components/__tests__/prozessvokabular.test.tsx`):

- rendert die Inhaltskomponenten **aller** `live`-Orte plus Objekt-360 mit echtem `DEMO_SEED`
  (mindestens Nordwerk und Consulting Operator, wo der Ort sitzungs-/mandantengebunden ist),
- prüft den gerenderten Text gegen die verbotenen Muster
  `/O-WP\d/`, `/FINDING-/`, `/WP-\d{3}/`, `/CCP-\d/`, `/\bSlice\b/`, `/\bAcceptance\b/`,
- **Meta-Assertion gegen stilles Veralten:** die geprüfte Ortsliste wird gegen die
  `live: true`-Orte aus `NAV_PLACES` (`apps/web/lib/shell/places.ts`) abgeglichen – ein neuer
  echter Ort macht den Wächter rot, bis er eingetragen ist (Muster
  `leerzustand-mandantengrenze.test.tsx`),
- **dokumentierte Ausnahmen der bestehenden Wächter respektieren**; wird selbst eine Ausnahme
  nötig, folgt sie dem etablierten Muster (Ausnahme auslassen **und** ihre Existenz prüfen –
  `entscheidungen.test.tsx`, Kommentar „EINE dokumentierte Ausnahme"), die Regel wird **nicht**
  abgeschwächt (Briefing §7 Lektion 11: Wächter prüfen die Regel, nicht den Wortlaut),
- Fixture-Negativbeweis: ein Text mit z. B. `O-WP018-99` würde erkannt.

**b) Erschöpfende Label-Typen:** `OBJECT_TYPE_LABEL_DE` in `apps/web/lib/twin/data.ts` (Zeile 82)
ist heute `Record<string, string>` – ein neuer Objekttyp ohne Glosse fällt niemandem auf, bis ein
Review ihn findet (O-WP014-11, O-WP017-09). Umstellung auf
**`Record<ObjectType, string | null>`** (`ObjectType` aus `@isms/contracts`,
`vocabularies.ts:190`): fehlende Glossen stehen **explizit auf `null`** – ein im Contract neu
aufgenommener Objekttyp erzeugt einen **Compilefehler** statt eines Reviewbefunds.
**Keine Übersetzung wird erfunden** – die offenen Glossen-Fragen bleiben offen. Die gerenderte
Ausgabe (`objectTypeLabel`/`objectTypeDisplay`: `null` ⇒ Fallback auf den kanonischen Namen)
ändert sich **nicht** – per Test belegt. Die Erschöpfung liegt an der **Deklaration** (kein
`Partial`, kein Index-Fallback an der Deklarationsstelle); ein Cast ist höchstens an der
Lesestelle zulässig. Die analoge Umstellung von `REL_TYPE_TO_LABEL_DE` ist **nicht** Teil des
Zuschnitts (Scope-Disziplin; bei Bedarf als offene Frage notieren).

**c) `scripts/seed_facts.py` – kanonische Seed-Zahlen auf Abruf:** Zahlen aus Builder-Berichten
wanderten schon einmal ungeprüft in drei Statusdateien (Briefing §7 Lektion 6). Das Skript gibt
die kanonischen Zahlen des Seeds aus: Objekte/Beziehungen **gesamt**, **je Mandant**, **je
Schicht** (die `layers` der Seed-Aggregation, vgl. `seed-manifest.json`). Regeln:

- die Zahlen werden **aus dem Seed selbst** abgeleitet (z. B. über die gebauten Exporte von
  `@isms/demo-seed` via Node-Aufruf) – **nicht** aus `seed-manifest.json` abgeschrieben, sonst
  wäre der Abgleich zirkulär,
- fehlt der Build, bricht das Skript mit einer klaren Meldung ab („erst `pnpm build`") statt mit
  Traceback,
- ein **neuer Test in `packages/demo-seed`** beweist, dass die Faktenquelle des Skripts mit
  `DEMO_SEED` **und** `seed-manifest.json` übereinstimmt (die bestehenden
  Manifest-Konsistenztests in `seed.spec.ts` sind das Muster),
- Statusdateien bleiben **manuell**; der Fortschrittsreport darf aus der Skriptausgabe zitieren.

## Acceptance Criteria

Jedes Kriterium nennt das Kommando und das erwartete Ergebnis – „Lint" als leeres Wort ist genau
der Fehler (FINDING-0005), den dieses WP beendet.

**Slice 1 – Linter/Formatter**

1. **ADR liegt vor:** `docs/architecture/adr/ADR-0003_linter_formatter.md` (Nummer bei Konflikt
   fortzählen) dokumentiert die Wahl Biome **oder** ESLint + Prettier entlang der vier Kriterien
   (eine Konfigurationsdatei, Geschwindigkeit, jsx-a11y-Äquivalent, wenig Abhängigkeiten) und
   klärt das Verhältnis zu ADR-0001 („Lint/Format: ESLint + Prettier") **ausdrücklich** – bei
   Biome als benannte Ablösung dieser Zeile, nie still.
2. **`pnpm lint` ist echt:** `pnpm lint` im Root endet mit Exit-Code 0 und läuft nachweislich
   über alle fünf Workspace-Pakete (`apps/web`, `apps/api`, `packages/contracts`,
   `packages/demo-seed`, `packages/db`); `turbo.json` führt einen `lint`-Task; jedes Paket hat
   ein `lint`-Skript.
3. **Formatprüfung ist echt** (Dok. 20C „Fast Gate": Formatprüfung + Lint): das im ADR benannte
   Kommando (z. B. `pnpm format:check`, bei Biome ggf. in `pnpm lint` integriert) endet mit
   Exit-Code 0 über das Monorepo.
4. **Negativbeweis Lint:** eine absichtlich eingebaute Verletzung (z. B. ungenutzte Variable in
   `apps/web`) lässt `pnpm lint` mit Exit-Code ≠ 0 fehlschlagen; die Meldung nennt Datei und
   Regel. Der Beweis ist in der Review-Notiz mit Ausgabe dokumentiert; die Verletzung wird
   danach entfernt und **nie committet**.
5. **Negativbeweis A11y-Regelwerk:** eine absichtliche A11y-Verletzung (z. B. `<img>` ohne `alt`)
   wird von `pnpm lint` gemeldet – das jsx-a11y-Äquivalent ist damit belegt aktiv, nicht nur
   installiert. Ablauf wie AC 4 (dokumentieren, entfernen, nicht committen).
6. **CI prüft Lint:** `.github/workflows/app-ci.yml` führt den Lint-Schritt (und ggf.
   `format:check`) **vor** `pnpm test`/`pnpm build` aus; der Workflow läuft auf dem bestehenden
   Runner grün; keine neue kostenpflichtige Ressource.
7. **Einführung und Bereinigung getrennt:** Commit A enthält Konfiguration, Skripte und ADR
   (ohne Bestandsänderungen), Commit B die Bestandsbereinigung. Commit B ändert kein
   beobachtbares Verhalten: alle bestehenden Tests (Stand: 428) sowie `pnpm typecheck` und
   `pnpm build` bleiben grün, kein gerenderter Produkttext ändert sich (Review-Stichprobe).
   Jede Regelabschaltung/Inline-Ausnahme ist einzeln begründet.
8. **Offline-fähig:** Lint- und Formatlauf brauchen nach `pnpm install` keinen Netzwerkzugriff
   zur Laufzeit (Beleg per Lauf ohne Netz oder eindeutiger Werkzeugdokumentation; andernfalls
   Stop Condition).

**Slice 2 – Sichtbare Abnahme**

9. **Ein Kommando, kompletter Zyklus:** `pnpm qa:visual` (mit WP-Kennung als Argument; ohne
   Argument klare Fehlermeldung) führt ohne weitere Handgriffe aus: QA-Build in ein vom
   Dev-Server getrenntes Build-Verzeichnis, Serverstart auf eigenem Port (nicht 3000),
   Screenshots + axe, Serverstopp. Der Serverstopp erfolgt **auch im Fehlerfall** (belegt durch
   eine provozierte Fehlprobe: kein Zombie-Prozess, kein belegter Port). Der Lauf funktioniert
   unter Windows/PowerShell.
10. **Motivbestand vollständig und deterministisch:** genau die sieben Seiten `/heute`, `/twin`,
    `/twin/tenant-nordwerk`, `/isms`, `/services`, `/entscheidungen` und die Objekt-360-Seite
    der stabilen Seed-Konstante `NORDWERK_OBJECT_ID.RISK_BETRIEBSUNTERBRECHUNG` – je Desktop
    (1440×900) und Mobil (390×844) → **14 PNG** unter `docs/project/visual/WP-018/` mit
    sprechenden, laufstabilen Dateinamen. Ein wiederholter Lauf erzeugt dieselben Dateinamen und
    strukturell denselben Inhalt (Pixelgleichheit wird **nicht** behauptet – O-WP018-02).
11. **Sitzung deterministisch, ohne Klickpfad:** das Skript setzt vor dem ersten Seitenaufruf die
    Demo-Sitzung über den localStorage-Schlüssel `isms-demo-session-v1` mit dokumentierter
    Rolle + Mandant (Default R01 / `tenant-nordwerk`); `prefers-reduced-motion: reduce` ist
    emuliert; `deviceScaleFactor` ist 1.
12. **Dev-Server-Konflikt gelöst statt verdrängt** (Briefing §7 Lektion 10): Beleg, dass
    `pnpm qa:visual` bei parallel laufendem `pnpm --filter @isms/web dev` durchläuft **und** der
    Dev-Server danach funktionsfähig ist (kein 404 auf `page.js`, kein Hängen bei „Lade
    Kontext …") – **oder** das Skript bricht vor der ersten schreibenden Aktion mit einer klaren
    Meldung ab, die den Konflikt benennt. Stille Korruption von `apps/web/.next` disqualifiziert
    die Lösung. Wird das Build-Verzeichnis generell getrennt, ist `turbo.json`
    (`outputs`) im selben Pass nachgezogen und `pnpm build` + `pnpm --filter @isms/web dev`
    nacheinander erneut verifiziert.
13. **axe misst statt behauptet:** auf denselben sieben Seiten (mindestens Desktop-Viewport)
    läuft axe-core mit WCAG-2.x-A/AA-Regelwerk; `docs/project/visual/WP-018/axe-report.json`
    liegt committet vor; die Review-Notiz fasst die Ergebnisse zusammen. „0 Verstöße" wird
    genauso ausgewiesen wie Verstöße.
14. **Verstöße werden Findings:** jeder axe-Verstoß mit Impact `serious`/`critical` ist als
    Finding unter `docs/project/risks/` dokumentiert (Sammel-Finding zulässig); `moderate`/
    `minor` mindestens im Report + Review-Notiz. **Kein** Produktfix in diesem WP (Ausnahme nur
    AC 24); nichts wird still behoben oder weggelassen.
15. **Werkzeug-ADR:** `docs/architecture/adr/ADR-0004_browser_qa_playwright_axe.md` (Nummer ggf.
    fortzählen) dokumentiert die Playwright-Aktivierung (Bezug ADR-0001 „ab UI-Flows"), die neue
    Abhängigkeit axe-core (+ Adapter), die Build-/Port-/`distDir`-Entscheidung und die
    Screenshot-Größenstrategie.
16. **Toolgrenzen sauber:** `pnpm --filter @isms/web exec vitest run` sammelt keine
    Playwright-Datei ein (Testanzahl ändert sich durch Slice 2 nicht); die einmalige
    Browser-Installation (`pnpm exec playwright install chromium`) ist dokumentiert; zur
    Laufzeit des QA-Laufs ist kein Netzwerkzugriff nötig.
17. **Repo bleibt schlank:** die Gesamtgröße der committeten Artefakte eines Laufs ist gemessen
    und in der Review-Notiz dokumentiert; liegt sie über **5 MB je Lauf** (oder eine Einzeldatei
    über 1 MB), greift die Stop Condition: Strategie dokumentieren statt still committen.

**Slice 3 – Mechanische Wächter**

18. **Prozessvokabular-Wächter existiert:** ein neuer Test rendert die Inhaltskomponenten aller
    `live`-Orte plus Objekt-360 mit echtem `DEMO_SEED` (mindestens Nordwerk und Consulting
    Operator, wo mandantengebunden) und weist nach, dass der gerenderte Text **keines** der
    Muster `/O-WP\d/`, `/FINDING-/`, `/WP-\d{3}/`, `/CCP-\d/`, `/\bSlice\b/`, `/\bAcceptance\b/`
    enthält. `pnpm --filter @isms/web exec vitest run` ist grün.
19. **Der Wächter kann nicht still veralten:** eine Meta-Assertion vergleicht die geprüfte
    Ortsliste mit den `live: true`-Orten aus `NAV_PLACES` – ein künftiger echter Ort macht den
    Test rot, bis er eingetragen ist (Muster `leerzustand-mandantengrenze.test.tsx`).
20. **Negativbeweis und Ausnahmen-Disziplin:** ein Fixture-Negativbeweis zeigt, dass z. B.
    `O-WP018-99` im gerenderten Text erkannt würde. Nötige Ausnahmen folgen dem dokumentierten
    Muster (Ausnahme auslassen + Existenz prüfen, `entscheidungen.test.tsx`); die Regel wird
    nicht abgeschwächt. Bestandsverstöße → AC 24.
21. **Label-Typen erschöpfend, Ausgabe unverändert:** `OBJECT_TYPE_LABEL_DE` ist als
    `Record<ObjectType, string | null>` deklariert (`ObjectType` aus `@isms/contracts`); alle
    Objekttypen ohne freigegebene Glosse stehen explizit auf `null`; **keine neue Übersetzung**
    (O-WP014-11/O-WP017-09 bleiben offen). Ein Test belegt, dass `objectTypeDisplay` für
    **jeden** Eintrag aus `OBJECT_TYPE` dieselbe Ausgabe liefert wie vor der Umstellung
    (`null` ⇒ kanonischer Name); alle bestehenden Web-Tests bleiben grün. Compile-Beweis: das
    Entfernen eines Eintrags erzeugt einen `pnpm typecheck`-Fehler (im Review demonstriert,
    nicht committet).
22. **Seed-Fakten auf Abruf:** `python scripts/seed_facts.py` gibt Objekte/Beziehungen gesamt,
    je Mandant und je Schicht aus (Stand Seed 1.2.0 zur Orientierung: 43/62 gesamt, Nordwerk
    34/51, Consulting Operator 9/11, Finovia/MediCore 0/0 – **am Seed nachzurechnen, nicht
    abzuschreiben**, Briefing §7 Lektion 6). Die Zahlen stammen aus dem Seed selbst, nicht aus
    `seed-manifest.json`; ohne vorhandenen Build bricht das Skript mit einer klaren Meldung ab.
23. **Fakten sind bewiesen, nicht behauptet:** ein neuer Test in `packages/demo-seed` belegt die
    Übereinstimmung der Faktenquelle mit `DEMO_SEED` **und** `seed-manifest.json`;
    `pnpm --filter @isms/demo-seed exec vitest run` ist grün. Statusdateien bleiben manuell.

**Übergreifend**

24. **Bestandsverstöße ehrlich behandeln:** findet der Prozessvokabular-Wächter (AC 18) einen
    Verstoß im heutigen Produkttext, wird er als Finding dokumentiert; die **minimale**
    Textkorrektur (nur Entfernen der Prozesskennung, nichts Neues, keine Umformulierung darüber
    hinaus) ist als benannte Ausnahme vom Nicht-Ziel zulässig und wird zusätzlich von
    `product-user-lead` reviewt. Der Wächter wird **nicht** um den Verstoß herumgebaut.
25. **Gates besetzt wie zugeschnitten:** `code-reviewer` + `platform-devops-reliability`
    (Zweitreview, dokumentiert begründet statt `product-user-lead`) + `qa-test-engineer` für die
    neuen Wächtertests (FINDING-0006); Builder ≠ Reviewer; der Builder schließt kein Finding
    selbst; nach dem Fix-Pass eine zweite Runde derselben Reviewer. Alles in der Review-Notiz
    unter `docs/project/reviews/` dokumentiert.
26. **Gesamtverifikation:** `pnpm lint`, `pnpm typecheck`, `pnpm test` (frisch, ohne
    Turbo-Cache: `pnpm --filter <pkg> exec vitest run`), `pnpm build` und
    `python scripts/validate_handoff.py` sind grün; `pnpm qa:visual` ist einmal final gelaufen
    und die Artefakte sind committet; `CURRENT_STATE.md`, `WORK_QUEUE.md`, `handovers/LATEST.md`
    und `CONTINUATION_BRIEFING.md` (Testzahl, Lektion 10: Konfliktlösung eintragen, „kein
    Linter"-Aussagen entfernen) sind aktualisiert. Jede beim Bauen gefundene Lücke steht als
    `O-WP018-*` in `docs/project/OPEN_QUESTIONS.md` – geraten wird nichts.

## Benannte Lücken und offene Fragen (Vorschlag für `docs/project/OPEN_QUESTIONS.md`)

| ID (Vorschlag) | Frage | Art | Umgang in WP-018 | Owner / Gate |
|---|---|---|---|---|
| **O-WP018-01** | Dok. 20C „CI- und Quality-Gate-Pipeline" verlangt im Fast-/PR-Gate weit mehr als Lint: Secret Scan, verbotene Datei-/Größenprüfung, Dependency-/Supply-Chain-Prüfung, statische Securityanalyse, visuelle Regression, Docs-/Linkprüfung, Demo-Seed-Validierung in CI | Prozess-/CI-Lücke (Soll aus 20C) | nur Formatprüfung + Lint werden gebaut; der Rest ist benannt und bleibt offen | program-manager (Queue-Schnitt), Security bei den Security-Anteilen |
| **O-WP018-02** | „Reproduzierbar" bei Screenshots heißt: gleiche Motive, gleiche Namen, gleicher Datenstand – **nicht** pixelidentisch (Font-/OS-Rendering). Echte visuelle Regression (Baseline + Diff, 20C „Teststrategie" Zeile Visual) fehlt | Lücke (Werkzeug) | ehrlich so benannt; Screenshots sind Abnahme-Artefakte für Menschen | program-manager (eigenes WP, wenn Baseline gewünscht) |
| **O-WP018-03** | axe misst nur den automatisierbaren Teil von Accessibility; Tastaturbedienung und Screenreader-Semantik (20C „Teststrategie" Zeile Accessibility) bleiben manuell | Lücke (Methode) | axe-Ergebnisse werden nie als „A11y vollständig geprüft" ausgegeben; manuelle Browser-QA bleibt Pflichtteil der WPs | QA / UX |
| **O-WP018-04** | CI-Ausführung des QA-Laufs (Playwright in GitHub Actions): Browser-Download + Laufzeit = CI-Minuten = Kosten | Owner-Entscheidung (O-COST-001) | QA-Lauf bleibt lokal; CI unverändert schlank | Human Product Owner |
| **O-WP018-05** | Aufbewahrung der Screenshot-Ordner über viele WPs: `docs/project/visual/WP-0xx/` wächst mit jedem WP. Alles behalten, ablösen oder nur den letzten Stand führen? | Prozessfrage (Repo-Größe) | nur `WP-018/` wird angelegt; Strategie ab dem zweiten Ordner offen | Owner + program-manager |
| **O-WP018-06** | Die sichtbare Abnahme zeigt eine dokumentierte Default-Perspektive (R01 / Nordwerk). Ob der Owner je WP weitere Perspektiven sehen will (Consulting Operator, leerer Mandant, andere Rolle), ist offen | Produkt-/Prozessfrage | Default dokumentiert im Skript; keine Perspektiven-Matrix gebaut | Human Product Owner |
| **O-WP018-07** | Der Prozessvokabular-Wächter prüft die Inhaltskomponenten der echten Orte – nicht 404-/Fehlerzustände, nicht `aria-*`-Attributwerte, nicht Platzhalterseiten | Lücke (Reichweite, bewusst) | Reichweite im Testkommentar benannt statt Vollständigkeit behauptet | QA (Erweiterung bei Bedarf) |

## Stop Conditions

- eine neue Abhängigkeit braucht **Netzwerkzugriff zur Laufzeit** von Lint, Format, Tests oder
  QA-Lauf (nach der einmaligen Installation) → stoppen, dokumentieren, Alternative vorschlagen
  (CLAUDE.md: „KI-gestützt, nicht KI-abhängig; deterministische Fallbacks"),
- der **Dev-Server-Konflikt** lässt sich weder über getrennte Verzeichnisse/Ports noch über
  einen sauberen Abbruch lösen – jede Restgefahr stiller `.next`-Korruption → stoppen, Befund
  dokumentieren (Briefing §7 Lektion 10),
- **Screenshot-Größen blähen das Repo auf** (> 5 MB je Lauf oder Einzeldatei > 1 MB trotz
  `deviceScaleFactor: 1`) → nicht committen; Strategie dokumentieren (Format, Ausschnitt,
  Aufbewahrung, ggf. Git LFS als Owner-Frage) statt still committen,
- die **Bestandsbereinigung** (Slice 1) würde beobachtbares Verhalten oder gerenderten
  Produkttext ändern → stoppen (das wäre eine Produktänderung ohne Product Gate),
- Druck, **axe-Befunde „schnell mitzufixen"** (Produktcode) → Finding statt Fix; einzige
  benannte Ausnahme ist AC 24,
- Bedarf, eine **deutsche Glosse zu erfinden**, damit die Label-Map „vollständiger aussieht" →
  stoppen; `null` ist die ehrliche Antwort (O-WP014-11),
- ein **Wächtertest ließe sich nur „grün bekommen", indem seine Regel abgeschwächt, die
  Ausnahme verallgemeinert oder der Test übersprungen wird** → stoppen (WP-017-Prinzip),
- Scope-Drift Richtung **PR-Flow/Branch-Protection** (O-GH-002), **PDF-MD-Treuecheck** (WP-019)
  oder **kostenpflichtige CI-/Cloud-Ressourcen** (O-COST-001) → stoppen, an Owner/Queue,
- der QA-Lauf hinterlässt **Zombie-Prozesse oder belegte Ports**, die Folgearbeit blockieren →
  vor Abschluss beheben, sonst stoppen,
- ein Werkzeug erzwingt eine **Massen-Codeänderung, deren Verhaltensneutralität nicht mehr
  überprüfbar ist** → stoppen, kleiner schneiden.

## Done Evidence

- Kommandoprotokolle in der Review-Notiz: `pnpm lint` grün + beide Negativbeweise (AC 4/5),
  `pnpm qa:visual` (finaler Lauf mit Größenangabe der Artefakte), `python scripts/seed_facts.py`
  (Ausgabe), Konfliktprobe zu AC 12,
- **14 Screenshots + `axe-report.json`** committet unter `docs/project/visual/WP-018/`,
- **ADR-0003 (Linter/Formatter)** und **ADR-0004 (Browser-QA)** unter `docs/architecture/adr/`;
  ggf. axe-Findings unter `docs/project/risks/`,
- Review-Notiz unter `docs/project/reviews/` mit den besetzten Gates (Code, DevOps-Zweitreview,
  QA; ggf. Product bei AC 24), beiden Reviewrunden und dem Verbleib jedes Findings,
- frischer Testlauf ohne Turbo-Cache über **alle** Pakete plus `pnpm lint`, `pnpm typecheck`,
  `pnpm build`, `python scripts/validate_handoff.py`,
- aktualisierte `docs/project/CURRENT_STATE.md`, `docs/project/WORK_QUEUE.md`,
  `docs/project/handovers/LATEST.md`, `docs/project/OPEN_QUESTIONS.md` (`O-WP018-*`),
  FINDING-0005 auf **Geschlossen** gesetzt (mit Verweis auf dieses WP) und
  `docs/project/CONTINUATION_BRIEFING.md` (Testzahl; Lektion 10 um die umgesetzte Lösung
  ergänzt; „kein Linter im Stack"-Aussagen entfernt),
- getrennte Commits je Slice, Bestandsbereinigung als eigener Commit (explizit gestaged, nie
  `git add -A` – Briefing §7 Lektion 9), Micro-/Verified-Checkpoints, Commit + Push.
