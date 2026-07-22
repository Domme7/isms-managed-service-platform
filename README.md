# ISMS Managed Service Platform – Claude-Code-Übergabepaket

Dieses Paket übersetzt die vollständige Konzeptbibliothek in ein fortsetzbares Repository- und Entwicklungsbetriebssystem für Claude Code.

## Schnellstart

1. Paket in einen leeren Projektordner entpacken.
2. `python scripts/validate_handoff.py` ausführen.
3. `python scripts/capability_check.py` ausführen.
4. Git initialisieren oder mit dem vorgesehenen privaten Remote verbinden.
5. Claude Code im Repository-Root starten.
6. Den Inhalt aus `START_PROMPT.md` verwenden.
7. Das aktive Work Package `WP-001` ausführen.

## Wichtig

- Das Repository ist das Projektgedächtnis; Chats sind nicht autoritativ.
- Markdown ist die maschinenlesbare Quelle. PDF- und DOCX-Fassungen bleiben außerhalb dieses Übergabepakets als Lesefassungen erhalten.
- Das Paket enthält ausschließlich synthetische bzw. konzeptionelle Inhalte und keine PwC-internen oder realen Kundendaten.
- Offene Technologie-, GitHub- und Claude-Code-Capabilities werden in WP-001 geprüft und nicht still angenommen.

## Zentrale Dateien

- `START_HERE.md` – Einstieg für Menschen
- `START_PROMPT.md` – kopierbarer Startprompt für Claude Code
- `CLAUDE.md` – globale Arbeitsregeln
- `docs/project/CURRENT_STATE.md` – aktueller Projektstatus
- `docs/project/handovers/LATEST.md` – letzter sicherer Wiedereinstieg
- `work-packages/WP-001_REPOSITORY_CONTINUITY_BOOTSTRAP.md` – erstes Arbeitspaket
- `context-packs/WP-001/CONTEXT_PACK.md` – kuratierter Kontext für WP-001
