# CLAUDE.md – Globale Arbeitsregeln

## Produkt

Die ISMS Managed Service Platform ist ein mandantenfähiges, rollenbasiertes Betriebs-, Entscheidungs- und Service-System für kontinuierliches Informationssicherheitsmanagement und skalierbare Managed Services. Sie verbindet digitalen Unternehmenszwilling, ISMS-Kernprozesse, Risiken, Controls, Maßnahmen, Evidence, Decision Center, Reporting, Automatisierung, Beratung und Services. Sie ist kein Dokumentenfriedhof und ersetzt keine operativen Quellsysteme wie SIEM, CMDB, Ticketing oder Schwachstellenscanner.

## Verbindliche Projektwahrheit

1. Aktive Konzeptquellen: `docs/concept/active/`
2. Master-Index: `docs/concept/active/00_MASTER_INDEX_UND_PROJEKTVERFASSUNG_v1.2.md`
3. Aktueller Status: `docs/project/CURRENT_STATE.md`
4. Aktives Work Package: `docs/project/ACTIVE_WORK_PACKAGE.md`
5. Letzter Wiedereinstieg: `docs/project/handovers/LATEST.md`
6. Entscheidungen: `docs/architecture/adr/` und `docs/decisions/`
7. Code, Tests und Migrationen sind Umsetzungswahrheit, nicht Produktwahrheit.
8. Chat, Transcript und lokales Memory sind nicht autoritativ.

## Start jeder Session

- Repository-Root, Branch und `git status` prüfen.
- `CURRENT_STATE.md`, `LATEST.md`, aktives Work Package und dessen Context Pack lesen.
- Relevante Rules, ADRs, Findings und Product Contracts lesen.
- Verständnis und nächsten Schritt in höchstens zehn Punkten zusammenfassen.
- Abgeschlossene Arbeit nicht neu planen oder wiederholen.

## Arbeitsweise

- Arbeite in kleinen, outcome-orientierten Work Packages.
- Verändere möglichst nur ein primäres Modul pro Work Package.
- Nach jedem logischen Teilziel: Micro Checkpoint.
- Spätestens nach drei bis fünf materiellen Dateiänderungen: Statusprüfung und Checkpoint.
- Nach erfolgreichem Test-/Review-Zyklus: Verified Checkpoint.
- Vor Session-, Rollen- oder Worktreewechsel: Handover Checkpoint.
- Tests und Dokumentation entstehen mit der Funktion.
- Builder und finaler Reviewer sind getrennt.
- Parallele Writer verwenden getrennte Branches/Worktrees und stabile Verträge.

## Context-Regel

- Lade niemals pauschal alle Konzeptdokumente.
- Nutze das Context Pack des aktiven Work Packages.
- Bei fehlender Information lies gezielt die referenzierte Quelle.
- Erfinde keine Produktentscheidung, um eine Kontextlücke zu kaschieren.

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
- unübersichtlichem Context ohne frischen Checkpoint,
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
python scripts/checkpoint.py --type micro --summary "..." --next-step "..."
python scripts/handover.py --summary "..." --next-step "..."
```

## Offene Technikentscheidungen

Der finale App-Stack, Package Manager, GitHub-Plan, CI-Kosten, Claude-Code-Capabilities und Hosting werden nicht still festgelegt. WP-001 dokumentiert Capability und Voraussetzungen. Materiale Entscheidungen erhalten ADR/Human Gate.
