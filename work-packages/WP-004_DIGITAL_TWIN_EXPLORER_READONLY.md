# WP-004 – Digital Twin Explorer (read-only)

## Identität

- **Phase:** 1 (Demo Foundation) → Vorgeschmack Phase 2
- **Priorität:** P1
- **Status:** Active
- **Risk Class:** Low
- **Accountable Owner:** CTO-/Architecture-Agent (Orchestrator)
- **Builder:** Frontend-Engineer-Agent
- **Reviewer:** Code-Reviewer + Product-User-Lead (UX/Frontend-Regeln), read-only
- **Human Gates:** keiner (keine DB/Docker/Auth, keine Kosten, nur synthetische Daten)

## Problem

Der digitale Zwilling und die Demo-Welt existieren bisher nur als Datenverträge/Seed (`@isms/contracts`,
`@isms/demo-seed`) — nicht sichtbar. Es fehlt die erste Produktfläche, die den Zwilling **im Browser**
erlebbar macht.

## Ziel

Eine **read-only** „Digital Twin Explorer"-Ansicht in `apps/web`, die den Demo-Seed rendert: die vier
Demo-Mandanten und — für Nordwerk — den kohärenten Objektgraphen (Objekte nach Familie gruppiert +
Beziehungen als lesbare Kette). Die Seite beantwortet eine konkrete Nutzerfrage (Dok. 06):
**„Was enthält der digitale Zwilling dieses Mandanten und wie hängt es zusammen?"**

## Nicht-Ziele

- keine Datenbank/Persistenz, kein ORM, kein Docker (Daten kommen aus `@isms/demo-seed`),
- keine Authentisierung/Autorisierung — Mandantenauswahl ist reine UI-Navigation, keine Zugriffslogik,
- keine Schreib-/Editierfunktion, keine echte Graph-Engine (schlichte Liste/optional einfaches SVG),
- keine erfundenen Daten/Objekte — nur was im Seed/Contract steht,
- keine fachliche oder Authz-Logik nur im Client (hier ohnehin nur Anzeige statischer Demo-Daten).

## Scope

1. **Route/Seite** (z. B. `/twin` oder Startseite) als Server Component, importiert `@isms/demo-seed`.
2. **Mandantenübersicht:** die 4 Demo-Mandanten (Name, `has_object_graph`-Badge). Auswahl navigiert.
3. **Mandantenansicht Nordwerk:**
   - kurze Storyline (aus Seed-Manifest/README) als „Warum/Was"-Kontext (Dok. 06 Seitenanatomie),
   - **Objekte nach Familie F01–F09 gruppiert**; je Objektkarte: `display_name`, `object_type`, Familie,
     `lifecycle_status`, `classification`, Anzahl Qualitätsdimensionen,
   - **Beziehungen** als lesbare Liste: `Quelle` —`relationship_type`→ `Ziel` (+ Assertion-Art).
4. **Zustände (Dok. 06 / frontend.md):** Empty (Mandant ohne Graph → klare Meldung), „nichts ausgewählt",
   sinnvoller Default; Error-Pfad minimal (statische Daten). Loading trivial (Server-render).
5. **Accessibility & Responsive:** semantische Struktur (Überschriften, Listen), Kontrast, responsive Kernweg.
6. **Workspace-Integration:** `apps/web` hängt von `@isms/demo-seed`/`@isms/contracts` ab; `transpilePackages`
   oder gebautes `dist` sauber lösen, sodass `next build` funktioniert.

## Abhängigkeiten

- Dokument 06 v1.0 (UX/UI, Seitenanatomie, Zustände, Erlebniswelten)
- Dokument 07 v1.0 (Zwilling-Objekte/Beziehungen, Objekt-360)
- `@isms/contracts`, `@isms/demo-seed`
- `.claude/rules/frontend.md`
- `context-packs/WP-004/CONTEXT_PACK.md`

## Slices und Checkpoint-Plan

### Slice 1 – Explorer-Seite + Zustände
- Route, Mandantenübersicht, Nordwerk-Detail (Objekte/Beziehungen), Empty/Default-States.
- Render-/Smoke-Test (Vitest + Testing Library): 4 Mandanten gelistet; Nordwerk-Objekte/-Beziehungen sichtbar.
- `next build`/`typecheck` grün. **Verified Checkpoint** nach visueller QA.

### Slice 2 – Abschluss & Review
- Unabhängiger Code-Review + UX/Frontend-Regel-Review; visuelle QA (laufender Browser, Screenshot).
- Status-/Queue-/Handover-Update; Push. **Release/Handover Checkpoint.**

## Acceptance Criteria

1. `apps/web` rendert die 4 Demo-Mandanten und für Nordwerk Objekte (nach Familie) + Beziehungen.
2. Angezeigte Daten stammen ausschließlich aus `@isms/demo-seed` (keine erfundenen Werte).
3. Empty-State für Mandant ohne Objektgraph vorhanden; sinnvoller Default; barrierearm & responsive.
4. `pnpm --filter @isms/web build` + `typecheck` grün; mind. ein Render-/Smoke-Test grün; Monorepo grün.
5. Visuelle QA im laufenden Browser bestanden (Screenshot als Evidence).
6. Keine DB/ORM/Docker/Auth; keine Authz-Logik im Client.
7. Unabhängiger Review dokumentiert (Builder ≠ Reviewer).

## Test Plan

- Render-/Smoke-Test der Explorer-Komponente (Mandantenliste, Nordwerk-Objekte/-Beziehungen, Empty-State).
- `next build` + `tsc --noEmit`.
- Visuelle QA (Browser) + Screenshot.

## Deliverables

- Explorer-Seite/Komponenten in `apps/web`, Render-Test, Workspace-Verdrahtung.
- WP-004-Review-Notiz (Code + UX), Screenshot-Evidence.
- aktualisierte Status-/Queue-/Handover-Dateien.

## Stop Conditions

- eine Anzeige ließe sich nicht aus Seed/Contract belegen (→ nicht erfinden),
- Bedarf an DB/Auth/Docker entsteht,
- Scope wächst über „read-only Explorer des Demo-Seeds" hinaus.

## Done Evidence

- grüne Tests + CI, Screenshot, Commit/Push, Checkpoint-Records, Review-Notiz, Statusdateien.
