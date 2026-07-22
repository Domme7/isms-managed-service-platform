from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def extract_section(text: str, heading: str) -> str:
    lines = text.splitlines()
    start = None
    level = None
    for i, line in enumerate(lines):
        m = re.match(r'^(#{1,6})\s+(.+?)\s*$', line)
        if m and m.group(2).strip() == heading.strip():
            start = i
            level = len(m.group(1))
            break
    if start is None:
        raise ValueError(f'heading not found: {heading}')
    end = len(lines)
    for i in range(start + 1, len(lines)):
        m = re.match(r'^(#{1,6})\s+', lines[i])
        if m and len(m.group(1)) <= level:
            end = i
            break
    return '\n'.join(lines[start:end]).strip() + '\n'


def main() -> None:
    ap = argparse.ArgumentParser(description='Build a context pack from a JSON specification.')
    ap.add_argument('spec', help='JSON file with output, title and sources[{file, headings[]}]')
    args = ap.parse_args()
    spec_path = Path(args.spec)
    if not spec_path.is_absolute():
        spec_path = ROOT / spec_path
    spec = json.loads(spec_path.read_text(encoding='utf-8'))
    parts = [f"# {spec['title']}\n"]
    for source in spec['sources']:
        p = ROOT / source['file']
        text = p.read_text(encoding='utf-8')
        parts.append(f"\n## Quelle: `{source['file']}`\n")
        for heading in source['headings']:
            parts.append(extract_section(text, heading))
    out = ROOT / spec['output']
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text('\n'.join(parts), encoding='utf-8')
    print(out.relative_to(ROOT))


if __name__ == '__main__':
    main()
