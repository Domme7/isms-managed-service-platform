# WP-007 – Persistenz der Twin-Kernobjekte (PostgreSQL + Drizzle)

## Identität

- **Phase:** 2 (Digitaler Zwilling)
- **Priorität:** P2 (vorgezogen auf Owner-Wunsch: echte DB jetzt)
- **Status:** Active
- **Risk Class:** Medium (Tenant-Isolation)
- **Accountable Owner:** CTO-/Architecture-Agent (Orchestrator)
- **Builder:** Backend-Engineer-Agent
- **Reviewer:** Code-Reviewer + Product-Security-Privacy (Tenant-Isolation), read-only
- **Human Gates:** Docker Desktop-Installation für den vollen Server (Owner) — nicht blockierend für Bau/Tests (PGlite)

## Ziel

Eine getestete Persistenzschicht `@isms/db`, die die kanonischen Twin-Objekte und -Beziehungen
(`@isms/contracts`) in **PostgreSQL** ablegt — mit **serverseitig erzwungener Tenant-Isolation**,
Migrationen und einem Loader für den synthetischen Seed (`@isms/demo-seed`). Bau + Tests laufen gegen
**PGlite** (eingebettetes Postgres, kein Docker); für den vollen Server liegt `docker-compose.yml` bereit.

## Nicht-Ziele

- keine API-/UI-Anbindung (Explorer bleibt vorerst seed-basiert; DB-Umschaltung ist ein Folge-WP),
- keine Auth/RLS-Vollausbau (RLS als spätere Härtung; jetzt tenant-scoped Repository-Queries),
- keine realen Daten/Secrets; nur synthetischer Seed,
- keine erfundenen Felder — Schema strikt aus `@isms/contracts` (Dok. 07).

## Scope

1. **Paket `packages/db` (`@isms/db`)**, Deps `drizzle-orm`, `drizzle-kit`, `@electric-sql/pglite`, `pg`, `@isms/contracts`.
2. **Drizzle-Schema** für `objects` und `relationships` (Envelope-Felder aus `@isms/contracts`; JSONB für
   verschachtelte Vertragsteile wie `scope_ids`, `quality_state`; `tenant_id`, IDs, bitemporale Zeitfelder als Spalten). Indizes u. a. auf `(tenant_id, object_type)`.
3. **Migrationen** via `drizzle-kit` (Ordner `packages/db/drizzle`).
4. **Repository-Layer** mit **verpflichtendem Tenant-Scope**: `objectsRepo`/`relationshipsRepo` — jede Lese-/
   Schreiboperation erfordert `tenant_id`; keine Query ohne Tenant-Filter (Deny by Default, Doc 18 TA04/Doc 19 SP03).
5. **Seed-Loader:** lädt `DEMO_SEED` aus `@isms/demo-seed` idempotent in die DB (Reset-fähig).
6. **DB-Provider:** eine Factory, die per Env zwischen PGlite (Default Dev/Test) und `pg`/Docker-Postgres wählt.
7. **`docker-compose.yml`** (postgres:16 o. ä.) + **`.env.example`** (nur Platzhalter, keine echten Secrets).

## Abhängigkeiten

- ADR-0002 (Persistenz-Stack), ADR-0001
- Dokument 07 (Objekt-/Beziehungsmodell), Dokument 18 (TA02/TA04), Dokument 19 (Tenant-Isolation)
- `@isms/contracts`, `@isms/demo-seed`
- `context-packs/WP-007/CONTEXT_PACK.md`

## Slices und Checkpoint-Plan

### Slice 1 – Schema + Migrationen + Provider (PGlite)
- Drizzle-Schema, Migration, DB-Provider (PGlite Default). Test: Migration wendet an, Roundtrip Objekt/Beziehung. **Micro Checkpoint.**

### Slice 2 – Repositories (tenant-scoped) + Seed-Loader
- Repos mit Pflicht-Tenant-Scope, Seed-Loader. **Verified Checkpoint.**

### Slice 3 – Tenant-Isolationstests + docker-compose + Abschluss
- PGlite-Tests: Seed lädt; **kein Cross-Tenant-Lesen/Schreiben**; referenzielle Integrität; Determinismus.
- `docker-compose.yml` + `.env.example`. Unabhängiger Code- + Security-Review. **Release/Handover Checkpoint.**

## Acceptance Criteria

1. `@isms/db` baut/typecheckt; Migration wendet gegen PGlite an.
2. Seed (`@isms/demo-seed`) lädt idempotent; DB-Objekt-/Beziehungszahlen entsprechen dem Seed.
3. **Tenant-Isolation bewiesen:** Repository-Queries liefern/ändern nie fremde `tenant_id` (Positiv- + Negativtest).
4. Referenzielle Integrität der geladenen Beziehungen; Bitemporalität erhalten (Roundtrip).
5. Schema strikt aus `@isms/contracts` ableitbar (kein erfundenes Feld).
6. `pnpm test`/`typecheck`/`build` grün (Tests via PGlite, ohne Docker); Monorepo grün.
7. `docker-compose.yml` + `.env.example` vorhanden; keine echten Secrets.
8. Unabhängiger Code- + Security-Review dokumentiert (Builder ≠ Reviewer).

## Test Plan

- Migration-Apply (PGlite), Objekt-/Beziehungs-Roundtrip, Bitemporalität.
- Seed-Load idempotent + Count-Abgleich.
- Tenant-Isolation: Query mit Tenant A sieht keine Tenant-B-Daten; Schreiben scoped; Negativbeweis.
- Referenzielle Integrität der Seed-Relationen.

## Stop Conditions

- ein Schemafeld ließe sich nicht aus `@isms/contracts` ableiten (→ nicht erfinden),
- Tenant-Isolation nicht sicher testbar,
- reale Daten/Secrets, kostenpflichtige/produktive DB, irreversible Aktion.

## Done Evidence

- grüne PGlite-Tests + CI, Migration, Seed-Load-Beleg, Isolationsbeweis, docker-compose, Reviews, Checkpoints.
