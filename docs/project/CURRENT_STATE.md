# Current State

**Stand:** WP-001 in Arbeit – Git-/Truth-Baseline gesetzt (Slice 1–2)  
**Phase:** 0 – Repository Bootstrap  
**Aktives Work Package:** WP-001 – Repository & Continuity Bootstrap  
**Repository-Root:** `apps/ISMS/` · **Default-Branch:** `main` · **Arbeitsbranch:** `wp-001-continuity-bootstrap`  
**Implementierungsstatus:** Produktcode noch nicht begonnen  
**Konzeptstatus:** 24 aktive Markdown-Dokumente vollständig, Manifest-Hashes verifiziert

## Gesichert

- aktive und archivierte Konzeptquellen (24/24, Hashes geprüft),
- Master-Index v1.2, Startprompt und globale Claude-Regeln,
- Agentenverträge, Context-Pack-System, Checkpoint-/Handover-Vorlagen,
- Repository-Validierung und Basis-CI,
- **Git-Repository initialisiert; Phase-0-Baseline als atomarer Commit auf `main`**,
- **Übergabepaket auf Repository-Root gehoben, PDF-Lesefassungen unter `docs/concept/pdf/` (siehe DR-0001)**,
- **Capability-Check ausgeführt (`docs/project/capability/CAPABILITY_CHECK_RESULT.md`)**.

## Capability-Ergebnis (Slice 1)

- Python 3.11.9 ✓ · Git 2.47.0 ✓ · Claude Code 2.1.201 ✓ · Node v24 ✓
- **GitHub CLI (`gh`): nicht installiert** · **Docker: nicht installiert** – für WP-001 kein Blocker.
- `validate_handoff.py` OK · 6/6 Repository-Tests grün (vor und nach Promotion).

## Noch nicht gesichert oder entschieden

- GitHub-Remote, Owner und Schutzregeln (Human Gate, O-GH-001),
- `.claude` Agents/Skills/Hooks noch nicht gegen installierte Version verifiziert (Slice 3),
- finaler App-Technologiestack (WP-002 / CTO-ADR),
- produktive Cloud-, CI- oder API-Ressourcen,
- reale Daten und produktive Integrationen.

## Aktuelle Risiken

1. Tool-/Hook-Syntax der Agenten-/Skills-Verträge kann von Claude Code 2.1.201 abweichen (Slice 3 prüft, portabel halten).
2. ~~Repository evtl. nicht als Git initialisiert~~ → **erledigt** (Git-Baseline gesetzt).
3. Fake-Parallelität oder zu viele Agenten könnten Context und Rework erhöhen.
4. Technologieentscheidungen dürfen nicht vor Capability Check und ADR materialisiert werden.
5. Offene Doku-Abweichung: FINDING-0001 (Master-Index-Einstiegspfad) – Low, kein Blocker.

## Offene WP-001-Slices

- Slice 3: `.claude` Agents/Rules/Skills/Settings gegen installierte Version prüfen (Micro Checkpoint 2).
- Slice 4: `checkpoint.py` / `handover.py` / `validate_handoff.py` testen (Verified Checkpoint 2).
- Slice 5: Context-Loss-/Resume-Drill (Handover Checkpoint).
- Slice 6: Abschluss, DoD-Prüfung, WP-002-Entwurf, Release-Checkpoint + Git-Tag.

## Exact Next Step

WP-001 Slice 3: `.claude/agents`, `.claude/rules`, `.claude/skills` und `.claude/settings.json`
gegen Claude Code 2.1.201 prüfen; unsupported Felder entfernen oder als portable Verträge
belassen; Reviewer read-only halten. Danach Micro Checkpoint 2.
