from __future__ import annotations

import hashlib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

REQUIRED = [
    'CLAUDE.md', 'START_HERE.md', 'START_PROMPT.md',
    'docs/concept/MANIFEST.json',
    'docs/project/CURRENT_STATE.md',
    'docs/project/WORK_QUEUE.md',
    'docs/project/ACTIVE_WORK_PACKAGE.md',
    'docs/project/handovers/LATEST.md',
    'work-packages/WP-001_REPOSITORY_CONTINUITY_BOOTSTRAP.md',
    'context-packs/WP-001/CONTEXT_PACK.md',
]

SECRET_PATTERNS = [
    re.compile(r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'),
    re.compile(r'(?i)(?:api[_-]?key|secret|token|password)\s*[:=]\s*["\']?[A-Za-z0-9_\-]{20,}'),
    re.compile(r'AKIA[0-9A-Z]{16}'),
]


def fail(msg: str) -> None:
    print(f'[FAIL] {msg}')
    raise SystemExit(1)


def main() -> None:
    for rel in REQUIRED:
        if not (ROOT / rel).exists():
            fail(f'missing required path: {rel}')

    manifest_path = ROOT / 'docs/concept/MANIFEST.json'
    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    docs = manifest.get('documents', [])
    if manifest.get('active_document_count') != len(docs) or len(docs) != 24:
        fail(f'expected 24 active concept docs, found {len(docs)}')

    for item in docs:
        p = ROOT / 'docs/concept/active' / item['file']
        if not p.exists():
            fail(f'manifest file missing: {p.relative_to(ROOT)}')
        digest = hashlib.sha256(p.read_bytes()).hexdigest()
        if digest != item['sha256']:
            fail(f'hash mismatch: {p.relative_to(ROOT)}')

    latest = (ROOT / 'docs/project/handovers/LATEST.md').read_text(encoding='utf-8')
    m = re.search(r'`([^`]*HND-[^`]+\.md)`', latest)
    if not m:
        # current file uses a basename without a path
        m = re.search(r'`(HND-[^`]+\.md)`', latest)
    if not m:
        fail('LATEST.md does not reference a handover file')
    handover_name = Path(m.group(1)).name
    if not (ROOT / 'docs/project/handovers' / handover_name).exists():
        fail(f'LATEST.md target missing: {handover_name}')

    active_wp = (ROOT / 'docs/project/ACTIVE_WORK_PACKAGE.md').read_text(encoding='utf-8')
    if 'WP-001' not in active_wp:
        fail('active work package is not WP-001')

    for p in ROOT.rglob('*'):
        if not p.is_file() or '.git' in p.parts:
            continue
        if p.suffix.lower() in {'.png','.jpg','.jpeg','.pdf','.docx','.zip'}:
            continue
        try:
            text = p.read_text(encoding='utf-8')
        except UnicodeDecodeError:
            continue
        for pattern in SECRET_PATTERNS:
            if pattern.search(text):
                fail(f'possible secret pattern in {p.relative_to(ROOT)}')

    print('[OK] required paths present')
    print('[OK] 24 active concept documents and hashes verified')
    print('[OK] active WP and latest handover are consistent')
    print('[OK] no obvious secret patterns detected')


if __name__ == '__main__':
    main()
