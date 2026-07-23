from __future__ import annotations

import argparse
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

    Der frühere Default `WP-001` war eine Resumability-Falle: wer das Flag vergaß, schrieb eine
    falsche WP-Nummer in `LATEST.md` — genau die Datei, aus der eine neue Session ihren Einstieg
    zieht. Die Statusdatei ist die Wahrheit; steht dort keine ID (kein aktives WP), wird das
    ehrlich ausgewiesen statt geraten.
    """
    path = ROOT / 'docs/project/ACTIVE_WORK_PACKAGE.md'
    try:
        for line in path.read_text(encoding='utf-8').splitlines():
            if line.lstrip().startswith('- **ID:**'):
                value = line.split('**ID:**', 1)[1].strip()
                # „— (kein aktives Work Package)" o. ä. ist eine gültige Aussage, keine ID.
                return value if value and not value.startswith(('—', '-', '–')) else 'keins (kein aktives Work Package)'
    except OSError:
        pass
    return 'unbekannt (ACTIVE_WORK_PACKAGE.md nicht lesbar)'


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument('--summary', required=True)
    ap.add_argument('--next-step', required=True)
    ap.add_argument('--work-package', default=None,
                    help='Nur setzen, wenn bewusst vom aktiven Work Package abgewichen wird; '
                         'sonst wird es aus ACTIVE_WORK_PACKAGE.md gelesen.')
    ap.add_argument('--tests', default='not run / not provided')
    ap.add_argument('--do-not-repeat', default='Do not re-plan the full product or reload all concept documents.')
    args = ap.parse_args()
    if args.work_package is None:
        args.work_package = active_work_package()

    now = datetime.now(timezone.utc)
    stamp = now.strftime('%Y%m%dT%H%M%SZ')
    handover_id = f'HND-{stamp}'
    branch = git(['branch','--show-current']) or 'not-initialized'
    commit = git(['rev-parse','--short','HEAD']) or 'none'
    status = git(['status','--short']) or 'clean or unavailable'
    changed = git(['diff','--name-only']) or 'none or unavailable'

    out_dir = ROOT / 'docs/project/handovers'
    out_dir.mkdir(parents=True, exist_ok=True)
    filename = f'{handover_id}.md'
    content = f'''# Handover {handover_id}\n\n## Work Package\n\n{args.work_package}\n\n## Outcome / Completed\n\n{args.summary}\n\n## Repository State\n\n- Branch: `{branch}`\n- Commit: `{commit}`\n\n```text\n{status}\n```\n\n## Changed Files\n\n```text\n{changed}\n```\n\n## Tests\n\n{args.tests}\n\n## Required Reading\n\n- `CLAUDE.md`\n- `docs/project/CURRENT_STATE.md`\n- active work package and context pack\n\n## Exact Next Step\n\n{args.next_step}\n\n## Do Not Repeat\n\n{args.do_not_repeat}\n\n## Human Gates / Risks\n\nReview current state and open findings before material changes.\n'''
    (out_dir / filename).write_text(content, encoding='utf-8')
    latest = f'''# Latest Handover\n\n- **Aktuell:** `{filename}`\n- **Work Package:** {args.work_package}\n- **Status:** Active / Handover created\n- **Branch:** `{branch}`\n- **Commit:** `{commit}`\n- **Exact Next Step:** {args.next_step}\n'''
    (out_dir / 'LATEST.md').write_text(latest, encoding='utf-8')
    print(filename)


if __name__ == '__main__':
    main()
