# Active Work Package

- **ID:** WP-007
- **Titel:** Persistenz der Twin-Kernobjekte (PostgreSQL + Drizzle)
- **Datei:** `work-packages/WP-007_PERSISTENZ_TWIN_KERN_DRIZZLE.md`
- **Context Pack:** `context-packs/WP-007/CONTEXT_PACK.md`
- **ADR:** `docs/architecture/adr/ADR-0002_persistenz_postgres_drizzle.md` (Accepted, Human Gate: DB-Weg gewählt)
- **Führende Quellen:** Dok. 07 (Modell) + Dok. 18/19 (Persistenz/Tenant-Isolation); Daten aus `@isms/demo-seed`
- **Status:** Active — Slice 1 (`@isms/db`: Drizzle-Schema + Migration + PGlite-Provider)
- **Owner:** CTO-/Architecture-Agent (Orchestrator)
- **Builder:** Backend-Engineer-Agent
- **Reviewer:** Code-Reviewer + Product-Security-Privacy (Tenant-Isolation), read-only
- **Human Gate (parallel, nicht blockierend):** Owner installiert Docker Desktop für den vollen Server; Bau/Tests laufen ohne Docker gegen PGlite.

> Abgeschlossen: WP-001, WP-002, WP-003, WP-004 (Twin Explorer live). Ausrichtung: alle 9 Phasen; erste Rolle nach App-Shell: Berater/Managed Service.
