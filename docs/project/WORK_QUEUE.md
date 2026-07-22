# Work Queue

| Priorität | ID | Titel | Phase | Status | Abhängigkeiten | Human Gate |
|---:|---|---|---:|---|---|---|
| P0 | WP-001 | Repository & Continuity Bootstrap | 0 | **Done (Phase-0-Baseline)** | keine | GitHub-Remote nur bei Veröffentlichung |
| P0 | WP-002 | Technologie-ADR und ausführbares App-Grundgerüst | 0–1 | **Done (ADR-0001, lauffähiges Grundgerüst)** | WP-001 ✓, Capability Check ✓ | Stack freigegeben (ADR-0001) |
| P1 | WP-003 | Kanonische Datenverträge (`@isms/contracts`) & synthetische Demo-Seed | 1 | **Done (Slices 1–3, 2× Review, 79 Tests)** | WP-002 ✓, Dok. 07 | keine DB/ORM/Docker, keine realen Daten |
| P1 | WP-004 | Digital Twin Explorer (read-only) — Demo-Seed im Browser | 1 | **Done (2× Review + visuelle QA, 94 Tests)** | WP-003 ✓, Dok. 06/07 | keiner (kein DB/Auth/Docker) |
| P1 | WP-011 | App-Shell, Navigation & Rollen-/Mandantenwechsel (Simulation) | 1 | **Done (Code+UX Review + Browser-QA, 36 Web-Tests)** | WP-004 ✓, Dok. 06/03 | keiner (synthetisch, keine echte Auth) |
| P1 | WP-012 | Berater-/Managed-Service-Welt (read-only): Service-Demo-Daten + „Services"-Ansicht | 1/6 | **Done (4× Review + Browser-QA, 170 Tests)** | WP-011 ✓, Dok. 13–15 | CCP-002 (Konzeptfragen, Human Gate) |
| P1 | WP-013 | ISMS-Kern-Welt (read-only): Ort „ISMS" mit Risiken/Controls/Maßnahmen/Evidence | 1/3 | **Done (Code+UX Review + Browser-QA, 77 Web-Tests)** | WP-012 ✓, Dok. 08/06 | keiner (read-only, synthetisch) |
| P1 | WP-014 | Objekt-360-Detailseite (read-only): fünf Fragen je Objekt, navigierbarer Graph | 1/2 | **Done (3× Review + 2 Nachprüfungen + Browser-QA, 151 Web-Tests)** | WP-013 ✓, Dok. 07 §10 / Dok. 06 | keiner (read-only, synthetisch) |
| P1 | WP-015 | Visuelles Design (minimal) — Uplift zurückgenommen, nur dezenter Hintergrund | 1 | **Done (DR-0003, Owner-Entscheidung)** | WP-011..013 ✓, Dok. 06 §18 | keiner (rein visuell) |
| P1 | WP-005 | Lokale Authentisierungssimulation, Rollen- und Tenant-Wechsel | 1 | Planned | WP-002, Security ADR | Security Review |
| P1 | WP-006 | Customer Workspace – erster vertikaler Pfad | 1–2 | Planned | WP-003–005 | Product + ISMS Review |
| P2 | WP-007 | Persistenz der Twin-Kernobjekte (PostgreSQL + Drizzle) | 2 | **Done (Code+Security Review, 18 DB-Tests, 112 gesamt)** | WP-003 ✓, ADR-0002 | RLS-Härtung: FINDING-0004 |
| P2 | WP-008 | Morning Mission – erster Decision-Center-Pfad | 4 | Planned | WP-006, WP-007 | Product Review |
| P2 | WP-009 | Report Package + erstes reproduzierbares Executive Deck | 5 | Planned | WP-006–008 | Presentation Review |
| P2 | WP-010 | Research-/Concept-Change-Pipeline im Repository | kontinuierlich | Planned | WP-001 | Human Gate bei aktiver Konzeptänderung |

WP-001, WP-002 und WP-003 sind abgeschlossen. **Aktiv ist WP-004** (read-only Digital Twin Explorer,
rendert den Demo-Seed im Browser — kein DB/Docker/Auth). Die ursprüngliche „App Shell" ist als **WP-011**
neu eingeordnet (die volle Shell/Login folgt, wenn interaktive rollenbezogene Erlebniswelten gebaut werden).
Persistenz (PostgreSQL) bleibt ein eigenes späteres WP mit Docker-/ORM-Human-Gate. Die Reihenfolge darf der
Orchestrator verfeinern, ohne die Produktvision zu verkleinern.
