from __future__ import annotations

import platform
import shutil
import subprocess
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/project/capability/CAPABILITY_CHECK_RESULT.md'


def cmd_version(command: list[str]) -> str:
    if not shutil.which(command[0]):
        return 'nicht installiert / nicht im PATH'
    try:
        cp = subprocess.run(command, capture_output=True, text=True, timeout=15)
        text = (cp.stdout or cp.stderr).strip().splitlines()
        return text[0] if text else f'exit {cp.returncode}'
    except Exception as exc:
        return f'Fehler: {exc}'


def main() -> None:
    values = {
        'OS': f'{platform.system()} {platform.release()}',
        'Python': platform.python_version(),
        'Git': cmd_version(['git', '--version']),
        'Claude Code': cmd_version(['claude', '--version']),
        'GitHub CLI': cmd_version(['gh', '--version']),
        'Docker': cmd_version(['docker', '--version']),
        'Node': cmd_version(['node', '--version']),
    }
    now = datetime.now(timezone.utc).isoformat()
    rows = '\n'.join(f'| {k} | {v} |' for k, v in values.items())
    content = f'''# Capability Check Result\n\n**Generated:** {now}\n\n| Capability | Result |\n|---|---|\n{rows}\n\n## Manual verification required\n\n- [ ] `CLAUDE.md` loading confirmed\n- [ ] `.claude/rules/` syntax confirmed\n- [ ] `.claude/agents/` frontmatter/tool syntax confirmed\n- [ ] `.claude/skills/` loading confirmed\n- [ ] hook events and blocking behavior confirmed\n- [ ] worktree workflow confirmed\n- [ ] session resume/checkpoint behavior confirmed\n- [ ] agent teams treated as optional only\n\n## Findings / ADR needs\n\nTBD by WP-001 executor.\n\n## Exact Next Step\n\nReview this result, document deviations from Document 20C, and create the first Micro Checkpoint.\n'''
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(content, encoding='utf-8')
    print(f'Wrote {OUT.relative_to(ROOT)}')
    for k, v in values.items():
        print(f'{k}: {v}')


if __name__ == '__main__':
    main()
