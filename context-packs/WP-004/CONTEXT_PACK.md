# Context Pack – WP-004 Digital Twin Explorer (read-only)

## Ziel

Erste sichtbare Produktfläche: eine read-only Ansicht in `apps/web`, die den Demo-Seed
(`@isms/demo-seed`) rendert. Beantwortet die Nutzerfrage „Was enthält der digitale Zwilling dieses
Mandanten und wie hängt es zusammen?" (Dok. 06). Keine DB/Auth/Docker.

## Verbindliche Prinzipien

- **Entscheidung/Frage vor Navigation** (Dok. 06): jede Hauptseite beantwortet eine konkrete Frage;
  Seitenanatomie „Was ist das? Warum wichtig? Womit hängt es zusammen? Wie entwickelt es sich? Was als Nächstes?".
- **Zustände implementieren** (frontend.md): Loading, Empty, Error, (Conflict), Success — hier v. a. Empty
  (Mandant ohne Graph) und ein sinnvoller Default.
- **Accessibility & responsive** Kernweg gehören zu Done; keine fachliche/Authz-Logik nur im Client.
- **Nur belegte Daten:** ausschließlich Werte aus `@isms/demo-seed`/`@isms/contracts` anzeigen; nichts erfinden.
- Eine Wahrheit / mehrere Perspektiven, Klartext vor Fachsprache, Unsicherheit sichtbar (Datenqualität/Confidence anzeigbar).

## Pflichtquellen

### Dokument 06 v1.0
Pfad: `docs/concept/active/06_UX_UI_NAVIGATION_ERLEBNISWELTEN_v1.0.md`
Relevant: globale Shell/Orte, universelle Seitenanatomie (5 Fragen), Zustände, Screen-Muster
(insb. Digital Twin Explorer S..), Designprinzipien (Entscheidung vor Navigation, Ursache vor Score,
keine Dark Patterns). **Nur** die für eine read-only Explorer-Seite nötigen Muster umsetzen.

### Dokument 07 v1.0
Pfad: `docs/concept/active/07_DIGITALER_UNTERNEHMENSZWILLING_INFORMATIONSGRAPH_v1.0.md`
Relevant: Objekt-360-Idee, Objektfamilien F01–F09, Beziehungssemantik, Datenqualitäts-/Confidence-Anzeige.

### Datenquelle
- `packages/demo-seed/` (`@isms/demo-seed`): `DEMO_SEED` (objects/relationships/tenants), `seed-manifest.json`, README-Storyline.
- `packages/contracts/` (`@isms/contracts`): Typen/Vokabulare (Familien, Beziehungstypen) für Gruppierung/Labels.

### Regeln
- `.claude/rules/frontend.md`, `.claude/rules/demo-data.md`.

## Umsetzungshinweise (reversibel)

- Next.js App Router, Server Components (Daten sind statischer Import — kein Client-Fetch nötig).
- Workspace-Deps `@isms/demo-seed`/`@isms/contracts`; in `next.config.mjs` ggf. `transpilePackages` setzen.
- Schlichte, saubere UI (Karten/Listen); optional ein einfaches, framework-freies SVG für die Kette — kein schweres Graph-Lib.
- Render-Test mit Vitest + Testing Library (jsdom).

## Nicht im Context Pack enthalten

- Persistenz, Auth/Rollen, echte Interaktionen/Editing, Decision Center, Reporting — spätere WPs.
