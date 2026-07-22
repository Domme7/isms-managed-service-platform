# Work Queue

| Priorität | ID | Titel | Phase | Status | Abhängigkeiten | Human Gate |
|---:|---|---|---:|---|---|---|
| P0 | WP-001 | Repository & Continuity Bootstrap | 0 | Ready / Active | keine | GitHub-Remote nur bei Veröffentlichung |
| P0 | WP-002 | Technologie-ADR und ausführbares App-Grundgerüst | 0–1 | Blocked | WP-001, Capability Check | Stack-/Kostenentscheidung bei materialer Bindung |
| P1 | WP-003 | Synthetische Demo-Datenverträge und Seed-Manifest | 1 | Planned | WP-001, Produkt-/Datenkonzepte | keine realen Daten |
| P1 | WP-004 | App Shell, Navigation und neutrales Designsystem | 1 | Planned | WP-002, UX Contracts | Product Review |
| P1 | WP-005 | Lokale Authentisierungssimulation, Rollen- und Tenant-Wechsel | 1 | Planned | WP-002, Security ADR | Security Review |
| P1 | WP-006 | Customer Workspace – erster vertikaler Pfad | 1–2 | Planned | WP-003–005 | Product + ISMS Review |
| P2 | WP-007 | Digital-Twin-Kernobjekte und Beziehungen | 2 | Planned | WP-002, WP-003 | Architecture Review |
| P2 | WP-008 | Morning Mission – erster Decision-Center-Pfad | 4 | Planned | WP-006, WP-007 | Product Review |
| P2 | WP-009 | Report Package + erstes reproduzierbares Executive Deck | 5 | Planned | WP-006–008 | Presentation Review |
| P2 | WP-010 | Research-/Concept-Change-Pipeline im Repository | kontinuierlich | Planned | WP-001 | Human Gate bei aktiver Konzeptänderung |

Nur WP-001 ist aktuell freigegeben. Die Reihenfolge der späteren Pakete darf nach WP-001 durch den Orchestrator verfeinert werden, ohne die Produktvision zu verkleinern.
