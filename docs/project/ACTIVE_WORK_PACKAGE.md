# Active Work Package

- **ID:** WP-011
- **Titel:** App-Shell, Navigation & Rollen-/Mandantenwechsel (Simulation)
- **Datei:** `work-packages/WP-011_APP_SHELL_ROLLEN_MANDANT.md`
- **Status:** **Built — selbst-verifiziert (36 Web-Tests, Monorepo grün); unabhängiger Review (Code + UX) + visuelle Browser-QA AUSSTEHEND**
- **Führende Quellen:** Dok. 06 (acht Orte) + Dok. 03 (Rollen R01–R12); Mandanten aus `@isms/demo-seed`
- **Builder:** Frontend-Engineer-Agent (fertig). **Reviewer (noch offen):** Code-Reviewer + Product-User-Lead.
- **Human Gates:** keiner (synthetische Simulation, keine echte Auth/DB)

## GENAU HIER WEITERMACHEN (nächster Chat)
1. **Unabhängigen Review** starten: Code-Reviewer + Product-User-Lead über die uncommitteten? — NEIN, bereits committet (built) — über `apps/web/(shell)`, `components/shell/*`, `lib/shell/*`, `app/login`.
2. **Visuelle Browser-QA:** `pnpm --filter @isms/web dev` → `/login`, `/heute`, `/twin`, Rollen-/Mandantenwechsel, Platzhalterseiten, 404. Screenshot/DOM als Evidence.
3. Findings beheben → committen → **dann WP-011 auf Done** setzen (Review-Notiz `docs/project/reviews/WP-011_INDEPENDENT_REVIEW.md`, Verified Checkpoint, Status/Balken aktualisieren).
4. Danach: **Berater-/Managed-Service-Welt** (Owner-Wahl) als nächstes WP.

> Abgeschlossen: WP-001, WP-002, WP-003, WP-004, WP-007. Ausrichtung: alle 9 Phasen.
