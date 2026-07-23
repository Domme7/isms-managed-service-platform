# Active Work Package

- **ID:** WP-018
- **Titel:** Werkzeuge & sichtbare Abnahme (Linter, Playwright + axe, Screenshots je WP)
- **Datei:** `work-packages/WP-018_WERKZEUGE_SICHTBARE_ABNAHME.md`
- **Context Pack:** `context-packs/WP-018/CONTEXT_PACK.md`
- **Führende Quellen:** DR-0007 (E-03, Owner-entschieden) · FINDING-0005/-0006 · Dok. 20C
  (Abschnitte „Fast Gate" / Teststrategie — im PDF gegenlesen)
- **Status:** Active — Slice 1 (Linter/Formatter + ADR-0003)
- **Builder:** platform-devops-reliability · **Gates:** code-reviewer + platform-devops-reliability
  (Zweitreview) + qa-test-engineer (neue Wächtertests); Domain Gate dokumentiert unbesetzt
  (keine Fachlogik)
- **Human Gates:** ADR für neue Abhängigkeiten (Playwright/axe/Linter); keine Produktlogik
- **Ziel des WP:** Qualität über Mechanik statt Aufmerksamkeit — und der Owner sieht das Produkt
  erstmals im Rahmen jeder Abnahme (Screenshots + axe-Report als committete Artefakte).

## Slices

1. Linter/Formatter + `pnpm lint` + CI-Schritt (schließt **FINDING-0005**); ADR-0003 klärt das
   Verhältnis zu ADR-0001 („ESLint + Prettier" steht dort bereits).
2. `pnpm qa:visual <WP>` — ein Kommando: Build in **getrenntes Verzeichnis** (Briefing-Lektion 10),
   eigener Port, 7 Seiten × 2 Viewports Screenshots nach `docs/project/visual/WP-0xx/`,
   axe-Report; ADR-0004.
3. Mechanische Wächter: Prozessvokabular-Test über alle Orte, `Record<ObjectType, string | null>`
   für die Glossen-Map, `scripts/seed_facts.py` + Manifest-Bindungstest.

> Abgeschlossen: WP-001..004, 007, 011..017.
> Danach: WP-019 Konzeptfassungen aus PDFs → WP-020 verlorene Anforderungen → WP-021 Demo-Welt.
> Offene Human Gates: CCP-001..003, Docker, FINDING-0004, O-WP014-09; E-02 nur als Change Proposal.
