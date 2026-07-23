# DR-0001 – Repository-Root und Promotion des Übergabepakets

- Typ: Operations
- Status: Accepted
- Datum: 2026-07-22
- Decision Owner: Human Product Owner (in Session bestätigt), umgesetzt durch Claude Code

## Kontext

Das Übergabepaket wurde als Unterordner `ISMS_Claude_Code_Uebergabepaket_v1.0/`
innerhalb des Session-Arbeitsverzeichnisses `apps/ISMS/` ausgeliefert. Am Root
lagen zusätzlich 27 PDF-Lesefassungen. Es existierte noch kein Git-Repository.
Alle Boot-Pfade (`START_PROMPT.md`, `CLAUDE.md`, Skripte) sowie das Continuity-Ziel
von WP-001 setzen voraus, dass eine frische Claude-Code-Session im Repository-Root
startet und dort `CLAUDE.md`, `CURRENT_STATE.md` und das aktive Work Package findet.

## Optionen

1. **Paketinhalt auf `apps/ISMS/` heben und dort Git initialisieren.**
2. Git im Unterordner `ISMS_Claude_Code_Uebergabepaket_v1.0/` initialisieren, Struktur unverändert lassen.
3. Git-Baseline vertagen und als Blocker dokumentieren.

## Entscheidung

Option 1. Der gesamte Paketinhalt wurde nach `apps/ISMS/` (Repository-Root)
verschoben, der leere Paketordner entfernt. Die 27 PDF-Lesefassungen liegen nun
unter `docs/concept/pdf/`. Git wurde mit Default-Branch `main` initialisiert; die
Phase-0-Baseline ist als atomarer Root-Commit gesichert.

## Gründe

- Eine neue Session (Arbeitsverzeichnis `apps/ISMS/`) findet den Repository-Root
  und die Wahrheitsdateien sofort — Kernanforderung von WP-001 (Fortsetzbarkeit).
- Boot-Kommandos und relative Pfade funktionieren unverändert wie dokumentiert.
- Reversibel und ohne Namenskollisionen (vorab geprüft).
- PDFs bleiben als versionierte Lesefassungen erhalten (D-019/D-020), ohne den Root zu überladen.

## Auswirkungen

- Repository-Root = `apps/ISMS/`; Default-Branch = `main`.
- WP-001-Arbeit läuft auf Branch `wp-001-continuity-bootstrap`.
- `PACKAGE_MANIFEST.json` bleibt gültig (relative Pfade unverändert); das Feld
  `package`/`file_count` ist historisch und beschreibt den Auslieferungsstand.
- Validierung, Manifest-Hashes und 6/6 Repository-Tests nach der Promotion grün.

## Offene Folgearbeit

- Kein Remote/Owner festgelegt (Human Gate O-GH-001).
- PDF-Lesefassungen sind aktuell committet (~24 MB). Eine spätere Auslagerung
  (z. B. Git LFS oder Ignorieren) ist möglich, falls gewünscht — reversibel.

## Supersede-Regel

Wird durch einen neuen DR ersetzt, falls Repository-Root, Branch-Modell oder
PDF-Ablage material geändert werden.

## Nachtrag 2026-07-23 (Doku-Restrukturierung)

`PACKAGE_MANIFEST.json` liegt jetzt unter `docs/project/archive/` — es beschreibt den
Auslieferungsstand vom 2026-07-22 und seine relativen Pfade stimmen seit der Owner-beauftragten
Restrukturierung (u. a. `capability/` → `archive/capability/`) nicht mehr mit dem Repo überein.
Es bleibt als historischer Beleg erhalten und wird nicht gepflegt.
