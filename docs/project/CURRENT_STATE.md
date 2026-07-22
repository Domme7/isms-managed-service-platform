# Current State

**Stand:** WP-002 abgeschlossen — lauffähiges Phase-0 App-Grundgerüst (Stack per ADR-0001)  
**Phase:** 0 → 1 (Grundgerüst steht)  
**Aktives Work Package:** WP-002 (**Done**); nächstes WP-003, noch nicht gestartet  
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
- **`docs/project/PROJECT_UNDERSTANDING.md`** — destilliertes Gesamtverständnis aus allen 24 Konzeptdokumenten (schneller Einstieg für neue Sessions; nicht autoritativ).

## Verifikations-Evidence (WP-002)

- `pnpm test` → 2/2 grün · `pnpm typecheck` → grün (api+web) · `pnpm build` → grün (api+web)
- API live: `GET /health` → `{"status":"ok","service":"isms-api","phase":"phase-0-skeleton",...}`; unbekannte Route → 404
- `validate_handoff.py` OK · 6/6 Repository-Tests grün · GitHub Actions „Repository Contract" + „App CI"

## Noch nicht gesichert oder entschieden

- **Docker** für lokale PostgreSQL/Redis (nicht installiert) — Voraussetzung für WP-003 (Folge-ADR),
- ORM/Migrationstool (Prisma vs. Drizzle) — Entscheidung bei WP-003,
- Authentisierung/Tenant-Trennung (WP-005), produktive Cloud/CI, reale Daten,
- Branch-Protection auf `main` (O-GH-002).

## Offene Findings (nicht blockierend)

- FINDING-0001: Master-Index-Einstiegspfad weicht von gebauter Struktur ab (Low).
- FINDING-0002: `validate_handoff.py` prüft keine Status-Aktualität/Branch/Tag (Med); aktive-WP-Prüfung inzwischen WP-agnostisch gemacht.

## Exact Next Step

**WP-003 vorbereiten:** (1) Entscheidung Docker Desktop installieren vs. leichte DB-Alternative für lokale
PostgreSQL/Redis (Folge-ADR); (2) ORM wählen (Prisma vs. Drizzle); danach synthetische Demo-Datenverträge
und Seed-Manifest gemäß `work-packages/WP-003` in kleinen Slices. Keine realen Daten. Weiterhin Checkpoints
+ Push ins private Backup.
