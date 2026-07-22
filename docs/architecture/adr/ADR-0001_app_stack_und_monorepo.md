# ADR-0001 – App-Stack und Monorepo-Grundgerüst

- Status: **Accepted** (Human Gate in Session erteilt)
- Datum: 2026-07-22
- Owner: CTO-/Architecture-Rolle (Vorschlag), Human Product Owner (Freigabe)
- Betroffene Work Packages: WP-002 ff.

## Kontext

WP-002 benötigt eine entschiedene, ADR-gestützte Technologiebasis, bevor ein vertikaler
Produktpfad beginnen kann. Dokument 18 (Technische Architektur) gibt den Referenz-Stack bereits
verbindlich vor; die vorhandene Repo-Struktur (`apps/web`, `apps/api`, `packages/*`, `workers/`)
ist darauf ausgelegt.

## Entscheidungsbedarf

Verbindliche Festlegung von Sprache, Frontend, Backend, Datenbank, Graph-Ansatz, Queue/Cache,
Container, Monorepo-/Package-Manager und Test-Toolchain für den ersten Build.

## Optionen

- **A – Dokument-18-Referenzstack übernehmen** (TypeScript, React/Next.js, NestJS, PostgreSQL, Redis/BullMQ, Docker, modularer Monolith).
- B – Polyglott (z. B. Python/FastAPI-Backend + React-Frontend): zwei Sprachen, mehr Reibung für Solo+KI, weicht von Doc 18 ab.
- C – Anderes JS-Backend (Fastify/Express) statt NestJS: möglich, aber Doc 18 nennt NestJS als Default.

## Entscheidung

**Option A.** Verbindlicher Stack:

| Ebene | Technologie |
|---|---|
| Sprache | TypeScript (durchgängig) |
| Frontend | React + Next.js (App Router) |
| Backend | Node.js + NestJS (modularer Monolith, getrennte Worker) |
| Datenbank | PostgreSQL (führend; Graph als Node/Edge-Modell + Repository-Abstraktion) |
| Queue/Cache | Redis + BullMQ (ab WP mit Async-Bedarf) |
| Container | Docker/OCI (ab WP-003 für lokale Postgres/Redis) |
| Monorepo | **pnpm Workspaces + Turborepo** |
| Tests | **Vitest** (Unit), **Playwright** (E2E, ab UI-Flows) |
| Lint/Format | ESLint + Prettier |

**Reversibel und noch nicht festgelegt:** ORM/Migrationstool (Prisma vs. Drizzle) — entschieden bei
WP-003, wenn die DB tatsächlich gebraucht wird. Playwright wird erst mit den ersten UI-Flows (WP-004)
eingeführt.

## Begründung

- Eine Sprache über Web/API/Packages minimiert Reibung für einen Solo-Owner mit KI-Unterstützung
  und erlaubt geteilte Typen über `packages/contracts`.
- Deckt sich exakt mit Doc 18 (keine erfundene Abweichung) und der vorhandenen Repo-Struktur.
- PostgreSQL-first hält Fachwahrheit transaktional konsistent (TA02/TA03) und vermeidet früh die
  Betriebs- und Konsistenzkomplexität einer eigenen Graphdatenbank.
- **Package-Manager pnpm** wurde gewählt (Doc-18 lässt dies offen); auf dieser Maschine global über
  `npm i -g pnpm` verfügbar (v11.15.1, user-Prefix, kein Admin). npm Workspaces bleibt reversible Alternative.

## Folgen und Risiken

- **Docker ist nicht installiert** (Capability-Check). Das minimale WP-002-Grundgerüst (Health-Endpoint,
  Web-Shell, Smoke-Test) läuft ohne Docker. Postgres/Redis (Docker) werden zur Voraussetzung ab WP-003
  → dann Docker Desktop installieren oder leichte Alternative wählen (eigener Folge-Punkt/ADR).
- Framework-Versionen entwickeln sich; Pins werden über die Lockfile stabil gehalten.
- Kein produktives Deployment, keine kostenpflichtige Cloud in WP-002.

## Security/Privacy/Tenant-Auswirkung

- Keine Authentisierung/Tenant-Trennung in WP-002 (folgt in WP-005); serverseitige Tenant-Scope-
  Erzwingung und PostgreSQL-RLS sind für spätere WPs vorgesehen (Doc 18/19).
- Keine Secrets/realen Daten; nur lokale, synthetische Entwicklung.

## Rollback/Supersede-Regel

Reversible Sub-Entscheidungen (Package-Manager, ORM, Test-Tools) über neuen ADR/DR änderbar. Ein
Wechsel des Kern-Stacks (Sprache/Framework/DB) benötigt einen supersedierenden ADR mit Migrationsplan.

## Evidence

- Dokument 18, Abschnitt „Referenztechnologien" (Zeilen ~167–178) und Architekturprinzipien TA01–TA16.
- Capability-Check: Node v24.18, npm 11.16, pnpm 11.15.1 (global), Docker nicht installiert.
- WP-002-Grundgerüst-Build/Tests (siehe Checkpoints und CI).
