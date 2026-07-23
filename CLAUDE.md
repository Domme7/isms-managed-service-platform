# CLAUDE.md – Globale Arbeitsregeln

> ## ⚠️ REGEL NULL: Alles kommt aus den PDFs
>
> **Die 24 PDF-Originale unter `docs/concept/pdf/` sind die Produktwahrheit. Punkt.**
>
> Jede Anforderung, jedes Pflichtfeld, jede Akzeptanz-Aussage, jedes Vokabular und jede Zahl,
> die in Code, Datenmodell, Seed, Tests oder Acceptance Criteria einfließt, wird **im PDF
> nachgelesen** — nicht im Markdown, nicht im Chat, nicht aus dem Gedächtnis.
>
> **Warum das keine Formalie ist:** Am 2026-07-23 wurden alle 24 Markdown-Fassungen gegen ihre
> PDFs geprüft. Ergebnis: **5 schwerwiegend abweichend, 14 material abweichend, nur 1 treu.**
> Ganze Pflichttabellen fehlten, Verbote wurden zu Empfehlungen abgeschwächt, und Anforderungen
> standen im Markdown, die im PDF nie existierten. Das Projekt hat monatelang aus einer
> ungeprüften Interpretation gebaut. Vollständiger Befund:
> `docs/concept/abgleich/PDF_MARKDOWN_ABGLEICH_2026-07-23.md` · FINDING-0007 · DR-0006.
>
> **So liest du ein PDF** (pypdf ist installiert):
> ```bash
> python scripts/pdf_text.py 07              # ganzes Dokument als Text
> python scripts/pdf_text.py 06 --suche "Trust Layer"
> ```
>
> **Zitierregel:** Nenne immer den **Abschnittstitel**, nicht nur die Nummer — die
> Foliennummerierung im PDF weicht stellenweise von der Navigationsleiste und vom Markdown ab.
>
> **Wenn Markdown und PDF sich widersprechen:** das PDF gilt, das Markdown wird korrigiert, und
> die Korrektur wird als Befund festgehalten. Kein Human Gate nötig — es wird keine
> Produktentscheidung geändert, sondern eine Übertragung repariert.

## Produkt

Die ISMS Managed Service Platform ist ein mandantenfähiges, rollenbasiertes Betriebs-, Entscheidungs- und Service-System für kontinuierliches Informationssicherheitsmanagement und skalierbare Managed Services. Sie verbindet digitalen Unternehmenszwilling, ISMS-Kernprozesse, Risiken, Controls, Maßnahmen, Evidence, Decision Center, Reporting, Automatisierung, Beratung und Services. Sie ist kein Dokumentenfriedhof und ersetzt keine operativen Quellsysteme wie SIEM, CMDB, Ticketing oder Schwachstellenscanner.

## Verbindliche Projektwahrheit

1. **Konzept-Originale = Produktwahrheit: `docs/concept/pdf/` (24 PDFs) — Pflichtlektüre, kein
   Archiv.** Bei jeder Abweichung zwischen PDF und Markdown gilt **das PDF** (DR-0006). Alles, was
   in ein Datenmodell, eine Acceptance Criterion oder eine Produktaussage einfließt, wird im PDF
   gegengelesen. Textextraktion: Python + `pypdf`.
2. **Arbeitsfassung: `docs/concept/active/` (24 Markdown-Dokumente)** — durchsuchbar und zitierbar.
   **Dok. 03–07 sind seit WP-019 quellentreu neu abgeleitet** (Kopfnotiz je Datei); der Rest ist
   nachweislich **nicht** verlustfrei (FINDING-0007). Eine Aussage, die **nur** im Markdown steht,
   ist begründungspflichtig.
3. **Schichtenmodell der Produktwahrheit:** PDF-Basis → Owner-Entscheidungen (`docs/decisions/`,
   gehen bei Konflikt vor) → Ideen (`research/ideas/`). Navigator: `docs/README.md`.
4. Master-Index: `docs/concept/active/00_MASTER_INDEX_UND_PROJEKTVERFASSUNG_v1.2.md`
5. Aktueller Status: `docs/project/CURRENT_STATE.md`
6. Aktives Work Package: `docs/project/ACTIVE_WORK_PACKAGE.md`
7. Letzter Wiedereinstieg: `docs/project/handovers/LATEST.md`
8. Entscheidungen: `docs/architecture/adr/` und `docs/decisions/`
9. Code, Tests und Migrationen sind Umsetzungswahrheit, nicht Produktwahrheit.
10. Chat, Transcript und lokales Memory sind nicht autoritativ.

## Start jeder Session

