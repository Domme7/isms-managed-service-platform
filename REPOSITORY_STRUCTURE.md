# Repository-Struktur

```text
/
├── CLAUDE.md
├── START_HERE.md
├── START_PROMPT.md
├── docs/
│   ├── concept/{active,archive}/
│   ├── project/{checkpoints,handovers,capability,risks}/
│   ├── architecture/adr/
│   ├── decisions/
│   ├── product/
│   ├── quality/
│   ├── security/
│   └── releases/
├── .claude/{agents,rules,skills,hooks}/
├── .github/{ISSUE_TEMPLATE,workflows}/
├── work-packages/
├── context-packs/
├── research/
├── presentations/
├── demo/
├── apps/{web,api}/
├── workers/
├── packages/{domain,ui,contracts,test-support}/
├── infra/
├── scripts/
└── tests/repository/
```

Die Struktur ist eine Phase-0-Baseline. Grundlegende Änderungen benötigen einen ADR; leere Produktordner werden erst nach Stack-Entscheidung in WP-002 materialisiert.
