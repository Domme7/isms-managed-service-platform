# Context Pack – WP-007 Persistenz der Twin-Kernobjekte (PostgreSQL + Drizzle)

## Ziel

Getestete Persistenzschicht `@isms/db` (PostgreSQL, Drizzle) für die kanonischen Twin-Objekte/-Beziehungen,
mit serverseitig erzwungener Tenant-Isolation. Bau/Tests gegen PGlite (kein Docker); Server via docker-compose.

## Verbindliche Prinzipien

- **PostgreSQL führend** (Doc 18 TA02); Projektionen/Cache später (TA03).
- **Tenant Context Pflicht / Deny by Default** (Doc 18 TA04, Doc 19 SP01/SP03): keine Query ohne Tenant-Scope.
- **Schema strikt aus `@isms/contracts`** (Dok. 07 Objekt-/Beziehungsvertrag) — nichts erfinden.
- **Bitemporalität** (`valid_time`/`record_time`) erhalten.
- Nur synthetischer Seed; keine Secrets im Repo (`.env.example` mit Platzhaltern).
- Reproduzierbar/deterministisch (Tests via PGlite, feste Seed-IDs).

## Pflichtquellen

### ADR-0002 (führend für den Stack)
Pfad: `docs/architecture/adr/ADR-0002_persistenz_postgres_drizzle.md`
Drizzle + PGlite (Dev/Test) + Docker-Postgres (Server); Tenant-Scope jetzt, RLS später.

### Dokument 07 v1.0
Pfad: `docs/concept/active/07_DIGITALER_UNTERNEHMENSZWILLING_INFORMATIONSGRAPH_v1.0.md`
Objekt-/Beziehungsvertrag, Pflichtfelder, Bitemporalität — 1:1 die Basis fürs Schema (via `@isms/contracts`).

### Dokument 18 v1.0
Pfad: `docs/concept/active/18_TECHNISCHE_ARCHITEKTUR_PLATTFORMBETRIEB_v1.0.md`
TA02 (Postgres führend), TA03 (Projektionen), TA04 (Tenant Context), Transaktions-/Outbox-Muster (Kontext).

### Dokument 19 v1.0
Pfad: `docs/concept/active/19_SICHERHEIT_DATENSCHUTZ_RECHTE_AUDITIERBARKEIT_v1.0.md`
SP01 Deny by Default, SP03 Tenant First, Mandantenisolation auf DB-Ebene (RLS als Ziel).

### Datenquellen/Verträge
- `packages/contracts/` (`@isms/contracts`): Envelope-Typen/Schemas → Spalten/JSONB-Ableitung.
- `packages/demo-seed/` (`@isms/demo-seed`): `DEMO_SEED` für den Loader + Count-Abgleich.

## Umsetzungshinweise (reversibel)

- `packages/db` analog `packages/contracts` (tsconfig/build/test-Scripts). Drizzle-Schema in `src/schema.ts`,
  Repos in `src/repositories/*`, Provider in `src/client.ts` (Env `DB_DRIVER=pglite|pg`).
- Envelope-Kernfelder als Spalten (`object_id` PK zusammen mit `tenant_id`, `object_type`, `lifecycle_status`,
  `valid_from/valid_to`, `recorded_at/replaced_at`, `version`), Rest als `jsonb` (scope_ids, owner_ids,
  classification, source_refs, quality_state, tags_custom_fields). Beziehungen analog.
- Tests: `@electric-sql/pglite` in-memory; Migration anwenden, Seed laden, Isolation prüfen.

## Nicht im Context Pack enthalten

- API-/UI-Anbindung, Auth/RLS-Vollausbau, Outbox/Worker, Reporting — spätere WPs.
