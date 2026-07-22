from __future__ import annotations

import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


class RepositoryContractTests(unittest.TestCase):
    def test_active_concept_count(self):
        manifest = json.loads((ROOT / 'docs/concept/MANIFEST.json').read_text(encoding='utf-8'))
        self.assertEqual(24, manifest['active_document_count'])
        self.assertEqual(24, len(manifest['documents']))

    def test_master_index_and_active_reporting_version(self):
        files = {p.name for p in (ROOT / 'docs/concept/active').glob('*.md')}
        self.assertIn('00_MASTER_INDEX_UND_PROJEKTVERFASSUNG_v1.2.md', files)
        self.assertIn('12_REPORTING_PDF_PRAESENTATIONS_ENGINE_v1.1.md', files)
        self.assertNotIn('12_REPORTING_PDF_PRAESENTATIONS_ENGINE_v1.0.md', files)

    def test_required_truth_files(self):
        for rel in [
            'CLAUDE.md', 'docs/project/CURRENT_STATE.md',
            'docs/project/WORK_QUEUE.md', 'docs/project/ACTIVE_WORK_PACKAGE.md',
            'docs/project/handovers/LATEST.md'
        ]:
            self.assertTrue((ROOT / rel).exists(), rel)

    def test_agent_contracts_have_required_sections(self):
        required = ['## Mission','## Scope','## Nicht-Scope','## Ausgaben','## Autorität','## Stop Conditions']
        agents = list((ROOT / '.claude/agents').glob('*.md'))
        agents = [p for p in agents if p.name != 'README.md']
        self.assertGreaterEqual(len(agents), 20)
        for path in agents:
            text = path.read_text(encoding='utf-8')
            for section in required:
                self.assertIn(section, text, f'{path.name}: {section}')

    def test_wp001_has_acceptance_criteria_and_stop_conditions(self):
        text = (ROOT / 'work-packages/WP-001_REPOSITORY_CONTINUITY_BOOTSTRAP.md').read_text(encoding='utf-8')
        self.assertIn('## Acceptance Criteria', text)
        self.assertIn('## Stop Conditions', text)
        self.assertIn('Context-Loss', text)

    def test_latest_handover_target_exists(self):
        text = (ROOT / 'docs/project/handovers/LATEST.md').read_text(encoding='utf-8')
        match = re.search(r'`(HND-[^`]+\.md)`', text)
        self.assertIsNotNone(match)
        self.assertTrue((ROOT / 'docs/project/handovers' / match.group(1)).exists())


if __name__ == '__main__':
    unittest.main()
