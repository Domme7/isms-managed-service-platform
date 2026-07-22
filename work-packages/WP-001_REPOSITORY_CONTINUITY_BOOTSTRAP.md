# WP-001 – Repository & Continuity Bootstrap

## Identität

- **Phase:** 0
- **Priorität:** P0
- **Status:** Ready / Active
- **Risk Class:** Medium
- **Accountable Owner:** CEO-/Orchestrator-Agent
- **Builder:** GitHub Steward, Project Memory Agent, Platform/DevOps Agent
- **Reviewer:** QA/Test Agent, Product Security & Privacy Agent
- **Human Gates:** GitHub-Remote, kostenpflichtige Ressourcen, destruktive Aktionen

## Problem

Die vollständige Produktvision liegt als große Konzeptbibliothek vor. Ohne ein repositorybasiertes Gedächtnis, kleine Work Packages, geprüfte Agentenverträge und regelmäßige Checkpoints könnte Claude Code bei Context-Verlust Arbeit wiederholen, Entscheidungen erfinden oder Fortschritt verlieren.

## Ziel

Ein aus dem Übergabepaket entstehendes Repository, das eine neue Claude-Code-Session ohne alten Chat korrekt lesen, validieren, fortsetzen und sicher übergeben kann.

## Nicht-Ziele

- keine Wahl des finalen App-Frameworks,
- kein Produktfeature und keine UI-Implementierung,
- keine produktive Cloud- oder GitHub-Konfiguration ohne Freigabe,
- keine echten PwC-, Kunden- oder Personendaten,
- keine Abhängigkeit von experimentellen Agent Teams,
- keine Neuschreibung der Konzeptbibliothek.

## Scope

1. Paket- und Konzeptmanifest validieren.
2. Zielsystem-Capabilities prüfen und dokumentieren.
3. Git-Repository sicher initialisieren bzw. vorhandenes Repository prüfen.
4. zentrale Wahrheitsdateien, Templates und Ordner konsistent machen.
5. Agenten-, Rules- und Skills-Dateien gegen die installierte Claude-Code-Version prüfen.
6. Basis-CI/Repository-Tests lokal ausführbar machen.
7. Checkpoint- und Handover-Skripte testen.
8. Context-Loss-/Resume-Drill durchführen.
9. WP-002 als nächsten begrenzten Auftrag vorbereiten, ohne Technologieentscheidung vorwegzunehmen.

## Abhängigkeiten

- Dokument 00 v1.2
- Dokument 18 v1.0
- Dokument 19 v1.0
- Dokument 20B v1.0
- Dokument 20C v1.0
- Dokument 21 v1.0
- `context-packs/WP-001/CONTEXT_PACK.md`

## Slices und Checkpoint-Plan

### Slice 1 – Paketvalidierung und Capability Check

- Validierungsskript und Repository-Tests ausführen.
- Claude-/Git-/Python-/GitHub-Fähigkeiten erfassen.
- Abweichungen als Finding oder ADR-Bedarf dokumentieren.
- **Micro Checkpoint 1** nach dokumentiertem Ergebnis.

### Slice 2 – Git- und Truth-Baseline

- Git initialisieren oder Zustand prüfen.
- aktive Konzeptquellen und Manifest verifizieren.
- `CURRENT_STATE`, `WORK_QUEUE`, `LATEST` und aktives WP abgleichen.
- keine Remote- oder Schutzregel ohne Human Gate erzwingen.
- **Verified Checkpoint 1** mit atomarem Commit, wenn Git verfügbar ist.

### Slice 3 – Claude-Konfiguration und Agentenverträge

- `.claude/agents`, Rules, Skills und Settings gegen installierte Version prüfen.
- unsupported Felder entfernen oder als portable Verträge belassen.
- Toolrechte minimal halten; Reviewer standardmäßig read-only.
- **Micro Checkpoint 2**.

### Slice 4 – Continuity Tooling

