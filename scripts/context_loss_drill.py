from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    latest = (ROOT / 'docs/project/handovers/LATEST.md').read_text(encoding='utf-8')
    state = (ROOT / 'docs/project/CURRENT_STATE.md').read_text(encoding='utf-8')
    active = (ROOT / 'docs/project/ACTIVE_WORK_PACKAGE.md').read_text(encoding='utf-8')
    required = ['Work Package', 'Exact Next Step']
    errors = [x for x in required if x.lower() not in latest.lower()]
    if 'WP-001' not in active:
        errors.append('active WP is not WP-001')
    if 'Exact Next Step' not in state:
        errors.append('CURRENT_STATE lacks Exact Next Step')
    if errors:
        print('Context-loss drill precondition failed:')
        for e in errors:
            print('-', e)
        raise SystemExit(1)
    print('Context-loss drill preconditions passed.')
    print('Resume prompt:')
    print('Read CLAUDE.md, CURRENT_STATE.md, LATEST.md, active WP and its Context Pack; verify Git state and continue Exact Next Step without re-planning.')


if __name__ == '__main__':
    main()
