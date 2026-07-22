# Current State

**Stand:** WP-003 abgeschlossen — Datenverträge `@isms/contracts` + synthetische Demo-Seed `@isms/demo-seed`  
**Phase:** 1 (Demo Foundation)  
**Aktives Work Package:** WP-003 (**Done**); nächstes WP-004 (Kandidaten, Entscheidung offen)  
**Repository-Root:** `apps/ISMS/` · **Default-Branch:** `main` · **Tags:** `phase-0-baseline`  
**Remote:** privat `Domme7/isms-managed-service-platform` (DR-0002) — CI grün  
**Implementierungsstatus:** Minimales, lauffähiges Monorepo-Grundgerüst; noch keine Produktfeatures  
**Konzeptstatus:** 24 aktive Markdown-Dokumente vollständig, Manifest-Hashes verifiziert

## Gesichert

- Phase-0-Baseline (WP-001) abgeschlossen, getaggt, privat auf GitHub gesichert,
- **Stack entschieden (ADR-0001): TypeScript · Next.js · NestJS · PostgreSQL · pnpm + Turborepo**,
- **lauffähiges Grundgerüst:** `apps/api` (NestJS, `GET /health` live geprüft) + `apps/web` (Next.js App-Shell),
- **Vitest-Smoke-Test grün; typecheck + build für beide Apps grün; App-CI auf GitHub**,
- Continuity-Tooling, Checkpoints, Handover, unabhängige QA-/Security-Review (WP-001),
- **`docs/project/PROJECT_UNDERSTANDING.md`** — destilliertes Gesamtverständnis aus allen 24 Konzeptdokumenten (schneller Einstieg für neue Sessions; nicht autoritativ),
- **`@isms/contracts`** (WP-003 Slice 1): kanonischer Objekt-/Beziehungsvertrag (F01–F09 / R01–R25) aus Dok. 07, Zod-Schemas, **55 Tests**; zwei unabhängige Reviews (KONZEPTTREU / Freigabe mit Minor-Fixes), `PROVENANCE.md` + offene Fragen O-D07-01…11,
- **`@isms/demo-seed`** (WP-003 Slice 2): 4 synthetische Demo-Mandanten + kohärenter Nordwerk-Objektgraph (17 Objekte / 15 Beziehungen), validiert gegen die Contracts, **24 Tests** mit Negativbeweisen für Tenant-Isolation, referenzielle Integrität, Owner-Refs; Seed-Manifest + Storyline; zwei unabhängige Reviews (KONZEPTTREU / Freigabe). **Monorepo gesamt: 79 Tests grün.**

## Verifikations-Evidence (WP-002)

- `pnpm test` → 2/2 grün · `pnpm typecheck` → grün (api+web) · `pnpm build` → grün (api+web)
- API live: `GET /health` → `{"status":"ok","service":"isms-api","phase":"phase-0-skeleton",...}`; unbekannte Route → 404
- `validate_handoff.py` OK · 6/6 Repository-Tests grün · GitHub Actions „Repository Contract" + „App CI"

## Noch nicht gesichert oder entschieden

- **Docker** für lokale PostgreSQL/Redis (nicht installiert) — Voraussetzung erst fürs Persistenz-WP (nach WP-003),
- ORM/Migrationstool (Prisma vs. Drizzle) — Entscheidung beim Persistenz-WP,
- **Lifecycle-Konzeptwidersprüche O-D07-02/03** (Schreibweise §8 vs. Dok. 05 §7; §7-Kurzform vs. §8) — Concept-Author/Human Gate, nicht blockierend,
- Authentisierung/Tenant-Trennung (WP-005), produktive Cloud/CI, reale Daten,
- Branch-Protection auf `main` (O-GH-002).

## Offene Findings (nicht blockierend)

- FINDING-0001: Master-Index-Einstiegspfad weicht von gebauter Struktur ab (Low).
- FINDING-0002: `validate_handoff.py` prüft keine Status-Aktualität/Branch/Tag (Med); aktive-WP-Prüfung inzwischen WP-agnostisch gemacht.

## Exact Next Step

**WP-003 ist abgeschlossen.** Nächstes WP-004 — Entscheidung offen zwischen:
- **WP-004a (empfohlen):** read-only „Digital Twin Explorer" in `apps/web`, der den Demo-Seed rendert
  (Tenants + Nordwerk-Graph) — kein DB/Docker, sofort sichtbarer Fortschritt im Browser;
- **WP-004b:** Persistenz-WP (PostgreSQL) — benötigt Docker-/ORM-Entscheidung (Human Gate);
- **WP-004c:** App-Shell/Login/Rollenwechsel/Mandantenkontext (Phase 1, Dok. 06).
Weiterhin ohne stille Stack-/Kostenbindung; Checkpoints + Push ins private Backup.
