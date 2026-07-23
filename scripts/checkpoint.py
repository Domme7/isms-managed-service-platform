from __future__ import annotations

import argparse
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def git(cmd: list[str]) -> str:
    try:
        cp = subprocess.run(['git', *cmd], cwd=ROOT, capture_output=True, text=True, timeout=20)
        return (cp.stdout or cp.stderr).strip()
    except Exception as exc:
        return f'unavailable: {exc}'


def active_work_package() -> str:
    """Aktives Work Package aus `ACTIVE_WORK_PACKAGE.md` lesen.

    Der frühere Default `WP-001` hat 11 von 25 Checkpoints eine falsche Nummer gegeben — darunter
    den Verified Checkpoint, der WP-016 abschließt. Dieselbe Falle war in `handover.py` bereits
    behoben, im Schwesterskript aber nicht. Die Statusdatei ist die Wahrheit; steht dort keine ID,
    wird das ehrlich ausgewiesen statt geraten.
    """
    path = ROOT / 'docs/project/ACTIVE_WORK_PACKAGE.md'
    try:
        for line in path.read_text(encoding='utf-8').splitlines():
            if line.lstrip().startswith('- **ID:**'):
                value = line.split('**ID:**', 1)[1].strip()
                return value if value and not value.startswith(('—', '-', '–')) else 'keins (kein aktives Work Package)'
    except OSError:
        pass
    return 'unbekannt (ACTIVE_WORK_PACKAGE.md nicht lesbar)'


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument('--type', choices=['micro','verified','handover','release'], required=True)
    ap.add_argument('--summary', required=True)
    ap.add_argument('--next-step', required=True)
    ap.add_argument('--tests', default=None)
    ap.add_argument('--work-package', default=None,
                    help='Nur setzen, wenn bewusst vom aktiven Work Package abgewichen wird; '
                         'sonst wird es aus ACTIVE_WORK_PACKAGE.md gelesen.')
    args = ap.parse_args()

    if args.work_package is None:
        args.work_package = active_work_package()

    # Ein Verified Checkpoint OHNE Testnachweis ist wertlos - der Nachweis ist sein einziger Zweck.
    # Zwei bestehende Verified Checkpoints tragen "not run / not provided"; das darf nicht wieder
    # passieren, deshalb bricht das Skript hier ab statt still einen leeren Beleg zu schreiben.
    if args.tests is None:
        if args.type in ('verified', 'release'):
            raise SystemExit(
                f'--tests ist fuer --type {args.type} verpflichtend: ohne Testnachweis belegt ein '
                f'{args.type}-Checkpoint nichts.'
            )
        args.tests = 'nicht angegeben (bei micro/handover zulaessig)'

    now = datetime.now(timezone.utc)
    stamp = now.strftime('%Y%m%dT%H%M%SZ')
    cp_id = f'CP-{stamp}-{args.type.upper()}'
    branch = git(['branch','--show-current']) or 'not-initialized'
    commit = git(['rev-parse','--short','HEAD']) or 'none'
    status = git(['status','--short']) or 'clean or unavailable'

    record = {
        'checkpoint_id': cp_id,
        'type': args.type,
        'work_package': args.work_package,
        'timestamp_utc': now.isoformat(),
        'summary': args.summary,
        'branch': branch,
        'commit': commit,
        'git_status': status,
        'tests': args.tests,
        'exact_next_step': args.next_step,
    }
    out_dir = ROOT / 'docs/project/checkpoints'
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / f'{cp_id}.json').write_text(json.dumps(record, indent=2), encoding='utf-8')
    md = f'''# {cp_id}\n\n- **Type:** {args.type}\n- **Work Package:** {args.work_package}\n- **Timestamp UTC:** {now.isoformat()}\n- **Branch:** `{branch}`\n- **Commit:** `{commit}`\n\n## Summary\n\n{args.summary}\n\n## Git Status\n\n```text\n{status}\n```\n\n## Tests\n\n{args.tests}\n\n## Exact Next Step\n\n{args.next_step}\n'''
    (out_dir / f'{cp_id}.md').write_text(md, encoding='utf-8')
    print(cp_id)


if __name__ == '__main__':
    main()
