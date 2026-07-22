# Active Work Package

- **ID:** WP-003
- **Titel:** Kanonische Datenverträge & synthetische Demo-Seed-Grundlage
- **Datei:** `work-packages/WP-003_KANONISCHE_DATENVERTRAEGE_UND_DEMO_SEED.md`
- **Status:** **Done** (Slices 1–3) — `@isms/contracts` + `@isms/demo-seed`, zwei unabhängige Reviews je Slice, 79 Tests grün
- **Führende Quelle:** Dokument 07 (Digitaler Unternehmenszwilling & Informationsgraph)
- **Reviews:** `docs/project/reviews/WP-003_SLICE1_INDEPENDENT_REVIEW.md`, `…SLICE2…`
- **Human Gates:** offen (nicht blockierend): O-D07-02/03 (Lifecycle-Konzeptwidersprüche, Concept Author)
- **Nächstes (Kandidaten, Entscheidung offen):**
  - **WP-004a (empfohlen):** read-only „Digital Twin Explorer"-Ansicht in `apps/web`, die den Demo-Seed rendert (Tenants + Nordwerk-Graph). Kein DB/Docker, sichtbarer Fortschritt.
  - **WP-004b:** Persistenz-WP (PostgreSQL) — benötigt Docker-/ORM-Entscheidung (Human Gate).
  - **WP-004c:** App-Shell/Login/Rollenwechsel/Mandantenkontext (Phase 1, Dok. 06).

> Abgeschlossen: WP-001 (Phase-0-Baseline), WP-002 (Stack-ADR-0001 + Grundgerüst), WP-003 (Datenverträge + Demo-Seed).