- Repository-Root, Branch und `git status` prüfen.
- `CURRENT_STATE.md`, `LATEST.md`, aktives Work Package und dessen Context Pack lesen.
- Relevante Rules, ADRs, Findings und Product Contracts lesen.
- Verständnis und nächsten Schritt in höchstens zehn Punkten zusammenfassen.
- Abgeschlossene Arbeit nicht neu planen oder wiederholen.

## Arbeitsweise

- Arbeite in kleinen, outcome-orientierten Work Packages.
- Verändere möglichst nur ein primäres Modul pro Work Package.
- Nach jedem logischen Teilziel: committen + pushen (der Commit ist der Checkpoint).
- Spätestens nach drei bis fünf materiellen Dateiänderungen: Statusprüfung und Commit.
- Nach erfolgreichem Test-/Review-Zyklus: Verified Checkpoint.
- Vor Session-, Rollen- oder Worktreewechsel: Handover Checkpoint.
- Der Stand ist **jederzeit** übernahmefähig: nach jedem logischen Teilziel committen und pushen,
  Statusdateien mit dem Code aktualisieren. Eine neue Session muss allein aus dem Repository
  weiterarbeiten können.
- Tests und Dokumentation entstehen mit der Funktion.
- Builder und finaler Reviewer sind getrennt.
- Parallele Writer verwenden getrennte Branches/Worktrees und stabile Verträge.

## Konzepttreue und Konzeptfehler (DR-0005)

- Das **Zielbild der Konzeptdokumente gilt vollständig** und wird nie verkleinert.
- **Fehlt** eine Aussage: als OFFENE FRAGE dokumentieren, **nicht** füllen.
- **Ist** eine Aussage nachweislich falsch, widersprüchlich oder klar schlechter als eine
  offensichtliche Alternative: **weder still umsetzen noch still korrigieren** — benennen,
  begründen, Besseres vorschlagen (OFFENE FRAGE + Change Proposal), Umsetzung erst nach
  Owner-Freigabe.
- „Oder besser" ist erlaubt — **als Vorschlag, nie als Alleingang**.
- Das ist **keine** Lizenz zum Erfinden: es gilt für belegte Fehler, nicht für Geschmack,
  Bequemlichkeit oder Lücken.

## Context-Regel

- Lade niemals pauschal alle Konzeptdokumente.
- Nutze das Context Pack des aktiven Work Packages.
- Bei fehlender Information lies gezielt die referenzierte Quelle.
- Erfinde keine Produktentscheidung, um eine Informationslücke zu kaschieren.

## Sicherheit und Daten

- Keine Secrets, Tokens, produktiven Credentials oder realen Kundendaten committen.
- Nur synthetische Demo-Daten verwenden.
- Tenant Scope muss serverseitig erzwungen und getestet werden.
- Keine kritische Sicherheits-, Datenschutz-, Rechts-, Budget- oder Freigabeentscheidung autonom treffen.
- KI-gestützt, nicht KI-abhängig; deterministische Fallbacks erhalten.
- Externe Schreibaktionen benötigen Policy, Human Gate und nachvollziehbaren Audit Record.

## Stop Conditions

Sichern, dokumentieren und eskalieren bei:

- materialem Konzeptwiderspruch,
- unklaren Acceptance Criteria mit mehreren Produktvarianten,
- realen Daten oder Secrets,
- irreversibler/destruktiver Änderung,
- kostenpflichtiger oder produktiver Aktion,
- unsicherer Authentisierung, Autorisierung, Mandantentrennung oder Datenschutzlage,
- kritischem offenen Security Finding,
- deutlich wachsendem Work-Package-Scope,
- unklarem Stand ohne frischen Checkpoint,
- nicht sicher integrierbaren Paralleländerungen.

## Definition of Done – Kurzform

Ein Work Package ist nur done, wenn:

- Acceptance Criteria erfüllt und demonstrierbar sind,
- relevante Tests grün sind,
- Security-, Privacy- und Tenant-Auswirkungen geprüft sind,
- Dokumentation und Status aktuell sind,
- notwendige ADRs/Decision Records existieren,
- unabhängiger Review dokumentiert ist,
- ein Verified/Release Checkpoint existiert,
- der nächste Workstream nicht auf Chatwissen angewiesen ist.

## Repository-Kommandos für Phase 0

```bash
python scripts/validate_handoff.py
python scripts/capability_check.py
python -m unittest discover -s tests/repository -p "test_*.py"
python scripts/checkpoint.py --type verified --summary "..." --tests "..." --next-step "..."
python scripts/handover.py --summary "..." --next-step "..."
```

## Offene Technikentscheidungen

Der finale App-Stack, Package Manager, GitHub-Plan, CI-Kosten, Claude-Code-Capabilities und Hosting werden nicht still festgelegt. WP-001 dokumentiert Capability und Voraussetzungen. Materiale Entscheidungen erhalten ADR/Human Gate.
