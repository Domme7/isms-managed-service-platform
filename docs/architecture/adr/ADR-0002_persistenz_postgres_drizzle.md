# ADR-0002 – Persistenz: PostgreSQL + Drizzle (PGlite für Dev/Test, Docker für Server)

- Status: **Accepted** (Human Gate: Owner hat den DB-/Docker-Weg in Session gewählt)
- Datum: 2026-07-22
- Owner: CTO-/Architecture-Rolle (Vorschlag), Human Product Owner (Freigabe)
- Betroffen: WP-007 ff.; ergänzt ADR-0001.

## Kontext

Dokument 18 legt PostgreSQL als führenden Store fest (TA02). Der Owner hat entschieden, jetzt auf
**echte PostgreSQL** zu gehen. Das offene ORM/Tool (ADR-0001) wird hiermit festgelegt.

## Entscheidung

- **Datenbank:** PostgreSQL (führend, Doc 18 TA02).
- **ORM/Migrations:** **Drizzle ORM** + `drizzle-kit`.
- **Dev/Test-Engine:** **PGlite** (`@electric-sql/pglite`) — eingebettetes PostgreSQL (WASM), kein Docker,
  deterministisch. Drizzle hat einen nativen PGlite-Treiber → dasselbe Schema/dieselben Queries wie am Server.
- **Voller lokaler/produktiver Server:** PostgreSQL via **Docker** (`docker-compose.yml`), vom Owner
  installiertes Docker Desktop.
- **Tenant-Isolation:** verpflichtend serverseitig über tenant-scoped Repository-Queries; PostgreSQL **RLS**
  als spätere Härtung (Doc 18/19, TA04 „Tenant Context Pflicht", Deny by Default).

## Begründung

- **Drizzle:** SQL-first, typsicher, schlank; nativer **PGlite-Treiber** → wir können die Persistenz **ohne
  Docker verifiziert** bauen (autonomer Fortschritt) und identisch auf Docker-Postgres betreiben; gute Basis
  für explizite Tenant-Scopes/RLS (Doc 18/19).
- **PGlite = echtes PostgreSQL** (gleiche Engine), Null-Install, reproduzierbar → ideal für Tests/Demo.
- **Docker-Postgres** liefert Server-Fidelity (Verbindungen, RLS, Nebenläufigkeit).

## Folgen

- **Docker Desktop-Installation ist ein Owner-Schritt (Human Gate)** für den vollen Server; für Bau/Tests der
  Persistenzschicht **nicht** erforderlich (PGlite).
- Neue Deps: `drizzle-orm`, `drizzle-kit`, `@electric-sql/pglite`, `pg` (Server-Treiber).
- Keine realen Daten; nur synthetischer Seed (`@isms/demo-seed`).

## Supersede-Regel

Wechsel von PostgreSQL, Drizzle oder der Dev-Engine benötigt einen neuen ADR mit Migrationsplan.
