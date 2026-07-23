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
    m_wp = re.search(r'^\s*-\s*\*\*ID:\*\*\s*(WP-\d{3})', active_wp, re.M)
    active_wp_id = m_wp.group(1) if m_wp else None
    if active_wp_id:
        if not list((ROOT / 'work-packages').glob(f'{active_wp_id}_*.md')):
            fail(f'active work package file missing for {active_wp_id}')

    # ECHTE Konsistenzpruefung. Vorher standen hier zwei getrennte Existenzpruefungen, waehrend die
    # Ausgabe "active WP and latest handover are consistent" behauptete - die beiden Dateien wurden
    # nie miteinander verglichen. Genau so konnte CURRENT_STATE "kein aktives Work Package" sagen,
    # waehrend ACTIVE_WORK_PACKAGE.md und LATEST.md WP-017 fuehrten. Die erste Datei, die eine neue
    # Session liest, war damit falsch (FINDING-0002).
    m_latest_wp = re.search(r'\*\*Work Package:\*\*\s*(\S+)', latest)
    latest_wp_id = m_latest_wp.group(1) if m_latest_wp else None
    if active_wp_id and latest_wp_id and latest_wp_id.startswith('WP-') and latest_wp_id != active_wp_id:
        fail(f'ACTIVE_WORK_PACKAGE.md fuehrt {active_wp_id}, LATEST.md fuehrt {latest_wp_id}')

    current_state = (ROOT / 'docs/project/CURRENT_STATE.md').read_text(encoding='utf-8')
    m_cs = re.search(r'\*\*Aktives Work Package:\*\*\s*(.+)', current_state)
    if m_cs:
        cs_zeile = m_cs.group(1)
        m_cs_wp = re.search(r'WP-\d{3}', cs_zeile)
        cs_sagt_keins = re.search(r'\bkeins?\b', cs_zeile, re.I) is not None
        if active_wp_id and cs_sagt_keins and not m_cs_wp:
            fail(f'CURRENT_STATE.md sagt "kein aktives Work Package", ACTIVE_WORK_PACKAGE.md fuehrt {active_wp_id}')
        if active_wp_id and m_cs_wp and m_cs_wp.group(0) != active_wp_id:
            fail(f'CURRENT_STATE.md fuehrt {m_cs_wp.group(0)}, ACTIVE_WORK_PACKAGE.md fuehrt {active_wp_id}')

    # Offene Findings muessen in CURRENT_STATE auftauchen - sonst liest eine neue Session einen
    # Status, der bekannte Risiken verschweigt.
    offene_findings = []
    for p in sorted((ROOT / 'docs/project/risks').glob('FINDING-*.md')):
        text = p.read_text(encoding='utf-8')
        m_status = re.search(r'\*\*Status:\*\*\s*(.+)', text)
        if m_status and re.search(r'offen|in behebung', m_status.group(1), re.I):
            fid = p.name.split('_')[0]
            if fid not in current_state:
                offene_findings.append(fid)
    if offene_findings:
        fail('offene Findings fehlen in CURRENT_STATE.md: ' + ', '.join(offene_findings))

    skip_dirs = {'.git', 'node_modules', 'dist', '.next', '.turbo', 'build', 'coverage'}
    for p in ROOT.rglob('*'):
        if not p.is_file() or skip_dirs & set(p.parts):
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

    # Jede Meldung sagt auch, was sie NICHT abdeckt. Ein "[OK]", das mehr behauptet als es prueft,
    # ist schlimmer als keine Pruefung - der Owner liest es und glaubt es zu Recht.
    print('[OK] required paths present')
    print('[OK] 24 aktive Konzept-Markdowns vorhanden, Hashes stimmen')
    print('     -> sagt NICHTS ueber Treue zu den PDF-Originalen (DR-0006, FINDING-0007);')
    print('        dafuer: docs/concept/abgleich/ und scripts/pdf_text.py')
    print('[OK] Statusdateien konsistent (ACTIVE_WORK_PACKAGE / LATEST / CURRENT_STATE)')
    print('[OK] offene Findings sind in CURRENT_STATE.md genannt')
    print('[OK] keine offensichtlichen Secret-Muster')
    print('     -> Mustersuche, kein vollstaendiger Secret Scan')


if __name__ == '__main__':
    main()
