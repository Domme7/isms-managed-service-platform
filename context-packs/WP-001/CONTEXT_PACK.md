# Context Pack – WP-001 Repository & Continuity Bootstrap

## Ziel

WP-001 erzeugt einen validierten, sicheren und über neue Claude-Code-Sessions fortsetzbaren Repository-Grundzustand. Es implementiert **keine Produktfeatures** und trifft **keine finale App-Stack-Entscheidung**.

## Verbindliche Prinzipien

- Repository vor Chat.
- Markdown vor PDF/DOCX.
- Kleine Work Packages statt Modul-One-Shots.
- Micro Checkpoints während der Arbeit; Verified Checkpoints nach Tests.
- Handover vor Session-, Rollen- oder Worktreewechsel.
- Builder und finaler Reviewer getrennt.
- Parallele Writer nur mit isolierten Worktrees und stabilen Verträgen.
- Keine Secrets oder realen Kundendaten.
- KI-gestützt, nicht KI-abhängig.
- Fortsetzbarkeit darf nicht von experimentellen Agent Teams abhängen.

## Pflichtquellen

### Dokument 00 v1.2

Pfad: `docs/concept/active/00_MASTER_INDEX_UND_PROJEKTVERFASSUNG_v1.2.md`

Relevant:

- Zentrale Produktdefinition und Nicht-Ziele
- aktive Dokumentversionen
- Repository-first Umsetzung
- vollständige Konzeptbaseline
- offene Fragen zu Stack, GitHub, Claude Capabilities und Kosten

### Dokument 20B v1.0

Pfad: `docs/concept/active/20B_VIRTUELLE_KI_FIRMA_AGENTENORGANISATION_v1.0.md`

Relevant:

- Organisationsverfassung
- Role Contract
- CEO-/Orchestrator-Agent
- Program Manager
- HR-/Capability-Agent
- CTO, Platform/DevOps, Security, QA, Project Memory, GitHub Steward
- Work Intake, Builder-Reviewer-Pairs, Human Gates, Stop Conditions

### Dokument 20C v1.0

Pfad: `docs/concept/active/20C_CLAUDE_CODE_GITHUB_CHECKPOINTS_BAUPLAN_v1.0.md`

Relevant:

- Repository-first Truth Model
- Ziel-Repository-Struktur
- `CLAUDE.md`, `CURRENT_STATE.md`, `LATEST.md`, `WORK_QUEUE.md`
- Context Packs und Work Packages
- Session-Boot-Sequenz und Context-Budget
- Checkpoint-Typen und Zwangstrigger
- Handover Packet und Resume Prompt
- Branches, Worktrees, Commits, PRs, CI und Tests
- Human Gates, Stop Conditions und Phase 0

### Dokument 18 v1.0

Pfad: `docs/concept/active/18_TECHNISCHE_ARCHITEKTUR_PLATTFORMBETRIEB_v1.0.md`

Für WP-001 nur relevant:

- Architekturprinzipien
- Umgebungsmodell
- CI/CD- und Entwicklungs-/Testarchitektur
- Prototyp-/Demo-Betrieb
- ADR-Governance

Keine finale Technologieauswahl ableiten, bevor WP-002/ADR dies erlaubt.

### Dokument 19 v1.0

Pfad: `docs/concept/active/19_SICHERHEIT_DATENSCHUTZ_RECHTE_AUDITIERBARKEIT_v1.0.md`

Für WP-001 relevant:

- Least Privilege und Agentenidentitäten
- Secrets Management
- Secure SDLC und Supply Chain
- Security Tests und Release Gates
- private Demonstrator-Regeln
- keine realen Daten oder produktiven Zugriffe

### Dokument 21 v1.0

Pfad: `docs/concept/active/21_RESEARCH_INNOVATION_KONTINUIERLICHE_PRODUKTENTWICKLUNG_v1.0.md`

Für WP-001 relevant:

- Concept Author und Consistency Reviewer
- Concept Change Proposal
- Repository-Struktur für Research/Innovation
- Context Packs und Quality Gates
- keine direkte Änderung aktiver Spezifikationen durch ungeprüfte Research-Signale

## Aktueller Zustand

- Konzeptbibliothek vollständig.
- Übergabepaket erstellt.
- Git/Remote/Claude Capability im Zielsystem noch ungeprüft.
- Produktcode noch nicht begonnen.
- WP-001 ist das einzige aktive Paket.

## Acceptance Criteria – Kurzfassung

- Paket und Manifest validiert.
- Capability Check dokumentiert.
- Status- und Handoverdateien konsistent.
- Agentenverträge geprüft.
- Checkpoint- und Handover-Tooling funktioniert.
- Context-Loss-/Resume-Drill bestanden.
- Keine Stack- oder Kostenentscheidung ohne Gate.

## Nicht im Context Pack enthalten

- vollständige Produktmodule aus Dokument 05–17,
- detaillierte UI-, Risiko-, ISMS-, Managed-Service- oder Reporting-Logik,
- produktive Infrastruktur- oder Providerentscheidungen.

Diese Quellen werden erst in späteren Work Packages gezielt geladen.
