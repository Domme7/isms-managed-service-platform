# WP-007 – Unabhängiger Review (Done Evidence)

**Gegenstand:** `packages/db` (`@isms/db`) — Persistenz der Twin-Kernobjekte (PostgreSQL/Drizzle, PGlite
für Dev/Test). **Builder:** Backend-Engineer-Agent. **Reviewer (getrennt):** Code-Reviewer +
Product-Security-Privacy. **Datum:** 2026-07-22.

## Verdikte

- **Code-Review: FREIGABE MIT MINOR-FIXES.** Keine blockierenden/major Findings. Schema feldweise gegen
  `@isms/contracts` verifiziert (kein erfundenes/fehlendes Feld); `schema.ts`↔Migration↔Snapshot konsistent;
  Read-seitige Zod-Validierung; Upsert-Conflict = zusammengesetzter PK; jede Query tenant-scoped.
- **Security/Privacy-Review: SICHER FÜR DEMO-SCOPE.** Kein tenant-loser Lesepfad; `tenant_id` strukturell
  (PK + jeder Index + jede Query); Schreib-Guard bei Mismatch; echte Isolations-Negativbeweise; nur
  Platzhalter-Secrets + synthetischer rollenbasierter Seed. Keine High/Critical.

## Findings umgesetzt (Minor)

- `reset()` technisch als test/admin-only gehärtet: nicht mehr aus `index.ts` re-exportiert + Laufzeit-Guard
  (`NODE_ENV==='production'` → throw) + Test (LOW-1 / Code-Minor).
- Upsert-`set`-Pfad mit **geändertem** Feld getestet (nicht nur identische Idempotenz).
- Relationship-Cross-Tenant-Schreib-Guard: symmetrischer Negativtest ergänzt.
- `schema.ts`-Zeitfeld-Doku um UTC-Normalisierungs-Voraussetzung präzisiert; `.env.example`-Kommentar (pglite Default vs. pg für Docker).

## Bewusst verschoben → `FINDING-0004` (Medium, Folge-Härtungs-WP vor API/Prod)

- PostgreSQL **RLS** (`ENABLE`+`FORCE`) + Policy via Session-GUC `app.tenant_id`; **least-privilege App-Rolle**
  (nicht Owner) für `DATABASE_URL`; Negativtest „rohe Query ohne GUC → 0 Zeilen"; Import-Guard für rohe Tabellen;
  optional DB-seitiger zusammengesetzter FK `relationships→objects`. Restrisiko: aktuelle Isolation ist
  App-Konvention, keine DB-Garantie (kein API-/UI-Pfad in diesem Slice → tolerabel).

## Unabhängige Re-Verifikation (Orchestrator, nach Agent-Stopp-Recovery)

- Hintergrund-Builder wurde durch Session-Neustart gestoppt; die Minor-Fixes waren **bereits im Working Tree
  gelandet** und wurden hier unabhängig geprüft: `@isms/db` **18/18** grün (frisch); Monorepo `pnpm typecheck`
  7/7, `pnpm test` 7/7, `pnpm build` 5/5; `validate_handoff.py` OK; 6/6 Repository-Tests grün. **Gesamt 112 Tests.**
- Tenant-Isolation: Cross-Tenant-`getById` → `undefined`; Cross-Tenant-Write (Objekt + Beziehung) → `Tenant-Mismatch`; Nordwerk unverändert (17 Objekte / 15 Beziehungen).

## Ergebnis

**WP-007 angenommen (Done).** Persistenzschicht `@isms/db` mit serverseitig erzwungener Tenant-Isolation,
Migration, Seed-Loader und PGlite-Tests (ohne Docker); `docker-compose.yml` + `.env.example` für den vollen
Server bereit. Schema strikt aus den Contracts. RLS-Härtung als benanntes Folge-WP (FINDING-0004).
