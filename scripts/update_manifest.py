"""docs/concept/MANIFEST.json aus den aktiven Konzept-Markdowns regenerieren.

Die Hashes im Manifest wurden bisher von Hand gepflegt, und `validate_handoff.py` prueft sie:
jede legitime Aenderung an einer Datei unter `docs/concept/active/` macht den Validator rot,
bis das Manifest nachzieht. Dieses Skript (WP-019, Slice 0) regeneriert das Manifest
deterministisch aus dem Dateibestand – der Validator bleibt der Waechter und wird nicht
abgeschwaecht.

Verhalten:
  - je aktiver .md-Datei: `file`, `sha256`, `bytes`, `status: "active"`,
  - stabile Sortierung nach Dateiname, Format wie Bestand (2-Spaces-Indent, LF, Newline am Ende),
  - keine Zeitstempel: unveraenderter Input erzeugt byte-identischen Output (Idempotenz),
  - alle uebrigen Manifest-Felder (`library`, `manifest_version`, ...) bleiben unveraendert
    erhalten; `active_master_index` und `active_document_count` werden aus dem Bestand gesetzt.

Schutzabbrueche (Exit 1, es wird NICHTS geschrieben):
  - die Zahl der aktiven .md-Dateien weicht von 24 ab – eine Anzahl-Aenderung ist nie ein
    Manifest-Problem, sondern eine Konzeptentscheidung (DR-0006) und gehoert geprueft,
    nicht ueberschrieben,
  - die Master-Index-Datei (`00_MASTER_INDEX*.md`) ist nicht eindeutig bestimmbar,
  - das bestehende Manifest fehlt oder ist kein gueltiges JSON.

Beispiel:
    python scripts/update_manifest.py
"""

from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ACTIVE_DIR = ROOT / 'docs/concept/active'
MANIFEST = ROOT / 'docs/concept/MANIFEST.json'

# Gleiche Erwartung wie in validate_handoff.py: exakt 24 aktive Konzeptdokumente.
ERWARTETE_ANZAHL = 24


def fehler(meldung: str) -> SystemExit:
    return SystemExit(f'FEHLER: {meldung}')


def aktive_dateien() -> list[Path]:
    if not ACTIVE_DIR.is_dir():
        raise fehler(f'Verzeichnis fehlt: {ACTIVE_DIR.relative_to(ROOT)}')
    # sorted() ueber den Dateinamen: stabile, plattformunabhaengige Reihenfolge
    # (unabhaengig von Dateisystem-Reihenfolge und Locale).
    return sorted((p for p in ACTIVE_DIR.glob('*.md') if p.is_file()), key=lambda p: p.name)


def master_index_bestimmen(dateien: list[Path]) -> str:
    kandidaten = [p.name for p in dateien if p.name.startswith('00_MASTER_INDEX')]
    if len(kandidaten) != 1:
        gefunden = ', '.join(kandidaten) if kandidaten else 'keine'
        raise fehler(
            'Master-Index nicht eindeutig bestimmbar: erwartet genau eine Datei '
            f'"00_MASTER_INDEX*.md", gefunden: {gefunden}. Manifest wird NICHT geschrieben.'
        )
    return kandidaten[0]


def bestehendes_manifest() -> dict:
    if not MANIFEST.exists():
        raise fehler(
            f'{MANIFEST.relative_to(ROOT)} fehlt. Dieses Skript regeneriert ein bestehendes '
            'Manifest; es legt keines neu an. Bitte Stand pruefen (git status).'
        )
    try:
        manifest = json.loads(MANIFEST.read_text(encoding='utf-8'))
    except json.JSONDecodeError as exc:
        raise fehler(f'{MANIFEST.relative_to(ROOT)} ist kein gueltiges JSON: {exc}')
    if not isinstance(manifest, dict):
        raise fehler(f'{MANIFEST.relative_to(ROOT)} hat nicht die erwartete Objektstruktur.')
    return manifest


def main() -> None:
    # Windows-Konsolen (cp1252) sollen Umlaute korrekt zeigen; errors='replace' als Rettungsnetz.
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')

    dateien = aktive_dateien()
    if len(dateien) != ERWARTETE_ANZAHL:
        raise fehler(
            f'{ACTIVE_DIR.relative_to(ROOT)} enthaelt {len(dateien)} Markdown-Dateien, '
            f'erwartet sind exakt {ERWARTETE_ANZAHL}. Eine Anzahl-Aenderung ist in diesem '
            'Werkzeug nie legitim (Konzeptentscheidung, DR-0006). Manifest wird NICHT geschrieben.'
        )

    master_index = master_index_bestimmen(dateien)

    # Bestehende Felder/Struktur beibehalten (library, manifest_version, ...);
    # nur die aus dem Dateibestand ableitbaren Felder werden neu gesetzt.
    manifest = bestehendes_manifest()
    manifest['active_master_index'] = master_index
    manifest['active_document_count'] = len(dateien)
    dokumente = []
    for p in dateien:
        inhalt = p.read_bytes()  # ein Lesevorgang: sha256 und bytes aus demselben Stand
        dokumente.append({
            'file': p.name,
            'sha256': hashlib.sha256(inhalt).hexdigest(),
            'bytes': len(inhalt),
            'status': 'active',
        })
    manifest['documents'] = dokumente

    neu = json.dumps(manifest, ensure_ascii=False, indent=2) + '\n'
    alt = MANIFEST.read_text(encoding='utf-8')
    if neu == alt:
        print(f'[OK] {MANIFEST.relative_to(ROOT)} unveraendert ({len(dateien)} aktive Dokumente).')
        return

    # newline='\n' haelt die LF-Zeilenenden des Bestands auch unter Windows stabil.
    with MANIFEST.open('w', encoding='utf-8', newline='\n') as f:
        f.write(neu)
    print(f'[OK] {MANIFEST.relative_to(ROOT)} regeneriert ({len(dateien)} aktive Dokumente).')
    print('     -> Hashes/Bytes aus docs/concept/active/ neu berechnet;')
    print('        sagt NICHTS ueber Treue zu den PDF-Originalen (DR-0006, FINDING-0007).')


if __name__ == '__main__':
    main()
