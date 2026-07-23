"""Kanonische Zahlen des Demo-Seeds ausgeben – gezählt, nie abgeschrieben.

Hintergrund (Briefing, Lektion "Agentenzahlen nachrechnen"): Zahlen aus Berichten wanderten
schon einmal ungeprüft in Statusdateien. Dieses Skript liefert die kanonischen Seed-Zahlen
(Objekte/Beziehungen gesamt, je Mandant, je Schicht) direkt aus dem Seed selbst:

  - Quelle ist `computeSeedFacts()` aus den GEBAUTEN Exporten von `@isms/demo-seed`
    (packages/demo-seed/dist) – aufgerufen über Node.
  - `seed-manifest.json` wird hier BEWUSST NICHT gelesen (sonst wäre der Abgleich zirkulär);
    die Übereinstimmung von Faktenquelle, DEMO_SEED und Manifest beweist
    `packages/demo-seed/src/seed-facts.spec.ts`.

Statusdateien bleiben manuell; Fortschrittsberichte dürfen aus dieser Ausgabe zitieren.

Beispiele:
    python scripts/seed_facts.py           # lesbare Ausgabe
    python scripts/seed_facts.py --json    # rohes JSON (z. B. zum Weiterverarbeiten)
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST_INDEX = ROOT / 'packages' / 'demo-seed' / 'dist' / 'index.js'

# Der Node-Aufruf: lädt die gebauten Exporte und zählt über computeSeedFacts().
# Der Pfad kommt als Argument (process.argv[1]) – kein Escaping-Problem unter Windows.
NODE_PROGRAMM = (
    'const { computeSeedFacts } = require(process.argv[1]);'
    'process.stdout.write(JSON.stringify(computeSeedFacts()));'
)


def fehler(meldung: str) -> 'SystemExit':
    return SystemExit(f'FEHLER: {meldung}')


def fakten_lesen() -> dict:
    if shutil.which('node') is None:
        raise fehler('`node` wurde nicht gefunden. Node.js (>= 20) installieren bzw. in PATH aufnehmen.')
    if not DIST_INDEX.exists():
        raise fehler(
            'Der Demo-Seed ist nicht gebaut (packages/demo-seed/dist fehlt). '
            'Erst bauen: pnpm --filter @isms/demo-seed build'
        )
    lauf = subprocess.run(
        ['node', '-e', NODE_PROGRAMM, str(DIST_INDEX)],
        capture_output=True,
        text=True,
        encoding='utf-8',
    )
    if lauf.returncode != 0:
        raise fehler(
            'Node-Aufruf fehlgeschlagen (ist der Build aktuell? pnpm --filter @isms/demo-seed build).\n'
            f'{lauf.stderr.strip()}'
        )
    try:
        return json.loads(lauf.stdout)
    except json.JSONDecodeError as exc:
        raise fehler(f'Unerwartete Node-Ausgabe (kein JSON): {exc}')


def paar(zeile: dict) -> str:
    return f"{zeile['objects']} Objekte / {zeile['relationships']} Beziehungen"


def main() -> None:
    parser = argparse.ArgumentParser(
        description='Kanonische Demo-Seed-Zahlen (gesamt, je Mandant, je Schicht) – aus dem Seed gezählt.',
    )
    parser.add_argument('--json', action='store_true', help='rohes JSON statt lesbarer Ausgabe')
    args = parser.parse_args()

    # Windows-Konsolen (cp1252) sollen Umlaute korrekt zeigen (sonst "gez?hlt");
    # errors='replace' bleibt als Rettungsnetz für exotische Terminals.
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')

    fakten = fakten_lesen()

    if args.json:
        print(json.dumps(fakten, ensure_ascii=False, indent=2))
        return

    print(f"Demo-Seed {fakten['seed_version']} – kanonische Zahlen (gezählt aus @isms/demo-seed)")
    print()
    print(f"Gesamt: {paar(fakten['totals'])}")
    print()
    print('Je Mandant:')
    for tenant_id, zeile in fakten['by_tenant'].items():
        print(f'  {tenant_id}: {paar(zeile)}')
    print()
    print('Je Schicht:')
    for schicht, zeile in fakten['by_layer'].items():
        print(f'  {schicht}: {paar(zeile)}')


if __name__ == '__main__':
    main()
