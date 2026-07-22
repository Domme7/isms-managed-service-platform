# Handover HND-0001 – ChatGPT to Claude Code

## Work Package

- **ID:** WP-001
- **Titel:** Repository & Continuity Bootstrap
- **Status:** Ready / Active

## Outcome

Das vorbereitete Übergabepaket in einen sicheren, validierten und über neue Sessions fortsetzbaren Repository-Zustand überführen.

## Repository State

- Git-Status im Zielsystem: noch zu prüfen
- Branch/Commit/Remote: noch nicht festgelegt
- Paketversion: `ISMS_Claude_Code_Uebergabepaket_v1.0`

## Completed

- 24 aktive Konzeptdokumente integriert
- ältere aktive Vorgängerversionen archiviert
- `CLAUDE.md`, `START_PROMPT.md` und Projektstatus erstellt
- Agentenverträge, Rules, Skills und Vorlagen erstellt
- WP-001 und Context Pack erstellt
- Basis-Validierung, Capability-Check-Skript und Repository-Tests bereitgestellt

## Required Reading

1. `CLAUDE.md`
2. `docs/concept/active/00_MASTER_INDEX_UND_PROJEKTVERFASSUNG_v1.2.md`
3. `docs/project/CURRENT_STATE.md`
4. `work-packages/WP-001_REPOSITORY_CONTINUITY_BOOTSTRAP.md`
5. `context-packs/WP-001/CONTEXT_PACK.md`

## Risks and Human Gates

- GitHub-Remote und Owner benötigen menschliche Entscheidung, falls ein Remote angelegt wird.
- Kostenpflichtige oder produktive Ressourcen sind nicht freigegeben.
- Technologieentscheidungen für die App sind nicht Bestandteil von WP-001.

## Do Not Repeat

- Produktvision und vollständige Dokumentstruktur nicht neu entwerfen.
- Nicht alle 24 Dokumente pauschal in den Context laden.
- Keine realen PwC- oder Kundendaten hinzufügen.

## Exact Next Step

Im Repository-Root `python scripts/validate_handoff.py` und danach `python scripts/capability_check.py` ausführen. Ergebnisse in `docs/project/capability/` dokumentieren und den ersten Micro Checkpoint erstellen.
