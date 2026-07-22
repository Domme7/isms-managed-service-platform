# Current State

**Stand:** WP-013 **fertig** — drei Orte der Shell sind echt: Zwilling (Kunden), Services (Managed-Service-Welt) und ISMS (Risk & Control). Je Welt unabhängige Doppel-Reviews + Browser-QA  
**Phase:** 1→2→6 (Demo Foundation + Persistenz + Managed-Service-Vorgeschmack)  
**Aktives Work Package:** **WP-015 Visual Design Uplift** (Owner-Feedback); danach WP-014 (Objekt-360)  
**Repository-Root:** `apps/ISMS/` · **Default-Branch:** `main` · **Tags:** `phase-0-baseline`  
**Remote:** privat `Domme7/isms-managed-service-platform` (DR-0002) — CI grün  
**Implementierungsstatus:** Lauffähige Demo-App (Shell + 3 Erlebnisflächen, read-only, synthetisch); Persistenzschicht vorhanden, noch nicht ans UI angebunden  
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
- **Digital Twin Explorer** (WP-004): read-only Ansicht in `apps/web` (`/twin`, `/twin/[tenantId]`), rendert den Demo-Seed (Objekte nach Familie F01–F09, Beziehungen mit deutschen Klartext-Labels + Vertrauensgrad, Datenqualität), Empty-State, deutsches 404, barrierearm (main/Skip-Link/Headings); zwei unabhängige Reviews + visuelle Browser-QA,
- **App-Shell** (WP-011): acht Orte, Login-/Rollensimulation (R01–R12), Rollen-/Mandantenwechsel, eingebetteter Explorer,
- **Managed-Service-Welt** (WP-012): Seed-Schicht (+23 Objekte/+39 Kanten, kanonische F09-Typen aus Dok. 13–15) + „Services"-Ansicht (Outcome-first-Karten, SLA/Deliverables/Wirkungsbeitrag, Portfolio für Consulting World, Empty-States); 4 Reviews (inkl. KONZEPTTREU) + Browser-QA; Konzeptlücken als O-WP012-01..06 + CCP-002 dokumentiert,
- **ISMS-Kern-Welt** (WP-013): Ort „ISMS" mit Risiken (Threat-/Weakness-Herkunft), Controls (Umsetzung, erfülltes Requirement + Framework, Nachweis-Stand), Maßnahmen und Nachweisen — Dok.-08-Ehrlichkeitsregeln im Produkt erklärt („wirksam" = Lebenszyklus-Stand, kein Prüfergebnis); Datenlücke Risiko↔Szenario sichtbar (O-WP013-01); 2 Reviews + Browser-QA,
- **3 Concept Change Proposals** (`research/change-proposals/CCP-001..003`) als Human-Gate-Vorlagen für die 8 Konzeptlücken; **WP-013-Entwurf** (ISMS-Kern-Welt) liegt bereit,
- **`@isms/db`** (WP-007): Persistenzschicht PostgreSQL/Drizzle — Schema/Migration/tenant-scoped Repos/Seed-Loader aus den Contracts, getestet gegen **PGlite** (kein Docker), serverseitige Tenant-Isolation mit Negativbeweisen; Code- + Security-Review (SICHER FÜR DEMO-SCOPE); RLS-Härtung → FINDING-0004. **Monorepo gesamt: 112 Tests grün.**

## Verifikations-Evidence (WP-002)

- `pnpm test` → 2/2 grün · `pnpm typecheck` → grün (api+web) · `pnpm build` → grün (api+web)
- API live: `GET /health` → `{"status":"ok","service":"isms-api","phase":"phase-0-skeleton",...}`; unbekannte Route → 404
- `validate_handoff.py` OK · 6/6 Repository-Tests grün · GitHub Actions „Repository Contract" + „App CI"

## Noch nicht gesichert oder entschieden

- **Docker-Engine startet beim Owner noch nicht** (CLI v29.6.2 vorhanden, Daemon antwortet mit 500) — blockiert nur die reale Postgres-Validierung; PGlite deckt Dev/Test vollständig ab,
- **Lifecycle-Konzeptwidersprüche O-D07-02/03** (Schreibweise §8 vs. Dok. 05 §7; §7-Kurzform vs. §8) — Concept-Author/Human Gate, nicht blockierend,
- Authentisierung/Tenant-Trennung (WP-005), produktive Cloud/CI, reale Daten,
- Branch-Protection auf `main` (O-GH-002).

## Offene Findings (nicht blockierend)

- FINDING-0001: Master-Index-Einstiegspfad weicht von gebauter Struktur ab (Low).
- FINDING-0002: `validate_handoff.py` prüft keine Status-Aktualität/Branch/Tag (Med); aktive-WP-Prüfung inzwischen WP-agnostisch gemacht.

## Exact Next Step

**WP-013 ist abgeschlossen.** Aktiv: **WP-015 Visual Design Uplift** (Owner-Feedback „mehr Wow"; rein
visuelle Schicht — die 77 Web-Tests müssen unverändert grün bleiben). Danach: **WP-014 Objekt-360-
Detailseite** (Entwurf bereit) — macht den Graphen durchgängig klickbar.
Offene Human Gates (nicht blockierend): CCP-001/002/003 (Konzeptentscheidungen), Docker-Desktop-Start
beim Owner (reale Postgres-Validierung von `@isms/db`), FINDING-0004 (DB-RLS vor DB→UI-Anbindung).
Ausrichtung: alle 9 Phasen; Checkpoints + Push nach jedem WP.