- `checkpoint.py`, `handover.py` und `validate_handoff.py` testen.
- initiales Handover neu erzeugen oder aktualisieren.
- **Verified Checkpoint 2**.

### Slice 5 – Context-Loss-/Resume-Drill

- Session A simuliert oder real: kleine harmlose Dokumentänderung in separatem Branch.
- Verified Checkpoint und Handover erzeugen.
- Session B startet nur mit Repository-Dateien und setzt exakt fort.
- Ergebnis als Test Evidence dokumentieren.
- **Handover Checkpoint**.

### Slice 6 – Abschluss und WP-002-Vorbereitung

- Definition of Done prüfen.
- `CURRENT_STATE`, Queue, Risks, Findings und Handover aktualisieren.
- WP-002 als Entwurf erstellen; Stack-Entscheidung bleibt ADR/Human Gate.
- **Release Checkpoint Phase-0-Baseline**.

## Acceptance Criteria

1. `python scripts/validate_handoff.py` endet erfolgreich.
2. Repository-Unit-Tests laufen erfolgreich.
3. `docs/concept/MANIFEST.json` stimmt mit allen aktiven Konzeptdateien überein.
4. Capability Check liegt mit Evidence und Fallbacks vor.
5. Keine Secret- oder Real-Daten-Funde im Paket.
6. `CURRENT_STATE`, `WORK_QUEUE`, `ACTIVE_WORK_PACKAGE` und `LATEST` sind konsistent.
7. Agentenverträge besitzen Mission, Scope, Nicht-Scope, Inputs, Outputs, Autorität, Review und Stop Conditions.
8. Reviewer-Agenten haben keine standardmäßigen Merge- oder destruktiven Rechte.
9. Ein Micro-, ein Verified- und ein Handover-Checkpoint wurden im Zielsystem erfolgreich erzeugt.
10. Eine neue Session kann anhand von `LATEST.md` ohne alten Chat fortsetzen.
11. Ein Context-Loss-Drill ist dokumentiert und bestanden oder mit begründetem Finding offen.
12. Kein finales App-Framework wurde ohne ADR/Human Gate festgelegt.
13. Alle Änderungen sind in Git nachvollziehbar oder, falls Git noch nicht verfügbar ist, als Blocker dokumentiert.
14. WP-002 ist klein, outcome-orientiert und nicht als „Baue die ganze App“ formuliert.

## Test Plan

- Repository Contract Unit Tests
- Manifest-Hashprüfung
- Pfad- und Linkprüfung
- Secret Pattern Scan
- Agent Contract Schema Check
- Checkpoint/Handover Dry Run
- Context-Loss-/Resume-Drill
- optional: GitHub Actions Dry Run nach Remote-Freigabe

## Deliverables

- Capability-Check-Resultat
- validiertes Repository-Grundgerüst
- korrigierte Claude-Konfiguration, falls nötig
- Checkpoint- und Handover-Evidence
- Context-Loss-Drill-Bericht
- Phase-0-Release-Record
- Entwurf WP-002

## Stop Conditions

- Paketmanifest oder Konzeptquellen sind beschädigt,
- Capability-Abweichung gefährdet Fortsetzbarkeit,
- ein Befehl wäre destruktiv oder würde bestehende Arbeit überschreiben,
- reale Daten/Secrets werden entdeckt,
- GitHub-/Cloudkosten entstehen,
- unklarer Repository-Owner oder Remote soll materialisiert werden,
- Agentenrechte wären breiter als erforderlich,
- Context wird unübersichtlich ohne frischen Checkpoint.

## Done Evidence

- Commit/PR oder lokaler Git-Tag der Phase-0-Baseline,
- grüne Tests,
- Capability-Check,
- Checkpoint-Records,
- Handover Packet,
- Context-Loss-Drill,
- aktualisierte Statusdateien,
- unabhängige QA- und Security-Review-Notiz.
