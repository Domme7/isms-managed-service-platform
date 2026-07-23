# Dokumentations-Navigator — was liegt wo, und was gilt

**Stand der Struktur: 2026-07-23** (Owner-beauftragte Restrukturierung). Diese Datei ist der
Einstieg in die gesamte Doku. Wenn etwas hier fehlt oder widerspricht: diese Datei zuerst fixen.

## Das Schichtenmodell der Produktwahrheit (wichtigste Regel)

Die Produktwahrheit hat **drei Schichten**. Wer nur eine liest, baut falsch:

```
┌─ 3. IDEEN ────────────────────── research/ideas/ ────────────────────────┐
│   Owner-Feature-Ideen (UI-Modernisierung, Morning Briefing, JARVIS).     │
│   Noch NICHT beauftragt — aber bei Architekturentscheidungen mitdenken.  │
├─ 2. STEUERUNGSSCHICHT ────────── docs/decisions/ (DR) + adr/ ────────────┤
│   Owner-Entscheidungen NACH den PDFs. Sie ERGÄNZEN und PRÄZISIEREN die   │
│   PDFs und gehen bei Konflikt VOR (der Owner ist der Autor beider).      │
│   Aktuell wichtig: DR-0008 (Ampeln/Dashboards erwünscht), DR-0009        │
│   (strategischer Einstieg + Kundenwelt), DR-0007 (E-01..03), DR-0005/06. │
├─ 1. BASIS ────────────────────── docs/concept/pdf/ (24 PDFs) ────────────┤
│   Die vom Owner geschriebenen Originale. REGEL NULL: hieraus wird        │
│   abgeleitet. docs/concept/active/*.md sind die Arbeitsfassungen         │
│   (Dok. 00, 03–18, 20B, 20C quellentreu — WP-019/023; 01/19/20A/21:      │
│   kleine unkorrigierte Abweichungen).                                    │
└──────────────────────────────────────────────────────────────────────────┘
```

**Warum Schicht 2 existiert:** Die PDFs sind eingefroren (Juli 2026); der Owner steuert seither
weiter — Dashboards und Ampeln sind erwünscht (DR-0008), der Einstieg wird strategisch-neutral vor
der Rollenwahl (DR-0009), die Kundenwelt wird Kernpfad (DR-0009). **Wer nur aus den PDFs baut,
verpasst diese Richtung.** Umgekehrt gilt: eine DR ändert nie still ein PDF — größere
Konzeptänderungen laufen als Change Proposal (`research/change-proposals/`) mit Human Gate.

## Ordnerkarte

| Pfad | Inhalt | Status |
|---|---|---|
| `docs/concept/pdf/` | **Schicht 1: die 24 Original-PDFs** (Regel Null) | verbindlich |
| `docs/concept/active/` | Markdown-Arbeitsfassungen (Kopfnotiz je Datei; quellentreu bis auf Dok. 01/19/20A/21) | Arbeitskopie |
| `docs/concept/abgleich/` | PDF↔Markdown-Abgleich + WP-019-Nachtrag (inkl. 11 WP-020-Punkte) | Befund |
| `docs/concept/archive/` | abgelöste Konzeptfassungen | nur Historie |
| `docs/decisions/` | **Schicht 2: Owner-/Produktentscheidungen (DR-0001…)** | verbindlich |
| `docs/architecture/adr/` | Technikentscheidungen (Stack, Linter, QA-Werkzeuge) | verbindlich |
| `research/ideas/` | **Schicht 3: Owner-Feature-Ideen (IDEA-001…)** | Richtung, nicht Auftrag |
| `research/change-proposals/` | Konzeptänderungs-Vorlagen (CCP-001…003, Human Gate offen) | wartet auf Owner |
| `docs/project/CONTINUATION_BRIEFING.md` | **Betriebsanleitung — „mach weiter" startet hier (§0)** | verbindlich |
| `docs/project/CURRENT_STATE.md` · `WORK_QUEUE.md` · `ACTIVE_WORK_PACKAGE.md` · `handovers/LATEST.md` | Statuswahrheit (Konsistenz vom Validator erzwungen) | verbindlich |
| `docs/project/OPEN_QUESTIONS.md` | alle benannten Konzeptlücken (O-…) — was bewusst NICHT gebaut wurde | verbindlich |
| `docs/project/OWNER_DECISIONS.md` | die max. 5 Karten, die den Owner wirklich brauchen | verbindlich |
| `docs/project/ROADMAP.md` | Phasen 0–9 + aktuelle Position + nächste WPs | Orientierung |
| `docs/project/reviews/` | Review-Notizen je Work Package (Fehler nicht wiederholen!) | Nachweis |
| `docs/project/risks/` | Findings (FINDING-0001…) mit Status | verbindlich |
| `docs/project/visual/` | Screenshots + axe-Reports je WP (`pnpm qa:visual`) | Nachweis |
| `docs/project/checkpoints/` | Verified-/Handover-Checkpoints | Nachweis |
| `docs/project/archive/` | **Historisches — nicht verwenden** (PROJECT_UNDERSTANDING, Capability-Check, Micro-Checkpoints, Drill-Report) | nur Historie |
| `docs/project/handovers/archive/` | alte Handover-Dateien (aktuell zählt nur `LATEST.md`) | nur Historie |
| `docs/product/` · `quality/` · `security/` · `releases/` | Arbeitsbereiche (Product Contracts, DoD, Teststrategie, Release Records) | wachsend |
| `work-packages/` + `context-packs/` (Repo-Root) | WP-Definitionen + Context Packs | verbindlich je WP |

## Leserfolge für eine neue Session

`CLAUDE.md` → `CONTINUATION_BRIEFING.md` §0 → `CURRENT_STATE.md` → `handovers/LATEST.md` →
`ACTIVE_WORK_PACKAGE.md` → `OWNER_DECISIONS.md` — dann bauen. Details und Startkommandos: Briefing §0/§9.

## Aufräum-Protokoll 2026-07-23

Archiviert (Owner-Auftrag „das Alte soll raus"): `PROJECT_UNDERSTANDING.md` (Destillat einer
nicht-quellentreuen Fassung, trug erfundene Taxonomie), `CONTEXT_LOSS_DRILL_REPORT.md` und
`capability/` (WP-001-Historie), **22 Micro-Checkpoints** (abgeschafft — der Commit ist der
Checkpoint; viele trugen falsche WP-Nummern), 23 alte Handover-Dateien (nur `LATEST.md` + der
jüngste Stand bleiben aktiv) und `PACKAGE_MANIFEST.json` (eingefrorener Auslieferungsstand
2026-07-22, Pfade inzwischen überholt — Nachtrag in DR-0001). Nichts wurde gelöscht — alles
liegt unter `archive/`.
