# Current State

**Stand:** WP-004 abgeschlossen — **erstes sichtbares Produkt: Digital Twin Explorer läuft im Browser** (`/twin`)  
**Phase:** 1 (Demo Foundation)  
**Aktives Work Package:** WP-004 (**Done**); nächstes offen (WP-011 App-Shell / Persistenz / Twin-Ausbau)  
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
- **`@isms/demo-seed`** (WP-003 Slice 2): 4 synthetische Demo-Mandanten + kohärenter Nordwerk-Objektgraph (17 Objekte / 15 Beziehungen), validiert gegen die Contracts, **24 Tests** mit Negativbeweisen für Tenant-Isolation, referenzielle Integrität, Owner-Refs; Seed-Manifest + Storyline; zwei unabhängige Reviews (KONZEPTTREU / Freigabe),
- **Digital Twin Explorer** (WP-004): read-only Ansicht in `apps/web` (`/twin`, `/twin/[tenantId]`), rendert den Demo-Seed (Objekte nach Familie F01–F09, Beziehungen mit deutschen Klartext-Labels + Vertrauensgrad, Datenqualität), Empty-State, deutsches 404, barrierearm (main/Skip-Link/Headings); zwei unabhängige Reviews + visuelle Browser-QA. **Monorepo gesamt: 94 Tests grün.**

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

**WP-004 ist abgeschlossen — der Explorer läuft im Browser** (`pnpm --filter @isms/web dev` → `http://localhost:3000/twin`).
Nächstes WP offen zwischen:
- **WP-011:** App-Shell/Navigation/Login/Rollen- & Mandantenwechsel (Dok. 06) — die volle Erlebniswelt-Hülle;
- **Persistenz-WP:** PostgreSQL (benötigt Docker-/ORM-Human-Gate);
- **Twin-Ausbau:** narrative Ursache-Wirkungs-Kette / Impact Path (FINDING-0003) bzw. weitere Demo-Mandanten mit Graph.
Weiterhin ohne stille Stack-/Kostenbindung; Checkpoints + Push ins private Backup.
