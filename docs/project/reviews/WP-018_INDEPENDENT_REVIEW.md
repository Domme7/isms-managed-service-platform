# WP-018 – Drei Gates, Gegenprüfung und erster maschineller QA-Lauf

**Work Package:** WP-018 Werkzeuge & sichtbare Abnahme (Linter, Playwright + axe, Screenshots je WP)
**Datum:** 2026-07-23
**Builder:** `platform-devops-reliability` (S1/S2, Fix-Pass) + `qa-test-engineer` (S3) — **Builder ≠ Reviewer**
**Gates:** `code-reviewer` + `platform-devops-reliability` (Zweitreview) + `qa-test-engineer`
(QA-Gate) — erste Umsetzung der Gate-Matrix aus FINDING-0006; Domain Gate dokumentiert unbesetzt
(keine Fachlogik). Zusätzlich `product-user-lead` als **Sondergate** für die produktsichtbaren
AC-24-Textkorrekturen.
**Commits:** `d392ce1` (AC-24, Produkt-Gate) · `d5b8ea4` (Werkzeuge) · `cee1a5a` (FINDING-0008 + O-WP018)

## Ablauf

| Runde | Gate | Urteil |
|---|---|---|
| 1 | Code | Freigabe mit Minor-Fixes (2 major, 4 minor, 5 nit) |
| 1 | DevOps/Reliability | Freigabe mit Minor-Fixes (3 minor, 3 nit) |
| 1 | QA | Freigabe mit Minor-Fixes (2 major, 3 minor, 3 nit) |
| 2 | Code (Gegenprüfung) | **Freigabe** |
| 2 | Product (Sondergate AC-24) | **Freigabe** |

9 Findings im gebündelten Fix-Pass; die Orchestrator-Anteile (FINDING-0008, O-WP018-Register,
`pnpm build` bei freiem Port) separat erledigt.

## Was dieses WP verändert

**Qualität entsteht jetzt auch über Mechanik, nicht nur über Aufmerksamkeit** — die Kernkritik der
unabhängigen Prozessprüfung:

1. **Linter** (Biome 2.5.5, ADR-0003): schließt **FINDING-0005**. Die abgelöste
   ESLint+Prettier-Zeile in ADR-0001 trägt einen Supersede-Vermerk — keine stille Ablösung.
2. **`pnpm qa:visual <WP>`** (ADR-0004): ein Kommando erzeugt 14 Screenshots + axe-Report als
   **committete Artefakte** (`docs/project/visual/WP-018/`). Der Owner sieht ab jetzt bei jedem
   WP im Repo, wie das Produkt aussieht — DR-0007 E-03 ist eingelöst.
3. **Lektion 10 mechanisch abgesichert:** QA-Build in `.next-qa` auf Port 3100; eine
   **Build-Ziel-Wache** verifiziert nach jedem Build, dass `.next-qa` beschrieben und `.next`
   unberührt ist. Der Schutz hängt nicht mehr an einer einzigen unbewachten Konfigzeile
   (Major-Fund des Code-Gates, behoben und gegen­geprüft: Rückabwicklung wird rot).
4. **Drei Wächter:** Prozessvokabular (64 Render-Varianten, Meta-Assertion gegen `NAV_PLACES`),
   erschöpfende Glossen-Typen (`Record<ObjectType, string | null>` — fehlende deutsche Labels sind
   jetzt Compilefehler), `seed_facts` (Zahlen aus dem Seed generiert, Manifest gebunden).

## Die zwei besten Belege des WP

**Die Stop Condition griff real:** Der erste Screenshot-Lauf (fullPage, 7,5 MB) brach mit Exit 1
ab, statt still zu committen — genau das geforderte Verhalten. Strategie umgestellt, ~1 MB je Lauf.

**Der erste axe-Lauf fand sofort, was zwei manuelle Review-Runden nicht sehen konnten:** Der
A11y-Fix aus WP-014 (`role="group"` am `<dl>`) entfernt die Listensemantik — 3× **serious**
(WCAG 1.3.1) auf drei Seiten. Als **FINDING-0008** dokumentiert; Korrektur bewusst **nicht** im
Werkzeug-WP (wäre Scope-Drift), sondern als Folge-Arbeit mit Product Gate.

## AC-24-Sonderfall (Regelkollision sauber eskaliert)

Der neue Wächter fand **Bestandsverstöße**: „Demo-Slice" im Badge (seit WP-004) und die Kennungen
O-WP012-03…06 in fünf Seed-Beschreibungen (seit WP-012) — internes Prozessvokabular im
Nutzertext. Da WP-018 ausdrücklich keine Produktänderungen macht, wurde die minimale Korrektur
als **eigener Commit mit eigenem Produkt-Gate** geführt (Freigabe): nur Kennungen entfernt,
Substanz und Projekt-Nachvollziehbarkeit (Manifest/README/Register) unverändert.

## Verifikation

| Prüfung | Ergebnis |
|---|---|
| `pnpm lint` / `pnpm format:check` | 5/5 grün / 136 Dateien grün |
| `pnpm test --force` | **448 Tests grün** — api 2 · contracts 55 · demo-seed **54** · web **318** · db 19 |
| `pnpm build --force` | 5/5 grün (ausgeführt **nachdem** Port 3000 nachweislich frei war) |
| `pnpm qa:visual WP-018` | grün; 14 PNG + axe-Report committet; Build-Ziel-Wache im Log sichtbar; Port 3100 nach Lauf frei; 1024 KB |
| axe | 3× serious (**FINDING-0008**), moderate/minor: **0** — ausgewiesen, nicht verschwiegen |
| `validate_handoff.py` | grün |

## Offene Punkte

- **FINDING-0008** (dl-Semantik) — Folge-Arbeit mit Product Gate; danach entfallen drei
  `biome-ignore`-Paare.
- **O-WP018-01…07** im Register; darunter zwei Owner-Fragen (QA-Lauf in CI = Kosten;
  weitere Abnahme-Perspektiven je WP).
- FINDING-0006 bleibt „in Behebung": QA-Gate erstmals besetzt (dieses WP), Domain Gate greift ab
  dem nächsten fachlichen WP.

## Gesamturteil

**Freigegeben.** 26 Acceptance Criteria erfüllt; FINDING-0005 geschlossen; die sichtbare Abnahme
(E-03) ist eingelöst und hat im ersten Lauf einen echten A11y-Befund geliefert.
