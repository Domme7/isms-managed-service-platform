# Teststrategie

| Ebene | Zweck |
|---|---|
| Repository Contract | Struktur, Manifest, Status- und Agentenverträge |
| Unit | fachliche/technische Logik isoliert |
| Contract | API-, Event-, Report- und Connector-Schemas |
| Integration | DB, Queue, Object Storage, Authz |
| Tenant Isolation | keine Cross-Tenant-Zugriffe |
| E2E | vollständige Nutzerreisen |
| Security/Privacy | Abuse Cases, Rechte, Retention, Exporte |
| Accessibility | Tastatur, Semantik, Kontrast, Screenreader |
| Visual | kritische Screens, PDF und PPTX |
| Resilience | Retry, Recovery, Worker-Ausfall |
| Demo Determinism | reproduzierbare Seeds und Ausgaben |

WP-001 testet zunächst ausschließlich Repository-Verträge und Fortsetzbarkeit.
