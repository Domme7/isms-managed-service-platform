# FINDING-0004 – DB-Tenant-Isolation: RLS + Least-Privilege als Folge-Härtung

- **Quelle:** Security-/Privacy-Review WP-007 (LOW-2, LOW-3, INFO)
- **Schwere:** Medium (Härtung erforderlich, bevor die Persistenz hinter eine nutzergesteuerte API/UI oder Produktivnutzung geht)
- **Datum:** 2026-07-22
- **Status:** Offen — eigenes Folge-Härtungs-WP; für den aktuellen Demo-Scope nicht blockierend
- **Betroffen:** `packages/db/` (`schema.ts`, `client.ts`, `index.ts`, `repositories/*`), `docker-compose.yml`, `.env.example`

## Beschreibung / Restrisiko

Die Mandantentrennung in `@isms/db` ist derzeit eine **App-seitige Code-Konvention** (jede
Repository-Funktion erzwingt `tenant_id`), **keine Datenbank-Garantie**:

- `@isms/db` exportiert die rohen Tabellen (`objects`/`relationships`) und das DB-Handle. Ein
  Konsument, der `db.select().from(objects)` **ohne** Tenant-Filter schreibt (Bug, neue Repo-Funktion
  ohne `where`, oder direkter `psql`-Zugriff), sieht **alle** Mandanten (Dok. 19 §5.1/§11.1).
- Die Docker-Runtime-Rolle `isms` ist zugleich DDL-Owner → PostgreSQL-RLS würde vom Table-Owner
  standardmäßig **umgangen**; eine getrennte least-privilege App-Rolle ist Voraussetzung fürs Hardening (SP04).
- Guard-Fehlertexte enthalten Identifier (`mappers.ts`) — bei API-Anbindung auf Leak/Enumeration prüfen (Dok. 19 §5.3).

## In WP-007 bereits adressiert

- Serverseitig erzwungener Tenant-Scope in allen Repos, Schreib-Guard, echte Isolations-Negativtests.
- **LOW-1 (Quick-Fix in WP-007):** tenant-loser `reset()` technisch als test/admin-only gekapselt/geguardet.

## Empfohlenes Folge-Hardening (eigenes WP)

1. **RLS aktivieren:** `ENABLE ROW LEVEL SECURITY` + `FORCE ROW LEVEL SECURITY` auf `objects` und
   `relationships`; Policy `USING (tenant_id = current_setting('app.tenant_id'))`.
2. **Session-GUC:** Tenant-Kontext pro Transaktion via `SET LOCAL app.tenant_id = ...` im Repository
   (nicht allein Query-Filter).
3. **Least-Privilege-Rolle:** separate Nicht-Owner-App-Rolle für `DATABASE_URL`; DDL/Migration über eine getrennte Rolle.
4. **Defense-in-Depth-Test:** rohe Query **ohne** gesetzten GUC liefert 0 Zeilen (beweist DB-Garantie statt App-Konvention).
5. **Import-Guard:** Zugriff auf die rohen Tabellen außerhalb `packages/db` unterbinden (Lint/Architektur-Regel).
6. Guard-/Fehlertexte bei API-Anbindung säubern (keine Cross-Tenant-Metadaten).

## Trigger

Aufzugreifen **vor** der Anbindung dieser Persistenz hinter eine nutzergesteuerte API/UI (Phase 3+)
und zwingend vor jeder Nicht-Demo-/Produktivnutzung. Passt gut mit WP-005 (Auth) / dem API-WP zusammen.
