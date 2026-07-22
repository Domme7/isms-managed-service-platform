# WP-004 – Unabhängiger Review (Done Evidence)

**Gegenstand:** read-only Digital Twin Explorer in `apps/web` (Next.js App Router, Server Components),
rendert `@isms/demo-seed`. **Builder:** Frontend-Engineer-Agent. **Reviewer (getrennt):** Code-Reviewer +
Product-User-Lead (UX/Frontend-Regeln). **Datum:** 2026-07-22.

## Verdikte

- **Code-Review: FREIGABE MIT MINOR-FIXES.** Keine blockierenden/major Findings. Positiv: saubere Server
  Components (`await params`, `generateStaticParams`, `notFound()`), nur Seed-Daten (fail-loud-Fallback statt
  stiller Lücke), harte serverseitige `tenant_id`-Filterung (kein Cross-Tenant-Bleed), `transpilePackages`
  korrekt, gute Testgüte gegen den echten Seed.
- **UX/Produktregel-Review: FREIGABE MIT MINOR-FIXES.** Keine Blocker. Positiv: „Frage vor Navigation",
  starker Empty-State, ehrliche Datenlage, solide A11y-Basis, keine Dark Patterns.

## Findings umgesetzt (und re-verifiziert)

- **A11y:** `main`-Landmark + Skip-Link (`app/twin/layout.tsx`), korrigierte Heading-Hierarchie (h1→h2→h3→h4),
  eigenes deutsches, gestyltes 404 (`app/twin/not-found.tsx`).
- **Klartext/Datenehrlichkeit:** deutsche Beziehungs-Labels als reine UI-Schicht (kanonischer Typ bleibt
  sichtbar: „R07 · verarbeitet" + „Typ: processes"); `confirmation_level`/`note` statt bloßer Dimensions-
  Zählung; qualitativer Vertrauensgrad („mittel (0,7)"); eigener Leitfrage-Block auf der Detailseite.
- **Korrektheit/Tests:** Empty-State generisch aus dem Seed abgeleitet (keine „Nordwerk"-Hartkodierung);
  8 neue Unit-Tests für die React-freien Helfer inkl. Fallback-Pfad; generische „keine rohen IDs"-Assertion.
- **Nits:** `next/link` statt `<a>`, doppelter Count-Aufruf entfernt, ungenutzte Badge-Variante entfernt,
  `generateMetadata` async/await.

## Bewusst verschoben

- **UX-M2** (geführte narrative Ursache-Wirkungs-Kette) → `docs/project/risks/FINDING-0003` (Low, Folge-Slice).
- `source_refs`/Herkunft-Anzeige → ebenfalls Folge-Slice.

## Unabhängige Re-Verifikation (Orchestrator)

- Frisch (ohne Turbo-Cache): `@isms/web` **13/13** (5 Render + 8 Unit). Monorepo gesamt **94 Tests**
  (api 2, contracts 55, demo-seed 24, web 13). `pnpm build` 4/4, `pnpm typecheck` 6/6; `validate_handoff.py`
  OK; 6/6 Repository-Tests grün.
- **Live-Browser-QA** (verifiziert über gerenderten DOM/Accessibility-Baum): `/twin` listet 4 Mandanten mit
  korrekten Badges; `/twin/tenant-nordwerk` zeigt Skip-Link + `main`, Leitfrage, 17 Objekte nach F01–F09,
  Datenqualität „Bestätigung: …", 15 Beziehungen mit deutschen Labels + Vertrauensgrad „mittel (0,7)";
  `/twin/tenant-finovia` Empty-State + „ansehen"-Link; unbekannter Mandant → deutsches 404.

## Ergebnis

**WP-004 angenommen (Done).** Acceptance Criteria erfüllt: 4 Mandanten + Nordwerk-Graph (Objekte/Familien/
Beziehungen) aus dem Seed, Empty-State, barrierearm & responsiv, Tests grün, visuelle QA bestanden, keine
DB/ORM/Docker/Auth, zwei unabhängige Reviews dokumentiert.
