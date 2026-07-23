# Claude-Konfigurations-Review (WP-001 Slice 3)

**Datum:** 2026-07-22 · **Claude Code:** 2.1.201 · **Reviewer:** Builder-Pass (Claude Code)

## Agenten-Frontmatter (26 Rollen)

- Verwendete Keys ausschließlich `name`, `description`, `tools` — alle von Claude Code 2.1.201
  als Subagent-Frontmatter unterstützt. **Keine unsupported Felder gefunden**, nichts zu entfernen.
- Tool-Namen (`Read, Grep, Glob, Write, Edit, Bash`) sind gültige Claude-Code-Werkzeuge.
- Pflichtabschnitte (`## Mission`, `## Scope`, `## Nicht-Scope`, `## Ausgaben`, `## Autorität`,
  `## Stop Conditions`) in allen 26 Rollen vorhanden (Repository-Test grün).

## Least-Privilege-Korrektur (Reviewer read-only)

Vier reine Review-Rollen deklarierten sich im Body als read-only, trugen aber `Write` in der
Frontmatter. Auf `Read, Grep, Glob` reduziert (Frontmatter jetzt konsistent mit Scope):

| Agent | vorher | nachher |
|---|---|---|
| code-reviewer | Read, Grep, Glob, Write | Read, Grep, Glob |
| concept-consistency-reviewer | Read, Grep, Glob, Write | Read, Grep, Glob |
| product-critic | Read, Grep, Glob, Write | Read, Grep, Glob |
| product-security-privacy | Read, Grep, Glob, Write | Read, Grep, Glob |

**Bewusst unverändert:** `qa-test-engineer` behält `Write, Edit, Bash` — es ist Builder von Tests
(Teststrategie, Testcode, Ausführung als Evidence), nicht die read-only Endabnahme. Sein Bash ist
durch die settings-Deny-Liste eingegrenzt; sein Contract schließt „finales Merge-Recht" aus.
Builder-Rollen (Engineering, Architektur, DevOps, Research/Concept-Autoren) behalten die für ihre
Artefakte nötigen Werkzeuge — keine Übertightung.

## settings.json

Deny-Guardrails aus `settings.example.json` aktiviert:
`Bash(rm -rf *)`, `Bash(git push --force*)`, `Bash(git reset --hard*)`. Rein restriktiv, reversibel.

## Hooks

`.claude/hooks/` bewusst inaktiv (siehe hooks/README). Lifecycle-Hook-Verdrahtung ist eine spätere,
optionale Härtung; die Continuity-Guardrails laufen bis dahin über die `scripts/`-Skripte und CI.
Fortsetzbarkeit hängt **nicht** von Hooks oder experimentellen Agent Teams ab.

## Skills

`.claude/skills/*/SKILL.md` sind schlanke, portable Ablaufbeschreibungen (checkpoint, handover,
bootstrap-session, resume-work, context-pack u. a.), die auf die `scripts/`-Tools verweisen. Kein
unsupported Feld; als portable Verträge belassen.

## Ergebnis

Konfiguration ist mit Claude Code 2.1.201 kompatibel und least-privilege-konform. Offene manuelle
Punkte aus `CAPABILITY_CHECK_RESULT.md` (Hook-Blocking-Verhalten, Worktree-/Resume-Verhalten)
werden bei tatsächlichem Bedarf in späteren Work Packages verifiziert.
