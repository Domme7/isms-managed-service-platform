# Kopierbarer Startprompt für Claude Code

Du übernimmst die strukturierte Umsetzung der **ISMS Managed Service Platform** im vorhandenen Repository.

## Verbindlicher Start

1. Bestätige Repository-Root, aktuellen Branch, Git-Status und letzte Commits.
2. Lies in dieser Reihenfolge:
   - `CLAUDE.md`
   - `docs/concept/active/00_MASTER_INDEX_UND_PROJEKTVERFASSUNG_v1.2.md`
   - `docs/project/CURRENT_STATE.md`
   - `docs/project/handovers/LATEST.md`
   - `work-packages/WP-001_REPOSITORY_CONTINUITY_BOOTSTRAP.md`
   - `context-packs/WP-001/CONTEXT_PACK.md`
3. Lies vollständige Konzeptdokumente nur gezielt über die Verweise im Context Pack. Lade nicht pauschal alle 24 Dokumente in den Arbeitskontext.
4. Fasse dein Verständnis von Produkt, Projektwahrheit, Agentenorganisation, Checkpoint-System, Human Gates und WP-001 in höchstens zehn Punkten zusammen.
5. Melde nur tatsächliche Widersprüche, fehlende Voraussetzungen oder blockierende Entscheidungen. Erfinde keine Produktentscheidungen und plane das Gesamtprodukt nicht neu.
6. Führe zuerst aus:
   - `python scripts/validate_handoff.py`
   - `python scripts/capability_check.py`
   - `python -m unittest discover -s tests/repository -p "test_*.py"`
7. Arbeite danach WP-001 in kleinen, prüfbaren Slices ab. Nach jedem logischen Teilziel und spätestens nach drei bis fünf materiellen Dateiänderungen erzeugst du einen Micro Checkpoint.
8. Erzeuge nach einem erfolgreichen Test- oder Integrationsstand einen Verified Checkpoint. Aktualisiere dabei mindestens:
   - aktives Work Package,
   - `docs/project/CURRENT_STATE.md`,
   - `docs/project/WORK_QUEUE.md`,
   - relevante Tests und Dokumentation,
   - `docs/project/handovers/LATEST.md`, falls eine Übergabe ansteht.
9. Nutze die Agentenrollen unter `.claude/agents/` nur nach Bedarf. Schreibe nicht mehrere Agenten parallel in dieselben Dateien. Builder und finaler Reviewer müssen getrennt sein.
10. Reversible technische Details darfst du sinnvoll entscheiden und als ADR oder Decision Record dokumentieren. Stoppe bei:
    - materiellen Konzeptwidersprüchen,
    - realen Daten oder Secrets,
    - irreversiblen oder destruktiven Änderungen,
    - produktiven Deployments,
    - kostenpflichtigen Ressourcen,
    - unsicherer Mandantentrennung, Authentisierung oder Datenschutzlage,
    - fehlendem Human Gate.
11. Beende keine Session mit ungesichertem materialem Fortschritt. Erzeuge immer ein Handover Packet mit Branch, Commit, Tests, Risiken und **Exact Next Step**.
12. Das Repository ist die Wahrheit. Chatwissen gilt erst nach Übertragung in versionierte Artefakte.

Beginne jetzt mit der Boot-Sequenz, der kurzen Verständniszusammenfassung und dem ersten nicht blockierten Slice von WP-001.
